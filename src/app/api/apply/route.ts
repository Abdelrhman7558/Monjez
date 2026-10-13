import { NextResponse } from "next/server";
import { Resend } from "resend";
import { applyRequestSchema, qualify, type ApplyInput, type Tier } from "@/lib/landing/apply";
import { LANDING_CONFIG } from "@/components/landing/config";

// Contractor landing — application intake.
//
// Delivers each application to whichever destinations are configured:
//   MONDAY_API_TOKEN           → item on the Monday leads board (same board + columns as the old monjez-platform intake)
//   LEAD_WEBHOOK_URL           → POST JSON (Zapier, Make, n8n, Google Apps Script, CRM webhook…)
//   RESEND_API_KEY +
//   LEAD_NOTIFY_EMAIL          → notification email (LEAD_FROM_EMAIL optional)
// If none is configured the route returns 503 so the form shows an honest error instead of a fake success.

const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const rateLimit = new Map<string, { count: number; start: number }>();
type Outcome = { status: number; body: Record<string, unknown> };
// submissionId → delivery in progress or completed, so concurrent retries/double clicks deliver once.
const deliveries = new Map<string, { at: number; outcome: Promise<Outcome> }>();

function limited(ip: string) {
    const now = Date.now();
    const rec = rateLimit.get(ip);
    if (!rec || now - rec.start > WINDOW_MS) {
        rateLimit.set(ip, { count: 1, start: now });
        return false;
    }
    rec.count += 1;
    return rec.count > LIMIT;
}

async function toWebhook(url: string, payload: Record<string, unknown>) {
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
}

async function toEmail(apiKey: string, to: string, data: ApplyInput, tier: Tier) {
    const resend = new Resend(apiKey);
    const lines = [
        `Tier: ${tier}`,
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Company: ${data.company}`,
        `Phone: ${data.phone}`,
        `Country: ${data.country}`,
        `Company type: ${data.companyType}`,
        `Size: ${data.size}`,
        `Main bottleneck: ${data.bottleneck}`,
        `Current workflow / tools: ${data.tools || "—"}`,
    ];
    const { error } = await resend.emails.send({
        from: process.env.LEAD_FROM_EMAIL || "Monjez Website <onboarding@resend.dev>",
        to: to.split(",").map((s) => s.trim()),
        replyTo: data.email,
        subject: `New application: ${data.company} (${data.country}, ${tier})`,
        text: lines.join("\n"),
    });
    if (error) throw new Error(`email failed: ${error.name}`);
}

// Monday leads board — column ids copied from monjez-platform/pages/api/monday-lead.js.
const MONDAY_BOARD_ID = process.env.MONDAY_BOARD_ID || "5102286967";
const MONDAY_GROUP_ID = process.env.MONDAY_GROUP_ID || "topics";
const MC = {
    source: "text_mm68qz98",
    phone: "phone_mm68x9gz",
    email: "email_mm68x6rp",
    website: "link_mm68n74",
    project: "text_mm68tt13",
    challenge: "long_text_mm68h4cv",
    status: "text_mm68ancq",
    score: "numeric_mm68yp8j",
    calendly: "link_mm687htb",
    submitted: "date_mm68p7m9",
    answers: "long_text_mm68hwhq",
};
const TIER_SCORE: Record<Tier, number> = { qualified: 3, discovery: 2, not_fit: 1 };

async function toMonday(token: string, data: ApplyInput, tier: Tier, locale: string) {
    const answers = [
        `Tier: ${tier}`,
        `Language: ${locale}`,
        `Company: ${data.company}`,
        `Phone: ${data.phone}`,
        `Country: ${data.country}`,
        `Company type: ${data.companyType}`,
        `Size: ${data.size}`,
        `Main bottleneck: ${data.bottleneck}`,
        `How it's handled today: ${data.tools || "—"}`,
    ].join("\n");
    // Same value encoding as the old intake (each value JSON-stringified), which is known to be accepted by this board.
    const j = (v: unknown) => JSON.stringify(v);
    const values = {
        [MC.source]: j("Fit-Out"),
        [MC.status]: j("NEW"),
        [MC.score]: j(TIER_SCORE[tier]),
        [MC.calendly]: j({ url: LANDING_CONFIG.calendlyQualified, text: LANDING_CONFIG.calendlyQualified }),
        [MC.submitted]: j({ date: new Date().toISOString().slice(0, 10) }),
        [MC.answers]: j(answers.slice(0, 5000)),
        [MC.challenge]: j(data.bottleneck),
        [MC.project]: j(data.companyType),
        [MC.website]: j({ url: "https://monjez-agency.com", text: "https://monjez-agency.com" }),
        [MC.phone]: j({ phone: data.phone, countryShortName: "" }),
        [MC.email]: j({ email: data.email, text: data.email }),
    };
    const query =
        "mutation ($board: ID!, $group: String!, $name: String!, $values: JSON!) { create_item(board_id: $board, group_id: $group, item_name: $name, column_values: $values) { id } }";
    const res = await fetch("https://api.monday.com/v2", {
        method: "POST",
        headers: { Authorization: token, "Content-Type": "application/json" },
        body: JSON.stringify({
            query,
            variables: { board: MONDAY_BOARD_ID, group: MONDAY_GROUP_ID, name: `${data.name} — ${data.company}`, values: JSON.stringify(values) },
        }),
        signal: AbortSignal.timeout(10000),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.errors) throw new Error(`monday rejected the item (${res.status})`);
}

export async function POST(request: Request) {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (limited(ip)) {
        return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }

    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: "invalid_json" }, { status: 400 });
    }

    const parsed = applyRequestSchema.safeParse(body);
    if (!parsed.success) {
        const fields = parsed.error.flatten().fieldErrors;
        // A filled honeypot gets a bare error so bots learn nothing about the field.
        if (fields.website) return NextResponse.json({ error: "invalid" }, { status: 400 });
        return NextResponse.json({ error: "invalid", fields }, { status: 400 });
    }

    const { submissionId, website: _honeypot, locale, ...data } = parsed.data;
    const tier = qualify(data);

    const now = Date.now();
    deliveries.forEach((v, k) => {
        if (now - v.at > WINDOW_MS) deliveries.delete(k);
    });
    const existing = deliveries.get(submissionId);
    if (existing) {
        const prev = await existing.outcome;
        return NextResponse.json({ ...prev.body, duplicate: true }, { status: prev.status });
    }

    const outcome = deliver(data, tier, submissionId, now, request.headers.get("referer") || "", locale);
    deliveries.set(submissionId, { at: now, outcome });
    const result = await outcome;
    // Only successful deliveries are remembered; a failed attempt can be retried with the same id.
    if (result.status !== 200) deliveries.delete(submissionId);
    return NextResponse.json(result.body, { status: result.status });
}

async function deliver(data: ApplyInput, tier: Tier, submissionId: string, now: number, page: string, locale: string): Promise<Outcome> {
    const webhook = process.env.LEAD_WEBHOOK_URL;
    const resendKey = process.env.RESEND_API_KEY;
    const notify = process.env.LEAD_NOTIFY_EMAIL;

    const jobs: Promise<void>[] = [];
    const mondayToken = process.env.MONDAY_API_TOKEN;
    if (mondayToken) jobs.push(toMonday(mondayToken, data, tier, locale));
    if (webhook) {
        jobs.push(
            toWebhook(webhook, {
                ...data,
                tier,
                submissionId,
                source: "contractor-landing",
                locale,
                submittedAt: new Date(now).toISOString(),
                page,
            })
        );
    }
    if (resendKey && notify) jobs.push(toEmail(resendKey, notify, data, tier));

    if (jobs.length === 0) {
        console.error("[apply] No lead destination configured (set MONDAY_API_TOKEN, LEAD_WEBHOOK_URL or RESEND_API_KEY + LEAD_NOTIFY_EMAIL).");
        return { status: 503, body: { error: "not_configured" } };
    }

    const results = await Promise.allSettled(jobs);
    const delivered = results.some((r) => r.status === "fulfilled");
    results.forEach((r) => {
        if (r.status === "rejected") console.error("[apply] delivery failed:", r.reason instanceof Error ? r.reason.message : "unknown");
    });

    if (!delivered) return { status: 502, body: { error: "delivery_failed" } };
    return { status: 200, body: { ok: true, tier } };
}

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { applyRequestSchema, qualify, type ApplyInput, type Tier } from "@/lib/landing/apply";

// Contractor landing — application intake.
//
// Delivers each application to whichever destinations are configured:
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
        console.error("[apply] No lead destination configured (set LEAD_WEBHOOK_URL or RESEND_API_KEY + LEAD_NOTIFY_EMAIL).");
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

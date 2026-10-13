"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CalendarCheck, Check, ExternalLink, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { makeApplySchema, type ApplyInput, type Tier } from "@/lib/landing/apply";
import { EN } from "./content";
import { useContent, useLocale } from "./content-context";
import { LANDING_CONFIG } from "./config";
import { Button, Container, Eyebrow, Section } from "./primitives";

type Status =
    | { kind: "idle" }
    | { kind: "submitting" }
    | { kind: "done"; tier: Tier }
    | { kind: "error"; reason: "not_configured" | "delivery_failed" | "rate_limited" | "invalid" | "network" };


const fieldBase =
    "mt-1.5 block w-full rounded-xl border bg-white px-3.5 py-3 text-[15px] text-mj-ink placeholder:text-[#A39D92] transition-colors focus:outline-none focus:ring-2 focus:ring-mj-accent/30";

function Field({
    id,
    label,
    error,
    optional,
    children,
    className,
}: {
    id: string;
    label: string;
    error?: string;
    optional?: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={className}>
            <label htmlFor={id} className="text-[13.5px] font-medium text-mj-ink">
                {label} {optional && <span className="font-normal text-mj-muted">{optional}</span>}
            </label>
            {children}
            {error && (
                <p id={`${id}-error`} role="alert" className="mt-1.5 text-[12.5px] text-mj-flag">
                    {error}
                </p>
            )}
        </div>
    );
}

function newId() {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
        (Number(c) ^ (Math.random() * 16) >> (Number(c) / 4)).toString(16)
    );
}

function calendlyUrl(base: string, name: string, email: string) {
    const params = new URLSearchParams({
        embed_type: "Inline",
        embed_domain: typeof window !== "undefined" ? window.location.hostname : "",
        hide_gdpr_banner: "1",
        name,
        email,
    });
    return `${base}?${params.toString()}`;
}

function BookingStep({ tier, name, email }: { tier: Tier; name: string; email: string }) {
    const t = useContent().UI.apply;
    const ref = useRef<HTMLDivElement>(null);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        ref.current?.focus();
    }, []);

    if (tier === "not_fit") {
        return (
            <div ref={ref} tabIndex={-1} className="p-6 outline-none sm:p-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mj-sand text-mj-ink">
                    <Check className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-[26px] font-semibold tracking-[-0.015em] text-mj-ink">{t.notFitTitle}</h3>
                <p className="mt-3 max-w-[560px] text-[15.5px] leading-relaxed text-mj-body">
                    {t.notFitBody}
                </p>
                <p className="mt-4 text-[14px] text-mj-muted">
                    {t.notFitPre}{" "}
                    <a href={LANDING_CONFIG.calendlyDiscovery} target="_blank" rel="noopener noreferrer" className="font-medium text-mj-accent underline underline-offset-4">
                        {t.notFitLink}
                    </a>
                    .
                </p>
            </div>
        );
    }

    const base = tier === "qualified" ? LANDING_CONFIG.calendlyQualified : LANDING_CONFIG.calendlyDiscovery;
    const src = calendlyUrl(base, name, email);
    const first = name.split(" ")[0];

    return (
        <div ref={ref} tabIndex={-1} className="outline-none">
            <div className="flex flex-col gap-4 border-b border-mj-line p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
                <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-mj-ok-soft text-mj-ok">
                        <CalendarCheck className="h-6 w-6" aria-hidden />
                    </span>
                    <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mj-ok">{t.received}</p>
                        <h3 className="mt-1 font-display text-[22px] font-semibold tracking-[-0.01em] text-mj-ink sm:text-[26px]">
                            {tier === "qualified" ? t.qualifiedTitle(first) : t.discoveryTitle(first)}
                        </h3>
                        <p className="mt-1.5 text-[14.5px] text-mj-body">
                            {tier === "qualified"
                                ? t.qualifiedBody
                                : t.discoveryBody}
                        </p>
                    </div>
                </div>
                <a
                    href={base}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 text-[13.5px] font-medium text-mj-accent underline underline-offset-4"
                >
                    {t.openCalendar} <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
            </div>
            <div className="relative h-[720px]" data-lenis-prevent>
                {!loaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[14px] text-mj-muted" role="status">
                        <Loader2 className="h-6 w-6 animate-spin text-mj-accent" aria-hidden />
                        {t.loading}
                    </div>
                )}
                <iframe
                    src={src}
                    title={t.calendarTitle}
                    onLoad={() => setLoaded(true)}
                    className={cn("relative block h-full w-full border-0 transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0")}
                />
            </div>
        </div>
    );
}

export function Apply() {
    const { APPLY, UI } = useContent();
    const locale = useLocale();
    const t = UI.apply;
    const schema = useMemo(() => makeApplySchema(UI.validation), [UI.validation]);
    const [status, setStatus] = useState<Status>({ kind: "idle" });
    const [submitted, setSubmitted] = useState<{ name: string; email: string } | null>(null);
    const submissionId = useMemo(() => newId(), []);
    const inFlight = useRef(false);
    const errorRef = useRef<HTMLDivElement>(null);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ApplyInput>({
        resolver: zodResolver(schema),
        mode: "onTouched",
        defaultValues: { name: "", email: "", company: "", tools: "" },
    });

    const onSubmit = async (data: ApplyInput) => {
        // A ref, not state: two clicks in the same tick both see the old state.
        if (inFlight.current) return;
        inFlight.current = true;
        setStatus({ kind: "submitting" });
        const honeypot = (document.getElementById("apply-website") as HTMLInputElement | null)?.value || "";
        try {
            const res = await fetch("/api/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, submissionId, website: honeypot, locale }),
            });
            const json = await res.json().catch(() => ({}));
            if (res.ok && json.ok) {
                setSubmitted({ name: data.name, email: data.email });
                setStatus({ kind: "done", tier: json.tier as Tier });
                return;
            }
            if (res.status === 400 && json.fields) {
                Object.entries(json.fields as Record<string, string[]>).forEach(([k, v]) => {
                    if (k in data) setError(k as keyof ApplyInput, { message: v?.[0] || t.checkField });
                });
                setStatus({ kind: "error", reason: "invalid" });
            } else if (res.status === 429) setStatus({ kind: "error", reason: "rate_limited" });
            else if (json.error === "not_configured") setStatus({ kind: "error", reason: "not_configured" });
            else setStatus({ kind: "error", reason: "delivery_failed" });
        } catch {
            setStatus({ kind: "error", reason: "network" });
        } finally {
            inFlight.current = false;
        }
    };

    useEffect(() => {
        if (status.kind === "error") errorRef.current?.focus();
    }, [status]);

    const busy = status.kind === "submitting";
    const err = (k: keyof ApplyInput) => errors[k]?.message;
    const aria = (k: keyof ApplyInput) => ({
        "aria-invalid": Boolean(errors[k]),
        "aria-describedby": errors[k] ? `apply-${k}-error` : undefined,
    });
    const cls = (k: keyof ApplyInput) => cn(fieldBase, errors[k] ? "border-mj-flag" : "border-mj-line focus:border-mj-accent");

    return (
        <Section id="apply" tone="sand">
            <Container>
                <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <Eyebrow>{APPLY.eyebrow}</Eyebrow>
                        <h2 className="mt-4 text-balance font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-mj-ink sm:text-[40px] lg:text-[46px]">{APPLY.title}</h2>
                        <p className="mt-5 max-w-[460px] text-[16.5px] leading-[1.65] text-mj-body">{APPLY.sub}</p>
                        <ul className="mt-7 space-y-3">
                            {APPLY.points.map((p) => (
                                <li key={p} className="flex gap-3 text-[15px] leading-snug text-mj-ink">
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mj-accent-soft text-mj-accent">
                                        <Check className="h-3 w-3" aria-hidden />
                                    </span>
                                    {p}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="overflow-hidden rounded-3xl border border-mj-line bg-white shadow-[0_30px_60px_-40px_rgba(23,31,46,0.35)]">
                        {status.kind === "done" && submitted ? (
                            <BookingStep tier={status.tier} name={submitted.name} email={submitted.email} />
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative p-6 sm:p-8" aria-describedby="apply-privacy">
                                {status.kind === "error" && (
                                    <div ref={errorRef} tabIndex={-1} role="alert" className="mb-6 flex gap-3 rounded-2xl border border-[#EBCBB8] bg-mj-flag-soft p-4 outline-none">
                                        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-mj-flag" aria-hidden />
                                        <div className="text-[14px] leading-relaxed text-mj-ink">
                                            <p>{t.errors[status.reason]}</p>
                                            {(status.reason === "not_configured" || status.reason === "delivery_failed" || status.reason === "network") && (
                                                <p className="mt-1.5">
                                                    {t.fallbackPre}{" "}
                                                    <a href={LANDING_CONFIG.calendlyDiscovery} target="_blank" rel="noopener noreferrer" className="font-semibold text-mj-accent underline underline-offset-4">
                                                        {t.fallbackLink}
                                                    </a>{" "}
                                                    {t.fallbackMid}{" "}
                                                    <a href={`mailto:${LANDING_CONFIG.contactEmail}`} className="font-semibold text-mj-accent underline underline-offset-4">
                                                        {LANDING_CONFIG.contactEmail}
                                                    </a>
                                                    .
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="grid gap-5 sm:grid-cols-2">
                                    <Field id="apply-name" label={t.fields.name} error={err("name")}>
                                        <input id="apply-name" autoComplete="name" className={cls("name")} {...aria("name")} {...register("name")} />
                                    </Field>
                                    <Field id="apply-email" label={t.fields.email} error={err("email")}>
                                        <input id="apply-email" type="email" autoComplete="email" inputMode="email" className={cls("email")} {...aria("email")} {...register("email")} />
                                    </Field>
                                    <Field id="apply-company" label={t.fields.company} error={err("company")}>
                                        <input id="apply-company" autoComplete="organization" className={cls("company")} {...aria("company")} {...register("company")} />
                                    </Field>
                                    <Field id="apply-country" label={t.fields.country} error={err("country")}>
                                        <select id="apply-country" defaultValue="" className={cls("country")} {...aria("country")} {...register("country")}>
                                            <option value="" disabled>
                                                {t.select}
                                            </option>
                                            {EN.APPLY.countries.map((value, i) => (
                                                <option key={value} value={value}>
                                                    {APPLY.countries[i]}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>
                                    <Field id="apply-companyType" label={t.fields.companyType} error={err("companyType")}>
                                        <select id="apply-companyType" defaultValue="" className={cls("companyType")} {...aria("companyType")} {...register("companyType")}>
                                            <option value="" disabled>
                                                {t.select}
                                            </option>
                                            {EN.APPLY.companyTypes.map((value, i) => (
                                                <option key={value} value={value}>
                                                    {APPLY.companyTypes[i]}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>
                                    <Field id="apply-size" label={t.fields.size} error={err("size")}>
                                        <select id="apply-size" defaultValue="" className={cls("size")} {...aria("size")} {...register("size")}>
                                            <option value="" disabled>
                                                {t.select}
                                            </option>
                                            {EN.APPLY.sizes.map((value, i) => (
                                                <option key={value} value={value}>
                                                    {APPLY.sizes[i]}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>
                                    <Field id="apply-bottleneck" label={t.fields.bottleneck} error={err("bottleneck")} className="sm:col-span-2">
                                        <select id="apply-bottleneck" defaultValue="" className={cls("bottleneck")} {...aria("bottleneck")} {...register("bottleneck")}>
                                            <option value="" disabled>
                                                {t.select}
                                            </option>
                                            {EN.APPLY.bottlenecks.map((value, i) => (
                                                <option key={value} value={value}>
                                                    {APPLY.bottlenecks[i]}
                                                </option>
                                            ))}
                                        </select>
                                    </Field>
                                    <Field id="apply-tools" label={t.fields.tools} optional={t.optional} error={err("tools")} className="sm:col-span-2">
                                        <textarea
                                            id="apply-tools"
                                            rows={3}
                                            placeholder={t.toolsPlaceholder}
                                            className={cn(cls("tools"), "resize-y")}
                                            {...aria("tools")}
                                            {...register("tools")}
                                        />
                                    </Field>
                                </div>

                                {/* honeypot: hidden from people and assistive tech */}
                                <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                                    <label htmlFor="apply-website">Website</label>
                                    <input id="apply-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                                </div>

                                <div className="mt-7 flex flex-col gap-4 border-t border-mj-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                                    <p id="apply-privacy" className="max-w-[320px] text-[12.5px] leading-relaxed text-mj-muted">
                                        {APPLY.privacy}
                                    </p>
                                    <Button type="submit" size="lg" arrow={!busy} disabled={busy} className="w-full sm:w-auto">
                                        {busy ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> {t.sending}
                                            </>
                                        ) : (
                                            t.submit
                                        )}
                                    </Button>
                                </div>
                                <p className="sr-only" aria-live="polite">
                                    {busy ? t.sendingSr : ""}
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </Container>
        </Section>
    );
}

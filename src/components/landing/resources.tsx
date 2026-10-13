"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ClipboardCheck, Play, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { useContent, useLocale } from "./content-context";
import { Container, Reveal, ScrollLink, HeroFrame } from "./primitives";
import { LandingShell } from "./shell";
import { RESOURCE_TYPES, RESOURCES_LIST, getResource, localized, type Resource, type ResourceType } from "./resources-data";
import type { Locale } from "./content";


/** Illustrated cover per resource type: drawn in code, no stock imagery or fake client screenshots. */
function CoverArt({ r }: { r: Resource }) {
    if (r.type === "video")
        return (
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 backdrop-blur-sm">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mj-accent-line text-mj-ink shadow-[0_0_40px_rgba(207,198,236,0.45)]">
                        <Play className="h-6 w-6 translate-x-0.5 fill-current" aria-hidden />
                    </span>
                    <div className="space-y-1.5" dir="ltr">
                        <span className="block h-2 w-28 rounded-full bg-white/50" />
                        <span className="block h-2 w-20 rounded-full bg-white/25" />
                        <span className="block font-mono text-[10px] text-white/60">{r.minutes}:36</span>
                    </div>
                </div>
            </div>
        );
    if (r.type === "case")
        return (
            <div className="absolute inset-x-6 bottom-5 top-12 flex items-center gap-3" dir="ltr">
                <div className="grid flex-1 grid-cols-3 gap-1.5">
                    {["XLSX", "PDF", "SHEET"].map((f) => (
                        <span key={f} className="rounded-md border border-white/15 bg-white/[0.06] py-2 text-center font-mono text-[9px] text-white/70">
                            {f}
                        </span>
                    ))}
                </div>
                <span className="text-mj-accent-line">→</span>
                <div className="flex-1 space-y-1 rounded-lg border border-mj-accent-line/40 bg-mj-accent/25 p-2">
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-1">
                            <span className="h-1.5 w-1/3 rounded-full bg-white/60" />
                            <span className="h-1.5 w-1/4 rounded-full bg-white/30" />
                            <span className="h-1.5 w-1/5 rounded-full bg-mj-accent-line/70" />
                        </div>
                    ))}
                </div>
            </div>
        );
    return (
        <div className="absolute inset-x-6 bottom-5 top-12 overflow-hidden rounded-lg border border-white/15 bg-white/[0.05]" dir="ltr">
            <div className="grid grid-cols-[28px_1fr_36px_44px] gap-2 border-b border-white/10 px-2.5 py-1.5 font-mono text-[8.5px] text-white/50">
                <span>#</span>
                <span>ITEM</span>
                <span>UNIT</span>
                <span>QTY</span>
            </div>
            {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className={cn("grid grid-cols-[28px_1fr_36px_44px] items-center gap-2 px-2.5 py-1.5", i === 2 && "bg-mj-accent/35")}>
                    <span className="font-mono text-[8.5px] text-white/40">{i + 1}.0{i + 2}</span>
                    <span className="h-1.5 rounded-full bg-white/40" style={{ width: `${55 + ((i * 17) % 40)}%` }} />
                    <span className="h-1.5 w-5 rounded-full bg-white/25" />
                    <span className={cn("h-1.5 w-7 rounded-full", i === 2 ? "bg-mj-accent-line" : "bg-white/25")} />
                </div>
            ))}
        </div>
    );
}

function Cover({ r, label, big }: { r: Resource; label: string; big?: boolean }) {
    return (
        <div className={cn("relative overflow-hidden bg-mj-ink", big ? "aspect-[21/9] rounded-3xl" : "aspect-[16/9]")}>
            <div aria-hidden className="absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px]" />
            <div aria-hidden className="absolute -end-10 -top-10 h-40 w-40 rounded-full bg-[#5A47B5]/40 blur-2xl" />
            <CoverArt r={r} />
            <span className="absolute start-4 top-4 rounded-full bg-mj-accent-line px-3 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.12em] text-mj-ink">{label}</span>
        </div>
    );
}

function Card({ r }: { r: Resource }) {
    const { RESOURCES: R } = useContent();
    const locale = useLocale();
    const t = localized(r, locale);
    const label = R.filters[r.type];
    return (
        <Link
            href={`/resources/${r.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-mj-line bg-white transition-shadow duration-300 hover:shadow-[0_24px_40px_-28px_rgba(23,31,46,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mj-accent"
        >
            <div className="relative">
                <Cover r={r} label={label} />
                {/* hover / focus: dim the cover and show a centred "Explore" pill (from the reference) */}
                <div className="absolute inset-0 flex items-center justify-center bg-mj-ink/0 opacity-0 transition-all duration-300 group-hover:bg-mj-ink/40 group-hover:opacity-100 group-focus-visible:bg-mj-ink/40 group-focus-visible:opacity-100">
                    <span className="translate-y-1 rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-mj-ink shadow-lg transition-transform duration-300 group-hover:translate-y-0">
                        {r.type === "video" ? R.watch : R.explore}
                    </span>
                </div>
            </div>
            <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-[17.5px] font-semibold leading-snug tracking-[-0.01em] text-mj-ink">{t.title}</h3>
                <p className="mt-2 line-clamp-3 flex-1 text-[14px] leading-relaxed text-mj-body">{t.excerpt}</p>
                <p className="mt-4 font-mono text-[11px] text-mj-muted">
                    {r.minutes} {r.type === "video" ? R.minWatch : R.minRead}
                </p>
            </div>
        </Link>
    );
}

function ResourcesIndexBody() {
    const { RESOURCES: R } = useContent();
    const [filter, setFilter] = useState<ResourceType | "all">("all");
    const list = useMemo(() => [...RESOURCES_LIST].sort((a, b) => b.published.localeCompare(a.published)), []);
    const shown = filter === "all" ? list : list.filter((r) => r.type === filter);
    const count = (t: ResourceType | "all") => (t === "all" ? list.length : list.filter((r) => r.type === t).length);

    return (
        <section className="relative overflow-hidden bg-mj-cream pb-20 pt-28 sm:pt-32 lg:pt-36">
            <HeroFrame />
            <Container className="relative">
                <Reveal className="mx-auto max-w-[760px] text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-mj-accent-line bg-white/70 px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-mj-accent-deep">
                        <Sparkles className="h-3.5 w-3.5" aria-hidden />
                        {R.eyebrow}
                    </span>
                    <h1 className="mt-5 text-balance font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.03em] text-mj-ink sm:text-[42px] lg:text-[50px]">
                        {R.title} <span className="text-mj-accent">{R.titleAccent}</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-[600px] text-[16px] leading-[1.65] text-mj-body">{R.sub}</p>
                </Reveal>

                <div role="tablist" aria-label={R.eyebrow} className="mt-10 flex flex-wrap justify-center gap-2">
                    {(["all", ...RESOURCE_TYPES] as const).map((t) => (
                        <button
                            key={t}
                            type="button"
                            role="tab"
                            aria-selected={filter === t}
                            onClick={() => setFilter(t)}
                            className={cn(
                                "rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mj-accent",
                                filter === t ? "border-mj-ink bg-mj-ink text-white" : "border-mj-line bg-white text-mj-body hover:border-mj-ink/30"
                            )}
                        >
                            {R.filters[t]} <span className={cn("ms-1 font-mono text-[11px]", filter === t ? "text-white/60" : "text-mj-muted")}>{count(t)}</span>
                        </button>
                    ))}
                </div>

                <div role="tabpanel" className="mx-auto mt-8 max-w-[1100px]">
                    {shown.length ? (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {shown.map((r) => (
                                <Card key={r.slug} r={r} />
                            ))}
                        </div>
                    ) : (
                        <div className="mx-auto max-w-[520px] rounded-2xl border border-dashed border-mj-accent-line bg-white/60 px-6 py-12 text-center">
                            <ClipboardCheck className="mx-auto h-7 w-7 text-mj-accent" aria-hidden />
                            <p className="mt-3 text-[15px] leading-relaxed text-mj-body">{R.empty}</p>
                        </div>
                    )}
                </div>

                <Cta />
            </Container>
        </section>
    );
}

function Cta() {
    const { RESOURCES: R } = useContent();
    return (
        <div className="mx-auto mt-14 flex max-w-[1100px] flex-col items-center justify-between gap-4 rounded-3xl bg-mj-ink px-6 py-8 text-center text-white sm:flex-row sm:px-10 sm:text-start">
            <div>
                <p className="font-display text-[20px] font-semibold">{R.ctaTitle}</p>
                <p className="mt-1 text-[14px] text-white/60">{R.ctaBody}</p>
            </div>
            <ScrollLink to="apply" variant="light" arrow className="shrink-0">
                {R.ctaBtn}
            </ScrollLink>
        </div>
    );
}

function VideoBlock({ url, title }: { url: string; title: string }) {
    const [play, setPlay] = useState(false);
    return (
        <div className="relative mt-8 aspect-video overflow-hidden rounded-2xl bg-mj-ink">
            {play ? (
                <iframe src={`${url}?autoplay=1&hide_owner=true&hide_share=true`} title={title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="absolute inset-0 h-full w-full border-0" />
            ) : (
                <button type="button" onClick={() => setPlay(true)} aria-label={title} className="group absolute inset-0 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mj-accent-line">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-transform group-hover:scale-105">
                        <Play className="h-6 w-6 translate-x-0.5 fill-current" aria-hidden />
                    </span>
                </button>
            )}
        </div>
    );
}

function ResourceDetailBody({ slug }: { slug: string }) {
    const { RESOURCES: R } = useContent();
    const locale = useLocale();
    const r = getResource(slug)!;
    const t = localized(r, locale);

    return (
        <article className="relative bg-mj-cream pb-20 pt-28 sm:pt-32">
            <Container>
                <div className="mx-auto max-w-[760px]">
                    <Link href="/resources" className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-mj-accent hover:text-mj-accent-deep">
                        <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
                        {R.back}
                    </Link>
                    <div className="mt-6">
                        <Cover r={r} label={R.filters[r.type]} big />
                    </div>
                    <h1 className="mt-8 text-balance font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-mj-ink sm:text-[36px]">{t.title}</h1>
                    <p className="mt-3 font-mono text-[11.5px] text-mj-muted">
                        {r.minutes} {r.type === "video" ? R.minWatch : R.minRead} · <span dir="ltr">{r.published}</span>
                    </p>
                    <p className="mt-5 text-[17px] leading-[1.65] text-mj-body">{t.excerpt}</p>

                    {r.video && <VideoBlock url={r.video.embedUrl} title={t.title} />}

                    <div className="mt-8 space-y-5 text-[16px] leading-[1.75] text-mj-ink">
                        {t.body.map((b, i) => {
                            if (b.type === "h") return <h2 key={i} className="pt-3 font-display text-[21px] font-semibold tracking-[-0.01em]">{b.text}</h2>;
                            if (b.type === "ul")
                                return (
                                    <ul key={i} className="list-disc space-y-1.5 ps-5 marker:text-mj-accent">
                                        {b.items.map((it) => (
                                            <li key={it}>{it}</li>
                                        ))}
                                    </ul>
                                );
                            if (b.type === "quote")
                                return (
                                    <blockquote key={i} className="border-s-4 border-mj-accent ps-5">
                                        <p className="font-display text-[19px] font-medium leading-snug">“{b.text}”</p>
                                        <footer className="mt-2 text-[13.5px] text-mj-muted">{b.by}</footer>
                                    </blockquote>
                                );
                            return (
                                <p key={i} className="text-mj-body">
                                    {b.text}
                                </p>
                            );
                        })}
                    </div>

                    {r.sources && (
                        <div className="mt-10 border-t border-mj-line pt-6">
                            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mj-muted">{R.sources}</p>
                            <ul dir="ltr" className="mt-3 space-y-2">
                                {r.sources.map((s) => (
                                    <li key={s.url}>
                                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[14px] text-mj-accent underline decoration-mj-accent-line underline-offset-4 hover:decoration-mj-accent">
                                            {s.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                <Cta />
            </Container>
        </article>
    );
}

export function ResourcesIndexPage({ locale }: { locale: Locale }) {
    return (
        <LandingShell locale={locale}>
            <ResourcesIndexBody />
        </LandingShell>
    );
}

export function ResourceDetailPage({ locale, slug }: { locale: Locale; slug: string }) {
    return (
        <LandingShell locale={locale}>
            <ResourceDetailBody slug={slug} />
        </LandingShell>
    );
}

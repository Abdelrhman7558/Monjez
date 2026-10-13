"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, CalendarClock, CheckCircle2, FileSpreadsheet, FileText, Play, ShieldCheck } from "lucide-react";
import { useContent } from "./content-context";
import { LANDING_CONFIG } from "./config";
import { Chip, Container, ScrollLink, WindowFrame, HeroFrame } from "./primitives";
import { VideoModal } from "./video-modal";
import { Link } from "@/navigation";

const DOCS = [
    { name: "ITT_Fitout_Tower-B.pdf", icon: FileText, meta: "62 pp" },
    { name: "BOQ_Rev02.xlsx", icon: FileSpreadsheet, meta: "418 lines" },
    { name: "Specs_Div-09_Finishes.pdf", icon: FileText, meta: "34 pp" },
    { name: "Addendum_03.pdf", icon: FileText, meta: "4 pp" },
];

const REGISTER: { item: string; value: string; source: string; flag?: boolean }[] = [
    { item: "Submission deadline", value: "14 Nov · 14:00 GST", source: "ITT §2.3" },
    { item: "Site visit", value: "28 Oct · mandatory", source: "ITT §2.6" },
    { item: "Bid bond", value: "2% of tender value", source: "ITT §4.1" },
    { item: "Ceiling spec changed", value: "Gypsum → acoustic tile", source: "Add. 03", flag: true },
    { item: "MEP drawings referenced, not issued", value: "BOQ section 7", source: "BOQ p.31", flag: true },
];

function HeroMock() {
    const reduce = useReducedMotion();
    const rowAnim = (i: number) =>
        reduce
            ? {}
            : {
                  initial: { opacity: 0, y: 6 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.5 + i * 0.12, duration: 0.4, ease: "easeOut" as const },
              };

    return (
        <WindowFrame
            dir="ltr"
            label="tenders / tower-b-fitout / register"
            right={<Chip tone="accent">Draft · awaiting review</Chip>}
        >
            <div className="grid md:grid-cols-[0.82fr_1.18fr]">
                <div className="border-b border-mj-line p-4 sm:p-5 md:border-b-0 md:border-e">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mj-muted">Tender pack received</p>
                    <ul className="mt-3 space-y-2">
                        {DOCS.map((d, i) => (
                            <motion.li
                                key={d.name}
                                {...rowAnim(i)}
                                className="flex items-center gap-3 rounded-xl border border-mj-line bg-mj-cream/50 px-3 py-2.5"
                            >
                                <d.icon className="h-4 w-4 shrink-0 text-mj-accent" aria-hidden />
                                <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-mj-ink">{d.name}</span>
                                <span className="hidden font-mono text-[11px] text-mj-muted sm:inline">{d.meta}</span>
                                <CheckCircle2 className="h-4 w-4 shrink-0 text-mj-ok" aria-label="Read" />
                            </motion.li>
                        ))}
                    </ul>
                    <p className="mt-4 text-[12.5px] leading-relaxed text-mj-muted">
                        Every document classified and read. Each finding links back to its page.
                    </p>
                </div>
                <div className="p-4 sm:p-5">
                    <div className="flex items-baseline justify-between gap-3">
                        <p className="font-display text-[15px] font-semibold text-mj-ink">Requirements register</p>
                        <span className="font-mono text-[11px] text-mj-muted">5 of 37 items</span>
                    </div>
                    <div className="mt-3 overflow-hidden rounded-xl border border-mj-line">
                        <table className="w-full text-left text-[12.5px]">
                            <thead className="bg-mj-cream/70 font-mono text-[10.5px] uppercase tracking-[0.1em] text-mj-muted">
                                <tr>
                                    <th className="px-3 py-2 font-medium">Item</th>
                                    <th className="hidden px-3 py-2 font-medium sm:table-cell">Finding</th>
                                    <th className="px-3 py-2 text-right font-medium">Source</th>
                                </tr>
                            </thead>
                            <tbody>
                                {REGISTER.map((r, i) => (
                                    <motion.tr key={r.item} {...rowAnim(i + 2)} className="border-t border-mj-line">
                                        <td className="px-3 py-2.5 align-top">
                                            <span className="flex items-start gap-1.5 font-medium text-mj-ink">
                                                {r.flag && <AlertTriangle className="mt-[2px] h-3.5 w-3.5 shrink-0 text-mj-flag" aria-label="Flagged" />}
                                                {r.item}
                                            </span>
                                            <span className="mt-0.5 block text-mj-body sm:hidden">{r.value}</span>
                                        </td>
                                        <td className="hidden px-3 py-2.5 align-top text-mj-body sm:table-cell">{r.value}</td>
                                        <td className="px-3 py-2.5 text-right align-top">
                                            <span className="whitespace-nowrap font-mono text-[11px] text-mj-accent">{r.source}</span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        <Chip tone="flag">2 flagged for the tender manager</Chip>
                        <Chip>Decision: bid manager</Chip>
                    </div>
                </div>
            </div>
        </WindowFrame>
    );
}

export function Hero() {
    const { HERO, UI } = useContent();
    const [video, setVideo] = useState<string | null>(null);
    const hasVideo = Boolean(LANDING_CONFIG.heroVideoEmbedUrl);

    return (
        <section id="top" className="relative overflow-hidden bg-mj-cream pb-14 pt-28 sm:pb-16 sm:pt-32 lg:pt-36">
            <HeroFrame />
            <Container className="relative">
                <div className="mx-auto max-w-[860px] text-center">
                    <span className="inline-flex items-center gap-2 rounded-full border border-mj-accent-line bg-white/70 px-3.5 py-1.5 text-[12.5px] font-medium text-mj-accent-deep">
                        <span className="h-1.5 w-1.5 rounded-full bg-mj-accent" aria-hidden />
                        {HERO.badge}
                    </span>
                    <h1 className="mt-5 text-balance font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.03em] text-mj-ink sm:text-[44px] lg:text-[52px]">
                        {HERO.titleLead} <span className="text-mj-accent">{HERO.titleAccent}</span>
                    </h1>
                    <p className="mx-auto mt-5 max-w-[680px] text-pretty text-[16px] leading-[1.65] text-mj-body sm:text-[17px]">{HERO.sub}</p>
                    <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                        <ScrollLink to="apply" variant="primary" size="lg" arrow className="w-full sm:w-auto">
                            {HERO.ctaPrimary}
                        </ScrollLink>
                        <Link
                            href="/system"
                            className="inline-flex h-[52px] w-full items-center justify-center rounded-full border border-mj-line bg-white px-6 text-[15.5px] font-semibold text-mj-ink transition-colors hover:border-mj-ink/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mj-accent sm:w-auto"
                        >
                            {HERO.ctaSecondary}
                        </Link>
                    </div>
                    <p className="mx-auto mt-5 flex max-w-[620px] items-start justify-center gap-2 text-[13.5px] leading-relaxed text-mj-muted">
                        <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-mj-accent" aria-hidden />
                        <span>{HERO.timeline}</span>
                    </p>
                </div>

                <div className="relative mx-auto mt-12 max-w-[980px] sm:mt-14">
                    <HeroMock />
                    {hasVideo && (
                        <button
                            type="button"
                            onClick={() => setVideo(LANDING_CONFIG.heroVideoEmbedUrl)}
                            className="absolute -bottom-5 left-1/2 inline-flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-mj-line bg-white py-2 pe-4 ps-2 text-[13.5px] font-semibold text-mj-ink shadow-lg hover:border-mj-accent-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mj-accent"
                        >
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mj-ink text-white">
                                <Play className="h-3.5 w-3.5 translate-x-px fill-current" aria-hidden />
                            </span>
                            {UI.hero.watch}
                        </button>
                    )}
                    <p className="mt-3 text-center font-mono text-[11px] text-mj-muted">{UI.hero.sample}</p>
                </div>

                <ul className="mx-auto mt-12 grid max-w-[1000px] gap-3 sm:grid-cols-3">
                    {HERO.trust.map((t) => (
                        <li key={t} className="flex gap-3 rounded-2xl border border-mj-line bg-white/70 px-4 py-4 text-[14px] leading-snug text-mj-ink">
                            <ShieldCheck className="mt-0.5 h-[18px] w-[18px] shrink-0 text-mj-accent" aria-hidden />
                            {t}
                        </li>
                    ))}
                </ul>
            </Container>
            <VideoModal src={video} title={UI.hero.videoTitle} onClose={() => setVideo(null)} />
        </section>
    );
}

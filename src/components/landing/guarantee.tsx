"use client";

import { FileCheck2, Gauge, ShieldCheck } from "lucide-react";
import { useContent } from "./content-context";
import { Container, Reveal, ScrollLink, Section } from "./primitives";

export function Guarantee() {
    const { GUARANTEE: G } = useContent();
    return (
        <Section id="guarantee" tone="white" className="border-y border-mj-line">
            <Container>
                <Reveal className="relative mx-auto max-w-[1100px] overflow-hidden rounded-[28px] border border-mj-ink bg-mj-ink px-6 py-12 text-center text-white sm:px-12 sm:py-14 lg:py-16">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,black,transparent_80%)]"
                    />
                    <div className="relative">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[12.5px] font-medium text-mj-accent-line">
                            <span className="h-1.5 w-1.5 rounded-full bg-mj-accent-line" aria-hidden />
                            {G.badge}
                        </span>
                        <h2 className="mx-auto mt-6 max-w-[880px] text-balance font-display text-[28px] font-semibold leading-[1.12] tracking-[-0.025em] sm:text-[38px] lg:text-[44px]">
                            {G.titleLead} <span className="text-mj-accent-line">{G.titleAccent}</span> {G.titleTail}
                        </h2>
                        <p className="mx-auto mt-6 max-w-[640px] text-[16.5px] leading-[1.65] text-white/70">{G.sub}</p>

                        <ul className="mx-auto mt-9 grid max-w-[880px] gap-3 text-center sm:grid-cols-3">
                            {G.tiles.map((t, i) => {
                                const TileIcon = [Gauge, FileCheck2, ShieldCheck][i] ?? ShieldCheck;
                                return (
                                    <li key={t.title} className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-6">
                                        <TileIcon className="h-6 w-6 text-mj-accent-line" aria-hidden />
                                        <p className="mt-3 font-display text-[17px] font-semibold">{t.title}</p>
                                        <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/60">{t.body}</p>
                                    </li>
                                );
                            })}
                        </ul>
                        <p className="mx-auto mt-5 max-w-[640px] text-[12.5px] leading-relaxed text-white/45">{G.condition}</p>

                        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <ScrollLink to="apply" variant="light" size="lg" arrow className="w-full sm:w-auto">
                                {G.ctaPrimary}
                            </ScrollLink>
                            <ScrollLink
                                to="knows"
                                variant="secondary"
                                size="lg"
                                className="w-full border-white/20 bg-transparent text-white hover:border-white/50 sm:w-auto"
                            >
                                {G.ctaSecondary}
                            </ScrollLink>
                        </div>
                    </div>
                </Reveal>
            </Container>
        </Section>
    );
}

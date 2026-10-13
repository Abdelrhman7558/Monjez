"use client";

import { Check } from "lucide-react";
import { useContent } from "./content-context";
import { Container, Reveal, ScrollLink, Section } from "./primitives";

export function Guarantee() {
    const { GUARANTEE: G } = useContent();
    return (
        <Section id="guarantee" tone="white" className="border-y border-mj-line">
            <Container>
                <Reveal className="relative mx-auto max-w-[1100px] overflow-hidden rounded-[28px] border border-mj-ink bg-mj-ink px-6 py-14 text-center text-white sm:px-12 sm:py-16 lg:py-20">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,black,transparent_80%)]"
                    />
                    <div className="relative">
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[12.5px] font-medium text-mj-accent-line">
                            <span className="h-1.5 w-1.5 rounded-full bg-mj-accent-line" aria-hidden />
                            {G.badge}
                        </span>
                        <h2 className="mx-auto mt-6 max-w-[880px] text-balance font-display text-[32px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[44px] lg:text-[52px]">
                            {G.titleLead} <span className="text-mj-accent-line">{G.titleAccent}</span> {G.titleTail}
                        </h2>
                        <p className="mx-auto mt-6 max-w-[640px] text-[16.5px] leading-[1.65] text-white/70">{G.sub}</p>

                        <ul className="mx-auto mt-8 flex max-w-[860px] flex-col gap-3 text-start sm:flex-row sm:justify-center sm:gap-4">
                            {G.terms.map((t) => (
                                <li key={t} className="flex flex-1 gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[14px] leading-snug text-white/85">
                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-mj-accent-line" aria-hidden />
                                    {t}
                                </li>
                            ))}
                        </ul>
                        <p className="mx-auto mt-5 max-w-[640px] text-[14px] italic leading-relaxed rtl:not-italic text-white/55">{G.honest}</p>

                        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <ScrollLink to="apply" variant="light" size="lg" arrow className="w-full sm:w-auto">
                                {G.ctaPrimary}
                            </ScrollLink>
                            <ScrollLink
                                to="system"
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

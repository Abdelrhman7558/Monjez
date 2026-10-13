"use client";

import { cn } from "@/lib/utils";
import { useContent } from "./content-context";
import { Container, Reveal, Section, SectionHead } from "./primitives";
import { Calculator } from "./calculator";

const LEGEND_STYLE = {
    verified: "bg-mj-ok",
    illustrative: "bg-mj-accent",
    potential: "bg-[#B9A27A]",
} as const;

export function Impact() {
    const { IMPACT, UI } = useContent();
    const L = UI.impact;

    return (
        <Section id="impact" tone="white" className="border-y border-mj-line">
            <Container>
                <SectionHead eyebrow={IMPACT.eyebrow} title={IMPACT.title} accent={IMPACT.titleAccent} sub={IMPACT.sub} />

                <div className="mt-12 grid gap-4 md:grid-cols-3">
                    {IMPACT.outcomes.map((o, i) => (
                        <Reveal key={o.title} delay={i * 0.05} className="flex flex-col rounded-2xl border border-mj-line bg-mj-cream/60 p-5 sm:p-6">
                            <span className="font-mono text-[12px] text-mj-accent">0{i + 1}</span>
                            <h3 className="mt-2.5 font-display text-[18px] font-semibold leading-snug tracking-[-0.01em] text-mj-ink">{o.title}</h3>
                            <p className="mt-2 flex-1 text-[14.5px] leading-[1.65] text-mj-body">{o.body}</p>
                            <p className="mt-5 flex items-center gap-2 border-t border-mj-line pt-4 text-[12.5px] text-mj-muted">
                                <span className={cn("h-2 w-2 rounded-full", LEGEND_STYLE.potential)} aria-hidden />
                                {L.potential} · {o.proof}
                            </p>
                        </Reveal>
                    ))}
                </div>

                <Calculator />

                <ul className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8">
                    {IMPACT.legend.map((l) => (
                        <li key={l.kind} className="flex items-start gap-2 text-[13px] text-mj-muted">
                            <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", LEGEND_STYLE[l.kind as keyof typeof LEGEND_STYLE])} aria-hidden />
                            <span>
                                <span className="font-medium text-mj-ink">{l.label}:</span> {l.note}
                            </span>
                        </li>
                    ))}
                </ul>
            </Container>
        </Section>
    );
}

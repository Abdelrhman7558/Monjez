"use client";

import { useState } from "react";
import { Compass, FlaskConical, PenTool, Rocket, Minus, Plus, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContent } from "./content-context";
import { Container, Reveal, Section, SectionHead } from "./primitives";

const ICONS: LucideIcon[] = [Compass, PenTool, FlaskConical, Rocket];

export function Journey() {
    const { JOURNEY, UI } = useContent();
    const [open, setOpen] = useState(0);

    return (
        <Section id="journey" tone="cream">
            <Container>
                <SectionHead align="left" eyebrow={JOURNEY.eyebrow} title={JOURNEY.title} accent={JOURNEY.titleAccent} sub={JOURNEY.sub} />

                <Reveal className="mt-14">
                <ol className="relative">
                    {JOURNEY.stages.map((s, i) => {
                        const Icon = ICONS[i];
                        const isOpen = open === i;
                        const last = i === JOURNEY.stages.length - 1;
                        return (
                                <li key={s.title} className="relative grid grid-cols-[44px_minmax(0,1fr)] gap-4 sm:gap-6">
                                    <div className="relative flex justify-center">
                                        {!last && <span aria-hidden className="absolute top-12 bottom-0 w-px bg-mj-line" />}
                                        <span
                                            className={cn(
                                                "relative z-[1] mt-1 flex h-11 w-11 items-center justify-center rounded-full border transition-colors",
                                                isOpen ? "border-mj-accent bg-mj-accent text-white" : "border-mj-line bg-white text-mj-body"
                                            )}
                                        >
                                            <Icon className="h-[18px] w-[18px]" aria-hidden />
                                        </span>
                                    </div>
                                    <div className={cn("pb-8", last && "pb-0")}>
                                        <button
                                            type="button"
                                            aria-expanded={isOpen}
                                            aria-controls={`stage-${i}`}
                                            onClick={() => setOpen(isOpen ? -1 : i)}
                                            className="flex w-full items-start justify-between gap-4 rounded-xl text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mj-accent"
                                        >
                                            <span>
                                                <span className="flex items-center gap-3 font-mono text-[11.5px] uppercase tracking-[0.14em]">
                                                    <span className="text-mj-accent">{s.when}</span>
                                                </span>
                                                <span className="mt-1.5 block font-display text-[24px] font-semibold tracking-[-0.015em] text-mj-ink sm:text-[28px]">{s.title}</span>
                                            </span>
                                            <span className="mt-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-mj-line bg-white text-mj-body">
                                                {isOpen ? <Minus className="h-4 w-4" aria-hidden /> : <Plus className="h-4 w-4" aria-hidden />}
                                            </span>
                                        </button>
                                        <p className="mt-2 max-w-[640px] text-[15.5px] leading-[1.65] text-mj-body">{s.body}</p>
                                        <div id={`stage-${i}`} hidden={!isOpen} className="max-w-[640px]">
                                            <div className="mt-4 rounded-2xl border border-mj-accent-line bg-white px-5 py-4">
                                                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mj-muted">{UI.journey.walk}</p>
                                                <p className="mt-1 text-[15px] font-semibold leading-snug text-mj-ink">{s.walk}</p>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                        );
                    })}
                </ol>
                </Reveal>

                <p className="mt-10 max-w-[760px] border-s-2 border-mj-accent-line ps-4 text-[14px] leading-relaxed text-mj-muted">{JOURNEY.caveat}</p>
            </Container>
        </Section>
    );
}

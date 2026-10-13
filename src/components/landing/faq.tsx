"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContent } from "./content-context";
import { Container, Eyebrow, Reveal, ScrollLink, Section } from "./primitives";

export function Faq() {
    const { FAQ } = useContent();
    const [open, setOpen] = useState(0);
    return (
        <Section id="faq" tone="cream">
            <Container>
                <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                    <Reveal className="lg:sticky lg:top-28 lg:self-start">
                        <Eyebrow>{FAQ.eyebrow}</Eyebrow>
                        <h2 className="mt-4 text-balance font-display text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-mj-ink sm:text-[38px] lg:text-[44px]">
                            {FAQ.title} <span className="text-mj-accent">{FAQ.titleAccent}</span>
                        </h2>
                        <p className="mt-5 max-w-[420px] text-[16px] leading-[1.65] text-mj-body">{FAQ.sub}</p>
                        <ScrollLink to="apply" variant="secondary" arrow className="mt-7">
                            {FAQ.cta}
                        </ScrollLink>
                    </Reveal>

                    <div className="border-t border-mj-line">
                        {FAQ.items.map((item, i) => {
                            const isOpen = open === i;
                            return (
                                <div key={item.q} className="border-b border-mj-line">
                                    <h3>
                                        <button
                                            type="button"
                                            id={`faq-q-${i}`}
                                            aria-expanded={isOpen}
                                            aria-controls={`faq-a-${i}`}
                                            onClick={() => setOpen(isOpen ? -1 : i)}
                                            className="flex w-full items-center justify-between gap-6 py-5 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-mj-accent sm:py-6"
                                        >
                                            <span className="font-display text-[17px] font-semibold leading-snug text-mj-ink sm:text-[19px]">{item.q}</span>
                                            <span
                                                className={cn(
                                                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors",
                                                    isOpen ? "border-mj-accent bg-mj-accent text-white" : "border-mj-line bg-white text-mj-body"
                                                )}
                                            >
                                                {isOpen ? <Minus className="h-4 w-4" aria-hidden /> : <Plus className="h-4 w-4" aria-hidden />}
                                            </span>
                                        </button>
                                    </h3>
                                    <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={!isOpen}>
                                        <p className="max-w-[640px] pb-6 text-[15.5px] leading-[1.7] text-mj-body">{item.a}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </Section>
    );
}

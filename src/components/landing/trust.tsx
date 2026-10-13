"use client";

import { AlertTriangle, Database, Link2, Plug, UserCheck, type LucideIcon } from "lucide-react";
import { useContent } from "./content-context";
import { Container, Reveal, Section, SectionHead } from "./primitives";

const ICONS: LucideIcon[] = [Link2, AlertTriangle, UserCheck, Plug, Database];

export function Trust() {
    const { TRUST } = useContent();
    return (
        <Section id="trust" tone="white" className="border-y border-mj-line">
            <Container>
                <SectionHead eyebrow={TRUST.eyebrow} title={TRUST.title} accent={TRUST.titleAccent} sub={TRUST.sub} />
                <Reveal className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {TRUST.items.map((item, i) => {
                        const Icon = ICONS[i];
                        return (
                            <div key={item.title} className="flex flex-col rounded-2xl border border-mj-line bg-mj-cream/60 p-5">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-mj-accent-line bg-white text-mj-accent">
                                    <Icon className="h-[18px] w-[18px]" aria-hidden />
                                </span>
                                <h3 className="mt-4 font-display text-[16.5px] font-semibold leading-snug text-mj-ink">{item.title}</h3>
                                <p className="mt-2 text-[14px] leading-relaxed text-mj-body">{item.body}</p>
                            </div>
                        );
                    })}
                </Reveal>
                <p className="mx-auto mt-8 max-w-[720px] text-center text-[13.5px] leading-relaxed text-mj-muted">{TRUST.note}</p>
            </Container>
        </Section>
    );
}

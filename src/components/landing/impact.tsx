"use client";

import { useId, useState } from "react";
import { Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContent } from "./content-context";
import { Container, Reveal, ScrollLink, Section, SectionHead } from "./primitives";

const LEGEND_STYLE = {
    verified: "bg-mj-ok",
    illustrative: "bg-mj-accent",
    potential: "bg-[#B9A27A]",
} as const;

function Slider({
    label,
    hint,
    value,
    min,
    max,
    step,
    format,
    onChange,
}: {
    label: string;
    hint?: string;
    value: number;
    min: number;
    max: number;
    step: number;
    format: (v: number) => string;
    onChange: (v: number) => void;
}) {
    const id = useId();
    const pct = ((value - min) / (max - min)) * 100;
    return (
        <div>
            <div className="flex items-baseline justify-between gap-4">
                <label htmlFor={id} className="text-[14px] font-medium text-mj-ink">
                    {label}
                </label>
                <output htmlFor={id} className="font-mono text-[14px] font-medium tabular-nums text-mj-accent">
                    {format(value)}
                </output>
            </div>
            {hint && <p className="mt-0.5 text-[12.5px] text-mj-muted">{hint}</p>}
            <input
                id={id}
                type="range"
                dir="ltr"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="mj-range mt-3 w-full"
                style={{ ["--pct" as string]: `${pct}%` }}
            />
        </div>
    );
}

const fmtMoney = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const fmtNum = (n: number) => Math.round(n).toLocaleString("en-US");

export function Impact() {
    const { IMPACT, UI } = useContent();
    const L = UI.impact;
    const [tenders, setTenders] = useState(8);
    const [hours, setHours] = useState(16);
    const [share, setShare] = useState(40);
    const [rate, setRate] = useState(25);

    const hoursYear = tenders * 12 * hours * (share / 100);
    const value = hoursYear * rate;
    const weeks = hoursYear / 40;

    return (
        <Section id="impact" tone="white" className="border-y border-mj-line">
            <Container>
                <SectionHead eyebrow={IMPACT.eyebrow} title={IMPACT.title} accent={IMPACT.titleAccent} sub={IMPACT.sub} />

                <div className="mt-14 grid gap-5 md:grid-cols-3">
                    {IMPACT.outcomes.map((o, i) => (
                        <Reveal key={o.title} delay={i * 0.05} className="flex flex-col rounded-2xl border border-mj-line bg-mj-cream/60 p-6">
                            <span className="font-mono text-[12px] text-mj-accent">0{i + 1}</span>
                            <h3 className="mt-3 font-display text-[20px] font-semibold leading-snug tracking-[-0.01em] text-mj-ink">{o.title}</h3>
                            <p className="mt-2.5 flex-1 text-[15px] leading-[1.65] text-mj-body">{o.body}</p>
                            <p className="mt-5 flex items-center gap-2 border-t border-mj-line pt-4 text-[12.5px] text-mj-muted">
                                <span className={cn("h-2 w-2 rounded-full", LEGEND_STYLE.potential)} aria-hidden />
                                {L.potential} · {o.proof}
                            </p>
                        </Reveal>
                    ))}
                </div>

                <Reveal className="mt-6 grid overflow-hidden rounded-3xl border border-mj-line bg-mj-cream lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="p-6 sm:p-8 lg:p-10">
                        <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-mj-accent-line bg-mj-accent-soft text-mj-accent">
                                <Calculator className="h-5 w-5" aria-hidden />
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full border border-mj-accent-line bg-white px-3 py-1 text-[12px] font-medium text-mj-accent-deep">
                                <span className={cn("h-1.5 w-1.5 rounded-full", LEGEND_STYLE.illustrative)} aria-hidden />
                                {L.illustrative}
                            </span>
                        </div>
                        <h3 className="mt-5 font-display text-[24px] font-semibold tracking-[-0.015em] text-mj-ink sm:text-[28px]">{IMPACT.calc.title}</h3>
                        <p className="mt-2 max-w-[520px] text-[15px] leading-relaxed text-mj-body">{IMPACT.calc.sub}</p>
                        <div className="mt-8 space-y-6">
                            <Slider label={L.sliders.tenders} value={tenders} min={1} max={40} step={1} format={fmtNum} onChange={setTenders} />
                            <Slider
                                label={L.sliders.hours}
                                hint={L.sliders.hoursHint}
                                value={hours}
                                min={2}
                                max={60}
                                step={1}
                                format={(v) => `${v} ${L.sliders.hourUnit}`}
                                onChange={setHours}
                            />
                            <Slider
                                label={L.sliders.share}
                                hint={L.sliders.shareHint}
                                value={share}
                                min={10}
                                max={70}
                                step={5}
                                format={(v) => `${v}%`}
                                onChange={setShare}
                            />
                            <Slider label={L.sliders.rate} value={rate} min={8} max={80} step={1} format={(v) => `$${v}`} onChange={setRate} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-between border-t border-mj-line bg-mj-ink p-6 text-white sm:p-8 lg:border-s lg:border-t-0 lg:p-10">
                        <div aria-live="polite">
                            <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-mj-accent-line">{L.resultLabel}</p>
                            <p className="mt-3 font-display text-[48px] font-semibold leading-none tracking-[-0.03em] tabular-nums sm:text-[60px]"><span dir="ltr">{fmtMoney(value)}</span></p>
                            <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                                <div>
                                    <dt className="text-[12.5px] text-white/55">{L.hoursYear}</dt>
                                    <dd className="mt-1 font-display text-[22px] font-semibold tabular-nums">{fmtNum(hoursYear)}</dd>
                                </div>
                                <div>
                                    <dt className="text-[12.5px] text-white/55">{L.equal}</dt>
                                    <dd className="mt-1 font-display text-[22px] font-semibold tabular-nums">{fmtNum(weeks)} {L.weeks}</dd>
                                </div>
                            </dl>
                            <p className="mt-6 font-mono text-[12px] text-white/50">
                                {IMPACT.calc.formula}
                                <br />
                                <span dir="ltr">= {fmtNum(tenders)} × 12 × {hours} h × {share}% × ${rate}</span>
                            </p>
                        </div>
                        <div className="mt-8">
                            <p className="text-[13.5px] leading-relaxed text-white/65">
                                {L.disclaimer}
                            </p>
                            <ScrollLink to="apply" variant="light" arrow className="mt-5">
                                {L.cta}
                            </ScrollLink>
                        </div>
                    </div>
                </Reveal>

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

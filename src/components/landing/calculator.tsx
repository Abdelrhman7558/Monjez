"use client";

import { useId, useState } from "react";
import { useContent } from "./content-context";
import { Reveal, ScrollLink } from "./primitives";

function Slider({ label, value, min, max, step, format, onChange }: { label: string; value: number; min: number; max: number; step: number; format: (v: number) => string; onChange: (v: number) => void }) {
    const id = useId();
    const pct = ((value - min) / (max - min)) * 100;
    return (
        <div>
            <div className="flex items-baseline justify-between gap-4">
                <label htmlFor={id} className="text-[13.5px] font-medium text-mj-ink">
                    {label}
                </label>
                <output htmlFor={id} dir="ltr" className="font-display text-[15px] font-semibold tabular-nums text-mj-accent">
                    {format(value)}
                </output>
            </div>
            <input
                id={id}
                type="range"
                dir="ltr"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="mj-range mt-2.5 w-full"
                style={{ ["--pct" as string]: `${pct}%` }}
            />
        </div>
    );
}

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const num = (n: number) => Math.round(n).toLocaleString("en-US");

/**
 * Illustrative estimate. One saving, shown as hours and as payroll-equivalent value (never added together):
 *   hours/month = tenders × hours per tender × share assisted
 *   value/year  = hours/month × 12 × hourly cost
 */
export function Calculator() {
    const { IMPACT, UI } = useContent();
    const L = UI.impact;
    const [tenders, setTenders] = useState(8);
    const [hours, setHours] = useState(16);
    const [share, setShare] = useState(40);
    const [rate, setRate] = useState(25);

    const hoursMonth = tenders * hours * (share / 100);
    const hoursYear = hoursMonth * 12;
    const value = hoursYear * rate;

    return (
        <Reveal className="mx-auto mt-10 grid max-w-[960px] overflow-hidden rounded-[24px] border border-mj-line bg-white shadow-[0_24px_50px_-36px_rgba(23,31,46,0.4)] md:grid-cols-2">
            <div className="p-6 sm:p-8">
                <h3 className="text-center font-display text-[19px] font-semibold tracking-[-0.01em] text-mj-ink sm:text-[21px]">{IMPACT.calc.title}</h3>
                <p className="mx-auto mt-1.5 max-w-[360px] text-center text-[13.5px] leading-relaxed text-mj-muted">{IMPACT.calc.sub}</p>
                <div className="mt-6 space-y-5">
                    <Slider label={L.sliders.tenders} value={tenders} min={1} max={40} step={1} format={num} onChange={setTenders} />
                    <Slider label={L.sliders.hours} value={hours} min={2} max={60} step={1} format={(v) => `${v} ${L.sliders.hourUnit}`} onChange={setHours} />
                    <Slider label={L.sliders.share} value={share} min={10} max={70} step={5} format={(v) => `${v}%`} onChange={setShare} />
                    <Slider label={L.sliders.rate} value={rate} min={8} max={80} step={1} format={(v) => `$${v}`} onChange={setRate} />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center bg-mj-ink px-6 py-8 text-center text-white sm:px-8" aria-live="polite">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/55">{L.resultLabel}</p>
                <p dir="ltr" className="mt-3 font-display text-[40px] font-semibold leading-none tracking-[-0.03em] tabular-nums text-mj-accent-line sm:text-[46px]">
                    {money(value)}
                </p>
                <p className="mt-3 text-[14px] text-white/80">
                    <span dir="ltr" className="font-semibold tabular-nums">{num(hoursMonth)}</span> {L.hoursMonth}
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                    <span className="rounded-full border border-white/15 px-3 py-1 text-[12px] text-white/75">{L.basedOn(share)}</span>
                    <span className="rounded-full border border-white/15 px-3 py-1 text-[12px] text-white/75">{L.estimate}</span>
                </div>
                <p dir="ltr" className="mt-5 font-mono text-[10.5px] leading-relaxed text-white/40">
                    {num(tenders)} × {hours}h × {share}% × 12 × ${rate}
                </p>
                <p className="mt-4 max-w-[340px] text-[12px] leading-relaxed text-white/50">
                    {L.noDouble} {L.disclaimer}
                </p>
                <ScrollLink to="apply" variant="light" arrow className="mt-5 h-10 px-4 text-[13.5px]">
                    {L.cta}
                </ScrollLink>
            </div>
        </Reveal>
    );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContent, useLocale } from "./content-context";
import { Container, Eyebrow, Reveal, Section } from "./primitives";

function Row({ index, text, revealed, hidden, rtl, onSeen }: { index: number; text: string; revealed: boolean; hidden: boolean; rtl: boolean; onSeen: (i: number) => void }) {
    const ref = useRef<HTMLLIElement>(null);
    const inView = useInView(ref, { margin: "0px 0px -18% 0px" });
    useEffect(() => {
        if (inView) onSeen(index);
    }, [inView, index, onSeen]);

    return (
        <li
            ref={ref}
            className={cn(
                "grid grid-cols-[34px_36px_1fr] items-start gap-3 border-b border-white/10 py-5 last:border-b-0 sm:grid-cols-[44px_40px_1fr] sm:gap-5 sm:py-6",
                "transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                hidden ? (rtl ? "translate-x-6 opacity-0" : "-translate-x-6 opacity-0") : "translate-x-0 opacity-100"
            )}
        >
            <span className="pt-2 font-mono text-[13px] text-mj-accent-line">0{index + 1}</span>
            <span
                className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full transition-[background-color,transform] duration-500 sm:h-10 sm:w-10",
                    revealed ? "scale-100 bg-mj-accent-line text-mj-ink" : "scale-90 bg-white/10 text-white/40"
                )}
            >
                <Check className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={2.5} aria-hidden />
            </span>
            <p className="pt-1 text-[16px] leading-[1.55] text-white sm:text-[18px]">{text}</p>
        </li>
    );
}

/** Five steps, revealed one after another as the visitor scrolls. */
export function Journey() {
    const { JOURNEY } = useContent();
    const rtl = useLocale() === "ar";
    const reduce = useReducedMotion();
    const count = JOURNEY.stages.length;
    // Only hide rows once hydrated, so content is visible without JS.
    const [ready, setReady] = useState(false);
    const [shown, setShown] = useState(0);
    const seen = useRef<Set<number>>(new Set());

    useEffect(() => setReady(true), []);

    const [tick, setTick] = useState(0);

    // Reveal strictly in order: row i appears only after row i-1 has, with a short beat between.
    useEffect(() => {
        if (shown >= count || !seen.current.has(shown)) return;
        const t = window.setTimeout(() => setShown((s) => s + 1), shown === 0 ? 0 : 160);
        return () => window.clearTimeout(t);
    }, [shown, count, tick]);

    const onSeen = useCallback((i: number) => {
        if (seen.current.has(i)) return;
        seen.current.add(i);
        setTick((t) => t + 1);
    }, []);

    const allVisible = reduce || !ready;

    return (
        <Section id="journey" tone="cream">
            <Container>
                <Reveal className="relative mx-auto max-w-[1000px] overflow-hidden rounded-[28px] bg-mj-ink px-5 py-10 sm:px-10 sm:py-14 lg:px-16">
                    <div aria-hidden className="pointer-events-none absolute -end-24 -top-24 h-64 w-64 rounded-full bg-[#5A47B5]/25 blur-3xl" />
                    <div className="relative text-center">
                        <Eyebrow light>{JOURNEY.eyebrow}</Eyebrow>
                        <h2 className="mt-3 text-balance font-display text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] text-white sm:text-[36px] lg:text-[42px]">
                            {JOURNEY.title} <span className="text-mj-accent-line">{JOURNEY.titleAccent}</span>
                        </h2>
                        <p className="mt-3 text-[15px] text-white/60">{JOURNEY.sub}</p>
                    </div>
                    <ol className="relative mx-auto mt-8 max-w-[780px] sm:mt-10">
                        {JOURNEY.stages.map((s, i) => (
                            <Row key={s.title} index={i} text={s.title} rtl={rtl} revealed={allVisible || i < shown} hidden={!allVisible && i >= shown} onSeen={onSeen} />
                        ))}
                    </ol>
                    <p className="relative mx-auto mt-6 max-w-[780px] border-s-2 border-white/15 ps-4 text-[13px] leading-relaxed text-white/50">{JOURNEY.caveat}</p>
                </Reveal>
            </Container>
        </Section>
    );
}

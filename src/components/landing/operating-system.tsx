"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BarChart3, ClipboardList, Calculator, FileSearch, ShieldCheck, Truck, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContent } from "./content-context";
import { Container, Section, SectionHead } from "./primitives";
import { WorkflowVisualView } from "./os-visuals";

const ICONS: Record<string, LucideIcon> = {
    tender: FileSearch,
    boq: ClipboardList,
    pricing: Calculator,
    procurement: Truck,
    coordination: Users,
    reporting: BarChart3,
};

export function OperatingSystem() {
    const { OS, UI } = useContent();
    const [active, setActive] = useState(0);
    const [mode, setMode] = useState<"today" | "with">("with");
    const tabs = useRef<(HTMLButtonElement | null)[]>([]);
    const reduce = useReducedMotion();
    const wf = OS.workflows[active];
    const count = OS.workflows.length;

    const select = (i: number) => {
        setActive(i);
        setMode("with");
    };

    const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
        let next = i;
        if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % count;
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + count) % count;
        else if (e.key === "Home") next = 0;
        else if (e.key === "End") next = count - 1;
        else return;
        e.preventDefault();
        select(next);
        tabs.current[next]?.focus();
    };

    const steps = mode === "today" ? wf.today : wf.withMonjez;

    return (
        <Section id="system" tone="cream">
            <Container>
                <SectionHead eyebrow={OS.eyebrow} title={OS.title} accent={OS.titleAccent} sub={OS.sub} />

                {/* Workflow selector: a connected flow, like the stages of a job */}
                <div className="relative mt-14">
                    <div aria-hidden className="absolute left-[8%] right-[8%] top-[27px] hidden h-px bg-mj-line lg:block" />
                    <div
                        role="tablist"
                        aria-label={UI.os.tablist}
                        className="relative -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:grid lg:grid-cols-6 lg:gap-3 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
                    >
                        {OS.workflows.map((w, i) => {
                            const Icon = ICONS[w.id];
                            const on = i === active;
                            return (
                                <button
                                    key={w.id}
                                    ref={(el) => {
                                        tabs.current[i] = el;
                                    }}
                                    role="tab"
                                    id={`wf-tab-${w.id}`}
                                    aria-selected={on}
                                    aria-controls="wf-panel"
                                    tabIndex={on ? 0 : -1}
                                    onClick={() => select(i)}
                                    onKeyDown={(e) => onKey(e, i)}
                                    className={cn(
                                        "group flex min-w-[150px] shrink-0 snap-start flex-col items-center gap-2.5 rounded-2xl px-3 pb-3 pt-0 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mj-accent lg:min-w-0",
                                        on ? "" : "hover:bg-white/60"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300",
                                            on
                                                ? "border-mj-accent bg-mj-accent text-white shadow-[0_12px_24px_-12px_rgba(77,59,155,0.7)]"
                                                : "border-mj-line bg-white text-mj-body group-hover:border-mj-accent-line"
                                        )}
                                    >
                                        <Icon className="h-[22px] w-[22px]" aria-hidden />
                                    </span>
                                    <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-mj-muted">{UI.os.workflow} {i + 1}</span>
                                    <span className={cn("text-[14px] font-semibold leading-tight", on ? "text-mj-ink" : "text-mj-body")}>{w.name}</span>
                                </button>
                            );
                        })}
                    </div>
                    <div className="mt-1 hidden justify-between font-mono text-[11px] text-mj-muted lg:flex">
                        <span>{UI.os.flowIn}</span>
                        <span>{UI.os.flowOut}</span>
                    </div>
                </div>

                <div id="wf-panel" role="tabpanel" aria-labelledby={`wf-tab-${wf.id}`} className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12 [&>*]:min-w-0">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={wf.id + mode}
                            initial={reduce ? false : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduce ? undefined : { opacity: 0, y: -6 }}
                            transition={{ duration: 0.25 }}
                        >
                            <h3 className="font-display text-[24px] font-semibold leading-snug tracking-[-0.015em] text-mj-ink sm:text-[28px]">{wf.headline}</h3>

                            <div role="group" aria-label={UI.os.compare} className="mt-6 inline-flex rounded-full border border-mj-line bg-white p-1">
                                {(
                                    [
                                        ["today", OS.labels.today],
                                        ["with", OS.labels.withMonjez],
                                    ] as const
                                ).map(([k, label]) => (
                                    <button
                                        key={k}
                                        type="button"
                                        aria-pressed={mode === k}
                                        onClick={() => setMode(k)}
                                        className={cn(
                                            "rounded-full px-4 py-2 text-[13.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mj-accent",
                                            mode === k ? (k === "with" ? "bg-mj-accent text-white" : "bg-mj-ink text-white") : "text-mj-body hover:text-mj-ink"
                                        )}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>

                            <ol className="mt-5 space-y-2.5">
                                {steps.map((s, i) => (
                                    <li key={s} className="flex gap-3">
                                        <span
                                            className={cn(
                                                "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-medium",
                                                mode === "with" ? "bg-mj-accent-soft text-mj-accent-deep" : "bg-mj-sand text-mj-muted"
                                            )}
                                        >
                                            {i + 1}
                                        </span>
                                        <span className={cn("text-[15px] leading-[1.55]", mode === "with" ? "text-mj-ink" : "text-mj-body")}>{s}</span>
                                    </li>
                                ))}
                            </ol>

                            <div className="mt-7 grid gap-5 border-t border-mj-line pt-6 sm:grid-cols-2">
                                <div>
                                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mj-muted">{OS.labels.needs}</p>
                                    <ul className="mt-2.5 space-y-1.5">
                                        {wf.needs.map((n) => (
                                            <li key={n} className="text-[14px] leading-snug text-mj-body">
                                                {n}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mj-accent">{OS.labels.produces}</p>
                                    <ul className="mt-2.5 flex flex-wrap gap-1.5">
                                        {wf.produces.map((n) => (
                                            <li key={n} className="rounded-full border border-mj-accent-line bg-mj-accent-soft px-2.5 py-1 text-[12.5px] font-medium text-mj-accent-deep">
                                                {n}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-3 rounded-2xl border border-mj-line bg-white p-4">
                                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-mj-ok" aria-hidden />
                                <div>
                                    <p className="text-[12.5px] font-semibold uppercase tracking-[0.06em] text-mj-ok">{OS.labels.human}</p>
                                    <p className="mt-1 text-[14.5px] leading-snug text-mj-ink">{wf.human}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={wf.id}
                                initial={reduce ? false : { opacity: 0, scale: 0.985 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={reduce ? undefined : { opacity: 0, scale: 0.985 }}
                                transition={{ duration: 0.25 }}
                            >
                                <WorkflowVisualView type={wf.visual} />
                            </motion.div>
                        </AnimatePresence>
                        <p className="mt-3 font-mono text-[11px] text-mj-muted">{UI.os.sample}</p>
                    </div>
                </div>

                <p className="mx-auto mt-12 max-w-[720px] text-center text-[13.5px] leading-relaxed text-mj-muted">{OS.disclaimer}</p>
            </Container>
        </Section>
    );
}

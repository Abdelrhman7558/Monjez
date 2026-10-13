"use client";

import { useState } from "react";
import { ArrowRight, BarChart3, Check, Calculator, ClipboardList, FileSearch, HardHat, LayoutGrid, Truck, UserCheck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useContent } from "./content-context";
import { Container, Reveal, Section, SectionHead } from "./primitives";

const ICONS: Record<string, LucideIcon> = {
    tender: FileSearch,
    boq: ClipboardList,
    rates: Calculator,
    procurement: Truck,
    site: HardHat,
    commercial: BarChart3,
};

export function AiTeam() {
    const { TEAM, UI } = useContent();
    const [active, setActive] = useState(0);
    const agent = TEAM.agents[active];
    const Icon = ICONS[agent.id];

    return (
        <Section id="team" tone="white" className="border-y border-mj-line">
            <Container>
                <SectionHead eyebrow={TEAM.eyebrow} title={TEAM.title} accent={TEAM.titleAccent} sub={TEAM.sub} />

                <Reveal className="mt-14">
                    {/* coordinator */}
                    <div className="mx-auto flex max-w-[420px] flex-col items-center rounded-2xl border border-mj-ink bg-mj-ink px-6 py-5 text-center text-white shadow-[0_24px_40px_-24px_rgba(23,31,46,0.6)]">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                            <LayoutGrid className="h-5 w-5 text-mj-accent-line" aria-hidden />
                        </span>
                        <p className="mt-3 font-display text-[18px] font-semibold">{TEAM.coordinator.name}</p>
                        <p className="mt-1 text-[13.5px] leading-snug text-white/65">{TEAM.coordinator.role}</p>
                    </div>
                    <div aria-hidden className="mx-auto h-8 w-px bg-mj-line" />
                    <div aria-hidden className="mx-auto hidden h-px w-[84%] bg-mj-line lg:block" />

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-0 lg:grid-cols-6">
                        {TEAM.agents.map((a, i) => {
                            const AIcon = ICONS[a.id];
                            const on = i === active;
                            return (
                                <div key={a.id} className="flex flex-col items-center">
                                    <span aria-hidden className="hidden h-6 w-px bg-mj-line lg:block" />
                                    <button
                                        type="button"
                                        aria-pressed={on}
                                        aria-controls="agent-detail"
                                        onClick={() => setActive(i)}
                                        className={cn(
                                            "flex h-full w-full flex-col items-center gap-2.5 rounded-2xl border px-3 py-4 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mj-accent",
                                            on ? "border-mj-accent bg-mj-accent-soft" : "border-mj-line bg-mj-cream/50 hover:border-mj-accent-line hover:bg-white"
                                        )}
                                    >
                                        <span className={cn("flex h-10 w-10 items-center justify-center rounded-xl border", on ? "border-mj-accent bg-mj-accent text-white" : "border-mj-line bg-white text-mj-accent")}>
                                            <AIcon className="h-[18px] w-[18px]" aria-hidden />
                                        </span>
                                        <span className="text-[14px] font-semibold leading-tight text-mj-ink">{a.name}</span>
                                        <span className="text-[12px] text-mj-muted"><span className="inline-block rtl:-scale-x-100">→</span> {a.owner}</span>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </Reveal>

                <div id="agent-detail" aria-live="polite" className="mt-6 overflow-hidden rounded-3xl border border-mj-line bg-mj-cream">
                    <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="border-b border-mj-line p-6 sm:p-8 lg:border-b-0 lg:border-e">
                            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mj-muted">{UI.team.file}</p>
                            <div className="mt-4 flex items-center gap-3">
                                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-mj-accent-line bg-white text-mj-accent">
                                    <Icon className="h-6 w-6" aria-hidden />
                                </span>
                                <div>
                                    <h3 className="font-display text-[22px] font-semibold tracking-[-0.01em] text-mj-ink">{agent.name}</h3>
                                    <p className="text-[13px] text-mj-muted">{UI.team.builtOn}</p>
                                </div>
                            </div>
                            <p className="mt-5 text-[16px] leading-relaxed text-mj-ink">{agent.role}</p>
                            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-mj-muted">{UI.team.does}</p>
                            <ul className="mt-3 space-y-2">
                                {agent.does.map((d) => (
                                    <li key={d} className="flex gap-2.5 text-[14.5px] leading-snug text-mj-body">
                                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-mj-accent" aria-hidden />
                                        {d}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-6 sm:p-8">
                            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mj-muted">{UI.team.moves}</p>
                            <ol className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-stretch">
                                {[
                                    { k: UI.team.takesIn, v: agent.takesIn, tone: "plain" },
                                    { k: UI.team.handsBack, v: agent.handsBack, tone: "accent" },
                                    { k: UI.team.approvedBy, v: agent.owner, tone: "ok" },
                                ].map((step, i) => (
                                    <li key={step.k} className="contents">
                                        {i > 0 && (
                                            <span aria-hidden className="hidden items-center justify-center text-mj-muted sm:flex">
                                                <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
                                            </span>
                                        )}
                                        <div
                                            className={cn(
                                                "rounded-2xl border p-4",
                                                step.tone === "accent" && "border-mj-accent-line bg-mj-accent-soft",
                                                step.tone === "ok" && "border-[#C3DDCD] bg-mj-ok-soft",
                                                step.tone === "plain" && "border-mj-line bg-white"
                                            )}
                                        >
                                            <p className="flex items-center gap-1.5 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-mj-muted">
                                                {step.tone === "ok" && <UserCheck className="h-3.5 w-3.5 text-mj-ok" aria-hidden />}
                                                {step.k}
                                            </p>
                                            <p className="mt-1.5 text-[14px] font-medium leading-snug text-mj-ink">{step.v}</p>
                                        </div>
                                    </li>
                                ))}
                            </ol>
                            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-mj-muted">{UI.team.worksInside}</p>
                            <ul className="mt-3 flex flex-wrap gap-1.5">
                                {TEAM.tools.map((t) => (
                                    <li key={t} className="rounded-full border border-mj-line bg-white px-3 py-1 text-[12.5px] text-mj-body">
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-2 text-center text-[13.5px] text-mj-muted sm:flex-row sm:justify-between sm:text-start">
                    <p>{TEAM.models}</p>
                    <p>{TEAM.note}</p>
                </div>
            </Container>
        </Section>
    );
}

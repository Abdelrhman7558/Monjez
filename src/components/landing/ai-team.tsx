"use client";

import { useState } from "react";
import { BarChart3, Calculator, ClipboardList, FileSearch, HardHat, Network, ShieldCheck, Truck, type LucideIcon } from "lucide-react";
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
    const mod = TEAM.agents[active];
    const Icon = ICONS[mod.id];
    const L = UI.team;

    const cells = [
        { k: L.task, v: mod.task, tone: "plain" },
        { k: L.inputs, v: mod.inputs, tone: "plain" },
        { k: L.outputs, v: mod.outputs, tone: "accent" },
        { k: L.owner, v: mod.owner, tone: "ok" },
    ] as const;

    return (
        <Section id="team" tone="white" className="border-y border-mj-line">
            <Container>
                <SectionHead eyebrow={TEAM.eyebrow} title={TEAM.title} accent={TEAM.titleAccent} sub={TEAM.sub} />

                <Reveal className="mt-14">
                    {/* neutral centre: the company's workflows, not a claimed orchestrator */}
                    <div className="mx-auto flex max-w-[520px] flex-col items-center rounded-2xl border border-mj-ink bg-mj-ink px-6 py-5 text-center text-white shadow-[0_24px_40px_-24px_rgba(23,31,46,0.6)]">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                            <Network className="h-5 w-5 text-mj-accent-line" aria-hidden />
                        </span>
                        <p className="mt-3 font-display text-[18px] font-semibold">{TEAM.coordinator.name}</p>
                        <p className="mt-1 text-[13.5px] leading-snug text-white/65">{TEAM.coordinator.role}</p>
                    </div>
                    <div aria-hidden className="mx-auto h-8 w-px bg-mj-line" />
                    <div aria-hidden className="mx-auto hidden h-px w-[84%] bg-mj-line lg:block" />

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                        {TEAM.agents.map((a, i) => {
                            const AIcon = ICONS[a.id];
                            const on = i === active;
                            return (
                                <div key={a.id} className="flex flex-col items-center">
                                    <span aria-hidden className="hidden h-6 w-px bg-mj-line lg:block" />
                                    <button
                                        type="button"
                                        aria-pressed={on}
                                        aria-controls="module-detail"
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
                                        <span className="text-[12px] leading-snug text-mj-muted">{a.owner}</span>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </Reveal>

                <div id="module-detail" aria-live="polite" className="mt-6 overflow-hidden rounded-3xl border border-mj-line bg-mj-cream">
                    <div className="flex items-center gap-3 border-b border-mj-line px-6 py-5 sm:px-8">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-mj-accent-line bg-white text-mj-accent">
                            <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <div>
                            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mj-muted">{L.file}</p>
                            <h3 className="font-display text-[21px] font-semibold tracking-[-0.01em] text-mj-ink">{mod.name}</h3>
                        </div>
                    </div>
                    <dl className="grid gap-px bg-mj-line sm:grid-cols-2 lg:grid-cols-4">
                        {cells.map((c) => (
                            <div
                                key={c.k}
                                className={cn("p-5 sm:p-6", c.tone === "accent" ? "bg-mj-accent-soft/60" : c.tone === "ok" ? "bg-mj-ok-soft/70" : "bg-white")}
                            >
                                <dt className={cn("text-[11.5px] font-semibold uppercase tracking-[0.08em]", c.tone === "ok" ? "text-mj-ok" : c.tone === "accent" ? "text-mj-accent-deep" : "text-mj-muted")}>
                                    {c.k}
                                </dt>
                                <dd className="mt-2 text-[14.5px] leading-snug text-mj-ink">{c.v}</dd>
                            </div>
                        ))}
                    </dl>
                    <div className="border-t border-mj-line px-6 py-5 sm:px-8">
                        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mj-muted">{L.worksInside}</p>
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                            {TEAM.tools.map((t) => (
                                <li key={t} className="rounded-full border border-mj-line bg-white px-3 py-1 text-[12.5px] text-mj-body">
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-5 flex gap-4 rounded-3xl border border-mj-line bg-white p-6 sm:p-7">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-mj-ok-soft text-mj-ok">
                        <ShieldCheck className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mj-ok">{L.control}</p>
                        <h3 className="mt-1 font-display text-[19px] font-semibold text-mj-ink">{TEAM.control.title}</h3>
                        <p className="mt-1.5 max-w-[760px] text-[15px] leading-relaxed text-mj-body">{TEAM.control.body}</p>
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

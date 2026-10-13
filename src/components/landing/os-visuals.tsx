"use client";

import { AlertTriangle, Check, Clock, Link2, Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WorkflowVisual } from "./content";
import { Chip, WindowFrame } from "./primitives";

// Sample data only. Every figure below is illustrative UI content, not a client result.

function Th({ children, className }: { children: React.ReactNode; className?: string }) {
    return <th className={cn("px-3 py-2 text-left font-mono text-[10.5px] font-medium uppercase tracking-[0.1em] text-mj-muted", className)}>{children}</th>;
}
function Td({ children, className }: { children: React.ReactNode; className?: string }) {
    return <td className={cn("border-t border-mj-line px-3 py-2.5 align-top text-[12.5px] text-mj-body", className)}>{children}</td>;
}
function Table({ children }: { children: React.ReactNode }) {
    return (
        <div className="overflow-x-auto rounded-xl border border-mj-line">
            <table className="w-full min-w-[420px]">{children}</table>
        </div>
    );
}
function Footer({ children }: { children: React.ReactNode }) {
    return <div className="mt-3 flex flex-wrap items-center gap-2">{children}</div>;
}

function Register() {
    const rows = [
        ["Submission deadline", "14 Nov · 14:00 GST", "ITT §2.3", false],
        ["Tender bond", "2% · valid 120 days", "ITT §4.1", false],
        ["CAR insurance", "Required at award", "Cond. §18", false],
        ["Fire-rated doors: spec vs BOQ", "FD60 vs FD30", "Spec 08-11 / BOQ 4.12", true],
        ["MEP drawings", "Referenced, not issued", "BOQ p.31", true],
    ] as const;
    return (
        <WindowFrame dir="ltr" label="tenders / tower-b / requirements-register.xlsx" right={<Chip tone="accent">37 items · 4 flagged</Chip>}>
            <div className="p-4">
                <Table>
                    <thead className="bg-mj-cream/70">
                        <tr>
                            <Th>Requirement</Th>
                            <Th>Finding</Th>
                            <Th className="text-right">Source</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(([a, b, c, flag]) => (
                            <tr key={a} className={flag ? "bg-mj-flag-soft/50" : ""}>
                                <Td className="font-medium text-mj-ink">
                                    <span className="flex items-start gap-1.5">
                                        {flag && <AlertTriangle className="mt-[2px] h-3.5 w-3.5 shrink-0 text-mj-flag" aria-label="Flagged" />}
                                        {a}
                                    </span>
                                </Td>
                                <Td>{b}</Td>
                                <Td className="text-right font-mono text-[11px] text-mj-accent">{c}</Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Footer>
                    <Chip tone="flag">Conflict: spec vs BOQ</Chip>
                    <Chip>Draft RFI prepared</Chip>
                    <Chip tone="accent">Go / no-go → Tender Manager</Chip>
                </Footer>
            </div>
        </WindowFrame>
    );
}

function Boq() {
    const rows = [
        ["4.01", "Gypsum partition, 2×12.5 mm, full height", "m²", "1,240", "ok"],
        ["4.02", "Acoustic insulation to partitions", "m²", "—", "missing"],
        ["4.03", "Gypsum partition, 2x12.5mm full ht", "m²", "1,240", "duplicate"],
        ["5.07", "Raised access floor, 600×600", "m2 → m²", "860", "normalised"],
        ["7.00", "PS: MEP coordination", "item", "PS", "ps"],
    ] as const;
    const tone = { ok: "ok", missing: "flag", duplicate: "flag", normalised: "accent", ps: "neutral" } as const;
    const label = { ok: "Clean", missing: "Missing qty", duplicate: "Possible duplicate", normalised: "Unit normalised", ps: "Provisional sum" } as const;
    return (
        <WindowFrame dir="ltr" label="boq / tower-b / BOQ_Rev02 → structured" right={<Chip tone="accent">418 lines · 23 to review</Chip>}>
            <div className="p-4">
                <Table>
                    <thead className="bg-mj-cream/70">
                        <tr>
                            <Th>Ref</Th>
                            <Th>Description</Th>
                            <Th>Unit</Th>
                            <Th className="text-right">Qty</Th>
                            <Th className="text-right">Check</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(([ref, d, u, q, s]) => (
                            <tr key={ref}>
                                <Td className="font-mono text-[11.5px]">{ref}</Td>
                                <Td className="text-mj-ink">{d}</Td>
                                <Td className="whitespace-nowrap">{u}</Td>
                                <Td className="text-right tabular-nums">{q}</Td>
                                <Td className="text-right">
                                    <Chip tone={tone[s]}>{label[s]}</Chip>
                                </Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Footer>
                    <Chip>Quantities untouched</Chip>
                    <Chip tone="accent">23 lines → QS review</Chip>
                </Footer>
            </div>
        </WindowFrame>
    );
}

function Pricing() {
    const rows = [
        ["Gypsum partition 2×12.5", "AED 118 / m²", "Rate library v4 · 2026", "ok"],
        ["Acoustic insulation", "AED 31 / m²", "Supplier quote · 06 Oct", "ok"],
        ["Raised access floor", "AED 265 / m²", "Project: Marina Office (2025)", "ok"],
        ["Feature joinery wall", "No approved rate", "Needs estimator", "flag"],
    ] as const;
    return (
        <WindowFrame dir="ltr" label="pricing / tower-b / draft-costing.xlsx" right={<Chip tone="accent">Draft · not approved</Chip>}>
            <div className="p-4">
                <Table>
                    <thead className="bg-mj-cream/70">
                        <tr>
                            <Th>Item</Th>
                            <Th className="text-right">Draft rate</Th>
                            <Th>Source</Th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(([a, b, c, s]) => (
                            <tr key={a} className={s === "flag" ? "bg-mj-flag-soft/50" : ""}>
                                <Td className="font-medium text-mj-ink">{a}</Td>
                                <Td className={cn("whitespace-nowrap text-right tabular-nums", s === "flag" && "text-mj-flag")}>{b}</Td>
                                <Td>
                                    <span className="inline-flex items-center gap-1 text-[12px]">
                                        {s === "flag" ? <AlertTriangle className="h-3.5 w-3.5 text-mj-flag" aria-hidden /> : <Link2 className="h-3.5 w-3.5 text-mj-accent" aria-hidden />}
                                        {c}
                                    </span>
                                </Td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="mt-3 grid grid-cols-3 gap-2">
                    {[
                        ["Scenario A", "Margin 12%"],
                        ["Scenario B", "Margin 15%"],
                        ["Scenario C", "Margin 18%"],
                    ].map(([a, b]) => (
                        <div key={a} className="rounded-xl border border-mj-line bg-mj-cream/50 px-3 py-2">
                            <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-mj-muted">{a}</p>
                            <p className="mt-0.5 text-[13px] font-semibold text-mj-ink">{b}</p>
                        </div>
                    ))}
                </div>
                <Footer>
                    <Chip tone="accent">Final price → Commercial Manager</Chip>
                </Footer>
            </div>
        </WindowFrame>
    );
}

function Procurement() {
    const cols = ["Supplier A", "Supplier B", "Supplier C"];
    const rows: [string, string[], number[]][] = [
        ["Total (like for like)", ["AED 412,500", "AED 389,900", "AED 431,200"], []],
        ["Lead time", ["6 weeks", "10 weeks", "5 weeks"], [1]],
        ["Payment terms", ["30% adv · 70% delivery", "50% adv", "60 days PDC"], [1]],
        ["Exclusions", ["None noted", "Installation excluded", "Transport excluded"], [1, 2]],
        ["Spec compliance", ["Compliant", "Alt. brand proposed", "Compliant"], [1]],
    ];
    return (
        <WindowFrame dir="ltr" label="procurement / ceilings / comparative-statement" right={<Chip tone="accent">3 quotes · 4 deviations</Chip>}>
            <div className="p-4">
                <Table>
                    <thead className="bg-mj-cream/70">
                        <tr>
                            <Th> </Th>
                            {cols.map((c) => (
                                <Th key={c}>{c}</Th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(([label, vals, flags]) => (
                            <tr key={label}>
                                <Td className="font-medium text-mj-ink">{label}</Td>
                                {vals.map((v, i) => (
                                    <Td key={i} className={cn(flags.includes(i) && "bg-mj-flag-soft/60 text-mj-flag")}>
                                        {v}
                                    </Td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Footer>
                    <Chip>2 clarification emails drafted</Chip>
                    <Chip tone="accent">Selection & LPO → Procurement Manager</Chip>
                </Footer>
            </div>
        </WindowFrame>
    );
}

function Tracker() {
    const items = [
        { t: "RFI-014 · Ceiling void depth at grid C", who: "Consultant", s: "Overdue 3 days", tone: "flag" as const },
        { t: "Submittal: acoustic panels, Rev B", who: "Procurement", s: "Due Thu", tone: "neutral" as const },
        { t: "Level 12 partitions, 80% framed", who: "Site · voice note 07:42", s: "PM to confirm", tone: "accent" as const },
        { t: "Fire-stopping inspection booked", who: "Civil Defence", s: "Done", tone: "ok" as const },
    ];
    return (
        <WindowFrame dir="ltr" label="projects / tower-b / daily-report · 14 Oct" right={<Chip tone="accent">From 23 messages</Chip>}>
            <div className="p-4">
                <div className="flex items-center gap-2 rounded-xl border border-mj-line bg-mj-cream/50 px-3 py-2.5 text-[12.5px] text-mj-body">
                    <Mic className="h-4 w-4 shrink-0 text-mj-accent" aria-hidden />
                    <span className="truncate">“Level 12 partitions about 80% framed, boards arrive tomorrow…”</span>
                </div>
                <ul className="mt-3 divide-y divide-mj-line overflow-hidden rounded-xl border border-mj-line">
                    {items.map((i) => (
                        <li key={i.t} className="flex items-start justify-between gap-3 bg-white px-3 py-2.5">
                            <div className="min-w-0">
                                <p className="text-[13px] font-medium text-mj-ink">{i.t}</p>
                                <p className="mt-0.5 text-[12px] text-mj-muted">{i.who}</p>
                            </div>
                            <Chip tone={i.tone} className="shrink-0">
                                {i.tone === "ok" ? <Check className="h-3 w-3" aria-hidden /> : i.tone === "flag" ? <Clock className="h-3 w-3" aria-hidden /> : null}
                                {i.s}
                            </Chip>
                        </li>
                    ))}
                </ul>
                <Footer>
                    <Chip>Reminder sent to RFI owner</Chip>
                    <Chip tone="accent">Progress % → PM confirms</Chip>
                </Footer>
            </div>
        </WindowFrame>
    );
}

function Report() {
    const kpis = [
        ["Tenders in pricing", "7", "2 due this week"],
        ["Submitted (Q4)", "11", "4 awarded · 3 pending"],
        ["Open RFIs", "18", "5 overdue"],
        ["Claims to submit", "3", "Backup 2 of 3 ready"],
    ];
    const bars = [38, 52, 46, 61, 55, 70, 64];
    return (
        <WindowFrame dir="ltr" label="reports / weekly-owner-report · w42" right={<Chip tone="accent">Auto-built · Sun 07:00</Chip>}>
            <div className="p-4">
                <div className="grid grid-cols-2 gap-2">
                    {kpis.map(([a, b, c]) => (
                        <div key={a} className="rounded-xl border border-mj-line bg-mj-cream/50 px-3 py-2.5">
                            <p className="text-[11.5px] text-mj-muted">{a}</p>
                            <p className="mt-0.5 font-display text-[22px] font-semibold text-mj-ink">{b}</p>
                            <p className="text-[11.5px] text-mj-body">{c}</p>
                        </div>
                    ))}
                </div>
                <div className="mt-3 rounded-xl border border-mj-line p-3">
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-mj-muted">Tender pipeline value · last 7 weeks</p>
                    <div className="mt-3 flex h-20 items-end gap-2" aria-hidden>
                        {bars.map((h, i) => (
                            <div key={i} className={cn("flex-1 rounded-t-md", i === bars.length - 1 ? "bg-mj-accent" : "bg-mj-accent-line/70")} style={{ height: `${h}%` }} />
                        ))}
                    </div>
                </div>
                <Footer>
                    <Chip tone="flag">5 overdue RFIs on Tower B</Chip>
                    <Chip>Sources: tender log, ERP export</Chip>
                </Footer>
            </div>
        </WindowFrame>
    );
}

export function WorkflowVisualView({ type }: { type: WorkflowVisual }) {
    switch (type) {
        case "register":
            return <Register />;
        case "boq":
            return <Boq />;
        case "pricing":
            return <Pricing />;
        case "procurement":
            return <Procurement />;
        case "tracker":
            return <Tracker />;
        case "report":
            return <Report />;
    }
}

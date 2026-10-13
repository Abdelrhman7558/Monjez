"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, BarChart3, BrainCircuit, Calculator, ClipboardList, Database, FileSearch, HardHat, Truck, UserCheck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { useContent, useLocale } from "./content-context";
import { Container, Eyebrow, Reveal } from "./primitives";

const MODULE_ICONS: Record<string, LucideIcon> = {
    tender: FileSearch,
    boq: ClipboardList,
    pricing: Calculator,
    procurement: Truck,
    projects: HardHat,
    reporting: BarChart3,
};
const SOURCE_DOTS = ["bg-sky-400", "bg-violet-400", "bg-emerald-400", "bg-amber-400", "bg-rose-400", "bg-teal-400"];

/** "A system that knows how your company works": sources → company knowledge → workflows. */
export function SystemMap({ showCta = true }: { showCta?: boolean }) {
    const { SYSTEM_MAP: M } = useContent();
    const locale = useLocale();
    const reduce = useReducedMotion();
    const [active, setActive] = useState(0);
    const [auto, setAuto] = useState(true);
    const mod = M.modules[active];
    const Icon = MODULE_ICONS[mod.id];
    const n = M.modules.length;
    const rtl = locale === "ar";

    // Cycle through workflows until the visitor picks one.
    useEffect(() => {
        if (!auto || reduce) return;
        const t = window.setInterval(() => setActive((i) => (i + 1) % n), 3800);
        return () => window.clearInterval(t);
    }, [auto, reduce, n]);

    const pick = (i: number) => {
        setAuto(false);
        setActive(i);
    };

    const usesSource = (id: string) => mod.uses.includes(id);

    // Measure the real row positions so connectors meet each source / workflow exactly.
    const bandRef = useRef<HTMLDivElement>(null);
    const srcRefs = useRef<(HTMLLIElement | null)[]>([]);
    const modRefs = useRef<(HTMLLIElement | null)[]>([]);
    const [geo, setGeo] = useState<{ w: number; h: number; src: number[]; mod: number[] } | null>(null);
    useLayoutEffect(() => {
        const band = bandRef.current;
        if (!band) return;
        const measure = () => {
            const b = band.getBoundingClientRect();
            const mid = (el: HTMLElement | null) => (el ? el.getBoundingClientRect().top + el.getBoundingClientRect().height / 2 - b.top : 0);
            setGeo({ w: b.width, h: b.height, src: srcRefs.current.map(mid), mod: modRefs.current.map(mid) });
        };
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(band);
        window.addEventListener("resize", measure);
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", measure);
        };
    }, []);
    // In RTL the sources sit on the right; mirror the connector drawing.
    const x = (v: number) => (rtl ? (geo ? geo.w - v : 0) : v);

    return (
        <section id="knows" className="relative scroll-mt-24 overflow-hidden bg-mj-ink py-16 text-white sm:py-20 lg:py-24">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,black,transparent_80%)]"
            />
            <Container className="relative">
                <Reveal className="mx-auto max-w-[720px] text-center">
                    <Eyebrow light>{M.eyebrow}</Eyebrow>
                    <h2 className="mt-4 text-balance font-display text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[34px] lg:text-[40px]">
                        {M.title} <span className="text-mj-accent-line">{M.titleAccent}</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-[620px] text-pretty text-[15.5px] leading-[1.65] text-white/65 sm:text-[16.5px]">{M.sub}</p>
                </Reveal>

                <Reveal className="mt-12 grid items-stretch gap-4 lg:grid-cols-[230px_1fr_270px] lg:gap-0">
                    {/* Your operations */}
                    <div className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <p className="flex items-center gap-2 text-[13.5px] font-semibold">
                            <Database className="h-4 w-4 text-emerald-400" aria-hidden />
                            {M.sourcesTitle}
                        </p>
                        <ul className="mt-3 grid flex-1 grid-cols-2 gap-1.5 lg:flex lg:flex-col lg:justify-between">
                            {M.sources.map((src, i) => {
                                const on = usesSource(src.id);
                                return (
                                    <li
                                        key={src.id}
                                        ref={(el) => {
                                            srcRefs.current[i] = el;
                                        }}
                                        className={cn(
                                            "flex items-center gap-2 rounded-lg border px-2.5 py-2 text-[12.5px] transition-colors duration-300",
                                            on ? "border-white/25 bg-white/10 text-white" : "border-white/[0.06] bg-white/[0.02] text-white/55"
                                        )}
                                    >
                                        <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", SOURCE_DOTS[i % SOURCE_DOTS.length], !on && "opacity-50")} aria-hidden />
                                        {src.label}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* connectors + company knowledge core */}
                    <div ref={bandRef} className="relative flex min-h-[200px] items-center justify-center lg:min-h-[360px]">
                        {geo && geo.w > 0 && (
                        <svg aria-hidden className="absolute inset-0 hidden h-full w-full lg:block" viewBox={`0 0 ${geo.w} ${geo.h}`}>
                            {M.sources.map((src, i) => {
                                const on = usesSource(src.id);
                                const sy = geo.src[i] ?? geo.h / 2;
                                const cy = geo.h / 2;
                                const cx = geo.w / 2 - 62;
                                return (
                                    <path
                                        key={src.id}
                                        d={`M ${x(0)} ${sy} C ${x(cx * 0.55)} ${sy}, ${x(cx * 0.6)} ${cy}, ${x(cx)} ${cy}`}
                                        className={cn("mj-flow", on && !reduce && "mj-flow-on")}
                                        stroke={on ? "#CFC6EC" : "rgba(255,255,255,0.14)"}
                                        strokeWidth={on ? 1.6 : 1}
                                        fill="none"
                                    />
                                );
                            })}
                            {M.modules.map((m, i) => {
                                const on = i === active;
                                const my = geo.mod[i] ?? geo.h / 2;
                                const cy = geo.h / 2;
                                const cx = geo.w / 2 + 62;
                                const end = geo.w;
                                return (
                                    <path
                                        key={m.id}
                                        d={`M ${x(cx)} ${cy} C ${x(cx + (end - cx) * 0.45)} ${cy}, ${x(cx + (end - cx) * 0.4)} ${my}, ${x(end)} ${my}`}
                                        className={cn("mj-flow", on && !reduce && "mj-flow-on")}
                                        stroke={on ? "#9C8CE0" : "rgba(255,255,255,0.14)"}
                                        strokeWidth={on ? 1.8 : 1}
                                        fill="none"
                                    />
                                );
                            })}
                        </svg>
                        )}
                        <ArrowDown className="absolute top-1 h-4 w-4 text-white/30 lg:hidden" aria-hidden />
                        <div className="relative flex flex-col items-center text-center">
                            <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#5A47B5] to-[#3C2E7D] shadow-[0_0_0_10px_rgba(156,140,224,0.08),0_0_0_22px_rgba(156,140,224,0.05)] sm:h-28 sm:w-28">
                                {!reduce && <span aria-hidden className="mj-core-pulse absolute inset-0 rounded-full" />}
                                <BrainCircuit className="h-10 w-10 text-white sm:h-11 sm:w-11" aria-hidden />
                            </span>
                            <p className="mt-4 text-[15px] font-semibold">{M.core.title}</p>
                            <p className="text-[12.5px] text-white/50">{M.core.sub}</p>
                        </div>
                        <ArrowDown className="absolute bottom-1 h-4 w-4 text-white/30 lg:hidden" aria-hidden />
                    </div>

                    {/* workflows */}
                    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1" aria-label={M.labels.hint}>
                        {M.modules.map((m, i) => {
                            const MIcon = MODULE_ICONS[m.id];
                            const on = i === active;
                            return (
                                <li
                                    key={m.id}
                                    ref={(el) => {
                                        modRefs.current[i] = el;
                                    }}
                                >
                                    <button
                                        type="button"
                                        aria-pressed={on}
                                        aria-controls="knows-detail"
                                        onClick={() => pick(i)}
                                        className={cn(
                                            "flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-start transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mj-accent-line",
                                            on ? "border-[#9C8CE0]/70 bg-white/10" : "border-white/10 bg-white/[0.03] hover:border-white/25"
                                        )}
                                    >
                                        <span className={cn("mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", on ? "bg-[#5A47B5] text-white" : "bg-white/[0.06] text-white/60")}>
                                            <MIcon className="h-4 w-4" aria-hidden />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="block text-[13.5px] font-semibold leading-tight">{m.name}</span>
                                            <span className={cn("mt-0.5 block truncate text-[11.5px]", on ? "text-mj-accent-line" : "text-white/45")}>
                                                {m.status}
                                                {on && !reduce && <span className="mj-typing" aria-hidden />}
                                            </span>
                                        </span>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </Reveal>

                {/* selected workflow detail */}
                <div id="knows-detail" aria-live="polite" className="mt-6 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6 lg:grid-cols-[1.4fr_1fr_0.8fr] lg:items-center">
                    <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5A47B5]">
                            <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <div>
                            <p className="font-display text-[17px] font-semibold">{mod.name}</p>
                            <p className="mt-1 text-[14px] leading-relaxed text-white/70">{mod.detail}</p>
                        </div>
                    </div>
                    <div>
                        <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/45">{M.labels.uses}</p>
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                            {mod.uses.map((u) => (
                                <li key={u} className="rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[12px]">
                                    {M.sources.find((s2) => s2.id === u)?.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex items-center gap-2 text-[13px]">
                        <UserCheck className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
                        <span>
                            <span className="text-white/45">{M.labels.owner}: </span>
                            <span className="font-medium">{mod.owner}</span>
                        </span>
                    </div>
                </div>

                <div className="mt-5 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-start">
                    <p className="max-w-[640px] font-mono text-[11px] leading-relaxed text-white/40">{M.note}</p>
                    {showCta && (
                        <Link
                            href="/system"
                            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[13.5px] font-semibold text-mj-ink transition-colors hover:bg-mj-accent-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mj-accent-line"
                        >
                            {M.cta}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" aria-hidden />
                        </Link>
                    )}
                </div>
            </Container>
        </section>
    );
}

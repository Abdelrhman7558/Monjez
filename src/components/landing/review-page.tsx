"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Bot,
  Check,
  FileText,
  Inbox,
  Map,
  Plug,
  Play,
  Scale,
  Table2,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { useLocale } from "./content-context";
import { ScrollLink } from "./primitives";
import { LandingShell } from "./shell";
import {
  REVIEW,
  SAMPLE_ROWS,
  VALUE,
  type FlowStep,
  type Stage,
} from "./review-content";
import type { Locale } from "./content";

const ICONS: Record<string, LucideIcon> = {
  inbox: Inbox,
  table: Table2,
  scale: Scale,
  report: FileText,
  map: Map,
  chart: BarChart3,
  bot: Bot,
  plug: Plug,
  doc: FileText,
};
const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

function useR() {
  return REVIEW[useLocale()];
}

/* ---------- small building blocks ---------- */

function Block({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 border-b border-mj-line py-14 last:border-b-0 sm:py-16",
        className,
      )}
    >
      {children}
    </section>
  );
}

function Head({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <>
      <p className="font-mono text-[11.5px] font-medium uppercase tracking-[0.16em] text-mj-muted">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-balance font-display text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-mj-ink sm:text-[32px]">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 text-[16px] leading-[1.7] text-mj-body">{sub}</p>
      )}
    </>
  );
}

function Callout({
  children,
  tone = "accent",
}: {
  children: ReactNode;
  tone?: "accent" | "ink";
}) {
  return (
    <div
      className={cn(
        "mt-8 rounded-e-2xl border-s-4 p-5 text-[15px] leading-[1.7] sm:p-6",
        tone === "accent"
          ? "border-mj-accent bg-mj-accent-soft text-mj-ink"
          : "border-mj-ink bg-mj-sand text-mj-ink",
      )}
    >
      {children}
    </div>
  );
}

function StatGrid({
  stats,
  tone = "plain",
}: {
  stats: { value: string; label: string }[];
  tone?: "plain" | "ok";
}) {
  return (
    <div
      className={cn(
        "grid gap-3",
        stats.length >= 6
          ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
          : "grid-cols-2 lg:grid-cols-4",
      )}
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className={cn(
            "rounded-2xl border p-4 text-center",
            tone === "ok"
              ? "border-mj-ok/25 bg-mj-ok-soft"
              : "border-mj-line bg-white",
          )}
        >
          <p
            className={cn(
              "font-display text-[24px] font-semibold tracking-[-0.02em] sm:text-[26px]",
              tone === "ok" ? "text-mj-ok" : "text-mj-accent",
            )}
          >
            {s.value}
          </p>
          <p className="mt-1.5 text-[12.5px] leading-snug text-mj-muted">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

/** Horizontal step flow; scrolls sideways on narrow screens instead of squashing. */
function Flow({
  label,
  steps,
  tone,
}: {
  label: string;
  steps: FlowStep[];
  tone: "flag" | "ok";
}) {
  const flag = tone === "flag";
  return (
    <div
      className={cn(
        "mt-6 overflow-hidden rounded-2xl border",
        flag ? "border-mj-flag/25" : "border-mj-ok/25",
      )}
    >
      <p
        className={cn(
          "flex items-center gap-2 px-5 py-3 font-mono text-[11.5px] font-semibold uppercase tracking-[0.12em]",
          flag ? "bg-mj-flag-soft text-mj-flag" : "bg-mj-ok-soft text-mj-ok",
        )}
      >
        {flag ? (
          <AlertTriangle className="h-3.5 w-3.5" aria-hidden />
        ) : (
          <Check className="h-3.5 w-3.5" aria-hidden />
        )}
        {label}
      </p>
      <div className="overflow-x-auto bg-white px-4 py-5">
        <ol className="flex min-w-max items-center gap-2">
          {steps.map((s, i) => (
            <li key={s.title} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-[128px] rounded-xl border px-2.5 py-2 text-center",
                  flag
                    ? "border-mj-flag/20 bg-mj-flag-soft/50"
                    : "border-mj-ok/20 bg-mj-ok-soft/60",
                )}
              >
                <p className="text-[12px] font-semibold leading-snug text-mj-ink">
                  {s.title}
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-mj-body">
                  {s.tool}
                </p>
                {s.note && (
                  <p
                    className={cn(
                      "mt-1 text-[10.5px] font-medium",
                      flag ? "text-mj-flag" : "text-mj-ok",
                    )}
                  >
                    {s.note}
                  </p>
                )}
              </div>
              {i < steps.length - 1 && (
                <span className="text-mj-muted rtl:-scale-x-100" aria-hidden>
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function StageBlock({ s }: { s: Stage }) {
  const R = useR();
  return (
    <Block id={s.id}>
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mj-accent font-display text-[22px] font-semibold text-white">
          {s.n}
        </span>
        <div>
          <p className="font-mono text-[11.5px] font-medium uppercase tracking-[0.16em] text-mj-muted">
            {R.stageWord} {s.n}
          </p>
          <h2 className="font-display text-[26px] font-semibold tracking-[-0.02em] text-mj-ink sm:text-[30px]">
            {s.name}
          </h2>
        </div>
      </div>
      <p className="mt-5 text-[16px] leading-[1.7] text-mj-body">{s.intro}</p>
      <p className="mt-4 flex flex-wrap items-center gap-2 text-[14px] font-semibold text-mj-ink">
        {R.interviewed}
        {s.roles.map((r) => (
          <span
            key={r}
            className="rounded-full bg-mj-sand px-3 py-1 text-[12.5px] font-medium text-mj-body"
          >
            {r}
          </span>
        ))}
      </p>
      <Flow label={s.currentLabel} steps={s.current} tone="flag" />
      <div className="mt-5 rounded-2xl border border-mj-flag/20 border-t-4 border-t-mj-flag bg-mj-flag-soft/40 p-5 sm:p-6">
        <p className="font-display text-[17px] font-semibold text-mj-flag">
          {R.painsTitle}
        </p>
        <ul className="mt-3 divide-y divide-mj-flag/15">
          {s.pains.map((p) => (
            <li
              key={p.text}
              className="flex gap-3 py-3 text-[14.5px] leading-relaxed text-mj-ink"
            >
              <AlertTriangle
                className="mt-1 h-4 w-4 shrink-0 text-mj-flag"
                aria-hidden
              />
              <span>
                {p.text}{" "}
                <span className="ms-1 whitespace-nowrap text-[12.5px] font-semibold text-mj-flag">
                  {p.tag}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <Flow label={s.proposedLabel} steps={s.proposed} tone="ok" />
      <div className="mt-5">
        <StatGrid stats={s.stats} tone="ok" />
      </div>
    </Block>
  );
}

/* ---------- sidebar ---------- */

function useToc() {
  const R = useR();
  return [
    {
      group: R.groups.overview,
      items: [
        { id: "intro", label: R.nav.intro },
        { id: "what", label: R.nav.what },
        { id: "lifecycle", label: R.nav.lifecycle },
      ],
    },
    {
      group: R.groups.stages,
      items: R.stages.map((s) => ({ id: s.id, label: `${s.n}. ${s.name}` })),
    },
    {
      group: R.groups.analysis,
      items: [
        { id: "value", label: R.nav.value },
        { id: "agents", label: R.nav.agents },
      ],
    },
    {
      group: R.groups.process,
      items: [
        { id: "need", label: R.nav.need },
        { id: "timeline", label: R.nav.timeline },
        { id: "deliverables", label: R.nav.deliverables },
        { id: "rollout", label: R.nav.rollout },
        { id: "investment", label: R.nav.investment },
      ],
    },
    {
      group: R.groups.why,
      items: [
        { id: "proof", label: R.nav.proof },
        { id: "guarantee", label: R.nav.guarantee },
        { id: "start", label: R.nav.start },
      ],
    },
  ];
}

function useActive(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join(",");
  useEffect(() => {
    const els = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
  return active;
}

function Sidebar({ mobile }: { mobile?: boolean }) {
  const R = useR();
  const toc = useToc();
  const active = useActive(toc.flatMap((g) => g.items.map((i) => i.id)));
  if (!mobile)
    return (
      <nav
        aria-label={R.toc}
        className="sticky top-[84px] hidden h-[calc(100vh-84px)] w-[248px] shrink-0 overflow-y-auto border-e border-mj-line pb-10 lg:block"
      >
        <p className="px-5 pb-2 pt-6 font-display text-[16px] font-semibold text-mj-ink">
          {R.hero.eyebrow}
        </p>
        {toc.map((g) => (
          <div key={g.group} className="mt-5">
            <p className="px-5 font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-mj-muted">
              {g.group}
            </p>
            <ul className="mt-1.5">
              {g.items.map((it) => (
                <li key={it.id}>
                  <a
                    href={`#${it.id}`}
                    aria-current={active === it.id ? "location" : undefined}
                    className={cn(
                      "block border-s-[3px] px-5 py-2 text-[14px] transition-colors",
                      active === it.id
                        ? "border-mj-accent bg-mj-accent-soft font-semibold text-mj-accent-deep"
                        : "border-transparent text-mj-body hover:bg-mj-sand hover:text-mj-ink",
                    )}
                  >
                    {it.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    );
  return (
    <nav
      aria-label={R.toc}
      className="sticky top-[72px] z-30 overflow-x-auto border-b border-mj-line bg-mj-cream/95 px-4 py-2.5 backdrop-blur sm:px-6 lg:hidden"
    >
      <ul className="flex min-w-max gap-2">
        {toc
          .flatMap((g) => g.items)
          .map((it) => (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                className={cn(
                  "block rounded-full border px-3 py-1.5 text-[12.5px] font-medium",
                  active === it.id
                    ? "border-mj-ink bg-mj-ink text-white"
                    : "border-mj-line bg-white text-mj-body",
                )}
              >
                {it.label}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
}

/* ---------- page ---------- */

function Body() {
  const R = useR();
  const totalToday = SAMPLE_ROWS.reduce((a, r) => a + r.today, 0);
  const totalReleased = SAMPLE_ROWS.reduce((a, r) => a + r.released, 0);

  return (
    <div className="pt-[68px]">
      <div className="mt-3 bg-mj-ink px-4 py-3 text-center text-[14px] text-white/85">
        {R.banner}{" "}
        <ScrollLink
          to="apply"
          className="ms-2 inline-block rounded-full bg-mj-accent-line px-3.5 py-1 text-[13px] font-semibold text-mj-ink hover:bg-white"
        >
          {R.bannerCta}
        </ScrollLink>
      </div>

      <Sidebar mobile />
      <div className="mx-auto flex w-full max-w-[1280px] items-start">
        <Sidebar />
        <div className="min-w-0 flex-1 px-4 sm:px-6 lg:px-12">
          <div className="mx-auto max-w-[820px]">
            {/* Intro */}
            <Block id="intro" className="pt-10 sm:pt-14">
              <p className="font-mono text-[11.5px] font-medium uppercase tracking-[0.16em] text-mj-muted">
                {R.hero.eyebrow}
              </p>
              <h1 className="mt-3 text-balance font-display text-[34px] font-semibold leading-[1.06] tracking-[-0.03em] text-mj-ink sm:text-[46px]">
                {R.hero.title}{" "}
                <span className="text-mj-accent">{R.hero.titleAccent}</span>
              </h1>
              <p className="mt-5 text-[17px] leading-[1.7] text-mj-body">
                {R.hero.sub}
              </p>
              <Callout>
                <strong>{R.hero.exampleLead}</strong> {R.hero.example}
              </Callout>
              <div className="mt-8">
                <StatGrid stats={R.hero.stats} />
              </div>
              <p className="mt-4 text-[13.5px] italic text-mj-muted">
                {R.hero.sampleNote}
              </p>
            </Block>

            {/* What */}
            <Block id="what">
              <Head eyebrow={R.what.eyebrow} title={R.what.title} />
              <p className="mt-4 text-[16px] leading-[1.7] text-mj-body">
                {R.what.p1}
              </p>
              <p className="mt-4 text-[16px] leading-[1.7] text-mj-body">
                {R.what.p2}
              </p>
              <div className="mt-8 grid gap-8 sm:grid-cols-2">
                {[
                  [R.what.analyseTitle, R.what.analyse],
                  [R.what.receiveTitle, R.what.receive],
                ].map(([t, list]) => (
                  <div key={t as string}>
                    <h3 className="font-display text-[18px] font-semibold text-mj-ink">
                      {t as string}
                    </h3>
                    <ul className="mt-3 list-disc space-y-2 ps-5 text-[15px] leading-relaxed text-mj-body marker:text-mj-accent">
                      {(list as string[]).map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Callout tone="ink">{R.what.note}</Callout>
            </Block>

            {/* Lifecycle */}
            <Block id="lifecycle">
              <Head
                eyebrow={R.lifecycle.eyebrow}
                title={R.lifecycle.title}
                sub={R.lifecycle.sub}
              />
              <div className="mt-8 grid overflow-hidden rounded-2xl border border-mj-line bg-white sm:grid-cols-5">
                {R.lifecycle.items.map((it, i) => (
                  <a
                    key={it.name}
                    href={`#stage-${i + 1}`}
                    className="border-b border-mj-line p-4 text-center transition-colors last:border-b-0 hover:bg-mj-accent-soft sm:border-b-0 sm:border-e sm:last:border-e-0"
                  >
                    <span className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-mj-accent text-[14px] font-semibold text-white">
                      {i + 1}
                    </span>
                    <p className="mt-3 text-[14.5px] font-semibold text-mj-ink">
                      {it.name}
                    </p>
                    <p className="mt-1.5 text-[12.5px] leading-snug text-mj-muted">
                      {it.body}
                    </p>
                  </a>
                ))}
              </div>
              <p className="mt-6 text-[15px] text-mj-muted">
                {R.lifecycle.footer}
              </p>
            </Block>

            {R.stages.map((s) => (
              <StageBlock key={s.id} s={s} />
            ))}

            {/* Value */}
            <Block id="value">
              <Head
                eyebrow={R.value.eyebrow}
                title={R.value.title}
                sub={R.value.sub}
              />
              <div className="mt-6 rounded-2xl border border-mj-accent-line bg-mj-accent-soft px-5 py-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mj-accent-deep">
                  {R.value.formulaLabel}
                </p>
                <p className="mt-1 font-display text-[16px] font-semibold text-mj-ink">
                  {R.value.formula}
                </p>
              </div>
              <div className="mt-6 overflow-x-auto rounded-2xl border border-mj-line bg-white">
                <table className="w-full min-w-[560px] text-start text-[14px]">
                  <thead className="bg-mj-sand text-mj-ink">
                    <tr>
                      {[
                        R.value.cols.activity,
                        R.value.cols.today,
                        R.value.cols.released,
                        R.value.cols.value,
                      ].map((c) => (
                        <th
                          key={c}
                          className="px-4 py-3 text-start font-semibold"
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {SAMPLE_ROWS.map((r, i) => (
                      <tr key={i} className="border-t border-mj-line">
                        <td className="px-4 py-3 text-mj-ink">
                          {R.stages[i].name}
                        </td>
                        <td className="px-4 py-3 text-mj-body">{r.today}</td>
                        <td className="px-4 py-3 font-semibold text-mj-ok">
                          {r.released}
                        </td>
                        <td
                          className="px-4 py-3 font-mono text-mj-ink"
                          dir="ltr"
                        >
                          {usd(VALUE(r.released))}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t-2 border-mj-ink/20 bg-mj-sand/60 font-semibold">
                      <td className="px-4 py-3">{R.value.total}</td>
                      <td className="px-4 py-3">{totalToday}</td>
                      <td className="px-4 py-3 text-mj-ok">{totalReleased}</td>
                      <td className="px-4 py-3 font-mono" dir="ltr">
                        {usd(VALUE(totalReleased))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-[13.5px] italic text-mj-muted">
                {R.value.assumptions}
              </p>
              <p className="mt-2 text-[13.5px] text-mj-muted">
                {R.value.notCounted}
              </p>
              <div className="mt-8 rounded-3xl bg-mj-ink p-6 text-white sm:p-8">
                <p className="font-display text-[19px] font-semibold text-mj-accent-line sm:text-[21px]">
                  {R.value.summaryTitle}
                </p>
                <div className="mt-6 grid gap-6 sm:grid-cols-3">
                  {R.value.summary.map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="font-display text-[34px] font-semibold tracking-[-0.02em] text-white">
                        {s.value}
                      </p>
                      <p className="mt-1 text-[13.5px] text-white/60">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 border-t border-white/10 pt-5 text-[14px] leading-relaxed text-white/70">
                  {R.value.threshold}
                </p>
              </div>
            </Block>

            {/* Agents */}
            <Block id="agents">
              <Head
                eyebrow={R.agents.eyebrow}
                title={R.agents.title}
                sub={R.agents.sub}
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {R.agents.items.map((a) => {
                  const Icon = ICONS[a.icon];
                  return (
                    <div
                      key={a.name}
                      className="rounded-2xl border border-mj-line bg-white p-5"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mj-accent-soft text-mj-accent">
                        <Icon className="h-5 w-5" aria-hidden />
                      </span>
                      <h3 className="mt-4 font-display text-[17px] font-semibold text-mj-ink">
                        {a.name}
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-mj-body">
                        {a.body}
                      </p>
                      <p className="mt-4 flex flex-wrap gap-2 text-[12.5px] font-medium">
                        <span className="rounded-full bg-mj-ok-soft px-2.5 py-1 text-mj-ok">
                          {R.agents.savesLabel} {a.hrs}
                        </span>
                        <span className="rounded-full bg-mj-sand px-2.5 py-1 text-mj-body">
                          {R.agents.fromLabel} {a.phase}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
              <Callout>{R.agents.note}</Callout>
            </Block>

            {/* Need */}
            <Block id="need">
              <Head
                eyebrow={R.need.eyebrow}
                title={R.need.title}
                sub={R.need.sub}
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  [R.need.asyncTitle, R.need.async],
                  [R.need.liveTitle, R.need.live],
                ].map(([t, list]) => (
                  <div
                    key={t as string}
                    className="rounded-2xl border border-mj-line bg-white p-5"
                  >
                    <h3 className="font-display text-[17px] font-semibold text-mj-ink">
                      {t as string}
                    </h3>
                    <ul className="mt-3 space-y-2.5">
                      {(list as string[]).map((x) => (
                        <li
                          key={x}
                          className="flex gap-2.5 text-[14px] leading-relaxed text-mj-body"
                        >
                          <Check
                            className="mt-1 h-4 w-4 shrink-0 text-mj-accent"
                            aria-hidden
                          />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Callout tone="ink">{R.need.dontNeed}</Callout>
            </Block>

            {/* Timeline */}
            <Block id="timeline">
              <Head
                eyebrow={R.timeline.eyebrow}
                title={R.timeline.title}
                sub={R.timeline.sub}
              />
              <ol className="mt-8 space-y-4">
                {R.timeline.steps.map((s) => (
                  <li
                    key={s.tag}
                    className="flex gap-4 rounded-2xl border border-mj-line bg-white p-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mj-ink font-mono text-[14px] font-semibold text-white">
                      {s.tag}
                    </span>
                    <div>
                      <h3 className="font-display text-[17px] font-semibold text-mj-ink">
                        {s.title}
                      </h3>
                      <p className="mt-1.5 text-[14.5px] leading-relaxed text-mj-body">
                        {s.body}
                      </p>
                      <p className="mt-3 flex flex-wrap gap-2">
                        {s.items.map((x) => (
                          <span
                            key={x}
                            className="rounded-full bg-mj-accent-soft px-2.5 py-1 text-[12px] font-medium text-mj-accent-deep"
                          >
                            {x}
                          </span>
                        ))}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Block>

            {/* Deliverables */}
            <Block id="deliverables">
              <Head
                eyebrow={R.deliverables.eyebrow}
                title={R.deliverables.title}
                sub={R.deliverables.sub}
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {R.deliverables.items.map((d, i) => {
                  const Icon = ICONS[d.icon];
                  return (
                    <div
                      key={d.name}
                      className={cn(
                        "rounded-2xl border border-mj-line bg-white p-5",
                        i === R.deliverables.items.length - 1 &&
                          "sm:col-span-2",
                      )}
                    >
                      <Icon className="h-6 w-6 text-mj-accent" aria-hidden />
                      <h3 className="mt-3 font-display text-[17px] font-semibold text-mj-ink">
                        {d.name}
                      </h3>
                      <p className="mt-2 text-[14px] leading-relaxed text-mj-body">
                        {d.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Block>

            {/* Rollout */}
            <Block id="rollout">
              <Head
                eyebrow={R.rollout.eyebrow}
                title={R.rollout.title}
                sub={R.rollout.sub}
              />
              <Callout>{R.rollout.firstAgentNote}</Callout>
              <div className="mt-6 space-y-4">
                {R.rollout.phases.map((p) => (
                  <div
                    key={p.tag}
                    className="overflow-hidden rounded-2xl border border-mj-line bg-white"
                  >
                    <div className="flex flex-wrap items-center gap-3 border-b border-mj-line bg-mj-sand/60 px-5 py-3">
                      <span className="rounded-lg bg-mj-accent px-2 py-1 font-mono text-[12px] font-semibold text-white">
                        {p.tag}
                      </span>
                      <h3 className="font-display text-[17px] font-semibold text-mj-ink">
                        {p.name}
                      </h3>
                      <span className="text-[13px] text-mj-muted">
                        · {p.when}
                      </span>
                    </div>
                    <div className="p-5">
                      <p className="text-[14.5px] leading-relaxed text-mj-body">
                        {p.body}
                      </p>
                      <div className="mt-4 rounded-xl border border-mj-ok/25 bg-mj-ok-soft p-4">
                        <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-mj-ok">
                          ✓ {R.rollout.deliverableLabel}
                        </p>
                        <p className="mt-1 text-[14px] text-mj-ink">
                          {p.deliverable}
                        </p>
                      </div>
                      <p className="mt-4 flex flex-wrap gap-2">
                        {p.chips.map((c) => (
                          <span
                            key={c}
                            className="rounded-full border border-mj-accent-line bg-mj-accent-soft px-2.5 py-1 text-[12px] font-medium text-mj-accent-deep"
                          >
                            {c}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Block>

            {/* Investment */}
            <Block id="investment">
              <Head
                eyebrow={R.investment.eyebrow}
                title={R.investment.title}
                sub={R.investment.sub}
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {R.investment.cards.map((c, i) => (
                  <div
                    key={c.tag}
                    className={cn(
                      "flex flex-col rounded-2xl border p-6",
                      i === 0
                        ? "border-mj-accent bg-white shadow-[0_24px_40px_-30px_rgba(77,59,155,0.6)]"
                        : "border-mj-line bg-white",
                    )}
                  >
                    <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-mj-muted">
                      {c.tag}
                    </p>
                    <p className="mt-2 font-display text-[34px] font-semibold tracking-[-0.02em] text-mj-ink">
                      {c.price}
                    </p>
                    <p className="text-[13.5px] text-mj-muted">{c.unit}</p>
                    <ul className="mt-5 flex-1 space-y-2">
                      {c.items.map((x) => (
                        <li
                          key={x}
                          className="flex gap-2 text-[14px] text-mj-body"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-mj-accent"
                            aria-hidden
                          />
                          {x}
                        </li>
                      ))}
                    </ul>
                    <ScrollLink
                      to="apply"
                      variant={i === 0 ? "primary" : "secondary"}
                      arrow
                      className="mt-6 w-full"
                    >
                      {c.cta}
                    </ScrollLink>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[14px] text-mj-muted">
                {R.investment.note}
              </p>
            </Block>

            {/* Proof */}
            <Block id="proof">
              <Head
                eyebrow={R.proof.eyebrow}
                title={R.proof.title}
                sub={R.proof.sub}
              />
              <div className="mt-8 overflow-hidden rounded-2xl border border-mj-line bg-white">
                <div className="p-6">
                  <h3 className="font-display text-[19px] font-semibold text-mj-ink">
                    {R.proof.caseTitle}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-mj-body">
                    {R.proof.caseBody}
                  </p>
                  <blockquote className="mt-5 border-s-4 border-mj-accent ps-4">
                    <p className="font-display text-[17px] font-medium leading-snug text-mj-ink">
                      “{R.proof.quote}”
                    </p>
                    <footer className="mt-2 text-[13px] text-mj-muted">
                      {R.proof.quoteBy}
                    </footer>
                  </blockquote>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href="/resources/atlantis-b2b-marketplace"
                      className="inline-flex items-center gap-1.5 rounded-full bg-mj-ink px-4 py-2 text-[14px] font-semibold text-white hover:bg-mj-accent-deep"
                    >
                      {R.proof.caseCta}
                      <ArrowLeft
                        className="h-4 w-4 ltr:rotate-180"
                        aria-hidden
                      />
                    </Link>
                    <Link
                      href="/resources/client-story-ali-atlantis"
                      className="inline-flex items-center gap-1.5 rounded-full border border-mj-line px-4 py-2 text-[14px] font-semibold text-mj-ink hover:border-mj-ink/40"
                    >
                      <Play className="h-4 w-4" aria-hidden />
                      {R.proof.videoCta}
                    </Link>
                  </div>
                </div>
              </div>
            </Block>

            {/* Guarantee */}
            <Block id="guarantee">
              <Head eyebrow={R.guarantee.eyebrow} title={R.guarantee.title} />
              <div className="mt-6 rounded-3xl bg-mj-ink p-6 text-white sm:p-8">
                <p className="font-display text-[19px] font-medium leading-snug sm:text-[21px]">
                  {R.guarantee.promise}
                </p>
                <p className="mt-4 text-[14.5px] leading-relaxed text-white/70">
                  {R.guarantee.why}
                </p>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[
                  [R.guarantee.termsTitle, R.guarantee.terms],
                  [R.guarantee.needTitle, R.guarantee.need],
                ].map(([t, list]) => (
                  <div
                    key={t as string}
                    className="rounded-2xl border border-mj-line bg-white p-5"
                  >
                    <h3 className="font-display text-[17px] font-semibold text-mj-ink">
                      {t as string}
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {(list as string[]).map((x) => (
                        <li
                          key={x}
                          className="flex gap-2 text-[14px] text-mj-body"
                        >
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-mj-accent"
                            aria-hidden
                          />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-[13.5px] leading-relaxed text-mj-muted">
                {R.guarantee.scope}
              </p>
            </Block>

            {/* Start */}
            <Block id="start">
              <div className="rounded-3xl bg-mj-accent p-7 text-center text-white sm:p-10">
                <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-white/70">
                  {R.start.eyebrow}
                </p>
                <h2 className="mt-3 font-display text-[28px] font-semibold tracking-[-0.02em] sm:text-[36px]">
                  {R.start.title}
                </h2>
                <p className="mx-auto mt-3 max-w-[560px] text-[15.5px] leading-relaxed text-white/80">
                  {R.start.sub}
                </p>
                <ScrollLink
                  to="apply"
                  variant="light"
                  size="lg"
                  arrow
                  className="mt-7"
                >
                  {R.start.cta}
                </ScrollLink>
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/15 pt-6 sm:grid-cols-4">
                  {R.start.facts.map((f) => (
                    <div key={f.label}>
                      <p className="font-display text-[22px] font-semibold">
                        {f.value}
                      </p>
                      <p className="text-[12.5px] text-white/65">{f.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Block>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReviewPage({ locale }: { locale: Locale }) {
  return (
    <LandingShell locale={locale}>
      <Body />
    </LandingShell>
  );
}

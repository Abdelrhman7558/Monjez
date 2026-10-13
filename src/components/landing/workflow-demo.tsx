"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Bot, Check, Hash, RotateCcw, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "./content-context";
import { Container } from "./primitives";
import { DEMO, type DemoWorkflow } from "./demo-content";

/** Scripted Slack-style exchange. Plays once per workflow when visible: message → typing → reply. */
function SlackDemo({ w }: { w: DemoWorkflow }) {
  const L = DEMO[useLocale()].labels;
  const D = DEMO[useLocale()];
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reduce = useReducedMotion();
  const played = useRef<Set<string>>(new Set());
  const [stage, setStage] = useState(0); // 0 nothing, 1 user, 2 typing, 3 reply
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce || (played.current.has(w.id) && run === 0)) {
      setStage(3);
      return;
    }
    played.current.add(w.id);
    setStage(0);
    const t = [
      window.setTimeout(() => setStage(1), 250),
      window.setTimeout(() => setStage(2), 1100),
      window.setTimeout(() => setStage(3), 2600),
    ];
    return () => t.forEach(window.clearTimeout);
  }, [inView, reduce, w.id, run]);

  const c = w.chat;
  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#120F24] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <p
          className="flex items-center gap-1.5 font-mono text-[13px] text-white/80"
          dir="ltr"
        >
          <Hash className="h-3.5 w-3.5 text-white/40" aria-hidden />
          {c.channel.replace("#", "")}{" "}
          <span className="text-white/35">/ slack</span>
        </p>
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          className="flex items-center gap-1 rounded-full border border-white/15 px-2.5 py-1 text-[11.5px] text-white/60 hover:text-white"
        >
          <RotateCcw className="h-3 w-3" aria-hidden />
          {L.replay}
        </button>
      </div>
      <div
        className="min-h-[380px] space-y-5 px-4 py-5 sm:px-5"
        aria-live="polite"
      >
        <div
          className={cn(
            "flex gap-3 transition-all duration-500",
            stage >= 1
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0",
          )}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white/70">
            <User className="h-4 w-4" aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-[13.5px] font-semibold text-white">
              {c.user.name}{" "}
              <span className="ms-1 text-[12px] font-normal text-white/40">
                {c.user.role}
              </span>
            </p>
            <p className="mt-1 text-[14.5px] leading-relaxed text-white/85">
              {c.user.text}
            </p>
          </div>
        </div>

        {stage === 2 && (
          <p className="flex items-center gap-2 ps-12 text-[12.5px] text-white/45">
            <span className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="mj-typing-dot h-1.5 w-1.5 rounded-full bg-mj-accent-line"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </span>
            {L.typing}
          </p>
        )}

        <div
          className={cn(
            "flex gap-3 transition-all duration-500",
            stage >= 3
              ? "translate-y-0 opacity-100"
              : "pointer-events-none h-0 translate-y-2 overflow-hidden opacity-0",
          )}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mj-accent text-white">
            <Bot className="h-4 w-4" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-2 text-[13.5px] font-semibold text-white">
              Monjez{" "}
              <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-mj-accent-line">
                {L.app}
              </span>
            </p>
            <p className="mt-1 text-[14.5px] leading-relaxed text-white/85">
              {c.bot.text}
            </p>
            <div className="mt-3 rounded-xl border border-mj-accent/60 bg-mj-accent/15 p-4">
              <p className="flex items-center gap-2 text-[13.5px] font-semibold text-white">
                <Check className="h-4 w-4 text-mj-accent-line" aria-hidden />
                {c.bot.cardTitle}
              </p>
              <dl className="mt-3 divide-y divide-white/10">
                {c.bot.rows.map(([k, v]) => (
                  <div
                    key={k}
                    className="grid grid-cols-[110px_1fr] gap-3 py-2 text-[13px]"
                  >
                    <dt className="text-white/45">{k}</dt>
                    <dd className="text-white/90">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-3 text-[12px] text-white/45">
              {L.source}: {c.bot.source}
            </p>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-mj-accent-line/40 px-3 py-1.5 text-[12.5px] text-mj-accent-line">
              {L.next}: {c.bot.next}
            </p>
          </div>
        </div>
      </div>
      <p className="border-t border-white/10 px-4 py-2.5 font-mono text-[10.5px] text-white/40">
        {D.demoLabel}
      </p>
    </div>
  );
}

export function WorkflowDemo() {
  const D = DEMO[useLocale()];
  const L = D.labels;
  const [active, setActive] = useState(D.workflows[0].id);
  const w = D.workflows.find((x) => x.id === active) ?? D.workflows[0];

  return (
    <section
      id="demo"
      className="relative scroll-mt-24 bg-[#0E0B1E] py-16 text-white sm:py-20 lg:py-24"
    >
      <Container>
        <div className="mx-auto max-w-[720px] text-center">
          <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-mj-accent-line">
            {D.eyebrow}
          </p>
          <h2 className="mt-3 text-balance font-display text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[36px] lg:text-[40px]">
            {D.title}{" "}
            <span className="text-mj-accent-line">{D.titleAccent}</span>
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-white/60">
            {D.sub}
          </p>
        </div>

        <div
          role="tablist"
          aria-label={D.eyebrow}
          className="-mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
        >
          {D.workflows.map((x) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={active === x.id}
              onClick={() => setActive(x.id)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors",
                active === x.id
                  ? "border-mj-accent-line bg-mj-accent-line text-mj-ink"
                  : "border-white/15 text-white/70 hover:border-white/40 hover:text-white",
              )}
            >
              {x.tab}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10"
        >
          <div className="min-w-0">
            <h3 className="font-display text-[22px] font-semibold tracking-[-0.01em] sm:text-[26px]">
              {w.title}
            </h3>
            <p className="mt-2 text-[15px] text-white/60">{w.sub}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#E8A285]">
                  {L.before}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {w.before.map((b) => (
                    <li
                      key={b}
                      className="flex gap-2 text-[13.5px] leading-snug text-white/70"
                    >
                      <X
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#E8A285]"
                        aria-hidden
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-mj-accent/50 bg-mj-accent/10 p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mj-accent-line">
                  {L.after}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {w.after.map((a) => (
                    <li
                      key={a.text}
                      className="flex gap-2 text-[13.5px] leading-snug text-white/90"
                    >
                      <span
                        className={cn(
                          "mt-px h-fit shrink-0 self-start rounded px-1.5 py-0.5 font-mono text-[9.5px] font-semibold",
                          a.kind === "ai"
                            ? "bg-mj-accent-line text-mj-ink"
                            : "bg-[#BFE3CF] text-[#1F4A35]",
                        )}
                      >
                        {a.kind === "ai" ? L.ai : "✓"}
                      </span>
                      <span>
                        {a.text}
                        {a.kind === "human" && (
                          <span className="ms-1 text-[11.5px] text-[#BFE3CF]">
                            · {L.human}
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
              {L.flow}
            </p>
            <ol className="mt-3 grid gap-2 sm:grid-cols-4">
              {(
                [
                  [L.input, w.flow.input],
                  [L.process, w.flow.process],
                  [L.output, w.flow.output],
                  [L.reviewer, w.flow.reviewer],
                ] as const
              ).map(([k, v], i) => (
                <li
                  key={k}
                  className="relative rounded-xl border border-white/10 bg-white/[0.04] p-3"
                >
                  <p className="text-[11px] font-semibold text-mj-accent-line">
                    {i + 1}. {k}
                  </p>
                  <p className="mt-1 text-[12.5px] leading-snug text-white/80">
                    {v}
                  </p>
                  {i < 3 && (
                    <ArrowRight
                      className="absolute -end-2.5 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-white/30 rtl:-scale-x-100 sm:block"
                      aria-hidden
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>

          <div className="min-w-0">
            <p className="font-display text-[16px] font-semibold">{L.slack}</p>
            <p className="mb-4 mt-1 text-[13.5px] text-white/55">
              {L.slackSub}
            </p>
            <SlackDemo key={w.id} w={w} />
          </div>
        </div>
      </Container>
    </section>
  );
}

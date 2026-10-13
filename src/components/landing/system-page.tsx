"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Container, Eyebrow, Reveal, ScrollLink, Section } from "./primitives";
import { useContent } from "./content-context";
import { SystemMap } from "./system-map";
import { OperatingSystem } from "./operating-system";
import { WorkflowDemo } from "./workflow-demo";
import { LandingShell } from "./shell";
import type { Locale } from "./content";

/** Scattered work items orbit, then gather into one core. Loops only while visible. */
function Converge() {
  const { SYSTEM_PAGE: P } = useContent();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-80px" });
  const reduce = useReducedMotion();
  const [gathered, setGathered] = useState(false);

  useEffect(() => {
    if (!inView || reduce) return;
    // Scattered for ~3.4s, gathered for ~1.6s, so the chips are readable most of the time.
    let id = 0;
    const loop = (g: boolean) => {
      setGathered(g);
      id = window.setTimeout(() => loop(!g), g ? 1600 : 3400);
    };
    id = window.setTimeout(() => loop(true), 3400);
    return () => window.clearTimeout(id);
  }, [inView, reduce]);

  const chips = P.chips;
  return (
    <div
      ref={ref}
      className="relative mx-auto aspect-[16/9] w-full max-w-[760px] sm:aspect-[2/1]"
      aria-hidden
    >
      <div className="absolute inset-0 rounded-[28px] border border-mj-line bg-white/60 [background-image:linear-gradient(to_right,#ECE6DB_1px,transparent_1px),linear-gradient(to_bottom,#ECE6DB_1px,transparent_1px)] [background-size:36px_36px]" />
      {chips.map((c, i) => {
        const angle = (i / chips.length) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(angle) * 36;
        const py = Math.sin(angle) * 34;
        const out = !gathered || reduce;
        return (
          <motion.span
            key={c}
            className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-full border border-mj-line bg-white px-2.5 py-1 text-[11px] font-medium text-mj-ink shadow-sm sm:px-3 sm:text-[12.5px]"
            initial={false}
            animate={{
              left: out ? `${50 + px}%` : "50%",
              top: out ? `${50 + py}%` : "50%",
              opacity: out ? 1 : 0,
              scale: out ? 1 : 0.5,
              x: "-50%",
              y: "-50%",
            }}
            transition={{
              duration: 0.9,
              ease: [0.65, 0, 0.35, 1],
              delay: out ? i * 0.04 : (chips.length - i) * 0.03,
            }}
          >
            <span className="me-1.5 inline-block h-1.5 w-1.5 rounded-full bg-mj-accent align-middle" />
            {c}
          </motion.span>
        );
      })}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
        <motion.span
          className="relative flex h-20 w-20 items-center justify-center rounded-full bg-mj-ink shadow-[0_0_0_10px_rgba(77,59,155,0.08),0_0_0_22px_rgba(77,59,155,0.05)] sm:h-24 sm:w-24"
          animate={reduce ? undefined : { scale: gathered ? 1.08 : 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/brand/monjez-mark-light.webp"
            alt=""
            width={445}
            height={356}
            sizes="48px"
            className="h-8 w-auto sm:h-9"
          />
        </motion.span>
        <span className="mt-2 hidden max-w-[180px] text-center text-[11.5px] font-medium text-mj-muted sm:block">
          {P.core}
        </span>
      </div>
    </div>
  );
}

export function SystemPage({ locale }: { locale: Locale }) {
  return (
    <LandingShell locale={locale}>
      <SystemPageBody />
    </LandingShell>
  );
}

function SystemPageBody() {
  const { SYSTEM_PAGE: P } = useContent();
  return (
    <>
      <section className="relative overflow-hidden bg-mj-cream pb-14 pt-28 sm:pt-32 lg:pb-16 lg:pt-36">
        <Container>
          <Reveal className="mx-auto max-w-[720px] text-center">
            <Eyebrow>{P.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-balance font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.03em] text-mj-ink sm:text-[42px] lg:text-[50px]">
              {P.title} <span className="text-mj-accent">{P.titleAccent}</span>
            </h1>
            <p className="mx-auto mt-5 max-w-[620px] text-pretty text-[16px] leading-[1.65] text-mj-body sm:text-[17px]">
              {P.sub}
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ScrollLink
                to="apply"
                variant="primary"
                size="lg"
                arrow
                className="w-full sm:w-auto"
              >
                {P.ctaPrimary}
              </ScrollLink>
              <ScrollLink
                to="demo"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {P.ctaSecondary}
              </ScrollLink>
            </div>
          </Reveal>
          <Reveal className="mt-12">
            <Converge />
          </Reveal>
        </Container>
      </section>

      <WorkflowDemo />
      <SystemMap showCta={false} />
      <OperatingSystem />

      <Section tone="white" className="border-t border-mj-line">
        <Container>
          <Reveal className="mx-auto flex max-w-[860px] flex-col items-center gap-6 rounded-3xl border border-mj-line bg-mj-cream p-7 text-center sm:p-10">
            <h2 className="font-display text-[24px] font-semibold tracking-[-0.015em] text-mj-ink sm:text-[30px]">
              {P.accessTitle}
            </h2>
            <p className="max-w-[620px] text-[15.5px] leading-relaxed text-mj-body">
              {P.accessBody}
            </p>
            <ScrollLink to="apply" variant="primary" size="lg" arrow>
              {P.ctaPrimary}
            </ScrollLink>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

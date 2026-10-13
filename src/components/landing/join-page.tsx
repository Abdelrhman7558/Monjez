"use client";

import { Mail } from "lucide-react";
import { useLocale } from "./content-context";
import { LANDING_CONFIG } from "./config";
import { Container, Reveal } from "./primitives";
import { LandingShell } from "./shell";
import type { Locale } from "./content";
import { JOIN } from "./join-content";

function Body() {
  const J = JOIN[useLocale()];
  return (
    <section className="bg-mj-cream pb-24 pt-32 sm:pt-40">
      <Container>
        <Reveal className="mx-auto max-w-[680px] text-center">
          <p className="font-mono text-[11.5px] uppercase tracking-[0.16em] text-mj-accent">
            {J.eyebrow}
          </p>
          <h1 className="mt-4 text-balance font-display text-[32px] font-semibold leading-[1.1] tracking-[-0.03em] text-mj-ink sm:text-[44px]">
            {J.title}
          </h1>
          <p className="mx-auto mt-5 max-w-[540px] text-[16.5px] leading-[1.65] text-mj-body">
            {J.sub}
          </p>
          <div className="mx-auto mt-10 max-w-[520px] rounded-2xl border border-dashed border-mj-accent-line bg-white/70 p-6">
            <p className="text-[15px] leading-relaxed text-mj-body">{J.note}</p>
            <a
              href={`mailto:${LANDING_CONFIG.contactEmail}`}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-mj-ink px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-mj-accent-deep"
            >
              <Mail className="h-4 w-4" aria-hidden />
              {J.cta}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export function JoinPage({ locale }: { locale: Locale }) {
  return (
    <LandingShell locale={locale}>
      <Body />
    </LandingShell>
  );
}

"use client";

import { Link } from "@/navigation";
import { useLocale } from "./content-context";
import { Container, Reveal, Section, SectionHead } from "./primitives";
import { REVIEW } from "./review-content";

/** Home-page entry card: a framed preview of /review that opens the full page. */
export function ReviewEntry() {
  const R = REVIEW[useLocale()];
  const toc = [
    R.nav.intro,
    R.nav.what,
    R.nav.lifecycle,
    ...R.stages.map((s) => `${s.n}. ${s.name}`),
    R.nav.value,
    R.nav.agents,
    R.nav.need,
    R.nav.timeline,
  ];
  return (
    <Section id="review" tone="white">
      <Container>
        <SectionHead
          eyebrow={R.entry.eyebrow}
          title={R.entry.title}
          sub={R.entry.sub}
        />
        <Reveal className="mx-auto mt-10 max-w-[1040px]">
          <Link
            href="/review"
            aria-label={R.entry.cta}
            className="group relative block overflow-hidden rounded-[24px] border border-mj-line bg-white shadow-[0_40px_80px_-50px_rgba(23,31,46,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mj-accent"
          >
            <div
              className="flex items-center gap-3 border-b border-mj-line bg-mj-sand px-4 py-3"
              dir="ltr"
            >
              <span className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-[#E0675A]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E3B341]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#5DB46A]" />
              </span>
              <span className="truncate font-mono text-[12px] text-mj-muted">
                monjez-agency.com / review
              </span>
            </div>
            <div className="flex h-[360px] sm:h-[440px]" aria-hidden>
              <div className="hidden w-[210px] shrink-0 border-e border-mj-line px-4 py-5 sm:block">
                <p className="font-display text-[13px] font-semibold text-mj-ink">
                  {R.hero.eyebrow}
                </p>
                <ul className="mt-4 space-y-1">
                  {toc.map((t, i) => (
                    <li
                      key={t}
                      className={
                        i === 0
                          ? "rounded-md border-s-2 border-mj-accent bg-mj-accent-soft px-2 py-1 text-[11.5px] font-semibold text-mj-accent-deep"
                          : "px-2 py-1 text-[11.5px] text-mj-body"
                      }
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="min-w-0 flex-1 px-6 py-8 sm:px-10">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-mj-muted">
                  {R.hero.eyebrow}
                </p>
                <p className="mt-2 font-display text-[24px] font-semibold leading-tight tracking-[-0.02em] text-mj-ink sm:text-[32px]">
                  {R.hero.title}{" "}
                  <span className="text-mj-accent">{R.hero.titleAccent}</span>
                </p>
                <p className="mt-3 line-clamp-3 max-w-[560px] text-[13.5px] leading-relaxed text-mj-body">
                  {R.hero.sub}
                </p>
                <div className="mt-5 max-w-[560px] rounded-e-xl border-s-4 border-mj-accent bg-mj-accent-soft p-3 text-[12px] leading-relaxed text-mj-ink">
                  <strong>{R.hero.exampleLead}</strong>{" "}
                  <span className="line-clamp-2 inline">{R.hero.example}</span>
                </div>
                <div className="mt-5 grid max-w-[620px] grid-cols-3 gap-2 sm:grid-cols-6">
                  {R.hero.stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-lg border border-mj-line p-2 text-center"
                    >
                      <p className="font-display text-[15px] font-semibold text-mj-accent">
                        {s.value}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-[9.5px] leading-tight text-mj-muted">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 top-[45px] flex items-center justify-center bg-mj-ink/25 transition-colors duration-300 group-hover:bg-mj-ink/40">
              <span className="rounded-full bg-mj-ink px-7 py-3.5 font-display text-[17px] font-semibold text-white shadow-[0_20px_40px_-15px_rgba(23,31,46,0.6)] transition-transform duration-300 group-hover:scale-105">
                {R.entry.cta}
              </span>
            </div>
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}

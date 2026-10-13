"use client";

import { Check, X } from "lucide-react";
import { useContent, useLocale } from "./content-context";
import { GCC_MAP } from "./gcc-map-data";
import {
  Container,
  Reveal,
  ScrollLink,
  Section,
  SectionHead,
} from "./primitives";

// Each GCC state shows its name only, with a small glowing globe underneath.
type Place = {
  name: string;
  x: number;
  y: number;
  size: number;
  globe?: [number, number];
  neighbour?: boolean;
};

const PLACES: Place[] = [
  { name: "SAUDI ARABIA", x: 396.6, y: 300, size: 19, globe: [396.6, 326] },
  { name: "U.A.E.", x: 742, y: 300, size: 13, globe: [742, 320] },
  { name: "OMAN", x: 848.3, y: 405, size: 14, globe: [848.3, 425] },
  { name: "KUWAIT", x: 533.8, y: 62, size: 12, globe: [533.8, 78.7] },
  { name: "BAHRAIN", x: 617.2, y: 177, size: 12, globe: [617.2, 193.1] },
  { name: "QATAR", x: 656.2, y: 218, size: 12, globe: [656.2, 233.9] },
  { name: "YEMEN", x: 482.8, y: 600, size: 12, neighbour: true },
];

function Globe({ cx, cy, delay }: { cx: number; cy: number; delay: number }) {
  return (
    <g aria-hidden>
      <circle
        cx={cx}
        cy={cy}
        r="11"
        fill="#4D3B9B"
        className="mj-globe-glow"
        style={{ animationDelay: `${delay}s` }}
      />
      <circle
        cx={cx}
        cy={cy}
        r="6.5"
        fill="#4D3B9B"
        stroke="#fff"
        strokeWidth="1.4"
      />
      <ellipse
        cx={cx}
        cy={cy}
        rx="2.6"
        ry="6.5"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.75"
        strokeWidth="0.8"
      />
      <line
        x1={cx - 6.5}
        y1={cy}
        x2={cx + 6.5}
        y2={cy}
        stroke="#fff"
        strokeOpacity="0.75"
        strokeWidth="0.8"
      />
    </g>
  );
}

function GccMap() {
  const M = GCC_MAP;
  const { GCC, UI } = useContent();
  const ar = useLocale() === "ar";
  const country = (n: string) => UI.gcc.countries[n] ?? n;
  return (
    <figure
      dir={ar ? "rtl" : "ltr"}
      className="relative overflow-hidden rounded-3xl border border-mj-line bg-white shadow-[0_30px_60px_-40px_rgba(23,31,46,0.35)]"
    >
      <svg
        viewBox={M.viewBox}
        role="img"
        aria-labelledby="gcc-map-title"
        className="mj-map block h-auto w-full"
        style={{ direction: "ltr" }}
      >
        <title id="gcc-map-title">{UI.gcc.mapTitle}</title>
        <defs>
          <linearGradient id="mjLand" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E9E4F7" />
            <stop offset="100%" stopColor="#D9D0F1" />
          </linearGradient>
          <pattern
            id="mjDots"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.2" fill="#E6E0D4" />
          </pattern>
        </defs>
        <rect width={M.W} height={M.H} fill="#FBFAF7" />
        <rect width={M.W} height={M.H} fill="url(#mjDots)" />
        <g>
          {M.neighbors.map((n) => (
            <path
              key={n.iso}
              d={n.d}
              fill="#F1EDE5"
              stroke="#DCD4C6"
              strokeWidth="0.9"
              strokeLinejoin="round"
            />
          ))}
        </g>
        <g>
          {M.gcc.map((g) => (
            <path
              key={g.iso}
              d={g.d}
              fill="url(#mjLand)"
              stroke="#4D3B9B"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          ))}
          <circle
            cx={M.bahrain.cx}
            cy={M.bahrain.cy}
            r="3.6"
            fill="url(#mjLand)"
            stroke="#4D3B9B"
            strokeWidth="1.5"
          />
        </g>

        {PLACES.map((c, i) => (
          <g key={c.name}>
            <text
              x={c.x}
              y={c.y}
              textAnchor="middle"
              className="mj-map-country"
              style={{ fontSize: c.size }}
              fill={c.neighbour ? "#9A9488" : "#3C2E7D"}
              letterSpacing={ar ? 0 : 2}
            >
              {country(c.name)}
            </text>
            {c.globe && (
              <Globe cx={c.globe[0]} cy={c.globe[1]} delay={i * 0.4} />
            )}
          </g>
        ))}
      </svg>
      {/* On phones the SVG text would shrink below a readable size, so the places are listed here instead. */}
      <ul
        className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-mj-line px-4 py-4 sm:hidden"
        aria-hidden
      >
        {UI.gcc.legend.map(([cn]) => (
          <li
            key={cn}
            className="flex items-center gap-2 text-[13px] font-semibold text-mj-ink"
          >
            <span className="h-2 w-2 shrink-0 rounded-full bg-mj-accent" />
            {cn}
          </li>
        ))}
      </ul>
      <figcaption className="flex items-center gap-2 border-t border-mj-line px-4 py-3 font-mono text-[11.5px] text-mj-accent-deep sm:absolute sm:bottom-5 sm:start-5 sm:rounded-full sm:border sm:bg-white/90 sm:px-3 sm:py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-mj-accent" aria-hidden />
        {GCC.mapCaption}
      </figcaption>
    </figure>
  );
}

export function Gcc() {
  const { GCC, UI } = useContent();
  return (
    <Section id="gcc" tone="sand">
      <Container>
        <SectionHead
          eyebrow={GCC.eyebrow}
          title={GCC.title}
          accent={GCC.titleAccent}
          sub={GCC.sub}
        />
        <Reveal className="mx-auto mt-12 max-w-[1100px]">
          <GccMap />
        </Reveal>

        <div className="mx-auto mt-5 grid max-w-[1100px] gap-5 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="rounded-3xl border border-mj-line bg-white p-6 sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mj-accent">
              {GCC.difference}
            </p>
            <div className="mt-5 hidden grid-cols-2 gap-6 border-b border-mj-line pb-3 text-[12px] font-semibold uppercase tracking-[0.06em] text-mj-muted sm:grid">
              <span>{UI.gcc.monjez}</span>
              <span>{UI.gcc.alternative}</span>
            </div>
            <ul className="divide-y divide-mj-line">
              {GCC.compare.map(([yes, no]) => (
                <li
                  key={yes}
                  className="grid gap-2 py-3.5 sm:grid-cols-2 sm:gap-6"
                >
                  <span className="flex gap-2.5 text-[14.5px] leading-snug text-mj-ink">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-mj-accent"
                      aria-hidden
                    />
                    <span>
                      <span className="sr-only">{UI.gcc.monjez}: </span>
                      {yes}
                    </span>
                  </span>
                  <span className="flex gap-2.5 text-[14px] leading-snug text-mj-muted">
                    <X
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#B4AC9E]"
                      aria-hidden
                    />
                    <span>
                      <span className="sr-only">{UI.gcc.alternative}: </span>
                      {no}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal
            delay={0.05}
            className="flex flex-col rounded-3xl border border-mj-ink bg-mj-ink p-6 text-white sm:p-8"
          >
            <h3 className="font-display text-[22px] font-semibold tracking-[-0.01em]">
              {GCC.fitTitle}
            </h3>
            <p className="mt-1.5 text-[14px] text-white/60">{GCC.fitSub}</p>
            <ul className="mt-5 flex-1 space-y-3">
              {GCC.fit.map((f) => (
                <li
                  key={f}
                  className="flex gap-3 text-[14.5px] leading-snug text-white/90"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-mj-accent-line/60 text-mj-accent-line">
                    <Check className="h-3 w-3" aria-hidden />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <ScrollLink
              to="apply"
              variant="light"
              arrow
              className="mt-7 w-full sm:w-auto sm:self-start"
            >
              {GCC.fitBtn}
            </ScrollLink>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

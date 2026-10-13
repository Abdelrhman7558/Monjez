"use client";

import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "@/navigation";
import { useContent } from "./content-context";
import { LANDING_CONFIG } from "./config";
import type { NavLink } from "./content";
import { Logo, NavItem } from "./nav";
import { Container, ScrollLink } from "./primitives";

export function LandingFooter() {
  const { FOOTER, NAV_LINKS, UI } = useContent();
  const F = UI.footer;
  const social = [
    { href: LANDING_CONFIG.social.linkedin, label: "LinkedIn", Icon: Linkedin },
    {
      href: LANDING_CONFIG.social.instagram,
      label: "Instagram",
      Icon: Instagram,
    },
    { href: LANDING_CONFIG.social.facebook, label: "Facebook", Icon: Facebook },
  ];
  const pick = (keys: string[]) =>
    keys
      .map((k) => NAV_LINKS.find((l) => l.href === k || l.id === k))
      .filter((l): l is NavLink => Boolean(l));
  const groups = [
    {
      title: F.explore,
      links: [
        ...pick(["/system", "/review", "team"]),
        { label: UI.nav.resources, href: "/resources" },
      ],
    },
    {
      title: F.company,
      links: [
        ...pick(["guarantee", "faq"]),
        { label: F.results, id: "results" },
        ...pick(["/join"]),
        { label: F.apply, id: "apply" },
      ],
    },
  ];
  return (
    <footer className="bg-mj-ink text-white">
      <Container className="py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr] lg:gap-10">
          <div>
            <Logo light />
            <p className="mt-5 max-w-[340px] text-[14.5px] leading-relaxed text-white/60">
              {FOOTER.tagline}
            </p>
            <div className="mt-6 flex gap-2">
              {social.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={F.socialOn(label)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mj-accent-line"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
              <a
                href={`mailto:${LANDING_CONFIG.contactEmail}`}
                aria-label={F.email}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mj-accent-line"
              >
                <Mail className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
          {groups.map((g) => (
            <nav key={g.title} aria-label={g.title}>
              <p className="text-[13px] font-semibold text-white">{g.title}</p>
              <ul className="mt-4 space-y-3">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <NavItem
                      link={l}
                      className="text-[14px] text-white/60 transition-colors hover:text-white"
                      activeClassName="text-white"
                    />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <p className="text-[13px] font-semibold text-white">
              {FOOTER.ctaTitle}
            </p>
            <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">
              {FOOTER.ctaText}
            </p>
            <ScrollLink to="apply" variant="light" arrow className="mt-5">
              {FOOTER.ctaBtn}
            </ScrollLink>
          </div>
        </div>
        <div className="mt-14 flex flex-col-reverse gap-4 border-t border-white/10 pt-6 text-[12.5px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <span dir="ltr">{new Date().getFullYear()}</span> {F.rights}
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link href="/privacy" className="hover:text-white">
                {F.privacy}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                {F.terms}
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <span
                className="h-1 w-1 rounded-full bg-mj-accent-line"
                aria-hidden
              />
              {F.region}
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}

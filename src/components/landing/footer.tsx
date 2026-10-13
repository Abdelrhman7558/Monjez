"use client";

import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import { Link } from "@/navigation";
import { useContent } from "./content-context";
import { LANDING_CONFIG } from "./config";
import { Logo, NavItem } from "./nav";
import { Container, ScrollLink } from "./primitives";

export function LandingFooter() {
    const { FOOTER, NAV_LINKS, UI } = useContent();
    const F = UI.footer;
    const social = [
        { href: LANDING_CONFIG.social.linkedin, label: "LinkedIn", Icon: Linkedin },
        { href: LANDING_CONFIG.social.instagram, label: "Instagram", Icon: Instagram },
        { href: LANDING_CONFIG.social.facebook, label: "Facebook", Icon: Facebook },
    ];
    return (
        <footer className="bg-mj-ink text-white">
            <Container className="py-16">
                <div className="grid gap-12 md:grid-cols-[1.3fr_0.7fr_1fr]">
                    <div>
                        <Logo light />
                        <p className="mt-5 max-w-[340px] text-[14.5px] leading-relaxed text-white/60">{FOOTER.tagline}</p>
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
                    <nav aria-label={F.nav}>
                        <p className="text-[13px] font-semibold text-white">{F.explore}</p>
                        <ul className="mt-4 space-y-3">
                            {[...NAV_LINKS, { label: UI.nav.resources, href: "/resources" }, { label: F.results, id: "results" }, { label: F.apply, id: "apply" }].map((l) => (
                                <li key={l.label}>
                                    <NavItem link={l} className="text-[14px] text-white/60 transition-colors hover:text-white" activeClassName="text-white" />
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div>
                        <p className="text-[13px] font-semibold text-white">{FOOTER.ctaTitle}</p>
                        <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">{FOOTER.ctaText}</p>
                        <ScrollLink to="apply" variant="light" arrow className="mt-5">
                            {FOOTER.ctaBtn}
                        </ScrollLink>
                    </div>
                </div>
                <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[12.5px] text-white/45 sm:flex-row sm:justify-between">
                    <p>© {new Date().getFullYear()} {F.rights}</p>
                    <p className="flex gap-4">
                        <Link href="/privacy" className="hover:text-white">
                            {F.privacy}
                        </Link>
                        <Link href="/terms" className="hover:text-white">
                            {F.terms}
                        </Link>
                        <span>{F.region}</span>
                    </p>
                </div>
            </Container>
        </footer>
    );
}

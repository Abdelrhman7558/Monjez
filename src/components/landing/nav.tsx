"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Globe, Menu, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, usePathname } from "@/navigation";
import { useContent } from "./content-context";
import { ScrollLink } from "./primitives";
import type { NavLink } from "./content";

export function Logo({ light, className }: { light?: boolean; className?: string }) {
    return (
        <span dir="ltr" className={cn("flex items-center gap-2.5", className)}>
            <Image
                src={light ? "/brand/monjez-mark-light.webp" : "/brand/monjez-mark.webp"}
                alt=""
                width={445}
                height={356}
                sizes="40px"
                priority
                className="h-[24px] w-auto"
            />
            <Image
                src={light ? "/brand/monjez-wordmark-light.webp" : "/brand/monjez-wordmark.webp"}
                alt="Monjez"
                width={579}
                height={72}
                sizes="100px"
                priority
                className="h-[10px] w-auto"
            />
        </span>
    );
}

/** A nav entry: a route (href) or a home-page section (id). */
export function NavItem({ link, className, activeClassName, onNavigate }: { link: NavLink; className: string; activeClassName?: string; onNavigate?: () => void }) {
    const pathname = usePathname();
    if (link.href) {
        const active = pathname === link.href || pathname.startsWith(link.href + "/");
        return (
            <Link href={link.href} onClick={onNavigate} aria-current={active ? "page" : undefined} className={cn(className, active && activeClassName)}>
                {link.label}
            </Link>
        );
    }
    return (
        <ScrollLink to={link.id!} onNavigate={onNavigate} className={className}>
            {link.label}
        </ScrollLink>
    );
}

export function Nav() {
    const { NAV_LINKS, UI } = useContent();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const resourcesActive = pathname.startsWith("/resources");

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    const linkCls =
        "rounded-full px-3 py-2 text-[13.5px] font-medium text-mj-body transition-colors hover:text-mj-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mj-accent";

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
            <nav
                aria-label={UI.nav.main}
                className={cn(
                    "mx-auto flex h-[56px] max-w-[1160px] items-center justify-between rounded-full border px-3 ps-5 transition-[background-color,border-color,box-shadow] duration-300",
                    scrolled || open
                        ? "border-mj-line bg-white/85 shadow-[0_10px_30px_-18px_rgba(23,31,46,0.35)] backdrop-blur-md"
                        : "border-transparent bg-transparent"
                )}
            >
                <Link href="/" onClick={() => setOpen(false)} className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mj-accent" aria-label={UI.nav.home}>
                    <Logo />
                </Link>

                <ul className="hidden items-center gap-0.5 lg:flex">
                    {NAV_LINKS.map((l) => (
                        <li key={l.label}>
                            <NavItem link={l} className={linkCls} activeClassName="text-mj-ink bg-mj-sand/70" />
                        </li>
                    ))}
                    <li>
                        <Link
                            href="/resources"
                            aria-current={resourcesActive ? "page" : undefined}
                            className={cn(
                                "inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-[13.5px] font-semibold text-mj-accent transition-colors hover:text-mj-accent-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mj-accent",
                                resourcesActive && "bg-mj-accent-soft"
                            )}
                        >
                            <Sparkles className="h-3.5 w-3.5" aria-hidden />
                            {UI.nav.resources}
                        </Link>
                    </li>
                </ul>

                <div className="flex items-center gap-2">
                    <Link
                        href={pathname}
                        locale={UI.langSwitch.href as "en" | "ar"}
                        aria-label={UI.langSwitch.aria}
                        hrefLang={UI.langSwitch.href}
                        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-mj-line bg-white px-3 text-[13px] font-semibold text-mj-ink transition-colors hover:border-mj-accent-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mj-accent"
                    >
                        <Globe className="h-3.5 w-3.5 text-mj-accent" aria-hidden />
                        <span lang={UI.langSwitch.href}>{UI.langSwitch.label}</span>
                    </Link>
                    <ScrollLink to="apply" variant="primary" arrow className="hidden h-9 px-4 text-[13.5px] sm:inline-flex">
                        {UI.nav.apply}
                    </ScrollLink>
                    <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-mj-line bg-white text-mj-ink lg:hidden"
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        aria-label={open ? UI.nav.close : UI.nav.open}
                        onClick={() => setOpen((v) => !v)}
                    >
                        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </button>
                </div>
            </nav>

            {open && (
                <div id="mobile-menu" className="mx-auto mt-2 max-w-[1160px] rounded-3xl border border-mj-line bg-white p-2 shadow-[0_20px_40px_-20px_rgba(23,31,46,0.35)] lg:hidden">
                    <ul>
                        {NAV_LINKS.map((l) => (
                            <li key={l.label}>
                                <NavItem
                                    link={l}
                                    onNavigate={() => setOpen(false)}
                                    className="block rounded-2xl px-4 py-3 text-[15.5px] font-medium text-mj-ink hover:bg-mj-cream"
                                    activeClassName="bg-mj-cream"
                                />
                            </li>
                        ))}
                        <li>
                            <Link
                                href="/resources"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2 rounded-2xl px-4 py-3 text-[15.5px] font-semibold text-mj-accent hover:bg-mj-cream"
                            >
                                <Sparkles className="h-4 w-4" aria-hidden />
                                {UI.nav.resources}
                            </Link>
                        </li>
                        <li className="p-2">
                            <ScrollLink to="apply" variant="primary" arrow onNavigate={() => setOpen(false)} className="w-full">
                                {UI.nav.apply}
                            </ScrollLink>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
}

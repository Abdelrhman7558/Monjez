"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Globe, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/navigation";
import { useContent } from "./content-context";
import { ScrollLink, useScrollTo } from "./primitives";

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
                className="h-[26px] w-auto"
            />
            <Image
                src={light ? "/brand/monjez-wordmark-light.webp" : "/brand/monjez-wordmark.webp"}
                alt="Monjez"
                width={579}
                height={72}
                sizes="100px"
                priority
                className="h-[11px] w-auto"
            />
        </span>
    );
}

export function Nav() {
    const { NAV_LINKS, UI } = useContent();
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const scrollTo = useScrollTo();

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

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
            <nav
                aria-label={UI.nav.main}
                className={cn(
                    "mx-auto flex h-[60px] max-w-[1200px] items-center justify-between rounded-full border px-3 ps-5 transition-[background-color,border-color,box-shadow] duration-300",
                    scrolled || open
                        ? "border-mj-line bg-white/85 shadow-[0_10px_30px_-18px_rgba(23,31,46,0.35)] backdrop-blur-md"
                        : "border-transparent bg-transparent"
                )}
            >
                <a
                    href="#top"
                    onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                        scrollTo("top");
                    }}
                    className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mj-accent"
                    aria-label={UI.nav.home}
                >
                    <Logo />
                </a>

                <ul className="hidden items-center gap-1 md:flex">
                    {NAV_LINKS.map((l) => (
                        <li key={l.id}>
                            <ScrollLink
                                to={l.id}
                                className="rounded-full px-3.5 py-2 text-[14px] font-medium text-mj-body transition-colors hover:text-mj-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mj-accent"
                            >
                                {l.label}
                            </ScrollLink>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center gap-2">
                    <Link
                        href="/"
                        locale={UI.langSwitch.href as "en" | "ar"}
                        aria-label={UI.langSwitch.aria}
                        hrefLang={UI.langSwitch.href}
                        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-mj-line bg-white px-3.5 text-[13.5px] font-semibold text-mj-ink transition-colors hover:border-mj-accent-line focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mj-accent"
                    >
                        <Globe className="h-4 w-4 text-mj-accent" aria-hidden />
                        <span lang={UI.langSwitch.href}>{UI.langSwitch.label}</span>
                    </Link>
                    <ScrollLink to="apply" variant="primary" arrow className="hidden h-10 px-4 text-[14px] sm:inline-flex">
                        {UI.nav.apply}
                    </ScrollLink>
                    <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-mj-line bg-white text-mj-ink md:hidden"
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
                <div
                    id="mobile-menu"
                    className="mx-auto mt-2 max-w-[1200px] rounded-3xl border border-mj-line bg-white p-2 shadow-[0_20px_40px_-20px_rgba(23,31,46,0.35)] md:hidden"
                >
                    <ul>
                        {NAV_LINKS.map((l) => (
                            <li key={l.id}>
                                <ScrollLink
                                    to={l.id}
                                    onNavigate={() => setOpen(false)}
                                    className="block rounded-2xl px-4 py-3.5 text-[16px] font-medium text-mj-ink hover:bg-mj-cream"
                                >
                                    {l.label}
                                </ScrollLink>
                            </li>
                        ))}
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

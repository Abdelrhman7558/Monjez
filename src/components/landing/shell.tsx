"use client";

import type { ReactNode } from "react";
import type { Locale } from "./content";
import { ContentProvider, useContent } from "./content-context";
import { Nav } from "./nav";
import { LandingFooter } from "./footer";

/** Shared chrome for the marketing routes: language direction, nav, footer. */
export function LandingShell({ locale, children }: { locale: Locale; children: ReactNode }) {
    return (
        <ContentProvider locale={locale}>
            <ShellBody locale={locale}>{children}</ShellBody>
        </ContentProvider>
    );
}

function ShellBody({ locale, children }: { locale: Locale; children: ReactNode }) {
    const { UI } = useContent();
    return (
        <div dir={locale === "ar" ? "rtl" : "ltr"} lang={locale} className="mj-landing relative z-10 min-h-screen bg-mj-cream font-sans text-mj-ink antialiased">
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-mj-ink focus:px-4 focus:py-2 focus:text-white"
            >
                {UI.skip}
            </a>
            <Nav />
            <main id="main">{children}</main>
            <LandingFooter />
        </div>
    );
}

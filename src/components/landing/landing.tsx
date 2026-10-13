"use client";

import { Nav } from "./nav";
import { Hero } from "./hero";
import { Impact } from "./impact";
import { OperatingSystem } from "./operating-system";
import { AiTeam } from "./ai-team";
import { Journey } from "./journey";
import { Gcc } from "./gcc";
import { Testimonial } from "./testimonial";
import { Guarantee } from "./guarantee";
import { Faq } from "./faq";
import { Apply } from "./apply";
import { LandingFooter } from "./footer";
import { ContentProvider, useContent } from "./content-context";
import type { Locale } from "./content";

/** Contractor landing page. Section order follows the supplied reference screenshots. */
export function ContractorLanding({ locale }: { locale: Locale }) {
    return (
        <ContentProvider locale={locale}>
            <LandingBody locale={locale} />
        </ContentProvider>
    );
}

function LandingBody({ locale }: { locale: Locale }) {
    const { UI } = useContent();
    return (
        <div dir={locale === "ar" ? "rtl" : "ltr"} lang={locale} className="mj-landing relative z-10 min-h-screen bg-mj-cream font-sans text-mj-ink antialiased">
            <a
                href="#apply"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-mj-ink focus:px-4 focus:py-2 focus:text-white"
            >
                {UI.skip}
            </a>
            <Nav />
            <main>
                <Hero />
                <Impact />
                <OperatingSystem />
                <AiTeam />
                <Journey />
                <Gcc />
                <Testimonial />
                <Guarantee />
                <Faq />
                <Apply />
            </main>
            <LandingFooter />
        </div>
    );
}

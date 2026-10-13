"use client";

import { Hero } from "./hero";
import { Impact } from "./impact";
import { SystemMap } from "./system-map";
import { OperatingSystem } from "./operating-system";
import { AiTeam } from "./ai-team";
import { Journey } from "./journey";
import { ReviewEntry } from "./review-entry";
import { Trust } from "./trust";
import { Gcc } from "./gcc";
import { Testimonial } from "./testimonial";
import { Guarantee } from "./guarantee";
import { Faq } from "./faq";
import { Apply } from "./apply";
import { LandingShell } from "./shell";
import type { Locale } from "./content";

/** Contractor landing page (home). */
export function ContractorLanding({ locale }: { locale: Locale }) {
    return (
        <LandingShell locale={locale}>
            <Hero />
            <Impact />
            <SystemMap />
            <OperatingSystem />
            <AiTeam />
            <Journey />
            <ReviewEntry />
            <Trust />
            <Gcc />
            <Testimonial />
            <Guarantee />
            <Faq />
            <Apply />
        </LandingShell>
    );
}

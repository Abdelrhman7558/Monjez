import type { Metadata } from "next";
import type { Locale } from "@/components/landing/content";
import { landingFontVars } from "@/components/landing/fonts";
import { LandingTracking } from "@/components/landing/tracking";
import { JoinPage } from "@/components/landing/join-page";
import { JOIN } from "@/components/landing/join-content";

const SITE = "https://www.monjez-agency.com";
const toLocale = (l: string): Locale => (l === "ar" ? "ar" : "en");

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const locale = toLocale((await params).locale);
    const J = JOIN[locale];
    return {
        title: J.metaTitle,
        description: J.metaDescription,
        alternates: { canonical: `${SITE}/${locale}/join`, languages: { en: `${SITE}/en/join`, ar: `${SITE}/ar/join` } },
    };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const locale = toLocale((await params).locale);
    return (
        <div className={landingFontVars}>
            <JoinPage locale={locale} />
            <LandingTracking />
        </div>
    );
}

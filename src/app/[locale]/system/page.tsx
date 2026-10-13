import type { Metadata } from "next";
import { EN, type Locale } from "@/components/landing/content";
import { AR } from "@/components/landing/content-ar";
import { landingFontVars } from "@/components/landing/fonts";
import { LandingTracking } from "@/components/landing/tracking";
import { SystemPage } from "@/components/landing/system-page";

const SITE = "https://www.monjez-agency.com";
const toLocale = (l: string): Locale => (l === "ar" ? "ar" : "en");

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const locale = toLocale((await params).locale);
    const P = (locale === "ar" ? AR : EN).SYSTEM_PAGE;
    return {
        title: P.metaTitle,
        description: P.metaDescription,
        alternates: { canonical: `${SITE}/${locale}/system`, languages: { en: `${SITE}/en/system`, ar: `${SITE}/ar/system` } },
        openGraph: { title: P.metaTitle, description: P.metaDescription, url: `${SITE}/${locale}/system`, siteName: "Monjez", images: [{ url: "/brand/og-monjez.png", width: 1200, height: 630 }] },
    };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const locale = toLocale((await params).locale);
    return (
        <div className={landingFontVars}>
            <SystemPage locale={locale} />
            <LandingTracking />
        </div>
    );
}

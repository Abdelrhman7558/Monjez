import type { Metadata } from "next";
import { EN, type Locale } from "@/components/landing/content";
import { AR } from "@/components/landing/content-ar";
import { landingFontVars } from "@/components/landing/fonts";
import { LandingTracking } from "@/components/landing/tracking";
import { ResourcesIndexPage } from "@/components/landing/resources";

const SITE = "https://www.monjez-agency.com";
const toLocale = (l: string): Locale => (l === "ar" ? "ar" : "en");

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const locale = toLocale((await params).locale);
    const R = (locale === "ar" ? AR : EN).RESOURCES;
    return {
        title: R.metaTitle,
        description: R.metaDescription,
        alternates: { canonical: `${SITE}/${locale}/resources`, languages: { en: `${SITE}/en/resources`, ar: `${SITE}/ar/resources` } },
        openGraph: { title: R.metaTitle, description: R.metaDescription, url: `${SITE}/${locale}/resources`, siteName: "Monjez", images: [{ url: "/brand/og-monjez.png", width: 1200, height: 630 }] },
    };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const locale = toLocale((await params).locale);
    return (
        <div className={landingFontVars}>
            <ResourcesIndexPage locale={locale} />
            <LandingTracking />
        </div>
    );
}

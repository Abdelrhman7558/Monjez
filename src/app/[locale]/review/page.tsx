import type { Metadata } from "next";
import type { Locale } from "@/components/landing/content";
import { REVIEW } from "@/components/landing/review-content";
import { landingFontVars } from "@/components/landing/fonts";
import { LandingTracking } from "@/components/landing/tracking";
import { ReviewPage } from "@/components/landing/review-page";

const SITE = "https://www.monjez-agency.com";
const toLocale = (l: string): Locale => (l === "ar" ? "ar" : "en");

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const locale = toLocale((await params).locale);
    const P = REVIEW[locale];
    return {
        title: P.metaTitle,
        description: P.metaDescription,
        alternates: { canonical: `${SITE}/${locale}/review`, languages: { en: `${SITE}/en/review`, ar: `${SITE}/ar/review` } },
        openGraph: { title: P.metaTitle, description: P.metaDescription, url: `${SITE}/${locale}/review`, siteName: "Monjez", images: [{ url: "/brand/og-monjez.png", width: 1200, height: 630 }] },
    };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
    const locale = toLocale((await params).locale);
    return (
        <div className={landingFontVars}>
            <ReviewPage locale={locale} />
            <LandingTracking />
        </div>
    );
}

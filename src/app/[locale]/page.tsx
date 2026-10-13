import type { Metadata } from "next";
import { ContractorLanding } from "@/components/landing/landing";
import { LandingTracking } from "@/components/landing/tracking";
import { landingFontVars } from "@/components/landing/fonts";
import type { Locale } from "@/components/landing/content";

const SITE = "https://www.monjez-agency.com";

const META: Record<Locale, { title: string; description: string; ogLocale: string }> = {
    en: {
        title: "Monjez",
        description:
            "Monjez builds custom AI agents for GCC contractors: tender packs, BOQs, pricing, procurement and reporting, inside the tools you already use, with your team approving every number. First agent live within 7 days of kickoff.",
        ogLocale: "en_US",
    },
    ar: {
        title: "Monjez",
        description:
            "منجز تبني وكلاء ذكاء اصطناعي لمقاولين الخليج: ملفات المناقصات والـBOQ والتسعير والمشتريات والتقارير، داخل نفس أدواتكم، وفريقكم يعتمد كل رقم. أول وكيل يشتغل خلال 7 أيام من البداية.",
        ogLocale: "ar_AE",
    },
};

const toLocale = (l: string): Locale => (l === "ar" ? "ar" : "en");

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const locale = toLocale((await params).locale);
    const m = META[locale];
    return {
        title: m.title,
        description: m.description,
        keywords: [
            "AI for contractors",
            "AI for fit-out companies",
            "construction AI GCC",
            "tender automation",
            "BOQ automation",
            "AI estimating",
            "ذكاء اصطناعي للمقاولات",
            "أتمتة المناقصات",
        ],
        alternates: { canonical: `${SITE}/${locale}`, languages: { en: `${SITE}/en`, ar: `${SITE}/ar`, "x-default": `${SITE}/en` } },
        openGraph: {
            title: m.title,
            description: m.description,
            url: `${SITE}/${locale}`,
            siteName: "Monjez",
            locale: m.ogLocale,
            type: "website",
            images: [{ url: "/brand/og-monjez.png", width: 1200, height: 630, alt: "Monjez" }],
        },
        twitter: { card: "summary_large_image", title: m.title, description: m.description, images: ["/brand/og-monjez.png"] },
    };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    const locale = toLocale((await params).locale);
    return (
        <div className={landingFontVars}>
            <ContractorLanding locale={locale} />
            <LandingTracking />
        </div>
    );
}

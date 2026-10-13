import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/components/landing/content";
import { landingFontVars } from "@/components/landing/fonts";
import { LandingTracking } from "@/components/landing/tracking";
import { ResourceDetailPage } from "@/components/landing/resources";
import { getResource, localized } from "@/components/landing/resources-data";

const SITE = "https://www.monjez-agency.com";
const toLocale = (l: string): Locale => (l === "ar" ? "ar" : "en");
type Params = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const p = await params;
    const locale = toLocale(p.locale);
    const r = getResource(p.slug);
    if (!r) return {};
    const t = localized(r, locale);
    const url = `${SITE}/${locale}/resources/${r.slug}`;
    return {
        title: `${t.title} | Monjez`,
        description: t.excerpt,
        alternates: { canonical: url, languages: { en: `${SITE}/en/resources/${r.slug}`, ar: `${SITE}/ar/resources/${r.slug}` } },
        openGraph: { title: t.title, description: t.excerpt, url, siteName: "Monjez", type: "article", images: [{ url: "/brand/og-monjez.png", width: 1200, height: 630 }] },
    };
}

export default async function Page({ params }: Params) {
    const p = await params;
    if (!getResource(p.slug)) notFound();
    return (
        <div className={landingFontVars}>
            <ResourceDetailPage locale={toLocale(p.locale)} slug={p.slug} />
            <LandingTracking />
        </div>
    );
}

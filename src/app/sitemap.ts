import { MetadataRoute } from "next";
import { RESOURCES_LIST } from "@/components/landing/resources-data";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://monjez.ai";

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${baseUrl}/revenue-audit`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        ...["en", "ar"].flatMap((l) =>
            ["", "/system", "/review", "/join", "/resources", ...RESOURCES_LIST.map((r) => `/resources/${r.slug}`)].map((path) => ({
                url: `https://www.monjez-agency.com/${l}${path}`,
                lastModified: new Date(),
                changeFrequency: "weekly" as const,
                priority: path === "" ? 1 : 0.7,
            }))
        ),
    ];
}

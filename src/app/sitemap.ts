import { MetadataRoute } from "next";

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
        // Add dynamic blog posts here if applicable
    ];
}

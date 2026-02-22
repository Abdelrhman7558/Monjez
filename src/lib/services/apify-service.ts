export interface ApifyLead {
    name: string;
    title: string;
    company: string;
    email?: string;
    phone?: string;
    linkedinUrl: string;
    location: string;
    description: string;
}

export async function fetchLeadsFromApify(count: number = 80): Promise<ApifyLead[]> {
    const API_KEY = process.env.APIFY_API_KEY;
    if (!API_KEY) throw new Error("Apify API Key is missing.");

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s for larger batch

        // Multi-layered search queries for maximum coverage including contact info
        const searchQueries = [
            "site:linkedin.com/in/ \"Founder\" \"Saudi Arabia\" \"@gmail.com\" OR \"@outlook.com\"",
            "site:linkedin.com/in/ \"CEO\" \"Saudi Arabia\" \"contact\" OR \"mobile\"",
            "site:linkedin.com/in/ \"Co-Founder\" \"Riyadh\" \"whatsapp\"",
            "site:linkedin.com/in/ \"Owner\" \"Jeddah\" \"phone\"",
            "site:linkedin.com/in/ \"Managing Director\" \"Saudi Arabia\""
        ].join("\n");

        const response = await fetch(`https://api.apify.com/v2/acts/apify~google-search-scraper/run-sync-get-dataset-items?token=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
            body: JSON.stringify({
                queries: searchQueries,
                maxPagesPerQuery: 3, // Fetch up to 3 pages per query
                resultsPerPage: 100,
                proxyConfig: { useApifyProxy: true }
            })
        });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`Apify failed: ${response.statusText}`);

        const data = await response.json();

        // Google scraper returns an array of objects, each containing organicResults for its query
        let allResults: any[] = [];
        if (Array.isArray(data)) {
            data.forEach(queryResult => {
                if (queryResult.organicResults) {
                    allResults = [...allResults, ...queryResult.organicResults];
                }
            });
        }

        // Deduplicate by URL
        const uniqueItems = Array.from(new Map(allResults.map(item => [item.url, item])).values());

        return uniqueItems.map((item: any) => {
            const pInfo = item.personalInfo || {};
            const desc = item.description || "";

            // Basic Phone Extraction from Snippet
            const phoneMatch = desc.match(/(\+966|05)\s?([0-9]{2,3})\s?([0-9]{3})\s?([0-9]{4})/);
            const extractedPhone = phoneMatch ? phoneMatch[0] : undefined;

            const titleParts = item.title?.split('-') || [];
            const name = titleParts[0]?.trim() || "Professional";
            const role = pInfo.jobTitle || titleParts[1]?.trim() || "Executive";
            const company = pInfo.companyName || titleParts[2]?.split('|')[0]?.trim() || "Saudi Enterprise";

            return {
                name: name,
                title: role,
                company: company,
                linkedinUrl: item.url || "https://linkedin.com",
                location: pInfo.location || "Saudi Arabia",
                email: desc.match(/[a-zA-Z0-9._%+-]+@ [a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0], // Basic email search
                phone: extractedPhone,
                description: desc
            };
        });
    } catch (error: any) {
        console.error("Apify Fetch Error:", error.message);
        return []; // Return empty instead of throwing to allow fallback
    }
}

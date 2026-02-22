export interface ApifyLead {
    name: string;
    title: string;
    company: string;
    email?: string;
    phone?: string;
    linkedinUrl: string;
    location: string;
}

export async function fetchLeadsFromApify(count: number = 20): Promise<ApifyLead[]> {
    const API_KEY = process.env.APIFY_API_KEY;

    if (!API_KEY) {
        throw new Error("Apify API Key is missing.");
    }

    try {
        // Using Google Search Scraper to find LinkedIn profiles
        // This is much more robust and doesn't require session cookies
        const response = await fetch(`https://api.apify.com/v2/acts/apify~google-search-scraper/run-sync-get-dataset-items?token=${API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                queries: "site:linkedin.com/in Saudi Arabia Founder",
                maxPagesPerQuery: 1,
                resultsPerPage: 20,
                proxyConfig: { useApifyProxy: true }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Apify Google Search failed: ${response.statusText} - ${errorText.substring(0, 50)}`);
        }

        const data = await response.json();
        // Google Search Scraper returns results in 'organicResults'
        const results = data[0]?.organicResults || [];

        return results.map((item: any) => {
            // Title usually looks like: "Name - Title - Company | LinkedIn"
            const parts = item.title?.split('-') || [];
            const name = parts[0]?.trim() || "Professional";
            const title = parts[1]?.trim() || "Executive";
            const company = parts[2]?.split('|')[0]?.trim() || "Leading Company";

            return {
                name: name,
                title: title,
                company: company,
                linkedinUrl: item.url,
                location: "Saudi Arabia",
                email: undefined,
                phone: undefined
            };
        });
    } catch (error: any) {
        console.error("Apify Fetch Error:", error.message);
        throw error; // Let leads-actions handle it
    }
}

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
        // Using a verified Actor ID for LinkedIn People Search
        const response = await fetch(`https://api.apify.com/v2/acts/lisenser~linkedin-people-search-scraper/run-sync-get-dataset-items?token=${API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                queries: ["Saudi Arabia Founder", "Dubai CEO", "Egypt Business Owner", "UAE Marketing Agency"],
                limit: count, // Using 'limit' as some actors use this instead of 'count'
                proxy: { useApifyProxy: true }
            })
        });

        if (!response.ok) {
            throw new Error(`Apify request failed: ${response.statusText}`);
        }

        const data = await response.json();
        return data.map((item: any) => ({
            name: item.fullName || item.name || "Real Professional",
            title: item.title || item.occupation || "Executive",
            company: item.company || "Leading Enterprise",
            email: item.email,
            phone: item.phone,
            linkedinUrl: item.url || item.profileUrl || "#",
            location: item.location || "MENA Region"
        }));
    } catch (error: any) {
        console.error("Apify Fetch Error:", error.message);
        throw error; // Let leads-actions handle it
    }
}

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
        // Using 'harvestapi/linkedin-profile-search' which is known for not requiring cookies
        const response = await fetch(`https://api.apify.com/v2/acts/harvestapi~linkedin-profile-search/run-sync-get-dataset-items?token=${API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                keyword: "Founder OR CEO Saudi Arabia",
                location: "Saudi Arabia",
                limit: count,
                proxy: { useApifyProxy: true }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Apify Error Response:", errorText);
            throw new Error(`Apify request failed: ${response.statusText} - ${errorText.substring(0, 100)}`);
        }

        const data = await response.json();
        return data.map((item: any) => ({
            name: item.fullName || item.name || "Real Professional",
            title: item.occupation || item.title || "Executive",
            company: item.company || "Leading Enterprise",
            email: item.email,
            phone: item.phone,
            linkedinUrl: item.linkedinUrl || item.url || "#",
            location: item.location || "MENA Region"
        }));
    } catch (error: any) {
        console.error("Apify Fetch Error:", error.message);
        throw error; // Let leads-actions handle it
    }
}

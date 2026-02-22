export interface ApolloLead {
    name: string;
    first_name: string;
    last_name: string;
    title: string;
    organization_name: string;
    email?: string;
    phone_numbers?: string[];
    linkedin_url?: string;
    headline?: string;
}

export async function fetchLeadsFromApollo(count: number = 111): Promise<ApolloLead[]> {
    const API_KEY = process.env.APOLLO_API_KEY;

    if (!API_KEY || API_KEY === 'your_apollo_key_here') {
        throw new Error("Apollo API Key is missing or invalid.");
    }

    try {
        const response = await fetch("https://api.apollo.io/v1/mixed_people/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache"
            },
            body: JSON.stringify({
                api_key: API_KEY,
                q_organization_domains: "marketing.me, ecommerce.ae, startup.sa", // Target domains
                person_titles: ["founder", "ceo", "owner", "managing director"],
                person_locations: ["Saudi Arabia", "United Arab Emirates", "Egypt", "Jordan"],
                page: 1,
                per_page: count
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch from Apollo");
        }

        const data = await response.json();
        return data.people.map((p: any) => ({
            name: `${p.first_name} ${p.last_name}`,
            first_name: p.first_name,
            last_name: p.last_name,
            title: p.title,
            organization_name: p.organization?.name || "Private Company",
            email: p.email,
            phone_numbers: p.phone_numbers,
            linkedin_url: p.linkedin_url,
            headline: p.headline
        }));
    } catch (error) {
        console.error("Apollo Fetch Error:", error);
        throw error;
    }
}

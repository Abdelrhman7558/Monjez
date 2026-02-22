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
        const response = await fetch("https://api.apollo.io/v1/people/search", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Api-Key": API_KEY as string
            },
            body: JSON.stringify({
                q_keywords: "founder",
                page: 1,
                per_page: 5
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Apollo Search Raw Error:", errorText);
            throw new Error(`Apollo Error ${response.status}: ${errorText.substring(0, 100)}`);
        }

        const data = await response.json();
        const peopleList = data.people || data.contacts || [];

        return peopleList.map((p: any) => ({
            name: p.name || `${p.first_name} ${p.last_name}`,
            first_name: p.first_name,
            last_name: p.last_name,
            title: p.title,
            organization_name: p.organization?.name || p.organization_name || "Private Company",
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

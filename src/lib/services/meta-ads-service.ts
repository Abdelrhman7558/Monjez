
export interface MetaCampaignParams {
    name: string;
    objective: 'OUTCOME_AWARENESS' | 'OUTCOME_LEADS' | 'OUTCOME_SALES' | 'OUTCOME_TRAFFIC';
    status?: 'PAUSED' | 'ACTIVE';
    daily_budget?: number;
}

const API_VERSION = 'v19.0';

export async function createMetaCampaign(params: MetaCampaignParams) {
    const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
    const AD_ACCOUNT_ID = process.env.FB_AD_ACCOUNT_ID;

    if (!ACCESS_TOKEN || !AD_ACCOUNT_ID) {
        throw new Error("Meta Ads credentials missing in environment variables.");
    }

    try {
        const response = await fetch(`https://graph.facebook.com/${API_VERSION}/${AD_ACCOUNT_ID}/campaigns`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: params.name,
                objective: params.objective,
                status: params.status || 'PAUSED',
                special_ad_categories: [], // Required by FB
                access_token: ACCESS_TOKEN
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Failed to create Meta campaign");
        }

        return data; // returns { id: "campaign_id" }
    } catch (error: any) {
        console.error("Meta API Error:", error.message);
        throw error;
    }
}

export async function getAdAccountInsights() {
    const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
    const AD_ACCOUNT_ID = process.env.FB_AD_ACCOUNT_ID;

    if (!ACCESS_TOKEN || !AD_ACCOUNT_ID) return null;

    try {
        const response = await fetch(
            `https://graph.facebook.com/${API_VERSION}/${AD_ACCOUNT_ID}/insights?fields=spend,impressions,clicks,reach&period=last_30d&access_token=${ACCESS_TOKEN}`
        );
        const data = await response.json();
        return data.data?.[0] || null;
    } catch (error) {
        console.error("Failed to fetch Meta Insights:", error);
        return null;
    }
}

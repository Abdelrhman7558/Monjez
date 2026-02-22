
import { createSupabaseServerClient } from "../supabase/server";

export interface MetaCampaignParams {
    name: string;
    objective: 'OUTCOME_AWARENESS' | 'OUTCOME_LEADS' | 'OUTCOME_SALES' | 'OUTCOME_TRAFFIC';
    status?: 'PAUSED' | 'ACTIVE';
    daily_budget?: number;
    strategy_type?: 'Blender' | 'ABO_Multi' | 'ABO_Single' | 'Catalog_Blender' | 'ABO_Carousel_10' | 'ABO_Carousel_Single';
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

        // Store campaign details in our DB
        const supabase = await createSupabaseServerClient();
        await supabase.from('meta_campaign_details').insert({
            meta_campaign_id: data.id,
            strategy_type: params.strategy_type,
            allocated_budget: params.daily_budget
        });

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

export async function getCampaigns() {
    const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
    const AD_ACCOUNT_ID = process.env.FB_AD_ACCOUNT_ID;

    if (!ACCESS_TOKEN || !AD_ACCOUNT_ID) return [];

    try {
        const response = await fetch(
            `https://graph.facebook.com/${API_VERSION}/${AD_ACCOUNT_ID}/campaigns?fields=name,status,objective,daily_budget,lifetime_budget,created_time&access_token=${ACCESS_TOKEN}`
        );
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error("Failed to fetch Meta Campaigns:", error);
        return [];
    }
}

export async function getAds() {
    const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
    const AD_ACCOUNT_ID = process.env.FB_AD_ACCOUNT_ID;

    if (!ACCESS_TOKEN || !AD_ACCOUNT_ID) return [];

    try {
        const response = await fetch(
            `https://graph.facebook.com/${API_VERSION}/${AD_ACCOUNT_ID}/ads?fields=name,status,creative,insights{spend,impressions,clicks,reach,roas,cpc,ctr,cpp}&access_token=${ACCESS_TOKEN}`
        );
        const data = await response.json();

        // Flatten insights for easier UI use
        return (data.data || []).map((ad: any) => ({
            ...ad,
            insights: ad.insights?.data?.[0] || null
        }));
    } catch (error) {
        console.error("Failed to fetch Meta Ads:", error);
        return [];
    }
}

// Wallet Functions
export async function getMetaSettings() {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from('meta_settings').select('*').single();
    return data;
}

export async function updateWalletBalance(amount: number) {
    const supabase = await createSupabaseServerClient();
    const settings = await getMetaSettings();
    const newBalance = (settings?.wallet_balance || 0) + amount;

    const { data, error } = await supabase
        .from('meta_settings')
        .update({ wallet_balance: newBalance, updated_at: new Date().toISOString() })
        .eq('id', settings.id);

    return { data, error };
}

export async function incrementMetaCheck(type: 'optimization' | 'scaling') {
    const supabase = await createSupabaseServerClient();
    const settings = await getMetaSettings();

    const update = type === 'optimization'
        ? { optimization_checks_count: (settings?.optimization_checks_count || 0) + 1 }
        : { scaling_checks_count: (settings?.scaling_checks_count || 0) + 1 };

    const { data, error } = await supabase
        .from('meta_settings')
        .update({ ...update, updated_at: new Date().toISOString() })
        .eq('id', settings.id);

    return { data, error };
}

// Optimization Logic Helpers (T.O.S)
export function evaluateOptimizationRules(adData: any) {
    const actions: string[] = [];
    const { roas, stable_days, cpa, avg_campaign_cpa, ctr, purchases, frequency, spend } = adData;

    // IF ROAS >= 6 AND stable >= 3 days THEN duplicate ad into "Winners Campaign"
    if (roas >= 6 && stable_days >= 3) {
        actions.push("PROMOTE_TO_WINNERS");
    }

    // IF ROAS < 4 AND ad ran >= 3 days THEN decrease budget by 20%
    if (roas < 4 && stable_days >= 3) {
        actions.push("DECREASE_BUDGET_20");
    }

    // IF CPA > 2× average campaign CPA AND CTR < 0.7% THEN pause the ad
    if (cpa > 2 * avg_campaign_cpa && ctr < 0.7) {
        actions.push("PAUSE_AD");
    }

    // IF CTR >= 1.5% AND CPA <= target CPA AND purchases >= 5 THEN promote
    if (ctr >= 1.5 && purchases >= 5) {
        actions.push("PROMOTE_CREATIVE");
    }

    // IF Frequency > 2.5 AND CTR drops >= 30% THEN pause
    if (frequency > 2.5 && adData.ctr_drop >= 30) {
        actions.push("PAUSE_FATIGUED");
    }

    return actions;
}

// Scaling Logic Helpers
export function evaluateScalingRules(adData: any, businessStatus: any) {
    const result = { canScale: false, reason: "", action: "" };

    // Pre-Scale Validation
    if (businessStatus.stock === "YES" && businessStatus.cash_flow === "YES" && adData.roas_stable) {
        result.canScale = true;
    } else {
        result.reason = "Scaling conditions not met (Inventory/Cashflow/Stability)";
        return result;
    }

    // Vertical Scaling
    if (adData.method === 'vertical') {
        result.action = "INCREASE_BUDGET_20";
        if (adData.roas_drop > 30) result.action = "REVERT_BUDGET";
    }

    // Bump and Punish Logic
    if (adData.roas > 3 && adData.stable_days >= 2) {
        result.action = "BUMP_BUDGET_500_1000";
    } else if (adData.roas < 1.5) {
        result.action = "SLASH_TO_MIN_BUDGET";
    }

    return result;
}

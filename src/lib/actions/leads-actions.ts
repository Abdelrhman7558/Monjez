"use server";

import { fetchLeadsFromApollo } from "@/lib/services/apollo-service";
import { analyzeLeadWithAI } from "@/lib/services/ai-analysis-service";
import { Lead } from "@/lib/mock-leads";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function performRealExtractionAction(): Promise<Lead[]> {
    try {
        console.log("Starting multi-source extraction...");

        // Try fetching from Apify first for higher quality "real" leads
        let rawLeads: any[] = [];
        try {
            const { fetchLeadsFromApify } = await import("@/lib/services/apify-service");
            const apifyLeads = await fetchLeadsFromApify(50);
            rawLeads = apifyLeads.map(l => ({
                name: l.name,
                title: l.title,
                organization_name: l.company,
                email: l.email,
                phone_numbers: l.phone ? [l.phone] : [],
                linkedin_url: l.linkedinUrl
            }));
        } catch (e: any) {
            console.error("Apify integration failed, falling back to Apollo. Error:", e.message);
        }

        // Fill remaining with Apollo (Optional fallback)
        const remainingCount = 111 - rawLeads.length;
        if (remainingCount > 0) {
            try {
                const apolloLeads = await fetchLeadsFromApollo(remainingCount).catch(e => {
                    console.warn("Apollo Fallback Triggered:", e.message);
                    return [];
                });
                rawLeads = [...rawLeads, ...apolloLeads];
            } catch (apolloErr: any) {
                console.warn("Apollo Outer Catch:", apolloErr.message);
            }
        }

        console.log(`Step 1: Raw Leads Count = ${rawLeads.length}`);
        const supabase = await createSupabaseServerClient();

        for (let i = 0; i < rawLeads.length && i < 111; i++) {
            const p = rawLeads[i];
            try {
                // Analyze one by one for natural flow
                const analysis = await analyzeLeadWithAI(p).catch(() => ({
                    isHot: p.title.toLowerCase().includes('founder'),
                    problem: "Scaling and regional growth challenges."
                }));

                const leadToInsert = {
                    name: p.name,
                    email: p.email || `contact@${p.organization_name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
                    phone: p.phone_numbers?.[0] || "Available on request",
                    role: p.title,
                    company: p.organization_name,
                    linkedin_url: p.linkedin_url || "https://linkedin.com",
                    problem: analysis.problem,
                    is_hot: analysis.isHot,
                    batch_date: new Date().toISOString().split('T')[0]
                };

                console.log(`Inserting lead ${i + 1}: ${p.name}`);
                await supabase.from('apollo_leads').insert([leadToInsert]);

            } catch (leadStepError) {
                console.error(`Error processing lead ${i}:`, leadStepError);
            }
        }

        console.log("Extraction Complete.");
        return []; // The UI will see updates via Realtime
    } catch (error: any) {
        console.error("CRITICAL: Server Action Extraction Error:", error);
        return [];
    }
}

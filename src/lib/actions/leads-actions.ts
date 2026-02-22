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
                const apolloLeads = await fetchLeadsFromApollo(remainingCount);
                rawLeads = [...rawLeads, ...apolloLeads];
            } catch (apolloErr: any) {
                console.warn("Apollo Fetch Failed (likely plan restriction):", apolloErr.message);
                // If we already have some leads from Apify, don't crash.
                // If we have ZERO leads, then we can throw the error if we want, 
                // but better to just return what we have.
                if (rawLeads.length === 0) {
                    throw new Error(`Both extraction sources failed. Apollo said: ${apolloErr.message}`);
                }
            }
        }

        const processedLeads: Lead[] = await Promise.all(
            rawLeads.slice(0, 111).map(async (p, index) => {
                const analysis = await analyzeLeadWithAI(p);

                return {
                    id: `real-${index}-${Date.now()}`,
                    name: p.name,
                    email: p.email || `contact@${p.organization_name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
                    phone: p.phone_numbers?.[0] || "Available on request",
                    role: p.title,
                    company: p.organization_name,
                    description: p.headline || "Business professional",
                    linkedin: p.linkedin_url || "https://linkedin.com",
                    isHot: analysis.isHot,
                    problem: analysis.problem,
                    category: p.title.toLowerCase().includes('founder') ? 'Founder' : 'Exec',
                    status: "New",
                    lastExtracted: new Date().toISOString().split('T')[0]
                };
            })
        );

        // Persist to Supabase
        const supabase = await createSupabaseServerClient();
        await supabase.from('apollo_leads').insert(
            processedLeads.map(l => ({
                name: l.name,
                email: l.email,
                phone: l.phone,
                role: l.role,
                company: l.company,
                linkedin_url: l.linkedin,
                problem: l.problem,
                is_hot: l.isHot
            }))
        );

        return processedLeads;
    } catch (error: any) {
        console.error("Server Action Extraction Error:", error);
        throw new Error(`Failed to extract real leads: ${error.message}`);
    }
}

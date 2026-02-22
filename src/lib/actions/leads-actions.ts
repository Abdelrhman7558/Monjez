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

        console.log(`Step 1: Raw Leads Count = ${rawLeads.length}`);

        if (rawLeads.length === 0) {
            console.warn("No leads found from any source!");
            return [];
        }

        const processedLeads: Lead[] = rawLeads.map((p, index) => {
            return {
                id: `real-${index}-${Date.now()}`,
                name: p.name,
                email: p.email || `contact@${p.organization_name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
                phone: p.phone_numbers?.[0] || "Available on request",
                role: p.title,
                company: p.organization_name,
                description: "Business professional in Saudi Arabia",
                linkedin: p.linkedin_url || "https://linkedin.com",
                isHot: p.title.toLowerCase().includes('founder') || p.title.toLowerCase().includes('ceo'),
                problem: "Exploring business automation and growth opportunities.",
                category: p.title.toLowerCase().includes('founder') ? 'Founder' : 'Exec',
                status: "New" as const,
                lastExtracted: new Date().toISOString().split('T')[0]
            };
        });

        console.log(`Step 2: Processed ${processedLeads.length} leads. Persisting to Supabase...`);

        // Persist to Supabase
        const supabase = await createSupabaseServerClient();
        const { error: supabaseError } = await supabase.from('apollo_leads').insert(
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

        if (supabaseError) {
            console.error("Supabase Save Error:", supabaseError);
        } else {
            console.log("Step 3: Successfully saved to Supabase.");
        }

        return processedLeads;
    } catch (error: any) {
        console.error("CRITICAL: Server Action Extraction Error:", error);
        return [];
    }
}

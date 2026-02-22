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

        console.log(`Found ${rawLeads.length} raw leads. Starting AI analysis in batches...`);

        // Process in batches of 5 to avoid timeouts and rate limits
        const processedLeads: Lead[] = [];
        const batchSize = 5;

        for (let i = 0; i < rawLeads.length && i < 111; i += batchSize) {
            const batch = rawLeads.slice(i, i + batchSize);
            console.log(`Processing batch ${Math.floor(i / batchSize) + 1}...`);

            const analyzedBatch = await Promise.all(
                batch.map(async (p, index) => {
                    try {
                        const analysis = await analyzeLeadWithAI(p);
                        return {
                            id: `real-${i + index}-${Date.now()}`,
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
                    } catch (err) {
                        console.error("AI Analysis failed for lead, using fallback:", err);
                        return {
                            id: `real-${i + index}-${Date.now()}`,
                            name: p.name,
                            email: p.email || "info@monjez.com",
                            phone: "Request access",
                            role: p.title,
                            company: p.organization_name,
                            description: "Ready to scale",
                            linkedin: p.linkedin_url || "#",
                            isHot: false,
                            problem: "Needs better business automation.",
                            category: 'Exec',
                            status: "New",
                            lastExtracted: new Date().toISOString().split('T')[0]
                        };
                    }
                })
            );
            processedLeads.push(...analyzedBatch);
        }

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

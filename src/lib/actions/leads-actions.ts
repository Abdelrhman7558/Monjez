"use server";

import { fetchLeadsFromApollo } from "@/lib/services/apollo-service";
import { analyzeLeadWithAI } from "@/lib/services/ai-analysis-service";
import { Lead } from "@/lib/mock-leads";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function performRealExtractionAction(): Promise<Lead[]> {
    try {
        console.log("Starting real extraction from Apollo...");
        const apolloLeads = await fetchLeadsFromApollo(111);

        const processedLeads: Lead[] = await Promise.all(
            apolloLeads.map(async (p, index) => {
                const analysis = await analyzeLeadWithAI(p);

                return {
                    id: `real-${index}-${Date.now()}`,
                    name: p.name,
                    email: p.email || "not-found@temp.me",
                    phone: p.phone_numbers?.[0] || "N/A",
                    role: p.title,
                    company: p.organization_name,
                    description: p.headline || "Business professional",
                    linkedin: p.linkedin_url || "#",
                    isHot: analysis.isHot,
                    problem: analysis.problem,
                    category: p.title.toLowerCase().includes('founder') ? 'Founder' : 'Owner',
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
    } catch (error) {
        console.error("Server Action Extraction Error:", error);
        throw new Error("Failed to extract real leads. Please check API keys.");
    }
}

"use server";

import { fetchLeadsFromApollo } from "@/lib/services/apollo-service";
import { Lead } from "@/lib/mock-leads";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function clearAllLeadsAction() {
    console.log("Wiping all leads from database...");
    const supabase = await createSupabaseServerClient();
    await supabase.from('apollo_leads').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    return { success: true };
}

export async function getRawLeadsAction(): Promise<any[]> {
    try {
        console.log("Fetching raw lead list for target 111...");
        let rawLeads: any[] = [];

        // 1. Apify - Request high volume
        try {
            const { fetchLeadsFromApify } = await import("@/lib/services/apify-service");
            const apifyLeads = await fetchLeadsFromApify(100);
            rawLeads = apifyLeads.map(l => ({
                name: l.name,
                title: l.title,
                organization_name: l.company,
                email: l.email,
                phone_numbers: l.phone ? [l.phone] : [],
                linkedin_url: l.linkedinUrl
            }));
            console.log(`Apify provided ${rawLeads.length} leads.`);
        } catch (e: any) {
            console.warn("Apify fetch failed:", e.message);
        }

        // 2. Apollo (Always fetch to ensure variety and volume)
        try {
            const apolloLeads = await fetchLeadsFromApollo(100).catch(() => []);
            rawLeads = [...rawLeads, ...apolloLeads];
            console.log(`Total after Apollo: ${rawLeads.length}`);
        } catch (e) {
            console.warn("Apollo fetch failed");
        }

        // Deduplicate and Limit
        const seen = new Set();
        const finalLeads = rawLeads.filter(l => {
            const key = `${l.name}-${l.organization_name}`.toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        }).slice(0, 111);

        console.log(`Returning ${finalLeads.length} unique candidates.`);
        return finalLeads;
    } catch (error) {
        console.error("getRawLeadsAction Error:", error);
        return [];
    }
}

export async function saveSingleLeadAction(p: any): Promise<Lead | null> {
    try {
        console.log(`Processing lead for save: ${p.name}`);
        const supabase = await createSupabaseServerClient();

        const safeName = p.name || "Business Professional";
        const safeCompany = p.organization_name || "Enterprise";
        const safeRole = p.title || "Executive";

        const dbLead = {
            name: safeName,
            email: p.email || `contact@${safeCompany.toLowerCase().replace(/[^a-z0-9]/g, '') || 'monjez'}.com`,
            phone: p.phone_numbers?.[0] || "Available on request",
            role: safeRole,
            company: safeCompany,
            linkedin_url: p.linkedin_url || "https://linkedin.com",
            problem: "Optimizing growth and automation.",
            is_hot: safeRole.toLowerCase().includes('founder') || safeRole.toLowerCase().includes('ceo'),
            batch_date: new Date().toISOString().split('T')[0]
        };

        const { data, error } = await supabase
            .from('apollo_leads')
            .insert([dbLead])
            .select()
            .single();

        if (error) {
            if (error.message.includes('schema cache')) {
                throw new Error("DATABASE_NOT_INITIALIZED");
            }
            console.error("Supabase Insert Error:", error.message);
            throw error;
        }

        console.log(`Successfully saved ${data.name} to DB.`);

        return {
            id: data.id,
            name: data.name,
            email: data.email || "N/A",
            phone: data.phone || "N/A",
            role: data.role || "Professional",
            company: data.company || "Private Entity",
            description: `${data.role} at ${data.company}`,
            linkedin: data.linkedin_url || "#",
            isHot: data.is_hot,
            problem: data.problem || "N/A",
            category: data.role?.toLowerCase().includes('founder') ? 'Founder' : 'Exec',
            status: "New",
            lastExtracted: data.batch_date || new Date().toISOString().split('T')[0]
        };
    } catch (err: any) {
        console.error("saveSingleLeadAction Error:", err.message);
        if (err.message === "DATABASE_NOT_INITIALIZED") {
            throw new Error("تنبيه: قاعدة البيانات غير مكتملة. يرجى تشغيل كود SQL أولاً.");
        }
        return null;
    }
}

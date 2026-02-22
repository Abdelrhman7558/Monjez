"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { sendCustomEmail } from "@/lib/services/email-service";
import { revalidatePath } from "next/cache";

export async function sendEmailOutreachAction(leadId: string, template: string) {
    try {
        const result = await sendCustomEmail(leadId, template);
        revalidatePath("/[locale]/dashboard/leads", "page");
        return { success: true, content: result.content };
    } catch (error: any) {
        console.error("Email Outreach Action Error:", error);
        return { success: false, error: error.message };
    }
}

export async function sendLinkedInDMAction(leadId: string, message: string) {
    const supabase = await createSupabaseServerClient();

    try {
        // Fetch lead
        const { data: lead, error: fetchError } = await supabase
            .from('apollo_leads')
            .select('*')
            .eq('id', leadId)
            .single();

        if (fetchError || !lead) throw new Error("Lead not found");

        // Real production would use LinkedIn Messaging API (Conversations API)
        // Here we mock the result and log it
        console.log(`Sending LinkedIn DM to ${lead.linkedin_url}...`);

        const { error: updateError } = await supabase
            .from('apollo_leads')
            .update({
                outreach_status: 'linkedin_sent',
                last_outreach_at: new Date().toISOString(),
                outreach_logs: [...(lead.outreach_logs || []), { type: 'linkedin_dm', date: new Date().toISOString(), content: message }]
            })
            .eq('id', leadId);

        if (updateError) throw updateError;

        revalidatePath("/[locale]/dashboard/leads", "page");
        return { success: true };
    } catch (error: any) {
        console.error("LinkedIn DM Action Error:", error);
        return { success: false, error: error.message };
    }
}

import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function sendCustomEmail(leadId: string, template: string) {
    const supabase = await createSupabaseServerClient();

    // Fetch lead details
    const { data: lead, error: fetchError } = await supabase
        .from('apollo_leads')
        .select('*')
        .eq('id', leadId)
        .single();

    if (fetchError || !lead) throw new Error("Lead not found");

    // Customize template
    const customizedContent = customizeTemplate(template, lead);

    // Mock sending (in a real app, use Resend, SendGrid, etc.)
    console.log(`Sending Email to ${lead.email}...`);
    console.log(`Content: ${customizedContent}`);

    // Update lead status
    const { error: updateError } = await supabase
        .from('apollo_leads')
        .update({
            outreach_status: 'email_sent',
            last_outreach_at: new Date().toISOString(),
            outreach_logs: [...(lead.outreach_logs || []), { type: 'email', date: new Date().toISOString(), content: customizedContent }]
        })
        .eq('id', leadId);

    if (updateError) throw updateError;

    return { success: true, content: customizedContent };
}

function customizeTemplate(template: string, lead: any): string {
    return template
        .replace(/{{name}}/g, lead.name || "عزيزي")
        .replace(/{{company}}/g, lead.company || "شركتكم الموقرة")
        .replace(/{{problem}}/g, lead.problem || "تحديات العمل الحالية");
}

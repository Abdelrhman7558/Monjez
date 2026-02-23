import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
    const supabase = await createSupabaseServerClient();
    const tables = [
        'job_status',
        'meta_settings',
        'meta_campaign_details',
        'apollo_leads',
        'linkedin_config',
        'social_assets',
        'social_posts',
        'strategy_call_leads',
        'consultant_chats',
        'tasks',
        'habits',
        'habit_logs',
        'industry_news'
    ];

    const results: Record<string, any> = {};

    for (const table of tables) {
        const { error } = await supabase.from(table).select('*').limit(0);
        if (error) {
            results[table] = { status: 'error', message: error.message, code: error.code };
        } else {
            results[table] = { status: 'ok' };
        }
    }

    // Check specific columns for apollo_leads
    const { data: leadsCols, error: leadsError } = await supabase
        .from('apollo_leads')
        .select('outreach_status, outreach_logs')
        .limit(0);

    if (leadsError) {
        results['apollo_leads_columns'] = { status: 'error', message: leadsError.message };
    } else {
        results['apollo_leads_columns'] = { status: 'ok' };
    }

    return NextResponse.json({
        timestamp: new Date().toISOString(),
        database_report: results,
        suggestion: "If errors exist, please run the SQL code in fix_database.sql and then run 'NOTIFY pgrst, reload schema';"
    });
}

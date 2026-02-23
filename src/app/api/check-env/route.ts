import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

    const report = {
        url: url,
        anon_key_preview: anonKey.substring(0, 10) + "...",
        anon_key_length: anonKey.length,
        service_key_exists: !!serviceKey,
        is_same_key: anonKey === serviceKey && anonKey !== "",
        suggestion: ""
    };

    if (report.is_same_key) {
        report.suggestion = "CRITICAL: NEXT_PUBLIC_SUPABASE_ANON_KEY is set to the same value as SERVICE_ROLE_KEY. This will break the browser client.";
    }

    return NextResponse.json(report);
}

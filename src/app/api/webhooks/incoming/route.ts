import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

const AGENT_SECRET = process.env.AGENT_SECRET_KEY;

export async function POST(request: Request) {
    try {
        // 1. Security Check: Verify Agent Secret
        const signature = request.headers.get("x-agent-secret");

        if (!AGENT_SECRET || signature !== AGENT_SECRET) {
            console.warn("[WEBHOOK] Unauthorized access attempt.");
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // 2. Parse Payload
        const payload = await request.json();
        const source = request.headers.get("x-source") || "unknown";

        console.log(`[WEBHOOK] Received signal from ${source}:`, payload);

        // 3. Log to Supabase (Audit Trail)
        const supabase = await createSupabaseServerClient();

        const { error } = await supabase
            .from("webhook_logs")
            .insert([
                {
                    source: source,
                    payload: payload as any,
                    status: 200
                }
            ] as any);

        if (error) {
            console.error("[WEBHOOK] Database Log Error:", error);
        }

        return NextResponse.json({ success: true, message: "Signal received" });

    } catch (error) {
        console.error("[WEBHOOK] Processing Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

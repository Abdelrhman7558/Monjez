import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";

// Simple in-memory rate limiter (replace with Redis/KV in production)
const rateLimit = new Map<string, { count: number; lastReset: number }>();
const WINDOW_MS = 60 * 60 * 1000; // 1 Hour
const LIMIT = 5;

const schema = z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    companyType: z.string(),
    role: z.string(),
    monthlyRevenue: z.string(),
    mainProblem: z.string().min(10),
});

export async function POST(request: Request) {
    try {
        // 1. Rate Limiting
        const ip = request.headers.get("x-forwarded-for") || "unknown";
        const now = Date.now();
        const record = rateLimit.get(ip) || { count: 0, lastReset: now };

        if (now - record.lastReset > WINDOW_MS) {
            record.count = 0;
            record.lastReset = now;
        }

        if (record.count >= LIMIT) {
            return NextResponse.json({ error: "Rate limit exceeded. Try again later." }, { status: 429 });
        }

        record.count++;
        rateLimit.set(ip, record);

        // 2. Validation
        const body = await request.json();
        const validation = schema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: "Invalid data", details: validation.error.format() }, { status: 400 });
        }

        const { data } = validation;

        // 3. Database Insertion (Server-side)
        const supabase = await createSupabaseServerClient();

        // We use server client which has access to cookies, but for public form
        // submission we rely on RLS allowing INSERT for anon users.
        const { error: dbError } = await supabase
            .from("strategy_call_leads")
            .insert([
                {
                    full_name: data.fullName,
                    email: data.email,
                    company_type: data.companyType,
                    role: data.role,
                    monthly_revenue: data.monthlyRevenue,
                    main_problem: data.mainProblem,
                    status: "new"
                }
            ] as any);

        if (dbError) {
            console.error("DB Error:", dbError);
            return NextResponse.json({ error: "Database error" }, { status: 500 });
        }

        // 4. Trigger Email (Simulation)
        console.log(`[EMAIL TRIGGER] Sending confirmation to ${data.email} and alert to admin.`);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

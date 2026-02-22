import { NextRequest, NextResponse } from "next/server";
import { performRealExtractionAction } from "@/lib/actions/leads-actions";
import { generateSocialPostsForDay, postToLinkedIn } from "@/lib/services/linkedin-service";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
    // Only allow if it comes from a trusted cron service or matches our secret
    const url = new URL(req.url);
    const secret = url.searchParams.get('secret');

    if (secret !== process.env.AGENT_SECRET_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        console.log("Cron started: Fetching leads...");
        // 1. Fetch 111 leads from Apollo (this action already processes them)
        const leads = await performRealExtractionAction();

        // 2. Persist leads to Supabase
        const supabase = await createSupabaseServerClient();
        const { error: leadError } = await supabase.from('apollo_leads').insert(
            leads.map(l => ({
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

        if (leadError) throw leadError;

        // 3. Generate and Post to LinkedIn
        console.log("Generating social posts...");
        const posts = await generateSocialPostsForDay();

        for (const post of posts) {
            await postToLinkedIn(post);
        }

        return NextResponse.json({
            success: true,
            leadsProcessed: leads.length,
            postsGenerated: posts.length
        });
    } catch (error: any) {
        console.error("Cron Job Failed:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

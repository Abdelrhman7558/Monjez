import { NextRequest, NextResponse } from "next/server";
import { performRealExtractionAction } from "@/lib/actions/leads-actions";
import { generateSocialPostsForDay, postToLinkedIn } from "@/lib/services/linkedin-service";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const secret = url.searchParams.get('secret');

    // Security Check
    if (secret !== process.env.AGENT_SECRET_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createSupabaseServerClient();
    const now = new Date();
    const hour = now.getHours();

    try {
        // Phase 1: Morning Setup (Around 7 AM) - Extraction & Schedule Generation
        if (hour >= 6 && hour <= 8) {
            console.log("Morning Cron: Initializing Daily Sequence...");

            // 1. Run full autonomous extraction
            const leads = await performRealExtractionAction();

            // 2. Generate 4 varied social posts
            const posts = await generateSocialPostsForDay();
            const scheduledTimes = [9, 12, 15, 18]; // 9 AM, 12 PM, 3 PM, 6 PM

            for (let i = 0; i < posts.length; i++) {
                const scheduleDate = new Date();
                scheduleDate.setHours(scheduledTimes[i] || 9, 0, 0, 0);

                await supabase.from('social_posts').insert({
                    content: posts[i].content,
                    post_type: posts[i].type,
                    status: 'scheduled',
                    scheduled_at: scheduleDate.toISOString(),
                    analytics: { category: posts[i].category }
                });
            }

            return NextResponse.json({
                success: true,
                phase: "Initialization",
                leadsExtracted: leads.length,
                postsScheduled: posts.length
            });
        }

        // Phase 2: Dispatcher (Runs any other time) - Check for due posts
        console.log("Dispatcher Cron: Checking for due posts...");
        const { data: pendingPosts, error: fetchError } = await supabase
            .from('social_posts')
            .select('*')
            .eq('status', 'scheduled')
            .lte('scheduled_at', now.toISOString());

        if (fetchError) throw fetchError;

        if (pendingPosts && pendingPosts.length > 0) {
            console.log(`Found ${pendingPosts.length} posts to publish.`);
            for (const p of pendingPosts) {
                await postToLinkedIn({
                    content: p.content,
                    type: p.post_type as any
                });

                await supabase
                    .from('social_posts')
                    .update({ status: 'posted' })
                    .eq('id', p.id);
            }
        }

        return NextResponse.json({
            success: true,
            phase: "Dispatch",
            postsDispatched: pendingPosts?.length || 0
        });

    } catch (error: any) {
        console.error("Cron Job Failed:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

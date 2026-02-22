import { createClient } from "@/lib/supabase/server";

export interface LinkedInPost {
    content: string;
    type: 'Post' | 'Video' | 'Photo';
}

export async function generateSocialPostsForDay(): Promise<LinkedInPost[]> {
    // This will eventually call an AI service to generate content
    return [
        { content: "Exploring the future of automation in the MENA region. #Monjez #AI #SaudiVision2030", type: 'Post' },
        { content: "How we're helping 100+ founders automate their lead gen every single day.", type: 'Post' },
        { content: "Check out our new LinkedIn Agent in action!", type: 'Video' },
    ];
}

export async function postToLinkedIn(post: LinkedInPost) {
    const ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
    const MEMBER_ID = process.env.LINKEDIN_MEMBER_ID;

    if (!ACCESS_TOKEN || !MEMBER_ID) {
        console.warn("LinkedIn credentials missing. Logging post to DB only.");
        return await logPostToDatabase(post, 'failed', { error: 'Credentials missing' });
    }

    try {
        // LinkedIn API implementation for text posts
        // For Photos/Videos, it requires a multi-step upload process
        const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ACCESS_TOKEN}`,
                "Content-Type": "application/json",
                "X-Restli-Protocol-Version": "2.0.0"
            },
            body: JSON.stringify({
                author: MEMBER_ID,
                lifecycleState: "PUBLISHED",
                specificContent: {
                    "com.linkedin.ugc.ShareContent": {
                        shareCommentary: { text: post.content },
                        shareMediaCategory: post.type === 'Post' ? 'NONE' : post.type.toUpperCase()
                    }
                },
                visibility: { "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC" }
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(JSON.stringify(error));
        }

        const data = await response.json();
        await logPostToDatabase(post, 'posted', data);
    } catch (error: any) {
        console.error("LinkedIn Post Error:", error);
        await logPostToDatabase(post, 'failed', { error: error.message });
    }
}

async function logPostToDatabase(post: LinkedInPost, status: string, analytics: any) {
    const supabase = await createClient();
    const { error } = await supabase.from('social_posts').insert({
        content: post.content,
        post_type: post.type,
        status,
        analytics
    });

    if (error) console.error("Database log error:", error);
}

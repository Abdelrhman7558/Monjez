import { createSupabaseServerClient } from "@/lib/supabase/server";

export interface LinkedInPost {
    content: string;
    type: 'Post' | 'Video' | 'Photo';
    category?: string;
}

export async function getLinkedInMemberId(accessToken: string): Promise<string> {
    try {
        const response = await fetch("https://api.linkedin.com/v2/userinfo", {
            headers: { "Authorization": `Bearer ${accessToken}` }
        });
        if (!response.ok) {
            // Fallback to older /me endpoint if userinfo fails
            const meRes = await fetch("https://api.linkedin.com/v2/me", {
                headers: { "Authorization": `Bearer ${accessToken}` }
            });
            const meData = await meRes.json();
            return `urn:li:person:${meData.id}`;
        }
        const data = await response.json();
        return `urn:li:person:${data.sub}`; // userinfo uses 'sub'
    } catch (error) {
        console.error("Failed to fetch LinkedIn Member ID:", error);
        throw new Error("Could not retrieve LinkedIn Member ID automatically.");
    }
}

export async function generateSocialPostsForDay(): Promise<LinkedInPost[]> {
    const categories = [
        "Daily Life",
        "Client Success/Problem Solved",
        "Professional Tips",
        "Behind the Scenes/Work Culture"
    ];

    // In a real scenario, this would call an LLM (MiniMax) to generate professional Arabic/EN storytelling hooks
    return categories.map((cat, idx) => ({
        content: generateMockProfessionalContent(cat),
        type: idx === 2 ? 'Photo' : 'Post',
        category: cat
    }));
}

function generateMockProfessionalContent(category: string): string {
    const hooks = {
        "Daily Life": "مفيش حاجة بتوقف الشغف.. يومي بيبدأ الساعة 5 الصبح بقهوة وتخطيط للمستقبل. ☕✨",
        "Client Success/Problem Solved": "أكبر مشكلة واجهت عميل لينا الأسبوع ده كانت ضياع 40 ساعة شغل يدوي. الحل؟ أتمتة بسيطة غيرت كل حاجة. 🚀",
        "Professional Tips": "نصيحة النهاردة لكل رائد أعمال في السعودية: الذكاء الاصطناعي مش هيستبدلك، بس اللي بيستخدمه هيسبقك بمسافات. 💡",
        "Behind the Scenes/Work Culture": "كواليس شغلنا في 'منجز' مش بس كود وبرمجة، دي روح فريق بتعشق التحدي. 🤝🦾"
    };

    const content = hooks[category as keyof typeof hooks] || "Exploring new horizons in automation.";
    const hashtags = "\n\n#منجز #ذكاء_اصطناعي #ريادة_الأعمال #السعودية #Monjez #AI #SuccessStory #Automation";

    return `${content}${hashtags}`;
}

export async function postToLinkedIn(post: LinkedInPost, existingId?: string) {
    const supabase = await createSupabaseServerClient();
    const { data: config } = await supabase.from('linkedin_config').select('*').single();

    const ACCESS_TOKEN = config?.access_token || process.env.LINKEDIN_ACCESS_TOKEN;
    let MEMBER_ID = config?.member_id || process.env.LINKEDIN_MEMBER_ID;

    if (!ACCESS_TOKEN) {
        console.warn("LinkedIn Access Token missing.");
        return await logPostToDatabase(post, 'failed', { error: 'Access Token missing' }, existingId);
    }

    try {
        // Auto-fetch Member ID if not provided
        if (!MEMBER_ID || MEMBER_ID === 'your_member_id_here') {
            console.log("Fetching Member ID automatically...");
            MEMBER_ID = await getLinkedInMemberId(ACCESS_TOKEN);
            // Save it back to config for next time
            if (config) {
                await supabase.from('linkedin_config').update({ member_id: MEMBER_ID }).eq('id', config.id);
            }
        }

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
            const errorData = await response.json();
            const msg = errorData.message || JSON.stringify(errorData);
            await logPostToDatabase(post, 'failed', { error: msg }, existingId);
            throw new Error(`LinkedIn API Error: ${msg}`);
        }

        const data = await response.json();
        await logPostToDatabase(post, 'posted', data, existingId);
        return { success: true, data };
    } catch (error: any) {
        console.error("LinkedIn Post Error:", error);
        await logPostToDatabase(post, 'failed', { error: error.message }, existingId);
        throw error;
    }
}

async function logPostToDatabase(post: LinkedInPost, status: string, analytics: any, existingId?: string) {
    const supabase = await createSupabaseServerClient();

    if (existingId) {
        const { error } = await supabase.from('social_posts')
            .update({ status, analytics })
            .eq('id', existingId);
        if (error) console.error("Database update error:", error);
        return;
    }

    const { error } = await supabase.from('social_posts').insert({
        content: post.content,
        post_type: post.type,
        status,
        analytics
    });

    if (error) console.error("Database log error:", error);
}

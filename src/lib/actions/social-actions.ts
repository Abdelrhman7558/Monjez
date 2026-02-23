"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { postToLinkedIn, LinkedInPost, getLinkedInMemberId } from "@/lib/services/linkedin-service";
import { revalidatePath } from "next/cache";

// LinkedIn Connection
export async function getLinkedInConfigAction() {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from('linkedin_config')
        .select('*')
        .single();

    if (error && error.code !== 'PGRST116') {
        console.error("Error fetching linkedin config:", error);
    }
    return data;
}

export async function updateLinkedInConfigAction(updates: any) {
    const supabase = await createSupabaseServerClient();
    const config = await getLinkedInConfigAction();

    if (config) {
        await supabase
            .from('linkedin_config')
            .update({ ...updates, updated_at: new Date().toISOString() })
            .eq('id', config.id);
    } else {
        await supabase
            .from('linkedin_config')
            .insert([{ ...updates }]);
    }
}

// Social Assets
export async function getSocialAssetsAction() {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from('social_assets')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) console.error("Error fetching assets:", error);
    return data || [];
}

export async function addSocialAssetAction(asset: { name: string, type: string, size: string, url: string }) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
        .from('social_assets')
        .insert([asset])
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteSocialAssetAction(id: string) {
    const supabase = await createSupabaseServerClient();
    await supabase.from('social_assets').delete().eq('id', id);
}

// Posting
export async function triggerLinkedInPostAction(content: string, type: 'Post' | 'Video' | 'Photo') {
    const post: LinkedInPost = { content, type };
    const result = await postToLinkedIn(post);
    revalidatePath("/[locale]/dashboard/social", "page");
    return result;
}

// Token Verification

export async function verifyLinkedInTokenAction(token: string) {
    try {
        const memberId = await getLinkedInMemberId(token);
        await updateLinkedInConfigAction({
            is_connected: true,
            access_token: token,
            member_id: memberId
        });
        return { success: true, memberId };
    } catch (error: any) {
        console.error("Token verification failed:", error);
        throw new Error(error.message || "Invalid Access Token");
    }
}

export async function refinePostAction(postId: string, feedback: string) {
    const supabase = await createSupabaseServerClient();

    // Fetch current post
    const { data: post, error: fetchError } = await supabase
        .from('social_posts')
        .select('*')
        .eq('id', postId)
        .single();

    if (fetchError || !post) throw new Error("Post not found");

    // Simulate AI Refinement (In a real app, this calls MiniMax/GPT-4)
    // Here we wrap the content or adjust tone based on feedback
    const originalContent = post.original_content || post.content;
    const refinedContent = `[AI Refined Version]\n\n${originalContent}\n\nNote: Refined based on feedback: "${feedback}"`;

    const { data, error } = await supabase
        .from('social_posts')
        .update({
            content: refinedContent,
            refinement_feedback: feedback,
            original_content: originalContent,
            updated_at: new Date().toISOString()
        })
        .eq('id', postId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function generateSinglePostAction() {
    const { generateSocialPostsForDay } = await import('@/lib/services/linkedin-service');
    const posts = await generateSocialPostsForDay();
    return posts[Math.floor(Math.random() * posts.length)];
}

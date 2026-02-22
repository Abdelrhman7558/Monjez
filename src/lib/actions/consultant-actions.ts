"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getConsultantChatHistory() {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return [];

    const { data, error } = await supabase
        .from('consultant_chats')
        .select('*')
        .order('created_at', { ascending: true });

    if (error) {
        console.error("Error fetching chat history:", error);
        return [];
    }

    return data.map(m => ({ role: m.role, content: m.content }));
}

export async function saveConsultantChatMessage(role: 'user' | 'assistant', content: string) {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
        .from('consultant_chats')
        .insert([{ user_id: user.id, role, content }]);

    if (error) {
        console.error("Error saving chat message:", error);
    }
}

export async function generateConsultantResponse(messages: { role: string, content: string }[]) {
    const MODEL_KEY = process.env.MINMAK_MODEL_KEY;

    if (!MODEL_KEY) {
        throw new Error("MinMak Model Key is missing.");
    }

    // System prompt for Egyptian Personality
    const systemPrompt = `
        أنت "منجز"، مستشار البزنس والحياة الشخصي المصري. 
        شخصيتك: جدع، ذكي جداً، ابن بلد، دمه خفيف بس لما يجي وقت الجد بيكون قمة في التركيز والاحترافية.
        - اتكلم مصري عامي 100% "زي ما بنتكلم في الشارع والقهوة".
        - ابعد عن أي لغة عربية فصحى نهائياً (زي "لماذا"، "سوف"، "هذا"). استبدلها بـ "ليه"، "هـ"، "ده".
        - استخدم لزمات مصرية زي "يا باشا"، "يا بطل"، "بص يا سيدي"، "قشطة"، "تمام التمام".
        - خليك مشجع وعملي جداً. ماتدينيش نصايح عامة، اديني خطوات 1- 2- 3.
        - هدفك إن اليوزر يخلص (ينجز) مهامه وينجح في البزنس بتاعه.
    `;

    try {
        const response = await fetch("https://api.minimax.chat/v1/text/chatcompletion_pro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${MODEL_KEY}`
            },
            body: JSON.stringify({
                model: "abab6.5s-chat",
                messages: [
                    { role: "system", content: systemPrompt },
                    ...messages
                ],
                temperature: 0.7,
                tokens_to_generate: 1000
            })
        });

        if (!response.ok) {
            const errorData = await response.text();
            console.error("LLM API Error:", errorData);
            throw new Error(`AI Service Error: ${response.status}`);
        }

        const data = await response.json();

        // MiniMax specific parsing
        let assistantResponse = data.choices?.[0]?.message?.content ||
            data.choices?.[0]?.messages?.[0]?.content ||
            data.reply || "";

        return assistantResponse || "معلش يا صاحبي، التفكير خدني شوية وتاه مني الرد. اسأل تاني كدة؟";
    } catch (error: any) {
        console.error("Consultant AI Error:", error);
        return "معلش يا باشا، حصل قفلة في السيرفر عندي. ثواني كدة وجرب تبعت رسالتك تاني، أنا معاك وقاعد مش ماشي.";
    }
}

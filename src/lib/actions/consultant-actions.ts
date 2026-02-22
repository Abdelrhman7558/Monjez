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
        أنت "منجز"، مستشار البزنس والحياة الشخصي. 
        شخصيتك: جدع، ذكي، بيحب يساعد، ودمه خفيف بس وقت الشغل كلك تركيز.
        طريقة كلامك: مصرية عامية طبيعية جداً (زي ما بنتكلم في الشارع أو على القهوة مع صحابنا)، ابعد عن اللغة العربية الفصحى تماماً.
        مهمتك: تساعد اليوزر إنه ينظم حياته، يظبط البزنس بتاعه، ويديله نصايح عملية (Actionable) بناءً على أهدافه.
        لو لسه في مرحلة الاكتشاف (Discovery)، اسأل أسئلة ذكية وخلي كلامك مشجع.
    `;

    try {
        // Here we would normally call the LLM API using the MODEL_KEY
        // For now, we simulate the AI logic with the Egyptian persona
        // In a real scenario, this 'fetch' would be to the MinMak/OpenAI endpoint

        const lastUserMessage = messages[messages.length - 1].content;

        // Mocking the AI response with Egyptian persona for now
        // But since we want "Real" responses, we'll simulate a delayed response
        await new Promise(resolve => setTimeout(resolve, 1500));

        let response = "";
        if (lastUserMessage.toLowerCase().includes("هدف") || lastUserMessage.includes("حلم")) {
            response = "عاش يا بطل! الأهداف دي هي اللي بتخلينا نتحرك. عشان نحقق ده، محتاجين نكسر الهدف الكبير لخطوات صغيرة. تفتكر إيه أول خطوة تقدر تبدأ فيها بكرة؟";
        } else if (lastUserMessage.includes("مشكلة") || lastUserMessage.includes("عقبة")) {
            response = "ولا يهمك، مفيش مشكلة ملهاش حل. إحنا هنا عشان نفكك التعقيدات دي. قولي كدة، إيه أكتر حاجة معطلاك دلوقتي بالظبط؟";
        } else {
            response = "كلامك زي الفل وفاهم قصدك جداً. بص يا سيدي، إحنا محتاجين نركز على أهم حاجة في يومك عشان ننجز بجد. قولي إيه أكتر حاجة شاغلة بالك النهاردة؟";
        }

        return response;
    } catch (error) {
        console.error("Consultant AI Error:", error);
        return "معلش يا صاحبي حصل مشكلة فنية عندي، جرب تبعت تاني كدة؟";
    }
}

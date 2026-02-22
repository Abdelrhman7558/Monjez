// Native fetch in Node 24
require('dotenv').config({ path: '.env.local' });

async function testConsultant() {
    const MODEL_KEY = process.env.MINMAK_MODEL_KEY;
    console.log("Using Key:", MODEL_KEY ? MODEL_KEY.substring(0, 10) + "..." : "MISSING");

    const systemPrompt = "أنت منجز، مستشار مصري جدع.";
    const messages = [{ role: "user", content: "يا منجز، إزاي أكبر البيزنس بتاعي في السعودية؟" }];

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
                temperature: 0.7
            })
        });

        const data = await response.json();
        console.log("Response:", JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Error:", e);
    }
}

testConsultant();

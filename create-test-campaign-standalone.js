
const ACCESS_TOKEN = "EAAMq7S6ZBgJsBQtlqWjeTWr58MFBehbHFMUVfQZAZCFJefJGcDFueQUABKeXREzYx2GBG6lCtIkzBoRbH5XB4iG8bm3Hd8DqbveAtOqf1hK6QmVajxUa2f1ytZBEtFkheZA13RCofVQ5kHX0A9bazi9zTEGHcnQn2OrnVhg9YFXYq50LNfauhZCimbRs6CwuSZA2hbvII6N9NCasj6O";
const AD_ACCOUNT_ID = "act_1178710537127710";

async function createCampaign() {
    console.log("Starting Meta Campaign Creation...");
    try {
        const response = await fetch(`https://graph.facebook.com/v19.0/${AD_ACCOUNT_ID}/campaigns`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: "Monjez Test Campaign (PAUSED)",
                objective: "OUTCOME_AWARENESS",
                status: "PAUSED",
                special_ad_categories: [],
                access_token: ACCESS_TOKEN
            }),
        });

        const data = await response.json();
        if (response.ok) {
            console.log("SUCCESS! Campaign ID:", data.id);
        } else {
            console.error("FAILED:", data.error?.message || data);
        }
    } catch (e) {
        console.error("NETWORK ERROR:", e.message);
    }
}

createCampaign();

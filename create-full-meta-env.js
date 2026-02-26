const fs = require('fs');

const ACCESS_TOKEN = "EAAMq7S6ZBgJsBQ4sqRwJcPQmDqLtbykCW3Q4XA9pb4qrzkKYd1g3GFMktZCkZArYrQZCxhfRnAep8iawN0gVwW0Xjxa5WwKXYYhfy4ZAqF1ZB8vDk9cheoRUA27UnQQyhGC4fo0vRQ8VZAivQeAFIDZAXN7YLM3ZAkHy4oW7ZAUZCZCOorg08FEsRHOCsOY1JKH7HTxF";
const AD_ACCOUNT_ID = "act_614301798011864";
const PIXEL_ID = "1993826061113647";
const PAGE_ID = "729645653574996";
const API_VERSION = 'v19.0';
const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper to make API calls
async function fbApi(endpoint, body) {
    body.access_token = ACCESS_TOKEN;
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    });

    const data = await response.json();
    if (data.error) {
        console.error(`❌ Meta API Error [${endpoint}]:`, JSON.stringify(data.error));
        throw new Error(data.error.message || JSON.stringify(data.error));
    }
    return data;
}

const combinations = [
    {
        objective: 'OUTCOME_LEADS',
        name: 'TEST_LEADS',
        optimization_goal: 'LEAD_GENERATION',
        destination_type: null
    },
    {
        objective: 'OUTCOME_SALES',
        name: 'TEST_SALES',
        optimization_goal: 'OFFSITE_CONVERSIONS',
        destination_type: 'WEBSITE'
    }
];

async function run() {
    console.log(`🚀 Starting Full Hierarchy Creation for ${AD_ACCOUNT_ID}`);

    for (const config of combinations) {
        try {
            console.log(`\n==========================================`);
            console.log(`⚙️  Objective: ${config.objective}`);

            // 1. Create Campaign
            let campaignBody = {
                name: `${config.name}_CAMPAIGN`,
                objective: config.objective,
                status: 'PAUSED',
                special_ad_categories: [],
                daily_budget: 100000 // Required for CBO usually
            };
            const campRes = await fbApi(`${AD_ACCOUNT_ID}/campaigns`, campaignBody);
            const campaignId = campRes.id;
            console.log(`✅ Campaign created: ${campaignId}`);

            // 2. Create Ad Set
            let adSetBody = {
                name: `${config.name}_ADSET_BROAD`,
                campaign_id: campaignId,
                status: 'PAUSED',
                optimization_goal: config.optimization_goal,
                billing_event: 'IMPRESSIONS',
                bid_amount: 100, // Minimal manual bid to avoid budget errors on some objectives
                targeting: {
                    geo_locations: { countries: ['EG'] },
                    age_min: 18,
                    age_max: 65
                }
            };

            // Specialized AdSet requirements based on goal
            if (config.objective === 'OUTCOME_SALES') {
                adSetBody.promoted_object = {
                    pixel_id: PIXEL_ID,
                    custom_event_type: 'PURCHASE'
                };
            } else if (config.objective === 'OUTCOME_LEADS') {
                adSetBody.promoted_object = {
                    page_id: PAGE_ID
                };
            }

            const adsetRes = await fbApi(`${AD_ACCOUNT_ID}/adsets`, adSetBody);
            const adSetId = adsetRes.id;
            console.log(`✅ AdSet created: ${adSetId}`);

            // 3. Create AdCreative (Text-only link format)
            let creativeBody = {
                name: `${config.name}_CREATIVE`,
                object_story_spec: {
                    page_id: PAGE_ID,
                    link_data: {
                        link: 'https://monjez.net',
                        message: 'هذا إعلان تجريبي من منجز', // Test ad message
                        name: 'اكتشف المزيد معنا',
                    }
                }
            };

            const creativeRes = await fbApi(`${AD_ACCOUNT_ID}/adcreatives`, creativeBody);
            const creativeId = creativeRes.id;
            console.log(`✅ AdCreative created: ${creativeId}`);

            // 4. Create Ad
            let adBody = {
                name: `${config.name}_AD_SINGLE_IMAGE`,
                adset_id: adSetId,
                creative: { creative_id: creativeId },
                status: 'PAUSED'
            };

            const adRes = await fbApi(`${AD_ACCOUNT_ID}/ads`, adBody);
            const adId = adRes.id;
            console.log(`✅ Ad created: ${adId}`);

            await sleep(2000); // Backoff for rate limits
        } catch (e) {
            console.error(`💥 Failed to create hierarchy for ${config.objective}: ${e.message}`);
        }
    }

    console.log(`\n🎉 Processing Complete!`);
}

run();

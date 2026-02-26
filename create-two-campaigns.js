const fs = require('fs');

const ACCESS_TOKEN = "EAAMq7S6ZBgJsBQ4sqRwJcPQmDqLtbykCW3Q4XA9pb4qrzkKYd1g3GFMktZCkZArYrQZCxhfRnAep8iawN0gVwW0Xjxa5WwKXYYhfy4ZAqF1ZB8vDk9cheoRUA27UnQQyhGC4fo0vRQ8VZAivQeAFIDZAXN7YLM3ZAkHy4oW7ZAUZCZCOorg08FEsRHOCsOY1JKH7HTxF";
const AD_ACCOUNT_ID = "act_13738273200099";
const PIXEL_ID = "1993826061113647";
const CATALOG_ID = "1592234531420724";
const PAGE_ID = "729645653574996";
const API_VERSION = 'v19.0';
const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;

const IMAGE_URL = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1080&auto=format&fit=crop";

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

// GET Helper
async function fbGet(endpoint) {
    const response = await fetch(`${BASE_URL}/${endpoint}?access_token=${ACCESS_TOKEN}`, {
        method: 'GET'
    });

    const data = await response.json();
    if (data.error) {
        console.error(`❌ Meta API Error GET [${endpoint}]:`, JSON.stringify(data.error));
        throw new Error(data.error.message || JSON.stringify(data.error));
    }
    return data;
}

async function run() {
    console.log(`🚀 Starting dual-format campaign creation for ${AD_ACCOUNT_ID}`);

    try {
        // 0. Setup Product Set ID for Catalog Ad
        console.log(`\n⚙️  Fetching Product Sets from Catalog ${CATALOG_ID}...`);
        const psetsRes = await fbGet(`${CATALOG_ID}/product_sets`);
        let productSetId = null;
        if (psetsRes.data && psetsRes.data.length > 0) {
            productSetId = psetsRes.data[0].id; // Use the first available product set (usually 'All Products')
            console.log(`✅ Using existing Product Set ID: ${productSetId}`);
        } else {
            console.log(`⚠️ No Product Set found! Creating "All Products" fallback...`);
            const createPsetRes = await fbApi(`${CATALOG_ID}/product_sets`, {
                name: 'All Products (Auto Gen)',
                filter: '{"retailer_item_id":{"i_contains":""}}'
            });
            productSetId = createPsetRes.id;
            console.log(`✅ Created Product Set ID: ${productSetId}`);
        }

        // ==========================================
        // CAMPAIGN 1: Single Image Ad (TRAFFIC)
        // ==========================================
        console.log(`\n==========================================`);
        console.log(`⚙️  Creating Campaign 1: Single Image (TRAFFIC)`);

        const camp1Id = (await fbApi(`${AD_ACCOUNT_ID}/campaigns`, {
            name: `TEST_C1_IMAGE_NO_BID`,
            objective: 'OUTCOME_TRAFFIC',
            status: 'PAUSED',
            special_ad_categories: [],
            daily_budget: 100000,
            bid_strategy: 'LOWEST_COST_WITHOUT_CAP'
        })).id;
        console.log(`✅ Campaign 1 created: ${camp1Id}`);

        const adset1Id = (await fbApi(`${AD_ACCOUNT_ID}/adsets`, {
            name: `ADSET1_IMAGE_NO_BID`,
            campaign_id: camp1Id,
            status: 'PAUSED',
            optimization_goal: 'LINK_CLICKS',
            billing_event: 'IMPRESSIONS',
            targeting: {
                geo_locations: { countries: ['EG', 'SA', 'AE'] },
                age_min: 18,
                age_max: 65
            },
            promoted_object: { pixel_id: PIXEL_ID, custom_event_type: 'PURCHASE' }
        })).id;
        console.log(`✅ AdSet 1 created: ${adset1Id}`);

        const creative1Id = (await fbApi(`${AD_ACCOUNT_ID}/adcreatives`, {
            name: `CREATIVE1_IMAGE`,
            object_story_spec: {
                page_id: PAGE_ID,
                link_data: {
                    picture: IMAGE_URL,
                    link: 'https://monjez.net',
                    message: 'إعلان صورة بدون تقديم سعر العطاء!',
                    name: 'اضغط هنا للتجربة'
                }
            }
        })).id;
        console.log(`✅ AdCreative 1 created: ${creative1Id}`);

        const ad1Id = (await fbApi(`${AD_ACCOUNT_ID}/ads`, {
            name: `AD1_SINGLE_IMAGE`,
            adset_id: adset1Id,
            creative: { creative_id: creative1Id },
            status: 'PAUSED'
        })).id;
        console.log(`✅ Ad 1 created: ${ad1Id}`);

        await sleep(2000);

        // ==========================================
        // CAMPAIGN 2: Catalog Ad (SALES)
        // ==========================================
        console.log(`\n==========================================`);
        console.log(`⚙️  Creating Campaign 2: Catalog (SALES)`);

        const camp2Id = (await fbApi(`${AD_ACCOUNT_ID}/campaigns`, {
            name: `TEST_C2_CATALOG_NO_BID`,
            objective: 'OUTCOME_SALES',
            status: 'PAUSED',
            special_ad_categories: [],
            daily_budget: 100000,
            bid_strategy: 'LOWEST_COST_WITHOUT_CAP'
        })).id;
        console.log(`✅ Campaign 2 created: ${camp2Id}`);

        const adset2Id = (await fbApi(`${AD_ACCOUNT_ID}/adsets`, {
            name: `ADSET2_CATALOG_NO_BID`,
            campaign_id: camp2Id,
            status: 'PAUSED',
            optimization_goal: 'OFFSITE_CONVERSIONS',
            billing_event: 'IMPRESSIONS',
            promoted_object: {
                pixel_id: PIXEL_ID,
                custom_event_type: 'PURCHASE',
                product_set_id: productSetId
            },
            targeting: {
                geo_locations: { countries: ['EG', 'SA', 'AE'] },
                age_min: 18,
                age_max: 65,
                // Advantage+ Catalog Ads targeting requirement
                dynamic_audience_ids: []
            }
        })).id;
        console.log(`✅ AdSet 2 created: ${adset2Id}`);

        const creative2Id = (await fbApi(`${AD_ACCOUNT_ID}/adcreatives`, {
            name: `CREATIVE2_CATALOG`,
            object_story_spec: {
                page_id: PAGE_ID,
                template_data: {
                    link: 'https://monjez.net',
                    message: 'تصفح أحدث المنتجات من الكتالوج تلقائياً!',
                    name: '{{product.name}}', // dynamic tag
                    description: '{{product.price}}'
                }
            },
            template_url_spec: {
                config_data: {
                    catalog_id: CATALOG_ID,
                    product_set_id: productSetId
                }
            }
        })).id;
        console.log(`✅ AdCreative 2 created: ${creative2Id}`);

        const ad2Id = (await fbApi(`${AD_ACCOUNT_ID}/ads`, {
            name: `AD2_CATALOG_DYNAMIC`,
            adset_id: adset2Id,
            creative: { creative_id: creative2Id },
            status: 'PAUSED'
        })).id;
        console.log(`✅ Ad 2 created: ${ad2Id}`);

        console.log(`\n🎉 Processing Complete! Both campaigns safely generated without bid limits.`);

    } catch (e) {
        console.error(`💥 Failed during execution: ${e.message}`);
    }
}

run();

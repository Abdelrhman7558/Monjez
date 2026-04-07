const fs = require('fs');

// We need two configurations
const accounts = [
    {
        name: "User Account (614301798011864)",
        access_token: "EAAMq7S6ZBgJsBQ4sqRwJcPQmDqLtbykCW3Q4XA9pb4qrzkKYd1g3GFMktZCkZArYrQZCxhfRnAep8iawN0gVwW0Xjxa5WwKXYYhfy4ZAqF1ZB8vDk9cheoRUA27UnQQyhGC4fo0vRQ8VZAivQeAFIDZAXN7YLM3ZAkHy4oW7ZAUZCZCOorg08FEsRHOCsOY1JKH7HTxF",
        account_id: "act_614301798011864",
        pixel_id: "1993826061113647",
        catalog_id: "1592234531420724",
        page_id: "729645653574996"
    },
    {
        name: "Monjez Account (1178710537127710)",
        access_token: "", // Will be populated from .env.local
        account_id: "act_1178710537127710",
        pixel_id: "1503415507419721",
        catalog_id: "", // Will be fetched
        page_id: "1235405578002572"
    }
];

const API_VERSION = 'v19.0';
const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;

// Assets
const IMAGE_URL = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1080&auto=format&fit=crop";
const VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4";

// 1. Load Monjez Credentials from .env.local
function loadMonjezEnv() {
    try {
        const envContentBuf = fs.readFileSync('.env.local');
        const envContentStr = envContentBuf.toString('utf8').replace(/\0/g, '');
        const lines = envContentStr.split('\n').map(l => l.trim());

        for (const line of lines) {
            // Some .env files might have spaces or weird formatting
            // We'll clean the line by removing all spaces and then matching
            const cleanLine = line.replace(/\s+/g, '');
            if (cleanLine.includes('FB_ACCESS_TOKEN=')) {
                accounts[1].access_token = cleanLine.split('FB_ACCESS_TOKEN=')[1];
            } else if (cleanLine.includes('FB_PAGE_ID=')) {
                accounts[1].page_id = cleanLine.split('FB_PAGE_ID=')[1];
            } else if (cleanLine.includes('FB_PIXEL_ID=')) {
                accounts[1].pixel_id = cleanLine.split('FB_PIXEL_ID=')[1];
            }
        }
        console.log(`✅ Loaded Monjez .env.local credentials`);
        console.log(`DEBUG: Monjez Page ID: ${accounts[1].page_id}`);
    } catch (err) {
        console.log("⚠️ No .env.local found or error parsing, using defaults if available.");
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const WEBHOOK_URL = "https://n8n.srv1181726.hstgr.cloud/webhook-test/Creative&Ad";

// Helper to log to user's webhook
async function logToWebhook(type, account, endpoint, body) {
    try {
        const fullUrl = `${BASE_URL}/${endpoint}`;
        await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                timestamp: new Date().toISOString(),
                type: type,
                account_id: account.account_id,
                account_name: account.name,
                access_token: account.access_token,
                catalog_id: account.catalog_id || "N/A",
                request_url: fullUrl,
                method: 'POST', // Mostly POST in this script
                payload: body
            })
        });
    } catch (e) {
        console.log(`⚠️ Webhook log failed: ${e.message}`);
    }
}

// 2. Fetch Helper 
async function fbApi(endpoint, acc, method = 'GET', body = null) {
    const token = acc.access_token;
    let url = `${BASE_URL}/${endpoint}`;
    let options = { method };

    if (method === 'GET') {
        url += `${url.includes('?') ? '&' : '?'}access_token=${token}`;
    } else {
        body = body || {};
        body.access_token = token;
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(body);

        // Log every POST request to webhook as requested
        if (endpoint.includes('adcreatives') || endpoint.includes('ads')) {
            await logToWebhook(endpoint.includes('adcreatives') ? 'Creative_Request' : 'Ad_Request', acc, endpoint, body);
        }
    }

    let response;
    try {
        response = await fetch(url, options);
    } catch (fetchErr) {
        console.error(`❌ Network/Fetch Error [${method} ${endpoint}]:`, fetchErr.message);
        throw fetchErr;
    }
    const data = await response.json();

    if (data.error) {
        console.error(`❌ Meta API Error [${method} ${endpoint}]:`, JSON.stringify(data.error));
        // Log error to webhook as well
        await logToWebhook(`ERROR_${method}_${endpoint}`, acc, endpoint, { error: data.error, request_body: body });
        throw new Error(data.error.message || JSON.stringify(data.error));
    }
    return data;
}

// 3. Execution Engine
async function processAccount(acc) {
    console.log(`\n==========================================`);
    console.log(`🚀 Starting execution for: ${acc.name}`);

    try {
        let catalogId = acc.catalog_id;
        let productSetId = null;

        // Fetch Catalog for Monjez if not set
        if (!catalogId) {
            console.log(`⚙️  Fetching Product Catalogs for ${acc.account_id}...`);
            try {
                const bizRes = await fbApi(`me/businesses`, acc);
                if (bizRes.data && bizRes.data.length > 0) {
                    const bizId = bizRes.data[0].id;
                    const cats = await fbApi(`${bizId}/owned_product_catalogs`, acc);
                    if (cats.data && cats.data.length > 0) {
                        catalogId = cats.data[0].id;
                        acc.catalog_id = catalogId;
                        console.log(`✅ Found Catalog ID: ${catalogId}`);
                    }
                }
            } catch (e) {
                console.log(`⚠️ Catalog fetch failed: ${e.message}`);
            }
        }

        // --- NEW: Fetch valid Page ID if current one fails ---
        console.log(`⚙️  Verifying Page ID ${acc.page_id}...`);
        try {
            await fbApi(acc.page_id, acc);
            console.log(`✅ Page ID is valid.`);
        } catch (e) {
            console.log(`⚠️ Page ID ${acc.page_id} is invalid. Fetching available pages...`);
            const pagesRes = await fbApi('me/accounts', acc);
            if (pagesRes.data && pagesRes.data.length > 0) {
                acc.page_id = pagesRes.data[0].id;
                console.log(`✅ Switched to Page: ${pagesRes.data[0].name} (${acc.page_id})`);
            } else {
                throw new Error("No accessible Pages found for this token!");
            }
        }

        // Setup Product Set ID for Catalog Ad
        if (catalogId) {
            console.log(`⚙️  Fetching Product Sets from Catalog ${catalogId}...`);
            const psetsRes = await fbApi(`${catalogId}/product_sets`, acc);
            if (psetsRes.data && psetsRes.data.length > 0) {
                productSetId = psetsRes.data[0].id;
                console.log(`✅ Using existing Product Set ID: ${productSetId}`);
            } else {
                console.log(`⚠️ No Product Set found! Creating "All Products" fallback...`);
                const createPsetRes = await fbApi(`${catalogId}/product_sets`, acc, 'POST', {
                    name: 'All Products (Auto Gen)',
                    filter: '{"retailer_item_id":{"i_contains":""}}'
                });
                productSetId = createPsetRes.id;
                console.log(`✅ Created Product Set ID: ${productSetId}`);
            }
        }

        // Upload Video
        console.log(`⚙️  Uploading Video for Asset...`);
        const videoRes = await fbApi(`${acc.account_id}/advideos`, acc, 'POST', {
            file_url: VIDEO_URL
        });
        const videoId = videoRes.id;
        console.log(`✅ Video uploaded: ${videoId}`);

        // --- 1. SINGLE IMAGE CAMPAIGN ---
        console.log(`\n⚙️ Creating SINGLE IMAGE Campaign Structure...`);
        const imgCampId = (await fbApi(`${acc.account_id}/campaigns`, acc, 'POST', {
            name: `CMP_IMAGE_${Date.now()}`,
            objective: 'OUTCOME_SALES',
            status: 'PAUSED',
            special_ad_categories: [],
            daily_budget: 50000,
            bid_strategy: 'LOWEST_COST_WITHOUT_CAP'
        })).id;

        const imgAdsetId = (await fbApi(`${acc.account_id}/adsets`, acc, 'POST', {
            name: `ADS_IMAGE_${Date.now()}`,
            campaign_id: imgCampId,
            status: 'PAUSED',
            optimization_goal: 'OFFSITE_CONVERSIONS',
            billing_event: 'IMPRESSIONS',
            promoted_object: { pixel_id: acc.pixel_id, custom_event_type: 'PURCHASE' },
            targeting: { geo_locations: { countries: ['EG'] }, age_min: 18 }
        })).id;

        const imgCreativeBody = {
            name: `CRT_IMAGE_${Date.now()}`,
            object_story_spec: {
                page_id: acc.page_id,
                link_data: {
                    picture: IMAGE_URL,
                    link: 'https://monjez.net',
                    message: 'Premium Service from Monjez!',
                    name: 'Shop Now'
                }
            }
        };
        const imgCreativeId = (await fbApi(`${acc.account_id}/adcreatives`, acc, 'POST', imgCreativeBody)).id;

        const imgAdBody = {
            name: `AD_IMAGE_${Date.now()}`,
            adset_id: imgAdsetId,
            creative: { creative_id: imgCreativeId },
            status: 'PAUSED'
        };
        const imgAdId = (await fbApi(`${acc.account_id}/ads`, acc, 'POST', imgAdBody)).id;
        console.log(`✅ Image Campaign Created: ${imgCampId} -> Ad: ${imgAdId}`);

        // --- 2. VIDEO CAMPAIGN ---
        console.log(`\n⚙️ Creating VIDEO Campaign Structure...`);
        const vidCampId = (await fbApi(`${acc.account_id}/campaigns`, acc, 'POST', {
            name: `CMP_VIDEO_${Date.now()}`,
            objective: 'OUTCOME_SALES',
            status: 'PAUSED',
            special_ad_categories: [],
            daily_budget: 50000,
            bid_strategy: 'LOWEST_COST_WITHOUT_CAP'
        })).id;

        const vidAdsetId = (await fbApi(`${acc.account_id}/adsets`, acc, 'POST', {
            name: `ADS_VIDEO_${Date.now()}`,
            campaign_id: vidCampId,
            status: 'PAUSED',
            optimization_goal: 'OFFSITE_CONVERSIONS',
            billing_event: 'IMPRESSIONS',
            promoted_object: { pixel_id: acc.pixel_id, custom_event_type: 'PURCHASE' },
            targeting: { geo_locations: { countries: ['EG'] }, age_min: 18 }
        })).id;

        const vidCreativeBody = {
            name: `CRT_VIDEO_${Date.now()}`,
            object_story_spec: {
                page_id: acc.page_id,
                video_data: {
                    video_id: videoId,
                    image_url: IMAGE_URL,
                    title: 'Watch & Buy',
                    message: 'Experience the flow with Video!',
                    call_to_action: { type: 'SHOP_NOW', value: { link: 'https://monjez.net' } }
                }
            }
        };
        const vidCreativeId = (await fbApi(`${acc.account_id}/adcreatives`, acc, 'POST', vidCreativeBody)).id;

        const vidAdBody = {
            name: `AD_VIDEO_${Date.now()}`,
            adset_id: vidAdsetId,
            creative: { creative_id: vidCreativeId },
            status: 'PAUSED'
        };
        const vidAdId = (await fbApi(`${acc.account_id}/ads`, acc, 'POST', vidAdBody)).id;
        console.log(`✅ Video Campaign Created: ${vidCampId} -> Ad: ${vidAdId}`);

        // --- 3. CATALOG CAMPAIGN ---
        if (catalogId && productSetId) {
            console.log(`\n⚙️ Creating CATALOG Campaign Structure...`);
            const catCampId = (await fbApi(`${acc.account_id}/campaigns`, acc, 'POST', {
                name: `CMP_CATALOG_${Date.now()}`,
                objective: 'OUTCOME_SALES',
                status: 'PAUSED',
                special_ad_categories: [],
                daily_budget: 50000,
                bid_strategy: 'LOWEST_COST_WITHOUT_CAP'
            })).id;

            const catAdsetId = (await fbApi(`${acc.account_id}/adsets`, acc, 'POST', {
                name: `ADS_CATALOG_${Date.now()}`,
                campaign_id: catCampId,
                status: 'PAUSED',
                optimization_goal: 'OFFSITE_CONVERSIONS',
                billing_event: 'IMPRESSIONS',
                promoted_object: {
                    pixel_id: acc.pixel_id,
                    custom_event_type: 'PURCHASE',
                    product_set_id: productSetId
                },
                targeting: { geo_locations: { countries: ['EG'] }, age_min: 18, dynamic_audience_ids: [] }
            })).id;

            const catCreativeBody = {
                name: `CRT_CATALOG_${Date.now()}`,
                object_story_spec: {
                    page_id: acc.page_id,
                    template_data: {
                        link: 'https://monjez.net',
                        message: 'Explore our full catalog!',
                        name: '{{product.name}}',
                        description: '{{product.price}}'
                    }
                },
                template_url_spec: {
                    config_data: {
                        catalog_id: catalogId,
                        product_set_id: productSetId
                    }
                }
            };
            const catCreativeId = (await fbApi(`${acc.account_id}/adcreatives`, acc, 'POST', catCreativeBody)).id;

            const catAdBody = {
                name: `AD_CATALOG_${Date.now()}`,
                adset_id: catAdsetId,
                creative: { creative_id: catCreativeId },
                status: 'PAUSED'
            };
            const catAdId = (await fbApi(`${acc.account_id}/ads`, acc, 'POST', catAdBody)).id;
            console.log(`✅ Catalog Campaign Created: ${catCampId} -> Ad: ${catAdId}`);
        } else {
            console.log(`\n⚠️ Skipping Catalog Campaign (No Catalog/ProductSet)`);
        }

        console.log(`\n🎉 Processing Complete for ${acc.name}!`);

    } catch (e) {
        console.error(`💥 Fatal Error on ${acc.name}:`, e.message);
    }
}


async function start() {
    loadMonjezEnv();
    for (const acc of accounts) {
        await processAccount(acc);
        await sleep(5000); // Wait for rate limits
    }
}

start();

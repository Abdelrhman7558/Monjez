const fs = require('fs');

// We need two configurations
const accounts = [
    {
        name: "User Account (614301798011864)",
        // New token user provided
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
        catalog_id: "", // Requires fetching existing catalog for this account
        page_id: "1235405578002572"
    }
];

const API_VERSION = 'v19.0';
const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;

// Assets
const IMAGE_URL = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1080&auto=format&fit=crop";
// Use a safe small mp4 url for Video testing
const VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4";

// 1. Load Monjez Credentials from .env.local safely
function loadMonjezEnv() {
    try {
        const envContentBuf = fs.readFileSync('.env.local');
        const envContentStr = envContentBuf.toString('utf8').replace(/\0/g, '');
        const lines = envContentStr.split('\n').map(l => l.replace(/\s+/g, ''));

        for (const line of lines) {
            if (line.startsWith('FB_ACCESS_TOKEN=')) {
                accounts[1].access_token = line.split('=')[1];
            } else if (line.startsWith('FB_PAGE_ID=')) {
                accounts[1].page_id = line.split('=')[1];
            } else if (line.startsWith('FB_PIXEL_ID=')) {
                accounts[1].pixel_id = line.split('=')[1];
            }
        }
        console.log(`✅ Loaded Monjez .env.local credentials`);
    } catch (err) {
        console.log("No .env.local found or error parsing, using defaults if available.");
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 2. Fetch Helper 
async function fbApi(endpoint, token, method = 'GET', body = null) {
    let url = `${BASE_URL}/${endpoint}`;
    let options = { method };

    if (method === 'GET') {
        url += `${url.includes('?') ? '&' : '?'}access_token=${token}`;
    } else {
        body = body || {};
        body.access_token = token;
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.error) {
        console.error(`❌ Meta API Error [${method} ${endpoint}]:`, JSON.stringify(data.error));
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

        // If Monjez account, lookup catalog ID first
        if (!catalogId) {
            console.log(`⚙️  Fetching Product Catalogs for ${acc.account_id}...`);
            const catalogsRes = await fbApi(`me/businesses`, acc.access_token);
            // Just picking first business ID attached to token
            if (catalogsRes.data && catalogsRes.data.length > 0) {
                const bizId = catalogsRes.data[0].id;
                const cats = await fbApi(`${bizId}/owned_product_catalogs`, acc.access_token);
                if (cats.data && cats.data.length > 0) {
                    catalogId = cats.data[0].id;
                    acc.catalog_id = catalogId;
                } else {
                    throw new Error("No Catalogs found for Monjez Account!");
                }
            } else {
                throw new Error("No Business Manager found on Monjez token!");
            }
        }

        // Setup Product Set ID for Catalog Ad
        console.log(`⚙️  Fetching Product Sets from Catalog ${catalogId}...`);
        const psetsRes = await fbApi(`${catalogId}/product_sets`, acc.access_token);

        if (psetsRes.data && psetsRes.data.length > 0) {
            productSetId = psetsRes.data[0].id;
            console.log(`✅ Using existing Product Set ID: ${productSetId}`);
        } else {
            console.log(`⚠️ No Product Set found! Creating "All Products" fallback...`);
            const createPsetRes = await fbApi(`${catalogId}/product_sets`, acc.access_token, 'POST', {
                name: 'All Products (Auto Gen)',
                filter: '{"retailer_item_id":{"i_contains":""}}'
            });
            productSetId = createPsetRes.id;
            console.log(`✅ Created Product Set ID: ${productSetId}`);
        }

        // Setup Video Hash (Video Ad)
        console.log(`⚙️  Uploading Video for Hash...`);
        const videoRes = await fbApi(`${acc.account_id}/advideos`, acc.access_token, 'POST', {
            file_url: VIDEO_URL
        });
        const videoId = videoRes.id;
        console.log(`✅ Video uploaded: ${videoId}`);

        // CAMPAIGN
        const campId = (await fbApi(`${acc.account_id}/campaigns`, acc.access_token, 'POST', {
            name: `TEST_SALES_MULTI_FORMAT_CBO`,
            objective: 'OUTCOME_SALES',
            status: 'PAUSED',
            special_ad_categories: [],
            daily_budget: 100000,
            bid_strategy: 'LOWEST_COST_WITHOUT_CAP' // NO BID CAP
        })).id;
        console.log(`✅ Campaign created: ${campId}`);

        // AD SET
        const adsetId = (await fbApi(`${acc.account_id}/adsets`, acc.access_token, 'POST', {
            name: `ADSET_NO_BID_SALES`,
            campaign_id: campId,
            status: 'PAUSED',
            optimization_goal: 'OFFSITE_CONVERSIONS',
            billing_event: 'IMPRESSIONS',
            promoted_object: {
                pixel_id: acc.pixel_id,
                custom_event_type: 'PURCHASE',
                product_set_id: productSetId
            },
            targeting: {
                geo_locations: { countries: ['EG'] },
                age_min: 18,
                age_max: 65
            }
        })).id;
        console.log(`✅ AdSet created: ${adsetId}`);

        // AD 1: Single Image
        const creativeImageId = (await fbApi(`${acc.account_id}/adcreatives`, acc.access_token, 'POST', {
            name: `CREATIVE_SINGLE_IMAGE`,
            object_story_spec: {
                page_id: acc.page_id,
                link_data: {
                    picture: IMAGE_URL,
                    link: 'https://monjez.net',
                    message: 'إعلان صورة بدون Limits!',
                    name: 'شراء الآن - صورة'
                }
            }
        })).id;
        const ad1Id = (await fbApi(`${acc.account_id}/ads`, acc.access_token, 'POST', {
            name: `AD_SINGLE_IMAGE`,
            adset_id: adsetId,
            creative: { creative_id: creativeImageId },
            status: 'PAUSED'
        })).id;
        console.log(`✅ Ad 1 (Image) created: ${ad1Id}`);

        // AD 2: Video
        const creativeVideoId = (await fbApi(`${acc.account_id}/adcreatives`, acc.access_token, 'POST', {
            name: `CREATIVE_VIDEO`,
            object_story_spec: {
                page_id: acc.page_id,
                video_data: {
                    video_id: videoId,
                    image_url: IMAGE_URL, // Video Thumbnail
                    title: 'شراء الآن - فيديو',
                    message: 'إعلان فيديو متحرك بدون Limits!',
                    call_to_action: {
                        type: 'SHOP_NOW',
                        value: { link: 'https://monjez.net' }
                    }
                }
            }
        })).id;
        const ad2Id = (await fbApi(`${acc.account_id}/ads`, acc.access_token, 'POST', {
            name: `AD_VIDEO`,
            adset_id: adsetId,
            creative: { creative_id: creativeVideoId },
            status: 'PAUSED'
        })).id;
        console.log(`✅ Ad 2 (Video) created: ${ad2Id}`);

        // AD 3: Catalog
        const creativeCatalogId = (await fbApi(`${acc.account_id}/adcreatives`, acc.access_token, 'POST', {
            name: `CREATIVE_CATALOG`,
            object_story_spec: {
                page_id: acc.page_id,
                template_data: {
                    link: 'https://monjez.net',
                    message: 'إعلان كتالوج ديناميكي!',
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
        })).id;
        const ad3Id = (await fbApi(`${acc.account_id}/ads`, acc.access_token, 'POST', {
            name: `AD_CATALOG_DYNAMIC`,
            adset_id: adsetId,
            creative: { creative_id: creativeCatalogId },
            status: 'PAUSED'
        })).id;
        console.log(`✅ Ad 3 (Catalog) created: ${ad3Id}`);

        console.log(`🎉 Sucessfully built full Multi-Format structure for ${acc.name}`);

    } catch (e) {
        console.error(`💥 Fatal Error on ${acc.name}:`, e.message);
    }
}

async function start() {
    loadMonjezEnv();
    // Process User Account
    await processAccount(accounts[0]);
    // Process Monjez Account
    await processAccount(accounts[1]);
}

start();

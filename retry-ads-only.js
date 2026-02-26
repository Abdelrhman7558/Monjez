const ACCESS_TOKEN = "EAAMq7S6ZBgJsBQ4sqRwJcPQmDqLtbykCW3Q4XA9pb4qrzkKYd1g3GFMktZCkZArYrQZCxhfRnAep8iawN0gVwW0Xjxa5WwKXYYhfy4ZAqF1ZB8vDk9cheoRUA27UnQQyhGC4fo0vRQ8VZAivQeAFIDZAXN7YLM3ZAkHy4oW7ZAUZCZCOorg08FEsRHOCsOY1JKH7HTxF";
const AD_ACCOUNT_ID = "act_614301798011864";
const ADSET_ID = "120241256054050115"; // Adset created in previous run
const PIXEL_ID = "1993826061113647";
const CATALOG_ID = "1592234531420724";
const PAGE_ID = "729645653574996";
const API_VERSION = 'v19.0';
const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;

// Assets
const IMAGE_URL = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1080&auto=format&fit=crop";
const VIDEO_URL = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4";

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
        throw new Error(JSON.stringify(data.error));
    }
    return data;
}

async function run() {
    console.log(`🚀 Attempting to create Ads in AdSet: ${ADSET_ID} for Account ${AD_ACCOUNT_ID}`);

    try {
        // Fetch Product Set
        let productSetId = null;
        const psetsRes = await fbApi(`${CATALOG_ID}/product_sets`, ACCESS_TOKEN);
        if (psetsRes.data && psetsRes.data.length > 0) {
            productSetId = psetsRes.data[0].id;
            console.log(`✅ Using Product Set ID: ${productSetId}`);
        } else {
            console.log(`⚠️ Creating fallback Product Set`);
            const p = await fbApi(`${CATALOG_ID}/product_sets`, ACCESS_TOKEN, 'POST', {
                name: 'All Products (Auto Gen)',
                filter: '{"retailer_item_id":{"i_contains":""}}'
            });
            productSetId = p.id;
        }

        console.log(`⚙️  Uploading Video for Hash...`);
        const videoRes = await fbApi(`${AD_ACCOUNT_ID}/advideos`, ACCESS_TOKEN, 'POST', {
            file_url: VIDEO_URL
        });
        const videoId = videoRes.id;
        console.log(`✅ Video uploaded: ${videoId}`);

        // --- AD 1: SINGLE IMAGE ---
        const creativeImageId = (await fbApi(`${AD_ACCOUNT_ID}/adcreatives`, ACCESS_TOKEN, 'POST', {
            name: `CREATIVE_SINGLE_IMAGE`,
            object_story_spec: {
                page_id: PAGE_ID,
                link_data: {
                    picture: IMAGE_URL,
                    link: 'https://monjez.net',
                    message: 'إعلان صورة بدون Limits!',
                    name: 'شراء الآن - صورة'
                }
            }
        })).id;
        console.log(`✅ AdCreative 1 (Image) created: ${creativeImageId}`);

        const ad1Id = (await fbApi(`${AD_ACCOUNT_ID}/ads`, ACCESS_TOKEN, 'POST', {
            name: `AD_SINGLE_IMAGE`,
            adset_id: ADSET_ID,
            creative: { creative_id: creativeImageId },
            status: 'PAUSED'
        })).id;
        console.log(`✅ Ad 1 (Image) created: ${ad1Id}`);

        // --- AD 2: VIDEO ---
        const creativeVideoId = (await fbApi(`${AD_ACCOUNT_ID}/adcreatives`, ACCESS_TOKEN, 'POST', {
            name: `CREATIVE_VIDEO`,
            object_story_spec: {
                page_id: PAGE_ID,
                video_data: {
                    video_id: videoId,
                    image_url: IMAGE_URL,
                    title: 'شراء الآن - فيديو',
                    message: 'إعلان فيديو متحرك بدون Limits!',
                    call_to_action: {
                        type: 'SHOP_NOW',
                        value: { link: 'https://monjez.net' }
                    }
                }
            }
        })).id;
        console.log(`✅ AdCreative 2 (Video) created: ${creativeVideoId}`);

        const ad2Id = (await fbApi(`${AD_ACCOUNT_ID}/ads`, ACCESS_TOKEN, 'POST', {
            name: `AD_VIDEO`,
            adset_id: ADSET_ID,
            creative: { creative_id: creativeVideoId },
            status: 'PAUSED'
        })).id;
        console.log(`✅ Ad 2 (Video) created: ${ad2Id}`);

        // --- AD 3: CATALOG ---
        const creativeCatalogId = (await fbApi(`${AD_ACCOUNT_ID}/adcreatives`, ACCESS_TOKEN, 'POST', {
            name: `CREATIVE_CATALOG`,
            object_story_spec: {
                page_id: PAGE_ID,
                template_data: {
                    link: 'https://monjez.net',
                    message: 'إعلان كتالوج ديناميكي!',
                    name: '{{product.name}}',
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
        console.log(`✅ AdCreative 3 (Catalog) created: ${creativeCatalogId}`);

        const ad3Id = (await fbApi(`${AD_ACCOUNT_ID}/ads`, ACCESS_TOKEN, 'POST', {
            name: `AD_CATALOG_DYNAMIC`,
            adset_id: ADSET_ID,
            creative: { creative_id: creativeCatalogId },
            status: 'PAUSED'
        })).id;
        console.log(`✅ Ad 3 (Catalog) created: ${ad3Id}`);

        console.log(`🎉 ALL 3 ADS GENERATED SUCCESSFULLY IN EXISTING ADSET!`);

    } catch (e) {
        console.error(`💥 Fatal Error:`, e.message);
    }
}

run();

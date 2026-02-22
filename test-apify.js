const fs = require('fs');
const path = require('path');

// Basic .env.local parser
function getEnv() {
    const envPath = path.join(process.cwd(), '.env.local');
    if (!fs.existsSync(envPath)) return {};
    const content = fs.readFileSync(envPath, 'utf8');
    const env = {};
    content.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) env[key.trim()] = value.trim();
    });
    return env;
}

async function testApify() {
    const env = getEnv();
    const API_KEY = env.APIFY_API_KEY;
    console.log("Using API Key starting with:", API_KEY?.substring(0, 5));

    if (!API_KEY) {
        console.error("No API KEY found in .env.local");
        return;
    }

    try {
        console.log("Fetching Apify...");
        const response = await fetch(`https://api.apify.com/v2/acts/apify~google-search-scraper/run-sync-get-dataset-items?token=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                queries: "LinkedIn Saudi Arabia Founder",
                maxPagesPerQuery: 1,
                resultsPerPage: 5,
                proxyConfig: { useApifyProxy: true }
            })
        });

        console.log("Status:", response.status);
        if (!response.ok) {
            console.log("Error body:", await response.text());
            return;
        }

        const data = await response.json();
        console.log("Raw Data Type:", typeof data, "Is Array:", Array.isArray(data));
        if (Array.isArray(data) && data[0]) {
            console.log("Organic Results Count:", data[0].organicResults?.length);
            console.log("First item sample:", JSON.stringify(data[0].organicResults?.[0], null, 2));
        } else {
            console.log("Unexpected data format:", JSON.stringify(data).substring(0, 200));
        }
    } catch (e) {
        console.error("Test failed:", e.message);
    }
}

testApify();

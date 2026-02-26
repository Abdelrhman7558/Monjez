const fs = require('fs');

const envContentBuf = fs.readFileSync('.env.local');
const envContentStr = envContentBuf.toString('utf8').replace(/\0/g, '');
const lines = envContentStr.split('\n').map(l => l.replace(/\s+/g, ''));

let cleanToken = null;
let cleanAccount = null;

for (const line of lines) {
    if (line.startsWith('FB_ACCESS_TOKEN=')) {
        cleanToken = line.split('=')[1];
    } else if (line.startsWith('FB_AD_ACCOUNT_ID=')) {
        cleanAccount = line.split('=')[1];
    }
}

if (cleanAccount && !cleanAccount.startsWith('act_')) {
    if (cleanAccount.startsWith('act')) {
        cleanAccount = cleanAccount.replace('act', 'act_');
    } else {
        cleanAccount = 'act_' + cleanAccount;
    }
}

if (!cleanToken || !cleanAccount) {
    console.error("Missing credentials in .env.local", { cleanToken, cleanAccount });
    process.exit(1);
}

const API_VERSION = 'v19.0';
const baseUrl = `https://graph.facebook.com/${API_VERSION}/${cleanAccount}`;

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function createCampaign(name, objective) {
    const response = await fetch(`${baseUrl}/campaigns`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: name,
            objective: objective,
            status: "PAUSED",
            special_ad_categories: [],
            daily_budget: 100000,
            access_token: cleanToken
        })
    });
    const data = await response.json();
    if (data.error) {
        throw new Error(JSON.stringify(data.error));
    }
    return data.id;
}

const campaignsToCreate = [
    { name: "TEST_AWARENESS_CBO", objective: "OUTCOME_AWARENESS" },
    { name: "TEST_TRAFFIC_CBO", objective: "OUTCOME_TRAFFIC" },
    { name: "TEST_ENGAGEMENT_CBO", objective: "OUTCOME_ENGAGEMENT" },
    { name: "TEST_LEADS_CBO", objective: "OUTCOME_LEADS" },
    { name: "TEST_APP_PROMOTION_CBO", objective: "OUTCOME_APP_PROMOTION" },
    { name: "TEST_SALES_CBO", objective: "OUTCOME_SALES" }
];

async function run() {
    console.log(`Using Account ID: ${cleanAccount}`);
    console.log("Starting to push 6 campaigns into Live Meta Ads Manager...");
    for (const c of campaignsToCreate) {
        try {
            console.log(`Creating ${c.name}...`);
            const id = await createCampaign(c.name, c.objective);
            console.log(`✅ Success! Campaign ID: ${id}`);
            await sleep(1000);
        } catch (e) {
            console.error(`❌ Failed to create ${c.name}:`, e.message);
        }
    }
    console.log("Done generating Live Campaigns.");
}

run();

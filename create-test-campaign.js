
const { createMetaCampaign } = require('./src/lib/services/meta-ads-service');
const dotenv = require('dotenv');
dotenv.config({ path: '.env.local' });

async function run() {
    try {
        console.log("Creating Test Campaign...");
        const result = await createMetaCampaign({
            name: "Monjez Test Campaign (PAUSED)",
            objective: "OUTCOME_AWARENESS",
            status: "PAUSED"
        });
        console.log("Success! Campaign ID:", result.id);
    } catch (e) {
        console.error("Error:", e.message);
    }
}

run();

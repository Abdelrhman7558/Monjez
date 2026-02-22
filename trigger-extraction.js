const { performRealExtractionAction } = require('./src/lib/actions/leads-actions');

async function trigger() {
    console.log("Triggering auto-extraction...");
    try {
        const leads = await performRealExtractionAction();
        console.log(`Success! Extracted ${leads.length} leads.`);
    } catch (e) {
        console.error("Extraction failed during auto-trigger:", e);
    }
}

trigger();

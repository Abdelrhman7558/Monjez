const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env.local') });

async function testApollo() {
    const API_KEY = process.env.APOLLO_API_KEY;
    console.log("Testing Apollo with key:", API_KEY?.substring(0, 5) + "...");
    try {
        const response = await fetch("https://api.apollo.io/v1/mixed_people/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                api_key: API_KEY,
                person_locations: ["Egypt"],
                per_page: 1
            })
        });
        const data = await response.json();
        if (response.ok) {
            console.log("Apollo SUCCESS: Found", data.people?.length, "leads");
        } else {
            console.log("Apollo FAILED:", data.message || response.statusText);
        }
    } catch (e) {
        console.log("Apollo EXCEPTION:", e.message);
    }
}

async function testApify() {
    const API_KEY = process.env.APIFY_API_KEY;
    console.log("Testing Apify with key:", API_KEY?.substring(0, 10) + "...");
    try {
        // Test with a simpler, guaranteed actor or just a ping
        const response = await fetch(`https://api.apify.com/v2/users/me?token=${API_KEY}`);
        const data = await response.json();
        if (response.ok) {
            console.log("Apify SUCCESS: User", data.data?.username);
        } else {
            console.log("Apify FAILED:", data.error?.message || response.statusText);
        }
    } catch (e) {
        console.log("Apify EXCEPTION:", e.message);
    }
}

async function run() {
    await testApollo();
    await testApify();
}

run();

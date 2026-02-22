const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

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

async function checkDb() {
    const env = getEnv();
    const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

    const tables = ['apollo_leads', 'strategy_call_leads', 'consultant_chats', 'leads'];

    for (const table of tables) {
        process.stdout.write(`Checking '${table}'... `);
        const { data, error } = await supabase.from(table).select('*').limit(1);
        if (error) {
            console.log(`FAIL: ${error.message}`);
        } else {
            console.log(`SUCCESS! (Count: ${data.length})`);
        }
    }
}

checkDb();

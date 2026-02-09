import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, license, plan, timestamp } = body;

        const { data, error } = await supabase
            .from('purchases')
            .insert([
                {
                    email,
                    license_key: license,
                    plan_name: plan,
                    purchased_at: timestamp
                }
            ]);

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (error: any) {
        console.error('API error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

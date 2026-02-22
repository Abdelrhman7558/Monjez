import { NextResponse } from "next/server";
import { getCampaigns } from "@/lib/services/meta-ads-service";

export async function GET() {
    try {
        const campaigns = await getCampaigns();
        return NextResponse.json(campaigns);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

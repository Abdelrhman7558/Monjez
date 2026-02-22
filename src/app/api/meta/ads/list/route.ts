import { NextResponse } from "next/server";
import { getAds } from "@/lib/services/meta-ads-service";

export async function GET() {
    try {
        const ads = await getAds();
        return NextResponse.json(ads);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

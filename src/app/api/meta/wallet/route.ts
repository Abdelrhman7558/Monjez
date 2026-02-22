import { NextResponse } from "next/server";
import { getMetaSettings, updateWalletBalance } from "@/lib/services/meta-ads-service";

export async function GET() {
    try {
        const settings = await getMetaSettings();
        return NextResponse.json(settings);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { amount } = await req.json();
        const { data, error } = await updateWalletBalance(amount);
        if (error) throw error;
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

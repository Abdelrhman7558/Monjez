import { NextResponse } from "next/server";
import { incrementMetaCheck, getMetaSettings } from "@/lib/services/meta-ads-service";

export async function GET() {
    try {
        const settings = await getMetaSettings();
        return NextResponse.json({
            optimization: settings?.optimization_checks_count || 0,
            scaling: settings?.scaling_checks_count || 0
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { type } = await req.json(); // 'optimization' or 'scaling'
        if (type !== 'optimization' && type !== 'scaling') {
            return NextResponse.json({ error: "Invalid check type" }, { status: 400 });
        }
        const { data, error } = await incrementMetaCheck(type);
        if (error) throw error;
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

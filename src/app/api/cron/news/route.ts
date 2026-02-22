import { NextRequest, NextResponse } from "next/server";
import { fetchIndustryNews } from "@/lib/services/news-service";

export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const secret = url.searchParams.get('secret');

    // Security Check
    if (secret !== process.env.AGENT_SECRET_KEY) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const news = await fetchIndustryNews();
        return NextResponse.json({
            success: true,
            articlesFetched: news.length
        });
    } catch (error: any) {
        console.error("News Cron Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

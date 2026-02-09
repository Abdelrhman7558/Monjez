import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function WebsiteAnalyzerPage() {
    const supabase = await createSupabaseServerClient();
    const { data: analysis, error } = await supabase
        .from('website_analysis')
        .select('*');

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white">Website Analyzer</h1>
                <p className="text-gray-400 text-sm">Engineered audit for high-conversion architecture.</p>
            </div>

            <div className="p-12 rounded-3xl border border-white/5 bg-white/5 flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold text-white mb-2">Audit Probe Deployed</h3>
                <p className="text-gray-400">Enter a URL to start deep architectural analysis.</p>
            </div>
        </div>
    );
}

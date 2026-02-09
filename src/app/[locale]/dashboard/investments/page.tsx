import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function InvestmentsPage() {
    const supabase = await createSupabaseServerClient();
    const { data: investments, error } = await supabase
        .from('investments')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white">Investment Portfolio</h1>
                <p className="text-gray-400 text-sm">Monitoring capital allocation and asset performance.</p>
            </div>

            <div className="p-12 rounded-3xl border border-white/5 bg-white/5 flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold text-white mb-2">Portfolio Locked</h3>
                <p className="text-gray-400">Establishing secure connection to asset nodes.</p>
            </div>
        </div>
    );
}

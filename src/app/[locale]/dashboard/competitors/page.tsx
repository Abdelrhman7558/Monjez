import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function CompetitorsPage() {
    const supabase = await createSupabaseServerClient();
    const { data: competitors, error } = await supabase
        .from('competitors')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white">Competitor Intelligence</h1>
                <p className="text-gray-400 text-sm">Tracking movements and architecture of industry peers.</p>
            </div>

            {error ? (
                <div className="p-8 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
                    Failed to fetch competitor data. Ensure RLS policies are applied.
                </div>
            ) : competitors && competitors.length > 0 ? (
                <div className="grid gap-4">
                    {/* Render competitors list here */}
                </div>
            ) : (
                <div className="p-12 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm flex flex-col items-center justify-center text-center">
                    <h3 className="text-xl font-bold text-white mb-2">No Competitors Tracked</h3>
                    <p className="text-gray-400">Start monitoring your market rivals to see their strategy unfolds.</p>
                </div>
            )}
        </div>
    );
}

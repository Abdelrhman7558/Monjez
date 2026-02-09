import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function HabitsPage() {
    const supabase = await createSupabaseServerClient();
    const { data: habits, error } = await supabase
        .from('habits')
        .select('*')
        .order('id', { ascending: true });

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white">Founder Habits</h1>
                <p className="text-gray-400 text-sm">Optimizing personal operation for peak business performance.</p>
            </div>

            {error ? (
                <div className="p-8 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
                    Error loading habits protocol.
                </div>
            ) : habits && habits.length > 0 ? (
                <div className="grid gap-4">
                    {/* Render habits */}
                </div>
            ) : (
                <div className="p-12 rounded-3xl border border-white/5 bg-white/5 flex flex-col items-center justify-center text-center">
                    <h3 className="text-xl font-bold text-white mb-2">Primitive State</h3>
                    <p className="text-gray-400">No habits tracked. High performance starts with systemization.</p>
                </div>
            )}
        </div>
    );
}

import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function GoalsPage() {
    const supabase = await createSupabaseServerClient();
    const { data: goals, error } = await supabase
        .from('goals')
        .select('*');

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white">Operational Goals</h1>
                <p className="text-gray-400 text-sm">Tracking trajectory towards high-impact milestones.</p>
            </div>

            <div className="p-12 rounded-3xl border border-white/5 bg-white/5 flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold text-white mb-2">Trajectory Analysis</h3>
                <p className="text-gray-400">Calculating velocity... Milestones will align here.</p>
            </div>
        </div>
    );
}

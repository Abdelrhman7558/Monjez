import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function PlannerPage() {
    const supabase = await createSupabaseServerClient();

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white">Daily Planner</h1>
                <p className="text-gray-400 text-sm">Strategic allocation of hours for maximum ROE (Return on Effort).</p>
            </div>

            <div className="p-12 rounded-3xl border border-white/5 bg-white/5 flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold text-white mb-2">Agenda Syncing</h3>
                <p className="text-gray-400">Syncing with calendar hardware... Operational layout loading.</p>
            </div>
        </div>
    );
}

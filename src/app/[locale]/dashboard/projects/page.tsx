import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function ProjectsPage() {
    const supabase = await createSupabaseServerClient();
    const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white">Active Projects</h1>
                <p className="text-gray-400 text-sm">Managing current build cycles and infrastructure deployments.</p>
            </div>

            {error ? (
                <div className="p-8 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400">
                    Connection failed. Verify Supabase tables.
                </div>
            ) : projects && projects.length > 0 ? (
                <div className="grid gap-4">
                    {/* Render projects */}
                </div>
            ) : (
                <div className="p-12 rounded-3xl border border-white/5 bg-white/5 flex flex-col items-center justify-center text-center">
                    <h3 className="text-xl font-bold text-white mb-2">Systems Idle</h3>
                    <p className="text-gray-400">No active projects detected in the engine.</p>
                </div>
            )}
        </div>
    );
}

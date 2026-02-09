import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function CompaniesPage() {
    const supabase = await createSupabaseServerClient();
    const { data: companies, error } = await supabase
        .from('companies')
        .select('*');

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white">Enterprise Portfolio</h1>
                <p className="text-gray-400 text-sm">Managing holdings and scale-ready organizations.</p>
            </div>

            <div className="p-12 rounded-3xl border border-white/5 bg-white/5 flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold text-white mb-2">Corporate Registry Sync</h3>
                <p className="text-gray-400">Loading enterprise data... Hierarchy loading.</p>
            </div>
        </div>
    );
}

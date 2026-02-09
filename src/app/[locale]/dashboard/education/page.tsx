import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function EducationPage() {
    const supabase = await createSupabaseServerClient();
    const { data: education, error } = await supabase
        .from('education')
        .select('*')
        .order('id', { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white">Education & Upskilling</h1>
                <p className="text-gray-400 text-sm">Mastering tactical skillsets for competitive edge.</p>
            </div>

            <div className="p-12 rounded-3xl border border-white/5 bg-white/5 flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold text-white mb-2">Knowledge Base Initialize</h3>
                <p className="text-gray-400">Education materials and skill tracking will populate here.</p>
            </div>
        </div>
    );
}

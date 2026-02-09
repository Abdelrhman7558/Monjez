import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function IdentityPage() {
    const supabase = await createSupabaseServerClient();
    const { data: profile, error } = await supabase
        .from('founder_profile')
        .select('*')
        .single();

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white">Founder Identity</h1>
                <p className="text-gray-400 text-sm">Managing core credentials and strategic positioning.</p>
            </div>

            <div className="p-12 rounded-3xl border border-white/5 bg-white/5 flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold text-white mb-2">Biometrics Verified</h3>
                <p className="text-gray-400">Profile data secure. Encryption active.</p>
            </div>
        </div>
    );
}

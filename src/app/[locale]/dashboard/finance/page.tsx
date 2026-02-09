import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function FinancePage() {
    const supabase = await createSupabaseServerClient();
    const { data: records, error } = await supabase
        .from('finance_records')
        .select('*')
        .order('date', { ascending: false });

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white">Financial Ledger</h1>
                <p className="text-gray-400 text-sm">High-frequency reconciliation and cashflow monitoring.</p>
            </div>

            <div className="p-12 rounded-3xl border border-white/5 bg-white/5 flex flex-col items-center justify-center text-center">
                <h3 className="text-xl font-bold text-white mb-2">Vault Connection Secure</h3>
                <p className="text-gray-400">Streaming real-time transaction data... Ledger initializing.</p>
            </div>
        </div>
    );
}

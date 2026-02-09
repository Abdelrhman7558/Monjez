"use client";

import { calculateKPIs, formatCurrency } from "@/lib/calculations";

const mockData = {
    revenue: 125000,
    expenses: 45000,
    adSpend: 15000,
    leads: 300,
    conversions: 45
};

export default function FinanceWidget() {
    const kpis = calculateKPIs(mockData);

    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <h3 className="text-lg font-bold text-white mb-6">Financial Pulse</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                    <div className="text-xs text-green-400 mb-1">Net Profit</div>
                    <div className="text-xl font-bold text-white">{formatCurrency(kpis.profit)}</div>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <div className="text-xs text-blue-400 mb-1">Margin</div>
                    <div className="text-xl font-bold text-white">{kpis.margin}%</div>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                    <div className="text-xs text-purple-400 mb-1">ROAS</div>
                    <div className="text-xl font-bold text-white">{kpis.roas}x</div>
                </div>
                <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                    <div className="text-xs text-orange-400 mb-1">CPA</div>
                    <div className="text-xl font-bold text-white">{formatCurrency(parseFloat(kpis.cpa))}</div>
                </div>
            </div>
        </div>
    );
}

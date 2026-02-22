"use client";

import { CheckStats } from "@/components/meta/check-stats";
import { ShieldCheck, Zap, BarChart2, ChevronRight, TrendingUp as TrendingUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const rules = [
    {
        phase: "OPTIMIZATION",
        condition: "ROAS ≥ 6 AND stable ≥ 3 days",
        action: "Duplicate ad into 'Winners Campaign' with the same budget.",
        icon: Zap,
        color: "text-yellow-400"
    },
    {
        phase: "OPTIMIZATION",
        condition: "ROAS < 4 AND ad ran ≥ 3 days",
        action: "Decrease budget by 20%.",
        icon: BarChart2,
        color: "text-blue-400"
    },
    {
        phase: "SCALING",
        condition: "ROAS is stable AND stock/cash flow/ops = 'YES'",
        action: "Allow scale-up (Horizontal/Vertical).",
        icon: ShieldCheck,
        color: "text-green-400"
    },
    {
        phase: "SCALING",
        condition: "ROAS > 3 for 2 days",
        action: "Bump budget by 500–1000 EGP (Bump & Punish Logic).",
        icon: TrendingUpIcon, // Using TrendingUp from component scope
        color: "text-monjez-accent"
    }
];


export default function OptimizationScalingPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Optimization & Scaling</h1>
                <p className="text-gray-400 text-lg">Track Agent activity and manage T.O.S logic execution.</p>
            </div>

            <CheckStats />

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck className="w-6 h-6 text-monjez-accent" />
                    <h2 className="text-xl font-bold text-white">Active T.O.S Rules</h2>
                </div>

                <div className="grid gap-4">
                    {rules.map((rule, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-2xl bg-black/40 border border-white/5 hover:border-white/10 transition-colors">
                            <div className={cn("p-3 rounded-xl bg-white/5", rule.color)}>
                                <rule.icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[10px] font-bold tracking-widest uppercase py-0.5 px-2 rounded-md bg-white/5 text-gray-400">
                                        {rule.phase}
                                    </span>
                                    <p className="text-white font-medium">{rule.condition}</p>
                                </div>
                                <p className="text-sm text-gray-400">{rule.action}</p>
                            </div>
                            <button className="flex items-center gap-2 text-xs font-bold text-monjez-accent hover:text-white transition-colors group">
                                View Logs
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-monjez-blue/10 border border-monjez-blue/20 rounded-3xl p-8">
                    <h3 className="text-lg font-bold text-white mb-4">Agent Decision Hint</h3>
                    <p className="text-gray-400 text-sm italic">
                        "Creative drives everything. Data before opinion. Scale only winners.
                        Horizontal before vertical. Never fight the algorithm. Testing always costs money.
                        Optimization protects profit. Scaling magnifies truth."
                    </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
                    <p className="text-sm font-medium text-gray-400 mb-2">Current System Status</p>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest">Optimize Mode</span>
                    </div>
                </div>
            </div>
        </div>
    );
}


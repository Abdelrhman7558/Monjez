import { Activity, Users, DollarSign, TrendingUp } from "lucide-react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
    const supabase = await createSupabaseServerClient();

    // Example secure fetching for Overview
    // const { data: stats } = await supabase.from('stats').select('*').single();

    const stats = [
        { label: "Active Revenue", value: "$42,500", change: "+12%", icon: DollarSign, color: "text-green-500" },
        { label: "Lead Pipeline", value: "18", change: "+4", icon: Users, color: "text-blue-500" },
        { label: "System Uptime", value: "99.9%", change: "Stable", icon: Activity, color: "text-purple-500" },
        { label: "Tasks Automating", value: "840", change: "+150", icon: TrendingUp, color: "text-orange-500" },
    ];

    return (
        <div className="space-y-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-white">Command Center</h1>
                <p className="text-gray-400">System Status: <span className="text-green-500 font-mono">ONLINE</span></p>
            </header>

            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.07] transition-colors"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                                {stat.change}
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Placeholder Content Area */}
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/5 min-h-[400px]">
                    <h3 className="text-lg font-bold text-white mb-6">Revenue Trajectory</h3>
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                        Scanning live data...
                    </div>
                </div>
                <div className="lg:col-span-1 p-6 rounded-2xl bg-white/5 border border-white/5 min-h-[400px]">
                    <h3 className="text-lg font-bold text-white mb-6">Recent Alerts</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex gap-4 p-3 rounded-xl bg-black/20 text-sm text-gray-400">
                                <div className="w-2 h-2 rounded-full bg-monjez-accent mt-1.5 shrink-0" />
                                <p>New high-value lead detected from organic search channel.</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


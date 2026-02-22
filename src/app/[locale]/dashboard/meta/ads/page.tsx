"use client";

import { BarChart3, TrendingUp, Eye, MousePointer2, Target, Play, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export default function AdsPage() {
    const [ads, setAds] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const res = await fetch("/api/meta/ads/list");
                const data = await res.json();
                setAds(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to fetch ads", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAds();
    }, []);

    const stats = ads.reduce((acc, ad) => {
        const insights = ad.insights || {};
        acc.spend += parseFloat(insights.spend || 0);
        acc.impressions += parseInt(insights.impressions || 0);
        acc.roas_total += parseFloat(insights.roas?.[0]?.value || 0);
        acc.clicks += parseInt(insights.clicks || 0);
        if (parseFloat(insights.roas?.[0]?.value || 0) > 0) acc.roas_count++;
        return acc;
    }, { spend: 0, impressions: 0, roas_total: 0, roas_count: 0, clicks: 0 });

    const avgRoas = stats.roas_count > 0 ? (stats.roas_total / stats.roas_count).toFixed(2) : "0.00";
    const avgCtr = stats.impressions > 0 ? ((stats.clicks / stats.impressions) * 100).toFixed(2) : "0.00";

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Detailed Ad Performance</h1>
                    <p className="text-gray-400">Monitor and optimize individual ad performance metrics from your account.</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-white/5 border border-white/10 text-white font-medium px-4 py-2 rounded-xl hover:bg-white/10 transition-all flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Benchmarks
                    </button>
                    <button className="bg-monjez-accent text-black font-bold px-4 py-2 rounded-xl hover:bg-white transition-all flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        Run All Checks
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard label="Total Spend" value={`${stats.spend.toLocaleString()} EGP`} icon={BarChart3} />
                <StatCard label="Avg. ROAS" value={`${avgRoas}x`} icon={TrendingUp} color="text-green-400" />
                <StatCard label="Avg. CTR" value={`${avgCtr}%`} icon={MousePointer2} />
                <StatCard label="Total Impressions" value={stats.impressions.toLocaleString()} icon={Eye} />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <h2 className="font-bold text-white">Active Ad Inventory</h2>
                    <span className="text-xs text-gray-500 font-medium px-2 py-1 bg-white/5 rounded-md">
                        {loading ? "..." : ads.length} Ads Tracking
                    </span>
                </div>

                {loading ? (
                    <div className="p-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="w-10 h-10 text-monjez-accent animate-spin" />
                        <p className="text-gray-400">Loading performance data...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white/2">
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Ad Name</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">ROAS</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">CTR</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">CPC</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {ads.length > 0 ? ads.map((ad) => {
                                    const insights = ad.insights || {};
                                    const roas = parseFloat(insights.roas?.[0]?.value || 0);
                                    const ctr = parseFloat(insights.ctr || 0).toFixed(2);
                                    const cpc = parseFloat(insights.cpc || 0).toFixed(2);

                                    return (
                                        <tr key={ad.id} className="hover:bg-white/2 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-white font-medium mb-0.5">{ad.name}</span>
                                                    <span className="text-[10px] text-gray-500 font-medium uppercase tracking-tighter">ID: {ad.id}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={cn("font-bold", roas >= 4 ? "text-green-400" : "text-yellow-400")}>
                                                    {roas.toFixed(1)}x
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center text-white font-medium">{ctr}%</td>
                                            <td className="px-6 py-4 text-center text-white font-medium">{cpc} EGP</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={cn(
                                                    "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
                                                    ad.status === 'ACTIVE'
                                                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                                                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                                )}>
                                                    {ad.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="text-gray-500 hover:text-monjez-accent transition-colors">
                                                    <TrendingUp className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-20 text-center text-gray-500">
                                            No ads found for this account.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatCard({ label, value, icon: Icon, color = "text-monjez-accent" }: { label: string, value: string, icon: any, color?: string }) {
    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-white/5 rounded-lg">
                    <Icon className={cn("w-4 h-4", color)} />
                </div>
                <span className="text-xs font-medium text-gray-400">{label}</span>
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    );
}

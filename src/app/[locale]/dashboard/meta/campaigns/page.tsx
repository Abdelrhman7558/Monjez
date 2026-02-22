"use client";

import { WalletManager } from "@/components/meta/wallet-manager";
import { Plus, Rocket, BarChart2, Shield, Layers, Layout, Loader2, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const strategies = [
    {
        name: "Flexible Blender Mode",
        id: "Blender",
        description: "One ad set. One ad. All creatives inside. Let the algorithm blend.",
        budget: "300-500 EGP",
        icon: Layout,
        color: "text-purple-400"
    },
    {
        name: "ABO Multi-Adset & Ads",
        id: "ABO_Multi",
        description: "One product per ad set. Fixed budget. Multiple clean creatives.",
        budget: "250 EGP / ad set",
        icon: Layers,
        color: "text-blue-400"
    },
    {
        name: "Strategy 1: Catalog Format Blender",
        id: "Catalog_Blender",
        description: "One audience. One budget. Three formats (Image, Carousel, Collection).",
        budget: "500 EGP",
        icon: Rocket,
        color: "text-monjez-accent"
    }
];

export default function CampaignsPage() {
    const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const res = await fetch("/api/meta/campaigns/list");
                const data = await res.json();
                setCampaigns(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to fetch campaigns", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCampaigns();
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Meta Campaigns</h1>
                    <p className="text-gray-400">Launch and manage your Meta advertising campaigns.</p>
                </div>
                <button className="bg-monjez-accent text-black font-bold px-6 py-3 rounded-2xl hover:bg-white transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(var(--monjez-accent-rgb),0.3)]">
                    <Plus className="w-5 h-5" />
                    New Campaign
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <WalletManager />

                    <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-monjez-accent" />
                            Launch Guard
                        </h3>
                        <p className="text-xs text-gray-400 mb-4">
                            Campaigns are validated against strict strategy rules before launch to ensure performance.
                        </p>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-[10px] text-green-400 font-bold uppercase">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                Budget Validation Active
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-green-400 font-bold uppercase">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                Inventory Sync OK
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold text-white">Execution Frameworks</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {strategies.map((strategy) => (
                            <button
                                key={strategy.id}
                                onClick={() => setSelectedStrategy(strategy.id)}
                                className={cn(
                                    "text-left p-6 rounded-3xl border transition-all relative overflow-hidden group",
                                    selectedStrategy === strategy.id
                                        ? "bg-monjez-blue/20 border-monjez-accent shadow-[0_0_30px_rgba(var(--monjez-accent-rgb),0.1)]"
                                        : "bg-white/5 border-white/10 hover:border-white/20"
                                )}
                            >
                                {selectedStrategy === strategy.id && (
                                    <div className="absolute top-4 right-4 text-monjez-accent">
                                        <div className="w-2 h-2 rounded-full bg-monjez-accent animate-ping" />
                                    </div>
                                )}
                                <div className={cn("p-3 rounded-xl bg-white/5 w-fit mb-4 group-hover:scale-110 transition-transform", strategy.color)}>
                                    <strategy.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{strategy.name}</h3>
                                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{strategy.description}</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-xs font-medium text-gray-500">Daily: {strategy.budget}</span>
                                    <span className="text-xs font-bold text-monjez-accent uppercase tracking-widest">Select Strategy</span>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
                        <div className="p-6 border-b border-white/10">
                            <h2 className="font-bold text-white">Active Campaigns from Account</h2>
                        </div>

                        {loading ? (
                            <div className="p-12 flex flex-col items-center justify-center gap-4">
                                <Loader2 className="w-8 h-8 text-monjez-accent animate-spin" />
                                <p className="text-gray-400 text-sm">Fetching live campaigns...</p>
                            </div>
                        ) : campaigns.length > 0 ? (
                            <div className="divide-y divide-white/5">
                                {campaigns.map((camp) => (
                                    <div key={camp.id} className="p-4 hover:bg-white/5 transition-colors group">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h4 className="text-white font-medium group-hover:text-monjez-accent transition-colors">{camp.name}</h4>
                                                <div className="flex items-center gap-3 mt-1">
                                                    <span className={cn(
                                                        "text-[10px] font-bold uppercase px-2 py-0.5 rounded",
                                                        camp.status === 'ACTIVE' ? "bg-green-500/10 text-green-400" : "bg-yellow-500/10 text-yellow-400"
                                                    )}>
                                                        {camp.status}
                                                    </span>
                                                    <span className="text-[10px] text-gray-500 font-medium uppercase">{camp.objective}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-white font-bold">{camp.daily_budget ? `${(camp.daily_budget / 100).toLocaleString()} EGP` : 'None'}</p>
                                                <p className="text-[10px] text-gray-500 flex items-center justify-end gap-1 mt-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(camp.created_time).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-12 flex flex-col items-center justify-center text-center">
                                <div className="p-4 bg-white/5 rounded-full mb-4">
                                    <BarChart2 className="w-8 h-8 text-gray-600" />
                                </div>
                                <h3 className="text-white font-bold mb-2">No Active Campaigns</h3>
                                <p className="text-gray-400 text-sm max-w-xs">
                                    No campaigns found in your Meta account.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

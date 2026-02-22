"use client";

import { useState, useEffect } from "react";
import { Activity, TrendingUp, RefreshCcw } from "lucide-react";

export function CheckStats() {
    const [stats, setStats] = useState<{ optimization: number, scaling: number } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await fetch("/api/meta/stats");
            const data = await res.json();
            setStats(data);
        } catch (error) {
            console.error("Failed to fetch stats", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl group hover:border-monjez-accent/50 transition-all">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-monjez-blue/20 rounded-lg text-monjez-accent">
                        <Activity className="w-5 h-5" />
                    </div>
                    <button onClick={fetchStats} className="text-gray-500 hover:text-white transition-colors">
                        <RefreshCcw className="w-4 h-4" />
                    </button>
                </div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Optimization Checks</h3>
                <p className="text-3xl font-bold text-white">
                    {loading ? "..." : stats?.optimization || 0}
                </p>
                <p className="text-xs text-gray-500 mt-2">Times Agent adjusted campaign efficiency</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl group hover:border-monjez-accent/50 transition-all">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-monjez-blue/20 rounded-lg text-monjez-accent">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                    <button onClick={fetchStats} className="text-gray-500 hover:text-white transition-colors">
                        <RefreshCcw className="w-4 h-4" />
                    </button>
                </div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Scaling Checks</h3>
                <p className="text-3xl font-bold text-white">
                    {loading ? "..." : stats?.scaling || 0}
                </p>
                <p className="text-xs text-gray-500 mt-2">Times Agent increased budget or duplicated winners</p>
            </div>
        </div>
    );
}

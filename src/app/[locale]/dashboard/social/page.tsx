"use client";

import { useState } from "react";
import {
    Share2,
    Calendar,
    MessageSquare,
    ThumbsUp,
    Eye,
    Video,
    Image as ImageIcon,
    Sparkles,
    Plus,
    Clock,
    ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SocialPage() {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    const postHistory = [
        {
            id: "day-1",
            date: "Feb 22, 2026",
            posts: [
                { id: "p1", time: "09:00 AM", platform: "LinkedIn", type: "Video", content: "Architecture of Modern SaaS", likes: 1240, comments: 88, views: "12.4k" },
                { id: "p2", time: "12:30 PM", platform: "LinkedIn", type: "Post", content: "Why Arab Founders are winning in 2026", likes: 890, comments: 145, views: "8.2k" },
                { id: "p3", time: "05:00 PM", platform: "LinkedIn", type: "Photo", content: "Sunset at Monjez HQ", likes: 2100, comments: 24, views: "15.0k" },
                { id: "p4", time: "08:00 PM", platform: "LinkedIn", type: "Post", content: "Nightly Productivity Tips", likes: 560, comments: 12, views: "3.4k" },
            ]
        },
        {
            id: "day-2",
            date: "Feb 21, 2026",
            posts: [
                { id: "p5", time: "09:00 AM", platform: "LinkedIn", type: "Post", content: "Growth Mindset: A Guide", likes: 450, comments: 34, views: "5.1k" },
                { id: "p6", time: "03:00 PM", platform: "LinkedIn", type: "Video", content: "Demo: New Leads Agent", likes: 3200, comments: 450, views: "45.2k" },
            ]
        }
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Share2 className="w-8 h-8 text-monjez-accent" />
                        Social Media Control
                    </h1>
                    <p className="text-gray-400 text-sm">Automated LinkedIn content distribution and live performance tracking.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-monjez-accent text-black rounded-xl font-bold hover:bg-monjez-accent/90 transition-all shadow-lg shadow-monjez-accent/20">
                    <Plus className="w-5 h-5" />
                    New Content Batch
                </button>
            </div>

            {/* Global Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Reach", value: "1.2M", icon: Eye, color: "text-blue-500", bg: "bg-blue-500/10" },
                    { label: "Engagement", value: "85.4k", icon: ThumbsUp, color: "text-monjez-accent", bg: "bg-monjez-accent/10" },
                    { label: "Comments", value: "12.2k", icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-500/10" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("p-3 rounded-xl", stat.bg)}>
                                <stat.icon className={cn("w-6 h-6", stat.color)} />
                            </div>
                            <span className="text-green-500 text-sm font-bold flex items-center gap-1">
                                +12% <ArrowUpRight className="w-3 h-3" />
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Daily Post Logs */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    Daily Distribution History
                </h3>

                <div className="grid gap-4">
                    {postHistory.map((day) => (
                        <div
                            key={day.id}
                            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                        >
                            <div className="bg-white/5 p-4 flex justify-between items-center border-b border-white/5">
                                <span className="text-sm font-bold text-gray-300">{day.date}</span>
                                <span className="text-xs text-monjez-accent font-medium uppercase tracking-widest">{day.posts.length} Posts Active</span>
                            </div>
                            <div className="divide-y divide-white/5">
                                {day.posts.map((post) => (
                                    <div key={post.id} className="p-4 hover:bg-white/[0.02] flex items-center justify-between transition-colors">
                                        <div className="flex items-center gap-6">
                                            <div className="flex flex-col items-center">
                                                <div className="text-xs font-bold text-white mb-1">{post.time}</div>
                                                <div className="p-2 rounded-lg bg-black/40">
                                                    {post.type === "Video" ? <Video className="w-4 h-4 text-monjez-accent" /> : <ImageIcon className="w-4 h-4 text-blue-400" />}
                                                </div>
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-white mb-1">{post.content}</div>
                                                <div className="flex gap-4 text-xs text-gray-500">
                                                    <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3" /> {post.likes}</span>
                                                    <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {post.comments}</span>
                                                    <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {post.views}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="text-xs text-monjez-accent hover:underline flex items-center gap-1">
                                            View Performance <ArrowUpRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Content Generator Call-to-Action */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-monjez-blue/20 to-monjez-accent/20 border border-monjez-accent/30 relative overflow-hidden group">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="space-y-4 text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-monjez-accent text-black text-[10px] font-bold uppercase tracking-widest">
                            AI Supercharged
                        </div>
                        <h2 className="text-3xl font-bold text-white max-w-md">Generate 3-4 professional posts for tomorrow.</h2>
                        <p className="text-gray-300 max-w-lg">Our Agent will study global trends and your business goals to create viral content batches including 4K photos and vertical videos.</p>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                <Clock className="w-4 h-4 text-monjez-accent" />
                                Optimal: 09:00, 13:00, 18:00, 21:00
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 w-full md:w-auto">
                        <button className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-black hover:scale-105 transition-transform">
                            <Sparkles className="w-5 h-5" />
                            Generate Batch
                        </button>
                        <button className="flex items-center justify-center gap-3 px-8 py-4 bg-black/40 border border-white/20 text-white rounded-2xl font-bold hover:bg-black/60 transition-all">
                            <Video className="w-5 h-5 text-monjez-accent" />
                            Create Promo Video
                        </button>
                    </div>
                </div>
                {/* Visual Decoration */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-monjez-accent/30 rounded-full blur-[120px] pointer-events-none group-hover:bg-monjez-accent/50 transition-colors" />
            </div>
        </div>
    );
}

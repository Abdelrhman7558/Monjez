"use client";

import { useState, useEffect } from "react";
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
    ArrowUpRight,
    Linkedin,
    Unlink,
    CheckCircle2,
    AlertCircle,
    Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createSupabaseClient } from "@/lib/supabase/client";
import {
    getLinkedInConfigAction,
    updateLinkedInConfigAction,
    triggerLinkedInPostAction,
    verifyLinkedInTokenAction
} from "@/lib/actions/social-actions";

export default function SocialPage() {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const [countdown, setCountdown] = useState<{ hours: number, mins: number } | null>(null);
    const [tokenInput, setTokenInput] = useState("");
    const [showTokenInput, setShowTokenInput] = useState(false);

    const [postHistory, setPostHistory] = useState<any[]>([]);
    const [metrics, setMetrics] = useState({
        reach: 0,
        engagement: 0,
        comments: 0
    });

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const slots = ["09:00", "13:00", "18:00", "21:00"];

            let nextSlot = null;
            for (const slot of slots) {
                const [hour, min] = slot.split(':').map(Number);
                const slotDate = new Date();
                slotDate.setHours(hour, min, 0, 0);

                if (slotDate > now) {
                    nextSlot = slotDate;
                    break;
                }
            }

            if (!nextSlot) {
                // Next slot is 09:00 tomorrow
                nextSlot = new Date();
                nextSlot.setDate(nextSlot.getDate() + 1);
                nextSlot.setHours(9, 0, 0, 0);
            }

            const diffMs = nextSlot.getTime() - now.getTime();
            const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
            const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

            setCountdown({ hours: diffHrs, mins: diffMins });
        };

        updateCountdown();
        const timer = setInterval(updateCountdown, 60000); // Update every minute

        const fetchConfig = async () => {
            const config = await getLinkedInConfigAction();
            if (config?.is_connected) {
                setIsConnected(true);
            }
        };

        const fetchPosts = async () => {
            const supabase = createSupabaseClient();
            const { data, error } = await supabase
                .from('social_posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (data && data.length > 0) {
                // ... (rest of the metric calculation remains same)
                let totalReach = 0;
                let totalEngagement = 0;
                let totalComments = 0;

                data.forEach(p => {
                    const reach = parseInt(p.analytics?.views || "0");
                    const eng = (p.analytics?.likes || 0) + (p.analytics?.comments || 0);
                    const comm = p.analytics?.comments || 0;

                    totalReach += reach;
                    totalEngagement += eng;
                    totalComments += comm;
                });

                setMetrics({
                    reach: totalReach,
                    engagement: totalEngagement,
                    comments: totalComments
                });

                // Group by day
                const groups: { [key: string]: any[] } = {};
                data.forEach(p => {
                    const dateStr = new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    if (!groups[dateStr]) groups[dateStr] = [];
                    groups[dateStr].push({
                        id: p.id,
                        time: new Date(p.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                        platform: "LinkedIn",
                        type: p.post_type,
                        content: p.content,
                        likes: p.analytics?.likes || 0,
                        comments: p.analytics?.comments || 0,
                        views: p.analytics?.views || "0"
                    });
                });

                const history = Object.keys(groups).map(date => ({
                    id: date.replace(/ /g, '-'),
                    date,
                    posts: groups[date]
                }));
                setPostHistory(history);
            }
        };

        fetchConfig();
        fetchPosts();

        return () => clearInterval(timer);
    }, []);

    const handleConnect = async () => {
        if (!showTokenInput) {
            setShowTokenInput(true);
            return;
        }

        if (!tokenInput) {
            alert("يرجى لصق الرمز (Access Token) أولاً");
            return;
        }

        setIsConnecting(true);
        try {
            const result = await verifyLinkedInTokenAction(tokenInput);
            if (result.success) {
                setIsConnected(true);
                setShowTokenInput(false);
                setTokenInput("");
                alert(`تم الاتصال بنجاح! معرف الحساب: ${result.memberId}`);
            }
        } catch (err: any) {
            console.error(err);
            alert(`فشل الاتصال: ${err.message || "الرمز غير صالح"}`);
        } finally {
            setIsConnecting(false);
        }
    };

    const handleDisconnect = async () => {
        try {
            await updateLinkedInConfigAction({ is_connected: false });
            setIsConnected(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handlePostNow = async () => {
        if (!isConnected) {
            alert("Please connect LinkedIn first");
            return;
        }
        setIsPosting(true);
        try {
            const content = "أول خطوة في رحلة المئة ميل بتبدأ بـ 'منجز'. 🚀\n\nالنهاردة بدأنا رسميًا أتمتة العمليات لعملائنا في السعودية ومصر. تابعونا لكل جديد في عالم الذكاء الاصطناعي. #منجز #AI #Success";
            const result = await triggerLinkedInPostAction(content, 'Post');
            alert("Successfully posted to LinkedIn!");
            window.location.reload();
        } catch (err: any) {
            console.error(err);
            alert(`Failed to post: ${err.message || "Unknown error"}`);
        } finally {
            setIsPosting(false);
        }
    };

    // Format numbers
    const formatNum = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
        return num.toString();
    };

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

                <div className="flex items-center gap-4">
                    {showTokenInput && !isConnected && (
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Paste LinkedIn Access Token..."
                                className="px-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-monjez-accent w-64"
                                value={tokenInput}
                                onChange={(e) => setTokenInput(e.target.value)}
                            />
                        </div>
                    )}
                    {isConnected && (
                        <button
                            onClick={handlePostNow}
                            disabled={isPosting}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg disabled:opacity-50"
                        >
                            <Linkedin className="w-5 h-5" />
                            {isPosting ? "Posting..." : "Post Now"}
                        </button>
                    )}
                    {!isConnected ? (
                        <button
                            onClick={handleConnect}
                            disabled={isConnecting}
                            className="flex items-center gap-2 px-6 py-3 bg-[#0a66c2] text-white rounded-xl font-bold hover:bg-[#0a66c2]/90 transition-all shadow-lg disabled:opacity-50"
                        >
                            <Linkedin className="w-5 h-5" />
                            {isConnecting ? "Connecting..." : "Connect LinkedIn"}
                        </button>
                    ) : (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span className="text-sm font-bold text-white">LinkedIn Active</span>
                            </div>
                            <button
                                onClick={handleDisconnect}
                                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                title="Disconnect Account"
                            >
                                <Unlink className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                    <button className="flex items-center gap-2 px-6 py-3 bg-monjez-accent text-black rounded-xl font-bold hover:bg-monjez-accent/90 transition-all shadow-lg shadow-monjez-accent/20">
                        <Plus className="w-5 h-5" />
                        New Content Batch
                    </button>
                </div>
            </div>

            {/* LinkedIn Connection Warning if disconnected */}
            {!isConnected && (
                <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl flex items-center justify-between text-orange-200">
                    <div className="flex items-center gap-3 text-sm">
                        <AlertCircle className="w-5 h-5" />
                        Your LinkedIn account is not connected. The agent cannot post automatically without access.
                    </div>
                    <button className="text-xs font-bold underline uppercase tracking-widest" onClick={handleConnect}>
                        Connect Now
                    </button>
                </div>
            )}

            {/* Global Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: "Total Reach", value: formatNum(metrics.reach), icon: Eye, color: "text-blue-500", bg: "bg-blue-500/10" },
                    { label: "Engagement", value: formatNum(metrics.engagement), icon: ThumbsUp, color: "text-monjez-accent", bg: "bg-monjez-accent/10" },
                    { label: "Comments", value: formatNum(metrics.comments), icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-500/10" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <div className="flex justify-between items-start mb-4">
                            <div className={cn("p-3 rounded-xl", stat.bg)}>
                                <stat.icon className={cn("w-6 h-6", stat.color)} />
                            </div>
                            <span className="text-green-500 text-sm font-bold flex items-center gap-1">
                                Live <Activity className="w-3 h-3 animate-pulse" />
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
                                <span className="text-xs text-monjez-accent font-medium uppercase tracking-widest">{day.posts.length} Posts Distributed</span>
                            </div>
                            <div className="divide-y divide-white/5">
                                {day.posts.map((post: any) => (
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
                                <span>Next Post In:</span>
                                <span className="font-bold text-white bg-black/40 px-2 py-1 rounded">
                                    {countdown ? `${countdown.hours}h ${countdown.mins}m` : "Calculating..."}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500 italic">
                                Optimal Slots: 09:00, 13:00, 18:00, 21:00
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 w-full md:w-auto">
                        <button
                            disabled={!isConnected}
                            className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-black rounded-2xl font-black hover:scale-105 transition-transform disabled:opacity-50 disabled:grayscale disabled:hover:scale-100"
                        >
                            <Sparkles className="w-5 h-5 text-monjez-accent" />
                            Generate & Schedule
                        </button>
                        {!isConnected && (
                            <p className="text-[10px] text-orange-400 text-center font-bold uppercase tracking-tighter">Connection Required</p>
                        )}
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

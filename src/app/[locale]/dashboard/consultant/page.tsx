"use client";

import { useState, useRef, useEffect } from "react";
import {
    Sparkles,
    Send,
    Bot,
    User,
    ClipboardList,
    StickyNote,
    Target,
    Zap,
    CheckCircle2,
    MessageSquare
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ConsultantPage() {
    const [messages, setMessages] = useState([
        { role: "assistant", content: "أهلاً بك يا بطل! أنا مستشارك الشخصي. كيف يمكنني مساعدتك اليوم في تظبيط البزنس أو حياتك الشخصية؟" }
    ]);
    const [input, setInput] = useState("");
    const chatEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: "user", content: input }];
        setMessages(newMessages);
        setInput("");

        // Mocking AI Response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "فهمت عليك. بناءً على ملاحظاتي السابقة، هذا تحدي ممتاز. أقترح عليك البدء بتمرين التركيز العميق لمدة 20 دقيقة، ثم تحديد أهم 3 مهام لهذا اليوم."
            }]);
        }, 1000);
    };

    const tasks = [
        { title: "Deep Focus Session", status: "pending", priority: "High" },
        { title: "Review LinkedIn Lead Quality", status: "completed", priority: "Medium" },
        { title: "Audit Q1 Marketing Spend", status: "pending", priority: "High" },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-140px)]">
            {/* Chat Interface */}
            <div className="lg:col-span-2 flex flex-col bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-monjez-accent/20 flex items-center justify-center">
                            <Bot className="w-6 h-6 text-monjez-accent" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white">AI Personal Consultant</h3>
                            <p className="text-xs text-green-500 flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                Analyzing your goals...
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    {messages.map((msg, i) => (
                        <div key={i} className={cn(
                            "flex items-start gap-4",
                            msg.role === "user" ? "flex-row-reverse" : ""
                        )}>
                            <div className={cn(
                                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                msg.role === "assistant" ? "bg-monjez-accent text-black" : "bg-white/10 text-white"
                            )}>
                                {msg.role === "assistant" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                            </div>
                            <div className={cn(
                                "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed",
                                msg.role === "assistant"
                                    ? "bg-white/5 text-gray-200 rounded-tl-none border border-white/5"
                                    : "bg-monjez-blue/20 text-white rounded-tr-none border border-monjez-blue/30"
                            )}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                <div className="p-6 bg-white/5 border-t border-white/5">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Ask me anything about business or life..."
                            className="w-full bg-black/40 border border-white/10 rounded-2xl pl-6 pr-14 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-monjez-accent transition-all"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button
                            onClick={handleSend}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-monjez-accent text-black rounded-xl hover:bg-monjez-accent/90 transition-all font-bold"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar Tools */}
            <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2">
                {/* Insights & Notes */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
                    <h4 className="text-white font-bold flex items-center gap-2">
                        <StickyNote className="w-4 h-4 text-monjez-accent" />
                        Today's Notes
                    </h4>
                    <div className="space-y-3">
                        <div className="p-3 bg-white/5 rounded-xl border-l-4 border-monjez-accent">
                            <p className="text-xs text-gray-300 italic">"Focused on high-ticket leads in Saudi market. Needs better email sequence."</p>
                            <span className="text-[10px] text-gray-500 mt-2 block">10:45 AM</span>
                        </div>
                        <div className="p-3 bg-white/5 rounded-xl border-l-4 border-monjez-blue/50">
                            <p className="text-xs text-gray-300 italic">"Remember to rest for 15 mins every 2 hours."</p>
                            <span className="text-[10px] text-gray-500 mt-2 block">09:30 AM</span>
                        </div>
                    </div>
                </div>

                {/* Exercises & Tasks */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
                    <h4 className="text-white font-bold flex items-center gap-2">
                        <Target className="w-4 h-4 text-orange-500" />
                        Recommended Exercises
                    </h4>
                    <div className="space-y-3">
                        {tasks.map((task, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-black/20 rounded-xl group hover:bg-black/40 transition-colors">
                                <div className="flex items-center gap-3">
                                    {task.status === "completed" ? (
                                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <div className="w-4 h-4 rounded-full border border-gray-600" />
                                    )}
                                    <span className={cn(
                                        "text-xs font-medium",
                                        task.status === "completed" ? "text-gray-500 line-through" : "text-gray-200"
                                    )}>{task.title}</span>
                                </div>
                                <span className={cn(
                                    "text-[10px] font-bold px-2 py-0.5 rounded uppercase",
                                    task.priority === "High" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-500"
                                )}>{task.priority}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Life/Business Quote */}
                <div className="p-6 rounded-3xl bg-monjez-blue/20 border border-monjez-blue/30 text-center space-y-2">
                    <Sparkles className="w-6 h-6 text-monjez-accent mx-auto" />
                    <p className="text-sm text-white font-medium italic">"Success is not final, failure is not fatal: it is the courage to continue that counts."</p>
                    <p className="text-xs text-monjez-accent font-bold">— Monjez OS Wisdom</p>
                </div>
            </div>
        </div>
    );
}

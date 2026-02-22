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
    MessageSquare,
    BrainCircuit,
    Info
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    getConsultantChatHistory,
    saveConsultantChatMessage,
    generateConsultantResponse
} from "@/lib/actions/consultant-actions";

export default function ConsultantPage() {
    const [messages, setMessages] = useState([
        { role: "assistant", content: "أهلاً بيك يا بطل في مكتبك الجديد! أنا منجز، مستشارك الشخصي وسندك في البزنس. قبل ما نشمر ونبدأ شغل، محتاج أعرفك أكتر عشان ردي يكون مظبوط على مقاسك. قولي كدة.. جاهز نبدأ رحلة الاكتشاف؟" }
    ]);
    const [input, setInput] = useState("");
    const [isDiscoveryMode, setIsDiscoveryMode] = useState(true);
    const [discoveryStep, setDiscoveryStep] = useState(0);
    const [userProfile, setUserProfile] = useState({
        goals: "",
        personality: "",
        challenges: "",
    });
    const chatEndRef = useRef<HTMLDivElement>(null);

    const discoveryQuestions = [
        "إيه أكتر هدف شاغل بالك دلوقتي ونفسك تحققه في الـ 3 شهور الجايين؟",
        "بتفضل تشتغل لوحدك وتفكر في الهدوء، ولا بتحب العصف الذهني مع فريق؟",
        "إيه أكبر عقبة بتقابلك لما تيجي تنفذ فكرة جديدة؟",
        "لو معاك ميزانية مفتوحة ليوم واحد، هتصرفها في إيه في البزنس بتاعك؟"
    ];

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    useEffect(() => {
        const loadHistory = async () => {
            const history = await getConsultantChatHistory();
            if (history && history.length > 0) {
                setMessages(history);
                setIsDiscoveryMode(false); // Assume discovery is done if there's history
            }
        };
        loadHistory();
    }, []);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsgContent = input;
        const newMessagesForLLM = [...messages, { role: "user", content: userMsgContent }];

        setMessages(prev => [...prev, { role: "user", content: userMsgContent }]);
        setInput("");
        setIsLoading(true);

        try {
            await saveConsultantChatMessage('user', userMsgContent);

            const assistantResponse = await generateConsultantResponse(newMessagesForLLM);
            await saveConsultantChatMessage('assistant', assistantResponse);

            const updatedMessages = [...newMessagesForLLM, {
                role: "assistant",
                content: assistantResponse
            }];

            setMessages(updatedMessages);

            // Natural discovery flow: Ask next question if in discovery mode
            if (isDiscoveryMode && discoveryStep < discoveryQuestions.length) {
                const nextStep = discoveryStep + 1;
                setDiscoveryStep(nextStep);

                if (nextStep < discoveryQuestions.length) {
                    const nextQuestion = discoveryQuestions[nextStep];
                    // Small delay for natural feeling
                    setTimeout(async () => {
                        const finalMessages = [...updatedMessages, { role: "assistant", content: nextQuestion }];
                        setMessages(finalMessages);
                        await saveConsultantChatMessage('assistant', nextQuestion);
                    }, 1500);
                } else {
                    setIsDiscoveryMode(false);
                }
            }
        } catch (error) {
            console.error("Consultant Page Error:", error);
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "معلش يا باشا، حصلت مشكلة فنية بسيطة. جرب تبعت كلامك تاني كدة؟"
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const tasks = [
        { title: "Complete Personality Quiz", status: isDiscoveryMode ? "pending" : "completed", priority: "High" },
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
                            <p className="text-xs text-monjez-accent flex items-center gap-1">
                                <Sparkles className="w-3 h-3 animate-pulse" />
                                {isDiscoveryMode ? `Discovery Phase: Step ${discoveryStep + 1}/4` : "Consultation Mode Active"}
                            </p>
                        </div>
                    </div>
                    {isDiscoveryMode && (
                        <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                            <Info className="w-4 h-4 text-blue-400" />
                            <span className="text-[10px] text-gray-400">Help me know you better</span>
                        </div>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    {messages.map((msg, i) => (
                        <div key={i} className={cn(
                            "flex items-start gap-4",
                            msg.role === "user" ? "flex-row-reverse" : ""
                        )}>
                            <div className={cn(
                                "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-lg",
                                msg.role === "assistant" ? "bg-monjez-accent text-black" : "bg-white/10 text-white"
                            )}>
                                {msg.role === "assistant" ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                            </div>
                            <div className={cn(
                                "max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                                msg.role === "assistant"
                                    ? "bg-white/5 text-gray-200 rounded-tl-none border border-white/5"
                                    : "bg-monjez-blue/20 text-white rounded-tr-none border border-monjez-blue/30"
                            )}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-lg bg-monjez-accent text-black">
                                <Bot className="w-5 h-5 animate-spin" />
                            </div>
                            <div className="bg-white/5 text-gray-200 p-4 rounded-2xl rounded-tl-none border border-white/5 text-xs italic">
                                بفكّر وبرد عليك يا بطل...
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                <div className="p-6 bg-white/5 border-t border-white/5">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={isDiscoveryMode ? "Tell me more about yourself..." : "Ask me anything about business or life..."}
                            className="w-full bg-black/40 border border-white/10 rounded-2xl pl-6 pr-14 py-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-monjez-accent transition-all"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-monjez-accent text-black rounded-xl hover:bg-monjez-accent/90 transition-all font-bold shadow-lg"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Sidebar Tools */}
            <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2">
                {/* Insights & Personality Profile */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
                    <h4 className="text-white font-bold flex items-center gap-2">
                        <BrainCircuit className="w-4 h-4 text-monjez-accent" />
                        User Profile Analysis
                    </h4>
                    <div className="space-y-3">
                        {isDiscoveryMode ? (
                            <div className="text-center py-4 bg-white/5 rounded-xl border border-dashed border-white/10">
                                <p className="text-xs text-gray-500 italic">Analyzing personality traits...</p>
                                <div className="mt-2 w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-monjez-accent transition-all duration-500"
                                        style={{ width: `${(discoveryStep / discoveryQuestions.length) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="p-3 bg-white/5 rounded-xl border-l-4 border-monjez-accent">
                                    <div className="text-[10px] text-monjez-accent font-bold uppercase mb-1">Architype</div>
                                    <p className="text-sm text-gray-200">The Quick Executor</p>
                                </div>
                                <div className="p-3 bg-white/5 rounded-xl border-l-4 border-monjez-blue">
                                    <div className="text-[10px] text-monjez-blue font-bold uppercase mb-1">Top Goal</div>
                                    <p className="text-sm text-gray-200">Scale B2B Operations</p>
                                </div>
                            </>
                        )}
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

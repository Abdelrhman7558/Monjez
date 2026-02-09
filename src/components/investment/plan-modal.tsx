"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, ArrowRight, ShieldCheck, Zap, Server, MessageSquare, CreditCard, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useLenis } from "@studio-freight/react-lenis";
import { cn } from "@/lib/utils";

// Types
export type PlanType = "support" | "workflow";

export interface PlanDetail {
    id: string;
    type: PlanType;
    title: string;
    price: string;
    description: string;
    features: string[];
    // Workflow specific
    steps?: {
        title: string;
        description: string;
        icon: any;
    }[];
    supportDetails?: string;
    images?: string[];
}

interface PlanModalProps {
    plan: PlanDetail | null;
    isOpen: boolean;
    onClose: () => void;
}

export function PlanModal({ plan, isOpen, onClose }: PlanModalProps) {
    const [activeTab, setActiveTab] = useState<"overview" | "steps" | "support">("overview");
    const [isPurchasing, setIsPurchasing] = useState(false);
    const lenis = useLenis();

    useEffect(() => {
        if (isOpen) {
            lenis?.stop();
            document.body.style.overflow = "hidden";
        } else {
            lenis?.start();
            document.body.style.overflow = "unset";
        }
        return () => {
            lenis?.start();
            document.body.style.overflow = "unset";
        };
    }, [isOpen, lenis]);

    // Reset tab when plan changes
    useEffect(() => {
        if (plan) setActiveTab("overview");
    }, [plan]);

    const handlePurchase = async () => {
        setIsPurchasing(true);

        // Mock API Call as requested
        // In production this would be a real fetch to a backend endpoint that handles the Freemius API call
        console.log("Initiating purchase for:", plan?.title);

        setTimeout(() => {
            setIsPurchasing(false);
            alert("Redirecting to secure checkout...");
        }, 1500);
    };

    if (!plan) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-[#0B0B0B]/90 backdrop-blur-xl"
                    />

                    {/* Modal Container */}
                    <div
                        className="fixed inset-0 z-[61] flex items-start justify-center overflow-y-auto p-4 md:p-6 pointer-events-auto"
                        onClick={(e) => e.target === e.currentTarget && onClose()}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            className="bg-[#0B0B0B] border border-white/10 rounded-3xl w-full max-w-5xl md:min-h-[600px] flex flex-col shadow-2xl overflow-hidden relative shrink-0 my-10"
                        >
                            {/* Decorative Gradients */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-monjez-blue via-monjez-purple to-monjez-blue opacity-50" />

                            {/* Header */}
                            <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/5 bg-[#0B0B0B]/50 backdrop-blur-md z-10 sticky top-0">
                                <div>
                                    <div className="text-monjez-highlight text-xs font-bold tracking-widest uppercase mb-2">
                                        {plan.type === "support" ? "Managed Support" : "Workflow Automation"}
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                                        {plan.title}
                                    </h2>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Content Layout */}
                            <div className="flex flex-col md:flex-row flex-1">

                                {/* Left Sidebar (Tabs & Price) */}
                                <div className="w-full md:w-1/3 bg-[#0f0f13] border-r border-white/5 flex flex-col justify-between p-6 order-2 md:order-1">
                                    <div className="space-y-2">
                                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Plan Details</div>

                                        <button
                                            onClick={() => setActiveTab("overview")}
                                            className={cn(
                                                "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                                                activeTab === "overview"
                                                    ? "bg-monjez-blue/10 text-monjez-highlight border border-monjez-blue/20"
                                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                            )}
                                        >
                                            <span>Overview</span>
                                            {activeTab === "overview" && <ChevronRight className="w-4 h-4" />}
                                        </button>

                                        {plan.type === "workflow" && (
                                            <>
                                                <button
                                                    onClick={() => setActiveTab("steps")}
                                                    className={cn(
                                                        "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                                                        activeTab === "steps"
                                                            ? "bg-monjez-blue/10 text-monjez-highlight border border-monjez-blue/20"
                                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                                    )}
                                                >
                                                    <span>How It Works</span>
                                                    {activeTab === "steps" && <ChevronRight className="w-4 h-4" />}
                                                </button>

                                                <button
                                                    onClick={() => setActiveTab("support")}
                                                    className={cn(
                                                        "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                                                        activeTab === "support"
                                                            ? "bg-monjez-blue/10 text-monjez-highlight border border-monjez-blue/20"
                                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                                    )}
                                                >
                                                    <span>Technical Support</span>
                                                    {activeTab === "support" && <ChevronRight className="w-4 h-4" />}
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    {/* Pricing Widget */}
                                    <div className="mt-8 bg-white/5 rounded-2xl p-6 border border-white/5">
                                        <div className="text-sm text-gray-400 mb-1">Investment</div>
                                        <div className="flex items-baseline gap-1 mb-4">
                                            <span className="text-3xl font-bold text-white">{plan.price}</span>
                                            {plan.type === "support" && <span className="text-sm text-gray-500">/month</span>}
                                        </div>

                                        <button
                                            onClick={handlePurchase}
                                            disabled={isPurchasing}
                                            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-monjez-blue hover:bg-monjez-accent text-white font-bold transition-all shadow-lg shadow-monjez-blue/20 hover:shadow-monjez-blue/40 disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isPurchasing ? (
                                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    <CreditCard className="w-4 h-4" />
                                                    <span>{plan.type === "support" ? "Subscribe Now" : "Buy Workflow"}</span>
                                                </>
                                            )}
                                        </button>
                                        <div className="text-center mt-3 text-xs text-gray-500">
                                            Secure payment via Stripe
                                        </div>
                                    </div>
                                </div>

                                {/* Right Content Area */}
                                <div className="w-full md:w-2/3 p-6 md:p-10 order-1 md:order-2 bg-[#0B0B0B] min-h-[400px]">
                                    <div data-lenis-prevent className="h-full">

                                        {/* TAB: OVERVIEW */}
                                        {activeTab === "overview" && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="space-y-8"
                                            >
                                                <div>
                                                    <h3 className="text-xl font-bold text-white mb-4">What's Included</h3>
                                                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                                        {plan.description}
                                                    </p>
                                                    <ul className="space-y-3">
                                                        {plan.features.map((feature, i) => (
                                                            <li key={i} className="flex items-start gap-3 text-gray-400">
                                                                <CheckCircle2 className="w-5 h-5 text-monjez-highlight shrink-0 mt-0.5" />
                                                                <span>{feature}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* TAB: STEPS (Workflow Only) */}
                                        {activeTab === "steps" && plan.steps && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="space-y-8"
                                            >
                                                <h3 className="text-xl font-bold text-white mb-2">How It Works</h3>
                                                <div className="space-y-0 relative">
                                                    {/* Vertical Line */}
                                                    <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-white/10" />

                                                    {plan.steps.map((step, i) => (
                                                        <div key={i} className="relative flex gap-6 pb-8 last:pb-0">
                                                            <div className="relative z-10 w-12 h-12 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center shrink-0">
                                                                <step.icon className="w-5 h-5 text-monjez-blue" />
                                                            </div>
                                                            <div className="pt-2">
                                                                <h4 className="text-white font-bold mb-1">{step.title}</h4>
                                                                <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* TAB: SUPPORT (Workflow Only) */}
                                        {activeTab === "support" && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="space-y-6"
                                            >
                                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <div className="p-3 rounded-full bg-monjez-highlight/20 text-monjez-highlight">
                                                            <ShieldCheck className="w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-lg font-bold text-white">Installation Guarantee</h3>
                                                            <p className="text-sm text-gray-400">We ensure it works or full refund.</p>
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-300 leading-relaxed">
                                                        {plan.supportDetails || "Our team is available to assist with the initial setup and configuration of your workflow. Typical response time is under 24 hours."}
                                                    </p>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                                                        <MessageSquare className="w-5 h-5 text-gray-400 mb-2" />
                                                        <h4 className="text-white font-medium mb-1">Chat Support</h4>
                                                        <p className="text-xs text-gray-500">Direct access to our engineering team.</p>
                                                    </div>
                                                    <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                                                        <Server className="w-5 h-5 text-gray-400 mb-2" />
                                                        <h4 className="text-white font-medium mb-1">Setup Assistance</h4>
                                                        <p className="text-xs text-gray-500">We help connect your accounts.</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

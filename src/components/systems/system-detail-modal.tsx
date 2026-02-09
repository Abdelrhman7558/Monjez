"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Layers, BarChart3, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useLenis } from "@studio-freight/react-lenis";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

// Types
export interface SystemDetail {
    id: string;
    title: string;
    description: string;
    targetUsers: {
        role: string;
        benefit: string;
        icon: any; // Lucide Icon
    }[];
    roiStats: {
        label: string;
        value: string;
        trend?: "up" | "down";
    }[];
    modules: {
        name: string;
        description: string;
    }[];
    examples: {
        title: string;
        scenario: string;
        image: string;
    }[];
}

interface SystemDetailModalProps {
    system: SystemDetail | null;
    isOpen: boolean;
    onClose: () => void;
}

export function SystemDetailModal({ system, isOpen, onClose }: SystemDetailModalProps) {
    const t = useTranslations("systems.labels");
    const [activeTab, setActiveTab] = useState<"overview" | "modules" | "examples">("overview");
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

    if (!system) return null;

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
                            className="bg-[#0B0B0B] border border-white/10 rounded-3xl w-full max-w-5xl h-[115vh] flex flex-col shadow-2xl overflow-hidden relative shrink-0 my-10"
                        >
                            {/* Decorative Gradients */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-monjez-blue via-monjez-purple to-monjez-blue opacity-50" />
                            <div className="absolute -top-[20%] -right-[10%] w-[300px] h-[300px] bg-monjez-purple/20 rounded-full blur-[100px] pointer-events-none" />

                            {/* Header */}
                            <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/5 bg-[#0B0B0B]/50 backdrop-blur-md z-10">
                                <div className="text-start">
                                    <div className="text-monjez-highlight text-xs font-bold tracking-widest uppercase mb-2">{t("infra")}</div>
                                    <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                                        {system.title}
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
                            <div className="flex flex-col md:flex-row h-full overflow-hidden">

                                {/* Left Sidebar (Navigation & ROI) */}
                                <div className="w-full md:w-1/3 bg-[#0f0f13] border-r border-white/5 flex flex-col justify-between p-6">
                                    <div className="space-y-2">
                                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 text-start">{t("request_demo")}</div>
                                        {(["overview", "modules", "examples"] as const).map((tab) => (
                                            <button
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === tab
                                                    ? "bg-monjez-blue/10 text-monjez-highlight border border-monjez-blue/20"
                                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                                    }`}
                                            >
                                                <span className="capitalize">{t(tab)}</span>
                                                {activeTab === tab && <ChevronRight className="w-4 h-4 rtl:rotate-180" />}
                                            </button>
                                        ))}
                                    </div>

                                    {/* ROI Stats Widget */}
                                    <div className="mt-8 bg-white/5 rounded-2xl p-5 border border-white/5">
                                        <div className="flex items-center gap-2 mb-4 text-monjez-highlight">
                                            <BarChart3 className="w-5 h-5" />
                                            <span className="text-sm font-bold uppercase">{t("expected_roi")}</span>
                                        </div>
                                        <div className="space-y-4">
                                            {system.roiStats.map((stat, i) => (
                                                <div key={i} className="text-start">
                                                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                                                    <div className="text-xs text-gray-400 uppercase">{stat.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Content Area */}
                                <div
                                    className="w-full md:w-2/3 overflow-y-auto custom-scrollbar p-6 md:p-10 bg-[#0B0B0B]"
                                    data-lenis-prevent
                                >

                                    {/* TAB: OVERVIEW */}
                                    {activeTab === "overview" && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-10"
                                        >
                                            <div className="text-start">
                                                <h3 className="text-xl font-bold text-white mb-4">{t("system_overview")}</h3>
                                                <p className="text-gray-300 text-lg leading-relaxed">
                                                    {system.description}
                                                </p>
                                            </div>

                                            <div className="text-start">
                                                <h3 className="text-xl font-bold text-white mb-6">{t("who_builds")}</h3>
                                                <div className="grid gap-4">
                                                    {system.targetUsers.map((user, i) => (
                                                        <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                                            <div className="p-2 rounded-lg bg-monjez-purple/20 text-monjez-purple shrink-0">
                                                                <user.icon className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                <h4 className="text-white font-semibold mb-1">{user.role}</h4>
                                                                <p className="text-sm text-gray-400">{user.benefit}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* TAB: MODULES */}
                                    {activeTab === "modules" && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-6"
                                        >
                                            <h3 className="text-xl font-bold text-white mb-2 text-start">{t("system_modules")}</h3>
                                            <p className="text-gray-400 mb-6 text-start">{t("modules_desc")}</p>

                                            <div className="grid gap-4">
                                                {system.modules.map((mod, i) => (
                                                    <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-monjez-blue/30 transition-colors group text-start">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <Layers className="w-5 h-5 text-gray-500 group-hover:text-monjez-blue transition-colors" />
                                                            <h4 className="text-white font-semibold">{mod.name}</h4>
                                                        </div>
                                                        <p className="text-sm text-gray-400 pl-8 rtl:pl-0 rtl:pr-8">{mod.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* TAB: EXAMPLES */}
                                    {activeTab === "examples" && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-8"
                                        >
                                            <h3 className="text-xl font-bold text-white mb-2 text-start">{t("real_world")}</h3>

                                            <div className="space-y-8">
                                                {system.examples.map((ex, i) => (
                                                    <div key={i} className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
                                                        <div className="h-48 relative">
                                                            <Image
                                                                src={ex.image}
                                                                alt={ex.title}
                                                                fill
                                                                className="object-cover opacity-80"
                                                            />
                                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                                            <div className="absolute bottom-4 left-4 right-4 text-start">
                                                                <h4 className="text-lg font-bold text-white">{ex.title}</h4>
                                                            </div>
                                                        </div>
                                                        <div className="p-5 text-start">
                                                            <p className="text-gray-300 text-sm leading-relaxed">{ex.scenario}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                </div>
                            </div>

                            {/* Footer CTA */}
                            <div className="p-6 border-t border-white/5 bg-[#0B0B0B]/80 backdrop-blur-md flex justify-end">
                                <button className="group relative flex items-center gap-2 px-8 py-3 rounded-full bg-monjez-blue text-white font-bold overflow-hidden shadow-[0_0_20px_rgba(30,144,255,0.4)] hover:shadow-[0_0_40px_rgba(30,144,255,0.6)] transition-all duration-300 font-bold">
                                    <span className="relative z-10">{t("request_demo")}</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-monjez-highlight to-monjez-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:translate-x-[-4px]" />
                                </button>
                            </div>

                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

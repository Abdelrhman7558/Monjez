"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ShieldCheck, Bot, Settings2 } from "lucide-react";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { SupportPlanModal } from "../investment/support-plan-modal";
import { CustomizePlanModal } from "../investment/customize-plan-modal";
import { useTranslations } from "next-intl";

export function PricingSection() {
    const t = useTranslations("pricing");
    const commonT = useTranslations("common");
    const [viewMode, setViewMode] = useState<"infrastructure" | "services">("infrastructure");
    const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
    const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

    const infrastructureTiers = [
        {
            key: "starter",
            link: "/#book-call",
            popular: false,
            gradient: "from-blue-500/20 to-purple-500/20",
            border: "border-white/10",
            bookingType: "standard"
        },
        {
            key: "growth",
            link: "/#book-call",
            popular: true,
            gradient: "from-monjez-accent/20 to-blue-600/20",
            border: "border-monjez-accent/50",
            bookingType: "standard"
        },
        {
            key: "enterprise",
            link: "/#book-call",
            popular: false,
            gradient: "from-purple-600/20 to-pink-600/20",
            border: "border-white/10",
            bookingType: "vip"
        }
    ];

    const getTierFeatures = (key: string) => {
        // next-intl doesn't support array translations directly via t() in all versions easily
        // but it does support indexing if keys are numbered, or we can use raw messages
        // Here we just hardcode 4 features or use a loop if common
        return [0, 1, 2, 3, 4].map(i => {
            const path = `tiers.${key}.features.${i}`;
            return t.has(path) ? t(path) : null;
        }).filter(Boolean);
    };

    return (
        <section id="pricing" className="py-24 md:py-32 bg-monjez-dark relative overflow-hidden" suppressHydrationWarning>
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-monjez-blue/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-monjez-purple/10 blur-[120px] rounded-full" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        {t("title")}
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-10">
                        {t("subtitle")}
                    </p>

                    {/* Toggle Switch */}
                    <div className="flex items-center justify-center gap-4 mb-12">
                        <button
                            suppressHydrationWarning
                            onClick={() => setViewMode("infrastructure")}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300",
                                viewMode === "infrastructure"
                                    ? "bg-monjez-blue text-white shadow-lg shadow-monjez-blue/30"
                                    : "text-gray-400 hover:text-white"
                            )}
                        >
                            {t("infrastructure")}
                        </button>
                        <button
                            suppressHydrationWarning
                            onClick={() => setViewMode("services")}
                            className={cn(
                                "px-6 py-2 rounded-full text-sm font-bold transition-all duration-300",
                                viewMode === "services"
                                    ? "bg-monjez-blue text-white shadow-lg shadow-monjez-blue/30"
                                    : "text-gray-400 hover:text-white"
                            )}
                        >
                            {t("services")}
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        {viewMode === "infrastructure" ? (
                            <motion.div
                                key="infrastructure"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                                className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                            >
                                {infrastructureTiers.map((tier) => (
                                    <div
                                        key={tier.key}
                                        className={cn(
                                            "relative rounded-3xl p-8 flex flex-col h-full bg-white/5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2 border group",
                                            tier.border
                                        )}
                                    >
                                        <div className={cn("absolute inset-0 rounded-3xl bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none", tier.gradient)} />

                                        {tier.popular && (
                                            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 md:translate-x-0 md:right-8 bg-monjez-accent text-white px-3 py-1 rounded-full text-sm font-bold shadow-[0_0_15px_#3b4fe4]">
                                                {t("most_popular")}
                                            </div>
                                        )}

                                        <div className="mb-8 relative z-10">
                                            <h3 className="text-xl font-bold text-white mb-2 text-start">{t(`tiers.${tier.key}.name`)}</h3>
                                            <div className="text-3xl font-bold text-white mb-4 text-start">{t(`tiers.${tier.key}.price`)}</div>
                                            <p className="text-gray-400 text-sm leading-relaxed text-start">
                                                {t(`tiers.${tier.key}.description`)}
                                            </p>
                                        </div>

                                        <div className="flex-1 mb-8 relative z-10">
                                            <ul className="space-y-4">
                                                {getTierFeatures(tier.key).map((feature, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300 text-start">
                                                        <Check className="w-5 h-5 text-monjez-accent flex-shrink-0" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <Link
                                            href={tier.link}
                                            data-booking-type={tier.bookingType}
                                            className={cn(
                                                "w-full py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2 transition-all duration-300 relative z-10",
                                                tier.popular
                                                    ? "bg-monjez-blue hover:bg-monjez-accent text-white shadow-lg hover:shadow-monjez-accent/40"
                                                    : "bg-white/10 hover:bg-white/20 text-white border border-white/10"
                                            )}
                                        >
                                            {t(`tiers.${tier.key}.cta`)} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                                        </Link>
                                    </div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="services"
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                                className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                            >
                                {/* 1. Support Plan */}
                                <div
                                    onClick={() => setIsSupportModalOpen(true)}
                                    className="relative rounded-3xl p-8 flex flex-col h-full bg-white/5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2 border border-white/10 group cursor-pointer"
                                >
                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    <div className="mb-8 relative z-10">
                                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400">
                                            <ShieldCheck className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2 text-start">{t("support.name")}</h3>
                                        <div className="text-3xl font-bold text-white mb-4 text-start">{t("support.price")}<span className="text-sm text-gray-400 font-normal">{t("per_month")}</span></div>
                                        <p className="text-gray-400 text-sm leading-relaxed text-start">
                                            {t("support.description")}
                                        </p>
                                    </div>

                                    <div className="flex-1 relative z-10" />

                                    <div className="w-full py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2 transition-all duration-300 bg-white/10 hover:bg-white/20 text-white border border-white/10 relative z-10">
                                        {t("support.cta")} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                                    </div>
                                </div>

                                {/* 2. Custom Plan */}
                                <div
                                    onClick={() => setIsCustomModalOpen(true)}
                                    className="relative rounded-3xl p-8 flex flex-col h-full bg-white/5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-2 border border-white/10 group cursor-pointer"
                                >
                                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                    <div className="mb-8 relative z-10">
                                        <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6 text-orange-400">
                                            <Settings2 className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2 text-start">{t("customize.name")}</h3>
                                        <div className="text-xl font-bold text-white mb-4 text-start">{t("customize.price")}</div>
                                        <p className="text-gray-400 text-sm leading-relaxed text-start">
                                            {t("customize.description")}
                                        </p>
                                    </div>

                                    <div className="flex-1 relative z-10" />

                                    <div className="w-full py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2 transition-all duration-300 bg-white/10 hover:bg-white/20 text-white border border-white/10 relative z-10">
                                        {t("customize.cta")} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                                    </div>
                                </div>

                                {/* 3. AI Workflows - Locked & Final */}
                                <div
                                    className="relative rounded-3xl p-8 flex flex-col h-full bg-white/5 border border-white/10 overflow-hidden pointer-events-none"
                                >
                                    {/* SOON Overlay - Full Block */}
                                    <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center pointer-events-auto cursor-not-allowed">
                                        <div className="px-8 py-3 bg-monjez-accent/20 border border-monjez-accent/50 rounded-full text-monjez-highlight font-black tracking-[0.3em] uppercase text-xl shadow-[0_0_40px_rgba(30,144,255,0.3)]">
                                            {t("managed.cta")}
                                        </div>
                                    </div>

                                    <div className="mb-8 relative z-10 grayscale opacity-20">
                                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-400">
                                            <Bot className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2 text-start">{t("managed.name")}</h3>
                                        <div className="text-3xl font-bold text-white mb-4 text-start">{t("managed.price")}<span className="text-sm text-gray-400 font-normal">{t("per_month")}</span></div>
                                        <p className="text-gray-400 text-sm leading-relaxed text-start">
                                            {t("managed.description")}
                                        </p>
                                    </div>

                                    <div className="flex-1 relative z-10" />

                                    <div className="w-full py-4 rounded-xl font-bold text-center flex items-center justify-center gap-2 bg-white/5 text-gray-700 border border-white/5 relative z-10 grayscale opacity-20">
                                        {t("managed.cta")} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Modals */}
            <SupportPlanModal
                isOpen={isSupportModalOpen}
                onClose={() => setIsSupportModalOpen(false)}
            />
            <CustomizePlanModal
                isOpen={isCustomModalOpen}
                onClose={() => setIsCustomModalOpen(false)}
            />
        </section>
    );
}

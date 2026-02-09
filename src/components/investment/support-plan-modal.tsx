"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldCheck, Clock, Ticket } from "lucide-react";
import { useTranslations } from "next-intl";
import { TechnicalSupportCheckoutButton } from "./TechnicalSupportCheckoutButton";

interface SupportPlanModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SupportPlanModal({ isOpen, onClose }: SupportPlanModalProps) {
    const t = useTranslations("pricing.support");

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-[#0B0B0B]/90 backdrop-blur-xl"
                    />
                    <div className="fixed inset-0 z-[61] flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#0B0B0B] border border-white/10 rounded-3xl w-full max-w-3xl flex flex-col md:flex-row shadow-2xl overflow-hidden pointer-events-auto relative"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-monjez-blue via-monjez-purple to-monjez-blue opacity-50" />

                            {/* Left Side: Summary & Price */}
                            <div className="w-full md:w-1/3 bg-[#0f0f13] p-8 flex flex-col justify-between border-r border-white/5 rtl:border-r-0 rtl:border-l">
                                <div>
                                    <div className="flex items-center gap-2 text-monjez-highlight mb-4">
                                        <ShieldCheck className="w-5 h-5" />
                                        <span className="text-xs font-bold uppercase tracking-wider">{t("name")}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-white mb-2 text-start">{t("name")}</h2>
                                    <div className="flex items-baseline gap-1 mb-6 justify-start">
                                        <span className="text-4xl font-bold text-white">{t("price")}</span>
                                        <span className="text-gray-500">/mo</span>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed text-start">
                                        {t("description")}
                                    </p>
                                </div>
                                <div className="mt-8">
                                    <TechnicalSupportCheckoutButton
                                        className="w-full"
                                        onSuccess={onClose}
                                    />
                                </div>
                            </div>

                            {/* Right Side: Details */}
                            <div className="w-full md:w-2/3 p-8 bg-[#0B0B0B] relative">
                                <button onClick={onClose} className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>

                                <h3 className="text-lg font-bold text-white mb-6 text-start">What's Included?</h3>

                                <div className="space-y-6">
                                    {/* Features loop */}
                                    {[0, 1, 2, 3].map(i => (
                                        <div key={i} className="flex gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                                                {i === 0 && <Clock className="w-5 h-5 text-monjez-blue" />}
                                                {i === 1 && <Ticket className="w-5 h-5 text-monjez-purple" />}
                                                {i >= 2 && <ShieldCheck className="w-5 h-5 text-green-500" />}
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium mb-1 text-start">{t(`features.${i}`)}</h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

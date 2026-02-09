"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Send } from "lucide-react";
import { useTranslations } from "next-intl";

interface CustomizePlanModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function CustomizePlanModal({ isOpen, onClose }: CustomizePlanModalProps) {
    const t = useTranslations("pricing.customize");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);

            // Redirect to VIP Calendly after a delay
            setTimeout(() => {
                window.location.href = "https://calendly.com/monjez/vip";
            }, 2500);
        }, 1500);
    };

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
                            className="bg-[#0B0B0B] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden pointer-events-auto relative"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-monjez-blue via-monjez-purple to-monjez-blue opacity-50" />

                            <div className="flex items-center justify-between p-6 border-b border-white/5">
                                <h2 className="text-xl font-bold text-white text-start">{t("name")}</h2>
                                <button onClick={onClose} className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto custom-scrollbar">
                                {isSubmitted ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mx-auto mb-4">
                                            <Send className="w-8 h-8" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
                                        <p className="text-gray-400">Redirecting you to our VIP scheduler...</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <p className="text-gray-300 text-sm text-start">
                                            {t("description")}
                                        </p>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold text-gray-500 uppercase flex justify-start">Name</label>
                                                <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-monjez-blue transition-colors text-start" placeholder="John Doe" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold text-gray-500 uppercase flex justify-start">Company</label>
                                                <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-monjez-blue transition-colors text-start" placeholder="Acme Inc." />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-gray-500 uppercase flex justify-start">Email</label>
                                            <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-monjez-blue transition-colors text-start" placeholder="john@company.com" />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-gray-500 uppercase flex justify-start">Requested Features / Modules</label>
                                            <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-monjez-blue transition-colors text-start" placeholder="Describe the AI systems or automations you need..." />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-4 rounded-xl bg-monjez-purple hover:bg-monjez-accent text-white font-bold transition-all shadow-lg shadow-monjez-purple/20 flex items-center justify-center gap-2 disabled:opacity-70"
                                        >
                                            {isSubmitting ? (
                                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>
                                                    {t("cta")} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

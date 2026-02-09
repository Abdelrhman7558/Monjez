"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function EngagementModel() {
    const t = useTranslations("engagement");

    // Convert translations array to localized steps
    const steps = [
        t("steps.0"),
        t("steps.1"),
        t("steps.2"),
        t("steps.3"),
        t("steps.4")
    ];

    return (
        <section className="py-24 bg-black border-t border-white/5">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 text-start">
                            {t("title")}
                        </h2>
                        <p className="text-gray-400 text-lg text-start">
                            {t("subtitle")}
                        </p>
                    </div>

                    {/* Simple timeline for Engagement */}
                    <div className="md:w-1/2 w-full">
                        <div className="space-y-4">
                            {steps.map((step, i) => (
                                <div key={i} className="flex items-center group">
                                    <div className="w-8 h-8 rounded-full bg-monjez-blue/20 text-monjez-accent flex items-center justify-center font-bold text-sm me-4 border border-monjez-blue/30 group-hover:bg-monjez-accent group-hover:text-white transition-colors">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 h-px bg-white/10 group-hover:bg-white/20 transition-colors me-4" />
                                    <span className="text-lg font-medium text-gray-300 group-hover:text-white transition-colors">{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final CTA */}
                <div className="relative rounded-3xl bg-gradient-to-r from-monjez-blue to-monjez-dark p-12 md:p-24 text-center overflow-hidden">
                    {/* Glow Overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent pointer-events-none" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                            {t("cta_title")}
                        </h2>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link
                                href="/#book-call"
                                className="bg-white text-monjez-dark hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] flex items-center"
                            >
                                {t("cta_button")}
                                <ArrowRight className="ms-2 w-5 h-5 rtl:rotate-180" />
                            </Link>
                            <Link
                                href="/revenue-audit"
                                className="text-white hover:text-gray-200 font-medium flex items-center px-6 py-4"
                            >
                                {t("cta_audit")} <ChevronRight className="w-4 h-4 ms-1 rtl:rotate-180" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

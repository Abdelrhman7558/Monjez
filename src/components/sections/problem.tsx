"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function ProblemSection() {
    const t = useTranslations("problem");

    return (
        <section className="py-28 md:py-36 bg-monjez-dark relative overflow-hidden">
            {/* Subtle section separator */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-monjez-border to-transparent" />

            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                {/* Section header — left aligned */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-80px" }}
                    variants={itemVariants}
                    className="mb-16 max-w-xl"
                >
                    <span className="eyebrow mb-4">The Problem</span>
                    <h2 className="text-3xl md:text-[2.75rem] font-bold tracking-[-0.025em] leading-[1.1] text-monjez-text mt-4">
                        {t("title")}
                        <span className="block text-monjez-accent mt-1">
                            {t("title_accent")}
                        </span>
                    </h2>
                    <p className="text-monjez-muted text-lg mt-4 leading-relaxed">
                        {t("subtitle")}
                    </p>
                </motion.div>

                {/* Two-column comparison */}
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    {/* BEFORE — Chaos Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative p-8 rounded-2xl overflow-hidden"
                        style={{
                            background: "rgba(20, 20, 20, 0.8)",
                            border: "1px solid rgba(255,255,255,0.05)",
                        }}
                    >
                        {/* Subtle red tint */}
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/4 via-transparent to-transparent pointer-events-none rounded-2xl" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                        <path d="M2 2L12 12M12 2L2 12" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round"/>
                                    </svg>
                                </div>
                                <h3 className="text-base font-semibold text-monjez-text">{t("chaos_title")}</h3>
                            </div>

                            <ul className="space-y-3.5">
                                {[0, 1, 2, 3].map((i) => (
                                    <li key={i} className="flex items-start gap-3 text-[0.9rem] text-monjez-muted leading-relaxed">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 mt-1.5 flex-shrink-0" />
                                        {t(`chaos_list.${i}`)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* AFTER — Systems Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative p-8 rounded-2xl overflow-hidden group transition-all duration-300"
                        style={{
                            background: "rgba(20, 20, 20, 0.8)",
                            border: "1px solid rgba(217,119,6,0.2)",
                        }}
                    >
                        {/* Amber tint */}
                        <div className="absolute inset-0 bg-gradient-to-br from-monjez-accent/5 via-transparent to-transparent pointer-events-none rounded-2xl transition-opacity duration-500 group-hover:opacity-150" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-lg bg-monjez-accent/10 flex items-center justify-center">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                        <path d="M2.5 7L5.5 10L11.5 4" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <h3 className="text-base font-semibold text-monjez-text">{t("system_title")}</h3>
                            </div>

                            <ul className="space-y-3.5">
                                {[0, 1, 2, 3].map((i) => (
                                    <li key={i} className="flex items-start gap-3 text-[0.9rem] text-monjez-text leading-relaxed">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                                            <path d="M3.5 8.5L6.5 11.5L12.5 5" stroke="#D97706" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                        {t(`system_list.${i}`)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-monjez-border to-transparent" />
        </section>
    );
}

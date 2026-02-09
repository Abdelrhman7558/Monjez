"use client";

import { motion } from "framer-motion";
import { XCircle, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export function ProblemSection() {
    const t = useTranslations("problem");

    return (
        <section className="py-24 md:py-32 bg-monjez-dark relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        {t("title")}
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                            {t("title_accent")}
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        {t("subtitle")}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Chaos Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="p-8 rounded-2xl bg-red-900/10 border border-red-500/20 backdrop-blur-sm relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent rounded-2xl pointer-events-none" />
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-red-500/20 rounded-lg">
                                <XCircle className="w-6 h-6 text-red-500" />
                            </div>
                            <h3 className="text-xl font-semibold text-white">{t("chaos_title")}</h3>
                        </div>
                        <ul className="space-y-4">
                            {[0, 1, 2, 3].map((i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-400 text-start">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                                    {t(`chaos_list.${i}`)}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Systems Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="p-8 rounded-2xl bg-monjez-blue/10 border border-monjez-accent/30 backdrop-blur-sm relative group hover:border-monjez-accent/60 transition-colors duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-monjez-accent/10 to-transparent rounded-2xl pointer-events-none" />
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-monjez-accent/20 rounded-lg">
                                <CheckCircle className="w-6 h-6 text-monjez-accent" />
                            </div>
                            <h3 className="text-xl font-semibold text-white">{t("system_title")}</h3>
                        </div>
                        <ul className="space-y-4">
                            {[0, 1, 2, 3].map((i) => (
                                <li key={i} className="flex items-start gap-3 text-white text-start">
                                    <CheckCircle className="w-4 h-4 text-monjez-accent mt-1 shrink-0" />
                                    {t(`system_list.${i}`)}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Link } from "@/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import { HeroKPI } from "@/components/hero/hero-kpi";
import { useTranslations } from "next-intl";

// Dynamic import for 3D background with loading fallback
const HeroBackground = dynamic(() => import("./hero-background"), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-monjez-dark" />,
});

export function Hero() {
    const t = useTranslations("hero");

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-monjez-dark pt-20">
            {/* Background (3D on Desktop, Gradient Fallback handled in component or via CSS) */}
            <div className="absolute inset-0 z-0 opacity-60">
                <HeroBackground />
            </div>

            {/* Content */}
            <div className="container relative z-10 px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto space-y-8"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mx-auto mb-6">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">
                            {t("badge")}
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                        {t("title_part1")} <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-monjez-accent to-purple-500 glow-text">
                            {t("title_part2")}
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        {t("subtitle")}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link
                            href="/#book-call"
                            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-monjez-blue px-8 font-medium text-white shadow-lg transition-all duration-300 hover:bg-monjez-accent hover:scale-105 hover:shadow-[0_0_20px_rgba(59,79,228,0.6)]"
                        >
                            <span className="me-2">{t("cta_primary")}</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1s_infinite]" />
                        </Link>

                        <Link
                            href="#systems"
                            className="group inline-flex h-12 items-center justify-center rounded-full px-8 font-medium text-gray-300 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-all duration-300"
                        >
                            {t("cta_secondary")}
                            <ChevronRight className="w-4 h-4 ms-1 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180" />
                        </Link>
                    </div>

                    {/* Social Proof / Metrics */}
                    <HeroKPI />
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-monjez-accent rounded-full" />
                </div>
            </motion.div>
        </section>
    );
}

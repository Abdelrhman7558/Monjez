"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Link } from "@/navigation";
import { HeroKPI } from "@/components/hero/hero-kpi";
import { useTranslations } from "next-intl";

const HeroBackground = dynamic(() => import("./hero-background"), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-monjez-dark" />,
});

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.15,
        },
    },
};

const item = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
};

export function Hero() {
    const t = useTranslations("hero");

    return (
        <section
            className="relative min-h-[100dvh] flex items-center overflow-hidden bg-monjez-dark"
            style={{ paddingTop: "clamp(5rem, 10vw, 7rem)" }}
        >
            {/* 3D Background — subtle, low opacity */}
            <div className="absolute inset-0 z-0 opacity-30">
                <HeroBackground />
            </div>

            {/* Ambient radial light — amber, not purple */}
            <div
                className="absolute top-[-8%] left-[-5%] w-[700px] h-[700px] rounded-full pointer-events-none"
                style={{
                    background: "radial-gradient(circle, rgba(217,119,6,0.08) 0%, transparent 65%)",
                }}
            />

            {/* Horizontal rule — subtle section divider from nav */}
            <div className="absolute top-[72px] left-0 right-0 h-px bg-monjez-border pointer-events-none" />

            {/* ASYMMETRIC SPLIT LAYOUT — text left, visual cues right */}
            <div className="container relative z-10 mx-auto px-4 md:px-8 max-w-7xl w-full">
                <div className="grid md:grid-cols-[1fr_auto] gap-12 md:gap-20 items-center">

                    {/* LEFT — Content block */}
                    <motion.div
                        className="max-w-2xl"
                        variants={container}
                        initial="hidden"
                        animate="show"
                    >
                        {/* Eyebrow badge */}
                        <motion.div variants={item}>
                            <span className="eyebrow mb-6 inline-flex">
                                <span className="w-1.5 h-1.5 rounded-full bg-monjez-accent animate-pulse" />
                                {t("badge")}
                            </span>
                        </motion.div>

                        {/* Headline — left-aligned, tight tracking */}
                        <motion.h1
                            variants={item}
                            className="text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold tracking-[-0.03em] leading-[1.05] text-monjez-text mb-6"
                            style={{ textWrap: "balance" } as React.CSSProperties}
                        >
                            {t("title_part1")}
                            {" "}
                            <span className="text-monjez-accent">
                                {t("title_part2")}
                            </span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            variants={item}
                            className="text-lg text-monjez-muted leading-relaxed max-w-[52ch] mb-10"
                        >
                            {t("subtitle")}
                        </motion.p>

                        {/* CTA buttons — button-in-button for primary */}
                        <motion.div
                            variants={item}
                            className="flex flex-col sm:flex-row items-start gap-3"
                        >
                            <Link
                                href="/#book-call"
                                className="group inline-flex items-center gap-2 pl-6 pr-2 py-2 rounded-full bg-monjez-accent hover:bg-monjez-accent-warm text-[#080808] font-semibold text-[0.9375rem] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] shadow-[0_4px_20px_rgba(217,119,6,0.3)]"
                            >
                                {t("cta_primary")}
                                <span className="w-7 h-7 rounded-full bg-[#080808]/12 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-[1px] transition-transform duration-200 flex-shrink-0">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                        <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </span>
                            </Link>

                            <Link
                                href="#systems"
                                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[0.9375rem] font-medium text-monjez-muted hover:text-monjez-text border border-monjez-border hover:border-white/10 hover:bg-white/[0.04] transition-all duration-200 group"
                            >
                                {t("cta_secondary")}
                                <svg
                                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                                    className="group-hover:translate-x-0.5 transition-transform duration-200"
                                    aria-hidden="true"
                                >
                                    <path d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </Link>
                        </motion.div>

                        {/* KPI metrics */}
                        <motion.div variants={item} className="mt-12">
                            <HeroKPI />
                        </motion.div>
                    </motion.div>

                    {/* RIGHT — Floating status card (decorative) */}
                    <motion.div
                        className="hidden md:flex flex-col gap-3 w-[220px] flex-shrink-0"
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Status indicator */}
                        <div className="bezel-outer">
                            <div className="bezel-inner p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                                    <span className="text-[0.7rem] font-medium text-monjez-muted uppercase tracking-wider">Systems Live</span>
                                </div>
                                <div className="space-y-2">
                                    {[
                                        { label: "Lead intake", val: "Active" },
                                        { label: "Report gen", val: "Active" },
                                        { label: "Ad alerts", val: "Active" },
                                    ].map((row) => (
                                        <div key={row.label} className="flex justify-between items-center">
                                            <span className="text-[0.75rem] text-monjez-muted">{row.label}</span>
                                            <span className="text-[0.7rem] font-medium text-emerald-400">{row.val}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Revenue metric */}
                        <div className="bezel-outer animate-float" style={{ animationDelay: "1s" }}>
                            <div className="bezel-inner p-4">
                                <p className="text-[0.7rem] text-monjez-muted uppercase tracking-wider mb-1">Time saved / week</p>
                                <p className="text-2xl font-bold text-monjez-text tabular-nums tracking-tight">23.4h</p>
                                <p className="text-[0.7rem] text-monjez-accent mt-1">+12% vs last month</p>
                            </div>
                        </div>

                        {/* Audit badge */}
                        <div className="bezel-outer animate-float" style={{ animationDelay: "2.5s" }}>
                            <div className="bezel-inner px-4 py-3 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-monjez-accent/10 flex items-center justify-center flex-shrink-0">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                        <path d="M7 1L8.73 5.11L13.25 5.64L10 8.73L10.9 13.19L7 11L3.1 13.19L4 8.73L0.75 5.64L5.27 5.11L7 1Z" fill="#D97706"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[0.7rem] font-medium text-monjez-text">Free AI Audit</p>
                                    <p className="text-[0.65rem] text-monjez-muted">No commitment</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-5 h-8 rounded-full border border-monjez-border flex justify-center pt-1.5"
                >
                    <div className="w-0.5 h-2 bg-monjez-accent rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}

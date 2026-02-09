"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

interface KPIMetricProps {
    value: number;
    suffix?: string;
    label: string;
    delay?: number;
}

function KPIMetric({ value, suffix = "", label, delay = 0 }: KPIMetricProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    // Spring animation for the number
    const springValue = useSpring(0, {
        damping: 30,
        stiffness: 100,
        duration: 2.5 // Slightly slower for smoother feel
    });

    // Transform spring value to rounded number string
    const displayValue = useTransform(springValue, (current) => Math.round(current).toLocaleString());

    useEffect(() => {
        if (isInView) {
            const timeout = setTimeout(() => {
                springValue.set(value);
            }, delay * 1000);
            return () => clearTimeout(timeout);
        }
    }, [isInView, value, delay, springValue]);

    return (
        <div ref={ref} className="flex flex-col items-center justify-center px-4 md:px-8 py-2 min-w-[140px] relative">
            <div className="flex items-baseline justify-center gap-0.5 text-3xl md:text-4xl font-bold text-monjez-highlight mb-1 drop-shadow-[0_0_8px_rgba(30,144,255,0.4)]">
                <motion.span>{displayValue}</motion.span>
                <span>{suffix}</span>
            </div>
            <p className="text-xs md:text-sm text-gray-400 font-medium tracking-widest uppercase">{label}</p>
        </div>
    );
}

export function HeroKPI() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full max-w-5xl mx-auto mt-16 px-4"
        >
            {/* Mac-style Card Container */}
            <div className="relative rounded-2xl bg-monjez-dark/60 border border-white/10 backdrop-blur-xl shadow-[0_0_40px_-10px_rgba(61,12,89,0.3)] overflow-hidden group hover:scale-[1.02] hover:shadow-[0_0_60px_-10px_rgba(30,144,255,0.2)] transition-all duration-500 z-10">

                {/* Mac Window Header */}
                <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56]/80" /> {/* Red */}
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]/80" /> {/* Yellow */}
                    <div className="w-3 h-3 rounded-full bg-[#27C93F]/80" /> {/* Green */}
                    <div className="ml-auto text-[10px] text-gray-500 font-mono tracking-widest uppercase opacity-50">System Metrics</div>
                </div>

                {/* Top shine/highlight */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-monjez-highlight/30 to-transparent opacity-50" />

                {/* Hover Glow */}
                <div className="absolute -inset-px bg-gradient-to-r from-monjez-highlight/0 via-monjez-highlight/5 to-monjez-highlight/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Content Container */}
                <div className="flex flex-col md:flex-row items-center justify-between divide-y md:divide-y-0 md:divide-x divide-white/5 p-6 md:p-10 relative z-10">
                    <KPIMetric value={30} suffix="%" label="Avg. Cost Reduction" delay={0.1} />
                    <KPIMetric value={24} suffix="/7" label="Operational Uptime" delay={0.3} />
                    <KPIMetric value={10} suffix="x" label="Faster Execution" delay={0.5} />
                    <div className="flex flex-col items-center justify-center px-4 md:px-8 py-2 min-w-[140px]">
                        <div className="flex items-baseline justify-center gap-0.5 text-3xl md:text-4xl font-bold text-white mb-1 drop-shadow-[0_0_10px_rgba(30,144,255,0.5)]">
                            <span>$10M</span>
                            <span className="text-monjez-highlight">+</span>
                        </div>
                        <p className="text-xs md:text-sm text-gray-400 font-medium tracking-widest uppercase">Revenue Processed</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

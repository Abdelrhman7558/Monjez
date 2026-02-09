"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslations } from "next-intl";

export function PhilosophySection() {
    const t = useTranslations("philosophy");
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

    return (
        <section ref={targetRef} id="philosophy" className="py-32 bg-black relative">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    style={{ opacity, scale }}
                    className="max-w-5xl mx-auto text-center"
                >
                    <div className="mb-8">
                        <span className="text-monjez-accent text-sm font-bold tracking-[0.2em] uppercase">
                            {t("badge")}
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-12">
                        {t("title")} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                            {t("title_accent")}
                        </span>
                    </h2>

                    <div className="h-px w-24 bg-monjez-accent mx-auto mb-12" />

                    <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto">
                        {t("subtitle")}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

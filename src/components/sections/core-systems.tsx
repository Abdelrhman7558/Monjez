"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, DollarSign, Activity, User, Building2, Briefcase, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SystemDetailModal, SystemDetail } from "../systems/system-detail-modal";
import { useTranslations } from "next-intl";

interface SystemCardData extends SystemDetail {
    icon: any;
    features: string[];
    size: "large" | "medium" | "small";
    accent: string;
    accentBg: string;
    accentBorder: string;
}

// Stagger variants
const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function CoreSystems() {
    const t = useTranslations("systems");
    const [selectedSystem, setSelectedSystem] = useState<SystemDetail | null>(null);

    const systemsData: SystemCardData[] = [
        {
            id: "revenue",
            title: t("revenue.title"),
            icon: DollarSign,
            description: t("revenue.description"),
            features: [t("revenue.features.0"), t("revenue.features.1"), t("revenue.features.2")],
            // Large card — featured
            size: "large",
            accent: "#D97706",
            accentBg: "rgba(217,119,6,0.08)",
            accentBorder: "rgba(217,119,6,0.2)",
            targetUsers: [
                { role: t("revenue.users.0.role"), benefit: t("revenue.users.0.benefit"), icon: User },
                { role: t("revenue.users.1.role"), benefit: t("revenue.users.1.benefit"), icon: Building2 },
                { role: t("revenue.users.2.role"), benefit: t("revenue.users.2.benefit"), icon: Briefcase }
            ],
            roiStats: [
                { label: t("revenue.roi.0.label"), value: t("revenue.roi.0.value") },
                { label: t("revenue.roi.1.label"), value: t("revenue.roi.1.value") },
                { label: t("revenue.roi.2.label"), value: t("revenue.roi.2.value") }
            ],
            modules: [
                { name: t("revenue.modules.0.name"), description: t("revenue.modules.0.description") },
                { name: t("revenue.modules.1.name"), description: t("revenue.modules.1.description") },
                { name: t("revenue.modules.2.name"), description: t("revenue.modules.2.description") }
            ],
            examples: [{
                title: t("revenue.examples.0.title"),
                scenario: t("revenue.examples.0.scenario"),
                image: "https://picsum.photos/seed/revenue-system/800/500"
            }]
        },
        {
            id: "financial",
            title: t("financial.title"),
            icon: Activity,
            description: t("financial.description"),
            features: [t("financial.features.0"), t("financial.features.1"), t("financial.features.2")],
            size: "medium",
            accent: "#10B981",
            accentBg: "rgba(16,185,129,0.07)",
            accentBorder: "rgba(16,185,129,0.18)",
            targetUsers: [
                { role: t("financial.users.0.role"), benefit: t("financial.users.0.benefit"), icon: User },
                { role: t("financial.users.1.role"), benefit: t("financial.users.1.benefit"), icon: Building2 },
                { role: t("financial.users.2.role"), benefit: t("financial.users.2.benefit"), icon: Briefcase }
            ],
            roiStats: [
                { label: t("financial.roi.0.label"), value: t("financial.roi.0.value") },
                { label: t("financial.roi.1.label"), value: t("financial.roi.1.value") },
                { label: t("financial.roi.2.label"), value: t("financial.roi.2.value") }
            ],
            modules: [
                { name: t("financial.modules.0.name"), description: t("financial.modules.0.description") },
                { name: t("financial.modules.1.name"), description: t("financial.modules.1.description") },
                { name: t("financial.modules.2.name"), description: t("financial.modules.2.description") }
            ],
            examples: [{
                title: t("financial.examples.0.title"),
                scenario: t("financial.examples.0.scenario"),
                image: "https://picsum.photos/seed/financial-system/800/500"
            }]
        },
        {
            id: "operational",
            title: t("operational.title"),
            icon: Cpu,
            description: t("operational.description"),
            features: [t("operational.features.0"), t("operational.features.1"), t("operational.features.2")],
            size: "medium",
            accent: "#F59E0B",
            accentBg: "rgba(245,158,11,0.07)",
            accentBorder: "rgba(245,158,11,0.18)",
            targetUsers: [
                { role: t("operational.users.0.role"), benefit: t("operational.users.0.benefit"), icon: User },
                { role: t("operational.users.1.role"), benefit: t("operational.users.1.benefit"), icon: Building2 },
                { role: t("operational.users.2.role"), benefit: t("operational.users.2.benefit"), icon: Briefcase }
            ],
            roiStats: [
                { label: t("operational.roi.0.label"), value: t("operational.roi.0.value") },
                { label: t("operational.roi.1.label"), value: t("operational.roi.1.value") },
                { label: t("operational.roi.2.label"), value: t("operational.roi.2.value") }
            ],
            modules: [
                { name: t("operational.modules.0.name"), description: t("operational.modules.0.description") },
                { name: t("operational.modules.1.name"), description: t("operational.modules.1.description") },
                { name: t("operational.modules.2.name"), description: t("operational.modules.2.description") }
            ],
            examples: [{
                title: t("operational.examples.0.title"),
                scenario: t("operational.examples.0.scenario"),
                image: "https://picsum.photos/seed/operational-system/800/500"
            }]
        }
    ];

    const [featured, ...rest] = systemsData;

    return (
        <section id="systems" className="py-28 md:py-36 bg-monjez-dark relative">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-monjez-border to-transparent" />

            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                {/* Section header */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="eyebrow mb-4">Systems</span>
                    <h2 className="text-3xl md:text-[2.75rem] font-bold tracking-[-0.025em] leading-[1.1] text-monjez-text mt-4 max-w-lg" style={{ textWrap: "balance" } as React.CSSProperties}>
                        {t("title")}
                    </h2>
                    <p className="text-monjez-muted text-lg mt-3 max-w-[50ch] leading-relaxed">
                        {t("subtitle")}
                    </p>
                </motion.div>

                {/* ASYMMETRIC BENTO GRID — 1 large + 2 medium stacked */}
                <motion.div
                    className="grid md:grid-cols-[1.4fr_1fr] gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {/* Featured card — large, left */}
                    <motion.div
                        variants={cardVariants}
                        className="group relative p-8 md:p-10 rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden"
                        style={{
                            background: "#111111",
                            border: `1px solid ${featured.accentBorder}`,
                            boxShadow: `0 0 0 0 ${featured.accent}00`,
                        }}
                        onClick={() => setSelectedSystem(featured)}
                        whileHover={{
                            borderColor: featured.accent + "50",
                            boxShadow: `0 8px 40px ${featured.accent}12`,
                            transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                        }}
                        whileTap={{ scale: 0.99 }}
                    >
                        {/* Subtle ambient glow */}
                        <div
                            className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{ background: `radial-gradient(circle, ${featured.accent}10 0%, transparent 70%)` }}
                        />

                        <div className="relative z-10">
                            {/* Icon */}
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-8"
                                style={{ background: featured.accentBg }}
                            >
                                <featured.icon className="w-5 h-5" style={{ color: featured.accent }} />
                            </div>

                            <h3 className="text-xl font-bold text-monjez-text mb-3">{featured.title}</h3>
                            <p className="text-monjez-muted text-sm leading-relaxed mb-8 max-w-[40ch]">
                                {featured.description}
                            </p>

                            {/* Features list */}
                            <ul className="space-y-2.5 mb-10">
                                {featured.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2.5 text-sm text-monjez-muted">
                                        <span
                                            className="w-1 h-1 rounded-full flex-shrink-0"
                                            style={{ background: featured.accent }}
                                        />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <div
                                className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
                                style={{ color: featured.accent }}
                            >
                                {t("learn_more")}
                                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Right column — 2 stacked medium cards */}
                    <div className="flex flex-col gap-4">
                        {rest.map((system) => (
                            <motion.div
                                key={system.id}
                                variants={cardVariants}
                                className="group relative p-7 rounded-2xl cursor-pointer flex-1 overflow-hidden transition-all duration-300"
                                style={{
                                    background: "#111111",
                                    border: `1px solid rgba(255,255,255,0.05)`,
                                }}
                                onClick={() => setSelectedSystem(system)}
                                whileHover={{
                                    borderColor: system.accentBorder,
                                    transition: { duration: 0.25 },
                                }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-start justify-between mb-5">
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                                            style={{ background: system.accentBg }}
                                        >
                                            <system.icon className="w-4.5 h-4.5" style={{ color: system.accent }} />
                                        </div>
                                        <ArrowUpRight
                                            className="w-4 h-4 text-monjez-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                                        />
                                    </div>

                                    <h3 className="text-base font-bold text-monjez-text mb-2">{system.title}</h3>
                                    <p className="text-monjez-muted text-sm leading-relaxed line-clamp-2">
                                        {system.description}
                                    </p>

                                    {/* Feature pills */}
                                    <div className="flex flex-wrap gap-1.5 mt-4">
                                        {system.features.slice(0, 2).map((f, i) => (
                                            <span
                                                key={i}
                                                className="text-[0.65rem] px-2 py-0.5 rounded-full font-medium"
                                                style={{
                                                    background: system.accentBg,
                                                    color: system.accent,
                                                    border: `1px solid ${system.accentBorder}`,
                                                }}
                                            >
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <SystemDetailModal
                system={selectedSystem}
                isOpen={!!selectedSystem}
                onClose={() => setSelectedSystem(null)}
            />

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-monjez-border to-transparent" />
        </section>
    );
}

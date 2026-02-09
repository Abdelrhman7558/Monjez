"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, DollarSign, Activity, User, Building2, Briefcase, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SystemDetailModal, SystemDetail } from "../systems/system-detail-modal";
import { useTranslations } from "next-intl";

// Extended System Data including presentation props
interface SystemCardData extends SystemDetail {
    icon: any;
    features: string[];
    gradient: string;
    border: string;
    text: string;
}

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
            gradient: "from-blue-500/20 to-purple-500/20",
            border: "group-hover:border-blue-500/50",
            text: "group-hover:text-blue-400",
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
            examples: [
                {
                    title: t("revenue.examples.0.title"),
                    scenario: t("revenue.examples.0.scenario"),
                    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                }
            ]
        },
        {
            id: "financial",
            title: t("financial.title"),
            icon: Activity,
            description: t("financial.description"),
            features: [t("financial.features.0"), t("financial.features.1"), t("financial.features.2")],
            gradient: "from-emerald-500/20 to-teal-500/20",
            border: "group-hover:border-emerald-500/50",
            text: "group-hover:text-emerald-400",
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
            examples: [
                {
                    title: t("financial.examples.0.title"),
                    scenario: t("financial.examples.0.scenario"),
                    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7"
                }
            ]
        },
        {
            id: "operational",
            title: t("operational.title"),
            icon: Cpu,
            description: t("operational.description"),
            features: [t("operational.features.0"), t("operational.features.1"), t("operational.features.2")],
            gradient: "from-orange-500/20 to-red-500/20",
            border: "group-hover:border-orange-500/50",
            text: "group-hover:text-orange-400",
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
            examples: [
                {
                    title: t("operational.examples.0.title"),
                    scenario: t("operational.examples.0.scenario"),
                    image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02"
                }
            ]
        }
    ];

    return (
        <section id="systems" className="py-24 md:py-32 bg-monjez-dark relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        {t("title")}
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {systemsData.map((system, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-all duration-500 overflow-hidden cursor-pointer"
                            onClick={() => setSelectedSystem(system)}
                        >
                            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none", system.gradient)} />

                            <div className="relative z-10">
                                <div className={cn("w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 transition-colors duration-300", system.border)}>
                                    <system.icon className={cn("w-6 h-6 text-gray-300 transition-colors duration-300", system.text)} />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors text-start">{system.title}</h3>
                                <p className="text-gray-400 text-sm mb-6 leading-relaxed text-start">
                                    {system.description}
                                </p>

                                <ul className="space-y-3 mb-8">
                                    {system.features.map((feature, i) => (
                                        <li key={i} className="flex items-center text-sm text-gray-500 group-hover:text-gray-300 transition-colors text-start">
                                            <div className={cn("w-1 h-1 rounded-full bg-gray-600 me-2 group-hover:bg-white transition-colors")} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-white transition-colors">
                                    {t("learn_more")} <ArrowUpRight className="w-4 h-4 ms-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 rtl:rotate-[-90deg] rtl:group-hover:translate-x-[-4px]" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Detail Modal */}
            <SystemDetailModal
                system={selectedSystem}
                isOpen={!!selectedSystem}
                onClose={() => setSelectedSystem(null)}
            />
        </section>
    );
}

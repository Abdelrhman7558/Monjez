"use client";

import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const comparisonData = [
    {
        feature: "System Architecture",
        monjez: "Custom-Engineered Core",
        others: "Generic Templates",
        diy: "Fragmented Scripts"
    },
    {
        feature: "Integration Depth",
        monjez: "Deep API & Database Level",
        others: "Surface Webhooks (Zapier)",
        diy: "Manual CSV Uploads"
    },
    {
        feature: "Long-term Scalability",
        monjez: "Enterprise-Grade (Headless)",
        others: "Breaks at Volume",
        diy: "High Maintenance Debt"
    },
    {
        feature: "ROI Focus",
        monjez: "Guaranteed Revenue Metrics",
        others: "Task Completion Only",
        diy: "N/A (Cost Saving Only)"
    },
    {
        feature: "Maintenance",
        monjez: "24/7 Managed Oversight",
        others: "Hourly Billing Support",
        diy: "You Are The Support"
    }
];

export function ComparisonSection() {
    return (
        <section className="py-24 md:py-32 bg-monjez-dark relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        The Difference Between <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                            Engineering Systems
                        </span>{" "}
                        and Just Using Tools
                    </h2>
                </div>

                <div className="overflow-x-auto pb-4 md:pb-0">
                    <div className="min-w-[800px] grid grid-cols-4 gap-4 md:gap-8 text-left">
                        {/* Headers */}
                        <div className="col-span-1 py-4 text-gray-500 font-semibold uppercase tracking-wider text-sm sticky left-0 bg-monjez-dark z-20">
                            Feature
                        </div>
                        <div className="col-span-1 py-4 text-white font-bold text-lg bg-monjez-blue/10 rounded-t-xl text-center border-t border-x border-monjez-blue/30 relative">
                            <div className="absolute top-0 left-0 right-0 h-1 bg-monjez-accent shadow-[0_0_15px_#3b4fe4]" />
                            Work With Monjez
                        </div>
                        <div className="col-span-1 py-4 text-gray-400 font-semibold text-lg text-center">
                            Generic Agency
                        </div>
                        <div className="col-span-1 py-4 text-gray-400 font-semibold text-lg text-center">
                            Do It Yourself
                        </div>

                        {/* Rows */}
                        {comparisonData.map((row, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className="contents group"
                            >
                                <div className="col-span-1 py-6 text-gray-400 font-medium border-b border-white/5 sticky left-0 bg-monjez-dark group-hover:text-white transition-colors z-20">
                                    {row.feature}
                                </div>

                                {/* Monjez Column */}
                                <div className="col-span-1 py-6 px-4 bg-monjez-blue/5 border-x border-monjez-blue/10 flex items-center justify-center text-center font-semibold text-white relative group-hover:bg-monjez-blue/10 transition-colors">
                                    {index === comparisonData.length - 1 && <div className="absolute bottom-0 left-0 right-0 h-px bg-monjez-blue/30" />}
                                    <Check className="w-5 h-5 text-monjez-accent mr-2 flex-shrink-0" />
                                    {row.monjez}
                                </div>

                                {/* Others Column */}
                                <div className="col-span-1 py-6 px-4 flex items-center justify-center text-center text-gray-500 border-b border-white/5">
                                    <Minus className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0" />
                                    {row.others}
                                </div>

                                {/* DIY Column */}
                                <div className="col-span-1 py-6 px-4 flex items-center justify-center text-center text-gray-500 border-b border-white/5">
                                    <X className="w-5 h-5 text-red-900/50 mr-2 flex-shrink-0" />
                                    {row.diy}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

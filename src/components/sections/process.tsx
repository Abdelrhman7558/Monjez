"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, PenTool, Rocket, BarChart2, ArrowRight } from "lucide-react";

interface Step {
    icon: any;
    title: string;
    description: string;
}

const steps: Step[] = [
    {
        icon: Search,
        title: "Diagnose",
        description: "We audit your entire operational workflow to identify bottlenecks, data leaks, and high-value automation opportunities."
    },
    {
        icon: PenTool,
        title: "Architect",
        description: "We design a custom AI infrastructure map, selecting the right LLMs, vector databases, and integration points."
    },
    {
        icon: Rocket,
        title: "Deploy",
        description: "We build and implement the system in phases, ensuring zero downtime and immediate impact on your daily operations."
    },
    {
        icon: BarChart2,
        title: "Optimize",
        description: "We continuously refine prompts, improve agents, and expand capabilities based on real-time performance data."
    }
];

function ProcessCard({ step, index }: { step: Step; index: number }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative p-8 rounded-2xl bg-monjez-dark border border-white/5 hover:border-monjez-accent/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(155,89,182,0.15)] overflow-hidden"
        >
            {/* Step Number Background */}
            <span className="absolute -right-4 -top-4 text-9xl font-bold text-white/[0.03] group-hover:text-monjez-accent/[0.05] transition-colors duration-500 select-none">
                0{index + 1}
            </span>

            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-monjez-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="mb-6 inline-flex p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-monjez-accent/20 group-hover:border-monjez-accent/50 transition-all duration-300">
                    <step.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-monjez-highlight transition-colors">
                    {step.title}
                </h3>

                <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                    {step.description}
                </p>
            </div>
        </motion.div>
    );
}

export function ProcessSection() {
    return (
        <section id="process" className="py-24 md:py-32 bg-black relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-monjez-accent/30 to-transparent" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <span className="text-monjez-highlight text-sm font-bold tracking-widest uppercase mb-4 block">Our Process</span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        How We Build
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        A structured, engineering-first approach to deploying AI infrastructure.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, index) => (
                        <ProcessCard key={index} step={step} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

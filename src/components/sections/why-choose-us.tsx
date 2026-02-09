"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Zap, Scale, Settings, Users } from "lucide-react";

const reasons = [
    {
        icon: ShieldCheck,
        title: "Strategic AI Architecture",
        description: "We don't guess. We engineer systems based on proven data models and enterprise-grade security standards."
    },
    {
        icon: Zap,
        title: "End-to-End System Design",
        description: "From data ingestion to final execution, we build the entire pipeline so you don't have to stitch tools together."
    },
    {
        icon: Scale,
        title: "Continuous Optimization",
        description: "Our systems self-correct and improve over time. We monitor performance and refine algorithms monthly."
    },
    {
        icon: Settings,
        title: "Custom-Built Infrastructure",
        description: "No cookie-cutter templates. Your business logic is unique, and your AI infrastructure should be too."
    },
    {
        icon: Users,
        title: "Boutique Execution Model",
        description: "We take fewer clients to ensure deeper execution. You get a dedicated engineering partner, not a support ticket."
    }
];

export function WhyChooseUs() {
    return (
        <section className="py-24 bg-black border-t border-white/5">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Why Agencies & Founders <br /> Trust Monjez
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-monjez-blue/30 hover:bg-white/[0.08] transition-all duration-300 group"
                        >
                            <div className="w-12 h-12 bg-monjez-blue/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-monjez-blue/30 transition-colors">
                                <reason.icon className="w-6 h-6 text-monjez-accent" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{reason.title}</h3>
                            <p className="text-gray-400 leading-relaxed">
                                {reason.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

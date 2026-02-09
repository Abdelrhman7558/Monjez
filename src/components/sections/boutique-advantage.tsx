"use client";

import { motion } from "framer-motion";
import { Gem, Lock, Users } from "lucide-react";

export function BoutiqueAdvantage() {
    return (
        <section className="py-24 bg-monjez-dark relative overflow-hidden">
            {/* Background Radial Gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-monjez-blue/20 via-monjez-dark to-monjez-dark pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
                        <Gem className="w-4 h-4 text-monjez-accent" />
                        <span className="text-sm font-semibold text-white tracking-wide uppercase">The Boutique Advantage</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                        Focused. Elite. Engineered.
                    </h2>

                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
                        We are not a volume agency. We are a lean AI infrastructure firm.
                        We cap our active client list to ensure every system we build receives
                        direct partner-level engineering oversight.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                            <Lock className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                            <h4 className="text-lg font-bold text-white mb-2">Private Infrastructure</h4>
                            <p className="text-sm text-gray-500">Your data never leaves your control. We build on your own cloud instances.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                            <Users className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                            <h4 className="text-lg font-bold text-white mb-2">Direct Access</h4>
                            <p className="text-sm text-gray-500">No account managers. You speak directly to the engineers building your system.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                            <Gem className="w-8 h-8 text-gray-400 mx-auto mb-4" />
                            <h4 className="text-lg font-bold text-white mb-2">High Impact</h4>
                            <p className="text-sm text-gray-500">We only take projects where we can deliver at least 3x ROI within 90 days.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

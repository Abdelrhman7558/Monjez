"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, Zap, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function RevenueAuditPage() {
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulation of payment redirection
        setTimeout(() => {
            alert("Redirecting to Stripe Checkout...");
            setIsProcessing(false);
        }, 2000);
    };

    return (
        <main className="min-h-screen bg-monjez-dark flex flex-col">
            <Header />

            <div className="flex-1 container mx-auto px-4 py-32 md:py-48 flex flex-col items-center">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-monjez-accent/10 border border-monjez-accent/20 mb-8"
                >
                    <Zap className="w-4 h-4 text-monjez-accent" />
                    <span className="text-sm font-semibold text-monjez-accent tracking-wide uppercase">Limited Availability</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-6xl font-bold text-white text-center mb-8 leading-tight max-w-4xl"
                >
                    Get a Deep-Dive <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-monjez-accent to-purple-500">
                        AI Revenue Infrastructure Audit
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-400 text-center max-w-2xl mb-16"
                >
                    We will manually analyze your current operational stack, identify bottlenecks,
                    and deliver a roadmap to automate 40%+ of your workflow within 7 days.
                </motion.p>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl w-full items-start">
                    {/* Left: What You Get */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6">What You Get</h3>
                            <ul className="space-y-4">
                                {[
                                    "Full Architecture Diagram of your future AI System",
                                    "Cost-Benefit Analysis of Automation vs. Hiring",
                                    "Tool Stack Recommendations (LLMs, Vector DBs, Agents)",
                                    "Implementation Roadmap (30-60-90 Days)",
                                    "1-Hour Strategy Walkthrough with a Senior Engineer"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-300">
                                        <CheckCircle className="w-5 h-5 text-monjez-accent flex-shrink-0 mt-1" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="p-6 rounded-xl bg-white/5 border border-white/5">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-10 h-10 rounded-full bg-monjez-blue/20 flex items-center justify-center">
                                    <ShieldCheck className="w-5 h-5 text-monjez-accent" />
                                </div>
                                <h4 className="font-bold text-white">100% Money-Back Guarantee</h4>
                            </div>
                            <p className="text-sm text-gray-400 ml-14">
                                If we can't find at least $50k in annual savings or revenue opportunities, we'll refund the audit fee instantly.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right: Pricing Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="relative rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-8 shadow-2xl backdrop-blur-xl"
                    >
                        <div className="absolute top-0 right-0 p-4">
                            <div className="px-3 py-1 rounded-full bg-monjez-accent text-white text-xs font-bold uppercase">
                                One-Time Fee
                            </div>
                        </div>

                        <h3 className="text-lg font-medium text-gray-400 mb-2">Detailed AI Audit</h3>
                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-5xl font-bold text-white">$497</span>
                            <span className="text-gray-500 line-through text-lg">$1,500</span>
                        </div>

                        <div className="space-y-6 mb-8">
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Stop guessing. Get a professionally engineered blueprint before you spend a dime on developers or tools.
                            </p>
                            <div className="h-px bg-white/10" />
                            <p className="text-xs text-gray-500 text-center">
                                * Deliverable in 3-5 business days
                            </p>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className={cn(
                                "w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300",
                                isProcessing
                                    ? "bg-monjez-blue/50 cursor-not-allowed text-gray-300"
                                    : "bg-monjez-blue hover:bg-monjez-accent text-white shadow-[0_0_20px_rgba(59,79,228,0.4)] hover:shadow-[0_0_30px_rgba(59,79,228,0.6)]"
                            )}
                        >
                            {isProcessing ? (
                                <>Processing <Loader2 className="w-5 h-5 animate-spin" /></>
                            ) : (
                                <>Get Your Audit Now <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>

                        <p className="text-center text-xs text-gray-500 mt-4">
                            Secure payment via Stripe. No hidden subscription.
                        </p>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

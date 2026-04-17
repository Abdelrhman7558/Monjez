"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, Mail, MessageSquare, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";

export default function ThankYouPage() {
    const t = useTranslations("thank_you");

    const steps = [
        { icon: Mail, text: t("step_1"), color: "text-blue-400", bg: "bg-blue-400/10" },
        { icon: MessageSquare, text: t("step_2"), color: "text-purple-400", bg: "bg-purple-400/10" },
        { icon: Calendar, text: t("step_3"), color: "text-monjez-accent", bg: "bg-monjez-accent/10" },
    ];

    return (
        <main className="min-h-screen bg-monjez-dark flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-monjez-blue/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-monjez-purple/10 blur-[120px] rounded-full" />

            <div className="container max-w-2xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 text-center"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.2 }}
                        className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8"
                    >
                        <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </motion.div>

                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        {t("success")}
                    </h1>
                    <p className="text-monjez-highlight text-lg mb-8 font-medium">
                        {t("subtitle")}
                    </p>

                    <p className="text-gray-400 leading-relaxed mb-12 max-w-md mx-auto">
                        {t("description")}
                    </p>

                    <div className="space-y-4 mb-12 text-start max-w-md mx-auto">
                        <h3 className="text-white font-bold mb-4 px-2">{t("next_steps")}</h3>
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                            >
                                <div className={`w-10 h-10 rounded-xl ${step.bg} flex items-center justify-center shrink-0`}>
                                    <step.icon className={`w-5 h-5 ${step.color}`} />
                                </div>
                                <span className="text-gray-300 font-medium text-sm md:text-base">
                                    {step.text}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:translate-x-1" />
                        {t("back_home")}
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}

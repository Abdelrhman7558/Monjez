"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useTranslations } from "next-intl";

export function FAQSection() {
    const t = useTranslations("faq");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Get FAQ items from translations
    const faqItems = [
        { question: t("items.0.question"), answer: t("items.0.answer") },
        { question: t("items.1.question"), answer: t("items.1.answer") },
        { question: t("items.2.question"), answer: t("items.2.answer") },
        { question: t("items.3.question"), answer: t("items.3.answer") },
        { question: t("items.4.question"), answer: t("items.4.answer") },
    ];

    // JSON-LD Schema for FAQ
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <section id="faq" className="py-24 bg-monjez-dark border-t border-white/5">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 text-center">
                    {t("title")}
                </h2>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqItems.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden transition-all duration-300 hover:bg-white/[0.08]"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-start"
                                suppressHydrationWarning
                            >
                                <span className="text-lg font-medium text-white">{faq.question}</span>
                                {openIndex === index ? (
                                    <Minus className="w-5 h-5 text-monjez-accent flex-shrink-0 ms-4" />
                                ) : (
                                    <Plus className="w-5 h-5 text-gray-400 flex-shrink-0 ms-4" />
                                )}
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

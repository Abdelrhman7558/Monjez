"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "@/navigation";
import { cn } from "@/lib/utils";
import { SupportPlanModal } from "../investment/support-plan-modal";
import { CustomizePlanModal } from "../investment/customize-plan-modal";
import { useTranslations } from "next-intl";

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
    }),
};

export function PricingSection() {
    const t = useTranslations("pricing");
    const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
    const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

    const infrastructureTiers = [
        {
            key: "starter",
            link: "/#book-call",
            popular: false,
            bookingType: "standard",
        },
        {
            key: "growth",
            link: "/#book-call",
            popular: true,
            bookingType: "standard",
        },
        {
            key: "enterprise",
            link: "/#book-call",
            popular: false,
            bookingType: "vip",
        }
    ];

    const getTierFeatures = (key: string) => {
        return [0, 1, 2, 3, 4].map(i => {
            const path = `tiers.${key}.features.${i}`;
            return t.has(path) ? t(path) : null;
        }).filter(Boolean);
    };

    return (
        <section id="pricing" className="py-28 md:py-36 bg-monjez-dark relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-monjez-border to-transparent" />

            {/* Radial ambient — very subtle */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(217,119,6,0.04) 0%, transparent 65%)" }}
            />

            <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
                {/* Header */}
                <motion.div
                    className="mb-16 max-w-xl"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                    <span className="eyebrow mb-4">Pricing</span>
                    <h2 className="text-3xl md:text-[2.75rem] font-bold tracking-[-0.025em] leading-[1.1] text-monjez-text mt-4">
                        {t("title")}
                    </h2>
                    <p className="text-monjez-muted text-lg mt-3 leading-relaxed">
                        {t("subtitle")}
                    </p>
                </motion.div>

                {/* Pricing cards — 3 cols with STRONG emphasis on popular tier */}
                <div className="grid md:grid-cols-3 gap-4 md:gap-3 items-start">
                    {infrastructureTiers.map((tier, i) => {
                        const features = getTierFeatures(tier.key);
                        const isPopular = tier.popular;

                        return (
                            <motion.div
                                key={tier.key}
                                custom={i}
                                variants={itemVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-60px" }}
                                className={cn(
                                    "relative rounded-2xl flex flex-col transition-all duration-300",
                                    isPopular
                                        ? "p-px"
                                        : "p-7 md:p-8 border border-monjez-border bg-monjez-card mt-0 md:mt-6"
                                )}
                                style={isPopular ? {
                                    background: "linear-gradient(145deg, rgba(217,119,6,0.4) 0%, rgba(217,119,6,0.1) 40%, rgba(255,255,255,0.06) 100%)",
                                    boxShadow: "0 8px 48px rgba(217,119,6,0.12)",
                                } : {}}
                            >
                                {/* Inner card for popular tier */}
                                {isPopular ? (
                                    <div className="rounded-[calc(1rem-1px)] bg-[#141414] p-7 md:p-8 flex flex-col flex-1">
                                        <PricingCardInner
                                            tier={tier}
                                            features={features as string[]}
                                            isPopular
                                            t={t}
                                        />
                                    </div>
                                ) : (
                                    <PricingCardInner
                                        tier={tier}
                                        features={features as string[]}
                                        isPopular={false}
                                        t={t}
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Trust note */}
                <motion.p
                    className="text-center text-sm text-monjez-muted mt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    All plans start with a free AI audit. No commitment required.
                </motion.p>
            </div>

            <SupportPlanModal
                isOpen={isSupportModalOpen}
                onClose={() => setIsSupportModalOpen(false)}
            />
            <CustomizePlanModal
                isOpen={isCustomModalOpen}
                onClose={() => setIsCustomModalOpen(false)}
            />

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-monjez-border to-transparent" />
        </section>
    );
}

// Sub-component for card internals — keeps alignment consistent
function PricingCardInner({
    tier,
    features,
    isPopular,
    t,
}: {
    tier: { key: string; link: string; bookingType: string };
    features: string[];
    isPopular: boolean;
    t: any;
}) {
    return (
        <>
            {/* Popular badge */}
            {isPopular && (
                <div className="mb-6">
                    <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.65rem] font-semibold uppercase tracking-wider"
                        style={{
                            background: "rgba(217,119,6,0.12)",
                            color: "#F59E0B",
                            border: "1px solid rgba(217,119,6,0.25)",
                        }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-monjez-accent" />
                        {t("most_popular")}
                    </span>
                </div>
            )}

            {/* Tier name + price */}
            <div className="mb-6">
                <h3 className={cn("font-bold mb-2", isPopular ? "text-lg text-monjez-text" : "text-base text-monjez-text")}>
                    {t(`tiers.${tier.key}.name`)}
                </h3>
                <div className={cn("font-bold tabular-nums tracking-tight", isPopular ? "text-[2.25rem] text-monjez-text" : "text-2xl text-monjez-text")}>
                    {t(`tiers.${tier.key}.price`)}
                </div>
                <p className="text-monjez-muted text-sm mt-2 leading-relaxed">
                    {t(`tiers.${tier.key}.description`)}
                </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-monjez-border mb-6" />

            {/* Features */}
            <ul className="space-y-3 flex-1 mb-8">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-monjez-muted">
                        <Check
                            className="w-4 h-4 flex-shrink-0 mt-0.5"
                            style={{ color: isPopular ? "#D97706" : "#64645E" }}
                        />
                        {feature}
                    </li>
                ))}
            </ul>

            {/* CTA */}
            <Link
                href={tier.link}
                data-booking-type={tier.bookingType}
                className={cn(
                    "w-full py-3.5 rounded-xl font-semibold text-center flex items-center justify-center gap-2 text-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.98]",
                    isPopular
                        ? "bg-monjez-accent hover:bg-monjez-accent-warm text-[#080808] shadow-[0_4px_20px_rgba(217,119,6,0.25)]"
                        : "bg-white/5 hover:bg-white/8 text-monjez-text border border-monjez-border"
                )}
            >
                {t(`tiers.${tier.key}.cta`)}
                <ArrowRight className="w-4 h-4" />
            </Link>
        </>
    );
}

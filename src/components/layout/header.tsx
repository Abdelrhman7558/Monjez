"use client";

import { Link } from "@/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Header() {
    const t = useTranslations("nav");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: t("home"), href: "/" },
        { name: t("systems"), href: "/#systems" },
        { name: t("case_studies"), href: "/#case-studies" },
        { name: t("pricing"), href: "/#pricing" },
        { name: t("faq"), href: "/#faq" },
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Floating glass pill — detached from top edge */}
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-4">
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                        "relative flex items-center justify-between gap-6 px-4 py-2.5 rounded-full w-full max-w-[860px]",
                        "transition-all duration-500",
                        isScrolled
                            ? "bg-[#0E0E0E]/85 backdrop-blur-xl border border-white/[0.06] shadow-[0_4px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)]"
                            : "bg-transparent border border-transparent"
                    )}
                >
                    {/* Logo */}
                    <Link href="/" className="z-20 inline-flex items-center gap-2.5 group flex-shrink-0">
                        <div className="relative w-7 h-7 rounded-md overflow-hidden">
                            <Image
                                src="/logo.png"
                                alt="Monjez"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="text-[1.05rem] font-bold tracking-[-0.03em] text-monjez-text">
                            MONJEZ
                            <span className="text-monjez-accent">.</span>
                        </span>
                    </Link>

                    {/* Desktop nav — centered */}
                    <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-3.5 py-1.5 text-sm font-medium text-monjez-muted hover:text-monjez-text rounded-full hover:bg-white/[0.05] transition-all duration-200 whitespace-nowrap"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right — actions */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="hidden md:block">
                            <LanguageSwitcher />
                        </div>

                        {/* CTA — button-in-button */}
                        <Link
                            href="/#book-call"
                            className="hidden md:inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-monjez-accent hover:bg-monjez-accent-warm text-[#080808] text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-[0.97] group"
                        >
                            {t("book_call")}
                            <span className="w-6 h-6 rounded-full bg-[#080808]/15 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-[1px] transition-transform duration-200">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                                    <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                        </Link>

                        {/* Mobile toggle */}
                        <button
                            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-[5px] text-monjez-text"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            <motion.span
                                className="w-5 h-[1.5px] bg-current rounded-full block origin-center"
                                animate={isMobileMenuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            />
                            <motion.span
                                className="w-5 h-[1.5px] bg-current rounded-full block origin-center"
                                animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                                transition={{ duration: 0.2 }}
                            />
                            <motion.span
                                className="w-5 h-[1.5px] bg-current rounded-full block origin-center"
                                animate={isMobileMenuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            />
                        </button>
                    </div>
                </motion.div>
            </header>

            {/* Mobile menu — full screen overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-40 bg-[#080808]/95 backdrop-blur-2xl flex flex-col"
                    >
                        <div className="flex flex-col flex-1 justify-center px-8 gap-2">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.06 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <Link
                                        href={link.href}
                                        className="block text-2xl font-semibold text-monjez-text hover:text-monjez-accent py-3 transition-colors duration-200 border-b border-monjez-border"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                        <div className="px-8 pb-12 flex flex-col gap-4">
                            <LanguageSwitcher />
                            <Link
                                href="/#book-call"
                                className="w-full py-3.5 rounded-full bg-monjez-accent text-[#080808] font-bold text-center text-base"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {t("book_call")}
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

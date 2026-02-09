"use client";

import { Link } from "@/navigation"; // Use locale-aware Link
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useTranslations } from "next-intl";

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
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-monjez-dark/80 backdrop-blur-md border-b border-white/5 py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 relative flex items-center">
                {/* 1. Logo - Pushed to the start */}
                <div className="flex-1">
                    <Link href="/" className="text-2xl font-bold tracking-tighter text-white z-20 inline-block">
                        MONJEZ
                        <span className="text-monjez-accent text-3xl leading-none">.</span>
                    </Link>
                </div>

                {/* 2. Navigation (Desktop) - centered in the middle */}
                <nav className="hidden md:flex items-center gap-8 z-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors whitespace-nowrap"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* 3. Actions - Pushed to the end */}
                <div className="flex-1 flex justify-end items-center gap-4 z-20">
                    <div className="hidden md:block">
                        <LanguageSwitcher />
                    </div>

                    <Link
                        href="/#book-call"
                        className="hidden md:block bg-monjez-blue hover:bg-monjez-accent text-white hover:glow-text px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(29,40,139,0.3)] hover:shadow-[0_0_25px_rgba(59,79,228,0.5)]"
                    >
                        {t("book_call")}
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 bg-monjez-dark border-b border-white/10 p-6 md:hidden flex flex-col gap-6 shadow-2xl"
                    >
                        <div className="flex justify-end">
                            <LanguageSwitcher />
                        </div>
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-300 hover:text-white text-lg font-medium text-center"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/#book-call"
                            className="bg-monjez-blue text-white text-center py-3 rounded-xl font-semibold w-full"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {t("book_call")}
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function Footer() {
    const t = useTranslations("footer");
    const navT = useTranslations("nav");

    const socialLinks = [
        {
            href: "https://www.facebook.com/profile.php?id=61587799739627",
            label: "Facebook",
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
            ),
        },
        {
            href: "https://www.instagram.com/monjez41/",
            label: "Instagram",
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
            ),
        },
        {
            href: "https://www.linkedin.com/company/monjez1/",
            label: "LinkedIn",
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
            ),
        },
        {
            href: "mailto:support@monjez-agency.com",
            label: "Email",
            icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
            ),
        },
    ];

    return (
        <footer className="bg-monjez-dark border-t border-monjez-border py-14 md:py-20">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 mb-14">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
                            <div className="relative w-8 h-8">
                                <Image src="/logo.png" alt="Monjez" fill className="object-contain" />
                            </div>
                            <span className="text-[1.1rem] font-bold tracking-[-0.03em] text-monjez-text">
                                MONJEZ
                                <span className="text-monjez-accent">.</span>
                            </span>
                        </Link>

                        <p className="text-monjez-muted text-sm leading-relaxed max-w-[34ch] mb-8">
                            {t("description")}
                        </p>

                        <div className="flex gap-2">
                            {socialLinks.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target={s.href.startsWith("http") ? "_blank" : undefined}
                                    rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    aria-label={s.label}
                                    className="w-9 h-9 rounded-lg border border-monjez-border flex items-center justify-center text-monjez-muted hover:text-monjez-accent hover:border-monjez-accent/30 transition-all duration-200"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Company links */}
                    <div>
                        <h4 className="text-[0.8rem] font-semibold text-monjez-muted uppercase tracking-wider mb-5">
                            {t("company")}
                        </h4>
                        <ul className="space-y-3">
                            <li><Link href="#philosophy" className="text-sm text-monjez-muted hover:text-monjez-text transition-colors duration-150">{navT("philosophy")}</Link></li>
                            <li><Link href="#systems" className="text-sm text-monjez-muted hover:text-monjez-text transition-colors duration-150">{navT("systems")}</Link></li>
                            <li><Link href="#case-studies" className="text-sm text-monjez-muted hover:text-monjez-text transition-colors duration-150">{navT("case_studies")}</Link></li>
                            <li><Link href="/revenue-audit" className="text-sm text-monjez-muted hover:text-monjez-text transition-colors duration-150">{t("revenue_audit")}</Link></li>
                        </ul>
                    </div>

                    {/* Legal links */}
                    <div>
                        <h4 className="text-[0.8rem] font-semibold text-monjez-muted uppercase tracking-wider mb-5">
                            {t("legal")}
                        </h4>
                        <ul className="space-y-3">
                            <li><Link href="/privacy" className="text-sm text-monjez-muted hover:text-monjez-text transition-colors duration-150">{t("privacy")}</Link></li>
                            <li><Link href="/terms" className="text-sm text-monjez-muted hover:text-monjez-text transition-colors duration-150">{t("terms")}</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-monjez-border pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
                    <p className="text-monjez-muted text-xs">
                        &copy; 2025 Monjez AI Infrastructure. {t("rights")}
                    </p>
                    <p className="text-monjez-muted text-xs">
                        <a href="mailto:support@monjez-agency.com" className="hover:text-monjez-accent transition-colors duration-150">
                            support@monjez-agency.com
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

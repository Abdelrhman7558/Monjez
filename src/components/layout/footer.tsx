"use client";

import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export function Footer() {
    const t = useTranslations("footer");
    const navT = useTranslations("nav");

    return (
        <footer className="bg-monjez-dark border-t border-white/5 py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-white mb-4 block text-start">
                            MONJEZ
                            <span className="text-monjez-accent text-3xl leading-none">.</span>
                        </Link>
                        <p className="text-gray-400 max-w-sm mb-6 text-start">
                            {t("description")}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-start">{t("company")}</h4>
                        <ul className="space-y-2">
                            <li className="text-start"><Link href="#philosophy" className="text-gray-400 hover:text-white transition-colors">{navT("philosophy")}</Link></li>
                            <li className="text-start"><Link href="#systems" className="text-gray-400 hover:text-white transition-colors">{navT("systems")}</Link></li>
                            <li className="text-start"><Link href="#case-studies" className="text-gray-400 hover:text-white transition-colors">{navT("case_studies")}</Link></li>
                            <li className="text-start"><Link href="/revenue-audit" className="text-gray-400 hover:text-white transition-colors">{t("revenue_audit")}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-semibold mb-4 text-start">{t("legal")}</h4>
                        <ul className="space-y-2">
                            <li className="text-start"><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">{t("privacy")}</Link></li>
                            <li className="text-start"><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">{t("terms")}</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-center items-center gap-4">
                    <p className="text-gray-500 text-sm text-center">
                        © 2025 Monjez AI Infrastructure. {t("rights")}
                    </p>
                </div>
            </div>
        </footer>
    );
}

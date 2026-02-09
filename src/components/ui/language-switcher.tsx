"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { useTransition } from "react";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const toggleLanguage = () => {
        const nextLocale = locale === "en" ? "ar" : "en";
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <button
            onClick={toggleLanguage}
            disabled={isPending}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium text-gray-300 hover:text-white disabled:opacity-50"
            aria-label={locale === "en" ? "Switch to Arabic" : "Switch to English"}
        >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{locale === "en" ? "AR" : "EN"}</span>
        </button>
    );
}

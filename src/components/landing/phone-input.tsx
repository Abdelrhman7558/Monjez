"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type Country = { iso: string; name: string; ar: string; dial: string };

// GCC first, then the region and the countries visitors most often come from.
const COUNTRIES: Country[] = [
    { iso: "AE", name: "United Arab Emirates", ar: "الإمارات", dial: "+971" },
    { iso: "SA", name: "Saudi Arabia", ar: "السعودية", dial: "+966" },
    { iso: "QA", name: "Qatar", ar: "قطر", dial: "+974" },
    { iso: "KW", name: "Kuwait", ar: "الكويت", dial: "+965" },
    { iso: "BH", name: "Bahrain", ar: "البحرين", dial: "+973" },
    { iso: "OM", name: "Oman", ar: "عُمان", dial: "+968" },
    { iso: "EG", name: "Egypt", ar: "مصر", dial: "+20" },
    { iso: "JO", name: "Jordan", ar: "الأردن", dial: "+962" },
    { iso: "LB", name: "Lebanon", ar: "لبنان", dial: "+961" },
    { iso: "IQ", name: "Iraq", ar: "العراق", dial: "+964" },
    { iso: "SY", name: "Syria", ar: "سوريا", dial: "+963" },
    { iso: "PS", name: "Palestine", ar: "فلسطين", dial: "+970" },
    { iso: "YE", name: "Yemen", ar: "اليمن", dial: "+967" },
    { iso: "SD", name: "Sudan", ar: "السودان", dial: "+249" },
    { iso: "LY", name: "Libya", ar: "ليبيا", dial: "+218" },
    { iso: "TN", name: "Tunisia", ar: "تونس", dial: "+216" },
    { iso: "DZ", name: "Algeria", ar: "الجزائر", dial: "+213" },
    { iso: "MA", name: "Morocco", ar: "المغرب", dial: "+212" },
    { iso: "TR", name: "Turkey", ar: "تركيا", dial: "+90" },
    { iso: "IN", name: "India", ar: "الهند", dial: "+91" },
    { iso: "PK", name: "Pakistan", ar: "باكستان", dial: "+92" },
    { iso: "GB", name: "United Kingdom", ar: "المملكة المتحدة", dial: "+44" },
    { iso: "US", name: "United States", ar: "الولايات المتحدة", dial: "+1" },
    { iso: "CA", name: "Canada", ar: "كندا", dial: "+1" },
    { iso: "DE", name: "Germany", ar: "ألمانيا", dial: "+49" },
    { iso: "FR", name: "France", ar: "فرنسا", dial: "+33" },
    { iso: "AU", name: "Australia", ar: "أستراليا", dial: "+61" },
];

const flag = (iso: string) => String.fromCodePoint(...[...iso].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));

/** Country-code picker (searchable by name, ISO code like "EG", or dial code) + local number. Emits "+20 1220909391". */
export function PhoneInput({ id, onChange, onBlur, invalid, className, ar, searchLabel }: { id: string; onChange: (v: string) => void; onBlur: () => void; invalid?: boolean; className: string; ar: boolean; searchLabel: string }) {
    const [country, setCountry] = useState(COUNTRIES[0]);
    const [number, setNumber] = useState("");
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState("");
    const box = useRef<HTMLDivElement>(null);

    useEffect(() => {
        onChange(number.trim() ? `${country.dial} ${number.trim()}` : "");
    }, [country, number, onChange]);

    useEffect(() => {
        if (!open) return;
        const close = (e: MouseEvent) => !box.current?.contains(e.target as Node) && setOpen(false);
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, [open]);

    const list = useMemo(() => {
        const s = q.trim().toLowerCase().replace(/^\+/, "");
        if (!s) return COUNTRIES;
        const exact = COUNTRIES.filter((c) => c.iso.toLowerCase() === s);
        const rest = COUNTRIES.filter((c) => !exact.includes(c) && (c.name.toLowerCase().includes(s) || c.ar.includes(q.trim()) || c.dial.replace("+", "").startsWith(s) || c.iso.toLowerCase().startsWith(s)));
        return [...exact, ...rest];
    }, [q]);

    const pick = (c: Country) => {
        setCountry(c);
        setOpen(false);
        setQ("");
        document.getElementById(id)?.focus();
    };

    return (
        <div ref={box} className="relative flex gap-2" dir="ltr">
            <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
                className={cn(className, "flex w-auto shrink-0 items-center gap-1.5 px-3")}
            >
                <span aria-hidden>{flag(country.iso)}</span>
                <span className="text-[14.5px]">{country.dial}</span>
                <ChevronDown className="h-4 w-4 text-mj-muted" aria-hidden />
            </button>
            <input
                id={id}
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                placeholder="50 000 0000"
                aria-invalid={invalid}
                value={number}
                onChange={(e) => setNumber(e.target.value.replace(/[^\d\s()-]/g, ""))}
                onBlur={onBlur}
                className={cn(className, "min-w-0 flex-1")}
            />
            {open && (
                <div className="absolute start-0 top-full z-30 mt-2 w-[290px] overflow-hidden rounded-2xl border border-mj-line bg-white shadow-xl">
                    <div className="flex items-center gap-2 border-b border-mj-line px-3 py-2.5">
                        <Search className="h-4 w-4 text-mj-muted" aria-hidden />
                        <input
                            autoFocus
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    if (list[0]) pick(list[0]);
                                }
                                if (e.key === "Escape") setOpen(false);
                            }}
                            placeholder={searchLabel}
                            aria-label={searchLabel}
                            className="w-full bg-transparent text-[14px] outline-none"
                            dir={ar ? "rtl" : "ltr"}
                        />
                    </div>
                    <ul role="listbox" className="max-h-[260px] overflow-y-auto py-1" data-lenis-prevent>
                        {list.map((c) => (
                            <li key={c.iso} role="option" aria-selected={c.iso === country.iso}>
                                <button type="button" onClick={() => pick(c)} className={cn("flex w-full items-center gap-2.5 px-3 py-2 text-start text-[14px] hover:bg-mj-sand", c.iso === country.iso && "bg-mj-accent-soft")}>
                                    <span aria-hidden>{flag(c.iso)}</span>
                                    <span className="flex-1 truncate">{ar ? c.ar : c.name}</span>
                                    <span className="font-mono text-[12.5px] text-mj-muted">{c.dial}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

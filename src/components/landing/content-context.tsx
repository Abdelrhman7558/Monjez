"use client";

import { createContext, useContext, type ReactNode } from "react";
import { EN, type Content, type Locale } from "./content";
import { AR } from "./content-ar";

const DICTS: Record<Locale, Content> = { en: EN, ar: AR };
const Ctx = createContext<{ c: Content; locale: Locale }>({ c: EN, locale: "en" });

export function ContentProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
    return <Ctx.Provider value={{ c: DICTS[locale], locale }}>{children}</Ctx.Provider>;
}

export const useContent = () => useContext(Ctx).c;
export const useLocale = () => useContext(Ctx).locale;

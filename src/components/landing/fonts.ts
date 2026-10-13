import { IBM_Plex_Sans_Arabic, JetBrains_Mono, Space_Grotesk } from "next/font/google";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-display", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });
const arabic = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], variable: "--font-arabic", display: "swap" });

/** CSS variable classes for every landing route (home, system, resources). */
export const landingFontVars = `${display.variable} ${mono.variable} ${arabic.variable}`;

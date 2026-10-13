import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                monjez: {
                    blue: "#5B2C6F",
                    dark: "#0B0B0B",
                    accent: "#9B59B6",
                    highlight: "#1E90FF",
                },
                // Contractor landing palette — derived from the supplied logo (ink + violet dot on cream)
                mj: {
                    cream: "#F5F2EC",
                    sand: "#EDE8DF",
                    line: "#E2DBCF",
                    ink: "#171F2E",
                    body: "#3B4254",
                    muted: "#6A7080",
                    accent: "#4D3B9B",
                    "accent-deep": "#3C2E7D",
                    "accent-soft": "#EEEAF8",
                    "accent-line": "#CFC6EC",
                    flag: "#B5532A",
                    "flag-soft": "#F8EBE3",
                    ok: "#2F6B4F",
                    "ok-soft": "#E6F1EA",
                },
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
                display: ["var(--font-display)", "var(--font-inter)", ...defaultTheme.fontFamily.sans],
                mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-out forwards",
                "slide-up": "slideUp 0.5s ease-out forwards",
                "glow": "glow 2s ease-in-out infinite alternate",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "marquee-vertical": "marquee-vertical 30s linear infinite",
                "marquee-horizontal": "marquee-horizontal 30s linear infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                glow: {
                    "0%": { boxShadow: "0 0 5px #5B2C6F" },
                    "100%": { boxShadow: "0 0 20px #1E90FF" },
                },
                "marquee-vertical": {
                    from: { transform: "translateY(0)" },
                    to: { transform: "translateY(-50%)" },
                },
                "marquee-horizontal": {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(-50%)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;

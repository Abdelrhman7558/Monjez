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
                    // Near-OLED dark — premium dark mode base
                    dark: "#080808",
                    surface: "#101010",
                    card: "#141414",
                    border: "#1E1E1E",
                    // Warm amber accent — unexpected, premium, not AI purple/blue
                    accent: "#D97706",
                    "accent-warm": "#F59E0B",
                    "accent-dim": "rgba(217,119,6,0.12)",
                    // Text scale
                    text: "#EDEDEC",
                    muted: "#64645E",
                    // Backward compat (mapped to neutral surface — no more AI colors)
                    blue: "#141414",
                    purple: "#141414",
                    highlight: "#F59E0B",
                },
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                sans: ["var(--font-outfit)", ...defaultTheme.fontFamily.sans],
                mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
            },
            animation: {
                "fade-in": "fadeIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards",
                "slide-up": "slideUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
                "fade-up": "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
                "glow-amber": "glowAmber 3s ease-in-out infinite alternate",
                "glow": "glowAmber 3s ease-in-out infinite alternate",
                "pulse-slow": "pulse 5s cubic-bezier(0.4,0,0.6,1) infinite",
                "marquee-vertical": "marquee-vertical 30s linear infinite",
                "marquee-horizontal": "marquee-horizontal 30s linear infinite",
                "shimmer": "shimmer 2.4s linear infinite",
                "float": "float 6s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(24px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(16px)", filter: "blur(4px)" },
                    "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0px)" },
                },
                glowAmber: {
                    "0%": { boxShadow: "0 0 8px rgba(217,119,6,0.25)" },
                    "100%": { boxShadow: "0 0 28px rgba(245,158,11,0.45)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-8px)" },
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
            transitionTimingFunction: {
                "spring": "cubic-bezier(0.32,0.72,0,1)",
                "premium": "cubic-bezier(0.16,1,0.3,1)",
                "out-expo": "cubic-bezier(0.19,1,0.22,1)",
            },
        },
    },
    plugins: [],
};
export default config;

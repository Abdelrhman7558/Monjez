"use client";

import { useRef, useEffect } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame
} from "framer-motion";

// Utility to wrap a number between a min and max range
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};
import {
    Database,
    Globe,
    Server,
    ShoppingCart,
    CreditCard,
    Box,
    Cpu,
    Zap,
    Activity
} from "lucide-react";

interface ParallaxProps {
    children: React.ReactNode;
    baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    /**
     * This is a magic wrapping for the length of the text - you
     * have to replace for wrapping that works for you or dynamically
     * calculate
     */
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        /**
         * This is what changes the direction of the scroll once we
         * switch scrolling directions.
         */
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    /**
     * The number of times to repeat the child text should be dynamic based on the size of the text and viewport.
     * For the demo, we will repeat it enough times to ensure it wraps.
     */
    return (
        <div className="flex whitespace-nowrap flex-nowrap overflow-visible py-4">
            <motion.div className="flex whitespace-nowrap flex-nowrap gap-10 md:gap-20" style={{ x }}>
                {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="flex whitespace-nowrap flex-nowrap gap-10 md:gap-20">
                        {children}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

const platforms = [
    { name: "OpenAI", icon: Cpu },
    { name: "Meta Ads", icon: Activity },
    { name: "Google Cloud", icon: Globe },
    { name: "Shopify", icon: ShoppingCart },
    { name: "Stripe", icon: CreditCard },
    { name: "Supabase", icon: Database },
    { name: "AWS", icon: Server },
    { name: "Make.com", icon: Zap },
    { name: "HubSpot", icon: Box },
];

export function PlatformTicker() {
    return (
        <section className="h-[152px] mt-[127px] flex content-center items-center justify-center flex-nowrap bg-[#0B0B0B] relative overflow-hidden z-10 border-y border-white/5" suppressHydrationWarning>
            {/* Gradient Overlays for Smooth Fade */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0B0B0B] to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0B0B0B] to-transparent z-20 pointer-events-none" />

            {/* Background Glow Effect */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-monjez-accent/10 via-transparent to-transparent" />

            <div className="relative z-10">
                <ParallaxText baseVelocity={-1.5}>
                    {platforms.map((platform, i) => (
                        <div
                            key={i}
                            className="relative flex items-center gap-4 px-6 md:px-8 py-4 mx-2 md:mx-4 group transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:z-50 cursor-pointer"
                        >
                            {/* Hover Glow Background */}
                            <div className="absolute inset-0 bg-monjez-accent/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                            {/* Icon with Neon Glow on Hover */}
                            <div className="relative p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:bg-monjez-accent/20 group-hover:border-monjez-accent/50 group-hover:shadow-[0_0_20px_rgba(155,89,182,0.6)] transition-all duration-300 z-10">
                                <platform.icon className="w-6 h-6 md:w-8 md:h-8 text-monjez-accent group-hover:text-white transition-colors duration-300" />
                            </div>

                            {/* Platform Name */}
                            <span className="relative text-lg md:text-xl font-medium text-gray-400 group-hover:text-white tracking-wide transition-colors duration-300 z-10">
                                {platform.name}
                            </span>
                        </div>
                    ))}
                </ParallaxText>
            </div>
        </section>
    );
}

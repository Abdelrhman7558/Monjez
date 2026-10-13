"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const LANDING = /^\/(en|ar)?\/?$|^\/(en|ar)\/(system|resources)(\/.*)?$/;

export default function Template({ children }: { children: React.ReactNode }) {
    // The contractor landing renders immediately: a server-rendered opacity:0 wrapper would hide the hero until hydration.
    const pathname = usePathname();
    if (LANDING.test(pathname || "/")) return <>{children}</>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            {children}
        </motion.div>
    );
}

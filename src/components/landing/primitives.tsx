"use client";

import { useCallback, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "./content-context";

export const NAV_OFFSET = 96;

/** Smooth-scrolls to a section id, using Lenis when it is running and native scrolling otherwise. */
export function useScrollTo() {
    const lenis = useLenis();
    return useCallback(
        (id: string) => {
            const el = document.getElementById(id);
            if (!el) return;
            if (lenis) {
                lenis.scrollTo(el, { offset: -NAV_OFFSET + 8 });
            } else {
                const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET + 8;
                window.scrollTo({ top, behavior: "smooth" });
            }
            history.replaceState(null, "", `#${id}`);
        },
        [lenis]
    );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
    return <div className={cn("mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Section({
    id,
    children,
    className,
    tone = "cream",
}: {
    id?: string;
    children: ReactNode;
    className?: string;
    tone?: "cream" | "sand" | "white" | "ink";
}) {
    const tones = {
        cream: "bg-mj-cream",
        sand: "bg-mj-sand",
        white: "bg-white",
        ink: "bg-mj-ink text-white",
    } as const;
    return (
        <section id={id} className={cn("relative scroll-mt-24 py-16 sm:py-20 lg:py-24", tones[tone], className)}>
            {children}
        </section>
    );
}

export function Eyebrow({ children, className, light }: { children: ReactNode; className?: string; light?: boolean }) {
    return (
        <p
            className={cn(
                "font-mono text-[11.5px] font-medium uppercase tracking-[0.18em]",
                light ? "text-mj-accent-line" : "text-mj-accent",
                className
            )}
        >
            {children}
        </p>
    );
}

export function SectionHead({
    eyebrow,
    title,
    accent,
    sub,
    align = "center",
    light,
    className,
}: {
    eyebrow: string;
    title: string;
    accent?: string;
    sub?: string;
    align?: "center" | "left";
    light?: boolean;
    className?: string;
}) {
    return (
        <Reveal className={cn(align === "center" ? "mx-auto max-w-[760px] text-center" : "max-w-[720px]", className)}>
            <Eyebrow light={light}>{eyebrow}</Eyebrow>
            <h2
                className={cn(
                    "mt-3.5 text-balance font-display text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] sm:text-[34px] lg:text-[40px]",
                    light ? "text-white" : "text-mj-ink"
                )}
            >
                {title}
                {accent && (
                    <>
                        {" "}
                        <span className={light ? "text-mj-accent-line" : "text-mj-accent"}>{accent}</span>
                    </>
                )}
            </h2>
            {sub && (
                <p
                    className={cn(
                        "mt-4 text-pretty text-[15.5px] leading-[1.65] sm:text-[16.5px]",
                        align === "center" && "mx-auto max-w-[640px]",
                        light ? "text-white/70" : "text-mj-body"
                    )}
                >
                    {sub}
                </p>
            )}
        </Reveal>
    );
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
    const reduce = useReducedMotion();
    if (reduce) return <div className={className}>{children}</div>;
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
        >
            {children}
        </motion.div>
    );
}

type ButtonProps = {
    children: ReactNode;
    variant?: "primary" | "secondary" | "ghost" | "light";
    size?: "md" | "lg";
    arrow?: boolean;
    className?: string;
    href?: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
    type?: "button" | "submit";
    disabled?: boolean;
    external?: boolean;
};

export function Button({
    children,
    variant = "primary",
    size = "md",
    arrow,
    className,
    href,
    onClick,
    type = "button",
    disabled,
    external,
}: ButtonProps) {
    const base =
        "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-[background-color,color,border-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mj-accent focus-visible:ring-offset-2 focus-visible:ring-offset-mj-cream disabled:cursor-not-allowed disabled:opacity-60";
    const sizes = { md: "h-11 px-5 text-[14.5px]", lg: "h-[52px] px-6 text-[15.5px]" } as const;
    const variants = {
        primary: "bg-mj-ink text-white hover:bg-mj-accent shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_8px_20px_-10px_rgba(23,31,46,0.55)]",
        secondary: "border border-mj-line bg-white text-mj-ink hover:border-mj-ink/40",
        ghost: "text-mj-ink underline decoration-mj-line underline-offset-[6px] hover:decoration-mj-accent px-1",
        light: "bg-white text-mj-ink hover:bg-mj-accent-soft",
    } as const;
    const cls = cn(base, variant !== "ghost" && sizes[size], variant === "ghost" && "h-11 text-[14.5px]", variants[variant], className);
    const content = (
        <>
            {children}
            {arrow && <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />}
        </>
    );
    if (href) {
        return (
            <a
                href={href}
                className={cls}
                onClick={onClick}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
                {content}
            </a>
        );
    }
    return (
        <button type={type} className={cls} onClick={onClick} disabled={disabled}>
            {content}
        </button>
    );
}

/**
 * Link to a home-page section. On the home page it smooth-scrolls; on other pages (system, resources)
 * the target isn't in the DOM, so the browser follows the href to /{locale}#id. Works without JS.
 */
export function ScrollLink({
    to,
    children,
    className,
    onNavigate,
    ...rest
}: {
    to: string;
    children: ReactNode;
    className?: string;
    onNavigate?: () => void;
} & Omit<ButtonProps, "href" | "onClick" | "children">) {
    const scrollTo = useScrollTo();
    const locale = useLocale();
    const href = `/${locale}#${to}`;
    const handle = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        onNavigate?.();
        if (!document.getElementById(to)) return; // let the browser navigate to the home page
        e.preventDefault();
        scrollTo(to);
    };
    if (rest.variant || rest.arrow || rest.size) {
        return (
            <Button href={href} onClick={handle} className={className} {...rest}>
                {children}
            </Button>
        );
    }
    return (
        <a href={href} onClick={handle} className={className}>
            {children}
        </a>
    );
}

/** Small window frame used around product mock-ups. */
export function WindowFrame({ label, children, className, right, dir }: { label: string; children: ReactNode; className?: string; right?: ReactNode; dir?: "ltr" | "rtl" }) {
    return (
        <div dir={dir} className={cn("overflow-hidden rounded-2xl border border-mj-line bg-white shadow-[0_30px_60px_-30px_rgba(23,31,46,0.25)]", className)}>
            <div className="flex items-center gap-3 border-b border-mj-line bg-mj-cream/60 px-4 py-2.5">
                <span className="flex gap-1.5" aria-hidden>
                    <span className="h-2.5 w-2.5 rounded-full bg-mj-line" />
                    <span className="h-2.5 w-2.5 rounded-full bg-mj-line" />
                    <span className="h-2.5 w-2.5 rounded-full bg-mj-line" />
                </span>
                <span className="truncate font-mono text-[11.5px] text-mj-muted">{label}</span>
                {right && <span className="ms-auto shrink-0">{right}</span>}
            </div>
            {children}
        </div>
    );
}

export function Chip({ children, tone = "neutral", className }: { children: ReactNode; tone?: "neutral" | "accent" | "flag" | "ok"; className?: string }) {
    const tones = {
        neutral: "border-mj-line bg-mj-cream text-mj-body",
        accent: "border-mj-accent-line bg-mj-accent-soft text-mj-accent-deep",
        flag: "border-[#EBCBB8] bg-mj-flag-soft text-mj-flag",
        ok: "border-[#C3DDCD] bg-mj-ok-soft text-mj-ok",
    } as const;
    return (
        <span className={cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11.5px] font-medium leading-5", tones[tone], className)}>
            {children}
        </span>
    );
}

/** Hero backdrop: full-width soft grid inside a dashed frame with solid corner brackets (all page heroes). */
export function HeroFrame() {
    return (
        <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(to_right,#E7E1D6_1px,transparent_1px),linear-gradient(to_bottom,#E7E1D6_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black_55%,transparent)]" />
            <div className="absolute inset-x-3 bottom-0 top-[84px] border-x border-t border-dashed border-mj-accent-line [mask-image:linear-gradient(to_bottom,black_60%,transparent)] sm:inset-x-6">
                <span className="absolute -start-px -top-px h-8 w-8 border-s-2 border-t-2 border-mj-accent" />
                <span className="absolute -end-px -top-px h-8 w-8 border-e-2 border-t-2 border-mj-accent" />
            </div>
        </div>
    );
}

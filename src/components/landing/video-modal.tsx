"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useContent } from "./content-context";

/** Accessible modal that only mounts the embed iframe while open. */
export function VideoModal({ src, title, onClose }: { src: string | null; title: string; onClose: () => void }) {
    const closeRef = useRef<HTMLButtonElement>(null);
    const { UI } = useContent();

    useEffect(() => {
        if (!src) return;
        const prev = document.activeElement as HTMLElement | null;
        closeRef.current?.focus();
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        const overflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = overflow;
            prev?.focus();
        };
    }, [src, onClose]);

    if (!src) return null;
    const url = src + (src.includes("?") ? "&" : "?") + "autoplay=1";

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-mj-ink/80 p-4 backdrop-blur-sm"
            onClick={onClose}
            data-lenis-prevent
        >
            <div className="relative w-full max-w-[1040px]" onClick={(e) => e.stopPropagation()}>
                <button
                    ref={closeRef}
                    type="button"
                    onClick={onClose}
                    aria-label={UI.video.close}
                    className="absolute -top-12 end-0 flex h-10 w-10 items-center justify-center rounded-full bg-white text-mj-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mj-accent-line"
                >
                    <X className="h-5 w-5" />
                </button>
                <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
                    <iframe src={url} title={title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen className="h-full w-full border-0" />
                </div>
            </div>
        </div>
    );
}

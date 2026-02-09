"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, BarChart3, Layers, Zap, TrendingUp, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ProjectType } from "./project-card";
import { useTranslations } from "next-intl";

interface ProjectModalProps {
    project: ProjectType | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const t = useTranslations(project ? `projects.${project.slug}` : "common");
    const commonT = useTranslations("common");

    // Handling body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            document.documentElement.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
            document.documentElement.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!project) return null;

    const isSlideshowProject = project.client === "The Ad Agent" || project.client === "Paynest" || project.client === "LinkedIn Agent";
    const marqueeImages = [project.coverImage, ...(project.gallery || [])];
    const marqueeContent = isSlideshowProject
        ? marqueeImages
        : [...marqueeImages, ...marqueeImages, ...marqueeImages];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl touch-none"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0 }}
                        className="fixed inset-0 z-[61] flex items-center justify-center p-0 md:p-4 pointer-events-none"
                    >
                        <div className="bg-monjez-dark w-full h-full max-w-[95vw] md:max-w-[85vw] max-h-[90vh] rounded-3xl overflow-hidden flex flex-col lg:flex-row pointer-events-auto shadow-2xl relative border border-white/10">

                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-monjez-highlight hover:text-black transition-all border border-white/10"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* LEFT PANEL: Image Marquee */}
                            <div className={`w-full lg:w-5/12 h-64 lg:h-full relative overflow-hidden bg-black/20 border-b lg:border-b-0 lg:border-r border-white/10 order-2 lg:order-1 select-none ${isSlideshowProject ? 'pointer-events-auto' : 'pointer-events-none'}`}>
                                <div className="absolute inset-0 overflow-hidden">
                                    <MarqueeContent images={marqueeContent} isSlideshowProject={isSlideshowProject} />
                                </div>

                                {!isSlideshowProject && (
                                    <>
                                        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-monjez-dark to-transparent z-10 hidden lg:block" />
                                        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-monjez-dark to-transparent z-10 hidden lg:block" />
                                        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-monjez-dark to-transparent z-10 lg:hidden" />
                                        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-monjez-dark to-transparent z-10 lg:hidden" />
                                    </>
                                )}
                            </div>

                            {/* RIGHT PANEL: Content */}
                            <div
                                className="w-full lg:w-7/12 h-full overflow-y-auto custom-scrollbar bg-gradient-to-br from-monjez-dark to-black p-8 md:p-12 order-1 lg:order-2 overscroll-contain"
                                onWheel={(e) => e.stopPropagation()}
                            >
                                <div className="max-w-2xl mx-auto space-y-12 pb-20">

                                    {/* Header */}
                                    <div>
                                        <div className="text-monjez-highlight font-bold tracking-wider uppercase text-sm mb-4">{project.client}</div>
                                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight text-start">{t("title")}</h2>
                                        <p className="text-lg text-gray-300 leading-relaxed font-light text-start">{t("description")}</p>

                                        {project.projectUrl && (
                                            <div className="mt-8 flex justify-start">
                                                <a
                                                    href={project.projectUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-monjez-highlight hover:text-black transition-all shadow-lg hover:shadow-monjez-highlight/20"
                                                >
                                                    {commonT("show_project")}
                                                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-4 md:gap-8 py-8 border-y border-white/10">
                                        {project.resultsKeys?.map((stat, i) => (
                                            <div key={i} className="text-center">
                                                <div className="text-2xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                                                <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">{t(`results.${stat.labelKey}`)}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Sections */}
                                    <div className="space-y-12">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-monjez-highlight">
                                                <Zap className="w-5 h-5" />
                                                <h3 className="text-xl font-bold uppercase tracking-widest">{t("challenge_title")}</h3>
                                            </div>
                                            <p className="text-gray-300 leading-relaxed whitespace-pre-line text-start">{t("challenge")}</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-monjez-highlight">
                                                <Layers className="w-5 h-5" />
                                                <h3 className="text-xl font-bold uppercase tracking-widest">{t("strategy_title")}</h3>
                                            </div>
                                            <p className="text-gray-300 leading-relaxed whitespace-pre-line text-start">{t("strategy")}</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-monjez-highlight">
                                                <BarChart3 className="w-5 h-5" />
                                                <h3 className="text-xl font-bold uppercase tracking-widest">{t("execution_title")}</h3>
                                            </div>
                                            <p className="text-gray-300 leading-relaxed whitespace-pre-line text-start">{t("execution")}</p>
                                        </div>

                                        {t.has("outcome") && (
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3 text-monjez-highlight">
                                                    <TrendingUp className="w-5 h-5" />
                                                    <h3 className="text-xl font-bold uppercase tracking-widest">{t("outcome_title")}</h3>
                                                </div>
                                                <p className="text-gray-300 leading-relaxed whitespace-pre-line text-start">{t("outcome")}</p>
                                            </div>
                                        )}
                                    </div>

                                    {t.has("finalNote") && (
                                        <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
                                            <p className="text-white text-lg italic font-light leading-relaxed whitespace-pre-line text-start">"{t("finalNote")}"</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function AdAgentCarousel({ images }: { images: string[] }) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [paused, images.length]);

    const navigate = (direction: 'next' | 'prev') => {
        if (direction === 'next') {
            setIndex((prev) => (prev + 1) % images.length);
        } else {
            setIndex((prev) => (prev - 1 + images.length) % images.length);
        }
    };

    return (
        <div
            className="w-full h-full relative group overflow-hidden bg-black/40"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
        >
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={index}
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "-100%", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
                >
                    <div className="relative w-full h-full max-w-full max-h-full">
                        <Image
                            src={images[index]}
                            alt={`Slide ${index}`}
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <button
                    onClick={(e) => { e.stopPropagation(); navigate('prev'); }}
                    className="p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-monjez-highlight hover:text-black transition-colors pointer-events-auto rtl:rotate-180"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); navigate('next'); }}
                    className="p-2 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-monjez-highlight hover:text-black transition-colors pointer-events-auto rtl:rotate-180"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-auto">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); setIndex(i); }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-monjez-highlight' : 'bg-white/30 hover:bg-white'}`}
                    />
                ))}
            </div>
        </div>
    );
}

function MarqueeContent({ images, isSlideshowProject }: { images: string[], isSlideshowProject?: boolean }) {
    if (isSlideshowProject) {
        return <AdAgentCarousel images={images} />;
    }

    return (
        <div className="w-full h-full flex flex-row lg:flex-col">
            <div className="flex flex-row lg:flex-col gap-4 lg:gap-6 min-w-full lg:min-h-full p-4 animate-marquee-horizontal lg:animate-marquee-vertical will-change-transform">
                {images.map((img, i) => (
                    <div key={i} className="relative flex-shrink-0 w-[80vw] md:w-96 lg:w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-white/10 bg-monjez-dark">
                        <Image
                            src={img}
                            alt={`Gallery ${i}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 80vw, 50vw"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

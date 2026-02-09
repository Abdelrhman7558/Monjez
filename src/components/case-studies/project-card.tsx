"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export interface ProjectType {
    id: string;
    slug: string;
    client: string;
    coverImage: string;
    gallery: string[];
    projectUrl?: string;
    resultsKeys?: { labelKey: string; value: string }[];
}

interface ProjectCardProps {
    project: ProjectType;
    onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
    const t = useTranslations(`projects.${project.slug}`);
    const commonT = useTranslations("common");

    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="group relative h-[400px] w-full min-w-[300px] rounded-3xl overflow-hidden cursor-pointer bg-monjez-dark border border-white/5 shadow-2xl"
            onClick={onClick}
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={project.coverImage}
                    alt={t("title")}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
                    suppressHydrationWarning
                />
                <div className="absolute inset-0 bg-gradient-to-t from-monjez-dark via-monjez-dark/50 to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="space-y-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="inline-flex px-3 py-1 rounded-full bg-monjez-blue/30 border border-monjez-blue/50 text-monjez-highlight text-xs font-bold tracking-wider uppercase backdrop-blur-md">
                        {project.client}
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-monjez-highlight transition-colors">
                            {t("title")}
                        </h3>
                        <p className="text-gray-300 line-clamp-2 text-sm">
                            {t("tagline")}
                        </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <span className="text-white font-medium text-sm">{commonT("show_project")}</span>
                        <div className="w-8 h-8 rounded-full bg-monjez-highlight text-black flex items-center justify-center rtl:rotate-180">
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

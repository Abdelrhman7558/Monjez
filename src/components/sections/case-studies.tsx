"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { ProjectCard, ProjectType } from "../case-studies/project-card";
import { ProjectModal } from "../case-studies/project-modal";
import { projects } from "@/data/projects";
import { useTranslations } from "next-intl";

export function CaseStudies() {
    const t = useTranslations("case_studies");
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

    return (
        <section id="case-studies" className="py-24 md:py-32 bg-monjez-dark relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none opacity-20" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <span className="text-monjez-highlight text-sm font-bold tracking-widest uppercase mb-4 block">
                        {t("badge")}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        {t("title")}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-monjez-highlight to-monjez-accent">
                            {t("title_accent")}
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {projects.slice(0, 3).map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project as any}
                            onClick={() => setSelectedProject(project as any)}
                        />
                    ))}
                </div>

                {/* See More CTA - Only show if more than 3 projects */}
                {projects.length > 3 && (
                    <div className="flex justify-center">
                        <a
                            href="/case-studies"
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-monjez-accent/10 border border-monjez-accent/30 rounded-full text-white font-semibold hover:bg-monjez-accent hover:border-monjez-accent transition-all duration-300 hover:shadow-[0_0_20px_rgba(30,144,255,0.4)]"
                        >
                            {t("see_more")}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                        </a>
                    </div>
                )}
            </div>

            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
}

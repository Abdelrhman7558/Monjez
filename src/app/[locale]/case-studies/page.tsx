"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProjectCard, ProjectType } from "@/components/case-studies/project-card";
import { ProjectModal } from "@/components/case-studies/project-modal";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";

export default function CaseStudiesPage() {
    const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

    return (
        <main className="min-h-screen bg-monjez-dark relative selection:bg-monjez-accent selection:text-white">
            <Header />

            <section className="pt-32 pb-20 relative">
                {/* Background Texture */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none opacity-20" />

                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-monjez-highlight to-monjez-accent">Work</span>
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                            We don't just build demos. We deploy production-grade AI infrastructure that drives real ROI.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ProjectCard
                                    project={project}
                                    onClick={() => setSelectedProject(project)}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <ProjectModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />

            <Footer />
        </main>
    );
}

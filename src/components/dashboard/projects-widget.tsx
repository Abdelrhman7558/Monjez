"use client";

import { motion } from "framer-motion";
import { Folder, Clock, CheckCircle } from "lucide-react";

const projects = [
    { name: "Alpha Protocol", status: "In Progress", progress: 65, deadline: "2 Days" },
    { name: "Beta System", status: "Review", progress: 90, deadline: "Today" },
    { name: "Gamma Core", status: "Done", progress: 100, deadline: "Completed" },
];

export default function ProjectsWidget() {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Folder className="w-5 h-5 text-blue-500" /> Active Projects
                </h3>
            </div>
            <div className="space-y-4">
                {projects.map((project, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-black/20">
                        <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${project.progress === 100 ? "bg-green-500" : "bg-blue-500"}`} />
                            <div>
                                <div className="text-white font-medium text-sm">{project.name}</div>
                                <div className="text-xs text-gray-400">{project.status}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-white text-sm font-bold">{project.progress}%</div>
                            <div className="text-xs text-gray-500">{project.deadline}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

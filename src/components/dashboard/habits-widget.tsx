"use client";

import { Check } from "lucide-react";

const habits = [
    "Deep Work (4h)",
    "Meditation (20m)",
    "Reading (30p)",
    "Workout",
    "Zero Inbox"
];

export default function HabitsWidget() {
    return (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
            <h3 className="text-lg font-bold text-white mb-6">Daily Protocol</h3>
            <div className="space-y-3">
                {habits.map((habit, i) => (
                    <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors">
                        <span className="text-gray-300 group-hover:text-white text-sm">{habit}</span>
                        <div className="w-5 h-5 rounded border border-gray-600 flex items-center justify-center group-hover:border-monjez-accent">
                            {/* Placeholder for interactive check */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

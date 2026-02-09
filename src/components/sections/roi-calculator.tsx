"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";

export function ROICalculator() {
    const [employees, setEmployees] = useState(5);
    const [avgSalary, setAvgSalary] = useState(60000);
    const [automationPotential, setAutomationPotential] = useState(30);

    const annualSavings = (employees * avgSalary * (automationPotential / 100)).toLocaleString();

    return (
        <section id="roi" className="py-24 bg-monjez-dark border-t border-white/5 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                        Calculate Your Automation ROI
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        See how much revenue you're leaking to inefficiency.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
                    <div className="grid md:grid-cols-2 gap-12 items-center">

                        <div className="space-y-8">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Team Size (Operational)</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="50"
                                    value={employees}
                                    onChange={(e) => setEmployees(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-monjez-accent"
                                />
                                <div className="text-right text-white font-bold mt-1">{employees} Employees</div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Avg. Annual Salary ($)</label>
                                <input
                                    type="range"
                                    min="30000"
                                    max="150000"
                                    step="5000"
                                    value={avgSalary}
                                    onChange={(e) => setAvgSalary(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-monjez-accent"
                                />
                                <div className="text-right text-white font-bold mt-1">${avgSalary.toLocaleString()}</div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Estimated Automation Potential (%)</label>
                                <input
                                    type="range"
                                    min="10"
                                    max="80"
                                    value={automationPotential}
                                    onChange={(e) => setAutomationPotential(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-monjez-accent"
                                />
                                <div className="text-right text-white font-bold mt-1">{automationPotential}%</div>
                            </div>
                        </div>

                        <div className="bg-monjez-blue/10 border border-monjez-blue/20 rounded-2xl p-8 text-center relative group">
                            <div className="absolute inset-0 bg-monjez-accent/5 rounded-2xl animate-pulse group-hover:bg-monjez-accent/10 transition-colors" />
                            <Calculator className="w-12 h-12 text-monjez-accent mx-auto mb-4" />
                            <div className="text-sm text-gray-400 uppercase tracking-widest mb-2 font-semibold">Potential Annual Savings</div>
                            <div className="text-4xl md:text-5xl font-bold text-white tracking-tight glow-text">
                                ${annualSavings}
                            </div>
                            <p className="text-xs text-gray-500 mt-4">
                                *Based on industry operational benchmarks.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

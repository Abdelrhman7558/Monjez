"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Bot, ArrowRight, Filter, Search, Zap, Database, FileText } from "lucide-react";
import { PlanDetail, PlanModal } from "@/components/investment/plan-modal";

// Dummy Workflow Data
const workflows: PlanDetail[] = [
    {
        id: "wf-financial",
        type: "workflow",
        title: "Financial Reconciliation",
        price: "$1,200",
        description: "Auto-syncs Stripe/PayPal/Bank data with Xero or Quickbooks. Uses GPT-4 to categorize expenses with 99% accuracy.",
        features: ["Multi-gateway sync", "Smart Categorization", "Fraud Alerts"],
        steps: [
            { title: "Connect", description: "Link payment gateways and accounting software securely.", icon: Zap },
            { title: "Analyze", description: "AI scans transactions and categorizes based on history.", icon: Database },
            { title: "Reconcile", description: "Matches invoices to payments and flags discrepancies.", icon: FileText }
        ],
        images: ["https://images.unsplash.com/photo-1554224155-6726b3ff858f"]
    },
    {
        id: "wf-content",
        type: "workflow",
        title: "Content Marketing Engine",
        price: "$850",
        description: "End-to-end content pipeline. Scrapes trends, generates drafts (Blog/LinkedIn/Twitter), and schedules posts.",
        features: ["Trend Scraping", "Multi-format Gen", "Auto-Scheduling"],
        steps: [
            { title: "Research", description: "Scrapes Reddit/Twitter for trending topics in your niche.", icon: Search },
            { title: "Draft", description: "Generates high-quality drafts customized to your brand voice.", icon: Bot },
            { title: "Publish", description: "One-click scheduling to all connected social accounts.", icon: Zap }
        ],
        images: ["https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a"]
    },
    {
        id: "wf-lead-qual",
        type: "workflow",
        title: "Lead Qualification Agent",
        price: "$950",
        description: "AI Voice/Chat agent that engages inbound leads, qualifies them based on BANT, and books meetings for sales reps.",
        features: ["24/7 Response", "CRM Sync", "Calendar Booking"],
        steps: [
            { title: "Engage", description: "Responds instantly to form fills or chat inquiries.", icon: Bot },
            { title: "Qualify", description: "Asks pre-set qualifying questions to determine fit.", icon: Search },
            { title: "Handover", description: "Books a meeting or notifies a sales rep for hot leads.", icon: ArrowRight }
        ],
        images: ["https://images.unsplash.com/photo-1516321318423-f06f85e504b3"]
    },
    {
        id: "wf-data-enrich",
        type: "workflow",
        title: "B2B Data Enrichment",
        price: "$600",
        description: "Automatically enriches new CRM contacts with LinkedIn data, company revenue, and tech stack info.",
        features: ["LinkedIn Scraping", "Email Finding", "Tech Stack Detection"],
        steps: [
            { title: "Detect", description: "Listens for new contact creation in your CRM.", icon: Search },
            { title: "Enrich", description: "Pull data from Clearbit, LinkedIn, and Apollo.", icon: Database },
            { title: "Update", description: "Updates the CRM record with verified fields.", icon: Zap }
        ],
        images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f"]
    }
];

export default function WorkflowsPage() {
    const [selectedWorkflow, setSelectedWorkflow] = useState<PlanDetail | null>(null);
    const [filter, setFilter] = useState("All");

    const categories = ["All", "Finance", "Marketing", "Sales", "Operations"];

    return (
        <main className="min-h-screen bg-monjez-dark flex flex-col">
            <Header />

            <section className="pt-32 pb-16 px-4 md:px-6 container mx-auto flex-1">
                {/* specialized header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-monjez-purple/10 border border-monjez-purple/20 text-monjez-purple text-xs font-bold uppercase tracking-wider mb-4">
                        <Bot className="w-4 h-4" /> Workflow Library
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Premade AI Automations
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Deploy battle-tested automated workflows instantly. No dev time required.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex justify-center gap-2 mb-12 flex-wrap">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                                    ? "bg-monjez-blue text-white shadow-lg shadow-monjez-blue/25"
                                    : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workflows.map((wf, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="group relative p-6 rounded-2xl bg-[#0F0F13] border border-white/10 hover:border-monjez-blue/50 hover:bg-white/[0.07] transition-all cursor-pointer flex flex-col h-full"
                            onClick={() => setSelectedWorkflow(wf)}
                        >
                            <div className="mb-6 h-40 rounded-xl overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                                <img src={wf.images?.[0]} alt={wf.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                                    {wf.price}
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-monjez-blue transition-colors">
                                {wf.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                                {wf.description}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                <div className="flex gap-2">
                                    {wf.features.slice(0, 2).map((f, i) => (
                                        <span key={i} className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-500">
                                            {f}
                                        </span>
                                    ))}
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />

            <PlanModal
                plan={selectedWorkflow}
                isOpen={!!selectedWorkflow}
                onClose={() => setSelectedWorkflow(null)}
            />
        </main>
    );
}

"use client";

import { useState, useEffect } from "react";
import {
    Users,
    Calendar,
    ArrowUpRight,
    Search,
    Filter,
    Download,
    CheckCircle2,
    Flame,
    ExternalLink,
    Mail,
    Phone,
    Linkedin,
    RefreshCw,
    ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MacPopup } from "@/components/dashboard/leads/mac-popup";
import { createSupabaseClient } from "@/lib/supabase/client";
import { Lead } from "@/lib/mock-leads";
import {
    clearAllLeadsAction,
    getRawLeadsAction,
    saveSingleLeadAction
} from "@/lib/actions/leads-actions";
import { generateLeadHTML } from "@/lib/utils/email-templates";

export default function LeadsPage() {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [extractionLogs, setExtractionLogs] = useState<any[]>([]);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterHot, setFilterHot] = useState(false);
    const [isExtracting, setIsExtracting] = useState(false);
    const [progress, setProgress] = useState({ current: 0, total: 0 });
    const [copyStatus, setCopyStatus] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const supabase = createSupabaseClient();

    useEffect(() => {
        const fetchLeads = async () => {
            const { data } = await supabase
                .from('apollo_leads')
                .select('*')
                .order('created_at', { ascending: false });

            if (data) {
                const mappedLeads = mapDbLeadsToLeads(data);
                setLeads(mappedLeads);
                updateLogs(mappedLeads);
            }
        };
        fetchLeads();
    }, []);

    const mapDbLeadsToLeads = (data: any[]): Lead[] => {
        return data.map(l => ({
            id: l.id,
            name: l.name,
            email: l.email || "N/A",
            phone: l.phone || "N/A",
            role: l.role || "Professional",
            company: l.company || "Private Entity",
            description: `${l.role} at ${l.company}`,
            linkedin: l.linkedin_url || "#",
            isHot: l.is_hot,
            problem: l.problem || "Checking for automation needs.",
            category: l.role?.includes('Founder') ? 'Founder' : 'Exec',
            status: "New",
            lastExtracted: l.batch_date || new Date(l.created_at).toISOString().split('T')[0]
        }));
    };

    const updateLogs = (mappedLeads: Lead[]) => {
        const batches = Array.from(new Set(mappedLeads.map(l => l.lastExtracted)));
        const newLogs = batches.map((date, idx) => {
            const dayLeads = mappedLeads.filter(l => l.lastExtracted === date);
            return {
                id: `real-${idx}`,
                date,
                time: "07:00 AM",
                status: "Success",
                count: dayLeads.length,
                hotCount: dayLeads.filter(l => l.isHot).length
            };
        });
        setExtractionLogs(newLogs);
    };

    const handleManualExtraction = async () => {
        setIsExtracting(true);
        setError(null);
        setProgress({ current: 0, total: 0 });

        try {
            await clearAllLeadsAction();
            setLeads([]);

            const rawList = await getRawLeadsAction();
            if (!rawList || rawList.length === 0) {
                setError("No leads found. Check API logs.");
                return;
            }

            setProgress({ current: 0, total: Math.min(rawList.length, 111) });

            const savedLeads: Lead[] = [];
            for (let i = 0; i < rawList.length && i < 111; i++) {
                const newLead = await saveSingleLeadAction(rawList[i]);
                if (newLead) {
                    savedLeads.push(newLead);
                    setLeads(prev => [newLead, ...prev]);
                    setProgress(prev => ({ ...prev, current: i + 1 }));
                    updateLogs([...savedLeads]);
                }
            }

            if (savedLeads.length >= 1) {
                if ("Notification" in window && Notification.permission === "granted") {
                    new Notification("Monjez: Extraction Complete", {
                        body: `Successfully extracted ${savedLeads.length} leads!`
                    });
                } else if ("Notification" in window && Notification.permission !== "denied") {
                    Notification.requestPermission();
                }
            }
        } catch (err: any) {
            setError(err.message || "Extraction crashed.");
        } finally {
            setIsExtracting(false);
        }
    };

    const copyEmailToClipboard = (lead: Lead) => {
        const html = generateLeadHTML({
            name: lead.name,
            company: lead.company,
            role: lead.role,
            problem: lead.problem,
            result: lead.role.includes("Founder") ? "3x higher operational efficiency" : "30% reduction in manual overhead"
        });

        const type = "text/html";
        const blob = new Blob([html], { type });
        const data = [new ClipboardItem({ [type]: blob })];

        navigator.clipboard.write(data).then(() => {
            setCopyStatus(lead.id);
            setTimeout(() => setCopyStatus(null), 2000);
        });
    };

    const filteredLeads = leads.filter(lead => {
        const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.company.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterHot ? lead.isHot : true;
        return matchesSearch && matchesFilter;
    });

    const handleDownload = () => {
        // Arabic Support: Use BOM (Byte Order Mark) for UTF-8 in Excel
        const BOM = "\uFEFF";
        const headers = ["Name (الاسم)", "Email (البريد)", "Phone (الهاتف)", "Role (المنصب)", "Company (الشركة)", "LinkedIn (لينكد إن)", "Website (الموقع)", "Status (الحالة)"].join(",");

        const rows = filteredLeads.map(l => {
            const website = `https://${l.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
            return [
                `"${l.name}"`,
                `"${l.email}"`,
                `"${l.phone}"`,
                `"${l.role}"`,
                `"${l.company}"`,
                `"${l.linkedin}"`,
                `"${website}"`,
                `"${l.isHot ? 'Hot (مهم)' : 'Warm (عادي)'}"`
            ].join(",");
        });

        const csvContent = BOM + headers + "\n" + rows.join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `monjez_leads_${selectedDay || new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <Users className="w-8 h-8 text-monjez-accent" />
                        Arab Leads Agent
                    </h1>
                    <p className="text-gray-400">Targeting 111 fresh clients every morning at 07:00 AM.</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                    <div className="flex gap-4">
                        <button
                            onClick={handleManualExtraction}
                            disabled={isExtracting}
                            className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2 text-sm text-white hover:bg-white/10 transition-all disabled:opacity-50"
                        >
                            <RefreshCw className={cn("w-4 h-4 text-monjez-accent", isExtracting && "animate-spin")} />
                            {isExtracting ? `Extracting ${progress.current}/${progress.total}...` : "Manual Force Extraction"}
                        </button>
                        <div className="bg-monjez-accent/10 border border-monjez-accent/20 px-4 py-2 rounded-xl flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-monjez-accent" />
                            <span className="text-sm font-medium text-white">99% Accuracy Target</span>
                        </div>
                    </div>
                    {error && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{error}</p>}
                </div>
            </div>

            {/* Daily Extraction Logs */}
            <div className="grid gap-4">
                {extractionLogs.map((log) => (
                    <div
                        key={log.id}
                        onClick={() => setSelectedDay(log.date)}
                        className="group bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all cursor-pointer flex items-center justify-between"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-xl bg-monjez-blue/20 flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-monjez-accent" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white group-hover:text-monjez-accent transition-colors">
                                    Extractions for {log.date}
                                </h3>
                                <p className="text-sm text-gray-500 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                    Agent captured {log.count} profiles on this day
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-12">
                            <div className="text-right">
                                <div className="text-xl font-bold text-white">{log.count}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">Clients Found</div>
                            </div>
                            <div className="text-right">
                                <div className="text-xl font-bold text-orange-500">{log.hotCount}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">Verified Hot</div>
                            </div>
                            <div className="p-2 rounded-full bg-white/5 group-hover:bg-monjez-accent group-hover:text-black transition-all">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Leads Modal (Mac Web Style) */}
            <MacPopup
                isOpen={!!selectedDay}
                onClose={() => setSelectedDay(null)}
                title={`LinkedIn Leads Explorer - ${selectedDay}`}
            >
                <div className="space-y-6 h-full">
                    {/* Toolbar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/5">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Search by name or company..."
                                    className="w-full bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-monjez-accent transition-colors"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={() => setFilterHot(!filterHot)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border",
                                    filterHot
                                        ? "bg-orange-500/20 border-orange-500 text-orange-500"
                                        : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                                )}
                            >
                                <Flame className="w-4 h-4" />
                                High Value Only
                            </button>
                        </div>
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-6 py-2 bg-monjez-accent text-black rounded-lg text-sm font-bold hover:bg-monjez-accent/90 transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            Download Batch ({filteredLeads.length})
                        </button>
                    </div>

                    {/* Leads Grid/List */}
                    <div className="grid gap-4">
                        {filteredLeads.map((lead) => (
                            <div
                                key={lead.id}
                                className="bg-[#242424] border border-white/5 rounded-xl p-5 hover:border-white/20 transition-all group"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-monjez-blue to-monjez-accent flex items-center justify-center text-xl font-bold text-white shadow-lg overflow-hidden">
                                            {lead.name[0]}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h4 className="text-lg font-bold text-white">{lead.name}</h4>
                                                {lead.isHot && (
                                                    <span className="px-2 py-0.5 rounded bg-orange-500/10 text-orange-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                                                        <Flame className="w-3 h-3" />
                                                        Verified Lead
                                                    </span>
                                                )}
                                                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                                                    {lead.category}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-400 font-medium">{lead.role} at <span className="text-white">{lead.company}</span></p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <button
                                            onClick={() => copyEmailToClipboard(lead)}
                                            className="bg-monjez-accent/10 border border-monjez-accent/20 hover:bg-monjez-accent/20 text-monjez-accent px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
                                        >
                                            <Mail className="w-3 h-3" />
                                            {copyStatus === lead.id ? "Copied!" : "Outreach Email"}
                                        </button>
                                        <div className="flex gap-2">
                                            <a href={lead.linkedin} target="_blank" className="flex-1 p-2 border border-white/10 rounded-lg hover:bg-white/5 transition-all flex justify-center">
                                                <Linkedin className="w-4 h-4 text-[#0a66c2]" />
                                            </a>
                                            <a href={`https://${lead.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`} target="_blank" className="flex-1 p-2 border border-white/10 rounded-lg hover:bg-white/5 transition-all flex justify-center">
                                                <ExternalLink className="w-4 h-4 text-white/40" />
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-3 col-span-2">
                                        <div className="p-4 rounded-lg bg-black/40 border border-white/5 h-full">
                                            <div className="text-[10px] uppercase tracking-wider text-monjez-accent font-bold mb-2">Problem Analysis</div>
                                            <p className="text-sm text-gray-300 leading-relaxed italic">
                                                "{lead.problem}"
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 text-xs text-gray-500 italic">
                                                <Mail className="w-3 h-3" />
                                                {lead.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 italic">
                                                <Phone className="w-3 h-3" />
                                                {lead.phone}
                                            </div>
                                        </div>
                                        <button className="w-full mt-2 py-2 bg-monjez-accent/10 border border-monjez-accent/30 rounded-lg text-[10px] font-bold text-white hover:bg-monjez-accent/20 transition-colors uppercase">
                                            AI Personal Outreach
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </MacPopup>
        </div>
    );
}

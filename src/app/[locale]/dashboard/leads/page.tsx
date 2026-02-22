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
    ShieldCheck,
    Image as ImageIcon,
    Video,
    Plus,
    LayoutDashboard,
    Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MacPopup } from "@/components/dashboard/leads/mac-popup";
import { createSupabaseClient } from "@/lib/supabase/client";
import { Lead } from "@/lib/mock-leads";
import {
    clearAllLeadsAction,
    getRawLeadsAction,
    saveSingleLeadAction,
    getJobStatusAction,
    createJobAction,
    performRealExtractionAction
} from "@/lib/actions/leads-actions";
import {
    generateLeadHTML,
    generateArabicLeadHTML,
    generateLinkedInMessage
} from "@/lib/utils/email-templates";

import {
    getLinkedInConfigAction,
    updateLinkedInConfigAction,
    triggerLinkedInPostAction,
    getSocialAssetsAction,
    addSocialAssetAction,
    deleteSocialAssetAction
} from "@/lib/actions/social-actions";

export default function LeadsPage() {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [extractionLogs, setExtractionLogs] = useState<any[]>([]);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterHot, setFilterHot] = useState(false);
    const [isExtracting, setIsExtracting] = useState(false);
    const [progress, setProgress] = useState({ current: 0, total: 0 });
    const [activeTab, setActiveTab] = useState<"leads" | "assets">("leads");
    const [assets, setAssets] = useState<any[]>([]);
    const [copyStatus, setCopyStatus] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const supabase = createSupabaseClient();

    const mapDbLeadsToLeads = (data: any[]): Lead[] => {
        return data.map(l => ({
            id: l.id,
            name: l.name,
            email: l.email || "N/A",
            phone: l.phone || "N/A",
            role: l.role || "Professional",
            company: l.company || "Private Entity",
            description: l.description || `${l.role} at ${l.company}`,
            linkedin: l.linkedin_url || "#",
            isHot: l.is_hot,
            problem: l.problem || "Checking for automation needs.",
            category: l.role?.toLowerCase().includes('founder') ? 'Founder' : 'Exec',
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

    useEffect(() => {
        let pollInterval: NodeJS.Timeout;

        const checkJobStatus = async () => {
            try {
                const job = await getJobStatusAction("lead_extraction");
                if (job && job.status === "running") {
                    setIsExtracting(true);
                    setProgress({ current: job.progress, total: job.total });

                    if (!pollInterval) {
                        pollInterval = setInterval(checkJobStatus, 2000);
                    }
                } else if (job && (job.status === "completed" || job.status === "failed")) {
                    setIsExtracting(false);
                    setProgress({ current: job.progress, total: job.total });
                    if (job.status === "failed") setError(job.error_message);
                    if (pollInterval) {
                        clearInterval(pollInterval);
                        pollInterval = null as any;
                    }

                    // Refresh leads list if just completed
                    if (job.status === "completed") {
                        const { data } = await supabase.from('apollo_leads').select('*').order('created_at', { ascending: false });
                        if (data) {
                            const mapped = mapDbLeadsToLeads(data);
                            setLeads(mapped);
                            updateLogs(mapped);
                        }
                    }
                }
            } catch (err) {
                console.error("Polling error:", err);
            }
        };

        const fetchInitialLeads = async () => {
            const { data } = await supabase.from('apollo_leads').select('*').order('created_at', { ascending: false });
            if (data) {
                const mapped = mapDbLeadsToLeads(data);
                setLeads(mapped);
                updateLogs(mapped);
            }
        };

        const fetchInitialAssets = async () => {
            const data = await getSocialAssetsAction();
            setAssets(data);
        };

        fetchInitialLeads();
        fetchInitialAssets();
        checkJobStatus();

        return () => {
            if (pollInterval) clearInterval(pollInterval);
        };
    }, []);

    const handleAddAsset = async () => {
        setIsUploading(true);
        try {
            const names = ["Promo Teaser", "Product Demo", "Client Interview", "Office Tour"];
            const types = ["video", "video", "image", "image"];
            const idx = Math.floor(Math.random() * names.length);

            const newAsset = await addSocialAssetAction({
                name: `${names[idx]} ${assets.length + 1}`,
                type: types[idx] as 'video' | 'image',
                size: `${Math.floor(Math.random() * 50) + 1}MB`,
                url: "#"
            });

            setAssets([newAsset, ...assets]);
        } catch (err) {
            console.error(err);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDeleteAsset = async (id: string) => {
        try {
            await deleteSocialAssetAction(id);
            setAssets(assets.filter(a => a.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleManualExtraction = async () => {
        setIsExtracting(true);
        setError(null);
        setProgress({ current: 0, total: 111 });

        try {
            await clearAllLeadsAction();
            setLeads([]);

            const job = await createJobAction("lead_extraction", 111);

            // Trigger background extraction
            // We await here just to start it, but the job tracking handles it
            performRealExtractionAction(job.id);

        } catch (err: any) {
            setError(err.message || "Extraction crashed.");
            setIsExtracting(false);
        }
    };

    const getLeadInsights = (lead: Lead) => {
        const isFounder = lead.role.toLowerCase().includes("founder") || lead.role.toLowerCase().includes("ceo");
        return {
            problem: isFounder
                ? "إزاي تكبر البزنس بتاعك من غير ما تضيع وقت في تفاصيل التشغيل اليومية"
                : "صعوبة إدارة المهام المتكررة وضياع فرص مبيعات محتملة",
            result: isFounder
                ? "زيادة في المبيعات بنسبة 35% باستخدام أتمتة الذكاء الاصطناعي"
                : "توفير 20 ساعة أسبوعياً من المجهود اليدوي لفريقك"
        };
    };

    const copyEmailToClipboard = (lead: Lead, isArabic: boolean = false) => {
        const insights = getLeadInsights(lead);
        const html = isArabic
            ? generateArabicLeadHTML({
                name: lead.name,
                company: lead.company,
                role: lead.role,
                problem: insights.problem,
                result: insights.result
            })
            : generateLeadHTML({
                name: lead.name,
                company: lead.company,
                role: lead.role,
                problem: lead.role.includes("Founder") ? "Scaling without manual overhead" : "Managing cross-functional workflows",
                result: lead.role.includes("Founder") ? "3x more operational throughput" : "30% reduction in lead response time"
            });

        const type = "text/html";
        const blob = new Blob([html], { type });
        const data = [new ClipboardItem({ [type]: blob })];

        navigator.clipboard.write(data).then(() => {
            setCopyStatus(`${lead.id}-${isArabic ? 'ar' : 'en'}`);
            setTimeout(() => setCopyStatus(null), 2000);
        });
    };

    const copyLinkedInToClipboard = (lead: Lead) => {
        const insights = getLeadInsights(lead);
        const message = generateLinkedInMessage({
            name: lead.name,
            company: lead.company,
            role: lead.role,
            problem: lead.role.includes("Founder") ? "scaling bottlenecks" : "workflow inefficiencies",
            result: lead.role.includes("Founder") ? "3x growth" : "40% efficiency boost"
        });

        navigator.clipboard.writeText(message).then(() => {
            setCopyStatus(`${lead.id}-li`);
            setTimeout(() => setCopyStatus(null), 2000);
        });
    };

    const openInGmail = (lead: Lead) => {
        const body = `Hi ${lead.name},\n\nI saw your work at ${lead.company} and thought we could help with ${lead.problem}.\n\nBest,\nMonjez Team`;
        const subject = `Opportunity for ${lead.company}`;
        window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${lead.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    };

    const CreativeAssetsView = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-[#242424] p-6 rounded-xl border border-white/5">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">Creative Assets Library</h3>
                    <p className="text-sm text-gray-400">Manage your photos and videos for the LinkedIn Agent.</p>
                </div>
                <button
                    onClick={handleAddAsset}
                    disabled={isUploading}
                    className="bg-monjez-accent text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
                >
                    <Plus className={cn("w-4 h-4", isUploading && "animate-spin")} />
                    {isUploading ? "Uploading..." : "Upload Material"}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {assets.length === 0 && !isUploading && (
                    <div className="col-span-3 py-12 text-center text-gray-500 bg-white/5 border border-dashed border-white/10 rounded-xl">
                        No materials uploaded yet. Click "Upload Material" to start.
                    </div>
                )}
                {assets.map((asset) => (
                    <div key={asset.id} className="bg-black/40 border border-white/5 rounded-xl p-4 group hover:border-monjez-accent/30 transition-all relative">
                        <button
                            onClick={() => handleDeleteAsset(asset.id)}
                            className="absolute top-2 right-2 p-1.5 bg-red-500/10 text-red-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                        >
                            <Plus className="w-3 h-3 rotate-45" />
                        </button>
                        <div className="aspect-video bg-[#242424] rounded-lg mb-4 flex items-center justify-center border border-white/5 overflow-hidden relative">
                            {asset.type === 'video' ? <Video className="w-8 h-8 text-gray-600" /> : <ImageIcon className="w-8 h-8 text-gray-600" />}
                            <div className="absolute inset-0 bg-monjez-accent/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-[10px] font-bold text-monjez-accent uppercase tracking-widest">Select for Post</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-start">
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-white truncate">{asset.name}</h4>
                                <p className="text-[10px] text-gray-500 mt-0.5">{asset.size} • {new Date(asset.created_at).toLocaleDateString()}</p>
                            </div>
                            <span className={cn(
                                "text-[9px] px-2 py-0.5 rounded-full font-bold uppercase",
                                asset.type === 'video' ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400"
                            )}>
                                {asset.type}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-monjez-accent/5 border border-monjez-accent/20 rounded-xl p-4 flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-monjez-accent/20 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-monjez-accent" />
                </div>
                <div className="flex-1">
                    <h5 className="text-xs font-bold text-white">Agent Request Notification</h5>
                    <p className="text-[10px] text-gray-400">The LinkedIn Agent will notify you here when it needs a specific photo or video for a scheduled post.</p>
                </div>
            </div>
        </div>
    );

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
                title="Monjez Intel: LinkedIn Agent Control Center"
            >
                <div className="flex h-full min-h-[600px]">
                    {/* Inner Sidebar */}
                    <div className="w-48 border-r border-white/5 pr-4 flex flex-col gap-2">
                        <button
                            onClick={() => setActiveTab("leads")}
                            className={cn(
                                "w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-3",
                                activeTab === 'leads' ? "bg-monjez-accent text-white shadow-lg shadow-monjez-accent/20" : "text-gray-400 hover:bg-white/5"
                            )}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Daily Leads
                        </button>
                        <button
                            onClick={() => setActiveTab("assets")}
                            className={cn(
                                "w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-3",
                                activeTab === 'assets' ? "bg-monjez-accent text-white shadow-lg shadow-monjez-accent/20" : "text-gray-400 hover:bg-white/5"
                            )}
                        >
                            <ImageIcon className="w-4 h-4" />
                            Creative Assets
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 pl-6 overflow-y-auto">
                        {activeTab === 'leads' ? (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl font-bold text-white">Leads for {selectedDay}</h3>
                                    <div className="flex gap-2">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                            <input
                                                type="text"
                                                placeholder="Search by name or company..."
                                                className="bg-black/40 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-monjez-accent transition-all w-64"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                        <button
                                            onClick={handleDownload}
                                            className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all"
                                        >
                                            Download Batch ({filteredLeads.length})
                                        </button>
                                    </div>
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
                                                        <p className="text-sm text-gray-400 font-medium line-clamp-1">{lead.description}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    {/* Row 1: Emails */}
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <button
                                                            onClick={() => copyEmailToClipboard(lead, false)}
                                                            className="bg-monjez-accent/10 border border-monjez-accent/20 hover:bg-monjez-accent/20 text-monjez-accent px-2 py-2 rounded-lg text-[9px] font-bold transition-all flex items-center justify-center gap-1.5"
                                                        >
                                                            <Mail className="w-3 h-3" />
                                                            {copyStatus === `${lead.id}-en` ? "Copied!" : "Email (EN)"}
                                                        </button>
                                                        <button
                                                            onClick={() => copyEmailToClipboard(lead, true)}
                                                            className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-2 py-2 rounded-lg text-[9px] font-bold transition-all flex items-center justify-center gap-1.5"
                                                        >
                                                            <Mail className="w-3 h-3 text-monjez-accent" />
                                                            {copyStatus === `${lead.id}-ar` ? "نسخ الإيميل" : "Email (AR)"}
                                                        </button>
                                                    </div>

                                                    {/* Row 2: Platforms */}
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <button
                                                            onClick={() => copyLinkedInToClipboard(lead)}
                                                            className="bg-[#0a66c2]/10 border border-[#0a66c2]/20 hover:bg-[#0a66c2]/20 text-[#0a66c2] px-2 py-2 rounded-lg text-[9px] font-bold transition-all flex items-center justify-center gap-1.5"
                                                        >
                                                            <Linkedin className="w-3 h-3" />
                                                            {copyStatus === `${lead.id}-li` ? "Copied!" : "LinkedIn Msg"}
                                                        </button>
                                                        <a
                                                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                                                            target="_blank"
                                                            className="bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 text-green-500 px-2 py-2 rounded-lg text-[9px] font-bold transition-all flex items-center justify-center gap-1.5"
                                                        >
                                                            <Phone className="w-3 h-3 text-[#25D366]" />
                                                            WhatsApp
                                                        </a>
                                                    </div>

                                                    {/* Row 3: Action Links */}
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <button
                                                            onClick={() => openInGmail(lead)}
                                                            className="bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-500 px-2 py-2 rounded-lg text-[9px] font-bold transition-all flex items-center justify-center gap-1.5"
                                                        >
                                                            <ExternalLink className="w-3 h-3" />
                                                            Gmail App
                                                        </button>
                                                        <a
                                                            href={lead.linkedin}
                                                            target="_blank"
                                                            className="p-2 border border-white/10 rounded-lg hover:bg-white/5 transition-all flex justify-center items-center text-[9px] text-gray-400 font-bold"
                                                        >
                                                            View LinkedIn
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
                        ) : (
                            <CreativeAssetsView />
                        )}
                    </div>
                </div>
            </MacPopup>
        </div>
    );
}

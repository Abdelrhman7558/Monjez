"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
    LayoutDashboard,
    Newspaper,
    Target,
    Calendar,
    TrendingUp,
    DollarSign,
    Settings,
    LogOut,
    ChevronLeft,
    Menu,
    Activity,
    Briefcase,
    GraduationCap,
    BarChart3,
    UserCircle,
    Building2,
    Megaphone,
    Share2,
    Search,
    BookOpen,
    Users,
    MessageSquare,
    Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Industry News", href: "/dashboard/news", icon: Newspaper },
    { name: "Competitors", href: "/dashboard/competitors", icon: Target },
    { name: "Habits", href: "/dashboard/habits", icon: Activity },
    { name: "Projects", href: "/dashboard/projects", icon: Briefcase },
    { name: "Education", href: "/dashboard/education", icon: GraduationCap },
    { name: "Planner", href: "/dashboard/planner", icon: Calendar },
    { name: "Investments", href: "/dashboard/investments", icon: BarChart3 },
    { name: "Goals", href: "/dashboard/goals", icon: TrendingUp },
    { name: "Identity", href: "/dashboard/identity", icon: UserCircle },
    { name: "Companies", href: "/dashboard/companies", icon: Building2 },
    { name: "Finance", href: "/dashboard/finance", icon: DollarSign },
    { name: "Leads", href: "/dashboard/leads", icon: Users },
    { name: "Social Media", href: "/dashboard/social", icon: Share2 },
    {
        name: "Meta",
        icon: Megaphone,
        children: [
            { name: "Campaigns", href: "/dashboard/meta/campaigns" },
            { name: "Ads", href: "/dashboard/meta/ads" },
            { name: "Optimization & Scaling", href: "/dashboard/meta/optimization-scaling" },
        ]
    },
    { name: "Website Analyzer", href: "/dashboard/website-analyzer", icon: Search },
    { name: "AI Consultant", href: "/dashboard/consultant", icon: Sparkles },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
    const pathname = usePathname();
    const router = useRouter();

    const toggleDropdown = (name: string) => {
        setOpenDropdowns(prev =>
            prev.includes(name)
                ? prev.filter(i => i !== name)
                : [...prev, name]
        );
    };

    const handleSignOut = async () => {
        // Clear cookie for hardcoded auth
        document.cookie = "admin_auth=; path=/; max-age=0";
        // Also sign out from Supabase if using it
        const { createSupabaseClient } = await import("@/lib/supabase/client");
        const supabase = createSupabaseClient();
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    return (
        <div className="min-h-screen bg-monjez-dark flex">
            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 bg-black/50 border-r border-white/10 backdrop-blur-xl transition-all duration-300 flex flex-col",
                    isSidebarOpen ? "w-64" : "w-20"
                )}
            >
                <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
                    {isSidebarOpen && (
                        <span className="font-bold text-lg text-white tracking-widest uppercase">MONJEZ<span className="text-monjez-accent">OS</span></span>
                    )}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-2 rounded-lg hover:bg-white/5 text-gray-400 transition-colors"
                    >
                        {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                <nav
                    className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar"
                    data-lenis-prevent
                >
                    {navigation.map((item) => {
                        const hasChildren = 'children' in item && item.children;
                        const isDropdownOpen = openDropdowns.includes(item.name);
                        const isActive = item.href ? pathname === item.href : item.children?.some(child => pathname === child.href);

                        if (hasChildren) {
                            return (
                                <div key={item.name} className="space-y-1">
                                    <button
                                        onClick={() => toggleDropdown(item.name)}
                                        className={cn(
                                            "flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                                            isActive
                                                ? "bg-monjez-blue/20 text-monjez-accent"
                                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-monjez-accent" : "text-gray-500 group-hover:text-white")} />
                                        {isSidebarOpen && (
                                            <>
                                                <span className="font-medium text-sm whitespace-nowrap flex-1 text-left">{item.name}</span>
                                                <ChevronLeft className={cn("w-4 h-4 transition-transform duration-200", isDropdownOpen ? "-rotate-90" : "rotate-0")} />
                                            </>
                                        )}
                                    </button>

                                    {isSidebarOpen && isDropdownOpen && (
                                        <div className="pl-10 space-y-1">
                                            {item.children.map((child) => {
                                                const isChildActive = pathname === child.href;
                                                return (
                                                    <Link
                                                        key={child.name}
                                                        href={child.href}
                                                        className={cn(
                                                            "block px-3 py-2 rounded-lg text-sm transition-all duration-200",
                                                            isChildActive
                                                                ? "text-monjez-accent"
                                                                : "text-gray-500 hover:text-white hover:bg-white/5"
                                                        )}
                                                    >
                                                        {child.name}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={item.name}
                                href={item.href!}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                                    isActive
                                        ? "bg-monjez-blue/20 text-monjez-accent"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-monjez-accent" : "text-gray-500 group-hover:text-white")} />

                                {isSidebarOpen && (
                                    <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>
                                )}

                                {!isSidebarOpen && (
                                    <div className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none transition-opacity">
                                        {item.name}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/5 mt-auto">
                    <button
                        onClick={handleSignOut}
                        className={cn(
                            "flex items-center gap-3 w-full px-3 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors",
                            !isSidebarOpen && "justify-center"
                        )}
                    >
                        <LogOut className="w-5 h-5" />
                        {isSidebarOpen && <span className="font-medium text-sm text-left">Sign Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div
                className={cn(
                    "flex-1 transition-all duration-300 bg-monjez-dark min-h-screen",
                    isSidebarOpen ? "ml-64" : "ml-20"
                )}
            >
                <main className="p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { cookies } from "next/headers";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const supabase = await createSupabaseServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    // Also check for the hardcoded admin_auth cookie as a fallback
    const cookieStore = await cookies();
    const isAdminAuth = cookieStore.get("admin_auth")?.value === "true";

    if (!session && !isAdminAuth) {
        redirect("/login");
    }

    return (
        <DashboardShell>
            {children}
        </DashboardShell>
    );
}

"use client";

import { useState } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const supabase = createSupabaseClient();

        // Use Supabase Auth for the session
        // Assuming the user has a Supabase account with these credentials
        const { data, error: authError } = await supabase.auth.signInWithPassword({
            email: username.includes("@") ? username : `${username.toLowerCase()}@monjez.ai`, // Fallback for Identity field
            password: password,
        });

        if (authError) {
            // Check for hardcoded fallback if Supabase fails (optional, but requested RLS needs Supabase)
            if (username === "Monjez" && password === "121800") {
                document.cookie = "admin_auth=true; path=/; max-age=86400; SameSite=Strict";
                router.push("/dashboard");
                router.refresh();
                return;
            }
            setError(authError.message);
            setIsLoading(false);
        } else {
            // Success
            router.push("/dashboard");
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="text-center mb-8">
                    <div className="w-12 h-12 bg-monjez-blue/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-monjez-blue/30">
                        <Lock className="w-6 h-6 text-monjez-accent" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Founder Entry</h1>
                    <p className="text-gray-400 text-sm mt-2">Restricted Access System</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Identity</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter Identity"
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-monjez-accent transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Key</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Key"
                            className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-monjez-accent transition-colors"
                        />
                    </div>

                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-monjez-blue hover:bg-monjez-accent text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center shadow-[0_0_20px_rgba(59,79,228,0.2)] hover:shadow-[0_0_30px_rgba(59,79,228,0.4)]"
                    >
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Authenticate"}
                    </button>
                </form>
            </div>
        </div>
    );
}

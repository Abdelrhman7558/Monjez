"use client";

import { useState, useRef, useEffect } from "react";
import { CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "@/navigation";

interface TechnicalSupportCheckoutButtonProps {
    className?: string;
    onSuccess?: () => void;
}

declare global {
    interface Window {
        FS: any;
    }
}

export function TechnicalSupportCheckoutButton({ className, onSuccess }: TechnicalSupportCheckoutButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [fsLoaded, setFsLoaded] = useState(false);

    useEffect(() => {
        const checkFs = setInterval(() => {
            if (window.FS && window.FS.Checkout) {
                setFsLoaded(true);
                clearInterval(checkFs);
            }
        }, 500);

        return () => clearInterval(checkFs);
    }, []);

    const handleCheckout = () => {
        if (!window.FS || !window.FS.Checkout) {
            console.error("Freemius Checkout not loaded");
            return;
        }

        setIsLoading(true);

        const handler = new window.FS.Checkout({
            product_id: "24046",
            plan_id: "40048",
            public_key: "pk_3b2d5a25ba6098810cd1a46ed03de",
            image: "https://monjez.ai/logo.png" // Replace with actual logo URL if different
        });

        handler.open({
            name: "Technical Support",
            licenses: 1,
            purchaseCompleted: (response: any) => {
                console.log("Purchase completed:", response);

                // Optional: Log to server
                fetch("/api/log-purchase", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: response.user.email,
                        license: response.license.key,
                        plan: "Technical Support",
                        timestamp: new Date()
                    })
                }).catch(err => console.error("Logging error:", err));

                // Redirect to Thank You
                router.push("/thank-you");
            },
            success: (response: any) => {
                console.log("Checkout closed after success:", response);
                if (onSuccess) onSuccess();
                setIsLoading(false);
            },
            cancel: () => {
                setIsLoading(false);
            }
        });
    };

    return (
        <button
            onClick={handleCheckout}
            disabled={isLoading || !fsLoaded}
            className={cn(
                "group relative flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold transition-all duration-300 overflow-hidden",
                "bg-monjez-blue hover:bg-monjez-accent text-white shadow-lg hover:shadow-monjez-accent/40",
                "disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95",
                className
            )}
        >
            <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <CreditCard className="w-5 h-5" />
                )}
                Subscribe – $450 / month
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </button>
    );
}

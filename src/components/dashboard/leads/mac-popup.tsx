"use client";

import { X, Minus, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface MacPopupProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function MacPopup({ isOpen, onClose, title, children }: MacPopupProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || !isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="w-full max-w-4xl bg-[#1c1c1c] rounded-xl border border-white/10 shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
                style={{ height: '80vh' }}
            >
                {/* Title Bar */}
                <div className="h-10 flex items-center px-4 bg-[#2d2d2d] border-b border-black/20 select-none relative">
                    <div className="flex gap-2 mr-4">
                        <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#ff5f57] hover:bg-[#ff5f57]/80 flex items-center justify-center group">
                            <X className="w-2 h-2 text-black/40 opacity-0 group-hover:opacity-100" />
                        </button>
                        <button className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 flex items-center justify-center group">
                            <Minus className="w-2 h-2 text-black/40 opacity-0 group-hover:opacity-100" />
                        </button>
                        <button className="w-3 h-3 rounded-full bg-[#28c840] hover:bg-[#28c840]/80 flex items-center justify-center group">
                            <Maximize2 className="w-2 h-2 text-black/40 opacity-0 group-hover:opacity-100" />
                        </button>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-xs font-medium text-gray-400">{title}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                    {children}
                </div>
            </div>
        </div>
    );
}

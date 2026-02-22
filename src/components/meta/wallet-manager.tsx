"use client";

import { useState, useEffect } from "react";
import { Wallet, Plus, Edit2, Loader2 } from "lucide-react";

export function WalletManager() {
    const [balance, setBalance] = useState<number | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBalance();
    }, []);

    const fetchBalance = async () => {
        try {
            const res = await fetch("/api/meta/wallet");
            const data = await res.json();
            setBalance(data.wallet_balance);
        } catch (error) {
            console.error("Failed to fetch balance", error);
        }
    };

    const handleUpdate = async () => {
        if (!amount || isNaN(Number(amount))) return;
        setLoading(true);
        try {
            await fetch("/api/meta/wallet", {
                method: "POST",
                body: JSON.stringify({ amount: Number(amount) }),
            });
            await fetchBalance();
            setIsAdding(false);
            setAmount("");
        } catch (error) {
            console.error("Failed to update balance", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-monjez-blue/20 rounded-xl">
                    <Wallet className="w-6 h-6 text-monjez-accent" />
                </div>
                <div>
                    <h3 className="text-sm font-medium text-gray-400">Available Wallet Balance</h3>
                    <p className="text-2xl font-bold text-white">
                        {balance !== null ? `${balance.toLocaleString()} EGP` : "--- EGP"}
                    </p>
                </div>
            </div>

            {isAdding ? (
                <div className="space-y-4">
                    <input
                        type="number"
                        placeholder="Amount to add"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-monjez-accent"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={handleUpdate}
                            disabled={loading}
                            className="flex-1 bg-monjez-accent text-black font-bold py-2 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                            Confirm
                        </button>
                        <button
                            onClick={() => setIsAdding(false)}
                            className="flex-1 bg-white/5 text-white font-medium py-2 rounded-xl hover:bg-white/10 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsAdding(true)}
                    className="w-full bg-white/5 border border-white/10 text-white font-medium py-2 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
                >
                    <Edit2 className="w-4 h-4 text-gray-400 group-hover:text-monjez-accent" />
                    Manage Funds
                </button>
            )}
        </div>
    );
}

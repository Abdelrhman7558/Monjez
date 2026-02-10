"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createBrowserClient } from "@supabase/ssr";
import { useTranslations } from "next-intl";

const formSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(8, "Phone number is required"),
    companyName: z.string().optional(),
    websiteUrl: z.string().optional(),
    industry: z.string().min(1, "Please select an industry"),
    clientType: z.string().min(1, "Please select client type"),
    primaryGoal: z.array(z.string()).min(1, "Please select at least one goal"),
    teamSize: z.string().min(1, "Team size is required"),
    monthlyRevenue: z.string().optional(),
    currentChallenges: z.string().min(10, "Please describe your challenges"),
    interestedServices: z.array(z.string()).min(1, "Please select at least one service"),
    previousExperience: z.string().min(1, "Please select an option"),
    referralSource: z.string().min(1, "Please select an option"),
    preferredTime: z.string().min(2, "Please suggest a time"),
    additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function BookingModal({
    isOpen,
    onClose,
    redirectUrl = "https://calendly.com/monjez/monjez"
}: {
    isOpen: boolean;
    onClose: () => void;
    redirectUrl?: string;
}) {
    const t = useTranslations("booking");
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isValid },
        trigger,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            primaryGoal: [],
            interestedServices: [],
        }
    });

    const selectedGoals = watch("primaryGoal");
    const selectedServices = watch("interestedServices");

    const toggleMultiSelect = (field: "primaryGoal" | "interestedServices", value: string) => {
        const currentValues = field === "primaryGoal" ? selectedGoals : selectedServices;
        const newValues = currentValues.includes(value)
            ? currentValues.filter((v) => v !== value)
            : [...currentValues, value];
        setValue(field, newValues);
        trigger(field);
    };

    const nextStep = async () => {
        let fieldsToValidate: (keyof FormData)[] = [];
        if (step === 1) fieldsToValidate = ["fullName", "email", "phoneNumber"];
        if (step === 2) fieldsToValidate = ["industry", "clientType"];
        if (step === 3) fieldsToValidate = ["primaryGoal", "currentChallenges", "interestedServices"];
        if (step === 4) fieldsToValidate = ["teamSize", "previousExperience", "referralSource"];
        if (step === 5) fieldsToValidate = ["preferredTime"];

        const result = await trigger(fieldsToValidate);
        if (result) setStep((s) => s + 1);
    };

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setError(null);

        try {
            const { error: dbError } = await supabase
                .from("strategy_call_leads")
                .insert([
                    {
                        full_name: data.fullName,
                        email: data.email,
                        phone_number: data.phoneNumber,
                        company_name: data.companyName,
                        website_url: data.websiteUrl,
                        industry: data.industry,
                        client_type: data.clientType,
                        primary_goal: data.primaryGoal, // Supabase Array
                        team_size: data.teamSize,
                        monthly_revenue: data.monthlyRevenue,
                        current_challenges: data.currentChallenges,
                        interested_services: data.interestedServices, // Supabase Array
                        previous_experience: data.previousExperience,
                        referral_source: data.referralSource,
                        preferred_time: data.preferredTime,
                        additional_notes: data.additionalNotes,
                        status: "new"
                    }
                ]);

            if (dbError) throw dbError;

            setIsSuccess(true);
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 2000);

        } catch (err: any) {
            console.error("Submission error:", err);
            setError("Failed to submit. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (

                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full md:w-[650px] max-h-[90vh] flex flex-col bg-monjez-dark border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                            <div>
                                <h2 className="text-xl font-bold text-white text-start">{t("title")}</h2>
                                <p className="text-sm text-gray-400 text-start">{t("step", { step })}</p>
                            </div>
                            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(100vh-80px)] md:max-h-[75vh] custom-scrollbar">
                            {isSuccess ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">{t("success_title")}</h3>
                                    <p className="text-gray-400 mb-8">
                                        {t("success_subtitle")}
                                    </p>
                                    <Loader2 className="w-6 h-6 text-monjez-accent animate-spin mx-auto" />
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    {step === 1 && (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1 text-start">{t("fields.full_name")}</label>
                                                <input {...register("fullName")} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-monjez-accent text-start" placeholder={t("fields.full_name_placeholder")} />
                                                {errors.fullName && <p className="text-red-400 text-xs mt-1 text-start">{errors.fullName.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1 text-start">{t("fields.email")}</label>
                                                <input {...register("email")} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-monjez-accent text-start" placeholder={t("fields.email_placeholder")} />
                                                {errors.email && <p className="text-red-400 text-xs mt-1 text-start">{errors.email.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1 text-start">{t("fields.phone")}</label>
                                                <input {...register("phoneNumber")} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-monjez-accent text-start" placeholder={t("fields.phone_placeholder")} />
                                                {errors.phoneNumber && <p className="text-red-400 text-xs mt-1 text-start">{errors.phoneNumber.message}</p>}
                                            </div>
                                            <button type="button" onClick={nextStep} className="w-full bg-monjez-blue hover:bg-monjez-accent text-white font-bold py-3 rounded-xl transition-colors mt-4">
                                                {t("next")}
                                            </button>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1 text-start">{t("fields.company_name")}</label>
                                                <input {...register("companyName")} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-monjez-accent text-start" placeholder={t("fields.company_name_placeholder")} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1 text-start">{t("fields.website")}</label>
                                                <input {...register("websiteUrl")} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-monjez-accent text-start" placeholder={t("fields.website_placeholder")} />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1 text-start">{t("fields.industry")}</label>
                                                <select {...register("industry")} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-monjez-accent text-start">
                                                    <option value="">Select industry</option>
                                                    {Object.entries(t.raw("options.industries")).map(([key, value]: [string, any]) => (
                                                        <option key={key} value={value}>{value}</option>
                                                    ))}
                                                </select>
                                                {errors.industry && <p className="text-red-400 text-xs mt-1 text-start">{errors.industry.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1 text-start">{t("fields.client_type")}</label>
                                                <select {...register("clientType")} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-monjez-accent text-start">
                                                    <option value="">Select type</option>
                                                    {Object.entries(t.raw("options.client_types")).map(([key, value]: [string, any]) => (
                                                        <option key={key} value={value}>{value}</option>
                                                    ))}
                                                </select>
                                                {errors.clientType && <p className="text-red-400 text-xs mt-1 text-start">{errors.clientType.message}</p>}
                                            </div>
                                            <div className="flex gap-4">
                                                <button type="button" onClick={() => setStep(s => s - 1)} className="flex-1 bg-white/5 text-white py-3 rounded-xl">{t("back")}</button>
                                                <button type="button" onClick={nextStep} className="flex-[2] bg-monjez-blue text-white py-3 rounded-xl font-bold">{t("next")}</button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 3 && (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-3 text-start">{t("fields.primary_goal")}</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {Object.entries(t.raw("options.goals")).map(([key, value]: [string, any]) => (
                                                        <button
                                                            key={key}
                                                            type="button"
                                                            onClick={() => toggleMultiSelect("primaryGoal", value)}
                                                            className={`text-xs p-3 rounded-lg border transition-all text-start ${selectedGoals.includes(value) ? 'bg-monjez-accent/20 border-monjez-accent text-white' : 'bg-black/30 border-white/10 text-gray-400'}`}
                                                        >
                                                            {value}
                                                        </button>
                                                    ))}
                                                </div>
                                                {errors.primaryGoal && <p className="text-red-400 text-xs mt-1 text-start">{errors.primaryGoal.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1 text-start">{t("fields.current_challenges")}</label>
                                                <textarea {...register("currentChallenges")} rows={3} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-monjez-accent text-start" placeholder={t("fields.current_challenges_placeholder")} />
                                                {errors.currentChallenges && <p className="text-red-400 text-xs mt-1 text-start">{errors.currentChallenges.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-3 text-start">{t("fields.interested_services")}</label>
                                                <div className="space-y-2">
                                                    {Object.entries(t.raw("options.services")).map(([key, value]: [string, any]) => (
                                                        <button
                                                            key={key}
                                                            type="button"
                                                            onClick={() => toggleMultiSelect("interestedServices", value)}
                                                            className={`w-full text-xs p-3 rounded-lg border transition-all text-start flex justify-between items-center ${selectedServices.includes(value) ? 'bg-monjez-accent/20 border-monjez-accent text-white' : 'bg-black/30 border-white/10 text-gray-400'}`}
                                                        >
                                                            {value}
                                                            {selectedServices.includes(value) && <CheckCircle className="w-4 h-4 text-monjez-accent" />}
                                                        </button>
                                                    ))}
                                                </div>
                                                {errors.interestedServices && <p className="text-red-400 text-xs mt-1 text-start">{errors.interestedServices.message}</p>}
                                            </div>
                                            <div className="flex gap-4">
                                                <button type="button" onClick={() => setStep(s => s - 1)} className="flex-1 bg-white/5 text-white py-3 rounded-xl">{t("back")}</button>
                                                <button type="button" onClick={nextStep} className="flex-[2] bg-monjez-blue text-white py-3 rounded-xl font-bold">{t("next")}</button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 4 && (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1 text-start">{t("fields.team_size")}</label>
                                                <input type="number" {...register("teamSize")} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-monjez-accent text-start" placeholder="e.g. 10" />
                                                {errors.teamSize && <p className="text-red-400 text-xs mt-1 text-start">{errors.teamSize.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1 text-start">{t("fields.monthly_revenue")}</label>
                                                <input type="number" {...register("monthlyRevenue")} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-monjez-accent text-start" placeholder="Optional" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1 text-start">{t("fields.previous_experience")}</label>
                                                <select {...register("previousExperience")} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-monjez-accent text-start">
                                                    <option value="">Select option</option>
                                                    <option value="Yes">{t("options.experience.yes")}</option>
                                                    <option value="No">{t("options.experience.no")}</option>
                                                </select>
                                                {errors.previousExperience && <p className="text-red-400 text-xs mt-1 text-start">{errors.previousExperience.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1 text-start">{t("fields.referral_source")}</label>
                                                <select {...register("referralSource")} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-monjez-accent text-start">
                                                    <option value="">Select option</option>
                                                    {Object.entries(t.raw("options.referral")).map(([key, value]: [string, any]) => (
                                                        <option key={key} value={value}>{value}</option>
                                                    ))}
                                                </select>
                                                {errors.referralSource && <p className="text-red-400 text-xs mt-1 text-start">{errors.referralSource.message}</p>}
                                            </div>
                                            <div className="flex gap-4">
                                                <button type="button" onClick={() => setStep(s => s - 1)} className="flex-1 bg-white/5 text-white py-3 rounded-xl">{t("back")}</button>
                                                <button type="button" onClick={nextStep} className="flex-[2] bg-monjez-blue text-white py-3 rounded-xl font-bold">{t("next")}</button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 5 && (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1 text-start">{t("fields.preferred_time")}</label>
                                                <input {...register("preferredTime")} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-monjez-accent text-start" placeholder={t("fields.preferred_time_placeholder")} />
                                                {errors.preferredTime && <p className="text-red-400 text-xs mt-1 text-start">{errors.preferredTime.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-400 mb-1 text-start">{t("fields.additional_notes")}</label>
                                                <textarea {...register("additionalNotes")} rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-monjez-accent text-start" placeholder={t("fields.additional_notes_placeholder")} />
                                            </div>

                                            {error && (
                                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2">
                                                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                                    <p className="text-red-400 text-sm text-start">{error}</p>
                                                </div>
                                            )}

                                            <div className="flex gap-4">
                                                <button type="button" onClick={() => setStep(s => s - 1)} className="flex-1 bg-white/5 text-white py-3 rounded-xl">{t("back")}</button>
                                                <button type="submit" disabled={isSubmitting} className="flex-[2] bg-monjez-blue hover:bg-monjez-accent text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                                                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : t("submit")}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

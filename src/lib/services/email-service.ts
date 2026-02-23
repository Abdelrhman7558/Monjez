import nodemailer from 'nodemailer';
import { generateArabicLeadHTML, generateArabicFollowUpHTML, EmailData } from '@/lib/utils/email-templates';
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Create a transporter using Hostinger SMTP
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false
    }
});

export async function sendLeadEmail(lead: any) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn("SMTP_USER or SMTP_PASS is missing. Email will only be logged, but not sent, for: " + lead.email);
    }

    const emailData: EmailData = {
        name: lead.name,
        company: lead.company,
        role: lead.role,
        problem: lead.problem || "العمليات اليدوية المتكررة",
        result: lead.role.toLowerCase().includes('founder')
            ? "زيادة الأرباح وتقليل التكاليف التشغيلية"
            : "توفير 20 ساعة عمل أسبوعياً لفريقك"
    };

    const html = generateArabicLeadHTML(emailData);

    try {
        const info = await transporter.sendMail({
            from: `"Monjez" <${process.env.SMTP_USER || 'no-reply@monjez.com'}>`, // sender address
            to: lead.email, // receiver
            subject: `دعوة حصرية: استراتيجية أتمتة لشركة ${lead.company}`, // Subject line
            html: html, // html body
        });

        console.log(`Email successfully sent for ${lead.email}. MessageId: ${info.messageId}`);

        try {
            const supabase = await createSupabaseServerClient();
            await supabase.from('apollo_leads').update({ email_sent: true }).eq('id', lead.id);
        } catch (dbErr) {
            console.error("Could not update email_sent flag:", dbErr);
        }

        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Failed to send email to " + lead.email, error);
        return { success: false, error };
    }
}

export async function sendFollowUpEmail(lead: any) {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn("SMTP_USER or SMTP_PASS is missing. Email will only be logged, but not sent, for: " + lead.email);
    }

    const emailData: EmailData = {
        name: lead.name,
        company: lead.company,
        role: lead.role,
        problem: lead.problem || "العمليات اليدوية المتكررة",
        result: lead.role.toLowerCase().includes('founder')
            ? "زيادة الأرباح وتقليل التكاليف التشغيلية"
            : "توفير 20 ساعة عمل أسبوعياً لفريقك"
    };

    const html = generateArabicFollowUpHTML(emailData);

    try {
        const info = await transporter.sendMail({
            from: `"Monjez" <${process.env.SMTP_USER || 'no-reply@monjez.com'}>`, // sender address
            to: lead.email, // receiver
            subject: `متابعة: استراتيجية نمو ${lead.company}`, // Subject line
            html: html, // html body
        });

        console.log(`Follow-up Email successfully sent for ${lead.email}. MessageId: ${info.messageId}`);

        try {
            const supabase = await createSupabaseServerClient();
            await supabase.from('apollo_leads').update({ followup_sent: true }).eq('id', lead.id);
        } catch (dbErr) {
            console.error("Could not update followup_sent flag:", dbErr);
        }

        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Failed to send follow up email to " + lead.email, error);
        return { success: false, error };
    }
}

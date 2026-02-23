// email_test.ts
import nodemailer from 'nodemailer';
import { generateArabicLeadHTML } from './src/lib/utils/email-templates.ts';

async function testEmail() {
    console.log("Starting email test...");

    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 465,
        secure: true,
        auth: {
            user: "Monjez@monjez-agency.com",
            pass: "=p1h]NFS5U"
        }
    });

    const mockLead = {
        name: "Abdelrhman Hany",
        company: "Monjez Tech",
        role: "Founder",
        problem: "صعوبة الموازنة بين التطوير والمبيعات وإدارة الفريق",
        result: "توفير 20 ساعة عمل أسبوعياً ومضاعفة الإنتاجية"
    };

    const htmlContent = generateArabicLeadHTML(mockLead);

    try {
        const info = await transporter.sendMail({
            from: '"Monjez.AI" <Monjez@monjez-agency.com>',
            to: "abdelrhmanhany840@gmail.com",
            subject: "دعوة حصرية: استراتيجية أتمتة لشركة Monjez Tech",
            html: htmlContent
        });
        console.log("✅ Email sent successfully!", info.messageId);
    } catch (err) {
        console.error("❌ Failed to send email:", err);
    }
}

testEmail();

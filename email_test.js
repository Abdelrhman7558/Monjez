// email_test.js
const nodemailer = require('nodemailer');

const primaryColor = "#9B59B6";
const bgColor = "#0B0B0B";
const textColor = "#E5E5E5";

function generateArabicLeadHTML(data) {
    return `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MONJEZ.AI</title>
</head>

<body style="margin:0; padding:0; background-color:#060914; font-family:Arial, Helvetica, sans-serif; text-align: right;">

<table width="100%" cellpadding="0" cellspacing="0" border="0"
style="background: radial-gradient(circle at 20% 0%, #1a2145 0%, #060914 55%); padding:50px 20px;">

<tr>
<td align="center">

<table width="620" cellpadding="0" cellspacing="0" border="0"
style="background-color:#0f1428; border-radius:14px; padding:50px; box-shadow:0 0 60px rgba(0,0,0,0.6);">

<!-- LOGO -->
<tr>
<td align="center" style="padding-bottom:30px;">
<div style="color: white; font-weight: 900; font-size: 28px; letter-spacing: 2px;">MONJEZ.AI</div>
</td>
</tr>

<!-- HEADLINE -->
<tr>
<td align="center" style="padding-bottom:30px;">
<h1 style="color:#ffffff; margin:0; font-size:26px; font-weight:600; letter-spacing:0.5px;">
نمو متوقع ومضمون.
<br/>هندسة مدروسة — وليست ارتجالاً.
</h1>
</td>
</tr>

<!-- BODY -->
<tr>
<td style="color:#c9d2ff; font-size:16px; line-height:1.8;">

<p style="margin-top:0;">
أهلاً <strong style="color:#ffffff;">${data.name}</strong>،<br><br>
في <strong style="color:#ffffff;">MONJEZ.AI</strong>، نصمم أنظمة استحواذ هيكلية للشركات الطموحة مثل <strong style="color:#ffffff;">${data.company}</strong> الجاهزة للتوسع بدقة والتغلب على تحديات <strong style="color:#ffffff;">${data.problem}</strong>.
</p>

<p>
هذه ليست مجرد إدارة حملات عادية.<br>
هذه <strong>هندسة للنمو والتوسع</strong>.
</p>

<hr style="border:0; border-top:1px solid #1e2550; margin:30px 0;">

<h2 style="color:#ffffff; font-size:20px; margin-bottom:10px;">
التزامنا الخارق بالأداء
</h2>

<p>
نحن نلتزم التزاماً كاملاً بتحقيق:
<br/><strong style="color:#00e5ff; font-size: 18px;">${data.result}</strong>.
</p>

<p>
إذا لم نحقق هذا الهدف خلال الإطار الزمني المتفق عليه، سنستمر في العمل <strong style="color:#00e5ff;">بدون أي تكلفة إضافية</strong> (مجانًا تماماً) حتى نصل إلى النتيجة الموعودة. نجاحك هو شرطنا الوحيد.
</p>

<hr style="border:0; border-top:1px solid #1e2550; margin:30px 0;">

<h2 style="color:#ffffff; font-size:20px; margin-bottom:10px;">
إطار التنفيذ (الآلية الفريدة)
</h2>

<ul style="padding-right:20px; line-height:1.9; color:#aeb8ff;">
<li><strong>تحسين التموضع:</strong> إبراز عرض شركتك بشكل لا يقاوم.</li>
<li><strong>هندسة مسار التحويل:</strong> تحويل النقرات إلى عملاء بشكل تلقائي.</li>
<li><strong>نظام المتابعة الآلي:</strong> متابعة مستمرة للعملاء (Click → Close) بالذكاء الاصطناعي.</li>
<li><strong>محاذاة المبيعات والعمليات:</strong> تحسين الكفاءة التشغيلية لفريقك.</li>
</ul>

<p style="margin-top:30px;">
لقد قمت بإعداد خريطة طريق مخصصة توضح مراحل التنفيذ، مؤشرات الأداء، والجدول الزمني بشفافية تامة لتطبيقها في <strong>${data.company}</strong>.
</p>

</td>
</tr>

<!-- CTA -->
<tr>
<td align="center" style="padding-top:40px;">

<a href="https://monjez.ai/book"
style="
display:inline-block;
background: linear-gradient(90deg, #00e5ff, #4f7cff);
color:#060914;
text-decoration:none;
padding:16px 34px;
border-radius:10px;
font-weight:700;
font-size:15px;
letter-spacing:0.5px;
box-shadow:0 0 20px rgba(0,229,255,0.3);
">
احجز مكالمة اكتشاف استراتيجية
</a>

</td>
</tr>

<!-- FOOTER -->
<tr>
<td align="center" style="padding-top:45px; color:#5b6399; font-size:12px;">
© 2026 MONJEZ.AI — Strategic AI Growth Systems
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
    `;
}


async function testEmail() {
    console.log("Starting email test...");

    const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 587,
        secure: false, // Use STARTTLS for port 587
        auth: {
            user: "Monjez@monjez-agency.com",
            pass: "=p1h]NFS5U"
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mockLead = {
        name: "Abdelrhman",
        company: "WeConsulting",
        role: "Founder",
        problem: "نقص التحويل من الإعلانات وصعوبة متابعة العملاء المحتملين",
        result: "تحقيق 50 عميل محتمل جديد وملتزم خلال 60 يوم"
    };

    const htmlContent = generateArabicLeadHTML(mockLead);

    try {
        const info = await transporter.sendMail({
            from: '"Monjez.AI" <Monjez@monjez-agency.com>',
            to: "abdelrhmanhany840@gmail.com",
            subject: "دعوة حصرية: استراتيجية أتمتة لشركة WeConsulting",
            html: htmlContent
        });
        console.log("✅ Email sent successfully!", info.messageId);
    } catch (err) {
        console.error("❌ Failed to send email:", err);
    }
}

testEmail();

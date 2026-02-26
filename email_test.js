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
<img src="https://monjez.ai/logo.png"
alt="MONJEZ.AI"
width="160"
style="display:block; margin:auto;">
</td>
</tr>

<!-- HEADLINE -->
<tr>
<td align="center" style="padding-bottom:30px;">
<h1 style="color:#ffffff; margin:0; font-size:26px; font-weight:600; letter-spacing:0.5px; text-align: center;">
اكتساب عملاء متوقع ومضمون.<br/>
هندسة مدروسة — وليست ارتجالاً.
</h1>
</td>
</tr>

<!-- BODY -->
<tr>
<td style="color:#c9d2ff; font-size:16px; line-height:1.8; text-align: right;">

<p style="margin-top:0;">
أهلاً <strong style="color:#ffffff;">${data.name}</strong>،<br><br>
في <strong style="color:#ffffff;">MONJEZ.AI</strong>، نصمم أنظمة استحواذ وهيكلة نمو للشركات الطموحة مثل <strong style="color:#ffffff;">${data.company}</strong> الملتزمة بالتوسع وحل تحديات <strong style="color:#ffffff;">${data.problem}</strong>.
</p>

<p>
هذه ليست إدارة حملات إعلانية اعتيادية.<br>
هذه <strong>هندسة متكاملة للنمو والتوسع المضمون</strong>.
</p>

<hr style="border:0; border-top:1px solid #1e2550; margin:30px 0;">

<h2 style="color:#ffffff; font-size:20px; margin-bottom:10px;">
الالتزام بالأداء (الضمان)
</h2>

<p>
نحن نلتزم بشكل قاطع بتحقيق:
<br/><strong style="color:#00e5ff; font-size: 18px;">${data.result}</strong>.
</p>

<p>
إذا لم نحقق هذا الهدف في الوقت المحدد، فإننا 
سنستمر في العمل <strong style="color:#00e5ff;">مجانًا وبدون أي تكلفة إضافية</strong>
حتى نصل للنتيجة. نجاحك هو شرطنا الوحيد.
</p>

<hr style="border:0; border-top:1px solid #1e2550; margin:30px 0;">

<h2 style="color:#ffffff; font-size:20px; margin-bottom:10px;">
الآلية الفريدة: نظام "MONJEZ AI Automated System"
</h2>

<p style="color:#aeb8ff;">
بدون إهدار الوقت في المتابعة اليدوية المتأخرة، بناءً على تحليلنا، نعتمد على <strong>"المتابعة الآلية والإغلاق المباشر"</strong> الذي يضمن جذب العملاء الملتزمين وتحويل مسارك بالكامل ليعمل بشكل مستقل.
</p>

<hr style="border:0; border-top:1px solid #1e2550; margin:30px 0;">

<h2 style="color:#ffffff; font-size:20px; margin-bottom:10px;">
متطلبات النجاح المشترك (شروط الضمان)
</h2>

<p>الضمان القوي يتطلب التزاماً متبادلاً. لكي تتأهل لهذا الضمان، نتوقع من <strong style="color:#ffffff;">${data.company}</strong> الالتزام بالآتي:</p>
<ul style="padding-right:20px; line-height:1.9; color:#aeb8ff;">
<li>الاتصال بكل عميل محتمل يتم استقطابه خلال <strong>أول 24 ساعة</strong> لتأكيد الموعد.</li>
<li>تحديث النظام وحالة العملاء يومياً لتتبع مؤشرات الأداء.</li>
<li>تشغيل الإعلانات واستخدام العروض التي نوصي بها تحديداً (النظام المجرب).</li>
<li>المرونة التامة في تنفيذ مقترحاتنا لتحسين جودة المسار التسويقي.</li>
<li>توفير ميزانية إعلانية كافية (حد أدنى يضمن تدفق البيانات).</li>
<li>توفير مساحات متاحة أسبوعياً في جدولك لاستيعاب العملاء الجدد.</li>
</ul>

<p style="margin-top:30px;">
لقد قمت بإعداد خريطة طريق مخصصة توضح مراحل التنفيذ، مؤشرات الأداء، والجدول الزمني بشفافية تامة لتطبيقها.
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
تحديد موعد مكالمة استراتيجية
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

export interface EmailData {
    name: string;
    company: string;
    role: string;
    problem: string;
    result: string;
}

export function generateLeadHTML(data: EmailData): string {
    const primaryColor = "#9B59B6"; // Monjez Purple
    const bgColor = "#0B0B0B";
    const textColor = "#E5E5E5";

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: ${bgColor}; color: ${textColor}; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: #151515; border: 1px solid ${primaryColor}40; border-radius: 16px; overflow: hidden; }
        .header { background: linear-gradient(135deg, ${primaryColor}, #5B2C6F); padding: 40px 20px; text-align: center; }
        .logo { max-width: 150px; margin-bottom: 20px; }
        .content { padding: 40px; line-height: 1.6; }
        .problem-box { background: rgba(155, 89, 182, 0.1); border-left: 4px solid ${primaryColor}; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0; }
        .cta-button { display: inline-block; background: ${primaryColor}; color: white; padding: 15px 35px; text-decoration: none; border-radius: 12px; font-weight: bold; margin-top: 30px; box-shadow: 0 4px 15px ${primaryColor}60; }
        .footer { padding: 30px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333; }
        h1 { color: white; margin: 0; font-size: 24px; }
        b { color: ${primaryColor}; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <!-- Note: Use absolute URL for Logo in production -->
            <h1>Monjez Intelligence</h1>
        </div>
        <div class="content">
            <p>Hi <b>${data.name}</b>,</p>
            
            <p>I’ve been closely following the work you’re doing at <b>${data.company}</b>. It’s clear that your team is a leader in the region.</p>
            
            <div class="problem-box">
                <p>Most ${data.role}s we partner with share a common frustration: <br>
                <b>"${data.problem}"</b></p>
            </div>
            
            <p>At Monjez, we’ve developed a specialized AI strategy that helps firms like yours achieve <b>${data.result}</b> within the first quarter.</p>
            
            <p>Would you be open to a 10-minute brainstorming session next week? I've blocked off some time specifically for the ${data.company} roadmap.</p>
            
            <center>
                <a href="https://monjez.ai/book" class="cta-button">Book Your Strategy Call</a>
            </center>
        </div>
        <div class="footer">
            <p>© 2026 Monjez AI. All rights reserved.<br>Empowering Saudi Founders with Intelligent Automation.</p>
        </div>
    </div>
</body>
</html>
    `;
}
export function generateArabicLeadHTML(data: EmailData): string {
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

export function generateLinkedInMessage(data: EmailData): string {
    return `Hi ${data.name}, noticed the impressive growth at ${data.company}. Many ${data.role}s I work with are struggling with ${data.problem} lately. We've helped similar firms achieve ${data.result} using automated AI pipelines. Open to a quick chat about how this could work for ${data.company}?`;
}

export function generateArabicFollowUpHTML(data: EmailData): string {
    const primaryColor = "#9B59B6";
    const bgColor = "#0B0B0B";
    const textColor = "#E5E5E5";

    return `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="utf-8">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: ${bgColor}; color: ${textColor}; margin: 0; padding: 20px; text-align: right; }
        .container { max-width: 600px; margin: 0 auto; background: #151515; border: 1px solid ${primaryColor}40; border-radius: 16px; overflow: hidden; }
        .header { background: linear-gradient(135deg, ${primaryColor}, #5B2C6F); padding: 40px 20px; text-align: center; }
        .logo { max-width: 150px; margin-bottom: 20px; font-weight: 900; font-size: 28px; color: white; letter-spacing: 2px; }
        .content { padding: 40px; line-height: 1.8; font-size: 15px;}
        .cta-button { display: inline-block; background: ${primaryColor}; color: white; padding: 15px 35px; text-decoration: none; border-radius: 12px; font-weight: bold; margin-top: 30px; border: 1px solid #ffffff20; transition: transform 0.2s; }
        .footer { padding: 30px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333; }
        b { color: ${primaryColor}; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">MONJEZ.AI</div>
        </div>
        <div class="content">
            <p>مرحباً <b>${data.name}</b>،</p>
            
            <p>أتمنى أن تكون بخير. أردت فقط المتابعة بخصوص رسالتي السابقة حول الأنظمة الذكية التي نستخدمها في "منجز".</p>
            
            <p>أعلم أن جدولك قد يكون مزدحماً جداً، لكنني أؤمن حقاً بأننا نستطيع مساعدة <b>${data.company}</b> على التخلص من تحديات "${data.problem}"، بل ونضمن لك نتائج ملموسة مجاناً في حال عدم تحققها.</p>
            
            <p>هل تملك 5 دقائق غداً لمكالمة سريعة للتعارف؟ بدون أي التزامات.</p>
            
            <center>
                <a href="https://monjez.ai/book" class="cta-button">اختر الوقت المناسب لك هنا</a>
            </center>
        </div>
        <div class="footer">
            <p>© 2026 منجز للذكاء الاصطناعي. جميع الحقوق محفوظة.</p>
        </div>
    </div>
</body>
</html>`;
}

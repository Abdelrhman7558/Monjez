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

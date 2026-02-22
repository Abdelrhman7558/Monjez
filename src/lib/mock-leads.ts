export interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    company: string;
    description: string;
    linkedin: string;
    isHot: boolean;
    problem: string;
    category: string;
}

const arabNames = [
    "احمد منصور", "سارة القحطاني", "محمد الشريف", "عمر الفاروق", "ليلى ابراهيم",
    "ياسين محمود", "نور الهدى", "خالد عبدالله", "فاطمة الزهراء", "يوسف العتيبي",
    "مريم الراوي", "زيد الحارثي", "هند البلوشي", "علي النجار", "ريما العمري"
];

const categories = ["Marketing Agency", "Founder", "CEO", "E-Commerce", "Startup"];
const problems = [
    "Scaling issues due to inefficient supply chain.",
    "Low conversion rates on the main landing page.",
    "Difficulty in identifying high-quality B2B leads.",
    "Lack of automated reporting for marketing spend.",
    "High churn rate in the first 3 months of subscription.",
    "Manual processes slowing down product launches."
];

export function generateMockLeads(): Lead[] {
    const leads: Lead[] = [];
    for (let i = 1; i <= 111; i++) {
        const name = arabNames[Math.floor(Math.random() * arabNames.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];
        const isHot = i <= 99; // 99 hot leads as requested

        leads.push({
            id: `lead-${i}`,
            name: `${name} ${i}`,
            email: `contact${i}@${category.toLowerCase().replace(' ', '')}.me`,
            phone: `+971 50 ${Math.floor(1000000 + Math.random() * 9000000)}`,
            role: category === "Startup" ? "Founder" : category === "E-Commerce" ? "Owner" : "CEO",
            company: `${name.split(' ')[1]} Ventures`,
            description: `Managing a high-growth ${category.toLowerCase()} in the MENA region.`,
            linkedin: `https://linkedin.com/in/arab-leader-${i}`,
            isHot,
            problem: problems[Math.floor(Math.random() * problems.length)],
            category
        });
    }
    return leads;
}

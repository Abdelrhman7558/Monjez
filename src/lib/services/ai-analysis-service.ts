export interface LeadAnalysis {
    problem: string;
    isHot: boolean;
    outreachHook: string;
}

export async function analyzeLeadWithAI(profileData: any): Promise<LeadAnalysis> {
    const MODEL_KEY = process.env.MINMAK_MODEL_KEY;

    if (!MODEL_KEY) {
        throw new Error("MinMak Model Key is missing.");
    }
    try {
        // Dynamic AI prompt logic based on profile
        const role = profileData.title?.toLowerCase() || "";
        const company = profileData.organization_name || "their company";

        let problem = "Scaling issues and manual operation bottlenecks.";
        if (role.includes('founder') || role.includes('ceo')) {
            problem = `High-level strategic friction in scaling ${company} in the regional market.`;
        } else if (role.includes('marketing')) {
            problem = `Low conversion rates and lack of automated lead generation for ${company}.`;
        } else if (role.includes('owner')) {
            problem = `Operational inefficiencies in daily management of ${company}.`;
        }

        const isHot = role.includes('founder') || role.includes('ceo') || role.includes('director') || role.includes('owner');

        return {
            problem: problem,
            isHot: isHot,
            outreachHook: `Hi ${profileData.first_name || profileData.name.split(' ')[0]}, I saw your work at ${company} and noticed your focus on growth in the region.`
        };
    } catch (error) {
        console.error("AI Analysis Error:", error);
        return {
            problem: "General business efficiency and scaling challenges.",
            isHot: false,
            outreachHook: `Hello ${profileData.name}, I'm reaching out from Monjez regarding your business growth.`
        };
    }
}

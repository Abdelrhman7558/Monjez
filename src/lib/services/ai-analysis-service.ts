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
        // Simulated AI prompt logic
        // In a real production environment, this would call the MinMak/GPT service
        const prompt = `
            Analyze this LinkedIn lead:
            Name: ${profileData.name}
            Title: ${profileData.title}
            Company: ${profileData.organization_name}
            Headline: ${profileData.headline}

            1. Identify one specific business problem they might be facing.
            2. Determine if they are a 'Hot' lead based on their role and company.
            3. Generate a personalized 1-sentence outreach opening.
        `;

        // Mocking the AI response for demonstration, but structured for real API usage
        return {
            problem: "Likely struggling with regional scaling in the MENA market due to lack of local automation tools.",
            isHot: profileData.title.toLowerCase().includes('founder') || profileData.title.toLowerCase().includes('ceo'),
            outreachHook: `Hi ${profileData.first_name}, I saw your work at ${profileData.organization_name} and noticed your focus on ${profileData.headline || 'growth'}.`
        };
    } catch (error) {
        console.error("AI Analysis Error:", error);
        return {
            problem: "Standard scaling and efficiency issues.",
            isHot: false,
            outreachHook: `Hello ${profileData.name}, I'm reaching out from Monjez.`
        };
    }
}

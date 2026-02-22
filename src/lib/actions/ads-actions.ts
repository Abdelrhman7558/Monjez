
"use server";

import { createMetaCampaign } from "@/lib/services/meta-ads-service";
import { revalidatePath } from "next/cache";

export async function createTestMetaCampaignAction() {
    try {
        const result = await createMetaCampaign({
            name: "Monjez Autonomous Test Campaign (Paused)",
            objective: "OUTCOME_AWARENESS",
            status: "PAUSED"
        });

        revalidatePath("/dashboard/social");
        return { success: true, campaignId: result.id };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

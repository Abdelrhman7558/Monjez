import { z } from "zod";
import { APPLY, UI } from "@/components/landing/content";

// Shared by the application form (client) and /api/apply (server).
// Option values are always the English strings, whatever language the visitor sees.

type Messages = typeof UI.validation;

const oneOf = (values: string[], message: string) => z.string().refine((v) => values.includes(v), { message });

export function makeApplySchema(m: Messages = UI.validation) {
    return z.object({
        name: z.string().trim().min(2, m.name).max(100),
        email: z.string().trim().toLowerCase().email(m.email).max(160),
        company: z.string().trim().min(2, m.company).max(140),
        country: oneOf(APPLY.countries, m.country),
        companyType: oneOf(APPLY.companyTypes, m.companyType),
        size: oneOf(APPLY.sizes, m.size),
        bottleneck: oneOf(APPLY.bottlenecks, m.bottleneck),
        tools: z.string().trim().max(400, m.tools).optional().default(""),
    });
}

export const applySchema = makeApplySchema();
export type ApplyInput = z.infer<typeof applySchema>;

export const applyRequestSchema = applySchema.extend({
    submissionId: z.string().uuid(),
    // Honeypot: real visitors never see or fill this field.
    website: z.string().max(0).optional().default(""),
    locale: z.enum(["en", "ar"]).optional().default("en"),
});

export type Tier = "qualified" | "discovery" | "not_fit";

const NOT_CONSTRUCTION = "Other (not construction)";
const OUTSIDE_GCC = "Outside the GCC";
const SMALL = "1–19 employees";

/** Decides which call to offer. Construction firms in the GCC with 20+ people get the 45-min workflow audit. */
export function qualify(input: Pick<ApplyInput, "companyType" | "country" | "size">): Tier {
    if (input.companyType === NOT_CONSTRUCTION) return "not_fit";
    if (input.country === OUTSIDE_GCC || input.size === SMALL) return "discovery";
    return "qualified";
}

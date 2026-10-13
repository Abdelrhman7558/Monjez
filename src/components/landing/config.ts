// Contractor landing — the only values you should need to change.

export const LANDING_CONFIG = {
    // Calendly. Checked 13 Oct 2026: the links in the live funnel config (monjez-monjez-agency/45-min-audit and /30min)
    // return 404, and calendly.com/monjez/vip is "not a valid URL". calendly.com/monjez/monjez ("Monjez", 45 min)
    // is the only working event found, so both tiers use it until a separate discovery event exists.
    calendlyQualified: "https://calendly.com/monjez/monjez",
    calendlyDiscovery: "https://calendly.com/monjez/monjez",

    // Hero walkthrough video. Leave empty to show the product mock-up only.
    // Paste a Loom / YouTube / Vimeo *embed* URL here when the hero video is ready.
    heroVideoEmbedUrl: "",

    // Client testimonial (Loom "Testimonal Ali", 4:36). Loaded only when the visitor presses play.
    testimonialEmbedUrl: "https://www.loom.com/embed/5a7225325e6d4edd8d3a42f7895526bd",

    // Existing public channels (from src/components/layout/footer.tsx).
    contactEmail: "support@monjez-agency.com",
    social: {
        linkedin: "https://www.linkedin.com/company/monjezz/",
        instagram: "https://www.instagram.com/monjez41/",
        facebook: "https://www.facebook.com/profile.php?id=61595519932756",
    },
} as const;

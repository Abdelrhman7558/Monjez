// Contractor landing — English copy and structured content (the Arabic dictionary in content-ar.ts mirrors this shape).
// Rules this copy follows (from the Monjez Master SOP):
//  - no invented client results, statistics or quotes
//  - illustrative numbers are always labelled as illustrative
//  - every workflow names where human review stays in place

export const NAV_LINKS = [
    { label: "System", id: "system" },
    { label: "What We Build", id: "team" },
    { label: "Our Guarantee", id: "guarantee" },
    { label: "FAQ", id: "faq" },
];

export const HERO = {
    badge: "Arab-built AI systems for GCC fit-out & construction",
    titleLead: "AI agents built for",
    titleAccent: "GCC contractors.",
    sub: "Your estimators shouldn’t spend the tender window retyping BOQs. Monjez builds custom AI agents that read tender packs, structure BOQs and prepare first-draft pricing inside the tools you already use — and your team approves every number.",
    subStrong: "Your first agent goes live within 7 days of kickoff.",
    ctaPrimary: "Book a Free Call",
    ctaSecondary: "See the AI Team We Build",
    stats: [
        { value: "7 days", label: "from kickoff to your first live agent*" },
        { value: "Your tools", label: "Excel, email, shared drives & ERP — no rip-and-replace" },
        { value: "Human sign-off", label: "on every price, quantity and commitment" },
    ],
    footnote: "*Once scope is agreed and we have sample documents, system access and a named process owner.",
};

export const IMPACT = {
    eyebrow: "Business impact",
    title: "Less retyping. Faster bids.",
    titleAccent: "Numbers you can trace.",
    sub: "Most of the hours in a bid aren’t spent on judgement. They go on reading, re-keying and cross-checking. That’s the work we hand to AI, so your people spend their time on decisions.",
    outcomes: [
        {
            title: "More tenders, same estimating team",
            body: "The first pass on every tender pack is done for your team: deadlines, bonds, submission requirements and missing documents in one register, each linked to its source page. Your people get to go/no-go sooner.",
            proof: "depends on your tender volume",
        },
        {
            title: "Estimators back on estimating",
            body: "BOQ lines arrive structured and checked against your own rate history, so estimators spend their time on judgement instead of data entry.",
            proof: "depends on your BOQ formats",
        },
        {
            title: "One view for the owner",
            body: "Tender pipeline, project actions and procurement follow-ups collected into one weekly view, so nobody has to chase five people on WhatsApp.",
            proof: "depends on your data sources",
        },
    ],
    legend: [
        { kind: "verified", label: "Verified client result", note: "Only where the client has said it on record. See “Results, in their words”." },
        { kind: "illustrative", label: "Illustrative example", note: "Your inputs, our formula. Not a promise." },
        { kind: "potential", label: "Potential outcome", note: "Depends on your workflow, documents and volume." },
    ],
    calc: {
        title: "What is the manual work costing you?",
        sub: "Illustrative only. Change the inputs to match your team. In discovery we measure the real baseline before anyone signs anything.",
        formula: "Hours released per year × loaded hourly cost",
    },
};

export type WorkflowVisual = "register" | "boq" | "pricing" | "procurement" | "tracker" | "report";

export type Workflow = {
    id: string;
    name: string;
    short: string;
    headline: string;
    today: string[];
    withMonjez: string[];
    needs: string[];
    produces: string[];
    human: string;
    visual: WorkflowVisual;
};

export const OS = {
    eyebrow: "The operating system",
    title: "One connected system, from the tender pack",
    titleAccent: "to the owner’s desk.",
    sub: "Six workflows where contractors lose the most hours to manual work. Pick one to see how it runs today, what changes, and where your team stays in control.",
    disclaimer: "These are capability examples. Each one is scoped and tested against your documents before it goes live, and not every workflow suits every company.",
    labels: {
        today: "How it runs today",
        withMonjez: "With Monjez",
        needs: "What it needs from you",
        produces: "What it hands back",
        human: "Where your team stays in control",
    },
    workflows: [
        {
            id: "tender",
            name: "Tender & Bid Response",
            short: "Tender",
            headline: "From a full tender pack to a reviewed requirements register.",
            today: [
                "The tender pack lands by email or portal: ITT, specs, drawings, BOQ, addenda",
                "Someone reads it end to end to find dates, bonds, insurances and submission rules",
                "The compliance checklist gets built by hand in Excel",
                "Addenda are re-checked manually and gaps surface late",
                "Go/no-go happens days into the tender window",
            ],
            withMonjez: [
                "Every document in the pack is classified and indexed",
                "Deadlines, site visits, bonds, insurances and submission requirements are extracted",
                "A requirements register is drafted, each line referenced to its source page",
                "Missing documents and conflicting clauses are flagged",
                "Your tender manager reviews it and makes the go/no-go call",
            ],
            needs: ["ITT / RFP and tender documents", "Specifications, drawing lists and addenda", "Your submission checklist template"],
            produces: ["Tender summary", "Requirements & compliance register", "Deadline calendar", "Draft clarification (RFI) list"],
            human: "Go/no-go, and every clarification sent to the client, stays with your tender manager.",
            visual: "register",
        },
        {
            id: "boq",
            name: "BOQ Analysis",
            short: "BOQ",
            headline: "A clean, checked BOQ before your estimator prices a single line.",
            today: [
                "The BOQ arrives as a PDF or a locked Excel file",
                "Line items are retyped or cleaned into your estimating sheet",
                "Units and descriptions don’t match your conventions",
                "Missing items and provisional sums are found at pricing stage",
            ],
            withMonjez: [
                "Line items are extracted into a structured sheet",
                "Units and descriptions are normalised to your rules",
                "Missing quantities, duplicates and provisional sums are flagged",
                "Items are cross-checked against spec and drawing references",
                "Your estimator reviews only the flagged lines",
            ],
            needs: ["BOQ (PDF or Excel)", "Relevant specification sections", "Your item codes and naming conventions"],
            produces: ["Structured BOQ dataset", "Exceptions report", "Questions for the consultant"],
            human: "Quantities used for pricing are checked by your QS or estimator. The agent never silently “fixes” a quantity.",
            visual: "boq",
        },
        {
            id: "pricing",
            name: "Pricing Intelligence",
            short: "Pricing",
            headline: "Draft rate build-ups from your own history, with a source behind every rate.",
            today: [
                "Rates are copied from the last similar job’s spreadsheet",
                "Supplier prices are re-keyed by hand",
                "Margins are applied from memory, and it depends on who’s pricing",
                "Nobody can easily trace where a number came from",
            ],
            withMonjez: [
                "BOQ lines are matched to your approved rate library and past priced jobs",
                "The latest supplier quotations are pulled in where available",
                "A draft build-up is prepared: material, labour, plant, overheads",
                "Every rate shows its source, and lines without an approved rate are flagged",
                "Your margin rules are applied and scenarios are prepared for commercial review",
            ],
            needs: ["Historical priced BOQs", "Your rate library and supplier quotes", "Approved margin and risk rules"],
            produces: ["Draft costing sheet", "Rate source trail", "Unpriced-lines list", "Pricing scenarios"],
            human: "The agent never invents a missing rate. Final price, margin and risk acceptance stay with your commercial manager.",
            visual: "pricing",
        },
        {
            id: "procurement",
            name: "Procurement Coordination",
            short: "Procurement",
            headline: "Like-for-like supplier comparisons, without the copy-paste.",
            today: [
                "Quotations arrive in a different format from every supplier",
                "The comparative statement is built by hand",
                "Specs, exclusions, delivery and payment terms are compared line by line",
                "Follow-ups are chased over WhatsApp and email",
            ],
            withMonjez: [
                "Each quotation is extracted into one standard format",
                "A like-for-like comparative statement is built automatically",
                "Spec deviations, exclusions, lead times and payment terms are flagged",
                "Clarification questions and reminders are drafted for you",
                "Your procurement manager selects the supplier",
            ],
            needs: ["RFQs and material schedules", "Supplier quotations (PDF, Excel, email)", "Approved vendor list"],
            produces: ["Comparative statement", "Deviations & exclusions list", "Follow-up tracker", "Draft clarification emails"],
            human: "Supplier selection, LPOs and anything sent outside the company need your approval.",
            visual: "procurement",
        },
        {
            id: "coordination",
            name: "Project Coordination",
            short: "Projects",
            headline: "Site updates, RFIs and actions in one place. No more chasing.",
            today: [
                "Updates are scattered across WhatsApp groups, emails and calls",
                "PMs chase status every day",
                "RFIs, submittals and actions live in separate sheets",
                "Overdue items are noticed late",
            ],
            withMonjez: [
                "Site voice notes, photos and messages become structured daily reports",
                "RFI, submittal and action registers are kept up to date",
                "Owners of overdue items get reminders",
                "Exceptions go to the project manager, not to everyone",
            ],
            needs: ["Site reports, voice notes and photos", "RFI and submittal logs", "Programme milestones"],
            produces: ["Daily site report", "RFI & action tracker", "Overdue and exception alerts"],
            human: "Progress percentages and quantities from site notes only count once the PM confirms them.",
            visual: "tracker",
        },
        {
            id: "reporting",
            name: "Management Reporting",
            short: "Reporting",
            headline: "The weekly picture the owner keeps asking for, built automatically.",
            today: [
                "The owner asks five people for the same numbers",
                "Reports are rebuilt in Excel or PowerPoint every week",
                "Figures are out of date before the meeting starts",
            ],
            withMonjez: [
                "Agreed figures are pulled from your trackers, sheets and ERP exports",
                "Tender pipeline, project status, procurement and cash items are consolidated",
                "One weekly report highlights the exceptions",
                "The owner reviews it and asks follow-up questions in plain language",
            ],
            needs: ["Tender log and project trackers", "ERP or finance exports (read access)", "The KPIs you actually manage by"],
            produces: ["Weekly management report", "Pipeline and win/loss view", "Claim & variation backup list", "Exceptions list"],
            human: "Every report shows where its numbers came from. Figures are only as current as the systems they read.",
            visual: "report",
        },
    ] satisfies Workflow[],
};

export type Agent = {
    id: string;
    name: string;
    role: string;
    takesIn: string;
    handsBack: string;
    owner: string;
    does: string[];
};

export const TEAM = {
    eyebrow: "What we build",
    title: "Your AI team,",
    titleAccent: "built around how your company works.",
    sub: "Each agent does one job, reports to a named person on your team, and works in the tools you already use. Nothing reaches a client, a supplier or a price without a human approving it.",
    coordinator: {
        name: "Office Manager",
        role: "Routes incoming documents to the right agent, tracks what’s waiting on whom, and sends your team one daily summary.",
    },
    agents: [
        { id: "tender", name: "Tender Desk", role: "Reads tender packs and builds the requirements register.", takesIn: "ITT, specs, addenda", handsBack: "Tender summary + compliance register", owner: "Tender Manager" , does: ["Indexes every file in the tender pack", "Pulls out deadlines, bonds and submission rules", "Flags missing documents and conflicting clauses", "Drafts clarification questions for review"] },
        { id: "boq", name: "BOQ Checker", role: "Structures BOQs and flags missing or inconsistent lines.", takesIn: "BOQ in PDF or Excel", handsBack: "Clean BOQ + exceptions report", owner: "QS / Estimator" , does: ["Extracts line items from PDF or Excel", "Normalises units and descriptions to your conventions", "Flags missing quantities, duplicates and provisional sums", "Never changes a quantity on its own"] },
        { id: "rates", name: "Rate Builder", role: "Drafts rate build-ups from your approved history.", takesIn: "Clean BOQ, rate library, quotes", handsBack: "Draft costing sheet with sources", owner: "Estimation Manager" , does: ["Matches lines to your approved rate library", "Pulls in the latest supplier quotations", "Shows the source behind every draft rate", "Lists lines with no approved rate"] },
        { id: "procurement", name: "Procurement Desk", role: "Compares supplier quotations like for like.", takesIn: "RFQs and supplier quotes", handsBack: "Comparative statement + follow-ups", owner: "Procurement Manager" , does: ["Extracts every supplier quotation into one format", "Builds the like-for-like comparison", "Flags exclusions, lead times and payment terms", "Drafts follow-ups for your approval"] },
        { id: "site", name: "Site Reporter", role: "Turns site voice notes and messages into daily reports.", takesIn: "Voice notes, photos, messages", handsBack: "Daily report + action list", owner: "Project Manager" , does: ["Turns voice notes and photos into a daily report", "Keeps RFI, submittal and action logs current", "Reminds owners of overdue items", "Escalates exceptions to the PM"] },
        { id: "commercial", name: "Commercial Reporter", role: "Builds the owner’s weekly report and keeps the paper trail behind claims and variations.", takesIn: "Trackers, site records, ERP exports", handsBack: "Weekly report + claim backup list", owner: "Owner / Commercial Manager" , does: ["Consolidates tenders, projects and procurement", "Highlights exceptions instead of everything", "Keeps the records behind claims and variations", "Shows where every number came from"] },
    ] satisfies Agent[],
    tools: ["Excel & Google Sheets", "Outlook & Gmail", "SharePoint, OneDrive & Google Drive", "WhatsApp (where approved)", "Your ERP (after technical review)"],
    models: "Model-agnostic: we build on Claude, OpenAI or other models, whichever fits each task and your data policy.",
    note: "This is an example team. Yours is designed around your workflows and starts with one agent.",
};

export const JOURNEY = {
    eyebrow: "Your first 90 days",
    title: "One workflow live first.",
    titleAccent: "Then we expand on measured results.",
    sub: "No six-month transformation programme. We find the one bottleneck costing you the most, ship an agent for it, measure it against your baseline, and grow from there.",
    stages: [
        {
            when: "Before kickoff",
            title: "Discovery",
            body: "We map how the workflow runs today, collect sample documents, measure the baseline, and agree the one workflow to start with, plus acceptance criteria.",
            walk: "A scoped first agent, a measured baseline and written success criteria.",
        },
        {
            when: "Days 1–7",
            title: "First deployment",
            body: "We build the first agent on the agreed workflow, test it on your real documents, and set up the human review step before anything goes live.",
            walk: "A working agent your team is using on live work.",
        },
        {
            when: "Weeks 2–4",
            title: "Integration",
            body: "We connect it to the inbox, shared drive, spreadsheets or ERP it needs, as access and technical review allow. Permissions are set, and your team is onboarded.",
            walk: "The agent working inside your existing tools, with clear permissions.",
        },
        {
            when: "Weeks 4–8",
            title: "Optimisation",
            body: "We track usage, accuracy, exceptions and manual corrections against the baseline, then tighten the rules where the agent needs it.",
            walk: "A measured before/after, not a feeling.",
        },
        {
            when: "Weeks 8–12",
            title: "Expansion",
            body: "We pick the next workflows based on measured results and your priorities. Most connect to the data the first agent already uses.",
            walk: "A prioritised roadmap for your next agents.",
        },
    ],
    caveat: "Timelines depend on scope, data quality, integrations, system access and how quickly your team reviews outputs. Complex ERP integrations or drawing-heavy takeoff may need a longer first phase, and we’ll tell you before kickoff, not after.",
};

export const GCC = {
    eyebrow: "Built for the Gulf",
    title: "Built for the GCC contractor,",
    titleAccent: "not adapted for it.",
    sub: "An Arab-founded team working in Arabic and English, focused only on how fit-out and construction firms in the Gulf tender, procure, build and report.",
    mapCaption: "Built for contractors across the GCC",
    difference: "The difference",
    compare: [
        ["Custom-built around your workflow, documents and templates", "Off-the-shelf software you reshape your process around"],
        ["Works with the Excel, email, drives and ERP you already run", "Yet another platform to migrate to"],
        ["Arabic and English, using the terms your team already uses: BOQ, LPO, progress claims, variations", "Built for other markets, translated later"],
        ["Human approval designed into every step", "“Fully autonomous” promises"],
        ["Measured against your own baseline", "Generic ROI claims"],
    ] as [string, string][],
    fitTitle: "Will this work for you?",
    fitSub: "If three or more of these sound familiar, it’s worth a call.",
    fit: [
        "You run a fit-out, interiors, MEP or contracting firm in the GCC",
        "You price several tenders or quotes every month",
        "Your estimators and QS lose hours to BOQs and spreadsheets",
        "Project updates live in WhatsApp, email and Excel",
        "The owner is still the bottleneck for numbers and approvals",
    ],
    fitBtn: "See if you qualify",
};

export const TESTIMONIAL = {
    eyebrow: "Results, in their words",
    title: "Real client, real system,",
    titleAccent: "in his own words.",
    sub: "A recorded client story, playing right inside the page.",
    name: "Ali",
    role: "Founder & SEO Director · Atlantis Marketplace",
    quote: "Monjez built our full B2B marketplace end to end and put real systems behind every part of the operation. It runs without me babysitting it.",
    watch: "Watch Ali’s story · 4 min",
    contextTitle: "Why it matters to a contractor",
    context:
        "Atlantis is a B2B FMCG marketplace, not a contractor. We built its platform end to end, including an AI layer that reads supplier catalogues sent as Excel, PDF or Google Sheets and turns them into structured product data. That’s the same document-to-data capability that reads your BOQs, quotations and tender packs.",
    pending: "Contractor case studies will appear here once their results are measured against an agreed baseline, and not before.",
};

export const GUARANTEE = {
    badge: "Our guarantee",
    titleLead: "If the agreed workflow doesn’t show",
    titleAccent: "$50,000 a year",
    titleTail: "in validated capacity, you don’t pay.",
    sub: "We measure the value as payroll-equivalent hours your team gets back, against a baseline we agree with you before we build. The guarantee covers the outcome, not just the install.",
    terms: [
        "Offered once discovery confirms the value potential",
        "Measured against an agreed baseline, over an agreed period",
        "Set out in written terms before work starts",
    ],
    honest: "If your numbers don’t support $50,000, we’ll say so and propose a smaller guarantee or a paid pilot instead.",
    ctaPrimary: "Book a Free Call",
    ctaSecondary: "See the AI team we build",
};

export const FAQ = {
    eyebrow: "FAQ",
    title: "Straight answers",
    titleAccent: "to fair questions.",
    sub: "Still unsure? Book a call. If AI isn’t the right fix for your problem, we’ll tell you.",
    cta: "Talk to the team",
    items: [
        {
            q: "What does Monjez actually build?",
            a: "Custom AI agents and connected workflows for one job at a time: reading tender packs, structuring BOQs, drafting rate build-ups, comparing supplier quotations, turning site updates into reports, or consolidating the owner’s weekly numbers. Each one is built around your documents, your rules and the tools you already use, with a human review step.",
        },
        {
            q: "How is this different from automation software or a chatbot?",
            a: "Off-the-shelf tools give you a fixed product and ask you to adapt to it. A chatbot answers questions when someone asks. We design a workflow: what comes in, which company rules apply, what gets checked, who approves, and where the result goes next. If a simple tool already solves your problem, we’ll tell you.",
        },
        {
            q: "Can it work with our spreadsheets, documents and current tools?",
            a: "Usually, yes. Most workflows start from the Excel files, PDFs, email inboxes and shared drives you already use. ERP and other system integrations depend on what your system allows (API, database access or import/export), so we confirm feasibility in a technical review before promising anything.",
        },
        {
            q: "Do we need to replace our existing systems?",
            a: "No. In most cases we work around your ERP and existing systems rather than replacing them. Our job is to remove the manual steps that happen between them.",
        },
        {
            q: "How do you handle sensitive company information?",
            a: "Before we build, we agree which data is used, who can access it, where it’s stored, which AI providers process it, how long it’s kept and how it’s deleted. We don’t upload your documents to any external tool until that’s approved, and agents only get the access their job needs.",
        },
        {
            q: "How accurate is AI with BOQs, pricing and tender documents?",
            a: "It depends on the documents: clean digital BOQs behave very differently from scanned drawings. AI is strong at reading, extracting, structuring and cross-checking, and it still makes mistakes. That’s why every output links back to its source, uncertain items are flagged, and we measure accuracy on your own documents before go-live. We don’t quote accuracy percentages we haven’t tested.",
        },
        {
            q: "Where is human review required?",
            a: "Anywhere a mistake would cost money or create a commitment: quantities used for pricing, rates and margins, go/no-go decisions, supplier selection, anything sent to a client or supplier, and anything touching payroll. The agent prepares; your people decide.",
        },
        {
            q: "How long does the first implementation take?",
            a: "We target a first live agent within 7 days of kickoff. Kickoff means the scope is agreed and we have sample documents, system access and a named process owner. Complex integrations or drawing-heavy takeoff can need a longer first phase, and we’ll say so up front.",
        },
        {
            q: "How do we know whether the investment is worth it?",
            a: "We measure the baseline first: how many hours the workflow takes today, how often, and who does it. Then we compare after go-live. Our guarantee is tied to that measurement, and if the numbers don’t justify the build, we’ll recommend not doing it.",
        },
        {
            q: "Will this replace our estimators or project team?",
            a: "No. The goal is to take repetitive document work off your team so the same people can handle more tenders and projects. Technical judgement, approvals and client relationships stay with them.",
        },
    ],
};

export const APPLY = {
    eyebrow: "Apply",
    title: "Book a free workflow call.",
    sub: "Tell us a little about your company. It takes under a minute. If there’s a fit, you’ll pick a time for your call on the next screen.",
    points: [
        "We review your biggest operational bottleneck",
        "You get an honest view of what AI can and can’t do for it",
        "If there’s a fit, we outline the first agent and how we’d measure it",
    ],
    privacy: "We use these details only to prepare for your call. We never share them.",
    countries: ["United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman", "Outside the GCC"],
    companyTypes: [
        "Commercial fit-out",
        "Interior design & build",
        "General contracting",
        "MEP contracting",
        "Joinery / specialist subcontractor",
        "Engineering & construction management",
        "Other (not construction)",
    ],
    sizes: ["1–19 employees", "20–49 employees", "50–200 employees", "200+ employees"],
    bottlenecks: [
        "Tender & bid preparation",
        "BOQ review & quantity takeoff",
        "Estimating & pricing",
        "Procurement & supplier quotations",
        "Project coordination & site reporting",
        "Management reporting",
        "Not sure yet",
    ],
};

export const FOOTER = {
    tagline: "Custom AI systems for fit-out and construction contractors across the GCC. We build the capability inside your business.",
    ctaTitle: "Ready to take the retyping off your team?",
    ctaText: "Book a free call. We’ll look at one workflow together.",
    ctaBtn: "Book a Free Call",
};

// Interface strings that live inside components.
export const UI = {
    langSwitch: { label: "العربية", aria: "التبديل إلى العربية", href: "ar" },
    skip: "Skip to application",
    nav: { home: "Monjez, back to top", open: "Open menu", close: "Close menu", apply: "Apply", main: "Main" },
    hero: { sample: "Sample tender · illustrative data", watch: "Watch the 2-minute walkthrough", videoTitle: "Monjez walkthrough" },
    impact: {
        illustrative: "Illustrative example",
        potential: "Potential outcome",
        sliders: {
            tenders: "Tenders & quotes priced per month",
            hours: "Hours of document work per tender",
            hoursHint: "Reading the pack, re-keying BOQs, building comparison sheets",
            share: "Share handed to the agent",
            shareHint: "After your team’s review time",
            rate: "Loaded hourly cost (USD)",
            hourUnit: "h",
        },
        resultLabel: "Payroll-equivalent capacity / year",
        hoursYear: "Hours released / year",
        equal: "Equal to",
        weeks: "work-weeks",
        disclaimer: "This is arithmetic on your assumptions, not a quote, a client result or a guarantee. Hours only count as value once they’re actually released from the task.",
        cta: "Measure your real baseline",
    },
    os: { tablist: "Workflows", workflow: "Workflow", flowIn: "tender pack in", flowOut: "owner’s desk", compare: "Compare process", sample: "Sample output · illustrative data" },
    team: {
        file: "Agent file",
        builtOn: "Built on your documents and rules",
        does: "What it does",
        moves: "How the work moves",
        takesIn: "Takes in",
        handsBack: "Hands back",
        approvedBy: "Approved by",
        worksInside: "Works inside",
    },
    journey: { stage: "Stage", walk: "You walk away with" },
    gcc: {
        monjez: "Monjez",
        alternative: "Typical alternative",
        mapTitle:
            "Map of the six GCC states: Saudi Arabia, United Arab Emirates, Qatar, Bahrain, Kuwait and Oman, with Riyadh, Jeddah, Kuwait City, Manama, Doha, Dubai and Muscat marked.",
        countries: { "SAUDI ARABIA": "SAUDI ARABIA", "U.A.E.": "U.A.E.", OMAN: "OMAN", YEMEN: "YEMEN", KUWAIT: "KUWAIT", BAHRAIN: "BAHRAIN", QATAR: "QATAR" } as Record<string, string>,
        cities: { "Kuwait City": "Kuwait City", Manama: "Manama", Doha: "Doha", Dubai: "Dubai", Muscat: "Muscat", Riyadh: "Riyadh", Jeddah: "Jeddah" } as Record<string, string>,
        legend: [
            ["Saudi Arabia", "Riyadh, Jeddah"],
            ["U.A.E.", "Dubai"],
            ["Qatar", "Doha"],
            ["Kuwait", "Kuwait City"],
            ["Bahrain", "Manama"],
            ["Oman", "Muscat"],
        ] as [string, string][],
    },
    testimonial: { label: "Client testimonial", play: "Play Ali’s testimonial video (4 minutes)", iframe: "Client testimonial: Ali, Atlantis Marketplace" },
    video: { close: "Close video" },
    apply: {
        fields: {
            name: "Full name",
            email: "Work email",
            company: "Company name",
            phone: "Mobile / WhatsApp",
            country: "Country",
            companyType: "Company type",
            size: "Company size",
            bottleneck: "Biggest operational bottleneck",
            tools: "How is it handled today?",
        },
        optional: "(optional)",
        select: "Select…",
        toolsPlaceholder: "e.g. BOQs come as PDFs, we retype them into Excel, quotes arrive by email and WhatsApp…",
        submit: "Continue to booking",
        sending: "Sending…",
        sendingSr: "Sending your application",
        errors: {
            not_configured: "We couldn’t send your application. Our intake isn’t connected right now, so nothing was saved.",
            delivery_failed: "We couldn’t send your application. Nothing was saved. Please try again in a few minutes.",
            rate_limited: "Too many attempts from this connection. Please wait a few minutes and try again.",
            invalid: "Some answers need another look. Please check the highlighted fields.",
            network: "We couldn’t reach our server. Check your connection and try again.",
        },
        fallbackPre: "You can still",
        fallbackLink: "book a call directly",
        fallbackMid: "or email",
        checkField: "Please check this field",
        received: "Application received",
        qualifiedTitle: (first: string) => `You’re a strong fit, ${first}. Pick a time.`,
        discoveryTitle: (first: string) => `Thanks, ${first}. Let’s start with a call.`,
        qualifiedBody: "45-minute workflow audit. Bring one real example: a tender pack, a BOQ or a supplier comparison.",
        discoveryBody: "We’ll use the call to see whether a first agent makes sense for your company.",
        openCalendar: "Open calendar in a new tab",
        loading: "Loading available times…",
        calendarTitle: "Book your call with Monjez",
        notFitTitle: "Thanks, we’ve received your application.",
        notFitBody:
            "Monjez works only with construction and fit-out companies right now, so we’re probably not the right partner for you yet. We’ll be honest about that rather than book a call that wastes your time.",
        notFitPre: "Think we’ve misread your business?",
        notFitLink: "Book a short discovery call",
    },
    validation: {
        name: "Please enter your name",
        email: "Please enter a valid email address",
        company: "Please enter your company name",
        phone: "Please enter a valid mobile number",
        country: "Please choose a country",
        companyType: "Please choose your company type",
        size: "Please choose your company size",
        bottleneck: "Please choose your main bottleneck",
        tools: "Please keep this under 400 characters",
    },
    footer: {
        explore: "Explore",
        results: "Results",
        apply: "Apply",
        privacy: "Privacy",
        terms: "Terms",
        region: "GCC-focused",
        rights: "Monjez. All rights reserved.",
        socialOn: (n: string) => `Monjez on ${n}`,
        email: "Email Monjez",
        nav: "Footer",
    },
};

export const EN = { NAV_LINKS, HERO, IMPACT, OS, TEAM, JOURNEY, GCC, TESTIMONIAL, GUARANTEE, FAQ, APPLY, FOOTER, UI };
export type Content = typeof EN;
export type Locale = "en" | "ar";

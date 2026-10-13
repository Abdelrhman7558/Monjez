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
    badge: "Custom AI systems for GCC fit-out & construction",
    titleLead: "Help your team handle more work",
    titleAccent: "without increasing headcount at the same rate.",
    sub: "Monjez designs and implements custom AI systems for construction and fit-out companies across the GCC. We connect the repetitive work across tendering, BOQ analysis, estimating, procurement and project operations, with workflows designed around your existing tools and processes.",
    timeline:
        "Your first operational workflow can be introduced within 7 days of kickoff, once the agreed scope, required documents, system access and dependencies are ready.",
    ctaPrimary: "Review Your Workflow",
    ctaSecondary: "Explore the AI System",
    trust: [
        "Designed around your existing tools, subject to integration feasibility",
        "Outputs you can review and trace to their sources where available",
        "Your team keeps control of sensitive commercial decisions and approvals",
    ],
};

export const IMPACT = {
    eyebrow: "Business impact",
    title: "Less manual entry. Faster estimating.",
    titleAccent: "Every number traceable to its source.",
    sub: "Most of the hours in a tender go on reading, re-keying and cross-checking, not on judgement. Monjez takes the repetitive processing off your team, so qualified people spend their time on the decisions that need them.",
    outcomes: [
        {
            title: "Handle more tenders with your existing estimating team",
            body: "Tender requirements, deadlines, missing documents and bid-preparation tasks are organised for your team, so each opportunity takes less effort to process.",
            proof: "Extra capacity depends on your workload and implementation results",
        },
        {
            title: "Let estimators focus on estimating",
            body: "BOQ information arrives structured and checked. Where your historical pricing data and integrations are available, lines can also be compared with past rates.",
            proof: "Historical pricing comparison depends on your data and agreed scope",
        },
        {
            title: "Give company leaders a clearer operational picture",
            body: "Available tender, project and procurement information comes together in structured reporting, so owners can see delays, outstanding decisions and bottlenecks without chasing updates from several people.",
            proof: "Depends on the data sources that are connected",
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
    todayHeadline: string;
    today: string[];
    withMonjez: string[];
    needs: string[];
    produces: string[];
    exceptions: string[];
    reviewer: string;
    human: string;
    next: string;
    nextId: string;
    visual: WorkflowVisual;
};

export const OS = {
    eyebrow: "The operating system",
    title: "From the tender document to management reporting,",
    titleAccent: "within one connected system.",
    sub: "Monjez connects the workflows your company needs, from tender review and BOQ analysis to estimating, procurement, project operations and management reporting. Explore any workflow to see how the work is handled today, how a proposed AI-assisted process could change it, and where your team reviews and approves the results.",
    disclaimer:
        "These are proposed workflow categories shown with illustrative data. Which workflows are built, and how they connect to your systems, depends on the agreed implementation scope.",
    labels: {
        today: "How It Works Today",
        withMonjez: "With Monjez",
        todaySteps: "The manual process",
        withSteps: "What the system processes",
        needs: "Information coming in",
        produces: "Output",
        exceptions: "Flagged for review",
        reviewer: "Reviewed & approved by",
        next: "Next step",
        human: "Where your team stays in control",
    },
    workflows: [
        {
            id: "tender",
            name: "Tender Management",
            short: "Tender",
            headline: "A structured requirements register, built from the tender pack.",
            todayHeadline: "A tender pack read by hand, against the deadline.",
            today: [
                "The tender pack lands by email or portal: ITT, specs, drawings, BOQ, addenda",
                "Someone reads it end to end to find dates, bonds, insurances and submission rules",
                "The compliance checklist is built by hand in Excel",
                "Addenda are re-checked manually and gaps surface late",
            ],
            withMonjez: [
                "Every document in the pack is classified and indexed",
                "Deadlines, site visits, bonds, insurances and submission requirements are extracted",
                "A requirements register is drafted, each line referenced to its source page",
                "Missing documents and conflicting clauses are flagged",
            ],
            needs: ["ITT / RFP and instructions to tenderers", "Specifications, drawing lists and addenda", "Your submission checklist template"],
            produces: ["Requirements register", "Deadline summary", "Draft clarification (RFI) list"],
            exceptions: ["Conflicts between specification and BOQ", "Documents referenced but not issued", "Unclear submission requirements"],
            reviewer: "Bid / tender manager",
            human: "The go/no-go decision, and every clarification sent to the client, stays with your bid manager.",
            next: "The BOQ moves to BOQ Analysis",
            nextId: "boq",
            visual: "register",
        },
        {
            id: "boq",
            name: "BOQ Analysis",
            short: "BOQ",
            headline: "A clean, checked BOQ before anyone prices a line.",
            todayHeadline: "BOQs retyped and cleaned by hand.",
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
                "Items are cross-checked against specification and drawing references",
            ],
            needs: ["BOQ (PDF or Excel)", "Relevant specification sections", "Your item codes and naming conventions"],
            produces: ["Structured BOQ", "Exceptions report", "Questions for the consultant"],
            exceptions: ["Missing quantities", "Possible duplicate lines", "Unit or description mismatches", "Provisional sums"],
            reviewer: "Quantity surveyor / estimator",
            human: "Quantities used for pricing are checked by your QS or estimator. The system never silently “fixes” a quantity.",
            next: "The checked BOQ moves to Estimating & Pricing",
            nextId: "pricing",
            visual: "boq",
        },
        {
            id: "pricing",
            name: "Estimating & Pricing",
            short: "Pricing",
            headline: "Draft rate build-ups with a source behind every rate.",
            todayHeadline: "Rates copied from the last similar job.",
            today: [
                "Rates are copied from the last similar job’s spreadsheet",
                "Supplier prices are re-keyed by hand",
                "Margins depend on who is pricing",
                "Nobody can easily trace where a number came from",
            ],
            withMonjez: [
                "BOQ lines are matched to your approved rate library",
                "Where historical pricing data is available, lines are compared with past rates",
                "A draft build-up is prepared: material, labour, plant, overheads",
                "Every rate shows its source; lines without an approved rate are flagged",
            ],
            needs: ["Structured BOQ", "Rate library and supplier quotations", "Historical priced projects (where available)", "Approved margin and risk rules"],
            produces: ["Draft costing sheet", "Rate source trail", "Pricing scenarios for review"],
            exceptions: ["Lines with no approved rate", "Rates outside your usual range", "Assumptions that affect the price"],
            reviewer: "Estimation / commercial manager",
            human: "No missing rate is invented. Final price, margin and risk acceptance stay with your commercial manager.",
            next: "Approved quantities feed Procurement",
            nextId: "procurement",
            visual: "pricing",
        },
        {
            id: "procurement",
            name: "Procurement",
            short: "Procurement",
            headline: "Like-for-like supplier comparisons, without the copy-paste.",
            todayHeadline: "Quotes in every format, compared line by line.",
            today: [
                "Quotations arrive in a different format from every supplier",
                "The comparative statement is built by hand",
                "Specs, exclusions, delivery and payment terms are compared line by line",
                "Follow-ups are chased over WhatsApp and email",
            ],
            withMonjez: [
                "Each quotation is extracted into one standard format",
                "A like-for-like comparative statement is built",
                "Spec deviations, exclusions, lead times and payment terms are flagged",
                "Clarification questions and reminders are drafted for approval",
            ],
            needs: ["RFQs and material schedules", "Supplier quotations (PDF, Excel, email)", "Approved vendor list"],
            produces: ["Comparative statement", "Deviations & exclusions list", "Follow-up tracker"],
            exceptions: ["Spec deviations and alternate brands", "Exclusions and conditions", "Lead times beyond the programme"],
            reviewer: "Procurement manager",
            human: "Supplier selection, LPOs and anything sent outside the company follow your approval rules.",
            next: "Orders and deliveries are tracked in Project Operations",
            nextId: "coordination",
            visual: "procurement",
        },
        {
            id: "coordination",
            name: "Project Operations",
            short: "Projects",
            headline: "Site updates, RFIs and actions in one place.",
            todayHeadline: "Updates scattered across chats, calls and sheets.",
            today: [
                "Updates are scattered across WhatsApp groups, emails and calls",
                "Project managers chase status every day",
                "RFIs, submittals and actions live in separate sheets",
                "Overdue items are noticed late",
            ],
            withMonjez: [
                "Site voice notes, photos and messages become structured daily reports",
                "RFI, submittal and action registers are kept current",
                "Owners of overdue items are reminded",
                "Exceptions go to the project manager, not to everyone",
            ],
            needs: ["Site reports, voice notes and photos", "RFI and submittal logs", "Programme milestones"],
            produces: ["Daily site report", "RFI & action tracker", "Overdue alerts"],
            exceptions: ["Overdue RFIs and submittals", "Progress figures not yet confirmed", "Actions without an owner"],
            reviewer: "Project manager",
            human: "Progress percentages and quantities from site notes only count once the project manager confirms them.",
            next: "Confirmed updates feed Management Reporting",
            nextId: "reporting",
            visual: "tracker",
        },
        {
            id: "reporting",
            name: "Management Reporting",
            short: "Reporting",
            headline: "The weekly picture the owner keeps asking for.",
            todayHeadline: "The same numbers requested from five people.",
            today: [
                "The owner asks several people for the same numbers",
                "Reports are rebuilt in Excel or PowerPoint every week",
                "Figures are out of date before the meeting starts",
            ],
            withMonjez: [
                "Agreed figures are pulled from the connected trackers, sheets and exports",
                "Tender pipeline, project status and procurement items are consolidated",
                "One weekly report highlights the exceptions",
                "Each figure shows where it came from",
            ],
            needs: ["Tender log and project trackers", "Procurement and finance exports (read access)", "The KPIs you actually manage by"],
            produces: ["Weekly management report", "Pipeline and win/loss view", "Exceptions list"],
            exceptions: ["Figures that couldn’t be sourced", "Items behind programme", "Decisions waiting on management"],
            reviewer: "Owner / general manager",
            human: "Reports show where their numbers came from, and they are only as current as the systems they read.",
            next: "Decisions flow back to the tender and project teams",
            nextId: "tender",
            visual: "report",
        },
    ] satisfies Workflow[],
};

export type Agent = {
    id: string;
    name: string;
    task: string;
    inputs: string;
    outputs: string;
    owner: string;
};

export const TEAM = {
    eyebrow: "What we build",
    title: "An AI system designed",
    titleAccent: "around how your company works.",
    sub: "Monjez connects repetitive tasks into workflows tailored to your company’s documents, business rules and existing tools. Each workflow has a defined responsibility, reviewable outputs and an accountable person on your team where approval is required.",
    coordinator: {
        name: "Your company’s AI workflows",
        role: "The modules share the same documents and data, so the output of one step becomes the input of the next. Which modules are built depends on your agreed scope.",
    },
    agents: [
        {
            id: "tender",
            name: "Tender Management",
            task: "Organises tender requirements, deadlines, missing documents and bid-preparation tasks.",
            inputs: "Tender documents, instructions to tenderers, specifications and relevant attachments",
            outputs: "A structured requirements register, deadline summary and a list of items requiring review",
            owner: "Your designated bid or tender manager",
        },
        {
            id: "boq",
            name: "BOQ Analysis",
            task: "Structures quantity schedules and flags missing or inconsistent line items.",
            inputs: "BOQ in PDF or Excel, relevant specification sections and your item conventions",
            outputs: "A structured BOQ, an exceptions report and questions for the consultant",
            owner: "Quantity surveyor or estimator",
        },
        {
            id: "rates",
            name: "Estimating & Pricing",
            task: "Prepares draft cost build-ups and pricing inputs from your approved sources.",
            inputs: "Structured BOQ, rate library, supplier quotations and, where available, historical priced projects",
            outputs: "A draft costing sheet with rate sources and a list of unpriced lines",
            owner: "Estimation or commercial manager",
        },
        {
            id: "procurement",
            name: "Procurement Coordination",
            task: "Compares supplier quotations and keeps purchasing follow-ups moving.",
            inputs: "RFQs, material schedules and supplier quotations",
            outputs: "A comparative statement, deviations list and follow-up tracker",
            owner: "Procurement manager",
        },
        {
            id: "site",
            name: "Project Operations",
            task: "Turns project updates into structured reports and tracks outstanding actions.",
            inputs: "Site reports, voice notes, photos, RFI and submittal logs",
            outputs: "A daily report, action and RFI tracker, and overdue alerts",
            owner: "Project manager",
        },
        {
            id: "commercial",
            name: "Management Reporting",
            task: "Consolidates available tender, project and procurement data into one view.",
            inputs: "Tender log, project trackers and finance or ERP exports",
            outputs: "A weekly management report with an exceptions list",
            owner: "Owner or general manager",
        },
    ] satisfies Agent[],
    control: {
        title: "Automation and approval, by design",
        body: "Each workflow automates the repetitive steps you agree on. Sensitive decision points, such as pricing approval and external submissions, stay with the people you name, as set out in the workflow design.",
    },
    tools: ["Excel & Google Sheets", "Outlook & Gmail", "SharePoint, OneDrive & Google Drive", "WhatsApp (where approved)", "Your ERP (after technical review)"],
    models: "Model-agnostic: we build on Claude, OpenAI or other models, whichever fits each task and your data policy.",
    note: "Modules are built to your scope. Most companies start with one.",
};

export const JOURNEY = {
    eyebrow: "How we implement",
    title: "From your current process",
    titleAccent: "to a working workflow.",
    sub: "Four steps, one workflow at a time.",
    stages: [
        {
            when: "Step 1",
            title: "Understand the process",
            body: "We map how the work runs today, identify the repetitive steps and record the baseline: time spent, frequency and the people involved.",
            walk: "A mapped workflow and a measured baseline.",
        },
        {
            when: "Step 2",
            title: "Design the workflow",
            body: "We define the inputs, business rules, integrations, outputs and approval points, and agree what success looks like.",
            walk: "A written scope with clear approval points.",
        },
        {
            when: "Step 3",
            title: "Build and test",
            body: "We implement the agreed workflow and validate it against representative company documents and scenarios, including the awkward ones.",
            walk: "A workflow tested on your own documents.",
        },
        {
            when: "Step 4",
            title: "Deploy and improve",
            body: "We introduce the workflow to your team, monitor how it behaves, handle exceptions and improve it based on observed results.",
            walk: "A live workflow, measured against the baseline.",
        },
    ],
    caveat: "Scope and timing depend on the complexity of the workflow, document quality, system access and integration requirements. A first workflow can be introduced within 7 days of kickoff when those are ready.",
};

export const TRUST = {
    eyebrow: "Trust & control",
    title: "Reliable by design,",
    titleAccent: "accountable by default.",
    sub: "How we approach accuracy, data and decision-making in every workflow we build.",
    items: [
        { title: "Traceable outputs", body: "Outputs can be reviewed and traced back to their source documents where technically available." },
        { title: "Exceptions surfaced", body: "Missing information and detected inconsistencies are flagged for your team, not silently ignored." },
        { title: "Your approval rules", body: "Pricing, contractual commitments and other sensitive commercial decisions follow the approval rules you agree." },
        { title: "Your tools first", body: "Existing tools are kept where practical and integrated where technically feasible." },
        { title: "Data controls agreed upfront", body: "Data access, processing, retention and security controls are set for each implementation and the service providers it uses." },
    ],
    note: "We don’t claim perfect accuracy, complete security or guaranteed compatibility. We test on your documents and tell you what we find.",
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
    ctaPrimary: "Review Your Workflow",
    ctaSecondary: "Explore the AI System",
};

export const FAQ = {
    eyebrow: "FAQ",
    title: "Clear answers",
    titleAccent: "to fair questions.",
    sub: "Still unsure? Book a call. If AI isn’t the right fix for your problem, we’ll tell you.",
    cta: "Review Your Workflow",
    items: [
        {
            q: "What exactly does Monjez build?",
            a: "Monjez designs and implements custom AI systems that connect repetitive tasks across construction workflows. Depending on the agreed scope, that can include tender-document processing, BOQ organisation, estimating support, supplier quotation comparisons, project coordination and management reporting.",
        },
        {
            q: "How is this different from a chatbot or standard automation tool?",
            a: "We focus on the workflow itself: where information comes from, which business rules apply, how results are produced and how information moves to the next step. Your existing tools are incorporated where appropriate rather than replaced by default.",
        },
        {
            q: "Do we need to replace our current systems?",
            a: "No. The aim is to work with your existing tools wherever practical. Integration depends on available APIs, permissions, data formats and the technical characteristics of each system, so we assess feasibility before the implementation scope is confirmed.",
        },
        {
            q: "How do you handle sensitive company information?",
            a: "Before implementation we identify the data required, access permissions, processing and storage arrangements, retention policies and the service providers involved. We agree these with you, and only describe the controls that apply to your actual deployment.",
        },
        {
            q: "Can AI process BOQs and tender documents with 100% accuracy?",
            a: "No, and we don’t assume it can. Document quality, scanned files, complex drawings and conflicting specifications all affect results. Workflows are tested against representative documents, important exceptions are surfaced for review, and commercial decisions are verified by the appropriate people.",
        },
        {
            q: "Does this replace employees?",
            a: "The objective is to reduce repetitive manual work and help your existing team handle more work. AI supports defined tasks; professional judgement, commercial accountability and important decisions stay with your people.",
        },
        {
            q: "How long does implementation take?",
            a: "The first workflow can be ready within seven days of kickoff when the scope is defined and the required documents, permissions and dependencies are available. More complex integrations or specialised document processing can take longer, and we’ll say so before we start.",
        },
        {
            q: "How do you determine ROI?",
            a: "We assess the current workflow: time spent, task frequency, the people involved, workload, and measurable costs of errors or delays where available. We then estimate the potential impact and compare it with implementation and operating costs. Estimates are not guaranteed results.",
        },
    ],
};

export const APPLY = {
    eyebrow: "Next step",
    title: "Let’s identify where your team loses time.",
    sub: "Tell us a little about your company and how work currently moves through your team. We’ll use it to work out which workflow may be worth automating, and what needs to stay under your team’s review.",
    points: [
        "If there’s a fit, we define the scope of your first workflow",
        "We list the documents, access and dependencies it needs",
        "You get an honest view of what AI can and can’t do for it",
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
    tagline: "Custom AI systems for fit-out and construction contractors across the GCC. We build connected workflows around how your company already works.",
    ctaTitle: "Let’s identify where your team loses time.",
    ctaText: "Tell us how work moves through your team today.",
    ctaBtn: "Review Your Workflow",
};

// Interface strings that live inside components.
export const UI = {
    langSwitch: { label: "العربية", aria: "التبديل إلى العربية", href: "ar" },
    skip: "Skip to application",
    nav: { home: "Monjez, back to top", open: "Open menu", close: "Close menu", apply: "Apply", main: "Main" },
    hero: { sample: "Illustrative demonstration · sample tender", watch: "Watch the 2-minute walkthrough", videoTitle: "Monjez walkthrough" },
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
    os: { tablist: "Workflows", workflow: "Workflow", flowIn: "tender document in", flowOut: "management reporting", compare: "Compare process", sample: "Illustrative demonstration · not client data", goNext: "Go to next workflow" },
    team: {
        file: "Module",
        builtOn: "Built around your documents and rules",
        task: "Task",
        inputs: "Inputs",
        outputs: "Outputs",
        owner: "Reviewed by",
        worksInside: "Can connect with (subject to feasibility)",
        control: "Approval & control",
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
        submit: "Review Your Workflow",
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

export const EN = { NAV_LINKS, HERO, IMPACT, OS, TEAM, JOURNEY, TRUST, GCC, TESTIMONIAL, GUARANTEE, FAQ, APPLY, FOOTER, UI };
export type Content = typeof EN;
export type Locale = "en" | "ar";

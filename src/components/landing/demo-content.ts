/**
 * Illustrative workflow demonstrations for /system. Every conversation is a scripted example,
 * labelled on the page as a demonstration, not a live workspace or a client's data.
 */

export type DemoStep = { text: string; kind: "ai" | "human" };
export type DemoWorkflow = {
    id: string;
    tab: string;
    title: string;
    sub: string;
    before: string[];
    after: DemoStep[];
    flow: { input: string; process: string; output: string; reviewer: string };
    chat: {
        channel: string;
        user: { name: string; role: string; text: string };
        bot: { text: string; cardTitle: string; rows: [string, string][]; source: string; next: string };
    };
};

const EN = {
    eyebrow: "Workflows in practice",
    title: "What changes,",
    titleAccent: "step by step.",
    sub: "Pick a workflow to see how the team works today, what Monjez changes, and how someone on the team asks the system for help in Slack.",
    demoLabel: "Illustrative demo · scripted example, not a live workspace",
    labels: {
        before: "Before Monjez",
        after: "With Monjez",
        flow: "The actual workflow",
        input: "Goes in",
        process: "What happens",
        output: "Comes out",
        reviewer: "Who approves",
        ai: "AI",
        human: "Human review",
        slack: "How the team asks for it",
        slackSub: "Monjez systems can answer inside Slack, so people ask in the channel they already use.",
        source: "Source",
        next: "Next action",
        typing: "Monjez is typing…",
        app: "APP",
        replay: "Replay",
    },
    workflows: [
        {
            id: "tender",
            tab: "Tender review",
            title: "Receiving and reviewing a tender package",
            sub: "From the invitation email to a clear picture of scope, deadlines and missing documents.",
            before: [
                "Someone reads the full pack, 3–4 hours per tender",
                "Requirements copied into an Excel register by hand",
                "Missing drawings found days before submission",
                "Go / no-go decided without a written summary",
            ],
            after: [
                { text: "Agent reads the pack and extracts scope, dates and submission requirements", kind: "ai" },
                { text: "Missing documents listed against your checklist on day one", kind: "ai" },
                { text: "Tender register updated in your format", kind: "ai" },
                { text: "Tender manager checks the summary and decides go / no-go", kind: "human" },
            ],
            flow: { input: "Tender pack (PDF specs, drawings list, forms)", process: "Read, extract requirements, compare with your checklist", output: "One-page summary + missing-items list", reviewer: "Tender manager" },
            chat: {
                channel: "#tenders",
                user: { name: "Omar", role: "Tender Manager", text: "@Monjez summarise the Al Barsha office fit-out tender. What’s missing?" },
                bot: {
                    text: "Here’s the summary. Two items are missing from the pack.",
                    cardTitle: "Al Barsha office fit-out · tender summary",
                    rows: [
                        ["Submission", "Sunday, 10:00"],
                        ["Scope", "Office fit-out, joinery, MEP"],
                        ["Missing", "MEP drawings rev C, Form of Tender"],
                        ["Site visit", "Not stated in the pack"],
                    ],
                    source: "Tender pack, 14 files · ITT section 2.3",
                    next: "Draft RFI for the missing drawings?",
                },
            },
        },
        {
            id: "boq",
            tab: "BOQ extraction",
            title: "Extracting and organising BOQ information",
            sub: "Turning scanned or inconsistent BOQs into your template, with discrepancies flagged.",
            before: [
                "BOQ lines re-typed into the company template, 8–10 hours",
                "Units and quantities checked line by line",
                "Mismatches with drawings noted privately",
                "Clarifications raised late",
            ],
            after: [
                { text: "Agent structures every line into your template and item codes", kind: "ai" },
                { text: "Lines that don’t match the specification or drawings are flagged", kind: "ai" },
                { text: "Unclear items collected into one shared list", kind: "ai" },
                { text: "Quantity surveyor reviews flagged lines and confirms", kind: "human" },
            ],
            flow: { input: "BOQ (scanned PDF or Excel) + specification", process: "Structure lines, check units, compare with spec", output: "Clean BOQ in your template + discrepancy list", reviewer: "Quantity surveyor" },
            chat: {
                channel: "#estimating",
                user: { name: "Sara", role: "Quantity Surveyor", text: "@Monjez the Al Barsha BOQ is in. Anything that doesn’t match the spec?" },
                bot: {
                    text: "The BOQ is in your template. I found 3 lines to check.",
                    cardTitle: "BOQ check · 412 lines structured",
                    rows: [
                        ["Line 2.14", "Gypsum ceiling: spec says moisture-resistant"],
                        ["Line 4.07", "Unit m² in BOQ, lm in spec"],
                        ["Line 6.02", "Quantity missing"],
                        ["Status", "409 lines ready to price"],
                    ],
                    source: "BOQ rev B · Specification section 09 51 00",
                    next: "Add the 3 lines to the clarification list?",
                },
            },
        },
        {
            id: "estimate",
            tab: "Estimating",
            title: "Preparing an estimate from historical pricing",
            sub: "Using your approved rates and past tenders, with every suggested rate traceable to its source.",
            before: [
                "Rates searched in old tender files",
                "Comparable projects depend on who remembers them",
                "Senior estimators spend time on lookups",
                "No record of where a rate came from",
            ],
            after: [
                { text: "Agent suggests rates from your approved rates and past tenders", kind: "ai" },
                { text: "Every suggested rate shows the project it came from", kind: "ai" },
                { text: "Lines with no comparable history are left for the estimator", kind: "ai" },
                { text: "Estimator sets the final prices and margin", kind: "human" },
            ],
            flow: { input: "Structured BOQ + your rate history", process: "Match items, suggest rates with their source", output: "Draft rate analysis for review", reviewer: "Senior estimator" },
            chat: {
                channel: "#estimating",
                user: { name: "Khalid", role: "Senior Estimator", text: "@Monjez what did we price raised access flooring at on recent office jobs?" },
                bot: {
                    text: "Three comparable rates from your recent tenders:",
                    cardTitle: "Raised access flooring · past rates",
                    rows: [
                        ["Tender A (2025)", "AED 210 / m²"],
                        ["Tender B (2025)", "AED 198 / m²"],
                        ["Tender C (2024)", "AED 225 / m², incl. pedestals"],
                        ["Note", "C included a different spec"],
                    ],
                    source: "Your rate library · 3 submitted tenders",
                    next: "Use A and B as the basis for line 5.03?",
                },
            },
        },
        {
            id: "procurement",
            tab: "Procurement",
            title: "Coordinating procurement information",
            sub: "Reading supplier quotes in any format and comparing them like for like.",
            before: [
                "Each quote copied into a comparison sheet, 3–4 hours per package",
                "Exclusions and validity dates easy to miss",
                "No tracker for which supplier has replied",
                "Past supplier prices not searchable",
            ],
            after: [
                { text: "Agent reads quotes from email, PDF or Excel", kind: "ai" },
                { text: "Like-for-like comparison built against the BOQ", kind: "ai" },
                { text: "Exclusions, lead times and validity highlighted", kind: "ai" },
                { text: "Procurement lead chooses the supplier", kind: "human" },
            ],
            flow: { input: "Supplier quotes + BOQ package", process: "Read, normalise, compare line by line", output: "Comparison sheet with exclusions flagged", reviewer: "Procurement lead" },
            chat: {
                channel: "#procurement",
                user: { name: "Faisal", role: "Procurement Lead", text: "@Monjez compare the three joinery quotes for Al Barsha." },
                bot: {
                    text: "Comparison is ready. The lowest quote excludes installation.",
                    cardTitle: "Joinery package · 3 quotes",
                    rows: [
                        ["Supplier 1", "Lowest · excludes installation"],
                        ["Supplier 2", "+6% · 4-week lead time"],
                        ["Supplier 3", "+9% · validity ends Thursday"],
                        ["Missing", "Supplier 2 hasn’t priced line 7.04"],
                    ],
                    source: "3 quotes received by email · BOQ section 7",
                    next: "Ask Supplier 2 to price line 7.04?",
                },
            },
        },
        {
            id: "report",
            tab: "Management report",
            title: "Producing management reports",
            sub: "One weekly view of tenders, projects and open issues, drawn from the systems you already use.",
            before: [
                "Weekly report compiled by hand from several spreadsheets",
                "Site updates scattered across WhatsApp and email",
                "Open issues tracked in separate threads",
                "The owner sees numbers days late",
            ],
            after: [
                { text: "Agent gathers updates from connected trackers and exports", kind: "ai" },
                { text: "Open issues and deadlines collected into one list", kind: "ai" },
                { text: "Draft report prepared each week, with sources", kind: "ai" },
                { text: "Operations manager reviews before it goes to the owner", kind: "human" },
            ],
            flow: { input: "Tender register, project trackers, site updates", process: "Collect agreed figures, list open issues", output: "Weekly owner report with sources", reviewer: "Operations manager" },
            chat: {
                channel: "#management",
                user: { name: "Ahmed", role: "General Manager", text: "@Monjez where do we stand this week?" },
                bot: {
                    text: "Here’s this week’s draft. Two items need your attention.",
                    cardTitle: "Weekly summary · draft for review",
                    rows: [
                        ["Tenders", "4 live · 1 due Sunday"],
                        ["Projects", "6 active · 1 behind programme"],
                        ["Open issues", "3 awaiting client approval"],
                        ["Attention", "Variation on Project 3 not logged"],
                    ],
                    source: "Tender register · project trackers",
                    next: "Send the full report to the team?",
                },
            },
        },
    ] as DemoWorkflow[],
};

export type DemoContent = typeof EN;

const AR: DemoContent = {
    eyebrow: "سير العمل على أرض الواقع",
    title: "وش يتغير،",
    titleAccent: "خطوة بخطوة.",
    sub: "اختار Workflow وشوف كيف يشتغل الفريق اليوم، ووش يغير منجز، وكيف يطلب أحد من الفريق المساعدة من النظام في Slack.",
    demoLabel: "عرض توضيحي · مثال مكتوب مسبقاً، مو مساحة عمل حقيقية",
    labels: {
        before: "قبل منجز",
        after: "مع منجز",
        flow: "سير العمل الفعلي",
        input: "وش يدخل",
        process: "وش يصير",
        output: "وش يطلع",
        reviewer: "مين يعتمد",
        ai: "AI",
        human: "مراجعة بشرية",
        slack: "كيف يطلبها الفريق",
        slackSub: "أنظمة منجز تقدر ترد داخل Slack، فالناس يسألون في القناة اللي يستخدمونها أصلاً.",
        source: "المصدر",
        next: "الخطوة الجاية",
        typing: "منجز يكتب…",
        app: "APP",
        replay: "إعادة",
    },
    workflows: [
        {
            id: "tender",
            tab: "مراجعة المناقصة",
            title: "استلام ومراجعة ملف المناقصة",
            sub: "من إيميل الدعوة لين صورة واضحة للـScope والمواعيد والمستندات الناقصة.",
            before: [
                "أحد يقرا الملف كامل، 3–4 ساعات لكل مناقصة",
                "المتطلبات تنسخ يدوي في سجل Excel",
                "الرسومات الناقصة تنكشف قبل التقديم بأيام",
                "قرار الدخول بدون ملخص مكتوب",
            ],
            after: [
                { text: "الـAgent يقرا الملف ويطلع الـScope والمواعيد ومتطلبات التقديم", kind: "ai" },
                { text: "المستندات الناقصة تطلع مقابل الـChecklist حقكم من أول يوم", kind: "ai" },
                { text: "سجل المناقصات يتحدث بصيغتكم", kind: "ai" },
                { text: "مدير المناقصات يراجع الملخص ويقرر الدخول", kind: "human" },
            ],
            flow: { input: "ملف المناقصة (مواصفات PDF، قائمة رسومات، نماذج)", process: "قراءة، استخراج المتطلبات، مقارنة بالـChecklist", output: "ملخص صفحة وحدة + قائمة النواقص", reviewer: "مدير المناقصات" },
            chat: {
                channel: "#tenders",
                user: { name: "عمر", role: "مدير المناقصات", text: "@Monjez لخص لي مناقصة فيت آوت مكتب البرشاء. وش الناقص؟" },
                bot: {
                    text: "هذا الملخص. فيه مستندين ناقصين من الملف.",
                    cardTitle: "فيت آوت مكتب البرشاء · ملخص المناقصة",
                    rows: [
                        ["التقديم", "الأحد، 10:00"],
                        ["الـScope", "فيت آوت مكتب، نجارة، MEP"],
                        ["الناقص", "رسومات MEP rev C، نموذج العطاء"],
                        ["زيارة الموقع", "مو مذكورة في الملف"],
                    ],
                    source: "ملف المناقصة، 14 ملف · ITT بند 2.3",
                    next: "أجهز RFI للرسومات الناقصة؟",
                },
            },
        },
        {
            id: "boq",
            tab: "استخراج الـBOQ",
            title: "استخراج وترتيب بيانات الـBOQ",
            sub: "تحويل الـBOQ الممسوح أو غير المنتظم لقالبكم، مع تعليم الاختلافات.",
            before: [
                "بنود الـBOQ تنكتب من جديد في قالب الشركة، 8–10 ساعات",
                "الوحدات والكميات تنراجع بند بند",
                "الاختلافات مع الرسومات تنسجل بشكل شخصي",
                "الاستيضاحات تطلع متأخرة",
            ],
            after: [
                { text: "الـAgent يرتب كل بند في قالبكم وبأكواد البنود حقتكم", kind: "ai" },
                { text: "البنود اللي ما تطابق المواصفات أو الرسومات تتعلم", kind: "ai" },
                { text: "البنود الغامضة تنجمع في قائمة وحدة مشتركة", kind: "ai" },
                { text: "مهندس الكميات يراجع البنود المعلّمة ويأكدها", kind: "human" },
            ],
            flow: { input: "BOQ (PDF ممسوح أو Excel) + المواصفات", process: "ترتيب البنود، مراجعة الوحدات، مقارنة بالمواصفات", output: "BOQ مرتب في قالبكم + قائمة اختلافات", reviewer: "مهندس الكميات" },
            chat: {
                channel: "#estimating",
                user: { name: "سارة", role: "مهندسة كميات", text: "@Monjez وصل BOQ البرشاء. فيه شي ما يطابق المواصفات؟" },
                bot: {
                    text: "الـBOQ صار في قالبكم. لقيت 3 بنود تحتاج مراجعة.",
                    cardTitle: "مراجعة BOQ · 412 بند مرتب",
                    rows: [
                        ["بند 2.14", "سقف جبس: المواصفات تطلب مقاوم للرطوبة"],
                        ["بند 4.07", "الوحدة م² في الـBOQ، م.ط في المواصفات"],
                        ["بند 6.02", "الكمية ناقصة"],
                        ["الحالة", "409 بند جاهز للتسعير"],
                    ],
                    source: "BOQ rev B · المواصفات قسم 09 51 00",
                    next: "أضيف الـ3 بنود لقائمة الاستيضاحات؟",
                },
            },
        },
        {
            id: "estimate",
            tab: "التسعير",
            title: "تجهيز التسعير من الأسعار السابقة",
            sub: "من أسعاركم المعتمدة ومناقصاتكم السابقة، وكل سعر مقترح يبين مصدره.",
            before: [
                "الأسعار ينبحث عنها في ملفات مناقصات قديمة",
                "المشاريع المشابهة تعتمد على مين يتذكرها",
                "كبار المسعّرين يضيعون وقتهم في البحث",
                "ما فيه سجل لمصدر السعر",
            ],
            after: [
                { text: "الـAgent يقترح أسعار من أسعاركم المعتمدة ومناقصاتكم السابقة", kind: "ai" },
                { text: "كل سعر مقترح يبين المشروع اللي جا منه", kind: "ai" },
                { text: "البنود اللي ما لها تاريخ مشابه تنترك للمسعّر", kind: "ai" },
                { text: "المسعّر يحدد الأسعار النهائية والهامش", kind: "human" },
            ],
            flow: { input: "BOQ مرتب + تاريخ أسعاركم", process: "مطابقة البنود، اقتراح أسعار مع مصدرها", output: "مسودة تحليل أسعار للمراجعة", reviewer: "المسعّر الأول" },
            chat: {
                channel: "#estimating",
                user: { name: "خالد", role: "مسعّر أول", text: "@Monjez بكم سعرنا الأرضيات المرفوعة في مشاريع المكاتب الأخيرة؟" },
                bot: {
                    text: "ثلاث أسعار مشابهة من مناقصاتكم الأخيرة:",
                    cardTitle: "أرضيات مرفوعة · أسعار سابقة",
                    rows: [
                        ["مناقصة A (2025)", "AED 210 / م²"],
                        ["مناقصة B (2025)", "AED 198 / م²"],
                        ["مناقصة C (2024)", "AED 225 / م²، شامل القواعد"],
                        ["ملاحظة", "C كانت بمواصفات مختلفة"],
                    ],
                    source: "مكتبة أسعاركم · 3 مناقصات مقدمة",
                    next: "أعتمد A وB كأساس لبند 5.03؟",
                },
            },
        },
        {
            id: "procurement",
            tab: "المشتريات",
            title: "تنسيق بيانات المشتريات",
            sub: "قراءة عروض الموردين بأي صيغة ومقارنتها على نفس الأساس.",
            before: [
                "كل عرض ينسخ في جدول مقارنة، 3–4 ساعات للباكج",
                "الاستثناءات وتواريخ الصلاحية سهل تفوت",
                "ما فيه متابعة لمين رد من الموردين",
                "أسعار الموردين السابقة ما ينبحث فيها",
            ],
            after: [
                { text: "الـAgent يقرا العروض من الإيميل أو PDF أو Excel", kind: "ai" },
                { text: "مقارنة على نفس الأساس مقابل الـBOQ", kind: "ai" },
                { text: "الاستثناءات ومدد التوريد والصلاحية واضحة", kind: "ai" },
                { text: "مسؤول المشتريات يختار المورد", kind: "human" },
            ],
            flow: { input: "عروض الموردين + باكج الـBOQ", process: "قراءة، توحيد، مقارنة بند بند", output: "جدول مقارنة مع الاستثناءات معلّمة", reviewer: "مسؤول المشتريات" },
            chat: {
                channel: "#procurement",
                user: { name: "فيصل", role: "مسؤول المشتريات", text: "@Monjez قارن لي عروض النجارة الثلاثة للبرشاء." },
                bot: {
                    text: "المقارنة جاهزة. أرخص عرض ما يشمل التركيب.",
                    cardTitle: "باكج النجارة · 3 عروض",
                    rows: [
                        ["مورد 1", "الأرخص · بدون تركيب"],
                        ["مورد 2", "+6% · توريد 4 أسابيع"],
                        ["مورد 3", "+9% · الصلاحية تنتهي الخميس"],
                        ["ناقص", "مورد 2 ما سعّر بند 7.04"],
                    ],
                    source: "3 عروض وصلت بالإيميل · BOQ قسم 7",
                    next: "أطلب من مورد 2 يسعّر بند 7.04؟",
                },
            },
        },
        {
            id: "report",
            tab: "تقرير الإدارة",
            title: "تجهيز تقارير الإدارة",
            sub: "صورة أسبوعية وحدة للمناقصات والمشاريع والمشاكل المفتوحة، من الأنظمة اللي تستخدمونها أصلاً.",
            before: [
                "التقرير الأسبوعي ينجمع يدوي من أكثر من جدول",
                "تحديثات الموقع موزعة بين واتساب والإيميل",
                "المشاكل المفتوحة في سلاسل منفصلة",
                "صاحب الشركة يشوف الأرقام متأخر بأيام",
            ],
            after: [
                { text: "الـAgent يجمع التحديثات من المتابعات والتصديرات المربوطة", kind: "ai" },
                { text: "المشاكل المفتوحة والمواعيد في قائمة وحدة", kind: "ai" },
                { text: "مسودة تقرير كل أسبوع مع المصادر", kind: "ai" },
                { text: "مدير العمليات يراجعه قبل ما يوصل لصاحب الشركة", kind: "human" },
            ],
            flow: { input: "سجل المناقصات، متابعات المشاريع، تحديثات الموقع", process: "جمع الأرقام المتفق عليها، حصر المشاكل المفتوحة", output: "تقرير أسبوعي لصاحب الشركة مع المصادر", reviewer: "مدير العمليات" },
            chat: {
                channel: "#management",
                user: { name: "أحمد", role: "المدير العام", text: "@Monjez وين وصلنا هالأسبوع؟" },
                bot: {
                    text: "هذي مسودة الأسبوع. فيه نقطتين تحتاج انتباهك.",
                    cardTitle: "ملخص الأسبوع · مسودة للمراجعة",
                    rows: [
                        ["المناقصات", "4 شغالة · وحدة موعدها الأحد"],
                        ["المشاريع", "6 نشطة · واحد متأخر عن الجدول"],
                        ["مشاكل مفتوحة", "3 تنتظر موافقة العميل"],
                        ["انتباه", "Variation في مشروع 3 ما انسجلت"],
                    ],
                    source: "سجل المناقصات · متابعات المشاريع",
                    next: "أرسل التقرير الكامل للفريق؟",
                },
            },
        },
    ],
};

export const DEMO = { en: EN, ar: AR };

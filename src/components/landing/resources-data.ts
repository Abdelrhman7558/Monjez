// Smart Free Resources — the library content.
// Only real, published material goes here. To add a resource, append an entry; the page, filters and detail route pick it up.

import type { Locale } from "./content";

export type ResourceType = "guide" | "case" | "video" | "checklist";

export type Block =
    | { type: "p"; text: string }
    | { type: "h"; text: string }
    | { type: "ul"; items: string[] }
    | { type: "quote"; text: string; by: string };

type Localized = { title: string; excerpt: string; body: Block[] };

export type Resource = {
    slug: string;
    type: ResourceType;
    minutes: number;
    published: string; // ISO date
    video?: { embedUrl: string };
    sources?: { label: string; url: string }[];
    en: Localized;
    ar: Localized;
};

export const RESOURCES_LIST: Resource[] = [
    {
        slug: "ai-takeoff-estimating-evidence",
        type: "guide",
        minutes: 4,
        published: "2026-10-13",
        sources: [
            { label: "Utica University study of AI takeoff accuracy (ASC 2026, EasyChair)", url: "https://easychair.org/publications/paper/pkrRp" },
            { label: "ConstructConnect: Are AI takeoffs accurate in 2026?", url: "https://www.constructconnect.com/blog/are-ai-takeoffs-accurate-in-2026" },
            { label: "STACK: What AI gets right about construction takeoffs, and what it still gets wrong", url: "https://www.stackct.com/blog/what-ai-gets-right-about-construction-takeoffs-and-what-it-still-gets-wrong/" },
        ],
        en: {
            title: "AI for takeoff and estimating: what the evidence actually says",
            excerpt: "Independent testing and practitioner experience on where AI helps estimators, where it struggles, and how to use it on live bids.",
            body: [
                { type: "p", text: "AI takeoff and estimating tools are improving quickly, and the marketing claims are bold. Before you put AI output into a live bid, it is worth knowing what independent testing and experienced estimators actually report." },
                { type: "h", text: "What independent testing found" },
                { type: "p", text: "A study from Utica University compared an AI takeoff tool with a contractor’s own takeoff on a live commercial project. Counts were close to exact, but area-based quantities were consistently underestimated, and accuracy dropped on irregular geometry and complex façades. The authors concluded that estimator oversight remains essential." },
                { type: "h", text: "Where AI struggles" },
                { type: "ul", items: ["Low-quality scans and missing pages: it cannot count what it cannot read", "Unusual symbols and irregular shapes", "Scope decisions: what belongs in your price is still the estimator’s call"] },
                { type: "h", text: "Where it genuinely helps" },
                { type: "ul", items: ["Reading and structuring long tender packs and BOQs", "Counts and first-pass quantities that a person then checks", "Cross-checking a takeoff that has already been done", "Putting supplier quotations into a like-for-like comparison"] },
                { type: "h", text: "How we apply this at Monjez" },
                { type: "p", text: "We treat AI output as a first draft. Every workflow links its outputs to their sources, flags what it is unsure about, and leaves quantities, rates and scope decisions with your estimator. We test on your own documents before go-live and tell you what we find." },
            ],
        },
        ar: {
            title: "الذكاء الاصطناعي في الحصر والتسعير: وش تقول الأدلة فعلاً",
            excerpt: "نتائج اختبارات مستقلة وخبرة مسعّرين: وين يفيد الذكاء الاصطناعي، ووين يتعثر، وكيف تستخدمه في مناقصات حقيقية.",
            body: [
                { type: "p", text: "أدوات الذكاء الاصطناعي للحصر والتسعير تتطور بسرعة، والادعاءات التسويقية كبيرة. قبل ما تدخل مخرجاتها في عرض حقيقي، يفيدك تعرف وش تقول الاختبارات المستقلة والمسعّرين أصحاب الخبرة." },
                { type: "h", text: "وش لقت الاختبارات المستقلة" },
                { type: "p", text: "دراسة من جامعة Utica قارنت أداة حصر بالذكاء الاصطناعي بحصر المقاول نفسه على مشروع تجاري حقيقي. العدّ كان قريب جداً من الصح، لكن كميات المساحات طلعت أقل من الحقيقة بشكل ثابت، والدقة نزلت مع الأشكال غير المنتظمة والواجهات المعقدة. والنتيجة اللي وصلوا لها: مراجعة المسعّر ضرورية." },
                { type: "h", text: "وين يتعثر الذكاء الاصطناعي" },
                { type: "ul", items: ["الملفات المصورة الرديئة والصفحات الناقصة: ما يقدر يعدّ اللي ما يقدر يقراه", "الرموز غير المعتادة والأشكال غير المنتظمة", "قرارات النطاق: وش يدخل في سعرك يبقى قرار المسعّر"] },
                { type: "h", text: "وين يفيد فعلاً" },
                { type: "ul", items: ["قراءة وترتيب ملفات المناقصات الطويلة والـBOQ", "العدّ والكميات المبدئية اللي يراجعها شخص بعدين", "مطابقة حصر انعمل مسبقاً", "ترتيب عروض الموردين في مقارنة وجه لوجه"] },
                { type: "h", text: "كيف نطبّق هذا في منجز" },
                { type: "p", text: "نتعامل مع مخرجات الذكاء الاصطناعي كمسودة أولى. كل عملية تربط مخرجاتها بمصادرها، وتعلّم على اللي مو متأكدة منه، وتخلي الكميات والأسعار وقرارات النطاق عند المسعّر. ونختبر على مستنداتكم قبل التشغيل ونقول لكم وش لقينا." },
            ],
        },
    },
    {
        slug: "atlantis-b2b-marketplace",
        type: "case",
        minutes: 3,
        published: "2026-10-13",
        en: {
            title: "Atlantis: a B2B marketplace with an AI layer that reads supplier files",
            excerpt: "How we built a full B2B platform in two months, including AI that turns supplier Excel, PDF and Google Sheets files into structured data.",
            body: [
                { type: "p", text: "Atlantis is a B2B FMCG marketplace serving supermarkets, distributors and retail chains. It is not a contractor, but the core problem will sound familiar: important information arrives in many formats and has to be re-keyed by hand." },
                { type: "h", text: "The challenge" },
                { type: "p", text: "Wholesale buyers had no reliable digital channel to compare and order products in bulk, and suppliers had no structured way to present catalogues with documentation, compliance data and pricing." },
                { type: "h", text: "What we built" },
                { type: "ul", items: ["A buyer-facing catalogue with per-product documentation and an order-request flow", "An admin control panel for products, orders, users, verification and promotions", "An AI layer that reads supplier catalogues sent as Excel, PDF or Google Sheets, extracts the product data and fills the catalogue"] },
                { type: "p", text: "The platform was delivered in two months, with the client testing on a live staging environment from week two." },
                { type: "quote", text: "Monjez built our full B2B marketplace end to end and put real systems behind every part of the operation. It runs without me babysitting it.", by: "Ali, Founder & SEO Director, Atlantis Marketplace" },
                { type: "h", text: "Why it matters for contractors" },
                { type: "p", text: "Turning messy supplier files into structured data is the same capability that reads BOQs, supplier quotations and tender packs. The documents change; the discipline of extracting, checking and handing data to the next step does not." },
            ],
        },
        ar: {
            title: "Atlantis: سوق B2B مع طبقة ذكاء اصطناعي تقرأ ملفات الموردين",
            excerpt: "كيف بنينا منصة B2B كاملة في شهرين، ومعها ذكاء اصطناعي يحوّل ملفات الموردين Excel وPDF وGoogle Sheets لبيانات مرتبة.",
            body: [
                { type: "p", text: "Atlantis سوق B2B للسلع الاستهلاكية يخدم السوبرماركتات والموزعين وسلاسل التجزئة. هي مو شركة مقاولات، لكن المشكلة الأساسية بتكون مألوفة لك: معلومات مهمة توصل بصيغ كثيرة ولازم تنكتب من جديد يدوي." },
                { type: "h", text: "التحدي" },
                { type: "p", text: "المشترين بالجملة ما كان عندهم قناة رقمية موثوقة يقارنون ويطلبون منها بكميات، والموردين ما كان عندهم طريقة مرتبة يعرضون فيها كتالوجاتهم مع المستندات وبيانات الامتثال والأسعار." },
                { type: "h", text: "وش بنينا" },
                { type: "ul", items: ["كتالوج للمشترين فيه مستندات كل منتج وطريقة لطلب الشراء", "لوحة تحكم للإدارة للمنتجات والطلبات والمستخدمين والتحقق والعروض", "طبقة ذكاء اصطناعي تقرأ كتالوجات الموردين اللي توصل Excel أو PDF أو Google Sheets، وتطلّع بيانات المنتجات وتعبّي الكتالوج"] },
                { type: "p", text: "المنصة انسلّمت خلال شهرين، والعميل كان يختبر على بيئة تجريبية حية من الأسبوع الثاني." },
                { type: "quote", text: "منجز بنى لنا سوق B2B كامل من البداية للنهاية وحطّ أنظمة حقيقية خلف كل جزء من العملية. تشتغل بدون ما أتابعها.", by: "علي، مؤسّس ومدير تحسين محركات البحث، Atlantis Marketplace" },
                { type: "h", text: "ليش يهم المقاولين" },
                { type: "p", text: "تحويل ملفات الموردين الفوضوية لبيانات مرتبة هي نفس القدرة اللي تقرأ الـBOQ وعروض الموردين وملفات المناقصات. المستندات تتغير، لكن طريقة الاستخراج والمراجعة وتسليم البيانات للخطوة الجاية ما تتغير." },
            ],
        },
    },
    {
        slug: "client-story-ali-atlantis",
        type: "video",
        minutes: 5,
        published: "2026-10-13",
        video: { embedUrl: "https://www.loom.com/embed/5a7225325e6d4edd8d3a42f7895526bd" },
        en: {
            title: "Client story: Ali on working with Monjez",
            excerpt: "Ali, founder of Atlantis Marketplace, talks through the platform we built and how it runs today. Recorded testimonial, 4:36.",
            body: [{ type: "p", text: "A recorded testimonial from Ali, founder of Atlantis Marketplace. Atlantis is a B2B FMCG marketplace, not a contractor. The project is described in the Atlantis case study." }],
        },
        ar: {
            title: "قصة عميل: علي يتكلم عن شغله مع منجز",
            excerpt: "علي، مؤسس Atlantis Marketplace، يتكلم عن المنصة اللي بنيناها وكيف تشتغل اليوم. شهادة مسجلة، 4:36 دقيقة.",
            body: [{ type: "p", text: "شهادة مسجلة من علي، مؤسس Atlantis Marketplace. Atlantis سوق B2B للسلع الاستهلاكية، مو شركة مقاولات، وتفاصيل المشروع موجودة في دراسة حالة Atlantis." }],
        },
    },
];

export const RESOURCE_TYPES: ResourceType[] = ["guide", "case", "video", "checklist"];

export const getResource = (slug: string) => RESOURCES_LIST.find((r) => r.slug === slug);
export const localized = (r: Resource, locale: Locale) => (locale === "ar" ? r.ar : r.en);

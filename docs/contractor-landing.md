# Contractor landing page — handover notes

Home route `/[locale]` now renders the GCC contractor landing (`src/components/landing/*`).
Other routes are unchanged.

## Files

| Area | File |
|---|---|
| Page + metadata + fonts | `src/app/[locale]/page.tsx` |
| All copy and structured content | `src/components/landing/content.ts` (English) and `content-ar.ts` (Gulf Arabic, same shape) |
| Links you will change (Calendly, videos, socials) | `src/components/landing/config.ts` |
| Sections | `nav, hero, impact, operating-system (+ os-visuals), ai-team, journey, gcc (+ gcc-map-data), testimonial, guarantee, faq, apply, footer` |
| Form schema + qualification rules (shared client/server) | `src/lib/landing/apply.ts` |
| Application intake API | `src/app/api/apply/route.ts` |
| Brand assets (cut from the supplied logo) | `public/brand/*` |
| Palette tokens (`mj-*`) | `tailwind.config.ts` |
| Range slider, map label and body-background styles | `src/app/globals.css` (bottom) |

## Before this goes live

1. **Connect the application intake.** Without it the form shows an honest error ("nothing was saved") and links to Calendly directly. Set at least one of:
   - `LEAD_WEBHOOK_URL`: receives a JSON POST per application (Zapier, Make, n8n, Google Apps Script, CRM webhook).
   - `RESEND_API_KEY` + `LEAD_NOTIFY_EMAIL` (comma-separated), with optional `LEAD_FROM_EMAIL` on a verified Resend domain.
2. **Calendly.** The live funnel's links (`monjez-monjez-agency/45-min-audit`, `/30min`) returned 404 on 13 Oct 2026, and `monjez/vip` is "not a valid URL". Both tiers now use `calendly.com/monjez/monjez` (45 min), the only working event found. If you create a separate discovery event, put its link in `calendlyDiscovery`.
3. **Hero video.** Paste an embed URL into `heroVideoEmbedUrl` and a "Watch the walkthrough" button appears under the hero mock-up.
4. **Guarantee terms.** The page states the $50,000 payroll-equivalent guarantee with its conditions (discovery, agreed baseline, written terms), following SOP §12. Have the contract terms legally reviewed before the page goes live.

## Qualification logic (`qualify()`)

- Construction or fit-out company, in the GCC, with 20+ people → "qualified" → 45-min workflow audit.
- Construction company that is outside the GCC, or has 1–19 people → "discovery" → same calendar, softer copy.
- "Other (not construction)" → no booking pushed; a polite note with a discovery link.

## Claims policy applied

- No statistics, client results or quotes were invented. All sample tables are labelled "illustrative data".
- The calculator is labelled "Illustrative example". It uses the SOP formula: hours released × loaded hourly cost.
- The testimonial quote and name come from the current live site (`js/strings-en.jsx`). The Loom video ("Testimonal Ali", 4:36) is embedded as-is. **The quote was not checked against the video transcript, because the transcript was not accessible.** The 5-star rating from the old page was removed, since nothing verifies it.
- Atlantis is described as an FMCG B2B marketplace, not a contractor. The facts come from `atlantis-case-study.md`.
- "First Arab AI company" was **not** used. It can't be verified, and SOP §10.4 forbids "we're the only/first" claims. The page says "Arab-built" / "Arab-founded team" instead. Change this only if the claim can be evidenced.
- The six agent names (Tender Desk, BOQ Checker, Rate Builder, Procurement Desk, Site Reporter, Commercial Reporter, plus Office Manager) are presented as an *example team*, not shipped products.

## Research notes (13 Oct 2026)

Evidence grades: V = verified, S = supported by 2+ sources, H = hypothesis.

**Pain points used in the copy:**
- **(S) Estimators carry the whole tender package under tight deadlines.** Dubai fit-out estimator job postings list tender review, takeoff, BOQs, collecting quotes and submissions in one role. Sources: [Qureos/Build Mode](https://app.qureos.com/jobs/estimator-1763628203691), [Qureos/Arco](https://app.qureos.com/jobs/682edab6e9e396d6717e8559). Saudi QS shortages: [RICS 2023](https://www.rics.org/news-insights/wbef/how-is-the-construction-sector-faring-in-europe-the-middle-east-and-north-america).
- **(S) Comparing subcontractor and supplier quotations is manual.** [Qureos/Sadaf Interiors](https://app.qureos.com/jobs/estimator-1780904482566), [Datagrid on bid leveling](https://datagrid.com/guides/bid-leveling).
- **(S) BOQ review, takeoff, and checking built quantities against contract quantities.** [Sabbar, Riyadh QS posting](https://sabbar.com/ar/jobs/c-الرياض-r-حاسب-كميات/id-f6e5ebca-ab4b-4e4a-9d00-dcab483b8ddc).
- **(S) Progress claims, variations and late payment.** [Atradius 2026 via Taiwan News](https://www.taiwannews.com.tw/news/6419079), [Daftra on مستخلص](https://www.daftra.com/hub/مستخلص-مقاولات), [Legal500 Dubai](https://www.legal500.com/firms/18180-awatif-mohammad-shoqi-advocates-legal-consultancy/c-united-arab-emirates/news-and-developments/construction-disputes-in-dubai-delay-claims-variations-and-payment-issues).
- **(H) Site coordination scattered across WhatsApp and spreadsheets.** Only vendor sources were found. The page treats this as a recognisable situation, not a statistic.

**AI accuracy findings (used for the FAQ):**
- (V) A Utica University study of Togal found small but significant underestimation on area quantities, and found estimator oversight essential: [EasyChair](https://easychair.org/publications/paper/pkrRp).
- (S) Low-quality scans, irregular geometry and missing pages break AI takeoff. Scope decisions stay with the estimator: [ConstructConnect](https://www.constructconnect.com/blog/are-ai-takeoffs-accurate-in-2026), [STACK](https://www.stackct.com/blog/what-ai-gets-right-about-construction-takeoffs-and-what-it-still-gets-wrong/).

**Claims deliberately avoided:** vendor accuracy figures (98%, 99%+), "3× bid capacity", "3 weeks to 7 minutes", WhatsApp usage percentages, US win-rate figures, and global productivity figures framed as Gulf facts.

**Competitors checked:** APG Software, ContractorOS (course/community), Togal.AI, iBeam.ai, Quotr, STACK, Procore (en-ae), Boon AI. Most are US-centred standard software or training. None found targets GCC Arabic/English documents or builds around a contractor's existing Excel, email and ERP. This is an inference from their sites; it is not stated on the page as "nobody else does this".

**Gaps:**
- YouTube transcripts for the seed videos could not be retrieved, because YouTube blocked the transcript services.
- There are no verbatim quotes from GCC owners or estimators yet. Sales call notes are the best next source.
- The terms PQ, LPO, IPC and "comparative statement" were not independently sourced. They are standard GCC usage, so they are used sparingly.

## Not done / follow-ups

- **Arabic version: done.** `/ar` is a Gulf Arabic, right-to-left version (`content-ar.ts`), and the nav has an English/العربية switch. English is the default: `localeDetection` is off, so `/` always goes to `/en`. The sample product screens stay in English, as real tender documents usually are.
- **Deployment.** The Vercel project `monjez-platform-7ydv` serves a static `Monjez-Landing.html` from the `MonjezAgency/monjez-platform` repo, which this session could not access (private repo, GitHub CLI not signed in). This Next.js app is a different repository (`Abdelrhman7558/Monjez`). It needs to be connected to Vercel, or ported, before it can replace the live page.
- **Linting.** `npm run lint` fails on `main` for a reason unrelated to this change: `eslint.config.mjs` needs ESLint 9, but 8.57 is installed. The new files were linted with `next/core-web-vitals` through a temporary legacy config, and it passed.
- **Build environment.** `next build` needs `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` because of existing routes (`/api/log-purchase`).

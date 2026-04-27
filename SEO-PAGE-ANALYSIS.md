# SEO Page Analysis — monjez-agency.com/en
**Analyzed:** April 27, 2026  
**URL:** https://www.monjez-agency.com/en  
**Page Type:** Homepage / Agency landing page

---

## Overall Score: 54/100

```
On-Page SEO:      62/100  ██████░░░░
Content Quality:  58/100  █████░░░░░
Technical:        45/100  ████░░░░░░
Schema Markup:    10/100  █░░░░░░░░░
Images:           55/100  █████░░░░░
```

---

## 1. On-Page SEO — 62/100

### Title Tag ✅ (Pass — minor)
- **Found:** `Monjez | AI Infrastructure & Automation Systems`
- **Length:** 47 characters (target: 50–60) — slightly short
- **Analysis:** Well-formed. Includes primary keywords ("AI Infrastructure", "Automation Systems"). Brand placed first — consider swapping to keyword-first for competitive queries: `AI Infrastructure & Automation Systems | Monjez`
- **Issue (Low):** At 47 chars you have ~10 chars of unused real estate. Add a differentiator: `AI Infrastructure & Automation Systems for Agencies | Monjez`

### Meta Description ⚠️ (Warning)
- **Found:** `We build AI Infrastructure Systems that replace operational bottlenecks. Revenue-focused automation for scaling companies.`
- **Length:** 119 characters (target: 150–160) — **31 characters short**
- **Issue (Medium):** No CTA. No urgency signal. No mention of the free audit offer.
- **Recommended:** `We build custom AI infrastructure systems that eliminate operational bottlenecks for scaling agencies & founders. Book your free AI audit — zero commitment required.` (164 chars)

### H1 Tag ✅ (Pass)
- **Found:** `We Build AI Systems That Replace Operational Bottlenecks.`
- **Single H1:** ✓
- **Keyword presence:** "AI Systems" ✓
- **Issue (Low):** The phrase "operational bottlenecks" is internally-focused jargon. Prospects may search for "AI automation for agencies" — consider testing `We Build AI Systems That Automate & Scale Your Agency Operations.`

### Heading Hierarchy ✅ (Pass — with notes)
- H1 → H2 → H3 structure is logical and consistent ✓
- H2s are punchy and benefit-oriented: "AI Is Not a Feature. It's Infrastructure." ✓
- **Issue (Low):** Some H2 headings ("Engineered for Impact.", "Focused. Elite. Engineered.") are brand-speak, not keyword-rich. Consider adding secondary keywords in at least 2 H2s.

### URL Structure ⚠️ (Warning)
- **Current:** `https://www.monjez-agency.com/en`
- **Redirect chain:** `monjez-agency.com` → `www.monjez-agency.com/en`
- **Issue (High):** The `/en` suffix creates ambiguity — is this a multilingual site? If there's an Arabic version at `/ar`, hreflang tags are required. If not, the `/en` path adds unnecessary depth with no SEO benefit. The "homepage" should live at `https://www.monjez-agency.com/` not `/en`.
- **Issue (Medium):** No separate indexable pages for core services. All navigation (Home, Systems, Case Studies, Pricing, FAQ) points to anchor sections on a single URL — extremely limiting for organic ranking on service-specific queries.

### Internal Links ❌ (Critical)
- **All CTAs** link to anchor fragments: `#book-call`, `#systems`
- **No separate pages** = no internal linking structure
- **Issue (Critical):** With a single-page architecture, there are zero internal links to crawlable sub-pages. Google can't distribute PageRank or rank individual service/case study pages separately.
- **CTA inconsistency:** The footer "Book Free AI Audit" links to `/#book-call` (root) while other CTAs link to `/en#book-call` — canonical confusion.

---

## 2. Content Quality — 58/100

### Word Count ✅ (Pass)
- **Estimated:** ~2,000 words (well above the 500-word homepage minimum)
- Homepage content is dense and well-structured ✓

### Keyword Coverage ✅ (Pass)
- Primary keyword "AI systems" appears naturally throughout ✓
- Secondary terms present: "AI infrastructure", "automation", "workflows", "agencies" ✓
- **Issue (Medium):** Missing geographic targeting. No city/country context — "AI automation agency [location]" queries are uncaptured.

### Content Structure ✅ (Pass)
- Logical flow: Problem → Solution → Services → Proof → Process → Pricing → CTA ✓
- ROI calculator is a strong engagement element ✓
- FAQ section exists ✓ (but answers are hidden in collapsed accordions — crawlers may not see them)

### Social Proof ⚠️ (Warning)
- **Case studies present:** Marketpl7ce, Paynest, LinkedIn Agent ✓
- **Missing:** Named client testimonials with quotes ❌
- **Missing:** Review ratings or Clutch/G2 badges ❌
- **Critical issue:** System metrics counters display as "0+" (JavaScript-animated). Search crawlers that don't execute JS see "0 PROJECTS DELIVERED, 0 AI SYSTEMS BUILT, 0% WORKFLOW AUTOMATED, 0 INDUSTRIES SERVED" — catastrophic for trust signals.

### Freshness ⚠️ (Warning)
- **No visible publication date** on the homepage ❌
- **No last-updated date** ❌
- Blog/resources section: **does not exist** ❌ — no regular content to signal freshness to Google

---

## 3. Technical Elements — 45/100

### Canonical Tag ❓ (Not Verifiable from HTML)
- Could not confirm canonical tag in fetched content
- **Required action:** Verify `<link rel="canonical" href="https://www.monjez-agency.com/en" />` is present

### Meta Robots ❓ (Not Verifiable)
- No `noindex` signals detected, but not confirmed as `index, follow`
- **Critical concern:** `site:monjez-agency.com` in Google returned **zero results** — the site may not be indexed at all. Check Google Search Console immediately.

### Open Graph ❓ (Not Confirmed)
- OG tags not visible in fetched content — cannot confirm presence
- **Recommended minimum:**
  ```html
  <meta property="og:title" content="Monjez | AI Infrastructure & Automation Systems" />
  <meta property="og:description" content="We build AI Infrastructure Systems..." />
  <meta property="og:image" content="https://www.monjez-agency.com/og-image.jpg" />
  <meta property="og:url" content="https://www.monjez-agency.com/en" />
  ```

### Twitter Card ❓ (Not Confirmed)
- Not verifiable from fetched content. Recommend adding at minimum `twitter:card: summary_large_image`

### Hreflang ❌ (Missing — Critical if Bilingual)
- Site has AR/EN toggle in navigation
- **No hreflang tags found** — if Arabic version exists at `/ar`, this causes Google to treat them as duplicate content
- **Required:**
  ```html
  <link rel="alternate" hreflang="en" href="https://www.monjez-agency.com/en" />
  <link rel="alternate" hreflang="ar" href="https://www.monjez-agency.com/ar" />
  <link rel="alternate" hreflang="x-default" href="https://www.monjez-agency.com/" />
  ```

### JavaScript Dependency ❌ (Critical)
- Metrics section ("0+ Projects Delivered") is JS-animated — Googlebot's JS rendering is delayed and unreliable. These counters will likely index as "0" permanently.
- **Fix:** Server-side render actual numbers as static HTML, animate from zero client-side using data attributes only.

### Single Page Architecture ❌ (Critical)
- Entire site (Home, Systems, Case Studies, Pricing, FAQ) lives on one URL
- Cannot rank for service-specific queries like "AI revenue automation agency" or "AI financial automation for startups"
- **Priority fix:** Build separate pages for each core service + individual case study pages

---

## 4. Schema Markup — 10/100

### Schema Detected: None ❌

No structured data found on the page. This is a significant missed opportunity.

### Missing Schema (Priority Order)

**1. Organization Schema (Critical)**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Monjez",
  "url": "https://www.monjez-agency.com",
  "logo": "https://www.monjez-agency.com/logo.png",
  "description": "AI Infrastructure & Automation Systems for scaling agencies and founders",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service"
  }
}
```

**2. WebSite Schema (High)**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Monjez",
  "url": "https://www.monjez-agency.com"
}
```

**3. Service Schema (High — once service pages exist)**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "AI Revenue Systems",
  "provider": {"@type": "Organization", "name": "Monjez"},
  "description": "Autonomous campaign management, predictive lead scoring, and automated sales outreach."
}
```

**4. ProfessionalService / LocalBusiness (Medium)**
If Monjez has a physical presence, add address, phone, and area served.

**5. FAQPage (Medium)**
The existing FAQ section qualifies for FAQ schema (acceptable for service/agency sites):
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much revenue can AI automation generate?",
      "acceptedAnswer": {"@type": "Answer", "text": "[Answer text here]"}
    }
  ]
}
```

---

## 5. Images — 55/100

### Logo Image ✅
- `alt="Monjez Logo"` ✓
- Loaded via Next.js image optimization (`/_next/image`) — good for WebP conversion ✓

### Case Study Images ✅ (Partial)
- Marketpl7ce: `alt="How We Built an AI-Powered Ad Operations Platform..."` — very descriptive ✓
- Paynest: `alt="Designing a Financial Operating System..."` ✓
- LinkedIn Agent: Using an Unsplash stock photo — weak for a case study (should be actual project screenshots)

### Unsplash External Image ⚠️ (Warning)
- LinkedIn Agent case study uses: `images.unsplash.com/photo-1611926653458-09294b319ddc`
- **Issue:** External image URL — not controlled by Monjez, could break. Also signals low-effort content to quality reviewers.
- **Fix:** Replace with actual project screenshots or custom-created visuals.

### Image Formats ✅
- Next.js `/_next/image` pipeline handles WebP conversion automatically ✓
- `q=75` quality parameter is fine for most images ✓
- `w=3840` is unnecessarily large for case study thumbnails — wastes bandwidth

### Missing Dimensions ❓
- Cannot confirm `width` and `height` attributes are set on all images (needed to prevent CLS)

---

## Priority Action Plan

| # | Issue | Priority | Effort | Impact |
|---|-------|----------|--------|--------|
| 1 | Site not indexed in Google — verify GSC, check robots.txt/noindex | **Critical** | Low | Extreme |
| 2 | JS counters show "0" to crawlers — SSR the numbers | **Critical** | Medium | High |
| 3 | Single-page architecture — build separate service/case study pages | **Critical** | High | Extreme |
| 4 | No schema markup — add Organization + WebSite + FAQPage schemas | **High** | Low | High |
| 5 | Missing hreflang — add EN/AR hreflang tags | **High** | Low | High |
| 6 | Meta description too short — expand to 155 chars with CTA | **High** | Low | Medium |
| 7 | No blog/content section — start publishing weekly | **High** | High | High |
| 8 | CTA link inconsistency (/#book-call vs /en#book-call) | **Medium** | Low | Medium |
| 9 | Replace Unsplash image in LinkedIn Agent case study | **Medium** | Low | Medium |
| 10 | Add OG + Twitter Card meta tags | **Medium** | Low | Medium |
| 11 | Named testimonials with photos and company logos | **Medium** | Medium | High |
| 12 | Expand meta description with CTA | **Low** | Low | Low |

# Atlantis — Case Study
## B2B FMCG Marketplace Platform

**Client:** Atlantis (FMCG Enterprise)
**Scope:** Full-Stack Design + Development
**Timeline:** 2 Months
**Model:** Ongoing Monthly Development

---

## The Challenge

The FMCG distribution sector runs on relationships, phone calls, and scattered spreadsheets. Atlantis came to us with a clear problem: wholesale buyers — supermarkets, distributors, and retail chains — had no reliable digital channel to discover, compare, and order FMCG products in bulk. Suppliers, on the other hand, had no structured way to present their catalog online with proper documentation, compliance data, and pricing.

The client's goal was to build a controlled, invite-only B2B marketplace that digitized the entire wholesale buying process — without exposing supplier relationships to buyers.

---

## The Idea

Atlantis's vision wasn't to build another generic marketplace. The brief was precise:

- A **B2B-only platform** serving supermarkets, distributors, and large retailers
- Full **supplier anonymity** — buyers interact with Atlantis as the brand, never knowing who the underlying suppliers are
- **No consumer-facing features** — every element of the UX designed for large-volume, professional buyers
- **AI-powered backend** to eliminate manual product management and marketing work
- A **gated, invite-controlled** ecosystem where every buyer and supplier is verified before access is granted

This wasn't an MVP to validate whether a marketplace could work. It was a platform built for a specific, known audience — and designed to run at scale from day one.

---

## What We Built

We delivered a complete full-stack platform in two months, spanning three interconnected layers:

### 1. The Marketplace (Buyer-Facing)
A clean, catalog-driven storefront built exclusively for B2B buyers. Key elements:

- Searchable product catalog with category filtering across all FMCG verticals (beverages, dairy, confectionery, personal care, and more)
- Wholesale-only pricing — no retail price confusion
- Per-product documentation: expiry dates, compliance certificates, manufacturer specs — all surfaced on the product page so buyers can verify legitimacy before ordering
- Order request flow without online payment — buyers submit orders that flow directly into the admin panel for manual confirmation, keeping the process familiar for B2B relationships
- B2B account registration capturing business details: store name, tax registration number, phone, country, and city

### 2. The Admin Control Panel (Enterprise HQ)
A fully featured internal operations layer for Atlantis to manage the platform:

- Product management: add, edit, delete, set minimum order quantities, and schedule daily deals
- Image upload and bulk pricing tools
- Incoming order management with confirm, reject, and contact-buyer workflows
- User management with role-based access: suppliers, buyers, admins, developers — all separately permissioned
- KYC queue for verifying new registrations before granting platform access
- Live chat for direct buyer communication
- Newsletter hub: manage subscriber lists and send campaigns to the buyer base
- Coupon and promotions engine for B2B discount logic
- Ads management: hero section placements, sidebar slots, and featured product positions

### 3. AI-Powered Automation Layer
This is where Atlantis separates from any comparable platform in the region:

**AI Product Upload:** Suppliers submit their product catalog as an Excel file, PDF, or Google Sheet. The AI parses the document, extracts product data, normalizes it to the platform's schema, and populates the catalog automatically — no manual data entry required.

**AI Newsletter Generation:** The system automatically generates newsletters from active promotions, new product listings, and daily deals — and sends them to registered buyer emails without human drafting.

**AI Ad Placement Recommendation:** When a supplier or Atlantis's team creates a new ad, the AI analyzes the product category, current inventory levels, and buyer behavior patterns, then recommends the most effective placement slot (hero, sidebar, or featured section).

---

## How We Developed It

We built Atlantis using an AI-assisted development workflow — Cursor combined with Claude — which allowed us to move at a pace that traditional development timelines couldn't match.

The first month focused on establishing the core architecture: database schema, authentication, the product catalog, and the order flow. By week three, the admin panel was functional enough for the client to begin testing with real product data.

The second month was dedicated to the AI automation layer, the newsletter system, the KYC flow, and the ads management module. We iterated directly with the client throughout — showing working features, incorporating feedback, and shipping incrementally.

This wasn't a "build in isolation, deliver at the end" approach. The client had access to the live staging environment from week two onward.

---

## The Challenges We Solved

**Supplier Anonymity at the Data Layer**
Implementing true supplier anonymity required careful architectural decisions. Buyers cannot discover supplier identities through any product data, URL pattern, or metadata. All supplier relationships are abstracted at the database level, with Atlantis presented as the sole entity across every buyer touchpoint.

**AI Document Parsing Reliability**
FMCG product catalogs arrive in wildly inconsistent formats — some suppliers use structured Excel sheets, others submit scanned PDFs with handwritten notes. We built a parsing layer with normalization logic that handles format variance and flags ambiguous entries for human review rather than silently failing.

**KYC Without Friction**
The platform needed rigorous verification without creating a registration experience so slow that qualified buyers abandoned it. We designed a tiered access model: buyers complete basic registration immediately and receive limited browsing access, while full ordering capability unlocks after KYC approval. This kept qualified buyers engaged while maintaining the platform's controlled-access integrity.

**B2B UX for Non-Technical Buyers**
The target buyers — supermarket procurement managers and distributor buyers — are not necessarily comfortable with complex digital interfaces. Every interaction on the buyer side was designed for clarity over feature density: simple cart flows, straightforward order submission, and order status tracking without unnecessary complexity.

---

## The Outcome

The platform launched into closed beta within two months of kickoff. Atlantis is currently running controlled access with an initial cohort of buyers and suppliers — testing the full ordering workflow, the KYC process, and the AI features in a live environment before opening publicly.

The client's feedback was straightforward: everything they asked for was there, working the way they described it.

Beyond the initial scope, Atlantis chose to continue development under a monthly retainer model. Features on the active roadmap include AI-powered shipment tracking (the system automatically contacts buyers with shipping updates sourced from logistics providers), an AI-first support layer, and expanded payment infrastructure for markets where digital B2B payment rails are mature enough to support them.

---

## Key Deliverables

- B2B marketplace storefront with product catalog, cart, and order request system
- Enterprise admin control panel with full operations management
- KYC verification system with role-based user management
- AI product upload parser (Excel / PDF / Google Sheets)
- AI-generated newsletter and campaign automation
- AI ad placement recommendation engine
- Coupon and promotions management
- Newsletter subscriber hub with campaign tools
- Live chat and dispute resolution system
- Invite-controlled access model with staged KYC gating

---

## Timeline

**Month 1:** Architecture, database, authentication, product catalog, order flow, admin panel foundation
**Month 2:** AI automation layer, newsletter system, KYC flow, ads management, buyer-facing UX refinement, closed beta deployment

**Ongoing:** Monthly development retainer — active feature development continues

---

*Built by Monjez Company*

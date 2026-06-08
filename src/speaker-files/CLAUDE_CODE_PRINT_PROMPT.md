# CLAUDE CODE PROMPT — STRIKE BITES PRINT DOCUMENT SUITE
# KITS Advisory Group · KAG-JRK-PRINT-001
# Paste this entire prompt into Claude Code (claude terminal)

---

## MISSION

You are generating a complete suite of **print-ready A4 documents** for the STRIKE BITES investor mandate meeting. These are physical hardcopy documents that will be printed professionally, bound, and placed in front of Lebanese business owners and investors.

Your output is **NOT a React app or interactive UI**. Every file you produce must be a **standalone HTML file** that:
- Renders perfectly at A4 dimensions (210mm × 297mm)
- Has `@media print` CSS rules that suppress all screen-only elements
- Uses explicit page break controls (`page-break-after`, `page-break-inside: avoid`)
- Is completely self-contained (no external fonts except Google Fonts CDN, no external JS dependencies)
- Produces zero interactivity — no buttons, no hover states, no click handlers

---

## SOURCE FILES TO READ FIRST

Before writing a single line of output, read ALL of the following files in full:

```
/mnt/project/detailed-investment-usage.tsx     ← PRIMARY: all 10 investment categories, all line items for all 3 tiers
/mnt/project/kits-financial-snapshot.tsx       ← Corrected financial figures, KPI cards, tier comparison table
/mnt/project/kits-pitch-deck.jsx               ← Deliverables list (KAG-JRK-001 to KAG-JRK-MKT), Q&A bank, financials, closing
/mnt/project/strike-board-presentation-final.tsx   ← Board agenda, blockers, go-to-market phases, closing decisions
/mnt/project/strike-marketing-digital-strategy.tsx ← Digital marketing tiers (A/B/C), ROAS table, 24-month roadmap
/mnt/project/KITS_STRIKE_Meeting_Prep_Briefing.md  ← Meeting context, physical materials strategy, discovery questions
/mnt/project/__KITS_ADVISORY_GROUP___COMPLETE_PROJECT_HANDOFF_DOCUMENT.md  ← Full project context and blocker status
```

---

## AUTHORITATIVE FINANCIAL FIGURES (v2.0 CORRECTED — USE THESE ONLY)

**Do not use any older figures you encounter in the source files. These are canonical:**

### Three Advisory Tiers
| | Tier 1 — Lean | Tier 2 — Standard ★ | Tier 3 — Full Market Entry |
|---|---|---|---|
| Total Investment | $24,000 | $62,000 | $96,000 |
| Accounts | 30–40 | 60–80 | 130+ |
| Gross Margin | 42–48% | 55–62% | 58–64% |
| Breakeven | Month 9–12 | Month 8–11 | Month 5–7 |
| Year 1 ROI | ~155% | ~265% | ~310% |
| Year 1 Gross Profit | ~$40K | ~$153K | ~$310K |
| Year 1 Net Positive | — | ~$91K | ~$214K |
| M6 Revenue | $4K–$7K/mo | $9K–$14K/mo | $18K–$28K/mo |
| M12 Revenue | $14K–$22K/mo | $40K–$65K/mo | $80K–$130K/mo |

### Retail Pricing (corrected)
- RRP: **$4.50** per 40g pack (benchmarked vs. Jack Link's at $5.62 in Lebanon)
- Trade margin: 30–40%
- Gross margin at $4.50 RRP: 55–62% (Tier 2)

### Digital Marketing (separate from operations budget)
- Tier A: $9,000 Year 1
- Tier B: $27,000 Year 1 ← recommended
- Tier C: $58,000 Year 1
- Combined Tier 2 operations + Tier B digital = **$69,000 Year 1 total investment**

---

## DESIGN SYSTEM — APPLY CONSISTENTLY ACROSS ALL DOCUMENTS

### Typography
- Import from Google Fonts: `Cormorant Garamond` (display/headers) and `IM Fell English` or fall back to `Georgia, serif` for body
- Monospace: `'Courier New', Courier, monospace` — for all codes, figures, reference numbers
- Never use: Arial, Inter, Roboto, Helvetica, sans-serif for body text

### Color Palette — TWO MODES

**DARK SKIN** (cover page, section dividers, key statement pages — premium print shop only)
```css
--bg:        #08070A;
--card:      #0D0C14;
--gold:      #C8A96E;
--gold-dim:  #3A2A12;
--cream:     #E2D8CC;
--cream-dim: #7A7090;
--teal:      #7EB5A6;
--amber:     #C07030;
--coral:     #E07B6A;
--purple:    #9B8EC4;
--green:     #5A9060;
--line:      #1C1A26;
```

**LIGHT SKIN** (all data pages — financial tables, line-item breakdowns, timeline, mandate — prints cleanly on any printer)
```css
--bg:        #FAFAF7;
--card:      #F3F1EC;
--gold:      #8B6820;
--gold-dim:  #E8E0CC;
--cream:     #1A1410;
--cream-dim: #4A4040;
--teal:      #2A6B5C;
--amber:     #8B4A10;
--coral:     #A03020;
--purple:    #5040A0;
--green:     #2A6030;
--line:      #D0C8BC;
--accent:    #C8A96E;  /* gold accent for borders/highlights */
```

### A4 Page Structure
```css
@page {
  size: A4;
  margin: 22mm 24mm 22mm 24mm;
}
body {
  width: 210mm;
  min-height: 297mm;
  margin: 0 auto;
  font-size: 10.5pt;
  line-height: 1.65;
}
.page {
  width: 100%;
  min-height: 253mm;   /* 297mm minus top/bottom margins */
  page-break-after: always;
  position: relative;
}
.page:last-child {
  page-break-after: auto;
}
```

### Header / Footer (on every page except cover)
```
HEADER (left): KITS Advisory Group — Confidential
HEADER (right): Document reference code (e.g., KAG-JRK-FIN-001)
FOOTER (left): STRIKE BITES — Management Mandate Meeting
FOOTER (right): Page N of N
```

### Table Style Rules
- All financial tables: 100% width, collapse borders
- Header rows: gold accent left border (3px), monospace labels, small caps
- Number cells: right-aligned, monospace font
- Alternating row backgrounds (very subtle: 5% opacity difference)
- Total rows: bold, gold accent color, top border
- Never use thick outer borders — only fine interior lines (#D0C8BC on light skin)

### Section Divider Style
```
• Gold rule (1px, full width) above section title
• Section number: monospace, small, gold, letter-spaced (e.g., "SECTION 03 · FINANCIAL INVESTMENT")
• Section title: Cormorant Garamond, 24pt, dark ink
• Section subtitle: Georgia italic, 11pt, muted
```

---

## DOCUMENTS TO PRODUCE

Create one HTML file per document. All files go to `/home/claude/print/`. At the end, copy the entire `/home/claude/print/` directory to `/mnt/user-data/outputs/print/`.

---

### DOCUMENT 1 — COVER PAGE
**File:** `01_cover.html`
**Skin:** DARK
**Pages:** 1

Content:
- Top third: STRIKE BITES wordmark/logotype in Cormorant Garamond, 52pt, gold — centered
- "STRIKE · BITES" with a thin gold rule between words or beneath
- Center third: "MANDATE MEETING — INVESTOR PRESENTATION" in monospace, 9pt, gold, letter-spaced 0.4em, centered
- "Prepared exclusively by KITS Advisory Group" — Georgia italic, 12pt, cream-dim
- Year and meeting reference: "2026 · KAG-JRK-PRES-001" — monospace, 8pt, muted
- Bottom third: thin gold horizontal rule, then below it in two columns:
  - LEFT: "KITS Advisory Group | Advisory · Execution · Market Entry" — small, monospace
  - RIGHT: "Confidential — For addressee only" — small, monospace, right-aligned
- Visual treatment: a very subtle geometric pattern or minimal texture in the background (CSS-only, using radial-gradient or repeating-linear-gradient at very low opacity)

---

### DOCUMENT 2 — EXECUTIVE SUMMARY
**File:** `02_executive_summary.html`
**Skin:** LIGHT
**Pages:** 2

Page 1 — The Opportunity:
- Header bar (dark band, 12mm tall): "EXECUTIVE SUMMARY · KAG-JRK-EXEC-001" left, logo right
- Headline: "An Empty Category in a Growing Market" — Cormorant, 28pt
- Three-column KPI strip:
  - "MARKET" — "Lebanese premium snacking" — "No established local beef jerky brand"
  - "PRODUCT" — "STRIKE BITES" — "Premium beef jerky, performance-positioned, Halal-certified"
  - "WINDOW" — "First Mover" — "Category is empty. No credible Lebanese brand owns this shelf"
- Body paragraph (2 paragraphs, Georgia, 10.5pt): Describe the opportunity in STRIKE BITES's own terms — Lebanese fitness culture growth, imported brands ($5.62) vs. local ($4.50) pricing gap, gym/pharmacy/sports nutrition channel sequence, Halal compliance as mandatory baseline
- Box: "The KITS Advisory Mandate" — what KITS does: full commercial operator, pre-mandate deliverables already complete

Page 2 — The Advisory Engagement:
- Section: "What Has Already Been Built" — list all 11 deliverables in two columns:
  KAG-JRK-001 through KAG-JRK-MKT-001 with one-line description each
- Section: "Three Investment Scenarios" — compact table (not detailed, just the headline numbers)
  Tier 1 / Tier 2★ / Tier 3 with total, ROI, breakeven — highlighted Tier 2 row
- Section: "The Single Decision Required Today" — bold call-out box:
  "Which tier do we activate? Lean ($24K) · Standard ($62K) · Full Market Entry ($96K)"

---

### DOCUMENT 3 — PROOF OF WORK: 11 DELIVERABLES
**File:** `03_proof_of_work.html`
**Skin:** LIGHT (with dark header band per deliverable)
**Pages:** 2

Extract every deliverable from `kits-pitch-deck.jsx` (the `deliverables` slide items array) and render as a structured list.

Layout per deliverable:
```
[REF CODE]  [TITLE]                              [STATUS BADGE]
            [Two-line description]
            [Tags: tag1 · tag2 · tag3]
```

- Reference codes: monospace, gold, 8pt — e.g., "KAG-JRK-001"
- Title: Georgia bold, 11pt
- Status badge: small pill — "COMPLETE" in green, right-aligned
- Description: Georgia, 10pt, muted
- Tags: monospace, 7pt, muted, separated by ·
- Separator between deliverables: 0.5px rule

All 11 deliverables:
1. KAG-JRK-001 — Full Advisory Framework
2. KAG-JRK-002 — Master Launch Checklist (38 steps, 5 phases)
3. KAG-JRK-003 — Financial Feasibility Study (3 tiers)
4. KAG-JRK-004 — Trade Outreach System (scripts, objections, tracker)
5. KAG-JRK-005 — Competitive Analysis (middleman + end user scoring)
6. KAG-JRK-006 — Brand & Packaging Design Brief
7. KAG-JRK-007 — Manufacturer Technical Brief
8. KAG-JRK-008 — STRIKE Brand Enhancement Study (88/100 score)
9. KAG-JRK-VIZ-001 — Product Visualization System
10. KAG-JRK-BOARD-001 — Board Presentation (12-section)
11. KAG-JRK-MKT-001 — Marketing & Digital Strategy (8-section)

Bottom of page 2: Gold call-out box — "All 11 deliverables were completed before mandate signature. This is the standard of partnership KITS delivers."

---

### DOCUMENT 4 — FINANCIAL TIER COMPARISON
**File:** `04_financial_tiers.html`
**Skin:** LIGHT
**Pages:** 1

A single A4 page with a clear, elegant three-column comparison table. This is the primary financial overview document — not the detailed breakdown (that is Document 5).

Layout:
- Title: "Three Investment Scenarios — Your Launch, Your Terms"
- Subtitle: "All figures corrected as of v2.0 — June 2026"

Main comparison table:
| Criterion | TIER 1 — Lean | TIER 2 — Standard ★ | TIER 3 — Full Entry |
|---|---|---|---|
| Total Investment | $24,000 | $62,000 | $96,000 |
| Target Accounts | 30–40 | 60–80 | 130+ |
| Gross Margin | 42–48% | 55–62% | 58–64% |
| Breakeven | Month 9–12 | Month 8–11 | Month 5–7 |
| Month 6 Revenue | $4K–$7K/mo | $9K–$14K/mo | $18K–$28K/mo |
| Month 12 Revenue | $14K–$22K/mo | $40K–$65K/mo | $80K–$130K/mo |
| Year 1 Gross Profit | ~$40K | ~$153K | ~$310K |
| Year 1 Net Positive | — | ~$91K | ~$214K |
| Year 1 ROI | ~155% | ~265% | ~310% |

- TIER 2 column: highlighted with gold left border (3px) and subtle gold background tint
- Below table: "★ KITS Recommendation: Tier 2 (Standard Launch)" in gold, bold — with one sentence rationale

Revenue trajectory visual — simple bar chart using pure CSS (no JS):
- Three pairs of bars (M6 and M12) for each tier, drawn with CSS `width` percentages
- M12 Tier 3 bar = 100% reference width
- Labels below each bar: the dollar amount

Bottom section — two boxes side by side:
- LEFT BOX: "Also Required: Digital Marketing (separate budget)"
  Tier A: $9,000 · Tier B: $27,000 ★ · Tier C: $58,000
  "Combined Tier 2 + Digital Tier B = $69,000 Year 1"
- RIGHT BOX: "What Changes With Your Existing Infrastructure"
  "If you already have: offshore banking, logistics fleet, legal retainer, IT infrastructure — your effective net cost is lower. KITS will adjust the budget in this meeting based on what exists."

---

### DOCUMENT 5 — DETAILED INVESTMENT BREAKDOWN (TIER 2)
**File:** `05_investment_breakdown.html`
**Skin:** LIGHT
**Pages:** 3–4 (let the content flow naturally across pages with proper page-break-inside: avoid on each category block)

Extract ALL data from `/mnt/project/detailed-investment-usage.tsx` — specifically the `CATS` array, and for each category, the `standard` (Tier 2) items array.

For each of the 10 investment categories, render a block:

```
[CATEGORY NAME]                    $[TOTAL]    [PHASE]
[WHY statement — 2 sentences, Georgia italic, muted]
[WHEN statement — 1 sentence, monospace, small]

  Item description                             $Amount
  Item description [note text in small muted]  $Amount
  ...
  ─────────────────────────────────────────────────────
  CATEGORY TOTAL                               $Amount
```

The 10 categories from `detailed-investment-usage.tsx` (use these labels, totals are from `totals[1]` — index 1 = standard tier):
1. Legal & Regulatory — $10,500
2. Brand & Design — $10,000
3. Production & Supply — read from source
4. Distribution & Logistics — read from source
5. Technology & Digital — read from source
6. Marketing & Activation — read from source
7. Banking & Financial — read from source
8. Ru'ya 360 — Management & Team — read from source
9. Working Capital & Contingency — read from source
(read ALL categories and their Tier 2 totals from the CATS array)

**IMPORTANT:** Read each category's `items.standard` array from the file and render every line item. Do not summarize. Every line item with its amount and note (where present) must appear.

Final summary row at the end of the document:
```
═══════════════════════════════════════════════
TOTAL INVESTMENT — TIER 2 STANDARD LAUNCH     $62,000
Target Gross Profit Year 1                    ~$153,000
Year 1 Net Positive                           ~$91,000
ROI                                           ~265%
═══════════════════════════════════════════════
```

Page header on every page of this document: "KITS Advisory Group — STRIKE BITES | Investment Breakdown — Tier 2 Standard Launch | KAG-JRK-FIN-002"

---

### DOCUMENT 6 — REVENUE PROJECTIONS & ROI MODEL
**File:** `06_revenue_projections.html`
**Skin:** LIGHT
**Pages:** 2

Page 1 — Monthly Revenue Timeline:
- Title: "Revenue Trajectory — Month 1 through Month 12"
- Subtitle: "Tier 2 Standard Launch · Base Case Assumptions"
- A horizontal milestone/phase timeline:
  PHASE 0 (M0–M2): Foundation — $0 revenue — "Regulatory, brand, legal, pre-launch"
  PHASE 1 (M2–M4): First Placements — Revenue building — "30 accounts, 1.5 units/day avg"
  PHASE 2 (M4–M6): Ramp — $9K–14K/month by M6 — "60–80 accounts active"
  PHASE 3 (M6–M12): Growth — $40K–65K/month by M12 — "Repeat purchasing, trainer program, pharmacy entry"
- Key milestones called out with a simple vertical tick mark:
  M2: First account activated
  M4: 30 accounts on sale-or-return
  M6: $9K–$14K/month — 60–80 accounts
  M8–M11: Breakeven (investment recovered)
  M12: $40K–$65K/month
- Revenue scenario table (three rows: Base / Conservative / Upside):
  | Scenario | M6 Revenue | M12 Revenue | Breakeven | Year 1 Gross Profit |
  | Base Case | $9K–$14K | $40K–$65K | M8–M11 | ~$153K |
  | Conservative (–25%) | $7K–$11K | $30K–$49K | M10–M13 | ~$115K |
  | Upside (+25% repeat) | $15K–$22K | $50K–$81K | M6–M8 | ~$191K |

Page 2 — ROI Model & Key Assumptions:
- ROI calculation box:
  Total Investment: $62,000
  Year 1 Gross Profit (base): $153,000
  Year 1 Net Positive: $91,000
  Return on Investment: 265%
  Investment Recovery: Month 8–11
  
- Key assumptions table (read from kits-pitch-deck.jsx or kits-financial-snapshot.tsx):
  Retail price: $4.50 per 40g pack
  Trade margin to retailer: 30–40%
  Accounts at M6: 60–80
  Average units/day/account: 1.5 (base case)
  Gross margin: 55–62%
  Channel mix: Gyms 60% / Sports nutrition 25% / Pharmacy 15%
  No major Lebanese economic disruption assumed
  Nutritional panel pending — cost-per-unit to be confirmed with manufacturer

- Risk factors box (from the blocker list in the board presentation):
  "The following items affect the precision of these projections and are being resolved in parallel with mandate activation:"
  1. Manufacturer cost-per-unit confirmation (affects margin band)
  2. MoPH registration timeline (2–4 months — starts Day 1)
  3. Retail price sensitivity (modelled at $4.50 — benchmark-validated)
  4. Lebanese economic conditions (model excludes macro shocks)

- Marketing ROI box (separate from operations):
  "Tier B Digital Marketing ($27K/year) projected ROAS by channel"
  [Extract the ROI table from strike-marketing-digital-strategy.tsx — the FIN.roi array]

---

### DOCUMENT 7 — GO-TO-MARKET PHASE PLAN
**File:** `07_go_to_market.html`
**Skin:** LIGHT
**Pages:** 2

Page 1 — Channel Sequence Map:
- Title: "Go-To-Market Plan — Lebanon First, GCC Second"
- Four-channel sequence (CSS-drawn arrow flow, left to right):
  PHASE 1 → Sports Nutrition Stores (Priority 1)
  PHASE 2 → Gyms & Training Centers (Priority 2)
  PHASE 3 → Pharmacies (Priority 3)
  PHASE 4 → Modern Trade + GCC (Phase 4, post-Lebanon establishment)

For each channel block:
- Channel name + phase label
- Target account count
- Why this channel first (1 sentence)
- Commercial terms (e.g., "Sale-or-return · 60-day review · Personal delivery for all first placements")
- Estimated accounts at steady state

- Launch principles box (non-digital, relationship-first):
  "All first placements are personal visits. No cold outreach. No email campaigns. Every account is activated face-to-face, with product sample, by KITS field team."
  "No account pays before product sells. Sale-or-return for all first placements."
  "Reorder triggers personal follow-up within 72 hours."

Page 2 — Phase Timeline:
- Phase 0 (M0–M2): Foundation
  Legal · Brand · MoPH · Manufacturing supply agreement · Trademark
- Phase 1 (M2–M4): Soft Launch
  First 30 accounts · Trainer ambassador program (20 trainers) · Product delivery · Display installation
- Phase 2 (M4–M6): Ramp
  60–80 active accounts · Pharmacy channel entry · Monthly revenue ≥$9K · Second production batch
- Phase 3 (M6–M12): Growth
  80–120 accounts · Modern trade evaluation · STRIKE STRIPS second-line development begins
- Phase 4 (M12+): GCC Preparation
  SGS Halal (GCC-portable) · UAE FIRS registration · GCC trademark filing · Distributor identification

Also include a compact table of the 38-step checklist phases (high level only — just the phase names and key milestone per phase, not all 38 steps).

---

### DOCUMENT 8 — COMPETITIVE LANDSCAPE SUMMARY
**File:** `08_competitive_analysis.html`
**Skin:** LIGHT
**Pages:** 1

A single clean A4 page.

- Title: "STRIKE BITES vs. The Market — Competitive Position"
- Section 1: Scored comparison matrix (from KAG-JRK-005)
  Five competitors: Jack Link's · Wild West · Quest Bar · Barebells · STRIKE BITES
  Eight retailer criteria: trade margin, local distribution, Halal cert, Lebanese brand, price point, supply reliability, reorder terms, exclusivity
  Score each /10 — extract from pitch deck competitive analysis data or construct from known facts
  STRIKE BITES wins every criterion — gold row highlighting

- Section 2: The STRIKE Structural Advantages (from "Our 7 Power Points" in the pitch)
  List the 7 competitive advantages as a two-column layout:
  1. Only local Lebanese brand
  2. Halal-certified for all trade channels
  3. $4.50 vs $5.62 imported (19% price advantage)
  4. Sale-or-return — zero risk for retailer
  5. Direct personal delivery and service
  6. Trainer ambassador program (peer endorsement)
  7. Bespoke Lebanese flavor profile

- Section 3: Market window — one paragraph:
  "No established local beef jerky brand exists in Lebanon. The imported products on Lebanese shelves are not locally distributed, not locally certified, and not priced for the mass Lebanese fitness consumer. This category is unclaimed. The STRIKE opportunity is to claim it before anyone else does."

---

### DOCUMENT 9 — MANAGEMENT MANDATE
**File:** `09_management_mandate.html`
**Skin:** LIGHT (formal legal style — clean, minimal, authoritative)
**Pages:** 3

This is the document that gets signed in the meeting. It must look like a real professional legal mandate — not a pitch document.

Layout: Single-column, Times New Roman or Georgia for body (legal document standard), generous margins, line numbers optional.

**Page 1 — Parties and Recitals:**

```
MANAGEMENT ADVISORY MANDATE AGREEMENT

Dated: _________________, 2026

BETWEEN:

[CLIENT NAME] ("the Client")
[registered address / commercial registration number TBD]
represented by _________________ in their capacity as _________________

AND:

KITS ADVISORY GROUP ("the Advisor")
[address line]
represented by _________________ in their capacity as Lead Advisor

WHEREAS:

(A) The Client is the owner of the STRIKE BITES beef jerky venture, currently in the
    pre-commercialization stage, seeking to launch a premium locally-produced beef jerky
    product in the Lebanese market.

(B) The Advisor has prepared, at its own initiative and expense, a suite of eleven (11)
    institutional-quality advisory deliverables referenced KAG-JRK-001 through
    KAG-JRK-MKT-001 (the "Pre-Mandate Deliverables"), demonstrating readiness and
    capability to execute the full commercial launch of STRIKE BITES.

(C) The parties wish to formalise the terms of the advisory and commercial execution
    mandate, including scope, fees, governance, and milestone conditions.

NOW THEREFORE the parties agree as follows:
```

**Page 2 — Mandate Scope & Fees:**

```
ARTICLE 1 — SCOPE OF MANDATE

1.1 The Advisor is appointed as the exclusive commercial operator and managing advisor
    for the STRIKE BITES venture for the duration of this mandate.

1.2 The mandate scope includes the following services:
    (a) Regulatory filing management (SARL, MoPH, Halal, trademark, GS1)
    (b) Brand identity execution (designer briefing, packaging approval, print management)
    (c) Manufacturer relationship management and supply agreement negotiation
    (d) Trade outreach, account activation, and field execution
    (e) Financial reporting, P&L management, and board-level advisory
    (f) Marketing and digital strategy oversight
    (g) Investor and stakeholder communications on behalf of the Client

1.3 The mandate is effective from the date of signature. Execution commences within 72
    hours of budget tier confirmation and first milestone payment.

ARTICLE 2 — BUDGET TIER SELECTION

2.1 The Client selects the following advisory tier (circle one):

    TIER 1 — LEAN LAUNCH              $24,000
    TIER 2 — STANDARD LAUNCH          $62,000  ← RECOMMENDED
    TIER 3 — FULL MARKET ENTRY        $96,000

    Selected Tier: _______________________________

ARTICLE 3 — FEES AND PAYMENT SCHEDULE

3.1 Tier 2 (Standard) payment schedule (milestone-gated):

    Payment 1 — Phase 0 Activation (on signature):           $18,600  (30%)
    Payment 2 — Phase 1 Milestone (30 accounts activated):   $18,600  (30%)
    Payment 3 — Phase 2 Milestone ($9K/month revenue):        $12,400  (20%)
    Payment 4 — Phase 3 Milestone ($40K/month trajectory):   $12,400  (20%)
    TOTAL:                                                    $62,000

3.2 Milestone release requires written sign-off from the Client confirming that the
    stated milestone has been achieved. Sign-off shall not be unreasonably withheld.

3.3 No payment shall release without demonstrated milestone achievement as defined in
    the attached Schedule A (Milestone Definitions).

ARTICLE 4 — GOVERNANCE

4.1 The Advisor shall provide the Client with a monthly written report covering:
    (a) P&L vs. approved budget (actuals vs. plan)
    (b) Account status and sell-through data
    (c) Regulatory and compliance status
    (d) Open items and next 30-day action plan

4.2 All expenditures above $500 that are not pre-approved in the milestone budget
    require written Client approval before commitment.

4.3 The Client retains final authority over all financial commitments, regulatory
    filings in the Client's name, and brand decisions.
```

**Page 3 — Representations, Term, and Signatures:**

```
ARTICLE 5 — TERM AND TERMINATION

5.1 The mandate runs for an initial period of twelve (12) months from the date of
    signature, renewable by mutual written agreement.

5.2 Either party may terminate this mandate with 30 days' written notice. In the
    event of termination, fees paid for milestone phases already completed are
    non-refundable. Fees paid in advance for future phases shall be reimbursed.

ARTICLE 6 — INTELLECTUAL PROPERTY

6.1 All advisory deliverables produced by the Advisor (KAG-JRK-001 through
    KAG-JRK-MKT-001 and all future deliverables under this mandate) are produced
    for the sole benefit of the Client and, upon full payment of the relevant
    milestone payment, transfer to the Client as work product.

6.2 The STRIKE BITES brand name, trademarks, packaging design, and product
    formulations are and remain the property of the Client.

ARTICLE 7 — CONFIDENTIALITY

7.1 Both parties agree to treat all business information, financial projections,
    supplier relationships, and strategic plans exchanged under this mandate
    as strictly confidential.

ARTICLE 8 — GOVERNING LAW

8.1 This mandate is governed by the laws of the Republic of Lebanon.


IN WITNESS WHEREOF the parties have signed this Mandate Agreement on the date
first written above.

────────────────────────────────────    ────────────────────────────────────
[CLIENT NAME]                           KITS ADVISORY GROUP
Signature: _________________________    Signature: _________________________
Name:      _________________________    Name:      _________________________
Title:     _________________________    Title:     _________________________
Date:      _________________________    Date:      _________________________


Witness:   _________________________    Witness:   _________________________
```

---

### DOCUMENT 10 — DISCOVERY INTAKE NOTES FORM
**File:** `10_discovery_notes.html`
**Skin:** LIGHT (minimal, functional, like a professional worksheet)
**Pages:** 1–2

This is the form the advisor fills in DURING the opening listening session.

Layout:
- Title: "CLIENT INFRASTRUCTURE DISCOVERY — INTAKE NOTES"
- Subtitle: "STRIKE BITES — Pre-Presentation Session · Date: _______ · Attendees: _______"
- Instruction strip: "Complete this form before advancing to the presentation. Answers directly inform budget cross-investment savings in the financial section."

Ten domains, each with 2–3 fill-in lines:

```
01 · LEGAL & CORPORATE
Existing legal entities: _______________________________________________
Lawyer / law firm on retainer: _________________________________________
Prior MoPH or food product registrations: ______________________________
Existing trademark filings: ____________________________________________

02 · BANKING & FINANCIAL
Offshore USD account (Cyprus / UAE / other): ___________________________
Lebanese bank for commercial USD transfers: ____________________________
Existing SWIFT/international wire capability: __________________________

03 · ACCOUNTING & TAX
CFO or finance director on staff: _____________________________________
Accounting firm / bookkeeper: _________________________________________
Accounting software in use: __________________________________________

04 · TECHNOLOGY & IT
CRM system in use: ___________________________________________________
IT manager or retainer: ______________________________________________
ERP or inventory management: _________________________________________

05 · WEB & DIGITAL DEVELOPMENT
Web developer or agency currently contracted: _________________________
Existing social media accounts / audiences: ___________________________
E-commerce platform experience: ______________________________________

06 · LOGISTICS & DISTRIBUTION
Vehicle fleet (vans / trucks): ________________________________________
Warehouse or dry storage available: __________________________________
Freight forwarder / customs broker relationship: ______________________
Existing trade delivery routes: ______________________________________

07 · HUMAN RESOURCES & STAFFING
Sales or field staff currently employed: ______________________________
Administrative staff available for cross-support: ____________________
Staff with food / FMCG / retail experience: __________________________

08 · MARKETING & CREATIVE
Creative or branding agency currently contracted: ____________________
Graphic designer (in-house or freelance): ___________________________
Photographer / videographer relationship: ___________________________

09 · REGULATORY & GOVERNMENT
Prior MoPH registration experience: _________________________________
Dar Al-Fatwa or Halal body contacts: ________________________________
Government / institutional relations: ________________________________

10 · BUSINESS PORTFOLIO & DECISION CONTEXT
Current active businesses (list): ___________________________________
Who approves investment decisions: __________________________________
Absent principal to consider: _______________________________________
What success looks like at 12 months: ______________________________
```

Bottom of last page:
```
CROSS-INVESTMENT SAVINGS IDENTIFIED (fill in meeting):
Item _________________________ saving approximately $_____________
Item _________________________ saving approximately $_____________
Item _________________________ saving approximately $_____________
Total identified savings: $_____________ → Adjusted net investment: $_____________
```

---

### DOCUMENT 11 — INDEX PAGE
**File:** `00_index.html`
**Skin:** DARK
**Pages:** 1 (screen only — no print CSS needed, this is for navigation)

A simple dark-skin index page listing all 10 documents with clickable links:
```
STRIKE BITES — PRINT DOCUMENT SUITE
KAG-JRK-PRINT-001 · June 2026

01. Cover Page                          01_cover.html
02. Executive Summary                   02_executive_summary.html
03. Proof of Work — 11 Deliverables     03_proof_of_work.html
04. Financial Tier Comparison           04_financial_tiers.html
05. Investment Breakdown (Tier 2)       05_investment_breakdown.html
06. Revenue Projections & ROI           06_revenue_projections.html
07. Go-To-Market Phase Plan             07_go_to_market.html
08. Competitive Analysis                08_competitive_analysis.html
09. Management Mandate                  09_management_mandate.html
10. Discovery Intake Notes              10_discovery_notes.html
```

---

## EXECUTION ORDER

1. `mkdir -p /home/claude/print`
2. Read ALL source files listed above before writing any HTML
3. Produce documents in order 01 through 10, then 00
4. After all 11 files are written to `/home/claude/print/`, run a validation pass:
   - Open each file with `wc -l` to confirm it has content
   - Do a quick `grep -c "page-break" filename.html` to confirm print CSS is present
5. Copy entire print folder: `cp -r /home/claude/print /mnt/user-data/outputs/print`
6. Report a summary: list each file, its approximate page count, and any data that could not be located in the source files

---

## QUALITY STANDARDS

- **No placeholder lorem ipsum text** — every word must come from the source files or be factually accurate based on them
- **No interactive elements** — no JavaScript event handlers, no buttons, no hover states
- **Print-safe colors** — on light-skin documents, never use text lighter than #4A4040 — it must be legible when printed
- **Tables must not split across pages** — use `page-break-inside: avoid` on every `<tr>` and every category block
- **No external JS dependencies** — HTML and CSS only. Google Fonts CDN is acceptable.
- **Consistent document reference codes** — every page footer must carry the correct reference code for that document
- **v2.0 figures only** — if you encounter $42,000 (old Tier 2 figure), replace with $62,000. If you see $18,500 or $82,000, replace with $24,000 and $96,000 respectively. The corrected figures at the top of this prompt are canonical.

---

*KITS Advisory Group — Internal Execution Document*
*Reference: KAG-JRK-PRINT-001*
*Do not distribute outside the advisory team*

import { useState, useEffect, useCallback } from "react";

// ─── BRAND CONSTANTS ──────────────────────────────────────────────────────────
const C = {
  void: "#050404",
  obsidian: "#0A0908",
  charcoal: "#141210",
  ash: "#1E1B18",
  ember: "#2A2520",
  gold: "#C8A050",
  goldBright: "#E0B860",
  goldDim: "#7A6030",
  cream: "#EDE0CC",
  creamDim: "#8A7A6A",
  green: "#3A6040",
  greenBright: "#5A9060",
  red: "#C04030",
  redDim: "#8A2820",
  amber: "#C07030",
  purple: "#7060A0",
  strike: "#E8D0A0",
};

// ─── SLIDE DATA ───────────────────────────────────────────────────────────────
const SLIDES = [
  // ── 01 COVER ────────────────────────────────────────────────────────────────
  {
    id: "cover",
    type: "cover",
    section: null,
    label: "COVER",
    title: "STRIKE BITES",
    sub: "Board Meeting — Initial Advisory Presentation",
    meta: "KITS Advisory Group · Confidential · May 2026",
    notes: {
      open: "Good [morning/afternoon]. Thank you for your time today. This presentation covers everything KITS has developed since taking the mandate on STRIKE BITES — the market research, brand strategy, competitive positioning, financial scenarios, and the critical decisions we need to make together in this room before moving to execution.",
      emphasis: ["This is not a pitch — this is a working session. Every slide is designed to generate a decision, surface a gap, or confirm a direction."],
      timing: "2 minutes",
    }
  },
  // ── 02 AGENDA ───────────────────────────────────────────────────────────────
  {
    id: "agenda",
    type: "list",
    section: "MEETING STRUCTURE",
    label: "AGENDA",
    title: "What We Cover Today",
    items: [
      { n: "01", text: "The Opportunity — Why Lebanon, Why Now, Why STRIKE", tag: "10 min" },
      { n: "02", text: "The Product — STRIKE BITES, Product Line Architecture", tag: "8 min" },
      { n: "03", text: "Competitive Analysis — How We Win at Every Level", tag: "8 min" },
      { n: "04", text: "Brand Strategy — STRIKE Identity, Tagline, Visual System", tag: "8 min" },
      { n: "05", text: "Go-To-Market — Channel Sequence, Outreach System", tag: "8 min" },
      { n: "06", text: "Financial Scenarios — Three Budget Tiers", tag: "10 min" },
      { n: "07", text: "Critical Blockers — Decisions Required Today", tag: "10 min" },
      { n: "08", text: "KITS Mandate — Scope, Fees, Governance", tag: "8 min" },
      { n: "09", text: "Next Steps — Timeline to First Sales", tag: "5 min" },
    ],
    notes: {
      open: "We have approximately 75 minutes. Each section is designed to be self-contained. The most important section — and where we need the most time — is Section 07: Critical Blockers. Everything else we can brief you on. That section requires decisions.",
      emphasis: ["Interrupt at any point. These slides are the map — the conversation is the territory."],
      timing: "1 minute",
    }
  },
  // ── 03 THE OPPORTUNITY ───────────────────────────────────────────────────────
  {
    id: "opportunity",
    type: "stats",
    section: "01 · THE OPPORTUNITY",
    label: "MARKET",
    title: "An Empty Category in a Growing Market",
    headline: "There is no established local beef jerky brand in Lebanon.",
    stats: [
      { value: "ZERO", label: "Local beef jerky brands", sub: "in the Lebanese market today", color: C.greenBright },
      { value: "$1.04B", label: "Middle East sports nutrition", sub: "market size 2024 · +7.3% CAGR", color: C.gold },
      { value: "82.6%", label: "Brick & mortar dominance", sub: "of sports nutrition sales in MENA", color: C.gold },
      { value: "$8.49B", label: "GCC snacks market", sub: "2024 · projected $12.87B by 2030", color: C.amber },
    ],
    notes: {
      open: "Start with the single most important fact: there is no established local beef jerky brand in Lebanon. That is not a gap — it is a vacuum. Every competitor in this category is imported, expensive, not Halal-certified, not designed for the Lebanese palate, and not designed for the fitness consumer. We are not entering a crowded market. We are creating a category.",
      emphasis: [
        "The 82.6% brick-and-mortar dominance validates our no-digital strategy entirely. This is not a conservative choice — it is the statistically correct channel approach for this region.",
        "The ZERO local brand figure is the most powerful number in this deck. Let it land before moving on.",
      ],
      timing: "3 minutes",
    }
  },
  // ── 04 WHY NOW ───────────────────────────────────────────────────────────────
  {
    id: "whynow",
    type: "two-col",
    section: "01 · THE OPPORTUNITY",
    label: "TIMING",
    title: "Why Lebanon. Why Now.",
    left: {
      heading: "THE TAILWINDS",
      items: [
        "Lebanese fitness culture has expanded significantly — gyms, CrossFit, boutique studios proliferating across Beirut, Metn, Keserwan",
        "Health-conscious youth (18–40) actively tracking macros — protein content is a purchase driver, not a feature",
        "USD-denominated market post-2019 economic crisis creates pricing stability for a premium product",
        "Lebanese manufacturing provenance is a GCC premium signal — 'Made in Lebanon' travels",
        "Halal certification is a structural market access key — unlocks 60%+ of Lebanese consumers and all GCC markets simultaneously",
      ]
    },
    right: {
      heading: "THE WINDOW",
      items: [
        "First-mover advantage in an empty category is available — but not indefinitely",
        "Imported jerky brands (Jack Link's, Wild West) are present but weak: high sugar, no Halal, wrong pricing, wrong flavors",
        "No local competitor is building in this space currently — KITS field research confirms",
        "Regulatory timeline (MoPH) runs 2–4 months — beginning now means shelf-ready by Q4 2026",
        "Trainer and gym-owner relationships are warm — activation can begin before product is shelf-ready",
      ]
    },
    notes: {
      open: "The window is real and it is open — but first-mover advantage is not infinite. The moment STRIKE BITES succeeds visibly, imitation follows in Lebanon within 12 months. Our protection is: trademark registration, brand equity built through relationships, and flavor IP in the supply agreement. Speed of execution is a competitive moat in itself.",
      emphasis: ["If we do not move, someone else will. The market data makes this category too obvious to stay empty for long."],
      timing: "3 minutes",
    }
  },
  // ── 05 THE PRODUCT ───────────────────────────────────────────────────────────
  {
    id: "product",
    type: "product",
    section: "02 · THE PRODUCT",
    label: "PRODUCT",
    title: "STRIKE BITES — The Launch Product",
    tagline: "Premium portioned beef jerky bites. Poppable. High-protein. Clean.",
    pillars: [
      { icon: "◈", label: "Format", value: "Poppable cubed bites — not strips. Gym counter, impulse, hand-to-mouth." },
      { icon: "◉", label: "Protein", value: "[X]g per serving · Zero added sugar · No artificial preservatives" },
      { icon: "◎", label: "Halal", value: "Fully certified — Dar Al-Fatwa Lebanon. GCC export-ready from day one." },
      { icon: "◐", label: "Origin", value: "Hybrid local + imported source. Made in Lebanon provenance." },
      { icon: "◈", label: "Flavor", value: "Launch: SMOKING BBQ — Lebanese BBQ profile. Aleppo pepper, sumac, cedar smoke." },
      { icon: "◉", label: "Packaging", value: "Dark matte pouch. Performance gold. Trilingual. UV spot varnish on wordmark." },
    ],
    line: [
      { name: "STRIKE BITES", phase: "LAUNCH", flavor: "Smoking BBQ", format: "40g single-serve", channel: "Gym · Nutrition Store", color: C.gold },
      { name: "STRIKE STRIPS", phase: "PHASE 2", flavor: "Fire & Lime", format: "120g resealable", channel: "Pharmacy · Supermarket", color: C.amber },
      { name: "STRIKE STICKS", phase: "PHASE 3", flavor: "Za'atar", format: "Per stick", channel: "Convenience · Add-on", color: C.greenBright },
      { name: "STRIKE PACKS", phase: "PHASE 4", flavor: "Variety", format: "Multipack", channel: "GCC Retail · Gift", color: C.purple },
    ],
    notes: {
      open: "The product is simple. Poppable beef jerky bites. High protein. Zero sugar. Halal certified. Lebanese made. That is the entire product story in one sentence. Everything else — the brand, the packaging, the flavor profile — exists to make that one sentence credible and compelling at point of purchase.",
      emphasis: [
        "The format matters: BITES is not traditional jerky. It is poppable — which creates a different purchase occasion and differentiates immediately from imported flat-cut competitors.",
        "The product line is designed now but launched in sequence. We launch one SKU. We do not over-range at launch.",
        "⚠ CRITICAL: The nutritional panel must be confirmed by the manufacturer before any numbers go on this slide in a final version. All [X] values are placeholders.",
      ],
      timing: "4 minutes",
    }
  },
  // ── 06 COMPETITIVE ANALYSIS ──────────────────────────────────────────────────
  {
    id: "competitive",
    type: "matrix",
    section: "03 · COMPETITIVE ANALYSIS",
    label: "COMPETITION",
    title: "How We Win at Every Level",
    subtitle: "Middleman (Store Owner) · End User (Consumer)",
    rows: [
      { criterion: "Halal Certification", jl: "✗ Not certified", ww: "✗ Not certified", qb: "✗ Not certified", bb: "✗ Not certified", us: "✓ Dar Al-Fatwa", usWin: true },
      { criterion: "Zero Added Sugar", jl: "✗ Sugar = ingredient #2", ww: "✗ 20.6g/100g", qb: "~ Sucralose", bb: "~ Maltitol", us: "✓ Zero. None.", usWin: true },
      { criterion: "Sale-or-Return Terms", jl: "✗ Cash upfront", ww: "✗ Cash upfront", qb: "✗ Via distributor", bb: "✗ Via distributor", us: "✓ First 30 days S-O-R", usWin: true },
      { criterion: "Direct Delivery (<24h)", jl: "✗ 3–7 days via importer", ww: "✗ 5–14 days", qb: "✗ 3–5 days via dist.", bb: "✗ 3–5 days via dist.", us: "✓ Personal · 24h", usWin: true },
      { criterion: "Lebanese Flavor Profile", jl: "✗ Teriyaki, Sweet BBQ", ww: "✗ Honey BBQ, Jalapeño", qb: "✗ Cookie Dough", bb: "✗ Chocolate variants", us: "✓ Lebanese BBQ", usWin: true },
      { criterion: "Trilingual Packaging", jl: "✗ English only", ww: "✗ English only", qb: "✗ English only", bb: "✗ English only", us: "✓ AR · EN · FR", usWin: true },
      { criterion: "Retail Price (single-serve)", jl: "✗ $4.50–6.50", ww: "✗ $4.00–6.00", qb: "~ $3.50–5.00", bb: "~ $3.50–5.00", us: "✓ $2.50–3.50", usWin: true },
    ],
    notes: {
      open: "This matrix is the competitive picture. Look at the last column — STRIKE wins on every single criterion. Not most of them. Every one. No competitor holds more than three of these seven advantages. We hold all seven.",
      emphasis: [
        "The Halal certification advantage alone removes a purchase barrier for approximately 60% of the Lebanese market that no competitor can overcome without reformulating their product from scratch.",
        "The sale-or-return terms are the most powerful trade tool in the deck — no competitor offers this. It removes every objection a gym owner or store manager has.",
        "Price accessibility at $2.50–$3.50 means a gym member can buy STRIKE every session without budgetary hesitation. At $5.00+, it becomes an occasional purchase. Routine vs. occasional is the difference between a successful brand and a novelty.",
      ],
      timing: "4 minutes",
    }
  },
  // ── 07 BRAND STRATEGY ────────────────────────────────────────────────────────
  {
    id: "brand",
    type: "brand",
    section: "04 · BRAND STRATEGY",
    label: "BRAND",
    title: "STRIKE — Brand Identity System",
    score: 88,
    elements: [
      { label: "Brand Name", value: "STRIKE", verdict: "APPROVED", score: 92, note: "Single syllable. Universal phonetics across Arabic, English, French. Kinetically charged — verb and noun simultaneously. Fully trademarkable Class 29." },
      { label: "Product Line", value: "STRIKE BITES", verdict: "APPROVED", score: 88, note: "Alliterative sub-brand architecture. Scales to STRIPS, STICKS, PACKS. Each format serves a distinct channel and purchase occasion." },
      { label: "Front Tagline", value: "FUEL THE PRIMAL.", verdict: "RECOMMENDED", score: 85, note: "Replaces 'REAL PRIMAL MUSCLE FUEL.' — faster, more poetic, less supplement-adjacent. Period creates declarative confidence." },
      { label: "Back Manifesto", value: "STRIKE THE GAINS. THE PRIMAL WAY.", verdict: "APPROVED", score: 85, note: "Activates brand name as a verb. Gym-channel primary. Expanded version for back panel: 'THIS IS NOT A SNACK. THIS IS FUEL.'" },
      { label: "Visual System", value: "Dark · Gold · Matte · Grain", verdict: "APPROVED", score: 90, note: "Obsidian base, performance gold accent, matte laminate finish, volcanic grain texture at 3–5% opacity, UV spot on wordmark." },
      { label: "Cedar Icon", value: "Geometric Abstraction", verdict: "EVOLVE", score: 75, note: "5-line vector cedar — NOT literal illustration. 15% opacity background only. Gold on dark. Not primary mark." },
    ],
    notes: {
      open: "KITS has scored the STRIKE brand at 88 out of 100. This is a strong score for a pre-launch brand. The name is exceptional — phonetically universal, legally clean, commercially charged. The architecture scales to GCC and Western markets without rebranding. The visual system is correct for the premium athletic category in 2025–2026.",
      emphasis: [
        "The tagline refinement is a recommendation, not a mandate. 'REAL PRIMAL MUSCLE FUEL' works. 'FUEL THE PRIMAL.' is faster and more poetic. This is a board decision.",
        "The cedar icon must be geometric abstraction — never literal. The cedar tree is dramatically over-used in Lebanese brand identity. Done correctly, it signals provenance without being provincial.",
        "UV spot varnish on the wordmark: $0.02–0.05 per unit premium. Return: disproportionate shelf presence and social media photography value.",
      ],
      timing: "4 minutes",
    }
  },
  // ── 08 GO-TO-MARKET ──────────────────────────────────────────────────────────
  {
    id: "gtm",
    type: "phases",
    section: "05 · GO-TO-MARKET",
    label: "GTM",
    title: "Channel Sequence & Activation Plan",
    phases: [
      {
        phase: "PHASE 0–1", time: "NOW → Month 4", color: C.gold,
        title: "Foundation & Build",
        actions: [
          "Legal entity registration (SARL) — engage notary immediately",
          "Manufacturer supply agreement — signed in writing this week",
          "Lab testing — nutritional panel confirmation (2–4 weeks)",
          "MoPH food product registration — begin process now (2–4 months)",
          "Halal certification — apply Dar Al-Fatwa (3–6 weeks)",
          "STRIKE trademark filing — Class 29 + 35, Lebanese MoET",
          "Brand designer briefing — upon trademark availability confirmation",
          "Warm activation calls — sports nutrition stores (begins now)",
        ]
      },
      {
        phase: "PHASE 2", time: "Month 4–6", color: C.amber,
        title: "Launch",
        actions: [
          "Formal launch: 20–30 gym accounts with product, display, terms",
          "Sports nutrition stores — Priority One, personal delivery, staff training",
          "Trainer activation program — 'THE STRIKE TEAM' founding 20 trainers",
          "Sale-or-return terms for all first-month placements",
          "Weekly sell-through monitoring across all accounts",
          "Pharmacy and nutrition shop outreach begins Month 4",
          "Consumer feedback collected systematically at every visit",
        ]
      },
      {
        phase: "PHASE 3", time: "Month 6–12", color: C.greenBright,
        title: "Expand",
        actions: [
          "Modern trade approach (Spinneys, TSC, Bou Khalil) with sell-through data",
          "Corporate B2B channel development — hospitals, offices, hotels",
          "Second SKU evaluation based on demand signals (STRIPS)",
          "FMCG distributor engagement as volume warrants",
          "Quarterly key account reviews — top 10 accounts",
          "Brand health assessment — 50+ consumer survey",
        ]
      },
      {
        phase: "PHASE 4", time: "Month 12+", color: C.purple,
        title: "Scale",
        actions: [
          "GCC export preparation — UAE and Saudi Arabia first markets",
          "ESMA registration + GCC Halal certification",
          "STRIKE PACKS variety multipack for GCC hypermarket entry",
          "Za'atar flavor — the Lebanese-exclusive GCC differentiator",
          "Western market horizon planning — FDA registration, D2C digital",
        ]
      },
    ],
    notes: {
      open: "The go-to-market is relationship-first, channel-sequenced, and non-digital by design. This is not a conservative choice — it is the commercially correct approach for the Lebanese market and for the MENA region, where 82.6% of sports nutrition is purchased through brick-and-mortar. The warm relationships already in place across gyms, nutrition stores, and pharmacies compress what would normally be a 3-month cold-outreach cycle into 2–3 weeks.",
      emphasis: [
        "Sports nutrition stores are Priority One over gyms — their customer is already in protein-buying mode on every visit. The cross-sell is automatic.",
        "The STRIKE TEAM trainer program costs almost nothing and creates the most powerful sales force available: people who believe in the product and talk about it in every session.",
        "Phase 4 GCC entry is built into the product from day one — Halal certification, Arabic packaging, clean label. We do not need to redesign anything to export.",
      ],
      timing: "4 minutes",
    }
  },
  // ── 09 FINANCIAL SCENARIOS ───────────────────────────────────────────────────
  {
    id: "financial",
    type: "tiers",
    section: "06 · FINANCIAL SCENARIOS",
    label: "FINANCIALS",
    title: "Three Budget Scenarios — Board Decision Required",
    tiers: [
      {
        tier: "TIER 1", name: "Lean Launch", total: "$18,500", color: C.greenBright,
        tagline: "Validate the concept. Minimum spend.",
        breakeven: "Month 7–9", margin: "42–48%", accounts_m6: "30–40", rev_m6: "$8K–14K/mo",
        suitable: "Risk-averse or liquidity-constrained. Single SKU. Functional brand — not exceptional.",
        risk: "Slower brand build. Packaging at this tier is functional, not premium. Risk of appearing underfunded vs. imported competitors at pharmacy shelf level.",
        includes: ["SARL registration", "MoPH (1 SKU)", "Basic brand identity", "First production batch (60 days)", "30 gym outreach", "Contingency 15%"],
      },
      {
        tier: "TIER 2", name: "Standard Launch", total: "$42,000", color: C.gold,
        tagline: "Professional entry. Shelf-ready from day one.",
        breakeven: "Month 5–7", margin: "48–55%", accounts_m6: "60–80", rev_m6: "$18K–28K/mo",
        suitable: "Recommended scenario. Serious commercial intent. 2 SKUs, full brand identity, gym-to-pharmacy launch.",
        risk: "Mid-range spend requires scope discipline. Brand investment must be executed by professionals — cannot be cut after approval.",
        recommended: true,
        includes: ["SARL + all licensing", "MoPH (2 SKUs)", "Full brand identity system", "2 SKU production (90 days)", "50+ account outreach", "KITS Phase 0–2 fee", "Contingency 15%"],
      },
      {
        tier: "TIER 3", name: "Full Market Entry", total: "$82,000", color: C.amber,
        tagline: "Category creation. Export-ready from launch.",
        breakeven: "Month 4–6", margin: "52–60%", accounts_m6: "100–130", rev_m6: "$35K–55K/mo",
        suitable: "Fully committed, capitalized entrepreneur. 3 SKUs, dedicated sales rep, modern trade entry, 6-month working capital runway.",
        risk: "Higher commitment requires monthly P&L reviews and milestone-gated fund releases. Full KITS co-management mandate required.",
        includes: ["Full legal + GCC pre-filing", "MoPH (3 SKUs) + label compliance", "Agency-level brand system", "3 SKU production (120 days)", "Dedicated sales rep (6 months)", "KITS Phase 0–3 fee (12 months)", "6-month working capital runway"],
      },
    ],
    notes: {
      open: "Three scenarios. One decision. KITS recommends Tier 2 as the baseline — it funds a proper brand identity, two SKUs, a full gym-to-pharmacy launch, and a working capital buffer that absorbs the 3–4 month regulatory processing gap. Tier 1 is for validation only. Tier 3 is for a fully committed, capitalized partner with a 2–3 year horizon.",
      emphasis: [
        "The working capital buffer is not optional. MoPH registration takes 2–4 months. During that time, costs run but revenue has not started. The buffer is what keeps the business alive between investment and first sale.",
        "All projections assume no major Lebanese economic disruption. All figures are USD-denominated.",
        "Budget tier decision needed today. It determines: production batch size, brand identity budget, KITS fee structure, and scope of first outreach wave.",
      ],
      timing: "5 minutes",
    }
  },
  // ── 10 CRITICAL BLOCKERS ─────────────────────────────────────────────────────
  {
    id: "blockers",
    type: "blockers",
    section: "07 · CRITICAL BLOCKERS",
    label: "DECISIONS",
    title: "What Must Be Resolved Today",
    subtitle: "These items are blocking forward progress. Each one has a specific owner and a specific deadline.",
    blockers: [
      {
        urgency: "RESOLVE TODAY",
        color: C.red,
        item: "Budget tier selection",
        owner: "Board / Funder",
        impact: "Determines: production batch size, brand identity scope, KITS fee structure, first outreach wave scale. Nothing moves to planning without this.",
        action: "Board votes on Tier 1, 2, or 3. KITS proposes Tier 2 as baseline."
      },
      {
        urgency: "RESOLVE TODAY",
        color: C.red,
        item: "KITS Management Mandate — formal signing",
        owner: "Entrepreneur + KITS",
        impact: "KITS cannot make introductions, sign on behalf of the venture, or commit resources without a signed mandate. All advisory work to date has been pre-mandate.",
        action: "Sign mandate document. KITS provides draft. Legal review if required — 48 hours maximum."
      },
      {
        urgency: "THIS WEEK",
        color: C.amber,
        item: "Nutritional panel from manufacturer",
        owner: "Entrepreneur → Manufacturer",
        impact: "Blocks: MoPH registration, lab testing, packaging artwork, all pricing. Every [X] in this deck is a placeholder until this exists.",
        action: "Entrepreneur contacts manufacturer today. Full technical data sheet required within 5 business days."
      },
      {
        urgency: "THIS WEEK",
        color: C.amber,
        item: "Brand name final confirmation — STRIKE",
        owner: "Board",
        impact: "Blocks: trademark filing, designer briefing, domain/social handle reservation. Trademark search already confirms Lebanese Class 29 is clear.",
        action: "Board confirms STRIKE. IP lawyer engaged immediately for formal filing."
      },
      {
        urgency: "THIS WEEK",
        color: C.amber,
        item: "Primary flavor name — SMOKING BBQ BITES",
        owner: "Board + Manufacturer",
        impact: "Blocks: flavor development brief to manufacturer, packaging copy, MoPH submission. Codename confirmed — commercial name pending.",
        action: "Board approves 'SMOKING BBQ BITES' as launch flavor name. Manufacturer receives Lebanese BBQ flavor specification brief."
      },
      {
        urgency: "WEEK 2–3",
        color: C.gold,
        item: "Manufacturer supply agreement — signed",
        owner: "Entrepreneur + Manufacturer",
        impact: "Blocks: MOQ confirmation, lead time planning, production scheduling, cost-per-unit certainty, pricing model.",
        action: "KITS provides supply agreement template. Legal review. Target signing within 14 days of today."
      },
    ],
    notes: {
      open: "This is the most important section of the presentation. Every other slide tells you what we have done and what we are planning. This slide tells you what is stopping us from executing. These are not risks — they are known blockers with known solutions. The question is: who resolves each one, and by when?",
      emphasis: [
        "The budget decision and the mandate signing can both happen today, in this room. They require no external input.",
        "The nutritional panel is on the critical path for everything. MoPH registration cannot start without it. Packaging cannot be designed without it. Pricing cannot be finalized without it. This is the single item with the longest downstream impact.",
        "First-mover advantage has a shelf life. Every week of delay on these blockers is a week of delay on the first sale.",
      ],
      timing: "8 minutes — allow for discussion",
    }
  },
  // ── 11 KITS MANDATE ──────────────────────────────────────────────────────────
  {
    id: "mandate",
    type: "mandate",
    section: "08 · KITS MANDATE",
    label: "MANDATE",
    title: "KITS Role, Scope & Governance",
    scope: [
      { area: "Commercial Operations", items: ["Channel outreach and account management", "Trade presentation and sales visits", "Account tracker maintenance and reporting", "Reorder and logistics management"] },
      { area: "Regulatory & Legal", items: ["MoPH registration process management", "Halal certification coordination", "Trademark filing supervision", "SARL registration guidance"] },
      { area: "Brand & Product", items: ["Designer briefing and creative direction", "Manufacturer technical brief management", "Packaging compliance sign-off", "Flavor development oversight"] },
      { area: "Financial Reporting", items: ["Monthly P&L against budget tier", "Sell-through reporting by account", "Cash flow monitoring and alerts", "Budget variance reporting"] },
    ],
    governance: [
      "Weekly check-in: KITS → Entrepreneur (sell-through, blockers, decisions needed)",
      "Monthly board update: Financial performance, account growth, competitive activity",
      "90-day pricing review: USD-anchored price adjustment cycle",
      "Milestone-gated fund release: Budget released by phase, not all upfront",
    ],
    fees: {
      note: "Fee structure is tier-dependent and milestone-linked. Full details in mandate document.",
      tiers: [
        { tier: "Tier 1", range: "Included in contingency budget" },
        { tier: "Tier 2", range: "$3,000–$5,000 (Phase 0–2, 6 months)" },
        { tier: "Tier 3", range: "$8,000–$14,000 (Phase 0–3, 12 months)" },
      ]
    },
    notes: {
      open: "KITS is not an advisor in the traditional sense. KITS is the commercial operator. Every account visit, every regulatory filing, every designer brief — KITS owns the execution. The entrepreneur owns the decisions. The board owns the capital. That is the governance structure this venture requires to succeed.",
      emphasis: [
        "The mandate must be signed before KITS makes any introduction, commitment, or expenditure on behalf of the venture.",
        "Milestone-gated fund release is non-negotiable. It protects both parties and creates accountability at every phase.",
        "IP ownership of all KITS deliverables transfers to the client upon receipt of final payment — this is already in the mandate template.",
      ],
      timing: "4 minutes",
    }
  },
  // ── 12 NEXT STEPS ────────────────────────────────────────────────────────────
  {
    id: "nextsteps",
    type: "timeline",
    section: "09 · NEXT STEPS",
    label: "TIMELINE",
    title: "From Today to First Sale",
    milestones: [
      { week: "TODAY", label: "Board decisions", items: ["Budget tier confirmed", "Mandate signed", "STRIKE brand name confirmed", "SMOKING BBQ BITES flavor name approved"], color: C.red },
      { week: "WEEK 1", label: "Immediate actions", items: ["Manufacturer contacted for nutritional panel", "Notary engaged for SARL registration", "IP lawyer engaged for trademark filing", "Domain + social handles reserved"], color: C.amber },
      { week: "WEEK 2–3", label: "Build phase begins", items: ["Manufacturer supply agreement signed", "Lab testing commissioned (LIBNOR)", "MoPH registration process initiated", "Halal certification applied (Dar Al-Fatwa)"], color: C.gold },
      { week: "WEEK 4–6", label: "Brand in motion", items: ["Designer briefed — brand identity begins", "Lebanese BBQ flavor brief sent to manufacturer", "Warm activation calls to sports nutrition stores", "Trade presentation kit development begins"], color: C.gold },
      { week: "MONTH 3–4", label: "Pre-launch", items: ["Brand identity finalized", "Packaging artwork completed — MoPH compliance check", "First production batch ordered", "Account visits begin — samples + presentation kit"], color: C.greenBright },
      { week: "MONTH 4–6", label: "FIRST SALES", items: ["Formal launch: 20–30 accounts", "STRIKE TEAM trainer program activated", "Sale-or-return terms in place", "Weekly sell-through reporting begins"], color: C.greenBright },
    ],
    notes: {
      open: "From board decision to first sale: approximately 14–18 weeks if blockers are resolved today. That is Q4 2026. Every week of delay on the blockers adds a week to this timeline. The MoPH registration is the longest lead-time item — it runs in parallel with everything else and cannot be compressed.",
      emphasis: [
        "The warm activation calls to sports nutrition stores can begin this week — before product, before packaging, before final branding. You are building relationships, not making sales. The relationship comes first.",
        "14–18 weeks is a realistic timeline only if the budget decision and mandate are resolved today.",
      ],
      timing: "3 minutes",
    }
  },
  // ── 13 CLOSING ────────────────────────────────────────────────────────────────
  {
    id: "closing",
    type: "closing",
    section: null,
    label: "CLOSE",
    title: "The Opportunity Is Real. The Category Is Empty. The Team Is Ready.",
    decisions: [
      "Budget tier — Tier 1, 2, or 3?",
      "KITS Management Mandate — sign today",
      "Brand name — STRIKE confirmed?",
      "Flavor name — SMOKING BBQ BITES confirmed?",
      "Manufacturer nutritional panel — action owner and deadline?",
    ],
    artifacts: [
      { ref: "KAG-JRK-001", title: "Full Advisory Framework", desc: "10-section A–Z market entry guide" },
      { ref: "KAG-JRK-002", title: "Master Launch Checklist", desc: "38-step Phase 0→4 with brand name research" },
      { ref: "KAG-JRK-003", title: "Financial Feasibility Study", desc: "Three-tier model with full projections" },
      { ref: "KAG-JRK-004", title: "Trade Outreach System", desc: "Scripts, objections, commercial terms, tracker" },
      { ref: "KAG-JRK-005", title: "Competitive Analysis", desc: "Full middleman + end user analysis" },
      { ref: "KAG-JRK-006", title: "Brand & Packaging Design Brief", desc: "Complete spec for designer" },
      { ref: "KAG-JRK-007", title: "Manufacturer Technical Brief", desc: "Flavor, quality, Halal, supply terms" },
      { ref: "KAG-JRK-008", title: "STRIKE Brand Enhancement Study", desc: "88/100 brand score, full enhancement recommendations" },
    ],
    notes: {
      open: "That is the presentation. Everything we have shown today is supported by eight detailed advisory documents — all available for deep review. This meeting exists for one purpose: to leave with five decisions made. The product is sound, the market is open, the brand is strong, the team is ready. What we need now is commitment and clarity.",
      emphasis: [
        "Ask the room directly: 'Which tier?' Do not leave without a number.",
        "Offer to sign the mandate document in the room if it has been pre-reviewed.",
        "Close with: 'The category is empty today. The question is whether STRIKE owns it, or whether we watch someone else build it.'",
      ],
      timing: "4 minutes + Q&A",
    }
  },
];

// ─── SLIDE RENDERERS ──────────────────────────────────────────────────────────

function CoverSlide({ slide }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start", padding: "0 80px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: `linear-gradient(${C.gold} 1px, transparent 1px), linear-gradient(90deg, ${C.gold} 1px, transparent 1px)`,
        backgroundSize: "40px 40px" }} />
      <div style={{ position: "absolute", right: 0, top: 0, width: "35%", height: "100%",
        background: `linear-gradient(135deg, ${C.gold}06 0%, transparent 60%)`, pointerEvents: "none" }} />
      <div style={{ fontFamily: "monospace", fontSize: 11, color: C.gold, opacity: 0.6, letterSpacing: "0.4em", marginBottom: 24 }}>
        KITS ADVISORY GROUP · CONFIDENTIAL · KAG-JRK-BOARD-001
      </div>
      <h1 style={{ fontFamily: "'Didot','Bodoni MT','Playfair Display',Georgia,serif", fontSize: "clamp(48px,7vw,88px)", fontWeight: 400, color: C.strike, margin: "0 0 8px", letterSpacing: "0.2em", lineHeight: 1 }}>
        STRIKE
      </h1>
      <h2 style={{ fontFamily: "'Didot','Bodoni MT',Georgia,serif", fontSize: "clamp(20px,3vw,36px)", fontWeight: 400, color: C.gold, margin: "0 0 32px", letterSpacing: "0.1em" }}>
        BITES
      </h2>
      <div style={{ width: 80, height: 2, background: `linear-gradient(to right, ${C.gold}, transparent)`, marginBottom: 32 }} />
      <p style={{ fontSize: "clamp(14px,2vw,20px)", color: C.cream, opacity: 0.8, margin: "0 0 8px", letterSpacing: "0.05em", fontFamily: "Georgia,serif" }}>
        Board Meeting — Initial Advisory Presentation
      </p>
      <p style={{ fontFamily: "monospace", fontSize: 11, color: C.creamDim, opacity: 0.5, margin: 0, letterSpacing: "0.2em" }}>
        {slide.meta}
      </p>
      <div style={{ position: "absolute", bottom: 40, right: 80, fontFamily: "monospace", fontSize: 9, color: C.creamDim, opacity: 0.3, letterSpacing: "0.2em" }}>
        PREMIUM PORTIONED BEEF JERKY · LEBANESE MARKET ENTRY · GCC SCALE
      </div>
    </div>
  );
}

function AgendaSlide({ slide }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "48px 80px" }}>
      <SlideHeader slide={slide} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 48px", alignContent: "start", marginTop: 16 }}>
        {slide.items.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 16, alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.ash}` }}>
            <span style={{ fontFamily: "monospace", fontSize: 10, color: C.gold, flexShrink: 0, opacity: 0.7 }}>{item.n}</span>
            <span style={{ fontSize: 14, color: C.cream, flex: 1, lineHeight: 1.4 }}>{item.text}</span>
            <span style={{ fontFamily: "monospace", fontSize: 9, color: C.creamDim, flexShrink: 0, background: `${C.ash}`, padding: "2px 8px", borderRadius: 2 }}>{item.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsSlide({ slide }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "48px 80px" }}>
      <SlideHeader slide={slide} />
      <p style={{ fontSize: 20, color: C.gold, fontFamily: "Georgia,serif", margin: "16px 0 32px", lineHeight: 1.5, fontStyle: "italic" }}>
        "{slide.headline}"
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, flex: 1 }}>
        {slide.stats.map((s, i) => (
          <div key={i} style={{ background: `${s.color}08`, border: `1px solid ${s.color}30`, borderTop: `3px solid ${s.color}`, borderRadius: 4, padding: "24px 20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ fontFamily: "monospace", fontSize: "clamp(24px,3vw,40px)", color: s.color, lineHeight: 1, marginBottom: 12 }}>{s.value}</div>
            <div>
              <div style={{ fontSize: 13, color: C.cream, marginBottom: 4, lineHeight: 1.4 }}>{s.label}</div>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: C.creamDim, letterSpacing: "0.05em" }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TwoColSlide({ slide }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "48px 80px" }}>
      <SlideHeader slide={slide} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 16 }}>
        {[slide.left, slide.right].map((col, ci) => (
          <div key={ci} style={{ background: ci === 0 ? `${C.gold}06` : `${C.greenBright}06`, border: `1px solid ${ci === 0 ? C.gold : C.greenBright}20`, borderRadius: 4, padding: "24px 28px" }}>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: ci === 0 ? C.gold : C.greenBright, letterSpacing: "0.2em", marginBottom: 16 }}>{col.heading}</div>
            {col.items.map((item, ii) => (
              <div key={ii} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                <span style={{ color: ci === 0 ? C.gold : C.greenBright, fontSize: 10, flexShrink: 0, marginTop: 3 }}>→</span>
                <p style={{ margin: 0, fontSize: 13, color: C.cream, opacity: 0.85, lineHeight: 1.6 }}>{item}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductSlide({ slide }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "40px 80px" }}>
      <SlideHeader slide={slide} />
      <p style={{ fontSize: 15, color: C.gold, fontFamily: "Georgia,serif", margin: "8px 0 20px", fontStyle: "italic" }}>{slide.tagline}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 20 }}>
        {slide.pillars.map((p, i) => (
          <div key={i} style={{ background: C.charcoal, border: `1px solid ${C.ash}`, borderRadius: 3, padding: "12px 14px" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
              <span style={{ color: C.gold, fontSize: 10 }}>{p.icon}</span>
              <span style={{ fontFamily: "monospace", fontSize: 9, color: C.gold, letterSpacing: "0.1em" }}>{p.label}</span>
            </div>
            <p style={{ margin: 0, fontSize: 12, color: C.cream, opacity: 0.8, lineHeight: 1.5 }}>{p.value}</p>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: "monospace", fontSize: 9, color: C.creamDim, letterSpacing: "0.2em", marginBottom: 10 }}>PRODUCT LINE ARCHITECTURE</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
        {slide.line.map((l, i) => (
          <div key={i} style={{ background: `${l.color}08`, border: `1px solid ${l.color}30`, borderLeft: `3px solid ${l.color}`, borderRadius: 3, padding: "10px 12px" }}>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: l.color, marginBottom: 4 }}>{l.phase}</div>
            <div style={{ fontSize: 12, color: C.cream, marginBottom: 3 }}>{l.name}</div>
            <div style={{ fontSize: 10, color: l.color, marginBottom: 3 }}>{l.flavor}</div>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: C.creamDim }}>{l.channel}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MatrixSlide({ slide }) {
  const cols = ["criterion", "jl", "ww", "qb", "bb", "us"];
  const headers = ["CRITERION", "Jack Link's", "Wild West", "Quest Bar", "Barebells", "STRIKE"];
  const colors = { jl: C.red, ww: C.amber, qb: C.purple, bb: "#6080A0", us: C.greenBright };
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "40px 80px" }}>
      <SlideHeader slide={slide} />
      <p style={{ fontSize: 12, color: C.creamDim, fontFamily: "monospace", margin: "4px 0 16px", letterSpacing: "0.15em" }}>{slide.subtitle}</p>
      <div style={{ flex: 1, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} style={{ padding: "8px 12px", fontFamily: "monospace", fontSize: 9, color: i === 0 ? C.creamDim : i === 5 ? C.greenBright : C.creamDim, letterSpacing: "0.1em", textAlign: "left", borderBottom: `2px solid ${i === 5 ? C.greenBright : C.ash}`, background: i === 5 ? `${C.greenBright}10` : "transparent", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slide.rows.map((row, ri) => (
              <tr key={ri} style={{ background: ri % 2 === 0 ? `${C.charcoal}` : C.obsidian }}>
                {cols.map((col, ci) => (
                  <td key={ci} style={{ padding: "10px 12px", fontSize: ci === 0 ? 12 : 11, color: ci === 5 ? (row.usWin ? C.greenBright : C.cream) : ci === 0 ? C.cream : C.creamDim, background: ci === 5 ? `${C.greenBright}08` : "transparent", borderBottom: `1px solid ${C.ash}`, fontFamily: ci > 0 ? "monospace" : "Georgia,serif", lineHeight: 1.3 }}>
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 12, padding: "10px 16px", background: `${C.greenBright}10`, border: `1px solid ${C.greenBright}30`, borderRadius: 3, display: "flex", gap: 10, alignItems: "center" }}>
        <span style={{ color: C.greenBright, fontSize: 14 }}>★</span>
        <p style={{ margin: 0, fontSize: 12, color: C.greenBright, fontFamily: "Georgia,serif" }}>STRIKE wins on every criterion. No competitor holds more than three of these seven advantages simultaneously. We hold all seven.</p>
      </div>
    </div>
  );
}

function BrandSlide({ slide }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "40px 80px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <SlideHeader slide={slide} />
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <div style={{ fontSize: 32, fontFamily: "monospace", color: C.goldBright, lineHeight: 1 }}>{slide.score}</div>
          <div style={{ fontFamily: "monospace", fontSize: 8, color: C.gold, letterSpacing: "0.1em" }}>/100 BRAND SCORE</div>
          <div style={{ fontFamily: "monospace", fontSize: 7, color: C.greenBright, marginTop: 2 }}>APPROVED — STRONG</div>
        </div>
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 16, alignContent: "start" }}>
        {slide.elements.map((el, i) => (
          <div key={i} style={{ background: C.charcoal, border: `1px solid ${el.verdict === "APPROVED" ? C.greenBright : el.verdict === "RECOMMENDED" ? C.gold : C.amber}20`, borderLeft: `3px solid ${el.verdict === "APPROVED" ? C.greenBright : el.verdict === "RECOMMENDED" ? C.gold : C.amber}`, borderRadius: 3, padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, alignItems: "center" }}>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: C.creamDim, letterSpacing: "0.1em" }}>{el.label}</div>
              <span style={{ fontFamily: "monospace", fontSize: 8, color: el.verdict === "APPROVED" ? C.greenBright : el.verdict === "RECOMMENDED" ? C.gold : C.amber, background: `${el.verdict === "APPROVED" ? C.greenBright : el.verdict === "RECOMMENDED" ? C.gold : C.amber}15`, padding: "1px 6px", borderRadius: 2 }}>{el.verdict}</span>
            </div>
            <div style={{ fontSize: 15, color: C.cream, fontFamily: "Georgia,serif", marginBottom: 6 }}>{el.value}</div>
            <p style={{ margin: 0, fontSize: 11, color: C.creamDim, lineHeight: 1.5 }}>{el.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhasesSlide({ slide }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "40px 80px" }}>
      <SlideHeader slide={slide} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 16, alignContent: "start" }}>
        {slide.phases.map((ph, i) => (
          <div key={i} style={{ background: `${ph.color}06`, border: `1px solid ${ph.color}25`, borderTop: `3px solid ${ph.color}`, borderRadius: 4, padding: "16px 14px", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: ph.color, letterSpacing: "0.15em", marginBottom: 4 }}>{ph.phase}</div>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: C.creamDim, marginBottom: 8 }}>{ph.time}</div>
            <div style={{ fontSize: 13, color: C.cream, fontFamily: "Georgia,serif", marginBottom: 12 }}>{ph.title}</div>
            <div style={{ flex: 1 }}>
              {ph.actions.map((a, ai) => (
                <div key={ai} style={{ display: "flex", gap: 6, marginBottom: 7, alignItems: "flex-start" }}>
                  <span style={{ color: ph.color, fontSize: 8, flexShrink: 0, marginTop: 3 }}>→</span>
                  <p style={{ margin: 0, fontSize: 10, color: C.creamDim, lineHeight: 1.5 }}>{a}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TiersSlide({ slide }) {
  const [activeTier, setActiveTier] = useState(1);
  const t = slide.tiers[activeTier];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "40px 80px" }}>
      <SlideHeader slide={slide} />
      <div style={{ display: "flex", gap: 8, marginTop: 16, marginBottom: 16 }}>
        {slide.tiers.map((tier, i) => (
          <button key={i} onClick={() => setActiveTier(i)} style={{ flex: 1, background: activeTier === i ? `${tier.color}18` : C.charcoal, border: `1px solid ${activeTier === i ? tier.color : C.ash}`, borderRadius: 4, padding: "12px 16px", cursor: "pointer", textAlign: "left", transition: "all 0.2s", position: "relative" }}>
            {tier.recommended && <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", fontFamily: "monospace", fontSize: 7, color: C.gold, background: C.obsidian, padding: "2px 8px", border: `1px solid ${C.gold}40`, borderRadius: 2, whiteSpace: "nowrap" }}>KITS RECOMMENDED</div>}
            <div style={{ fontFamily: "monospace", fontSize: 8, color: tier.color, letterSpacing: "0.15em", marginBottom: 4 }}>{tier.tier}</div>
            <div style={{ fontSize: 13, color: C.cream, marginBottom: 4 }}>{tier.name}</div>
            <div style={{ fontFamily: "monospace", fontSize: 16, color: tier.color }}>{tier.total}</div>
          </button>
        ))}
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
            {[
              { label: "Breakeven", value: t.breakeven },
              { label: "Gross Margin", value: t.margin },
              { label: "Accounts M6", value: t.accounts_m6 },
            ].map((m, i) => (
              <div key={i} style={{ background: C.charcoal, border: `1px solid ${C.ash}`, borderRadius: 3, padding: "10px 12px" }}>
                <div style={{ fontFamily: "monospace", fontSize: 8, color: C.creamDim, marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontFamily: "monospace", fontSize: 14, color: t.color }}>{m.value}</div>
              </div>
            ))}
          </div>
          <div style={{ background: `${t.color}06`, border: `1px solid ${t.color}20`, borderRadius: 3, padding: "12px 14px", marginBottom: 8 }}>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: t.color, marginBottom: 6 }}>SUITABLE FOR</div>
            <p style={{ margin: 0, fontSize: 12, color: C.cream, lineHeight: 1.6 }}>{t.suitable}</p>
          </div>
          <div style={{ background: `${C.red}08`, border: `1px solid ${C.red}20`, borderRadius: 3, padding: "12px 14px" }}>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: C.red, marginBottom: 6 }}>RISK FACTOR</div>
            <p style={{ margin: 0, fontSize: 12, color: C.creamDim, lineHeight: 1.6 }}>{t.risk}</p>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: C.creamDim, letterSpacing: "0.15em", marginBottom: 10 }}>WHAT'S INCLUDED</div>
          {t.includes.map((inc, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "center", padding: "6px 0", borderBottom: `1px solid ${C.ash}` }}>
              <span style={{ color: t.color, fontSize: 10, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 12, color: C.cream }}>{inc}</span>
            </div>
          ))}
          <div style={{ marginTop: 12, padding: "10px 14px", background: `${t.color}10`, border: `1px solid ${t.color}30`, borderRadius: 3 }}>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: t.color, marginBottom: 4 }}>REVENUE AT MONTH 6</div>
            <div style={{ fontFamily: "monospace", fontSize: 20, color: t.color }}>{t.rev_m6}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockersSlide({ slide }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "40px 80px" }}>
      <SlideHeader slide={slide} />
      <p style={{ fontSize: 12, color: C.creamDim, fontFamily: "monospace", margin: "4px 0 14px", letterSpacing: "0.1em" }}>{slide.subtitle}</p>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, overflowY: "auto" }}>
        {slide.blockers.map((b, i) => (
          <div key={i} style={{ background: C.charcoal, border: `1px solid ${b.color}25`, borderLeft: `4px solid ${b.color}`, borderRadius: 3, padding: "10px 16px", display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ flexShrink: 0, minWidth: 110 }}>
              <div style={{ fontFamily: "monospace", fontSize: 8, color: b.color, background: `${b.color}15`, border: `1px solid ${b.color}30`, padding: "2px 8px", borderRadius: 2, letterSpacing: "0.1em", display: "inline-block", marginBottom: 4 }}>{b.urgency}</div>
              <div style={{ fontFamily: "monospace", fontSize: 8, color: C.creamDim }}>{b.owner}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: C.cream, fontFamily: "Georgia,serif", marginBottom: 4 }}>{b.item}</div>
              <p style={{ margin: "0 0 4px", fontSize: 11, color: C.creamDim, lineHeight: 1.5 }}>{b.impact}</p>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: b.color }}>ACTION → {b.action}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MandateSlide({ slide }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "40px 80px" }}>
      <SlideHeader slide={slide} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: C.gold, letterSpacing: "0.2em", marginBottom: 10 }}>KITS SCOPE OF AUTHORITY</div>
          {slide.scope.map((area, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: C.creamDim, marginBottom: 6 }}>{area.area.toUpperCase()}</div>
              {area.items.map((item, ii) => (
                <div key={ii} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                  <span style={{ color: C.gold, fontSize: 8, flexShrink: 0, marginTop: 2 }}>→</span>
                  <span style={{ fontSize: 11, color: C.cream, lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: C.gold, letterSpacing: "0.2em", marginBottom: 10 }}>GOVERNANCE STRUCTURE</div>
          {slide.governance.map((g, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, padding: "8px 0", borderBottom: `1px solid ${C.ash}` }}>
              <span style={{ color: C.gold, fontSize: 10, flexShrink: 0 }}>◈</span>
              <p style={{ margin: 0, fontSize: 11, color: C.cream, lineHeight: 1.5 }}>{g}</p>
            </div>
          ))}
          <div style={{ marginTop: 16 }}>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: C.gold, letterSpacing: "0.2em", marginBottom: 10 }}>FEE STRUCTURE</div>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: C.creamDim, marginBottom: 8 }}>{slide.fees.note}</div>
            {slide.fees.tiers.map((ft, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.ash}` }}>
                <span style={{ fontSize: 12, color: C.cream }}>{ft.tier}</span>
                <span style={{ fontFamily: "monospace", fontSize: 11, color: C.gold }}>{ft.range}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineSlide({ slide }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: "40px 80px" }}>
      <SlideHeader slide={slide} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginTop: 16, alignContent: "start" }}>
        {slide.milestones.map((m, i) => (
          <div key={i} style={{ background: `${m.color}06`, border: `1px solid ${m.color}25`, borderTop: `3px solid ${m.color}`, borderRadius: 4, padding: "14px 16px" }}>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: m.color, marginBottom: 4, letterSpacing: "0.1em" }}>{m.week}</div>
            <div style={{ fontSize: 13, color: C.cream, fontFamily: "Georgia,serif", marginBottom: 10 }}>{m.label}</div>
            {m.items.map((item, ii) => (
              <div key={ii} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                <span style={{ color: m.color, fontSize: 8, flexShrink: 0, marginTop: 3 }}>✓</span>
                <p style={{ margin: 0, fontSize: 11, color: C.creamDim, lineHeight: 1.5 }}>{item}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ClosingSlide({ slide }) {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: `linear-gradient(${C.gold} 1px, transparent 1px), linear-gradient(90deg, ${C.gold} 1px, transparent 1px)`,
        backgroundSize: "40px 40px" }} />
      <div style={{ fontFamily: "monospace", fontSize: 9, color: C.gold, opacity: 0.5, letterSpacing: "0.4em", marginBottom: 24 }}>KITS ADVISORY GROUP · DECISION REQUIRED</div>
      <h2 style={{ fontFamily: "'Didot','Bodoni MT',Georgia,serif", fontSize: "clamp(16px,2.5vw,28px)", fontWeight: 400, color: C.strike, margin: "0 0 32px", lineHeight: 1.4, maxWidth: 700 }}>{slide.title}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: C.red, letterSpacing: "0.2em", marginBottom: 14 }}>DECISIONS REQUIRED TODAY</div>
          {slide.decisions.map((d, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10, padding: "10px 14px", background: `${C.red}08`, border: `1px solid ${C.red}20`, borderLeft: `3px solid ${C.red}`, borderRadius: 3 }}>
              <span style={{ fontFamily: "monospace", fontSize: 10, color: C.red, flexShrink: 0, marginTop: 1 }}>{String(i + 1).padStart(2, "0")}</span>
              <p style={{ margin: 0, fontSize: 12, color: C.cream, lineHeight: 1.5 }}>{d}</p>
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: C.gold, letterSpacing: "0.2em", marginBottom: 14 }}>SUPPORTING ARTIFACTS</div>
          {slide.artifacts.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 6, padding: "6px 0", borderBottom: `1px solid ${C.ash}` }}>
              <span style={{ fontFamily: "monospace", fontSize: 8, color: C.goldDim, flexShrink: 0, marginTop: 1 }}>{a.ref}</span>
              <div>
                <div style={{ fontSize: 11, color: C.cream }}>{a.title}</div>
                <div style={{ fontFamily: "monospace", fontSize: 8, color: C.creamDim }}>{a.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SHARED SLIDE HEADER ──────────────────────────────────────────────────────
function SlideHeader({ slide }) {
  return (
    <div style={{ marginBottom: 4 }}>
      {slide.section && (
        <div style={{ fontFamily: "monospace", fontSize: 9, color: C.gold, opacity: 0.6, letterSpacing: "0.3em", marginBottom: 6 }}>{slide.section}</div>
      )}
      <h2 style={{ margin: "0 0 4px", fontFamily: "'Didot','Bodoni MT','Playfair Display',Georgia,serif", fontSize: "clamp(18px,2.5vw,32px)", fontWeight: 400, color: C.cream, lineHeight: 1.2 }}>{slide.title}</h2>
      <div style={{ width: 48, height: 2, background: `linear-gradient(to right, ${C.gold}, transparent)`, marginTop: 8 }} />
    </div>
  );
}

// ─── MAIN PRESENTATION COMPONENT ─────────────────────────────────────────────
export default function BoardPresentation() {
  const [current, setCurrent] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const total = SLIDES.length;
  const slide = SLIDES[current];

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent(c => Math.min(total - 1, c + 1)), [total]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); prev(); }
      if (e.key === "n" || e.key === "N") setShowNotes(s => !s);
      if (e.key === "Escape") setShowNav(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const renderSlide = () => {
    switch (slide.type) {
      case "cover": return <CoverSlide slide={slide} />;
      case "list": return <AgendaSlide slide={slide} />;
      case "stats": return <StatsSlide slide={slide} />;
      case "two-col": return <TwoColSlide slide={slide} />;
      case "product": return <ProductSlide slide={slide} />;
      case "matrix": return <MatrixSlide slide={slide} />;
      case "brand": return <BrandSlide slide={slide} />;
      case "phases": return <PhasesSlide slide={slide} />;
      case "tiers": return <TiersSlide slide={slide} />;
      case "blockers": return <BlockersSlide slide={slide} />;
      case "mandate": return <MandateSlide slide={slide} />;
      case "timeline": return <TimelineSlide slide={slide} />;
      case "closing": return <ClosingSlide slide={slide} />;
      default: return null;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#02020A", display: "flex", flexDirection: "column", fontFamily: "Georgia, serif" }}>

      {/* Top bar */}
      <div style={{ background: C.void, borderBottom: `1px solid ${C.ash}`, padding: "8px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "monospace", fontSize: 10, color: C.gold, letterSpacing: "0.3em" }}>STRIKE BITES</span>
          <span style={{ fontFamily: "monospace", fontSize: 9, color: C.creamDim, opacity: 0.4 }}>BOARD PRESENTATION · KITS ADVISORY GROUP</span>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={() => setShowNav(!showNav)} style={{ background: showNav ? `${C.gold}15` : "transparent", border: `1px solid ${showNav ? C.gold : C.ash}`, borderRadius: 3, padding: "4px 12px", cursor: "pointer", fontFamily: "monospace", fontSize: 9, color: showNav ? C.gold : C.creamDim, letterSpacing: "0.1em" }}>
            SLIDES
          </button>
          <button onClick={() => setShowNotes(!showNotes)} style={{ background: showNotes ? `${C.gold}15` : "transparent", border: `1px solid ${showNotes ? C.gold : C.ash}`, borderRadius: 3, padding: "4px 12px", cursor: "pointer", fontFamily: "monospace", fontSize: 9, color: showNotes ? C.gold : C.creamDim, letterSpacing: "0.1em" }}>
            NOTES {showNotes ? "ON" : "OFF"}
          </button>
          <span style={{ fontFamily: "monospace", fontSize: 10, color: C.creamDim }}>{String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Slide navigator */}
      {showNav && (
        <div style={{ background: C.obsidian, borderBottom: `1px solid ${C.ash}`, padding: "12px 24px", display: "flex", gap: 6, flexWrap: "wrap", flexShrink: 0 }}>
          {SLIDES.map((s, i) => (
            <button key={i} onClick={() => { setCurrent(i); setShowNav(false); }} style={{ background: current === i ? `${C.gold}18` : "transparent", border: `1px solid ${current === i ? C.gold : C.ash}`, borderRadius: 3, padding: "6px 12px", cursor: "pointer", transition: "all 0.15s" }}>
              <div style={{ fontFamily: "monospace", fontSize: 7, color: current === i ? C.gold : C.creamDim, marginBottom: 2, letterSpacing: "0.1em" }}>{String(i + 1).padStart(2, "0")}</div>
              <div style={{ fontSize: 9, color: current === i ? C.cream : C.creamDim }}>{s.label}</div>
            </button>
          ))}
        </div>
      )}

      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* Main slide area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          {/* Slide */}
          <div style={{ flex: 1, background: C.obsidian, position: "relative", overflow: "hidden", minHeight: showNotes ? "55vh" : "calc(100vh - 80px)" }}>
            {/* Progress bar */}
            <div style={{ position: "absolute", top: 0, left: 0, width: `${((current + 1) / total) * 100}%`, height: 2, background: `linear-gradient(to right, ${C.gold}, ${C.goldBright})`, transition: "width 0.3s ease", zIndex: 10 }} />
            {renderSlide()}
            {/* Navigation arrows */}
            <button onClick={prev} disabled={current === 0} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", background: `${C.obsidian}CC`, border: `1px solid ${C.ash}`, borderRadius: "50%", width: 36, height: 36, cursor: current === 0 ? "default" : "pointer", color: current === 0 ? C.ash : C.cream, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", opacity: current === 0 ? 0.3 : 0.7, transition: "opacity 0.2s" }}>‹</button>
            <button onClick={next} disabled={current === total - 1} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: `${C.obsidian}CC`, border: `1px solid ${C.ash}`, borderRadius: "50%", width: 36, height: 36, cursor: current === total - 1 ? "default" : "pointer", color: current === total - 1 ? C.ash : C.cream, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", opacity: current === total - 1 ? 0.3 : 0.7, transition: "opacity 0.2s" }}>›</button>
          </div>

          {/* Presenter notes */}
          {showNotes && slide.notes && (
            <div style={{ background: "#0A0808", borderTop: `2px solid ${C.gold}40`, padding: "16px 32px", maxHeight: "40vh", overflowY: "auto", flexShrink: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ fontFamily: "monospace", fontSize: 9, color: C.gold, letterSpacing: "0.25em" }}>PRESENTER NOTES · {slide.label}</div>
                <div style={{ fontFamily: "monospace", fontSize: 9, color: C.creamDim }}>SUGGESTED TIMING: {slide.notes.timing}</div>
              </div>
              <p style={{ margin: "0 0 14px", fontSize: 13, color: C.cream, lineHeight: 1.8, borderLeft: `3px solid ${C.gold}40`, paddingLeft: 14 }}>
                {slide.notes.open}
              </p>
              {slide.notes.emphasis && slide.notes.emphasis.length > 0 && (
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: C.amber, letterSpacing: "0.2em", marginBottom: 8 }}>EMPHASIS POINTS</div>
                  {slide.notes.emphasis.map((e, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                      <span style={{ color: C.amber, fontSize: 10, flexShrink: 0, marginTop: 2 }}>★</span>
                      <p style={{ margin: 0, fontSize: 12, color: C.amber, opacity: 0.85, lineHeight: 1.7 }}>{e}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ background: C.void, borderTop: `1px solid ${C.ash}`, padding: "6px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 24 }}>
          <button onClick={prev} disabled={current === 0} style={{ background: "transparent", border: "none", cursor: current === 0 ? "default" : "pointer", fontFamily: "monospace", fontSize: 9, color: current === 0 ? C.ash : C.creamDim, letterSpacing: "0.1em" }}>← PREV</button>
          <button onClick={next} disabled={current === total - 1} style={{ background: "transparent", border: "none", cursor: current === total - 1 ? "default" : "pointer", fontFamily: "monospace", fontSize: 9, color: current === total - 1 ? C.ash : C.creamDim, letterSpacing: "0.1em" }}>NEXT →</button>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 20 : 6, height: 4, borderRadius: 2, background: i === current ? C.gold : C.ash, border: "none", cursor: "pointer", padding: 0, transition: "all 0.25s ease" }} />
          ))}
        </div>
        <div style={{ fontFamily: "monospace", fontSize: 8, color: C.creamDim, opacity: 0.4, letterSpacing: "0.15em" }}>
          N = TOGGLE NOTES · ← → NAVIGATE · ESC = CLOSE NAV
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef, useCallback, useContext } from "react";
import { ThemeCtx } from './pitch-theme';

// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const T = {
  bg: "#08070A", card: "#0D0C14", dark2: "#111220", line: "#1C1A26",
  gold: "#C8A96E", goldBright: "#E0C080", goldDim: "#4A3820",
  cream: "#E2D8CC", creamDim: "#7A7090",
  teal: "#7EB5A6", coral: "#E07B6A", purple: "#9B8EC4",
  amber: "#C07030", green: "#5A9060", blue: "#5080B0", dim: "#3A3550",
};
const fmt = (n: number) => n === 0 ? "—" : `$${n.toLocaleString()}`;
const pct = (n: number, t: number) => Math.round((n / t) * 100);

// ─── TIER DATA ─────────────────────────────────────────────────────────────────
const TIERS = [
  { id: "lean",     label: "TIER 1", name: "Lean Launch",       total: 24000, color: T.teal,  rec: false,
    roi: "~155%", breakeven: "M9–M12", margin: "42–48%", accounts: "30–40",
    note: "Proof of concept. Functional — not exceptional. Risk: insufficient brand authority vs. Jack Link's ($5.62) on the same shelf." },
  { id: "standard", label: "TIER 2", name: "Standard Launch",   total: 62000, color: T.gold,  rec: true,
    roi: "~265%", breakeven: "M8–M11", margin: "55–62%", accounts: "60–80",
    note: "Recommended — revised from $42K to $62K. Now includes all missing cost categories: transport, overhead, banking setup, and full technology stack." },
  { id: "full",     label: "TIER 3", name: "Full Market Entry", total: 96000, color: T.coral, rec: false,
    roi: "~310%", breakeven: "M5–M7",  margin: "58–64%", accounts: "130+",
    note: "Comprehensive. Dedicated sales rep, agency branding, 3 SKUs, GCC pre-filing, 12-month advisory scope. For entrepreneurs committed to category ownership." },
];

// ─── 10 INVESTMENT CATEGORIES ──────────────────────────────────────────────────
const CATS = [
  { id:"legal",       name:"Legal & Regulatory",            color:T.gold,   icon:"⚖",  phase:"Phase 0",   phaseM:"M0–M2",
    totals:[6500,10500,15000],
    when:"SARL: Week 1. MoPH submission: Day 1 — the 2–4 month processing clock starts immediately. Trademark: before any public brand exposure.",
    why:"Every product placement is blocked without MoPH registration. Every halal channel requires Dar Al-Fatwa. Trademark must be filed before any account sees the STRIKE name. This is not bureaucracy — it is the foundation that makes everything else legally defensible.",
    items:{
      lean:[
        {l:"SARL registration — notary + Commercial Register",a:2000,n:"All-in. Mandatory for Lebanese commercial operations. Minimum capital LBP 5M (~$55). Mandatory lawyer included."},
        {l:"Tax ID + NSSF registration",a:300,n:"Employer NSSF rate: ~23.5% on salary (maternity 8% + family 6% + EOSI 8.5%; employee pays 3%)."},
        {l:"MoPH food product registration — 1 SKU",a:1200,n:"Ministry of Public Health. No public fee schedule published. Budget based on regulatory consultant guidance."},
        {l:"Lab testing — nutritional panel + microbiology, 1 SKU",a:600,n:"CCIAS accredited lab: $25/micro panel, $15/label panel. Required for MoPH file."},
        {l:"Halal certification — Dar Al-Fatwa Lebanon",a:600,n:"Lebanon-only. 3–6 week timeline. Required for gym, pharmacy, and modern trade channels."},
        {l:"Trademark — Class 29 (food products)",a:700,n:"STRIKE brand. IP search + filing. Attorney fees dominate over official state fees."},
        {l:"GS1 Lebanon — 1 barcode allocation",a:200,n:"Contact customers@gs1lb.org for verified quote. Working placeholder $150–300 reg + annual."},
        {l:"IP lawyer — basic filing + correspondence",a:400},
        {l:"Shelf-life stability testing — 1 SKU",a:500,n:"Confirms product integrity over claimed shelf life. International benchmark $400–800."},
      ],
      standard:[
        {l:"SARL registration — notary + CR + mandatory corporate lawyer",a:3500,n:"Per Mattar Law / PwC Lebanon: all-in should not exceed 1% of capital. Articles, CR, and mandatory retainer included."},
        {l:"Tax ID + NSSF + business licensing",a:400},
        {l:"MoPH food product registration — 2 SKUs",a:2000,n:"Both SKUs filed simultaneously. 2–4 month processing each. File Day 1 — clock must start before any other step."},
        {l:"Lab testing — nutritional + micro, 2 SKUs × 2 rounds",a:1200,n:"Round 1: MoPH submission. Round 2: batch QC on first production run. CCIAS ISO 17025 accredited."},
        {l:"Halal certification — Dar Al-Fatwa Lebanon, full scope",a:800},
        {l:"Trademark — Class 29 (food) + Class 35 (retail services)",a:1200,n:"Both classes. Class 35 protects the commercial channel, not just the product. Required before GCC expansion."},
        {l:"GS1 Lebanon — 2 barcodes + annual membership",a:400},
        {l:"IP lawyer fees — filing + 6-month correspondence",a:600},
        {l:"Food regulatory consultant — MoPH submission support",a:400,n:"Navigates informal MoPH process. Reduces rejection risk on a $2,000 submission. High ROI on $400."},
      ],
      full:[
        {l:"SARL + full legal stack (all entities, all licensing)",a:3500},
        {l:"Tax ID + NSSF + municipal business licensing",a:500},
        {l:"MoPH food registration — 3 SKUs + label compliance audit",a:3000},
        {l:"Lab testing — 3 SKUs × 3 rounds + shelf-life validation",a:2000,n:"CCIAS chamber lab + independent shelf-life study. 3 SKUs × 3 rounds = 9 test sets."},
        {l:"Halal certification — full scope + annual renewal",a:1200},
        {l:"Trademark — Classes 29, 35 + GCC pre-filing (UAE trademark office)",a:2500,n:"GCC pre-filing required before any export shipment. Initiates IP protection across GCC markets."},
        {l:"IP legal retainer — Lebanon + GCC, 12 months",a:1000},
        {l:"GS1 Lebanon + GCC barcode preparation",a:600},
        {l:"Export documentation — COO, health certs, GCC import compliance",a:700},
      ],
    }
  },
  { id:"brand",       name:"Brand & Design",                  color:T.purple, icon:"◈",  phase:"Phase 0",   phaseM:"M0–M2",
    totals:[4500,10000,15500],
    when:"Brand identity locked in Phase 0 before production begins. Packaging artwork finalized before print. Photography after first product run, before account outreach begins.",
    why:"Packaging is the product's first commercial act. STRIKE competes against Jack Link's ($5.62 imported) on the same gym shelf. Under-investment here creates a brand that cannot command $4.50 — and a buyer who looks at the label and feels nothing. The KAG-JRK-006 brand brief is complete. This budget line is execution cost, not planning cost.",
    items:{
      lean:[
        {l:"Brand identity — basic (wordmark + color palette only)",a:2000,n:"No symbol system, no guidelines. Risk: inconsistent application across all materials."},
        {l:"Packaging design — 1 SKU, 1 size",a:1000},
        {l:"Packaging print run — first batch (minimum quantity)",a:800},
        {l:"Product photography — basic 1-session shoot",a:400},
        {l:"Label compliance layout — Arabic regulatory text",a:300},
      ],
      standard:[
        {l:"Full brand identity system — wordmark, symbol, palette, typography, brand guidelines",a:4000,n:"KAG-JRK-006 brief ready for designer. Obsidian base / performance gold / volcanic grain / geometric cedar micro-icon / trilingual system."},
        {l:"Packaging design — 2 SKUs, 2 sizes each (40g single-serve + 120g multi-serve)",a:2500},
        {l:"First packaging print run — 2 SKUs (matte laminate + UV spot varnish)",a:1800,n:"Minimum viable quantity. Unit packaging cost falls 40–60% at 10× volume."},
        {l:"Product & lifestyle photography — 2 shoot sessions",a:1000,n:"Shoot 1: pure product on black background. Shoot 2: gym lifestyle / athlete context. ~$500/shoot Lebanon."},
        {l:"Label compliance design — trilingual Arabic / English / French MoPH layout",a:500,n:"Nutritional panel, allergen declaration, halal mark, lot number, manufacturer address."},
        {l:"Printed brand collateral — trade folders, letterhead, envelope system",a:200},
      ],
      full:[
        {l:"Agency-level full brand identity system",a:6000,n:"Full brand architecture: sub-brand system for BITES / STRIPS / STICKS. Export-ready asset library."},
        {l:"Packaging design — 3 SKUs, multiple formats (retail + export)",a:3000},
        {l:"Packaging print run — 3 SKUs (full launch quantity)",a:3000},
        {l:"Brand photography — 3 shoot days (product, lifestyle, B2B)",a:2000},
        {l:"Printed collateral — full suite (POS headers, event banners, trade folders)",a:1200},
        {l:"Digital asset management + file preparation for all partners",a:300},
      ],
    }
  },
  { id:"production",  name:"Production & Supply",             color:T.coral,  icon:"◎",  phase:"Phase 1",   phaseM:"M1–M4",
    totals:[6000,12500,20000],
    when:"After brand/packaging artwork is locked and supply agreement is signed. Minimum 30-day manufacturer lead time. First batch shelf-ready by Month 2. Second batch commissioned when Month 3–4 sell-through confirms velocity.",
    why:"Production funds the inventory that generates gross profit. At $1.20 COGS and $4.50 RRP, every gym-wholesale unit returns $1.95 gross profit. The first batch is simultaneously the revenue engine and the proof-of-product for every account conversation. Underfunding limits account seeding volume on Day 1 — which directly delays the revenue ramp.",
    items:{
      lean:[
        {l:"First production batch — 1 SKU, 60-day sell-through estimate",a:4500,n:"Conservative first run. Validates concept before deeper capital commitment."},
        {l:"QC setup — basic sampling kit + documentation",a:300},
        {l:"Warehousing — 3 months, ambient food-safe",a:500,n:"Beef jerky is shelf-stable at Aw ≤0.85 with barrier packaging. No cold chain required."},
        {l:"Per-batch microbiological testing (QC round)",a:200},
        {l:"Miscellaneous supply chain (labelling, sealing, consumables)",a:300},
        {l:"Contingency materials",a:200},
      ],
      standard:[
        {l:"First production batch — 2 SKUs (40g + 120g), 90-day stock",a:9000,n:"Managed by Ru'ya via KAG-JRK-004 manufacturer brief. SMOKING BBQ spec: Aleppo pepper, sumac, pomegranate, cedar smoke, zero added sugar."},
        {l:"Packaging material procurement — barrier pouches (Turkish supplier) + Lebanon import duties",a:1500,n:"Lebanon–Turkey FTA unratified → MFN tariff + 11% VAT on CIF value applies to imported pouches."},
        {l:"QC setup — sampling kit, documentation system, batch SOPs",a:400},
        {l:"Per-batch microbiology testing × 2 rounds (CCIAS, $25/panel)",a:300,n:"Mandatory each production run. ISO 17025 accredited. Required for halal integrity documentation."},
        {l:"Warehousing — 6 months, ambient food-safe storage",a:1000,n:"No cold chain. Barrier packaging + ambient temp/humidity monitoring sufficient for shelf stability."},
        {l:"Storage shelving + ambient temperature/humidity monitoring",a:300},
      ],
      full:[
        {l:"First production batch — 3 SKUs (BITES + STRIPS + large format), 120-day stock",a:14000},
        {l:"Packaging material procurement — 3 SKU formats + import duties",a:2200},
        {l:"QC protocol system + full documentation",a:600},
        {l:"Per-batch lab testing — 3 rounds × 3 SKUs",a:600},
        {l:"Warehousing — 12 months, premium food-safe ambient",a:2000},
        {l:"Ambient monitoring + compliance record equipment",a:400},
        {l:"Contingency production materials",a:200},
      ],
    }
  },
  { id:"transport",   name:"Transportation & Logistics",      color:T.amber,  icon:"◬",  phase:"Phase 1–2", phaseM:"M1–M6",
    totals:[2000,4500,7000],
    when:"Vehicle sourced Month 1. First delivery route Month 2 with account openings. Commercial vehicle insurance required before Day 1 of delivery. Fuel is a monthly ongoing cost.",
    why:"Ru'ya personally visits and delivers to every account bi-weekly. This is the relationship model — not distributor-dependent. 60–80 accounts across Beirut, Metn, Keserwan, Jounieh, and Tripoli require a dedicated vehicle. Fuel at $1.30/liter for 95-octane (April 2026) on a 250–350L/month route costs $350–500/month. This category was entirely absent from the original model.",
    items:{
      lean:[
        {l:"Fuel — 3 months, 30-account limited route",a:1050,n:"~$350/month. Beirut + Metn primary zones. No Tripoli route at Tier 1."},
        {l:"Vehicle rental — on-demand / shared (no dedicated van)",a:700,n:"No dedicated vehicle. Route planned around rented or shared transport. Operational risk."},
        {l:"Delivery supplies — branded cartons, protective wrap",a:250},
      ],
      standard:[
        {l:"Delivery vehicle — used van lease (6 months × $380/month)",a:2280,n:"Dedicated leased van for Ru'ya field team. Essential for bi-weekly visits across 60–80 accounts."},
        {l:"Fuel — 6 months (250–350L/month × ~$1.30/L)",a:2220,n:"Route: Beirut, Ashrafieh, Metn, Keserwan, Jounieh, Tripoli. ~$370–500/month at Lebanese 95-octane pump price."},
      ],
      full:[
        {l:"Dedicated delivery vehicle — 12-month lease or purchase allocation",a:4000,n:"Full-year dedicated van for Ru'ya + sales rep. Essential for 130+ account coverage."},
        {l:"Fuel — 12 months (route-optimized, ~$250/month average)",a:3000,n:"Larger account base enables route optimization, reducing fuel cost per stop at scale."},
      ],
    }
  },
  { id:"marketing",   name:"Non-Digital Marketing & Activation",color:T.teal, icon:"◑",  phase:"Phase 1–2", phaseM:"M2–M6",
    totals:[2500,7000,12000],
    when:"Activation starts at account opening (Month 2). Display stands and POS go in with the first delivery. Trainer ambassador program launches with first gym accounts. Sampling events timed to Month 3 once product is confirmed shelf-ready.",
    why:"82.6% of MENA sports nutrition purchases are in physical stores. In Lebanon, the relationship at the point of sale drives sell-through more than any digital signal. The trainer network — 20 ambassadors at Tier 2 — functions as a zero-fixed-salary sales force: 20 trainers who believe in STRIKE reach 400–1,000 active gym clients. The ROI on a $60 trainer starter package is potentially thousands in lifetime consumer value.",
    items:{
      lean:[
        {l:"In-gym display stands — 30 accounts × $12",a:360},
        {l:"Product samples for outreach — 30 accounts, 3 units each",a:600,n:"Free samples at first visit. First impression is a commercial investment."},
        {l:"Trade presentation kits — printed, 50 copies",a:400},
        {l:"Trainer ambassador starter packages — 10 trainers × $50",a:500,n:"24 units product + referral cards. 10 trainers as brand advocates."},
        {l:"Business cards + stationery",a:200},
        {l:"Branded apparel — minimal (2 shirts, 2 caps)",a:200},
        {l:"Product sampling event — 1",a:240},
      ],
      standard:[
        {l:"In-gym branded display stands — 60 accounts × $15",a:900,n:"STRIKE-branded unit installed by Ru'ya on first delivery day. No account opens without a display in place."},
        {l:"Shelf talkers, price cards, brand posters",a:500},
        {l:"Trade presentation kits — professional printed, 100+ copies",a:700,n:"Account-opening kit: product spec, pricing, channel terms, STRIKE brand story."},
        {l:"Product samples — 50+ accounts, 4–5 units each",a:900,n:"Product at COGS. Every account visit begins with product in hand. Non-negotiable."},
        {l:"Branded apparel — sales team 5 sets (shirt + cap)",a:350},
        {l:"Trainer ambassador program — 20 trainers × $60 starter package",a:1200,n:"Package: 24 units + referral cards + branded shaker. 20 trainers = potential 400–1,000 client reach."},
        {l:"Product sampling events — 2 CrossFit / fitness expo events",a:700,n:"Event permit, sampling table, branded tablecloth. Maximum word-of-mouth ROI."},
        {l:"Business cards + premium stationery",a:250},
        {l:"B2B first-meeting gifting — branded product boxes",a:300,n:"Left with pharmacy / modern trade buyers. Costs $5–8. Impression worth $500–5,000 in listing value."},
        {l:"POS countertop display hardware — premium acrylic units (60 accounts)",a:800,n:"Permanent countertop display. Professional presence vs. wire rack competitor."},
        {l:"Trade show / fitness expo participation — 1 event",a:400},
      ],
      full:[
        {l:"Full POS display system — 80+ accounts (premium floor + countertop units)",a:2000},
        {l:"Trainer ambassador program — 30 trainers, structured incentive scheme",a:2500,n:"$80 starter package + $40/month performance incentive × 6 months × 30 trainers."},
        {l:"Product samples — 100+ accounts, multiple SKU formats",a:2000},
        {l:"Trade presentation system — premium print + digital",a:1500},
        {l:"Sampling events + gym activations — 4+ events",a:1500},
        {l:"Corporate / B2B channel development collateral",a:800},
        {l:"Branded apparel + uniforms — full team (8 sets)",a:700},
        {l:"Trade show + exhibition — 2 events (booth + materials)",a:1000},
      ],
    }
  },
  { id:"operations",  name:"Operational Overhead",            color:T.blue,   icon:"⊙",  phase:"Phase 0–2", phaseM:"M0–M6",
    totals:[1000,4500,7500],
    when:"Workspace and connectivity set up in Phase 0. Insurance must be in place before the first product placement. Generator allowance active from Day 1.",
    why:"Entirely absent from the original model — the largest single category of omitted costs. Running a food startup in Lebanon means generator dependency (3–6 hrs/day grid supply), workspace for a 3–4 person team, mandatory product liability insurance for retail placement, and communication costs. These are not optional — they are the real cost of operations.",
    items:{
      lean:[
        {l:"Phone / SIM — 2 people × 3 months × $25/month",a:150,n:"WhatsApp Business + data. Primary business communication channel in Lebanon."},
        {l:"Internet connectivity — 3 months",a:200},
        {l:"Office supplies + printing",a:200},
        {l:"Generator / electricity allowance — 3 months",a:450,n:"Lebanon grid: 3–6 hrs/day. Private generator subscription ('ishtirak') essential for reliable operations."},
      ],
      standard:[
        {l:"Workspace / co-working — 6 months × $250/month",a:1500,n:"Regus Lebanon dedicated desk: $209–329/month. Private office from $255/person. Independent co-working $150–400/month."},
        {l:"Phone plans — 3 team members × 6 months × $27/month",a:500},
        {l:"Internet connectivity — office + warehouse (6 months × $60/month)",a:360},
        {l:"Office supplies, printing, miscellaneous stationery",a:200},
        {l:"Generator / electricity — warehouse + office (6 months × $90/month)",a:540,n:"Lebanon commercial rate $0.27–0.32/kWh. Generator supply ~$0.32/kWh. Monthly budget mandatory."},
        {l:"Product liability insurance — food brand (12-month policy)",a:800,n:"Required before first retail placement. Covers all distribution channels."},
        {l:"Commercial vehicle insurance — delivery van",a:500},
        {l:"Miscellaneous administrative + operational",a:100},
      ],
      full:[
        {l:"Workspace / office — 10 months × $250/month",a:2500},
        {l:"Phone plans — 4 team members × 12 months × $25/month",a:1200},
        {l:"Internet — 12 months × $60/month",a:720},
        {l:"Office supplies + printing (12 months)",a:350},
        {l:"Generator / electricity — 12 months × $85/month",a:1020,n:"Full-year overhead on Lebanon's unreliable grid."},
        {l:"Product liability + business insurance",a:900},
        {l:"Commercial vehicle insurance",a:600},
        {l:"Municipal fees + miscellaneous",a:210},
      ],
    }
  },
  { id:"technology",  name:"Technology & Tools",              color:T.purple, icon:"◧",  phase:"Phase 0",   phaseM:"Month 0",
    totals:[500,1800,3000],
    when:"All tools deployed at Phase 0. Accounting software before first invoice. Inventory system before first batch arrives. Website before first trade account Googles the brand.",
    why:"The minimum viable technology stack enables the monthly P&L reporting, account management, and inventory control that Ru'ya has committed to delivering. Without accounting software, there is no P&L. Without inventory tracking, restock triggers are guesswork. The website — informational only, no e-commerce — is the B2B credibility anchor for pharmacy and modern trade buyers who verify brands before meetings.",
    items:{
      lean:[
        {l:"Accounting software — Zoho Books free tier / 6 months",a:300},
        {l:"Website — basic 1-page informational (hosting + design)",a:200},
      ],
      standard:[
        {l:"Accounting software — Zoho Books Standard (12 months, ~$25/month)",a:300,n:"Full invoicing, bank reconciliation, P&L. Monthly board reports generated from this system."},
        {l:"Inventory management — Zoho Inventory or equivalent (12 months)",a:400,n:"Per-SKU stock tracking, reorder alerts, integrated with accounting."},
        {l:"Mobile order management — field tool for Ru'ya team",a:200,n:"Reps log orders, check inventory, and capture account notes in the field."},
        {l:"Basic CRM — account tracking + bi-weekly visit log (HubSpot free)",a:100,n:"60–80 accounts require structured tracking. Visit log drives the check-in protocol."},
        {l:"Informational website — design + 12-month hosting",a:600,n:"Non-e-commerce. STRIKE brand-consistent. Credibility anchor for pharmacy buyers."},
        {l:"Digital asset management + cloud file storage",a:200},
      ],
      full:[
        {l:"Accounting software — Zoho Books Premium (12 months, multi-user)",a:700},
        {l:"Inventory + warehouse management system",a:600},
        {l:"Sales CRM — paid tier (HubSpot Starter or equiv.), 130+ accounts",a:500},
        {l:"Professional website — custom design + 12-month hosting (EN + AR)",a:1000,n:"Export-ready. Mobile-first. B2B inquiry form. Arabic + English."},
        {l:"Financial reporting dashboard — board-level",a:200},
      ],
    }
  },
  { id:"banking",     name:"Banking & Financial Setup",       color:T.green,  icon:"◫",  phase:"Phase 0",   phaseM:"Month 0–1",
    totals:[0,2000,2500],
    when:"Offshore banking established in Phase 0 before any international supplier payment is required. Resolve before packaging is ordered from Turkey.",
    why:"Circular 158 banking controls and Lebanon's FATF grey-listing (June 2023, per US ITA) mean local Lebanese banks cannot reliably process international USD transfers for business operations. An offshore USD account (Cyprus or UAE) is required for clean SWIFT payments to Turkish packaging suppliers and international certification bodies. This was entirely missing from the original model.",
    items:{
      lean:[
        {l:"Not budgeted at Tier 1 — operate on cash USD + local accounts",a:0,n:"Risk: limited cross-border payment capability. Mitigated by client's existing personal banking arrangements."},
      ],
      standard:[
        {l:"Offshore USD account setup — Cyprus or UAE (one-time)",a:1500,n:"Required for Turkish packaging supplier, SGS/halal auditors, any international SWIFT payment."},
        {l:"International wire transfer fees — 6 months × 2 supplier payments",a:300,n:"$25–50/SWIFT transfer × 6 transfers over the 6-month launch period."},
        {l:"Banking compliance / KYC documentation preparation",a:200},
      ],
      full:[
        {l:"Offshore USD account setup — Cyprus or UAE",a:1500},
        {l:"Wire transfer fees — 12 months × 2–3 international payments",a:600},
        {l:"Banking compliance / KYC documentation + annual maintenance",a:400},
      ],
    }
  },
  { id:"ruya",        name:"Ru'ya 360 — Management & Team",  color:T.gold,   icon:"◉",  phase:"Phase 0–2", phaseM:"M0–M6",
    totals:[0,7500,12000],
    when:"Engagement begins at mandate signing (Day 0). Management fee is milestone-gated — each phase payment releases only upon demonstrated delivery against defined milestones.",
    why:"The management fee covers the senior advisory layer: project director oversight, investor-facing reporting, field operations management, and all strategic decisions. This is not a consulting retainer for advice — it is the operational cost of executing a 38-step launch plan. Milestone-gated means you pay for progress, not for meetings. Nothing releases if milestones are not hit.",
    items:{
      lean:[
        {l:"Ru'ya 360 advisory — included in contingency at Tier 1 scope",a:0,n:"Lean engagement with reduced scope. Mandate terms reflect Tier 1 budget constraints."},
      ],
      standard:[
        {l:"Management fee — Phase 0 Foundation (M0–M2)",a:1800,n:"Milestone: SARL registered · Trademark filed · Brand identity approved · MoPH submitted · Supply agreement signed."},
        {l:"Management fee — Phase 1 Launch (M2–M4)",a:1800,n:"Milestone: 30+ active accounts · First batch delivered · All displays installed · 20 trainers onboarded."},
        {l:"Management fee — Phase 2 Scale (M4–M6)",a:1400,n:"Milestone: 60–80 accounts · Pharmacy channel entered · Monthly revenue ≥$9K · Second batch ordered."},
        {l:"Field logistics coordinator — part-time (6 months × $300/month)",a:1800,n:"Delivery scheduling, account stock checks, reorder processing, and CRM maintenance."},
        {l:"Client engagement expenses — travel, reporting tools, account visit costs",a:700},
      ],
      full:[
        {l:"Management fee — Phases 0–3 full scope (12 months)",a:9000,n:"Lebanon launch + modern trade + GCC preparation + STRIKE STRIPS second-line development."},
        {l:"Dedicated sales representative — 6-month allocation supplement",a:1200,n:"Partial funding for dedicated field rep. Supplements Ru'ya team for 130+ account coverage."},
        {l:"Client engagement expenses + reporting infrastructure (12 months)",a:1800},
      ],
    }
  },
  { id:"contingency", name:"Working Capital & Contingency",  color:T.dim,    icon:"◰",  phase:"Always-on", phaseM:"M0–M12",
    totals:[1000,1700,1500],
    when:"Held in reserve from Day 1. Working capital covers the cash-flow gap during the sale-or-return window. Contingency is drawn only against qualifying unforeseen costs.",
    why:"Sale-or-return placement means cash does not return immediately. With 60–80 accounts on consignment, product is in the market but cash has not come back. The buffer ensures operations continue during the 30–60 day float. Contingency absorbs: MoPH fee variance (no published schedule), GS1 quote confirmation, unexpected lab re-testing.",
    items:{
      lean:[
        {l:"Working capital float — sale-or-return period (30–45 days)",a:700,n:"30 accounts × ~$50 avg first placement = $1,500 product at risk. Buffer covers operations."},
        {l:"Contingency reserve — unexpected regulatory costs",a:300},
      ],
      standard:[
        {l:"Working capital float — sale-or-return period (Month 2–4)",a:1200,n:"60–80 accounts × ~$70 avg first placement = $4,200–5,600 product at risk. Buffer covers operations during this window."},
        {l:"Contingency reserve — MoPH variance, GS1 confirmation, re-testing",a:500},
      ],
      full:[
        {l:"Working capital float — extended consignment period (130+ accounts)",a:1000},
        {l:"Contingency reserve",a:500},
      ],
    }
  },
];
// Tier totals: Lean 24000 | Standard 62000 | Full 96000

// ─── PHASE DATA ────────────────────────────────────────────────────────────────
const PHASES = [
  { id:"ph0", name:"Phase 0 — Foundation", months:"Months 0–2", color:T.purple,
    t1Spend:10000, t2Spend:24300, t3Spend:38000,
    catIds:["legal","brand","banking","technology"],
    milestone:"SARL registered · Trademark filed · Brand identity approved · MoPH submitted · Website live · Offshore banking set up",
    focus:"Legal entities, regulatory submissions, brand identity, banking infrastructure, and technology. The 8-week foundation that makes everything else possible. Nothing sells before this phase is complete.",
    actions:["Notary engagement: SARL registration begins Week 1","Submit MoPH food registration Day 1 — 2–4 month processing clock starts now","Brief brand designer from KAG-JRK-006 — identity in 6–8 weeks","File trademark Class 29 + 35 with IP lawyer","Apply for Dar Al-Fatwa halal certification","Commission CCIAS lab — nutritional panel + microbiology testing","Apply for GS1 Lebanon barcodes","Open offshore USD account (Cyprus or UAE)","Deploy full technology stack"],
  },
  { id:"ph1", name:"Phase 1 — Launch", months:"Months 2–4", color:T.gold,
    t1Spend:9000, t2Spend:24000, t3Spend:33000,
    catIds:["production","transport","marketing","ruya"],
    milestone:"30–50 active accounts · First batch delivered · All displays installed · 20 trainers onboarded · First restock orders received",
    focus:"First production batch, vehicle deployment, account opening across 30–50 gyms and nutrition stores, trainer ambassador program launch. Revenue begins here.",
    actions:["Commission first production batch (2 SKUs)","Deploy dedicated delivery vehicle","Open 30–50 gym and nutrition accounts (sale-or-return terms)","Install STRIKE display at every account on delivery day","Launch trainer ambassador program — 20 trainers onboarded","Begin bi-weekly account check-ins + sell-through data collection","Execute 2 CrossFit / fitness expo sampling events","Submit weekly sell-through report to board"],
  },
  { id:"ph2", name:"Phase 2 — Scale", months:"Months 4–6", color:T.teal,
    t1Spend:5000, t2Spend:13700, t3Spend:25000,
    catIds:["operations","contingency"],
    milestone:"60–80 accounts · Pharmacy channel entered · Monthly revenue $9K–$14K · Second batch ordered · Monthly P&L confirmed positive trajectory",
    focus:"Account coverage expands to 60–80. Pharmacy channel entry. Second production batch commissioned from sell-through data. Monthly P&L delivered to board against approved plan.",
    actions:["Commission second batch based on sell-through velocity data","Begin pharmacy outreach (sell-through data from gyms is your credibility)","Expand to 60–80 total accounts across all channels","Conduct formal 90-day pricing review","Deliver Month 4 + Month 5 P&L to board","Evaluate Tier 3 upgrade or GCC preparation timeline"],
  },
  { id:"ph3", name:"Revenue Phase — Self-Funded", months:"Months 6–12", color:T.amber,
    t1Spend:null, t2Spend:null, t3Spend:null,
    catIds:[],
    milestone:"Breakeven M8–M11 · M12 revenue $40K–$65K/month · Modern trade entry decision · STRIKE STRIPS development",
    focus:"By Month 6, gross profit covers monthly operations. By Month 8–11, cumulative revenue recovers the full investment. This phase is revenue-funded. No new capital required at Standard tier.",
    actions:["Modern trade entry when sell-through velocity justifies listing fee","Evaluate distributor engagement vs. direct distribution model","Begin STRIKE STRIPS second-line development","GCC market entry preparation if board confirms Phase 4 budget","SGS halal certification for GCC if within 18-month export horizon"],
  },
];

// ─── TEAM GROUPS ───────────────────────────────────────────────────────────────
const TEAM_GROUPS = [
  { name:"Ru'ya 360 Core Team", sub:"Covered by management fee · Milestone-gated delivery", color:T.gold,
    members:[
      { title:"Lead Advisor & Project Director", type:"Internal — Ru'ya 360", typeColor:T.gold,
        duration:"6–12 months", alloc:"~40% FTE", cost:"In management fee", tiers:"T2 + T3",
        fns:["Project strategy and milestone governance","Monthly P&L and board reporting","Client relationship — primary decision-making partner","Mandate enforcement and investor communications","Regulatory oversight and scope control"] },
      { title:"Field Execution Manager", type:"Internal — Ru'ya 360", typeColor:T.gold,
        duration:"6 months", alloc:"~80% FTE", cost:"In management fee", tiers:"T2 + T3",
        fns:["Personal account visits — bi-weekly per account","Product delivery and display installation","Trainer network activation and management","Market intelligence and competitive tracking","Restock monitoring and reorder coordination"] },
    ]
  },
  { name:"Field Operations Team", sub:"Client-funded headcount · Deployed and managed by Ru'ya 360", color:T.teal,
    members:[
      { title:"Dedicated Field Sales Representative", type:"Direct Hire — 6 months", typeColor:T.teal,
        duration:"6 months", alloc:"Full-time", cost:"$900–$1,200/month", tiers:"T3 only",
        fns:["New account opening visits (30–40 new accounts in M3–M5)","Bi-weekly check-ins and order collection","Display maintenance and sell-through reporting","Trainer relationship management (primary contact)","Field sales data entry into CRM"] },
      { title:"Field Logistics Coordinator", type:"Part-time Hire — 6 months", typeColor:T.teal,
        duration:"6 months", alloc:"~50% FTE", cost:"$300/month", tiers:"T2 + T3",
        fns:["Delivery scheduling and route optimization","Account stock checks and reorder tracking","Order processing and invoice preparation","Warehouse inventory management and log"] },
    ]
  },
  { name:"Design Team", sub:"Freelance / project-based · Covered by Brand & Design category", color:T.purple,
    members:[
      { title:"Brand Designer (Identity + Packaging)", type:"Freelance — Project", typeColor:T.purple,
        duration:"6–8 weeks", alloc:"Full project", cost:"$4,000 (T2) / $8,000 (T3)", tiers:"T2 + T3",
        fns:["STRIKE visual identity system (KAG-JRK-006 brief pre-loaded)","2–3 SKU packaging artwork (single-serve + multi-serve)","Brand guidelines document","Print-ready files for manufacturer and printer"] },
      { title:"Label Compliance Specialist", type:"Freelance — One-off", typeColor:T.purple,
        duration:"1–2 weeks", alloc:"One-off", cost:"$500", tiers:"T2 + T3",
        fns:["Trilingual regulatory label layout (Arabic / English / French)","MoPH-standard nutritional panel","Allergen declaration and halal mark positioning"] },
      { title:"Product Photographer", type:"Freelance — Per shoot", typeColor:T.purple,
        duration:"2 shoot days", alloc:"Deliverable-based", cost:"$500 × 2 shoots", tiers:"T2 + T3",
        fns:["Studio product photography (black background, high-resolution)","Gym lifestyle shoot (athlete / training context)","Trade presentation and B2B material images"] },
    ]
  },
  { name:"Legal & Regulatory Team", sub:"Retained professionals · Covered by Legal & Regulatory category", color:T.amber,
    members:[
      { title:"SARL Formation Notary / Lawyer", type:"One-time engagement", typeColor:T.amber,
        duration:"2–3 weeks", alloc:"Formation only", cost:"$2,000–$3,500", tiers:"T1 + T2 + T3",
        fns:["Articles of Association + Commercial Register filing","Trade name registration","Mandatory SARL lawyer retainer (Lebanese law requirement)"] },
      { title:"IP / Trademark Lawyer", type:"Retained — 6 months", typeColor:T.amber,
        duration:"6 months", alloc:"Filing + correspondence", cost:"$600–$1,500", tiers:"T2 + T3",
        fns:["Trademark clearance search (Lebanon + GCC)","Class 29 + 35 filing and registry correspondence","IP ownership documentation for mandate"] },
      { title:"Food Regulatory Consultant", type:"Retained — 3 months", typeColor:T.amber,
        duration:"3 months", alloc:"MoPH support", cost:"$400–$700", tiers:"T2 + T3",
        fns:["MoPH submission file preparation","Ministry liaison and informal process navigation","Label compliance review — rejection risk mitigation"] },
    ]
  },
  { name:"Finance & Quality Team", sub:"Outsourced · Monthly retainers and per-test engagements", color:T.green,
    members:[
      { title:"Bookkeeper / Accountant", type:"Outsourced — Monthly retainer", typeColor:T.green,
        duration:"6–12 months", alloc:"Monthly retainer", cost:"$300–$500/month", tiers:"T2 + T3",
        fns:["Monthly P&L preparation vs. approved budget","Bookkeeping and bank reconciliation","NSSF and tax compliance filings","Board reporting support and audit preparation"] },
      { title:"Lab Testing Partner (CCIAS Chamber Lab)", type:"Per-test — each batch", typeColor:T.green,
        duration:"Ongoing — each batch", alloc:"Per production run", cost:"$25/micro · $15/label panel", tiers:"T1 + T2 + T3",
        fns:["Microbiological safety testing ($25/micro panel)","Nutritional label verification ($15/label panel)","MoPH-ready test reports (ISO 17025 accredited)","Batch QC documentation for halal compliance"] },
    ]
  },
  { name:"Trainer Ambassador Network", sub:"Performance incentive · Covered by Marketing & Activation category", color:T.coral,
    members:[
      { title:"Gym Trainer Ambassadors", type:"Incentive program", typeColor:T.coral,
        duration:"Ongoing — 6+ months", alloc:"20 (T2) / 30 (T3)", cost:"$60 starter pkg + referral", tiers:"T2 + T3",
        fns:["Personal product trial and peer endorsement at training sessions","Client referral to brand (20–50 clients per trainer per week)","Display product during personal training sessions","First-hand consumer feedback channel for product iteration","Zero fixed salary — highest-leverage marketing asset in the plan"] },
    ]
  },
];

// ─── GCC PHASE 4 DATA ──────────────────────────────────────────────────────────
const GCC_ITEMS = [
  { cat:"SGS Halal Certification — GCC-Portable (GSO 2055-2)", cost:"$2,000–$5,000", freq:"Initial · $1,000–2,500/yr surveillance", color:T.gold,
    note:"SASO + ESMA approved. Required for beef products entering Saudi Arabia and UAE. Dar Al-Fatwa Lebanon does not cover GCC. Begin SGS process at Lebanon launch if GCC entry planned within 18 months." },
  { cat:"UAE Food Registration — FIRS / Montaji", cost:"$500–$1,500 per SKU", freq:"Per product registration", color:T.teal,
    note:"Dubai Municipality FIRS + ZAD system. Arabic + English labelling mandatory for meat products. Mislabelling fines AED 10,000–100,000." },
  { cat:"Saudi Arabia — SFDA Registration", cost:"$550–$3,500 per consignment", freq:"Per shipment by value band", color:T.amber,
    note:"Saudi Food & Drug Authority. Importer must be Saudi-based entity. FIRS establishment + product registration required before first shipment." },
  { cat:"GCC Trademark Pre-Filing", cost:"$2,500–$4,000", freq:"One-time (Classes 29 + 35 GCC)", color:T.purple,
    note:"UAE trademark office filing. Required before any export shipment leaves Lebanon. Initiates brand protection across all GCC markets." },
  { cat:"International Freight — Beirut to Jebel Ali (UAE)", cost:"$1,200–$1,700 (20-ft container)", freq:"Per shipment", color:T.blue,
    note:"LCL (less-than-container) likely cheaper at low initial volumes. Road freight UAE to other GCC: AED 700–1,500 per pallet." },
  { cat:"GCC Distributor Margin", cost:"15–25% on all sales", freq:"Ongoing — all revenue", color:T.coral,
    note:"On top of retailer margin (25–50%). GCC distributors essential for food imports — no direct distribution model works at scale." },
  { cat:"UAE Hypermarket Listing Fee", cost:"AED 5,000–15,000 / SKU (~$1,400–$4,100)", freq:"Annual + renewal AED 2,000–8,000", color:T.amber,
    note:"Carrefour UAE / Lulu / Spinneys. Per Bagason Group MENA guide. Material Phase-4 capital requirement that multiplies across SKUs." },
  { cat:"Export Documentation (per shipment)", cost:"$700–$1,500", freq:"Per shipment type", color:T.green,
    note:"COO (Chamber of Commerce), phytosanitary certificate, halal certificate, packing list, GCC import compliance documents." },
];

// ─── INTERSECTION OBSERVER HOOK ────────────────────────────────────────────────
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── ANIMATED BAR ─────────────────────────────────────────────────────────────
function AnimBar({ pct: p, color, delay = 0, trigger }: { pct: number; color: string; delay?: number; trigger: boolean }) {
  const [w, setW] = useState(0);
  const ctx = useContext(ThemeCtx);
  const trackColor = ctx.void === "#FFFFFF" ? "#D8CFC4" : T.line;
  useEffect(() => { if (!trigger) return; const t = setTimeout(() => setW(p), delay); return () => clearTimeout(t); }, [trigger, p, delay]);
  return (
    <div style={{ height: 4, background: trackColor, borderRadius: 2, overflow: "hidden" }}>
      <div style={{ width: `${w}%`, height: "100%", background: `linear-gradient(90deg,${color}60,${color})`, borderRadius: 2, transition: "width 0.9s cubic-bezier(.25,.46,.45,.94)" }} />
    </div>
  );
}

// ─── DONUT CHART (SVG) ────────────────────────────────────────────────────────
function DonutChart({ cats, tierId, size = 200 }: { cats: typeof CATS; tierId: string; size?: number }) {
  const ctx = useContext(ThemeCtx);
  const isLight = ctx.void === "#FFFFFF";
  const stroke = isLight ? "#FAFAF8" : T.bg;
  const circleFill = isLight ? "#F0EBE2" : T.card;
  const goldText = isLight ? "#8A6820" : T.gold;
  const dimText = isLight ? "#B0A898" : T.dim;
  const tKey = tierId === "lean" ? 0 : tierId === "standard" ? 1 : 2;
  const total = TIERS.find(t => t.id === tierId)!.total;
  const data = cats.map(c => ({ name: c.name, val: c.totals[tKey], color: c.color })).filter(d => d.val > 0);
  const cx = size / 2, cy = size / 2, r = size * 0.38, ir = size * 0.22;
  let cursor = -Math.PI / 2;
  const slices = data.map(d => {
    const angle = (d.val / total) * Math.PI * 2;
    const x1 = cx + r * Math.cos(cursor), y1 = cy + r * Math.sin(cursor);
    cursor += angle;
    const x2 = cx + r * Math.cos(cursor), y2 = cy + r * Math.sin(cursor);
    const ix1 = cx + ir * Math.cos(cursor - angle), iy1 = cy + ir * Math.sin(cursor - angle);
    const ix2 = cx + ir * Math.cos(cursor), iy2 = cy + ir * Math.sin(cursor);
    const large = angle > Math.PI ? 1 : 0;
    return { ...d, path: `M${x1},${y1} A${r},${r},0,${large},1,${x2},${y2} L${ix2},${iy2} A${ir},${ir},0,${large},0,${ix1},${iy1} Z` };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {slices.map((s, i) => (
        <path key={i} d={s.path} fill={s.color} opacity={0.85} stroke={stroke} strokeWidth={1.5} />
      ))}
      <circle cx={cx} cy={cy} r={ir} fill={circleFill} />
      <text x={cx} y={cy - 6} textAnchor="middle" fill={goldText} fontSize={size * 0.09} fontFamily="monospace" fontWeight="700">{fmt(total)}</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill={dimText} fontSize={size * 0.046} fontFamily="monospace">TOTAL</text>
    </svg>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
const TABS = [
  { id: "overview",   label: "Overview" },
  { id: "breakdown",  label: "Full Breakdown" },
  { id: "timeline",   label: "Phase Timeline" },
  { id: "team",       label: "Ru'ya Team" },
  { id: "gcc",        label: "GCC Horizon" },
];

export default function DetailedInvestmentUsage() {
  const [tier, setTier] = useState("standard");
  const [tab, setTab] = useState("overview");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { ref: contentRef, inView: contentVisible } = useInView();

  const themeCtx = useContext(ThemeCtx);
  const isLight = themeCtx.void === "#FFFFFF";
  // Shadow module-level T with theme-aware structural colors
  const T = isLight ? {
    bg: "#FAFAF8", card: "#F0EBE2", dark2: "#F7F3ED", line: "#D8CFC4",
    gold: "#8A6820", goldBright: "#7A5C18", goldDim: "#E8DFC8",
    cream: "#1A1410", creamDim: "#6A5848",
    teal: "#2E7A6A", coral: "#B05040", purple: "#6040A0",
    amber: "#9A5818", green: "#2A6038", blue: "#2A5888", dim: "#B0A898",
  } : {
    bg: "#08070A", card: "#0D0C14", dark2: "#111220", line: "#1C1A26",
    gold: "#C8A96E", goldBright: "#E0C080", goldDim: "#4A3820",
    cream: "#E2D8CC", creamDim: "#7A7090",
    teal: "#7EB5A6", coral: "#E07B6A", purple: "#9B8EC4",
    amber: "#C07030", green: "#5A9060", blue: "#5080B0", dim: "#3A3550",
  };

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    h(); window.addEventListener("resize", h); return () => window.removeEventListener("resize", h);
  }, []);

  useEffect(() => {
    const id = "div-styles";
    if (document.getElementById(id)) return;
    const s = document.createElement("style"); s.id = id;
    s.textContent = `@keyframes divFadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    .div-tab:hover{color:#C8A96E !important;}
    .div-cat:hover{border-color:#C8A96E50 !important;cursor:pointer;}
    .div-tier:hover{opacity:0.85;cursor:pointer;}`;
    document.head.appendChild(s); return () => document.getElementById(id)?.remove();
  }, []);

  const currentTier = TIERS.find(t => t.id === tier)!;
  const tKey = tier === "lean" ? 0 : tier === "standard" ? 1 : 2;
  const toggle = useCallback((id: string) => setExpanded(e => e === id ? null : id), []);

  const baseStyle = (delay = 0) => ({
    animation: `divFadeUp 0.5s ease ${delay}ms both`,
  });

  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif", background: T.bg, minHeight: "100vh", color: T.cream }}>

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div style={{ background: T.card, borderBottom: `3px solid ${T.gold}`, padding: isMobile ? "16px 18px 14px" : "22px 36px 18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: T.dim, letterSpacing: "0.35em", marginBottom: 6, textTransform: "uppercase" }}>
              Ru'ya 360 Advisory Group · Detailed Investment Usage · KAG-JRK-INV-001 · Confidential
            </div>
            <h1 style={{ margin: 0, fontSize: isMobile ? "clamp(16px,4vw,24px)" : "clamp(18px,2.5vw,28px)", fontWeight: 400, color: T.gold, letterSpacing: "0.04em" }}>
              STRIKE BITES — Where Every Dollar Goes
            </h1>
            <p style={{ margin: "5px 0 0", fontSize: 12, color: T.creamDim, fontFamily: "monospace" }}>
              Full investment breakdown · 10 categories · 3 tiers · Team & phase allocation · Lebanon 2025–2026
            </p>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignSelf: "flex-end" }}>
            {["Research-Grounded","All Costs Included","Ru'ya Team Detailed"].map((b,i) => (
              <span key={i} style={{ fontFamily: "monospace", fontSize: 7, color: T.teal, background: `${T.teal}12`, border: `1px solid ${T.teal}28`, padding: "3px 8px", borderRadius: 2, letterSpacing: "0.05em" }}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── TIER SELECTOR ──────────────────────────────────────────────────── */}
      <div style={{ background: T.dark2, borderBottom: `1px solid ${T.line}`, padding: isMobile ? "12px 16px" : "14px 36px", display: "flex", gap: 8, flexWrap: "wrap" }}>
        {TIERS.map(t => (
          <button key={t.id} className="div-tier" onClick={() => setTier(t.id)} style={{
            background: tier === t.id ? `${t.color}18` : "transparent",
            border: `1px solid ${tier === t.id ? t.color : T.line}`,
            borderRadius: 3, padding: "8px 16px", cursor: "pointer",
            color: tier === t.id ? t.color : T.creamDim,
            fontFamily: "monospace", fontSize: isMobile ? 8 : 9, letterSpacing: "0.1em",
            transition: "all 0.2s", position: "relative",
          }}>
            {t.rec && tier === t.id && (
              <span style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", background: T.gold, color: T.bg, fontFamily: "monospace", fontSize: 6, padding: "1px 6px", borderRadius: 1, whiteSpace: "nowrap" }}>RECOMMENDED</span>
            )}
            <div style={{ fontWeight: 700 }}>{t.label}</div>
            <div style={{ fontSize: 7, opacity: 0.7, marginTop: 2 }}>{t.name}</div>
            <div style={{ fontSize: 11, fontWeight: 700, marginTop: 3, color: t.color }}>{fmt(t.total)}</div>
          </button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
          {[
            { l: "ROI Year 1", v: currentTier.roi, c: T.green },
            { l: "Breakeven", v: currentTier.breakeven, c: T.amber },
            { l: "Gross Margin", v: currentTier.margin, c: T.teal },
            { l: "Accounts", v: currentTier.accounts, c: T.purple },
          ].map((s,i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "monospace", fontSize: isMobile ? 10 : 13, color: s.c, fontWeight: 700 }}>{s.v}</div>
              <div style={{ fontFamily: "monospace", fontSize: 7, color: T.dim, letterSpacing: "0.12em" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TABS ───────────────────────────────────────────────────────────── */}
      <div style={{ background: T.card, borderBottom: `1px solid ${T.line}`, padding: isMobile ? "0 12px" : "0 36px", display: "flex", overflowX: "auto" }}>
        {TABS.map(t => (
          <button key={t.id} className="div-tab" onClick={() => setTab(t.id)} style={{
            background: "transparent", border: "none",
            borderBottom: tab === t.id ? `2px solid ${T.gold}` : "2px solid transparent",
            color: tab === t.id ? T.cream : T.dim,
            fontFamily: "monospace", fontSize: isMobile ? 9 : 10, letterSpacing: "0.12em",
            padding: isMobile ? "12px 14px 10px" : "13px 18px 11px",
            cursor: "pointer", whiteSpace: "nowrap", transition: "color 0.2s",
          }}>{t.label}</button>
        ))}
      </div>

      {/* ── CONTENT ────────────────────────────────────────────────────────── */}
      <div ref={contentRef} style={{ padding: isMobile ? "16px 14px" : "24px 36px", maxWidth: 1200, margin: "0 auto" }}>

        {/* ══ OVERVIEW TAB ═══════════════════════════════════════════════════ */}
        {tab === "overview" && (
          <div style={baseStyle()}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "auto 1fr", gap: 24, alignItems: "start" }}>
              {/* Donut + legend */}
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "monospace", fontSize: 9, color: T.dim, letterSpacing: "0.2em", marginBottom: 10 }}>ALLOCATION BY CATEGORY</div>
                <DonutChart cats={CATS} tierId={tier} size={isMobile ? 160 : 200} />
                <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", maxWidth: 220 }}>
                  {CATS.filter(c => c.totals[tKey] > 0).map((c, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 7, height: 7, borderRadius: 1, background: c.color, flexShrink: 0 }} />
                      <span style={{ fontFamily: "monospace", fontSize: 7, color: T.creamDim }}>{c.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Category allocation bars */}
              <div>
                <div style={{ fontFamily: "monospace", fontSize: 9, color: T.dim, letterSpacing: "0.2em", marginBottom: 10 }}>CATEGORY BREAKDOWN — {currentTier.label} · {fmt(currentTier.total)} TOTAL</div>
                {CATS.map((c, i) => {
                  const amt = c.totals[tKey];
                  const p = pct(amt, currentTier.total);
                  if (amt === 0) return null;
                  return (
                    <div key={i} style={{ marginBottom: 10 }} onClick={() => { setTab("breakdown"); setExpanded(c.id); }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <span style={{ fontSize: 11, color: c.color, fontFamily: "monospace" }}>{c.icon}</span>
                          <span style={{ fontSize: 12, color: T.cream, fontFamily: "Georgia, serif" }}>{c.name}</span>
                          <span style={{ fontFamily: "monospace", fontSize: 8, color: T.dim }}>{c.phaseM}</span>
                        </div>
                        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                          <span style={{ fontFamily: "monospace", fontSize: 9, color: T.dim }}>{p}%</span>
                          <span style={{ fontFamily: "monospace", fontSize: 13, color: c.color, fontWeight: 700 }}>{fmt(amt)}</span>
                        </div>
                      </div>
                      <AnimBar pct={p} color={c.color} delay={i * 60} trigger={contentVisible} />
                    </div>
                  );
                })}
                <div style={{ marginTop: 14, padding: "10px 14px", background: `${currentTier.color}08`, border: `1px solid ${currentTier.color}25`, borderRadius: 3 }}>
                  <p style={{ margin: 0, fontSize: 11, color: T.creamDim, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>{currentTier.note}</p>
                </div>
              </div>
            </div>

            {/* Revision notice for Standard tier */}
            {tier === "standard" && (
              <div style={{ marginTop: 18, padding: "14px 18px", background: `${T.amber}08`, border: `1px solid ${T.amber}30`, borderLeft: `3px solid ${T.amber}`, borderRadius: 3 }}>
                <div style={{ fontFamily: "monospace", fontSize: 9, color: T.amber, letterSpacing: "0.15em", marginBottom: 6 }}>REVISED FROM $42,000 → $62,000 — WHAT CHANGED AND WHY</div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 8 }}>
                  {[
                    { cat: "Transportation (NEW)", add: "+$4,500", reason: "Vehicle lease + fuel for 6 months across 60–80 accounts. Entirely absent from original model." },
                    { cat: "Operational Overhead (NEW)", add: "+$4,500", reason: "Workspace, phone, internet, generator, and insurance. Required for any Lebanese operation." },
                    { cat: "Banking Setup (NEW)", add: "+$2,000", reason: "Offshore USD account for cross-border payments. Circular 158 makes this mandatory." },
                    { cat: "Technology Stack (NEW)", add: "+$1,800", reason: "Accounting, inventory, CRM, and website. Required for monthly board P&L reporting." },
                    { cat: "Legal Uplift", add: "+$2,500", reason: "Food regulatory consultant, full trademark scope, and more realistic SARL formation cost." },
                    { cat: "Marketing Uplift", add: "+$3,000", reason: "Proper trainer ambassador program, premium POS hardware, and trade show participation." },
                  ].map((r,i) => (
                    <div key={i} style={{ background: T.card, border: `1px solid ${T.amber}20`, borderRadius: 3, padding: "10px 12px" }}>
                      <div style={{ fontFamily: "monospace", fontSize: 9, color: T.amber, marginBottom: 4 }}>{r.cat} <span style={{ color: T.green }}>{r.add}</span></div>
                      <p style={{ margin: 0, fontSize: 10, color: T.creamDim, lineHeight: 1.6, fontFamily: "Georgia, serif" }}>{r.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ BREAKDOWN TAB ══════════════════════════════════════════════════ */}
        {tab === "breakdown" && (
          <div style={baseStyle()}>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: T.dim, letterSpacing: "0.2em", marginBottom: 14 }}>
              FULL INVESTMENT BREAKDOWN — {currentTier.label} — {currentTier.name.toUpperCase()} — {fmt(currentTier.total)}
            </div>
            <p style={{ margin: "0 0 16px", fontSize: 12, color: T.creamDim, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>
              Click any category to expand the complete line-item breakdown with sourcing notes, timing, and rationale. Every figure is grounded in Lebanon-specific research and industry benchmarks.
            </p>
            {CATS.map((cat) => {
              const amt = cat.totals[tKey];
              const isExp = expanded === cat.id;
              const tierItems = tKey === 0 ? cat.items.lean : tKey === 1 ? cat.items.standard : cat.items.full;
              const p = amt > 0 ? pct(amt, currentTier.total) : 0;
              return (
                <div key={cat.id} className="div-cat" onClick={() => toggle(cat.id)}
                  style={{ background: isExp ? T.dark2 : T.card, border: `1px solid ${isExp ? cat.color : T.line}40`, borderLeft: `3px solid ${cat.color}`, borderRadius: 4, marginBottom: 6, overflow: "hidden", transition: "border-color 0.2s" }}>
                  <div style={{ padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <span style={{ fontFamily: "monospace", fontSize: 14, color: cat.color, flexShrink: 0 }}>{cat.icon}</span>
                    <div style={{ flex: 1, minWidth: 160 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 13, color: T.cream, fontFamily: "Georgia, serif" }}>{cat.name}</span>
                        <span style={{ fontFamily: "monospace", fontSize: 8, color: T.dim, background: `${cat.color}15`, border: `1px solid ${cat.color}25`, padding: "2px 7px", borderRadius: 2 }}>{cat.phaseM}</span>
                      </div>
                      <div style={{ height: 3, background: T.line, borderRadius: 2, marginTop: 5, overflow: "hidden" }}>
                        <div style={{ width: `${p}%`, height: "100%", background: cat.color, opacity: 0.7, transition: "width 0.8s" }} />
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontFamily: "monospace", fontSize: 15, color: amt === 0 ? T.dim : cat.color, fontWeight: 700 }}>{fmt(amt)}</div>
                      {amt > 0 && <div style={{ fontFamily: "monospace", fontSize: 9, color: T.dim }}>{p}% of total</div>}
                    </div>
                    <span style={{ fontFamily: "monospace", fontSize: 11, color: T.dim, flexShrink: 0 }}>{isExp ? "▲" : "▼"}</span>
                  </div>

                  {isExp && (
                    <div style={{ borderTop: `1px solid ${T.line}`, padding: "14px 16px" }}>
                      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12, marginBottom: 14 }}>
                        <div style={{ background: `${cat.color}08`, border: `1px solid ${cat.color}20`, borderRadius: 3, padding: "10px 14px" }}>
                          <div style={{ fontFamily: "monospace", fontSize: 8, color: cat.color, marginBottom: 5, letterSpacing: "0.15em" }}>WHEN</div>
                          <p style={{ margin: 0, fontSize: 11, color: T.creamDim, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>{cat.when}</p>
                        </div>
                        <div style={{ background: `${cat.color}08`, border: `1px solid ${cat.color}20`, borderRadius: 3, padding: "10px 14px" }}>
                          <div style={{ fontFamily: "monospace", fontSize: 8, color: cat.color, marginBottom: 5, letterSpacing: "0.15em" }}>WHY</div>
                          <p style={{ margin: 0, fontSize: 11, color: T.creamDim, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>{cat.why}</p>
                        </div>
                      </div>
                      {tierItems.map((item: any, ii: number) => (
                        <div key={ii} style={{ display: "flex", gap: 12, padding: "9px 0", borderBottom: ii < tierItems.length - 1 ? `1px solid ${T.line}` : "none", alignItems: "flex-start" }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, color: item.a === 0 ? T.dim : T.cream, fontFamily: "Georgia, serif", lineHeight: 1.4 }}>{item.l}</div>
                            {item.n && <div style={{ fontSize: 10, color: T.creamDim, fontFamily: "monospace", marginTop: 3, lineHeight: 1.5, fontStyle: "italic" }}>{item.n}</div>}
                          </div>
                          <div style={{ fontFamily: "monospace", fontSize: 13, color: item.a === 0 ? T.dim : cat.color, fontWeight: 700, flexShrink: 0, textAlign: "right" }}>{fmt(item.a)}</div>
                        </div>
                      ))}
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0", marginTop: 4, borderTop: `1px solid ${cat.color}40` }}>
                        <span style={{ fontFamily: "monospace", fontSize: 10, color: cat.color, letterSpacing: "0.1em" }}>CATEGORY TOTAL</span>
                        <span style={{ fontFamily: "monospace", fontSize: 15, color: cat.color, fontWeight: 700 }}>{fmt(amt)}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Grand total row */}
            <div style={{ marginTop: 12, padding: "16px 20px", background: `${currentTier.color}10`, border: `1px solid ${currentTier.color}40`, borderRadius: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: currentTier.color, letterSpacing: "0.2em" }}>TOTAL INVESTMENT REQUIRED</div>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: T.dim, marginTop: 3 }}>{currentTier.label} · {currentTier.name} · All categories inclusive</div>
              </div>
              <div style={{ fontFamily: "monospace", fontSize: isMobile ? 20 : 28, color: currentTier.color, fontWeight: 700 }}>{fmt(currentTier.total)}</div>
            </div>
          </div>
        )}

        {/* ══ TIMELINE TAB ═══════════════════════════════════════════════════ */}
        {tab === "timeline" && (
          <div style={baseStyle()}>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: T.dim, letterSpacing: "0.2em", marginBottom: 6 }}>PHASE-BY-PHASE CAPITAL DEPLOYMENT — {currentTier.label}</div>
            <p style={{ margin: "0 0 20px", fontSize: 12, color: T.creamDim, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>
              Capital is deployed in three distinct phases, each triggered by milestone completion. Phase 3 (Months 6–12) is self-funded from gross profit — no new investment required at Standard tier.
            </p>

            {/* Phase spending visual */}
            <div style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: 4, padding: "16px", marginBottom: 20 }}>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: T.dim, letterSpacing: "0.15em", marginBottom: 12 }}>SPEND ALLOCATION — {currentTier.label} {fmt(currentTier.total)}</div>
              {[0,1,2].map(pi => {
                const ph = PHASES[pi];
                const spend = pi === 0 ? (tKey === 0 ? ph.t1Spend : tKey === 1 ? ph.t2Spend : ph.t3Spend) : pi === 1 ? (tKey === 0 ? ph.t1Spend : tKey === 1 ? ph.t2Spend : ph.t3Spend) : (tKey === 0 ? ph.t1Spend : tKey === 1 ? ph.t2Spend : ph.t3Spend);
                const spendPct = spend ? pct(spend, currentTier.total) : 0;
                return (
                  <div key={pi} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: ph.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: T.cream, fontFamily: "Georgia, serif" }}>{ph.name}</span>
                        <span style={{ fontFamily: "monospace", fontSize: 9, color: T.dim }}>{ph.months}</span>
                      </div>
                      <span style={{ fontFamily: "monospace", fontSize: 13, color: ph.color, fontWeight: 700 }}>{spend ? fmt(spend) : "Revenue-funded"}</span>
                    </div>
                    {spend && <AnimBar pct={spendPct} color={ph.color} delay={pi * 200} trigger={contentVisible} />}
                  </div>
                );
              })}
            </div>

            {/* Phase cards */}
            {PHASES.map((ph, pi) => {
              const spend = pi === 0 ? (tKey === 0 ? ph.t1Spend : tKey === 1 ? ph.t2Spend : ph.t3Spend) : pi === 1 ? (tKey === 0 ? ph.t1Spend : tKey === 1 ? ph.t2Spend : ph.t3Spend) : pi === 2 ? (tKey === 0 ? ph.t1Spend : tKey === 1 ? ph.t2Spend : ph.t3Spend) : null;
              return (
                <div style={{ background: T.card, border: `1px solid ${ph.color}30`, borderTop: `3px solid ${ph.color}`, borderRadius: 4, marginBottom: 10, padding: "16px 18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                    <div>
                      <div style={{ fontFamily: "monospace", fontSize: 9, color: ph.color, letterSpacing: "0.18em", marginBottom: 4 }}>{ph.months}</div>
                      <div style={{ fontSize: 15, color: T.cream }}>{ph.name}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "monospace", fontSize: 18, color: spend ? ph.color : T.green, fontWeight: 700 }}>{spend ? fmt(spend) : "Self-Funded"}</div>
                      {spend && <div style={{ fontFamily: "monospace", fontSize: 9, color: T.dim }}>~{pct(spend, currentTier.total)}% of total investment</div>}
                    </div>
                  </div>

                  <p style={{ margin: "0 0 12px", fontSize: 12, color: T.creamDim, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>{ph.focus}</p>

                  <div style={{ padding: "8px 12px", background: `${ph.color}08`, border: `1px solid ${ph.color}20`, borderRadius: 3, marginBottom: 12 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 8, color: ph.color, marginBottom: 4, letterSpacing: "0.15em" }}>PHASE MILESTONE</div>
                    <p style={{ margin: 0, fontSize: 11, color: T.cream, fontFamily: "monospace", lineHeight: 1.6 }}>{ph.milestone}</p>
                  </div>

                  <div>
                    <div style={{ fontFamily: "monospace", fontSize: 8, color: T.dim, letterSpacing: "0.15em", marginBottom: 6 }}>KEY ACTIONS THIS PHASE</div>
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "4px 16px" }}>
                      {ph.actions.map((a, ai) => (
                        <div key={ai} style={{ display: "flex", gap: 6, alignItems: "flex-start", padding: "3px 0" }}>
                          <span style={{ color: ph.color, fontFamily: "monospace", fontSize: 9, flexShrink: 0, marginTop: 2 }}>→</span>
                          <span style={{ fontSize: 11, color: T.creamDim, fontFamily: "Georgia, serif", lineHeight: 1.5 }}>{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ══ TEAM TAB ═══════════════════════════════════════════════════════ */}
        {tab === "team" && (
          <div style={baseStyle()}>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: T.dim, letterSpacing: "0.2em", marginBottom: 6 }}>RU'YA 360 PROJECT TEAM — FULL ROSTER & COST BREAKDOWN</div>
            <p style={{ margin: "0 0 20px", fontSize: 12, color: T.creamDim, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>
              Every role required to execute the STRIKE BITES launch from mandate signing through Month 6. Roles are organized by group, with employment type, time allocation, cost basis, and functional responsibilities. Internal Ru'ya 360 roles are covered by the management fee; client-funded roles are additional line items in the budget.
            </p>

            {TEAM_GROUPS.map((group, gi) => (
              <div key={gi} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, paddingBottom: 8, borderBottom: `1px solid ${group.color}30` }}>
                  <div style={{ width: 3, height: 20, background: group.color, borderRadius: 1 }} />
                  <div>
                    <div style={{ fontSize: 14, color: group.color, fontFamily: "Georgia, serif" }}>{group.name}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 9, color: T.dim, marginTop: 2 }}>{group.sub}</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill,minmax(340px,1fr))", gap: 8 }}>
                  {group.members.map((m, mi) => {
                    const key = `${gi}-${mi}`;
                    const isExp = expandedTeam === key;
                    return (
                      <div key={mi} onClick={() => setExpandedTeam(e => e === key ? null : key)} style={{ background: T.card, border: `1px solid ${isExp ? m.typeColor : T.line}30`, borderRadius: 4, overflow: "hidden", cursor: "pointer", transition: "border-color 0.2s" }}>
                        <div style={{ padding: "12px 14px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, gap: 8 }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: 13, color: T.cream, fontFamily: "Georgia, serif", lineHeight: 1.3 }}>{m.title}</div>
                              <span style={{ fontFamily: "monospace", fontSize: 7, color: m.typeColor, background: `${m.typeColor}15`, border: `1px solid ${m.typeColor}30`, padding: "2px 7px", borderRadius: 2, display: "inline-block", marginTop: 4 }}>{m.type}</span>
                            </div>
                            <span style={{ fontFamily: "monospace", fontSize: 10, color: T.dim }}>{isExp ? "▲" : "▼"}</span>
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                            {[
                              { l: "Duration", v: m.duration },
                              { l: "Allocation", v: m.alloc },
                              { l: "Cost", v: m.cost },
                              { l: "Active Tiers", v: m.tiers },
                            ].map((s, si) => (
                              <div key={si} style={{ background: T.dark2, borderRadius: 2, padding: "5px 8px" }}>
                                <div style={{ fontFamily: "monospace", fontSize: 7, color: T.dim, marginBottom: 2 }}>{s.l}</div>
                                <div style={{ fontFamily: "monospace", fontSize: 9, color: m.typeColor }}>{s.v}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {isExp && (
                          <div style={{ borderTop: `1px solid ${T.line}`, padding: "10px 14px", background: T.dark2 }}>
                            <div style={{ fontFamily: "monospace", fontSize: 8, color: T.dim, letterSpacing: "0.15em", marginBottom: 7 }}>RESPONSIBILITIES</div>
                            {m.fns.map((fn, fi) => (
                              <div key={fi} style={{ display: "flex", gap: 7, padding: "4px 0", borderBottom: fi < m.fns.length - 1 ? `1px solid ${T.line}` : "none" }}>
                                <span style={{ color: m.typeColor, fontSize: 9, flexShrink: 0, marginTop: 2, fontFamily: "monospace" }}>→</span>
                                <span style={{ fontSize: 11, color: T.creamDim, fontFamily: "Georgia, serif", lineHeight: 1.5 }}>{fn}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Team cost summary */}
            <div style={{ marginTop: 8, padding: "16px 18px", background: `${T.gold}08`, border: `1px solid ${T.gold}25`, borderRadius: 4 }}>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: T.gold, letterSpacing: "0.2em", marginBottom: 10 }}>TEAM COST SUMMARY — STANDARD TIER (T2)</div>
              {[
                { group: "Ru'ya 360 Management Fee (Phases 0–2)", cost: "$5,000", note: "Covers Lead Advisor + Field Execution Manager" },
                { group: "Field Logistics Coordinator (part-time × 6 months)", cost: "$1,800", note: "$300/month × 6 months" },
                { group: "Client Engagement Expenses", cost: "$700", note: "Travel, reporting tools, account visits" },
                { group: "Brand Designer (project)", cost: "$4,000", note: "Identity + packaging — in Brand category" },
                { group: "Bookkeeper / Accountant (monthly)", cost: "$1,800", note: "$300/month × 6 months — in Technology category" },
                { group: "Lab Testing Partner (CCIAS)", cost: "$300", note: "2 SKU × 2 rounds — in Production category" },
                { group: "IP / Trademark Lawyer", cost: "$600", note: "Filing + 6-month correspondence — in Legal category" },
                { group: "Food Regulatory Consultant", cost: "$400", note: "MoPH support — in Legal category" },
                { group: "Trainer Ambassador Network (×20)", cost: "$1,200", note: "$60 starter × 20 — in Marketing category" },
              ].map((r, ri) => (
                <div key={ri} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: ri < 8 ? `1px solid ${T.line}` : "none", gap: 12, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontSize: 12, color: T.cream, fontFamily: "Georgia, serif" }}>{r.group}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 9, color: T.dim, marginTop: 2 }}>{r.note}</div>
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: 13, color: T.gold, fontWeight: 700, flexShrink: 0 }}>{r.cost}</div>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, marginTop: 4, borderTop: `1px solid ${T.gold}40` }}>
                <span style={{ fontFamily: "monospace", fontSize: 10, color: T.gold, letterSpacing: "0.1em" }}>TOTAL PEOPLE & TEAM COST (across all categories)</span>
                <span style={{ fontFamily: "monospace", fontSize: 16, color: T.gold, fontWeight: 700 }}>~$15,800</span>
              </div>
              <p style={{ margin: "8px 0 0", fontSize: 10, color: T.creamDim, fontFamily: "Georgia, serif", lineHeight: 1.6 }}>
                People and team cost represents ~25% of the Standard tier investment. The remaining 75% is direct market-building capital: legal, brand, production, transport, marketing, operations, and technology infrastructure.
              </p>
            </div>
          </div>
        )}

        {/* ══ GCC TAB ════════════════════════════════════════════════════════ */}
        {tab === "gcc" && (
          <div style={baseStyle()}>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: T.dim, letterSpacing: "0.2em", marginBottom: 6 }}>GCC / MENA EXPANSION — PHASE 4 COST HORIZON</div>
            <p style={{ margin: "0 0 20px", fontSize: 12, color: T.creamDim, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>
              GCC expansion costs are ring-fenced from the Lebanon launch budget. These are Phase 4 items — activated only after Lebanese breakeven is confirmed and the board commits a separate GCC budget tranche. The Lebanon story is the GCC marketing asset: 'Made in Lebanon' carries premium weight in UAE and Saudi Arabia.
            </p>

            <div style={{ padding: "12px 16px", background: `${T.amber}08`, border: `1px solid ${T.amber}30`, borderLeft: `3px solid ${T.amber}`, borderRadius: 3, marginBottom: 20 }}>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: T.amber, letterSpacing: "0.15em", marginBottom: 6 }}>CRITICAL PRINCIPLE — DO NOT BLEND WITH LAUNCH BUDGET</div>
              <p style={{ margin: 0, fontSize: 12, color: T.creamDim, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>
                GCC halal certification, SFDA registration, and UAE listing fees alone would consume the entire Lean ($24K) budget. Present these as a separate Phase 4 funding requirement to the board — never as part of the Lebanese launch investment. The SGS halal process should begin at launch only if GCC entry is planned within 18 months.
              </p>
            </div>

            {GCC_ITEMS.map((item, i) => (
              <div key={i} style={{ background: T.card, border: `1px solid ${item.color}22`, borderLeft: `3px solid ${item.color}`, borderRadius: 4, padding: "14px 16px", marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 6 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: T.cream, fontFamily: "Georgia, serif" }}>{item.cat}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 9, color: T.dim, marginTop: 3 }}>{item.freq}</div>
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: 14, color: item.color, fontWeight: 700, textAlign: "right", flexShrink: 0 }}>{item.cost}</div>
                </div>
                <p style={{ margin: 0, fontSize: 11, color: T.creamDim, lineHeight: 1.65, fontFamily: "Georgia, serif" }}>{item.note}</p>
              </div>
            ))}

            <div style={{ marginTop: 16, padding: "16px 18px", background: `${T.gold}08`, border: `1px solid ${T.gold}30`, borderRadius: 4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: T.gold, letterSpacing: "0.15em" }}>ESTIMATED PHASE 4 BUDGET REQUIREMENT</div>
                  <p style={{ margin: "5px 0 0", fontSize: 11, color: T.creamDim, fontFamily: "Georgia, serif" }}>Full GCC market entry: halal cert, UAE + KSA registration, freight, distributor onboarding, listing fees (2 SKUs × 2 chains)</p>
                </div>
                <div style={{ fontFamily: "monospace", fontSize: 22, color: T.gold, fontWeight: 700 }}>$35K–$75K</div>
              </div>
            </div>

            <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
              {[
                { title: "The Lebanon Advantage", color: T.green, body: "'Made in Lebanon' is a premium provenance signal in UAE and Saudi Arabia — especially for food products. The Lebanese identity is a GCC marketing asset, not a constraint. Every product decision — flavor profile, halal certification, trilingual packaging — was designed for Lebanon first and GCC portability second." },
                { title: "The 18-Month Rule", color: T.amber, body: "If GCC entry is planned within 18 months of Lebanon launch, begin the SGS halal process (GSO 2055-2) at launch — not after the first export attempt. SGS takes 3–6 months from application to certificate. Retrospective certification attempts delay market entry by a full season." },
              ].map((c, i) => (
                <div key={i} style={{ background: T.card, border: `1px solid ${c.color}25`, borderRadius: 4, padding: "14px 16px" }}>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: c.color, letterSpacing: "0.12em", marginBottom: 8 }}>{c.title}</div>
                  <p style={{ margin: 0, fontSize: 12, color: T.creamDim, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${T.line}`, padding: isMobile ? "12px 16px" : "14px 36px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontFamily: "monospace", fontSize: 9, color: `${T.dim}80`, letterSpacing: "0.12em" }}>RU'YA 360 ADVISORY GROUP · DETAILED INVESTMENT USAGE · CONFIDENTIAL · NOT FOR DISTRIBUTION</span>
        <span style={{ fontFamily: "monospace", fontSize: 9, color: `${T.dim}80` }}>KAG-JRK-INV-001 · STRIKE BITES · JUNE 2026</span>
      </div>

    </div>
  );
}

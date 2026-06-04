import { useState, useEffect, useCallback } from "react";

// ─── BRAND CONSTANTS ───────────────────────────────────────────────────────────
const C = {
  void: "#050404", obsidian: "#0A0908", charcoal: "#141210",
  ash: "#1E1B18", ember: "#2A2520", smoke: "#2E2A26",
  gold: "#C8A050", goldBright: "#E0B860", goldDim: "#7A6030",
  cream: "#EDE0CC", creamDim: "#8A7A6A", creamMid: "#BEB0A0",
  green: "#3A6040", greenBright: "#5A9060", greenDim: "#2A4030",
  red: "#C04030", redDim: "#8A2820", amber: "#C07030",
  purple: "#7060A0", steel: "#506080", strike: "#E8D0A0",
};

// ─── RESPONSIVE HOOK ───────────────────────────────────────────────────────────
function useResponsive() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile, isTablet };
}

// ─── SVG BAG RENDER (inline, no external dep) ─────────────────────────────────
function StrikeBagMini({ accent = C.amber, size = 1 }) {
  const W = 160 * size, H = 250 * size;
  const id = `b${Math.round(Math.random() * 9999)}`;
  return (
    <svg width={W} height={H} viewBox={0} y={0} x={0} style={{ display: "block", filter: `drop-shadow(0 ${12*size}px ${28*size}px rgba(0,0,0,0.9)) drop-shadow(0 2px 8px ${accent}22)` }}>
      <defs>
        <linearGradient id={`bg${id}`} x1={0} y1={0} x2={1} y2={1}>
          <stop offset="0%" stopColor="#161412"/><stop offset="100%" stopColor="#080706"/>
        </linearGradient>
        <linearGradient id={`gl${id}}` x1={0} y1={0} x2={0} y2={1}>
          <stop offset="0%" stopColor={C.goldBright}/><stop offset="100%" stopColor={C.goldDim}/>
        </linearGradient>
        <linearGradient id={`el${id}`} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0%" stopColor="black" stopOpacity="0.65"/><stop offset="100%" stopColor="black" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id={`er${id}`} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0%" stopColor="black" stopOpacity="0"/><stop offset="100%" stopColor="black" stopOpacity="0.65"/>
        </linearGradient>
        <linearGradient id={`sh${id}`} x1={0} y1={0} x2={1} y2={0}>
          <stop offset="0%" stopColor="white" stopOpacity="0.07"/><stop offset="100%" stopColor="white" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={160} height={250} rx={10} fill={`url(#bg${id})`}/>
      {Array.from({length:16}).map((_,i)=><line key={i} x1={i*11} y1={0} x2={i*11-20} y2={250} stroke="white" strokeWidth="0.12" strokeOpacity="0.035"/>)}
      <rect x={0} y={0} width={160} height={36} rx={10} fill="#0C0B0A"/>
      <rect x={0} y={24} width={160} height={12} fill="#0C0B0A"/>
      <text x={12} y={16} fill={C.gold} opacity="0.45" fontFamily="monospace" fontSize="5" letterSpacing="2">KAG-JRK · BITES</text>
      <text x={12} y={27} fill={C.cream} opacity="0.2" fontFamily="monospace" fontSize="5" letterSpacing="1">SINGLE SERVE · 40g</text>
      <circle cx={138} cy={70} r={16} fill={C.green}/>
      <text x={138} y={67} textAnchor="middle" fill="white" fontFamily="Georgia,serif" fontSize="7" fontWeight="bold">حلال</text>
      <text x={138} y={76} textAnchor="middle" fill="white" fontFamily="monospace" fontSize="4.5">HALAL</text>
      <rect x={12} y={40} width={`url(#gl${id})` ? 112 : 112} height="1.2" fill={`url(#gl${id})`} opacity="0.8"/>
      <text x={12} y={72} fill={C.cream} fontFamily="'Didot','Bodoni MT','Playfair Display',Georgia,serif" fontSize="30" fontWeight="400" letterSpacing="5">STRIKE</text>
      <text x={12} y={86} fill={C.gold} opacity="0.5" fontFamily="Georgia,serif" fontSize="8">سترايك بايتس</text>
      <rect x={12} y={91} width={136} height="0.7" fill={C.cream} opacity="0.1"/>
      <text x={12} y={130} fill={`url(#gl${id})`} fontFamily="'Didot','Bodoni MT',Georgia,serif" fontSize="48" letterSpacing="-1">[X]g</text>
      <text x={12} y={145} fill={C.cream} opacity="0.85" fontFamily="monospace" fontSize="7" letterSpacing="4">PROTEIN</text>
      <text x={12} y={155} fill={C.cream} opacity="0.3" fontFamily="monospace" fontSize="4.5" letterSpacing="2">بروتين · PROTÉINE</text>
      <rect x={12} y={161} width={136} height="0.6" fill={C.cream} opacity="0.08"/>
      <rect x={12} y={168} width={136} height={22} fill={accent} fillOpacity="0.1" rx={3}/>
      <rect x={12} y={168} width={3} height={22} fill={accent} rx={1.5}/>
      <text x={22} y={179} fill={accent} fontFamily="'Didot',Georgia,serif" fontSize="9" letterSpacing="1">SMOKING BBQ</text>
      <text x={22} y={188} fill={accent} opacity="0.55" fontFamily="Georgia,serif" fontSize="6">مدخّن BBQ · BBQ FUMÉ</text>
      <rect x={0} y={198} width={160} height={28} fill="#0C0B0A"/>
      <rect x={0} y={198} width={160} height="0.7" fill={C.gold} opacity="0.25"/>
      <text x={12} y={210} fill={C.green} fontFamily="monospace" fontSize="4.5" letterSpacing="0.3">✓ NO ADDED SUGAR</text>
      <text x={90} y={210} fill={C.green} fontFamily="monospace" fontSize="4.5" letterSpacing="0.3">✓ NO PRESERVATIVES</text>
      <text x={12} y={220} fill={C.cream} opacity="0.25" fontFamily="monospace" fontSize="4" letterSpacing="1">MADE IN LEBANON · صنع في لبنان</text>
      <rect x={0} y={226} width={160} height={24} fill="#050404"/>
      <rect x={12} y={229} width={34} height={10} fill="white" rx={1}/>
      {Array.from({length:14}).map((_,i)=><rect key={i} x={13+i*2.1} y="230.5" width={i%3===0?1.2:0.6} height={i%5===0?7:5.5} fill="#080706"/>)}
      <text x={80} y={238} textAnchor="middle" fill={C.gold} opacity="0.15" fontFamily="monospace" fontSize="4" letterSpacing="1">KITS ADVISORY · STRIKE</text>
      <rect x={0} y={0} width={160} height={250} fill={`url(#sh${id})`} rx={10}/>
      <rect x={0} y={0} width={20} height={250} fill={`url(#el${id})`} rx={10}/>
      <rect x={140} y={0} width={20} height={250} fill={`url(#er${id})`} rx={10}/>
    </svg>
  );
}

// ─── SECTION DIVIDER ──────────────────────────────────────────────────────────
function SectionDivider({ slide }) {
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${slide.color}08 0%, transparent 60%)` }}/>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: slide.color }}/>
      <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: `linear-gradient(${C.gold} 1px, transparent 1px), linear-gradient(90deg, ${C.gold} 1px, transparent 1px)`, backgroundSize: "40px 40px" }}/>
      <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: "monospace", fontSize: 11, color: slide.color, opacity: 0.7, letterSpacing: "0.5em", marginBottom: 20 }}>{slide.section}</div>
        <h1 style={{ fontFamily: "'Didot','Bodoni MT','Playfair Display',Georgia,serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 400, color: C.strike, margin: "0 0 20px", letterSpacing: "0.05em", lineHeight: 1.1 }}>{slide.title}</h1>
        <div style={{ width: 64, height: 2, background: `linear-gradient(to right, ${slide.color}, transparent)`, margin: "0 auto 20px" }}/>
        {slide.sub && <p style={{ fontFamily: "Georgia,serif", fontSize: 16, color: C.creamDim, margin: 0, maxWidth: 500, lineHeight: 1.6 }}>{slide.sub}</p>}
      </div>
    </div>
  );
}

// ─── SHARED HEADER ────────────────────────────────────────────────────────────
function SH({ slide }) {
  return (
    <div style={{ marginBottom: 4 }}>
      {slide.section && <div style={{ fontFamily: "monospace", fontSize: 9, color: C.gold, opacity: 0.6, letterSpacing: "0.3em", marginBottom: 6 }}>{slide.section}</div>}
      <h2 style={{ margin: "0 0 4px", fontFamily: "'Didot','Bodoni MT','Playfair Display',Georgia,serif", fontSize: "clamp(17px,2.3vw,30px)", fontWeight: 400, color: C.cream, lineHeight: 1.2 }}>{slide.title}</h2>
      <div style={{ width: 48, height: 2, background: `linear-gradient(to right, ${C.gold}, transparent)`, marginTop: 8 }}/>
    </div>
  );
}

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
      open: "Good [morning/afternoon]. Thank you for your time. This presentation is the culmination of KITS' full advisory work on STRIKE BITES — covering market research, brand strategy, competitive analysis, go-to-market, financials, and the critical decisions we must make in this room today. We have approximately 75 minutes. The most important section is Section 07 — the blockers. Everything before that is context. That section requires decisions.",
      emphasis: ["This is a working session, not a pitch. Every slide is designed to generate a decision, surface a gap, or confirm a direction. Interrupt freely."],
      timing: "2 minutes"
    }
  },
  // ── 02 AGENDA ────────────────────────────────────────────────────────────────
  {
    id: "agenda",
    type: "agenda",
    section: "MEETING STRUCTURE",
    label: "AGENDA",
    title: "What We Cover Today",
    note: "Interrupt at any point. These slides are the map — the conversation is the territory.",
    items: [
      { n: "01", text: "The Opportunity — Why Lebanon, Why Now, Why STRIKE", tag: "8 min", color: C.gold },
      { n: "02", text: "The Consumer — Who We Are Serving and How", tag: "5 min", color: C.amber },
      { n: "03", text: "The Product — STRIKE BITES & Line Architecture", tag: "6 min", color: C.gold },
      { n: "04", text: "The Brand — STRIKE Identity, Score & Visual System", tag: "8 min", color: C.amber },
      { n: "05", text: "Our 7 Power Points — How We Win", tag: "6 min", color: C.greenBright },
      { n: "06", text: "Competition — Full Middleman & End User Analysis", tag: "6 min", color: C.greenBright },
      { n: "07", text: "Go-To-Market — Channel Sequence & Activation", tag: "6 min", color: C.gold },
      { n: "08", text: "Financial Scenarios — Three Budget Tiers", tag: "8 min", color: C.amber },
      { n: "09", text: "Risk Register — What We're Watching", tag: "4 min", color: C.red },
      { n: "10", text: "Critical Blockers — Decisions Required Today", tag: "8 min", color: C.red },
      { n: "11", text: "KITS Mandate — Scope, Fees, Governance", tag: "5 min", color: C.gold },
      { n: "12", text: "Next Steps — Timeline to First Sale", tag: "3 min", color: C.greenBright },
    ],
    notes: {
      open: "Walk through the agenda briefly. Confirm timing expectations. Signal that Section 10 — Critical Blockers — is where we will spend the most deliberate time, as it requires board-level decisions.",
      emphasis: ["If time runs short, sections 2, 6, and 9 can be summarized quickly. Sections 8, 10, and 11 must not be cut."],
      timing: "1 minute"
    }
  },
  // ── 03 THE OPPORTUNITY ───────────────────────────────────────────────────────
  {
    id: "opportunity",
    type: "stats",
    section: "01 · THE OPPORTUNITY",
    label: "MARKET",
    title: "An Empty Category in a Growing Market",
    headline: "There is no established local beef jerky brand in Lebanon. That is not a gap — it is a vacuum.",
    stats: [
      { value: "ZERO", label: "Local beef jerky brands", sub: "in Lebanon today · Category is fully available", color: C.greenBright },
      { value: "$1.04B", label: "Middle East sports nutrition", sub: "+7.3% CAGR through 2033", color: C.gold },
      { value: "82.6%", label: "Brick-and-mortar dominance", sub: "of MENA sports nutrition sales", color: C.gold },
      { value: "$8.49B", label: "GCC snacks market 2024", sub: "→ $12.87B by 2030 at 7.18% CAGR", color: C.amber },
    ],
    footnote: "Sources: Grand View Research, Precedence Research, Cognitive Market Research 2024–2025",
    notes: {
      open: "Start with ZERO and let it land. There is no established local beef jerky brand in Lebanon. This is the single most commercially important fact in the entire presentation. Every competitor in this category is imported, expensive, not Halal-certified, and not designed for the Lebanese palate or fitness consumer.",
      emphasis: [
        "The 82.6% brick-and-mortar dominance validates every decision to prioritize personal visits over digital channels. This is not a conservative choice — it is the statistically correct approach.",
        "The ZERO local brand figure is the most powerful number in this deck. Let it land before moving on.",
      ],
      timing: "4 minutes"
    }
  },
  {
    id: "whynow",
    type: "two-col",
    section: "01 · THE OPPORTUNITY",
    label: "TIMING",
    title: "Why Lebanon. Why Now.",
    left: {
      heading: "THE TAILWINDS",
      items: [
        "Lebanese fitness culture expanding — gyms, CrossFit, boutique studios proliferating across Beirut, Metn, Keserwan, Jounieh",
        "Health-conscious youth (18–40) actively tracking macros — protein content is now a purchase driver, not a feature",
        "USD-denominated market post-2019 creates pricing stability for a premium brand",
        "Lebanese manufacturing provenance is a GCC premium signal — 'Made in Lebanon' travels with cultural weight",
        "Halal certification is a structural market access key — unlocks 60%+ of Lebanese consumers and all GCC markets simultaneously from day one",
      ]
    },
    right: {
      heading: "THE WINDOW",
      items: [
        "First-mover advantage in an empty category is available — but not indefinitely",
        "Imported jerky brands (Jack Link's, Wild West) are present but weak: high sugar, no Halal, wrong pricing, wrong flavors",
        "No local competitor is building in this space currently — KITS field research confirms",
        "Regulatory timeline (MoPH) runs 2–4 months — beginning now means shelf-ready by Q4 2026",
        "Warm relationship network across gyms, nutrition stores, and pharmacies compresses outreach from 3 months to 3 weeks",
      ]
    },
    notes: {
      open: "The window is real and it is open — but first-mover advantage is not permanent. The moment STRIKE BITES succeeds visibly, imitation follows in Lebanon within 12 months. Our protection is: trademark registration, brand equity built through relationships, and flavor IP in the supply agreement. Speed of execution is a competitive moat in itself.",
      emphasis: ["If we do not move, someone else will. The market data makes this category too obvious to stay empty for long."],
      timing: "3 minutes"
    }
  },
  {
    id: "sec02",
    type: "section",
    label: "§02",
    section: "SECTION 02",
    title: "The Consumer",
    sub: "Three segments. One product. Sequenced by channel.",
    notes: { open: "Transition slide.", emphasis: [], timing: "15 seconds" }
  },
  {
    id: "segments",
    type: "segment",
    section: "02 · THE CONSUMER",
    title: "Who We Serve — Three Segments, One Channel Sequence",
    segments: [
      {
        priority: "PRIMARY SEGMENT", name: "Fitness Enthusiasts", demo: "18–40 · Gym members · Macro trackers",
        color: C.gold,
        wants: ["High protein per serving — reads the label first", "Zero added sugar — tracking every gram", "Clean ingredients — short list, real food only", "Halal certified — non-negotiable for majority"],
        channel: "Gyms · CrossFit boxes · Sports nutrition stores"
      },
      {
        priority: "SECONDARY SEGMENT", name: "Health Professionals", demo: "25–50 · Office workers · Intermittent fasters",
        color: C.amber,
        wants: ["Calorie-controlled snacking for weight management", "Protein to support satiety between meals", "Portable, no-prep — desk drawer, bag, car", "Credible brand with visible nutritional claims"],
        channel: "Pharmacies · Nutrition shops · Premium supermarkets"
      },
      {
        priority: "TERTIARY SEGMENT", name: "General Snack Consumer", demo: "18–55 · Taste-driven · Convenience seekers",
        color: C.greenBright,
        wants: ["Flavor-first — taste is the primary purchase driver", "Convenient format — grab and go, no prep", "Local brand pride — 'Made in Lebanon' resonates", "Accessible price — routine purchase, not occasional"],
        channel: "Supermarkets · Co-ops · Convenience · B2B"
      }
    ],
    notes: {
      open: "Three segments. But we launch for Segment One only. We do not design for the general snack consumer first. We design for the macro-tracking gym member — the person who will become the brand's most vocal advocate. When that segment believes in STRIKE, it creates the credibility that converts Segments Two and Three without additional spend.",
      emphasis: ["Design for One. Win Three. This is the correct sequencing for a premium product in this market."],
      timing: "4 minutes"
    }
  },
  {
    id: "sec03",
    type: "section",
    label: "§03",
    section: "SECTION 03", color: C.gold,
    title: "The Product",
    sub: "STRIKE BITES. What it is, what it does, and how it scales.",
    notes: { open: "Transition slide.", emphasis: [], timing: "15 seconds" }
  },
  {
    id: "product",
    type: "product",
    section: "03 · THE PRODUCT",
    label: "PRODUCT",
    title: "STRIKE BITES — The Launch Product",
    tagline: "Premium portioned beef jerky bites. Poppable. High-protein. Clean.",
    pillars: [
      { icon: "◈", label: "Format", value: "Poppable cubed bites — not strips. Gym counter and impulse. Different consumption occasion from all competitors." },
      { icon: "◉", label: "Protein", value: "[X]g per serving · Pending lab confirmation · Clean beef protein — complete amino acid profile." },
      { icon: "◎", label: "Zero Sugar", value: "Zero added sugar. Zero artificial sweeteners. Jack Link's: sugar is ingredient #2. We have none." },
      { icon: "◐", label: "Halal", value: "Fully certified — Dar Al-Fatwa Lebanon. GCC export-ready from day one." },
      { icon: "◈", label: "Flavor", value: "SMOKING BBQ — Lebanese BBQ profile. Cedar smoke, Aleppo pepper, sumac, pomegranate back-note." },
      { icon: "◉", label: "Pack", value: "Dark matte pouch. Performance gold. Trilingual Arabic/English/French. UV spot varnish on STRIKE wordmark." },
    ],
    line: [
      { name: "STRIKE BITES", phase: "LAUNCH · NOW", flavor: "Smoking BBQ", format: "40g single-serve", channel: "Gym · Nutrition Store", color: C.gold },
      { name: "STRIKE STRIPS", phase: "PHASE 2 · M4", flavor: "Fire & Lime", format: "120g resealable", channel: "Pharmacy · Supermarket", color: C.amber },
      { name: "STRIKE STICKS", phase: "PHASE 3 · M8", flavor: "Za'atar", format: "Per stick", channel: "Convenience · Add-on", color: C.greenBright },
      { name: "STRIKE PACKS", phase: "PHASE 4 · GCC", flavor: "Variety", format: "Multipack", channel: "GCC Retail · Gift", color: C.purple },
    ],
    notes: {
      open: "The product is deliberately simple. Poppable beef jerky bites. High protein. Zero sugar. Halal certified. Lebanese made. That is the entire story in one sentence. Everything else — the brand, the packaging, the flavor profile — exists to make that one sentence credible and compelling at point of purchase.",
      emphasis: [
        "BITES is not traditional jerky. The poppable format creates a different purchase occasion — grab-and-go protein, not a meal companion. This distinction matters at the gym counter.",
        "⚠ All [X] protein values are placeholders pending manufacturer nutritional panel. This is the top priority action from today's meeting.",
        "One SKU at launch. The product line is designed now and launched in sequence. Over-ranging at launch is the #1 FMCG startup mistake.",
      ],
      timing: "5 minutes"
    }
  },
  {
    id: "brandvisual",
    type: "brandvisual",
    section: "03 · THE PRODUCT",
    title: "STRIKE — Packaging System",
    elements: [
      { label: "STRIKE Wordmark", note: "Custom serif — UV spot gloss on matte. Reads at 1 meter.", color: C.gold, verdict: "CONFIRMED" },
      { label: "Performance Gold", note: "Earthy amber — not chrome. Protein hero number, brand name, flavor zone.", color: C.gold, verdict: "CONFIRMED" },
      { label: "Cedar Micro-Icon", note: "5-line geometric abstraction. 15% opacity. Not literal — not provincial.", color: C.amber, verdict: "EVOLVE" },
      { label: "Halal Badge", note: "Forest green. Dar Al-Fatwa mark. Front panel top right — always.", color: C.greenBright, verdict: "CONFIRMED" },
      { label: "Flavor Color System", note: "BBQ = ember red. Fire & Lime = orange. Za'atar = olive. Gold constant.", color: C.amber, verdict: "CONFIRMED" },
      { label: "Trilingual System", note: "Arabic (regulatory) · English (commercial) · French (market).", color: C.gold, verdict: "CONFIRMED" },
    ],
    notes: {
      open: "This is what STRIKE looks like on shelf. The packaging system applies all confirmed brand elements — dark obsidian base, performance gold accent, volcanic grain texture, flavor color coding, and full trilingual regulatory compliance. Every element here is specified in the Brand Design Brief (KAG-JRK-006) which the designer receives immediately upon brand name confirmation.",
      emphasis: ["The UV spot varnish on the STRIKE wordmark: $0.02–0.05 per unit. Shelf impact: disproportionate. This is non-negotiable for premium positioning."],
      timing: "3 minutes"
    }
  },
  {
    id: "brand",
    type: "brandscore",
    section: "04 · BRAND STRATEGY",
    label: "BRAND",
    title: "STRIKE — Brand Identity Score",
    score: 88,
    elements: [
      { label: "Brand Name", value: "STRIKE", verdict: "APPROVED", score: 92, note: "Single syllable. Universal phonetics across Arabic, English, French. Kinetically charged — verb and noun simultaneously. Fully trademarkable Class 29." },
      { label: "Sub-Brand", value: "STRIKE BITES", verdict: "APPROVED", score: 88, note: "Alliterative architecture. Scales to STRIPS / STICKS / PACKS. Each format = distinct channel + purchase occasion." },
      { label: "Front Tagline", value: "FUEL THE PRIMAL.", verdict: "RECOMMENDED", score: 85, note: "Refinement of 'REAL PRIMAL MUSCLE FUEL.' — faster, more poetic, less supplement-adjacent. Board confirmation needed." },
      { label: "Back Manifesto", value: "STRIKE THE GAINS.", verdict: "APPROVED", score: 85, note: "Activates brand name as a verb. No competitor can 'strike the gains.' Gym-channel primary. Expand for back panel." },
      { label: "Visual System", value: "Dark · Gold · Matte", verdict: "APPROVED", score: 90, note: "Obsidian base, performance gold, matte laminate, grain texture, UV spot on wordmark. Confirmed for premium athletic category 2025–2026." },
      { label: "Cedar Icon", value: "Geometric Abstract", verdict: "EVOLVE", score: 75, note: "5 vector lines — NOT literal illustration. 15% opacity, background only. Cedar is over-used literally in Lebanese brand identity." },
    ],
    notes: {
      open: "KITS scored the STRIKE brand at 88 out of 100. That is a strong score for a pre-launch brand — most launch with a 70. The name is exceptional. The architecture scales. The visual system is right for this market in 2025–2026. The two items requiring board decision are the front tagline (FUEL THE PRIMAL vs. REAL PRIMAL MUSCLE FUEL) and the cedar icon execution.",
      emphasis: [
        "The score of 88 is real and defensible. It reflects: name uniqueness, phonetic viability, trademark cleanness, visual identity potential, cultural resonance, and scalability to GCC and Western markets.",
        "The tagline decision is a board call. Both options work. FUEL THE PRIMAL. is the recommendation.",
      ],
      timing: "4 minutes"
    }
  },
  {
    id: "powerpoints",
    type: "powerpoints",
    section: "04 · COMPETITIVE EDGE",
    label: "POWER",
    title: "Our 7 Structural Advantages — None Replicable Quickly",
    points: [
      { rank: "01", title: "Halal — The Market Access Key", color: C.greenBright, middleman: "Removes purchase objection for ~60% of Lebanon's consumer base. Store can confidently recommend to every customer with zero qualification.", enduser: "Consumer reads the mark, purchases without research or doubt. The only beef jerky in market with this confidence.", vs: "Jack Link's: soy sauce base raises doubt. Wild West: no certification. Quest/Barebells: not certified. None can fix this without reformulating from scratch." },
      { rank: "02", title: "Zero Added Sugar — The Macro Truth", color: C.gold, middleman: "Staff can make a specific, truthful claim: 'This has zero added sugar.' A claim no competitor can make.", enduser: "Athlete tracking macros sees 0g. No insulin spike, no crash, no guilt. Categorically different from every bar on the shelf.", vs: "Jack Link's: sugar #2. Wild West: 20.6g/100g. Quest: sucralose (GI complaints). Barebells: maltitol (laxative effect). All have a sugar problem." },
      { rank: "03", title: "Local Production — Price & Story", color: C.amber, middleman: "No import markup, no customs exposure, no currency risk. Can price 30–40% below imported competitors while maintaining better margin.", enduser: "'Made in Lebanon' carries economic solidarity weight. A locally produced product in 2026 Lebanon resonates beyond just food provenance.", vs: "Every competitor is imported. All subject to import disruption, currency volatility, and customs delays. We are immune on the local component." },
      { rank: "04", title: "Sale-or-Return Terms", color: C.purple, middleman: "No competitor offers S-O-R to Lebanese trade. Removes the only real objection: 'What if it doesn't sell?' Reframes relationship from vendor to partner.", enduser: "Indirect benefit: a store with zero inventory risk stocks more, places better, recommends more confidently.", vs: "Jack Link's, Wild West, Quest, Barebells — all require upfront payment. No exceptions. STRIKE is the only brand with this proposition." },
      { rank: "05", title: "Personal Service — The Relationship Moat", color: C.steel, middleman: "KITS delivers personally, trains staff personally, checks in bi-weekly. No competitor does this at gym and nutrition store level.", enduser: "Staff who believe in the product give unsolicited recommendations. The Lebanese community talks — word of mouth starts here.", vs: "Importers manage 50–200 SKUs. Our brand is one of hundreds. No personal delivery, no staff training, no bi-weekly check-in." },
      { rank: "06", title: "Lebanese BBQ — The Only Local Flavor", color: C.amber, middleman: "A flavor people recognize and want. Stores carrying Jack Link's Teriyaki sell to a niche. Lebanese BBQ sells to everyone.", enduser: "Cedar smoke, Aleppo pepper, pomegranate brightness — this tastes like Lebanon. An emotional ownership no import can replicate.", vs: "All direct competitors use American or British flavor profiles. None have designed for the Lebanese palate. The flavor white space is entirely ours." },
      { rank: "07", title: "Trilingual Packaging", color: C.greenBright, middleman: "Full MoPH-compliant Arabic labeling. A store stocking STRIKE faces zero regulatory risk. Stores stocking imports face liability.", enduser: "Consumer reads in Arabic, English, or French. No translation barrier, no guessing at ingredients. Full transparency in every language spoken.", vs: "Every imported competitor uses English-only packaging. None are designed for Lebanon first. We are the only product built for this market from the ground up." },
    ],
    notes: {
      open: "Seven structural advantages. No single competitor holds more than three of these simultaneously. We hold all seven. These are not marketing claims — they are built into the product formulation, the business model, and the go-to-market approach. Each one answers a different objection from a different stakeholder.",
      emphasis: ["Point 04 — Sale-or-Return — is often the most surprising to the room. Make sure to dwell on it. No competitor offers this. It is a commercial differentiator that costs us nothing to provide and removes every barrier to first stocking."],
      timing: "5 minutes"
    }
  },
  {
    id: "competitive",
    type: "matrix",
    section: "04 · COMPETITIVE EDGE",
    title: "Head-to-Head: STRIKE vs. Every Competitor",
    subtitle: "Evaluated from the middleman (store owner) and end user (consumer) perspective simultaneously",
    rows: [
      { criterion: "Halal Certification", jl: "✗ Not certified", ww: "✗ Not certified", qb: "✗ Not certified", bb: "✗ Not certified", us: "✓ Dar Al-Fatwa", usWin: true },
      { criterion: "Zero Added Sugar", jl: "✗ Sugar = ingredient #2", ww: "✗ 20.6g per 100g", qb: "~ Sucralose (GI risk)", bb: "~ Maltitol (GI risk)", us: "✓ Zero. None.", usWin: true },
      { criterion: "Clean Ingredient List", jl: "✗ 10+ processed inputs", ww: "~ Better but nitrites", qb: "✗ Ultra-processed", bb: "✗ Engineered bar", us: "✓ Beef + spices only", usWin: true },
      { criterion: "Sale-or-Return Terms", jl: "✗ Cash upfront", ww: "✗ Cash upfront", qb: "✗ Via distributor", bb: "✗ Via distributor", us: "✓ First 30 days S-O-R", usWin: true },
      { criterion: "Direct Delivery <24h", jl: "✗ 3–7 days importer", ww: "✗ 5–14 days import", qb: "✗ 3–5 days dist.", bb: "✗ 3–5 days dist.", us: "✓ Personal · 24 hours", usWin: true },
      { criterion: "Lebanese Flavor Design", jl: "✗ Teriyaki, Sweet BBQ", ww: "✗ Honey BBQ, Jalapeño", qb: "✗ Cookie Dough", bb: "✗ Chocolate variants", us: "✓ Lebanese BBQ", usWin: true },
      { criterion: "Trilingual Pack (AR/EN/FR)", jl: "✗ English only", ww: "✗ English only", qb: "✗ English only", bb: "✗ English only", us: "✓ Arabic · EN · FR", usWin: true },
      { criterion: "Retail Price (single-serve)", jl: "✗ $4.50–6.50", ww: "✗ $4.00–6.00", qb: "~ $3.50–5.00", bb: "~ $3.50–5.00", us: "✓ $2.50–3.50 target", usWin: true },
    ],
    notes: {
      open: "This table tells the complete competitive story. STRIKE wins on every single criterion. Take a moment to let the board read across the row for any single criterion — the pattern is the same everywhere: every competitor in red or amber, STRIKE in green. This does not happen in competitive analysis. Use it.",
      emphasis: [
        "The price advantage row deserves specific discussion. At $2.50–$3.50, STRIKE is a routine daily purchase for a gym member. At $4.50–$6.50 (Jack Link's price), it is an occasional purchase. The behavioral difference between routine and occasional is the entire brand equity question.",
      ],
      timing: "4 minutes"
    }
  },
  {
    id: "gtm",
    type: "phases",
    section: "05 · GO-TO-MARKET",
    label: "GTM",
    title: "Channel Sequence — Relationship-First, Phase by Phase",
    phases: [
      {
        phase: "PHASE 0–1", time: "NOW → Month 4", color: C.gold, title: "Foundation & Build",
        principle: "Build the structure before the product. Regulatory, legal, and brand foundations run in parallel — not in sequence.",
        actions: ["Legal entity (SARL) — engage notary this week", "Manufacturer supply agreement — signed in writing", "Lab testing — nutritional panel (LIBNOR, 2–4 weeks)", "MoPH registration — begin process (2–4 months lead time)", "Halal certification — apply Dar Al-Fatwa (3–6 weeks)", "STRIKE trademark — Class 29 + 35, Lebanese MoET", "Brand designer briefing — begins on name confirmation", "Warm calls to sports nutrition stores — begins this week"],
        targets: [{ label: "Legal entity registered", value: "Week 4" }, { label: "MoPH submitted", value: "Month 2" }, { label: "Designer briefed", value: "Week 6" }, { label: "First warm visits", value: "Week 2" }]
      },
      {
        phase: "PHASE 2", time: "Month 4–6", color: C.amber, title: "Launch",
        principle: "Sports nutrition stores are Priority One. Their customer is already in protein-buying mode on every visit. The cross-sell is automatic.",
        actions: ["Formal launch: 20–30 accounts (gyms + nutrition stores)", "STRIKE TEAM trainer program — founding 20 trainers activated", "Sale-or-return terms for all first-month placements", "Staff training at every account — done personally by KITS", "Display setup at every account — done by KITS, not left to staff", "Weekly sell-through monitoring across all accounts", "Pharmacy and nutrition shop outreach begins Month 4"],
        targets: [{ label: "Active accounts", value: "20–30" }, { label: "Revenue M6", value: "$18K–28K" }, { label: "Trainer advocates", value: "20" }, { label: "Breakeven target", value: "Month 5–7" }]
      },
      {
        phase: "PHASE 3", time: "Month 6–12", color: C.greenBright, title: "Expand",
        principle: "Approach modern trade with sell-through data, not with promises. Numbers close supermarket buyers — relationships open the door.",
        actions: ["Modern trade approach: Spinneys, TSC, Bou Khalil, Fahed", "Corporate B2B channel: hospitals, offices, hotels", "Second SKU evaluation based on demand signals (STRIPS)", "FMCG distributor engagement as volume warrants", "Quarterly key account reviews — top 10 accounts", "Brand health assessment — 50+ consumer survey"],
        targets: [{ label: "Active accounts", value: "80–130" }, { label: "Revenue M12", value: "$40K–65K" }, { label: "Channels", value: "Gym + Pharm + Supermarket" }, { label: "SKUs", value: "1–2" }]
      },
      {
        phase: "PHASE 4", time: "Month 12+", color: C.purple, title: "Scale",
        principle: "The Lebanese story is the GCC marketing asset. 'Made in Lebanon' is a premium signal in Riyadh and Dubai. We built this from day one.",
        actions: ["GCC export preparation: UAE first, then Saudi Arabia", "ESMA registration + GCC Halal certification", "STRIKE PACKS variety multipack for GCC hypermarket entry", "Za'atar flavor — the Lebanese-exclusive GCC differentiator", "Western market horizon: FDA registration, D2C digital"],
        targets: [{ label: "GCC markets entered", value: "UAE + KSA" }, { label: "SKUs", value: "3–4" }, { label: "Accounts Lebanon", value: "150–200+" }, { label: "Revenue target", value: "$80K–130K/mo" }]
      }
    ],
    notes: {
      open: "The go-to-market is relationship-first, channel-sequenced, and non-digital by design. The warm network across sports nutrition stores, gyms, and pharmacies compresses what would normally be a 3-month cold-outreach cycle into 2–3 weeks. Sports nutrition stores are Priority One — their customer is already in a protein-buying mindset on every visit.",
      emphasis: [
        "The STRIKE TEAM trainer program is the highest-leverage activation in the deck. It costs almost nothing and creates the most powerful sales force available: trainers who believe in the product and mention it in every session without being asked.",
        "Phase 4 GCC entry is not a future aspiration — it is built into the product from today. Halal certification, Arabic packaging, clean label, Za'atar flavor. We do not need to redesign anything to export.",
      ],
      timing: "5 minutes"
    }
  },
  {
    id: "financial",
    type: "tiers",
    section: "06 · FINANCIAL SCENARIOS",
    label: "FINANCE",
    title: "Three Budget Scenarios — Board Decision Required",
    tiers: [
      {
        tier: "TIER 1", name: "Lean Launch", total: "$18,500", color: C.greenBright,
        breakeven: "Month 7–9", margin: "42–48%", accounts_m6: "30–40 accounts", rev_m6: "$8K–14K/mo", rev_m12: "$18K–28K/mo",
        rev_m3: "Building", rev_m3_pct: 15, rev_m6_pct: 45, rev_m12_pct: 75,
        suitable: "Risk-averse or liquidity-constrained entrepreneur. Validates the concept before committing to full build. Single SKU, functional brand.",
        risk: "Packaging and identity at this tier are functional, not exceptional. Risk of appearing underfunded vs. imported premium competitors at pharmacy shelf level.",
        includes: ["SARL registration", "MoPH registration (1 SKU)", "Basic brand identity (wordmark only)", "First production batch — 60 days", "30 account outreach", "Contingency 15%"],
      },
      {
        tier: "TIER 2", name: "Standard Launch", total: "$42,000", color: C.gold,
        breakeven: "Month 5–7", margin: "48–55%", accounts_m6: "60–80 accounts", rev_m6: "$18K–28K/mo", rev_m12: "$40K–65K/mo",
        rev_m3: "Revenue building", rev_m3_pct: 20, rev_m6_pct: 55, rev_m12_pct: 100,
        recommended: true,
        suitable: "Recommended scenario. Serious commercial intent. Full brand identity, 2 SKUs, gym-to-pharmacy channel launch, working capital buffer for regulatory gap.",
        risk: "Mid-range spend requires scope discipline. Brand investment must be executed by professionals — cannot be cut after approval.",
        includes: ["SARL + all licensing", "MoPH (2 SKUs)", "Full brand identity system", "2 SKU Production — 90 days", "50+ account outreach", "KITS Phase 0–2 management fee", "Contingency 15%"],
      },
      {
        tier: "TIER 3", name: "Full Market Entry", total: "$82,000", color: C.amber,
        breakeven: "Month 4–6", margin: "52–60%", accounts_m6: "100–130 accounts", rev_m6: "$35K–55K/mo", rev_m12: "$80K–130K/mo",
        rev_m3: "Soft launch revenue", rev_m3_pct: 25, rev_m6_pct: 50, rev_m12_pct: 100,
        suitable: "Fully committed, capitalized entrepreneur. 3 SKUs, dedicated sales rep, modern trade entry, 6-month working capital runway, GCC pre-filing.",
        risk: "Higher commitment requires monthly P&L reviews and milestone-gated fund releases. Full KITS co-management mandate required at this tier.",
        includes: ["Full legal + GCC pre-filing", "MoPH (3 SKUs) + label compliance", "Agency-level brand identity system", "3 SKU production — 120 days", "Dedicated sales rep (6 months)", "KITS Phase 0–3 fee (12 months)", "6-month working capital runway"],
      },
    ],
    notes: {
      open: "Three scenarios. One decision. KITS recommends Tier 2 as the baseline — it funds a proper brand identity, two SKUs, a full gym-to-pharmacy launch, and a working capital buffer that absorbs the 3–4 month regulatory processing gap. Tier 1 is for validation only — the brand will look underfunded at pharmacy shelf level. Tier 3 is for a fully committed partner with a 2–3 year horizon.",
      emphasis: [
        "The working capital buffer is not optional at any tier. MoPH registration takes 2–4 months. During that time, costs run but revenue has not started. The buffer is what keeps the business alive between investment and first sale.",
        "All revenue projections assume USD-denominated pricing and no major Lebanese economic disruption. Review quarterly.",
        "Budget tier decision is needed today. It determines: production batch size, brand identity budget, KITS fee structure, and scope of first outreach wave. Nothing moves to detailed planning without this number.",
      },
      timing: "6 minutes"
    }
  },
  {
    id: "sec06", type: "section", label: "§06",
    section: "06 · RISK, BLOCKERS & MANDATE", color: C.red,
    title: "Risk, Blockers & Mandate",
    sub: "What we are watching. What must be decided today. What KITS commits to.",
    notes: { open: "Transition slide.", emphasis: [], timing: "15 seconds" }
  },
  {
    id: "risks",
    type: "risks",
    label: "RISK",
    section: "06 · RISK REGISTER",
    title: "Risk Register — Known Risks, Known Mitigations",
    risks: [
      { risk: "Nutritional claim unverifiable", level: "CRITICAL", levelColor: C.red, detail: "The '[X]g protein' claim cannot go on packaging without lab verification. A false claim in the fitness category is brand-ending — this segment checks.", mitigation: "Lab testing commissioned immediately upon mandate signing. No packaging artwork finalized until results confirmed." },
      { risk: "MoPH registration delay beyond 4 months", level: "HIGH", levelColor: C.red, detail: "MoPH processing can run 2–6 months depending on submission quality and workload. Delays push first sale timeline.", mitigation: "Begin MoPH process in Week 2 with a complete, error-free submission. Engage a regulatory consultant familiar with MoPH requirements." },
      { risk: "Trademark conflict — STRIKE", level: "MEDIUM", levelColor: C.amber, detail: "STRIKE is a common English word. Prior filings exist in beverages (Class 32) — abandoned. Lebanese Class 29 appears clear but requires formal search.", mitigation: "IP lawyer engaged this week for formal search across Classes 29 and 35. File immediately upon clearance." },
      { risk: "Lebanese economic disruption", level: "MEDIUM", levelColor: C.amber, detail: "Political or economic events can disrupt supply chains, consumer spending, and USD availability. Lebanon's macro environment remains volatile.", mitigation: "USD-denominated pricing, hybrid local/import supply model, 90-day pricing review cycle. Lean inventory model insulates against excess stock risk." },
      { risk: "Imitation by local competitor", level: "MEDIUM", levelColor: C.amber, detail: "Successful products in Lebanon are imitated within 12 months. A visible, profitable jerky brand will attract local copycats.", mitigation: "Trademark registration (immediate), flavor IP in supply agreement, brand equity through trainer relationships (cannot be copied in months)." },
      { risk: "Manufacturer quality incident", level: "MEDIUM", levelColor: C.amber, detail: "One microbiological or quality failure in the Lebanese health market is reputationally irreversible. Community is small and connected.", mitigation: "Full QC protocol in manufacturer brief (KAG-JRK-007). KITS organoleptic review of every batch before delivery. Batch documentation mandatory." },
      { risk: "Cedar tree over-use in identity", level: "LOW", levelColor: C.gold, detail: "The cedar tree is dramatically over-used in Lebanese brand identity. Literal use would make STRIKE look like every other Lebanese brand.", mitigation: "Geometric abstraction only — 5 vector lines, 15% opacity, background element. Specified explicitly in brand brief (KAG-JRK-006)." },
      { risk: "Over-ranging at launch", level: "LOW", levelColor: C.gold, detail: "Launching multiple SKUs simultaneously dilutes focus, strains cash flow, and complicates inventory. A common FMCG startup error.", mitigation: "One SKU at launch — STRIKE BITES, Smoking BBQ, single-serve. Second SKU only on demonstrated sell-through signal, not on enthusiasm." },
    ],
    notes: {
      open: "Every item on this register has a known mitigation. These are not existential risks — they are manageable operational challenges. The critical and high items (nutritional claim, MoPH timeline) are already on the blocker list. The medium items are managed by structure: trademark, supply agreement, QC protocol.",
      emphasis: ["The nutritional claim risk is the only one that can create immediate legal exposure. It must be resolved before any packaging decisions are finalized."],
      timing: "4 minutes"
    }
  },
  {
    id: "blockers",
    type: "blockers",
    label: "BLOCKERS",
    section: "07 · CRITICAL BLOCKERS",
    title: "What Must Be Resolved Today",
    subtitle: "Known blockers. Known solutions. Known owners. The question is: by when?",
    blockers: [
      { urgency: "RESOLVE TODAY", color: C.red, item: "Budget tier selection — Tier 1, 2, or 3", owner: "Board / Funder", impact: "Determines: production batch size, brand identity scope, KITS fee structure, scale of first outreach wave. Everything downstream waits on this number.", action: "Board votes. KITS recommends Tier 2 as baseline. Tier 1 is minimum viable. Tier 3 requires full co-management mandate." },
      { urgency: "RESOLVE TODAY", color: C.red, item: "KITS Management Mandate — formal signing", owner: "Entrepreneur + KITS", impact: "KITS cannot make introductions, sign on behalf of the venture, or commit resources without a signed mandate. All work to date has been pre-mandate.", action: "Sign today if document has been reviewed. 48-hour legal review maximum if not yet reviewed. Draft available now." },
      { urgency: "RESOLVE TODAY", color: C.red, item: "Brand name — STRIKE confirmed by board", owner: "Board", impact: "Blocks: trademark filing, designer briefing, domain reservation, social handle reservation. IP lawyer cannot file without confirmed name.", action: "Board confirms STRIKE. IP lawyer engaged today for Lebanese Class 29 + 35 filing." },
      { urgency: "THIS WEEK", color: C.amber, item: "Nutritional panel from manufacturer", owner: "Entrepreneur → Manufacturer", impact: "Blocks: MoPH registration, lab testing, packaging artwork, all pricing, all revenue projections. Every [X] value in this deck is a placeholder.", action: "Entrepreneur calls manufacturer today. Full technical data sheet required within 5 business days." },
      { urgency: "THIS WEEK", color: C.amber, item: "Primary flavor name — SMOKING BBQ BITES confirmed", owner: "Board + Manufacturer", impact: "Blocks: flavor development brief to manufacturer, packaging copy, MoPH submission. Codename 'Lebanese BBQ' is in use — commercial name pending.", action: "Board approves 'SMOKING BBQ BITES.' Lebanese BBQ flavor specification brief sent to manufacturer this week." },
      { urgency: "WEEK 2–3", color: C.gold, item: "Manufacturer supply agreement — signed", owner: "Entrepreneur + Manufacturer", impact: "Blocks: MOQ confirmation, lead time planning, production scheduling, cost-per-unit certainty, final pricing model.", action: "KITS provides supply agreement template. Legal review. Target signing within 14 days of today." },
    ],
    notes: {
      open: "This is the most important section of the entire presentation. Three of these six blockers can be resolved in this room, today. The budget decision, the mandate signing, and the brand name confirmation all require only the people present right now. There is no external input needed. The question is whether we leave this meeting with those three resolved.",
      emphasis: [
        "The budget decision, mandate signing, and brand name can all happen today. Right now. In this room.",
        "The nutritional panel is the single item with the longest downstream impact. Everything else — MoPH, lab testing, packaging, pricing — is blocked until it exists. Treat this as the #1 action item leaving this room.",
        "First-mover advantage has a shelf life. Every week of delay on these six blockers is a week of delay on the first sale. The category is empty today. It will not stay empty indefinitely.",
      },
      timing: "8 minutes — allow full discussion"
    }
  },
  {
    id: "mandate",
    type: "mandate",
    label: "MANDATE",
    section: "08 · KITS MANDATE",
    title: "KITS Role, Scope & Governance",
    scope: [
      { area: "Commercial Operations", items: ["Channel outreach and account management — all visits", "Trade presentation, sampling, and sales visits", "Account tracker maintenance and weekly reporting", "Reorder management and personal delivery coordination"] },
      { area: "Regulatory & Legal", items: ["MoPH registration process management end-to-end", "Halal certification coordination — Dar Al-Fatwa", "Trademark filing supervision — IP lawyer management", "SARL registration process guidance"] },
      { area: "Brand & Product", items: ["Designer briefing, creative direction, and approval", "Manufacturer technical brief management", "Packaging compliance sign-off before print", "Flavor development oversight — tasting sessions"] },
      { area: "Financial Reporting", items: ["Monthly P&L against approved budget tier", "Sell-through reporting by account, weekly", "Cash flow monitoring and early warning alerts", "Budget variance reporting and reforecast"] },
    ],
    governance: [
      "Weekly: KITS → Entrepreneur check-in (sell-through, blockers, decisions needed)",
      "Monthly: Board update — financial performance, account growth, competitive activity",
      "Quarterly: Pricing review — USD-anchored 90-day cycle with 30-day notice to trade",
      "Milestone-gated: Budget released by phase, not upfront — protects all parties",
    ],
    fees: {
      note: "Fee structure is tier-dependent and milestone-linked. All IP ownership transfers to client on final payment.",
      tiers: [
        { tier: "Tier 1 — Lean Launch", range: "Included in contingency allocation" },
        { tier: "Tier 2 — Standard Launch", range: "$3,000–$5,000 (Phase 0–2 · 6 months)" },
        { tier: "Tier 3 — Full Market Entry", range: "$8,000–$14,000 (Phase 0–3 · 12 months)" },
      ]
    },
    notes: {
      open: "KITS is not an advisor sitting on the side. KITS is the commercial operator. Every account visit, every regulatory filing, every designer brief, every manufacturer check — KITS owns the execution. The entrepreneur owns the decisions. The board owns the capital. The governance structure separates these roles clearly so there is no ambiguity at any decision point.",
      emphasis: [
        "Milestone-gated fund release is non-negotiable at any tier. It protects the funder, creates accountability for KITS, and ensures spend is tied to output.",
        "All IP created by KITS — brand briefs, outreach systems, manufacturer specs, competitive research — transfers to the client upon final payment. This is contractually specified in the mandate.",
      ],
      timing: "4 minutes"
    }
  },
  {
    id: "timeline",
    type: "timeline",
    label: "TIMELINE",
    section: "09 · NEXT STEPS",
    title: "From Today to First Sale — 14 to 18 Weeks",
    milestones: [
      { week: "TODAY", label: "Board Decisions", items: ["Budget tier confirmed", "Mandate signed", "STRIKE name confirmed", "Flavor name approved"], color: C.red },
      { week: "WEEK 1", label: "Immediate Actions", items: ["Manufacturer: nutritional panel", "Notary: SARL registration", "IP lawyer: trademark filing", "Domain + handles reserved"], color: C.amber },
      { week: "WEEK 2–3", label: "Foundation", items: ["Supply agreement signed", "Lab testing commissioned", "MoPH process initiated", "Halal application filed"], color: C.gold },
      { week: "WEEK 4–6", label: "Brand in Motion", items: ["Designer briefed — identity begins", "BBQ flavor brief to manufacturer", "Warm visits: nutrition stores", "Trade kit development begins"], color: C.gold },
      { week: "MONTH 3–4", label: "Pre-Launch", items: ["Brand identity finalized", "Packaging MoPH compliance check", "First production batch ordered", "Account visits: samples + kit"], color: C.greenBright },
      { week: "MONTH 4–6", label: "FIRST SALES", items: ["Formal launch: 20–30 accounts", "STRIKE TEAM: 20 trainers activated", "Sale-or-return terms in place", "Weekly sell-through reporting"], color: C.greenBright },
    ],
    notes: {
      open: "From board decision to first sale: 14 to 18 weeks if the blockers are resolved today. The warm activation calls to sports nutrition stores can begin this week — before product, before final packaging, before branding. You are building relationships, not making sales. In Lebanon, the relationship is the sale.",
      emphasis: [
        "14 to 18 weeks is realistic only if the budget, mandate, and brand name are confirmed today.",
        "The MoPH registration is the longest lead-time item on the critical path. It runs in parallel with everything else and cannot be compressed. Starting today versus starting next week is literally a week's difference in first sale date.",
      ],
      timing: "3 minutes"
    }
  },
  {
    id: "closing",
    type: "closing",
    label: "CLOSE",
    title: "The Opportunity Is Real. The Category Is Empty. The Team Is Ready.",
    section: null,
    decisions: [
      "Budget tier selection — Tier 1, 2, or 3?",
      "KITS Management Mandate — sign in this meeting",
      "Brand name — STRIKE confirmed",
      "Primary flavor name — SMOKING BBQ BITES",
      "Manufacturer nutritional panel — who calls, by when?",
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
      timing: "4 minutes + Q&A"
    }
  },
];

// ─── MAIN APP COMPONENT ────────────────────────────────────────────────────────
export default function BoardPresentation() {
  const [current, setCurrent] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const total = SLIDES.length;
  const slide = SLIDES[current];

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent(c => Math.min(total - 1, c + 1)), [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
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
      case "agenda": return <AgendaSlide slide={slide} />;
      case "stats": return <StatsSlide slide={slide} />;
      case "two-col": return <TwoColSlide slide={slide} />;
      case "product": return <ProductSlide slide={slide} />;
      case "brandvisual": return <BrandVisualSlide slide={slide} />;
      case "brandscore": return <BrandScoreSlide slide={slide} />;
      case "powerpoints": return <PowerPointsSlide slide={slide} />;
      case "matrix": return <MatrixSlide slide={slide} />;
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
        <div style={{ background: C.obsidian, borderBottom: `1px solid ${C.ash}`, padding: "12px 24px", display: "flex", gap: 6, flexWrap: "wrap", flexShrink: 0, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          {SLIDES.map((s, i) => (
            <button key={i} onClick={() => { setCurrent(i); setShowNav(false); }} style={{ background: current === i ? `${C.gold}18` : "transparent", border: `1px solid ${current === i ? C.gold : C.ash}`, borderRadius: 3, padding: "6px 12px", cursor: "pointer", transition: "all 0.15s", WebkitTapHighlightColor: "transparent", touchAction: "manipulation", flexShrink: 0 }}>
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
            <button onClick={prev} disabled={current === 0} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", background: `${C.obsidian}CC`, border: `1px solid ${C.ash}`, borderRadius: "50%", width: 44, height: 44, cursor: current === 0 ? "default" : "pointer", color: current === 0 ? C.ash : C.cream, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", opacity: current === 0 ? 0.3 : 0.7, transition: "opacity 0.2s", WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}>‹</button>
            <button onClick={next} disabled={current === total - 1} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: `${C.obsidian}CC`, border: `1px solid ${C.ash}`, borderRadius: "50%", width: 44, height: 44, cursor: current === total - 1 ? "default" : "pointer", color: current === total - 1 ? C.ash : C.cream, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", opacity: current === total - 1 ? 0.3 : 0.7, transition: "opacity 0.2s", WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}>›</button>
          </div>

          {/* Presenter notes */}
          {showNotes && slide.notes && (
            <div style={{ background: "#0A0808", borderTop: `2px solid ${C.gold}40`, padding: "16px 24px", maxHeight: "40vh", overflowY: "auto", flexShrink: 0, WebkitOverflowScrolling: "touch" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexDirection: "row" }}>
                <div style={{ fontFamily: "monospace", fontSize: 9, color: C.gold, letterSpacing: "0.25em" }}>PRESENTER NOTES · {slide.label}</div>
                <div style={{ fontFamily: "monospace", fontSize: 9, color: C.creamDim }}>TIMING: {slide.notes.timing}</div>
              </div>
              <p style={{ margin: "0 0 14px", fontSize: 13, color: C.cream, lineHeight: 1.8, borderLeft: `3px solid ${C.gold}40`, paddingLeft: 14 }}>{slide.notes.open}</p>
              {slide.notes.emphasis && slide.notes.emphasis.length > 0 && (
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: C.amber, letterSpacing: "0.2em", marginBottom: 10 }}>EMPHASIS POINTS</div>
                  {slide.notes.emphasis.map((e: any, i: number) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, padding: "10px 14px", background: `${C.amber}08`, border: `1px solid ${C.amber}18`, borderLeft: `3px solid ${C.amber}50`, borderRadius: 3 }}>
                      <span style={{ color: C.amber, fontSize: 10, flexShrink: 0, marginTop: 1 }}>★</span>
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
      <div style={{ background: C.void, borderTop: `1px solid ${C.ash}`, padding: "8px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0, flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", gap: 20 }}>
          <button onClick={prev} disabled={current === 0} style={{ background: "transparent", border: "none", cursor: current === 0 ? "default" : "pointer", fontFamily: "monospace", fontSize: 9, color: current === 0 ? C.ash : C.creamDim, letterSpacing: "0.1em" }}>← PREV</button>
          <button onClick={next} disabled={current === total - 1} style={{ background: "transparent", border: "none", cursor: current === total - 1 ? "default" : "pointer", fontFamily: "monospace", fontSize: 9, color: current === total - 1 ? C.ash : C.creamDim, letterSpacing: "0.1em" }}>NEXT →</button>
        </div>
        <div style={{ display: "flex", gap: 6, flex: 1, justifyContent: "center", minWidth: 0, overflowX: "auto" }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 24 : 8, height: 4, borderRadius: 3, background: i === current ? C.gold : C.ash, border: "none", cursor: "pointer", padding: 0, transition: "all 0.25s ease", flexShrink: 0, WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }} />
          ))}
        </div>
        <div style={{ fontFamily: "monospace", fontSize: 7, color: C.creamDim, opacity: 0.35, letterSpacing: "0.15em", whiteSpace: "nowrap" }}>
          N = NOTES · ← → = NAVIGATE · SLIDES = OVERVIEW
        </div>
      </div>
    </div>
  );
}
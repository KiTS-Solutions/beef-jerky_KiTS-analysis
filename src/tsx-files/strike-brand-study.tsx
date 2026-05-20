import { useState, useEffect, useRef } from "react";

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  obsidian: "#0A0908",
  void: "#050404",
  charcoal: "#141210",
  ash: "#1E1B18",
  ember: "#2A2520",
  gold: "#C8A050",
  goldDim: "#8A6A30",
  goldBright: "#E0B860",
  cream: "#EDE0CC",
  creamDim: "#8A7A6A",
  red: "#C04030",
  green: "#3A6040",
  greenBright: "#5A9060",
  purple: "#7060A0",
  strike: "#E8D0A0",
};

// ─── VERDICT DATA ─────────────────────────────────────────────────────────────
const VERDICT = {
  name: {
    score: 92,
    label: "STRIKE",
    verdict: "APPROVED — STRONG",
    color: C.greenBright,
    analysis: "STRIKE is a genuinely exceptional brand name for this product and market. Single syllable. Universal phonetics — identical pronunciation in Arabic, English, and French. Kinetic energy: the word is a verb and a noun simultaneously, which creates natural brand language ('Strike your goals', 'Make your strike', 'Strike bites'). Zero descriptive content — fully trademarkable. No negative connotations across the three target languages. The trademark risk from prior filings (I-STRIKE, POWER STRIKE) is low — both were in beverages, both are abandoned, and both are in different jurisdictions. Lebanese Class 29 filing should face minimal resistance. GCC filing is clean.",
    risks: [
      "Conduct full trademark search across Lebanon (Class 29 + 35) and GCC ESMA before brand launch",
      "In bowling, 'strike' means knocking everything down — an asset, not a liability",
      "In labor contexts, 'strike' means work stoppage — irrelevant to your demographic",
      "In lightning/military contexts, 'strike' means a decisive hit — directly on-brand",
    ],
    improvements: [
      "Reserve domain: strike.com (likely taken), strikebites.com, strikeprotein.com",
      "Reserve social handles: @strikebites across all platforms immediately",
      "Arabic transliteration: سترايك — natural, clean, no awkward phonetic translation",
    ]
  },
  subBrand: {
    score: 88,
    label: "STRIKE BITES",
    verdict: "APPROVED — EXCELLENT ARCHITECTURE",
    color: C.greenBright,
    analysis: "STRIKE BITES is a masterclass in sub-brand architecture. 'Bites' is a universally understood format descriptor — poppable, portion-controlled, impulse-friendly. It creates an immediate mental image without requiring consumer education. The alliterative sound pattern (STR — B) is rhythmically satisfying and highly memorable. BITES also solves the poppable snack positioning problem: it signals a different consumption occasion than traditional flat-cut jerky, which distinguishes you from Jack Link's and Wild West format without requiring explanation.",
    risks: [
      "The word 'BITES' is not trademarkable alone — 'STRIKE BITES' as a composite mark is",
      "Ensure sub-brand architecture is consistent: STRIKE is the brand, BITES is always the product line name",
    ],
    improvements: [
      "Consider: STRIKE BITES / STRIKE STRIPS / STRIKE STICKS — strong alliterative system",
      "Each format should feel like the same brand family, differentiated only by shape and channel",
    ]
  },
  tagline: {
    score: 78,
    label: "REAL PRIMAL MUSCLE FUEL",
    verdict: "APPROVED WITH REFINEMENTS",
    color: C.gold,
    analysis: "Strong directional instinct. The word PRIMAL is doing significant heavy lifting and it is the right word — it signals ancestral clean eating, pre-industrial nutrition, and raw authenticity. However, 'MUSCLE FUEL' risks sounding like a supplement category (protein powder, pre-workout) rather than a food brand. For a product that is trying to transcend the supplement shelf and own the premium food identity, 'FUEL' carries functional-supplement connotations that undermine the premium food positioning. The tagline needs to be faster, more poetic, and less category-specific.",
    risks: [
      "'MUSCLE FUEL' positions near supplement brands — risks confusion with protein powder category",
      "'REAL PRIMAL' is three words before a verb — slow for a front-of-pack read",
      "At 4 words, tagline is at maximum pack length for readability at shelf",
    ],
    improvements: [
      "OPTION A: PRIMAL PROTEIN. NOTHING ELSE. — Direct. Clean. Absolute.",
      "OPTION B: FUEL THE PRIMAL. — Verb-first. Active. Ambiguous enough to travel.",
      "OPTION C: STRIKE PRIMAL. — Two words. Brand + positioning in one hit.",
      "OPTION D: BORN PRIMAL. — Origin story in two words. Lebanese manufacturing advantage.",
      "RECOMMENDED: 'FUEL THE PRIMAL.' on front pack. 'REAL MEAT. REAL PROTEIN. NOTHING ELSE.' as back manifesto.",
    ]
  },
  manifesto: {
    score: 85,
    label: "STRIKE THE GAINS THE PRIMAL WAY",
    verdict: "STRONG — MINOR REFINEMENTS",
    color: C.greenBright,
    analysis: "This is excellent brand voice work. 'STRIKE THE GAINS' activates the brand name as a verb — exactly what strong brand language should do. The phrase creates ownership: no one else can 'strike the gains' because only STRIKE the brand can. 'THE PRIMAL WAY' grounds it in the positioning without overcomplicating. The issue is one word: 'GAINS'. While gym-native, gains is heavily associated with bodybuilding subculture and can feel exclusionary to the broader fitness-conscious consumer and health-oriented professional segment. The manifesto should feel elite without feeling exclusive.",
    risks: [
      "'GAINS' is gym-specific slang — may alienate secondary segment (health professionals, casual fitness)",
      "Consider whether the back manifesto should be more narrative and less slogan",
    ],
    improvements: [
      "OPTION A (keep it): 'STRIKE THE GAINS. THE PRIMAL WAY.' — Works perfectly for gym channel",
      "OPTION B (expand it): 'THIS IS NOT A SNACK. THIS IS FUEL. REAL MEAT, REAL PROTEIN, NOTHING ELSE. STRIKE THE PRIMAL WAY.' — Full manifesto for back panel",
      "RECOMMENDED: Use 'STRIKE THE GAINS. THE PRIMAL WAY.' for gym-facing materials. Use expanded manifesto on packaging back panel.",
    ]
  }
};

// ─── BRAND ENHANCEMENTS ────────────────────────────────────────────────────────
const ENHANCEMENTS = [
  {
    id: "identity",
    title: "Visual Identity System",
    subtitle: "What we keep. What we evolve. What we add.",
    color: C.gold,
    items: [
      {
        category: "KEEP — NON-NEGOTIABLE",
        color: C.greenBright,
        points: [
          { title: "Dark obsidian base", body: "The near-black warm charcoal is correct. It telegraphs premium, performance, and seriousness. Matte finish is mandatory — gloss reads cheap at shelf level in 2025–2026. This is confirmed by every premium jerky rebrand in the last 18 months (Archer's 2025 rebrand moved to matte-dominant)." },
          { title: "Gold as the primary accent", body: "Performance gold — muted, earthy, amber-toned. Not chrome, not yellow, not metallic foil. The color of dried spice, aged brass, Levantine terrain. This is the right call and it differentiates from every imported competitor who uses red, white, or electric blue." },
          { title: "Protein number as hero", body: "The protein callout is the largest element after the brand name. This is the correct hierarchy. Research confirms that fitness consumers make purchase decisions in 2 seconds based on protein content visibility. This must never move." },
          { title: "Trilingual Arabic / English / French", body: "This is a structural market advantage, not a design choice. MoPH requires Arabic. French is Lebanon's commercial second language. The triple-language system is also the GCC export preparation — Saudi SFDA and UAE ESMA both require Arabic labeling." },
        ]
      },
      {
        category: "EVOLVE — ENHANCE THESE",
        color: C.gold,
        points: [
          { title: "Cedar tree micro-icon", body: "The instinct is correct — a Lebanese provenance signal differentiates from every imported brand. However, the cedar tree is dramatically over-used in Lebanese brand identity (Cedars of God, Middle East Airlines, dozens of local brands). The approach must be geometric abstraction, not literal illustration. Reduce it to 3–5 vector lines suggesting the cedar silhouette. Rotate 45° for dynamism. Invert the color to gold-on-dark for distinction. Place as a background texture repeat or watermark — never as a primary mark." },
          { title: "Arabic typography system", body: "The brief specifies 'bold, athletic Western font paired with modern geometric Arabic counterpart' — this is directionally correct but needs precision. The Arabic script should be a custom letterform specifically drawn for STRIKE, not an off-the-shelf pairing. The wordmark سترايك should share the weight and structure of the Latin wordmark. Avoid Nazanin, Amiri, or any calligraphic Arabic — the brand voice is geometric precision, not tradition." },
          { title: "The STRIKE wordmark itself", body: "The wordmark must be custom — not a typeface applied verbatim. Recommendation: uppercase, extremely tight letter-spacing (kerning so tight letters nearly touch), slightly condensed proportions, sharp terminals (not rounded). The 'K' terminal is the design moment — consider a triangular cut that echoes the lightning-strike or blade imagery without illustrating it. The result should read as powerful at 8mm (pack label) and at 800mm (gym banner)." },
          { title: "Volcanic rock / charcoal texture", body: "This is an excellent instinct and directly supported by 2025 packaging research. Apply as a subtle background texture on the dark base — not a photograph of rock, but a noise-grain texture at 3–5% opacity that creates tactile depth. On print, this translates to a matte laminate with UV spot varnish on the brand name — the contrast between matte texture and high-gloss wordmark creates shelf presence without any additional color." },
        ]
      },
      {
        category: "ADD — MISSING FROM ORIGINAL BRIEF",
        color: C.purple,
        points: [
          { title: "Transparent window on SKU 02", body: "Research from 2025 packaging trend data confirms transparent windows are the single highest-performing packaging feature for consumer trust in the food category. For a product leading on ingredient transparency and clean label, showing the actual bites through a die-cut window on the multi-serve pouch is a compelling trust signal. 'See what you're getting' is worth more than 10 lines of copy for a skeptical consumer reading an unfamiliar brand." },
          { title: "Spot UV varnish on STRIKE wordmark", body: "The matte-versus-gloss contrast created by UV spot varnish on the brand name against a matte substrate is the single most effective shelf-presence trick in premium food packaging. Cost addition: $0.02–0.05 per unit. Shelf impact: significant. This technique is used by premium brands across the GCC market specifically because it photographs extremely well — critical for a brand that will eventually appear in social media content." },
          { title: "Strike mark / icon system", body: "The brand currently has a wordmark but no standalone icon. As the brand scales to GCC markets, a standalone icon that works as: (1) a Halal badge background, (2) a social media avatar, (3) an embossed seal on premium packaging, (4) a co-brand mark for trainer partnerships — this is a commercial necessity. Recommendation: a geometric lightning-bolt derived from the 'I' in STRIKE or an abstract angular mark derived from the cedar geometry. Not a literal bolt — an ownable proprietary form." },
          { title: "Color coding by flavor line", body: "As the product line expands (SMOKING BBQ, future flavors), introduce a secondary accent color per flavor while keeping the gold as the brand constant. The system: Gold = brand / SKU structure / nutritional callouts. Flavor accent = one warm tone per flavor, used on the flavor name zone only. Example: Smoking BBQ = deep ember red accent. Future chili flavor = cayenne orange accent. Future za'atar flavor = olive green accent. This creates shelf blocking when multiple SKUs are stocked and signals variety without fragmenting the brand system." },
        ]
      }
    ]
  },
  {
    id: "productline",
    title: "Product Line Architecture",
    subtitle: "Format system, flavor strategy, and scalability roadmap",
    color: C.gold,
    items: [
      {
        category: "FORMAT ARCHITECTURE — APPROVED WITH ADDITIONS",
        color: C.greenBright,
        points: [
          { title: "STRIKE BITES (Launch SKU)", body: "Poppable, cubed or rough-cut pieces. Gym counter, sports nutrition store, impulse purchase. Single-serve pouch. This is the correct launch format — portioned, poppable, and distinctive from flat-cut jerky competitors. The 'bites' format also photographs better for social content because it shows multiple pieces, not a single strip." },
          { title: "STRIKE STRIPS (SKU 2 — Phase 2)", body: "Traditional flat-cut jerky strips. Multi-serve resealable pouch. Pharmacy shelf, supermarket shelf, online. This is the category-conventional format that gives you credibility with buyers who want a 'standard' jerky alongside the innovative bites format. Do not launch simultaneously — introduce at Month 4–6 once BITES has established distribution." },
          { title: "STRIKE STICKS (SKU 3 — Phase 3)", body: "Jerky stick / snack stick format. Individual units sold in display boxes at gym counters. The stick format opens a different purchase occasion — one unit as an impulse add-on to a gym session, not a pre-planned protein snack. This format is experiencing 187% growth in the US market and is the fastest-growing jerky format globally. Price per stick: $1.00–$1.50. This format is the route to convenience store and petrol station channel." },
          { title: "STRIKE PACKS (Phase 4 — GCC launch)", body: "Variety multipack: 3–5 BITES single-serves in a display box. Designed specifically for GCC retail (hypermarket impulse, duty-free, hotel minibar). Premium gifting format. This format is how Lebanese food brands enter GCC retail — a gift-ready variety format is a buyer's preferred entry SKU because it tests multiple flavors with one listing." },
        ]
      },
      {
        category: "FLAVOR STRATEGY — ENHANCEMENTS",
        color: C.gold,
        points: [
          { title: "SMOKING BBQ BITES — Launch Flavor", body: "Confirmed. 'Smoking BBQ' is the right nomenclature — the present participle 'SMOKING' creates action and heat connotation. Refine the flavor brief: Lebanese cedar smoke note (not American hickory), Aleppo pepper heat, pomegranate brightness, sumac finish, zero sugar. This profile is genuinely original and cannot be replicated by any imported brand without losing their standard formula. Name on pack: SMOKING BBQ in English, مدخّن BBQ in Arabic, BBQ FUMÉ in French." },
          { title: "FIRE & LIME BITES — Second Flavor (Phase 2)", body: "The citrus-chili profile is the second-most-consumed flavor in the global jerky market after BBQ. For the Lebanese market, lime is in daily culinary use — it requires no consumer education. The 'FIRE' prefix activates brand language (STRIKE → FIRE). On pack: FIRE & LIME. In Arabic: نار وليمون. Heat level: medium-high. Differentiator: actual lime zest in the marinade, not citric acid." },
          { title: "ZA'ATAR BITES — Third Flavor (Phase 3)", body: "This is the genuinely Lebanese flavor that no international brand can match. Za'atar is Lebanon's most culturally distinctive spice blend. A za'atar beef jerky is a product that exists nowhere else on earth — it creates a story that media, buyers, and consumers all respond to. This is the GCC export flavor: Lebanese cuisine is the most respected culinary tradition in the Arab world, and a za'atar protein snack from Lebanon carries cultural weight in Riyadh and Dubai that no amount of marketing can manufacture. Launch for GCC entry." },
          { title: "HEAT MAP SYSTEM", body: "Introduce a visible heat indicator on every pack — a 1–5 flame scale in gold. Smoking BBQ: 🔥🔥 (2/5). Fire & Lime: 🔥🔥🔥🔥 (4/5). Za'atar: 🔥 (1/5 — aromatic, not spicy). This system: (a) assists consumers in self-selecting, (b) creates a visible design element that differentiates flavor SKUs at shelf, (c) is internationally understood with zero translation required — a critical advantage for a brand designed to scale." },
        ]
      }
    ]
  },
  {
    id: "market",
    title: "Market Strategy & Scaling",
    subtitle: "Lebanon first. GCC-ready from day one. West on the horizon.",
    color: C.gold,
    items: [
      {
        category: "LEBANON — FOUNDATION MARKET",
        color: C.greenBright,
        points: [
          { title: "Channel sequence confirmed", body: "Sports nutrition stores (Priority 1) → Gyms (Priority 2) → Pharmacies (Month 3–6) → Modern trade (Month 6–12). This sequence is commercially correct and aligns with the relationship advantage KITS brings. The one addition: at Month 2, approach the top 3 CrossFit boxes in Lebanon for an exclusive 'founding gym' partnership. CrossFit communities are evangelical — a box that 'discovered' STRIKE first will promote it to every member without being asked." },
          { title: "Trainer ambassador program", body: "STRIKE should position its trainer program as 'THE STRIKE TEAM' — not a generic ambassador program. Founding members (first 20 trainers across Lebanon) receive: personal supply of STRIKE BITES, branded gym bag tag or sticker pack, and a founding member certificate. The program is by invitation only — this creates social currency and makes being 'on the STRIKE team' feel earned. Cost: negligible. Impact: authentic word-of-mouth at the most influential point in the sales chain." },
          { title: "Pricing anchor", body: "Target retail: $2.50–$3.50 single-serve (BITES). $8.00–$12.00 multi-serve (STRIPS). $1.00–$1.50 per stick (STICKS). These prices position STRIKE as accessible-premium — below imported competitors (Jack Link's $4.50–$6.50) while above commodity snack pricing. The accessibility is the competitive weapon. At $3.00, a gym member can buy STRIKE BITES every gym session without budgetary hesitation. At $5.00, it becomes an occasional purchase." },
        ]
      },
      {
        category: "GCC — STRATEGIC PRIORITY",
        color: C.gold,
        points: [
          { title: "Why GCC is the right second market", body: "GCC snacks market was $8.49B in 2024, projected to reach $12.87B by 2030 at 7.18% CAGR. GCC functional food and beverage was $18.20B in 2025, growing at 10.9% CAGR. Halal certification is mandatory for GCC market entry — STRIKE has this from day one. Lebanese food origin is a premium signal in Saudi Arabia and UAE — Lebanese cuisine is the most respected in the Arab world. No local GCC beef jerky brand with this positioning exists." },
          { title: "GCC entry format", body: "Lead with STRIKE PACKS (variety multipack) and the Za'atar flavor — the one flavor no other brand can own. Target: UAE hypermarkets (Carrefour, Lulu Hypermarket, Spinneys UAE), Saudi Arabia nutrition stores (GNC Saudi, supplement shops in Riyadh and Jeddah), and Kuwait premium retail. Partner with a UAE food distributor with existing sports nutrition relationships. GCC ESMA registration required — begin in parallel with Lebanese MoPH registration, not sequentially." },
          { title: "The Lebanese story is the GCC marketing asset", body: "In GCC markets, 'Made in Lebanon' for food carries the same premium signal that 'Made in France' carries for cosmetics. Do not hide the origin. Build it into the brand identity: the cedar micro-icon, the Arabic-first packaging design, the za'atar flavor. These are not Lebanese-market accommodations — they are GCC market advantages. The 57% of GCC consumers who are 'financially secure' are exactly the demographic willing to pay a premium for premium Lebanese food provenance." },
        ]
      },
      {
        category: "WESTERN MARKETS — HORIZON PLANNING",
        color: C.purple,
        points: [
          { title: "The case for Western market scalability", body: "STRIKE is genuinely positioned for Western market entry in a way that most Lebanese food brands are not. The brand name is English-first. The nutrition credentials (high protein, zero sugar, clean label) match exactly what US and European health-food consumers are actively seeking. The Lebanese/Levantine flavor profile is experiencing a global culinary moment — za'atar, sumac, Aleppo pepper are all appearing on high-end US restaurant menus and in Whole Foods products. STRIKE owns all of these ingredients in its core formula." },
          { title: "Western market readiness checklist", body: "Before Western market entry: (1) US FDA food facility registration — required for any import to the US. (2) Nutrition facts panel in FDA format — different from MoPH format, requires reformatting. (3) Allergen declarations per US standards — more prescriptive than Lebanese requirements. (4) Kosher certification optional but significantly expands Jewish-American market. (5) Non-GMO verification — valuable for Whole Foods and natural food channel entry. Build these into the product specification now, even if the Western market is 3–5 years out." },
          { title: "D2C digital opportunity", body: "While KITS strategy is correctly non-digital for Lebanon and GCC physical retail, the Western market entry requires a D2C digital strategy. A direct-to-consumer website for the US market, selling STRIKE PACKS as a premium 'taste of Lebanon' proposition, has zero retail establishment cost. The Lebanese diaspora in the US (approximately 500,000 people) is the beachhead consumer — deeply nostalgic for Lebanese food, willing to pay premium prices online, and highly vocal on social media." },
        ]
      }
    ]
  },
  {
    id: "risks",
    title: "Risk Assessment & Red Flags",
    subtitle: "What could go wrong. How we prevent it.",
    color: C.red,
    items: [
      {
        category: "BRAND RISKS — MANAGEABLE",
        color: C.gold,
        points: [
          { title: "Trademark conflict risk: MEDIUM", body: "STRIKE is a common English word with existing trademark filings across multiple categories globally. The key protection is filing in Class 29 (processed meat and food products) — most prior filings are in beverages (Class 32) or other categories. In Lebanon, where English-word trademarks in food are rare, the risk is low. In GCC, ESMA filing should be prioritized immediately after Lebanese registration. In the US (future), conduct a full USPTO search before any market entry." },
          { title: "'Primal' positioning — category crowding risk: LOW", body: "In the US market, 'primal' is used by several brands (The New Primal, Primal Kitchen). In Lebanon and GCC, the concept is entirely unclaimed. For the Lebanese launch, this is zero risk. For future Western expansion, STRIKE's Lebanese provenance differentiates it sufficiently — 'The Lebanese Primal Brand' is an empty position globally." },
          { title: "Cedar tree over-use risk: MEDIUM", body: "The cedar tree is the most over-used symbol in Lebanese brand identity. Used without care, it will make STRIKE look like every other Lebanese brand. The solution is in the execution: geometric abstraction, minimal lines, inverted from traditional usage, used as texture not as hero mark. Done correctly, it signals provenance without being provincial." },
        ]
      },
      {
        category: "MARKET RISKS — MONITOR",
        color: C.red,
        points: [
          { title: "Nutritional claim verification: CRITICAL BLOCKER", body: "All 'PRIMAL PROTEIN' and protein-per-serving callouts require lab verification before print. This has been flagged in prior KITS advisories. The 'primal' positioning specifically attracts consumer scrutiny — fitness consumers will verify claims. A false or exaggerated claim in this segment is brand-ending, not brand-damaging. Lab testing is the mandatory first action before any packaging goes to print." },
          { title: "Lebanese economic volatility: ONGOING", body: "USD-denominated pricing protects against LBP volatility. The 90-day pricing review cycle must be maintained. The supply chain hybrid model (local + imported) insulates against single-source disruption. No action required — current planning accounts for this risk adequately." },
          { title: "Imitation risk once successful: HIGH by Month 12", body: "In Lebanon, successful products are imitated rapidly. STRIKE's protection: (1) trademark registration executed immediately, (2) the brand equity built through trainer relationships and personal service — which cannot be imitated in months, (3) flavor IP in the supply agreement — the Lebanese BBQ formula is owned by the venture, (4) GS1 barcode registration — counterfeits cannot use the legitimate barcode. Begin all IP protection actions in parallel, not sequentially." },
        ]
      }
    ]
  }
];

// ─── PRODUCT LINE VISUAL ───────────────────────────────────────────────────────
const SKUS = [
  {
    id: "bites",
    name: "STRIKE BITES",
    nameAr: "سترايك بايتس",
    sub: "Poppable · Cubed pieces",
    flavor: "SMOKING BBQ",
    flavorAr: "مدخّن BBQ",
    accent: "#C05030",
    channel: "Gym Counter · Sports Nutrition · Impulse",
    phase: "LAUNCH SKU",
    size: "40g single-serve",
    heat: 2,
    protein: "[X]g",
    cal: "[X]",
  },
  {
    id: "strips",
    name: "STRIKE STRIPS",
    nameAr: "سترايك ستريبس",
    sub: "Flat-cut · Traditional",
    flavor: "FIRE & LIME",
    flavorAr: "نار وليمون",
    accent: "#D07020",
    channel: "Pharmacy · Supermarket · Nutrition Shop",
    phase: "PHASE 2 — MONTH 4",
    size: "120g resealable",
    heat: 4,
    protein: "[X]g",
    cal: "[X]",
  },
  {
    id: "sticks",
    name: "STRIKE STICKS",
    nameAr: "سترايك ستيكس",
    sub: "Snack sticks · Individual",
    flavor: "ZA'ATAR",
    flavorAr: "زعتر",
    accent: "#5A8040",
    channel: "Gym Add-On · Convenience · Petrol Station",
    phase: "PHASE 3 — MONTH 8",
    size: "Per stick · Display box",
    heat: 1,
    protein: "[X]g",
    cal: "[X]",
  },
];

// ─── BAG VISUALIZATION ────────────────────────────────────────────────────────
function StrikeBag({ sku, size = 1 }) {
  const W = 220 * size;
  const H = 340 * size;
  const s = size;

  return (
    <svg width={W} height={H} viewBox={`0 0 220 340`} style={{ display: "block", filter: `drop-shadow(0 ${20 * s}px ${40 * s}px rgba(0,0,0,0.85)) drop-shadow(0 ${4 * s}px ${16 * s}px ${sku.accent}22)` }}>
      <defs>
        <linearGradient id={`bg-${sku.id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#141210" />
          <stop offset="60%" stopColor="#0A0908" />
          <stop offset="100%" stopColor="#050404" />
        </linearGradient>
        <linearGradient id={`accent-${sku.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={sku.accent} stopOpacity="0.9" />
          <stop offset="100%" stopColor={sku.accent} stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id={`gold-${sku.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E0B860" />
          <stop offset="100%" stopColor="#A07030" />
        </linearGradient>
        <linearGradient id={`sheen-${sku.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0.08" />
          <stop offset="40%" stopColor="white" stopOpacity="0.02" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`edgeL-${sku.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="black" stopOpacity="0.7" />
          <stop offset="100%" stopColor="black" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`edgeR-${sku.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="black" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.7" />
        </linearGradient>
        <filter id={`noise-${sku.id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" result="noise" />
          <feColorMatrix type="saturate" values="0" in="noise" result="gray" />
          <feBlend in="SourceGraphic" in2="gray" mode="multiply" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" operator="in" />
        </filter>
      </defs>

      {/* Bag shape */}
      <rect x="0" y="0" width="220" height="340" rx="14" fill={`url(#bg-${sku.id})`} />

      {/* Grain texture overlay */}
      <rect x="0" y="0" width="220" height="340" rx="14" fill="#8A7A6A" opacity="0.025" filter={`url(#noise-${sku.id})`} />

      {/* Grain lines */}
      {Array.from({ length: 22 }).map((_, i) => (
        <line key={i} x1={i * 11} y1="0" x2={i * 11 - 25} y2="340"
          stroke="white" strokeWidth="0.12" strokeOpacity="0.04" />
      ))}

      {/* Top header band */}
      <rect x="0" y="0" width="220" height="48" rx="14" fill="#0E0C0A" />
      <rect x="0" y="34" width="220" height="14" fill="#0E0C0A" />

      {/* SKU reference */}
      <text x="14" y="18" fill={C.gold} opacity="0.45"
        fontFamily="'Courier New', monospace" fontSize="6" letterSpacing="2.5">
        KAG-JRK · {sku.id.toUpperCase()}
      </text>
      <text x="14" y="30" fill={C.cream} opacity="0.2"
        fontFamily="'Courier New', monospace" fontSize="6" letterSpacing="1.5">
        {sku.phase}
      </text>

      {/* Phase badge top-right */}
      <rect x="142" y="12" width="64" height="16" rx="2"
        fill={sku.accent} fillOpacity="0.2"
        stroke={sku.accent} strokeWidth="0.5" strokeOpacity="0.6" />
      <text x="174" y="23" textAnchor="middle"
        fill={sku.accent} fontFamily="'Courier New', monospace"
        fontSize="5.5" letterSpacing="0.5">
        {sku.size.toUpperCase()}
      </text>

      {/* Accent slash — top geometric element */}
      <polygon points="0,48 30,48 18,340 0,340" fill={sku.accent} fillOpacity="0.06" />
      <line x1="0" y1="48" x2="18" y2="340" stroke={sku.accent} strokeWidth="0.8" strokeOpacity="0.35" />

      {/* Cedar tree micro-icon (geometric abstraction — 5 lines) */}
      <g transform="translate(182, 60)" opacity="0.15">
        {/* Geometric cedar: 5 horizontal lines decreasing */}
        <line x1="0" y1="20" x2="22" y2="20" stroke={C.gold} strokeWidth="1.2" />
        <line x1="3" y1="15" x2="19" y2="15" stroke={C.gold} strokeWidth="1.2" />
        <line x1="6" y1="10" x2="16" y2="10" stroke={C.gold} strokeWidth="1.2" />
        <line x1="9" y1="5" x2="13" y2="5" stroke={C.gold} strokeWidth="1.2" />
        <line x1="11" y1="0" x2="11" y2="20" stroke={C.gold} strokeWidth="0.8" />
      </g>

      {/* HALAL badge */}
      <circle cx="190" cy="96" r="18" fill="#3A6040" />
      <circle cx="190" cy="96" r="15.5" fill="none" stroke="white" strokeWidth="0.6" strokeOpacity="0.4" />
      <text x="190" y="92" textAnchor="middle" fill="white"
        fontFamily="Georgia, serif" fontSize="7.5" fontWeight="bold">حلال</text>
      <text x="190" y="101" textAnchor="middle" fill="white"
        fontFamily="'Courier New', monospace" fontSize="5" letterSpacing="0.3">HALAL</text>
      <text x="190" y="109" textAnchor="middle" fill="white"
        fontFamily="Georgia, serif" fontSize="4" opacity="0.7">100%</text>

      {/* Gold accent rule */}
      <rect x="14" y="52" width="152" height="1.5" fill={`url(#gold-${sku.id})`} opacity="0.9" rx="1" />

      {/* STRIKE — brand wordmark */}
      <text x="14" y="96" fill={C.cream}
        fontFamily="'Didot', 'Bodoni MT', 'Playfair Display', Georgia, serif"
        fontSize="42" fontWeight="400" letterSpacing="7">
        STRIKE
      </text>
      {/* Simulated UV spot: slightly brighter version of wordmark */}
      <text x="14" y="96" fill={C.goldBright} fillOpacity="0.12"
        fontFamily="'Didot', 'Bodoni MT', 'Playfair Display', Georgia, serif"
        fontSize="42" fontWeight="400" letterSpacing="7">
        STRIKE
      </text>

      {/* Arabic wordmark */}
      <text x="14" y="114" fill={C.gold} opacity="0.55"
        fontFamily="Georgia, serif" fontSize="11" letterSpacing="0.5">
        {sku.nameAr.split(" ")[0]}
      </text>

      {/* Thin rule */}
      <rect x="14" y="121" width="192" height="0.8" fill={C.cream} opacity="0.12" rx="1" />

      {/* PROTEIN — hero number */}
      <text x="14" y="175" fill={`url(#gold-${sku.id})`}
        fontFamily="'Didot', 'Bodoni MT', Georgia, serif"
        fontSize="66" fontWeight="400" letterSpacing="-2">
        {sku.protein}
      </text>
      <text x="14" y="192" fill={C.cream} opacity="0.85"
        fontFamily="'Courier New', monospace"
        fontSize="9" letterSpacing="5">
        PROTEIN
      </text>
      <text x="14" y="204" fill={C.cream} opacity="0.3"
        fontFamily="'Courier New', monospace"
        fontSize="6" letterSpacing="2.5">
        بروتين · PROTÉINE
      </text>

      {/* Calorie line */}
      <rect x="14" y="212" width="192" height="0.6" fill={C.cream} opacity="0.08" />
      <text x="14" y="225" fill={C.cream} opacity="0.55"
        fontFamily="'Courier New', monospace" fontSize="7.5" letterSpacing="1.5">
        {sku.cal} CALORIES · {sku.size}
      </text>

      {/* Flavor zone */}
      <rect x="14" y="234" width="192" height="30" fill={sku.accent} fillOpacity="0.1" rx="3" />
      <rect x="14" y="234" width="3.5" height="30" fill={sku.accent} rx="1.5" />
      <text x="26" y="247" fill={sku.accent}
        fontFamily="'Didot', 'Playfair Display', Georgia, serif"
        fontSize="11" letterSpacing="1.5" fontWeight="400">
        {sku.flavor}
      </text>
      <text x="26" y="259" fill={sku.accent} opacity="0.6"
        fontFamily="Georgia, serif" fontSize="8">
        {sku.flavorAr}
      </text>

      {/* Heat indicator */}
      <text x="178" y="259" textAnchor="end" fill={sku.accent} opacity="0.8"
        fontFamily="'Courier New', monospace" fontSize="8">
        {"🔥".repeat(sku.heat)}
      </text>

      {/* Claims strip */}
      <rect x="0" y="276" width="220" height="38" fill="#0E0C0A" />
      <rect x="0" y="276" width="220" height="0.8" fill={C.gold} opacity="0.3" />
      <rect x="0" y="313" width="220" height="0.8" fill={C.gold} opacity="0.15" />

      <text x="14" y="289" fill="#5A9060"
        fontFamily="'Courier New', monospace" fontSize="5.5" letterSpacing="0.5">
        ✓ NO ADDED SUGAR
      </text>
      <text x="100" y="289" fill="#5A9060"
        fontFamily="'Courier New', monospace" fontSize="5.5" letterSpacing="0.5">
        ✓ NO ARTIFICIAL PRESERVATIVES
      </text>
      <text x="14" y="300" fill="#5A9060" opacity="0.7"
        fontFamily="Georgia, serif" fontSize="5">
        بدون سكر مضاف · Sans sucre ajouté
      </text>
      <text x="14" y="308" fill={C.cream} opacity="0.3"
        fontFamily="'Courier New', monospace" fontSize="5" letterSpacing="1">
        MADE IN LEBANON · صنع في لبنان · FABRIQUÉ AU LIBAN
      </text>

      {/* Bottom regulatory */}
      <rect x="0" y="314" width="220" height="26" fill="#050404" />
      <text x="14" y="326" fill={C.cream} opacity="0.2"
        fontFamily="'Courier New', monospace" fontSize="5" letterSpacing="0.5">
        MoPH REG: [PENDING] · HALAL: [PENDING]
      </text>

      {/* Barcode miniature */}
      <rect x="14" y="329" width="44" height="10" fill="white" rx="1" />
      {Array.from({ length: 18 }).map((_, i) => (
        <rect key={i} x={16 + i * 2.1} y="331"
          width={i % 3 === 0 ? 1.2 : 0.6}
          height={i % 5 === 0 ? 7 : 5.5}
          fill="#0A0908" />
      ))}

      <text x="110" y="338" textAnchor="middle" fill={C.gold} opacity="0.15"
        fontFamily="'Courier New', monospace" fontSize="4.5" letterSpacing="1.5">
        KITS ADVISORY · STRIKE
      </text>

      {/* Edge sheens */}
      <rect x="0" y="0" width="220" height="340" fill={`url(#sheen-${sku.id})`} rx="14" />
      <rect x="0" y="0" width="28" height="340" fill={`url(#edgeL-${sku.id})`} rx="14" />
      <rect x="192" y="0" width="28" height="340" fill={`url(#edgeR-${sku.id})`} rx="14" />
    </svg>
  );
}

// ─── SCORE RING ───────────────────────────────────────────────────────────────
function ScoreRing({ score, color, size = 64 }) {
  const r = size * 0.4;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1E1B18" strokeWidth="4" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
        strokeWidth="4" strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)" }} />
    </svg>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const TABS = [
  { id: "verdict", label: "Brand Verdict" },
  { id: "enhancements", label: "Enhancements" },
  { id: "products", label: "Product Line" },
  { id: "bags", label: "Packaging Render" },
];

export default function StrikeBrandStudy() {
  const [tab, setTab] = useState("verdict");
  const [loaded, setLoaded] = useState(false);
  const [expandedEnh, setExpandedEnh] = useState(null);
  const [activeSku, setActiveSku] = useState("bites");
  const [activeVerdict, setActiveVerdict] = useState("name");

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const sku = SKUS.find(s => s.id === activeSku);
  const vItem = VERDICT[activeVerdict];

  return (
    <div style={{
      minHeight: "100vh",
      background: C.void,
      color: C.cream,
      fontFamily: "'Georgia', 'Times New Roman', serif",
    }}>

      {/* ─── HERO HEADER ─────────────────────────────────────────────────── */}
      <div style={{
        background: `linear-gradient(160deg, ${C.charcoal} 0%, ${C.void} 60%)`,
        borderBottom: `1px solid ${C.ash}`,
        padding: "36px 40px 28px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background grid */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.025,
          backgroundImage: `linear-gradient(${C.gold} 1px, transparent 1px), linear-gradient(90deg, ${C.gold} 1px, transparent 1px)`,
          backgroundSize: "32px 32px" }} />

        {/* Diagonal accent */}
        <div style={{ position: "absolute", right: 0, top: 0, width: 400, height: "100%", overflow: "hidden", opacity: 0.06 }}>
          <div style={{ width: 2, height: "200%", background: C.gold, transform: "rotate(-20deg) translateX(100px)", transformOrigin: "top right" }} />
          <div style={{ width: 1, height: "200%", background: C.gold, transform: "rotate(-20deg) translateX(130px)", transformOrigin: "top right" }} />
        </div>

        <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: C.gold, opacity: 0.5, letterSpacing: "0.4em", marginBottom: 14 }}>
          KITS ADVISORY GROUP · BRAND ENHANCEMENT STUDY · REF: KAG-JRK-008 · CONFIDENTIAL
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: 24, flexWrap: "wrap" }}>
          <div>
            <h1 style={{
              margin: 0, fontFamily: "'Didot','Bodoni MT','Playfair Display',Georgia,serif",
              fontSize: "clamp(32px,6vw,64px)", fontWeight: 400, letterSpacing: "0.15em",
              color: C.strike, lineHeight: 1,
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)"
            }}>
              STRIKE
            </h1>
            <div style={{
              fontFamily: "'Courier New', monospace", fontSize: 11, color: C.gold,
              letterSpacing: "0.3em", marginTop: 6,
              opacity: loaded ? 1 : 0,
              transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s"
            }}>
              STRIKE BITES · Brand Enhancement Study
            </div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 12, color: C.creamDim, marginTop: 6, letterSpacing: "0.05em" }}>
              Premium Portioned Beef Jerky Bites · Lebanese Market Entry · GCC & Western Scale
            </div>
          </div>

          {/* Overall brand score */}
          <div style={{
            marginLeft: "auto", textAlign: "center",
            opacity: loaded ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s"
          }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <ScoreRing score={88} color={C.goldBright} size={80} />
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 20, color: C.goldBright, lineHeight: 1 }}>88</div>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 6, color: C.gold, letterSpacing: "0.1em" }}>/100</div>
              </div>
            </div>
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: 8, color: C.greenBright, letterSpacing: "0.15em", marginTop: 6 }}>
              BRAND SCORE
            </div>
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: 7, color: C.creamDim, marginTop: 2 }}>
              STRONG — APPROVED
            </div>
          </div>
        </div>
      </div>

      {/* ─── TABS ──────────────────────────────────────────────────────────── */}
      <div style={{
        background: C.charcoal, borderBottom: `1px solid ${C.ash}`,
        display: "flex", flexWrap: "wrap", padding: "0 40px"
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: "transparent", border: "none",
            borderBottom: tab === t.id ? `2px solid ${C.gold}` : "2px solid transparent",
            color: tab === t.id ? C.cream : C.creamDim,
            fontFamily: "'Courier New', monospace", fontSize: 10,
            letterSpacing: "0.2em", padding: "14px 20px 12px",
            cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap",
            opacity: tab === t.id ? 1 : 0.5,
          }}>
            {t.label.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ padding: "36px 40px", maxWidth: 1100 }}>

        {/* ═══════════════════════════════════════════════════════════════════
            TAB: BRAND VERDICT
        ══════════════════════════════════════════════════════════════════════ */}
        {tab === "verdict" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: C.gold, letterSpacing: "0.25em", marginBottom: 8 }}>
                ELEMENT-BY-ELEMENT BRAND ANALYSIS
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(18px,3vw,26px)", fontWeight: 400, color: C.cream }}>
                What Works. What to Evolve. What to Add.
              </h2>
              <p style={{ margin: "10px 0 0", fontSize: 13, color: C.creamDim, lineHeight: 1.8, maxWidth: 680 }}>
                This section evaluates every element of the STRIKE brand brief against international best practice, Lebanese market requirements, GCC scalability, and Western market readiness. Each element is scored, verdicted, and enhanced with specific actionable recommendations.
              </p>
            </div>

            {/* Verdict selector */}
            <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
              {Object.entries(VERDICT).map(([key, v]) => (
                <button key={key} onClick={() => setActiveVerdict(key)} style={{
                  background: activeVerdict === key ? `${v.color}18` : "transparent",
                  border: `1px solid ${activeVerdict === key ? v.color : C.ash}`,
                  borderRadius: 4, padding: "10px 18px", cursor: "pointer",
                  transition: "all 0.2s", textAlign: "left"
                }}>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: 8, color: activeVerdict === key ? v.color : C.creamDim, letterSpacing: "0.15em", marginBottom: 4 }}>
                    {key.toUpperCase()}
                  </div>
                  <div style={{ fontSize: 11, color: activeVerdict === key ? C.cream : C.creamDim }}>
                    {v.label}
                  </div>
                </button>
              ))}
            </div>

            {/* Active verdict detail */}
            <div style={{
              background: C.charcoal,
              border: `1px solid ${vItem.color}30`,
              borderRadius: 6, overflow: "hidden"
            }}>
              {/* Header */}
              <div style={{
                background: `${vItem.color}0C`,
                borderBottom: `1px solid ${vItem.color}20`,
                padding: "20px 28px",
                display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap"
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10, flexWrap: "wrap" }}>
                    <h3 style={{ margin: 0, fontFamily: "'Didot',Georgia,serif", fontSize: 26, fontWeight: 400, color: C.cream, letterSpacing: "0.1em" }}>
                      {vItem.label}
                    </h3>
                    <span style={{
                      fontFamily: "'Courier New', monospace", fontSize: 9,
                      color: vItem.color,
                      background: `${vItem.color}18`,
                      border: `1px solid ${vItem.color}40`,
                      padding: "4px 12px", borderRadius: 3, letterSpacing: "0.15em"
                    }}>
                      {vItem.verdict}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: C.creamDim, lineHeight: 1.85 }}>
                    {vItem.analysis}
                  </p>
                </div>
                <div style={{ textAlign: "center", flexShrink: 0 }}>
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <ScoreRing score={vItem.score} color={vItem.color} size={72} />
                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ fontFamily: "'Courier New', monospace", fontSize: 18, color: vItem.color }}>{vItem.score}</div>
                      <div style={{ fontFamily: "'Courier New', monospace", fontSize: 6, color: C.creamDim }}>/ 100</div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                {/* Risks */}
                <div style={{ padding: "20px 28px", borderRight: `1px solid ${C.ash}` }}>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: C.red, letterSpacing: "0.2em", marginBottom: 12 }}>
                    RISK FLAGS
                  </div>
                  {vItem.risks.map((r, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                      <span style={{ color: C.red, fontSize: 10, flexShrink: 0, marginTop: 2 }}>⚑</span>
                      <p style={{ margin: 0, fontSize: 12, color: C.creamDim, lineHeight: 1.7 }}>{r}</p>
                    </div>
                  ))}
                </div>
                {/* Improvements */}
                <div style={{ padding: "20px 28px" }}>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: C.greenBright, letterSpacing: "0.2em", marginBottom: 12 }}>
                    KITS RECOMMENDATIONS
                  </div>
                  {vItem.improvements.map((r, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                      <span style={{ color: C.greenBright, fontSize: 10, flexShrink: 0, marginTop: 2 }}>→</span>
                      <p style={{ margin: 0, fontSize: 12, color: C.creamDim, lineHeight: 1.7 }}>{r}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Overall brand score summary */}
            <div style={{ marginTop: 20, background: C.charcoal, border: `1px solid ${C.ash}`, borderRadius: 4, padding: "20px 28px" }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: C.gold, letterSpacing: "0.25em", marginBottom: 16 }}>
                OVERALL BRAND ASSESSMENT — KITS VERDICT
              </div>
              <p style={{ margin: "0 0 12px", fontSize: 14, color: C.cream, lineHeight: 1.85, fontFamily: "Georgia, serif" }}>
                <strong style={{ color: C.goldBright }}>STRIKE is a genuinely strong brand name</strong> for this product, this market, and this growth trajectory. It is short, phonetically universal, kinetically charged, and fully trademarkable. The product line architecture (BITES / STRIPS / STICKS) is modular, alliterative, and commercially scalable. The 'primal' positioning is differentiated and correct. The Arabic-English-French trilingual system is exactly right for Lebanon and GCC export.
              </p>
              <p style={{ margin: 0, fontSize: 14, color: C.creamDim, lineHeight: 1.85, fontFamily: "Georgia, serif" }}>
                The areas requiring refinement are the tagline (move away from 'MUSCLE FUEL'), the cedar tree execution (geometric abstraction only — never literal), and the packaging hierarchy (add transparent window and UV spot varnish). None of these are fundamental brand problems — they are executional refinements that separate a good launch from a great one. With these enhancements, STRIKE BITES is positioned to be the defining Lebanese protein snack brand of this decade.
              </p>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TAB: ENHANCEMENTS
        ══════════════════════════════════════════════════════════════════════ */}
        {tab === "enhancements" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: C.gold, letterSpacing: "0.25em", marginBottom: 8 }}>
                BRAND ENHANCEMENT RECOMMENDATIONS
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(18px,3vw,26px)", fontWeight: 400, color: C.cream }}>
                Keep · Evolve · Add. Category by Category.
              </h2>
              <p style={{ margin: "10px 0 0", fontSize: 13, color: C.creamDim, lineHeight: 1.8 }}>
                Structured enhancement recommendations organized by brand dimension. Each section includes what is already correct and should not change, what should be evolved from its current form, and what is missing and must be added.
              </p>
            </div>

            {ENHANCEMENTS.map((enh, ei) => (
              <div key={enh.id} style={{ marginBottom: 8 }}>
                <button onClick={() => setExpandedEnh(expandedEnh === enh.id ? null : enh.id)} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", background: expandedEnh === enh.id ? `${enh.color}0C` : C.charcoal,
                  border: `1px solid ${expandedEnh === enh.id ? enh.color + "40" : C.ash}`,
                  borderLeft: `4px solid ${enh.color}`,
                  borderRadius: 4, padding: "18px 24px", cursor: "pointer",
                  transition: "all 0.2s", textAlign: "left"
                }}>
                  <div>
                    <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: enh.color, letterSpacing: "0.2em", marginBottom: 5 }}>
                      SECTION {String(ei + 1).padStart(2, "0")}
                    </div>
                    <div style={{ fontSize: 16, color: C.cream, marginBottom: 2 }}>{enh.title}</div>
                    <div style={{ fontSize: 11, color: C.creamDim, fontFamily: "'Courier New', monospace" }}>{enh.subtitle}</div>
                  </div>
                  <span style={{ color: C.creamDim, fontSize: 18 }}>{expandedEnh === enh.id ? "−" : "+"}</span>
                </button>

                {expandedEnh === enh.id && (
                  <div style={{ border: `1px solid ${C.ash}`, borderTop: "none", borderRadius: "0 0 4px 4px", overflow: "hidden" }}>
                    {enh.items.map((group, gi) => (
                      <div key={gi} style={{ borderBottom: gi < enh.items.length - 1 ? `1px solid ${C.ash}` : "none" }}>
                        <div style={{
                          background: `${group.color}08`,
                          padding: "12px 24px",
                          borderLeft: `3px solid ${group.color}`,
                          borderBottom: `1px solid ${C.ash}`
                        }}>
                          <span style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: group.color, letterSpacing: "0.2em" }}>
                            {group.category}
                          </span>
                        </div>
                        <div style={{ padding: "16px 24px", background: C.charcoal }}>
                          {group.points.map((pt, pi) => (
                            <div key={pi} style={{
                              padding: "14px 0",
                              borderBottom: pi < group.points.length - 1 ? `1px solid ${C.ash}` : "none",
                              display: "flex", gap: 16
                            }}>
                              <div style={{ flexShrink: 0, width: 24, paddingTop: 2 }}>
                                <div style={{ width: 6, height: 6, borderRadius: "50%", background: group.color, marginTop: 5 }} />
                              </div>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, color: C.cream, marginBottom: 6, fontFamily: "Georgia, serif" }}>{pt.title}</div>
                                <p style={{ margin: 0, fontSize: 12, color: C.creamDim, lineHeight: 1.8 }}>{pt.body}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TAB: PRODUCT LINE
        ══════════════════════════════════════════════════════════════════════ */}
        {tab === "products" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: C.gold, letterSpacing: "0.25em", marginBottom: 8 }}>
                PRODUCT LINE ARCHITECTURE
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(18px,3vw,26px)", fontWeight: 400, color: C.cream }}>
                STRIKE BITES · STRIPS · STICKS · PACKS
              </h2>
              <p style={{ margin: "10px 0 0", fontSize: 13, color: C.creamDim, lineHeight: 1.8 }}>
                A fully modular, alliterative product line architecture designed to expand from Lebanon to GCC to Western markets without rebranding. Each format serves a distinct channel and purchase occasion.
              </p>
            </div>

            {/* SKU cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 8, marginBottom: 28 }}>
              {SKUS.map(s => (
                <div key={s.id} onClick={() => setActiveSku(s.id)} style={{
                  background: activeSku === s.id ? `${s.accent}12` : C.charcoal,
                  border: `1px solid ${activeSku === s.id ? s.accent + "50" : C.ash}`,
                  borderLeft: `4px solid ${s.accent}`,
                  borderRadius: 4, padding: "18px 20px",
                  cursor: "pointer", transition: "all 0.2s"
                }}>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: 8, color: s.accent, letterSpacing: "0.2em", marginBottom: 8 }}>
                    {s.phase}
                  </div>
                  <div style={{ fontSize: 18, color: C.cream, letterSpacing: "0.1em", marginBottom: 4, fontFamily: "Georgia, serif" }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: s.accent, marginBottom: 8 }}>{s.flavor} · {s.sub}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                    {[
                      ["SIZE", s.size],
                      ["CHANNEL", s.channel.split(" · ")[0]],
                      ["PROTEIN", s.protein],
                      ["HEAT", "🔥".repeat(s.heat)],
                    ].map(([k, v]) => (
                      <div key={k} style={{ background: C.ash, borderRadius: 3, padding: "6px 8px" }}>
                        <div style={{ fontFamily: "'Courier New', monospace", fontSize: 7, color: C.creamDim, marginBottom: 2 }}>{k}</div>
                        <div style={{ fontSize: 10, color: C.cream }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Strike Packs card */}
              <div style={{
                background: C.charcoal, border: `1px solid ${C.ash}`,
                borderLeft: `4px solid ${C.purple}`,
                borderRadius: 4, padding: "18px 20px",
                opacity: 0.6
              }}>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 8, color: C.purple, letterSpacing: "0.2em", marginBottom: 8 }}>
                  PHASE 4 — GCC LAUNCH
                </div>
                <div style={{ fontSize: 18, color: C.cream, letterSpacing: "0.1em", marginBottom: 4, fontFamily: "Georgia, serif" }}>STRIKE PACKS</div>
                <div style={{ fontSize: 12, color: C.purple, marginBottom: 8 }}>VARIETY MULTIPACK · 3–5 flavors</div>
                <div style={{ fontSize: 11, color: C.creamDim, lineHeight: 1.7 }}>
                  GCC hypermarket entry format. Gift-ready variety pack. Hotel minibar, duty-free, premium retail. Lebanese provenance as GCC luxury signal.
                </div>
              </div>
            </div>

            {/* Market data context */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 6 }}>
              {[
                { label: "GCC Snacks Market 2024", value: "$8.49B", trend: "→ $12.87B by 2030" },
                { label: "GCC Snacks CAGR", value: "7.18%", trend: "2025–2030" },
                { label: "GCC Functional Food 2025", value: "$18.20B", trend: "10.9% CAGR to 2036" },
                { label: "MENA snack CAGR", value: "4.6%", trend: "vs 2.5% global avg" },
                { label: "Meat stick growth (global)", value: "187%", trend: "Fastest jerky format" },
                { label: "Lebanon local jerky brand", value: "ZERO", trend: "First mover available" },
              ].map((d, i) => (
                <div key={i} style={{
                  background: i % 2 === 0 ? C.charcoal : C.ash,
                  border: `1px solid ${C.ember}`, borderRadius: 3,
                  padding: "14px 16px"
                }}>
                  <div style={{ fontSize: 11, color: C.creamDim, marginBottom: 6 }}>{d.label}</div>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: 18, color: C.goldBright, marginBottom: 3 }}>{d.value}</div>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: C.greenBright }}>{d.trend}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            TAB: PACKAGING RENDER
        ══════════════════════════════════════════════════════════════════════ */}
        {tab === "bags" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: C.gold, letterSpacing: "0.25em", marginBottom: 8 }}>
                UPDATED PACKAGING RENDER — STRIKE BRAND SYSTEM
              </div>
              <h2 style={{ margin: 0, fontSize: "clamp(18px,3vw,26px)", fontWeight: 400, color: C.cream }}>
                Full Product Line Visual — All Three Launch SKUs
              </h2>
              <p style={{ margin: "10px 0 0", fontSize: 13, color: C.creamDim, lineHeight: 1.8 }}>
                Visualization applies all confirmed brand elements: STRIKE wordmark, geometric cedar micro-icon, performance gold system, volcanic rock grain texture, flavor accent color coding, heat indicator system, and full trilingual regulatory compliance layout.
              </p>
            </div>

            {/* Three bags side by side */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              gap: 40,
              flexWrap: "wrap",
              padding: "48px 0 24px",
              background: `radial-gradient(ellipse at 50% 40%, ${C.charcoal} 0%, ${C.void} 65%)`,
              borderRadius: 8,
              marginBottom: 20,
            }}>
              {SKUS.map((s, i) => (
                <div key={s.id} style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 16,
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0) scale(1)" : `translateY(${24 + i * 8}px) scale(0.95)`,
                  transition: `all 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
                }}>
                  <StrikeBag sku={s} size={i === 1 ? 1.12 : 0.92} />
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: s.accent, letterSpacing: "0.15em", marginBottom: 3 }}>
                      {s.name}
                    </div>
                    <div style={{ fontFamily: "'Courier New', monospace", fontSize: 8, color: C.creamDim }}>
                      {s.flavor} · {s.size}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Design annotation summary */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 6 }}>
              {[
                { label: "STRIKE Wordmark", note: "Custom-weight serif · Simulated UV spot gloss on matte substrate · Arabic سترايك paired beneath", color: C.gold },
                { label: "Performance Gold System", note: "Muted earthy amber — not chrome, not yellow. Protein number, brand name, flavor zone accents", color: C.gold },
                { label: "Volcanic Grain Texture", note: "Noise-grain at 3–5% opacity on dark base. Confirms matte laminate at print. Depth without color", color: C.creamDim },
                { label: "Cedar Micro-Icon", note: "5-line geometric abstraction · 45° offset · Gold-on-dark · 15% opacity background element only", color: C.gold },
                { label: "Flavor Accent System", note: "BBQ = deep ember red · Fire & Lime = cayenne orange · Za'atar = olive green. Brand gold remains constant", color: C.goldBright },
                { label: "Heat Indicator", note: "🔥 scale 1–5. Internationally understood. Differentiates SKUs at shelf. No translation required", color: C.creamDim },
                { label: "Halal Badge", note: "Forest green circle · Arabic حلال primary · 100% Halal sub-text · Top-right corner on all SKUs", color: C.greenBright },
                { label: "Trilingual System", note: "Arabic (regulatory primary) · English (commercial primary) · French (market secondary). All three on all panels", color: C.creamDim },
                { label: "Zero Sugar Callout", note: "Green accent on claims strip. 'NO ADDED SUGAR' is the first claim — our primary competitive weapon", color: C.greenBright },
                { label: "Pending Elements", note: "MoPH number · Halal cert number · GS1 barcode · Net weight · Lab-confirmed protein figure · Flavor name final", color: "#C8A96E" },
              ].map((ann, i) => (
                <div key={i} style={{
                  background: C.charcoal, border: `1px solid ${C.ash}`,
                  borderLeft: `3px solid ${ann.color}`,
                  borderRadius: 3, padding: "10px 12px"
                }}>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: 8, color: ann.color, marginBottom: 5, letterSpacing: "0.1em" }}>{ann.label}</div>
                  <p style={{ margin: 0, fontSize: 10, color: C.creamDim, lineHeight: 1.7 }}>{ann.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: `1px solid ${C.ash}`, padding: "14px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 8, background: C.charcoal
      }}>
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: 8, color: C.creamDim, opacity: 0.4, letterSpacing: "0.2em" }}>
          KITS ADVISORY GROUP · BRAND ENHANCEMENT STUDY · KAG-JRK-008 · CONFIDENTIAL
        </span>
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: 8, color: C.gold, opacity: 0.3, letterSpacing: "0.15em" }}>
          STRIKE BITES · OVERALL BRAND SCORE: 88/100 · STATUS: APPROVED — STRONG
        </span>
      </div>
    </div>
  );
}

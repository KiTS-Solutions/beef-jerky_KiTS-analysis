import { useState } from "react";

const PENDING = "[BOARD DECISION PENDING]";
const PENDING_FLAVOR = "[PRIMARY FLAVOR — BOARD DECISION PENDING]";

const SECTIONS = [
  { id: "overview", label: "Project Overview" },
  { id: "naming", label: "Brand Name" },
  { id: "identity", label: "Visual Identity" },
  { id: "packaging", label: "Packaging Specs" },
  { id: "compliance", label: "Regulatory Compliance" },
  { id: "copywriting", label: "Copy & Language" },
  { id: "production", label: "Print & Production" },
  { id: "deliverables", label: "Designer Deliverables" },
];

const BRAND_PILLARS = [
  { label: "Performance", desc: "Every visual decision communicates that this product is for people who train with intention. No casual snack energy — serious nutrition tool." },
  { label: "Authenticity", desc: "Lebanese-made, Halal-certified, clean ingredients. The brand is honest. The packaging is honest. No misleading claims, no inflated language." },
  { label: "Precision", desc: "Protein content is the hero of the pack. Numbers communicate exactness. The brand is not approximate — it is specific." },
  { label: "Cultural Pride", desc: "This is a Lebanese product, not an imported one wearing Lebanese clothes. The identity must feel indigenous, not adapted." },
];

const COLOR_DIRECTION = [
  {
    name: "Primary — Deep Anchor",
    purpose: "Dominant background / brand base",
    direction: "A near-black with a warm undertone — charcoal, deep espresso, or dark olive. Avoids the generic black of imported brands. Communicates seriousness and premium positioning without coldness.",
    avoid: "Pure #000000. Cool blue-blacks. Navy. Anything that reads as corporate."
  },
  {
    name: "Hero Accent — Performance Gold",
    purpose: "Protein callout, key numbers, primary CTA zone",
    direction: "A muted, earthy gold or amber — not yellow, not metallic. The color of dried spice, of aged brass, of Lebanese terrain. This is the one color the consumer sees first at shelf.",
    avoid: "Bright yellow. Chrome gold. Anything that reads as cheap or fast food."
  },
  {
    name: "Secondary — Clean Contrast",
    purpose: "Text on dark, certifications, ingredient list",
    direction: "Warm off-white or aged linen — not pure white. The same warm undertone as the anchor color. Creates cohesion rather than harsh contrast.",
    avoid: "Pure #FFFFFF. Cold white. Stark contrast that feels clinical."
  },
  {
    name: "Certification Accent",
    purpose: "Halal mark, MoPH badge, clean-label callout",
    direction: "A deep, confident green — forest rather than lime. Communicates trust, certification, and natural origin without looking pharmaceutical.",
    avoid: "Bright lime. Mint. Anything associated with pharmacy or medical brand."
  },
];

const PACKAGING_SPECS = [
  {
    sku: "SKU 01 — Single-Serve Pouch",
    color: "#C8A96E",
    format: "Flat-bottom standup pouch or side-gusset pillow bag",
    weight: "[TBC with manufacturer — target 30–50g net weight]",
    dimensions: "Approx. 12cm × 18cm × 3cm (confirm with manufacturer before artwork sizing)",
    material: "Food-grade multi-layer laminate — matte exterior finish. No gloss. Matte communicates premium and suppresses fingerprinting.",
    closure: "Tear notch. No zipper required for single-serve.",
    channel: "Gym counter, sports nutrition store, impulse point-of-sale",
    hierarchy: [
      "BRAND NAME — maximum visual weight, immediate recognition at 1 meter distance",
      "Protein quantity (Xg) — second largest element on front panel, cannot be missed",
      "Flavor name — prominent but subordinate to protein number",
      "Halal certification mark — top right corner, front panel",
      "Calorie count — secondary callout, front panel",
      "Clean-label statement ('No Added Sugar / No Artificial Preservatives') — front panel strip",
    ]
  },
  {
    sku: "SKU 02 — Multi-Serve Resealable Pouch",
    color: "#7EB5A6",
    format: "Stand-up pouch with resealable zipper",
    weight: "[TBC with manufacturer — target 100–150g net weight]",
    dimensions: "Approx. 16cm × 24cm × 6cm (confirm with manufacturer before artwork sizing)",
    material: "Food-grade multi-layer laminate — matte exterior. Same finish as single-serve for brand consistency.",
    closure: "Zipper reseal. Mandatory for multi-serve format.",
    channel: "Pharmacy, supermarket, nutrition shop shelf",
    hierarchy: [
      "BRAND NAME — same weight as single-serve for shelf recognition",
      "Protein per serving (Xg) AND servings per pack — both on front panel",
      "Flavor name — matching single-serve treatment",
      "Halal mark — same position as single-serve for consistency",
      "Full nutritional table — back panel, MoPH compliant",
      "Value messaging ('X servings') — front panel, lower zone",
    ]
  },
];

const MANDATORY_ELEMENTS = [
  { item: "Product name", lang: "Arabic + French or English", requirement: "Mandatory — MoPH regulation", zone: "Front panel" },
  { item: "Ingredients list", lang: "Arabic mandatory, French/English alongside", requirement: "Mandatory — MoPH regulation", zone: "Back panel" },
  { item: "Nutritional facts table", lang: "Arabic + French/English", requirement: "Mandatory — MoPH regulation", zone: "Back panel" },
  { item: "Net weight", lang: "Arabic + French/English", requirement: "Mandatory", zone: "Front or back panel" },
  { item: "Manufacturer name & address", lang: "Arabic mandatory", requirement: "Mandatory — MoPH regulation", zone: "Back panel" },
  { item: "MoPH registration number", lang: "As issued by MoPH", requirement: "Mandatory — do not print without confirmed number", zone: "Back panel" },
  { item: "Halal certification mark", lang: "Arabic mark from certifying body", requirement: "Mandatory for market — must be issued mark, not self-declared", zone: "Front panel, top right" },
  { item: "Best before date format", lang: "Arabic + French/English", requirement: "Mandatory — MoPH format", zone: "Bottom or back panel" },
  { item: "Country of origin", lang: "Arabic mandatory", requirement: "Mandatory", zone: "Back panel" },
  { item: "Barcode (GS1 Lebanon)", lang: "N/A", requirement: "Mandatory for modern trade — register before print", zone: "Back panel, bottom right" },
  { item: "Storage instructions", lang: "Arabic mandatory", requirement: "Mandatory", zone: "Back panel" },
  { item: "Allergen declaration", lang: "Arabic mandatory, bold format", requirement: "Mandatory — highlight in bold per MoPH", zone: "Back panel, ingredient list" },
];

const COPY_LINES = [
  { zone: "Primary headline (front panel)", en: "[BRAND NAME]", ar: PENDING, fr: PENDING, note: "Board decision pending. All languages must be confirmed by KITS before artwork." },
  { zone: "Flavor descriptor", en: PENDING_FLAVOR, ar: PENDING, fr: PENDING, note: "Flavor name in all three languages. Must be approved by manufacturer and KITS before print." },
  { zone: "Protein callout", en: "[X]g Protein", ar: "[X] غرام بروتين", fr: "[X]g Protéine", note: "Replace [X] with lab-confirmed number. Never estimate." },
  { zone: "Calorie callout", en: "[X] Calories", ar: "[X] سعرة حرارية", fr: "[X] Calories", note: "Replace [X] with lab-confirmed number." },
  { zone: "Clean-label claim", en: "No Added Sugar · No Artificial Preservatives", ar: "بدون سكر مضاف · بدون مواد حافظة صناعية", fr: "Sans sucre ajouté · Sans conservateurs artificiels", note: "Confirm with manufacturer before printing. Must be factually verifiable." },
  { zone: "Halal statement", en: "Halal Certified", ar: "حلال معتمد", fr: "Certifié Halal", note: "Use only after certification is issued. Include certifying body name." },
  { zone: "Origin statement", en: "Made in Lebanon", ar: "صنع في لبنان", fr: "Fabriqué au Liban", note: "For locally produced SKUs only. Confirm applicable SKUs with manufacturer." },
  { zone: "Back panel tagline (optional)", en: "Real meat. Real protein. Nothing else.", ar: "لحم حقيقي. بروتين حقيقي. لا شيء آخر.", fr: "Vraie viande. Vraie protéine. Rien d'autre.", note: "Optional — include if space permits after regulatory requirements are met. Brand voice: direct, no fluff." },
];

const IDENTITY_DELIVERABLES = [
  { item: "Wordmark", desc: "Primary brand name in custom or selected typeface. Must work in Arabic script and Latin script as complementary pair — not translation, but a unified visual system.", required: true },
  { item: "Brand symbol / mark", desc: "A standalone icon that works without the wordmark. Must be legible at 15mm diameter (Halal mark size) and at billboard scale. Not illustrative — geometric or typographic preferred.", required: true },
  { item: "Arabic wordmark", desc: "Hand-crafted Arabic rendering of the brand name — not auto-transliterated. Commissioned from a calligrapher or Arabic type specialist if necessary.", required: true },
  { item: "Primary color palette", desc: "4 colors maximum. Each with Pantone, CMYK, RGB, and HEX references. Specify primary packaging application for each.", required: true },
  { item: "Typography system", desc: "Two typefaces: one display (brand name / headlines) and one functional (body copy / ingredients / regulatory text). Both must support Arabic and Latin scripts.", required: true },
  { item: "Brand guidelines document", desc: "Minimum 20-page PDF. Must include: correct usage, incorrect usage, color combinations, spacing rules, prohibited modifications, and approved bilingual/trilingual layouts.", required: true },
  { item: "Packaging artwork — SKU 01", desc: "Press-ready print file for single-serve pouch. All panels. CMYK + spot color if applicable. Bleed and trim marks included.", required: true },
  { item: "Packaging artwork — SKU 02", desc: "Press-ready print file for multi-serve resealable pouch. All panels. Same specifications.", required: true },
  { item: "Packaging mockups — 3D", desc: "Photorealistic 3D renders of both SKUs in context: gym counter, pharmacy shelf, hand-held. Minimum 5 angles per SKU.", required: true },
  { item: "Display unit design", desc: "Branded counter display unit design for gym and nutrition store placement. Must accommodate both SKUs. Supplied as print-ready file for local fabrication.", required: true },
  { item: "Leave-behind document design", desc: "Single A4 page, both sides, print-ready. Design matches brand identity. Content supplied by KITS.", required: true },
  { item: "Logo file suite", desc: "All formats: AI, EPS, SVG, PDF (vector), PNG (transparent, white, black — all at 300dpi minimum). All color variants.", required: true },
  { item: "Social media profile assets", desc: "Profile image, cover template, story template — even if digital channels are not priority, these must exist for future use. Size to current platform standards.", required: false },
];

const TIMELINE = [
  { week: "Week 1", task: "Designer briefing meeting with KITS. Brand name confirmed [PENDING BOARD]. Flavor name confirmed [PENDING BOARD]. Manufacturer nutritional panel received.", owner: "KITS + Designer" },
  { week: "Week 2–3", task: "Brand identity concepts presented — minimum 3 directions. KITS reviews and selects or consolidates direction. One round of revision.", owner: "Designer → KITS review" },
  { week: "Week 4", task: "Selected identity refined. Arabic wordmark developed. Color system finalized. Typography locked.", owner: "Designer" },
  { week: "Week 5–6", task: "Packaging artwork developed for both SKUs. All panels. MoPH compliance check by KITS. Regulatory text placed.", owner: "Designer → KITS compliance check" },
  { week: "Week 7", task: "3D mockups produced. Display unit designed. Leave-behind designed. All files packaged.", owner: "Designer" },
  { week: "Week 8", task: "Final review by KITS. Minor amends. Press-ready files delivered. Brand guidelines document completed and delivered.", owner: "Designer → KITS final approval" },
];

export default function BrandDesignBrief() {
  const [active, setActive] = useState("overview");
  const [expanded, setExpanded] = useState({});

  const toggle = (key: string) => setExpanded((p: any) => ({ ...p, [key]: !p[key] }));

  return (
    <div style={{
      fontFamily: "'Didot', 'Bodoni MT', 'Playfair Display', Georgia, serif",
      background: "#F5F1EB",
      minHeight: "100vh",
      color: "#1A1612",
    }}>

      {/* Header */}
      <div style={{
        background: "#1A1612",
        padding: "36px 48px 28px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Decorative lines */}
        <div style={{ position: "absolute", top: 0, right: 0, width: 300, height: "100%", opacity: 0.04,
          background: "repeating-linear-gradient(90deg, #C8A96E 0px, #C8A96E 1px, transparent 1px, transparent 20px)" }} />

        <div style={{ fontFamily: "'Courier New', Courier, monospace", fontSize: 10, color: "#5A4A38", letterSpacing: "0.4em", marginBottom: 12 }}>
          KITS ADVISORY GROUP · BRAND & PACKAGING DESIGN BRIEF · REF: KAG-JRK-006
        </div>
        <h1 style={{ margin: "0 0 6px", fontSize: "clamp(22px, 4vw, 40px)", fontWeight: 400, color: "#F5F1EB", letterSpacing: "0.02em", lineHeight: 1.1 }}>
          Brand & Packaging
          <br /><span style={{ color: "#C8A96E" }}>Design Brief</span>
        </h1>
        <p style={{ margin: "10px 0 0", fontSize: 13, color: "#7A6A58", fontFamily: "'Courier New', monospace" }}>
          Beef Jerky Venture — Lebanese Market Entry · For Designer Use
        </p>

        {/* Pending flag */}
        <div style={{
          marginTop: 20,
          display: "inline-flex", alignItems: "center", gap: 10,
          background: "#C8A96E18", border: "1px solid #C8A96E40",
          borderRadius: 3, padding: "8px 16px"
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#C8A96E" }} />
          <span style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: "#C8A96E", letterSpacing: "0.15em" }}>
            BRAND NAME & PRIMARY FLAVOR — PENDING BOARD APPROVAL
          </span>
        </div>
      </div>

      {/* Nav */}
      <div style={{
        background: "#1A1612",
        borderBottom: "1px solid #2A2018",
        display: "flex", flexWrap: "wrap", padding: "0 48px"
      }}>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)} style={{
            background: "transparent", border: "none",
            borderBottom: active === s.id ? "2px solid #C8A96E" : "2px solid transparent",
            color: active === s.id ? "#F5F1EB" : "#4A3A28",
            fontFamily: "'Courier New', monospace",
            fontSize: 10, letterSpacing: "0.15em",
            padding: "13px 16px 11px",
            cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap"
          }}>
            {s.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "36px 48px", maxWidth: 960 }}>

        {/* OVERVIEW */}
        {active === "overview" && (
          <div>
            <SectionHead label="PROJECT OVERVIEW" title="What We Are Building and Why" color="#C8A96E" />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
              {[
                { label: "CLIENT", value: "Beef Jerky Venture — Lebanon" },
                { label: "MARKET", value: "Lebanese Republic — Phase 1 launch" },
                { label: "MANAGING ADVISOR", value: "KITS Advisory Group" },
                { label: "REF", value: "KAG-JRK-006" },
                { label: "BRAND NAME", value: PENDING, pending: true },
                { label: "PRIMARY FLAVOR", value: PENDING_FLAVOR, pending: true },
                { label: "SKUs IN SCOPE", value: "2 (Single-serve pouch + Multi-serve resealable)" },
                { label: "LANGUAGES", value: "Arabic · English · French (trilingual)" },
                { label: "TARGET LAUNCH", value: "8 weeks from brand name confirmation" },
                { label: "DESIGNER BRIEFING", value: "Upon receipt of this document" },
              ].map((row, i) => (
                <div key={i} style={{
                  background: "#EFEBE3",
                  border: `1px solid ${row.pending ? "#C8A96E60" : "#DDD5C8"}`,
                  borderLeft: `3px solid ${row.pending ? "#C8A96E" : "#B8A890"}`,
                  borderRadius: 3, padding: "12px 16px"
                }}>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: "#8A7A68", letterSpacing: "0.15em", marginBottom: 4 }}>{row.label}</div>
                  <div style={{ fontSize: 13, color: row.pending ? "#C8A96E" : "#1A1612", fontStyle: row.pending ? "italic" : "normal" }}>{row.value}</div>
                </div>
              ))}
            </div>

            <Brief label="PRODUCT DESCRIPTION">
              A portioned, high-protein beef jerky product designed for the Lebanese fitness and health-conscious consumer. Clean ingredients, Halal-certified, locally produced component with imported source. The product is positioned as a serious nutrition tool — not a casual snack. The brand must command respect in a sports nutrition store while remaining approachable at gym counter level.
            </Brief>

            <Brief label="DESIGN MANDATE">
              This brand must look like it belongs on the shelf next to international premium brands — and outperform them on local relevance. It must communicate protein content within 2 seconds of first glance. It must be trilingual without looking cluttered. It must be Halal-certified without looking exclusively religious. It must be Lebanese without looking provincial. These are not contradictions — they are the design challenge.
            </Brief>

            <div style={{ marginTop: 24 }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#8A7A68", letterSpacing: "0.2em", marginBottom: 14 }}>BRAND PILLARS — NON-NEGOTIABLE</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {BRAND_PILLARS.map((p, i) => (
                  <div key={i} style={{ background: "#EFEBE3", border: "1px solid #DDD5C8", borderRadius: 3, padding: "14px 16px" }}>
                    <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: "#C8A96E", marginBottom: 6, letterSpacing: "0.1em" }}>{p.label}</div>
                    <p style={{ margin: 0, fontSize: 13, color: "#5A4A38", lineHeight: 1.7 }}>{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* NAMING */}
        {active === "naming" && (
          <div>
            <SectionHead label="BRAND NAME" title="Name Decision — Pending Board" color="#C8A96E" />

            <div style={{
              background: "#C8A96E15", border: "1px solid #C8A96E50",
              borderRadius: 4, padding: "20px 24px", marginBottom: 24
            }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#C8A96E", letterSpacing: "0.2em", marginBottom: 10 }}>
                ⚠ BOARD DECISION REQUIRED BEFORE DESIGN WORK BEGINS
              </div>
              <p style={{ margin: 0, fontSize: 14, color: "#7A6040", lineHeight: 1.8 }}>
                The brand name has not been confirmed. The board meeting will resolve this decision. Candidates have been researched and scored by KITS (see KAG-JRK-002). The designer should not begin wordmark development until the name is confirmed in writing by KITS. This brief documents all requirements the name must meet so the designer is briefed and ready to begin immediately upon confirmation.
              </p>
            </div>

            <Brief label="NAMING REQUIREMENTS — CONFIRMED">
              The brand name must simultaneously satisfy the following criteria. These are not preferences — they are commercial requirements derived from the Lebanese trilingual market and regulatory environment.
            </Brief>

            {[
              { req: "Arabic-rooted or language-neutral", detail: "The name must originate in Arabic or be genuinely language-neutral (coined word, symbol, alphanumeric). It must not be a transliteration of an English word or a Lebanese dialect term that does not translate. It must carry genuine meaning or genuine neutrality — nothing in between." },
              { req: "Trilingual phonetic viability", detail: "A Lebanese consumer speaking Arabic, English, or French must be able to say the name without instruction. This rules out names with sounds that exist in Arabic but not in French, or vice versa. Test: ask a speaker of each language to read the name cold, without coaching." },
              { req: "Trademarkable in Lebanon — Class 29", detail: "The name must not be descriptive of the product category (e.g., 'Beef', 'Protein', 'Jerky'). Descriptive terms cannot be trademarked. It must not conflict with existing registrations at the Ministry of Economy and Trade IP Directorate. IP check is mandatory before board confirmation." },
              { req: "Maximum 5 Latin characters / 4 Arabic letters", detail: "Brevity is a commercial imperative. Short names are more legible at small pack sizes, more memorable, and more ownable as marks. This is not a style preference — it is a brand equity and packaging functionality requirement." },
              { req: "No negative connotations in any of the three languages", detail: "The name must be screened by a native speaker of Lebanese Arabic, Lebanese French, and Lebanese English before confirmation. A name that sounds neutral in Arabic may carry an unintended meaning in the French or English hearing of a Lebanese consumer." },
              { req: "Visual identity potential — not purely verbal", detail: "The name must suggest a mark, a symbol, a visual anchor. Pure word names with no symbol potential are weaker in the long term. The best candidate has both verbal and visual identity built into its root." },
            ].map((item, i) => (
              <div key={i} style={{
                background: "#EFEBE3", border: "1px solid #DDD5C8",
                borderLeft: "3px solid #C8A96E",
                borderRadius: 3, marginBottom: 4, overflow: "hidden"
              }}>
                <button onClick={() => toggle(`name-${i}`)} style={{
                  width: "100%", background: "transparent", border: "none",
                  padding: "14px 18px", cursor: "pointer", textAlign: "left",
                  display: "flex", justifyContent: "space-between", alignItems: "center"
                }}>
                  <span style={{ fontSize: 13, color: "#1A1612" }}>{item.req}</span>
                  <span style={{ color: "#8A7A68", fontSize: 16 }}>{(expanded as any)[`name-${i}`] ? "−" : "+"}</span>
                </button>
                {(expanded as any)[`name-${i}`] && (
                  <div style={{ padding: "0 18px 16px", borderTop: "1px solid #DDD5C8" }}>
                    <p style={{ margin: "12px 0 0", fontSize: 13, color: "#5A4A38", lineHeight: 1.8 }}>{item.detail}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* IDENTITY */}
        {active === "identity" && (
          <div>
            <SectionHead label="VISUAL IDENTITY" title="Identity System Direction" color="#C8A96E" />

            <Brief label="AESTHETIC DIRECTION">
              The brand occupies a space between raw athletic performance and Lebanese cultural precision. The visual language should feel like it was designed by a Lebanese designer who trains — not by a European agency approximating the Middle East, and not by an American sports brand applying a generic performance template. The reference point is not Jack Link's (mass market casual) or Barebells (Nordic premium) — it is a brand that has never existed before, designed entirely for this market.
            </Brief>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#8A7A68", letterSpacing: "0.2em", marginBottom: 14 }}>COLOR SYSTEM DIRECTION</div>
              {COLOR_DIRECTION.map((c, i) => (
                <div key={i} style={{
                  background: "#EFEBE3", border: "1px solid #DDD5C8",
                  borderRadius: 3, padding: "16px 18px", marginBottom: 6
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                    <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: "#C8A96E" }}>{c.name}</div>
                    <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#8A7A68" }}>{c.purpose}</div>
                  </div>
                  <p style={{ margin: "0 0 8px", fontSize: 13, color: "#3A2A18", lineHeight: 1.7 }}>{c.direction}</p>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#E07B6A" }}>
                    AVOID: {c.avoid}
                  </div>
                </div>
              ))}
            </div>

            <Brief label="TYPOGRAPHY DIRECTION">
              Two typefaces. Display typeface: must work in both Arabic and Latin scripts with genuine typographic quality in both — not a Latin font with a generic Arabic companion. The Arabic script should feel as designed as the Latin, not like an afterthought. Body / functional typeface: maximum legibility at small sizes (8pt ingredient lists). High x-height. Clean at 6pt for MoPH-mandated text. Must include Arabic support.
            </Brief>

            <Brief label="WHAT THIS BRAND IS NOT">
              Not a supplement brand — no neon, no lightning bolts, no aggressive sans-serif shouting. Not a mass-market snack brand — no cartoon, no playful color palette, no smiling face. Not an imported European brand repackaged — no Helvetica, no cold minimalism, no flag of another country anywhere on the pack. This is its own thing, from its own place, for its own market.
            </Brief>

            <div style={{ background: "#1A1612", borderRadius: 4, padding: "20px 24px", marginTop: 20 }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#C8A96E", letterSpacing: "0.2em", marginBottom: 10 }}>SINGLE MOST IMPORTANT DESIGN INSTRUCTION</div>
              <p style={{ margin: 0, fontSize: 14, color: "#C8BCA8", lineHeight: 1.85, fontFamily: "Didot, Bodoni MT, Georgia, serif" }}>
                A consumer in a sports nutrition store in Achrafieh must be able to read the protein content of this product from 1 meter away without touching the pack. If the protein number is not the first thing their eye lands on — after the brand name — the packaging has failed its primary commercial function. Everything else is subordinate to this requirement.
              </p>
            </div>
          </div>
        )}

        {/* PACKAGING */}
        {active === "packaging" && (
          <div>
            <SectionHead label="PACKAGING SPECIFICATIONS" title="SKU Format & Visual Hierarchy" color="#7EB5A6" />

            {PACKAGING_SPECS.map((sku, i) => (
              <div key={i} style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{
                    fontFamily: "'Courier New', monospace", fontSize: 10,
                    color: sku.color, background: `${sku.color}15`,
                    border: `1px solid ${sku.color}40`,
                    padding: "4px 12px", borderRadius: 2, letterSpacing: "0.15em"
                  }}>
                    {sku.sku}
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
                  {[
                    ["Format", sku.format], ["Net Weight", sku.weight],
                    ["Dimensions", sku.dimensions], ["Material", sku.material],
                    ["Closure", sku.closure], ["Primary Channel", sku.channel],
                  ].map(([k, v], j) => (
                    <div key={j} style={{ background: "#EFEBE3", border: "1px solid #DDD5C8", borderRadius: 3, padding: "10px 14px" }}>
                      <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: "#8A7A68", marginBottom: 4, letterSpacing: "0.1em" }}>{k}</div>
                      <div style={{ fontSize: 12, color: "#3A2A18", lineHeight: 1.5 }}>{v}</div>
                    </div>
                  ))}
                </div>

                <div style={{ background: "#EFEBE3", border: `1px solid ${sku.color}40`, borderLeft: `3px solid ${sku.color}`, borderRadius: 3, padding: "14px 18px" }}>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: sku.color, letterSpacing: "0.15em", marginBottom: 10 }}>FRONT PANEL VISUAL HIERARCHY</div>
                  {sku.hierarchy.map((h, j) => (
                    <div key={j} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                      <span style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: sku.color, flexShrink: 0, marginTop: 2 }}>
                        {String(j + 1).padStart(2, "0")}
                      </span>
                      <p style={{ margin: 0, fontSize: 13, color: "#3A2A18", lineHeight: 1.6 }}>{h}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* COMPLIANCE */}
        {active === "compliance" && (
          <div>
            <SectionHead label="REGULATORY COMPLIANCE" title="Mandatory Packaging Elements — MoPH" color="#E07B6A" />

            <div style={{
              background: "#E07B6A15", border: "1px solid #E07B6A40",
              borderRadius: 4, padding: "16px 20px", marginBottom: 20
            }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#E07B6A", marginBottom: 8 }}>COMPLIANCE WARNING</div>
              <p style={{ margin: 0, fontSize: 13, color: "#7A4A40", lineHeight: 1.75 }}>
                No packaging artwork may be sent to print without KITS compliance sign-off. MoPH registration number must be confirmed before artwork is finalized — printing packaging without it creates a non-compliant batch that cannot be legally sold. The designer is responsible for leaving correctly sized placeholder zones for all elements marked [PENDING].
              </p>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 640 }}>
                <thead>
                  <tr style={{ background: "#1A1612" }}>
                    {["Element", "Language Requirement", "Status", "Pack Zone"].map((h, i) => (
                      <th key={i} style={{
                        fontFamily: "'Courier New', monospace", fontSize: 9,
                        color: "#5A4A38", letterSpacing: "0.1em",
                        padding: "10px 14px", textAlign: "left",
                        borderBottom: "2px solid #C8A96E40"
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MANDATORY_ELEMENTS.map((el, i) => {
                    const isPending = el.requirement.includes("PENDING") || el.item.includes("MoPH registration") || el.item.includes("Halal");
                    return (
                      <tr key={i} style={{ borderBottom: "1px solid #DDD5C8", background: i % 2 === 0 ? "#F5F1EB" : "#EFEBE3" }}>
                        <td style={{ padding: "10px 14px", color: "#1A1612", lineHeight: 1.4 }}>{el.item}</td>
                        <td style={{ padding: "10px 14px", fontFamily: "'Courier New', monospace", fontSize: 11, color: "#5A4A38" }}>{el.lang}</td>
                        <td style={{ padding: "10px 14px" }}>
                          <span style={{
                            fontFamily: "'Courier New', monospace", fontSize: 9,
                            color: isPending ? "#C8A96E" : "#6A8A6A",
                            background: isPending ? "#C8A96E15" : "#6A8A6A15",
                            border: `1px solid ${isPending ? "#C8A96E40" : "#6A8A6A40"}`,
                            padding: "2px 8px", borderRadius: 2
                          }}>
                            {el.requirement.includes("do not print") ? "⚠ DO NOT PRINT YET" : isPending ? "PENDING" : "CONFIRMED REQUIRED"}
                          </span>
                        </td>
                        <td style={{ padding: "10px 14px", fontFamily: "'Courier New', monospace", fontSize: 11, color: "#5A4A38" }}>{el.zone}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* COPY */}
        {active === "copywriting" && (
          <div>
            <SectionHead label="COPY & LANGUAGE" title="All Packaging Text — Trilingual" color="#9B8EC4" />

            <Brief label="LANGUAGE POLICY">
              Arabic is the primary regulatory language and must appear on all mandatory elements. English and French are co-primary commercial languages — both appear on all consumer-facing elements. The hierarchy on-pack is: Arabic first (regulatory compliance), English and French as co-equals (commercial communication). The brand voice in all three languages is identical: direct, precise, confident. No exclamation marks. No superlatives that cannot be proven. No marketing language that a label checker would flag as unverifiable.
            </Brief>

            <div style={{ marginTop: 20 }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#8A7A68", letterSpacing: "0.2em", marginBottom: 14 }}>
                APPROVED COPY — BY PACK ZONE
              </div>
              {COPY_LINES.map((line, i) => (
                <div key={i} style={{
                  background: "#EFEBE3", border: "1px solid #DDD5C8",
                  borderRadius: 3, padding: "14px 18px", marginBottom: 4
                }}>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#9B8EC4", marginBottom: 10, letterSpacing: "0.1em" }}>
                    {line.zone.toUpperCase()}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 1fr 1fr", gap: 12, marginBottom: 8, alignItems: "start" }}>
                    {[
                      ["EN", line.en],
                      ["AR", line.ar],
                      ["FR", line.fr],
                    ].map(([lang, text]) => (
                      <div key={lang} style={{ gridColumn: lang === "EN" ? "2" : lang === "AR" ? "3" : "4" }}>
                        <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: "#8A7A68", marginBottom: 4 }}>{lang}</div>
                        <div style={{
                          fontSize: 13, color: text.startsWith("[") ? "#C8A96E" : "#1A1612",
                          fontStyle: text.startsWith("[") ? "italic" : "normal",
                          direction: lang === "AR" ? "rtl" : "ltr"
                        }}>
                          {text}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#6A5A48", borderTop: "1px solid #DDD5C8", paddingTop: 8 }}>
                    NOTE: {line.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRODUCTION */}
        {active === "production" && (
          <div>
            <SectionHead label="PRINT & PRODUCTION" title="Technical Specifications for Print" color="#C8A96E" />

            {[
              { label: "File format", value: "Press-ready PDF/X-1a or PDF/X-4. All fonts embedded or converted to outlines. All images linked and included at 300dpi minimum." },
              { label: "Color mode", value: "CMYK throughout. If spot colors are used (Pantone), clearly labeled with Pantone reference. No RGB values in print files." },
              { label: "Bleed", value: "3mm bleed on all sides. Confirm with packaging printer before file preparation — some flexible packaging printers require 5mm." },
              { label: "Safe zone", value: "5mm inside trim edge for all critical text and logos. Nothing important within 8mm of edge." },
              { label: "Resolution", value: "All raster elements at 300dpi minimum at final size. Logos and wordmarks as vector elements — never rasterized." },
              { label: "Overprint settings", value: "Check all black text for overprint. 100% black text should overprint. Rich black ([CMYK values from printer]) for large black areas only." },
              { label: "Dieline", value: "Provided by packaging printer. Designer must request dieline template before beginning artwork. Artwork built to exact dieline dimensions." },
              { label: "Matte finish", value: "Exterior surface: matte laminate. Confirm with printer that matte laminate is compatible with selected ink coverage. High-coverage dark backgrounds may require specific matte formulation." },
              { label: "Print run quantity", value: "[TBC with manufacturer once SKU sizes confirmed] — coordinate with KITS before specifying print quantity to printer." },
              { label: "Proofing", value: "Physical proof (not digital) mandatory before print approval. KITS must approve physical proof. Color deviation >5% from approved proof is grounds for reprint at printer's cost — include in print contract." },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: 20,
                padding: "12px 0", borderBottom: "1px solid #DDD5C8"
              }}>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: "#8A7A68", minWidth: 160, flexShrink: 0 }}>{item.label}</div>
                <div style={{ fontSize: 13, color: "#3A2A18", lineHeight: 1.7 }}>{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {/* DELIVERABLES */}
        {active === "deliverables" && (
          <div>
            <SectionHead label="DESIGNER DELIVERABLES" title="Complete Scope & Timeline" color="#7EB5A6" />

            <div style={{ marginBottom: 24 }}>
              {IDENTITY_DELIVERABLES.map((d, i) => (
                <div key={i} style={{
                  background: "#EFEBE3",
                  border: `1px solid ${d.required ? "#DDD5C8" : "#E8E0D8"}`,
                  borderLeft: `3px solid ${d.required ? "#7EB5A6" : "#B8A890"}`,
                  borderRadius: 3, padding: "14px 18px", marginBottom: 4,
                  display: "flex", gap: 14, alignItems: "flex-start"
                }}>
                  <span style={{
                    fontFamily: "'Courier New', monospace", fontSize: 9,
                    color: d.required ? "#7EB5A6" : "#8A7A68",
                    background: d.required ? "#7EB5A615" : "transparent",
                    border: `1px solid ${d.required ? "#7EB5A640" : "transparent"}`,
                    padding: "2px 6px", borderRadius: 2, flexShrink: 0, marginTop: 2
                  }}>
                    {d.required ? "REQUIRED" : "OPTIONAL"}
                  </span>
                  <div>
                    <div style={{ fontSize: 13, color: "#1A1612", marginBottom: 4 }}>{d.item}</div>
                    <p style={{ margin: 0, fontSize: 12, color: "#5A4A38", lineHeight: 1.7 }}>{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 28 }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#8A7A68", letterSpacing: "0.2em", marginBottom: 14 }}>
                PROJECT TIMELINE — 8 WEEKS FROM BRAND NAME CONFIRMATION
              </div>
              {TIMELINE.map((t, i) => (
                <div key={i} style={{
                  display: "flex", gap: 16,
                  padding: "14px 0", borderBottom: "1px solid #DDD5C8",
                  alignItems: "flex-start"
                }}>
                  <div style={{
                    fontFamily: "'Courier New', monospace", fontSize: 11,
                    color: "#C8A96E", minWidth: 80, flexShrink: 0
                  }}>{t.week}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: "0 0 4px", fontSize: 13, color: "#1A1612", lineHeight: 1.6 }}>{t.task}</p>
                    <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#8A7A68" }}>{t.owner}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: "#1A1612", borderRadius: 4, padding: "20px 24px", marginTop: 24 }}>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#C8A96E", marginBottom: 10 }}>PAYMENT STRUCTURE RECOMMENDATION</div>
              <p style={{ margin: 0, fontSize: 13, color: "#8A7A68", lineHeight: 1.8 }}>
                50% upon project commencement and brand name confirmation. 25% upon packaging artwork approval (before 3D mockups). 25% upon final delivery of all press-ready files and brand guidelines. No final files released until final payment is received. All intellectual property transfers to the client upon receipt of final payment — confirm in writing in the design contract.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        background: "#1A1612",
        padding: "14px 48px",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8
      }}>
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#3A2A18", letterSpacing: "0.15em" }}>
          KITS ADVISORY GROUP · BRAND & PACKAGING DESIGN BRIEF · CONFIDENTIAL
        </span>
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: "#3A2A18" }}>KAG-JRK-006</span>
      </div>
    </div>
  );
}

function SectionHead({ label, title, color }: { label: string; title: string; color: string }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ fontFamily: "'Courier New', monospace", fontSize: 10, color: color, letterSpacing: "0.25em", marginBottom: 8 }}>{label}</div>
      <h2 style={{ margin: 0, fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 400, color: "#1A1612", lineHeight: 1.2 }}>{title}</h2>
      <div style={{ marginTop: 12, height: 1, background: `linear-gradient(to right, ${color}, transparent)`, maxWidth: 320 }} />
    </div>
  );
}

function Brief({ label, children }: { label: string; children: any }) {
  return (
    <div style={{ background: "#EFEBE3", border: "1px solid #DDD5C8", borderRadius: 3, padding: "16px 20px", marginBottom: 12 }}>
      <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: "#8A7A68", letterSpacing: "0.2em", marginBottom: 8 }}>{label}</div>
      <p style={{ margin: 0, fontSize: 13, color: "#3A2A18", lineHeight: 1.8 }}>{children}</p>
    </div>
  );
}

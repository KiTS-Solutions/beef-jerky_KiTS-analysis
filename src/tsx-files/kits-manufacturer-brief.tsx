import { useState } from "react";

const PENDING = "[BOARD DECISION PENDING]";

const SECTIONS = [
  { id: "overview", label: "Brief Overview" },
  { id: "flavor", label: "Flavor Specification" },
  { id: "nutrition", label: "Nutritional Requirements" },
  { id: "halal", label: "Halal Compliance" },
  { id: "quality", label: "Quality Standards" },
  { id: "shelf", label: "Shelf Life & Packaging" },
  { id: "supply", label: "Supply Agreement" },
  { id: "testing", label: "Testing & Approval" },
];

const FLAVOR_PROFILE = {
  name: PENDING,
  concept: "Lebanese BBQ — a char-forward, smoky profile rooted in Levantine flavour tradition, distinctly different from American BBQ by the absence of heavy molasses sweetness and the presence of native spice depth.",
  components: [
    {
      element: "Base — Smokiness",
      direction: "Dry char smoke note, not liquid smoke. The Maillard reaction from the drying/cooking process should be the primary smoke source. If smoke flavouring is required, use natural hardwood smoke concentrate only — no artificial smoke flavouring.",
      critical: true,
    },
    {
      element: "Sweetness Control",
      direction: "Zero added sugar. Zero artificial sweeteners. The product must achieve a balanced flavour profile without any sweetening agent. Natural sweetness from the beef itself and from any fruit-based marinade component (pomegranate concentrate, tamarind) at minimal levels only. If any sweetening is structurally necessary for the marinade process, use date paste at the minimum effective quantity — to be declared on ingredient list.",
      critical: true,
    },
    {
      element: "Heat — Aleppo Pepper",
      direction: "Primary heat source: Aleppo pepper (فلفل حلبي) or a close equivalent available in the manufacturer's supply chain. Aleppo pepper provides fruity, sun-dried warmth — not sharp cayenne heat. Intensity level: medium. Consumer should notice warmth in the back of the throat after chewing — not immediately on contact. The Lebanese consumer is familiar with this heat profile from everyday cooking.",
      critical: true,
    },
    {
      element: "Brightness — Sumac",
      direction: "Sumac (سماق) as a finishing note — the characteristic Levantine sourness that lifts the profile and prevents flavour fatigue. Applied in dry rub form. Quantity: sufficient to register on the palate without dominating. 1–2% of dry marinade weight as starting point for development.",
      critical: false,
    },
    {
      element: "Depth — Pomegranate Back-note",
      direction: "Pomegranate molasses concentrate or pomegranate powder at very low levels — function is to add Levantine sourness and complexity, not sweetness. If pomegranate molasses is used, the sugar content it contributes must be declared and must remain within acceptable range for a zero-added-sugar claim. If incompatible with the claim, replace with sumac only for sourness depth.",
      critical: false,
    },
    {
      element: "Savoury Foundation — Alliums",
      direction: "Dried garlic and dried onion as foundational savoury base. These are standard in the category globally and should be present. Quantity: sufficient to provide savoury depth without producing garlic breath as a primary flavour note.",
      critical: false,
    },
    {
      element: "Salt Level",
      direction: "Salt must be present as a preservative and flavour carrier but must not be the dominant taste note. Target: pleasant salinity, not aggressive saltiness. Wild West Original (3.85–3.9g salt per 100g) and Jack Link's are both too high for the clean-label positioning we require. Target: below 3g salt per 100g in final product. This is both a health positioning requirement and a competitive differentiator.",
      critical: true,
    },
    {
      element: "Preservatives",
      direction: "No sodium nitrite. No potassium sorbate. No artificial preservatives of any kind. If a preservative is structurally required for shelf life at the target duration, use natural alternatives: vinegar (apple cider), cultured celery extract as a last resort (must be declared), or achieve shelf life through pH control and water activity reduction alone. Discuss with manufacturer before any preservative decision is made.",
      critical: true,
    },
  ],
  development: [
    "Stage 1: Manufacturer produces 3 flavour variations — mild, medium, bold — based on the Lebanese BBQ profile above. Minimum 200g sample per variation.",
    "Stage 2: KITS conducts blind tasting with 10 target consumers (gym members, 18–40, mixed gender) across 3 sessions. Feedback documented on standardised form.",
    "Stage 3: Manufacturer produces one consolidated version incorporating tasting feedback. Second round of consumer testing.",
    "Stage 4: KITS and client approve final flavour profile. Written sign-off before first commercial batch.",
    "Stage 5: Approved flavour profile documented in a Flavour Specification Sheet signed by both parties. This document governs all future production batches.",
  ],
};

const NUTRITION_REQUIREMENTS = [
  {
    parameter: "Protein content",
    target: "Minimum 25g per 100g of finished product",
    rationale: "Competitive positioning requires meaningful protein superiority over imported competitors. Wild West delivers 29.9–35.9g/100g. Jack Link's delivers ~42g/100g. Our target must be competitive in this range while maintaining clean ingredients.",
    status: "LAB VERIFICATION REQUIRED — submit actual panel to KITS before any claim is printed",
    critical: true,
  },
  {
    parameter: "Calorie content",
    target: "Target: 200–280 kcal per 100g",
    rationale: "Lean beef jerky at minimal processing should naturally fall in this range. Higher calorie content suggests excess fat or added sugar. Lower suggests measurement anomaly — retest.",
    status: "LAB VERIFICATION REQUIRED",
    critical: true,
  },
  {
    parameter: "Added sugar",
    target: "ZERO — non-negotiable",
    rationale: "This is a core brand claim and a primary competitive differentiator. Every competitor in our category has a sugar problem. We do not. This cannot be compromised under any circumstances, including for flavour development purposes.",
    status: "CONFIRMED REQUIREMENT — governs all flavour development decisions",
    critical: true,
  },
  {
    parameter: "Total carbohydrates",
    target: "Below 10g per 100g (target: below 5g)",
    rationale: "Low carbohydrate content is required for keto, low-carb, and calorie-managed consumer segments. High carbs from marinade components undermine the fitness positioning.",
    status: "LAB VERIFICATION REQUIRED",
    critical: true,
  },
  {
    parameter: "Total fat",
    target: "Below 8g per 100g",
    rationale: "Lean cut selection and proper trimming should achieve this naturally. Excess fat also reduces shelf life.",
    status: "LAB VERIFICATION REQUIRED",
    critical: false,
  },
  {
    parameter: "Saturated fat",
    target: "Below 3g per 100g",
    rationale: "Health-positioned product for fitness consumers. Must meet the threshold for a reasonable 'low saturated fat' positioning.",
    status: "LAB VERIFICATION REQUIRED",
    critical: false,
  },
  {
    parameter: "Sodium / Salt",
    target: "Below 3g salt per 100g (1,200mg sodium)",
    rationale: "Competitive differentiation from Wild West (3.85g) and Jack Link's (high sodium). Health-conscious consumer segment is increasingly sodium-aware.",
    status: "LAB VERIFICATION REQUIRED — adjust recipe if above target",
    critical: true,
  },
  {
    parameter: "Fibre",
    target: "Negligible — not a fibre product",
    rationale: "No false fibre claims. Beef jerky is not a significant fibre source and should not be positioned as one.",
    status: "Declare accurately on nutritional table",
    critical: false,
  },
];

const HALAL_REQUIREMENTS = [
  {
    req: "Beef sourcing — slaughter method",
    detail: "All beef used in production must be sourced from a Halal-certified slaughterhouse. Certificate of Halal slaughter from the supplier must be provided to KITS for every production batch. This is non-negotiable and is the foundation of the entire Halal certification.",
    doc: "Halal slaughter certificate from beef supplier",
  },
  {
    req: "Ingredient screening — full list",
    detail: "Every ingredient in the formulation — including flavourings, spice carriers, anti-caking agents, and processing aids — must be screened for Halal compliance. Any ingredient derived from pork, alcohol, or non-Halal slaughter is prohibited. This includes soy sauce (often contains alcohol in the brewing process), certain enzymes, and certain emulsifiers.",
    doc: "Halal status declaration for every ingredient from each supplier",
  },
  {
    req: "Production line — cross-contamination",
    detail: "The production line used for our product must not process pork or alcohol-containing products in the same session without full line cleaning between runs. If the manufacturer processes pork products, a dedicated cleaning protocol must be documented and approved by the certifying body before Halal certification will be issued.",
    doc: "Cleaning protocol documentation",
  },
  {
    req: "Certifying body — Lebanon",
    detail: "Certification must be issued by Dar Al-Fatwa Lebanon or an Islamic authority recognized by Dar Al-Fatwa. A self-declared Halal claim is not acceptable and creates legal liability. If the manufacturer is abroad, certification from an internationally recognized Islamic authority (ESMA UAE, JAKIM Malaysia, IFANCA) will be accepted if it can be validated by a Lebanese authority.",
    doc: "Halal certificate from recognized authority",
  },
  {
    req: "Annual audit requirement",
    detail: "Halal certification requires annual renewal and periodic unannounced audits of the production facility. The manufacturer must agree to cooperate fully with audit requirements as a condition of the supply agreement.",
    doc: "Written acceptance of audit cooperation in supply agreement",
  },
  {
    req: "Halal mark on packaging",
    detail: "The specific Halal mark issued by the certifying body must appear on all packaging artwork. The mark design is provided by the certifying body — it cannot be designed by the brand. Packaging artwork cannot go to print until the Halal certificate is issued and the correct mark is provided.",
    doc: "Certification mark file from certifying body",
  },
];

const QUALITY_STANDARDS = [
  {
    stage: "Raw Material Inspection",
    checks: [
      "Beef cut specification: lean cuts only (silverside, topside, or manufacturer-specified equivalent). Minimum lean-to-fat ratio confirmed per batch.",
      "Beef freshness: supplier delivery temperature log reviewed. Reject if temperature exceeds 4°C at delivery.",
      "Ingredient lot numbers recorded for full traceability.",
      "Halal slaughter certificate for beef lot — reviewed before production begins.",
    ],
  },
  {
    stage: "In-Process Controls",
    checks: [
      "Marinade recipe: weighed ingredients per approved Flavour Specification Sheet. No deviation without written KITS approval.",
      "Marination time: minimum [TBC with manufacturer] hours. Maximum [TBC]. Document start and end time for every batch.",
      "Drying temperature and duration: per approved process specification. Temperature log kept for every batch.",
      "Water activity measurement: target Aw < 0.85 for shelf stability at ambient temperature. Test every batch.",
    ],
  },
  {
    stage: "Finished Product Testing",
    checks: [
      "Nutritional analysis: full panel per SKU. First production batch: third-party accredited lab. Subsequent batches: internal testing with annual third-party verification.",
      "Microbiological testing: per Lebanese food safety standards. Total plate count, E. coli, Salmonella, Listeria. Retain results for every batch.",
      "Organoleptic review: KITS representative tastes from every commercial batch before shipment approval. Deviation from approved flavour profile triggers batch hold.",
      "Weight check: net weight per pack within ±2% of declared weight on every batch. 10-unit minimum weight sample per production run.",
    ],
  },
  {
    stage: "Batch Documentation",
    checks: [
      "Batch number assigned to every production run. Format: [YYYYMMDD-SKU-LOT].",
      "Retain minimum 200g sample from every batch for 12 months from production date.",
      "Full batch record retained for 3 years: raw material lots, process logs, QC results, dispatch records.",
      "Certificate of Analysis issued by manufacturer for every batch before delivery to KITS.",
    ],
  },
];

const SUPPLY_TERMS = [
  { term: "Minimum Order Quantity (MOQ)", detail: "Phase 1 (Months 1–3): [TBC based on manufacturer capacity and first batch sizing — target 60–90 days sell-through]. Confirm exact units with manufacturer before budget approval. Subsequent orders: minimum [TBC] units per SKU. No single batch below minimum without written agreement." },
  { term: "Lead time", detail: "Standard lead time from order placement to delivery: [TBC — target 10–14 days for locally produced SKU, 21–28 days for imported component]. Confirm in writing. KITS requires confirmed lead time before setting delivery schedules with trade accounts." },
  { term: "Pricing structure", detail: "Fixed cost-per-unit agreed in writing for a minimum 6-month period. Any price change requires 30 days written notice minimum. Price changes trigger a renegotiation right for KITS. USD-denominated pricing only." },
  { term: "Payment terms", detail: "To be negotiated. KITS target: Net 30 from delivery on first three orders, then Net 45 as relationship matures. First order: 50% upfront, 50% on delivery. Confirm with manufacturer." },
  { term: "Quality rejection protocol", detail: "KITS retains the right to reject any batch that does not meet the specifications in this document. Rejected batches: manufacturer bears cost of replacement or refund. Rejection must be communicated within 5 business days of delivery. Retain rejected batch samples for dispute resolution." },
  { term: "Exclusivity", detail: "KITS requests a right of first refusal on any equivalent product (same format, same positioning) the manufacturer considers producing for another Lebanese client. Full exclusivity to be negotiated based on volume commitments. Discuss at supply agreement stage." },
  { term: "Flavour recipe ownership", detail: "The approved Flavour Specification Sheet and Lebanese BBQ recipe developed jointly with KITS is the intellectual property of the client venture. The manufacturer may not produce this specific flavour profile for any other client. This must be written into the supply agreement." },
  { term: "Confidentiality", detail: "All formulation information, pricing, client identity, and commercial terms are confidential. Manufacturer may not disclose any information about this product or client to any third party without written consent." },
  { term: "Minimum contract term", detail: "12 months from first commercial batch. Renewable by mutual agreement. Termination requires 60 days written notice after month 6." },
];

const TESTING_SEQUENCE = [
  { phase: "Pre-production", timing: "Before any commercial batch", items: ["Ingredient Halal status declarations received and reviewed", "Beef sourcing Halal certificate confirmed", "Production line cross-contamination protocol approved", "Flavour development samples approved by KITS (blind tasting completed)", "Approved Flavour Specification Sheet signed by both parties"] },
  { phase: "First batch — pilot", timing: "First commercial production run", items: ["Third-party nutritional analysis — full panel (LIBNOR or accredited private lab)", "Microbiological testing — full panel", "Water activity measurement — every unit batch", "Organoleptic review — KITS representative in person or sample courier", "Shelf life accelerated testing initiated (real-time and accelerated conditions)", "Weight verification — 10-unit sample"] },
  { phase: "MoPH submission", timing: "Immediately after lab results confirmed", items: ["Lab results submitted with MoPH application", "Label proof submitted for MoPH review", "Halal certificate attached to submission", "Nutritional table verified against lab results — exact match required", "No discrepancy between declared values and lab results > 5%"] },
  { phase: "Ongoing — every batch", timing: "Every production run", items: ["Internal nutritional and microbiological testing", "Weight verification", "Organoleptic review — KITS approval before delivery", "Batch documentation completed and retained", "Certificate of Analysis issued to KITS on delivery"] },
  { phase: "Annual", timing: "Every 12 months", items: ["Third-party nutritional verification — full panel", "Halal certification renewal audit", "MoPH registration renewal if required", "Supply agreement review and renewal", "Shelf life data review — update if storage conditions or recipe have changed"] },
];

export default function ManufacturerBrief() {
  const [active, setActive] = useState("overview");
  const [expanded, setExpanded] = useState({});

  const toggle = (key: string) => setExpanded((p: any) => ({ ...p, [key]: !p[key] }));

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#0C0F0E",
      minHeight: "100vh",
      color: "#D8E0D8",
    }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(160deg, #0A0E0D 0%, #0E1210 100%)",
        borderBottom: "1px solid #1A2420",
        padding: "32px 44px 24px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Grid texture */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.03,
          backgroundImage: "linear-gradient(#6A9A80 1px, transparent 1px), linear-gradient(90deg, #6A9A80 1px, transparent 1px)",
          backgroundSize: "24px 24px" }} />

        <div style={{ fontFamily: "monospace", fontSize: 10, color: "#2A4A38", letterSpacing: "0.35em", marginBottom: 10 }}>
          KITS ADVISORY GROUP · MANUFACTURER TECHNICAL BRIEF · REF: KAG-JRK-007 · CONFIDENTIAL
        </div>
        <h1 style={{ margin: "0 0 6px", fontSize: "clamp(20px, 3.5vw, 34px)", fontWeight: 400, color: "#D8E0D8", lineHeight: 1.15 }}>
          Manufacturer Technical Brief
        </h1>
        <p style={{ margin: "0 0 16px", fontSize: 13, color: "#5A7A68", fontFamily: "Georgia, serif" }}>
          Beef Jerky Venture · Lebanese Market · Flavour, Quality, Halal & Supply Standards
        </p>

        {/* Status pills */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Pill color="#C8A96E" label="PRIMARY FLAVOR — BOARD PENDING" />
          <Pill color="#C8A96E" label="BRAND NAME — BOARD PENDING" />
          <Pill color="#7EB5A6" label="ALL OTHER SPECS — CONFIRMED" />
        </div>
      </div>

      {/* Nav */}
      <div style={{
        background: "#090C0B",
        borderBottom: "1px solid #14201A",
        display: "flex", flexWrap: "wrap", padding: "0 44px"
      }}>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setActive(s.id)} style={{
            background: "transparent", border: "none",
            borderBottom: active === s.id ? "2px solid #7EB5A6" : "2px solid transparent",
            color: active === s.id ? "#D8E0D8" : "#2A4A38",
            fontFamily: "monospace", fontSize: 10, letterSpacing: "0.15em",
            padding: "13px 16px 11px",
            cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap"
          }}>
            {s.label.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ padding: "32px 44px", maxWidth: 960 }}>

        {/* OVERVIEW */}
        {active === "overview" && (
          <div>
            <SecHead label="BRIEF OVERVIEW" title="What We Need and Why" color="#7EB5A6" />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
              {[
                { k: "CLIENT", v: "Beef Jerky Venture — Lebanon" },
                { k: "MANAGING PARTY", v: "KITS Advisory Group" },
                { k: "PRODUCT TYPE", v: "Portioned Beef Jerky — high protein, clean label" },
                { k: "TARGET MARKET", v: "Lebanese Republic + GCC (future)" },
                { k: "BRAND NAME", v: PENDING, p: true },
                { k: "PRIMARY FLAVOR", v: PENDING, p: true },
                { k: "SECONDARY FLAVOR", v: PENDING, p: true },
                { k: "SKU COUNT", v: "2 (single-serve + multi-serve)" },
                { k: "HALAL CERTIFICATION", v: "Mandatory — Dar Al-Fatwa Lebanon" },
                { k: "LAUNCH TARGET", v: "Phase 1 — Gyms & Sports Nutrition Stores" },
              ].map((row, i) => (
                <div key={i} style={{
                  background: "#0E1410",
                  border: `1px solid ${row.p ? "#C8A96E30" : "#1A2820"}`,
                  borderLeft: `2px solid ${row.p ? "#C8A96E" : "#2A4A38"}`,
                  borderRadius: 3, padding: "10px 14px"
                }}>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: "#2A4A38", marginBottom: 4, letterSpacing: "0.1em" }}>{row.k}</div>
                  <div style={{ fontSize: 13, color: row.p ? "#C8A96E" : "#A8C8A8", fontStyle: row.p ? "italic" : "normal" }}>{row.v}</div>
                </div>
              ))}
            </div>

            <GreenBox title="PURPOSE OF THIS DOCUMENT">
              This brief communicates the complete technical, quality, regulatory, and commercial requirements that the manufacturer must meet for every production batch. It governs the relationship between the manufacturer and KITS Advisory Group on behalf of the client venture. Any deviation from these specifications requires written approval from KITS before implementation.
            </GreenBox>

            <GreenBox title="PRODUCT POSITIONING — WHAT THE MANUFACTURER MUST UNDERSTAND">
              This product competes directly against imported beef jerky brands (Jack Link's USA, Wild West UK) in the Lebanese market. Those products contain added sugar, sodium nitrite preservatives, soy sauce with Halal ambiguity, and English-only packaging. Our product wins on every dimension they fail. The manufacturer's role is to produce a product that is factually, demonstrably cleaner, higher-protein, Halal-certified, and locally relevant. Every specification in this brief exists for a commercial reason — not as an arbitrary restriction.
            </GreenBox>
          </div>
        )}

        {/* FLAVOR */}
        {active === "flavor" && (
          <div>
            <SecHead label="FLAVOUR SPECIFICATION" title="Lebanese BBQ Profile — Development Brief" color="#7EB5A6" />

            <div style={{
              background: "#C8A96E12", border: "1px solid #C8A96E30",
              borderRadius: 4, padding: "16px 20px", marginBottom: 22
            }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#C8A96E", marginBottom: 8 }}>PRIMARY FLAVOR NAME — PENDING BOARD DECISION</div>
              <p style={{ margin: 0, fontSize: 13, color: "#8A7A50", lineHeight: 1.75 }}>
                The primary flavour name will be confirmed at the board meeting and communicated to the manufacturer in writing by KITS immediately following. All flavour development work specified below can begin using the codename <strong style={{ color: "#C8A96E" }}>"Lebanese BBQ"</strong> until the commercial name is confirmed.
              </p>
            </div>

            <GreenBox title="FLAVOUR CONCEPT">
              {FLAVOR_PROFILE.concept}
            </GreenBox>

            <div style={{ marginTop: 20 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#2A4A38", letterSpacing: "0.2em", marginBottom: 14 }}>FLAVOUR COMPONENTS — SPECIFICATION</div>

              {FLAVOR_PROFILE.components.map((comp, i) => (
                <div key={i} style={{
                  background: "#0E1410",
                  border: `1px solid ${comp.critical ? "#7EB5A630" : "#1A2820"}`,
                  borderLeft: `3px solid ${comp.critical ? "#7EB5A6" : "#2A4A38"}`,
                  borderRadius: 3, marginBottom: 4, overflow: "hidden"
                }}>
                  <button onClick={() => toggle(`fl-${i}`)} style={{
                    width: "100%", background: "transparent", border: "none",
                    padding: "14px 18px", cursor: "pointer", textAlign: "left",
                    display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                      {comp.critical && (
                        <span style={{ fontFamily: "monospace", fontSize: 9, color: "#E07B6A",
                          background: "#E07B6A15", border: "1px solid #E07B6A30",
                          padding: "2px 6px", borderRadius: 2, flexShrink: 0 }}>
                          CRITICAL
                        </span>
                      )}
                      <span style={{ fontSize: 13, color: "#A8C8A8" }}>{comp.element}</span>
                    </div>
                    <span style={{ color: "#2A4A38", fontSize: 16 }}>{(expanded as any)[`fl-${i}`] ? "−" : "+"}</span>
                  </button>
                  {(expanded as any)[`fl-${i}`] && (
                    <div style={{ padding: "0 18px 16px", borderTop: "1px solid #14201A" }}>
                      <p style={{ margin: "12px 0 0", fontSize: 13, color: "#6A8A78", lineHeight: 1.8 }}>{comp.direction}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#2A4A38", letterSpacing: "0.2em", marginBottom: 14 }}>FLAVOUR DEVELOPMENT PROCESS — FIVE STAGES</div>
              {FLAVOR_PROFILE.development.map((d, i) => (
                <div key={i} style={{ display: "flex", gap: 14, padding: "12px 0", borderBottom: "1px solid #14201A", alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "monospace", fontSize: 11, color: "#7EB5A6", flexShrink: 0, marginTop: 1 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p style={{ margin: 0, fontSize: 13, color: "#6A8A78", lineHeight: 1.75 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NUTRITION */}
        {active === "nutrition" && (
          <div>
            <SecHead label="NUTRITIONAL REQUIREMENTS" title="Lab-Confirmed Targets Per SKU" color="#7EB5A6" />

            <GreenBox title="CRITICAL INSTRUCTION — READ FIRST">
              All nutritional values below are targets. None may be printed on packaging without laboratory verification from an accredited testing facility (LIBNOR Lebanon or approved private lab). The manufacturer must provide the actual lab-tested nutritional panel to KITS before any artwork is finalized. A discrepancy of more than 5% between declared values and lab results constitutes a non-compliance event and requires reformulation or declaration amendment.
            </GreenBox>

            <div style={{ marginTop: 20 }}>
              {NUTRITION_REQUIREMENTS.map((nr, i) => (
                <div key={i} style={{
                  background: "#0E1410",
                  border: `1px solid ${nr.critical ? "#7EB5A620" : "#1A2820"}`,
                  borderLeft: `3px solid ${nr.critical ? "#7EB5A6" : "#2A4A38"}`,
                  borderRadius: 3, marginBottom: 4, overflow: "hidden"
                }}>
                  <button onClick={() => toggle(`nr-${i}`)} style={{
                    width: "100%", background: "transparent", border: "none",
                    padding: "14px 18px", cursor: "pointer", textAlign: "left",
                    display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                        {nr.critical && <span style={{ fontFamily: "monospace", fontSize: 9, color: "#E07B6A", background: "#E07B6A15", border: "1px solid #E07B6A30", padding: "2px 6px", borderRadius: 2 }}>CRITICAL</span>}
                        <span style={{ fontSize: 13, color: "#A8C8A8" }}>{nr.parameter}</span>
                      </div>
                      <div style={{ fontFamily: "monospace", fontSize: 11, color: "#7EB5A6" }}>{nr.target}</div>
                    </div>
                    <span style={{ color: "#2A4A38", fontSize: 16 }}>{(expanded as any)[`nr-${i}`] ? "−" : "+"}</span>
                  </button>
                  {(expanded as any)[`nr-${i}`] && (
                    <div style={{ padding: "0 18px 16px", borderTop: "1px solid #14201A" }}>
                      <p style={{ margin: "10px 0 8px", fontSize: 13, color: "#6A8A78", lineHeight: 1.75 }}>{nr.rationale}</p>
                      <div style={{ fontFamily: "monospace", fontSize: 10, color: "#C8A96E", background: "#C8A96E10", border: "1px solid #C8A96E20", padding: "6px 10px", borderRadius: 2 }}>
                        STATUS: {nr.status}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* HALAL */}
        {active === "halal" && (
          <div>
            <SecHead label="HALAL COMPLIANCE" title="Complete Certification Requirements" color="#7EB5A6" />

            <div style={{ background: "#0E1A10", border: "1px solid #2A4A2A", borderRadius: 4, padding: "18px 22px", marginBottom: 22 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#7EB5A6", marginBottom: 10 }}>WHY THIS IS NON-NEGOTIABLE</div>
              <p style={{ margin: 0, fontSize: 14, color: "#6A8A70", lineHeight: 1.85 }}>
                Halal certification is the single most important regulatory requirement for this product in the Lebanese market. Approximately 60% of Lebanese consumers are Muslim. The remaining 40% includes a significant proportion of non-Muslim consumers who actively prefer Halal-certified products for quality assurance reasons. Every direct competitor in the Lebanese beef jerky market lacks Halal certification. This gap is our primary competitive advantage. It cannot be compromised, delayed, or treated as optional at any stage.
              </p>
            </div>

            {HALAL_REQUIREMENTS.map((h, i) => (
              <div key={i} style={{
                background: "#0E1410", border: "1px solid #1A2820",
                borderLeft: "3px solid #7EB5A6",
                borderRadius: 3, padding: "16px 20px", marginBottom: 4
              }}>
                <div style={{ fontSize: 13, color: "#A8C8A8", marginBottom: 8 }}>{h.req}</div>
                <p style={{ margin: "0 0 10px", fontSize: 13, color: "#5A7A68", lineHeight: 1.8 }}>{h.detail}</p>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: "#7EB5A6", background: "#7EB5A610", border: "1px solid #7EB5A620", padding: "6px 10px", borderRadius: 2 }}>
                  REQUIRED DOCUMENT: {h.doc}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* QUALITY */}
        {active === "quality" && (
          <div>
            <SecHead label="QUALITY STANDARDS" title="Stage-by-Stage Quality Control Protocol" color="#7EB5A6" />

            <GreenBox title="QUALITY PHILOSOPHY">
              One quality incident in the Lebanese health and fitness market — particularly a microbiological issue or a false nutritional claim — is irreversible. Lebanon's community is small and connected. A single complaint from a credible source (a personal trainer, a pharmacist, a nutritionist) travels at the speed of WhatsApp. The quality protocol below is not bureaucratic overhead — it is brand insurance.
            </GreenBox>

            {QUALITY_STANDARDS.map((stage, i) => (
              <div key={i} style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: "#7EB5A6", background: "#7EB5A615", border: "1px solid #7EB5A630", padding: "4px 12px", borderRadius: 2, letterSpacing: "0.1em" }}>
                    STAGE {String(i + 1).padStart(2, "0")}
                  </div>
                  <div style={{ fontSize: 15, color: "#A8C8A8" }}>{stage.stage}</div>
                </div>
                {stage.checks.map((check, j) => (
                  <div key={j} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: "1px solid #14201A", alignItems: "flex-start" }}>
                    <span style={{ color: "#7EB5A6", fontSize: 12, flexShrink: 0, marginTop: 2 }}>→</span>
                    <p style={{ margin: 0, fontSize: 13, color: "#5A7A68", lineHeight: 1.7 }}>{check}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* SHELF LIFE */}
        {active === "shelf" && (
          <div>
            <SecHead label="SHELF LIFE & PACKAGING INTERFACE" title="Storage, Stability & Pack Material Requirements" color="#7EB5A6" />

            <GreenBox title="SHELF LIFE TARGET">
              Minimum 6 months ambient shelf life from production date under Lebanese storage conditions. Target 9–12 months if achievable without artificial preservatives. This is a commercial requirement — distributors and supermarkets in Lebanon require minimum 6 months remaining shelf life at point of delivery to store. Products arriving with less than 4 months remaining will be rejected.
            </GreenBox>

            {[
              {
                label: "Water activity (Aw) target",
                value: "Aw ≤ 0.85",
                detail: "Water activity below 0.85 prevents microbial growth at ambient temperature without artificial preservatives. This is achieved through the drying process — not through chemical additives. The manufacturer must test Aw on every batch. If Aw exceeds 0.85 on any batch, that batch must be held until the cause is identified and resolved."
              },
              {
                label: "Lebanese climate conditions",
                value: "38°C / 80% RH peak summer",
                detail: "Lebanon's summer climate is extreme — up to 38°C ambient and 80%+ relative humidity in coastal areas. Shelf life testing must be conducted under Lebanese conditions, not European or American ambient assumptions. The manufacturer must either conduct accelerated shelf life testing simulating Lebanese conditions or provide data from a comparable climatic zone. Storage instruction on pack must be specific: 'Store below 25°C in a dry place away from direct sunlight.'"
              },
              {
                label: "Packaging material interface",
                value: "Multi-layer laminate — oxygen barrier",
                detail: "The inner packaging layer must provide adequate oxygen barrier properties to prevent oxidative rancidity of the beef fat. Minimum OTR (Oxygen Transmission Rate) requirement to be confirmed with packaging supplier based on fat content of final product. Matte exterior laminate (specified in packaging brief) must be confirmed as compatible with the oxygen barrier layer — some matte laminates reduce barrier properties."
              },
              {
                label: "Oxygen absorber / nitrogen flush",
                value: "Recommend nitrogen flush",
                detail: "Nitrogen flushing of the pack before sealing extends shelf life and maintains product freshness without chemical intervention. If nitrogen flushing is available in the manufacturer's facility, it should be implemented as standard. If an oxygen absorber sachet is used instead, it must be clearly labelled on pack: 'Absorption packet — do not eat.' Both the sachet and the nitrogen flush approach are acceptable — confirm which method is in use before packaging artwork is finalized."
              },
              {
                label: "Post-opening instruction",
                detail: "Multi-serve resealable pouch: 'Reseal after opening. Consume within 3 days of opening. Store in a cool, dry place.' Single-serve pouch: 'Consume immediately after opening.' These instructions are mandatory on-pack and must match the manufacturer's validated guidance.",
                value: "Declare on pack"
              },
            ].map((item, i) => (
              <div key={i} style={{ background: "#0E1410", border: "1px solid #1A2820", borderLeft: "3px solid #7EB5A6", borderRadius: 3, padding: "16px 20px", marginBottom: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, marginBottom: 10, flexWrap: "wrap" }}>
                  <div style={{ fontSize: 13, color: "#A8C8A8" }}>{item.label}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: "#7EB5A6" }}>{item.value}</div>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: "#5A7A68", lineHeight: 1.8 }}>{item.detail}</p>
              </div>
            ))}
          </div>
        )}

        {/* SUPPLY */}
        {active === "supply" && (
          <div>
            <SecHead label="SUPPLY AGREEMENT" title="Commercial Terms & Conditions" color="#C8A96E" />

            <div style={{ background: "#C8A96E12", border: "1px solid #C8A96E30", borderRadius: 4, padding: "16px 20px", marginBottom: 22 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#C8A96E", marginBottom: 8 }}>LEGAL NOTICE</div>
              <p style={{ margin: 0, fontSize: 13, color: "#8A7A50", lineHeight: 1.75 }}>
                The terms below are the commercial framework for the supply relationship. They must be formalized in a written supply agreement signed by both parties before the first commercial production batch is ordered. KITS will provide a draft supply agreement for legal review. No significant production commitment should be made without a signed agreement in place.
              </p>
            </div>

            {SUPPLY_TERMS.map((t, i) => (
              <div key={i} style={{
                display: "flex", gap: 0,
                borderBottom: "1px solid #14201A",
                overflow: "hidden"
              }}>
                <div style={{ background: "#0A0E0D", minWidth: 200, padding: "14px 16px", borderRight: "1px solid #14201A" }}>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: "#7EB5A6", lineHeight: 1.5 }}>{t.term}</div>
                </div>
                <div style={{ padding: "14px 18px", background: "#0C1210", flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 13, color: "#5A7A68", lineHeight: 1.75 }}>{t.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TESTING */}
        {active === "testing" && (
          <div>
            <SecHead label="TESTING & APPROVAL" title="Complete Testing Sequence — Pre-launch to Ongoing" color="#7EB5A6" />

            <GreenBox title="TESTING PHILOSOPHY">
              Every test specified below exists to protect the brand, the consumer, and the commercial relationship. A product that fails a microbiological test after reaching store shelves is a brand-ending event. A nutritional claim that cannot be verified by a third party is a legal liability. Testing is not overhead — it is the minimum cost of operating in the health and nutrition category with integrity.
            </GreenBox>

            <div style={{ marginTop: 20 }}>
              {TESTING_SEQUENCE.map((phase, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 10, color: "#7EB5A6", background: "#7EB5A615", border: "1px solid #7EB5A630", padding: "4px 12px", borderRadius: 2, letterSpacing: "0.1em" }}>
                      {phase.phase.toUpperCase()}
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: 10, color: "#2A4A38" }}>{phase.timing}</div>
                  </div>
                  <div style={{ height: 1, background: "#1A2820", marginBottom: 10 }} />
                  {phase.items.map((item, j) => (
                    <div key={j} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: "1px solid #0E1610", alignItems: "flex-start" }}>
                      <span style={{ color: "#7EB5A6", fontSize: 11, flexShrink: 0, marginTop: 2 }}>✓</span>
                      <p style={{ margin: 0, fontSize: 13, color: "#5A7A68", lineHeight: 1.7 }}>{item}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div style={{ background: "#0A0E0D", border: "1px solid #7EB5A630", borderRadius: 4, padding: "20px 24px", marginTop: 20 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#7EB5A6", letterSpacing: "0.2em", marginBottom: 10 }}>APPROVED TESTING LABORATORY</div>
              <p style={{ margin: 0, fontSize: 13, color: "#5A7A68", lineHeight: 1.8 }}>
                Primary: LIBNOR (Lebanese Standards Institution) — for MoPH submission purposes. Alternative: accredited private laboratory approved by MoPH. Third-party verification (annual): same facilities. The manufacturer may use their own internal quality lab for ongoing batch testing, but third-party verification is required for the initial batch and annually thereafter. All lab results must be provided to KITS in original format (not transcribed) within 5 business days of result issuance.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div style={{
        padding: "14px 44px",
        borderTop: "1px solid #14201A",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8
      }}>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#1A2820", letterSpacing: "0.15em" }}>
          KITS ADVISORY GROUP · MANUFACTURER TECHNICAL BRIEF · CONFIDENTIAL
        </span>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#1A2820" }}>KAG-JRK-007</span>
      </div>
    </div>
  );
}

function Pill({ color, label }: { color: string; label: string }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      background: `${color}15`, border: `1px solid ${color}40`,
      borderRadius: 3, padding: "5px 12px"
    }}>
      <div style={{ width: 5, height: 5, borderRadius: "50%", background: color }} />
      <span style={{ fontFamily: "monospace", fontSize: 10, color, letterSpacing: "0.12em" }}>{label}</span>
    </div>
  );
}

function SecHead({ label, title, color }: { label: string; title: string; color: string }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <div style={{ fontFamily: "monospace", fontSize: 10, color, letterSpacing: "0.25em", marginBottom: 8 }}>{label}</div>
      <h2 style={{ margin: 0, fontSize: "clamp(17px, 3vw, 25px)", fontWeight: 400, color: "#D8E0D8", lineHeight: 1.2 }}>{title}</h2>
      <div style={{ marginTop: 10, height: 1, background: `linear-gradient(to right, ${color}, transparent)`, maxWidth: 300 }} />
    </div>
  );
}

function GreenBox({ title, children }: { title: string; children: any }) {
  return (
    <div style={{ background: "#0A1410", border: "1px solid #2A4A2A", borderRadius: 4, padding: "16px 20px", marginBottom: 14 }}>
      <div style={{ fontFamily: "monospace", fontSize: 10, color: "#7EB5A6", letterSpacing: "0.15em", marginBottom: 8 }}>{title}</div>
      <p style={{ margin: 0, fontSize: 13, color: "#5A7A68", lineHeight: 1.85 }}>{children}</p>
    </div>
  );
}

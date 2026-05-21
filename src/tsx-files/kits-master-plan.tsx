import { useState } from "react";

const PHASES = [
  {
    id: "p0",
    label: "PHASE 0",
    title: "Foundation",
    timeline: "Months 1–2",
    color: "#C8A96E",
    steps: [
      { id: "p0-1", text: "Engage a licensed Lebanese notary to draft Articles of Association for your SARL (Société à Responsabilité Limitée)", detail: "Minimum 3 shareholders required. Budget $1,500–$3,000 for notary and registration fees. Bring: IDs/passports for all shareholders, chosen company name (reserve it first at the Commercial Register), and a lease or address proof." },
      { id: "p0-2", text: "Register the company at the Lebanese Commercial Register (Ministry of Justice)", detail: "This unlocks your ability to open a business bank account, sign contracts, and apply for licenses. Timeline: 2–4 weeks if documents are clean." },
      { id: "p0-3", text: "Obtain Tax Identification Number (TIN) from the Ministry of Finance", detail: "Required for all commercial activity, invoicing, and VAT compliance. Done simultaneously with commercial registration." },
      { id: "p0-4", text: "Open a dedicated business bank account in USD", detail: "Lebanon's monetary environment requires USD-denominated operations. Use a bank with correspondent banking relationships: Bankmed, Bank Audi, or Byblos Bank are solid choices for SMEs." },
      { id: "p0-5", text: "Register employees with the National Social Security Fund (NSSF)", detail: "Mandatory for any paid staff. Even a 1-person operation with salaried staff requires NSSF registration." },
      { id: "p0-6", text: "Formalize the manufacturer supply agreement in writing", detail: "Cover: minimum order quantities (MOQs), lead times, quality specs, pricing, payment terms, rejection protocol, and exclusivity clause if applicable. Do not operate on verbal agreements." },
      { id: "p0-7", text: "Commission laboratory testing to validate '40g protein / 50 calorie' claim", detail: "Use an accredited lab: LIBNOR (Lebanese Standards Institution) or a certified private lab. This is mandatory before MoPH submission and before printing any packaging. Budget $300–$800 per SKU." },
      { id: "p0-8", text: "Begin field research: Visit 20+ gyms across Beirut, Metn, Keserwan, Baabda", detail: "Interview gym owners and trainers. Ask: what protein snacks do members buy? What do they wish existed? What price point do they expect? What flavors? Map the intel — this data will shape every product and pricing decision." },
      { id: "p0-9", text: "Audit the competition: Visit Spinneys, TSC, Bou Khalil, pharmacies, nutrition shops", detail: "Document: every competing product, its price, pack size, protein content, origin, and shelf placement. Jack Link's 40g sells at Carrefour Lebanon. Map every player. You cannot price without this." },
      { id: "p0-10", text: "Conduct 30+ consumer intercept interviews with gym members", detail: "Ask about: current snack habits, awareness of protein content, flavor preferences, acceptable price range, and packaging preferences. Recruit through gym visits — do not use surveys." },
      { id: "p0-11", text: "Secure a food-safe ambient storage facility", detail: "Requirements: clean, pest-controlled, temperature-monitored logs, dry environment. Lebanese summer heat (38°C+) can degrade product quality. Document storage conditions from day one." },
    ]
  },
  {
    id: "p1",
    label: "PHASE 1",
    title: "Build",
    timeline: "Months 2–4",
    color: "#7EB5A6",
    steps: [
      { id: "p1-1", text: "Finalize brand name — run it through the trademark availability check", detail: "Check the Ministry of Economy and Trade (Intellectual Property Directorate) for existing registrations. Also check: does it work in Arabic, English, and French? Is it pronounceable across demographics? See brand name candidates below." },
      { id: "p1-2", text: "Register the trademark at the Ministry of Economy and Trade", detail: "File in Class 29 (processed meat and food products). Budget $500–$1,200 for filing fees. Use a Lebanese IP lawyer for the filing — errors cost months. Protection lasts 10 years, renewable." },
      { id: "p1-3", text: "Engage a professional Lebanese brand designer or design studio", detail: "Budget $3,000–$8,000. Deliverables must include: wordmark + symbol, color palette, typography system, packaging design template, and brand guidelines document. Do not accept logo-only work." },
      { id: "p1-4", text: "Apply for Halal certification through Dar Al-Fatwa or an endorsed certification body", detail: "Submit: product formulation, ingredient sourcing documentation, manufacturing process description, and facility audit request. For imported components, origin certificates are required. This opens GCC export markets from day one." },
      { id: "p1-5", text: "Apply for MoPH (Ministry of Public Health) food product registration", detail: "Submit: legal entity registration, product formulation + ingredient list, lab test results (nutritional claims), label proof, and Halal certificate. Timeline: 2–4 months. Begin this process the moment lab results are ready." },
      { id: "p1-6", text: "Finalize packaging design based on MoPH compliance requirements", detail: "Mandatory on-pack: product name (Arabic + French/English), ingredient list, nutritional table, net weight, manufacturer info, MoPH registration number, Halal mark, barcode, and expiry format. Test packaging visually on actual gym and pharmacy shelves before final print." },
      { id: "p1-7", text: "Register product barcode (GS1 Lebanon)", detail: "A barcode is required for supermarket and modern trade entry. Contact GS1 Lebanon to register your company prefix and generate EAN-13 barcodes for each SKU. Budget $200–$500/year." },
      { id: "p1-8", text: "Produce first commercial batch — start lean", detail: "Produce 60–90 days of estimated sell-through only. Do not over-produce. First batch must be tested against shelf life targets under Lebanese ambient conditions before full production scaling." },
      { id: "p1-9", text: "Develop professional trade presentation kit (printed)", detail: "Contents: brand story (1 page), product overview with nutritional credentials, lab-verified claims, packaging samples, pricing + margin structure per channel, delivery terms, and a clean one-page leave-behind. Never visit a buyer without this kit." },
      { id: "p1-10", text: "Begin soft outreach to 30 target gym accounts", detail: "Introduce yourself, leave samples, set follow-up appointments. Build the relationship before the ask. Gym owners in Lebanon make decisions based on trust and face-to-face presence — not emails." },
    ]
  },
  {
    id: "p2",
    label: "PHASE 2",
    title: "Launch",
    timeline: "Months 4–6",
    color: "#E07B6A",
    steps: [
      { id: "p2-1", text: "Formal launch into 20–30 gym accounts with product, pricing, and display materials", detail: "Offer sale-or-return terms for the first 30 days to reduce buyer risk. Provide a small display stand or branded bowl for point-of-sale. Deliver personally — this is also a relationship visit." },
      { id: "p2-2", text: "Launch trainer activation program", detail: "Recruit 10–15 personal trainers as product advocates. Offer preferential wholesale pricing (not commission — too complex to administer). A trainer who believes in the product recommends it to every client, every session." },
      { id: "p2-3", text: "Monitor sell-through weekly across all accounts", detail: "Track: units sold per account per week, reorder frequency, and consumer feedback. This data is your most valuable asset when approaching pharmacies and supermarkets later." },
      { id: "p2-4", text: "Begin pharmacy and nutrition shop outreach", detail: "Target: Pharmacie Bou Khalil, Point Vert, independent pharmacies in fitness-heavy areas (Achrafieh, Badaro, Kaslik, Dbayeh). Target nutrition shops: Protein District, Sport Nutrition, Proteinji, The Supplement Lab. Bring samples, kit, and sell-through data from gyms." },
      { id: "p2-5", text: "Review pricing against real market response", detail: "Is the price holding? Are gym owners complaining? Are consumers asking for a smaller entry pack? Adjust — with field evidence, not guesswork." },
      { id: "p2-6", text: "Collect consumer feedback systematically", detail: "At every gym visit, ask owners: what are members saying? What flavors are they asking for? Any complaints? Document everything. This is live product research costing you nothing." },
      { id: "p2-7", text: "Establish a 90-day pricing review cycle", detail: "Given Lebanon's monetary volatility, review your USD-anchored pricing every quarter. Communicate changes to trade partners with 30 days' notice and clear rationale." },
    ]
  },
  {
    id: "p3",
    label: "PHASE 3",
    title: "Expand",
    timeline: "Months 6–12",
    color: "#9B8EC4",
    steps: [
      { id: "p3-1", text: "Approach modern trade (Spinneys, TSC, Bou Khalil Supermarché, Fahed, co-ops)", detail: "Arrive with 3+ months of gym sell-through data, a sell sheet, product samples, and a promotional plan. Supermarket buyers need: proven demand, barcode registration, supply reliability guarantee, and margin/listing fee agreement (budget 10–20% of first year revenue for listings)." },
      { id: "p3-2", text: "Develop B2B and corporate wellness channel", detail: "Target: hospital staff cafeterias, corporate wellness programs, university canteens, boutique hotels, airline catering. These require different pricing (volume discount) and potentially different pack formats. Build this in parallel — it's low acquisition cost, high recurring volume." },
      { id: "p3-3", text: "Evaluate second SKU based on sell-through signals", detail: "Do not add a SKU based on enthusiasm — add it based on: (1) consistent stock-outs of SKU 1, (2) repeated consumer requests for a specific flavor, or (3) a channel that needs a different format. Discipline here protects your margin and focus." },
      { id: "p3-4", text: "Engage a Lebanese FMCG distributor as volume warrants", detail: "Target distributors with existing relationships in your priority channels. Negotiate: 15–20% margin, monthly reporting on sell-through, and protected key account relationships (retain direct contact with flagship gyms and anchor pharmacies yourself)." },
      { id: "p3-5", text: "Conduct formal quarterly reviews with your top 10 accounts", detail: "Bring data: sell-through trends, stock levels, shelf placement quality, competitive activity. These reviews signal professionalism and deepen the partnerships that protect your shelf space." },
      { id: "p3-6", text: "Conduct formal brand health assessment", detail: "Survey 50+ consumers: brand recall, purchase intent, flavor preferences, and price sensitivity. Compare against your Phase 0 baseline. Where are you strong? Where are you not?" },
    ]
  },
  {
    id: "p4",
    label: "PHASE 4",
    title: "Scale",
    timeline: "Month 12+",
    color: "#C8A96E",
    steps: [
      { id: "p4-1", text: "Evaluate GCC export potential", detail: "Your Halal certification makes you immediately eligible for Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, and Oman. The GCC is the natural first export market for a Lebanese food brand. Engage a local food importer/distributor in your target GCC market — do not attempt to export without a local partner." },
      { id: "p4-2", text: "Introduce second and third SKUs with full commercial justification", detail: "By now you have 12+ months of sell-through data. Each new SKU must be justified by: demand signal (consumer requests or stockouts), channel requirement, or strategic range architecture. Never range-extend speculatively." },
      { id: "p4-3", text: "Explore co-manufacturing or local production investment", detail: "If volume warrants, evaluate establishing a local production line. This improves margin, supply reliability, and allows you to carry a 'Made in Lebanon' claim — which is a differentiator in GCC markets with a Lebanese diaspora consumer base." },
      { id: "p4-4", text: "Build institutional channel relationships", detail: "Hospitals, universities, airlines (MEA catering), boutique hotel chains. These are long sales cycles but high-value, recurring contracts. Begin relationship-building at Month 12 even if contracts close at Month 18." },
      { id: "p4-5", text: "Review and renew all regulatory certifications", detail: "MoPH registration, Halal certification, trademark registration — all have renewal timelines. Set calendar reminders 3 months before each expiry. A lapsed certification can pull you from shelf." },
    ]
  }
];

const BRANDS = [
  {
    name: "QUWWAT",
    arabic: "قوة",
    meaning: "Strength / Power",
    rationale: "Directly names the core value proposition. One word. Works in Arabic, phonetically accessible in English and French. Short, punchy, ownable. Commands shelf presence.",
    score: 5,
    verdict: "Top Candidate"
  },
  {
    name: "JADARA",
    arabic: "جدارة",
    meaning: "Merit / Worthiness",
    rationale: "Conveys earned credibility — 'you deserve this.' Slightly softer than QUWWAT, appeals to both male and female segments. Unique in the snack category regionally.",
    score: 4,
    verdict: "Strong Candidate"
  },
  {
    name: "BADR",
    arabic: "بدر",
    meaning: "Full moon / Peak",
    rationale: "Short, one syllable, works beautifully in Arabic and is effortless in French and English. Symbolises peak performance. Trademarkable. Rare in food brands.",
    score: 4,
    verdict: "Strong Candidate"
  },
  {
    name: "LAHM+",
    arabic: "لحم",
    meaning: "Meat — with a performance-plus signal",
    rationale: "Bold, direct, bilingual by design. The '+' makes it modern and nutritionally coded. Risk: slightly too literal. Reward: instant category communication. Best for a confident brand.",
    score: 4,
    verdict: "Strong Candidate"
  },
  {
    name: "AZIM",
    arabic: "عظيم",
    meaning: "Great / Formidable",
    rationale: "Strong sound, strong meaning. Works in Arabic and is pronounceable across all Lebanese language communities. Conveys athletic aspiration. Trademarkable.",
    score: 3,
    verdict: "Viable Candidate"
  },
  {
    name: "MAJD",
    arabic: "مجد",
    meaning: "Glory",
    rationale: "Single syllable, clean, proud. Works in Arabic and French (phonetically natural). Less immediately fitness-coded but carries powerful aspirational weight. Unique in food.",
    score: 3,
    verdict: "Viable Candidate"
  },
  {
    name: "NAHR",
    arabic: "نهر",
    meaning: "River / Flow",
    rationale: "More poetic direction — connotes energy, movement, and endurance. Different from every other protein brand. Risk: requires more brand building to connect to protein/jerky. Reward: memorable.",
    score: 3,
    verdict: "Creative Alternative"
  },
];

const COMPETITORS = [
  {
    brand: "Jack Link's",
    origin: "USA",
    where: "Carrefour Lebanon, Sweet Joint (imported snack shops)",
    sizes: "25g, 40g, 60g, 70g",
    flavors: "Original, Teriyaki, Sweet & Hot",
    positioning: "Mass market, global brand, widely recognized",
    weakness: "High sugar content, no protein-forward claim on pack, expensive imported pricing, soy sauce base conflicts with strict Halal consumers",
    threat: "HIGH — most visible competitor. Your advantage: local pricing, local flavors, Halal cert, higher protein focus."
  },
  {
    brand: "Wild West",
    origin: "Netherlands (EU)",
    where: "Carrefour Lebanon, select supermarkets",
    sizes: "60g",
    flavors: "Original, Jalapeño, Honey BBQ",
    positioning: "Western/cowboy lifestyle brand, European market standard",
    weakness: "No Arabic language presence, no Halal cert displayed, not positioned for fitness — positioned for snacking",
    threat: "MEDIUM — present but not targeting your segment."
  },
  {
    brand: "Protein Bars (local)",
    origin: "Lebanon (Fuel to Go, local producers)",
    where: "Gyms, nutrition shops, Toters delivery",
    sizes: "Varies",
    flavors: "Chocolate, Peanut Butter, Oatmeal",
    positioning: "Local, health-oriented, already gym-channel established",
    weakness: "Bar format — higher sugar, less satiating than jerky. Not a meat product. Entirely different texture/snack occasion.",
    threat: "LOW-MEDIUM — different category. Your messaging should contrast: real meat, zero sugar, pure protein."
  },
  {
    brand: "Imported Protein Bars (Quest, Barebells, Myprotein)",
    origin: "USA / Europe",
    where: "Protein District, Sport Nutrition, Proteinji, The Supplement Lab",
    sizes: "Various",
    flavors: "Wide range",
    positioning: "Premium, bodybuilding community, supplement-adjacent",
    weakness: "High price points ($3–6 per bar in Lebanon), not a meal-adjacent product, artificial sweetener concerns",
    threat: "LOW — different product format. You are competing for the same wallet at point of gym purchase, but not head-to-head on product."
  },
  {
    brand: "No established local beef jerky brand",
    origin: "Lebanon",
    where: "—",
    sizes: "—",
    flavors: "—",
    positioning: "GAP IN MARKET",
    weakness: "The category is empty locally. You are not entering a crowded shelf — you are creating it.",
    threat: "OPPORTUNITY — first-mover advantage is real and available."
  },
];

const QUESTIONS = [
  "What is the target retail price you have in mind per unit (even a rough range)?",
  "Does your manufacturer produce locally in Lebanon, abroad (which country?), or both?",
  "What flavors has your manufacturer already tested or produced?",
  "Do you have a brand name idea already, even a rough one?",
  "Who is the primary person running this venture — founder/operator, or delegated to a manager?",
  "Do you have any existing relationships with gym owners, pharmacists, or supermarket buyers in Lebanon?",
];

export default function MasterPlan() {
  const [activeTab, setActiveTab] = useState("checklist");
  const [checked, setChecked] = useState({});
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [expandedComp, setExpandedComp] = useState<number | null>(null);

  const toggle = (id: string) => setChecked((prev: any) => ({ ...prev, [id]: !prev[id] }));
  const toggleStep = (id: string) => setExpandedStep(prev => prev === id ? null : id);
  const toggleComp = (i: number) => setExpandedComp(prev => prev === i ? null : i);

  const totalSteps = PHASES.reduce((a, p) => a + p.steps.length, 0);
  const doneSteps = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((doneSteps / totalSteps) * 100);

  const tabs = [
    { id: "checklist", label: "A–Z Checklist" },
    { id: "brands", label: "Brand Names" },
    { id: "competition", label: "Competition" },
    { id: "questions", label: "Open Questions" },
  ];

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#0A0908",
      minHeight: "100vh",
      color: "#E8E0D0",
    }}>
      {/* Header */}
      <div style={{
        background: "#0D0C0A",
        borderBottom: "1px solid #1E1C16",
        padding: "28px 36px 20px",
      }}>
        <div style={{ fontFamily: "monospace", fontSize: 10, color: "#5A5040", letterSpacing: "0.3em", marginBottom: 8 }}>
          KITS ADVISORY GROUP · REF: KAG-JRK-002 · CONFIDENTIAL
        </div>
        <h1 style={{ margin: 0, fontSize: "clamp(20px, 3.5vw, 32px)", fontWeight: 400, color: "#E8E0D0", lineHeight: 1.2 }}>
          Beef Jerky — Master Launch Plan
        </h1>
        <p style={{ margin: "6px 0 0", fontSize: 13, color: "#8A7A60", fontFamily: "Georgia, serif" }}>
          Lebanon Market Entry · A to Z · Phase 0 → 4
        </p>
      </div>

      {/* Progress Bar */}
      <div style={{ background: "#0D0C0A", padding: "12px 36px", borderBottom: "1px solid #1A1814" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ flex: 1, height: 3, background: "#1E1C16", borderRadius: 2 }}>
            <div style={{
              width: `${pct}%`, height: "100%",
              background: "linear-gradient(to right, #C8A96E, #7EB5A6)",
              borderRadius: 2, transition: "width 0.4s ease"
            }} />
          </div>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: "#8A7A60", whiteSpace: "nowrap" }}>
            {doneSteps} / {totalSteps} COMPLETED
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: "#0D0C0A", borderBottom: "1px solid #1A1814", display: "flex", padding: "0 36px" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            background: "transparent",
            border: "none",
            borderBottom: activeTab === t.id ? "2px solid #C8A96E" : "2px solid transparent",
            color: activeTab === t.id ? "#E8E0D0" : "#5A5040",
            fontFamily: "monospace",
            fontSize: 11,
            letterSpacing: "0.15em",
            padding: "14px 20px 12px",
            cursor: "pointer",
            transition: "all 0.15s"
          }}>
            {t.label.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ padding: "32px 36px", maxWidth: 900 }}>

        {/* === CHECKLIST === */}
        {activeTab === "checklist" && (
          <div>
            {PHASES.map(phase => {
              const done = phase.steps.filter(s => (checked as any)[s.id]).length;
              return (
                <div key={phase.id} style={{ marginBottom: 40 }}>
                  {/* Phase Header */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 16 }}>
                    <div style={{
                      fontFamily: "monospace", fontSize: 10,
                      color: phase.color, letterSpacing: "0.2em",
                      background: `${phase.color}15`,
                      border: `1px solid ${phase.color}40`,
                      padding: "4px 10px", borderRadius: 2
                    }}>
                      {phase.label}
                    </div>
                    <h2 style={{ margin: 0, fontSize: 18, fontWeight: 400, color: "#D4C8B0" }}>
                      {phase.title}
                    </h2>
                    <span style={{ fontFamily: "monospace", fontSize: 11, color: "#4A4030" }}>
                      {phase.timeline}
                    </span>
                    <span style={{ marginLeft: "auto", fontFamily: "monospace", fontSize: 11, color: phase.color }}>
                      {done}/{phase.steps.length}
                    </span>
                  </div>
                  <div style={{ height: 1, background: `linear-gradient(to right, ${phase.color}60, transparent)`, marginBottom: 12 }} />

                  {/* Steps */}
                  {phase.steps.map((step, i) => {
                    const isExpanded = expandedStep === step.id;
                    const isDone = !!(checked as any)[step.id];
                    return (
                      <div key={step.id} style={{
                        background: isDone ? "#0D110E" : "#0E0D0B",
                        border: `1px solid ${isDone ? "#2A3D2A" : "#1E1C16"}`,
                        borderLeft: `3px solid ${isDone ? "#4A7A4A" : phase.color}40`,
                        borderRadius: 3, marginBottom: 4, overflow: "hidden",
                        transition: "all 0.2s ease"
                      }}>
                        <div style={{ display: "flex", alignItems: "flex-start", padding: "12px 16px", gap: 12 }}>
                          {/* Checkbox */}
                          <button onClick={() => toggle(step.id)} style={{
                            width: 18, height: 18, flexShrink: 0, marginTop: 1,
                            border: `1px solid ${isDone ? "#4A7A4A" : "#3A3428"}`,
                            background: isDone ? "#2A4A2A" : "transparent",
                            borderRadius: 2, cursor: "pointer", display: "flex",
                            alignItems: "center", justifyContent: "center",
                            transition: "all 0.15s"
                          }}>
                            {isDone && <span style={{ color: "#7ABA7A", fontSize: 11 }}>✓</span>}
                          </button>

                          {/* Step number + text */}
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                              <span style={{ fontFamily: "monospace", fontSize: 10, color: isDone ? "#4A7A4A" : "#4A4030", flexShrink: 0 }}>
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span style={{
                                fontSize: 13, lineHeight: 1.5,
                                color: isDone ? "#6A8A6A" : "#C8BCA8",
                                textDecoration: isDone ? "line-through" : "none",
                                fontFamily: "Georgia, serif"
                              }}>
                                {step.text}
                              </span>
                            </div>
                          </div>

                          {/* Expand button */}
                          <button onClick={() => toggleStep(step.id)} style={{
                            background: "transparent", border: "none",
                            color: "#4A4030", fontSize: 14, cursor: "pointer", flexShrink: 0, padding: 0
                          }}>
                            {isExpanded ? "−" : "+"}
                          </button>
                        </div>

                        {isExpanded && (
                          <div style={{ padding: "0 16px 14px 46px" }}>
                            <p style={{
                              margin: 0, fontSize: 13, lineHeight: 1.8,
                              color: "#7A6E5A", fontFamily: "Georgia, serif",
                              borderLeft: `2px solid ${phase.color}40`,
                              paddingLeft: 12
                            }}>
                              {step.detail}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}

        {/* === BRAND NAMES === */}
        {activeTab === "brands" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#C8A96E", letterSpacing: "0.2em", marginBottom: 8 }}>
                BRAND NAMING ADVISORY
              </div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 400, color: "#E8E0D0" }}>Candidate Brand Names</h2>
              <p style={{ fontSize: 13, color: "#7A6E5A", lineHeight: 1.7, marginTop: 10 }}>
                All candidates below meet the core criteria: Arabic-rooted, pronounceable across Arabic / English / French, short enough to trademark cleanly, and free from generic descriptive language. Each must be checked against the Ministry of Economy and Trade IP register before use. Scores are out of 5.
              </p>
            </div>

            {BRANDS.map((b, i) => (
              <div key={i} style={{
                background: "#0E0D0B",
                border: "1px solid #1E1C16",
                borderRadius: 4, marginBottom: 6, padding: "18px 20px"
              }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 220 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                      <span style={{ fontSize: 20, fontWeight: 400, color: "#E8E0D0", letterSpacing: "0.1em" }}>{b.name}</span>
                      <span style={{ fontSize: 16, color: "#8A7A60", fontFamily: "Georgia, serif" }}>{b.arabic}</span>
                      <span style={{
                        fontFamily: "monospace", fontSize: 10,
                        color: b.score === 5 ? "#C8A96E" : b.score === 4 ? "#7EB5A6" : "#9B8EC4",
                        background: b.score === 5 ? "#C8A96E15" : b.score === 4 ? "#7EB5A615" : "#9B8EC415",
                        border: `1px solid ${b.score === 5 ? "#C8A96E40" : b.score === 4 ? "#7EB5A640" : "#9B8EC440"}`,
                        padding: "2px 8px", borderRadius: 2
                      }}>
                        {b.verdict}
                      </span>
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: 11, color: "#C8A96E", marginBottom: 8 }}>
                      "{b.meaning}"
                    </div>
                    <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "#7A6E5A", fontFamily: "Georgia, serif" }}>
                      {b.rationale}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 3 }}>
                    {[1,2,3,4,5].map(n => (
                      <div key={n} style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: n <= b.score ? "#C8A96E" : "#2A2820"
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 28, background: "#0E110E", border: "1px solid #2A3020", borderRadius: 4, padding: "18px 20px" }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#7EB5A6", letterSpacing: "0.2em", marginBottom: 8 }}>
                KITS RECOMMENDATION
              </div>
              <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8, color: "#8A9E80", fontFamily: "Georgia, serif" }}>
                <strong style={{ color: "#A8C0A0" }}>QUWWAT</strong> is the strongest candidate. It is short, powerful, trademarkable, genuinely Arabic in origin, and works phonetically in all three of Lebanon's languages. It communicates the product's core value — strength — without being descriptive in a way that prevents trademark protection. <strong style={{ color: "#A8C0A0" }}>BADR</strong> is the creative dark horse: one syllable, pure, and poetic. <strong style={{ color: "#A8C0A0" }}>LAHM+</strong> is bold and direct — highest risk, highest reward if the positioning is confident enough to carry it. Run all three through IP check immediately.
              </p>
            </div>
          </div>
        )}

        {/* === COMPETITION === */}
        {activeTab === "competition" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#E07B6A", letterSpacing: "0.2em", marginBottom: 8 }}>
                COMPETITIVE INTELLIGENCE
              </div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 400, color: "#E8E0D0" }}>Lebanon Market — Competition Map</h2>
              <p style={{ fontSize: 13, color: "#7A6E5A", lineHeight: 1.7, marginTop: 10 }}>
                The Lebanese beef jerky market has a critical structural advantage for a new entrant: <strong style={{ color: "#C8A96E" }}>there is no established local brand.</strong> All current competition is imported, expensive, not Halal-certified for the discerning consumer, and not positioned for the fitness segment. Global jerky market growing at ~7% CAGR. Middle East sports nutrition market growing at 7.3% CAGR through 2033. The window is open.
              </p>
            </div>

            {COMPETITORS.map((c, i) => (
              <div key={i} style={{
                background: c.brand.includes("No established") ? "#0A120A" : "#0E0D0B",
                border: `1px solid ${c.brand.includes("No established") ? "#2A4A2A" : "#1E1C16"}`,
                borderRadius: 4, marginBottom: 6, overflow: "hidden"
              }}>
                <button onClick={() => toggleComp(i)} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  width: "100%", background: "transparent", border: "none",
                  padding: "16px 20px", cursor: "pointer", textAlign: "left", gap: 16
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 15, color: c.brand.includes("No established") ? "#7ABA7A" : "#C8BCA8", fontFamily: "Georgia, serif" }}>
                      {c.brand}
                    </span>
                    {c.origin !== "—" && (
                      <span style={{ fontFamily: "monospace", fontSize: 10, color: "#4A4030" }}>{c.origin}</span>
                    )}
                    <span style={{
                      fontFamily: "monospace", fontSize: 10,
                      color: c.threat.startsWith("HIGH") ? "#E07B6A" : c.threat.startsWith("MEDIUM") ? "#C8A96E" : c.threat.startsWith("LOW") ? "#7EB5A6" : "#7ABA7A",
                      background: c.threat.startsWith("HIGH") ? "#E07B6A15" : c.threat.startsWith("MEDIUM") ? "#C8A96E15" : c.threat.startsWith("OPPORT") ? "#7ABA7A15" : "#7EB5A615",
                      border: `1px solid ${c.threat.startsWith("HIGH") ? "#E07B6A40" : c.threat.startsWith("MEDIUM") ? "#C8A96E40" : c.threat.startsWith("OPPORT") ? "#7ABA7A40" : "#7EB5A640"}`,
                      padding: "2px 8px", borderRadius: 2
                    }}>
                      {c.threat.split(" —")[0]}
                    </span>
                  </div>
                  <span style={{ color: "#4A4030", fontSize: 14 }}>{expandedComp === i ? "−" : "+"}</span>
                </button>

                {expandedComp === i && (
                  <div style={{ padding: "0 20px 18px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 12 }}>
                      {c.where !== "—" && (
                        <div>
                          <div style={{ fontFamily: "monospace", fontSize: 10, color: "#4A4030", marginBottom: 4 }}>WHERE SOLD</div>
                          <p style={{ margin: 0, fontSize: 12, color: "#7A6E5A", lineHeight: 1.6 }}>{c.where}</p>
                        </div>
                      )}
                      {c.sizes !== "—" && (
                        <div>
                          <div style={{ fontFamily: "monospace", fontSize: 10, color: "#4A4030", marginBottom: 4 }}>PACK SIZES</div>
                          <p style={{ margin: 0, fontSize: 12, color: "#7A6E5A", lineHeight: 1.6 }}>{c.sizes}</p>
                        </div>
                      )}
                      {c.flavors !== "—" && (
                        <div>
                          <div style={{ fontFamily: "monospace", fontSize: 10, color: "#4A4030", marginBottom: 4 }}>FLAVORS</div>
                          <p style={{ margin: 0, fontSize: 12, color: "#7A6E5A", lineHeight: 1.6 }}>{c.flavors}</p>
                        </div>
                      )}
                      <div>
                        <div style={{ fontFamily: "monospace", fontSize: 10, color: "#4A4030", marginBottom: 4 }}>POSITIONING</div>
                        <p style={{ margin: 0, fontSize: 12, color: "#7A6E5A", lineHeight: 1.6 }}>{c.positioning}</p>
                      </div>
                    </div>
                    <div style={{ background: "#0A1A0A", border: "1px solid #2A3A2A", borderRadius: 3, padding: "10px 14px" }}>
                      <div style={{ fontFamily: "monospace", fontSize: 10, color: "#7ABA7A", marginBottom: 4 }}>YOUR ADVANTAGE</div>
                      <p style={{ margin: 0, fontSize: 13, color: "#6A8A6A", lineHeight: 1.7, fontFamily: "Georgia, serif" }}>{c.weakness}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <div style={{ marginTop: 28, background: "#0A0E12", border: "1px solid #1A2A3A", borderRadius: 4, padding: "18px 20px" }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#7EB5A6", letterSpacing: "0.2em", marginBottom: 8 }}>
                GLOBAL MARKET CONTEXT
              </div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: "#6A8090", fontFamily: "Georgia, serif" }}>
                The global jerky market is valued at ~$5.3B (2024) growing at 6.7% CAGR through 2030. Beef dominates with 51% share. Single-serve packs hold 48% of packaging market share — validating your gym channel entry format. The Middle East sports nutrition market was $1.04B in 2024 and is growing at 7.3% CAGR, with brick-and-mortar channels dominating at 82.5% of sales — meaning your non-digital, relationship-first strategy is precisely aligned with how this region buys.
              </p>
            </div>
          </div>
        )}

        {/* === OPEN QUESTIONS === */}
        {activeTab === "questions" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#9B8EC4", letterSpacing: "0.2em", marginBottom: 8 }}>
                ADVISORY INTAKE — OPEN QUESTIONS
              </div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 400, color: "#E8E0D0" }}>We Need Your Answers To Proceed</h2>
              <p style={{ fontSize: 13, color: "#7A6E5A", lineHeight: 1.7, marginTop: 10 }}>
                These questions are blocking our ability to go deeper on pricing architecture, flavor strategy, and supplier structuring. Each answer will directly shape the next advisory deliverable.
              </p>
            </div>

            {QUESTIONS.map((q, i) => (
              <div key={i} style={{
                background: "#0E0D0B",
                border: "1px solid #1E1C16",
                borderLeft: "3px solid #9B8EC4",
                borderRadius: 3, marginBottom: 6,
                padding: "16px 20px",
                display: "flex", gap: 14, alignItems: "flex-start"
              }}>
                <span style={{ fontFamily: "monospace", fontSize: 10, color: "#9B8EC4", marginTop: 3, flexShrink: 0 }}>
                  Q{String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ margin: 0, fontSize: 14, color: "#C8BCA8", lineHeight: 1.7, fontFamily: "Georgia, serif" }}>{q}</p>
              </div>
            ))}

            <div style={{ marginTop: 28, background: "#100E14", border: "1px solid #2A2A3A", borderRadius: 4, padding: "18px 20px" }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#9B8EC4", letterSpacing: "0.2em", marginBottom: 8 }}>
                NEXT ADVISORY DELIVERABLES — READY TO PRODUCE
              </div>
              {[
                "Detailed pricing model (cost-up + competitive benchmarking) once we know your target price range",
                "Flavor development brief for your manufacturer based on field research findings",
                "Packaging design brief once brand name is confirmed",
                "Gym outreach script and trade presentation template",
                "MoPH submission document checklist (specific to your manufacturer setup)",
                "Distributor evaluation framework for when you're ready to engage"
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                  <span style={{ color: "#9B8EC4", fontSize: 12, flexShrink: 0, marginTop: 2 }}>→</span>
                  <p style={{ margin: 0, fontSize: 13, color: "#7A6E8A", lineHeight: 1.6, fontFamily: "Georgia, serif" }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div style={{
        padding: "16px 36px",
        borderTop: "1px solid #1A1814",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 8
      }}>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#3A3428", letterSpacing: "0.15em" }}>
          KITS ADVISORY GROUP · CONFIDENTIAL · NOT FOR DISTRIBUTION
        </span>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#3A3428" }}>
          {doneSteps}/{totalSteps} STEPS · {pct}% COMPLETE
        </span>
      </div>
    </div>
  );
}

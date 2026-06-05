import { useState, useEffect, useContext } from "react";
import { ThemeCtx } from './pitch-theme';

// ─── RESPONSIVE HOOK ───────────────────────────────────────────────────────────
function useResponsive() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile };
}

// ─── FINANCIAL STUDY PALETTES ─────────────────────────────────────────────────
const FS_DARK = {
  bg: "#08070A",
  header: "#0A0910",
  border: "#1C1A24",
  rowBorder: "#140F1C",
  card: "#0C0B12",
  altBg: "#09080E",
  noteBg: "#0A0C08",
  noteBorder: "#2A3020",
  text: "#E2D8CC",
  textMid: "#C8BCAC",
  textDim: "#7A7090",
  textFaint: "#4A4060",
  textFainter: "#3A3050",
  noteText: "#6A7A60",
  readyText: "#6A9A80",
  notReadyText: "#6A6080",
  footerText: "#2A2038",
  tabActive: "#E2D8CC",
  tabInactive: "#4A4060",
};

const FS_LIGHT = {
  bg: "#FFFFFF",
  header: "#F9F7F5",
  border: "#D5CCC0",
  rowBorder: "#E8E0D4",
  card: "#F2EEE8",
  altBg: "#F9F7F5",
  noteBg: "#F0F4EE",
  noteBorder: "#C0CCA8",
  text: "#1A1410",
  textMid: "#3A2C20",
  textDim: "#5A4838",
  textFaint: "#8A7868",
  textFainter: "#A08898",
  noteText: "#506040",
  readyText: "#2E6838",
  notReadyText: "#5A3A58",
  footerText: "#8A7868",
  tabActive: "#1A1410",
  tabInactive: "#8A7868",
};

const TIERS = [
  {
    id: "lean",
    label: "TIER 1",
    name: "Lean Launch",
    tagline: "Minimum viable, maximum discipline",
    total: 19000,
    color: "#7EB5A6",
    description: "Designed for an entrepreneur who wants to validate the concept with real market data before committing to a full build. Every spend is stripped to the essential minimum. Zero waste. Tight execution. Exit ramp available at Phase 1 if market signals are weak.",
    suitable: "Entrepreneur is risk-averse or liquidity-constrained. Ru'ya 360° operates lean with a milestone-based release of funds.",
    risk: "Lower spend means slower brand build. Packaging and identity at this tier are functional, not exceptional. Risk of appearing underfunded vs. imported competitors at pharmacy shelf level.",
    categories: [
      {
        name: "Legal & Regulatory",
        color: "#C8A96E",
        items: [
          { label: "SARL registration (notary + Commercial Register)", low: 1500, high: 2500 },
          { label: "Tax ID + NSSF registration", low: 200, high: 400 },
          { label: "MoPH food product registration", low: 800, high: 1200 },
          { label: "Lab testing — nutritional claims validation (1 SKU)", low: 300, high: 600 },
          { label: "Halal certification (Dar Al-Fatwa)", low: 400, high: 800 },
          { label: "Trademark registration (Class 29)", low: 500, high: 900 },
          { label: "GS1 barcode registration (Lebanon)", low: 200, high: 300 },
        ]
      },
      {
        name: "Brand & Packaging",
        color: "#9B8EC4",
        items: [
          { label: "Brand identity — basic (wordmark + color system only)", low: 1500, high: 2500 },
          { label: "Packaging design (1 SKU, 1 size)", low: 800, high: 1200 },
          { label: "Packaging print run — first batch (minimum quantity)", low: 600, high: 1000 },
        ]
      },
      {
        name: "Production & Supply",
        color: "#E07B6A",
        items: [
          { label: "First production batch (lean — 60 days sell-through est.)", low: 4000, high: 6000 },
          { label: "Warehousing setup (3 months, basic ambient storage)", low: 300, high: 600 },
          { label: "Delivery — first account visits (fuel + logistics)", low: 300, high: 500 },
        ]
      },
      {
        name: "Sales & Activation",
        color: "#7EB5A6",
        items: [
          { label: "Trade presentation kit — printed (50 copies)", low: 300, high: 500 },
          { label: "Product samples — gym outreach (30 accounts)", low: 400, high: 700 },
          { label: "Point-of-sale materials — basic display (30 units)", low: 300, high: 500 },
        ]
      },
      {
        name: "Working Capital Buffer",
        color: "#C8A96E",
        items: [
          { label: "Contingency & working capital (15% of above)", low: 1300, high: 2000 },
        ]
      }
    ],
    projections: {
      accounts_m3: "15–20 gym accounts",
      accounts_m6: "30–40 total (gyms + pharmacies)",
      accounts_m12: "60–80 total",
      rev_m6: "$8,000–$14,000 / month",
      rev_m12: "$18,000–$28,000 / month",
      breakeven: "Month 7–9",
      gross_margin: "42–48%",
      note: "Assumes $3.00 average retail price, 30% channel margin, 15% Ru'ya 360° operating overhead"
    }
  },
  {
    id: "standard",
    label: "TIER 2",
    name: "Standard Launch",
    tagline: "Professional entry. Shelf-ready from day one.",
    total: 50000,
    color: "#C8A96E",
    description: "The recommended scenario for a venture with serious commercial intent. Funds a proper brand identity, two SKUs, a full gym-to-pharmacy distribution launch, and a working capital buffer that absorbs the 3–4 month revenue lag during regulatory processing. This is the scenario Ru'ya 360° recommends presenting to the entrepreneur as the baseline.",
    suitable: "Entrepreneur has real commercial ambition and is willing to invest in a proper launch. Ru'ya 360° operates with full mandate and milestone reporting.",
    risk: "Mid-range spend requires discipline to avoid scope creep. Packaging and brand investment here must be executed by professionals — not cut post-budget-approval.",
    categories: [
      {
        name: "Legal & Regulatory",
        color: "#C8A96E",
        items: [
          { label: "SARL registration (notary + Commercial Register)", low: 2000, high: 3000 },
          { label: "Tax ID + NSSF + business licensing", low: 300, high: 500 },
          { label: "MoPH food product registration (2 SKUs)", low: 1500, high: 2500 },
          { label: "Lab testing — nutritional claims (2 SKUs)", low: 600, high: 1200 },
          { label: "Halal certification — full scope (local + imported source)", low: 600, high: 1200 },
          { label: "Trademark registration (Class 29 + Class 35)", low: 900, high: 1500 },
          { label: "GS1 Lebanon — barcode + annual membership", low: 300, high: 500 },
          { label: "IP lawyer fees (filing + correspondence)", low: 800, high: 1500 },
        ]
      },
      {
        name: "Brand & Packaging",
        color: "#9B8EC4",
        items: [
          { label: "Brand identity — full system (wordmark, symbol, palette, typography, guidelines)", low: 4000, high: 7000 },
          { label: "Packaging design — 2 SKUs, 2 sizes each", low: 2000, high: 3500 },
          { label: "Packaging print run — first batch (2 SKUs)", low: 1500, high: 2500 },
          { label: "Brand photographer — product & lifestyle shots", low: 800, high: 1500 },
        ]
      },
      {
        name: "Production & Supply",
        color: "#E07B6A",
        items: [
          { label: "First production batch — 2 SKUs (90 days sell-through est.)", low: 8000, high: 14000 },
          { label: "Quality control setup (sampling kit, documentation)", low: 300, high: 600 },
          { label: "Warehousing (6 months, food-safe ambient)", low: 800, high: 1500 },
          { label: "Delivery vehicle / logistics setup (first 6 months)", low: 1000, high: 2000 },
        ]
      },
      {
        name: "Sales & Activation",
        color: "#7EB5A6",
        items: [
          { label: "Trade presentation kit — printed, professional (100 copies)", low: 600, high: 1000 },
          { label: "Product samples — full outreach (50+ accounts)", low: 800, high: 1500 },
          { label: "Point-of-sale display units (50 accounts)", low: 800, high: 1500 },
          { label: "Trainer activation program (samples + materials)", low: 500, high: 900 },
          { label: "Field research — structured program (facilitator + travel)", low: 600, high: 1000 },
        ]
      },
      {
        name: "Operations & Ru'ya 360°",
        color: "#C8A96E",
        items: [
          { label: "Accounting + bookkeeping setup (first year)", low: 600, high: 1200 },
          { label: "Ru'ya 360° management fee — Phase 0–2 (6 months)", low: 3000, high: 5000 },
          { label: "Contingency & working capital (15% of above)", low: 4500, high: 6500 },
        ]
      }
    ],
    projections: {
      accounts_m3: "25–30 gym accounts",
      accounts_m6: "60–80 total (gyms + pharmacies + nutrition shops)",
      accounts_m12: "120–160 total (+ supermarket entry)",
      rev_m6: "$18,000–$28,000 / month",
      rev_m12: "$40,000–$65,000 / month",
      breakeven: "Month 5–7",
      gross_margin: "48–55%",
      note: "Assumes $3.50 average retail, 2 SKUs, trainer activation driving gym velocity, pharmacy entry Month 4"
    }
  },
  {
    id: "full",
    label: "TIER 3",
    name: "Full Market Entry",
    tagline: "Category creation. Export-ready from launch.",
    total: 105000,
    color: "#E07B6A",
    description: "A comprehensive market entry that positions the brand to own the Lebanese protein snack category and be export-ready for GCC within 12 months. Funds a full brand system, 3 SKUs at launch, a dedicated sales representative, modern trade entry, corporate channel development, and a 6-month working capital runway. Recommended only if the entrepreneur has confirmed long-term capital commitment and Ru'ya 360° has a formalized co-management or equity stake.",
    suitable: "Entrepreneur is fully committed, capitalized, and aligned with Ru'ya 360° on a 2–3 year growth plan. Ru'ya 360° operates as full commercial operator with equity or significant performance fees.",
    risk: "Higher commitment requires proportionally stronger governance. Budget at this tier must be managed with monthly P&L reviews and milestone-gated releases.",
    categories: [
      {
        name: "Legal & Regulatory",
        color: "#C8A96E",
        items: [
          { label: "SARL registration + all licensing", low: 2500, high: 4000 },
          { label: "MoPH registration — 3 SKUs + label compliance", low: 2500, high: 4000 },
          { label: "Lab testing — 3 SKUs + shelf life validation", low: 1200, high: 2500 },
          { label: "Halal certification — full scope + annual renewal", low: 800, high: 1500 },
          { label: "Trademark (Class 29, 35 + GCC pre-filing)", low: 2000, high: 4000 },
          { label: "IP legal retainer (Lebanon + GCC)", low: 1500, high: 3000 },
          { label: "GS1 Lebanon + GS1 GCC preparation", low: 500, high: 900 },
          { label: "Export documentation preparation (GCC)", low: 800, high: 1500 },
        ]
      },
      {
        name: "Brand & Packaging",
        color: "#9B8EC4",
        items: [
          { label: "Full brand identity system — agency level", low: 6000, high: 10000 },
          { label: "Packaging design — 3 SKUs, multiple formats", low: 3500, high: 6000 },
          { label: "Packaging print run — 3 SKUs (full launch quantity)", low: 3000, high: 5000 },
          { label: "Brand photography — full product, lifestyle, B2B set", low: 2000, high: 3500 },
          { label: "Printed brand collateral — full suite", low: 1000, high: 2000 },
        ]
      },
      {
        name: "Production & Supply",
        color: "#E07B6A",
        items: [
          { label: "First production batch — 3 SKUs (120 days est.)", low: 15000, high: 25000 },
          { label: "QC protocol setup + documentation system", low: 500, high: 1000 },
          { label: "Warehousing (12 months, premium food-safe)", low: 1500, high: 3000 },
          { label: "Dedicated delivery vehicle (lease or purchase)", low: 2500, high: 5000 },
        ]
      },
      {
        name: "Sales & Activation",
        color: "#7EB5A6",
        items: [
          { label: "Dedicated sales representative (6 months salary)", low: 4800, high: 7200 },
          { label: "Trade presentation system — premium printed + digital", low: 1000, high: 2000 },
          { label: "Product samples — full market outreach (100+ accounts)", low: 1500, high: 2500 },
          { label: "Point-of-sale — full display system (80+ accounts)", low: 1500, high: 2500 },
          { label: "Trainer activation program — structured with incentives", low: 1000, high: 2000 },
          { label: "Corporate / B2B channel development", low: 1000, high: 2000 },
          { label: "Field research — full structured program", low: 800, high: 1500 },
        ]
      },
      {
        name: "Operations & Ru'ya 360°",
        color: "#C8A96E",
        items: [
          { label: "Accounting, bookkeeping + financial reporting system", low: 1200, high: 2500 },
          { label: "Ru'ya 360° management fee — Phase 0–3 (12 months)", low: 8000, high: 14000 },
          { label: "Contingency + working capital runway (6 months)", low: 8000, high: 14000 },
        ]
      }
    ],
    projections: {
      accounts_m3: "30–40 gym accounts + pharmacy soft launch",
      accounts_m6: "100–130 total across all channels",
      accounts_m12: "200+ total + modern trade + corporate + GCC exploration",
      rev_m6: "$35,000–$55,000 / month",
      rev_m12: "$80,000–$130,000 / month",
      breakeven: "Month 4–6",
      gross_margin: "52–60%",
      note: "Assumes 3 SKUs, dedicated sales rep, full trainer network, modern trade by Month 7, corporate channel Month 5"
    }
  }
];

const ASSUMPTIONS = [
  { label: "Average retail price (single-serve)", value: "$3.00 – $4.50 / unit" },
  { label: "Average retail price (multi-serve)", value: "$8.00 – $14.00 / unit" },
  { label: "Channel margin — gyms", value: "25–30%" },
  { label: "Channel margin — pharmacies / nutrition", value: "30–35%" },
  { label: "Channel margin — supermarkets", value: "35–40%" },
  { label: "Distributor margin (when engaged)", value: "15–20%" },
  { label: "Ru'ya 360° gross margin target", value: "48–55% at MSP" },
  { label: "Currency basis", value: "USD — all pricing USD-denominated" },
  { label: "Exchange rate review cycle", value: "Every 90 days" },
  { label: "Regulatory timeline (MoPH)", value: "2–4 months from submission" },
  { label: "Lab testing timeline", value: "2–4 weeks per SKU" },
  { label: "Halal certification timeline", value: "3–6 weeks" },
  { label: "Brand design timeline", value: "4–8 weeks (Tier 2/3)" },
];

const BLOCKERS = [
  { label: "Nutritional panel from manufacturer", urgency: "IMMEDIATE", detail: "Blocks: MoPH registration, lab testing, packaging, all pricing. Get the technical data sheet this week." },
  { label: "Ru'ya 360° Management Mandate — signed", urgency: "IMMEDIATE", detail: "Blocks: all further Ru'ya 360° advisory spend and introductions on client's behalf. Execute before next deliverable." },
  { label: "Brand name — final selection", urgency: "WEEK 2", detail: "Blocks: trademark filing, brand identity brief, domain/social handle reservation." },
  { label: "Budget tier — entrepreneur decision", urgency: "WEEK 2", detail: "Blocks: scope of first production batch, brand identity budget, Ru'ya 360° fee structure." },
  { label: "Manufacturer supply agreement — signed", urgency: "WEEK 3", detail: "Blocks: MOQ confirmation, lead time planning, production scheduling, cost-per-unit certainty." },
];

export default function FinancialStudy() {
  const palette = useContext(ThemeCtx);
  const isLight = palette.void === "#FFFFFF";
  const S = isLight ? FS_LIGHT : FS_DARK;

  const { isMobile } = useResponsive();
  const [activeTier, setActiveTier] = useState("standard");
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("investment");

  const tier = TIERS.find(t => t.id === activeTier);

  const totalLow = tier?.categories.reduce((a, c) => a + c.items.reduce((b, i) => b + i.low, 0), 0) || 0;
  const totalHigh = tier?.categories.reduce((a, c) => a + c.items.reduce((b, i) => b + i.high, 0), 0) || 0;

  const tabs = [
    { id: "investment", label: "Investment Breakdown" },
    { id: "projections", label: "Revenue Projections" },
    { id: "assumptions", label: "Assumptions" },
    { id: "blockers", label: "Blockers" },
  ];

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: S.bg,
      minHeight: "100%",
      color: S.text,
    }}>
      {/* Header */}
      <div style={{
        background: S.header,
        borderBottom: `1px solid ${S.border}`,
        padding: isMobile ? "20px 24px 16px" : "28px 36px 22px",
      }}>
        <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 10, color: S.textFaint, letterSpacing: "0.3em", marginBottom: 8 }}>
          Ru'ya 360° ADVISORY GROUP · FINANCIAL FEASIBILITY STUDY · REF: KAG-JRK-003 · CONFIDENTIAL
        </div>
        <h1 style={{ margin: 0, fontSize: isMobile ? "clamp(18px, 4vw, 30px)" : "clamp(18px, 3vw, 30px)", fontWeight: 400, color: S.text, lineHeight: 1.2 }}>
          Beef Jerky Venture — Financial Feasibility
        </h1>
        <p style={{ margin: "6px 0 0", fontSize: isMobile ? 12 : 13, color: S.textDim, fontFamily: "Georgia, serif" }}>
          Three budget scenarios · Lebanon Market Entry · Phase 0 → 12 months
        </p>
      </div>

      {/* Tier Selector */}
      <div style={{
        background: S.altBg,
        borderBottom: `1px solid ${S.border}`,
        padding: isMobile ? "16px 20px" : "20px 36px",
        display: "flex", gap: isMobile ? 8 : 12, flexWrap: "wrap"
      }}>
        {TIERS.map(t => (
          <button key={t.id} onClick={() => setActiveTier(t.id)} style={{
            background: activeTier === t.id ? `${t.color}18` : "transparent",
            border: `1px solid ${activeTier === t.id ? t.color : S.border}`,
            borderRadius: 4,
            padding: isMobile ? "12px 16px" : "14px 22px",
            cursor: "pointer",
            textAlign: "left",
            transition: "all 0.2s",
            minWidth: isMobile ? "auto" : 180,
            flex: isMobile ? 1 : "auto",
            WebkitTapHighlightColor: "transparent",
            touchAction: "manipulation",
          }}>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 9 : 10, color: activeTier === t.id ? t.color : S.textFaint, letterSpacing: "0.2em", marginBottom: 4 }}>
              {t.label}
            </div>
            <div style={{ fontSize: isMobile ? 14 : 15, color: activeTier === t.id ? S.text : S.textDim, fontWeight: 400, marginBottom: 2 }}>
              {t.name}
            </div>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 11 : 12, color: activeTier === t.id ? t.color : S.textFainter }}>
              ~${t.total.toLocaleString()}
            </div>
          </button>
        ))}
      </div>

      {/* Tier Description Bar */}
      <div style={{
        background: `${tier?.color}0A`,
        borderBottom: `1px solid ${tier?.color}30`,
        padding: isMobile ? "14px 20px" : "16px 36px",
        display: "flex", gap: isMobile ? 16 : 24, flexWrap: "wrap", alignItems: "flex-start", flexDirection: isMobile ? "column" : "row"
      }}>
        <div style={{ flex: isMobile ? "auto" : 2, minWidth: isMobile ? "auto" : 260 }}>
          <p style={{ margin: 0, fontSize: isMobile ? 12 : 13, color: S.textDim, lineHeight: 1.75, fontFamily: "Georgia, serif" }}>
            {tier?.description}
          </p>
        </div>
        <div style={{ flex: isMobile ? "auto" : 1, minWidth: isMobile ? "auto" : 200 }}>
          <div style={{ fontFamily: "monospace", fontSize: isMobile ? 9 : 10, color: tier?.color, letterSpacing: "0.15em", marginBottom: 6 }}>SUITABLE WHEN</div>
          <p style={{ margin: 0, fontSize: isMobile ? 11 : 12, color: S.textDim, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>{tier?.suitable}</p>
        </div>
        <div style={{ flex: isMobile ? "auto" : 1, minWidth: isMobile ? "auto" : 200 }}>
          <div style={{ fontFamily: "monospace", fontSize: isMobile ? 9 : 10, color: "#E07B6A", letterSpacing: "0.15em", marginBottom: 6 }}>RISK FACTOR</div>
          <p style={{ margin: 0, fontSize: isMobile ? 11 : 12, color: S.textDim, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>{tier?.risk}</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: S.altBg, borderBottom: `1px solid ${S.border}`, display: "flex", padding: isMobile ? "0 16px" : "0 36px", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            background: "transparent",
            border: "none",
            borderBottom: activeTab === t.id ? `2px solid ${tier?.color}` : "2px solid transparent",
            color: activeTab === t.id ? S.tabActive : S.tabInactive,
            fontFamily: "monospace",
            fontSize: isMobile ? 9 : 10,
            letterSpacing: "0.15em",
            padding: isMobile ? "12px 16px 10px" : "13px 18px 11px",
            cursor: "pointer",
            transition: "all 0.15s",
            whiteSpace: "nowrap",
            WebkitTapHighlightColor: "transparent",
            touchAction: "manipulation",
          }}>
            {t.label.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ padding: isMobile ? "24px 20px" : "32px 36px", maxWidth: 960 }}>

        {/* === INVESTMENT BREAKDOWN === */}
        {activeTab === "investment" && (
          <div>
            {/* Total Banner */}
            <div style={{
              background: `${tier?.color}10`,
              border: `1px solid ${tier?.color}30`,
              borderRadius: 4,
              padding: isMobile ? "16px 20px" : "20px 24px",
              marginBottom: isMobile ? 20 : 28,
              display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", flexWrap: "wrap", gap: 16, flexDirection: isMobile ? "column" : "row"
            }}>
              <div>
                <div style={{ fontFamily: "monospace", fontSize: isMobile ? 9 : 10, color: tier?.color, letterSpacing: "0.2em", marginBottom: 6 }}>
                  TOTAL INVESTMENT RANGE — {tier?.label}: {tier?.name.toUpperCase()}
                </div>
                <div style={{ fontSize: isMobile ? "clamp(18px, 5vw, 36px)" : "clamp(22px, 4vw, 36px)", color: S.text, fontWeight: 400, letterSpacing: "0.05em" }}>
                  ${totalLow.toLocaleString()} – ${totalHigh.toLocaleString()}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: S.textFaint, marginBottom: 4 }}>MIDPOINT ESTIMATE</div>
                <div style={{ fontSize: 24, color: tier?.color }}>${Math.round((totalLow + totalHigh) / 2).toLocaleString()}</div>
              </div>
            </div>

            {/* Category Breakdown */}
            {tier?.categories.map((cat, ci) => {
              const catLow = cat.items.reduce((a, i) => a + i.low, 0);
              const catHigh = cat.items.reduce((a, i) => a + i.high, 0);
              const isOpen = expandedCat === `${activeTier}-${ci}`;
              return (
                <div key={ci} style={{
                  background: S.card,
                  border: `1px solid ${S.border}`,
                  borderLeft: `3px solid ${cat.color}`,
                  borderRadius: 4,
                  marginBottom: 4,
                  overflow: "hidden"
                }}>
                  <button onClick={() => setExpandedCat(isOpen ? null : `${activeTier}-${ci}`)} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    width: "100%", background: "transparent", border: "none",
                    padding: "14px 20px", cursor: "pointer", gap: 16
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, flex: 1 }}>
                      <span style={{ fontSize: 13, color: S.textMid, fontFamily: "Georgia, serif" }}>{cat.name}</span>
                      <span style={{ fontFamily: "monospace", fontSize: 11, color: S.textFaint }}>
                        {cat.items.length} items
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <span style={{ fontFamily: "monospace", fontSize: 12, color: cat.color }}>
                        ${catLow.toLocaleString()} – ${catHigh.toLocaleString()}
                      </span>
                      <span style={{ color: S.textFaint, fontSize: 14 }}>{isOpen ? "−" : "+"}</span>
                    </div>
                  </button>

                  {isOpen && (
                    <div style={{ padding: "0 20px 16px" }}>
                      <div style={{ height: 1, background: S.border, marginBottom: 12 }} />
                      {cat.items.map((item, ii) => (
                        <div key={ii} style={{
                          display: "flex", justifyContent: "space-between", alignItems: "baseline",
                          padding: "8px 0", borderBottom: `1px solid ${S.rowBorder}`, gap: 16
                        }}>
                          <span style={{ fontSize: 12, color: S.textDim, lineHeight: 1.5, fontFamily: "Georgia, serif", flex: 1 }}>
                            {item.label}
                          </span>
                          <span style={{ fontFamily: "monospace", fontSize: 11, color: S.textMid, whiteSpace: "nowrap" }}>
                            ${item.low.toLocaleString()} – ${item.high.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Stacked bar visualization */}
            <div style={{ marginTop: 28, background: S.card, border: `1px solid ${S.border}`, borderRadius: 4, padding: "20px 24px" }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: S.textFaint, letterSpacing: "0.15em", marginBottom: 16 }}>
                ALLOCATION BREAKDOWN — MIDPOINT VALUES
              </div>
              {tier?.categories.map((cat, ci) => {
                const catMid = cat.items.reduce((a, i) => a + (i.low + i.high) / 2, 0);
                const totalMid = tier?.categories.reduce((a, c) => a + c.items.reduce((b, i) => b + (i.low + i.high) / 2, 0), 0) || 0;
                const pct = Math.round((catMid / totalMid) * 100);
                return (
                  <div key={ci} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 11, color: S.textDim, fontFamily: "Georgia, serif" }}>{cat.name}</span>
                      <span style={{ fontFamily: "monospace", fontSize: 10, color: cat.color }}>{pct}% · ${Math.round(catMid).toLocaleString()}</span>
                    </div>
                    <div style={{ height: 4, background: S.border, borderRadius: 2 }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: cat.color, borderRadius: 2, transition: "width 0.6s ease" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* === REVENUE PROJECTIONS === */}
        {activeTab === "projections" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: tier?.color, letterSpacing: "0.2em", marginBottom: 8 }}>
                REVENUE PROJECTIONS — {tier?.name?.toUpperCase()}
              </div>
              <p style={{ margin: 0, fontSize: 13, color: S.textDim, lineHeight: 1.75 }}>
                All projections are directional estimates based on comparable FMCG launches in the Lebanese market under Ru'ya 360°'s advisory scope. They assume successful MoPH registration, product-market fit validation in Phase 1, and no major currency or political disruption events.
              </p>
            </div>

            {/* Milestone cards */}
            {[
              { period: "Month 3", label: "End of Phase 1", accounts: tier?.projections?.accounts_m3, rev: "Revenue building — not yet material", color: S.textFaint },
              { period: "Month 6", label: "End of Phase 2", accounts: tier?.projections?.accounts_m6, rev: tier?.projections?.rev_m6, color: tier?.color },
              { period: "Month 12", label: "End of Phase 3", accounts: tier?.projections?.accounts_m12, rev: tier?.projections?.rev_m12, color: "#7EB5A6" },
            ].map((m, i) => (
              <div key={i} style={{
                background: S.card,
                border: `1px solid ${S.border}`,
                borderLeft: `3px solid ${m.color}`,
                borderRadius: 4,
                padding: isMobile ? "14px 18px" : "18px 24px",
                marginBottom: 8,
                display: "flex", gap: isMobile ? 16 : 24, flexWrap: "wrap", flexDirection: isMobile ? "column" : "row"
              }}>
                <div style={{ minWidth: 100 }}>
                  <div style={{ fontFamily: "monospace", fontSize: 12, color: m.color, marginBottom: 4 }}>{m.period}</div>
                  <div style={{ fontSize: 11, color: S.textFaint, fontFamily: "monospace" }}>{m.label}</div>
                </div>
                <div style={{ flex: 1, minWidth: 180 }}>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: S.textFaint, marginBottom: 4 }}>ACCOUNTS</div>
                  <div style={{ fontSize: 13, color: S.textMid, fontFamily: "Georgia, serif" }}>{m.accounts}</div>
                </div>
                <div style={{ flex: 1, minWidth: 180 }}>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: S.textFaint, marginBottom: 4 }}>MONTHLY REVENUE</div>
                  <div style={{ fontSize: 13, color: m.color, fontFamily: "monospace" }}>{m.rev}</div>
                </div>
              </div>
            ))}

            {/* Key metrics */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(180px, 1fr))", gap: isMobile ? 12 : 8, marginTop: 20 }}>
              {[
                { label: "Breakeven Target", value: tier?.projections?.breakeven, color: "#7EB5A6" },
                { label: "Target Gross Margin", value: tier?.projections?.gross_margin, color: tier?.color },
                { label: "Investment Recovery", value: activeTier === "lean" ? "Month 9–12" : activeTier === "standard" ? "Month 8–11" : "Month 10–14", color: "#9B8EC4" },
              ].map((m: any, i: number) => (
                <div key={i} style={{
                  background: S.card, border: `1px solid ${S.border}`,
                  borderRadius: 4, padding: "16px 20px"
                }}>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: S.textFaint, marginBottom: 8 }}>{m.label}</div>
                  <div style={{ fontSize: 18, color: m.color, fontFamily: "monospace" }}>{m.value}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, background: S.noteBg, border: `1px solid ${S.noteBorder}`, borderRadius: 4, padding: "16px 20px" }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#7EB5A6", marginBottom: 6 }}>MODEL ASSUMPTIONS NOTE</div>
              <p style={{ margin: 0, fontSize: 12, color: S.noteText, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>
                {tier?.projections?.note}. Revenue projections assume no major Lebanese economic disruption and are expressed in USD equivalent. All projections should be revised at Month 3 using actual sell-through data from the gym launch phase.
              </p>
            </div>
          </div>
        )}

        {/* === ASSUMPTIONS === */}
        {activeTab === "assumptions" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#9B8EC4", letterSpacing: "0.2em", marginBottom: 8 }}>
                MODEL ASSUMPTIONS
              </div>
              <p style={{ margin: 0, fontSize: 13, color: S.textDim, lineHeight: 1.75 }}>
                All financial projections are built on these foundational assumptions. Any change to these inputs changes the output materially. Review at Month 3, Month 6, and Month 12.
              </p>
            </div>
            {ASSUMPTIONS.map((a, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "baseline",
                padding: "12px 0", borderBottom: `1px solid ${S.rowBorder}`, gap: isMobile ? 12 : 24, flexDirection: isMobile ? "column" : "row"
              }}>
                <span style={{ fontSize: 13, color: S.textDim, fontFamily: "Georgia, serif", flex: 1 }}>{a.label}</span>
                <span style={{ fontFamily: "monospace", fontSize: 12, color: S.textMid, whiteSpace: "nowrap" }}>{a.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* === BLOCKERS === */}
        {activeTab === "blockers" && (
          <div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#E07B6A", letterSpacing: "0.2em", marginBottom: 8 }}>
                EXECUTION BLOCKERS — RESOLVE IN SEQUENCE
              </div>
              <p style={{ margin: 0, fontSize: 13, color: S.textDim, lineHeight: 1.75 }}>
                These items are currently blocking progress on the rest of the advisory framework. Each one must be resolved in order before the next phase of deliverables can be produced.
              </p>
            </div>
            {BLOCKERS.map((b, i) => (
              <div key={i} style={{
                background: S.card,
                border: `1px solid ${S.border}`,
                borderLeft: `3px solid ${b.urgency === "IMMEDIATE" ? "#E07B6A" : "#C8A96E"}`,
                borderRadius: 4, marginBottom: 6, padding: isMobile ? "14px 18px" : "16px 20px",
                display: "flex", gap: isMobile ? 12 : 16, flexWrap: "wrap", alignItems: "flex-start", flexDirection: isMobile ? "column" : "row"
              }}>
                <div style={{ minWidth: 90 }}>
                  <span style={{
                    fontFamily: "monospace", fontSize: 10,
                    color: b.urgency === "IMMEDIATE" ? "#E07B6A" : "#C8A96E",
                    background: b.urgency === "IMMEDIATE" ? "#E07B6A18" : "#C8A96E18",
                    border: `1px solid ${b.urgency === "IMMEDIATE" ? "#E07B6A40" : "#C8A96E40"}`,
                    padding: "3px 8px", borderRadius: 2
                  }}>
                    {b.urgency}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: S.textMid, fontFamily: "Georgia, serif", marginBottom: 6 }}>{b.label}</div>
                  <p style={{ margin: 0, fontSize: 12, color: S.textDim, lineHeight: 1.6, fontFamily: "Georgia, serif" }}>{b.detail}</p>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 24, background: S.altBg, border: `1px solid ${S.border}`, borderRadius: 4, padding: "18px 20px" }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: S.textFaint, letterSpacing: "0.15em", marginBottom: 10 }}>
                NEXT DELIVERABLES — UNLOCKED UPON BLOCKER RESOLUTION
              </div>
              {[
                "Pricing model — cost-up + competitive benchmarking (needs manufacturer cost-per-unit)",
                "Packaging design brief (needs brand name + nutritional panel)",
                "MoPH submission document checklist (needs nutritional panel + manufacturer details)",
                "Gym outreach script + trade presentation template (ready to produce now)",
                "Ru'ya 360° management mandate template (ready to produce now)",
                "Flavor development brief for manufacturer (ready to produce now)",
              ].map((item, i) => {
                const ready = item.includes("ready to produce now");
                return (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                    <span style={{ color: ready ? "#7EB5A6" : S.textFaint, fontSize: 12, flexShrink: 0, marginTop: 2 }}>
                      {ready ? "✓" : "→"}
                    </span>
                    <p style={{ margin: 0, fontSize: 12, color: ready ? S.readyText : S.notReadyText, lineHeight: 1.6, fontFamily: "Georgia, serif" }}>
                      {item.replace(" (ready to produce now)", "")}
                      {ready && <span style={{ fontFamily: "monospace", fontSize: 10, color: "#7EB5A6", marginLeft: 8 }}>READY NOW</span>}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: isMobile ? "16px 24px" : "16px 36px",
        borderTop: `1px solid ${S.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8
      }}>
        <span style={{ fontFamily: "monospace", fontSize: isMobile ? 9 : 10, color: S.footerText, letterSpacing: "0.15em" }}>
          Ru'ya 360° ADVISORY GROUP · FINANCIAL FEASIBILITY · CONFIDENTIAL · NOT FOR DISTRIBUTION
        </span>
        <span style={{ fontFamily: "monospace", fontSize: isMobile ? 9 : 10, color: S.footerText }}>
          KAG-JRK-003 · THREE-TIER MODEL
        </span>
      </div>
    </div>
  );
}

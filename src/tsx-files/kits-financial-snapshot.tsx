import { useState, useEffect, useRef } from "react";

// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const T = {
  bg:     "#08070A",
  card:   "#0E0C15",
  dark2:  "#111220",
  line:   "#1C1A24",
  gold:   "#C8A96E",
  goldBright: "#E0C080",
  goldDim: "#4A3820",
  cream:  "#E2D8CC",
  creamDim: "#7A7090",
  teal:   "#7EB5A6",
  coral:  "#E07B6A",
  purple: "#9B8EC4",
  dim:    "#4A4060",
  green:  "#5A9060",
  amber:  "#C07030",
};

// ─── INTERSECTION OBSERVER HOOK ────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── KPI CARD ─────────────────────────────────────────────────────────────────
interface KpiProps {
  label: string; value: string; sub: string;
  color: string; prefix?: string; badge?: string; delay?: number;
}
function KpiCard({ label, value, sub, color, badge, delay = 0 }: KpiProps) {
  const { ref, inView } = useInView();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(t);
    }
  }, [inView, delay]);
  return (
    <div ref={ref} style={{
      background: T.card,
      border: `1px solid ${color}30`,
      borderTop: `3px solid ${color}`,
      borderRadius: 4,
      padding: "16px 14px 14px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      transition: "opacity 0.5s, transform 0.5s",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(12px)",
    }}>
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 0%,${color}06 0%,transparent 70%)`, pointerEvents: "none" }} />
      {badge && (
        <div style={{ position: "absolute", top: 7, right: 7, fontFamily: "monospace", fontSize: 7, color, background: `${color}18`, border: `1px solid ${color}35`, padding: "2px 6px", borderRadius: 2, letterSpacing: "0.05em" }}>{badge}</div>
      )}
      <div style={{ fontFamily: "monospace", fontSize: "clamp(20px,3vw,28px)", fontWeight: 700, color, lineHeight: 1.1, margin: "6px 0 4px" }}>{value}</div>
      <div style={{ fontFamily: "monospace", fontSize: 9, color: T.dim, letterSpacing: "0.18em", lineHeight: 1.4, marginBottom: 4, textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontSize: 10, color: T.creamDim, fontFamily: "monospace" }}>{sub}</div>
    </div>
  );
}

// ─── ANIMATED BAR ─────────────────────────────────────────────────────────────
function AnimBar({ pct, color, delay = 0, inView }: { pct: number; color: string; delay?: number; inView: boolean }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setWidth(pct), delay + 80);
    return () => clearTimeout(t);
  }, [inView, pct, delay]);
  return (
    <div style={{ height: 5, background: T.line, borderRadius: 3, overflow: "hidden" }}>
      <div style={{ width: `${width}%`, height: "100%", background: `linear-gradient(to right,${color}80,${color})`, borderRadius: 3, transition: "width 0.9s cubic-bezier(0.25,0.46,0.45,0.94)" }} />
    </div>
  );
}

// ─── WATERFALL ROW ────────────────────────────────────────────────────────────
interface WfRow { label: string; value: string; color: string; sign: string; indent?: boolean; bold?: boolean; bar?: number; }
function WaterfallRow({ row, inView, delay }: { row: WfRow; inView: boolean; delay: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [inView, delay]);
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: row.bold ? "11px 0" : "8px 0",
      borderBottom: `1px solid ${T.line}`,
      borderTop: row.bold ? `1px solid ${T.line}` : "none",
      background: row.bold ? T.dark2 : "transparent",
      paddingLeft: row.indent ? 16 : 0,
      opacity: show ? 1 : 0,
      transform: show ? "translateX(0)" : "translateX(-12px)",
      transition: "opacity 0.4s, transform 0.4s",
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: row.bold ? 13 : 12, color: row.bold ? T.cream : T.creamDim, fontFamily: "Georgia, serif", lineHeight: 1.3, marginBottom: row.bar ? 5 : 0 }}>{row.label}</div>
        {row.bar !== undefined && (
          <AnimBar pct={row.bar} color={row.color} inView={inView} delay={delay + 200} />
        )}
      </div>
      <div style={{ fontFamily: "monospace", fontSize: row.bold ? 16 : 13, fontWeight: row.bold ? 700 : 400, color: row.color, whiteSpace: "nowrap" }}>
        <span style={{ fontSize: 10, opacity: 0.6, marginRight: 2 }}>{row.sign}</span>{row.value}
      </div>
    </div>
  );
}

// ─── CORRECTION BADGE ─────────────────────────────────────────────────────────
interface CorrectionProps {
  metric: string; old: string; current: string; reason: string; severity: "CRITICAL" | "HIGH" | "MEDIUM";
}
const SEV_COLOR = { CRITICAL: T.coral, HIGH: T.amber, MEDIUM: T.purple };
function CorrectionCard({ metric, old, current, reason, severity }: CorrectionProps) {
  const col = SEV_COLOR[severity];
  return (
    <div style={{ background: T.card, border: `1px solid ${col}28`, borderLeft: `3px solid ${col}`, borderRadius: 4, padding: "14px 16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 6 }}>
        <div style={{ fontFamily: "monospace", fontSize: 10, color: T.dim, letterSpacing: "0.15em" }}>{metric}</div>
        <span style={{ fontFamily: "monospace", fontSize: 8, color: col, background: `${col}18`, border: `1px solid ${col}35`, padding: "2px 7px", borderRadius: 2 }}>{severity}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, flexWrap: "wrap" }}>
        <div style={{ background: `${T.coral}12`, border: `1px solid ${T.coral}25`, borderRadius: 3, padding: "5px 10px" }}>
          <div style={{ fontFamily: "monospace", fontSize: 8, color: T.coral, marginBottom: 2 }}>ORIGINAL</div>
          <div style={{ fontFamily: "monospace", fontSize: 14, color: T.coral, textDecoration: "line-through", opacity: 0.7 }}>{old}</div>
        </div>
        <div style={{ color: T.dim, fontSize: 16 }}>→</div>
        <div style={{ background: `${T.teal}12`, border: `1px solid ${T.teal}25`, borderRadius: 3, padding: "5px 10px" }}>
          <div style={{ fontFamily: "monospace", fontSize: 8, color: T.teal, marginBottom: 2 }}>CORRECTED</div>
          <div style={{ fontFamily: "monospace", fontSize: 14, color: T.teal, fontWeight: 700 }}>{current}</div>
        </div>
      </div>
      <p style={{ margin: 0, fontSize: 11, color: T.creamDim, lineHeight: 1.65, fontFamily: "Georgia, serif" }}>{reason}</p>
    </div>
  );
}

// ─── RISK ROW ─────────────────────────────────────────────────────────────────
function RiskRow({ risk }: { risk: { severity: string; name: string; detail: string } }) {
  const col = risk.severity === "CRITICAL" ? T.coral : risk.severity === "HIGH" ? T.amber : risk.severity === "MEDIUM" ? T.purple : T.green;
  return (
    <div style={{ background: T.card, border: `1px solid ${col}22`, borderLeft: `3px solid ${col}`, borderRadius: 4, padding: "12px 16px", marginBottom: 6 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start", flexWrap: "wrap" }}>
        <span style={{ fontFamily: "monospace", fontSize: 8, color: col, background: `${col}15`, border: `1px solid ${col}30`, padding: "3px 8px", borderRadius: 2, flexShrink: 0 }}>{risk.severity}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: T.cream, fontFamily: "Georgia, serif", marginBottom: 4 }}>{risk.name}</div>
          <p style={{ margin: 0, fontSize: 11, color: T.creamDim, lineHeight: 1.65, fontFamily: "Georgia, serif" }}>{risk.detail}</p>
        </div>
      </div>
    </div>
  );
}

// ─── CHANNEL BAR ROW ──────────────────────────────────────────────────────────
function ChannelRow({ ch, inView, delay }: { ch: { label: string; pct: number; earn: string; color: string }; inView: boolean; delay: number }) {
  const [w, setW] = useState(0);
  useEffect(() => { if (!inView) return; const t = setTimeout(() => setW(ch.pct), delay); return () => clearTimeout(t); }, [inView, ch.pct, delay]);
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
        <span style={{ fontSize: 12, color: T.creamDim, fontFamily: "Georgia, serif" }}>{ch.label}</span>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <span style={{ fontFamily: "monospace", fontSize: 11, color: ch.color }}>{ch.pct}%</span>
          <span style={{ fontFamily: "monospace", fontSize: 11, color: T.teal }}>{ch.earn}</span>
        </div>
      </div>
      <div style={{ height: 6, background: T.line, borderRadius: 3 }}>
        <div style={{ width: `${w}%`, height: "100%", background: `linear-gradient(to right,${ch.color}60,${ch.color})`, borderRadius: 3, transition: "width 0.8s cubic-bezier(0.25,0.46,0.45,0.94)" }} />
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const TABS = [
  { id: "overview",   label: "Overview" },
  { id: "economics",  label: "Unit Economics" },
  { id: "tiers",      label: "Tier Comparison" },
  { id: "channels",   label: "Channel Margins" },
  { id: "risks",      label: "Risk Register" },
  { id: "assumptions",label: "Assumptions" },
];

const KPI_DATA = [
  { label: "Total Investment",   value: "$42,000",  sub: "Tier 2 — Standard Launch", color: T.gold,   badge: "RECOMMENDED" },
  { label: "Retail Price / Unit",value: "$4.50",    sub: "Per 40g pack — corrected", color: T.teal,   badge: "CORRECTED" },
  { label: "Cost Per Unit",      value: "$1.20",    sub: "Prod + packaging — base",  color: T.creamDim.replace("7A7090","9B8EC4"), color2: T.purple },
  { label: "Gross Profit / Unit",value: "$1.95",    sub: "At gym wholesale",         color: T.green },
  { label: "Gross Margin",       value: "62%",      sub: "At $4.50 RRP — corrected", color: T.teal,   badge: "CORRECTED" },
  { label: "Breakeven Month",    value: "M 9",      sub: "Full investment recovery",  color: T.amber,  badge: "REVISED" },
];

const WATERFALL_ROWS: WfRow[] = [
  { label: "Retail Price (RRP)",          value: "$4.50",   color: T.gold,   sign: "+", bold: true, bar: 100 },
  { label: "Channel Margin — Gym 30%",    value: "$1.35",   color: T.coral,  sign: "−", indent: true, bar: 30 },
  { label: "= Wholesale Revenue",         value: "$3.15",   color: T.teal,   sign: "=", bold: true, bar: 70 },
  { label: "Cost of Goods (COGS)",        value: "$1.20",   color: T.coral,  sign: "−", indent: true, bar: 27 },
  { label: "= Gross Profit / Unit",       value: "$1.95",   color: T.green,  sign: "=", bold: true, bar: 43 },
  { label: "Gross Margin %",              value: "61.9%",   color: T.teal,   sign: "→" },
];

const TIER_DATA = [
  { label: "Investment",      t1: "$18,500",       t2: "$42,000",        t3: "$82,000",       color: T.gold },
  { label: "Breakeven",       t1: "M 8–10",        t2: "M 9",            t3: "M 4–6",         color: T.amber },
  { label: "Gross Margin",    t1: "42–48%",        t2: "55–62%",         t3: "55–62%",        color: T.teal },
  { label: "M6 Revenue",      t1: "$5K–$8K",       t2: "$9K–$14K",       t3: "$25K–$40K",     color: T.green },
  { label: "M12 Revenue",     t1: "$18K–$28K",     t2: "$40K–$65K",      t3: "$80K–$130K",    color: T.green },
  { label: "Accts @ M6",      t1: "30–40",         t2: "60–80",          t3: "100–130",       color: T.purple },
  { label: "SKUs",            t1: "1",             t2: "2",              t3: "3",             color: T.dim },
];

const ALLOCATION = [
  { label: "Legal & Regulatory",   pct: 19, amount: "$8,000",  color: T.gold },
  { label: "Brand & Packaging",    pct: 21, amount: "$9,000",  color: T.purple },
  { label: "Production & Supply",  pct: 29, amount: "$12,000", color: T.coral },
  { label: "Sales & Activation",   pct: 10, amount: "$4,000",  color: T.teal },
  { label: "Operations & RU2YA",   pct: 21, amount: "$9,000",  color: T.amber },
];

const CHANNELS = [
  { label: "Gyms & CrossFit Boxes",             pct: 30, earn: "$3.15 / unit", color: T.teal },
  { label: "Nutrition / Supplement Stores",     pct: 32, earn: "$3.06 / unit", color: T.green },
  { label: "Pharmacies",                        pct: 33, earn: "$3.02 / unit", color: T.purple },
  { label: "Modern Trade (Spinneys, Carrefour)", pct: 38, earn: "$2.79 / unit", color: T.amber },
  { label: "Distributor Margin (additional)",   pct: 20, earn: "On top of channel", color: T.dim },
];

const CORRECTIONS = [
  {
    metric: "RETAIL PRICE / UNIT",
    old: "$3.00–$3.50",
    current: "$4.50",
    severity: "CRITICAL" as const,
    reason: "Jack Link's 40g retails at $5.62 on LivGood Lebanon. Quest Bar singles at $5.00. Wild West is not stocked in Lebanon — the market is effectively green-field. Setting price at $4.00–$4.75 positions 10–25% below imported Jack Link's while capturing full premium margin.",
  },
  {
    metric: "M6 REVENUE — TIER 2",
    old: "$18K–$28K / mo",
    current: "$9K–$14K / mo",
    severity: "HIGH" as const,
    reason: "Original figure implied 3.5–7.2 units/account/day for a new SKU. Industry benchmark for new brands is 0.5–2 units/account/day. Re-modelled at 1.5 units/day × 60–80 accounts = $8,500–$11,300/month. The $18K–$28K number is retained as the upside scenario contingent on >25% repeat rate.",
  },
  {
    metric: "MOPH FOOD REGISTRATION FEE",
    old: "$800–$2,500 per SKU",
    current: "NO PUBLIC FEE SCHEDULE",
    severity: "HIGH" as const,
    reason: "Lebanese MoPH publishes no public fee schedule for packaged-food product registration. This figure CANNOT be presented to the board as verified. A direct written quote must be obtained from MoPH Food Safety Department before any regulatory budget is tabled.",
  },
  {
    metric: "GS1 LEBANON — BARCODE FEE",
    old: "$200–$500",
    current: "REQUIRES DIRECT QUOTE",
    severity: "MEDIUM" as const,
    reason: "gs1lb.org has no published fee schedule. Contact customers@gs1lb.org or +961 1 744 161 for a written quote before presenting this figure. Benchmark: GS1 Albania ~$155 registration + annual licence. Working placeholder $150–$300 reg + $200–$500/yr.",
  },
  {
    metric: "GROSS MARGIN TARGET",
    old: "48–55%",
    current: "55–62%",
    severity: "MEDIUM" as const,
    reason: "At the corrected $4.50 RRP and 32% channel margin, wholesale is $3.06 vs COGS $1.20 — GM = 60.8%. The 48–55% target is only achievable at the corrected RRP, not the original $3.00. This correction is an upward revision.",
  },
  {
    metric: "BREAKEVEN TIMELINE — TIER 2",
    old: "Month 5–7",
    current: "Month 8–11",
    severity: "MEDIUM" as const,
    reason: "Revenue ramp adjusted ~50% downward at M6 due to velocity correction. Breakeven shifts proportionally. M12 revenue ($40K–$65K) remains achievable if M6–M12 traction materializes at 2–4 units/account/day, a realistic ramp from the corrected M6 base.",
  },
];

const RISKS = [
  { severity: "CRITICAL", name: "Retail Pricing — REQUIRES BOARD CORRECTION", detail: "Original $2.50–$3.50 is materially under-priced. Jack Link's retails at $5.62. Price floor $4.00 / ceiling $4.75. Do not present any number below $4.00 to the board or client." },
  { severity: "HIGH", name: "Revenue Velocity — M6 Revised 50% Down", detail: "Original M6 projection required average accounts to perform at top-quartile velocity. Realistic base case: 1.5 units/day × 70 accounts = ~$9K–$14K/month. Retain original as upside scenario only." },
  { severity: "HIGH", name: "MoPH Registration — No Verified Fee", detail: "Lebanese MoPH publishes no public fee schedule. All regulatory budget lines citing a per-SKU registration fee are placeholders. Required action: direct written quote from MoPH before board presentation." },
  { severity: "MEDIUM", name: "Power Costs — Lebanon Highest in Arab World", detail: "Lebanon commercial electricity rate $0.247/kWh (2025), generator supply ~$0.32/kWh — highest in the Arab region by published benchmark. For energy-intensive drying ovens, budget $500–$1,200/month at Tier 2 scale, explicitly carved out in COGS." },
  { severity: "MEDIUM", name: "Banking Controls — USD Offshore Account Required", detail: "Circular 158 capital controls mean local banks are unreliable for USD. Most SMEs run cash USD or offshore banking. International supplier payments (Turkish packaging, SGS halal) require offshore wire. Budget $1,500–$3,000 one-time setup — not currently in study." },
  { severity: "MEDIUM", name: "Modern Trade Listing Fees — Missing from Budget", detail: "Spinneys, Carrefour, and TSC Lebanon require $500–$2,000 per chain listing fee for new category entrants, per Bagason Group MENA guide. Study does not include this in Tier 2 or Tier 3 budgets. Required if modern trade entry is in the plan." },
  { severity: "LOW", name: "FX Stability — Currently Stable", detail: "LBP pegged at ~89,500 LBP/USD since Dec 2023 Sayrafa reset. Capital controls remain but FX risk is materially lower than 2020–2022. Plan 90-day pricing reviews as protocol." },
  { severity: "LOW", name: "Halal Scope — Lebanon Only vs GCC-Portable", detail: "Dar Al-Fatwa covers Lebanon only. GCC-portable certification via SGS Gulf (SASO + ESMA approved) runs $5,000–$12,000 first year. If GCC export is planned within 18 months, begin SGS process at launch — not after first export attempt." },
];

const ASSUMPTIONS_DATA = [
  { label: "Retail Price (RRP)",        value: "$4.50 / 40g",          corrected: true },
  { label: "Cost Per Unit (COGS)",      value: "$1.20 base case",       corrected: false },
  { label: "Gross Margin Target",       value: "55–62%",                corrected: true },
  { label: "Gym Channel Margin",        value: "30%",                   corrected: false },
  { label: "Nutrition Store Margin",    value: "32%",                   corrected: false },
  { label: "Modern Trade Margin",       value: "38%",                   corrected: false },
  { label: "Distributor Margin",        value: "20% (base case)",       corrected: false },
  { label: "USD / LBP Exchange Rate",   value: "~89,500 LBP (stable)",  corrected: false },
  { label: "Price Review Cycle",        value: "Every 90 days",         corrected: false },
  { label: "MoPH Registration Fee",     value: "TBD — requires quote",  corrected: true },
  { label: "GS1 Lebanon Fee",           value: "TBD — requires quote",  corrected: true },
  { label: "Halal Cert (Lebanon only)", value: "$400–$800 Dar Al-Fatwa", corrected: false },
  { label: "Halal Cert (GCC-portable)", value: "$5,000–$12,000 SGS",    corrected: true },
  { label: "Power Cost (Lebanon)",      value: "$0.27–$0.32 / kWh",     corrected: true },
  { label: "Offshore Banking Setup",    value: "$1,500–$3,000 one-time", corrected: true },
  { label: "Modern Trade Listing Fee",  value: "$500–$2,000 per chain",  corrected: true },
  { label: "MoPH Approval Timeline",    value: "2–4 months (industry estimate)", corrected: false },
  { label: "Jack Links Benchmark Price","value": "$5.62 at LivGood Lebanon", corrected: false },
];

export default function FinancialSnapshot() {
  const [tab, setTab] = useState("overview");
  const isMobileQuery = typeof window !== "undefined" && window.innerWidth < 768;
  const [isMobile, setIsMobile] = useState(isMobileQuery);
  const { ref: overviewRef } = useInView();
  const { ref: economicsRef, inView: economicsInView } = useInView();
  const { ref: channelsRef, inView: channelsInView } = useInView();
  const { ref: allocRef, inView: allocInView } = useInView();

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  // Inject CSS keyframes
  useEffect(() => {
    const id = "fin-snap-styles";
    if (document.getElementById(id)) return;
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `
      @keyframes fsPulse { 0%,100%{opacity:0.45} 50%{opacity:1} }
      @keyframes fsFadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      @keyframes fsSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      .fs-tab-btn:hover { background: rgba(200,169,110,0.06) !important; }
    `;
    document.head.appendChild(s);
    return () => document.getElementById(id)?.remove();
  }, []);

  return (
    <div style={{ fontFamily: "'Georgia','Times New Roman',serif", background: T.bg, minHeight: "100vh", color: T.cream }}>

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div style={{ background: T.card, borderBottom: `3px solid ${T.gold}`, padding: isMobile ? "16px 20px 14px" : "20px 32px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 9, color: T.dim, letterSpacing: "0.35em", marginBottom: 6 }}>
              RU2YA ADVISORY GROUP · FINANCIAL SNAPSHOT · REF: KAG-JRK-003 · v2.0 · CONFIDENTIAL
            </div>
            <h1 style={{ margin: 0, fontSize: isMobile ? "clamp(18px,4vw,28px)" : "clamp(20px,2.8vw,30px)", fontWeight: 400, color: T.gold, lineHeight: 1.2, letterSpacing: "0.05em" }}>
              STRIKE BITES — Financial Snapshot
            </h1>
            <p style={{ margin: "5px 0 0", fontSize: isMobile ? 12 : 13, color: T.creamDim, fontFamily: "monospace" }}>
              Tier 2 Standard Launch · Lebanon Market Entry · Corrected Model · 2025–2026
            </p>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignSelf: "flex-end" }}>
            {["v2.0 Corrected", "6 Corrections Applied", "Jack Links Benchmarked"].map((b, i) => (
              <span key={i} style={{ fontFamily: "monospace", fontSize: 8, color: T.teal, background: `${T.teal}12`, border: `1px solid ${T.teal}28`, padding: "4px 10px", borderRadius: 2, letterSpacing: "0.05em" }}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── KPI GRID ────────────────────────────────────────────────────────── */}
      <div style={{ padding: isMobile ? "16px 16px 0" : "20px 32px 0" }}>
        <div style={{ fontFamily: "monospace", fontSize: 9, color: T.dim, letterSpacing: "0.2em", marginBottom: 10 }}>KEY PERFORMANCE INDICATORS — TIER 2 BASE CASE</div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(6,1fr)", gap: 6 }}>
          {KPI_DATA.map((k, i) => (
            <KpiCard key={i} {...k} color={k.color || T.purple} delay={i * 80} />
          ))}
        </div>
      </div>

      {/* ── TABS ────────────────────────────────────────────────────────────── */}
      <div style={{ background: T.card, borderBottom: `1px solid ${T.line}`, padding: isMobile ? "0 12px" : "0 32px", marginTop: 16, display: "flex", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        {TABS.map(t => (
          <button key={t.id} className="fs-tab-btn" onClick={() => setTab(t.id)} style={{
            background: "transparent",
            border: "none",
            borderBottom: tab === t.id ? `2px solid ${T.gold}` : "2px solid transparent",
            color: tab === t.id ? T.cream : T.dim,
            fontFamily: "monospace",
            fontSize: isMobile ? 9 : 10,
            letterSpacing: "0.12em",
            padding: isMobile ? "12px 14px 10px" : "13px 18px 11px",
            cursor: "pointer",
            transition: "all 0.15s",
            whiteSpace: "nowrap",
            WebkitTapHighlightColor: "transparent",
          }}>{t.label.toUpperCase()}</button>
        ))}
      </div>

      {/* ── CONTENT AREA ────────────────────────────────────────────────────── */}
      <div style={{ padding: isMobile ? "20px 16px 40px" : "28px 32px 48px", maxWidth: 1080 }}>

        {/* ═══ OVERVIEW ═══════════════════════════════════════════════════════ */}
        {tab === "overview" && (
          <div ref={overviewRef}>
            {/* Correction banner */}
            <div style={{ background: `${T.coral}0D`, border: `1px solid ${T.coral}30`, borderLeft: `4px solid ${T.coral}`, borderRadius: 4, padding: isMobile ? "14px 16px" : "16px 20px", marginBottom: 24 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: T.coral, letterSpacing: "0.2em", marginBottom: 6 }}>CORRECTION NOTICE — SUPERSEDES PREVIOUS VERSION</div>
              <p style={{ margin: 0, fontSize: isMobile ? 12 : 13, color: T.creamDim, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>
                This document incorporates 6 material corrections to the original financial feasibility study (KAG-JRK-003). The most critical: retail price is corrected from $3.00–$3.50 to <strong style={{ color: T.teal }}>$4.50</strong> (benchmarked against Jack Link's at $5.62 in Lebanon); M6 revenue revised down to <strong style={{ color: T.teal }}>$9K–$14K/month</strong> based on realistic sell-through velocity data. All prior presentations using uncorrected figures must be updated before the board meeting.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 24 }}>
              {/* Corrections summary */}
              <div>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: T.dim, letterSpacing: "0.18em", marginBottom: 14 }}>KEY CORRECTIONS — SUMMARY</div>
                {[
                  { label: "Retail Price", old: "$3.00–$3.50", new: "$4.50", col: T.teal },
                  { label: "M6 Revenue (Tier 2)", old: "$18K–$28K", new: "$9K–$14K", col: T.amber },
                  { label: "Gross Margin", old: "48–55%", new: "55–62%", col: T.teal },
                  { label: "Breakeven (Tier 2)", old: "Month 5–7", new: "Month 8–11", col: T.amber },
                  { label: "MoPH Fee", old: "$800–$2,500", new: "TBD — quote required", col: T.coral },
                  { label: "GS1 Lebanon", old: "$200–$500", new: "TBD — quote required", col: T.coral },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${T.line}`, alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                    <span style={{ fontSize: 12, color: T.creamDim, fontFamily: "Georgia, serif", flex: "0 0 auto", minWidth: 140 }}>{c.label}</span>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "monospace", fontSize: 11, color: T.coral, textDecoration: "line-through", opacity: 0.6 }}>{c.old}</span>
                      <span style={{ color: T.dim, fontSize: 12 }}>→</span>
                      <span style={{ fontFamily: "monospace", fontSize: 11, color: c.col, fontWeight: 700 }}>{c.new}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Investment allocation */}
              <div ref={allocRef}>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: T.dim, letterSpacing: "0.18em", marginBottom: 14 }}>INVESTMENT ALLOCATION — $42,000 TIER 2</div>
                {ALLOCATION.map((a, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 11, color: T.creamDim, fontFamily: "Georgia, serif" }}>{a.label}</span>
                      <span style={{ fontFamily: "monospace", fontSize: 10, color: a.color }}>{a.pct}% · {a.amount}</span>
                    </div>
                    <AnimBar pct={a.pct} color={a.color} inView={allocInView} delay={i * 120} />
                  </div>
                ))}
              </div>
            </div>

            {/* Tier comparison quick view */}
            <div style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: 4, padding: "18px 20px" }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: T.dim, letterSpacing: "0.18em", marginBottom: 14 }}>TIER COMPARISON — HEADLINE FIGURES</div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)", gap: 8 }}>
                {[
                  { tier: "TIER 1 LEAN", inv: "$18,500", m6: "$5K–$8K", gm: "42–48%", be: "M8–10", col: T.teal },
                  { tier: "TIER 2 STANDARD ★", inv: "$42,000", m6: "$9K–$14K", gm: "55–62%", be: "M8–11", col: T.gold },
                  { tier: "TIER 3 FULL", inv: "$82,000", m6: "$25K–$40K", gm: "55–62%", be: "M4–6", col: T.coral },
                ].map((t, i) => (
                  <div key={i} style={{ background: i === 1 ? `${T.gold}0A` : T.dark2, border: `1px solid ${t.col}${i === 1 ? "40" : "20"}`, borderTop: `3px solid ${t.col}`, borderRadius: 3, padding: "14px 16px" }}>
                    <div style={{ fontFamily: "monospace", fontSize: 9, color: t.col, letterSpacing: "0.12em", marginBottom: 8 }}>{t.tier}</div>
                    {[["Investment", t.inv], ["M6 Revenue", t.m6], ["Gross Margin", t.gm], ["Breakeven", t.be]].map(([l, v], j) => (
                      <div key={j} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: `1px solid ${T.line}` }}>
                        <span style={{ fontSize: 10, color: T.dim }}>{l}</span>
                        <span style={{ fontFamily: "monospace", fontSize: 10, color: t.col }}>{v}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ UNIT ECONOMICS ════════════════════════════════════════════════ */}
        {tab === "economics" && (
          <div ref={economicsRef}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>
              {/* Waterfall */}
              <div>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: T.gold, letterSpacing: "0.2em", marginBottom: 6 }}>PRICE STACK — 40g UNIT</div>
                <p style={{ margin: "0 0 16px", fontSize: 12, color: T.creamDim, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>
                  At $4.50 RRP and a 30% gym channel margin, the unit economics are fundamentally different from the original model. Gross margin of 61.9% is achievable and positions STRIKE Bites in line with premium imported protein snacks.
                </p>
                <div style={{ background: T.card, border: `1px solid ${T.line}`, borderRadius: 4, padding: "16px 18px" }}>
                  {WATERFALL_ROWS.map((r, i) => (
                    <WaterfallRow key={i} row={r} inView={economicsInView} delay={i * 140} />
                  ))}
                </div>
              </div>

              {/* Competitive pricing */}
              <div>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: T.gold, letterSpacing: "0.2em", marginBottom: 6 }}>COMPETITIVE PRICING — LEBANON SHELF</div>
                <p style={{ margin: "0 0 16px", fontSize: 12, color: T.creamDim, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>
                  Verified Lebanese shelf prices confirm the pricing correction. STRIKE Bites at $4.50 positions below imported Jack Link's while retaining premium margin.
                </p>
                {[
                  { brand: "Jack Link's 40g", price: "$5.62", source: "LivGood Lebanon", col: T.coral, note: "Direct competitor — same format" },
                  { brand: "Quest Protein Bar", price: "$5.00", source: "Protein District LB", col: T.amber, note: "Premium protein benchmark" },
                  { brand: "Barebells 55g", price: "$3.89–$4.16", source: "Kelchi / LivGood LB", col: T.purple, note: "Protein bar — different format" },
                  { brand: "STRIKE BITES 40g", price: "$4.00–$4.75", source: "RU2YA recommendation", col: T.teal, note: "10–25% below Jack Link's" },
                  { brand: "Wild West", price: "NOT STOCKED", source: "Lebanon — no SKU found", col: T.dim, note: "Carrefour, LivGood: no listing" },
                ].map((b, i) => (
                  <div key={i} style={{ background: b.brand.startsWith("STRIKE") ? `${T.teal}0A` : T.card, border: `1px solid ${b.col}${b.brand.startsWith("STRIKE") ? "40" : "20"}`, borderLeft: `3px solid ${b.col}`, borderRadius: 3, padding: "10px 14px", marginBottom: 6, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, color: T.cream, fontFamily: "Georgia, serif", marginBottom: 2 }}>{b.brand}</div>
                      <div style={{ fontFamily: "monospace", fontSize: 9, color: T.dim }}>{b.source} · {b.note}</div>
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: 14, color: b.col, whiteSpace: "nowrap" }}>{b.price}</div>
                  </div>
                ))}
                <div style={{ marginTop: 12, background: `${T.teal}08`, border: `1px solid ${T.teal}20`, borderRadius: 3, padding: "10px 14px" }}>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: T.teal, marginBottom: 4 }}>KEY FINDING</div>
                  <p style={{ margin: 0, fontSize: 11, color: T.creamDim, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>Wild West is NOT present in Lebanon. The local jerky category is green-field for a Halal-native brand. STRIKE Bites has no direct local competitor — the competitive set is premium imported snacks, not a local incumbent.</p>
                </div>
              </div>
            </div>

            {/* Revenue projection */}
            <div style={{ marginTop: 24, background: T.card, border: `1px solid ${T.line}`, borderRadius: 4, padding: "18px 20px" }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: T.dim, letterSpacing: "0.18em", marginBottom: 14 }}>CORRECTED REVENUE MODEL — TIER 2 BASE CASE</div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 10 }}>
                {[
                  { period: "Month 6", label: "Base Case", accounts: "60–80 accounts", velocity: "1.5 units/day avg", rev: "$9K–$14K / mo", col: T.gold },
                  { period: "Month 6", label: "Upside (>25% repeat)", accounts: "60–80 accounts", velocity: "2.5+ units/day", rev: "$15K–$22K / mo", col: T.teal },
                  { period: "Month 12", label: "Growth Target", accounts: "120–160 accounts", velocity: "2–4 units/day", rev: "$40K–$65K / mo", col: T.green },
                ].map((r, i) => (
                  <div key={i} style={{ background: T.dark2, border: `1px solid ${r.col}30`, borderTop: `3px solid ${r.col}`, borderRadius: 3, padding: "13px 16px" }}>
                    <div style={{ fontFamily: "monospace", fontSize: 10, color: r.col, marginBottom: 4 }}>{r.period} — {r.label}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 18, color: r.col, marginBottom: 8 }}>{r.rev}</div>
                    <div style={{ fontSize: 11, color: T.dim }}>{r.accounts}</div>
                    <div style={{ fontSize: 11, color: T.dim }}>{r.velocity}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, padding: "10px 14px", background: `${T.amber}08`, border: `1px solid ${T.amber}20`, borderRadius: 3 }}>
                <p style={{ margin: 0, fontSize: 11, color: T.creamDim, fontFamily: "Georgia, serif", lineHeight: 1.7 }}>
                  M12 projection ($40K–$65K) unchanged — achievable if M6–M12 traction materializes. Requires accounts to ramp from 1.5 to 2–4 units/day, which is realistic for an established SKU at month 8–12 with active trainer program and repeat purchasing. All projections assume $4.50 RRP and no major Lebanese economic disruption.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ═══ TIER COMPARISON ═══════════════════════════════════════════════ */}
        {tab === "tiers" && (
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: T.dim, letterSpacing: "0.18em", marginBottom: 16 }}>THREE-TIER INVESTMENT COMPARISON — CORRECTED FIGURES</div>
            {/* Tier headers */}
            <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: isMobile ? 460 : "auto" }}>
                <thead>
                  <tr>
                    <th style={{ padding: "10px 14px", textAlign: "left", fontFamily: "monospace", fontSize: 10, color: T.dim, borderBottom: `1px solid ${T.line}`, width: "28%" }}>METRIC</th>
                    {[{ tier: "TIER 1", name: "Lean Launch", col: T.teal }, { tier: "TIER 2 ★", name: "Standard Launch", col: T.gold }, { tier: "TIER 3", name: "Full Market Entry", col: T.coral }].map((h, i) => (
                      <th key={i} style={{ padding: "10px 14px", textAlign: "center", fontFamily: "monospace", fontSize: 10, color: h.col, borderBottom: `1px solid ${T.line}`, background: i === 1 ? `${T.gold}08` : "transparent" }}>
                        <div>{h.tier}</div>
                        <div style={{ fontSize: 9, color: T.dim, letterSpacing: "0" }}>{h.name}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TIER_DATA.map((row, ri) => (
                    <tr key={ri} style={{ borderBottom: `1px solid ${T.line}` }}>
                      <td style={{ padding: "11px 14px", fontFamily: "Georgia, serif", fontSize: 12, color: T.creamDim }}>{row.label}</td>
                      {[row.t1, row.t2, row.t3].map((v, ci) => (
                        <td key={ci} style={{ padding: "11px 14px", textAlign: "center", fontFamily: "monospace", fontSize: ci === 1 ? 13 : 12, color: ci === 1 ? row.color : T.dim, background: ci === 1 ? `${T.gold}06` : ri % 2 === 0 ? T.dark2 : "transparent", fontWeight: ci === 1 ? 700 : 400 }}>{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tier detail cards */}
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 10, marginTop: 20 }}>
              {[
                { tier: "TIER 1", name: "Lean Launch", col: T.teal, rec: false, summary: "Designed for validation with minimum viable capital. Packaging and identity at this tier are functional, not exceptional. Risk of appearing underfunded versus imported competitors at pharmacy shelf level.", skus: "1 SKU", phase: "Phases 0–1", focus: "Market validation" },
                { tier: "TIER 2 RECOMMENDED", name: "Standard Launch", col: T.gold, rec: true, summary: "The recommended scenario. Funds proper brand identity, two SKUs, full gym-to-pharmacy launch, and working capital buffer covering the 3–4 month regulatory lag. RU2YA operates with full mandate.", skus: "2 SKUs", phase: "Phases 0–2", focus: "Market capture" },
                { tier: "TIER 3", name: "Full Market Entry", col: T.coral, rec: false, summary: "Comprehensive entry for an entrepreneur with confirmed long-term capital commitment. Positions STRIKE to own the Lebanese protein snack category and be export-ready for GCC within 12 months.", skus: "3 SKUs", phase: "Phases 0–3", focus: "Category ownership" },
              ].map((t, i) => (
                <div key={i} style={{ background: t.rec ? `${T.gold}08` : T.card, border: `1px solid ${t.col}${t.rec ? "40" : "22"}`, borderRadius: 4, padding: "16px 18px", position: "relative" }}>
                  {t.rec && <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: T.gold, color: T.bg, fontFamily: "monospace", fontSize: 7, padding: "3px 10px", borderRadius: 2, whiteSpace: "nowrap" }}>RU2YA RECOMMENDS</div>}
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: t.col, letterSpacing: "0.15em", marginBottom: 6 }}>{t.tier}</div>
                  <div style={{ fontSize: 14, color: T.cream, marginBottom: 8 }}>{t.name}</div>
                  <p style={{ margin: "0 0 12px", fontSize: 11, color: T.creamDim, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>{t.summary}</p>
                  {[["SKUs at launch", t.skus], ["Scope", t.phase], ["Strategic focus", t.focus]].map(([l, v], j) => (
                    <div key={j} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${T.line}` }}>
                      <span style={{ fontSize: 10, color: T.dim }}>{l}</span>
                      <span style={{ fontFamily: "monospace", fontSize: 10, color: t.col }}>{v}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ CHANNEL MARGINS ═══════════════════════════════════════════════ */}
        {tab === "channels" && (
          <div ref={channelsRef}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>
              <div>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: T.dim, letterSpacing: "0.18em", marginBottom: 6 }}>CHANNEL MARGIN STRUCTURE — AT $4.50 RRP</div>
                <p style={{ margin: "0 0 18px", fontSize: 12, color: T.creamDim, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>
                  Channel margins shown as percentage kept by the retailer/channel. RU2YA earns the residual wholesale price (100% minus channel margin), which must cover COGS and deliver gross profit.
                </p>
                {CHANNELS.map((ch, i) => (
                  <ChannelRow key={i} ch={ch} inView={channelsInView} delay={i * 120} />
                ))}
                <div style={{ marginTop: 14, padding: "10px 14px", background: `${T.amber}08`, border: `1px solid ${T.amber}20`, borderRadius: 3 }}>
                  <p style={{ margin: 0, fontSize: 11, color: T.creamDim, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>
                    If a distributor is engaged, their 20% margin applies on top of the channel margin — compressing wholesale revenue further. Tier 1 and Tier 2 plan direct distribution; distributor margin applies from Tier 3 scale.
                  </p>
                </div>
              </div>

              <div>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: T.dim, letterSpacing: "0.18em", marginBottom: 6 }}>CHANNEL PRIORITY SEQUENCE</div>
                {[
                  { phase: "Phase 1 — M0–M3", channels: ["Gyms & CrossFit boxes"], rationale: "Highest protein intent, lowest listing barrier. Sale-or-return on first order. Trainer network activation starts here.", color: T.teal },
                  { phase: "Phase 2 — M3–M6", channels: ["Nutrition & supplement stores", "Pharmacies (selective)"], rationale: "Protein District, Sport Nutrition Lebanon, Bou Khalil Pharmacy. Consumer already in protein-buying mode at point of sale.", color: T.gold },
                  { phase: "Phase 3 — M6–M12", channels: ["Healthy cafés & retailers", "Corporate / B2B accounts"], rationale: "Volume diversification. Corporate channel (office catering, event sampling) requires minimal margin pressure.", color: T.purple },
                  { phase: "Phase 4 — M7+", channels: ["Modern trade (Spinneys, Carrefour, TSC)"], rationale: "Listing fees $500–$2,000 per chain + 38% margin. Only enter with proven velocity data from Phase 1–2 accounts.", color: T.coral },
                ].map((p, i) => (
                  <div key={i} style={{ background: T.card, border: `1px solid ${p.color}22`, borderLeft: `3px solid ${p.color}`, borderRadius: 3, padding: "12px 16px", marginBottom: 8 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 9, color: p.color, letterSpacing: "0.12em", marginBottom: 6 }}>{p.phase}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 7 }}>
                      {p.channels.map((c, j) => (
                        <span key={j} style={{ fontFamily: "monospace", fontSize: 9, color: p.color, background: `${p.color}12`, border: `1px solid ${p.color}25`, padding: "2px 8px", borderRadius: 2 }}>{c}</span>
                      ))}
                    </div>
                    <p style={{ margin: 0, fontSize: 11, color: T.creamDim, lineHeight: 1.6, fontFamily: "Georgia, serif" }}>{p.rationale}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══ RISK REGISTER ════════════════════════════════════════════════ */}
        {tab === "risks" && (
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: T.coral, letterSpacing: "0.18em", marginBottom: 6 }}>RISK REGISTER — v2.0</div>
            <p style={{ margin: "0 0 20px", fontSize: 13, color: T.creamDim, lineHeight: 1.7, fontFamily: "Georgia, serif" }}>
              Risks identified through the financial validation process. CRITICAL and HIGH items must be resolved before the board meeting. Corrections already applied are noted above in the corrections summary.
            </p>
            {RISKS.map((r, i) => <RiskRow key={i} risk={r} />)}
            <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 8 }}>
              {[
                { label: "Critical", count: RISKS.filter(r => r.severity === "CRITICAL").length, color: T.coral },
                { label: "High", count: RISKS.filter(r => r.severity === "HIGH").length, color: T.amber },
                { label: "Medium / Low", count: RISKS.filter(r => r.severity === "MEDIUM" || r.severity === "LOW").length, color: T.purple },
              ].map((s, i) => (
                <div key={i} style={{ background: T.card, border: `1px solid ${s.color}25`, borderRadius: 3, padding: "12px 16px", textAlign: "center" }}>
                  <div style={{ fontFamily: "monospace", fontSize: 28, color: s.color, lineHeight: 1 }}>{s.count}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: T.dim, marginTop: 4 }}>{s.label.toUpperCase()} RISK ITEMS</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══ CORRECTIONS DETAIL ════════════════════════════════════════════ */}
        {tab === "assumptions" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12, marginBottom: 24 }}>
              {CORRECTIONS.map((c, i) => <CorrectionCard key={i} {...c} />)}
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: T.dim, letterSpacing: "0.18em", marginBottom: 12 }}>FULL MODEL ASSUMPTIONS — CORRECTED v2.0</div>
            {ASSUMPTIONS_DATA.map((a, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${T.line}`, flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontSize: 12, color: T.creamDim, fontFamily: "Georgia, serif", flex: "0 0 auto", minWidth: 220 }}>{a.label}</span>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {a.corrected && <span style={{ fontFamily: "monospace", fontSize: 7, color: T.teal, background: `${T.teal}15`, border: `1px solid ${T.teal}30`, padding: "2px 6px", borderRadius: 2 }}>CORRECTED</span>}
                  <span style={{ fontFamily: "monospace", fontSize: 11, color: a.corrected ? T.teal : T.cream }}>{a.value}</span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${T.line}`, padding: isMobile ? "12px 16px" : "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontFamily: "monospace", fontSize: 9, color: `${T.dim}80`, letterSpacing: "0.12em" }}>RU2YA ADVISORY GROUP · FINANCIAL SNAPSHOT v2.0 · CONFIDENTIAL · NOT FOR DISTRIBUTION</span>
        <span style={{ fontFamily: "monospace", fontSize: 9, color: `${T.dim}80` }}>KAG-JRK-003 · STRIKE BITES · JUNE 2026</span>
      </div>

    </div>
  );
}

import { useState, useEffect, useCallback } from "react";

// ─── TYPE DEFINITIONS ───────────────────────────────────────────────────────────
interface BaseSlide {
  id: string;
  type: string;
  label: string;
  section?: string | null;
  title: string;
  notes?: {
    open: string;
    emphasis: string[];
    timing: string;
  };
}

interface CoverSlideData extends BaseSlide {
  type: "cover";
  meta: string;
}

interface SectionSlideData extends BaseSlide {
  type: "section";
  color: string;
  sub?: string;
}

interface AgendaSlideData extends BaseSlide {
  type: "agenda";
  note: string;
  items: Array<{ n: string; text: string; tag: string; color: string }>;
}

interface StatsSlideData extends BaseSlide {
  type: "stats";
  headline: string;
  stats: Array<{ value: string; label: string; sub: string; color: string }>;
  footnote?: string;
}

interface TwoColSlideData extends BaseSlide {
  type: "two-col";
  left: { heading: string; items: string[] };
  right: { heading: string; items: string[] };
}

interface SegmentSlideData extends BaseSlide {
  type: "segment";
  segments: Array<{
    priority: string;
    name: string;
    demo: string;
    color: string;
    wants: string[];
    channel: string;
  }>;
}

interface ProductSlideData extends BaseSlide {
  type: "product";
  tagline: string;
  pillars: Array<{ icon: string; label: string; value: string }>;
  line: Array<{
    phase: string;
    name: string;
    flavor: string;
    format: string;
    channel: string;
    color: string;
  }>;
}

interface BrandVisualSlideData extends BaseSlide {
  type: "brandvisual";
  elements: Array<{
    label: string;
    note: string;
    color: string;
    verdict: string;
  }>;
}

interface BrandScoreSlideData extends BaseSlide {
  type: "brandscore";
  score: number;
  elements: Array<{
    label: string;
    value: string;
    verdict: string;
    score: number;
    note: string;
  }>;
}

interface PowerPointsSlideData extends BaseSlide {
  type: "powerpoints";
  points: Array<{
    rank: string;
    title: string;
    color: string;
    middleman: string;
    enduser: string;
    vs: string;
  }>;
}

interface MatrixSlideData extends BaseSlide {
  type: "matrix";
  subtitle: string;
  rows: Array<{
    criterion: string;
    jl: string;
    ww: string;
    qb: string;
    bb: string;
    us: string;
    usWin: boolean;
  }>;
}

interface PhasesSlideData extends BaseSlide {
  type: "phases";
  phases: Array<{
    phase: string;
    time: string;
    color: string;
    title: string;
    principle: string;
    actions: string[];
    targets: Array<{ label: string; value: string }>;
  }>;
}

interface TiersSlideData extends BaseSlide {
  type: "tiers";
  tiers: Array<{
    tier: string;
    name: string;
    total: string;
    color: string;
    breakeven: string;
    margin: string;
    accounts_m6: string;
    rev_m6: string;
    rev_m12: string;
    rev_m3: string;
  rev_m3_pct: number;
    rev_m6_pct: number;
    rev_m12_pct: number;
    recommended?: boolean;
    suitable: string;
    risk: string;
    includes: string[];
  }>;
}

interface BlockersSlideData extends BaseSlide {
  type: "blockers";
  subtitle: string;
  blockers: Array<{
    urgency: string;
    color: string;
    item: string;
    owner: string;
    impact: string;
    action: string;
  }>;
}

interface RiskSlideData extends BaseSlide {
  type: "risks";
  risks: Array<{
    risk: string;
    level: string;
    levelColor: string;
    detail: string;
    mitigation: string;
  }>;
}

interface MandateSlideData extends BaseSlide {
  type: "mandate";
  scope: Array<{
    area: string;
    items: string[];
  }>;
  governance: string[];
  fees: {
    note: string;
    tiers: Array<{ tier: string; range: string }>;
  };
}

interface TimelineSlideData extends BaseSlide {
  type: "timeline";
  milestones: Array<{
    week: string;
    label: string;
    items: string[];
    color: string;
  }>;
}

interface ClosingSlideData extends BaseSlide {
  type: "closing";
  decisions: string[];
  artifacts: Array<{
    ref: string;
    title: string;
    desc: string;
  }>;
  closingLine: string;
}

type SlideData =
  | CoverSlideData
  | SectionSlideData
  | AgendaSlideData
  | StatsSlideData
  | TwoColSlideData
  | SegmentSlideData
  | ProductSlideData
  | BrandVisualSlideData
  | BrandScoreSlideData
  | PowerPointsSlideData
  | MatrixSlideData
  | PhasesSlideData
  | TiersSlideData
  | BlockersSlideData
  | RiskSlideData
  | MandateSlideData
  | TimelineSlideData
  | ClosingSlideData;

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
// function StrikeBagMini({ accent = C.amber, size = 1 }) {
//   const W = 160 * size, H = 250 * size;
//   const id = `b${Math.round(Math.random() * 9999)}`;
//   return (
//     <svg width={W} height={H} viewBox={`0 0 ${160*size} ${250*size}`} y={0} x={0} style={{ display: "block", filter: `drop-shadow(0 ${12*size}px ${28*size}px rgba(0,0,0,0.9)) drop-shadow(0 2px 8px ${accent}22)` }}>
//       <defs>
//         <linearGradient id={`bg${id}`} x1={0} y1={0} x2={1} y2={1}>
//           <stop offset="0%" stopColor="#161412"/><stop offset="100%" stopColor="#080706"/>
//         </linearGradient>
//         <linearGradient id={`gl${id}`} x1={0} y1={0} x2={0} y2={1}>
//           <stop offset="0%" stopColor={C.goldBright}/><stop offset="100%" stopColor={C.goldDim}/>
//         </linearGradient>
//         <linearGradient id={`el${id}`} x1={0} y1={0} x2={1} y2={0}>
//           <stop offset="0%" stopColor="black" stopOpacity="0.65"/><stop offset="100%" stopColor="black" stopOpacity="0"/>
//         </linearGradient>
//         <linearGradient id={`er${id}`} x1={0} y1={0} x2={1} y2={0}>
//           <stop offset="0%" stopColor="black" stopOpacity="0"/><stop offset="100%" stopColor="black" stopOpacity="0.65"/>
//         </linearGradient>
//         <linearGradient id={`sh${id}`} x1={0} y1={0} x2={1} y2={0}>
//           <stop offset="0%" stopColor="white" stopOpacity="0.07"/><stop offset="100%" stopColor="white" stopOpacity="0"/>
//         </linearGradient>
//       </defs>
//       <rect x={0} y={0} width={160} height={250} rx={10} fill={`url(#bg${id})`}/>
//       {Array.from({length:16}).map((_,i)=><line key={i} x1={i*11} y1={0} x2={i*11-20} y2={250} stroke="white" strokeWidth="0.12" strokeOpacity="0.035"/>)}
//       <rect x={0} y={0} width={160} height={36} rx={10} fill="#0C0B0A"/>
//       <rect x={0} y={24} width={160} height={12} fill="#0C0B0A"/>
//       <text x={12} y={16} fill={C.gold} opacity="0.45" fontFamily="monospace" fontSize="5" letterSpacing="2">KAG-JRK · BITES</text>
//       <text x={12} y={27} fill={C.cream} opacity="0.2" fontFamily="monospace" fontSize="5" letterSpacing="1">SINGLE SERVE · 40g</text>
//       <circle cx={138} cy={70} r={16} fill={C.green}/>
//       <text x={138} y={67} textAnchor="middle" fill="white" fontFamily="Georgia,serif" fontSize="7" fontWeight="bold">حلال</text>
//       <text x={138} y={76} textAnchor="middle" fill="white" fontFamily="monospace" fontSize="4.5">HALAL</text>
//       <rect x={12} y={40} width={`url(#gl${id})` ? 112 : 112} height="1.2" fill={`url(#gl${id})`} opacity="0.8"/>
//       <text x={12} y={72} fill={C.cream} fontFamily="'Didot','Bodoni MT','Playfair Display',Georgia,serif" fontSize="30" fontWeight="400" letterSpacing="5">STRIKE</text>
//       <text x={12} y={86} fill={C.gold} opacity="0.5" fontFamily="Georgia,serif" fontSize="8">سترايك بايتس</text>
//       <rect x={12} y={91} width={136} height="0.7" fill={C.cream} opacity="0.1"/>
//       <text x={12} y={130} fill={`url(#gl${id})`} fontFamily="'Didot','Bodoni MT',Georgia,serif" fontSize="48" letterSpacing="-1">[X]g</text>
//       <text x={12} y={145} fill={C.cream} opacity="0.85" fontFamily="monospace" fontSize="7" letterSpacing="4">PROTEIN</text>
//       <text x={12} y={155} fill={C.cream} opacity="0.3" fontFamily="monospace" fontSize="4.5" letterSpacing="2">بروتين · PROTÉINE</text>
//       <rect x={12} y={161} width={136} height="0.6" fill={C.cream} opacity="0.08"/>
//       <rect x={12} y={168} width={136} height={22} fill={accent} fillOpacity="0.1" rx={3}/>
//       <rect x={12} y={168} width={3} height={22} fill={accent} rx={1.5}/>
//       <text x={22} y={179} fill={accent} fontFamily="'Didot',Georgia,serif" fontSize="9" letterSpacing="1">SMOKING BBQ</text>
//       <text x={22} y={188} fill={accent} opacity="0.55" fontFamily="Georgia,serif" fontSize="6">مدخّن BBQ · BBQ FUMÉ</text>
//       <rect x={0} y={198} width={160} height={28} fill="#0C0B0A"/>
//       <rect x={0} y={198} width={160} height="0.7" fill={C.gold} opacity="0.25"/>
//       <text x={12} y={210} fill={C.green} fontFamily="monospace" fontSize="4.5" letterSpacing="0.3">✓ NO ADDED SUGAR</text>
//       <text x={90} y={210} fill={C.green} fontFamily="monospace" fontSize="4.5" letterSpacing="0.3">✓ NO PRESERVATIVES</text>
//       <text x={12} y={220} fill={C.cream} opacity="0.25" fontFamily="monospace" fontSize="4" letterSpacing="1">MADE IN LEBANON · صنع في لبنان</text>
//       <rect x={0} y={226} width={160} height={24} fill="#050404"/>
//       <rect x={12} y={229} width={34} height={10} fill="white" rx={1}/>
//       {Array.from({length:14}).map((_,i)=><rect key={i} x={13+i*2.1} y="230.5" width={i%3===0?1.2:0.6} height={i%5===0?7:5.5} fill="#080706"/>)}
//       <text x={80} y={238} textAnchor="middle" fill={C.gold} opacity="0.15" fontFamily="monospace" fontSize="4" letterSpacing="1">KITS ADVISORY · STRIKE</text>
//       <rect x={0} y={0} width={160} height={250} fill={`url(#sh${id})`} rx={10}/>
//       <rect x={0} y={0} width={20} height={250} fill={`url(#el${id})`} rx={10}/>
//       <rect x={140} y={0} width={20} height={250} fill={`url(#er${id})`} rx={10}/>
//     </svg>
//   );
// }

// ─── SECTION DIVIDER ──────────────────────────────────────────────────────────
function SectionDivider({ slide }: { slide: SectionSlideData }) {
  const { isMobile, isTablet } = useResponsive();
  
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${slide.color}08 0%, transparent 60%)` }}/>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: slide.color }}/>
      <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: `linear-gradient(${C.gold} 1px, transparent 1px), linear-gradient(90deg, ${C.gold} 1px, transparent 1px)`, backgroundSize: "40px 40px" }}/>
      <div style={{ textAlign: "center", position: "relative", zIndex: 1, padding: isMobile ? "20px" : isTablet ? "30px" : "40px" }}>
        <div style={{ fontFamily: "monospace", fontSize: isMobile ? 9 : 11, color: slide.color, opacity: 0.7, letterSpacing: "0.5em", marginBottom: isMobile ? 16 : 20 }}>{slide.section}</div>
        <h1 style={{ fontFamily: "'Didot','Bodoni MT','Playfair Display',Georgia,serif", fontSize: isMobile ? "clamp(28px,6vw,48px)" : "clamp(36px,5vw,64px)", fontWeight: 400, color: C.strike, margin: "0 0 20px", letterSpacing: "0.05em", lineHeight: 1.1 }}>{slide.title}</h1>
        <div style={{ width: isMobile ? 48 : 64, height: 2, background: `linear-gradient(to right, ${slide.color}, transparent)`, margin: "0 auto 20px" }}/>
        {slide.sub && <p style={{ fontFamily: "Georgia,serif", fontSize: isMobile ? 14 : 16, color: C.creamDim, margin: 0, maxWidth: 500, lineHeight: 1.6 }}>{slide.sub}</p>}
      </div>
    </div>
  );
}

// ─── SHARED HEADER ────────────────────────────────────────────────────────────
function SH({ slide }: { slide: BaseSlide }) {
  return (
    <div style={{ marginBottom: 4 }}>
      {slide.section && <div style={{ fontFamily: "monospace", fontSize: 9, color: C.gold, opacity: 0.6, letterSpacing: "0.3em", marginBottom: 6 }}>{slide.section}</div>}
      <h2 style={{ margin: "0 0 4px", fontFamily: "'Didot','Bodoni MT','Playfair Display',Georgia,serif", fontSize: "clamp(17px,2.3vw,30px)", fontWeight: 400, color: C.cream, lineHeight: 1.2 }}>{slide.title}</h2>
      <div style={{ width: 48, height: 2, background: `linear-gradient(to right, ${C.gold}, transparent)`, marginTop: 8 }}/>
    </div>
  );
}

// ─── COVER ────────────────────────────────────────────────────────────────────
function CoverSlide({ slide }: { slide: CoverSlideData }) {
  const { isMobile, isTablet } = useResponsive();
  
  return (
    <div style={{ height: "100%", display: "flex", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(${C.gold} 1px, transparent 1px), linear-gradient(90deg, ${C.gold} 1px, transparent 1px)`, backgroundSize: "40px 40px" }}/>
      <div style={{ position: "absolute", right: 0, top: 0, width: isMobile ? "0" : "45%", height: "100%", background: `linear-gradient(135deg, ${C.gold}05 0%, transparent 70%)`, pointerEvents: "none" }}/>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(to bottom, transparent, ${C.gold}, transparent)` }}/>
      {/* Left content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "0 24px" : isTablet ? "0 48px" : "0 64px", position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 10, color: C.gold, opacity: 0.55, letterSpacing: "0.45em", marginBottom: isMobile ? 20 : 32 }}>KITS ADVISORY GROUP · CONFIDENTIAL · KAG-JRK-BOARD-001</div>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontFamily: "'Didot','Bodoni MT','Playfair Display',Georgia,serif", fontSize: isMobile ? "clamp(32px,8vw,56px)" : "clamp(56px,8vw,100px)", fontWeight: 400, color: C.strike, letterSpacing: "0.18em", lineHeight: 1, display: "block" }}>STRIKE</span>
          <span style={{ fontFamily: "'Didot','Bodoni MT',Georgia,serif", fontSize: isMobile ? "clamp(16px,4vw,28px)" : "clamp(24px,4vw,44px)", fontWeight: 400, color: C.gold, letterSpacing: "0.18em", display: "block" }}>BITES</span>
        </div>
        <div style={{ width: isMobile ? 60 : 80, height: 2, background: `linear-gradient(to right, ${C.gold}, transparent)`, margin: "24px 0" }}/>
        <p style={{ fontSize: isMobile ? 12 : "clamp(13px,1.8vw,18px)", color: C.cream, opacity: 0.75, margin: "0 0 10px", letterSpacing: "0.04em", fontFamily: "Georgia,serif" }}>Board Meeting — Initial Advisory Presentation</p>
        <p style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 10, color: C.creamDim, opacity: 0.45, margin: "0 0 40px", letterSpacing: "0.2em" }}>{slide.meta}</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {["Premium Portioned Beef Jerky", "Lebanese Market Entry", "GCC Scale Ready"].map((tag: string, i: number) => (
            <span key={i} style={{ fontFamily: "monospace", fontSize: isMobile ? 7 : 8, color: C.creamDim, background: `${C.ash}`, border: `1px solid ${C.ember}`, padding: "4px 12px", borderRadius: 2, letterSpacing: "0.1em" }}>{tag}</span>
          ))}
        </div>
      </div>
      {/* Right: bag visualization */}
      {!isMobile && (
        <div style={{ width: "38%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1, padding: "40px 40px 40px 0" }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: -20, background: `radial-gradient(ellipse, ${C.gold}08 0%, transparent 70%)`, borderRadius: "50%" }}/>
           {/* <StrikeBagMini accent={C.amber} size={1.3}/> */}
           <img src="./assets/bagx.png" alt="Bag1" style={{ width: "100%", height: "auto", objectFit: "contain" }}/>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── AGENDA ───────────────────────────────────────────────────────────────────
function AgendaSlide({ slide }: { slide: AgendaSlideData }) {
  const { isMobile, isTablet } = useResponsive();
  
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 20px" : isTablet ? "36px 48px" : "44px 72px" }}>
      <SH slide={slide}/>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "6px 16px" : "4px 48px", alignContent: "center", marginTop: 20 }}>
        {slide.items.map((item: { n: string; text: string; tag: string; color: string }, i: number) => (
          <div key={i} style={{ display: "flex", gap: isMobile ? 12 : 16, alignItems: isMobile ? "flex-start" : "center", padding: isMobile ? "12px 0" : "11px 16px", borderBottom: `1px solid ${C.ash}`, borderLeft: `2px solid ${item.color || C.goldDim}`, background: `${item.color || C.goldDim}05`, marginBottom: 2, flexDirection: isMobile ? "column" : "row" }}>
            <span style={{ fontFamily: "monospace", fontSize: isMobile ? 9 : 10, color: item.color || C.gold, flexShrink: 0, letterSpacing: "0.05em" }}>{item.n}</span>
            <span style={{ fontSize: isMobile ? 13 : 13, color: C.cream, flex: 1, lineHeight: 1.4 }}>{item.text}</span>
            <span style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 8, color: C.creamDim, flexShrink: 0, background: C.charcoal, padding: "2px 8px", borderRadius: 2 }}>{item.tag}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20, padding: "12px 16px", background: `${C.gold}08`, border: `1px solid ${C.gold}20`, borderRadius: 3 }}>
        <p style={{ margin: 0, fontSize: isMobile ? 11 : 12, color: C.gold, fontFamily: "Georgia,serif", fontStyle: "italic" }}>"{slide.note}"</p>
      </div>
    </div>
  );
}

// ─── STATS / MARKET ───────────────────────────────────────────────────────────
function StatsSlide({ slide }: { slide: StatsSlideData }) {
  const { isMobile, isTablet } = useResponsive();
  
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 20px" : isTablet ? "36px 48px" : "44px 72px" }}>
      <SH slide={slide}/>
      <div style={{ margin: "12px 0 24px", padding: isMobile ? "12px 16px" : "14px 20px", background: `${C.greenBright}10`, border: `1px solid ${C.greenBright}30`, borderLeft: `4px solid ${C.greenBright}`, borderRadius: 3 }}>
        <p style={{ margin: 0, fontSize: isMobile ? 14 : 17, color: C.greenBright, fontFamily: "Georgia,serif", fontStyle: "italic", lineHeight: 1.5 }}>{slide.headline}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: isMobile ? 12 : 12, flex: 1, alignContent: "start" }}>
        {slide.stats.map((s: { value: string; label: string; sub: string; color: string }, i: number) => (
          <div key={i} style={{ background: `${s.color}08`, border: `1px solid ${s.color}25`, borderTop: `3px solid ${s.color}`, borderRadius: 4, padding: isMobile ? "16px 14px" : "22px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? "clamp(20px,5vw,32px)" : "clamp(22px,2.5vw,38px)", color: s.color, lineHeight: 1, letterSpacing: "-0.02em" }}>{s.value}</div>
            <div>
              <div style={{ fontSize: isMobile ? 11 : 13, color: C.cream, marginBottom: 4, lineHeight: 1.4 }}>{s.label}</div>
              <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 9, color: C.creamDim, lineHeight: 1.4 }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
      {slide.footnote && <p style={{ margin: "12px 0 0", fontSize: isMobile ? 10 : 11, color: C.creamDim, fontFamily: "monospace", letterSpacing: "0.05em" }}>{slide.footnote}</p>}
    </div>
  );
}

// ─── TWO-COL ──────────────────────────────────────────────────────────────────
function TwoColSlide({ slide }: { slide: TwoColSlideData }) {
  const { isMobile, isTablet } = useResponsive();
  
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 20px" : isTablet ? "36px 48px" : "44px 72px" }}>
      <SH slide={slide}/>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 20 : 20, marginTop: 20 }}>
        {[slide.left, slide.right].map((col: { heading: string; items: string[] }, ci: number) => (
          <div key={ci} style={{ background: ci === 0 ? `${C.gold}07` : `${C.greenBright}07`, border: `1px solid ${ci === 0 ? C.gold : C.greenBright}20`, borderTop: `3px solid ${ci === 0 ? C.gold : C.greenBright}`, borderRadius: 4, padding: isMobile ? "20px 24px" : "22px 24px" }}>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 9 : 10, color: ci === 0 ? C.gold : C.greenBright, letterSpacing: "0.2em", marginBottom: isMobile ? 12 : 18, paddingBottom: 10, borderBottom: `1px solid ${ci === 0 ? C.gold : C.greenBright}20` }}>{col.heading}</div>
            {col.items.map((item: string, ii: number) => (
              <div key={ii} style={{ display: "flex", gap: isMobile ? 10 : 12, marginBottom: isMobile ? 10 : 13, alignItems: "flex-start" }}>
                <span style={{ color: ci === 0 ? C.gold : C.greenBright, fontSize: isMobile ? 9 : 9, flexShrink: 0, marginTop: 4 }}>→</span>
                <p style={{ margin: 0, fontSize: isMobile ? 12 : 13, color: C.cream, opacity: 0.85, lineHeight: 1.65 }}>{item}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CONSUMER SEGMENTATION ────────────────────────────────────────────────────
function SegmentSlide({ slide }: { slide: SegmentSlideData }) {
  const { isMobile, isTablet } = useResponsive();
  
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 20px" : isTablet ? "36px 48px" : "44px 72px" }}>
      <SH slide={slide}/>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: isMobile ? 12 : 14, marginTop: 20 }}>
        {slide.segments.map((seg: SegmentSlideData['segments'][number], i: number) => (
          <div key={i} style={{ background: `${seg.color}07`, border: `1px solid ${seg.color}25`, borderTop: `3px solid ${seg.color}`, borderRadius: 4, padding: isMobile ? "16px 18px" : "20px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 9, color: seg.color, letterSpacing: "0.2em", marginBottom: 6 }}>{seg.priority}</div>
              <div style={{ fontSize: isMobile ? 14 : 16, color: C.cream, fontFamily: "Georgia,serif", marginBottom: 4 }}>{seg.name}</div>
              <div style={{ fontFamily: "monospace", fontSize: isMobile ? 9 : 10, color: seg.color }}>{seg.demo}</div>
            </div>
            <div style={{ height: 1, background: `${seg.color}20` }}/>
            <div>
              <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 9, color: C.creamDim, marginBottom: 8, letterSpacing: "0.1em" }}>WHAT THEY WANT</div>
              {seg.wants.map((w: string, wi: number) => (
                <div key={wi} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  <span style={{ color: seg.color, fontSize: isMobile ? 8 : 9, flexShrink: 0, marginTop: 2 }}>◈</span>
                  <p style={{ margin: 0, fontSize: isMobile ? 10 : 11, color: C.creamDim, lineHeight: 1.5 }}>{w}</p>
                </div>
              ))}
            </div>
            <div style={{ background: `${seg.color}10`, borderRadius: 3, padding: "8px 12px" }}>
              <div style={{ fontFamily: "monospace", fontSize: isMobile ? 7 : 8, color: seg.color, marginBottom: 4 }}>REACH THROUGH</div>
              <div style={{ fontSize: isMobile ? 10 : 11, color: C.cream }}>{seg.channel}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PRODUCT ──────────────────────────────────────────────────────────────────
function ProductSlide({ slide }: { slide: ProductSlideData }) {
  const { isMobile, isTablet } = useResponsive();
  
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 20px" : isTablet ? "32px 48px" : "36px 72px" }}>
      <SH slide={slide}/>
      <p style={{ fontSize: isMobile ? 12 : 14, color: C.gold, fontFamily: "Georgia,serif", margin: "8px 0 18px", fontStyle: "italic" }}>{slide.tagline}</p>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
        {slide.pillars.map((p: ProductSlideData['pillars'][number], i: number) => (
          <div key={i} style={{ background: C.charcoal, border: `1px solid ${C.ash}`, borderLeft: `2px solid ${C.gold}50`, borderRadius: 3, padding: isMobile ? "12px 14px" : "11px 14px" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5 }}>
              <span style={{ color: C.gold, fontSize: isMobile ? 12 : 10 }}>{p.icon}</span>
              <span style={{ fontFamily: "monospace", fontSize: isMobile ? 10 : 8, color: C.gold, letterSpacing: "0.1em" }}>{p.label}</span>
            </div>
            <p style={{ margin: 0, fontSize: isMobile ? 11 : 12, color: C.cream, opacity: 0.85, lineHeight: 1.5 }}>{p.value}</p>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 9, color: C.creamDim, letterSpacing: "0.2em", marginBottom: 8 }}>PRODUCT LINE ARCHITECTURE — PHASED</div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 8 }}>
        {slide.line.map((l: ProductSlideData['line'][number], i: number) => (
          <div key={i} style={{ background: `${l.color}08`, border: `1px solid ${l.color}30`, borderLeft: `3px solid ${l.color}`, borderRadius: 3, padding: isMobile ? "12px 14px" : "10px 12px", opacity: i === 0 ? 1 : 0.75 }}>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 9 : 8, color: l.color, marginBottom: 5, letterSpacing: "0.1em" }}>{l.phase}</div>
            <div style={{ fontSize: isMobile ? 12 : 13, color: C.cream, fontFamily: "Georgia,serif", marginBottom: 3 }}>{l.name}</div>
            <div style={{ fontSize: isMobile ? 10 : 10, color: l.color, marginBottom: 4 }}>{l.flavor}</div>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 9 : 8, color: C.creamDim }}>{l.channel}</div>
            {i === 0 && <div style={{ marginTop: 6, fontFamily: "monospace", fontSize: isMobile ? 7 : 7, color: l.color, background: `${l.color}15`, padding: "2px 6px", borderRadius: 2, display: "inline-block" }}>LAUNCH</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── BRAND VISUAL ─────────────────────────────────────────────────────────────
function BrandVisualSlide({ slide }: { slide: BrandVisualSlideData }) {
  const { isMobile, isTablet } = useResponsive();
  //const accents = [C.amber, C.red, C.greenBright];
  
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 20px" : isTablet ? "32px 48px" : "36px 72px" }}>
      <SH slide={slide}/>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 16 : 24, marginTop: 16 }}>
        {/* Left: bag renders */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 9, color: C.gold, letterSpacing: "0.2em", marginBottom: 4 }}>PACKAGING SYSTEM — ALL THREE LAUNCH SKUs</div>
          <img src="./assets/bagx.png" alt="Bag1" style={{ width: "100%", height: "auto", objectFit: "contain" }}/>
          {/* <div style={{ flex: 1, background: `radial-gradient(ellipse at 50% 40%, ${C.charcoal} 0%, ${C.obsidian} 70%)`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: isMobile ? 12 : 20, padding: isMobile ? "16px 12px" : "24px 16px" }}>
            {[0, 1, 2].map((i: number) => (
              
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ transform: `scale(${i === 1 ? 1.08 : 0.9}) translateY(${i === 1 ? -4 : 0}px)` }}>
                  <StrikeBagMini accent={accents[i]} size={isMobile ? 0.5 : 0.72}/>
    
                </div>
                <div style={{ fontFamily: "monospace", fontSize: isMobile ? 6 : 7, color: accents[i], letterSpacing: "0.1em", textAlign: "center" }}>
                  {["SMOKING BBQ", "FIRE & LIME", "ZA'ATAR"][i]}
                </div>
              </div>
            ))}
          </div> */}
        </div>
        {/* Right: brand system details */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 9, color: C.gold, letterSpacing: "0.2em", marginBottom: 4 }}>BRAND SYSTEM APPLIED</div>
          {slide.elements.map((el: BrandVisualSlideData['elements'][number], i: number) => (
            <div key={i} style={{ background: C.charcoal, border: `1px solid ${el.color}20`, borderLeft: `3px solid ${el.color}`, borderRadius: 3, padding: isMobile ? "8px 12px" : "10px 14px", display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ flexShrink: 0, width: 8, height: 8, borderRadius: "50%", background: el.color, marginTop: 4 }}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "monospace", fontSize: isMobile ? 7 : 8, color: el.color, letterSpacing: "0.1em", marginBottom: 3 }}>{el.label}</div>
                <p style={{ margin: 0, fontSize: isMobile ? 10 : 11, color: C.creamDim, lineHeight: 1.5 }}>{el.note}</p>
              </div>
              <span style={{ fontFamily: "monospace", fontSize: isMobile ? 7 : 8, color: el.verdict === "CONFIRMED" ? C.greenBright : C.gold, background: `${el.verdict === "CONFIRMED" ? C.greenBright : C.gold}15`, padding: "1px 6px", borderRadius: 2, flexShrink: 0 }}>{el.verdict}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── BRAND SCORE ─────────────────────────────────────────────────────────────
function BrandScoreSlide({ slide }: { slide: BrandScoreSlideData }) {
  const { isMobile, isTablet } = useResponsive();
  
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 20px" : isTablet ? "32px 48px" : "36px 72px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-start", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 12 : 0 }}>
        <SH slide={slide}/>
        <div style={{ textAlign: "center", flexShrink: 0, background: `${C.gold}08`, border: `1px solid ${C.gold}25`, borderRadius: 4, padding: isMobile ? "10px 16px" : "12px 20px" }}>
          <div style={{ fontFamily: "monospace", fontSize: isMobile ? 28 : 36, color: C.goldBright, lineHeight: 1 }}>{slide.score}</div>
          <div style={{ fontFamily: "monospace", fontSize: isMobile ? 6 : 7, color: C.gold, letterSpacing: "0.15em", marginTop: 4 }}>/ 100 BRAND SCORE</div>
          <div style={{ fontFamily: "monospace", fontSize: isMobile ? 6 : 7, color: C.greenBright, marginTop: 4 }}>APPROVED — STRONG</div>
        </div>
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: isMobile ? 10 : 8, marginTop: 16 }}>
        {slide.elements.map((el, i) => (
          <div key={i} style={{ background: C.charcoal, border: `1px solid ${el.verdict === "APPROVED" ? C.greenBright : el.verdict === "RECOMMENDED" ? C.gold : C.amber}15`, borderLeft: `3px solid ${el.verdict === "APPROVED" ? C.greenBright : el.verdict === "RECOMMENDED" ? C.gold : C.amber}`, borderRadius: 3, padding: isMobile ? "10px 12px" : "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, alignItems: isMobile ? "flex-start" : "center", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 4 : 0 }}>
              <div style={{ fontFamily: "monospace", fontSize: isMobile ? 7 : 8, color: C.creamDim, letterSpacing: "0.1em", lineHeight: 1.3 }}>{el.label}</div>
              <span style={{ fontFamily: "monospace", fontSize: isMobile ? 7 : 7, color: el.verdict === "APPROVED" ? C.greenBright : el.verdict === "RECOMMENDED" ? C.gold : C.amber, background: `${el.verdict === "APPROVED" ? C.greenBright : el.verdict === "RECOMMENDED" ? C.gold : C.amber}15`, padding: "1px 6px", borderRadius: 2, flexShrink: 0, marginLeft: 6 }}>{el.verdict}</span>
            </div>
            <div style={{ fontSize: isMobile ? 12 : 14, color: C.cream, fontFamily: "Georgia,serif", marginBottom: 5 }}>{el.value}</div>
            <div style={{ height: 3, background: C.ash, borderRadius: 2, marginBottom: 6 }}>
              <div style={{ width: `${el.score}%`, height: "100%", background: el.verdict === "APPROVED" ? C.greenBright : el.verdict === "RECOMMENDED" ? C.gold : C.amber, borderRadius: 2 }}/>
            </div>
            <p style={{ margin: 0, fontSize: isMobile ? 9 : 10, color: C.creamDim, lineHeight: 1.5 }}>{el.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── POWER POINTS ────────────────────────────────────────────────────────────
function PowerPointsSlide({ slide }: { slide: PowerPointsSlideData }) {
  const { isMobile, isTablet } = useResponsive();
  const [active, setActive] = useState(0);
  const pp = slide.points[active];
  
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 20px" : isTablet ? "32px 48px" : "36px 72px" }}>
      <SH slide={slide}/>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "auto 1fr", gap: isMobile ? 16 : 20, marginTop: 16 }}>
        {/* Left: numbered list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4, width: isMobile ? "auto" : 220 }}>
          {slide.points.map((p: PowerPointsSlideData['points'][number], i: number) => (
            <button key={i} onClick={() => setActive(i)} style={{ background: active === i ? `${p.color}18` : "transparent", border: `1px solid ${active === i ? p.color : C.ash}`, borderLeft: `3px solid ${active === i ? p.color : C.ash}`, borderRadius: 3, padding: isMobile ? "10px 12px" : "10px 14px", cursor: "pointer", textAlign: "left", transition: "all 0.2s", WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}>
              <div style={{ fontFamily: "monospace", fontSize: isMobile ? 7 : 8, color: p.color, marginBottom: 3, letterSpacing: "0.1em" }}>{p.rank}</div>
              <div style={{ fontSize: isMobile ? 11 : 12, color: active === i ? C.cream : C.creamDim, lineHeight: 1.3 }}>{p.title}</div>
            </button>
          ))}
        </div>
        {/* Right: detail */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: `${pp.color}10`, border: `1px solid ${pp.color}30`, borderRadius: 4 }}>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 24 : 32, color: pp.color, lineHeight: 1, opacity: 0.4 }}>{pp.rank}</div>
            <div>
              <div style={{ fontSize: isMobile ? 15 : 18, color: C.cream, fontFamily: "Georgia,serif" }}>{pp.title}</div>
              <div style={{ fontFamily: "monospace", fontSize: isMobile ? 7 : 8, color: pp.color, marginTop: 4, letterSpacing: "0.1em" }}>STRUCTURAL ADVANTAGE</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10, flex: 1 }}>
            <div style={{ background: `${C.gold}07`, border: `1px solid ${C.gold}20`, borderTop: `2px solid ${C.gold}`, borderRadius: 3, padding: "14px 16px" }}>
              <div style={{ fontFamily: "monospace", fontSize: isMobile ? 7 : 8, color: C.gold, letterSpacing: "0.15em", marginBottom: 8 }}>MIDDLEMAN ADVANTAGE</div>
              <p style={{ margin: 0, fontSize: isMobile ? 11 : 12, color: C.cream, lineHeight: 1.7 }}>{pp.middleman}</p>
            </div>
            <div style={{ background: `${C.greenBright}07`, border: `1px solid ${C.greenBright}20`, borderTop: `2px solid ${C.greenBright}`, borderRadius: 3, padding: "14px 16px" }}>
              <div style={{ fontFamily: "monospace", fontSize: isMobile ? 7 : 8, color: C.greenBright, letterSpacing: "0.15em", marginBottom: 8 }}>END USER ADVANTAGE</div>
              <p style={{ margin: 0, fontSize: isMobile ? 11 : 12, color: C.cream, lineHeight: 1.7 }}>{pp.enduser}</p>
            </div>
          </div>
          <div style={{ background: `${C.red}08`, border: `1px solid ${C.red}20`, borderRadius: 3, padding: "12px 16px" }}>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 7 : 8, color: C.red, letterSpacing: "0.15em", marginBottom: 6 }}>WHAT COMPETITORS DO INSTEAD</div>
            <p style={{ margin: 0, fontSize: isMobile ? 10 : 11, color: C.creamDim, lineHeight: 1.6 }}>{pp.vs}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── COMPETITION MATRIX ───────────────────────────────────────────────────────
function MatrixSlide({ slide }: { slide: MatrixSlideData }) {
  const { isMobile, isTablet } = useResponsive();
  const cols = ["criterion","jl","ww","qb","bb","us"];
  const headers = ["CRITERION", "Jack Link's", "Wild West", "Quest Bar", "Barebells", "STRIKE ✦"];
  const hColors = { jl: C.red, ww: C.amber, qb: C.purple, bb: C.steel, us: C.greenBright };
  
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 16px" : isTablet ? "32px 48px" : "36px 72px" }}>
      <SH slide={slide}/>
      <p style={{ fontSize: isMobile ? 9 : 11, color: C.creamDim, fontFamily: "monospace", margin: "4px 0 14px", letterSpacing: "0.1em" }}>{slide.subtitle}</p>
      <div style={{ flex: 1, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: isMobile ? 10 : 12, minWidth: isMobile ? "600px" : "auto" }}>
          <thead>
            <tr>
              {headers.map((h: string, i: number) => (
                <th key={i} style={{ padding: isMobile ? "6px 8px" : "9px 12px", fontFamily: "monospace", fontSize: isMobile ? 7 : 9, color: i === 0 ? C.creamDim : Object.values(hColors)[i-1], letterSpacing: "0.1em", textAlign: "left", borderBottom: `2px solid ${i === 5 ? C.greenBright : C.ash}`, background: i === 5 ? `${C.greenBright}08` : "transparent", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slide.rows.map((row: MatrixSlideData['rows'][number], ri: number) => (
              <tr key={ri} style={{ background: ri % 2 === 0 ? C.charcoal : C.obsidian }}>
                {cols.map((col: string, ci: number) => (
                  <td key={ci} style={{ padding: isMobile ? "8px 10px" : "10px 12px", fontSize: ci === 0 ? (isMobile ? 10 : 12) : (isMobile ? 9 : 11), color: ci === 5 ? (row.usWin ? C.greenBright : C.cream) : ci === 0 ? C.cream : C.creamDim, background: ci === 5 ? `${C.greenBright}06` : "transparent", borderBottom: `1px solid ${C.ash}`, fontFamily: ci > 0 && ci < 5 ? "monospace" : ci === 5 ? "monospace" : "Georgia,serif", lineHeight: 1.35, fontWeight: ci === 5 ? "600" : "normal" }}>{row[col as keyof typeof row]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 12, padding: isMobile ? "10px 14px" : "10px 16px", background: `${C.greenBright}10`, border: `1px solid ${C.greenBright}25`, borderRadius: 3, display: "flex", gap: 10, alignItems: isMobile ? "flex-start" : "center", flexDirection: isMobile ? "column" : "row" }}>
        <span style={{ color: C.greenBright, fontSize: isMobile ? 12 : 16 }}>★</span>
        <p style={{ margin: 0, fontSize: isMobile ? 11 : 12, color: C.greenBright, fontFamily: "Georgia,serif", lineHeight: 1.5 }}>STRIKE wins on all seven criteria. No competitor holds more than three of these advantages simultaneously.</p>
      </div>
    </div>
  );
}

// ─── GO-TO-MARKET PHASES ──────────────────────────────────────────────────────
function PhasesSlide({ slide }: { slide: PhasesSlideData }) {
  const { isMobile, isTablet } = useResponsive();
  const [active, setActive] = useState(0);
  const ph = slide.phases[active];
  
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 20px" : isTablet ? "32px 48px" : "36px 72px" }}>
      <SH slide={slide}/>
      {/* Phase tabs */}
      <div style={{ display: "flex", gap: 6, marginTop: 16, marginBottom: 16, flexDirection: isMobile ? "column" : "row" }}>
        {slide.phases.map((p: PhasesSlideData['phases'][number], i: number) => (
          <button key={i} onClick={() => setActive(i)} style={{ flex: 1, background: active === i ? `${p.color}18` : C.charcoal, border: `1px solid ${active === i ? p.color : C.ash}`, borderTop: `3px solid ${active === i ? p.color : C.ash}`, borderRadius: 3, padding: isMobile ? "12px 14px" : "10px 12px", cursor: "pointer", textAlign: "left", transition: "all 0.2s", WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 7 : 8, color: p.color, letterSpacing: "0.15em", marginBottom: 4 }}>{p.phase}</div>
            <div style={{ fontSize: isMobile ? 11 : 12, color: active === i ? C.cream : C.creamDim, marginBottom: 2 }}>{p.title}</div>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 7 : 8, color: C.creamDim }}>{p.time}</div>
          </button>
        ))}
      </div>
      {/* Active phase detail */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 9, color: ph.color, letterSpacing: "0.2em", marginBottom: 12 }}>ACTIONS</div>
          {ph.actions.map((a: string, ai: number) => (
            <div key={ai} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
              <span style={{ color: ph.color, fontSize: isMobile ? 8 : 9, flexShrink: 0, marginTop: 3 }}>→</span>
              <p style={{ margin: 0, fontSize: isMobile ? 11 : 12, color: C.creamDim, lineHeight: 1.6 }}>{a}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: `${ph.color}08`, border: `1px solid ${ph.color}25`, borderRadius: 4, padding: "16px 18px" }}>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 9, color: ph.color, letterSpacing: "0.15em", marginBottom: 10 }}>TARGETS AT END OF PHASE</div>
            {ph.targets.map((t: PhasesSlideData['phases'][number]['targets'][number], ti: number) => (
              <div key={ti} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${ph.color}15` }}>
                <span style={{ fontSize: isMobile ? 11 : 12, color: C.creamDim }}>{t.label}</span>
                <span style={{ fontFamily: "monospace", fontSize: isMobile ? 11 : 12, color: ph.color }}>{t.value}</span>
              </div>
            ))}
          </div>
          <div style={{ background: `${C.gold}06`, border: `1px solid ${C.gold}15`, borderRadius: 4, padding: "14px 18px", flex: 1 }}>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 9, color: C.gold, letterSpacing: "0.15em", marginBottom: 8 }}>KEY PRINCIPLE</div>
            <p style={{ margin: 0, fontSize: isMobile ? 11 : 12, color: C.cream, lineHeight: 1.7, fontFamily: "Georgia,serif", fontStyle: "italic" }}>"{ph.principle}"</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FINANCIAL TIERS ──────────────────────────────────────────────────────────
function TiersSlide({ slide }: { slide: TiersSlideData }) {
  const { isMobile, isTablet } = useResponsive();
  const [activeTier, setActiveTier] = useState(1);
  const t = slide.tiers[activeTier];
  
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 20px" : isTablet ? "32px 48px" : "36px 72px" }}>
      <SH slide={slide}/>
      <div style={{ display: "flex", gap: 8, marginTop: 16, marginBottom: 16, flexDirection: isMobile ? "column" : "row" }}>
        {slide.tiers.map((tier: TiersSlideData['tiers'][number], i: number) => (
          <button key={i} onClick={() => setActiveTier(i)} style={{ flex: 1, background: activeTier === i ? `${tier.color}18` : C.charcoal, border: `1px solid ${activeTier === i ? tier.color : C.ash}`, borderRadius: 4, padding: isMobile ? "14px 16px" : "12px 16px", cursor: "pointer", textAlign: "left", transition: "all 0.2s", position: "relative", WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}>
            {tier.recommended && <div style={{ position: "absolute", top: isMobile ? -10 : -9, left: "50%", transform: "translateX(-50%)", fontFamily: "monospace", fontSize: isMobile ? 6 : 7, color: C.gold, background: C.obsidian, padding: "2px 8px", border: `1px solid ${C.gold}40`, borderRadius: 2, whiteSpace: "nowrap" }}>KITS RECOMMENDED</div>}
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 7 : 8, color: tier.color, letterSpacing: "0.15em", marginBottom: 4 }}>{tier.tier}</div>
            <div style={{ fontSize: isMobile ? 12 : 13, color: C.cream, marginBottom: 4 }}>{tier.name}</div>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 16 : 18, color: tier.color }}>{tier.total}</div>
          </button>
        ))}
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Metric cards */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 8 }}>
            {[{ label: "Breakeven", value: t.breakeven }, { label: "Gross Margin", value: t.margin }, { label: "Rev at M6", value: t.rev_m6 }].map((m: { label: string; value: string }, i: number) => (
              <div key={i} style={{ background: C.charcoal, border: `1px solid ${t.color}20`, borderRadius: 3, padding: isMobile ? "12px 14px" : "10px 12px" }}>
                <div style={{ fontFamily: "monospace", fontSize: isMobile ? 7 : 8, color: C.creamDim, marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontFamily: "monospace", fontSize: isMobile ? 14 : 13, color: t.color }}>{m.value}</div>
              </div>
            ))}
          </div>
          {/* Revenue bar chart */}
          <div style={{ background: C.charcoal, border: `1px solid ${C.ash}`, borderRadius: 4, padding: "14px 16px", flex: 1 }}>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 9, color: C.creamDim, letterSpacing: "0.15em", marginBottom: 12 }}>REVENUE TRAJECTORY</div>
            {[
              { label: "Month 3", val: t.rev_m3_pct, text: t.rev_m3 },
              { label: "Month 6", val: t.rev_m6_pct, text: t.rev_m6 },
              { label: "Month 12", val: t.rev_m12_pct, text: t.rev_m12 },
            ].map((r: { label: string; val: number; text: string }, ri: number) => (
              <div key={ri} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 9, color: C.creamDim }}>{r.label}</span>
                  <span style={{ fontFamily: "monospace", fontSize: isMobile ? 9 : 9, color: t.color }}>{r.text}</span>
                </div>
                <div style={{ height: 6, background: C.ash, borderRadius: 3 }}>
                  <div style={{ width: `${r.val}%`, height: "100%", background: `linear-gradient(to right, ${t.color}90, ${t.color})`, borderRadius: 3, transition: "width 0.5s ease" }}/>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: `${t.color}06`, border: `1px solid ${t.color}20`, borderRadius: 3, padding: "12px 16px" }}>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 9, color: t.color, marginBottom: 6 }}>SUITABLE FOR</div>
            <p style={{ margin: 0, fontSize: isMobile ? 11 : 12, color: C.cream, lineHeight: 1.6 }}>{t.suitable}</p>
          </div>
          <div style={{ background: `${C.red}07`, border: `1px solid ${C.red}15`, borderRadius: 3, padding: "12px 16px" }}>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 9, color: C.red, marginBottom: 6 }}>RISK FACTOR</div>
            <p style={{ margin: 0, fontSize: isMobile ? 11 : 12, color: C.creamDim, lineHeight: 1.6 }}>{t.risk}</p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 9, color: C.creamDim, letterSpacing: "0.15em", marginBottom: 8 }}>WHAT'S INCLUDED</div>
            {t.includes.map((inc: string, i: number) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 7, alignItems: "center" }}>
                <span style={{ color: t.color, fontSize: isMobile ? 8 : 9, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: isMobile ? 11 : 12, color: C.cream }}>{inc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BLOCKERS ─────────────────────────────────────────────────────────────────
function BlockersSlide({ slide }: { slide: BlockersSlideData }) {
  const { isMobile, isTablet } = useResponsive();
  
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 20px" : isTablet ? "32px 48px" : "36px 72px" }}>
      <SH slide={slide}/>
      <p style={{ fontSize: isMobile ? 9 : 11, color: C.creamDim, fontFamily: "monospace", margin: "4px 0 14px", letterSpacing: "0.08em" }}>{slide.subtitle}</p>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
        {slide.blockers.map((b: BlockersSlideData['blockers'][number], i: number) => (
          <div key={i} style={{ background: C.charcoal, border: `1px solid ${b.color}20`, borderLeft: `4px solid ${b.color}`, borderRadius: 3, padding: isMobile ? "14px 16px" : "10px 16px", display: "flex", gap: isMobile ? 12 : 16, alignItems: isMobile ? "flex-start" : "flex-start", flexDirection: isMobile ? "column" : "row" }}>
            <div style={{ flexShrink: 0, minWidth: isMobile ? "auto" : 100 }}>
              <div style={{ fontFamily: "monospace", fontSize: isMobile ? 7 : 8, color: b.color, background: `${b.color}15`, border: `1px solid ${b.color}30`, padding: "2px 8px", borderRadius: 2, letterSpacing: "0.08em", display: "inline-block", marginBottom: 4 }}>{b.urgency}</div>
              <div style={{ fontFamily: "monospace", fontSize: isMobile ? 7 : 8, color: C.creamDim, lineHeight: 1.4 }}>{b.owner}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: isMobile ? 12 : 13, color: C.cream, fontFamily: "Georgia,serif", marginBottom: 3 }}>{b.item}</div>
              <p style={{ margin: "0 0 4px", fontSize: isMobile ? 10 : 11, color: C.creamDim, lineHeight: 1.5 }}>{b.impact}</p>
              <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 9, color: b.color }}>→ {b.action}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── RISK REGISTER ────────────────────────────────────────────────────────────
function RiskSlide({ slide }: { slide: RiskSlideData }) {
  const { isMobile, isTablet } = useResponsive();
  
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 20px" : isTablet ? "32px 48px" : "36px 72px" }}>
      <SH slide={slide}/>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10, marginTop: 16, alignContent: "start" }}>
        {slide.risks.map((r: RiskSlideData['risks'][number], i: number) => (
          <div key={i} style={{ background: C.charcoal, border: `1px solid ${r.levelColor}20`, borderLeft: `4px solid ${r.levelColor}`, borderRadius: 3, padding: isMobile ? "12px 16px" : "12px 16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-start", marginBottom: 6, flexDirection: isMobile ? "column" : "row", gap: isMobile ? 4 : 0 }}>
              <div style={{ fontSize: isMobile ? 12 : 13, color: C.cream, fontFamily: "Georgia,serif", flex: 1 }}>{r.risk}</div>
              <span style={{ fontFamily: "monospace", fontSize: isMobile ? 7 : 8, color: r.levelColor, background: `${r.levelColor}15`, padding: "2px 8px", borderRadius: 2, marginLeft: 10, flexShrink: 0 }}>{r.level}</span>
            </div>
            <p style={{ margin: "0 0 8px", fontSize: isMobile ? 10 : 11, color: C.creamDim, lineHeight: 1.5 }}>{r.detail}</p>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 9, color: C.greenBright }}>MITIGATION → {r.mitigation}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MANDATE ─────────────────────────────────────────────────────────────────
function MandateSlide({ slide }: { slide: MandateSlideData }) {
  const { isMobile, isTablet } = useResponsive();
  
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 20px" : isTablet ? "32px 48px" : "36px 72px" }}>
      <SH slide={slide}/>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 20 : 20, marginTop: 16 }}>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 9, color: C.gold, letterSpacing: "0.2em", marginBottom: 12 }}>KITS SCOPE OF AUTHORITY</div>
          {slide.scope.map((area: MandateSlideData['scope'][number], i: number) => (
            <div key={i} style={{ marginBottom: isMobile ? 14 : 14 }}>
              <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 9, color: C.creamDim, letterSpacing: "0.1em", marginBottom: 6, paddingBottom: 4, borderBottom: `1px solid ${C.ash}` }}>{area.area.toUpperCase()}</div>
              {area.items.map((item: string, ii: number) => (
                <div key={ii} style={{ display: "flex", gap: isMobile ? 6 : 8, marginBottom: 5 }}>
                  <span style={{ color: C.gold, fontSize: isMobile ? 7 : 8, flexShrink: 0, marginTop: 2 }}>→</span>
                  <span style={{ fontSize: isMobile ? 10 : 11, color: C.cream, lineHeight: 1.4 }}>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 9, color: C.gold, letterSpacing: "0.2em", marginBottom: 10 }}>GOVERNANCE MODEL</div>
            {slide.governance.map((g: string, i: number) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, padding: "9px 12px", background: C.charcoal, borderRadius: 3, border: `1px solid ${C.ash}` }}>
                <span style={{ color: C.gold, fontSize: isMobile ? 9 : 9, flexShrink: 0 }}>◈</span>
                <p style={{ margin: 0, fontSize: isMobile ? 10 : 11, color: C.cream, lineHeight: 1.5 }}>{g}</p>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 9, color: C.gold, letterSpacing: "0.2em", marginBottom: 10 }}>FEE STRUCTURE</div>
            <p style={{ fontSize: isMobile ? 10 : 11, color: C.creamDim, margin: "0 0 10px", fontFamily: "monospace" }}>{slide.fees.note}</p>
            {slide.fees.tiers.map((ft: MandateSlideData['fees']['tiers'][number], i: number) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "9px 12px", background: C.charcoal, borderRadius: 3, marginBottom: 4, border: `1px solid ${C.ash}` }}>
                <span style={{ fontSize: isMobile ? 11 : 12, color: C.cream }}>{ft.tier}</span>
                <span style={{ fontFamily: "monospace", fontSize: isMobile ? 10 : 11, color: C.gold }}>{ft.range}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── VISUAL TIMELINE ──────────────────────────────────────────────────────────
function TimelineSlide({ slide }: { slide: TimelineSlideData }) {
  const { isMobile, isTablet } = useResponsive();
  
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 20px" : isTablet ? "32px 48px" : "36px 72px" }}>
      <SH slide={slide}/>
      {/* Horizontal timeline bar */}
      <div style={{ position: "relative", marginTop: 28, marginBottom: 24 }}>
        <div style={{ height: 3, background: C.ash, borderRadius: 2, position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right, ${C.red}, ${C.amber}, ${C.gold}, ${C.gold}, ${C.greenBright}, ${C.greenBright})`, borderRadius: 2, opacity: 0.7 }}/>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", position: "absolute", top: -8, left: 0, right: 0 }}>
          {slide.milestones.map((m: TimelineSlideData['milestones'][number], i: number) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: `${100/slide.milestones.length}%` }}>
              <div style={{ width: isMobile ? 14 : 18, height: isMobile ? 14 : 18, borderRadius: "50%", background: m.color, border: `3px solid ${C.obsidian}`, boxShadow: `0 0 0 2px ${m.color}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: isMobile ? 5 : 6, height: isMobile ? 5 : 6, borderRadius: "50%", background: C.obsidian }}/>
              </div>
              <div style={{ fontFamily: "monospace", fontSize: isMobile ? 6 : 8, color: m.color, letterSpacing: "0.1em", marginTop: 6, textAlign: "center", whiteSpace: "nowrap" }}>{m.week}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: 8 }}>
        {slide.milestones.map((m, i) => (
          <div key={i} style={{ background: `${m.color}06`, border: `1px solid ${m.color}20`, borderTop: `2px solid ${m.color}`, borderRadius: 3, padding: isMobile ? "12px 10px" : "12px 10px" }}>
            <div style={{ fontSize: isMobile ? 10 : 11, color: C.cream, fontFamily: "Georgia,serif", marginBottom: 8, lineHeight: 1.3 }}>{m.label}</div>
            {m.items.map((item: string, ii: number) => (
              <div key={ii} style={{ display: "flex", gap: 6, marginBottom: 5, alignItems: "flex-start" }}>
                <span style={{ color: m.color, fontSize: isMobile ? 7 : 8, flexShrink: 0, marginTop: 2 }}>✓</span>
                <p style={{ margin: 0, fontSize: isMobile ? 9 : 10, color: C.creamDim, lineHeight: 1.5 }}>{item}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, padding: isMobile ? "10px 14px" : "10px 16px", background: `${C.greenBright}08`, border: `1px solid ${C.greenBright}20`, borderRadius: 3, display: "flex", gap: 10, alignItems: isMobile ? "flex-start" : "center", flexDirection: isMobile ? "column" : "row" }}>
        <span style={{ color: C.greenBright, fontSize: isMobile ? 10 : 12, flexShrink: 0 }}>◎</span>
        <p style={{ margin: 0, fontSize: isMobile ? 11 : 12, color: C.greenBright, fontFamily: "Georgia,serif" }}>From board decision to first sale: <strong>14–18 weeks.</strong> Every week of delay on today's blockers adds a week to this timeline.</p>
      </div>
    </div>
  );
}

// ─── CLOSING ─────────────────────────────────────────────────────────────────
function ClosingSlide({ slide }: { slide: ClosingSlideData }) {
  const { isMobile, isTablet } = useResponsive();
  
  return (
    <div style={{ height: "100%", display: "flex", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: `linear-gradient(${C.gold} 1px, transparent 1px), linear-gradient(90deg, ${C.gold} 1px, transparent 1px)`, backgroundSize: "40px 40px" }}/>
      <div style={{ position: "absolute", right: 0, top: 0, width: isMobile ? "0" : "40%", height: "100%", background: `linear-gradient(135deg, ${C.gold}05 0%, transparent 70%)` }}/>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(to bottom, transparent, ${C.gold}, transparent)` }}/>
      {/* Left */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "0 24px" : isTablet ? "0 48px" : "0 56px", position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: "monospace", fontSize: isMobile ? 7 : 9, color: C.gold, opacity: 0.6, letterSpacing: "0.4em", marginBottom: isMobile ? 16 : 24 }}>KITS ADVISORY GROUP · DECISION REQUIRED</div>
        <h2 style={{ fontFamily: "'Didot','Bodoni MT','Playfair Display',Georgia,serif", fontSize: isMobile ? "clamp(14px,3vw,22px)" : "clamp(16px,2.2vw,26px)", fontWeight: 400, color: C.strike, margin: "0 0 28px", lineHeight: 1.5, maxWidth: 520 }}>{slide.title}</h2>
        <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 9, color: C.red, letterSpacing: "0.2em", marginBottom: isMobile ? 12 : 14 }}>FIVE DECISIONS — REQUIRED TODAY</div>
        {slide.decisions.map((d: string, i: number) => (
          <div key={i} style={{ display: "flex", gap: isMobile ? 10 : 12, marginBottom: isMobile ? 12 : 10, padding: isMobile ? "12px 16px" : "10px 14px", background: `${C.red}06`, border: `1px solid ${C.red}18`, borderLeft: `3px solid ${C.red}`, borderRadius: 3 }}>
            <span style={{ fontFamily: "monospace", fontSize: isMobile ? 9 : 10, color: C.red, flexShrink: 0, marginTop: 1 }}>{String(i + 1).padStart(2, "0")}</span>
            <p style={{ margin: 0, fontSize: isMobile ? 11 : 12, color: C.cream, lineHeight: 1.5 }}>{d}</p>
          </div>
        ))}
      </div>
      {/* Right: artifacts + closing statement */}
      {!isMobile && (
        <div style={{ width: "38%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 44px 0 0", position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: C.gold, letterSpacing: "0.2em", marginBottom: 12 }}>SUPPORTING ADVISORY DOCUMENTS</div>
          {slide.artifacts.map((a: ClosingSlideData['artifacts'][number], i: number) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 6, padding: "7px 10px", background: C.charcoal, borderRadius: 3, border: `1px solid ${C.ash}` }}>
              <span style={{ fontFamily: "monospace", fontSize: 8, color: C.goldDim, flexShrink: 0 }}>{a.ref}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, color: C.cream }}>{a.title}</div>
                <div style={{ fontFamily: "monospace", fontSize: 8, color: C.creamDim }}>{a.desc}</div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 20, padding: "16px 16px", background: `${C.gold}08`, border: `1px solid ${C.gold}25`, borderRadius: 4 }}>
            <p style={{ margin: 0, fontSize: 13, color: C.gold, fontFamily: "Georgia,serif", fontStyle: "italic", lineHeight: 1.7 }}>"{slide.closingLine}"</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SLIDE DATA ───────────────────────────────────────────────────────────────
const SLIDES: SlideData[] = [
  {
    id: "cover", type: "cover", label: "COVER",
    title: "STRIKE BITES", section: null,
    meta: "KITS Advisory Group · Confidential · May 2026",
    notes: {
      open: "Good [morning/afternoon]. Thank you for your time. This presentation is the culmination of KITS' full advisory work on STRIKE BITES — covering market research, brand strategy, competitive analysis, go-to-market, financials, and the critical decisions we must make in this room today. We have approximately 75 minutes. The most important section is Section 07 — the blockers. Everything before that is context. That section requires decisions.",
      emphasis: ["This is a working session, not a pitch. Every slide is designed to generate a decision, surface a gap, or confirm a direction. Interrupt freely."],
      timing: "2 minutes"
    }
  },
  {
    id: "agenda", type: "agenda", label: "AGENDA",
    section: "MEETING STRUCTURE",
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
  {
    id: "sec01", type: "section", label: "§01",
    section: "SECTION 01", color: C.gold,
    title: "The Opportunity",
    sub: "Why Lebanon. Why now. Why STRIKE owns this category.",
    notes: { open: "Transition slide. Brief pause.", emphasis: [], timing: "15 seconds" }
  },
  {
    id: "opportunity", type: "stats", label: "MARKET",
    section: "01 · THE OPPORTUNITY",
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
        "Pause on ZERO. Ask the room: 'When did you last see a locally made jerky brand in a Lebanese gym?' The answer confirms the opportunity.",
      ],
      timing: "4 minutes"
    }
  },
  {
    id: "whynow", type: "two-col", label: "TIMING",
    section: "01 · THE OPPORTUNITY",
    title: "Why Lebanon. Why Now.",
    left: {
      heading: "THE TAILWINDS",
      items: [
        "Lebanese fitness culture expanding — gyms, CrossFit, boutique studios proliferating across Beirut, Metn, Keserwan, Jounieh",
        "Health-conscious youth (18–40) actively tracking macros — protein content is now a purchase driver, not a feature",
        "USD-denominated market post-2019 creates pricing stability for a premium brand",
        "Lebanese manufacturing provenance is a GCC premium signal — 'Made in Lebanon' travels with cultural weight",
        "Halal certification unlocks 60%+ of Lebanese consumers + all GCC markets simultaneously from day one",
      ]
    },
    right: {
      heading: "THE WINDOW",
      items: [
        "First-mover advantage is available — but not indefinitely. Successful categories attract imitators within 12 months",
        "Imported competitors (Jack Link's, Wild West) are present but weak: high sugar, no Halal, wrong pricing, wrong flavor",
        "No local competitor is building in this space currently — confirmed by KITS field research",
        "MoPH regulatory timeline: 2–4 months — beginning now means shelf-ready Q4 2026",
        "Warm relationship network across gyms, nutrition stores, and pharmacies compresses outreach from 3 months to 3 weeks",
      ]
    },
    notes: {
      open: "The window is real and open — but first-mover advantage is not permanent. STRIKE's protection layers are: trademark registration (file immediately), brand equity built through relationships (cannot be copied in months), and flavor IP in the supply agreement (the Lebanese BBQ formula is owned by the venture).",
      emphasis: ["Speed of execution is a competitive moat. The longer we wait, the more we risk someone else discovering what KITS has confirmed through research."],
      timing: "3 minutes"
    }
  },
  {
    id: "sec02", type: "section", label: "§02",
    section: "SECTION 02", color: C.amber,
    title: "The Consumer",
    sub: "Three segments. One product. Sequenced by channel.",
    notes: { open: "Transition slide.", emphasis: [], timing: "15 seconds" }
  },
  {
    id: "segments", type: "segment", label: "CONSUMER",
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
    id: "sec03", type: "section", label: "§03",
    section: "SECTION 03", color: C.gold,
    title: "The Product",
    sub: "STRIKE BITES. What it is, what it does, and how it scales.",
    notes: { open: "Transition slide.", emphasis: [], timing: "15 seconds" }
  },
  {
    id: "product", type: "product", label: "PRODUCT",
    section: "03 · THE PRODUCT",
    title: "STRIKE BITES — The Launch Product",
    tagline: "Premium portioned beef jerky bites. Poppable. High-protein. Clean. Lebanese.",
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
      open: "The product is deliberately simple. Poppable beef jerky bites. High protein. Zero sugar. Halal certified. Lebanese made. That is the entire story in one sentence. Everything else — the brand, the packaging, the flavor profile — exists to make that sentence credible and compelling at point of purchase.",
      emphasis: [
        "BITES is not traditional jerky. The poppable format creates a different purchase occasion — grab-and-go protein, not a meal companion. This distinction matters at the gym counter.",
        "⚠ All [X] protein values are placeholders pending manufacturer nutritional panel. This is the top priority action from today's meeting.",
        "One SKU at launch. The product line is designed now and launched in sequence. Over-ranging at launch is the #1 FMCG startup mistake.",
      ],
      timing: "5 minutes"
    }
  },
  {
    id: "brandvisual", type: "brandvisual", label: "VISUAL",
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
    id: "sec04", type: "section", label: "§04",
    section: "SECTION 04", color: C.amber,
    title: "Brand & Competitive Edge",
    sub: "The STRIKE brand scored 88/100. Our 7 structural advantages no competitor can match.",
    notes: { open: "Transition slide.", emphasis: [], timing: "15 seconds" }
  },
  {
    id: "brand", type: "brandscore", label: "BRAND",
    section: "04 · BRAND STRATEGY",
    title: "STRIKE — Brand Identity Score",
    score: 88,
    elements: [
      { label: "Brand Name", value: "STRIKE", verdict: "APPROVED", score: 92, note: "Single syllable. Universal phonetics in Arabic, English, French. Kinetically charged — verb and noun simultaneously. Class 29 Lebanon clear." },
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
    id: "powerpoints", type: "powerpoints", label: "POWER",
    section: "04 · COMPETITIVE EDGE",
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
    id: "competitive", type: "matrix", label: "COMP",
    section: "04 · COMPETITIVE EDGE",
    title: "Head-to-Head: STRIKE vs. Every Competitor",
    subtitle: "Evaluated from the middleman (store owner) and end user (consumer) perspective simultaneously",
    rows: [
      { criterion: "Halal Certification", jl: "✗ Not certified", ww: "✗ Not certified", qb: "✗ Not certified", bb: "✗ Not certified", us: "✓ Dar Al-Fatwa", usWin: true },
      { criterion: "Zero Added Sugar", jl: "✗ Sugar = ingredient #2", ww: "✗ 20.6g per 100g", qb: "~ Sucralose (GI risk)", bb: "~ Maltitol (GI risk)", us: "✓ Zero. None.", usWin: true },
      { criterion: "Clean Ingredient List", jl: "✗ 10+ processed inputs", ww: "~ Better but nitrites", qb: "✗ Ultra-processed", bb: "✗ Engineered bar", us: "✓ Beef + spices only", usWin: true },
      { criterion: "Sale-or-Return Terms", jl: "✗ Cash upfront", ww: "✗ Cash upfront", qb: "✗ Via distributor", bb: "✗ Via distributor", us: "✓ First 30 days S-O-R", usWin: true },
      { criterion: "Direct Delivery <24h", jl: "✗ 3–7 days importer", ww: "✗ 5–14 days import", qb: "✗ 3–5 days dist.", bb: "✗ 3–5 days dist.", us: "✓ Personal · 24 hours", usWin: true },
      { criterion: "Lebanese Flavor Design", jl: "✗ Teriyaki / Sweet BBQ", ww: "✗ Honey BBQ / Jalapeño", qb: "✗ Cookie Dough", bb: "✗ Chocolate variants", us: "✓ Lebanese BBQ", usWin: true },
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
    id: "sec05", type: "section", label: "§05",
    section: "SECTION 05", color: C.greenBright,
    title: "Go-To-Market & Financials",
    sub: "Channel sequence, activation system, and three budget scenarios.",
    notes: { open: "Transition slide.", emphasis: [], timing: "15 seconds" }
  },
  {
    id: "gtm", type: "phases", label: "GTM",
    section: "05 · GO-TO-MARKET",
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
    id: "financial", type: "tiers", label: "FINANCE",
    section: "06 · FINANCIAL SCENARIOS",
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
        includes: ["SARL + all licensing", "MoPH (2 SKUs)", "Full brand identity system", "2 SKU production — 90 days", "50+ account outreach", "KITS Phase 0–2 management fee", "Contingency 15%"],
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
      ],
      timing: "6 minutes"
    }
  },
  {
    id: "sec06", type: "section", label: "§06",
    section: "SECTION 06", color: C.red,
    title: "Risk, Blockers & Mandate",
    sub: "What we are watching. What must be decided today. What KITS commits to.",
    notes: { open: "Transition slide.", emphasis: [], timing: "15 seconds" }
  },
  {
    id: "risks", type: "risks", label: "RISK",
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
    id: "blockers", type: "blockers", label: "BLOCKERS",
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
      ],
      timing: "8 minutes — allow full discussion"
    }
  },
  {
    id: "mandate", type: "mandate", label: "MANDATE",
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
    id: "timeline", type: "timeline", label: "TIMELINE",
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
    id: "closing", type: "closing", label: "CLOSE",
    title: "The Opportunity Is Real. The Category Is Empty. The Team Is Ready.",
    section: null,
    decisions: [
      "Budget tier selection — Tier 1, 2, or 3?",
      "KITS Management Mandate — sign in this meeting",
      "Brand name — STRIKE, confirmed by board?",
      "Flavor name — SMOKING BBQ BITES, confirmed?",
      "Manufacturer nutritional panel — who calls, by when?",
    ],
    artifacts: [
      { ref: "KAG-JRK-001", title: "Full Advisory Framework", desc: "10-section A–Z market entry guide" },
      { ref: "KAG-JRK-002", title: "Master Launch Checklist", desc: "38-step Phase 0→4 with brand research" },
      { ref: "KAG-JRK-003", title: "Financial Feasibility Study", desc: "Three-tier model with full projections" },
      { ref: "KAG-JRK-004", title: "Trade Outreach System", desc: "Scripts, objections, commercial terms, tracker" },
      { ref: "KAG-JRK-005", title: "Competitive Analysis", desc: "Full middleman + end user scoring matrix" },
      { ref: "KAG-JRK-006", title: "Brand & Packaging Design Brief", desc: "Complete spec for designer" },
      { ref: "KAG-JRK-007", title: "Manufacturer Technical Brief", desc: "Flavor, quality, Halal, supply terms" },
      { ref: "KAG-JRK-008", title: "STRIKE Brand Enhancement Study", desc: "88/100 brand score, full recommendations" },
    ],
    closingLine: "The category is empty today. The question is whether STRIKE owns it, or whether we watch someone else build it.",
    notes: {
      open: "That is everything KITS has built and researched. Eight detailed advisory documents, all available for deep review. This meeting has one purpose: to leave with five decisions made. Ask the room directly: 'Which tier?' Do not leave without a number. Offer to sign the mandate document in the room if it has been pre-reviewed.",
      emphasis: [
        "Ask directly: 'Which tier are we working with?' Then stop talking. Let the room answer.",
        "If there is resistance on the mandate signing, offer a 48-hour review period — but make clear that KITS cannot begin formal execution without it.",
        "Close with the final line verbatim: 'The category is empty today. The question is whether STRIKE owns it, or whether we watch someone else build it.'",
      ],
      timing: "5 minutes + Q&A"
    }
  }
];

// ─── RENDERER DISPATCH ────────────────────────────────────────────────────────
function RenderSlide({ slide }: { slide: SlideData }) {
  switch (slide.type) {
    case "cover": return <CoverSlide slide={slide as CoverSlideData}/>;
    case "section": return <SectionDivider slide={slide as SectionSlideData}/>;
    case "agenda": return <AgendaSlide slide={slide as AgendaSlideData}/>;
    case "stats": return <StatsSlide slide={slide as StatsSlideData}/>;
    case "two-col": return <TwoColSlide slide={slide as TwoColSlideData}/>;
    case "segment": return <SegmentSlide slide={slide as SegmentSlideData}/>;
    case "product": return <ProductSlide slide={slide as ProductSlideData}/>;
    case "brandvisual": return <BrandVisualSlide slide={slide as BrandVisualSlideData}/>;
    case "brandscore": return <BrandScoreSlide slide={slide as BrandScoreSlideData}/>;
    case "powerpoints": return <PowerPointsSlide slide={slide as PowerPointsSlideData}/>;
    case "matrix": return <MatrixSlide slide={slide as MatrixSlideData}/>;
    case "phases": return <PhasesSlide slide={slide as PhasesSlideData}/>;
    case "tiers": return <TiersSlide slide={slide as TiersSlideData}/>;
    case "risks": return <RiskSlide slide={slide as RiskSlideData}/>;
    case "blockers": return <BlockersSlide slide={slide as BlockersSlideData}/>;
    case "mandate": return <MandateSlide slide={slide as MandateSlideData}/>;
    case "timeline": return <TimelineSlide slide={slide as TimelineSlideData}/>;
    case "closing": return <ClosingSlide slide={slide as ClosingSlideData}/>;
    default: return null;
  }
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function BoardPresentation() {
  const [current, setCurrent] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const total = SLIDES.length;
  const slide = SLIDES[current];

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent(c => Math.min(total - 1, c + 1)), [total]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (["ArrowRight","ArrowDown"," "].includes(e.key)) { e.preventDefault(); next(); }
      if (["ArrowLeft","ArrowUp"].includes(e.key)) { e.preventDefault(); prev(); }
      if (e.key === "n" || e.key === "N") setShowNotes(s => !s);
      if (e.key === "Escape") setShowNav(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [next, prev]);

  return (
    <div style={{ minHeight: "100vh", background: C.void, display: "flex", flexDirection: "column", fontFamily: "Georgia, serif", userSelect: "none" }}>

      {/* ── TOP BAR ── */}
      <div style={{ background: C.void, borderBottom: `1px solid ${C.ash}`, padding: "7px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0, zIndex: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "monospace", fontSize: 11, color: C.gold, letterSpacing: "0.3em" }}>STRIKE BITES</span>
          <span style={{ width: 1, height: 14, background: C.ash }}/>
          <span style={{ fontFamily: "monospace", fontSize: 8, color: C.creamDim, opacity: 0.5, letterSpacing: "0.1em" }}>BOARD PRESENTATION · KITS ADVISORY GROUP · CONFIDENTIAL</span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button onClick={() => setShowNav(!showNav)} style={{ background: showNav ? `${C.gold}15` : "transparent", border: `1px solid ${showNav ? C.gold : C.ash}`, borderRadius: 3, padding: "4px 10px", cursor: "pointer", fontFamily: "monospace", fontSize: 8, color: showNav ? C.gold : C.creamDim, letterSpacing: "0.1em", WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}>SLIDES</button>
          <button onClick={() => setShowNotes(!showNotes)} style={{ background: showNotes ? `${C.gold}15` : "transparent", border: `1px solid ${showNotes ? C.gold : C.ash}`, borderRadius: 3, padding: "4px 10px", cursor: "pointer", fontFamily: "monospace", fontSize: 8, color: showNotes ? C.gold : C.creamDim, letterSpacing: "0.1em", WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}>NOTES {showNotes ? "▲" : "▼"}</button>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: C.creamDim, background: C.charcoal, padding: "4px 10px", borderRadius: 3, border: `1px solid ${C.ash}` }}>{String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</div>
        </div>
      </div>

      {/* ── SLIDE NAVIGATOR ── */}
      {showNav && (
        <div style={{ background: C.obsidian, borderBottom: `1px solid ${C.ash}`, padding: "10px 24px", display: "flex", gap: 4, flexWrap: "wrap", flexShrink: 0, zIndex: 19 }}>
          {SLIDES.map((s: SlideData, i: number) => (
            <button key={i} onClick={() => { setCurrent(i); setShowNav(false); }} style={{ background: current === i ? `${C.gold}18` : s.type === "section" ? `${C.ember}` : "transparent", border: `1px solid ${current === i ? C.gold : C.ash}`, borderRadius: 3, padding: "5px 10px", cursor: "pointer", transition: "all 0.15s", minWidth: s.type === "section" ? 70 : 48, WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}>
              <div style={{ fontFamily: "monospace", fontSize: 6, color: current === i ? C.gold : C.creamDim, marginBottom: 1, letterSpacing: "0.08em" }}>{String(i + 1).padStart(2, "0")}</div>
              <div style={{ fontSize: 8, color: current === i ? C.cream : s.type === "section" ? C.gold : C.creamDim, letterSpacing: s.type === "section" ? "0.08em" : 0 }}>{s.label}</div>
            </button>
          ))}
        </div>
      )}

      {/* ── MAIN SLIDE AREA ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        <div style={{ flex: showNotes ? "0 0 62%" : 1, background: C.obsidian, position: "relative", overflow: "hidden" }}>
          {/* Progress bar */}
          <div style={{ position: "absolute", top: 0, left: 0, width: `${((current + 1) / total) * 100}%`, height: 2, background: `linear-gradient(to right, ${C.goldDim}, ${C.gold}, ${C.goldBright})`, transition: "width 0.35s ease", zIndex: 10 }}/>
          {/* Slide content */}
          <div style={{ position: "absolute", inset: 0, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
            <RenderSlide slide={slide}/>
          </div>
          {/* Nav arrows */}
          <button onClick={prev} disabled={current === 0} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: `${C.obsidian}DD`, border: `1px solid ${C.ash}`, borderRadius: "50%", width: 34, height: 34, cursor: current === 0 ? "default" : "pointer", color: current === 0 ? C.ash : C.cream, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", opacity: current === 0 ? 0.2 : 0.65, transition: "opacity 0.2s", zIndex: 10, WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}>‹</button>
          <button onClick={next} disabled={current === total - 1} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: `${C.obsidian}DD`, border: `1px solid ${C.ash}`, borderRadius: "50%", width: 34, height: 34, cursor: current === total - 1 ? "default" : "pointer", color: current === total - 1 ? C.ash : C.cream, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", opacity: current === total - 1 ? 0.2 : 0.65, transition: "opacity 0.2s", zIndex: 10, WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}>›</button>
        </div>

        {/* ── PRESENTER NOTES PANEL ── */}
        {showNotes && slide.notes && (
          <div style={{ flex: "0 0 38%", background: "#08070A", borderTop: `2px solid ${C.gold}35`, overflowY: "auto", padding: "16px 32px", WebkitOverflowScrolling: "touch" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: C.gold, letterSpacing: "0.25em" }}>PRESENTER NOTES · SLIDE {String(current + 1).padStart(2, "0")} · {slide.label}</div>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div style={{ fontFamily: "monospace", fontSize: 8, color: C.creamDim }}>TIMING: {slide.notes.timing}</div>
              </div>
            </div>
            <p style={{ margin: "0 0 16px", fontSize: 13, color: C.cream, lineHeight: 1.8, borderLeft: `3px solid ${C.gold}35`, paddingLeft: 14 }}>{slide.notes.open}</p>
            {slide.notes.emphasis && slide.notes.emphasis.length > 0 && (
              <div>
                <div style={{ fontFamily: "monospace", fontSize: 8, color: C.amber, letterSpacing: "0.2em", marginBottom: 10 }}>★ EMPHASIS POINTS</div>
                {slide.notes.emphasis.map((e: string, i: number) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, padding: "10px 14px", background: `${C.amber}08`, border: `1px solid ${C.amber}18`, borderLeft: `3px solid ${C.amber}50`, borderRadius: 3 }}>
                    <span style={{ color: C.amber, fontSize: 10, flexShrink: 0, marginTop: 1 }}>★</span>
                    <p style={{ margin: 0, fontSize: 12, color: C.amber, opacity: 0.9, lineHeight: 1.7 }}>{e}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{ background: C.void, borderTop: `1px solid ${C.ash}`, padding: "6px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 20 }}>
          <button onClick={prev} disabled={current === 0} style={{ background: "transparent", border: "none", cursor: current === 0 ? "default" : "pointer", fontFamily: "monospace", fontSize: 8, color: current === 0 ? C.ash : C.creamDim, letterSpacing: "0.1em", WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}>← PREV</button>
          <button onClick={next} disabled={current === total - 1} style={{ background: "transparent", border: "none", cursor: current === total - 1 ? "default" : "pointer", fontFamily: "monospace", fontSize: 8, color: current === total - 1 ? C.ash : C.creamDim, letterSpacing: "0.1em", WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}>NEXT →</button>
        </div>
        {/* Dot pagination */}
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          {SLIDES.map((s: SlideData, i: number) => (
            <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 22 : s.type === "section" ? 8 : 5, height: s.type === "section" ? 5 : 4, borderRadius: 3, background: i === current ? C.gold : s.type === "section" ? C.goldDim : C.ash, border: "none", cursor: "pointer", padding: 0, transition: "all 0.25s ease", WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}/>
          ))}
        </div>
        <div style={{ fontFamily: "monospace", fontSize: 7, color: C.creamDim, opacity: 0.35, letterSpacing: "0.15em" }}>
          N = NOTES · ← → = NAVIGATE · SLIDES = OVERVIEW
        </div>
      </div>
    </div>
  );
}

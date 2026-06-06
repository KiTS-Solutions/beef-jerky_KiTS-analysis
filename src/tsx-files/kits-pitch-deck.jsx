import { useState, useEffect, useCallback, useContext } from "react";
import { DARK as C, LIGHT, ThemeCtx } from './pitch-theme';
import FinancialStudy from './kits-financial-study.tsx';
import jacklinksImg       from '../competition/jacklinks.png';
import jacklinksFlavorImg from '../competition/jacklinks-flavors.png';
import haloImg            from '../competition/halo.png';
import rawBitesFlavorsImg from '../competition/raw-bites-flavors.png';
import acupFlavorsImg     from '../competition/Acup-flavors.png';
import wildWestImg        from '../competition/wild-west.png';
import countryArcherImg   from '../competition/country-archer.png';
import makBarImg          from '../competition/mak-bar.png';
import barebellsImg       from '../competition/barebells.png';
import questBarImg        from '../competition/quest-bar.png';

// ─── RESPONSIVE HOOK ──────────────────────────────────────────────────────────
function useResponsive() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  useEffect(() => {
    const h = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1024);
    };
    h();
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return { isMobile, isTablet };
}

// ─── LIGHTBOX ─────────────────────────────────────────────────────────────────
function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    // Inject fade-in keyframe once
    const id = "__lb_kf__";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id;
      s.textContent = "@keyframes __lbFadeIn{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}";
      document.head.appendChild(s);
    }
    // ESC to close
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    // Scroll lock
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(5,4,4,0.93)",
        backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "zoom-out",
      }}
    >
      {/* Close button — top-right, 44×44 touch target */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close image viewer"
        style={{
          position: "fixed", top: 16, right: 16, zIndex: 10000,
          width: 44, height: 44, borderRadius: "50%",
          background: "rgba(237,224,204,0.12)",
          border: "1px solid rgba(237,224,204,0.25)",
          color: C.cream, fontSize: 24, lineHeight: "44px",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "monospace", fontWeight: 300, transition: "background 0.15s, border-color 0.15s",
          padding: 0,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(237,224,204,0.25)";
          e.currentTarget.style.borderColor = "rgba(237,224,204,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(237,224,204,0.12)";
          e.currentTarget.style.borderColor = "rgba(237,224,204,0.25)";
        }}
      >
        ×
      </button>

      {/* Image container — stop propagation so clicking the image doesn't close */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          cursor: "default",
          animation: "__lbFadeIn 0.2s cubic-bezier(0.22,1,0.36,1) both",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
        }}
      >
        <img
          src={src}
          alt={alt || ""}
          style={{
            maxWidth: "92vw", maxHeight: "86vh",
            objectFit: "contain", display: "block",
            borderRadius: 4,
            boxShadow: "0 32px 96px rgba(0,0,0,0.85), 0 0 0 1px rgba(200,160,80,0.12)",
          }}
        />
        {alt && (
          <div style={{
            fontFamily: "monospace", fontSize: 10, color: C.creamDim,
            letterSpacing: "0.12em", textTransform: "uppercase",
          }}>
            {alt}
          </div>
        )}
        <div style={{ fontFamily: "monospace", fontSize: 8.5, color: C.goldDim, letterSpacing: "0.1em" }}>
          ESC or click outside to close
        </div>
      </div>
    </div>
  );
}

// ─── SHARED SLIDE HEADER ──────────────────────────────────────────────────────
function SH({ slide }) {
  const C = useContext(ThemeCtx);
  return (
    <div style={{ marginBottom: 4 }}>
      {slide.section && (
        <div style={{ fontFamily: "monospace", fontSize: 11, color: C.gold, opacity: 0.6, letterSpacing: "0.3em", marginBottom: 6 }}>
          {slide.section}
        </div>
      )}
      <h2 style={{ margin: "0 0 4px", fontFamily: "Georgia,'Times New Roman',serif", fontSize: "clamp(22px,2.7vw,42px)", fontWeight: 400, color: C.cream, lineHeight: 1.2 }}>
        {slide.title}
      </h2>
      <div style={{ width: 48, height: 2, background: `linear-gradient(to right,${C.gold},transparent)`, marginTop: 8 }} />
    </div>
  );
}

// ─── SECTION DIVIDER ──────────────────────────────────────────────────────────
function SectionDivider({ slide }) {
  const C = useContext(ThemeCtx);
  const { isMobile } = useResponsive();
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg,${slide.color}08 0%,transparent 60%)` }} />
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 4, background: slide.color }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: `linear-gradient(${C.gold} 1px,transparent 1px),linear-gradient(90deg,${C.gold} 1px,transparent 1px)`, backgroundSize: "40px 40px" }} />
      <div style={{ textAlign: "center", position: "relative", zIndex: 1, padding: isMobile ? "20px" : "40px" }}>
        <div style={{ fontFamily: "monospace", fontSize: isMobile ? 11 : 13, color: slide.color, opacity: 0.7, letterSpacing: "0.5em", marginBottom: isMobile ? 16 : 20 }}>{slide.badge}</div>
        <h1 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: isMobile ? "clamp(30px,6vw,52px)" : "clamp(42px,5.5vw,72px)", fontWeight: 400, color: C.strike, margin: "0 0 20px", lineHeight: 1.1 }}>{slide.title}</h1>
        <div style={{ width: isMobile ? 48 : 64, height: 2, background: `linear-gradient(to right,${slide.color},transparent)`, margin: "0 auto 20px" }} />
        {slide.sub && <p style={{ fontFamily: "Georgia,serif", fontSize: isMobile ? 16 : 19, color: C.creamDim, margin: 0, maxWidth: 560, lineHeight: 1.65 }}>{slide.sub}</p>}
      </div>
    </div>
  );
}

// ─── COVER ────────────────────────────────────────────────────────────────────
function CoverSlide() {
  const C = useContext(ThemeCtx);
  const { isMobile } = useResponsive();
  return (
    <div style={{ height: "100%", display: "flex", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: `linear-gradient(${C.gold} 1px,transparent 1px),linear-gradient(90deg,${C.gold} 1px,transparent 1px)`, backgroundSize: "36px 36px" }} />
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(to bottom,transparent,${C.gold},transparent)` }} />

      {/* Left — text content */}
      <div style={{ flex: isMobile ? 1 : "0 0 54%", display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "0 24px" : "0px 0px 0px 30px", position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 10, color: C.gold, opacity: 0.55, letterSpacing: "0.45em", marginBottom: isMobile ? 20 : 32 }}>
          Ru'ya 360° ADVISORY GROUP · PRIVATE & CONFIDENTIAL · KAG-JRK-PITCH-001
        </div>
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: isMobile ? "clamp(32px,8vw,56px)" : "clamp(48px,6vw,88px)", fontWeight: 400, color: C.strike, letterSpacing: "0.18em", lineHeight: 1, display: "block" }}>STRIKE</span>
          <span style={{ fontFamily: "Georgia,serif", fontSize: isMobile ? "clamp(16px,4vw,28px)" : "clamp(20px,3.2vw,40px)", fontWeight: 400, color: C.gold, letterSpacing: "0.18em", display: "block" }}>BITES</span>
        </div>
        <div style={{ width: isMobile ? 60 : 80, height: 2, background: `linear-gradient(to right,${C.gold},transparent)`, margin: "24px 0" }} />
        <p style={{ fontSize: isMobile ? 13 : "clamp(13px,1.8vw,18px)", color: C.cream, opacity: 0.75, margin: "0 0 8px", fontFamily: "Georgia,serif" }}>Lebanon's First Premium Beef Jerky Brand</p>
        <p style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 10, color: C.creamDim, opacity: 0.45, margin: "0 0 36px", letterSpacing: "0.2em" }}>CLIENT ADVISORY PRESENTATION · Ru'ya 360° · JUNE 2026</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {["10 Deliverables Ready","88/100 Brand Score","38-Step Launch Plan","3 Financial Scenarios","$0 Local Competition"].map((t, i) => (
            <span key={i} style={{ fontFamily: "monospace", fontSize: 7.5, color: C.creamDim, background: `${C.gold}0D`, border: `1px solid ${C.gold}28`, padding: "5px 11px", borderRadius: 2, letterSpacing: "0.05em" }}>{t}</span>
          ))}
        </div>
        <div style={{ marginTop: 32, fontFamily: "monospace", fontSize: 8, color: C.goldDim, letterSpacing: "0.1em" }}>
          Ru'ya 360° Advisory Group · Lebanese Market · June 2026
        </div>
      </div>

      {/* Right — product image */}
      {!isMobile && (
        <div style={{
          flex: "0 0 46%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          overflow: "hidden",
          paddingRight: "6%",
        }}>
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to right,${C.obsidian} 0%,transparent 18%)`, zIndex: 2 }} />
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 50% 50%,${C.gold}08 0%,transparent 70%)` }} />
          <img
            src="/beef-jerky_KiTS-analysis/bag1.png"
            alt="Strike Bites product"
            style={{
              position: "relative",
              zIndex: 1,
              maxHeight: "78%",
              maxWidth: "80%",
              objectFit: "contain",
              filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.85)) drop-shadow(0 4px 16px rgba(200,160,80,0.18))",
            }}
          />
        </div>
      )}
    </div>
  );
}

// ─── LISTEN SLIDE ─────────────────────────────────────────────────────────────
function ListenSlide({ slide }) {
  const C = useContext(ThemeCtx);
  const { isMobile } = useResponsive();
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 20px" : "44px 72px" }}>
      <SH slide={slide} />
      <p style={{ fontSize: isMobile ? 15 : 17, color: C.cream, fontFamily: "Georgia,serif", margin: "8px 0 20px", lineHeight: 1.75, opacity: 0.85 }}>{slide.intro}</p>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10 }}>
        {slide.questions.map((q, i) => (
          <div key={i} style={{ background: `${q.color}07`, border: `1px solid ${q.color}22`, borderLeft: `3px solid ${q.color}`, borderRadius: 3, padding: isMobile ? "14px 16px" : "16px 18px", display: "flex", gap: 12, alignItems: "flex-start" }}>
            <span style={{ fontFamily: "monospace", fontSize: isMobile ? 11 : 12, color: q.color, flexShrink: 0, marginTop: 2 }}>Q{String(i + 1).padStart(2, "0")}</span>
            <p style={{ margin: 0, fontSize: isMobile ? 14 : 15, color: C.cream, lineHeight: 1.65 }}>{q.text}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: "12px 18px", background: `${C.gold}08`, border: `1px solid ${C.gold}20`, borderRadius: 3 }}>
        <p style={{ margin: 0, fontSize: isMobile ? 13 : 14, color: C.gold, fontFamily: "Georgia,serif", fontStyle: "italic" }}>"{slide.note}"</p>
      </div>
    </div>
  );
}

// ─── STATS / MARKET ───────────────────────────────────────────────────────────
function StatsSlide({ slide }) {
  const C = useContext(ThemeCtx);
  const { isMobile } = useResponsive();
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 20px" : "44px 72px" }}>
      <SH slide={slide} />
      <div style={{ margin: "12px 0 20px", padding: isMobile ? "12px 16px" : "14px 20px", background: `${C.greenBright}10`, border: `1px solid ${C.greenBright}30`, borderLeft: `4px solid ${C.greenBright}`, borderRadius: 3 }}>
        <p style={{ margin: 0, fontSize: isMobile ? 16 : 20, color: C.greenBright, fontFamily: "Georgia,serif", fontStyle: "italic", lineHeight: 1.5 }}>{slide.headline}</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 12, flex: 1, alignContent: "start" }}>
        {slide.stats.map((s, i) => (
          <div key={i} style={{ background: `${s.color}08`, border: `1px solid ${s.color}25`, borderTop: `3px solid ${s.color}`, borderRadius: 4, padding: isMobile ? "16px 14px" : "22px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? "clamp(20px,5vw,32px)" : "clamp(22px,2.5vw,38px)", color: s.color, lineHeight: 1, letterSpacing: "-0.02em" }}>{s.value}</div>
            <div>
              <div style={{ fontSize: isMobile ? 13 : 15, color: C.cream, marginBottom: 4, lineHeight: 1.4 }}>{s.label}</div>
              <div style={{ fontFamily: "monospace", fontSize: isMobile ? 10 : 11, color: C.creamDim, lineHeight: 1.4 }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>
      {slide.footnote && <p style={{ margin: "12px 0 0", fontSize: isMobile ? 9 : 10, color: C.creamDim, fontFamily: "monospace" }}>{slide.footnote}</p>}
    </div>
  );
}

// ─── TWO COL ──────────────────────────────────────────────────────────────────
function TwoColSlide({ slide }) {
  const C = useContext(ThemeCtx);
  const { isMobile } = useResponsive();
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 20px" : "44px 72px" }}>
      <SH slide={slide} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20, marginTop: 20 }}>
        {[slide.left, slide.right].map((col, ci) => (
          <div key={ci} style={{ background: ci === 0 ? `${C.gold}07` : `${C.greenBright}07`, border: `1px solid ${ci === 0 ? C.gold : C.greenBright}20`, borderTop: `3px solid ${ci === 0 ? C.gold : C.greenBright}`, borderRadius: 4, padding: "22px 24px" }}>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 11 : 12, color: ci === 0 ? C.gold : C.greenBright, letterSpacing: "0.2em", marginBottom: 16, paddingBottom: 10, borderBottom: `1px solid ${ci === 0 ? C.gold : C.greenBright}20` }}>{col.heading}</div>
            {col.items.map((item, ii) => (
              <div key={ii} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                <span style={{ color: ci === 0 ? C.gold : C.greenBright, fontSize: 11, flexShrink: 0, marginTop: 3 }}>→</span>
                <p style={{ margin: 0, fontSize: isMobile ? 14 : 15, color: C.cream, opacity: 0.85, lineHeight: 1.65 }}>{item}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DELIVERABLES ─────────────────────────────────────────────────────────────
function DeliverablesSlide({ slide }) {
  const C = useContext(ThemeCtx);
  const { isMobile } = useResponsive();
  const [active, setActive] = useState(0);
  const item = slide.items[active];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 16px" : "40px 60px" }}>
      <SH slide={slide} />
      <p style={{ fontSize: isMobile ? 13 : 15, color: C.creamDim, fontFamily: "Georgia,serif", margin: "4px 0 12px", lineHeight: 1.65 }}>{slide.subtitle}</p>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "240px 1fr", gap: 12, minHeight: 0 }}>
        <div style={{ display: "flex", flexDirection: isMobile ? "row" : "column", gap: 3, overflowX: isMobile ? "auto" : "hidden", overflowY: isMobile ? "hidden" : "auto", WebkitOverflowScrolling: "touch" }}>
          {slide.items.map((it, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ background: active === i ? `${it.color}15` : "transparent", border: `1px solid ${active === i ? it.color : C.ash}`, borderLeft: `3px solid ${it.color}`, borderRadius: 3, padding: isMobile ? "8px 10px" : "9px 13px", cursor: "pointer", textAlign: "left", transition: "all 0.15s", flexShrink: 0, WebkitTapHighlightColor: "transparent" }}>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: it.color, marginBottom: 2 }}>{it.ref}</div>
              <div style={{ fontSize: isMobile ? 11 : 12.5, color: active === i ? C.cream : C.creamDim, lineHeight: 1.3, whiteSpace: isMobile ? "nowrap" : "normal" }}>{it.title}</div>
            </button>
          ))}
        </div>
        <div style={{ background: `${item.color}07`, border: `1px solid ${item.color}22`, borderRadius: 4, padding: "20px 22px", display: "flex", flexDirection: "column", gap: 12, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: item.color, letterSpacing: "0.2em", marginBottom: 6 }}>{item.ref}</div>
            <h3 style={{ margin: "0 0 10px", fontSize: isMobile ? 17 : 21, fontWeight: 400, color: C.cream, fontFamily: "Georgia,serif" }}>{item.title}</h3>
            <p style={{ margin: 0, fontSize: isMobile ? 13 : 15, color: C.creamDim, lineHeight: 1.8 }}>{item.desc}</p>
          </div>
          <div style={{ height: 1, background: C.ash }} />
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: C.creamDim, letterSpacing: "0.15em", marginBottom: 7 }}>CONTAINS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {item.tags.map((tag, ti) => (
                <span key={ti} style={{ fontFamily: "monospace", fontSize: 8, color: item.color, background: `${item.color}10`, border: `1px solid ${item.color}28`, padding: "3px 9px", borderRadius: 2 }}>{tag}</span>
              ))}
            </div>
          </div>
          <div style={{ background: `${C.greenBright}09`, border: `1px solid ${C.greenBright}1E`, borderRadius: 3, padding: "9px 13px" }}>
            <span style={{ fontFamily: "monospace", fontSize: 8, color: C.greenBright }}>✓ STATUS: {item.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BRAND SCORE ──────────────────────────────────────────────────────────────
function BrandScoreSlide({ slide }) {
  const C = useContext(ThemeCtx);
  const { isMobile } = useResponsive();
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 20px" : "36px 72px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 12 : 0 }}>
        <SH slide={slide} />
        <div style={{ textAlign: "center", flexShrink: 0, background: `${C.gold}08`, border: `1px solid ${C.gold}25`, borderRadius: 4, padding: isMobile ? "10px 16px" : "12px 20px" }}>
          <div style={{ fontFamily: "monospace", fontSize: isMobile ? 32 : 44, color: C.goldBright, lineHeight: 1 }}>{slide.score}</div>
          <div style={{ fontFamily: "monospace", fontSize: 10, color: C.gold, letterSpacing: "0.15em", marginTop: 4 }}>/ 100 BRAND SCORE</div>
          <div style={{ fontFamily: "monospace", fontSize: 10, color: C.greenBright, marginTop: 4 }}>APPROVED — STRONG</div>
        </div>
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: 8, marginTop: 16 }}>
        {slide.elements.map((el, i) => (
          <div key={i} style={{ background: C.charcoal, border: `1px solid ${el.verdict === "APPROVED" ? C.greenBright : C.gold}15`, borderLeft: `3px solid ${el.verdict === "APPROVED" ? C.greenBright : C.gold}`, borderRadius: 3, padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, alignItems: "flex-start", gap: 4 }}>
              <div style={{ fontFamily: "monospace", fontSize: 11, color: C.creamDim, letterSpacing: "0.1em", lineHeight: 1.3 }}>{el.label}</div>
              <span style={{ fontFamily: "monospace", fontSize: 9, color: el.verdict === "APPROVED" ? C.greenBright : C.gold, background: `${el.verdict === "APPROVED" ? C.greenBright : C.gold}15`, padding: "1px 6px", borderRadius: 2, flexShrink: 0 }}>{el.verdict}</span>
            </div>
            <div style={{ fontSize: isMobile ? 16 : 20, color: C.cream, fontFamily: "Georgia,serif", marginBottom: 6 }}>{el.value}</div>
            <div style={{ height: 3, background: C.ash, borderRadius: 2, marginBottom: 7 }}>
              <div style={{ width: `${el.score}%`, height: "100%", background: el.verdict === "APPROVED" ? C.greenBright : C.gold, borderRadius: 2 }} />
            </div>
            <p style={{ margin: 0, fontSize: 13, color: C.creamDim, lineHeight: 1.55 }}>{el.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ROADMAP / PHASES ─────────────────────────────────────────────────────────
function RoadmapSlide({ slide }) {
  const C = useContext(ThemeCtx);
  const { isMobile } = useResponsive();
  const [active, setActive] = useState(0);
  const ph = slide.phases[active];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 20px" : "36px 72px" }}>
      <SH slide={slide} />
      <div style={{ display: "flex", gap: 6, marginTop: 16, marginBottom: 16, flexDirection: isMobile ? "column" : "row" }}>
        {slide.phases.map((p, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ flex: 1, background: active === i ? `${p.color}18` : C.charcoal, border: `1px solid ${active === i ? p.color : C.ash}`, borderTop: `3px solid ${active === i ? p.color : C.ash}`, borderRadius: 3, padding: "10px 12px", cursor: "pointer", textAlign: "left", transition: "all 0.2s", WebkitTapHighlightColor: "transparent" }}>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: p.color, letterSpacing: "0.15em", marginBottom: 4 }}>{p.phase}</div>
            <div style={{ fontSize: 14, color: active === i ? C.cream : C.creamDim, marginBottom: 2 }}>{p.title}</div>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: C.creamDim }}>{p.time}</div>
          </button>
        ))}
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14 }}>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: ph.color, letterSpacing: "0.2em", marginBottom: 12 }}>KEY ACTIONS</div>
          {ph.actions.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
              <span style={{ color: ph.color, fontSize: 11, flexShrink: 0, marginTop: 3 }}>→</span>
              <p style={{ margin: 0, fontSize: 14, color: C.creamDim, lineHeight: 1.6 }}>{a}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: `${ph.color}08`, border: `1px solid ${ph.color}25`, borderRadius: 4, padding: "14px 16px" }}>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: ph.color, letterSpacing: "0.15em", marginBottom: 10 }}>TARGETS AT END OF PHASE</div>
            {ph.targets.map((t, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${ph.color}15` }}>
                <span style={{ fontSize: 14, color: C.creamDim }}>{t.label}</span>
                <span style={{ fontFamily: "monospace", fontSize: 14, color: ph.color }}>{t.value}</span>
              </div>
            ))}
          </div>
          <div style={{ background: `${C.gold}06`, border: `1px solid ${C.gold}15`, borderRadius: 4, padding: "14px 16px", flex: 1 }}>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: C.gold, letterSpacing: "0.15em", marginBottom: 8 }}>Ru'ya 360° PRINCIPLE</div>
            <p style={{ margin: 0, fontSize: 14, color: C.cream, lineHeight: 1.7, fontFamily: "Georgia,serif", fontStyle: "italic" }}>"{ph.principle}"</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FINANCIAL CORRECTION SLIDE ──────────────────────────────────────────────
function FinancialCorrectionSlide({ slide }) {
  const C = useContext(ThemeCtx);
  const { isMobile } = useResponsive();
  const [barReady, setBarReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setBarReady(true), 300); return () => clearTimeout(t); }, []);

  const corrections = [
    { metric: "RETAIL PRICE", old: "$3.00–$3.50", current: "$4.50", severity: "CRITICAL", reason: "Jack Link's 40g sells at $5.62 in Lebanon. Correct floor: $4.00. Wild West has no Lebanese presence — STRIKE has zero direct local competition.", col: C.red },
    { metric: "M6 REVENUE (TIER 2)", old: "$18K–$28K/mo", current: "$9K–$14K/mo", severity: "HIGH", reason: "Original implied 3.5–7.2 units/account/day — top-quartile velocity for a new SKU. Revised at 1.5 units/day × 70 accounts = base case. $18K retained as upside scenario.", col: C.amber },
    { metric: "GROSS MARGIN", old: "48–55%", current: "55–62%", severity: "REVISED UP", reason: "At corrected $4.50 RRP and $1.20 COGS, wholesale revenue is $3.15 (gym 30%), delivering 61.9% GM — above original target. The correction is favorable.", col: C.greenBright },
    { metric: "BREAKEVEN (TIER 2)", old: "Month 5–7", current: "Month 8–11", severity: "REVISED", reason: "Revenue ramp recalibrated ~50% at M6. M12 ($40K–$65K) unchanged — achievable if M6–M12 traction at 2–4 units/day materializes from the corrected base.", col: C.gold },
    { metric: "MoPH REGISTRATION FEE", old: "$800–$2,500/SKU", current: "REQUIRES QUOTE", severity: "OPEN", reason: "Lebanese MoPH publishes no public fee schedule. This figure cannot be presented as verified. Required: direct written quote from MoPH Food Safety Dept.", col: C.amber },
    { metric: "GS1 BARCODE FEE", old: "$200–$500", current: "REQUIRES QUOTE", severity: "OPEN", reason: "gs1lb.org has no published fee schedule. Contact customers@gs1lb.org / +961 1 744 161 for a written quote. Working placeholder: $150–$300 reg + $200–$500/yr.", col: C.amber },
  ];

  const waterfall = [
    { label: "Retail Price (RRP)", value: "$4.50", col: C.gold, pct: 100, sign: "+" },
    { label: "Channel Margin 30%", value: "−$1.35", col: C.red, pct: 30, sign: "" },
    { label: "= Wholesale Revenue", value: "$3.15", col: C.greenBright, pct: 70, sign: "" },
    { label: "Cost of Goods (COGS)", value: "−$1.20", col: C.red, pct: 27, sign: "" },
    { label: "= Gross Profit", value: "$1.95", col: C.greenBright, pct: 43, sign: "" },
  ];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "20px 16px" : "32px 64px", overflowY: "auto" }}>
      <SH slide={slide} />
      <div style={{ display: "flex", gap: 6, marginTop: 10, marginBottom: 14, flexWrap: "wrap" }}>
        {[{ label: "6 Corrections Applied", col: C.greenBright }, { label: "RRP: $4.50 Confirmed", col: C.gold }, { label: "Jack Links Benchmark: $5.62", col: C.amber }, { label: "v2.0 Model", col: C.steel }].map((b, i) => (
          <span key={i} style={{ fontFamily: "monospace", fontSize: 7.5, color: b.col, background: `${b.col}10`, border: `1px solid ${b.col}28`, padding: "3px 9px", borderRadius: 2, letterSpacing: "0.05em" }}>{b.label}</span>
        ))}
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.15fr 0.85fr", gap: 12, minHeight: 0 }}>
        {/* Left: corrections grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6, overflowY: "auto" }}>
          <div style={{ fontFamily: "monospace", fontSize: 8, color: C.creamDim, letterSpacing: "0.18em", marginBottom: 4 }}>CORRECTIONS — ORIGINAL → REVISED</div>
          {corrections.map((c, i) => (
            <div key={i} style={{ background: C.charcoal, border: `1px solid ${c.col}25`, borderLeft: `3px solid ${c.col}`, borderRadius: 3, padding: "9px 12px", display: "flex", gap: 10, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5, flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "monospace", fontSize: 7.5, color: C.creamDim, letterSpacing: "0.1em" }}>{c.metric}</span>
                  <span style={{ fontFamily: "monospace", fontSize: 6.5, color: c.col, background: `${c.col}15`, border: `1px solid ${c.col}30`, padding: "1px 6px", borderRadius: 2 }}>{c.severity}</span>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5 }}>
                  <span style={{ fontFamily: "monospace", fontSize: 10, color: C.creamDim, textDecoration: "line-through", opacity: 0.55 }}>{c.old}</span>
                  <span style={{ color: C.creamDim, fontSize: 11 }}>→</span>
                  <span style={{ fontFamily: "monospace", fontSize: 11, color: c.col, fontWeight: 600 }}>{c.current}</span>
                </div>
                <p style={{ margin: 0, fontSize: isMobile ? 9.5 : 10, color: C.creamDim, lineHeight: 1.6 }}>{c.reason}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: unit economics + key finding */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: C.charcoal, border: `1px solid ${C.ash}`, borderRadius: 4, padding: "12px 16px" }}>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: C.creamDim, letterSpacing: "0.15em", marginBottom: 10 }}>UNIT ECONOMICS — $4.50 RRP</div>
            {waterfall.map((w, i) => {
              const isTotal = w.label.startsWith("=");
              return (
                <div key={i} style={{ marginBottom: isTotal ? 10 : 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: isMobile ? 9.5 : 10, color: isTotal ? C.cream : C.creamDim, fontWeight: isTotal ? 600 : 400 }}>{w.label}</span>
                    <span style={{ fontFamily: "monospace", fontSize: isTotal ? 12 : 10, color: w.col, fontWeight: isTotal ? 700 : 400 }}>{w.value}</span>
                  </div>
                  <div style={{ height: isTotal ? 4 : 3, background: C.ash, borderRadius: 2 }}>
                    <div style={{ width: barReady ? `${w.pct}%` : "0%", height: "100%", background: `linear-gradient(to right,${w.col}60,${w.col})`, borderRadius: 2, transition: `width 0.8s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.12}s` }} />
                  </div>
                </div>
              );
            })}
            <div style={{ marginTop: 8, padding: "7px 10px", background: `${C.greenBright}0A`, border: `1px solid ${C.greenBright}20`, borderRadius: 2 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "monospace", fontSize: 8, color: C.creamDim }}>GROSS MARGIN %</span>
                <span style={{ fontFamily: "monospace", fontSize: 13, color: C.greenBright, fontWeight: 700 }}>61.9%</span>
              </div>
            </div>
          </div>

          <div style={{ background: `${C.gold}08`, border: `1px solid ${C.gold}22`, borderRadius: 4, padding: "12px 16px" }}>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: C.gold, letterSpacing: "0.12em", marginBottom: 7 }}>PRESENTER NOTE</div>
            <p style={{ margin: 0, fontSize: isMobile ? 10 : 11, color: C.creamDim, lineHeight: 1.75, fontStyle: "italic" }}>
              "These corrections strengthen the investment case. A higher price floor means better margins and a more defensible shelf position versus Jack Link's. The revenue revision is conservative — not pessimistic. The upside scenario remains intact."
            </p>
          </div>

          <div style={{ background: C.charcoal, border: `1px solid ${C.ash}`, borderRadius: 4, padding: "12px 16px", flex: 1 }}>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: C.creamDim, letterSpacing: "0.15em", marginBottom: 8 }}>CORRECTED TIER 2 HEADLINE NUMBERS</div>
            {[
              { label: "Investment", value: "$42,000", col: C.gold },
              { label: "Breakeven", value: "Month 8–11", col: C.amber },
              { label: "Gross Margin", value: "55–62%", col: C.greenBright },
              { label: "M6 Revenue (base)", value: "$9K–$14K/mo", col: C.gold },
              { label: "M12 Revenue", value: "$40K–$65K/mo", col: C.greenBright },
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: i < 4 ? `1px solid ${C.ash}` : "none" }}>
                <span style={{ fontSize: 10, color: C.creamDim }}>{m.label}</span>
                <span style={{ fontFamily: "monospace", fontSize: 10, color: m.col }}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FINANCIALS ───────────────────────────────────────────────────────────────
function FinancialsSlide({ slide }) {
  const C = useContext(ThemeCtx);
  const { isMobile } = useResponsive();
  const initialAt = Math.max(0, Math.min(1, (slide.tiers || []).length - 1));
  const [at, setAt] = useState(initialAt);
  const [barReady, setBarReady] = useState(false);

  const handleSetAt = (i) => {
    setBarReady(false);
    setAt(i);
    setTimeout(() => setBarReady(true), 80);
  };

  useEffect(() => {
    const timer = setTimeout(() => setBarReady(true), 380);
    return () => clearTimeout(timer);
  }, []);

  const t = slide.tiers?.[at] || {};

  // Breakeven dot position on M1–M12 track (midpoint of range)
  const bePos = [86, 77, 46][at] ?? 77;

  // ROI ratio bar: investment share vs profit share of total
  const roiNum = parseInt((t.roi ?? "0").replace(/\D/g, ""), 10);
  const investPct = Math.round(10000 / (100 + roiNum));

  const TICK_MONTHS = [1, 3, 6, 9, 12];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "16px 14px" : "22px 48px" }}>

      {/* Header row with v2.0 badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <SH slide={slide} />
        <div style={{ display: "flex", gap: 4, flexShrink: 0, marginTop: 3, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
          <span style={{ fontFamily: "monospace", fontSize: 9, color: C.greenBright, background: `${C.greenBright}10`, border: `1px solid ${C.greenBright}28`, padding: "3px 8px", borderRadius: 2, letterSpacing: "0.08em" }}>v2.0 CORRECTED</span>
          <span style={{ fontFamily: "monospace", fontSize: 9, color: C.gold, background: `${C.gold}0D`, border: `1px solid ${C.gold}22`, padding: "3px 8px", borderRadius: 2, letterSpacing: "0.06em" }}>RRP $4.50 · 61.9% GM</span>
        </div>
      </div>

      {/* Tier selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexDirection: isMobile ? "column" : "row" }}>
        {slide.tiers.map((tier, i) => (
          <button key={i} onClick={() => handleSetAt(i)} style={{
            flex: 1, background: at === i ? `${tier.color}15` : C.charcoal,
            border: `1px solid ${at === i ? tier.color : C.ash}`,
            borderTop: `3px solid ${at === i ? tier.color : C.ash}`,
            borderRadius: 3, padding: isMobile ? "10px 12px" : "10px 14px",
            cursor: "pointer", textAlign: "left", transition: "all 0.2s",
            position: "relative", WebkitTapHighlightColor: "transparent"
          }}>
            {tier.rec && <div style={{
              position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
              background: C.gold, color: C.obsidian, fontFamily: "monospace",
              fontSize: 9, padding: "2px 10px", borderRadius: 2, whiteSpace: "nowrap", zIndex: 1
            }}>Ru'ya 360° RECOMMENDS</div>}
            <div style={{ fontFamily: "monospace", fontSize: 10, color: tier.color, letterSpacing: "0.15em", marginBottom: 2 }}>{tier.tier}</div>
            <div style={{ fontSize: 15, color: C.cream, marginBottom: 3 }}>{tier.name}</div>
            <div style={{ fontFamily: "monospace", fontSize: 24, color: tier.color, marginBottom: 4 }}>{tier.total}</div>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "monospace", fontSize: 10, color: at === i ? tier.color : C.creamDim }}>BEP {tier.breakeven}</span>
              <span style={{ color: C.ash, fontSize: 10 }}>·</span>
              <span style={{ fontFamily: "monospace", fontSize: 10, color: at === i ? tier.color : C.creamDim }}>{tier.margin} GM</span>
            </div>
          </button>
        ))}
      </div>

      {/* Content grid */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10, minHeight: 0, overflow: "hidden" }}>

        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: 0, overflow: "hidden" }}>

          {/* KPI cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7 }}>
            {[
              { label: "Breakeven", val: t.breakeven, v2: true },
              { label: "Gross Margin", val: t.margin, v2: true },
              { label: "Year 1 ROI", val: t.roi, v2: false }
            ].map((m, i) => (
              <div key={i} style={{ background: C.charcoal, border: `1px solid ${t.color}20`, borderRadius: 3, padding: "10px 12px", position: "relative" }}>
                {m.v2 && (
                  <div style={{ position: "absolute", top: -8, right: 5, fontFamily: "monospace", fontSize: 8, color: C.greenBright, background: `${C.greenBright}12`, border: `1px solid ${C.greenBright}28`, padding: "1px 5px", borderRadius: 1 }}>v2.0</div>
                )}
                <div style={{ fontFamily: "monospace", fontSize: 10, color: C.creamDim, marginBottom: 5 }}>{m.label}</div>
                <div style={{ fontFamily: "monospace", fontSize: isMobile ? 14 : 17, color: t.color, lineHeight: 1.2 }}>{m.val}</div>
              </div>
            ))}
          </div>

          {/* Breakeven timeline */}
          <div style={{ background: C.charcoal, border: `1px solid ${C.ash}`, borderRadius: 4, padding: "11px 14px" }}>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: C.creamDim, letterSpacing: "0.12em", marginBottom: 14 }}>PROFITABILITY TIMELINE — 12 MONTHS</div>
            <div style={{ position: "relative", height: 30, marginBottom: 4 }}>
              {/* Base track */}
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 3, background: C.ash, transform: "translateY(-50%)", borderRadius: 2 }} />
              {/* Filled progress */}
              <div style={{
                position: "absolute", top: "50%", left: 0, height: 3,
                width: barReady ? `${bePos}%` : "0%",
                background: `linear-gradient(to right,${t.color}40,${t.color}90)`,
                transform: "translateY(-50%)", borderRadius: 2,
                transition: "width 1.1s cubic-bezier(0.25,0.46,0.45,0.94) 0.1s"
              }} />
              {/* Tick marks */}
              {TICK_MONTHS.map(mo => {
                const pos = ((mo - 1) / 11) * 100;
                return (
                  <div key={mo} style={{ position: "absolute", top: "50%", left: `${pos}%`, transform: "translate(-50%,-50%)" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.ash, border: `1px solid ${C.ember}` }} />
                    <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", fontFamily: "monospace", fontSize: 10, color: C.creamDim, whiteSpace: "nowrap" }}>M{mo}</div>
                  </div>
                );
              })}
              {/* Breakeven glowing dot — slides when tier changes */}
              <div style={{
                position: "absolute", top: "50%", left: `${bePos}%`,
                transform: "translate(-50%,-50%)",
                width: 16, height: 16, borderRadius: "50%",
                background: t.color, border: `2px solid ${C.obsidian}`,
                boxShadow: `0 0 12px ${t.color}70`,
                transition: "left 0.7s cubic-bezier(0.25,0.46,0.45,0.94), background 0.3s",
                zIndex: 2
              }} />
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: t.color, marginTop: 10 }}>◎ Breakeven: {t.breakeven}</div>
          </div>

          {/* Revenue trajectory */}
          <div style={{ background: C.charcoal, border: `1px solid ${C.ash}`, borderRadius: 4, padding: "12px 15px", flex: 1 }}>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: C.creamDim, letterSpacing: "0.15em", marginBottom: 10 }}>REVENUE TRAJECTORY</div>
            {[
              { label: "Month 3", pct: t.m3p, text: t.m3, delay: 0, corrected: false },
              { label: "Month 6", pct: t.m6p, text: t.m6, delay: 0.15, corrected: true },
              { label: "Month 12", pct: t.m12p, text: t.m12, delay: 0.3, corrected: false }
            ].map((r, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, alignItems: "center" }}>
                  <span style={{ fontFamily: "monospace", fontSize: 11, color: C.creamDim }}>{r.label}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    {r.corrected && <span style={{ fontFamily: "monospace", fontSize: 8, color: C.greenBright, background: `${C.greenBright}12`, border: `1px solid ${C.greenBright}25`, padding: "1px 4px", borderRadius: 1 }}>v2.0</span>}
                    <span style={{ fontFamily: "monospace", fontSize: 13, color: t.color }}>{r.text}</span>
                  </div>
                </div>
                <div style={{ height: 7, background: C.ash, borderRadius: 3 }}>
                  <div style={{
                    width: barReady ? `${r.pct}%` : "0%",
                    height: "100%",
                    background: `linear-gradient(to right,${t.color}70,${t.color})`,
                    borderRadius: 3,
                    transition: `width 0.85s cubic-bezier(0.25,0.46,0.45,0.94) ${r.delay}s`
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, minHeight: 0, overflow: "hidden" }}>

          {/* What this funds */}
          <div style={{ background: `${t.color}08`, border: `1px solid ${t.color}22`, borderRadius: 4, padding: "12px 15px", flex: 1, minHeight: 0, overflow: "hidden" }}>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: t.color, letterSpacing: "0.12em", marginBottom: 8 }}>WHAT THIS FUNDS</div>
            {(t.includes || []).map((inc, i) => (
              <div key={i} style={{ display: "flex", gap: 7, marginBottom: 5 }}>
                <span style={{ color: t.color, fontSize: 12, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 13, color: C.cream, lineHeight: 1.4 }}>{inc}</span>
              </div>
            ))}
          </div>

          {/* ROI + cumulative profit */}
          <div style={{ background: `${C.greenBright}08`, border: `1px solid ${C.greenBright}22`, borderRadius: 4, padding: "12px 15px", flex: 1, minHeight: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "monospace", fontSize: 12, color: C.greenBright, letterSpacing: "0.12em", marginBottom: 8 }}>CUMULATIVE YEAR 1 GROSS PROFIT</div>

            {/* Investment vs return ratio bar */}
            <div style={{ display: "flex", height: 18, borderRadius: 2, overflow: "hidden", gap: 1, marginBottom: 8 }}>
              <div style={{
                width: `${investPct}%`,
                background: `${t.color}45`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "width 0.5s ease"
              }}>
                <span style={{ fontFamily: "monospace", fontSize: 9, color: C.cream, whiteSpace: "nowrap" }}>CAPITAL IN</span>
              </div>
              <div style={{
                flex: 1,
                background: `linear-gradient(to right,${C.greenBright}30,${C.greenBright}50)`,
                display: "flex", alignItems: "center", paddingLeft: 8
              }}>
                <span style={{ fontFamily: "monospace", fontSize: 9, color: C.greenBright, whiteSpace: "nowrap" }}>GROSS RETURN · {t.roi}</span>
              </div>
            </div>

            <div style={{ fontFamily: "monospace", fontSize: 38, color: C.goldBright, marginBottom: 2, letterSpacing: "-0.02em" }}>{t.cumProfit}</div>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: C.greenBright, marginBottom: 6 }}>Year 1 · {t.roi} ROI · {t.margin} avg GM</div>
            <p style={{ margin: "0 0 8px", fontSize: 11, color: C.creamDim, lineHeight: 1.55, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>{t.profitNote}</p>

            <div style={{ marginTop: "auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 5, paddingTop: 8, borderTop: `1px solid ${C.ash}` }}>
              {[
                { label: "RRP", val: "$4.50", col: C.gold },
                { label: "COGS", val: "$1.20", col: C.amber },
                { label: "GP/UNIT", val: "$1.95", col: C.greenBright },
                { label: "GM", val: "61.9%", col: C.greenBright },
              ].map((m, i) => (
                <div key={i} style={{ textAlign: "center", padding: "6px 4px", background: `${m.col}08`, border: `1px solid ${m.col}15`, borderRadius: 2 }}>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: C.creamDim, marginBottom: 2 }}>{m.label}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 14, color: m.col }}>{m.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── WHY Ru'ya 360° ──────────────────────────────────────────────────────────
function WhyKITSSlide({ slide }) {
  const C = useContext(ThemeCtx);
  const { isMobile } = useResponsive();
  const [active, setActive] = useState(0);
  const r = slide.reasons[active];
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 20px" : "36px 72px" }}>
      <SH slide={slide} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "210px 1fr", gap: 16, marginTop: 14 }}>
        <div style={{ display: "flex", flexDirection: isMobile ? "row" : "column", gap: 4, overflowX: isMobile ? "auto" : "hidden", WebkitOverflowScrolling: "touch" }}>
          {slide.reasons.map((reason, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ background: active === i ? `${reason.color}12` : "transparent", border: `1px solid ${active === i ? reason.color : C.ash}`, borderLeft: `3px solid ${reason.color}`, borderRadius: 3, padding: "9px 12px", cursor: "pointer", textAlign: "left", transition: "all 0.15s", flexShrink: 0, WebkitTapHighlightColor: "transparent" }}>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: reason.color, marginBottom: 2 }}>REASON {String(i + 1).padStart(2, "0")}</div>
              <div style={{ fontSize: 12.5, color: active === i ? C.cream : C.creamDim, lineHeight: 1.35, whiteSpace: isMobile ? "nowrap" : "normal" }}>{reason.title}</div>
            </button>
          ))}
        </div>
        <div style={{ background: `${r.color}07`, border: `1px solid ${r.color}22`, borderRadius: 4, padding: "22px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: r.color, letterSpacing: "0.2em", marginBottom: 8 }}>WHY THIS MATTERS TO YOU</div>
            <h3 style={{ margin: "0 0 10px", fontSize: isMobile ? 19 : 22, fontWeight: 400, color: C.cream, fontFamily: "Georgia,serif" }}>{r.title}</h3>
            <p style={{ margin: 0, fontSize: 15, color: C.creamDim, lineHeight: 1.8 }}>{r.body}</p>
          </div>
          <div style={{ height: 1, background: C.ash }} />
          <div style={{ background: `${C.red}09`, border: `1px solid ${C.red}22`, borderRadius: 3, padding: "11px 15px" }}>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: C.red, marginBottom: 5 }}>WITHOUT Ru'ya 360°</div>
            <p style={{ margin: 0, fontSize: 14, color: C.creamDim, lineHeight: 1.65, fontStyle: "italic" }}>{r.without}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MANDATE ──────────────────────────────────────────────────────────────────
function MandateSlide({ slide }) {
  const C = useContext(ThemeCtx);
  const { isMobile } = useResponsive();
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 20px" : "36px 72px" }}>
      <SH slide={slide} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginTop: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: `${C.gold}07`, border: `1px solid ${C.gold}1E`, borderRadius: 4, padding: "14px 18px", flex: 1 }}>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: C.gold, letterSpacing: "0.18em", marginBottom: 10 }}>Ru'ya 360° TAKES FULL RESPONSIBILITY FOR</div>
            {slide.kitsScope.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
                <span style={{ color: C.gold, fontSize: 11, flexShrink: 0, marginTop: 1 }}>◈</span>
                <span style={{ fontSize: 14, color: C.cream, lineHeight: 1.45 }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ background: `${C.greenBright}07`, border: `1px solid ${C.greenBright}1E`, borderRadius: 4, padding: "14px 18px" }}>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: C.greenBright, letterSpacing: "0.18em", marginBottom: 10 }}>YOU RETAIN FULL CONTROL OVER</div>
            {slide.clientScope.map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                <span style={{ color: C.greenBright, fontSize: 11, flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 14, color: C.cream, lineHeight: 1.45 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ background: C.charcoal, border: `1px solid ${C.ash}`, borderRadius: 4, padding: "14px 18px" }}>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: C.creamDim, letterSpacing: "0.18em", marginBottom: 10 }}>ADVISORY FEE STRUCTURE</div>
            {slide.fees.map((f, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < slide.fees.length - 1 ? `1px solid ${C.ash}` : "none" }}>
                <span style={{ fontSize: 14, color: C.creamDim }}>{f.tier}</span>
                <span style={{ fontFamily: "monospace", fontSize: 13, color: C.gold }}>{f.range}</span>
              </div>
            ))}
          </div>
          <div style={{ background: `${C.greenBright}07`, border: `1px solid ${C.greenBright}1E`, borderRadius: 4, padding: "14px 18px" }}>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: C.greenBright, letterSpacing: "0.18em", marginBottom: 8 }}>IP OWNERSHIP — FULL TRANSFER ON FINAL PAYMENT</div>
            <p style={{ margin: 0, fontSize: 14, color: C.creamDim, lineHeight: 1.75 }}>Every deliverable — brand identity, flavor specs, outreach scripts, regulatory submissions, competitive intelligence — transfers fully to you. You own everything. Zero conditions.</p>
          </div>
          <div style={{ background: `${C.gold}0D`, border: `1px solid ${C.gold}28`, borderRadius: 4, padding: "16px 18px", flex: 1, display: "flex", alignItems: "center" }}>
            <p style={{ margin: 0, fontSize: 18, color: C.gold, fontFamily: "Georgia,serif", fontStyle: "italic", textAlign: "center", lineHeight: 1.8, width: "100%" }}>
              <>"We don't advise from the side."<br />"We execute from the front."</>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Q & A ────────────────────────────────────────────────────────────────────
function QASlide({ slide }) {
  const C = useContext(ThemeCtx);
  const { isMobile } = useResponsive();
  const [aq, setAq] = useState(null);
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "24px 20px" : "36px 72px" }}>
      <SH slide={slide} />
      <p style={{ fontSize: 14, color: C.creamDim, fontFamily: "Georgia,serif", margin: "4px 0 12px", lineHeight: 1.6 }}>{slide.subtitle}</p>
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 5, WebkitOverflowScrolling: "touch" }}>
        {slide.qas.map((qa, i) => (
          <div key={i} style={{ background: C.charcoal, border: `1px solid ${aq === i ? qa.color : C.ash}`, borderLeft: `3px solid ${qa.color}`, borderRadius: 3, overflow: "hidden", transition: "border-color 0.15s" }}>
            <button onClick={() => setAq(aq === i ? null : i)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", background: "transparent", border: "none", padding: "12px 16px", cursor: "pointer", textAlign: "left", gap: 14, WebkitTapHighlightColor: "transparent" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start", flex: 1 }}>
                <span style={{ fontFamily: "monospace", fontSize: 10, color: qa.color, flexShrink: 0, marginTop: 2 }}>Q</span>
                <span style={{ fontSize: isMobile ? 14 : 15, color: C.cream, lineHeight: 1.5, fontFamily: "Georgia,serif" }}>{qa.q}</span>
              </div>
              <span style={{ color: C.creamDim, fontSize: 17, flexShrink: 0 }}>{aq === i ? "−" : "+"}</span>
            </button>
            {aq === i && (
              <div style={{ padding: "0 16px 14px 38px" }}>
                <div style={{ height: 1, background: C.ash, marginBottom: 10 }} />
                <p style={{ margin: 0, fontSize: 14, color: C.creamDim, lineHeight: 1.85, fontFamily: "Georgia,serif" }}>{qa.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CLOSING ──────────────────────────────────────────────────────────────────
function ClosingSlide({ slide }) {
  const C = useContext(ThemeCtx);
  const { isMobile } = useResponsive();
  return (
    <div style={{ height: "100%", display: "flex", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.025, backgroundImage: `linear-gradient(${C.gold} 1px,transparent 1px),linear-gradient(90deg,${C.gold} 1px,transparent 1px)`, backgroundSize: "36px 36px" }} />
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(to bottom,transparent,${C.gold},transparent)` }} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "0 24px" : "0 72px", position: "relative", zIndex: 1 }}>
        <div style={{ fontFamily: "monospace", fontSize: isMobile ? 8 : 10, color: C.gold, opacity: 0.55, letterSpacing: "0.3em", marginBottom: 22 }}>Ru'ya 360° ADVISORY GROUP · THE MANDATE</div>
        <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: isMobile ? "clamp(22px,3.2vw,34px)" : "clamp(26px,2.8vw,38px)", fontWeight: 400, color: C.cream, margin: "0 0 22px", lineHeight: 1.45 }}>{slide.title}</h2>
        <div style={{ width: 60, height: 2, background: C.gold, marginBottom: 26 }} />
        <div style={{ marginBottom: 26 }}>
          <div style={{ fontFamily: "monospace", fontSize: 8, color: C.red, letterSpacing: "0.2em", marginBottom: 10 }}>FOUR DECISIONS NEEDED TODAY</div>
          {slide.decisions.map((d, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 6, padding: "10px 14px", background: `${C.gold}07`, border: `1px solid ${C.gold}18`, borderRadius: 3 }}>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: C.gold, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
              <p style={{ margin: 0, fontSize: isMobile ? 14 : 15.5, color: C.cream, lineHeight: 1.55 }}>{d}</p>
            </div>
          ))}
        </div>
        <div style={{ background: `${C.gold}09`, border: `1px solid ${C.gold}25`, borderRadius: 4, padding: "20px 24px" }}>
          <p style={{ margin: 0, fontSize: isMobile ? 16 : 19, color: C.gold, fontFamily: "Georgia,serif", fontStyle: "italic", lineHeight: 1.75 }}>"{slide.closingLine}"</p>
        </div>
      </div>
    </div>
  );
}

// ─── COMPETITION LANDSCAPE ────────────────────────────────────────────────────
function CompLandscapeSlide({ slide }) {
  const C = useContext(ThemeCtx);
  const { isMobile } = useResponsive();
  const [ag, setAg] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const group = slide.groups[ag];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "20px 16px" : "36px 72px" }}>
      <SH slide={slide} />
      <p style={{ fontSize: isMobile ? 10 : 11, color: C.creamDim, fontFamily: "monospace", margin: "4px 0 12px", letterSpacing: "0.04em" }}>{slide.subtitle}</p>

      {/* Group tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 12, flexWrap: "wrap" }}>
        {slide.groups.map((g, i) => (
          <button key={i} onClick={() => setAg(i)} style={{
            flex: "1 1 auto",
            background: ag === i ? `${g.color}15` : C.charcoal,
            border: `1px solid ${ag === i ? g.color : C.ash}`,
            borderTop: `3px solid ${ag === i ? g.color : C.ash}`,
            borderRadius: 3, padding: isMobile ? "8px 8px" : "8px 12px",
            cursor: "pointer", textAlign: "left", transition: "all 0.2s",
            WebkitTapHighlightColor: "transparent", touchAction: "manipulation"
          }}>
            <div style={{ fontFamily: "monospace", fontSize: 8.5, color: g.color, letterSpacing: "0.12em", marginBottom: 2, whiteSpace: "nowrap" }}>{g.type}</div>
            <div style={{ fontSize: isMobile ? 11.5 : 12.5, color: ag === i ? C.cream : C.creamDim, lineHeight: 1.2 }}>{g.label}</div>
          </button>
        ))}
      </div>

      {/* Competitor cards */}
      <div style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : `repeat(${Math.min(group.competitors.length, 3)}, 1fr)`,
        gap: 10, alignContent: "start", overflowY: "auto", WebkitOverflowScrolling: "touch"
      }}>
        {group.competitors.map((comp, ci) => (
          <div key={ci} style={{
            background: C.charcoal, border: `1px solid ${C.ash}`,
            borderTop: `3px solid ${group.color}`, borderRadius: 4,
            overflow: "hidden", display: "flex", flexDirection: "column"
          }}>
            {comp.img ? (
              <div
                onClick={() => setLightbox({ src: comp.img, alt: comp.name })}
                title="Click to view full size"
                style={{
                  background: "#F5F3EF", display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "8px 10px", height: isMobile ? 78 : 100, flexShrink: 0,
                  cursor: "zoom-in", position: "relative",
                }}
              >
                <img src={comp.img} alt={comp.name} style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain", pointerEvents: "none" }} />
                {/* Expand hint */}
                <div style={{
                  position: "absolute", bottom: 4, right: 5,
                  fontFamily: "monospace", fontSize: 7, color: "rgba(60,50,40,0.55)",
                  letterSpacing: "0.05em", pointerEvents: "none", userSelect: "none",
                }}>
                  ⤢ tap to expand
                </div>
              </div>
            ) : (
              <div style={{ background: `${group.color}10`, borderBottom: `1px solid ${group.color}20`, padding: "10px 14px", flexShrink: 0, minHeight: 44, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ fontFamily: "monospace", fontSize: 7, color: group.color, letterSpacing: "0.1em", marginBottom: 3 }}>{comp.category}</div>
                <div style={{ fontSize: 10, color: C.creamDim, fontStyle: "italic" }}>Screenshot not captured — field confirmed present</div>
              </div>
            )}
            <div style={{ padding: "10px 12px", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 3, gap: 6 }}>
                <div style={{ fontSize: isMobile ? 13.5 : 15, color: C.cream, fontFamily: "Georgia,serif" }}>{comp.name}</div>
                <span style={{ fontFamily: "monospace", fontSize: 8, color: group.color, background: `${group.color}15`, border: `1px solid ${group.color}25`, padding: "2px 6px", borderRadius: 2, flexShrink: 0 }}>{comp.origin}</span>
              </div>
              {comp.price && <div style={{ fontFamily: "monospace", fontSize: 8, color: C.amber, marginBottom: 6, lineHeight: 1.3 }}>{comp.price}</div>}
              <div style={{ height: 1, background: C.ash, marginBottom: 7 }} />
              <div style={{ flex: 1 }}>
                {comp.gaps.map((gap, gi) => (
                  <div key={gi} style={{ display: "flex", gap: 6, marginBottom: 5, alignItems: "flex-start" }}>
                    <span style={{ color: C.red, fontSize: 11, flexShrink: 0, marginTop: 1.5, lineHeight: 1 }}>✗</span>
                    <span style={{ fontSize: isMobile ? 11 : 12, color: C.creamDim, lineHeight: 1.4 }}>{gap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 8, padding: "9px 14px", background: `${C.greenBright}0D`, border: `1px solid ${C.greenBright}22`, borderRadius: 3 }}>
        <p style={{ margin: 0, fontSize: isMobile ? 10.5 : 11.5, color: C.greenBright, fontFamily: "Georgia,serif", lineHeight: 1.4 }}>{slide.verdict}</p>
      </div>

      {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
    </div>
  );
}

// ─── COMPETITION MATRIX ───────────────────────────────────────────────────────
function CompMatrixSlide({ slide }) {
  const C = useContext(ThemeCtx);
  const { isMobile } = useResponsive();

  const badge = (v) => {
    if (v === "WIN")  return { char: "✓", color: C.greenBright, bg: `${C.greenBright}18` };
    if (v === "FAIL") return { char: "✗", color: C.red,         bg: `${C.red}14`         };
    if (v === "PART") return { char: "~", color: C.amber,       bg: `${C.amber}14`        };
    return { char: "—", color: C.creamDim, bg: "transparent" };
  };

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", padding: isMobile ? "20px 14px" : "36px 72px" }}>
      <SH slide={slide} />
      <p style={{ fontSize: isMobile ? 9 : 10, color: C.creamDim, fontFamily: "monospace", margin: "4px 0 12px", letterSpacing: "0.04em" }}>{slide.subtitle}</p>

      <div style={{ flex: 1, overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: isMobile ? "520px" : "auto" }}>
          <thead>
            <tr>
              <th style={{ padding: "8px 10px", fontFamily: "monospace", fontSize: 9.5, color: C.creamDim, textAlign: "left", borderBottom: `2px solid ${C.ash}`, width: 155, position: "sticky", top: 0, zIndex: 10, background: C.charcoal }}>CRITERION</th>
              {slide.competitors.map((comp, i) => {
                const isUs = i === slide.competitors.length - 1;
                return (
                  <th key={i} style={{
                    padding: "7px 8px", fontFamily: "monospace",
                    fontSize: isUs ? 10.5 : 9.5, color: isUs ? C.greenBright : C.creamDim,
                    textAlign: "center", borderBottom: `2px solid ${isUs ? C.greenBright : C.ash}`,
                    background: isUs ? `${C.greenBright}09` : C.charcoal,
                    whiteSpace: "nowrap", lineHeight: 1.4,
                    position: "sticky", top: 0, zIndex: 10
                  }}>
                    {comp.short}
                    {isUs && <div style={{ fontSize: 6.5, marginTop: 3, letterSpacing: "0.05em" }}>★ OUR BRAND</div>}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {slide.criteria.map((row, ri) => (
              <tr key={ri} style={{ background: ri % 2 === 0 ? C.charcoal : C.obsidian }}>
                <td style={{ padding: "9px 10px", borderBottom: `1px solid ${C.ash}` }}>
                  <div style={{ fontSize: isMobile ? 12.5 : 14, color: C.cream, fontFamily: "Georgia,serif", marginBottom: 2 }}>{row.label}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 9.5, color: C.creamDim }}>{row.note}</div>
                </td>
                {slide.competitors.map((comp, ci) => {
                  const v = row.vals[comp.id];
                  const b = badge(v);
                  const isUs = ci === slide.competitors.length - 1;
                  return (
                    <td key={ci} style={{ padding: "8px", textAlign: "center", borderBottom: `1px solid ${C.ash}`, background: isUs ? `${C.greenBright}07` : "transparent" }}>
                      <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 3, background: b.bg, borderRadius: 3, padding: "4px 8px", minWidth: 40 }}>
                        <span style={{ fontFamily: "monospace", fontSize: isUs ? 18 : 16, color: b.color, lineHeight: 1 }}>{b.char}</span>
                        {row.text?.[comp.id] && (
                          <span style={{ fontFamily: "monospace", fontSize: 8.5, color: isUs ? C.greenBright : C.creamDim, lineHeight: 1.25, whiteSpace: "nowrap" }}>{row.text[comp.id]}</span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 10, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <div style={{ flex: 1, padding: "9px 14px", background: `${C.greenBright}0D`, border: `1px solid ${C.greenBright}22`, borderRadius: 3 }}>
          <p style={{ margin: 0, fontSize: isMobile ? 10.5 : 11.5, color: C.greenBright, fontFamily: "Georgia,serif", lineHeight: 1.5 }}>{slide.verdict}</p>
        </div>
        <div style={{ display: "flex", gap: 12, flexShrink: 0 }}>
          {[{ char: "✓", color: C.greenBright, label: "WIN" }, { char: "~", color: C.amber, label: "PARTIAL" }, { char: "✗", color: C.red, label: "FAIL" }].map((l, i) => (
            <div key={i} style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <span style={{ color: l.color, fontFamily: "monospace", fontSize: 10 }}>{l.char}</span>
              <span style={{ fontFamily: "monospace", fontSize: 7, color: C.creamDim }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SLIDE DISPATCH ───────────────────────────────────────────────────────────
function RenderSlide({ slide }) {
  switch (slide.type) {
    case "cover":        return <CoverSlide />;
    case "section":      return <SectionDivider slide={slide} />;
    case "listen":       return <ListenSlide slide={slide} />;
    case "stats":        return <StatsSlide slide={slide} />;
    case "two-col":      return <TwoColSlide slide={slide} />;
    case "deliverables": return <DeliverablesSlide slide={slide} />;
    case "brandscore":   return <BrandScoreSlide slide={slide} />;
    case "roadmap":      return <RoadmapSlide slide={slide} />;
    case "financials":          return <FinancialsSlide slide={slide} />;
    case "financialcorrection": return <FinancialCorrectionSlide slide={slide} />;
    case "financialstudy":      return <FinancialStudy />;
    case "whykits":      return <WhyKITSSlide slide={slide} />;
    case "mandate":      return <MandateSlide slide={slide} />;
    case "qa":           return <QASlide slide={slide} />;
    case "closing":        return <ClosingSlide slide={slide} />;
    case "comp_landscape": return <CompLandscapeSlide slide={slide} />;
    case "comp_matrix":    return <CompMatrixSlide slide={slide} />;
    default:               return null;
  }
}

// ─── SLIDE DATA ───────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: "cover", type: "cover", label: "COVER",
    notes: { open: "Laptop open on this slide before the client walks in. Let them see it. Say nothing about it. Once they are seated: 'Before we show you anything — we want to hear your story.'", emphasis: ["Do not start the presentation. Start the listening."], timing: "0 min — ambient" }
  },
  {
    id: "listen", type: "listen", label: "LISTEN",
    section: "STEP 01 · DISCOVERY",
    title: "Before We Show You Anything — Tell Us Your Story",
    intro: "Every founder comes to this table with a story that matters. We built all of this after seeing the market gap — but you had the vision first. Before we open a single slide, we want to understand your story, your intentions, and what success looks like to you.",
    questions: [
      { color: C.gold, text: "How did the idea of beef jerky first come to you? What was the moment you decided this was worth pursuing?" },
      { color: C.amber, text: "What do you already have in place? Manufacturer contacts, brand ideas, capital, distribution relationships — what exists today?" },
      { color: C.greenBright, text: "What does success look like in 12 months? In three years? Is this a lifestyle business or a brand you want to scale regionally?" },
      { color: C.purple, text: "What worries you most about this venture? What has stopped you from moving forward faster up to now?" },
      // { color: C.gold, text: "What kind of partner are you looking for? Someone to execute fully on your behalf, or someone to advise while you drive operations yourself?" },
      // { color: C.steel, text: "Do you have a budget range in mind for the launch phase? No wrong answer — it shapes which plan we present to you." },
    ],
    note: "We listen completely before we present anything. Your answers reshape which parts of the presentation we emphasize.",
    notes: { open: "Do not advance past this slide until you have genuinely listened. Take physical notes. Ask follow-ups. The quality of your questions here determines how credible your entire presentation appears in the next 60 minutes.", emphasis: ["The client reveals their fears, ambitions, and constraints here. Every sentence is intel for the close.", "If they mention a manufacturer — ask the name. If they mention a budget number — write it down and reference it later."], timing: "20–30 minutes — do not rush this" }
  },
  {
    id: "sec01", type: "section", label: "§01",
    badge: "SECTION ONE", color: C.gold,
    title: "The Opportunity",
    sub: "Why Lebanon. Why this product. Why the window is open right now — and why it will not stay open.",
    notes: { open: "Transition: 'Let us now show you what we found when we researched your market. Some of it will surprise you.'", emphasis: [], timing: "15 seconds" }
  },
  {
    id: "market", type: "stats", label: "MARKET",
    section: "01 · THE OPPORTUNITY",
    title: "An Empty Category in a Growing Market",
    headline: "There is no established local beef jerky brand in Lebanon. That is not a gap in the market — that is an open category waiting for its owner.",
    stats: [
      { value: "ZERO", label: "Local beef jerky brands in Lebanon", sub: "Confirmed by Ru'ya 360° field research · Category is fully available today", color: C.greenBright },
      { value: "$1.04B", label: "Middle East sports nutrition market", sub: "+7.3% CAGR through 2033 · Grand View Research 2024", color: C.gold },
      { value: "82.6%", label: "Brick-and-mortar dominance in MENA", sub: "Physical relationships drive sales · Not digital channels", color: C.amber },
      { value: "$8.49B", label: "GCC snacks market 2024", sub: "→ $12.87B by 2030 · Natural export target from Day 1", color: C.purple },
    ],
    footnote: "Sources: Grand View Research 2024 · Precedence Research 2024 · Cognitive Market Research 2025 · Ru'ya 360° field research",
    notes: { open: "Let ZERO sit on screen for five full seconds. Ask: 'When you walk into any gym or nutrition store in Lebanon today, can you buy a locally made beef jerky brand?' The answer is no. That is the business.", emphasis: ["The 82.6% brick-and-mortar statistic validates every strategic choice we made. This is not a conservative approach — it is the statistically correct one.", "Pause on ZERO. Ask the room: 'When did you last see a locally made jerky in a Lebanese gym?' The silence confirms the opportunity."], timing: "4 minutes" }
  },
  {
    id: "whynow", type: "two-col", label: "WHY NOW",
    section: "01 · THE OPPORTUNITY",
    title: "Why Lebanon. Why Now.",
    left: {
      heading: "THE TAILWINDS",
      items: [
        "Lebanese fitness culture expanding — gyms, CrossFit, boutique studios proliferating across Beirut, Metn, Keserwan, Jounieh",
        "Health-conscious youth (18–40) actively tracking macros — protein content is now the primary purchase driver",
        "USD-denominated market post-2019 creates pricing stability for a premium brand in a volatile economy",
        "'Made in Lebanon' carries GCC premium weight — the provenance story travels with the product into UAE and Saudi Arabia",
        "Halal certification unlocks 60%+ of Lebanese consumers plus all GCC export markets simultaneously from day one",
      ]
    },
    right: {
      heading: "THE WINDOW",
      items: [
        "First-mover advantage is available today — but successful categories attract imitators within 12–18 months of launch",
        "Imported competitors (Jack Link's, Wild West) are visible but structurally weak: no Halal, wrong flavor, wrong price, no local presence",
        "No local competitor is building in this space currently — confirmed by Ru'ya 360° field research completed this quarter",
        "MoPH registration timeline: 2–4 months — beginning now means shelf-ready Q4 2026",
        "Existing warm relationships across gyms and nutrition stores compress outreach from 3 months of cold calling to 2–3 weeks",
      ]
    },
    notes: { open: "The window is real and open — but first-mover advantage is not permanent. Speed is the only true moat. Trademark, brand equity, and the trainer relationship network are what protect that advantage once built.", emphasis: ["Say directly: 'Every week of delay on decisions is a week closer to someone else discovering what Ru'ya 360° has confirmed through research.'"], timing: "3 minutes" }
  },
  {
    id: "sec02", type: "section", label: "§02",
    badge: "SECTION TWO", color: C.amber,
    title: "What We Built",
    sub: "Ten institutional-quality deliverables — completed, referenced, production-ready. Before you said yes.",
    notes: { open: "Transition: 'Before we talked about working together, we built the entire business case. We want to show you exactly what exists today and what is ready to use the moment you decide to move forward.'", emphasis: [], timing: "15 seconds" }
  },
  {
    id: "deliverables", type: "deliverables", label: "DELIVERED",
    section: "02 · WHAT WE BUILT",
    title: "Built Before You Said Yes — Ten Deliverables Ready",
    subtitle: "Not slides. Not outlines. Completed, referenced, institutional-quality work. Every one of these can be actioned tomorrow.",
    items: [
      { ref: "KAG-JRK-001", color: C.gold, title: "Full Advisory Framework", status: "COMPLETE — READY TO HAND OVER", desc: "A 10-section A-to-Z market entry guide covering legal structure, regulatory approvals, market research, product development, brand positioning, distribution strategy, pricing architecture, and full commercial operations.", tags: ["10 Sections", "A to Z Guide", "Full Market Map", "Reference Index"] },
      { ref: "KAG-JRK-002", color: C.amber, title: "Master Launch Checklist", status: "COMPLETE — ACTIONABLE FROM DAY ONE", desc: "38 verified action steps across 5 phases from Foundation (Month 1) to Scale (Month 12+). Each step includes detailed implementation guidance, the responsible party, and a milestone gate before the next phase begins.", tags: ["38 Steps", "5 Phases", "Milestone-Gated", "Progress Tracker"] },
      { ref: "KAG-JRK-003", color: C.greenBright, title: "Financial Feasibility Study", status: "COMPLETE — THREE TIERS MODELLED", desc: "Three full budget scenarios (Lean $18.5K / Standard $42K / Full $82K) with itemised investment breakdowns, month-by-month revenue projections, gross margin targets, breakeven timelines, and Year 1 ROI calculations.", tags: ["3 Budget Tiers", "12-Month Model", "ROI Analysis", "Break-Even"] },
      { ref: "KAG-JRK-004", color: C.purple, title: "Trade Outreach System", status: "COMPLETE — READY TO USE NOW", desc: "Word-for-word visit scripts for gym, sports nutrition store, and pharmacy accounts. A 6-step account acquisition sequence, full objection-handling for 6 common retailer objections, commercial proposal templates, and a live account tracker.", tags: ["Full Scripts", "6 Objections Handled", "Account Tracker", "Commercial Proposals"] },
      { ref: "KAG-JRK-005", color: C.red, title: "Competitive Analysis", status: "COMPLETE — MOST RESEARCH-INTENSIVE", desc: "Scored comparison matrix across 5 competitors (Jack Link's, Wild West, Quest Bar, Barebells, STRIKE) evaluated from both the retailer perspective and the consumer perspective across 8 criteria each. STRIKE wins every criterion.", tags: ["5 Competitors", "Dual Perspective", "8 Criteria Each", "Scored Matrix"] },
      { ref: "KAG-JRK-006", color: C.gold, title: "Brand & Packaging Design Brief", status: "COMPLETE — READY FOR DESIGNER", desc: "Complete 8-section brief for the brand designer: color direction, typography system, packaging specifications for both SKUs, all mandatory regulatory elements, trilingual copy in Arabic, English, and French, and an 8-week delivery timeline.", tags: ["8 Sections", "Trilingual Copy", "Print-Ready Specs", "8-Week Timeline"] },
      { ref: "KAG-JRK-007", color: C.amber, title: "Manufacturer Technical Brief", status: "COMPLETE — READY FOR MANUFACTURER", desc: "Full flavor specification for the Lebanese BBQ profile with 8 aromatic components, complete nutritional parameter requirements, Halal compliance checklist, a 4-stage quality control protocol, and a supply agreement framework.", tags: ["Flavor Spec", "8 QC Parameters", "Halal Checklist", "Supply Framework"] },
      { ref: "KAG-JRK-008", color: C.greenBright, title: "STRIKE Brand Enhancement Study", status: "COMPLETE — BRAND APPROVED 88/100", desc: "Element-by-element brand scoring: STRIKE name 92/100, STRIKE BITES 88/100, full tagline analysis, packaging renders for all three SKUs in vector format. Keep / Evolve / Add framework for each brand element.", tags: ["88/100 Overall", "3 SKU Renders", "Keep/Evolve/Add", "92/100 Name Score"] },
      { ref: "KAG-JRK-009", color: C.purple, title: "Board Meeting Presentation", status: "COMPLETE — FUNDER-READY", desc: "25-slide institutional-quality board presentation with structured presenter notes on every slide. Interactive sections covering financial tiers, competitive power points, GTM phases, and full keyboard navigation. Estimated run time: 73 minutes.", tags: ["25 Slides", "Presenter Notes", "Interactive", "Funder-Ready"] },
      { ref: "KAG-JRK-010", color: C.red, title: "Complete Project Handoff", status: "COMPLETE — NOTHING OMITTED", desc: "A 16-part operational handoff document covering every dimension of the engagement: product status, brand decisions, market intelligence, critical blockers, financial scenarios, regulatory roadmap, manufacturer contacts, and execution standards.", tags: ["16 Parts", "Full Operational", "All Blockers Flagged", "A to Z Coverage"] },
    ],
    notes: { open: "Click through 2–3 deliverables slowly. Let the client read the tags and the status line. Then say: 'Every one of these exists today. If you sign the mandate after this meeting, your designer can be briefed tomorrow and your manufacturer can receive the flavor brief this week.'", emphasis: ["The weight of 10 completed deliverables before a contract is the most powerful proof of commitment in the room. Do not rush past it.", "If the client asks to see a specific deliverable — say yes. You have them all. Offer to walk through any one in detail."], timing: "6 minutes" }
  },
  {
    id: "sec03", type: "section", label: "§03",
    badge: "SECTION THREE", color: C.gold,
    title: "The Brand",
    sub: "STRIKE BITES — named, scored, designed, and ready to build. Months of work already done.",
    notes: { open: "Transition: 'We did not wait for a mandate to name your brand. We researched it, scored it against 7 criteria, and we have a recommendation that rates 88 out of 100.'", emphasis: [], timing: "15 seconds" }
  },
  {
    id: "brand", type: "brandscore", label: "BRAND",
    section: "03 · THE BRAND",
    title: "STRIKE — Your Brand, Already Built",
    score: 88,
    elements: [
      { label: "Brand Name", value: "STRIKE", verdict: "APPROVED", score: 92, note: "Single syllable. Universal pronunciation in Arabic, English, French — سترايك. Functions as verb and noun simultaneously. Outperforms all 7 alternatives evaluated. Class 29 Lebanon appears clear." },
      { label: "Sub-Brand", value: "STRIKE BITES", verdict: "APPROVED", score: 88, note: "Alliterative architecture that scales across the product line: BITES → STRIPS → STICKS → PACKS. Every future format is pre-architected. No competitor has this system." },
      { label: "Front Tagline", value: "FUEL THE PRIMAL.", verdict: "RECOMMENDED", score: 85, note: "Refinement of 'REAL PRIMAL MUSCLE FUEL.' Faster. More poetic. Less supplement-adjacent. Works on pack at any size. Your decision to confirm — both options work." },
      { label: "Visual System", value: "Obsidian · Gold · Matte", verdict: "APPROVED", score: 90, note: "Dark warm obsidian base, performance gold accent, matte laminate finish. UV spot varnish on STRIKE wordmark. Cedar as a geometric 5-line abstraction at 15% opacity." },
      { label: "Halal Badge", value: "Dar Al-Fatwa · Forest Green", verdict: "APPROVED", score: 95, note: "Single most important regulatory element. Forest green circle, front panel top right. Visible in the first second of shelf encounter. GCC export-recognized from day one." },
      { label: "Pack Languages", value: "Arabic · English · French", verdict: "APPROVED", score: 95, note: "Arabic regulatory primary. English commercial secondary. French market tertiary. No imported competitor does this. Structural shelf authority advantage in Lebanon." },
    ],
    notes: { open: "Walk through STRIKE and STRIKE BITES. Then ask: 'Does this feel right to you?' Pause. Let them react before advancing. Their response reveals their emotional investment in the brand — this is invaluable for the close.", emphasis: ["The score of 88 is real and defensible. Most brands launch with a 70. Explain the methodology if asked — it will demonstrate the rigor behind all Ru'ya 360° work."], timing: "5 minutes" }
  },

  // ── COMPETITION SECTION ─────────────────────────────────────────────────────
  {
    id: "sec_comp", type: "section", label: "§COMP",
    badge: "COMPETITION", color: C.red,
    title: "The Competitive Landscape",
    sub: "Every brand competing for the Lebanese protein snack buyer — imported jerky, local protein-branded snacks, global bars. STRIKE is the only local Halal beef jerky in this market.",
    notes: {
      open: "Transition: 'Before the plan, let us show you exactly who is in this market and what Ru'ya 360° found when we went out and priced everything ourselves. Some of what we found will change how you think about this opportunity.'",
      emphasis: ["Halo and Raw Bites — brands the client may have seen on shelves — deliver plant-based protein from corn and peas, not meat. STRIKE delivers complete beef protein with heme iron, creatine, and B12 that no plant snack can replicate. This is the category correction."],
      timing: "15 seconds"
    }
  },
  {
    id: "comp_landscape", type: "comp_landscape", label: "LANDSCAPE",
    section: "COMP · MARKET MAP",
    title: "Every Competitor in Lebanon — Field-Mapped by Ru'ya 360°",
    subtitle: "Three competitive groups · All individually assessed · Pricing verified in Lebanese market · June 2026",
    verdict: "STRIKE BITES is the only local Halal beef jerky brand in Lebanon. Imported jerky arrives at 2× our price with no Lebanese authority certification. Local 'protein' snacks deliver plant-based protein in cups or puffs — a fundamentally different format and occasion. Wild West Halal (UK) is confirmed in UAE and heading this way. The first-mover window is measured in months.",
    groups: [
      {
        type: "DIRECT — IMPORTED BEEF JERKY",
        label: "Jack Link's, Country Archer & Wild West",
        color: C.red,
        competitors: [
          {
            name: "Jack Link's",
            origin: "USA · Carrefour, LivGood & Spinneys Lebanon",
            category: "Beef Jerky — Global Market Leader",
            price: "$5.15–$5.62 / 40g · Teriyaki, Original, Sweet & Hot (all in stock at Carrefour & LivGood Lebanon)",
            img: jacklinksFlavorImg,
            gaps: [
              "No Lebanese halal authority certification — FAMBRAS (Brazil) mark on EU packs only, unverifiable at Lebanese point of sale",
              "$5.15–$5.62 for 40g — over 2× STRIKE's target price. Structurally priced out of routine daily purchase.",
              "American flavor conventions — Teriyaki, Sweet & Hot — no Levantine palate connection or cultural resonance",
              "Import supply chain: FX volatility, customs delays, no Lebanese distributor accountability or shelf support",
            ]
          },
          {
            name: "Country Archer",
            origin: "USA · Confirmed at Spinneys Lebanon",
            category: "Grass-Fed Beef Jerky — Premium Tier",
            price: "~$6–8 per pack (premium grass-fed; confirmed shelf stock at Spinneys Lebanon)",
            img: countryArcherImg,
            gaps: [
              "No Halal certification — no mark confirmed on Lebanese-market packaging",
              "Highest price point in the category — above Jack Link's at ~$6–8 per pack, further from daily purchase",
              "American origin and flavor profile — no cultural resonance or Lebanese market roots",
              "Spinneys-exclusive footprint — absent from gym, pharmacy, or impulse HoReCa channels",
            ]
          },
          {
            name: "Wild West",
            origin: "UK (New World Foods / Valeo Group) · UAE confirmed · Lebanon: monitoring",
            category: "Beef Jerky — Halal Line Launched Jan 2024 · Approaching MENA",
            price: "UAE confirmed (Carrefour, Spinneys, Lulu UAE) · Lebanon distribution not yet confirmed",
            img: wildWestImg,
            gaps: [
              "Lebanon presence unconfirmed as of June 2026 — UAE distribution only. STRIKE must establish before this brand enters.",
              "Halal range only launched January 2024 (Forres, Scotland facility) — new entrant, not established in any Arab market",
              "No Lebanese cultural story — British producer with zero MENA heritage or local brand connection",
              "⚠ Strategic threat: Wild West Halal entering Lebanon would be STRIKE's first direct Halal jerky competitor. First-mover window is now.",
            ]
          }
        ]
      },
      {
        type: "LOCAL / REGIONAL — PROTEIN-BRANDED SNACKS",
        label: "Halo, Raw Bites, A Cup & MAK Bar",
        color: C.amber,
        competitors: [
          {
            name: "Halo Protein Puffs",
            origin: "Egypt (HEIM Foods) · Imported to Lebanon",
            category: "Puffed Corn Snack — Egyptian Import",
            price: "~$1.50 / 40g · Harissa & Lime, Sour Cream & Onion, Sriracha",
            img: haloImg,
            gaps: [
              "8g protein per 40g from puffed corn — not a complete amino acid profile. No heme iron, no creatine, no B12.",
              "Corn-based snack marketed as 'protein' — fundamentally different category from meat-based jerky",
              "Egyptian import — no Lebanese production story, no local accountability or direct trade support",
              "Halal certification status unconfirmed on available Lebanese market packaging",
            ]
          },
          {
            name: "Raw Bites",
            origin: "Beirut-based (Bazco Group s.a.r.l.) · Halal confirmed",
            category: "Pea/Corn Protein Puffs — Lebanese Brand",
            price: "$2.80–$3.55 / 50g · Peanut Butter, Thyme & Sesame, Sundried Tomato & Chili",
            img: rawBitesFlavorsImg,
            gaps: [
              "15g protein per 50g from pea and corn base — plant protein only. Incomplete amino acid profile vs beef.",
              "Corn puff format — different product category and purchase occasion from portable shelf-stable jerky",
              "Targets health-conscious snack market broadly — not positioned as gym fuel or protein meal replacement",
              "No beef, no heme iron, no creatine, no B12 — plant protein snack competing on an entirely different axis",
            ]
          },
          {
            name: "A Cup",
            origin: "Lebanon (A-Brands International · since 2016)",
            category: "Protein Cups — Levantine-Flavored · Lebanese · 25g protein/cup",
            price: "$2.29 / 80g cup · $3.57 / 125g Protein Bomb · at Carrefour, LivGood & Spinneys Lebanon",
            img: acupFlavorsImg,
            gaps: [
              "Refrigerated product — requires cold chain. Cannot compete in gym counter, vending, or ambient shelf channels.",
              "Dessert-first positioning (Konafa, Vanilla Ice Cream, Coffee Dream) — recovery fuel messaging absent",
              "Halal certification unconfirmed — operating in Lebanese Muslim market since 2016 but no explicit halal mark confirmed on packaging",
              "Cup format fundamentally limits occasion: requires utensil, is not pocket-portable, cannot be consumed walking",
            ]
          },
          {
            name: "MAK Bar",
            origin: "Lebanon (founded 2020) · 700+ outlets · Carrefour + Spinneys listed",
            category: "Plant-Based Protein Bar — Largest Local Protein Brand",
            price: "$1.85 / 42g (11g protein) · $2.32 / 55g (18g protein) · confirmed at Carrefour & Spinneys Lebanon",
            img: makBarImg,
            gaps: [
              "Pea protein + dates + almonds — plant-based. No meat protein, no heme iron, no complete amino acid profile.",
              "Bar format only — same format as Quest and Barebells. STRIKE's jerky is a unique portable meat occasion.",
              "700+ outlets including Carrefour and Spinneys — significant retail footprint but no halal certification confirmed",
              "Proven the Lebanese market buys locally-made protein snacks in modern trade — STRIKE enters that same shelf as the only meat-based option",
            ]
          }
        ]
      },
      {
        type: "INDIRECT — GLOBAL PROTEIN BARS",
        label: "Quest Bar & Barebells",
        color: C.purple,
        competitors: [
          {
            name: "Quest Bar",
            origin: "USA · The Supplements Factory Lebanon · Spinneys Lebanon",
            category: "Protein Bar — Global Leader · 21g protein / bar",
            price: "$4.00 per bar (confirmed at The Supplements Factory Lebanon) · 8 flavors available",
            img: questBarImg,
            gaps: [
              "Mushbooh status — no halal certification from any recognized body (no IFANCA, ISNA, or Dar Al-Fatwa). Not cleared for observant Muslim consumers.",
              "Sucralose sweetener — documented GI complaints in the fitness community. Disqualifying for health-focused daily users.",
              "American dessert flavors — chocolate chip cookie dough, birthday cake — zero Lebanese cultural connection",
              "Bar format only — no gym counter impulse size, no format flexibility across Lebanese trade channels",
            ]
          },
          {
            name: "Barebells",
            origin: "Sweden (Orkla Group) · confirmed at LivGood & Kelchi Lebanon",
            category: "Protein Bar — Premium Nordic · Mixed Halal Status",
            price: "$3.89–$4.66 / 55g bar · LivGood: $4.62–$4.66 · Kelchi.com: $3.89 (confirmed Lebanon pricing)",
            img: barebellsImg,
            gaps: [
              "Mixed halal status — most bars certified, but US-produced SKUs (Double Bite Peanut, some Soft Bars) are not halal-certified. Consumers must verify SKU by SKU.",
              "Maltitol sweetener — documented laxative effect at repeat consumption volumes. Negative for consistent daily use.",
              "European-Nordic flavor conventions — no Lebanese cultural anchor in any SKU",
              "Increasingly visible in Lebanon but premium-priced at $3.89–$4.66 with no local trade support or trainer relationship",
            ]
          }
        ]
      }
    ],
    notes: {
      open: "Click through each tab. Spend the most time on tab 2 — 'Local Protein-Branded Snacks.' The key distinction: every local brand uses plant-based protein (pea, corn, whey). STRIKE delivers beef. Ask the room: 'What is the protein source in Halo? In Raw Bites?' Answer: puffed corn and peas. Plant protein is nutritionally inferior for muscle use — no heme iron, no creatine, no complete amino acid profile that beef provides. Tab 1: Country Archer just appeared at Spinneys at $6–8 per pack — the premium imported ceiling. Tab 3: Barebells is mostly halal-certified but consumers must check SKU by SKU. STRIKE is unambiguous.",
      emphasis: [
        "Wild West Halal launched January 2024. Confirmed at Carrefour, Spinneys, and Lulu in UAE. They are heading to Lebanon. STRIKE's first-mover window is not infinite — it is measured in months, not years. This is the urgency argument.",
        "MAK Bar has 700 retail outlets including Carrefour and Spinneys Lebanon. They proved the Lebanese consumer will pay for locally-made protein snacks in modern trade. STRIKE enters that same shelf as the only meat-based option — a category no one else occupies.",
        "A Cup: 25g protein per 80g cup, $2.29, Lebanese-made since 2016, at Carrefour and Spinneys. The most credible local competitor on paper. But it is refrigerated, requires a utensil, and tastes like Konafa. STRIKE is what you eat on the way to the gym — A Cup is what you eat after dinner. Different occasion entirely.",
      ],
      timing: "5 minutes"
    }
  },
  {
    id: "comp_matrix", type: "comp_matrix", label: "MATRIX",
    section: "COMP · COMPARISON",
    title: "Head-to-Head — Seven Criteria That Decide the Sale",
    subtitle: "Rated from both the trade buyer and end consumer perspective. The criteria that win shelf space, drive repeat purchase, and build brand loyalty in Lebanon.",
    verdict: "STRIKE is the only brand that wins all seven criteria. A Cup — Lebanon's best local competitor — wins on price and local production but is refrigerated and delivers no meat protein. Jack Link's and Country Archer deliver real beef but fail on Halal and price. No single competitor holds more than three criteria simultaneously.",
    competitors: [
      { id: "jl",     short: "Jack Link's"    },
      { id: "ca",     short: "Country Archer" },
      { id: "acup",   short: "A Cup"          },
      { id: "quest",  short: "Quest Bar"      },
      { id: "strike", short: "STRIKE ✦"       },
    ],
    criteria: [
      {
        label: "Halal Certified",
        note: "Lebanese authority (Dar Al-Fatwa) or equivalent — verifiable at point of sale",
        vals:  { jl: "PART", ca: "FAIL", acup: "FAIL",    quest: "FAIL",     strike: "WIN"  },
        text:  { jl: "FAMBRAS EU only", ca: "No cert", acup: "Unconfirmed", quest: "Mushbooh", strike: "Dar Al-Fatwa" }
      },
      {
        label: "Zero Added Sugar",
        note: "No sugar or GI-problematic sweetener in any SKU",
        vals:  { jl: "PART", ca: "PART", acup: "FAIL",    quest: "PART",     strike: "WIN"  },
        text:  { jl: "0g Original", ca: "Cane sugar", acup: "Dessert-base", quest: "Sucralose", strike: "Zero" }
      },
      {
        label: "Lebanon Price Point",
        note: "Accessible for routine daily purchase",
        vals:  { jl: "FAIL", ca: "FAIL", acup: "WIN",     quest: "PART",     strike: "WIN"  },
        text:  { jl: "$5.15–5.62/40g", ca: "~$6–8/pack", acup: "$2.29–3.57", quest: "$4.00/bar", strike: "$2.50–3.50" }
      },
      {
        label: "Local Production",
        note: "Made in Lebanon — supply resilience + economic story",
        vals:  { jl: "FAIL", ca: "FAIL", acup: "WIN",     quest: "FAIL",     strike: "WIN"  },
        text:  { jl: "USA", ca: "USA", acup: "Lebanon ✓", quest: "USA", strike: "Lebanon" }
      },
      {
        label: "Lebanese Flavor Profile",
        note: "Designed for the Levantine palate and culture",
        vals:  { jl: "FAIL", ca: "FAIL", acup: "PART",    quest: "FAIL",     strike: "WIN"  },
        text:  { jl: "Teriyaki/US", ca: "Classic/US", acup: "Konafa/Sweets", quest: "Cookie/US", strike: "Cedar BBQ" }
      },
      {
        label: "Complete Meat Protein",
        note: "Beef-derived: heme iron, creatine, B12, all essential amino acids",
        vals:  { jl: "WIN",  ca: "WIN",  acup: "FAIL",    quest: "FAIL",     strike: "WIN"  },
        text:  { jl: "Beef ✓", ca: "Beef ✓", acup: "Whey/casein", quest: "Whey/milk", strike: "Beef ✓" }
      },
      {
        label: "Direct Trade Support",
        note: "Personal delivery, staff training, no middleman markup",
        vals:  { jl: "FAIL", ca: "FAIL", acup: "FAIL",    quest: "PART",     strike: "WIN"  },
        text:  { jl: "Importer only", ca: "Spinneys only", acup: "None", quest: "Via distrib.", strike: "Founder direct" }
      },
    ],
    notes: {
      open: "Walk the matrix row by row. Note openly that A Cup wins on Price Point and Local Production — they are a genuinely good Lebanese brand, just a completely different product format (refrigerated cup). Jack Link's and Country Archer share the 'Complete Meat Protein' win with STRIKE — but they fail on Halal and price. STRIKE is the only brand that holds all seven. After the last row: 'Seven criteria. Seven wins for STRIKE. No competitor holds more than three simultaneously. That is not a competitive gap — that is a structural vacuum.' Then stop talking.",
      emphasis: [
        "The Halal row is decisive: Jack Link's gets PARTIAL credit — FAMBRAS certification on European packs, but a Lebanese Muslim consumer cannot verify this at the shelf. Country Archer has nothing. STRIKE is certified by Lebanon's own Dar Al-Fatwa. This is not a minor distinction in a market that is 60%+ Muslim.",
        "The price row: Jack Link's at $5.15–$5.62, Country Archer at $6–8, vs STRIKE at $2.50–$3.50. We are 40–55% cheaper AND superior on five other criteria. This price-quality combination is structurally impossible for any imported brand to replicate without destroying their global pricing architecture.",
      ],
      timing: "4 minutes"
    }
  },

  {
    id: "sec04", type: "section", label: "§04",
    badge: "SECTION FOUR", color: C.greenBright,
    title: "The Plan",
    sub: "A to Z. Phase 0 through Phase 4. 38 steps. Nothing improvised, nothing left to chance.",
    notes: { open: "Transition: 'Let us show you exactly how we take this from today's meeting to your first sale — and beyond.'", emphasis: [], timing: "15 seconds" }
  },
  {
    id: "roadmap", type: "roadmap", label: "ROADMAP",
    section: "04 · THE PLAN",
    title: "Full Launch Roadmap — Phase by Phase",
    phases: [
      {
        phase: "PHASE 0–1", time: "Today → Month 4", color: C.gold, title: "Foundation",
        principle: "Build the structure before the product. Legal entity, regulatory filings, brand identity, and supply agreement must all be locked before a single unit goes to market. These are not bureaucratic steps — they are the foundation that protects every dollar you invest.",
        actions: ["Engage Lebanese notary — SARL registration begins this week", "IP lawyer engaged — Class 29 + 35 trademark clearance for STRIKE", "MoPH food product registration submitted (2–4 month lead time — start immediately)", "Halal certification applied for — Dar Al-Fatwa Lebanon (3–6 weeks)", "Lab testing commissioned from LIBNOR on nutritional panel receipt from manufacturer", "Brand designer formally briefed — 8-week identity and packaging system delivery", "GS1 Lebanon — barcode allocation for first 2 SKUs", "Supply agreement signed with manufacturer"],
        targets: [{ label: "SARL Registered", value: "Week 3–4" }, { label: "MoPH Submitted", value: "Month 2" }, { label: "Trademark Cleared", value: "Week 6" }, { label: "Brand Identity Final", value: "Week 8" }]
      },
      {
        phase: "PHASE 2", time: "Month 4–6", color: C.amber, title: "Launch",
        principle: "Sports nutrition stores are Priority One — their customer walks in already in protein-buying mode. Every first order is sale-or-return. Zero financial risk to any buyer.",
        actions: ["Formal launch into 20–30 gym and sports nutrition accounts", "STRIKE TEAM: recruit 20 founding personal trainers as brand ambassadors", "Sale-or-return terms for all first orders — zero risk to every account", "Personal display setup at every account by Ru'ya 360° on delivery day", "Bi-weekly check-in at every account — unit count, feedback, reorder", "Pharmacy outreach begins Month 5 once sell-through data is available", "Weekly P&L reporting against approved budget tier begins"],
        targets: [{ label: "Active Accounts", value: "20–30" }, { label: "Revenue M6", value: "$18K–28K/mo" }, { label: "Trainer Ambassadors", value: "20 founding" }, { label: "Breakeven Target", value: "Month 5–7" }]
      },
      {
        phase: "PHASE 3", time: "Month 6–12", color: C.greenBright, title: "Expand",
        principle: "Approach modern trade with sell-through data in hand — not with promises. Numbers open doors that relationships alone cannot. 12 weeks of verified sell-through data is your credential with any supermarket buyer.",
        actions: ["Modern trade approach: Spinneys, TSC, Bou Khalil, Fahed — with data", "B2B and corporate wellness channel development", "Second SKU evaluation based on sell-through signals (STRIPS)", "FMCG distributor engagement as volume warrants", "Quarterly account review and contract renegotiations", "Formal brand health assessment — 50+ consumer survey"],
        targets: [{ label: "Active Accounts", value: "80–130" }, { label: "Revenue M12", value: "$40K–65K/mo" }, { label: "Modern Trade Entry", value: "Month 8–10" }, { label: "Gross Margin", value: "48–55%" }]
      },
      {
        phase: "PHASE 4", time: "Month 12+", color: C.purple, title: "Scale",
        principle: "The Lebanese story is the GCC marketing asset. 'Made in Lebanon' is a premium signal in UAE and Saudi Arabia. We built export capability into the product from the first specification — no reformulation, no re-certification needed.",
        actions: ["GCC export evaluation — UAE first, Saudi Arabia second", "ESMA UAE and Saudi SFDA registration preparation", "STRIKE PACKS — variety multipack for GCC retail and gift market", "STRIKE STRIPS and STRIKE STICKS product line expansion", "Western market horizon planning — D2C digital channel potential"],
        targets: [{ label: "GCC Entry", value: "UAE + KSA" }, { label: "Active SKUs", value: "3–4" }, { label: "Revenue Potential", value: "$80K–130K/mo" }, { label: "Total Accounts", value: "200+" }]
      }
    ],
    notes: { open: "Spend time on Phase 2 — that is where the client's existing gym and manufacturer relationships become your most powerful accelerators. Say: 'Your contacts cut our Phase 2 timeline by 4–6 weeks versus any other entrant coming into this market cold.'", emphasis: ["The STRIKE TEAM trainer program is the highest-leverage activation in the entire plan. 20 trainers who believe in the product = 20 salespeople who work without a salary."], timing: "6 minutes" }
  },
  {
    id: "sec05", type: "section", label: "§05",
    badge: "SECTION FIVE", color: C.amber,
    title: "The Financial Plan",
    sub: "Your investment. Your return. Your timeline to profitability. Every number is based on real channel data.",
    notes: { open: "Before advancing to numbers: 'Every figure in this plan is derived from actual channel margins, competitive pricing in Lebanon, and realistic sell-through assumptions. We will not put a projection in front of you that we cannot defend number by number.'", emphasis: [], timing: "15 seconds" }
  },
  {
    id: "financials", type: "financials", label: "FINANCIALS",
    section: "05 · FINANCIAL PLAN",
    title: "Investment, Return & ROI — Three Scenarios",
    tiers: [
      {
        tier: "TIER 1", name: "Lean Launch", total: "$24,000", color: C.greenBright,
        breakeven: "Month 9–12", margin: "42–48%", roi: "~155%",
        m3: "Building", m3p: 10, m6: "$4K–7K /mo", m6p: 18, m12: "$14K–22K /mo", m12p: 100,
        cumProfit: "~$40K", profitNote: "Est. cumulative gross profit Year 1 at 45% avg margin. Investment recovery Month 9–12. Revised from $19K — now includes transport (on-demand vehicle + fuel), basic operations (phone, internet, generator), and minimal tech stack. 30–40 account scope limits revenue velocity.",
        includes: ["SARL registration + core licensing", "MoPH registration — 1 SKU + halal + lab testing", "Basic brand identity (wordmark + palette only)", "Single-serve 40g pouch — 1 production batch", "30–40 account outreach (limited route)", "Minimal tech stack (Zoho Books free + basic site)"]
      },
      {
        tier: "TIER 2", name: "Standard Launch", total: "$62,000", color: C.gold, rec: true,
        breakeven: "Month 8–11", margin: "55–62%", roi: "~265%",
        m3: "Revenue building", m3p: 14, m6: "$9K–14K /mo", m6p: 26, m12: "$40K–65K /mo", m12p: 100,
        cumProfit: "~$153K", profitNote: "Est. cumulative gross profit Year 1 at 61.9% avg margin. Investment recovery Month 8–11. Year 1 net positive approx. $91K. Revised from $50K to $62K — now includes transport (van lease + fuel), workspace, insurance, generator, offshore USD banking, and full technology stack. Revenue trajectory unchanged.",
        includes: ["SARL + all licensing + IP lawyer + food regulatory consultant", "MoPH 2 SKUs + halal + lab testing × 2 rounds", "Full brand identity + 2 SKU packaging (40g + 120g)", "2 production batches (90-day stock)", "Delivery vehicle lease + fuel — 60–80 account route (NEW)", "Workspace, product liability + vehicle insurance, generator (NEW)", "Offshore USD banking + full technology stack (NEW)", "Ru'ya 360° management fee Phases 0–2"]
      },
      {
        tier: "TIER 3", name: "Full Market Entry", total: "$96,000", color: C.amber,
        breakeven: "Month 5–7", margin: "58–64%", roi: "~310%",
        m3: "Soft launch revenue", m3p: 15, m6: "$18K–28K /mo", m6p: 30, m12: "$80K–130K /mo", m12p: 100,
        cumProfit: "~$310K", profitNote: "Est. cumulative gross profit Year 1 at 61% avg margin. Investment recovery Month 5–7. Modern trade entry from M8–10 drives the M12 step change. Year 1 net positive approx. $214K. Maximum market capture velocity.",
        includes: ["Full legal stack + GCC trademark pre-filing", "MoPH 3 SKUs + label compliance + export docs", "Agency-level brand identity + 3 SKU packaging", "3-SKU production batch (120-day stock)", "Dedicated field sales rep — 6-month allocation (supplement)", "130+ accounts across all channels", "Ru'ya 360° management fee Phases 0–3 (12 months)"]
      }
    ],
    notes: { open: "Lead with Tier 2 as the reference point. Say: 'This is where serious commercial intent meets financial discipline. Enough capital to do this right — not more than you need to prove the concept.'", emphasis: ["Ask directly after presenting all three: 'Which scenario matches where you are right now?' Then stop talking. Let the room decide.", "Memorize these Tier 2 numbers: $62K in. $153K gross profit Year 1. ~$91K net positive. 265% ROI. Breakeven Month 8–11. You should say these without looking at the slide."], timing: "7 minutes" }
  },
  {
    id: "financialcorrections", type: "financialstudy", label: "FINANCIAL",
    section: "05 · FINANCIAL PLAN",
    title: "Financial Feasibility Study — Full Model",
    notes: { open: "This is the full three-tier financial model. Walk the client through each tier — Lean, Standard (recommended), and Full Market Entry — using the interactive breakdown. Present Tier 2 as the reference point. The investment breakdown, revenue projections, assumptions, and blockers are all interactive.", emphasis: ["Lead with Tier 2 (Standard Launch) — $42,000. Show the investment breakdown first, then projections. Let them click through.", "The Blockers tab is operational — use it to set the agenda for what needs to happen immediately after this meeting."], timing: "7 minutes" }
  },
  {
    id: "sec06", type: "section", label: "§06",
    badge: "SECTION SIX", color: C.purple,
    title: "Why Ru'ya 360° and Only Ru'ya 360°",
    sub: "Seven structural advantages. Each one a reason your business will not find this partnership anywhere else.",
    notes: { open: "Present this section with full confidence. This is not modesty time. You built 10 deliverables before a contract existed. You have earned the right to speak directly.", emphasis: [], timing: "15 seconds" }
  },
  {
    id: "whykits", type: "whykits", label: "WHY Ru'ya 360°",
    section: "06 · WHY Ru'ya 360°",
    title: "Why Work With Ru'ya 360° — And Nobody Else",
    reasons: [
      { color: C.gold, title: "We Delivered Before You Decided", body: "We built ten institutional-quality documents before you signed anything. Not slides. Not outlines. Full, referenced, production-ready deliverables — brand study, financial model, manufacturer brief, competitive matrix, outreach scripts, board presentation. This is what a committed partner does. Consultants talk about commitment. We proved it before the contract exists.", without: "You engage a standard consultant who gives you a 15-slide deck of generic advice, calls it a market entry strategy, and leaves you to figure out execution on your own." },
      { color: C.amber, title: "We Know Lebanon's Channels Cold", body: "82.6% of sports nutrition purchases in MENA are brick-and-mortar. Digital marketing is not the priority channel — physical relationship, personal visit, and warm introduction are what open doors in Beirut, Metn, Keserwan, and Jounieh. We built the outreach system and wrote the scripts specifically for Lebanese retail culture.", without: "You work with an advisor who recommends Instagram advertising and an e-commerce store as your primary launch strategy in a relationship-first market where the handshake closes the deal." },
      { color: C.greenBright, title: "We Execute — We Don't Just Advise", body: "Ru'ya 360° visits accounts personally. Sets up displays personally. Trains store staff personally. Checks in bi-weekly personally. We manage the manufacturer relationship, regulatory submissions, designer briefing, and monthly financial reporting. You make the decisions. We make them happen — every single one.", without: "You receive a comprehensive report and a handshake. You then need to hire someone else to actually execute what the consultant designed, restarting the entire learning curve." },
      { color: C.purple, title: "We Built Your Brand Already", body: "STRIKE is not a name we suggested casually. It is a name we researched, scored against 7 criteria, tested for trademark viability across Lebanon and GCC, evaluated in Arabic, English, and French, and rated at 92/100. The visual system, packaging specifications, and trilingual copy are all documented. Your designer can be briefed tomorrow.", without: "You spend three months in naming workshops, iterate through 40 logo concepts, engage three designers with conflicting visions, and still don't know if the trademark is available in Lebanon or GCC." },
      { color: C.red, title: "Milestone-Gated Financial Accountability", body: "Your budget is released by phase, not paid upfront. Phase 0 funds unlock after the legal entity is formed. Phase 1 after brand identity is approved. Phase 2 after the first batch sells through. You are never at risk of committing full capital before results are demonstrated. Every month you see a P&L against the approved plan.", without: "You hand over a lump sum and receive quarterly updates on 'strategic progress' and 'brand-building activity' with no verifiable output and no accountability structure." },
      { color: C.gold, title: "You Own Everything We Create", body: "Every deliverable — the brand identity, flavor specifications, outreach scripts, competitor intelligence, financial model, and regulatory roadmap — transfers to you upon final payment. You are not licensing our work. You own it outright, unconditionally. If you ever move on without Ru'ya 360°, you take everything with you.", without: "You discover the 'proprietary methodology' your consultant used is copyrighted and you cannot use the outputs without retaining them permanently at an ongoing monthly fee." },
      { color: C.greenBright, title: "We Think in GCC from Day One", body: "The product is being built for Lebanon and GCC simultaneously. Halal certification from Dar Al-Fatwa Lebanon is recognized in UAE and Saudi Arabia. STRIKE PACKS — the variety multipack for GCC hypermarket entry — is already in the product architecture. The Lebanese BBQ flavor is a premium signal in every GCC market. No reformulation needed.", without: "You launch in Lebanon with a product that requires full reformulation, re-certification under ESMA/SFDA, and an entirely new brand before it can enter any export market." },
    ],
    notes: { open: "After all 7: 'No competitor to your business — not Jack Link's, not Wild West, not any future local entrant — will have a partner that brings all seven of these simultaneously. This combination does not exist in Lebanon.'", emphasis: ["Reason 01 — We Delivered — is always the most impactful. It is unique. No other advisory firm in Lebanon has done this.", "Reason 04 — Milestone-Gated — is most reassuring to a careful founder. Emphasize that they pay for progress, not promises."], timing: "7 minutes" }
  },
  {
    id: "mandate", type: "mandate", label: "MANDATE",
    section: "07 · THE PROPOSAL",
    title: "What We Are Proposing — The Ru'ya 360° Mandate",
    kitsScope: ["All channel outreach — every account visit, every commercial negotiation, every display setup", "Regulatory management — MoPH, Halal, trademark, GS1, lab testing — end to end", "Designer briefing, creative direction, and compliance sign-off on all packaging before print", "Manufacturer relationship — flavor development oversight, QC protocol, supply agreement management", "Monthly financial reporting — P&L against plan, sell-through data, account performance", "Strategic decisions — channel sequencing, pricing reviews, SKU expansion timing"],
    clientScope: ["Capital allocation and final approval on all major financial decisions", "Manufacturer relationship introduction and primary contact access", "Final brand name and tagline confirmation — your choice, our recommendation", "Budget tier selection — Tier 1, 2, or 3", "Board governance and all investor or funder relationships", "Final sign-off on all regulatory filings before submission"],
    fees: [
      { tier: "Tier 1 — Lean Launch", range: "Included in contingency" },
      { tier: "Tier 2 — Standard Launch", range: "$3,000–5,000 / Phases 0–2 (6 mo)" },
      { tier: "Tier 3 — Full Market Entry", range: "$8,000–14,000 / Phases 0–3 (12 mo)" },
    ],
    notes: { open: "Be direct about fee structure. Say: 'Our fee is milestone-linked, not time-billed. We earn when you progress — not when we sit in meetings. If milestones are not hit, the next phase of funding does not release.'", emphasis: ["The IP ownership clause is almost always the most reassuring thing in this section. Emphasize it: 'You own everything we create. Unconditionally.'"], timing: "4 minutes" }
  },
  {
    id: "qa", type: "qa", label: "Q & A",
    section: "08 · ANTICIPATED QUESTIONS",
    title: "Every Question — Pre-Answered",
    subtitle: "The questions most founders ask at this stage. Delivered with confidence and without hesitation.",
    qas: [
      { color: C.gold, q: "Why should I give full control to an advisory firm I just met?", a: "You are not giving us control — you are giving us authority to execute within parameters you define. Every major financial commitment and every regulatory filing is approved by you first. What you are giving us is the mandate to move without waiting for a meeting every time we need to visit an account or place a reorder. The 10 deliverables in front of you today were built before you agreed to anything. That is what full commitment looks like before a contract exists." },
      { color: C.amber, q: "What happens if the product doesn't sell?", a: "Every first account is sale-or-return — no retailer takes financial risk on your product. We do not launch until MoPH approval is confirmed, the brand is professionally executed, and the product is lab-verified. Revenue projections are conservative, assuming 20–40 units per week per gym account at steady state. If sell-through is below target, we have a formal feedback and pricing review protocol built into the mandate — not improvised after the fact." },
      { color: C.greenBright, q: "How long before I start making money?", a: "Under the recommended Tier 2 scenario with corrected projections: breakeven is targeted between Month 8 and Month 11. By Month 6, revenue is projected at $9,000–$14,000 per month at a gross margin of 55–62% — the higher margin figure is due to the corrected $4.50 retail price benchmark against Jack Link's at $5.62. By Month 12, revenue is projected at $40,000–$65,000 per month. These are directional projections based on real Lebanese channel data and competitive pricing research, not guarantees." },
      { color: C.purple, q: "What if I want to manage some parts of this myself?", a: "That is entirely your decision and we will document the division clearly in the mandate. However, our methodology is an integrated system. The outreach script connects to the commercial proposal, which connects to the account tracker, which drives the weekly check-in protocol. The more elements are separated, the more the system loses its compounding effect. Our recommendation: run the full system for 6 months, evaluate results, then decide what to internalise based on demonstrated performance." },
      { color: C.red, q: "What is the minimum I can invest to get started?", a: "Tier 1 at $24,000 is the viable minimum — it registers the entity, begins MoPH registration for one SKU, and gives you market presence. However, Ru'ya 360°'s recommendation is Tier 2 at $62,000. At Tier 1, there is a real risk that the packaging appears underfunded relative to Jack Link's and Wild West on the same shelf. The difference between Tier 1 and Tier 2 is the difference between entering the market and owning the category." },
      { color: C.gold, q: "Why Lebanon and not start with another market?", a: "Lebanon is the proof-of-concept that unlocks the GCC. 'Made in Lebanon' carries premium weight in UAE and Saudi Arabia — the provenance story is a marketing asset. Halal certification from Dar Al-Fatwa Lebanon is recognized across the GCC. Every product decision — the flavor, the certification, the trilingual packaging — was designed for Lebanon first and GCC second. Starting in Lebanon is not a constraint. It is the strategy." },
      { color: C.amber, q: "What does Ru'ya 360° do that I couldn't hire someone else to do?", a: "An employee executes tasks. Ru'ya 360° brings the full system: the research base, the brand work already done, the outreach scripts, the financial model, the manufacturer brief, the regulatory knowledge, and the personal relationship network across Lebanese gyms and nutrition stores. Rebuilding this from scratch would take 6–9 months and cost more than Tier 3. You would also be paying for someone to learn the market while we already know it cold." },
    ],
    notes: { open: "Do not read these answers. Know them. Internalize them. Deliver with confidence and brevity — then stop talking. Silence after a complete answer is a sign of strength, not uncertainty.", emphasis: ["Question #3 is always asked. Have Tier 2 numbers memorized: $62K in, $153K gross profit Year 1, ~$91K net positive, 265% ROI. Say these without looking at the slide."], timing: "10–15 minutes — this is real Q&A time, not presentation time" }
  },
  {
    id: "close", type: "closing", label: "CLOSE",
    title: "The Category Is Empty. The Brand Is Named. The Plan Is Built. Let Us Begin.",
    decisions: [
      "Select your budget tier — Tier 1 ($18,500) / Tier 2 ($42,000 recommended) / Tier 3 ($82,000)",
      "Sign the Ru'ya 360° Management Mandate — formal authority to execute the launch plan today",
      "Confirm STRIKE as your brand name — IP trademark search begins this week",
      "Call your manufacturer this week — nutritional panel required within 5 business days",
    ],
    closingLine: "The category is empty today. The question is not whether someone will build it. The question is whether STRIKE owns it — or whether we watch someone else do it first.",
    notes: { open: "Deliver the closing line verbatim. Then stop talking entirely. Let the room decide. Do not fill the silence. Do not renegotiate before they have responded. The next person who speaks is not you.", emphasis: ["Ask which tier directly: 'Which scenario are we working with?' Then silence.", "If they do not sign today — offer to leave all 10 deliverables with them. There is no better closing gift than handing over 10 completed documents they can read tonight."], timing: "5 minutes + close" }
  }
];

// ─── MAIN APPLICATION ─────────────────────────────────────────────────────────
export default function KITSPitchDeck() {
  const [curr, setCurr] = useState(0);
  const [notes, setNotes] = useState(false);
  const [nav, setNav] = useState(false);
  const [whiteMode, setWhiteMode] = useState(false);
  // palette drives both this component's chrome AND all child components via ThemeCtx
  const palette = whiteMode ? LIGHT : C;
  const total = SLIDES.length;
  const slide = SLIDES[curr];

  const prev = useCallback(() => setCurr(c => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurr(c => Math.min(total - 1, c + 1)), [total]);

  useEffect(() => {
    const h = e => {
      if (["ArrowRight", "ArrowDown", " "].includes(e.key)) { e.preventDefault(); next(); }
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) { e.preventDefault(); prev(); }
      if (e.key === "n" || e.key === "N") setNotes(s => !s);
      if (e.key === "Escape") setNav(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [next, prev]);

  const pct = ((curr + 1) / total) * 100;

  return (
    <ThemeCtx.Provider value={palette}>
    <div style={{ height: "100vh", width: "100%", background: palette.void, display: "flex", flexDirection: "column", fontFamily: "Georgia,serif", userSelect: "none", overflow: "hidden", boxSizing: "border-box" }}>

      {/* ── TOP BAR ── */}
      <div style={{ background: palette.void, borderBottom: `1px solid ${palette.ash}`, padding: "7px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0, zIndex: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "monospace", fontSize: 11, color: palette.gold, letterSpacing: "0.3em" }}>STRIKE BITES</span>
          <span style={{ width: 1, height: 14, background: palette.ash }} />
          <span style={{ fontFamily: "monospace", fontSize: 8, color: palette.creamDim, opacity: 0.5, letterSpacing: "0.1em" }}>CLIENT PITCH DECK · Ru'ya 360° ADVISORY GROUP · CONFIDENTIAL</span>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button onClick={() => setNav(!nav)} style={{ background: nav ? `${palette.gold}15` : "transparent", border: `1px solid ${nav ? palette.gold : palette.ash}`, borderRadius: 3, padding: "4px 10px", cursor: "pointer", fontFamily: "monospace", fontSize: 8, color: nav ? palette.gold : palette.creamDim, letterSpacing: "0.1em", WebkitTapHighlightColor: "transparent" }}>SLIDES</button>
          <button onClick={() => setNotes(!notes)} style={{ background: notes ? `${palette.gold}15` : "transparent", border: `1px solid ${notes ? palette.gold : palette.ash}`, borderRadius: 3, padding: "4px 10px", cursor: "pointer", fontFamily: "monospace", fontSize: 8, color: notes ? palette.gold : palette.creamDim, letterSpacing: "0.1em", WebkitTapHighlightColor: "transparent" }}>NOTES {notes ? "▲" : "▼"}</button>
          <button
            onClick={() => setWhiteMode(w => !w)}
            title={whiteMode ? "Switch to dark mode" : "Switch to light mode for TV presentation"}
            style={{
              background: whiteMode ? `${palette.gold}20` : `${palette.gold}12`,
              border: `1px solid ${palette.gold}`,
              borderRadius: 3, padding: "4px 10px", cursor: "pointer",
              fontFamily: "monospace", fontSize: 8, color: palette.gold,
              letterSpacing: "0.1em", WebkitTapHighlightColor: "transparent",
              fontWeight: 600,
            }}
          >{whiteMode ? "◑ DARK" : "☀ DAY"}</button>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: palette.creamDim, background: palette.charcoal, padding: "4px 10px", borderRadius: 3, border: `1px solid ${palette.ash}` }}>{String(curr + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</div>
        </div>
      </div>

      {/* ── SLIDE NAVIGATOR ── */}
      {nav && (
        <div style={{ background: palette.obsidian, borderBottom: `1px solid ${palette.ash}`, padding: "10px 24px", display: "flex", gap: 4, flexWrap: "wrap", flexShrink: 0, zIndex: 19 }}>
          {SLIDES.map((s, i) => (
            <button key={i} onClick={() => { setCurr(i); setNav(false); }} style={{ background: curr === i ? `${palette.gold}18` : s.type === "section" ? palette.ember : "transparent", border: `1px solid ${curr === i ? palette.gold : palette.ash}`, borderRadius: 3, padding: "5px 10px", cursor: "pointer", transition: "all 0.15s", minWidth: s.type === "section" ? 70 : 48, WebkitTapHighlightColor: "transparent" }}>
              <div style={{ fontFamily: "monospace", fontSize: 6, color: curr === i ? palette.gold : palette.creamDim, marginBottom: 1 }}>{String(i + 1).padStart(2, "0")}</div>
              <div style={{ fontSize: 8, color: curr === i ? palette.cream : s.type === "section" ? palette.gold : palette.creamDim }}>{s.label}</div>
            </button>
          ))}
        </div>
      )}

      {/* ── MAIN SLIDE AREA ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }}>
        <div style={{ flex: notes ? "0 0 62%" : 1, background: palette.obsidian, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: `${pct}%`, height: 2, background: `linear-gradient(to right,${palette.goldDim},${palette.gold},${palette.goldBright})`, transition: "width 0.35s ease", zIndex: 10 }} />
          <div style={{ position: "absolute", inset: 0, overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
            <RenderSlide slide={slide} />
          </div>
          <button onClick={prev} disabled={curr === 0} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", background: `${palette.obsidian}DD`, border: `1px solid ${palette.ash}`, borderRadius: "50%", width: 34, height: 34, cursor: curr === 0 ? "default" : "pointer", color: curr === 0 ? palette.ash : palette.cream, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", opacity: curr === 0 ? 0.2 : 0.65, transition: "opacity 0.2s", zIndex: 10, WebkitTapHighlightColor: "transparent" }}>‹</button>
          <button onClick={next} disabled={curr === total - 1} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: `${palette.obsidian}DD`, border: `1px solid ${palette.ash}`, borderRadius: "50%", width: 34, height: 34, cursor: curr === total - 1 ? "default" : "pointer", color: curr === total - 1 ? palette.ash : palette.cream, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", opacity: curr === total - 1 ? 0.2 : 0.65, transition: "opacity 0.2s", zIndex: 10, WebkitTapHighlightColor: "transparent" }}>›</button>
        </div>

        {/* ── PRESENTER NOTES ── */}
        {notes && slide.notes && (
          <div style={{ flex: "0 0 38%", background: "#08070A", borderTop: `2px solid ${palette.gold}35`, overflowY: "auto", padding: "16px 32px", WebkitOverflowScrolling: "touch" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: palette.gold, letterSpacing: "0.25em" }}>PRESENTER NOTES · {slide.label}</div>
              <div style={{ fontFamily: "monospace", fontSize: 8, color: palette.creamDim }}>TIMING: {slide.notes.timing}</div>
            </div>
            <p style={{ margin: "0 0 16px", fontSize: 13, color: palette.cream, lineHeight: 1.8, borderLeft: `3px solid ${palette.gold}35`, paddingLeft: 14 }}>{slide.notes.open}</p>
            {slide.notes.emphasis && slide.notes.emphasis.length > 0 && (
              <div>
                <div style={{ fontFamily: "monospace", fontSize: 8, color: palette.amber, letterSpacing: "0.2em", marginBottom: 10 }}>★ EMPHASIS POINTS</div>
                {slide.notes.emphasis.map((e, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, padding: "10px 14px", background: `${palette.amber}08`, border: `1px solid ${palette.amber}18`, borderLeft: `3px solid ${palette.amber}50`, borderRadius: 3 }}>
                    <span style={{ color: palette.amber, fontSize: 10, flexShrink: 0, marginTop: 1 }}>★</span>
                    <p style={{ margin: 0, fontSize: 12, color: palette.amber, opacity: 0.9, lineHeight: 1.7 }}>{e}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{ background: palette.void, borderTop: `1px solid ${palette.ash}`, padding: "6px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 20 }}>
          <button onClick={prev} disabled={curr === 0} style={{ background: "transparent", border: "none", cursor: curr === 0 ? "default" : "pointer", fontFamily: "monospace", fontSize: 8, color: curr === 0 ? palette.ash : palette.creamDim, letterSpacing: "0.1em", WebkitTapHighlightColor: "transparent" }}>← PREV</button>
          <button onClick={next} disabled={curr === total - 1} style={{ background: "transparent", border: "none", cursor: curr === total - 1 ? "default" : "pointer", fontFamily: "monospace", fontSize: 8, color: curr === total - 1 ? palette.ash : palette.creamDim, letterSpacing: "0.1em", WebkitTapHighlightColor: "transparent" }}>NEXT →</button>
        </div>
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          {SLIDES.map((s, i) => (
            <button key={i} onClick={() => setCurr(i)} style={{ width: i === curr ? 22 : s.type === "section" ? 8 : 5, height: s.type === "section" ? 5 : 4, borderRadius: 3, background: i === curr ? palette.gold : s.type === "section" ? palette.goldDim : palette.ash, border: "none", cursor: "pointer", padding: 0, transition: "all 0.25s ease", WebkitTapHighlightColor: "transparent" }} />
          ))}
        </div>
        <div style={{ fontFamily: "monospace", fontSize: 7, color: palette.creamDim, opacity: 0.35, letterSpacing: "0.15em" }}>N = NOTES · ← → = NAVIGATE · SLIDES = OVERVIEW</div>
      </div>
    </div>
    </ThemeCtx.Provider>
  );
}

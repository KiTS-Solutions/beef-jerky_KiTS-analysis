# STRIKE BITES · Pitch Deck Closing Slide — Redesign v2.0
## Implementation File for Claude Code · kits-pitch-deck.jsx

---

## WHAT THIS FILE DOES

Replaces the weak `WhatNowSlide` closing component and its `SLIDES` data entry
with a research-grounded, visually authoritative closing slide engineered to
compel a signed mandate and budget tier decision in the room.

**Research basis applied:**
- Cialdini (1984): proof-of-work reciprocity trigger
- Kahneman & Tversky: peak-end rule (final moment shapes decision memory) + loss aversion (2× motivating power)
- Hopkins / Tracy / Voss: silence close — stated question, then silence
- Khakhar & Rammal (2013): MENA/Lebanese closing norms — authority, relationship, face
- MBB/Goldman visual discipline: one message, action-oriented, restrained

---

## IMPLEMENTATION INSTRUCTIONS FOR CLAUDE CODE

### Step 1 — Locate and remove REPLACEMENT 1

Open `kits-pitch-deck.jsx`.

**Find this exact comment line:**
```
// ─── WHAT NOW (CLOSING) ───────────────────────────────────────────────
```

**Find the closing brace of the `WhatNowSlide` function.** It ends just before:
```
// ─── SLIDE DISPATCH ───────────────────────────────────────────────────────────
```

**Delete everything between (and including) those two blocks** — i.e. the full
`WhatNowSlide` function from its opening comment to its closing `}`.

**Replace with the entire code block in REPLACEMENT 1 below.**

---

### Step 2 — Locate and replace REPLACEMENT 2

In the `SLIDES` array near the bottom of the file, find this entry (it is the
last entry in the array, just before the closing `]`):

```javascript
{
  id: "whatnow", type: "whatnow", label: "WHAT NOW?",
  notes: { open: "This is the close. Do not pitch. ...
```

**Replace that entire object** (from `{` to its closing `}`) with the object
in REPLACEMENT 2 below.

---

### Step 3 — No other changes required

- No new imports needed. `useState`, `useEffect`, `useContext` are already imported.
- `useResponsive` and `ThemeCtx` are already available in scope.
- All color tokens used (`C.gold`, `C.amber`, `C.greenBright`, `C.red`,
  `C.purple`, `C.teal`, `C.cream`, `C.creamDim`, `C.charcoal`, `C.ash`,
  `C.obsidian`, `C.void`) are defined in the existing theme.
- The `RenderSlide` switch already has `case "whatnow": return <WhatNowSlide />;`
  — no change needed.

---

## REPLACEMENT 1 — Full WhatNowSlide Component

Paste this in place of the old `WhatNowSlide` function:

```jsx
// ─── WHAT NOW (CLOSING) — v2.0 ──────────────────────────────────────────────
// Research: Cialdini reciprocity · Kahneman peak-end + loss aversion ·
// Hopkins / Tracy / Voss silence close · Khakhar & Rammal MENA norms ·
// MBB / Goldman visual discipline · first-mover urgency (Lieberman & Montgomery)
function WhatNowSlide() {
  const C = useContext(ThemeCtx);
  const { isMobile } = useResponsive();
  const [selectedTier, setSelectedTier] = useState(1); // Tier 2 pre-selected
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimIn(true), 180);
    return () => clearTimeout(t);
  }, []);

  // ── DATA ──────────────────────────────────────────────────────────────────

  // 11 deliverables — Cialdini reciprocity: overwhelming proof of pre-mandate work
  const deliverables = [
    { ref: "KAG-JRK-001", label: "Advisory Framework",   col: C.gold       },
    { ref: "KAG-JRK-002", label: "Launch Checklist",     col: C.amber      },
    { ref: "KAG-JRK-003", label: "Financial Study",      col: C.greenBright},
    { ref: "KAG-JRK-004", label: "Outreach System",      col: C.purple     },
    { ref: "KAG-JRK-005", label: "Competitive Analysis", col: C.red        },
    { ref: "KAG-JRK-006", label: "Brand Design Brief",   col: C.gold       },
    { ref: "KAG-JRK-007", label: "Manufacturer Brief",   col: C.amber      },
    { ref: "KAG-JRK-008", label: "Brand Study 88/100",   col: C.greenBright},
    { ref: "KAG-JRK-009", label: "Board Presentation",   col: C.purple     },
    { ref: "KAG-JRK-010", label: "Handoff Document",     col: C.red        },
    { ref: "KAG-JRK-MKT", label: "Digital Strategy",     col: C.teal       },
  ];

  // 3 summary-close proof claims — declarative, not bullet-listed
  const proofClaims = [
    {
      color: C.gold, label: "THE MARKET CLAIM",
      text: "Zero local beef jerky brands in Lebanon. The category is uncontested and available to its first owner — confirmed by Ru\u2019ya 360\u00b0 field research, June 2026.",
    },
    {
      color: C.greenBright, label: "THE BRAND CLAIM",
      text: "STRIKE scores 92/100 on name alone. Visual identity, technical brief, and designer brief are production-ready today. No contract was required to build any of it.",
    },
    {
      color: C.amber, label: "THE FINANCIAL CLAIM",
      text: "Tier 2: $40K\u2013$65K/mo by Month 12. Gross margin 61.9%. Breakeven Month 8\u201311. Every number field-corrected and verified against the Jack Link\u2019s benchmark.",
    },
  ];

  // YES vs WAIT — loss aversion framing: cost of inaction is 2x more motivating
  const verdict = [
    { yes: "Shelf-ready Q4 2026",           wait: "Q1 2027 at the earliest"       },
    { yes: "Category ownership \u2014 secured", wait: "Wild West Halal arrives first"   },
    { yes: "Phase 0 in 72 hours",           wait: "Another planning cycle begins"  },
  ];

  // 3 tiers — choice close: one binary decision, not an open-ended commitment
  const tiers = [
    {
      id: "TIER 1", name: "Lean Launch",       amount: "$18,500", color: C.amber,      rec: false,
      m12: "$22K\u2013$35K/mo", roi: "~160%", bep: "Month 10\u201314",
      phase0: [
        "SARL legal entity registration",
        "MoPH food product registration \u2014 1 SKU",
        "Trademark clearance \u2014 STRIKE Class 29 Lebanon",
        "Manufacturer supply agreement initiation",
        "20\u201330 gym account outreach activates Day 8",
      ],
    },
    {
      id: "TIER 2", name: "Standard Launch",   amount: "$42,000", color: C.gold,       rec: true,
      m12: "$40K\u2013$65K/mo", roi: "~280%", bep: "Month 8\u201311",
      phase0: [
        "SARL registration + full corporate structure",
        "MoPH registration \u2014 2 SKUs + Halal certification",
        "Trademark filing \u2014 Classes 29 & 35, Lebanon",
        "Brand designer formally briefed \u2014 8-week identity delivery",
        "Manufacturer supply agreement + QC protocol signed",
        "GS1 Lebanon barcode allocation \u2014 2 SKUs",
        "60+ account outreach activates Day 8",
      ],
    },
    {
      id: "TIER 3", name: "Full Market Entry", amount: "$82,000", color: C.greenBright, rec: false,
      m12: "$65K\u2013$110K/mo", roi: "~340%", bep: "Month 5\u20138",
      phase0: [
        "All Tier 2 elements running in parallel",
        "STRIKE STRIPS secondary line development begins",
        "Modern trade pre-engagement \u2014 Carrefour, Spinneys",
        "Digital infrastructure \u2014 full brand ecosystem live",
        "GCC trademark filing \u2014 UAE Class 29",
        "40-trainer founding ambassador programme",
      ],
    },
  ];

  // ── RENDER ────────────────────────────────────────────────────────────────

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>

      {/* Grid texture */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.022, backgroundImage: `linear-gradient(${C.gold} 1px,transparent 1px),linear-gradient(90deg,${C.gold} 1px,transparent 1px)`, backgroundSize: "36px 36px", pointerEvents: "none" }} />

      {/* Left accent bar */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(to bottom,transparent,${C.gold},transparent)`, zIndex: 2 }} />

      {/* ──────────────────────────────────────────────────────────────────────
          STRIP A · PROOF OF WORK
          Reciprocity trigger: 11 chips animate in — the wall of work lands
          before a single word is spoken about the mandate.
      ────────────────────────────────────────────────────────────────────── */}
      <div style={{
        flexShrink: 0,
        padding: isMobile ? "9px 16px 9px 20px" : "10px 36px 9px 36px",
        borderBottom: `1px solid ${C.ash}`,
        background: `${C.gold}04`,
        position: "relative", zIndex: 1,
      }}>
        <div style={{
          fontFamily: "monospace", fontSize: 7.5, color: C.gold,
          letterSpacing: "0.4em", marginBottom: 8, opacity: 0.72,
        }}>
          PROOF OF COMMITMENT \u00b7 11 DELIVERABLES COMPLETE \u00b7 BUILT BEFORE THIS CONTRACT EXISTS
        </div>
        <div style={{ display: "flex", gap: isMobile ? 4 : 5, flexWrap: "wrap" }}>
          {deliverables.map((d, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 4,
              background: `${d.col}0D`, border: `1px solid ${d.col}28`,
              borderRadius: 2, padding: "3px 9px",
              opacity: animIn ? 1 : 0,
              transform: animIn ? "translateY(0)" : "translateY(6px)",
              transition: `opacity 0.4s ease ${i * 0.045}s, transform 0.4s ease ${i * 0.045}s`,
            }}>
              <span style={{ color: d.col, fontSize: 9 }}>\u2713</span>
              <span style={{ fontFamily: "monospace", fontSize: 7, color: d.col, opacity: 0.6 }}>{d.ref}</span>
              <span style={{ fontSize: 10, color: C.creamDim }}>{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          BODY · Two columns
      ────────────────────────────────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1.1fr",
        minHeight: 0, position: "relative", zIndex: 1, overflow: "hidden",
      }}>

        {/* ── LEFT · Summary close + cost-of-inaction ── */}
        <div style={{
          padding: isMobile ? "14px 16px" : "16px 24px 14px 36px",
          display: "flex", flexDirection: "column", gap: 9,
          borderRight: isMobile ? "none" : `1px solid ${C.ash}`,
          overflowY: "auto", WebkitOverflowScrolling: "touch",
        }}>

          <div style={{ fontFamily: "monospace", fontSize: 8, color: C.gold, letterSpacing: "0.3em" }}>
            THE CASE \u2014 CLOSED
          </div>

          {/* 3 proof claims — summary close: three assertions, each a headline */}
          {proofClaims.map((p, i) => (
            <div key={i} style={{
              padding: "9px 13px",
              background: `${p.color}08`,
              border: `1px solid ${p.color}1E`,
              borderLeft: `3px solid ${p.color}`,
              borderRadius: 3,
              opacity: animIn ? 1 : 0,
              transform: animIn ? "translateX(0)" : "translateX(-10px)",
              transition: `opacity 0.5s ease ${0.2 + i * 0.1}s, transform 0.5s ease ${0.2 + i * 0.1}s`,
            }}>
              <div style={{
                fontFamily: "monospace", fontSize: 7.5, color: p.color,
                letterSpacing: "0.18em", marginBottom: 4,
              }}>{p.label}</div>
              <p style={{ margin: 0, fontSize: isMobile ? 11.5 : 12.5, color: C.cream, lineHeight: 1.65 }}>{p.text}</p>
            </div>
          ))}

          {/* YES vs WAIT table — cost-of-inaction: loss aversion 2x more motivating than gain */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 7 }}>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: C.red, letterSpacing: "0.3em" }}>
              YES VS. WAIT \u2014 THE REAL COST
            </div>
            <div style={{ flex: 1, border: `1px solid ${C.ash}`, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>

                {/* Column headers */}
                <div style={{ padding: "6px 10px", background: `${C.greenBright}12`, borderBottom: `1px solid ${C.ash}` }}>
                  <div style={{ fontFamily: "monospace", fontSize: 8, color: C.greenBright, letterSpacing: "0.15em" }}>SIGN TODAY</div>
                </div>
                <div style={{ padding: "6px 10px", background: `${C.red}10`, borderBottom: `1px solid ${C.ash}`, borderLeft: `1px solid ${C.ash}` }}>
                  <div style={{ fontFamily: "monospace", fontSize: 8, color: C.red, letterSpacing: "0.15em" }}>IF YOU WAIT</div>
                </div>

                {/* Rows — flatMap avoids React.Fragment dependency */}
                {verdict.flatMap((row, ri) => [
                  <div key={`y${ri}`} style={{
                    padding: "8px 10px", background: `${C.greenBright}06`,
                    borderTop: `1px solid ${C.ash}`,
                    display: "flex", gap: 6, alignItems: "flex-start",
                  }}>
                    <span style={{ color: C.greenBright, fontSize: 10, flexShrink: 0, marginTop: 1 }}>\u2713</span>
                    <span style={{ fontSize: isMobile ? 10.5 : 11.5, color: C.cream, lineHeight: 1.45 }}>{row.yes}</span>
                  </div>,
                  <div key={`w${ri}`} style={{
                    padding: "8px 10px", background: `${C.red}06`,
                    borderTop: `1px solid ${C.ash}`, borderLeft: `1px solid ${C.ash}`,
                    display: "flex", gap: 6, alignItems: "flex-start",
                  }}>
                    <span style={{ color: C.red, fontSize: 10, flexShrink: 0, marginTop: 1 }}>\u2717</span>
                    <span style={{ fontSize: isMobile ? 10.5 : 11.5, color: C.creamDim, lineHeight: 1.45 }}>{row.wait}</span>
                  </div>,
                ])}

              </div>
            </div>
          </div>

        </div>

        {/* ── RIGHT · Tier selector (choice close + assumptive close) ── */}
        <div style={{
          padding: isMobile ? "14px 16px" : "16px 36px 14px 24px",
          display: "flex", flexDirection: "column", gap: 7,
          overflowY: "auto", WebkitOverflowScrolling: "touch",
        }}>

          <div style={{ fontFamily: "monospace", fontSize: 8, color: C.greenBright, letterSpacing: "0.3em", marginBottom: 3 }}>
            ONE DECISION \u2014 SELECT YOUR TIER
          </div>

          {tiers.map((t, i) => (
            <div key={i}>
              {/* Tier button */}
              <button
                onClick={() => setSelectedTier(i)}
                style={{
                  width: "100%", textAlign: "left", cursor: "pointer",
                  background: selectedTier === i ? `${t.color}12` : C.charcoal,
                  border: `1px solid ${selectedTier === i ? t.color : C.ash}`,
                  borderTop: `3px solid ${selectedTier === i ? t.color : C.ash}`,
                  borderRadius: selectedTier === i ? "3px 3px 0 0" : 3,
                  padding: isMobile ? "10px 12px" : "11px 16px",
                  transition: "all 0.2s ease", position: "relative",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {t.rec && (
                  <div style={{
                    position: "absolute", top: -9, left: "50%", transform: "translateX(-50%)",
                    background: C.gold, color: C.obsidian,
                    fontFamily: "monospace", fontSize: 8, fontWeight: 700,
                    padding: "2px 12px", borderRadius: 2, whiteSpace: "nowrap",
                    letterSpacing: "0.05em", zIndex: 1,
                  }}>Ru\u2019ya 360\u00b0 RECOMMENDS</div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontFamily: "monospace", fontSize: 9, color: t.color, letterSpacing: "0.2em", opacity: 0.85 }}>{t.id}</span>
                    <span style={{ fontSize: isMobile ? 13 : 14.5, color: selectedTier === i ? C.cream : C.creamDim }}>{t.name}</span>
                  </div>
                  <span style={{ fontFamily: "monospace", fontSize: isMobile ? 17 : 22, color: t.color, letterSpacing: "-0.02em" }}>{t.amount}</span>
                </div>

                {/* KPI micro-row — only on selected tier */}
                {selectedTier === i && (
                  <div style={{ display: "flex", gap: 16, marginTop: 7, flexWrap: "wrap" }}>
                    {[
                      { label: "M12 REVENUE", val: t.m12 },
                      { label: "YEAR 1 ROI",  val: t.roi  },
                      { label: "BREAKEVEN",   val: t.bep  },
                    ].map((m, mi) => (
                      <div key={mi}>
                        <div style={{ fontFamily: "monospace", fontSize: 7.5, color: C.creamDim, letterSpacing: "0.1em", marginBottom: 2 }}>{m.label}</div>
                        <div style={{ fontFamily: "monospace", fontSize: isMobile ? 11 : 12.5, color: t.color }}>{m.val}</div>
                      </div>
                    ))}
                  </div>
                )}
              </button>

              {/* Phase 0 expansion panel — assumptive close: shows them what's already in motion */}
              {selectedTier === i && (
                <div style={{
                  background: `${t.color}06`,
                  border: `1px solid ${t.color}1E`, borderTop: "none",
                  borderRadius: "0 0 3px 3px", padding: "10px 14px",
                }}>
                  <div style={{ fontFamily: "monospace", fontSize: 7.5, color: t.color, letterSpacing: "0.22em", marginBottom: 8 }}>
                    PHASE 0 ACTIVATES \u00b7 72 HOURS FROM SIGNING
                  </div>
                  {t.phase0.map((step, si) => (
                    <div key={si} style={{ display: "flex", gap: 7, marginBottom: 5 }}>
                      <span style={{ color: t.color, fontSize: 10, flexShrink: 0, marginTop: 2 }}>\u2192</span>
                      <span style={{ fontSize: isMobile ? 11 : 12, color: C.creamDim, lineHeight: 1.5 }}>{step}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Mandate control — MENA closing norm: client retains authority and visibility */}
          <div style={{ marginTop: "auto", padding: "9px 13px", background: `${C.amber}08`, border: `1px solid ${C.amber}1E`, borderRadius: 3 }}>
            <div style={{ fontFamily: "monospace", fontSize: 7.5, color: C.amber, letterSpacing: "0.2em", marginBottom: 7 }}>
              YOUR CONTROL \u00b7 BUILT INTO THE MANDATE
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { freq: "WEEKLY",      desc: "Field activity report"  },
                { freq: "MONTHLY",     desc: "P&L vs. approved plan"  },
                { freq: "PHASE GATES", desc: "Your sign-off required" },
              ].map((r, ri) => (
                <div key={ri} style={{ display: "flex", gap: 5, alignItems: "center" }}>
                  <span style={{
                    fontFamily: "monospace", fontSize: 7.5, color: C.amber,
                    background: `${C.amber}15`, border: `1px solid ${C.amber}28`,
                    padding: "1px 6px", borderRadius: 2, whiteSpace: "nowrap",
                  }}>{r.freq}</span>
                  <span style={{ fontSize: 10.5, color: C.creamDim }}>{r.desc}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────
          FOOTER · THE ONE DECISION
          Peak-end rule: this is the last visual the board sees and retains.
          The written ask + silence instruction + 72-hour activation.
          Whoever speaks after this line owns the next 72 hours.
      ────────────────────────────────────────────────────────────────────── */}
      <div style={{
        flexShrink: 0,
        borderTop: `2px solid ${C.gold}38`,
        background: `linear-gradient(to right,${C.gold}10,${C.gold}07,${C.gold}04)`,
        padding: isMobile ? "13px 20px" : "15px 36px",
        position: "relative", zIndex: 1,
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          gap: 20, flexWrap: isMobile ? "wrap" : "nowrap",
        }}>

          {/* The question — stated once, in writing, at full visual weight */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "monospace", fontSize: 7.5, color: C.gold,
              letterSpacing: "0.42em", marginBottom: 6, opacity: 0.65,
            }}>
              THE QUESTION \u2014 STATED ONCE \u00b7 THEN SILENCE
            </div>
            <p style={{
              margin: 0,
              fontSize: isMobile ? 15 : 20,
              color: C.gold,
              fontFamily: "Georgia,'Times New Roman',serif",
              fontStyle: "italic", lineHeight: 1.35,
            }}>
              \u201cWhich tier do we start with \u2014 and shall we sign today?\u201d
            </p>
          </div>

          {/* Activation + presenter directive */}
          <div style={{
            textAlign: "right", flexShrink: 0,
            borderLeft: `1px solid ${C.gold}28`, paddingLeft: 24,
          }}>
            <div style={{ fontFamily: "monospace", fontSize: 7.5, color: C.creamDim, letterSpacing: "0.15em", marginBottom: 5 }}>
              PHASE 0 ACTIVATION
            </div>
            <div style={{ fontFamily: "monospace", fontSize: isMobile ? 14 : 19, color: C.greenBright, fontWeight: 700, letterSpacing: "0.04em" }}>
              72 HRS \u00b7 SIGN TODAY
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 7.5, color: C.creamDim, marginTop: 5, opacity: 0.38, letterSpacing: "0.12em" }}>
              PRESENTER: DELIVER. THEN STOP TALKING.
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
```

---

## REPLACEMENT 2 — Updated SLIDES `whatnow` Entry

Find the `whatnow` object in the SLIDES array (last entry before the closing `]`)
and replace it entirely with this:

```javascript
{
  id: "whatnow", type: "whatnow", label: "WHAT NOW?",
  notes: {
    open: "This is the close. Do not pitch. Do not narrate the slide. Let the structure carry the weight of what was delivered in the last 60 minutes. Move through the three zones deliberately: gesture to the 11 proof chips at the top (say nothing, let them read the names); point to the three proof claims (one sentence each, then stop); let the YES vs WAIT table sit on screen for 10 full seconds in silence — let the board read every row. Then select Tier 2 on the tier selector (pre-select it before walking into the room). The Phase 0 steps expand. Let them sit. Then look up, deliver the footer question clearly and slowly, and stop talking entirely.",
    emphasis: [
      "SILENCE IS THE CLOSE. After the closing question, stop. The first person to speak after the question has lost the initiative. Research shows undecided buyers rarely hold silence beyond 30\u201340 seconds. Hold it. Bite the inside of your lip if needed. A slow sip of water is your cover. Keep open, relaxed body language, a slight forward lean, and sustained eye contact. Do not fill the pause.",
      "If asked about timeline: \u2018Phase 0 activates within 72 hours of the mandate being signed.\u2019 That is the complete answer. Do not add to it.",
      "If asked which tier: \u2018Tier 2 is where serious commercial intent meets financial discipline \u2014 enough to execute correctly, not more than is needed to prove the concept.\u2019 Then silence again.",
      "If he does not commit today: show no disappointment. Say: \u2018I will leave everything with you. The mandate is the only outstanding document.\u2019 Leave all eleven deliverables and a printed mandate summary on the table. The work is the closer.",
    ],
    timing: "4 minutes \u2014 deliver the question \u2014 then unlimited silence"
  }
}
```

---

## DESIGN RATIONALE — For the Record

### What was wrong with the original WhatNowSlide

| Problem | Research Verdict |
|---|---|
| Proof of work listed as 4 text bullets | Invisible — no visual weight, no reciprocity impact |
| Three steps are operational, not emotional | Decision-fatigue: doesn't reduce to a single ask |
| No cost-of-inaction contrast | Missing 2× loss-aversion lever entirely |
| Tier selector absent from closing slide | Tier decision was buried earlier in deck |
| Closing quote buried below reporting cadence | Peak-end rule violated: final visual is noise |
| No written ask | Hopkins rule: the ask must be in writing on the last slide |
| No silence instruction visible | Presenter has no in-slide reminder of the most critical technique |

### What the new design does

| Element | Methodology Applied |
|---|---|
| 11 animated deliverable chips | Cialdini reciprocity: pre-mandate work creates obligation to reciprocate |
| 3 declarative proof claims | Summary close: state the case, don't re-argue it |
| YES vs WAIT two-column table | Loss aversion (Kahneman & Tversky): cost of delay is 2× more motivating than upside |
| Interactive tier selector | Choice close + assumptive close: asks *which*, not *if* |
| Phase 0 expansion panel | Assumptive close: the engagement is already in motion in the board's mind |
| Mandate control cadence | MENA norm: Lebanese counterpart retains authority and visible control |
| Gold footer with written ask | Hopkins/Tracy: the ask must be in writing; peak-end rule: last visual defines memory |
| "DELIVER. THEN STOP TALKING." | Voss: 4-second pause minimum; Hopkins: 30–40 seconds of silence is normal; Tracy: first to speak is the loser |

---

*Ru'ya 360° Advisory Group · STRIKE BITES · Confidential · June 2026*

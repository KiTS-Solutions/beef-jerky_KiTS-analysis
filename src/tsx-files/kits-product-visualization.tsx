import { useState, useEffect } from "react";

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

const BRAND = "[BRAND NAME]";
const FLAVOR = "Lebanese BBQ";
const FLAVOR_AR = "شواء لبناني";
const FLAVOR_FR = "BBQ Libanais";

const GOLD = "#C8A96E";
const DARK = "#0F0D0A";
const CREAM = "#EDE6D6";
const GREEN = "#3A6B4A";
const CHARCOAL = "#1C1914";

// ─── NUTRITIONAL DATA (placeholders pending lab) ──────────────────────────────
const NUTRITION = {
  servingSize: "[X]g",
  servings: { single: "1", multi: "~4" },
  calories: "[X]",
  protein: "[X]g",
  totalFat: "[X]g",
  satFat: "[X]g",
  totalCarbs: "[X]g",
  sugars: "0g",
  addedSugars: "0g",
  sodium: "[X]mg",
  fibre: "[X]g",
};

const INGREDIENTS = {
  en: "BEEF, SALT, ALEPPO PEPPER, SUMAC, DRIED GARLIC, DRIED ONION, NATURAL HARDWOOD SMOKE.",
  ar: "لحم بقري، ملح، فلفل حلبي، سماق، ثوم مجفف، بصل مجفف، دخان خشب طبيعي.",
  fr: "BŒUF, SEL, POIVRE D'ALEP, SUMAC, AIL DÉSHYDRATÉ, OIGNON DÉSHYDRATÉ, FUMÉE DE BOIS NATUREL.",
};

const CLAIMS = [
  { en: "NO ADDED SUGAR", ar: "بدون سكر مضاف", fr: "SANS SUCRE AJOUTÉ" },
  { en: "NO ARTIFICIAL PRESERVATIVES", ar: "بدون مواد حافظة صناعية", fr: "SANS CONSERVATEURS ARTIFICIELS" },
  { en: "HIGH PROTEIN", ar: "غني بالبروتين", fr: "RICHE EN PROTÉINES" },
];

// ─── SINGLE-SERVE FRONT PANEL ─────────────────────────────────────────────────
function SingleFront() {
  return (
    <g>
      {/* Bag body fill */}
      <rect x="0" y="0" width="300" height="480" fill={DARK} rx="18" />

      {/* Top texture band */}
      <rect x="0" y="0" width="300" height="60" fill={CHARCOAL} rx="18" />
      <rect x="0" y="42" width="300" height="18" fill={DARK} />

      {/* Grain overlay pattern */}
      {Array.from({ length: 28 }).map((_, i) => (
        <line key={i} x1={i * 12} y1="0" x2={i * 12 - 30} y2="480"
          stroke="#FFFFFF" strokeWidth="0.15" strokeOpacity="0.03" />
      ))}

      {/* Tear notch */}
      <circle cx="272" cy="32" r="5" fill="#0A0806" />
      <line x1="272" y1="27" x2="272" y2="37" stroke={GOLD} strokeWidth="0.5" strokeOpacity="0.5" />

      {/* Ref code */}
      <text x="18" y="22" fill={GOLD} opacity="0.5"
        fontFamily="'Courier New', monospace" fontSize="7" letterSpacing="2">
        KAG-JRK · SKU-01
      </text>
      <text x="18" y="34" fill={CREAM} opacity="0.25"
        fontFamily="'Courier New', monospace" fontSize="7" letterSpacing="1">
        SINGLE SERVE · AMBIENT
      </text>

      {/* Halal badge — top right */}
      <g transform="translate(222, 64)">
        <circle cx="22" cy="22" r="22" fill={GREEN} />
        <circle cx="22" cy="22" r="19" fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.4" />
        <text x="22" y="17" textAnchor="middle" fill="white"
          fontFamily="Georgia, serif" fontSize="9" fontWeight="bold">حلال</text>
        <text x="22" y="27" textAnchor="middle" fill="white"
          fontFamily="'Courier New', monospace" fontSize="6.5" letterSpacing="0.5">HALAL</text>
        <text x="22" y="36" textAnchor="middle" fill="white"
          fontFamily="Georgia, serif" fontSize="5.5" opacity="0.8">DAR AL-FATWA</text>
      </g>

      {/* Gold accent line — top */}
      <rect x="18" y="58" width="190" height="1.5" fill={GOLD} opacity="0.8" rx="1" />

      {/* BRAND NAME — primary hero */}
      <text x="18" y="105" fill={CREAM}
        fontFamily="'Didot', 'Bodoni MT', 'Playfair Display', Georgia, serif"
        fontSize="52" fontWeight="400" letterSpacing="6">
        STRiKE
      </text>

      {/* Brand name Arabic — smaller, below */}
      <text x="18" y="126" fill={GOLD} opacity="0.6"
        fontFamily="Georgia, serif" fontSize="13" letterSpacing="1"
        direction="ltr">
        ⬛ PENDING BOARD APPROVAL ⬛
      </text>

      {/* Separator */}
      <rect x="18" y="136" width="264" height="0.8" fill={GOLD} opacity="0.2" rx="1" />

      {/* PROTEIN — the hero number */}
      <text x="18" y="200" fill={GOLD}
        fontFamily="'Didot', 'Bodoni MT', Georgia, serif"
        fontSize="88" fontWeight="400" letterSpacing="-2">
        [X]g
      </text>
      <text x="18" y="224" fill={CREAM} opacity="0.9"
        fontFamily="'Courier New', monospace"
        fontSize="13" letterSpacing="5">
        PROTEIN
      </text>
      <text x="18" y="239" fill={CREAM} opacity="0.4"
        fontFamily="'Courier New', monospace"
        fontSize="8" letterSpacing="3">
        بروتين · PROTÉINE
      </text>

      {/* Calorie line */}
      <rect x="18" y="250" width="264" height="0.8" fill={CREAM} opacity="0.1" rx="1" />
      <text x="18" y="270" fill={CREAM} opacity="0.7"
        fontFamily="'Courier New', monospace" fontSize="11" letterSpacing="2">
        [X] CALORIES PER SERVING
      </text>

      {/* Flavor name */}
      <rect x="18" y="282" width="264" height="38" fill={GOLD} opacity="0.08" rx="4" />
      <rect x="18" y="282" width="4" height="38" fill={GOLD} rx="2" />
      <text x="30" y="298" fill={GOLD}
        fontFamily="'Didot', 'Playfair Display', Georgia, serif"
        fontSize="14" letterSpacing="2">
        {FLAVOR}
      </text>
      <text x="30" y="313" fill={GOLD} opacity="0.6"
        fontFamily="Georgia, serif" fontSize="11">
        {FLAVOR_AR} · {FLAVOR_FR}
      </text>

      {/* Clean label claims strip */}
      <rect x="0" y="334" width="300" height="60" fill={CHARCOAL} />
      <rect x="0" y="334" width="300" height="1" fill={GOLD} opacity="0.3" />
      <rect x="0" y="393" width="300" height="1" fill={GOLD} opacity="0.3" />

      {CLAIMS.map((c, i) => (
        <g key={i} transform={`translate(${10 + i * 94}, 344)`}>
          <rect x="0" y="0" width="88" height="40" rx="3"
            fill={GOLD} fillOpacity="0.07"
            stroke={GOLD} strokeWidth="0.5" strokeOpacity="0.3" />
          <text x="44" y="14" textAnchor="middle" fill={GREEN}
            fontFamily="'Courier New', monospace" fontSize="5.5" letterSpacing="0.5">
            ✓
          </text>
          <text x="44" y="24" textAnchor="middle" fill={CREAM}
            fontFamily="'Courier New', monospace" fontSize="5.5" letterSpacing="0.3">
            {c.en.length > 14 ? c.en.slice(0, 14) + "…" : c.en}
          </text>
          <text x="44" y="34" textAnchor="middle" fill={CREAM} opacity="0.4"
            fontFamily="Georgia, serif" fontSize="5">
            {c.ar}
          </text>
        </g>
      ))}

      {/* Made in Lebanon */}
      <text x="18" y="418" fill={CREAM} opacity="0.5"
        fontFamily="'Courier New', monospace" fontSize="7.5" letterSpacing="2">
        MADE IN LEBANON · صنع في لبنان · FABRIQUÉ AU LIBAN
      </text>

      {/* Bottom regulatory strip */}
      <rect x="0" y="428" width="300" height="52" fill="#0A0806" rx="0" />
      <rect x="0" y="428" width="300" height="1" fill={GOLD} opacity="0.15" />

      {/* MoPH */}
      <text x="18" y="444" fill={CREAM} opacity="0.35"
        fontFamily="'Courier New', monospace" fontSize="6.5" letterSpacing="1">
        MoPH REG. NO: [PENDING] · HALAL CERT: [PENDING]
      </text>

      {/* Barcode area */}
      <rect x="18" y="450" width="60" height="22" fill="#FFFFFF" rx="1" />
      {Array.from({ length: 22 }).map((_, i) => (
        <rect key={i} x={20 + i * 2.5} y="452"
          width={i % 3 === 0 ? 1.5 : 0.8}
          height={i % 5 === 0 ? 18 : 14}
          fill={DARK} />
      ))}
      <text x="48" y="477" textAnchor="middle" fill={DARK}
        fontFamily="'Courier New', monospace" fontSize="4">
        [GS1 PENDING]
      </text>

      {/* Net weight */}
      <text x="88" y="460" fill={CREAM} opacity="0.4"
        fontFamily="'Courier New', monospace" fontSize="7" letterSpacing="1">
        NET WT: [X]g
      </text>
      <text x="88" y="472" fill={CREAM} opacity="0.25"
        fontFamily="'Courier New', monospace" fontSize="6">
        BEST BEFORE: SEE PACK
      </text>

      {/* RU2YA watermark */}
      <text x="240" y="475" fill={GOLD} opacity="0.2"
        fontFamily="'Courier New', monospace" fontSize="6" letterSpacing="1">
        RU2YA ADVISORY
      </text>

      {/* Bottom radius cover */}
      <rect x="0" y="462" width="300" height="18" fill="#0A0806" />
      <path d="M0,462 L0,480 Q0,480 18,480 L282,480 Q300,480 300,480 L300,462 Z"
        fill="#0A0806" />

      {/* Sheen highlight */}
      <linearGradient id="sheen1" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="white" stopOpacity="0" />
        <stop offset="30%" stopColor="white" stopOpacity="0.04" />
        <stop offset="60%" stopColor="white" stopOpacity="0.02" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <rect x="0" y="0" width="300" height="480" fill="url(#sheen1)" rx="18" />

      {/* Edge shadow left */}
      <linearGradient id="edgeL" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="black" stopOpacity="0.5" />
        <stop offset="100%" stopColor="black" stopOpacity="0" />
      </linearGradient>
      <rect x="0" y="0" width="30" height="480" fill="url(#edgeL)" rx="18" />

      {/* Edge shadow right */}
      <linearGradient id="edgeR" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="black" stopOpacity="0" />
        <stop offset="100%" stopColor="black" stopOpacity="0.5" />
      </linearGradient>
      <rect x="270" y="0" width="30" height="480" fill="url(#edgeR)" rx="18" />
    </g>
  );
}

// ─── SINGLE-SERVE BACK PANEL ──────────────────────────────────────────────────
function SingleBack() {
  return (
    <g>
      <rect x="0" y="0" width="300" height="480" fill={DARK} rx="18" />
      <rect x="0" y="0" width="300" height="40" fill={CHARCOAL} rx="18" />
      <rect x="0" y="28" width="300" height="12" fill={DARK} />

      {/* Grain */}
      {Array.from({ length: 28 }).map((_, i) => (
        <line key={i} x1={i * 12} y1="0" x2={i * 12 - 30} y2="480"
          stroke="#FFFFFF" strokeWidth="0.15" strokeOpacity="0.03" />
      ))}

      <text x="18" y="22" fill={GOLD} opacity="0.5"
        fontFamily="'Courier New', monospace" fontSize="7" letterSpacing="2">
        {BRAND} · BACK PANEL
      </text>

      {/* Tagline */}
      <rect x="18" y="44" width="264" height="32" fill={GOLD} fillOpacity="0.07" rx="3" />
      <rect x="18" y="44" width="264" height="1" fill={GOLD} opacity="0.5" />
      <rect x="18" y="75" width="264" height="1" fill={GOLD} opacity="0.2" />
      <text x="150" y="57" textAnchor="middle" fill={CREAM}
        fontFamily="'Didot', Georgia, serif" fontSize="10" letterSpacing="1.5">
        Real meat. Real protein. Nothing else.
      </text>
      <text x="150" y="70" textAnchor="middle" fill={CREAM} opacity="0.4"
        fontFamily="Georgia, serif" fontSize="8.5">
        لحم حقيقي. بروتين حقيقي. لا شيء آخر. · Vraie viande. Vraie protéine. Rien d'autre.
      </text>

      {/* NUTRITIONAL TABLE */}
      <text x="18" y="96" fill={CREAM} opacity="0.9"
        fontFamily="'Courier New', monospace" fontSize="8" letterSpacing="2">
        NUTRITION FACTS · معلومات غذائية · VALEURS NUTRITIVES
      </text>
      <rect x="18" y="100" width="264" height="1.5" fill={CREAM} opacity="0.6" />

      {/* Serving info */}
      <text x="18" y="114" fill={CREAM} opacity="0.7"
        fontFamily="'Courier New', monospace" fontSize="7.5">
        Serving size: {NUTRITION.servingSize} · حجم الحصة · Portion: {NUTRITION.servingSize}
      </text>
      <text x="18" y="126" fill={CREAM} opacity="0.5"
        fontFamily="'Courier New', monospace" fontSize="7">
        Servings per pack: {NUTRITION.servings.single} · حصة واحدة · 1 portion
      </text>

      <rect x="18" y="130" width="264" height="0.8" fill={CREAM} opacity="0.3" />

      {/* Calories row — big */}
      <rect x="18" y="131" width="264" height="28" fill={CREAM} fillOpacity="0.05" />
      <text x="22" y="149" fill={CREAM} opacity="0.9"
        fontFamily="'Courier New', monospace" fontSize="9" letterSpacing="1">
        Calories · سعرات · Calories
      </text>
      <text x="278" y="149" textAnchor="end" fill={GOLD}
        fontFamily="'Courier New', monospace" fontSize="16" fontWeight="bold">
        {NUTRITION.calories}
      </text>

      {/* Nutrient rows */}
      {[
        { label: "Total Fat · دهون · Lipides", value: NUTRITION.totalFat, indent: false, bold: false },
        { label: "  Saturated Fat · مشبعة · Saturés", value: NUTRITION.satFat, indent: true, bold: false },
        { label: "Total Carbohydrate · كربوهيدرات · Glucides", value: NUTRITION.totalCarbs, indent: false, bold: false },
        { label: "  Total Sugars · سكريات · Sucres", value: NUTRITION.sugars, indent: true, bold: false },
        { label: "  Includes Added Sugars · مضاف · Ajoutés", value: NUTRITION.addedSugars, indent: true, bold: false, highlight: true },
        { label: "Protein · بروتين · Protéines", value: NUTRITION.protein, indent: false, bold: true },
        { label: "Sodium · صوديوم · Sodium", value: NUTRITION.sodium, indent: false, bold: false },
        { label: "Dietary Fibre · ألياف · Fibres", value: NUTRITION.fibre, indent: false, bold: false },
      ].map((row, i) => (
        <g key={i}>
          <rect x="18" y={159 + i * 17} width="264" height="17"
            fill={row.highlight ? GREEN : (i % 2 === 0 ? CREAM : "transparent")}
            fillOpacity={row.highlight ? "0.15" : "0.03"} />
          <text x={row.indent ? 28 : 22} y={171 + i * 17}
            fill={row.highlight ? GREEN : CREAM}
            opacity={row.highlight ? 1 : 0.7}
            fontFamily="'Courier New', monospace"
            fontSize="6.5"
            fontWeight={row.bold ? "bold" : "normal"}>
            {row.label}
          </text>
          <text x="278" y={171 + i * 17} textAnchor="end"
            fill={row.bold ? GOLD : (row.highlight ? GREEN : CREAM)}
            opacity={row.highlight ? 1 : (row.bold ? 1 : 0.8)}
            fontFamily="'Courier New', monospace"
            fontSize={row.bold ? "8" : "7"}
            fontWeight={row.bold ? "bold" : "normal"}>
            {row.value}
          </text>
          <rect x="18" y={175 + i * 17} width="264" height="0.5"
            fill={CREAM} opacity="0.08" />
        </g>
      ))}

      <rect x="18" y="295" width="264" height="1.5" fill={CREAM} opacity="0.4" />

      {/* Zero sugar callout */}
      <rect x="18" y="299" width="264" height="22" fill={GREEN} fillOpacity="0.12" rx="3" />
      <rect x="18" y="299" width="3" height="22" fill={GREEN} rx="1" />
      <text x="28" y="308" fill={GREEN}
        fontFamily="'Courier New', monospace" fontSize="7" letterSpacing="1">
        ✓ 0g ADDED SUGAR  ✓ بدون سكر مضاف  ✓ 0g SUCRE AJOUTÉ
      </text>
      <text x="28" y="317" fill={GREEN} opacity="0.7"
        fontFamily="'Courier New', monospace" fontSize="6">
        No artificial sweeteners · بدون محليات صناعية · Sans édulcorants artificiels
      </text>

      {/* INGREDIENTS */}
      <text x="18" y="336" fill={CREAM} opacity="0.8"
        fontFamily="'Courier New', monospace" fontSize="7" letterSpacing="1.5">
        INGREDIENTS:
      </text>
      <foreignObject x="18" y="340" width="264" height="44">
        {/*<div xmlns="http://www.w3.org/1999/xhtml" style={{
          color: `${CREAM}99`, fontFamily: "'Courier New', monospace",
          fontSize: "6.5px", lineHeight: "1.6", letterSpacing: "0.2px"
        }}>
          {INGREDIENTS.en}
        </div>*/}
      </foreignObject>

      <text x="18" y="390" fill={CREAM} opacity="0.4"
        fontFamily="Georgia, serif" fontSize="6.5" direction="rtl" textAnchor="end" /*x="282"*/>
        {INGREDIENTS.ar}
      </text>

      {/* Allergen */}
      <rect x="18" y="395" width="264" height="14" fill={CREAM} fillOpacity="0.04" rx="2" />
      <text x="22" y="405" fill={CREAM} opacity="0.6"
        fontFamily="'Courier New', monospace" fontSize="6.5" fontWeight="bold">
        ALLERGENS: NONE DECLARED · لا يحتوي على مسببات الحساسية
      </text>

      {/* Manufacturer + storage */}
      <text x="18" y="420" fill={CREAM} opacity="0.3"
        fontFamily="'Courier New', monospace" fontSize="6">
        DISTRIBUTED BY: RU2YA ADVISORY GROUP, BEIRUT, LEBANON
      </text>
      <text x="18" y="430" fill={CREAM} opacity="0.3"
        fontFamily="'Courier New', monospace" fontSize="6">
        STORE IN A COOL DRY PLACE BELOW 25°C · CONSUME IMMEDIATELY AFTER OPENING
      </text>

      {/* Country of origin */}
      <text x="18" y="441" fill={CREAM} opacity="0.3"
        fontFamily="'Courier New', monospace" fontSize="6" letterSpacing="0.5">
        COUNTRY OF ORIGIN: LEBANON · بلد المنشأ: لبنان · ORIGINE: LIBAN
      </text>

      {/* Barcode */}
      <rect x="200" y="410" width="72" height="40" fill="#FFFFFF" rx="2" />
      {Array.from({ length: 28 }).map((_, i) => (
        <rect key={i} x={203 + i * 2.2} y="413"
          width={i % 3 === 0 ? 1.5 : 0.8}
          height={i % 5 === 0 ? 30 : 24}
          fill={DARK} />
      ))}
      <text x="236" y="453" textAnchor="middle" fill={DARK}
        fontFamily="'Courier New', monospace" fontSize="4.5">
        [GS1 BARCODE PENDING]
      </text>

      {/* Bottom */}
      <rect x="0" y="455" width="300" height="25" fill="#0A0806" />
      <text x="150" y="468" textAnchor="middle" fill={GOLD} opacity="0.2"
        fontFamily="'Courier New', monospace" fontSize="6" letterSpacing="2">
        RU2YA ADVISORY GROUP · KAG-JRK-001 · CONFIDENTIAL
      </text>

      {/* Edges */}
      <linearGradient id="sheenB" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="white" stopOpacity="0.04" />
        <stop offset="50%" stopColor="white" stopOpacity="0.01" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <rect x="0" y="0" width="300" height="480" fill="url(#sheenB)" rx="18" />
      <linearGradient id="edgeLB" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="black" stopOpacity="0.5" />
        <stop offset="100%" stopColor="black" stopOpacity="0" />
      </linearGradient>
      <rect x="0" y="0" width="30" height="480" fill="url(#edgeLB)" rx="18" />
      <linearGradient id="edgeRB" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="black" stopOpacity="0" />
        <stop offset="100%" stopColor="black" stopOpacity="0.5" />
      </linearGradient>
      <rect x="270" y="0" width="30" height="480" fill="url(#edgeRB)" rx="18" />
    </g>
  );
}

// ─── MULTI-SERVE FRONT PANEL ──────────────────────────────────────────────────
function MultiFront() {
  return (
    <g>
      <rect x="0" y="0" width="360" height="560" fill={DARK} rx="20" />
      <rect x="0" y="0" width="360" height="70" fill={CHARCOAL} rx="20" />
      <rect x="0" y="52" width="360" height="18" fill={DARK} />

      {/* Grain */}
      {Array.from({ length: 34 }).map((_, i) => (
        <line key={i} x1={i * 12} y1="0" x2={i * 12 - 40} y2="560"
          stroke="#FFFFFF" strokeWidth="0.15" strokeOpacity="0.03" />
      ))}

      {/* Zipper reseal indicator */}
      <rect x="20" y="56" width="320" height="10" fill={CHARCOAL} rx="3" />
      <rect x="20" y="56" width="320" height="10" fill="none"
        stroke={GOLD} strokeWidth="0.6" strokeOpacity="0.4" rx="3" />
      <text x="180" y="64" textAnchor="middle" fill={GOLD} opacity="0.5"
        fontFamily="'Courier New', monospace" fontSize="5.5" letterSpacing="2">
        ↔ RESEAL AFTER OPENING · أعد الإغلاق بعد الفتح · REFERMER APRÈS OUVERTURE ↔
      </text>

      {/* Ref */}
      <text x="22" y="26" fill={GOLD} opacity="0.5"
        fontFamily="'Courier New', monospace" fontSize="7" letterSpacing="2">
        KAG-JRK · SKU-02 · MULTI-SERVE
      </text>
      <text x="22" y="40" fill={CREAM} opacity="0.2"
        fontFamily="'Courier New', monospace" fontSize="7" letterSpacing="1">
        RESEALABLE · AMBIENT STORAGE · [X] SERVINGS
      </text>

      {/* Halal badge */}
      <g transform="translate(276, 76)">
        <circle cx="28" cy="28" r="28" fill={GREEN} />
        <circle cx="28" cy="28" r="24" fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeOpacity="0.4" />
        <text x="28" y="22" textAnchor="middle" fill="white"
          fontFamily="Georgia, serif" fontSize="11" fontWeight="bold">حلال</text>
        <text x="28" y="33" textAnchor="middle" fill="white"
          fontFamily="'Courier New', monospace" fontSize="8" letterSpacing="0.5">HALAL</text>
        <text x="28" y="44" textAnchor="middle" fill="white"
          fontFamily="Georgia, serif" fontSize="6" opacity="0.8">DAR AL-FATWA</text>
      </g>

      {/* Gold accent line */}
      <rect x="22" y="75" width="240" height="2" fill={GOLD} opacity="0.8" rx="1" />

      {/* BRAND NAME */}
      <text x="22" y="130" fill={CREAM}
        fontFamily="'Didot', 'Bodoni MT', 'Playfair Display', Georgia, serif"
        fontSize="62" fontWeight="400" letterSpacing="7">
        {BRAND}
      </text>
      <text x="22" y="152" fill={GOLD} opacity="0.5"
        fontFamily="'Courier New', monospace" fontSize="10" letterSpacing="2">
        ⬛ PENDING BOARD APPROVAL ⬛
      </text>

      {/* Separator */}
      <rect x="22" y="162" width="316" height="0.8" fill={GOLD} opacity="0.2" rx="1" />

      {/* PROTEIN HERO */}
      <text x="22" y="245" fill={GOLD}
        fontFamily="'Didot', 'Bodoni MT', Georgia, serif"
        fontSize="100" fontWeight="400" letterSpacing="-3">
        [X]g
      </text>
      <text x="22" y="270" fill={CREAM} opacity="0.9"
        fontFamily="'Courier New', monospace"
        fontSize="14" letterSpacing="6">
        PROTEIN PER SERVING
      </text>
      <text x="22" y="286" fill={CREAM} opacity="0.35"
        fontFamily="'Courier New', monospace"
        fontSize="8.5" letterSpacing="3">
        بروتين لكل حصة · PROTÉINES PAR PORTION
      </text>

      {/* Servings */}
      <rect x="22" y="298" width="316" height="0.8" fill={CREAM} opacity="0.08" rx="1" />
      <text x="22" y="318" fill={CREAM} opacity="0.6"
        fontFamily="'Courier New', monospace" fontSize="11" letterSpacing="2">
        [X] SERVINGS PER PACK · [X] حصص في العبوة · [X] PORTIONS
      </text>
      <text x="22" y="332" fill={CREAM} opacity="0.35"
        fontFamily="'Courier New', monospace" fontSize="9" letterSpacing="1">
        [X] CALORIES PER SERVING · [X] سعرة لكل حصة
      </text>

      {/* Flavor */}
      <rect x="22" y="344" width="316" height="46" fill={GOLD} fillOpacity="0.07" rx="4" />
      <rect x="22" y="344" width="5" height="46" fill={GOLD} rx="2" />
      <text x="36" y="362" fill={GOLD}
        fontFamily="'Didot', 'Playfair Display', Georgia, serif"
        fontSize="18" letterSpacing="2">
        {FLAVOR}
      </text>
      <text x="36" y="381" fill={GOLD} opacity="0.55"
        fontFamily="Georgia, serif" fontSize="12">
        {FLAVOR_AR} · {FLAVOR_FR}
      </text>

      {/* Claims */}
      <rect x="0" y="404" width="360" height="68" fill={CHARCOAL} />
      <rect x="0" y="404" width="360" height="1" fill={GOLD} opacity="0.3" />
      <rect x="0" y="471" width="360" height="1" fill={GOLD} opacity="0.2" />

      {CLAIMS.map((c, i) => (
        <g key={i} transform={`translate(${10 + i * 115}, 414)`}>
          <rect x="0" y="0" width="108" height="48" rx="3"
            fill={GOLD} fillOpacity="0.06"
            stroke={GOLD} strokeWidth="0.5" strokeOpacity="0.25" />
          <text x="54" y="16" textAnchor="middle" fill={GREEN}
            fontFamily="'Courier New', monospace" fontSize="7" letterSpacing="0.5">
            ✓
          </text>
          <text x="54" y="27" textAnchor="middle" fill={CREAM}
            fontFamily="'Courier New', monospace" fontSize="6.5" letterSpacing="0.3">
            {c.en}
          </text>
          <text x="54" y="39" textAnchor="middle" fill={CREAM} opacity="0.4"
            fontFamily="Georgia, serif" fontSize="6">
            {c.ar}
          </text>
        </g>
      ))}

      {/* Origin */}
      <text x="22" y="493" fill={CREAM} opacity="0.4"
        fontFamily="'Courier New', monospace" fontSize="7.5" letterSpacing="2">
        MADE IN LEBANON · صنع في لبنان · FABRIQUÉ AU LIBAN
      </text>

      {/* Bottom regulatory */}
      <rect x="0" y="504" width="360" height="56" fill="#0A0806" rx="0" />
      <rect x="0" y="504" width="360" height="1" fill={GOLD} opacity="0.15" />

      <text x="22" y="520" fill={CREAM} opacity="0.25"
        fontFamily="'Courier New', monospace" fontSize="6.5" letterSpacing="1">
        MoPH REG. NO: [PENDING] · HALAL CERT: [PENDING] · GS1: [PENDING]
      </text>
      <text x="22" y="531" fill={CREAM} opacity="0.2"
        fontFamily="'Courier New', monospace" fontSize="6">
        DISTRIBUTED BY: RU2YA ADVISORY GROUP, BEIRUT, LEBANON
      </text>
      <text x="22" y="542" fill={CREAM} opacity="0.2"
        fontFamily="'Courier New', monospace" fontSize="6">
        STORE BELOW 25°C · RESEAL AFTER OPENING · CONSUME WITHIN 3 DAYS OF OPENING
      </text>

      <text x="22" y="554" fill={GOLD} opacity="0.15"
        fontFamily="'Courier New', monospace" fontSize="6" letterSpacing="2">
        NET WT: [X]g · BEST BEFORE: SEE BOTTOM OF PACK
      </text>

      {/* Sheen & edges */}
      <linearGradient id="sheenM" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="white" stopOpacity="0" />
        <stop offset="35%" stopColor="white" stopOpacity="0.04" />
        <stop offset="100%" stopColor="white" stopOpacity="0" />
      </linearGradient>
      <rect x="0" y="0" width="360" height="560" fill="url(#sheenM)" rx="20" />
      <linearGradient id="edgeLM" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="black" stopOpacity="0.55" />
        <stop offset="100%" stopColor="black" stopOpacity="0" />
      </linearGradient>
      <rect x="0" y="0" width="35" height="560" fill="url(#edgeLM)" rx="20" />
      <linearGradient id="edgeRM" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="black" stopOpacity="0" />
        <stop offset="100%" stopColor="black" stopOpacity="0.55" />
      </linearGradient>
      <rect x="325" y="0" width="35" height="560" fill="url(#edgeRM)" rx="20" />
    </g>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ProductVisualization() {
  const { isMobile } = useResponsive();
  const [sku, setSku] = useState("single");
  const [panel, setPanel] = useState("photo");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const isSingle = sku === "single";
  const bagW = isSingle ? 300 : 360;
  const bagH = isSingle ? 480 : 560;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0A0806",
      display: "flex",
      flexDirection: "column",
      fontFamily: "'Courier New', monospace",
    }}>

      {/* Header */}
      <div style={{
        borderBottom: "1px solid #1C1810",
        padding: isMobile ? "16px 24px 14px" : "20px 32px 16px",
        display: "flex", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "flex-end",
        flexWrap: "wrap", gap: 12,
        background: "linear-gradient(to bottom, #0E0C08, #0A0806)", flexDirection: isMobile ? "column" : "row"
      }}>
        <div>
          <div style={{ fontSize: isMobile ? 8 : 9, color: GOLD, letterSpacing: "0.35em", marginBottom: 6, opacity: 0.7 }}>
            RU2YA ADVISORY GROUP · PRODUCT VISUALIZATION · REF: KAG-JRK-VIZ-001
          </div>
          <div style={{ fontSize: isMobile ? "clamp(15px,4vw,22px)" : "clamp(15px,2.5vw,22px)", color: CREAM, letterSpacing: "0.08em", fontWeight: 400 }}>
            Packaging Concept — Visualization Draft
          </div>
          <div style={{ fontSize: isMobile ? 10 : 11, color: CREAM, opacity: 0.35, marginTop: 4, letterSpacing: "0.15em" }}>
            All placeholders pending board decision · Not for print
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {[
            { k: "BRAND NAME", v: "PENDING" },
            { k: "FLAVOR", v: "PENDING" },
            { k: "MoPH NO.", v: "PENDING" },
            { k: "HALAL CERT", v: "PENDING" },
          ].map((tag, i) => (
            <div key={i} style={{
              background: "#C8A96E12", border: "1px solid #C8A96E30",
              borderRadius: 3, padding: "4px 10px",
              display: "flex", gap: 6, alignItems: "center"
            }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: GOLD, opacity: 0.7 }} />
              <span style={{ fontSize: 8, color: GOLD, letterSpacing: "0.1em" }}>{tag.k}: {tag.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{
        padding: isMobile ? "12px 24px" : "14px 32px",
        borderBottom: "1px solid #1C1810",
        display: "flex", gap: isMobile ? 16 : 24, alignItems: isMobile ? "flex-start" : "center", flexWrap: "wrap", flexDirection: isMobile ? "column" : "row"
      }}>
        {/* SKU toggle */}
        <div>
          <div style={{ fontSize: 8, color: CREAM, opacity: 0.3, letterSpacing: "0.2em", marginBottom: 6 }}>SELECT SKU</div>
          <div style={{ display: "flex", gap: 4 }}>
            {[
              { id: "single", label: "SKU 01 — Single-Serve", sub: "30–50g · Gym Counter" },
              { id: "multi", label: "SKU 02 — Multi-Serve", sub: "100–150g · Pharmacy Shelf" },
            ].map(s => (
              <button key={s.id} onClick={() => { setSku(s.id); setPanel("front"); }} style={{
                background: sku === s.id ? `${GOLD}18` : "transparent",
                border: `1px solid ${sku === s.id ? GOLD : "#2A2418"}`,
                borderRadius: 4, padding: "8px 16px",
                cursor: "pointer", textAlign: "left", transition: "all 0.2s"
              }}>
                <div style={{ fontSize: 9, color: sku === s.id ? GOLD : "#6A5A48", letterSpacing: "0.1em" }}>{s.label}</div>
                <div style={{ fontSize: 8, color: CREAM, opacity: 0.3, marginTop: 2 }}>{s.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Panel toggle */}
        <div>
          <div style={{ fontSize: 8, color: CREAM, opacity: 0.3, letterSpacing: "0.2em", marginBottom: 6 }}>PANEL VIEW</div>
          <div style={{ display: "flex", gap: 4 }}>
            {[
              { id: "photo", label: "PRODUCT PHOTO" },
              { id: "front", label: "FRONT PANEL" },
              { id: "back", label: "BACK PANEL" },
            ].map(p => (
              <button key={p.id} onClick={() => setPanel(p.id)} style={{
                background: panel === p.id ? `${GOLD}18` : "transparent",
                border: `1px solid ${panel === p.id ? GOLD : "#2A2418"}`,
                borderRadius: 4, padding: "8px 16px",
                cursor: "pointer", transition: "all 0.2s"
              }}>
                <div style={{ fontSize: 9, color: panel === p.id ? GOLD : "#6A5A48", letterSpacing: "0.1em" }}>
                  {p.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bag display */}
      <div style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: isMobile ? "center" : "flex-start",
        padding: isMobile ? "32px 20px 48px" : "48px 32px 64px",
        gap: isMobile ? 24 : 48,
        flexWrap: "wrap",
        background: "radial-gradient(ellipse at 50% 30%, #1A1610 0%, #0A0806 60%)", flexDirection: isMobile ? "column" : "row"
      }}>

        {/* Main bag */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}>
          <div style={{
            position: "relative",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
            transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            filter: panel === "photo" ? "none" : "drop-shadow(0px 40px 60px rgba(0,0,0,0.9)) drop-shadow(0px 8px 24px rgba(200,169,110,0.12))",
          }}>
            {/* Product photo view */}
            {panel === "photo" && (
              <div style={{
                width: bagW,
                height: bagH,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}>
                <div style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 18,
                  background: `radial-gradient(ellipse at 50% 40%, #1A1610 0%, #0A0806 100%)`,
                  border: `1px solid ${GOLD}18`,
                }} />
                <img
                  src="/beef-jerky_KiTS-analysis/bag1.png"
                  alt="Strike Bites product bag"
                  style={{
                    position: "relative",
                    zIndex: 1,
                    maxWidth: "86%",
                    maxHeight: "86%",
                    objectFit: "contain",
                    filter: "drop-shadow(0px 32px 56px rgba(0,0,0,0.95)) drop-shadow(0px 6px 20px rgba(200,169,110,0.15))",
                  }}
                />
                <div style={{
                  position: "absolute",
                  bottom: 18,
                  left: 0,
                  right: 0,
                  textAlign: "center",
                  fontFamily: "'Courier New', monospace",
                  fontSize: 7,
                  color: GOLD,
                  opacity: 0.4,
                  letterSpacing: "0.2em",
                }}>
                  ACTUAL PRODUCT · REFERENCE PHOTO
                </div>
              </div>
            )}

            <svg
              width={bagW}
              height={bagH}
              viewBox={`0 0 ${bagW} ${bagH}`}
              style={{ display: panel === "photo" ? "none" : "block" }}
            >
              <defs>
                <filter id="bagShadow">
                  <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.4" />
                </filter>
              </defs>

              {isSingle && panel === "front" && <SingleFront />}
              {isSingle && panel === "back" && <SingleBack />}
              {!isSingle && panel === "front" && <MultiFront />}
              {!isSingle && panel === "back" && (
                <g>
                  <rect x="0" y="0" width="360" height="560" fill={DARK} rx="20" />
                  <rect x="0" y="0" width="360" height="50" fill={CHARCOAL} rx="20" />
                  <rect x="0" y="36" width="360" height="14" fill={DARK} />

                  {Array.from({ length: 34 }).map((_, i) => (
                    <line key={i} x1={i * 12} y1="0" x2={i * 12 - 40} y2="560"
                      stroke="#FFFFFF" strokeWidth="0.15" strokeOpacity="0.03" />
                  ))}

                  {/* Zipper */}
                  <rect x="20" y="50" width="320" height="10" fill={CHARCOAL} rx="3" />
                  <rect x="20" y="50" width="320" height="10" fill="none"
                    stroke={GOLD} strokeWidth="0.6" strokeOpacity="0.4" rx="3" />
                  <text x="180" y="58" textAnchor="middle" fill={GOLD} opacity="0.5"
                    fontFamily="'Courier New', monospace" fontSize="5.5" letterSpacing="2">
                    ↔ RESEAL AFTER OPENING ↔
                  </text>

                  <text x="22" y="26" fill={GOLD} opacity="0.4"
                    fontFamily="'Courier New', monospace" fontSize="7" letterSpacing="2">
                    {BRAND} · BACK PANEL · SKU-02
                  </text>

                  {/* Tagline */}
                  <rect x="22" y="68" width="316" height="30" fill={GOLD} fillOpacity="0.06" rx="3" />
                  <text x="180" y="81" textAnchor="middle" fill={CREAM}
                    fontFamily="'Didot', Georgia, serif" fontSize="10" letterSpacing="1.5">
                    Real meat. Real protein. Nothing else.
                  </text>
                  <text x="180" y="93" textAnchor="middle" fill={CREAM} opacity="0.35"
                    fontFamily="Georgia, serif" fontSize="8">
                    لحم حقيقي. بروتين حقيقي. · Vraie viande. Vraie protéine. Rien d'autre.
                  </text>

                  {/* Nutrition */}
                  <text x="22" y="114" fill={CREAM} opacity="0.8"
                    fontFamily="'Courier New', monospace" fontSize="7.5" letterSpacing="2">
                    NUTRITION FACTS · معلومات غذائية · VALEURS NUTRITIVES
                  </text>
                  <rect x="22" y="117" width="316" height="1.5" fill={CREAM} opacity="0.5" />
                  <text x="22" y="130" fill={CREAM} opacity="0.6"
                    fontFamily="'Courier New', monospace" fontSize="7">
                    Serving size: {NUTRITION.servingSize} · Servings: {NUTRITION.servings.multi} per pack
                  </text>
                  <rect x="22" y="134" width="316" height="0.8" fill={CREAM} opacity="0.25" />

                  {/* Calories */}
                  <rect x="22" y="135" width="316" height="26" fill={CREAM} fillOpacity="0.05" />
                  <text x="26" y="152" fill={CREAM} opacity="0.9"
                    fontFamily="'Courier New', monospace" fontSize="9">
                    Calories · سعرات · Calories
                  </text>
                  <text x="334" y="152" textAnchor="end" fill={GOLD}
                    fontFamily="'Courier New', monospace" fontSize="16" fontWeight="bold">
                    {NUTRITION.calories}
                  </text>

                  {[
                    { label: "Total Fat · دهون · Lipides", value: NUTRITION.totalFat },
                    { label: "Total Carbohydrate · كربوهيدرات · Glucides", value: NUTRITION.totalCarbs },
                    { label: "Total Sugars · سكريات · Sucres", value: NUTRITION.sugars },
                    { label: "  Includes 0g Added Sugars · بدون سكر مضاف", value: "0g", highlight: true },
                    { label: "Protein · بروتين · Protéines", value: NUTRITION.protein, bold: true },
                    { label: "Sodium · صوديوم · Sodium", value: NUTRITION.sodium },
                    { label: "Dietary Fibre · ألياف · Fibres", value: NUTRITION.fibre },
                  ].map((row, i) => (
                    <g key={i}>
                      <rect x="22" y={161 + i * 18} width="316" height="18"
                        fill={row.highlight ? GREEN : (i % 2 === 0 ? CREAM : "transparent")}
                        fillOpacity={row.highlight ? "0.12" : "0.03"} />
                      <text x={row.label.startsWith("  ") ? 32 : 26}
                        y={173 + i * 18}
                        fill={row.highlight ? GREEN : CREAM}
                        opacity={row.highlight ? 1 : 0.65}
                        fontFamily="'Courier New', monospace"
                        fontSize="6.5"
                        fontWeight={row.bold ? "bold" : "normal"}>
                        {row.label}
                      </text>
                      <text x="334" y={173 + i * 18} textAnchor="end"
                        fill={row.bold ? GOLD : (row.highlight ? GREEN : CREAM)}
                        opacity={row.highlight ? 1 : (row.bold ? 1 : 0.75)}
                        fontFamily="'Courier New', monospace"
                        fontSize={row.bold ? "8.5" : "7"}
                        fontWeight={row.bold ? "bold" : "normal"}>
                        {row.value}
                      </text>
                      <rect x="22" y={178 + i * 18} width="316" height="0.5"
                        fill={CREAM} opacity="0.07" />
                    </g>
                  ))}

                  <rect x="22" y="289" width="316" height="1.5" fill={CREAM} opacity="0.35" />

                  {/* Zero sugar */}
                  <rect x="22" y="294" width="316" height="22" fill={GREEN} fillOpacity="0.1" rx="3" />
                  <rect x="22" y="294" width="3" height="22" fill={GREEN} rx="1" />
                  <text x="32" y="303" fill={GREEN}
                    fontFamily="'Courier New', monospace" fontSize="7" letterSpacing="0.5">
                    ✓ 0g ADDED SUGAR · ✓ بدون سكر مضاف · ✓ 0g SUCRE AJOUTÉ
                  </text>
                  <text x="32" y="312" fill={GREEN} opacity="0.7"
                    fontFamily="'Courier New', monospace" fontSize="5.5">
                    No artificial sweeteners · بدون محليات صناعية · Sans édulcorants artificiels
                  </text>

                  {/* Ingredients */}
                  <text x="22" y="330" fill={CREAM} opacity="0.75"
                    fontFamily="'Courier New', monospace" fontSize="7" letterSpacing="1.5">
                    INGREDIENTS:
                  </text>
                  <foreignObject x="22" y="334" width="316" height="40">
                    {/*<div xmlns="http://www.w3.org/1999/xhtml" style={{
                      color: `${CREAM}88`, fontFamily: "'Courier New', monospace",
                      fontSize: "6px", lineHeight: "1.7"
                    }}>
                      {INGREDIENTS.en}
                    </div>*/}
                  </foreignObject>
                  <foreignObject x="22" y="370" width="316" height="28">
                  {/*<div xmlns="http://www.w3.org/1999/xhtml" style={{
                      color: `${CREAM}44`, fontFamily: "Georgia, serif",
                      fontSize: "6px", lineHeight: "1.6", direction: "rtl"
                    }}>
                      {INGREDIENTS.ar}
                    </div>*/}
                  </foreignObject>

                  {/* Allergen */}
                  <rect x="22" y="398" width="316" height="13" fill={CREAM} fillOpacity="0.04" rx="2" />
                  <text x="26" y="407" fill={CREAM} opacity="0.5"
                    fontFamily="'Courier New', monospace" fontSize="6" fontWeight="bold">
                    ALLERGENS: NONE DECLARED · لا يحتوي على مسببات الحساسية المعلنة
                  </text>

                  {/* Barcode */}
                  <rect x="240" y="415" width="90" height="48" fill="#FFFFFF" rx="2" />
                  {Array.from({ length: 34 }).map((_, i) => (
                    <rect key={i} x={243 + i * 2.3} y="418"
                      width={i % 3 === 0 ? 1.5 : 0.8}
                      height={i % 5 === 0 ? 36 : 28}
                      fill={DARK} />
                  ))}
                  <text x="285" y="464" textAnchor="middle" fill={DARK}
                    fontFamily="'Courier New', monospace" fontSize="4.5">
                    [GS1 PENDING]
                  </text>

                  {/* Manufacturer */}
                  <text x="22" y="426" fill={CREAM} opacity="0.25"
                    fontFamily="'Courier New', monospace" fontSize="6">
                    DISTRIBUTED BY: RU2YA ADVISORY GROUP, BEIRUT, LEBANON
                  </text>
                  <text x="22" y="437" fill={CREAM} opacity="0.22"
                    fontFamily="'Courier New', monospace" fontSize="6">
                    COUNTRY OF ORIGIN: LEBANON · بلد المنشأ: لبنان · ORIGINE: LIBAN
                  </text>
                  <text x="22" y="448" fill={CREAM} opacity="0.2"
                    fontFamily="'Courier New', monospace" fontSize="6">
                    NET WT: [X]g · BEST BEFORE: SEE BOTTOM · STORE BELOW 25°C
                  </text>
                  <text x="22" y="458" fill={CREAM} opacity="0.18"
                    fontFamily="'Courier New', monospace" fontSize="6">
                    RESEAL AFTER OPENING · CONSUME WITHIN 3 DAYS OF OPENING
                  </text>
                  <text x="22" y="468" fill={CREAM} opacity="0.15"
                    fontFamily="'Courier New', monospace" fontSize="6">
                    MoPH REG: [PENDING] · HALAL: [PENDING]
                  </text>

                  <rect x="0" y="480" width="360" height="80" fill="#0A0806" />
                  <text x="180" y="500" textAnchor="middle" fill={GOLD} opacity="0.15"
                    fontFamily="'Courier New', monospace" fontSize="7" letterSpacing="2">
                    RU2YA ADVISORY GROUP · KAG-JRK-001 · VISUALIZATION DRAFT
                  </text>

                  <linearGradient id="sheenMB" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="white" stopOpacity="0.04" />
                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                  <rect x="0" y="0" width="360" height="560" fill="url(#sheenMB)" rx="20" />
                  <linearGradient id="edgeLMB" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="black" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="black" stopOpacity="0" />
                  </linearGradient>
                  <rect x="0" y="0" width="35" height="560" fill="url(#edgeLMB)" rx="20" />
                  <linearGradient id="edgeRMB" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="black" stopOpacity="0" />
                    <stop offset="100%" stopColor="black" stopOpacity="0.55" />
                  </linearGradient>
                  <rect x="325" y="0" width="35" height="560" fill="url(#edgeRMB)" rx="20" />
                </g>
              )}
            </svg>
          </div>

          {/* Bag label */}
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 10, color: GOLD, letterSpacing: "0.2em", marginBottom: 4 }}>
              {isSingle ? "SKU 01 — SINGLE-SERVE POUCH" : "SKU 02 — MULTI-SERVE RESEALABLE"}
            </div>
            <div style={{ fontSize: 9, color: CREAM, opacity: 0.3, letterSpacing: "0.1em" }}>
              {isSingle ? "30–50g · Gym Counter · Impulse Purchase" : "100–150g · Pharmacy Shelf · Planned Purchase"}
            </div>
          </div>
        </div>

        {/* Annotations panel */}
        <div style={{
          maxWidth: isMobile ? "100%" : 280,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          paddingTop: isMobile ? 0 : 8,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateX(0)" : "translateX(20px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
        }}>
          <div style={{ fontSize: 8, color: GOLD, letterSpacing: "0.25em", marginBottom: 4 }}>
            DESIGN ANNOTATIONS
          </div>

          {[
            {
              color: GOLD, label: "Brand Name Position",
              note: "Maximum visual weight. Placeholder pending board decision. Designer begins wordmark development upon name confirmation.",
              pending: true,
            },
            {
              color: GOLD, label: "Protein Number",
              note: "Second-largest element on pack. Must be readable at 1 meter. Lab figure to replace [X] upon nutritional panel confirmation.",
              pending: true,
            },
            {
              color: GREEN, label: "Halal Certification Mark",
              note: "Top right corner, front panel. Mark issued by Dar Al-Fatwa Lebanon. Current circle is placeholder — actual mark replaces this.",
              pending: true,
            },
            {
              color: GOLD, label: "Flavor Name",
              note: "Shown as 'Lebanese BBQ' codename. Commercial flavor name pending board decision. Displayed in all three languages.",
              pending: true,
            },
            {
              color: CREAM, label: "Zero Added Sugar — Highlighted",
              note: "Green accent on back panel. '0g Added Sugars' row highlighted in nutritional table — our single strongest claim vs. all competitors.",
              pending: false,
            },
            {
              color: CREAM, label: "Trilingual Copy",
              note: "Arabic · English · French on all consumer-facing elements. Arabic leads regulatory compliance. MoPH-mandatory elements present.",
              pending: false,
            },
            {
              color: CREAM, label: "Clean Label Claims Strip",
              note: "No Added Sugar · No Artificial Preservatives · High Protein. Three claims, verified, not self-declared. Requires manufacturer confirmation.",
              pending: false,
            },
            {
              color: "#9B8EC4", label: "Regulatory Placeholders",
              note: "MoPH registration number, GS1 barcode, Halal certificate number — all confirmed pending. No print-ready artwork until all three are issued.",
              pending: true,
            },
            {
              color: GOLD, label: "Color System Applied",
              note: "Deep anchor (near-black warm) · Performance gold · Warm cream · Certification green. Matte finish simulated in render.",
              pending: false,
            },
            {
              color: CREAM, label: "Pack Format",
              note: isSingle
                ? "Single-serve: flat-bottom or pillow, tear notch, no zipper. Gym counter placement."
                : "Multi-serve: stand-up pouch, resealable zipper. Pharmacy and nutrition shop shelf.",
              pending: false,
            },
          ].map((ann, i) => (
            <div key={i} style={{
              background: `${ann.color}08`,
              border: `1px solid ${ann.color}20`,
              borderLeft: `3px solid ${ann.pending ? GOLD : ann.color}`,
              borderRadius: 3, padding: "10px 12px",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                <div style={{ fontSize: 8, color: ann.color, letterSpacing: "0.1em" }}>{ann.label}</div>
                {ann.pending && (
                  <span style={{
                    fontSize: 6, color: GOLD,
                    background: "#C8A96E15", border: "1px solid #C8A96E30",
                    padding: "1px 5px", borderRadius: 2, letterSpacing: "0.1em"
                  }}>PENDING</span>
                )}
              </div>
              <p style={{ margin: 0, fontSize: 10, color: CREAM, opacity: 0.5, lineHeight: 1.7 }}>{ann.note}</p>
            </div>
          ))}

          {/* Pending summary */}
          <div style={{
            marginTop: 8,
            background: "#C8A96E0A", border: "1px solid #C8A96E30",
            borderRadius: 4, padding: "14px 14px"
          }}>
            <div style={{ fontSize: 8, color: GOLD, letterSpacing: "0.2em", marginBottom: 10 }}>
              ITEMS PENDING BOARD MEETING
            </div>
            {[
              "Brand name → wordmark design",
              "Primary flavor name → copy finalization",
              "MoPH number → back panel completion",
              "Halal certificate number → front panel mark",
              "GS1 barcode → back panel bottom",
              "Nutritional panel → all [X] values",
              "Net weight per SKU → manufacturer TBC",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "flex-start" }}>
                <span style={{ color: GOLD, fontSize: 8, flexShrink: 0, marginTop: 2 }}>→</span>
                <span style={{ fontSize: 9, color: CREAM, opacity: 0.45, lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #1C1810",
        padding: isMobile ? "12px 24px" : "12px 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 8,
        background: "#08060A"
      }}>
        <span style={{ fontSize: isMobile ? 7 : 8, color: CREAM, opacity: 0.2, letterSpacing: "0.2em" }}>
          RU2YA ADVISORY GROUP · VISUALIZATION DRAFT · NOT FOR PRINT · CONFIDENTIAL
        </span>
        <span style={{ fontSize: isMobile ? 7 : 8, color: GOLD, opacity: 0.3, letterSpacing: "0.15em" }}>
          KAG-JRK-VIZ-001 · ALL PLACEHOLDERS PENDING BOARD DECISION
        </span>
      </div>
    </div>
  );
}

import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const COMPETITORS = {
  jacklinks: {
    id: "jacklinks",
    name: "Jack Link's",
    origin: "USA",
    type: "Direct Competitor",
    color: "#E07B6A",
  },
  wildwest: {
    id: "wildwest",
    name: "Wild West",
    origin: "UK/EU",
    type: "Direct Competitor",
    color: "#C8A96E",
  },
  questbar: {
    id: "questbar",
    name: "Quest Bar",
    origin: "USA",
    type: "Indirect — Protein Snack",
    color: "#9B8EC4",
  },
  barebells: {
    id: "barebells",
    name: "Barebells",
    origin: "Sweden/USA",
    type: "Indirect — Protein Bar",
    color: "#7EB5A6",
  },
  ours: {
    id: "ours",
    name: "[BRAND] — Our Product",
    origin: "Lebanon (local + imported source)",
    type: "Our Brand",
    color: "#A8D8A8",
  },
};

// ─── MIDDLEMAN CRITERIA ───────────────────────────────────────────────────────

const MIDDLEMAN_CRITERIA = [
  {
    category: "Commercial Terms",
    icon: "◈",
    criteria: [
      {
        label: "Margin offered to store",
        jacklinks: { score: 2, value: "20–25%", note: "Fixed importer margin — no flexibility. Take it or leave it." },
        wildwest:  { score: 2, value: "20–25%", note: "European importer structure. Similar rigidity." },
        questbar:  { score: 2, value: "25–30%", note: "Imported through distributor. Store negotiates with middleman, not brand." },
        barebells: { score: 2, value: "25–30%", note: "Premium positioning but margin absorbed by multi-tier distribution." },
        ours:      { score: 5, value: "28–35%", note: "Direct delivery, no distributor tier in Phase 1. Full margin goes to store." },
      },
      {
        label: "First order terms (risk to buyer)",
        jacklinks: { score: 1, value: "Cash upfront", note: "No sale-or-return. No flexibility. Full invoice on delivery." },
        wildwest:  { score: 1, value: "Cash upfront", note: "Imported SKU — buyer assumes full inventory risk." },
        questbar:  { score: 2, value: "Net 30 (via distributor)", note: "Payment terms exist but buyer is locked to distributor schedule." },
        barebells: { score: 2, value: "Net 30 (via distributor)", note: "Same issue — margin and risk structured around intermediary." },
        ours:      { score: 5, value: "Sale-or-return (first 30 days)", note: "Zero financial risk to buyer for first month. Unmatched in this market." },
      },
      {
        label: "Minimum order quantity",
        jacklinks: { score: 2, value: "Case minimums (fixed)", note: "Importer sets MOQ. Often 6–12 cases. Difficult for small gyms." },
        wildwest:  { score: 2, value: "Case minimums", note: "Same structural issue." },
        questbar:  { score: 2, value: "Box of 12 minimum", note: "Standard — not flexible for small accounts." },
        barebells: { score: 3, value: "Flexible via distributor", note: "Distributor may allow smaller reorders. Still not direct." },
        ours:      { score: 5, value: "20–30 units per SKU", note: "Smallest MOQ in the market. Designed for gym counter display, not warehouse purchase." },
      },
      {
        label: "Reorder speed & reliability",
        jacklinks: { score: 2, value: "3–7 days via importer", note: "Dependent on importer stock. Stockouts possible. No direct line to brand." },
        wildwest:  { score: 1, value: "5–14 days (imported)", note: "Import lead times mean gaps. Seasonal availability issues in Lebanon." },
        questbar:  { score: 2, value: "3–5 days via distributor", note: "Better than import — but still one layer removed." },
        barebells: { score: 2, value: "3–5 days via distributor", note: "Distributor reliability varies. Product not always in stock locally." },
        ours:      { score: 5, value: "Within 24 hours, personal delivery", note: "KITS delivers directly. Founder-level relationship with every account. No layer between brand and store." },
      },
      {
        label: "Display & point-of-sale support",
        jacklinks: { score: 2, value: "None provided at store level", note: "POS support goes to major modern trade only. Gym gets a box, nothing else." },
        wildwest:  { score: 1, value: "None", note: "No active trade support for Lebanese market." },
        questbar:  { score: 3, value: "Branded shelf strips, boxes", note: "Some materials available via distributor. Varies by account size." },
        barebells: { score: 3, value: "Branded display via distributor", note: "Display provided for larger accounts. Small gyms rarely benefit." },
        ours:      { score: 5, value: "Free branded display unit + product cards", note: "Provided to every account regardless of size. Setup personally by KITS. Staff briefed at setup." },
      },
    ],
  },
  {
    category: "Product Credibility",
    icon: "◉",
    criteria: [
      {
        label: "Halal certification",
        jacklinks: { score: 1, value: "Not certified / unclear", note: "Soy sauce base (wheat, soybeans) raises concerns. No Halal mark on Lebanese market packs. Creates customer doubt in a Muslim-majority market." },
        wildwest:  { score: 1, value: "Not Halal certified", note: "Contains sodium nitrite preservative. No Halal mark. Same ingredient concerns." },
        questbar:  { score: 2, value: "Not Halal certified (most SKUs)", note: "Some SKUs contain gelatin or non-Halal protein sources. Creates selection complexity." },
        barebells: { score: 2, value: "Not Halal certified", note: "Collagen-based protein from bovine sources — origin unverified for Halal." },
        ours:      { score: 5, value: "Full Halal certification — Dar Al-Fatwa", note: "Non-negotiable from day one. Covers both local and imported production components. GCC export-ready." },
      },
      {
        label: "MoPH registration (Lebanon)",
        jacklinks: { score: 3, value: "Registered (imported, legacy)", note: "Legacy registration — took years. Product is registered but the process was not designed for Lebanese market." },
        wildwest:  { score: 1, value: "Unclear / unverified", note: "Limited distribution footprint suggests registration may be incomplete or informal." },
        questbar:  { score: 3, value: "Registered via distributor", note: "Registration handled by importer. Brand has no direct Lebanese regulatory relationship." },
        barebells: { score: 3, value: "Registered via distributor", note: "Same as Quest — importer-managed compliance." },
        ours:      { score: 5, value: "Direct MoPH registration in progress", note: "Registered as Lebanese legal entity. Direct relationship with MoPH. Full compliance from launch — not managed by a third party." },
      },
      {
        label: "Ingredient transparency (label quality)",
        jacklinks: { score: 2, value: "Long, complex ingredient list", note: "Sugar listed second. Soy sauce, maltodextrin, hydrolyzed corn protein, yeast extract, citric acid. Reads like a chemistry formula." },
        wildwest:  { score: 3, value: "Moderate — real ingredients, preservative present", note: "Demerara sugar, sea salt, ACV — better than Jack Link's. But sodium nitrite preservative and 20.6g sugar per 100g is a concern for health-conscious buyer." },
        questbar:  { score: 2, value: "Ultra-processed bar structure", note: "Protein isolates, IMO fiber, sucralose, soy protein isolate, vegetable glycerin. Highly engineered, not clean-label." },
        barebells: { score: 2, value: "Ultra-processed, sweetener-heavy", note: "Calcium caseinate, maltitol, polydextrose, sucralose. Functions well but ingredient list creates legitimate consumer concern." },
        ours:      { score: 5, value: "Clean, short, readable list — real food", note: "Beef, salt, spices, natural flavoring. No artificial preservatives. No added sugar (pending manufacturer confirmation). Clean enough to read aloud to a customer in 10 seconds." },
      },
      {
        label: "Local market familiarity (staff confidence)",
        jacklinks: { score: 3, value: "Known brand — but no local story", note: "Staff know it by name but cannot explain why it is good. No local connection, no trainer relationships, no one educating the sales floor." },
        wildwest:  { score: 1, value: "Minimal awareness in Lebanon", note: "Staff in most Lebanese stores have no education on this brand. It sits on shelf without advocacy." },
        questbar:  { score: 4, value: "Strong brand recognition with gym community", note: "Quest has a distributor and limited marketing presence. Staff in nutrition stores know and recommend it. Difficult to compete with on familiarity alone." },
        barebells: { score: 4, value: "Growing recognition, Nordic premium image", note: "Increasingly visible. Strong packaging. Staff in premium nutrition stores recommend it. High social media presence among Lebanese fitness consumers." },
        ours:      { score: 5, value: "Personal relationship with every account, trained staff", note: "KITS visits personally, trains staff, provides talking points. Every staff member who handles our product knows exactly what to say and why. Unmatched at launch." },
      },
    ],
  },
  {
    category: "Supply Chain Reliability",
    icon: "◎",
    criteria: [
      {
        label: "Supply consistency in Lebanon",
        jacklinks: { score: 2, value: "Dependent on importer stock", note: "Lebanon import volatility (customs, USD availability, port congestion) means Jack Link's can be sporadically out of stock for weeks at a time." },
        wildwest:  { score: 1, value: "Inconsistent — import-dependent", note: "Smaller importer footprint. More vulnerable to supply gaps. Has had extended Lebanese stockouts." },
        questbar:  { score: 3, value: "Moderate reliability via distributor", note: "Distributor maintains local stock buffer. Better than pure import — but still one collapse point." },
        barebells: { score: 3, value: "Improving but not guaranteed", note: "Newer to Lebanon market. Distribution infrastructure still maturing." },
        ours:      { score: 4, value: "Hybrid model — local + imported source", note: "Local production component insulates against import disruption for base SKU. Imported components are secondary. Built-in supply resilience from day one." },
      },
      {
        label: "Shelf life under Lebanese conditions",
        jacklinks: { score: 3, value: "~12 months — tested for US market", note: "Shelf life designed for US ambient conditions. Lebanon's summer heat (38°C+) and humidity can affect product quality before expiry date." },
        wildwest:  { score: 3, value: "~12 months — tested for EU market", note: "Same issue. European climate assumptions built into shelf life testing." },
        questbar:  { score: 4, value: "Bar format — 12 months+", note: "Bar format is more shelf-stable. Less temperature-sensitive than meat product." },
        barebells: { score: 4, value: "Bar format — 12 months+", note: "Same as Quest. Bar format advantage." },
        ours:      { score: 5, value: "Shelf life validated for Lebanese climate specifically", note: "Quality control and shelf-life testing conducted under Lebanese storage conditions. Manufacturer briefed on local climate requirements before first batch." },
      },
    ],
  },
];

// ─── END USER CRITERIA ────────────────────────────────────────────────────────

const USER_CRITERIA = [
  {
    category: "Nutritional Performance",
    icon: "◈",
    criteria: [
      {
        label: "Protein per 100g",
        jacklinks: { score: 3, value: "~42g protein / 100g", note: "Decent ratio but significantly undermined by sugar content (sugar is ingredient #3). Net protein efficiency is lower than label suggests." },
        wildwest:  { score: 3, value: "~30–36g protein / 100g", note: "Variable across SKUs. Original has 29.9g/100g with 16.6g sugar — high sugar relative to protein undermines the fitness credentials." },
        questbar:  { score: 4, value: "20–21g protein / 60g bar", note: "Roughly 33g protein per 100g. Strong for a bar. But non-meat protein source (whey + soy isolate blend) with fiber masking the carb load." },
        barebells: { score: 4, value: "~20g protein / 55g bar", note: "~36g/100g. Good protein ratio. But glycerin, maltitol, and collagen hydrolysate are functional proteins — not pure muscle-building amino profile." },
        ours:      { score: 5, value: "TBC — lab verification required", note: "Clean beef protein — complete amino acid profile including all BCAAs. Zero dilution from sugar, fiber filler, or protein isolate blend. Protein is from whole meat, not engineered ingredients." },
      },
      {
        label: "Sugar content",
        jacklinks: { score: 1, value: "~7–9g sugar per serving", note: "Sugar is the SECOND ingredient. Brown sugar, soy sauce, maltodextrin. For a 'protein snack', this is nutritionally dishonest. Any athlete tracking macros will reject this on label read." },
        wildwest:  { score: 1, value: "16.6–20.6g sugar per 100g", note: "Extremely high. Demerara sugar is ingredient #2. The 'high protein' positioning is undercut entirely by the sugar load. 20g sugar per 100g is a candy bar territory." },
        questbar:  { score: 4, value: "~1g sugar per bar (sucralose sweetened)", note: "Low sugar by ingredient — but sweetened with sucralose, which causes digestive issues for a significant percentage of users and creates aftertaste complaints." },
        barebells: { score: 3, value: "~0g added sugar (maltitol sweetened)", note: "No added sugar but uses maltitol — a sugar alcohol that causes documented digestive distress in high consumption. Better than sucrose, worse than nothing." },
        ours:      { score: 5, value: "Zero added sugar — savory product", note: "Meat-based jerky has no structural need for sugar. Our BBQ profile uses natural Maillard flavors, not added sweeteners. Zero sugar anxiety for the macro-tracking consumer." },
      },
      {
        label: "Calories per gram of protein (efficiency)",
        jacklinks: { score: 3, value: "~5.7 cal per gram of protein", note: "80 cal for 13g protein. Acceptable but sugar calories are wasted macros for a fitness consumer." },
        wildwest:  { score: 2, value: "~8.3 cal per gram of protein", note: "249 cal/100g for 29.9g protein. High calorie inefficiency driven by sugar load." },
        questbar:  { score: 4, value: "~9.5 cal per gram of protein", note: "190 cal for 20g protein. Bar format carries carb and fat overhead. Not efficient for protein-per-calorie seekers." },
        barebells: { score: 4, value: "~9.5 cal per gram of protein", note: "Similar to Quest. Good protein but calorie overhead from fats and sugar alcohols." },
        ours:      { score: 5, value: "Target: <5 cal per gram of protein", note: "Lean beef jerky at minimum processing is among the most calorie-efficient protein sources in any portable format. Pending nutritional panel confirmation — but the category advantage is structural." },
      },
      {
        label: "Ingredient quality (real food vs engineered)",
        jacklinks: { score: 2, value: "Processed — 10+ ingredients", note: "Contains: hydrolyzed corn protein, yeast extract, maltodextrin, citric acid, artificial flavors. Processed, engineered, not clean-label." },
        wildwest:  { score: 3, value: "Better — real ingredients but preservatives", note: "Real demerara sugar, apple cider vinegar, real spices. However, sodium nitrite preservative and high sugar disqualify it from the 'clean' claim." },
        questbar:  { score: 2, value: "Ultra-processed protein matrix", note: "IMO fiber (controversial — insulin response debate), sucralose, soy protein isolate, vegetable glycerin. Sophisticated engineering, not clean eating." },
        barebells: { score: 2, value: "Highly engineered bar structure", note: "Calcium caseinate, polydextrose, cocoa butter, sucralose — functional but the opposite of whole food. Informed consumers increasingly reject this profile." },
        ours:      { score: 5, value: "Whole food — beef and spices", note: "Short ingredient list. Recognizable words. Zero need for engineering to achieve the nutritional profile — the meat does the work. This is what 'clean label' actually means." },
      },
    ],
  },
  {
    category: "Portability & Convenience",
    icon: "◉",
    criteria: [
      {
        label: "Preparation required",
        jacklinks: { score: 5, value: "Zero — open and eat", note: "Jerky is the original zero-prep protein. Identical advantage to our product." },
        wildwest:  { score: 5, value: "Zero — open and eat", note: "Same." },
        questbar:  { score: 5, value: "Zero — unwrap and eat", note: "Bar format requires no prep." },
        barebells: { score: 5, value: "Zero — unwrap and eat", note: "Same." },
        ours:      { score: 5, value: "Zero — open and eat", note: "Identical. No refrigeration, no prep, no utensils. Gym bag, car, desk, anywhere." },
      },
      {
        label: "Storage requirements",
        jacklinks: { score: 4, value: "Ambient — but US climate assumption", note: "Shelf stable. But formulated for US ambient temps, not Lebanon summers. Quality may degrade faster in heat." },
        wildwest:  { score: 4, value: "Ambient — European climate assumption", note: "Same issue. 'Store in a cool, dry place' — what counts as cool in a Lebanese car in August?" },
        questbar:  { score: 5, value: "Ambient — robust bar format", note: "Bar is well-sealed and temperature-tolerant. Robust for Lebanese conditions." },
        barebells: { score: 5, value: "Ambient — robust bar format", note: "Same. Bar format is more heat-stable than jerky generally." },
        ours:      { score: 5, value: "Ambient — validated for Lebanese conditions", note: "We test under local conditions before launch. Packaging specified for Lebanese humidity and heat. No quality surprises." },
      },
      {
        label: "Pack size versatility",
        jacklinks: { score: 4, value: "25g, 40g, 60g, 70g options", note: "Good range. Single-serve and sharing formats available. But all pack sizes come with the same sugar-heavy formula." },
        wildwest:  { score: 3, value: "25g, 70g, 300g (sharing)", note: "Limited range for Lebanon. Sharing bag format doesn't suit the gym channel." },
        questbar:  { score: 4, value: "Single bar format (60g)", note: "One format. No flexibility. Can't offer a smaller entry-point or larger value pack." },
        barebells: { score: 4, value: "Single bar format (55g)", note: "Same limitation." },
        ours:      { score: 5, value: "Single-serve pouch + multi-serve resealable", note: "Two formats address two purchase occasions: gym impulse (single-serve) and planned nutrition purchase at pharmacy or supermarket (multi-serve). Format-flexible from launch." },
      },
    ],
  },
  {
    category: "Local Relevance",
    icon: "◎",
    criteria: [
      {
        label: "Halal status clarity for consumer",
        jacklinks: { score: 1, value: "Ambiguous — no Halal mark", note: "Soy sauce in ingredient list raises doubt. No Halal certification displayed. Muslim consumer cannot confidently purchase." },
        wildwest:  { score: 1, value: "Not Halal certified", note: "No Halal mark. Contains sodium nitrite. No confidence for the Lebanese Muslim consumer — who is the majority." },
        questbar:  { score: 2, value: "Not certified — gelatin risk", note: "Some SKUs contain gelatin. Consumer must research. Creates friction and doubt." },
        barebells: { score: 2, value: "Not certified — bovine collagen source unclear", note: "Bovine collagen protein — origin of source not specified for Halal purposes. Consumer has to assume or reject." },
        ours:      { score: 5, value: "Halal mark on pack — full certified", note: "Displayed prominently. No consumer doubt, no research required. The Halal mark removes a purchase barrier that blocks all competitors for approximately 60% of the Lebanese market." },
      },
      {
        label: "Flavor relevance to Lebanese palate",
        jacklinks: { score: 2, value: "American flavor profile", note: "Original, Teriyaki, Sweet & Hot. None of these flavors are native to the Lebanese taste palate. The sweetness and soy base reads as foreign." },
        wildwest:  { score: 2, value: "British/American flavor profile", note: "Honey BBQ, Original, Jalapeño. Western flavor conventions. No connection to Lebanese or Levantine taste tradition." },
        questbar:  { score: 2, value: "American dessert flavor profile", note: "Chocolate chip cookie dough, birthday cake, peanut butter brownie. These flavors have global appeal but zero Lebanese cultural connection." },
        barebells: { score: 3, value: "European-Nordic flavor profile", note: "Chocolate Dough, White Chocolate Almond, Cookie Crunch. Premium feel but European sensibility. No local flavor anchor." },
        ours:      { score: 5, value: "Lebanese BBQ — locally developed flavor brief", note: "Cedar smoke, pomegranate back-note, Aleppo pepper heat, sumac brightness. This is the only product in market designed around what a Lebanese gym member actually wants to taste. Incomparable local advantage." },
      },
      {
        label: "Language & packaging accessibility",
        jacklinks: { score: 2, value: "English only", note: "No Arabic, no French. In a market that speaks three languages, English-only packaging is a missed opportunity and a compliance risk." },
        wildwest:  { score: 2, value: "English only", note: "Same. Designed for UK/EU — not Lebanon." },
        questbar:  { score: 2, value: "English only", note: "US product. No Lebanese market localization." },
        barebells: { score: 2, value: "English only (EU launch packs)", note: "European packs sometimes add languages but not Arabic. No Levantine market adaptation." },
        ours:      { score: 5, value: "Arabic + English + French — trilingual by design", note: "Brand name works across all three languages. Packaging is MoPH compliant with Arabic mandatory requirements. Consumer can read the full label in their preferred language. No Lebanese competitor does this." },
      },
      {
        label: "Price accessibility (Lebanese consumer reality)",
        jacklinks: { score: 1, value: "$4.50–$6.50 for 40–60g (post-import markup)", note: "Expensive by Lebanese standards after importer margin + customs. Out of reach for the casual gym member. Only accessible to upper-income segment." },
        wildwest:  { score: 1, value: "$4–$6 per pack (import-priced)", note: "Similar pricing issue. Imported product with import cost stack — not accessible for broad Lebanese consumer base." },
        questbar:  { score: 2, value: "$3.50–$5 per bar (distributor-priced)", note: "Slightly more accessible than imported jerky but still above the comfort zone for routine daily purchase." },
        barebells: { score: 2, value: "$3.50–$5 per bar", note: "Premium positioning limits accessibility. Purchased occasionally, not routinely." },
        ours:      { score: 5, value: "$2.50–$3.50 per single-serve (target)", note: "Local production component enables competitive pricing without margin sacrifice. The only protein snack in market that can be purchased daily without financial strain. This is the routine purchase price point — not the occasional treat price point." },
      },
    ],
  },
  {
    category: "Consumer Experience",
    icon: "◐",
    criteria: [
      {
        label: "Digestive comfort",
        jacklinks: { score: 3, value: "Generally fine — some sodium concern", note: "High sodium content (600–900mg per serving). Can cause bloating for sodium-sensitive consumers. No reported severe digestive issues." },
        wildwest:  { score: 2, value: "High sodium + high sugar concern", note: "3.85–3.9g salt per 100g — the highest sodium load in this comparison. Combined with high sugar, creates energy spike/crash potential." },
        questbar:  { score: 2, value: "Sucralose digestive complaints — documented", note: "Sucralose causes documented GI distress in a significant minority of consumers. 'Quest Farts' is a documented consumer complaint category. Active fitness community has high awareness of this issue." },
        barebells: { score: 2, value: "Maltitol GI distress — documented", note: "Maltitol is a sugar alcohol with a known laxative effect at 20–30g consumption. For a consumer eating multiple bars or training hard, this is a real concern." },
        ours:      { score: 5, value: "No artificial sweeteners, no sugar alcohols — clean digestion", note: "A meat-based, clean-ingredient product with no synthetic sweeteners has no structural digestive concern. This is a selling point the sales team can use directly in store." },
      },
      {
        label: "Satiety (how long does it keep you full?)",
        jacklinks: { score: 3, value: "Moderate — protein plus sugar creates brief energy", note: "Protein provides satiety; sugar creates brief energy spike followed by drop. Net satiety is moderate." },
        wildwest:  { score: 2, value: "Lower — high sugar undermines satiety signal", note: "High sugar content triggers insulin response. Consumer may feel hungrier faster after the sugar peak. Counterproductive for weight management." },
        questbar:  { score: 4, value: "High — fiber adds satiety beyond protein", note: "High fiber content (14g) creates strong satiety. Quest Bar is genuinely filling. One of its real advantages." },
        barebells: { score: 3, value: "Moderate — protein without significant fiber", note: "Protein provides satiety but lower fiber than Quest means shorter satiety window." },
        ours:      { score: 5, value: "Highest — whole food protein with zero sugar crash", note: "Whole beef protein with complete amino acid profile provides sustained satiety without the sugar spike and crash. Research confirms jerky keeps consumers fuller longer than bars in calorie-controlled settings. No insulin spike, no hunger rebound." },
      },
      {
        label: "Taste authenticity (real food satisfaction)",
        jacklinks: { score: 3, value: "Familiar — but sweet and processed-tasting", note: "Consumer reviews: 'tastes like jerky' — which is correct. But the sweetness and processed note undermine the 'real food' satisfaction." },
        wildwest:  { score: 3, value: "Better texture — still sweet", note: "Reviews note better texture than Jack Link's ('more like real steak'). But sugar-forward taste still dominates." },
        questbar:  { score: 3, value: "Dessert-flavored protein — divisive", note: "Consumer reviews: love or hate the artificial sweetness. 'Chalky aftertaste' is the #1 recurring complaint. Works for dessert cravings, not food cravings." },
        barebells: { score: 4, value: "Best-in-class bar taste — but still a bar", note: "Widely praised as the best-tasting protein bar. However, it is still a processed bar. Not a whole food experience." },
        ours:      { score: 5, value: "Real meat — nothing else delivers this", note: "A savory, chewy, BBQ-spiced meat experience is categorically different from any bar or processed snack. There is no 'protein bar' that competes with real jerky for the consumer who wants to taste food, not engineered nutrition." },
      },
    ],
  },
];

// ─── MARKET DATA ─────────────────────────────────────────────────────────────

const MARKET_DATA = [
  { label: "Middle East Sports Nutrition Market (2024)", value: "$1.04 Billion", trend: "+7.3% CAGR to 2033" },
  { label: "Brick & mortar channel dominance (Middle East)", value: "82.6%", trend: "Online only 17.4% — validates physical retail strategy" },
  { label: "Global jerky market CAGR", value: "6.7%", trend: "Single-serve packs: 48% of global jerky volume" },
  { label: "Beef jerky global market share", value: "51%", trend: "Dominant protein snack format — not a niche" },
  { label: "Clean-label influence on purchase decisions", value: "38%", trend: "Of all sports nutrition purchases globally" },
  { label: "Consumer protein snack preference (muscle support)", value: "46%", trend: "Prefer protein-based supplements for muscle support & recovery" },
  { label: "Established local beef jerky brand in Lebanon", value: "ZERO", trend: "First mover advantage is fully available — category is empty" },
];

// ─── OUR POWER POINTS ────────────────────────────────────────────────────────

const POWER_POINTS = [
  {
    rank: "01",
    title: "Halal — The Market Access Key",
    color: "#A8D8A8",
    middleman: "Removes a purchase objection that blocks every competitor from ~60% of Lebanon's consumer base. Store owner can confidently recommend to all customers without qualification.",
    enduser: "Consumer can pick up, read the mark, and purchase without research, doubt, or a conversation. The only product in the beef jerky category that can do this.",
    competitors_do: "None of the direct competitors carry Halal certification in the Lebanese market. This is not a small gap — it is a structural exclusion from the majority demographic.",
  },
  {
    rank: "02",
    title: "Zero Added Sugar — The Macro Truth",
    color: "#C8A96E",
    middleman: "Store staff can make a truthful, specific claim to every customer: 'This has zero added sugar.' Jack Link's cannot. Wild West cannot. No bar can match the simplicity of that statement for a fitness consumer.",
    enduser: "The athlete tracking macros sees no sugar on the label. No insulin spike. No crash. No guilt. This is not a 'low sugar' product — it is a no-sugar product. Categorically different.",
    competitors_do: "Jack Link's: sugar is ingredient #2. Wild West: 16–20g sugar per 100g. Quest: sucralose (GI complaints). Barebells: maltitol (GI complaints). All competitors have a sugar problem. We don't.",
  },
  {
    rank: "03",
    title: "Local Production — Price & Story",
    color: "#7EB5A6",
    middleman: "Local component means no import markup, no customs exposure, no currency risk on the product itself. KITS can price 30–40% below imported competitors while maintaining a better margin for the store.",
    enduser: "A locally produced product in Lebanon carries a 'supporting the local economy' resonance that imports cannot replicate. In a country that has faced severe economic pressure, buying Lebanese is an emotional differentiator that costs nothing to leverage.",
    competitors_do: "Every competitor is imported. Every one of them contributes zero to Lebanon's economy. Every one of them is subject to import disruption, currency volatility, and customs delays. We are structurally immune to these risks on the local production component.",
  },
  {
    rank: "04",
    title: "Sale-or-Return — The Zero-Risk Entry",
    color: "#9B8EC4",
    middleman: "No competitor offers sale-or-return to the Lebanese trade. This single term eliminates the only objection a gym owner or nutrition store has: 'What if it doesn't sell?' It reframes the relationship from vendor-buyer to partner.",
    enduser: "Indirect benefit — a store that takes zero risk in stocking our product will stock more of it, place it better, and recommend it more confidently than a product they paid upfront for.",
    competitors_do: "Jack Link's, Wild West, Quest, Barebells — all require upfront payment. No exceptions. No sale-or-return. The buyer assumes all inventory risk. Our model is structurally more generous than anything in market.",
  },
  {
    rank: "05",
    title: "Personal Service — The Relationship Moat",
    color: "#E07B6A",
    middleman: "KITS delivers personally, trains staff personally, checks in bi-weekly personally. No competitor does this at the gym and nutrition store level. The relationship becomes the product's strongest asset — harder to displace than any ingredient claim.",
    enduser: "Staff who are trained and believe in the product give unsolicited recommendations. This word-of-mouth from a trusted source (trainer, store staff) is the most powerful purchase driver in the Lebanese market.",
    competitors_do: "Importers and distributors manage 50–200 SKUs. Our brand is one of hundreds in their portfolio. No personal delivery, no staff training, no bi-weekly check-in. The relationship gap between us and every competitor is total.",
  },
  {
    rank: "06",
    title: "Lebanese BBQ — The Only Local Flavor",
    color: "#C8A96E",
    middleman: "A flavor that customers recognize and want. Stores carrying Jack Link's Teriyaki or Wild West Honey BBQ sell to a specific customer type. Our Lebanese BBQ sells to everyone — because it is a flavor that belongs here.",
    enduser: "A product that tastes like Lebanon — cedar smoke, Aleppo heat, pomegranate brightness — creates an emotional ownership that imported flavors cannot replicate. This is not a product from America or Europe that happens to be sold here. This is a Lebanese product.",
    competitors_do: "All direct competitors use American or British flavor conventions. None have designed a flavor brief for the Lebanese market. The entire flavor white space in this category is ours to take.",
  },
  {
    rank: "07",
    title: "Trilingual Packaging — The Compliance Advantage",
    color: "#7EB5A6",
    middleman: "Fully MoPH compliant Arabic labeling meets the legal requirement that no imported competitor fully meets. A store stocking our product faces zero regulatory risk. A store stocking poorly-labeled imports faces liability.",
    enduser: "Consumer can read the product in Arabic, English, or French. No translation barrier, no guessing at ingredients. Full transparency in every language the Lebanese consumer speaks.",
    competitors_do: "English-only packaging is the default for every imported competitor. None are designed for the Lebanese market. We are the only product in this category designed for Lebanon first.",
  },
];

// ─── SCORING ─────────────────────────────────────────────────────────────────

function ScoreDot({ score, color }) {
  return (
    <div style={{ display: "flex", gap: 3, flexWrap: "nowrap" }}>
      {[1,2,3,4,5].map(n => (
        <div key={n} style={{
          width: 7, height: 7, borderRadius: "50%",
          background: n <= score ? (color || "#A8D8A8") : "#1E1C2A",
          transition: "background 0.2s"
        }} />
      ))}
    </div>
  );
}

function ScoreBadge({ score, color }) {
  const label = score >= 5 ? "WINS" : score >= 4 ? "STRONG" : score >= 3 ? "FAIR" : "WEAK";
  const bg = score >= 5 ? "#1A2E1A" : score >= 4 ? "#1E1C10" : score >= 3 ? "#1A1820" : "#1A0E0E";
  const c = score >= 5 ? "#A8D8A8" : score >= 4 ? "#C8A96E" : score >= 3 ? "#9B8EC4" : "#E07B6A";
  return (
    <span style={{
      fontFamily: "monospace", fontSize: 9,
      color: c, background: bg,
      border: `1px solid ${c}40`,
      padding: "2px 6px", borderRadius: 2, whiteSpace: "nowrap"
    }}>
      {label}
    </span>
  );
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const TABS = [
  { id: "middleman", label: "Middleman View" },
  { id: "enduser", label: "End User View" },
  { id: "powerpoints", label: "Our Power Points" },
  { id: "market", label: "Market Data" },
];

const COMP_COLS = ["jacklinks", "wildwest", "questbar", "barebells", "ours"];
const COMP_SHORT = { jacklinks: "JL", wildwest: "WW", questbar: "QB", barebells: "BB", ours: "US" };

export default function CompetitiveAnalysis() {
  const [activeTab, setActiveTab] = useState("middleman");
  const [expandedCell, setExpandedCell] = useState(null);
  const [expandedPower, setExpandedPower] = useState(null);
  const [selectedComp, setSelectedComp] = useState("ours");

  const data = activeTab === "middleman" ? MIDDLEMAN_CRITERIA : USER_CRITERIA;

  const toggleCell = (key) => setExpandedCell(prev => prev === key ? null : key);
  const togglePower = (i) => setExpandedPower(prev => prev === i ? null : i);

  // Compute overall scores per competitor
  const computeScore = (compId, criteriaList) => {
    let total = 0, count = 0;
    criteriaList.forEach(cat => cat.criteria.forEach(cr => {
      if (cr[compId]) { total += cr[compId].score; count++; }
    }));
    return count ? Math.round((total / count) * 10) / 10 : 0;
  };

  const scores = {
    middleman: COMP_COLS.reduce((a, c) => ({ ...a, [c]: computeScore(c, MIDDLEMAN_CRITERIA) }), {}),
    enduser: COMP_COLS.reduce((a, c) => ({ ...a, [c]: computeScore(c, USER_CRITERIA) }), {}),
  };

  return (
    <div style={{
      fontFamily: "'Palatino Linotype', Georgia, serif",
      background: "#06050C",
      minHeight: "100vh",
      color: "#D8D0C8",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(160deg, #0A0818 0%, #0C0A16 100%)",
        borderBottom: "1px solid #1A1828",
        padding: "26px 36px 18px",
      }}>
        <div style={{ fontFamily: "monospace", fontSize: 10, color: "#3A3455", letterSpacing: "0.3em", marginBottom: 8 }}>
          KITS ADVISORY GROUP · COMPETITIVE INTELLIGENCE · REF: KAG-JRK-005 · CONFIDENTIAL
        </div>
        <h1 style={{ margin: 0, fontSize: "clamp(17px, 3vw, 27px)", fontWeight: 400, color: "#D8D0C8", lineHeight: 1.2 }}>
          Full Competitive Analysis — Beef Jerky & Protein Snacks
        </h1>
        <p style={{ margin: "6px 0 0", fontSize: 13, color: "#6A6088", fontFamily: "Palatino, Georgia, serif" }}>
          Lebanon Market · Middleman & End User Perspectives · A to Z
        </p>
      </div>

      {/* Score Summary Bar */}
      <div style={{
        background: "#08070F",
        borderBottom: "1px solid #14121E",
        padding: "14px 36px",
        display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center"
      }}>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#3A3455", marginRight: 8 }}>OVERALL SCORES →</span>
        {COMP_COLS.map(c => {
          const sc = scores.middleman[c];
          const comp = COMPETITORS[c];
          return (
            <button key={c} onClick={() => setSelectedComp(c)} style={{
              background: selectedComp === c ? `${comp.color}18` : "transparent",
              border: `1px solid ${selectedComp === c ? comp.color : "#1A1828"}`,
              borderRadius: 3, padding: "6px 12px",
              cursor: "pointer", transition: "all 0.15s",
              display: "flex", alignItems: "center", gap: 8
            }}>
              <span style={{ fontFamily: "monospace", fontSize: 10, color: comp.color }}>{COMP_SHORT[c]}</span>
              <span style={{ fontSize: 11, color: selectedComp === c ? "#D8D0C8" : "#4A4460" }}>
                {sc.toFixed(1)}/5
              </span>
            </button>
          );
        })}
      </div>

      {/* Tabs */}
      <div style={{
        background: "#07060E",
        borderBottom: "1px solid #14121E",
        display: "flex", flexWrap: "wrap", padding: "0 36px"
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            background: "transparent",
            border: "none",
            borderBottom: activeTab === t.id ? "2px solid #A8D8A8" : "2px solid transparent",
            color: activeTab === t.id ? "#D8D0C8" : "#3A3455",
            fontFamily: "monospace", fontSize: 10,
            letterSpacing: "0.15em",
            padding: "13px 18px 11px",
            cursor: "pointer", transition: "all 0.15s", whiteSpace: "nowrap"
          }}>
            {t.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ─── COMPARISON TABLES ─────────────────────────────────────────────── */}
      {(activeTab === "middleman" || activeTab === "enduser") && (
        <div style={{ padding: "28px 36px", overflowX: "auto" }}>

          {/* View label */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: "#A8D8A8", letterSpacing: "0.2em", marginBottom: 6 }}>
              {activeTab === "middleman" ? "MIDDLEMAN PERSPECTIVE — GYMS & NUTRITION STORES" : "END USER PERSPECTIVE — THE CONSUMER"}
            </div>
            <p style={{ margin: 0, fontSize: 13, color: "#5A5478", lineHeight: 1.75, maxWidth: 720 }}>
              {activeTab === "middleman"
                ? "What the gym owner, sports nutrition store manager, and pharmacy buyer evaluate when deciding whether to stock a product, reorder it, and recommend it to customers. Click any cell for the full analysis note."
                : "What the consumer — the Lebanese gym member, the health-conscious professional, the macro-tracker — evaluates at point of purchase and experiences over time. Click any cell for the full analysis note."}
            </p>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            {COMP_COLS.map(c => (
              <div key={c} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: COMPETITORS[c].color }} />
                <span style={{ fontFamily: "monospace", fontSize: 9, color: "#4A4468" }}>
                  {COMP_SHORT[c]} = {COMPETITORS[c].name}
                </span>
              </div>
            ))}
          </div>

          {data.map((cat, ci) => (
            <div key={ci} style={{ marginBottom: 32 }}>
              {/* Category header */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <span style={{ fontSize: 14, color: "#A8D8A8" }}>{cat.icon}</span>
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 400, color: "#C0B8B0", fontFamily: "monospace", letterSpacing: "0.15em" }}>
                  {cat.category.toUpperCase()}
                </h3>
              </div>

              {/* Criteria rows */}
              {cat.criteria.map((cr, ri) => (
                <div key={ri} style={{
                  background: ri % 2 === 0 ? "#0A091A" : "#080716",
                  border: "1px solid #14121E",
                  borderRadius: 3,
                  marginBottom: 2,
                  overflow: "hidden"
                }}>
                  {/* Row header */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "200px repeat(5, 1fr)",
                    gap: 1,
                    alignItems: "stretch",
                    minWidth: 700
                  }}>
                    {/* Criterion label */}
                    <div style={{ padding: "12px 14px", borderRight: "1px solid #14121E" }}>
                      <div style={{ fontSize: 12, color: "#8A8098", lineHeight: 1.5, fontFamily: "Palatino, Georgia, serif" }}>
                        {cr.label}
                      </div>
                    </div>

                    {/* Competitor cells */}
                    {COMP_COLS.map(c => {
                      const cell = cr[c];
                      const cellKey = `${ci}-${ri}-${c}`;
                      const isOpen = expandedCell === cellKey;
                      const comp = COMPETITORS[c];
                      return (
                        <button
                          key={c}
                          onClick={() => toggleCell(cellKey)}
                          style={{
                            background: isOpen ? `${comp.color}12` : "transparent",
                            border: "none",
                            borderRight: "1px solid #14121E",
                            padding: "10px 10px",
                            cursor: "pointer",
                            textAlign: "left",
                            transition: "background 0.15s"
                          }}
                        >
                          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                            <ScoreDot score={cell.score} color={comp.color} />
                            <ScoreBadge score={cell.score} />
                            <div style={{ fontFamily: "monospace", fontSize: 9, color: "#3A3455" }}>
                              {cell.value.length > 20 ? cell.value.slice(0, 20) + "…" : cell.value}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Expanded cell detail */}
                  {expandedCell && expandedCell.startsWith(`${ci}-${ri}-`) && (
                    <div style={{
                      padding: "12px 14px",
                      borderTop: "1px solid #14121E",
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: 8
                    }}>
                      {COMP_COLS.map(c => {
                        const cellKey = `${ci}-${ri}-${c}`;
                        if (expandedCell !== cellKey && !expandedCell.startsWith(`${ci}-${ri}-`)) return null;
                        const cell = cr[c];
                        const comp = COMPETITORS[c];
                        return (
                          <div key={c} style={{
                            background: "#08070F",
                            border: `1px solid ${comp.color}30`,
                            borderLeft: `3px solid ${comp.color}`,
                            borderRadius: 3,
                            padding: "10px 12px"
                          }}>
                            <div style={{ fontFamily: "monospace", fontSize: 9, color: comp.color, marginBottom: 4, letterSpacing: "0.1em" }}>
                              {COMP_SHORT[c]} — {comp.name}
                            </div>
                            <div style={{ fontFamily: "monospace", fontSize: 10, color: "#6A6088", marginBottom: 6 }}>
                              {cell.value}
                            </div>
                            <p style={{ margin: 0, fontSize: 12, color: "#6A6080", lineHeight: 1.7, fontFamily: "Palatino, Georgia, serif" }}>
                              {cell.note}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Overall score footer */}
          <div style={{ background: "#0A091A", border: "1px solid #1A1828", borderRadius: 4, padding: "18px 24px", marginTop: 8 }}>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: "#3A3455", letterSpacing: "0.2em", marginBottom: 14 }}>
              {activeTab === "middleman" ? "MIDDLEMAN" : "END USER"} OVERALL SCORE SUMMARY
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 8 }}>
              {COMP_COLS.map(c => {
                const sc = scores[activeTab === "middleman" ? "middleman" : "enduser"][c];
                const comp = COMPETITORS[c];
                const pct = Math.round((sc / 5) * 100);
                return (
                  <div key={c} style={{ background: "#06050C", border: `1px solid ${comp.color}30`, borderRadius: 3, padding: "12px 14px" }}>
                    <div style={{ fontFamily: "monospace", fontSize: 10, color: comp.color, marginBottom: 8 }}>
                      {COMP_SHORT[c]} — {comp.name}
                    </div>
                    <div style={{ height: 3, background: "#1A1828", borderRadius: 2, marginBottom: 6 }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: comp.color, borderRadius: 2, transition: "width 0.6s" }} />
                    </div>
                    <div style={{ fontFamily: "monospace", fontSize: 14, color: comp.color }}>{sc}/5</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ─── POWER POINTS ──────────────────────────────────────────────────── */}
      {activeTab === "powerpoints" && (
        <div style={{ padding: "28px 36px", maxWidth: 920 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: "#A8D8A8", letterSpacing: "0.2em", marginBottom: 8 }}>
              OUR COMPETITIVE POWER POINTS — ALL SEVEN
            </div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 400, color: "#D8D0C8" }}>Where We Win. Why. And What the Competition Cannot Match.</h2>
            <p style={{ fontSize: 13, color: "#5A5478", lineHeight: 1.8, marginTop: 10 }}>
              These are not marketing claims — they are structural advantages built into the product, the business model, and the go-to-market approach. Each one is specific, defensible, and verifiable. Each one answers a different objection from a different stakeholder.
            </p>
          </div>

          {POWER_POINTS.map((pp, i) => {
            const isOpen = expandedPower === i;
            return (
              <div key={i} style={{
                background: "#0A091A",
                border: `1px solid ${isOpen ? pp.color + "50" : "#14121E"}`,
                borderLeft: `4px solid ${pp.color}`,
                borderRadius: 4,
                marginBottom: 6,
                overflow: "hidden",
                transition: "border-color 0.2s"
              }}>
                <button onClick={() => togglePower(i)} style={{
                  display: "flex", alignItems: "center",
                  width: "100%", background: "transparent", border: "none",
                  padding: "16px 20px", cursor: "pointer", textAlign: "left", gap: 14
                }}>
                  <span style={{ fontFamily: "monospace", fontSize: 11, color: pp.color, flexShrink: 0 }}>{pp.rank}</span>
                  <span style={{ fontSize: 15, color: "#C8C0B8", flex: 1, fontFamily: "Palatino, Georgia, serif" }}>{pp.title}</span>
                  <span style={{ color: "#3A3455", fontSize: 16, flexShrink: 0 }}>{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <div style={{ padding: "0 20px 20px 50px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                      {[
                        { label: "MIDDLEMAN ADVANTAGE", text: pp.middleman, color: "#C8A96E" },
                        { label: "END USER ADVANTAGE", text: pp.enduser, color: "#7EB5A6" },
                      ].map((pane, pi) => (
                        <div key={pi} style={{
                          background: "#07060E",
                          border: `1px solid ${pane.color}20`,
                          borderTop: `2px solid ${pane.color}`,
                          borderRadius: 3, padding: "12px 14px"
                        }}>
                          <div style={{ fontFamily: "monospace", fontSize: 9, color: pane.color, marginBottom: 8, letterSpacing: "0.15em" }}>
                            {pane.label}
                          </div>
                          <p style={{ margin: 0, fontSize: 12, color: "#7A7090", lineHeight: 1.75 }}>{pane.text}</p>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: "#0E0A08", border: "1px solid #2E1A10", borderRadius: 3, padding: "12px 14px" }}>
                      <div style={{ fontFamily: "monospace", fontSize: 9, color: "#E07B6A", marginBottom: 6, letterSpacing: "0.15em" }}>
                        WHAT THE COMPETITION DOES INSTEAD
                      </div>
                      <p style={{ margin: 0, fontSize: 12, color: "#7A5A50", lineHeight: 1.75 }}>{pp.competitors_do}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Summary verdict */}
          <div style={{ background: "#080E0A", border: "1px solid #1E3020", borderRadius: 4, padding: "20px 24px", marginTop: 20 }}>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: "#A8D8A8", letterSpacing: "0.2em", marginBottom: 10 }}>
              KITS COMPETITIVE VERDICT
            </div>
            <p style={{ margin: 0, fontSize: 14, color: "#7A9A80", lineHeight: 1.85, fontFamily: "Palatino, Georgia, serif" }}>
              No single competitor in the Lebanese protein snack market holds more than three of these seven advantages simultaneously. We hold all seven. The imported jerky brands (Jack Link's, Wild West) have product recognition but fail on Halal, sugar content, price accessibility, local flavor, and personal service. The protein bars (Quest, Barebells) compete for the same fitness wallet but fail on ingredient authenticity, digestive comfort, and Halal compliance. <strong style={{ color: "#A8D8A8" }}>The combination of local production, Halal certification, zero-sugar clean ingredients, relationship-first distribution, and trilingual packaging does not exist in any other product in this market.</strong> This is not a competitive gap — it is a competitive vacuum. First mover captures it.
            </p>
          </div>
        </div>
      )}

      {/* ─── MARKET DATA ────────────────────────────────────────────────────── */}
      {activeTab === "market" && (
        <div style={{ padding: "28px 36px", maxWidth: 860 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: "#A8D8A8", letterSpacing: "0.2em", marginBottom: 8 }}>
              MARKET INTELLIGENCE — VERIFIED DATA POINTS
            </div>
            <h2 style={{ margin: 0, fontSize: 22, fontWeight: 400, color: "#D8D0C8" }}>The Numbers Behind the Opportunity</h2>
            <p style={{ fontSize: 13, color: "#5A5478", lineHeight: 1.8, marginTop: 10 }}>
              All market data is sourced from Grand View Research, Precedence Research, and Cognitive Market Research (2024–2025 editions). These figures validate the strategy — they did not create it. The strategy is correct because the market data confirms what field research shows on the ground in Lebanon.
            </p>
          </div>

          {MARKET_DATA.map((d, i) => (
            <div key={i} style={{
              background: i % 2 === 0 ? "#0A091A" : "#08070F",
              border: "1px solid #14121E",
              borderRadius: 3, marginBottom: 4,
              padding: "16px 20px",
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              gap: 20, flexWrap: "wrap"
            }}>
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ fontSize: 13, color: "#8A8098", lineHeight: 1.5, fontFamily: "Palatino, Georgia, serif" }}>{d.label}</div>
              </div>
              <div style={{ textAlign: "right", minWidth: 120 }}>
                <div style={{ fontFamily: "monospace", fontSize: 16, color: "#A8D8A8", marginBottom: 4 }}>{d.value}</div>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: "#4A4468" }}>{d.trend}</div>
              </div>
            </div>
          ))}

          {/* Strategic implications */}
          <div style={{ marginTop: 24 }}>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: "#C8A96E", letterSpacing: "0.2em", marginBottom: 14 }}>
              STRATEGIC IMPLICATIONS FOR THE LEBANESE LAUNCH
            </div>
            {[
              { headline: "Brick & mortar dominates at 82.6%", implication: "Your no-digital, relationship-first strategy is not conservative — it is scientifically aligned with how the Middle East actually buys sports nutrition. The data validates every decision to prioritize personal visits over any digital channel." },
              { headline: "Clean-label influences 38% of purchase decisions", implication: "Over one-third of all sports nutrition purchases in 2024 were driven primarily by ingredient transparency. Our short, readable ingredient list is not a design preference — it is a documented commercial advantage that converts at shelf." },
              { headline: "Middle East sports nutrition growing at 7.3% CAGR", implication: "This market is expanding. Every new gym member, every new CrossFit box, every wellness conversation in Lebanon adds to the addressable market. Entering now captures the growth curve, not just the current floor." },
              { headline: "Zero established local beef jerky brands in Lebanon", implication: "This is the single most important data point in this entire analysis. First mover in an empty category with a growing market and structural competitive advantages does not require disruption — it requires execution." },
            ].map((item, i) => (
              <div key={i} style={{
                background: "#0A091A",
                border: "1px solid #14121E",
                borderLeft: "3px solid #A8D8A8",
                borderRadius: 3, marginBottom: 6,
                padding: "14px 18px"
              }}>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: "#A8D8A8", marginBottom: 6 }}>{item.headline}</div>
                <p style={{ margin: 0, fontSize: 13, color: "#6A6080", lineHeight: 1.75, fontFamily: "Palatino, Georgia, serif" }}>{item.implication}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{
        padding: "16px 36px",
        borderTop: "1px solid #14121E",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8
      }}>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#1A1828", letterSpacing: "0.15em" }}>
          KITS ADVISORY GROUP · COMPETITIVE INTELLIGENCE · CONFIDENTIAL · NOT FOR DISTRIBUTION
        </span>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#1A1828" }}>KAG-JRK-005</span>
      </div>
    </div>
  );
}

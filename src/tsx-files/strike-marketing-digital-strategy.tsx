import React, { useState, useContext, createContext } from "react";
import { ThemeCtx } from "./pitch-theme";

// ─── DESIGN TOKENS — KITS ADVISORY GROUP ──────────────────────────────────────
const C = {
  void: "#050404", obsidian: "#0A0908", charcoal: "#141210", ash: "#1E1B18",
  ember: "#2A2520", smoke: "#2E2A26",
  gold: "#C8A050", goldBright: "#E0B860", goldDim: "#7A6030",
  cream: "#EDE0CC", creamDim: "#8A7A6A", creamMid: "#BEB0A0",
  green: "#3A6040", greenBright: "#5A9060",
  red: "#C04030", amber: "#C07030",
  purple: "#7060A0", steel: "#506080",
  teal: "#3A7080", blue: "#405080", coral: "#A05040",
};

// Local context — populated from ThemeCtx in the main component so all
// section sub-components automatically pick up light/dark token changes.
const MktCtx = createContext(C);

const DOC = {
  ref: "KAG-JRK-MKT-001",
  title: "MARKETING & E-MARKETING STRATEGY",
  sub: "Digital Infrastructure · E-Commerce · Content · Community · Financial Model",
  date: "JUNE 2026",
  client: "STRIKE BITES — CONFIDENTIAL",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "overview",        label: "OVERVIEW",        short: "01" },
  { id: "infrastructure",  label: "INFRASTRUCTURE",  short: "02" },
  { id: "platforms",       label: "PLATFORMS",       short: "03" },
  { id: "ecommerce",       label: "E-COMMERCE",      short: "04" },
  { id: "content",         label: "CONTENT",         short: "05" },
  { id: "community",       label: "COMMUNITY",       short: "06" },
  { id: "financials",      label: "FINANCIALS",      short: "07" },
  { id: "roadmap",         label: "ROADMAP",         short: "08" },
];

const STRATEGY_PILLARS = [
  { color: C.gold,       icon: "◈", title: "Physical-First. Digital-Amplified.", body: "82.6% of MENA sports nutrition purchases are in-store. The handshake closes the deal. Digital is the megaphone that makes the handshake mean something before it happens." },
  { color: C.teal,       icon: "◉", title: "Build the Trend. Not Just the Brand.", body: "Beef jerky is a non-essential snack. In Lebanon, non-essential wins when it feels inevitable — when everyone at the gym has seen it, talked about it, and wants to be the one who introduced it." },
  { color: C.greenBright,icon: "◇", title: "Community Before Commerce.", body: "Sell to the gym community, the trainer network, and the macro-tracking community — not to a generic audience. The first 1,000 customers build the brand more than any ad campaign." },
  { color: C.amber,      icon: "▣", title: "Organic Engine. Paid Accelerant.", body: "Organic content builds the brand. Paid ads accelerate what's already working. Never run paid ads on content that hasn't proven organic traction first. This sequencing saves budget and improves ROAS 3×." },
  { color: C.purple,     icon: "◆", title: "WhatsApp is Your CRM.", body: "In Lebanon, WhatsApp is where business happens. A well-managed WhatsApp Business account is worth more than a sophisticated CRM system. Every customer interaction starts and ends there." },
  { color: C.red,        icon: "◐", title: "Lebanese Pride. GCC-Ready From Day One.", body: "Every piece of content should be producible in Arabic + English. Every digital asset should be structurally export-ready. The Lebanese story IS the GCC marketing asset — document it from the beginning." },
];

const SETUP_CHECKLIST = [
  { phase: "PRE-LAUNCH WEEK 1", color: C.gold, items: [
    { task: "Reserve @strikebites handle on all platforms simultaneously", priority: "CRITICAL", note: "Instagram · TikTok · Facebook · X · YouTube · Pinterest · Snapchat" },
    { task: "Register domains: strikebites.com (primary), strikeprotein.com (backup), strikebites.app (future)", priority: "CRITICAL", note: "~$15–20/domain/year. Do all three on same day as trademark search." },
    { task: "Set up Google Workspace Starter — hello@strikebites.com", priority: "URGENT", note: "$6/user/month. Professional email essential for all B2B and regulatory correspondence." },
    { task: "Create Meta Business Suite account (links Facebook + Instagram ads)", priority: "URGENT", note: "Free. Required before running any paid ads on either platform." },
    { task: "Set up Google Analytics 4 + Google Search Console", priority: "HIGH", note: "Free. Track all website traffic from launch day." },
  ]},
  { phase: "PRE-LAUNCH WEEK 2–3", color: C.amber, items: [
    { task: "Deploy informational website (trilingual: EN + AR + FR)", priority: "CRITICAL", note: "Mobile-first. Product story, flavor, protein facts, stockist locator. No e-commerce at this stage." },
    { task: "Set up WhatsApp Business account (Lebanese number)", priority: "CRITICAL", note: "Business profile, product catalog, quick replies for top 10 FAQs. Free." },
    { task: "Set up TikTok Business Account", priority: "HIGH", note: "Free. Required before TikTok Ads Manager can be activated later." },
    { task: "Create Instagram Business account (convert from personal)", priority: "HIGH", note: "Brand bio, link-in-bio tool (Linktree free), profile photo = brand mark." },
    { task: "Set up Mailchimp (free up to 500 contacts)", priority: "MEDIUM", note: "Newsletter signup on website. Start collecting emails from Day 1 — each email is worth $5–15 in lifetime value." },
  ]},
  { phase: "LAUNCH (MONTH 1–2)", color: C.greenBright, items: [
    { task: "Activate Meta Ads Manager with first campaign", priority: "CRITICAL", note: "Minimum $400/month to generate meaningful reach. Lebanon CPM: $1.50–5.00." },
    { task: "Launch content calendar — 20 posts scheduled in advance", priority: "URGENT", note: "Never post reactively in the first 3 months. All content planned 2 weeks ahead." },
    { task: "Seed product to 10–15 nano-influencers (product-only cost)", priority: "HIGH", note: "Gym trainers, fitness accounts 1K–10K. No cash payment — product seeding only at this stage." },
    { task: "Set up Google My Business profile", priority: "HIGH", note: "Free. Appears in Google Maps searches. Essential for 'beef jerky Lebanon' discovery." },
    { task: "Activate link-in-bio: website → stockist map → WhatsApp order → newsletter", priority: "MEDIUM", note: "Use Linktree or Beacons. Rotate priority link based on phase." },
  ]},
];

const TOOL_STACK = [
  { category: "Social Management", tool: "Meta Business Suite", cost: "Free", use: "Manage Facebook + Instagram from one dashboard. Schedule posts, monitor comments, run ads." },
  { category: "Social Management", tool: "TikTok Business Center", cost: "Free", use: "Manage TikTok content, view analytics, activate TikTok Ads when ready." },
  { category: "Link-in-Bio", tool: "Linktree (Free Tier)", cost: "$0", use: "Single Instagram link → multiple destinations. Upgrade to Pro ($9/month) when analytics needed." },
  { category: "Email Marketing", tool: "Mailchimp", cost: "Free → $13/mo", use: "Free up to 500 contacts. Upgrade when list exceeds 500. Migrate to Klaviyo at e-commerce launch." },
  { category: "Email Marketing (E-com)", tool: "Klaviyo", cost: "$45/mo", use: "Activates at Phase 3 (Shopify launch). Abandoned cart, post-purchase, VIP sequences." },
  { category: "Analytics", tool: "Google Analytics 4", cost: "Free", use: "Website traffic, conversion tracking, user behavior. Connect to all ad platforms." },
  { category: "E-Commerce", tool: "Shopify Basic", cost: "$39/mo", use: "Activates Phase 3. Lebanese template build $1,500–2,500 (one-time)." },
  { category: "Payment (Lebanon)", tool: "Areeba / NetCommerce", cost: "$500–1,000 setup", use: "Lebanese credit/debit cards. Setup takes 4–8 weeks for merchant approval." },
  { category: "Payment (International)", tool: "Stripe (via offshore entity)", cost: "2.9% + $0.30/txn", use: "For GCC/diaspora online orders. Requires offshore entity (Cyprus or UAE)." },
  { category: "CRM / Ordering", tool: "WhatsApp Business", cost: "Free", use: "Primary customer service and informal ordering channel. Essential in Lebanese market." },
  { category: "Design / Content", tool: "Canva Pro", cost: "$15/mo", use: "Social media templates, Story designs, promotional graphics. KITS to set up brand kit." },
  { category: "Scheduling", tool: "Later (Free Tier)", cost: "$0 → $25/mo", use: "Schedule Instagram + TikTok posts. Visual calendar. Free tier: 30 posts/month." },
];

const PLATFORMS_DATA = [
  {
    name: "INSTAGRAM", priority: "PRIMARY — LAUNCH DAY", color: C.gold,
    icon: "◈", handle: "@strikebites",
    why: "Lebanon's dominant visual platform for 18–35 fitness consumers. 92% of Lebanese gym-goers use Instagram daily. This is where STRIKE builds its visual identity, community, and brand desire.",
    cadence: ["4–5 feed posts/week", "Daily Stories (6–10 slides)", "3 Reels/week minimum", "1 carousel/week (educational)"],
    content: ["Product beauty shots in gym environments", "Macro-tracking content (calories, protein per gram)", "Trainer features from the STRIKE TEAM", "Before/after taste reaction videos", "Lebanese flavor identity content", "UGC reposts from customers + trainers"],
    kpis: ["Follower growth: 200–500/month (Phase 1)", "Story views: >15% of followers", "Reel plays: >1,000/reel average", "Engagement rate: 3–6%"],
    lebanon: "Instagram Stories with Arabic overlay text convert 2× better than English-only in Lebanon. All Stories must include Arabic option.",
  },
  {
    name: "TIKTOK", priority: "SECONDARY — MONTH 2", color: C.teal,
    icon: "◉", handle: "@strikebites",
    why: "Lebanon's fastest-growing platform, dominant among 16–28. A single viral video can deliver the brand awareness of 6 months of traditional marketing. The algorithm rewards novelty — STRIKE is genuinely new.",
    cadence: ["3–5 short videos/week", "No paid ads until Month 6", "Jump on trending audio weekly", "Duet / Stitch responses to comments"],
    content: ["First-bite reaction challenges", "'Rate my snack' gym locker room content", "Protein comparison: STRIKE vs alternatives", "Lebanese pride content (cedar, Aleppo pepper origin stories)", "Trainer workout + STRIKE refuel combos", "Flavor reveal teaser content"],
    kpis: ["Video views: 500–5,000/video organic (Phase 1)", "Follower growth: 100–300/month", "At least 1 video >10,000 views in first 90 days"],
    lebanon: "Lebanese TikTok content in Arabic-English code-switching (Arabizi) gets 40–60% higher comment engagement than pure English. Post between 6–9 PM Beirut time.",
  },
  {
    name: "FACEBOOK", priority: "SUPPLEMENTARY + ADS PLATFORM", color: C.amber,
    icon: "▣", handle: "@strikebites",
    why: "Essential for paid advertising — Meta Ads Manager controls both Facebook and Instagram. Facebook Groups are where Lebanese gym communities organize. Organic reach is low, but the ads platform is the most cost-effective in the region.",
    cadence: ["3 feed posts/week (mirrored from Instagram)", "Active in 3–5 relevant Facebook Groups", "1 Facebook-native event per month (online events)"],
    content: ["Mirror top-performing Instagram posts", "Long-form protein education posts (Facebook audience skews older)", "Community Group engagement: answer questions, don't sell", "Facebook Live workouts with STRIKE TEAM trainers"],
    kpis: ["Page likes: not the KPI — ad account health is", "Group engagement: 20+ comments per relevant post", "Ad ROAS: >2.0× by Month 3"],
    lebanon: "Lebanon Facebook CPC: $0.15–0.60 (vs. global avg $1.72). A $400/month budget reaches 80,000–250,000 Beirut-area fitness consumers. Highest ROI paid channel available.",
  },
  {
    name: "WHATSAPP BUSINESS", priority: "OPERATIONAL — LAUNCH DAY", color: C.greenBright,
    icon: "◇", handle: "+961 XX XXX XXX",
    why: "In Lebanon, business happens on WhatsApp. It is the primary channel for customer service, informal ordering (Phase 1–2), trainer coordination, and VIP community groups. A well-managed WhatsApp presence is worth more than any CRM system.",
    cadence: ["Response time: < 2 hours (business hours)", "Weekly broadcast to opted-in customers", "STRIKE TEAM trainers private group (daily)", "Stockist updates to retail accounts"],
    content: ["New stockist announcements", "Weekly restock alerts for popular locations", "Exclusive offers for WhatsApp subscribers", "Trainer program updates (private group)", "Order confirmations and delivery tracking"],
    kpis: ["< 2 hr response time", "Weekly broadcast open rate: >85% (WhatsApp standard)", "Active opted-in subscribers: 200+ by Month 3"],
    lebanon: "Set up Quick Replies for: stockist locations, protein facts, price inquiry, wholesale inquiry, allergen information. These 5 cover 80% of inbound messages.",
  },
  {
    name: "EMAIL", priority: "NURTURE CHANNEL — MONTH 1", color: C.purple,
    icon: "◆", handle: "hello@strikebites.com",
    why: "Email is owned media — no algorithm controls who sees it. Build the list from Day 1. At 1,000 subscribers, a single email can generate $500–1,500 in direct revenue. In Phase 3 (e-commerce), email automation becomes the highest-ROI channel.",
    cadence: ["1 newsletter/month (Phase 1–2)", "Post-purchase automation sequence (Phase 3)", "Weekly email (Phase 3, e-commerce active)", "Abandoned cart sequence (Phase 3)"],
    content: ["Welcome email: brand story + Lebanese BBQ flavor origin", "Monthly nutrition education content", "New stockist announcements", "Product launch previews (STRIPS, STICKS)", "Exclusive subscriber offers"],
    kpis: ["List growth: 50–100 new subscribers/month", "Open rate: >35% (fitness niche average 28%)", "Click rate: >5%"],
    lebanon: "Offer something of value for email sign-up: a free '7-Day High-Protein Lebanese Meal Plan' PDF builds a list faster than a generic newsletter offer. Cost to produce: $200 once.",
  },
  {
    name: "YOUTUBE", priority: "LONG-TERM — MONTH 6+", color: C.steel,
    icon: "◐", handle: "@strikebites",
    why: "YouTube is the platform for long-form brand building and SEO authority. STRIKE TEAM trainers can publish workout tutorials featuring STRIKE. These videos rank on Google and build organic search presence for 'high-protein snacks Lebanon'.",
    cadence: ["1 video/month minimum (Phase 3+)", "YouTube Shorts mirrored from TikTok (always)"],
    content: ["STRIKE TEAM trainer workout series", "Lebanon protein food culture documentaries", "Product making: From Lebanese ranch to your gym bag", "Macro-tracking guides featuring STRIKE"],
    kpis: ["Not a primary KPI channel in Year 1", "YouTube Shorts views supplement TikTok reach"],
    lebanon: "YouTube Shorts are automatically distributed — every TikTok video should be simultaneously uploaded as a YouTube Short at no extra cost.",
  },
];

const ECOMMERCE_PHASES = [
  {
    phase: "PHASE 0–1", time: "Month -2 to 3", color: C.creamDim, status: "NO E-COMMERCE",
    title: "Informational Website Only",
    why: "Lebanese payment gateway approval takes 4–8 weeks. E-commerce infrastructure costs are not justified until the product is proven in physical channels. The informational website builds brand credibility for B2B buyers.",
    setup: ["Domain registered + hosting live", "Trilingual brand website (EN + AR + FR)", "Product page with nutritional panel", "Stockist locator map", "Email newsletter signup", "WhatsApp 'Order Now' button (opens WhatsApp chat)"],
    cost: "Website build: $1,200–1,800 (Lebanese agency / freelancer)\nHosting: $5–10/month (SiteGround or Namecheap)\nDomain: $15–20/year",
  },
  {
    phase: "PHASE 2", time: "Month 3–6", color: C.amber, status: "WHATSAPP COMMERCE",
    title: "Informal WhatsApp Ordering",
    why: "In Lebanon, consumers are already accustomed to ordering via WhatsApp. This costs nothing to set up and generates the first D2C revenue data before investing in Shopify.",
    setup: ["WhatsApp Business product catalog (free)", "Fixed-price DM ordering with screenshot payment (OMT/Western Union for banked-less)", "Torod or We Deliver for last-mile delivery", "Order tracking via WhatsApp message updates", "Manual payment reconciliation (cash or bank transfer)"],
    cost: "Setup: $0\nDelivery: Torod $3–6/order (within Beirut)\nPayment processing: Cash or OMT (~2.5% fee)",
  },
  {
    phase: "PHASE 3", time: "Month 6–9", color: C.gold, status: "SHOPIFY LAUNCH ← RECOMMENDED",
    title: "Shopify Store with Lebanese Payment Gateway",
    why: "Once physical channel sell-through is validated and the brand has a social following, e-commerce adds a D2C revenue stream with 70–80% gross margin (vs. 48–55% wholesale). Shopify is the right platform for Lebanon: easy to manage, mobile-optimized, and scales to GCC without rebuilding.",
    setup: ["Shopify Basic plan ($39/month)", "Lebanese agency template build: $1,500–2,500", "Areeba or NetCommerce payment gateway (4–8 week approval)", "WhatsApp 'Chat with Us' integration", "Product pages: BITES 40g + BITES 100g (multipack)", "Klaviyo email automation connected", "Google Analytics 4 e-commerce tracking"],
    cost: "Shopify build (one-time): $1,500–2,500\nShopify Basic subscription: $39/month\nAreeba gateway setup: $500–1,000 (one-time)\nKlaviyo email: $45/month",
  },
  {
    phase: "PHASE 4", time: "Month 12+", color: C.greenBright, status: "GCC-READY E-COMMERCE",
    title: "International D2C + GCC Export Channel",
    why: "The Lebanese diaspora in UAE, KSA, and Western markets creates immediate D2C demand. GCC-ready e-commerce requires an international payment gateway (Stripe via offshore entity) and multi-currency pricing.",
    setup: ["Upgrade to Shopify plan ($105/month) or Shopify Advanced ($299/month)", "Stripe payment gateway (via offshore UAE/Cyprus entity)", "Multi-currency: USD, AED, SAR", "International shipping rates (Aramex, DHL)", "Arabic language storefronts optimized for GCC consumers", "STRIKE PACKS product line added to store"],
    cost: "Shopify plan upgrade: +$66/month\nStripe: 2.9% + $0.30/transaction\nInternational shipping: $12–25/order depending on destination",
  },
];

const CONTENT_PILLARS = [
  {
    n: "01", color: C.gold, title: "PERFORMANCE PROOF",
    desc: "Content that validates STRIKE as the intelligent athlete's snack of choice.",
    formats: ["Protein-per-gram comparison graphics", "Macro-tracking screenshots featuring STRIKE", "Post-workout recovery meal plan posts", "Calorie density vs. satisfaction graphics"],
    freq: "2×/week",
  },
  {
    n: "02", color: C.teal, title: "PRODUCT STORY",
    desc: "The taste, the texture, the cube format — make people want it before they try it.",
    formats: ["First-bite slow-motion videos", "Flavor profile graphics (Aleppo pepper, cedar smoke)", "Pack format explainer (cubed = poppable)", "Unboxing / new shipment arrival content"],
    freq: "2×/week",
  },
  {
    n: "03", color: C.greenBright, title: "LEBANESE IDENTITY",
    desc: "Own the Lebanese provenance narrative. Made here. For us. By us.",
    formats: ["Ingredient origin stories (Aleppo pepper, sumac)", "Lebanese kitchen meets the gym culture", "Arabic-language content (Arabizi welcome)", "Cedar Lebanon pride moments"],
    freq: "1×/week",
  },
  {
    n: "04", color: C.amber, title: "COMMUNITY SPOTLIGHT",
    desc: "Feature the people who use STRIKE. Trainers, athletes, everyday gym-goers.",
    formats: ["STRIKE TEAM trainer features", "Customer transformation stories (with permission)", "Gym of the Month partnership post", "UGC reposts with permission + credit"],
    freq: "1–2×/week",
  },
  {
    n: "05", color: C.purple, title: "EDUCATION",
    desc: "Become the authority on high-protein snacking in Lebanon. Teach, don't sell.",
    formats: ["'Protein myth busted' series", "Label reading guide (what to check)", "'Is jerky healthy?' explainer", "Meal prep ideas featuring STRIKE"],
    freq: "1×/week",
  },
];

const WEEKLY_CALENDAR = [
  { day: "SAT", posts: [{ platform: "IG + FB", type: "Performance Proof", format: "Carousel", pillar: "01" }] },
  { day: "SUN", posts: [{ platform: "TikTok", type: "First-bite reaction", format: "Short video", pillar: "02" }, { platform: "IG Story", type: "Poll / Q&A", format: "Story", pillar: "05" }] },
  { day: "MON", posts: [{ platform: "IG Reel", type: "Workout + refuel combo", format: "Reel 15–30s", pillar: "04" }] },
  { day: "TUE", posts: [{ platform: "IG + FB", type: "Lebanese identity", format: "Single image", pillar: "03" }, { platform: "TikTok", type: "Trending audio + product", format: "TikTok", pillar: "02" }] },
  { day: "WED", posts: [{ platform: "IG Story", type: "Stockist highlight", format: "Story", pillar: "04" }] },
  { day: "THU", posts: [{ platform: "IG Reel", type: "Education short", format: "Reel 30–60s", pillar: "05" }, { platform: "TikTok", type: "Community UGC", format: "TikTok", pillar: "04" }] },
  { day: "FRI", posts: [{ platform: "IG + FB + TikTok", type: "Product beauty shot (weekend engagement peak)", format: "Multi-platform", pillar: "01" }] },
];

const INFLUENCER_TIERS = [
  {
    tier: "NANO", followers: "1K – 10K", color: C.greenBright,
    cost: "Product seeding only (zero cash)",
    Lebanon: "Gym trainers, university athletes, fitness beginners with authentic followings",
    approach: "Send welcome pack (24 units + referral card). No formal contract. No posting requirement. Genuine enthusiasm only.",
    volume: "15–20 nano accounts (Phase 1)",
    roi: "Each nano account reaches 300–800 real people in their gym community. 20 accounts = 6,000–16,000 highly targeted impressions for product cost only.",
  },
  {
    tier: "MICRO", followers: "10K – 50K", color: C.amber,
    cost: "$100 – $350 per post (+ product)",
    Lebanon: "Fitness content creators, personal trainers with strong following, nutritionists",
    approach: "Paid collaboration. Brief: authentic integration — product in workout, meal prep, or gym bag. No scripted reviews. Deliverable: 1 Reel + 3 Stories minimum.",
    volume: "3–5 paid micro posts/month (Phase 2+)",
    roi: "At $250/post reaching 15,000 followers with 4.5% engagement rate: 675 genuine interactions. CPE = $0.37. Industry benchmark for fitness = $0.80.",
  },
  {
    tier: "MID-TIER", followers: "50K – 200K", color: C.gold,
    cost: "$400 – $900 per campaign",
    Lebanon: "Celebrity trainers, fitness personalities, lifestyle influencers with dedicated fitness content",
    approach: "Formal contract. 30-day exclusivity from competing products. Multiple deliverables: 1 Reel + dedicated Story + logo in bio for 30 days.",
    volume: "1–2 mid-tier campaigns per quarter (Phase 3+)",
    roi: "Brand-building investment, not direct-response. Mid-tier posts drive brand legitimacy that converts at point-of-sale. Track 30-day stockist sell-through uplift.",
  },
  {
    tier: "TRAINER AMBASSADOR DIGITAL EXTENSION", followers: "Any size", color: C.purple,
    cost: "Product allocation + $40/month performance incentive",
    Lebanon: "The 20 STRIKE TEAM founding trainers (from physical GTM strategy) extended to digital",
    approach: "Each trainer given: unique discount code (TRAINER_NAME20), monthly product allocation (24 units), Instagram story template designs, posting guidance (not scripting). Trainers post when and how feels natural.",
    volume: "20 trainers × 1–2 posts/month = 20–40 organic pieces/month at near-zero cost",
    roi: "20 trainers, average 800 followers each = 16,000 highly captive gym audience reached monthly. Cost: product + $800/month total. Equivalent paid reach would cost $3,000–6,000.",
  },
];

const EVENTS_DATA = [
  { name: "Beirut Marathon (Registration)", month: "Nov", type: "Sponsorship / Sampling", budget: "$800–1,500", note: "Protein snack sampling booth. 15,000+ runners and spectators. Highest single-day brand impression event in Lebanon." },
  { name: "Fitness Expo Lebanon", month: "Q4 annually", type: "Exhibition Booth", budget: "$1,200–2,500", note: "Booth + sampling + STRIKE TEAM demonstration. Lebanese fitness industry's premier gathering." },
  { name: "Gym Open Day Activations", month: "Monthly", type: "In-Gym Event", budget: "$200–400/event", note: "Partner with gym (mutual promotion). STRIKE samples available at all new-member orientation days." },
  { name: "CrossFit Lebanon Competitions", month: "Quarterly", type: "Sponsorship + Sampling", budget: "$500–1,000", note: "CrossFit community: the highest per-capita protein consumption demographic. Direct alignment with STRIKE." },
  { name: "University Sports Days", month: "Spring + Fall", type: "Campus Sampling", budget: "$300–600", note: "AUB, LAU, LU, USJ sports days. Reach the 18–24 demographic that defines trends." },
  { name: "Ramadan Fitness Campaign", month: "Ramadan (Mar–Apr)", type: "Digital + Sampling", budget: "$400–800", note: "Suhoor high-protein content campaign. CPMs rise during Ramadan but purchase intent is highest of the year. Do NOT pause ads." },
];

const FIN = {
  tiers: {
    a: { label: "TIER A · DIGITAL PRESENCE", subtitle: "Organic-only. Social accounts + website. No paid advertising.", color: C.steel },
    b: { label: "TIER B · ACTIVE DIGITAL", subtitle: "Full strategy. Paid Meta ads, influencers, e-commerce Phase 3.", color: C.gold },
    c: { label: "TIER C · FULL DIGITAL", subtitle: "Aggressive growth. Full paid stack, TikTok ads, e-commerce from Month 4.", color: C.greenBright },
  },
  setup: [
    { item: "Domain registration (3 domains × 3 years)", a: 150, b: 150, c: 150 },
    { item: "Google Workspace Starter (email + Drive, 3 users)", a: 72, b: 72, c: 144 },
    { item: "Informational website — design, dev, trilingual", a: 800, b: 1500, c: 2500 },
    { item: "Launch content shoot (product + lifestyle photography)", a: 400, b: 1000, c: 2000 },
    { item: "Social media profile design (bio, covers, Story templates)", a: 0, b: 0, c: 0, note: "Included in KAG-JRK-004 Brand Brief" },
    { item: "E-commerce build — Shopify template + Lebanese payment gateway setup", a: 0, b: 2500, c: 4000, note: "Tier A deferred — activates if Phase 3 decision taken" },
    { item: "WhatsApp Business API premium (for broadcast lists 500+)", a: 0, b: 0, c: 400 },
    { item: "Canva Pro (annual — brand kit, social templates)", a: 0, b: 180, c: 180 },
    { item: "Email lead magnet — '7-Day High-Protein Lebanese Meal Plan' PDF", a: 0, b: 200, c: 200 },
  ],
  monthly: [
    {
      phase: "PHASE 1 — LAUNCH", time: "Month 1–3", color: C.amber,
      rows: [
        { item: "Meta ads — Facebook + Instagram (Lebanon audience)", a: 0, b: 400, c: 800 },
        { item: "Content creation — photography, video, copy (monthly retainer)", a: 200, b: 500, c: 1000 },
        { item: "Nano-influencer seeding (product cost only — 5 accounts)", a: 80, b: 150, c: 300 },
        { item: "Email marketing (Mailchimp free tier)", a: 0, b: 0, c: 0 },
        { item: "Later.com scheduling tool (free tier)", a: 0, b: 0, c: 25 },
        { item: "Shopify subscription", a: 0, b: 0, c: 0, note: "Not active Phase 1" },
      ],
    },
    {
      phase: "PHASE 2 — GROWTH", time: "Month 3–6", color: C.gold,
      rows: [
        { item: "Meta ads — scaled (Facebook + Instagram)", a: 0, b: 550, c: 1100 },
        { item: "TikTok ads — minimal test budget", a: 0, b: 150, c: 400 },
        { item: "Content creation — monthly retainer", a: 200, b: 550, c: 1100 },
        { item: "Micro-influencer paid posts (1–2/month)", a: 100, b: 300, c: 600 },
        { item: "Shopify Basic subscription", a: 0, b: 39, c: 39 },
        { item: "Klaviyo email (e-commerce automation)", a: 0, b: 45, c: 45 },
        { item: "Linktree Pro (analytics for link-in-bio)", a: 0, b: 9, c: 9 },
      ],
    },
    {
      phase: "PHASE 3 — SCALE", time: "Month 6–12", color: C.greenBright,
      rows: [
        { item: "Meta ads — Lebanon (brand awareness + conversion)", a: 150, b: 750, c: 1500 },
        { item: "TikTok ads (organic proven content boosted)", a: 0, b: 250, c: 600 },
        { item: "Content creation — monthly retainer (expanded)", a: 200, b: 600, c: 1200 },
        { item: "Influencer program — structured (micro + trainer)", a: 150, b: 400, c: 1000 },
        { item: "Shopify subscription + payment apps", a: 0, b: 79, c: 129 },
        { item: "Klaviyo email automation", a: 0, b: 45, c: 80 },
        { item: "Event activations (monthly allocation)", a: 100, b: 250, c: 600 },
        { item: "Google Ads — branded search protection", a: 0, b: 100, c: 200 },
        { item: "Analytics tools (GA4 free + Hotjar free tier)", a: 0, b: 0, c: 50 },
      ],
    },
  ],
  totals: {
    a: { setup: 1422, ph1_mo: 280, ph2_mo: 300, ph3_mo: 600, year1: 9022 },
    b: { setup: 5602, ph1_mo: 1050, ph2_mo: 1643, ph3_mo: 2474, year1: 27023 },
    c: { setup: 9574, ph1_mo: 2125, ph2_mo: 3293, ph3_mo: 5359, year1: 58168 },
  },
  roi: [
    { channel: "Meta Ads (Lebanon)", spend_yr1_b: "$6,900", attributed_rev: "$14,000–22,000", roas: "2.0–3.2×", note: "Revenue from online orders + offline awareness lift" },
    { channel: "Influencer Program", spend_yr1_b: "$2,700", attributed_rev: "$8,000–15,000", roas: "3.0–5.5×", note: "Trainer network generates highest per-dollar return" },
    { channel: "E-Commerce (Shopify)", spend_yr1_b: "$2,902 setup + running", attributed_rev: "$6,000–14,000 D2C", roas: "2.1–4.8×", note: "D2C margin 70–80% vs 48–55% wholesale" },
    { channel: "Content Creation", spend_yr1_b: "$6,000", attributed_rev: "Brand equity, not direct", roas: "Compounding", note: "Content built in Year 1 earns reach in Years 2–3" },
    { channel: "Events + Activations", spend_yr1_b: "$2,500", attributed_rev: "$5,000–10,000 in-period", roas: "2.0–4.0×", note: "Highest-impact channel for sell-through velocity" },
  ],
};

const ROADMAP = [
  {
    month: "M-2 → M0", label: "PRE-LAUNCH", color: C.steel,
    digital: ["Reserve all social handles simultaneously", "Register strikebites.com + backups", "Set up Google Workspace (email)", "Build informational website (trilingual)", "Set up Meta Business Suite + GA4", "Create WhatsApp Business profile", "Produce launch content: 30-post backlog before Day 1"],
    physical: ["Manufacturer contact + nutritional panel", "SARL registration", "Brand brief to designer", "MoPH submission preparation"],
    gate: "WEBSITE LIVE + 30 POSTS SCHEDULED before first physical account visit",
  },
  {
    month: "M1 → M3", label: "LAUNCH", color: C.amber,
    digital: ["Activate Meta ads campaign ($400/month)", "Publish 4–5 Instagram posts/week", "Seed product to 15 nano-influencers", "Launch WhatsApp Business for customer queries", "Start email list building (lead magnet live)", "TikTok: 3 videos/week organic"],
    physical: ["20–30 accounts opened", "STRIKE TEAM: 20 trainers activated", "Sale-or-return first placements", "Bi-weekly account visits by KITS"],
    gate: "1,000 Instagram followers · 200 WhatsApp subscribers · First 10 e-commerce inquiries logged",
  },
  {
    month: "M3 → M6", label: "GROWTH", color: C.gold,
    digital: ["Scale Meta ads to $550/month", "Launch TikTok ads ($150/month test)", "Activate WhatsApp informal ordering", "Begin Shopify build (approval in parallel)", "Launch 2 paid micro-influencer posts/month", "First fitness event activation (gym open day)"],
    physical: ["60–80 accounts active", "Pharmacy channel opens (Month 4)", "KITS bi-weekly check-ins, sell-through reporting"],
    gate: "Shopify store live · 500 email subscribers · 3,000 Instagram followers",
  },
  {
    month: "M6 → M12", label: "SCALE", color: C.greenBright,
    digital: ["Shopify store fully operational with Areeba gateway", "Klaviyo post-purchase email sequences live", "Meta ads $750/month — conversion campaigns", "TikTok $250/month — boosting proven organic content", "Structured influencer program: 3–5 micro/month", "CrossFit Lebanon event sponsorship", "Google Ads branded search protection ($100/month)", "Begin YouTube content: STRIKE TEAM workout series"],
    physical: ["Modern trade approach: Spinneys, TSC, Bou Khalil", "80–130 active accounts", "STRIPS second SKU evaluation"],
    gate: "Month 12: GCC export readiness assessment · $5,000+ monthly D2C revenue",
  },
  {
    month: "M12 → M24", label: "EXPAND", color: C.purple,
    digital: ["GCC Meta ads activated (UAE + KSA audiences)", "Arabic-primary content for GCC digital", "Shopify multi-currency + international shipping", "Stripe gateway (via offshore entity)", "GCC micro-influencer program", "Beirut Marathon sponsorship (November)", "Email list: 2,000+ subscribers, weekly cadence"],
    physical: ["UAE distributor engaged", "STRIKE PACKS launched (multipack GCC format)", "Lebanon: 150–200+ accounts"],
    gate: "D2C revenue $10,000+/month · GCC first shipment complete",
  },
];

// ─── UTILITY COMPONENTS ───────────────────────────────────────────────────────

function GoldLine() {
  const C = useContext(MktCtx);
  return <div style={{ height: 1, background: `linear-gradient(to right,${C.gold}40,transparent)`, margin: "20px 0" }} />;
}

function SectionHead({ label, title, sub, color }: { label: string; title: string; sub?: string; color?: string }) {
  const C = useContext(MktCtx);
  const resolvedColor = color ?? C.gold;
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ fontFamily: "monospace", fontSize: 9, color: resolvedColor, letterSpacing: "0.4em", marginBottom: 8, opacity: 0.7 }}>
        {label}
      </div>
      <h2 style={{ fontFamily: "Georgia,'Times New Roman',serif", fontSize: "clamp(20px,2.5vw,32px)", fontWeight: 400, color: C.cream, margin: "0 0 10px", lineHeight: 1.2 }}>
        {title}
      </h2>
      {sub && <p style={{ fontFamily: "Georgia,serif", fontSize: 14, color: C.creamDim, margin: 0, lineHeight: 1.7, maxWidth: 680 }}>{sub}</p>}
      <div style={{ width: 56, height: 2, background: `linear-gradient(to right,${resolvedColor},transparent)`, marginTop: 12 }} />
    </div>
  );
}

function Tag({ text, color }: { text: string; color: string }) {
  return (
    <span style={{ fontFamily: "monospace", fontSize: 8, color, background: `${color}12`, border: `1px solid ${color}30`, padding: "3px 8px", borderRadius: 2, letterSpacing: "0.06em", whiteSpace: "nowrap" }}>
      {text}
    </span>
  );
}

function InfoCard({ children, color, style = {} }: { children: React.ReactNode; color?: string; style?: React.CSSProperties }) {
  const C = useContext(MktCtx);
  const resolvedColor = color ?? C.gold;
  return (
    <div style={{
      background: `${resolvedColor}10`,
      border: `1px solid ${resolvedColor}30`,
      borderLeft: `3px solid ${resolvedColor}`,
      borderRadius: 3,
      padding: "16px 20px",
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── SECTION: OVERVIEW ────────────────────────────────────────────────────────
function OverviewSection() {
  const C = useContext(MktCtx);
  return (
    <div style={{ padding: "clamp(20px,3vw,36px) clamp(16px,4vw,40px) clamp(40px,5vw,60px)", maxWidth: 1100 }}>
      <SectionHead
        label="§01 · MARKETING & E-MARKETING STRATEGY"
        title="The Strategy That Makes STRIKE a Trend"
        sub="A brand that is only known in the gym cannot scale. A brand that is felt on the street, seen on every feed, and spoken about in every WhatsApp group becomes a cultural fixture — and a cultural fixture sells itself. This is the framework for making STRIKE inevitable."
      />

      {/* Philosophy banner */}
      <InfoCard color={C.gold} style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "monospace", fontSize: 9, color: C.gold, letterSpacing: "0.3em", marginBottom: 8 }}>STRATEGIC POSITION</div>
        <p style={{ fontFamily: "Georgia,serif", fontSize: 15, color: C.cream, margin: 0, lineHeight: 1.75 }}>
          STRIKE's go-to-market is correctly physical-first. This document does not change that. What it adds is the <span style={{ color: C.goldBright }}>digital amplification layer</span> that transforms a product sold in 30 gyms into a <span style={{ color: C.goldBright }}>brand that 300,000 Lebanese fitness consumers know, want, and seek out</span> — before they ever see it on a shelf.
        </p>
      </InfoCard>

      {/* Strategy pillars */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 12, marginBottom: 28 }}>
        {STRATEGY_PILLARS.map((p, i) => (
          <InfoCard key={i} color={p.color}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 18, color: p.color }}>{p.icon}</span>
              <div style={{ fontFamily: "monospace", fontSize: 8.5, color: p.color, letterSpacing: "0.08em" }}>{p.title}</div>
            </div>
            <p style={{ fontSize: 12.5, color: C.creamMid, margin: 0, lineHeight: 1.7 }}>{p.body}</p>
          </InfoCard>
        ))}
      </div>

      <GoldLine />

      {/* What's missing from the pitch */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontFamily: "monospace", fontSize: 9, color: C.amber, letterSpacing: "0.3em", marginBottom: 16 }}>★ WHAT THIS DOCUMENT ADDS TO THE PITCH</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 8 }}>
          {[
            ["Digital Infrastructure", "Which accounts, in which order, with which tools — from Week 1."],
            ["Platform Strategy", "Instagram, TikTok, Facebook, WhatsApp, Email — role and cadence for each."],
            ["E-Commerce Roadmap", "Phase-gated online store strategy: website → WhatsApp → Shopify → GCC."],
            ["Content Framework", "5 content pillars, weekly calendar, and format guide for every channel."],
            ["Influencer & Community Plan", "Nano-to-mid-tier influencer strategy. Trainer ambassador digital extension."],
            ["Full Financial Model", "Every cost, by phase, by tier — with ROI projection per channel."],
          ].map(([t, b], i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "12px 16px", background: `${C.amber}07`, border: `1px solid ${C.amber}18`, borderRadius: 3 }}>
              <span style={{ color: C.amber, fontSize: 12, flexShrink: 0 }}>→</span>
              <div>
                <div style={{ fontFamily: "monospace", fontSize: 9, color: C.amber, marginBottom: 4, letterSpacing: "0.06em" }}>{t}</div>
                <p style={{ margin: 0, fontSize: 12, color: C.creamDim, lineHeight: 1.6 }}>{b}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lebanon-specific context box */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 12 }}>
        {[
          { label: "LEBANON META CPM", value: "$1.50–5.00", sub: "vs. $8–20 in GCC — extraordinary value", color: C.gold },
          { label: "LEBANON META CPC", value: "$0.15–0.60", sub: "Meaningful campaigns from $300–500/month", color: C.teal },
          { label: "INSTAGRAM PENETRATION", value: "92%", sub: "Of Lebanese 18–35 urban consumers", color: C.greenBright },
        ].map((s, i) => (
          <InfoCard key={i} color={s.color} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: s.color, letterSpacing: "0.25em", marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 28, color: s.color, lineHeight: 1, marginBottom: 6 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: C.creamDim }}>{s.sub}</div>
          </InfoCard>
        ))}
      </div>
    </div>
  );
}

// ─── SECTION: INFRASTRUCTURE ──────────────────────────────────────────────────
function InfrastructureSection() {
  const C = useContext(MktCtx);
  const [openPhase, setOpenPhase] = useState(0);
  return (
    <div style={{ padding: "clamp(20px,3vw,36px) clamp(16px,4vw,40px) clamp(40px,5vw,60px)", maxWidth: 1100 }}>
      <SectionHead
        label="§02 · DIGITAL INFRASTRUCTURE"
        title="Setup Checklist — In Priority Order"
        sub="Digital infrastructure must be in place before the first physical account visit. An account buyer who searches @strikebites and finds nothing is a trust signal failure. Every handle, every domain, and the informational website must exist on Day 1 of the physical launch."
        color={C.teal}
      />

      <InfoCard color={C.red} style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "monospace", fontSize: 8.5, color: C.red, letterSpacing: "0.2em", marginBottom: 6 }}>⚠ CRITICAL SEQUENCE RULE</div>
        <p style={{ fontSize: 13, color: C.cream, margin: 0, lineHeight: 1.7 }}>
          Handle reservation and domain registration must happen <strong>simultaneously</strong> with the trademark search — not after it. A trademarked brand name is worthless if @strikebites is already taken on Instagram the week after you file. <span style={{ color: C.goldBright }}>Reserve all handles on the same day the trademark search is commissioned.</span>
        </p>
      </InfoCard>

      {/* Setup Checklist */}
      {SETUP_CHECKLIST.map((phase, pi) => (
        <div key={pi} style={{ marginBottom: 8 }}>
          <button
            onClick={() => setOpenPhase(openPhase === pi ? -1 : pi)}
            style={{ width: "100%", background: openPhase === pi ? `${phase.color}10` : C.charcoal, border: `1px solid ${openPhase === pi ? phase.color : C.ash}40`, borderRadius: 3, padding: "14px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", WebkitTapHighlightColor: "transparent" }}
          >
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <span style={{ fontFamily: "monospace", fontSize: 9, color: phase.color, letterSpacing: "0.3em" }}>{phase.phase}</span>
              <span style={{ fontSize: 11, color: C.creamDim }}>{phase.items.length} actions</span>
            </div>
            <span style={{ color: phase.color, fontSize: 12 }}>{openPhase === pi ? "▲" : "▼"}</span>
          </button>
          {openPhase === pi && (
            <div style={{ border: `1px solid ${phase.color}20`, borderTop: "none", borderRadius: "0 0 3px 3px", overflow: "hidden" }}>
              {phase.items.map((item, ii) => (
                <div key={ii} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 16, padding: "14px 20px", borderBottom: ii < phase.items.length - 1 ? `1px solid ${C.ash}30` : "none", background: ii % 2 === 0 ? `${C.charcoal}80` : "transparent" }}>
                  <div>
                    <p style={{ margin: "0 0 4px", fontSize: 13, color: C.cream, lineHeight: 1.5 }}>{item.task}</p>
                    {item.note && <p style={{ margin: 0, fontFamily: "monospace", fontSize: 10, color: C.creamDim, lineHeight: 1.5 }}>{item.note}</p>}
                  </div>
                  <Tag text={item.priority} color={item.priority === "CRITICAL" ? C.red : item.priority === "URGENT" ? C.amber : C.greenBright} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <GoldLine />

      {/* Tool Stack */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: "monospace", fontSize: 9, color: C.teal, letterSpacing: "0.3em", marginBottom: 16 }}>TOOL STACK — FULL YEAR 1</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.gold}30` }}>
                {["Category", "Tool", "Cost", "Purpose"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontFamily: "monospace", fontSize: 9, color: C.gold, letterSpacing: "0.15em", fontWeight: 400 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TOOL_STACK.map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${C.ash}30`, background: i % 2 === 0 ? `${C.charcoal}50` : "transparent" }}>
                  <td style={{ padding: "10px 12px", color: C.creamDim, fontFamily: "monospace", fontSize: 9 }}>{row.category}</td>
                  <td style={{ padding: "10px 12px", color: C.cream, fontWeight: 500 }}>{row.tool}</td>
                  <td style={{ padding: "10px 12px", color: C.gold, fontFamily: "monospace", whiteSpace: "nowrap" }}>{row.cost}</td>
                  <td style={{ padding: "10px 12px", color: C.creamMid, lineHeight: 1.5 }}>{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── SECTION: PLATFORMS ───────────────────────────────────────────────────────
function PlatformsSection() {
  const C = useContext(MktCtx);
  const [active, setActive] = useState(0);
  const p = PLATFORMS_DATA[active];
  return (
    <div style={{ padding: "clamp(20px,3vw,36px) clamp(16px,4vw,40px) clamp(40px,5vw,60px)", maxWidth: 1100 }}>
      <SectionHead
        label="§03 · PLATFORM STRATEGY"
        title="Six Channels. One Brand Voice."
        sub="Each platform has a distinct role, cadence, and content type. STRIKE should not sound the same everywhere — it should feel the same. The obsidian aesthetic, the performance confidence, and the Lebanese identity are consistent. The format adapts."
        color={C.amber}
      />

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {PLATFORMS_DATA.map((pl, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ background: active === i ? `${pl.color}15` : C.charcoal, border: `1px solid ${active === i ? pl.color : C.ash}40`, borderRadius: 3, padding: "8px 14px", cursor: "pointer", fontFamily: "monospace", fontSize: 9, color: active === i ? pl.color : C.creamDim, letterSpacing: "0.08em", WebkitTapHighlightColor: "transparent", transition: "all 0.15s" }}>
            {pl.icon} {pl.name}
          </button>
        ))}
      </div>

      <div style={{ border: `1px solid ${p.color}25`, borderRadius: 4, overflow: "hidden" }}>
        <div style={{ background: `${p.color}12`, borderBottom: `1px solid ${p.color}25`, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <span style={{ fontSize: 22, color: p.color }}>{p.icon}</span>
              <span style={{ fontFamily: "Georgia,serif", fontSize: 22, color: C.cream }}>{p.name}</span>
            </div>
            <div style={{ fontFamily: "monospace", fontSize: 10, color: C.creamDim }}>{p.handle}</div>
          </div>
          <Tag text={p.priority} color={p.color} />
        </div>

        <div style={{ padding: "20px clamp(14px,2vw,24px)", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 20 }}>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: p.color, letterSpacing: "0.2em", marginBottom: 10 }}>WHY THIS PLATFORM</div>
            <p style={{ fontSize: 13, color: C.creamMid, lineHeight: 1.75, margin: 0 }}>{p.why}</p>
          </div>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: p.color, letterSpacing: "0.2em", marginBottom: 10 }}>POSTING CADENCE</div>
            {p.cadence.map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                <span style={{ color: p.color, fontSize: 10, flexShrink: 0 }}>·</span>
                <span style={{ fontSize: 12.5, color: C.cream }}>{c}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: p.color, letterSpacing: "0.2em", marginBottom: 10 }}>CONTENT TYPES</div>
            {p.content.map((c, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5 }}>
                <span style={{ color: p.color, fontSize: 10, flexShrink: 0 }}>→</span>
                <span style={{ fontSize: 12, color: C.creamMid }}>{c}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: p.color, letterSpacing: "0.2em", marginBottom: 10 }}>KPIS — PHASE 1</div>
            {p.kpis.map((k, i) => (
              <div key={i} style={{ fontSize: 12, color: C.creamMid, marginBottom: 5, padding: "5px 10px", background: `${p.color}08`, borderRadius: 2 }}>{k}</div>
            ))}
            <div style={{ marginTop: 12, padding: "10px 12px", background: `${C.teal}10`, border: `1px solid ${C.teal}25`, borderRadius: 2 }}>
              <div style={{ fontFamily: "monospace", fontSize: 8, color: C.teal, letterSpacing: "0.15em", marginBottom: 4 }}>LEBANON-SPECIFIC NOTE</div>
              <p style={{ fontSize: 11.5, color: C.creamMid, margin: 0, lineHeight: 1.6 }}>{p.lebanon}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SECTION: E-COMMERCE ──────────────────────────────────────────────────────
function ECommerceSection() {
  const C = useContext(MktCtx);
  const [activePhase, setActivePhase] = useState(2);
  const ep = ECOMMERCE_PHASES[activePhase];
  return (
    <div style={{ padding: "clamp(20px,3vw,36px) clamp(16px,4vw,40px) clamp(40px,5vw,60px)", maxWidth: 1100 }}>
      <SectionHead
        label="§04 · E-COMMERCE STRATEGY"
        title="Online Store — Phase-Gated Approach"
        sub="Do not build an e-commerce store before the product is validated in physical channels. In Lebanon, e-commerce is not the primary discovery channel for a new food brand — but it becomes essential at Month 6+ for D2C margin capture and GCC reach."
        color={C.purple}
      />

      <InfoCard color={C.amber} style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: "monospace", fontSize: 8.5, color: C.amber, letterSpacing: "0.2em", marginBottom: 6 }}>KEY LEBANON E-COMMERCE CONTEXT</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 12 }}>
          {[
            ["Payment Gateway Approval", "4–8 weeks for Areeba or NetCommerce merchant approval. Start the process at Month 4, not Month 6."],
            ["WhatsApp Commerce First", "Lebanese consumers will DM on WhatsApp before they'll complete a Shopify checkout. Build WhatsApp ordering first."],
            ["Mobile-First Mandatory", "78% of Lebanese web traffic is mobile. Any e-commerce build that is not mobile-first will not convert."],
          ].map(([t, b], i) => (
            <div key={i}>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: C.amber, marginBottom: 6 }}>{t}</div>
              <p style={{ fontSize: 12, color: C.creamMid, margin: 0, lineHeight: 1.6 }}>{b}</p>
            </div>
          ))}
        </div>
      </InfoCard>

      {/* Phase selector */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {ECOMMERCE_PHASES.map((ph, i) => (
          <button key={i} onClick={() => setActivePhase(i)} style={{ background: activePhase === i ? `${ph.color}15` : C.charcoal, border: `1px solid ${activePhase === i ? ph.color : C.ash}40`, borderRadius: 3, padding: "8px 16px", cursor: "pointer", transition: "all 0.15s", WebkitTapHighlightColor: "transparent" }}>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: activePhase === i ? ph.color : C.creamDim, letterSpacing: "0.1em" }}>{ph.phase}</div>
            <div style={{ fontSize: 10, color: activePhase === i ? C.cream : C.creamDim, marginTop: 2 }}>{ph.time}</div>
          </button>
        ))}
      </div>

      <div style={{ border: `1px solid ${ep.color}25`, borderRadius: 4, overflow: "hidden", marginBottom: 28 }}>
        <div style={{ background: `${ep.color}10`, padding: "20px 24px", borderBottom: `1px solid ${ep.color}20` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontFamily: "Georgia,serif", fontSize: 20, color: C.cream }}>{ep.title}</span>
            <Tag text={ep.status} color={ep.color} />
          </div>
          <p style={{ fontSize: 13, color: C.creamMid, margin: 0, lineHeight: 1.7 }}>{ep.why}</p>
        </div>
        <div style={{ padding: "20px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 20 }}>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: ep.color, letterSpacing: "0.2em", marginBottom: 10 }}>SETUP ACTIONS</div>
            {ep.setup.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
                <span style={{ color: ep.color, fontSize: 10, flexShrink: 0, marginTop: 2 }}>✓</span>
                <span style={{ fontSize: 12.5, color: C.cream, lineHeight: 1.5 }}>{s}</span>
              </div>
            ))}
          </div>
          <InfoCard color={ep.color}>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: ep.color, letterSpacing: "0.2em", marginBottom: 10 }}>COST BREAKDOWN</div>
            <pre style={{ fontFamily: "monospace", fontSize: 11.5, color: C.creamMid, margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.75 }}>{ep.cost}</pre>
          </InfoCard>
        </div>
      </div>

      {/* Platform comparison table */}
      <div style={{ fontFamily: "monospace", fontSize: 9, color: C.purple, letterSpacing: "0.3em", marginBottom: 14 }}>PLATFORM DECISION — SHOPIFY vs. WOOCOMMERCE IN LEBANON</div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.gold}30` }}>
              {["Criteria", "Shopify Basic ($39/mo)", "WooCommerce (WordPress)"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontFamily: "monospace", fontSize: 9, color: C.gold, letterSpacing: "0.1em", fontWeight: 400 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Setup time to live", "4–6 weeks (Lebanese agency)", "8–14 weeks (more complex)"],
              ["Technical complexity", "Low — managed by Shopify", "High — requires ongoing dev"],
              ["Monthly running cost", "$39/month fixed", "$10–30/month hosting + plugins"],
              ["Arabic RTL support", "Paid theme add-on ($50–200)", "Free plugin (Polylang)"],
              ["Lebanese payment gateway", "Areeba integration available", "WooCommerce gateway plugins"],
              ["Mobile conversion rate", "3.8% industry average", "1.4–2.5% (requires optimization)"],
              ["GCC scalability", "Multi-currency built-in", "Requires WooCommerce currency plugin"],
              ["KITS VERDICT", "✓ RECOMMENDED — Phase 3", "Consider only if budget >$5,000"],
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${C.ash}30`, background: i === 7 ? `${C.gold}08` : i % 2 === 0 ? `${C.charcoal}50` : "transparent" }}>
                <td style={{ padding: "10px 14px", color: C.creamDim, fontFamily: i === 7 ? "monospace" : "inherit", fontSize: i === 7 ? 9 : 12 }}>{row[0]}</td>
                <td style={{ padding: "10px 14px", color: i === 7 ? C.gold : C.cream }}>{row[1]}</td>
                <td style={{ padding: "10px 14px", color: i === 7 ? C.creamDim : C.creamMid }}>{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── SECTION: CONTENT STRATEGY ────────────────────────────────────────────────
function ContentSection() {
  const C = useContext(MktCtx);
  const [activePillar, setActivePillar] = useState(0);
  const pl = CONTENT_PILLARS[activePillar];
  return (
    <div style={{ padding: "clamp(20px,3vw,36px) clamp(16px,4vw,40px) clamp(40px,5vw,60px)", maxWidth: 1100 }}>
      <SectionHead
        label="§05 · CONTENT STRATEGY"
        title="Five Pillars. One Brand. Zero Generic Posts."
        sub="Every single piece of content STRIKE publishes should answer one question before it's posted: 'Does this make a gym-goer in Beirut feel something?' If the answer is no, the content doesn't go out. Volume is never the goal. Desire is."
        color={C.green}
      />

      {/* Pillar selector */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {CONTENT_PILLARS.map((p, i) => (
          <button key={i} onClick={() => setActivePillar(i)} style={{ background: activePillar === i ? `${p.color}15` : C.charcoal, border: `1px solid ${activePillar === i ? p.color : C.ash}40`, borderRadius: 3, padding: "8px 16px", cursor: "pointer", WebkitTapHighlightColor: "transparent", transition: "all 0.15s" }}>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: activePillar === i ? p.color : C.creamDim, letterSpacing: "0.15em" }}>PILLAR {p.n}</div>
            <div style={{ fontSize: 10.5, color: activePillar === i ? C.cream : C.creamDim, marginTop: 2 }}>{p.title}</div>
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16, marginBottom: 32 }}>
        <InfoCard color={pl.color}>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: pl.color, letterSpacing: "0.2em", marginBottom: 8 }}>PILLAR {pl.n} · {pl.title}</div>
          <p style={{ fontSize: 13.5, color: C.cream, margin: "0 0 14px", lineHeight: 1.7 }}>{pl.desc}</p>
          <div style={{ fontFamily: "monospace", fontSize: 8.5, color: pl.color }}>FREQUENCY: {pl.freq}/week per platform</div>
        </InfoCard>
        <InfoCard color={pl.color}>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: pl.color, letterSpacing: "0.2em", marginBottom: 10 }}>CONTENT FORMATS</div>
          {pl.formats.map((f, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <span style={{ color: pl.color, fontSize: 10, flexShrink: 0 }}>→</span>
              <span style={{ fontSize: 12.5, color: C.cream, lineHeight: 1.5 }}>{f}</span>
            </div>
          ))}
        </InfoCard>
      </div>

      {/* Weekly Calendar */}
      <div style={{ fontFamily: "monospace", fontSize: 9, color: C.green, letterSpacing: "0.3em", marginBottom: 16 }}>WEEKLY PUBLISHING CALENDAR</div>
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", marginBottom: 28 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6, minWidth: 560 }}>
        {WEEKLY_CALENDAR.map((day, di) => {
          return (
            <div key={di} style={{ background: C.charcoal, border: `1px solid ${C.ash}40`, borderRadius: 3, padding: "10px 8px", minHeight: 100 }}>
              <div style={{ fontFamily: "monospace", fontSize: 9, color: C.gold, letterSpacing: "0.2em", marginBottom: 8, textAlign: "center" }}>{day.day}</div>
              {day.posts.map((post, pi) => {
                const pc = CONTENT_PILLARS.find(p => p.n === post.pillar);
                return (
                  <div key={pi} style={{ padding: "5px 6px", background: `${pc?.color || C.steel}12`, border: `1px solid ${pc?.color || C.steel}25`, borderRadius: 2, marginBottom: 4 }}>
                    <div style={{ fontFamily: "monospace", fontSize: 7, color: pc?.color || C.steel, marginBottom: 2 }}>{post.platform}</div>
                    <div style={{ fontSize: 9.5, color: C.cream, lineHeight: 1.4 }}>{post.type}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      </div>

      {/* UGC and Trending Content */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 12 }}>
        <InfoCard color={C.teal}>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: C.teal, letterSpacing: "0.2em", marginBottom: 10 }}>UGC STRATEGY (USER-GENERATED CONTENT)</div>
          {[
            "Every customer photo reposted = free content + social proof",
            "Create a hashtag: #StrikeBites and #ProteinLebanese — promote in packaging QR code",
            "Monthly 'Best UGC' feature on Instagram Stories drives more UGC in a cycle",
            "Request permission via DM before reposting — reply rate in Lebanon is >70%",
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
              <span style={{ color: C.teal, fontSize: 10 }}>·</span>
              <span style={{ fontSize: 12, color: C.creamMid }}>{t}</span>
            </div>
          ))}
        </InfoCard>
        <InfoCard color={C.amber}>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: C.amber, letterSpacing: "0.2em", marginBottom: 10 }}>VIRAL-READY CONTENT IDEAS FOR TIKTOK / REELS</div>
          {[
            "'Guess the protein' challenge — competitor bar vs STRIKE BITES",
            "'Day in the life of a Beirut trainer' featuring STRIKE",
            "Lebanese grandma reacts to beef jerky (culture collision content)",
            "'Is this a diet snack or a cheat snack?' debate format",
            "Aleppo pepper origin story — travel from farmer to your gym bag",
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 7 }}>
              <span style={{ color: C.amber, fontSize: 10 }}>→</span>
              <span style={{ fontSize: 12, color: C.creamMid }}>{t}</span>
            </div>
          ))}
        </InfoCard>
      </div>
    </div>
  );
}

// ─── SECTION: COMMUNITY & EVENTS ─────────────────────────────────────────────
function CommunitySection() {
  const C = useContext(MktCtx);
  const [activeTier, setActiveTier] = useState(0);
  const it = INFLUENCER_TIERS[activeTier];
  return (
    <div style={{ padding: "clamp(20px,3vw,36px) clamp(16px,4vw,40px) clamp(40px,5vw,60px)", maxWidth: 1100 }}>
      <SectionHead
        label="§06 · COMMUNITY & EVENTS"
        title="Influencer Strategy · Sports Events · WhatsApp Communities"
        sub="In Lebanon, trust moves through people — not platforms. The most powerful marketing STRIKE can run is 20 trainers who genuinely believe in the product, and who mention it to every client, in every session, without being paid to."
        color={C.red}
      />

      {/* Influencer tiers */}
      <div style={{ fontFamily: "monospace", fontSize: 9, color: C.red, letterSpacing: "0.3em", marginBottom: 14 }}>INFLUENCER PROGRAM</div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {INFLUENCER_TIERS.map((t, i) => (
          <button key={i} onClick={() => setActiveTier(i)} style={{ background: activeTier === i ? `${t.color}15` : C.charcoal, border: `1px solid ${activeTier === i ? t.color : C.ash}40`, borderRadius: 3, padding: "8px 16px", cursor: "pointer", WebkitTapHighlightColor: "transparent", transition: "all 0.15s" }}>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: activeTier === i ? t.color : C.creamDim, letterSpacing: "0.1em" }}>{t.tier}</div>
            <div style={{ fontSize: 10, color: activeTier === i ? C.cream : C.creamDim, marginTop: 2 }}>{t.followers}</div>
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 16, marginBottom: 28 }}>
        <InfoCard color={it.color}>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: it.color, letterSpacing: "0.15em", marginBottom: 10 }}>{it.tier} · {it.followers}</div>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontFamily: "monospace", fontSize: 8, color: C.creamDim }}>COST: </span>
            <span style={{ fontSize: 13, color: C.cream }}>{it.cost}</span>
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: C.creamDim, marginBottom: 4 }}>WHO IN LEBANON:</div>
            <p style={{ fontSize: 12.5, color: C.creamMid, margin: 0, lineHeight: 1.6 }}>{it.Lebanon}</p>
          </div>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: C.creamDim, marginBottom: 4 }}>APPROACH:</div>
            <p style={{ fontSize: 12, color: C.creamMid, margin: 0, lineHeight: 1.6 }}>{it.approach}</p>
          </div>
        </InfoCard>
        <div>
          <InfoCard color={it.color} style={{ marginBottom: 10 }}>
            <div style={{ fontFamily: "monospace", fontSize: 8.5, color: it.color, letterSpacing: "0.15em", marginBottom: 6 }}>VOLUME RECOMMENDATION</div>
            <p style={{ fontSize: 13, color: C.cream, margin: 0 }}>{it.volume}</p>
          </InfoCard>
          <InfoCard color={C.greenBright}>
            <div style={{ fontFamily: "monospace", fontSize: 8.5, color: C.greenBright, letterSpacing: "0.15em", marginBottom: 6 }}>ROI CASE</div>
            <p style={{ fontSize: 12.5, color: C.creamMid, margin: 0, lineHeight: 1.65 }}>{it.roi}</p>
          </InfoCard>
        </div>
      </div>

      <GoldLine />

      {/* Events */}
      <div style={{ fontFamily: "monospace", fontSize: 9, color: C.red, letterSpacing: "0.3em", marginBottom: 14 }}>EVENTS & ACTIVATIONS CALENDAR</div>
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", marginBottom: 28 }}>
      <div style={{ display: "grid", gap: 8, minWidth: 480 }}>
        {EVENTS_DATA.map((ev, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 140px 1fr 100px", gap: 12, padding: "12px 16px", background: C.charcoal, border: `1px solid ${C.ash}30`, borderRadius: 3, alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 8, color: C.creamDim, marginBottom: 2 }}>EVENT</div>
              <div style={{ fontSize: 12, color: C.cream, lineHeight: 1.4 }}>{ev.name}</div>
            </div>
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 8, color: C.creamDim, marginBottom: 2 }}>TIMING</div>
              <div style={{ fontSize: 11.5, color: C.creamMid }}>{ev.month}</div>
            </div>
            <div style={{ fontSize: 11.5, color: C.creamDim, lineHeight: 1.5 }}>{ev.note}</div>
            <div style={{ textAlign: "right" }}>
              <Tag text={ev.budget} color={C.gold} />
            </div>
          </div>
        ))}
      </div>
      </div>

      {/* WhatsApp Community Strategy */}
      <div style={{ fontFamily: "monospace", fontSize: 9, color: C.red, letterSpacing: "0.3em", marginBottom: 14 }}>WHATSAPP COMMUNITY ARCHITECTURE</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10 }}>
        {[
          { title: "STRIKE TEAM (Private)", color: C.gold, desc: "20 founding trainers. Daily updates, product restocks, training content, ambassador offers. Managed by KITS. Trainers self-post — no forced content." },
          { title: "STOCKIST UPDATES (Broadcast)", color: C.teal, desc: "Retail accounts receive restock notifications, pricing updates, and sell-through tips. One-way broadcast. No group chaos." },
          { title: "VIP CUSTOMERS (Group)", color: C.purple, desc: "First 100 customers. Exclusive early access, flavor votes, feedback requests. Launch once you have 50 repeat buyers — not before." },
        ].map((g, i) => (
          <InfoCard key={i} color={g.color}>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: g.color, letterSpacing: "0.12em", marginBottom: 8 }}>{g.title}</div>
            <p style={{ fontSize: 12, color: C.creamMid, margin: 0, lineHeight: 1.65 }}>{g.desc}</p>
          </InfoCard>
        ))}
      </div>
    </div>
  );
}

// ─── SECTION: FINANCIALS ──────────────────────────────────────────────────────
function FinancialsSection() {
  const C = useContext(MktCtx);
  const [tier, setTier] = useState<"a" | "b" | "c">("b");
  const T = FIN.tiers[tier];
  const totals = FIN.totals[tier];

  const setupTotal = FIN.setup.reduce((s, r) => s + (r[tier] || 0), 0);

  return (
    <div style={{ padding: "clamp(20px,3vw,36px) clamp(16px,4vw,40px) clamp(40px,5vw,60px)", maxWidth: 1100 }}>
      <SectionHead
        label="§07 · FINANCIAL MODEL — DIGITAL MARKETING"
        title="Every Cost. Every Phase. Every Return."
        sub="Digital marketing is a separate budget layer from the production and operations budgets already modelled. These costs represent the incremental investment required to build brand awareness, create demand, and capture D2C revenue through online channels."
        color={C.gold}
      />

      {/* Tier selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {Object.entries(FIN.tiers).map(([key, t]) => (
          <button key={key} onClick={() => setTier(key as "a" | "b" | "c")} style={{ flex: 1, background: tier === key ? `${t.color}15` : C.charcoal, border: `1px solid ${tier === key ? t.color : C.ash}40`, borderRadius: 3, padding: "14px 16px", cursor: "pointer", textAlign: "left", WebkitTapHighlightColor: "transparent", transition: "all 0.15s" }}>
            <div style={{ fontFamily: "monospace", fontSize: 8.5, color: tier === key ? t.color : C.creamDim, letterSpacing: "0.1em", marginBottom: 4 }}>{t.label}</div>
            <div style={{ fontSize: 11, color: tier === key ? C.cream : C.creamDim, lineHeight: 1.4 }}>{t.subtitle}</div>
            {key === "b" && <div style={{ fontFamily: "monospace", fontSize: 8, color: C.gold, marginTop: 6 }}>← KITS RECOMMENDED</div>}
          </button>
        ))}
      </div>

      {/* Year 1 summary banner */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))", gap: 10, marginBottom: 24 }}>
        {[
          { label: "TOTAL SETUP COSTS", value: `$${setupTotal.toLocaleString()}`, sub: "One-time investments" },
          { label: "AVG MONTHLY SPEND", value: `$${Math.round((totals.ph1_mo + totals.ph2_mo + totals.ph3_mo) / 3).toLocaleString()}`, sub: "Across all phases" },
          { label: "YEAR 1 TOTAL DIGITAL", value: `$${totals.year1.toLocaleString()}`, sub: "Including setup + running" },
          { label: "AS % OF PROJECTED REVENUE", value: tier === "a" ? "5–7%" : tier === "b" ? "12–18%" : "22–30%", sub: "Of gross Year 1 revenue" },
        ].map((s, i) => (
          <InfoCard key={i} color={T.color} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: T.color, letterSpacing: "0.2em", marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 24, color: T.color, lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 10.5, color: C.creamDim }}>{s.sub}</div>
          </InfoCard>
        ))}
      </div>

      {/* Setup costs */}
      <div style={{ fontFamily: "monospace", fontSize: 9, color: T.color, letterSpacing: "0.25em", marginBottom: 12 }}>SETUP COSTS — ONE-TIME</div>
      <div style={{ overflowX: "auto", marginBottom: 24 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${T.color}30` }}>
              {["Line Item", "A · Presence", "B · Active", "C · Full"].map(h => (
                <th key={h} style={{ textAlign: h === "Line Item" ? "left" : "right", padding: "8px 12px", fontFamily: "monospace", fontSize: 9, color: T.color, fontWeight: 400, letterSpacing: "0.1em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FIN.setup.map((row, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${C.ash}20`, background: i % 2 === 0 ? `${C.charcoal}50` : "transparent" }}>
                <td style={{ padding: "9px 12px", color: C.cream, lineHeight: 1.4 }}>
                  {row.item}
                  {row.note && <div style={{ fontSize: 10, color: C.creamDim, marginTop: 2 }}>{row.note}</div>}
                </td>
                {(["a", "b", "c"] as const).map(t => (
                  <td key={t} style={{ padding: "9px 12px", textAlign: "right", fontFamily: "monospace", color: tier === t ? T.color : C.creamDim, fontSize: 12, fontWeight: tier === t ? 600 : 400 }}>
                    {row[t] === 0 ? "—" : `$${row[t].toLocaleString()}`}
                  </td>
                ))}
              </tr>
            ))}
            <tr style={{ borderTop: `2px solid ${T.color}40`, background: `${T.color}06` }}>
              <td style={{ padding: "10px 12px", fontFamily: "monospace", fontSize: 9, color: T.color, letterSpacing: "0.1em" }}>TOTAL SETUP</td>
              {(["a", "b", "c"] as const).map(t => (
                <td key={t} style={{ padding: "10px 12px", textAlign: "right", fontFamily: "monospace", color: tier === t ? T.color : C.creamDim, fontWeight: 700, fontSize: 13 }}>
                  ${FIN.setup.reduce((s, r) => s + (r[t] || 0), 0).toLocaleString()}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Monthly costs by phase */}
      {FIN.monthly.map((ph, pi) => (
        <div key={pi} style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: ph.color, letterSpacing: "0.25em" }}>{ph.phase} — {ph.time}</div>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to right,${ph.color}30,transparent)` }} />
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <tbody>
                {ph.rows.map((row, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${C.ash}20`, background: i % 2 === 0 ? `${C.charcoal}50` : "transparent" }}>
                    <td style={{ padding: "9px 12px", color: C.cream, lineHeight: 1.4 }}>{row.item}</td>
                    {(["a", "b", "c"] as const).map(t => (
                      <td key={t} style={{ padding: "9px 12px", textAlign: "right", fontFamily: "monospace", color: tier === t ? ph.color : C.creamDim, fontSize: 12, fontWeight: tier === t ? 600 : 400, width: 100 }}>
                        {row[t] === 0 ? "—" : `$${row[t].toLocaleString()}/mo`}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr style={{ borderTop: `1px solid ${ph.color}40`, background: `${ph.color}06` }}>
                  <td style={{ padding: "9px 12px", fontFamily: "monospace", fontSize: 9, color: ph.color }}>TOTAL / MONTH</td>
                  {(["a", "b", "c"] as const).map(t => {
                    const mo_total = ph.rows.reduce((s, r) => s + (r[t] || 0), 0);
                    return (
                      <td key={t} style={{ padding: "9px 12px", textAlign: "right", fontFamily: "monospace", color: tier === t ? ph.color : C.creamDim, fontWeight: 700, fontSize: 13, width: 100 }}>
                        ${mo_total.toLocaleString()}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}

      <GoldLine />

      {/* ROI Projections */}
      <div style={{ fontFamily: "monospace", fontSize: 9, color: C.gold, letterSpacing: "0.3em", marginBottom: 14 }}>ROI PROJECTIONS — TIER B (STANDARD) · YEAR 1</div>
      <div style={{ overflowX: "auto", marginBottom: 24 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${C.gold}30` }}>
              {["Channel", "Year 1 Spend (Tier B)", "Attributed Revenue", "ROAS", "Notes"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "9px 12px", fontFamily: "monospace", fontSize: 9, color: C.gold, fontWeight: 400, letterSpacing: "0.08em" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FIN.roi.map((row, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${C.ash}25`, background: i % 2 === 0 ? `${C.charcoal}50` : "transparent" }}>
                <td style={{ padding: "10px 12px", color: C.cream, fontWeight: 500 }}>{row.channel}</td>
                <td style={{ padding: "10px 12px", color: C.gold, fontFamily: "monospace" }}>{row.spend_yr1_b}</td>
                <td style={{ padding: "10px 12px", color: C.greenBright, fontFamily: "monospace" }}>{row.attributed_rev}</td>
                <td style={{ padding: "10px 12px", color: C.amber, fontFamily: "monospace", fontWeight: 700 }}>{row.roas}</td>
                <td style={{ padding: "10px 12px", color: C.creamDim, fontSize: 11 }}>{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InfoCard color={C.amber}>
        <div style={{ fontFamily: "monospace", fontSize: 8.5, color: C.amber, letterSpacing: "0.2em", marginBottom: 8 }}>CRITICAL BUDGET POSITION NOTE</div>
        <p style={{ fontSize: 13, color: C.cream, margin: "0 0 8px", lineHeight: 1.75 }}>
          The digital marketing budget modelled here is <strong>separate from and in addition to</strong> the three production/operations budget tiers (Lean $18.5K / Standard $42K / Full $82K). Digital marketing should be treated as its own funding decision, phased alongside operations.
        </p>
        <p style={{ fontSize: 12.5, color: C.creamMid, margin: 0, lineHeight: 1.7 }}>
          KITS recommendation: Tier B ($27K Year 1 digital) alongside the Standard $42K operations tier. Combined Year 1 investment: $69K. Projected Year 1 gross profit (from existing model): $161K. Digital marketing spend as % of gross profit: 16.7% — within the 12–20% industry benchmark for an emerging food brand in a new category.
        </p>
      </InfoCard>
    </div>
  );
}

// ─── SECTION: ROADMAP ─────────────────────────────────────────────────────────
function RoadmapSection() {
  const C = useContext(MktCtx);
  const [activeMonth, setActiveMonth] = useState(1);
  const rm = ROADMAP[activeMonth];
  return (
    <div style={{ padding: "clamp(20px,3vw,36px) clamp(16px,4vw,40px) clamp(40px,5vw,60px)", maxWidth: 1100 }}>
      <SectionHead
        label="§08 · PHASE ROADMAP"
        title="Month-by-Month Digital Execution Plan"
        sub="Every digital action is synchronized with the physical go-to-market. Digital pre-launch happens 2 months before the first physical account visit. Digital scale happens after physical sell-through is proven."
        color={C.purple}
      />

      {/* Phase selector */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        {ROADMAP.map((rm, i) => (
          <button key={i} onClick={() => setActiveMonth(i)} style={{ background: activeMonth === i ? `${rm.color}15` : C.charcoal, border: `1px solid ${activeMonth === i ? rm.color : C.ash}40`, borderRadius: 3, padding: "8px 14px", cursor: "pointer", WebkitTapHighlightColor: "transparent", transition: "all 0.15s" }}>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: activeMonth === i ? rm.color : C.creamDim, letterSpacing: "0.1em" }}>{rm.month}</div>
            <div style={{ fontSize: 10, color: activeMonth === i ? C.cream : C.creamDim, marginTop: 2 }}>{rm.label}</div>
          </button>
        ))}
      </div>

      <div style={{ border: `1px solid ${rm.color}25`, borderRadius: 4, overflow: "hidden", marginBottom: 24 }}>
        <div style={{ background: `${rm.color}10`, padding: "18px 24px", borderBottom: `1px solid ${rm.color}20`, display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: rm.color, letterSpacing: "0.3em" }}>{rm.month}</div>
            <div style={{ fontFamily: "Georgia,serif", fontSize: 22, color: C.cream, marginTop: 4 }}>{rm.label} PHASE</div>
          </div>
          <InfoCard color={C.greenBright} style={{ padding: "8px 14px" }}>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: C.greenBright, letterSpacing: "0.15em", marginBottom: 3 }}>PHASE GATE</div>
            <div style={{ fontSize: 11, color: C.cream, lineHeight: 1.5 }}>{rm.gate}</div>
          </InfoCard>
        </div>
        <div style={{ padding: "20px 24px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 24 }}>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: rm.color, letterSpacing: "0.2em", marginBottom: 12 }}>DIGITAL ACTIONS</div>
            {rm.digital.map((action, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, padding: "8px 12px", background: `${rm.color}06`, border: `1px solid ${rm.color}15`, borderLeft: `2px solid ${rm.color}40`, borderRadius: 2 }}>
                <span style={{ color: rm.color, fontSize: 10, flexShrink: 0, marginTop: 1 }}>▸</span>
                <span style={{ fontSize: 12.5, color: C.cream, lineHeight: 1.5 }}>{action}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: C.creamDim, letterSpacing: "0.2em", marginBottom: 12 }}>PARALLEL PHYSICAL ACTIONS</div>
            {rm.physical.map((action, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                <span style={{ color: C.creamDim, fontSize: 10, flexShrink: 0 }}>·</span>
                <span style={{ fontSize: 12, color: C.creamDim, lineHeight: 1.5 }}>{action}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full timeline bar */}
      <div style={{ fontFamily: "monospace", fontSize: 9, color: C.purple, letterSpacing: "0.3em", marginBottom: 14 }}>FULL 24-MONTH DIGITAL MARKETING TIMELINE</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 8, marginBottom: 28 }}>
        {ROADMAP.map((r, i) => (
          <div key={i} onClick={() => setActiveMonth(i)} style={{ cursor: "pointer", padding: "12px 14px", background: activeMonth === i ? `${r.color}15` : C.charcoal, border: `1px solid ${activeMonth === i ? r.color : C.ash}30`, borderTop: `3px solid ${r.color}`, borderRadius: 3, transition: "all 0.15s" }}>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: r.color, letterSpacing: "0.15em", marginBottom: 5 }}>{r.month}</div>
            <div style={{ fontSize: 12, color: C.cream, marginBottom: 8, fontWeight: 500 }}>{r.label}</div>
            <div style={{ fontSize: 10.5, color: C.creamDim, lineHeight: 1.5 }}>{r.digital.length} digital actions</div>
          </div>
        ))}
      </div>

      {/* Final note */}
      <InfoCard color={C.gold}>
        <div style={{ fontFamily: "monospace", fontSize: 8.5, color: C.gold, letterSpacing: "0.2em", marginBottom: 10 }}>CLOSING POSITION — KAG-JRK-MKT-001</div>
        <p style={{ fontSize: 13.5, color: C.cream, margin: "0 0 10px", lineHeight: 1.8, fontFamily: "Georgia,serif" }}>
          STRIKE enters a market with zero local competition and a product category that Lebanese consumers have never had locally. The physical channel opens the door. The digital strategy makes it impossible to close.
        </p>
        <p style={{ fontSize: 12.5, color: C.creamMid, margin: 0, lineHeight: 1.75 }}>
          When someone hears about STRIKE at their gym, they will search Instagram within 24 hours. What they find determines whether they become a customer. A brand that is only in gyms is a brand that lives and dies in gyms. A brand that is in the gym <em>and</em> on every feed, in every WhatsApp group, and in every trainer's Stories — that brand becomes a category.
        </p>
        <div style={{ marginTop: 14, display: "flex", gap: 20, flexWrap: "wrap" }}>
          {[
            "Instagram: @strikebites — Day 1",
            "Website: strikebites.com — Day 1",
            "WhatsApp Business — Day 1",
            "Meta Ads: Month 1",
            "Shopify: Month 6",
            "GCC Digital: Month 12",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span style={{ color: C.gold, fontSize: 10 }}>◆</span>
              <span style={{ fontFamily: "monospace", fontSize: 9.5, color: C.creamMid }}>{item}</span>
            </div>
          ))}
        </div>
      </InfoCard>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function MarketingDigitalStrategy() {
  const [tab, setTab] = useState(0);
  const theme = useContext(ThemeCtx);

  const SECTIONS = [
    OverviewSection, InfrastructureSection, PlatformsSection, ECommerceSection,
    ContentSection, CommunitySection, FinancialsSection, RoadmapSection,
  ];
  const ActiveSection = SECTIONS[tab];

  // Merge: module C provides teal/blue/coral; theme overrides shared tokens (cream, charcoal, ash, etc.)
  const mktTheme = { ...C, ...theme };

  return (
    <MktCtx.Provider value={mktTheme}>
    <div style={{ background: theme.obsidian, minHeight: "100%", color: theme.cream, fontFamily: "Georgia,'Times New Roman',serif" }}>

      {/* ── DOCUMENT HEADER ── */}
      <div style={{ background: theme.void, borderBottom: `1px solid ${theme.ash}`, padding: "10px clamp(16px,4vw,40px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "monospace", fontSize: 10, color: C.gold, letterSpacing: "0.35em" }}>STRIKE BITES</span>
          <span style={{ width: 1, height: 14, background: theme.ash }} />
          <span style={{ fontFamily: "monospace", fontSize: 8.5, color: theme.creamDim, letterSpacing: "0.15em" }}>{DOC.title}</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span style={{ fontFamily: "monospace", fontSize: 8, color: C.gold, background: `${C.gold}10`, border: `1px solid ${C.gold}25`, padding: "3px 10px", borderRadius: 2, letterSpacing: "0.1em" }}>{DOC.ref}</span>
          <span style={{ fontFamily: "monospace", fontSize: 8, color: theme.creamDim }}>{DOC.date}</span>
        </div>
      </div>

      {/* ── TAB NAVIGATION ── */}
      <div style={{ background: theme.charcoal, borderBottom: `1px solid ${theme.ash}`, overflowX: "auto", whiteSpace: "nowrap" }}>
        <div style={{ display: "inline-flex", padding: "0 clamp(16px,4vw,40px)" }}>
          {TABS.map((t, i) => (
            <button key={i} onClick={() => setTab(i)} style={{ background: "transparent", border: "none", borderBottom: `2px solid ${tab === i ? C.gold : "transparent"}`, padding: "12px 20px", cursor: "pointer", fontFamily: "monospace", fontSize: 9, color: tab === i ? C.gold : theme.creamDim, letterSpacing: "0.2em", transition: "all 0.15s", WebkitTapHighlightColor: "transparent" }}>
              {t.short} · {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── SECTION CONTENT ── */}
      <main>
        <ActiveSection />
      </main>

      {/* ── DOCUMENT FOOTER ── */}
      <div style={{ borderTop: `1px solid ${theme.ash}`, padding: "10px clamp(16px,4vw,40px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <span style={{ fontFamily: "monospace", fontSize: 8, color: C.goldDim, letterSpacing: "0.2em" }}>{DOC.ref} · KITS ADVISORY GROUP · {DOC.client}</span>
        <div style={{ display: "flex", gap: 4 }}>
          {TABS.map((_t, i) => (
            <button key={i} onClick={() => setTab(i)} style={{ width: tab === i ? 20 : 6, height: 4, borderRadius: 2, background: tab === i ? C.gold : C.ash, border: "none", cursor: "pointer", padding: 0, transition: "all 0.25s", WebkitTapHighlightColor: "transparent" }} />
          ))}
        </div>
      </div>
    </div>
    </MktCtx.Provider>
  );
}

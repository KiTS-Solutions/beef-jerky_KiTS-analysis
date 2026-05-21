import { useState } from "react";

const SECTIONS = [
  { id: "strategy", label: "Channel Strategy" },
  { id: "approach", label: "Outreach Sequence" },
  { id: "script", label: "Visit Script" },
  { id: "commercial", label: "Commercial Proposal" },
  { id: "objections", label: "Objection Handling" },
  { id: "leavebehind", label: "Leave-Behind Brief" },
  { id: "tracker", label: "Account Tracker" },
];

const CHANNEL_TYPES = [
  {
    type: "Sports Nutrition Stores",
    priority: "PRIORITY ONE",
    color: "#C8A96E",
    why: "Your highest-value first target. These stores already have a trained customer base spending on protein — whey, creatine, BCAAs. Your jerky becomes an immediate add-on to an existing basket, recommended by staff the customer already trusts. A single well-placed sports nutrition store can move 50–100 units per week once staff are activated.",
    profile: "Established, multi-brand supplement retailers. Customer walks in already thinking about protein. Staff are nutrition-literate and give personal recommendations. High transaction frequency, loyal customer base.",
    approach: "Personal visit. Warm introduction through your existing relationship. Bring samples for staff first — they must try and believe in the product before recommending it. Propose a dedicated shelf spot adjacent to protein bars. Offer a staff incentive program.",
    metrics: "Target: 15–20 stores. Expected velocity: 40–80 units/week per store at steady state.",
    examples: "Protein District, Sport Nutrition Lebanon, Proteinji, The Supplement Lab, Muscle Up, GNC Lebanon franchises, independent sports nutrition retailers across Beirut and Mount Lebanon."
  },
  {
    type: "Gyms & Fitness Centers",
    priority: "PRIORITY TWO",
    color: "#7EB5A6",
    why: "The credibility launchpad. A product sold inside a gym carries an implicit endorsement from the gym itself. This is where word-of-mouth starts. Gym members trust what is available inside their gym — if it is on the counter or in the vending area, it has passed a quality filter in their mind.",
    profile: "Independent gyms, CrossFit boxes, boutique fitness studios. Decision-maker is typically the owner or manager. Decisions are relationship-based and fast — a good conversation and a product they believe in can close in one visit.",
    approach: "Personal visit with samples. Frame it as a service to their members, not a sales transaction. Offer consignment or sale-or-return for the first 30 days. Give them a simple point-of-sale display. Train the front desk staff on the product in 3 minutes.",
    metrics: "Target: 25–35 gyms. Expected velocity: 20–40 units/week per gym at steady state.",
    examples: "CrossFit boxes (Beirut, Metn, Keserwan), boutique studios, mid-size independent gyms across Achrafieh, Badaro, Hamra, Jounieh, Zalka, Dbayeh, Kaslik."
  }
];

const OUTREACH_STEPS = [
  {
    step: "01",
    title: "Warm Activation Call",
    timing: "Day 1 — Before any visit",
    channel: "Phone call only. No WhatsApp for first contact.",
    color: "#C8A96E",
    script: `"[Name], it's [Your Name] — how are you? Listen, I have something I want to show you in person, something I think your customers are going to love. When can I come by for 10 minutes? I want to bring you samples."`,
    notes: "Keep it short. Do not pitch on the phone. The goal of this call is one thing only: secure the in-person visit. Your relationship does the heavy lifting — leverage it. Never describe the product in detail over the phone; curiosity is your asset.",
    do: ["Use their first name", "Reference your existing relationship naturally", "Keep it under 60 seconds", "Confirm a specific day and time"],
    dont: ["Pitch the product on the phone", "Send a WhatsApp before calling", "Leave a voicemail with product details", "Ask if they are 'interested' — assume they are"]
  },
  {
    step: "02",
    title: "The In-Person Visit",
    timing: "Day 2–5 — Off-peak hours only",
    channel: "In person. Never during peak gym hours (6–9am, 5–8pm).",
    color: "#7EB5A6",
    script: `Arrive with: product samples (minimum 3 per person present), your printed leave-behind, and a small branded display unit if available. Greet them warmly, spend 2 minutes on relationship before any product talk. Then lead with the product, not the pitch.`,
    notes: "Visit during off-peak hours — mid-morning (10am–12pm) or early afternoon (2–4pm). The owner or manager must be present. Never pitch to staff without the decision-maker in the room for the first visit.",
    do: ["Arrive slightly early", "Bring enough samples for everyone present", "Let them taste before you say anything about protein content", "Have your leave-behind ready but do not open it immediately"],
    dont: ["Visit during peak hours", "Lead with price", "Show them the commercial proposal before they have tasted the product", "Overstay — keep the first visit under 20 minutes"]
  },
  {
    step: "03",
    title: "Staff Sampling Session",
    timing: "Same visit or dedicated follow-up",
    channel: "In person — include all floor staff and trainers present",
    color: "#E07B6A",
    script: `"Before we talk business, I want everyone here to try this. No explanation yet — just tell me what you think." [Let them eat. Wait. Then ask.] "What do you notice first?" [They will mention the protein content or the taste.] "That's exactly the point."`,
    notes: "Staff who have tasted and enjoyed the product are your most powerful sales force inside the store. A personal trainer who genuinely likes a product mentions it in every session without being asked. This step is not optional — it is the activation mechanism for the channel.",
    do: ["Bring enough product for every staff member present", "Let the product speak before you explain it", "Ask open questions — what do they notice, what do they think their clients would say", "Offer to come back and do a proper staff tasting session if timing is difficult"],
    dont: ["Skip staff if only the owner is present — schedule a return visit", "Over-explain before they taste", "Use technical language before they have formed their own opinion"]
  },
  {
    step: "04",
    title: "The Commercial Conversation",
    timing: "Same visit — after tasting, with decision-maker only",
    channel: "In person, private — not in front of customers",
    color: "#9B8EC4",
    script: `"Here's how I want to work with you. [Present the commercial one-pager.] For the first 30 days, I want to put [X units] here on a sale-or-return basis — zero risk to you. You sell what you sell, I collect what doesn't move. After 30 days we look at the numbers together and agree on a standing order. I'll be here every [week/two weeks] personally."`,
    notes: "Sale-or-return for the first 30 days removes every objection about risk. It signals your confidence in the product. After the first month, the data replaces the need for persuasion — you bring sell-through numbers, not arguments.",
    do: ["Present margin clearly and in writing", "Confirm the reorder process before you leave", "Agree on a specific placement location in the store", "Set the first check-in date before you walk out"],
    dont: ["Negotiate on price in the first meeting", "Leave without a confirmed arrangement — verbal 'yes, sure' is not enough", "Forget to agree on how they will reorder"]
  },
  {
    step: "05",
    title: "Display Setup",
    timing: "Same visit or within 48 hours",
    channel: "In person — you set it up yourself for the first time",
    color: "#C8A96E",
    script: `Set up the display yourself. Do not leave a box and ask them to figure it out. Place the product at eye level, adjacent to protein bars or near the checkout counter. Brief the person at the counter in 2 minutes: what it is, what to say, the price. Leave a small sign with the protein content visible.`,
    notes: "How a product is placed in its first week determines its sales velocity. A product placed incorrectly — low shelf, back corner, behind other products — will underperform regardless of quality. You own the placement in the first 30 days.",
    do: ["Place at eye level or counter level", "Position adjacent to protein bars or supplements, not regular snacks", "Leave a clear price tag", "Leave a small product information card if available"],
    dont: ["Leave without confirming placement", "Allow the product to be placed on a low shelf or behind other products", "Trust that staff will figure out placement without instruction"]
  },
  {
    step: "06",
    title: "Week 2 Check-In",
    timing: "Day 10–14 after placement",
    channel: "In person — brief visit, 10 minutes maximum",
    color: "#7EB5A6",
    script: `"I'm just checking in. How has it been moving? Any feedback from customers? Do you need more stock?" [Count units remaining visually if possible.] "I'll bring you [X] more next week — is [day] good for you?"`,
    notes: "This visit communicates professionalism and commitment. It also catches any placement or staff knowledge issues before they compound. Most first-month problems — slow sales, staff forgetting to recommend — are fixed by a present, attentive supplier.",
    do: ["Note how many units have sold since placement", "Ask specifically what customers are saying", "Replenish immediately if stock is below 30%", "Confirm the next delivery date before leaving"],
    dont: ["Skip this visit — it is not optional", "Call instead of visiting for the first check-in", "Overload them with more stock than they can sell in 2 weeks"]
  }
];

const SCRIPT_SECTIONS = [
  {
    title: "Opening — For a Warm Contact",
    color: "#C8A96E",
    context: "You know this person. Start as you normally would — do not become formal and transactional the moment you have something to sell. That is a mistake that damages relationships.",
    lines: [
      { speaker: "YOU", text: "[Their name], habibi — how are things? How's business?" },
      { speaker: "THEM", text: "[They respond — listen, engage genuinely for 2 minutes]" },
      { speaker: "YOU", text: "Listen, I came because I have something I want you to try. Something I think your customers are going to ask you to reorder every week. No explanation yet — just try this." },
      { speaker: "ACTION", text: "[Hand them the product. Let them open it, smell it, taste it. Say nothing for 30 seconds. Let the product speak.]" },
    ]
  },
  {
    title: "After the Taste",
    color: "#7EB5A6",
    context: "Do not immediately launch into a pitch. Ask a question. Let them tell you what they noticed. Their words are more valuable than yours at this moment.",
    lines: [
      { speaker: "YOU", text: "What do you think? What did you notice first?" },
      { speaker: "THEM", text: "[They will mention taste, texture, or ask what's in it]" },
      { speaker: "YOU", text: "Look at the back. [Point to protein content.] That's [X]g of protein. [X] calories. Nothing artificial. And it's Halal certified. That's what your customer is going to pick up and read standing right here." },
      { speaker: "THEM", text: "[They will ask about price, or where it comes from, or both]" },
    ]
  },
  {
    title: "The Product Story",
    color: "#E07B6A",
    context: "Keep the story short. Two sentences maximum on origin. Then pivot to what it means for their customer — that is all they care about.",
    lines: [
      { speaker: "YOU", text: "It's produced specifically for the Lebanese fitness market — locally made, quality controlled, no shortcuts. But forget about me for a second — think about your customer who walks in after training. They've just finished a session, they're hungry, they want protein, they don't want a bar full of sugar. This is what they've been looking for and couldn't find here." },
    ]
  },
  {
    title: "The Commercial Offer",
    color: "#9B8EC4",
    context: "Be direct. Give them a clear number, a clear margin, and a zero-risk entry. Do not leave the commercial terms vague — vagueness is what causes deals to fall apart between the meeting and the follow-up.",
    lines: [
      { speaker: "YOU", text: "Here's what I want to propose. For the first month, I put [30 units] here — sale or return. You pay me only for what sells. If it doesn't move — which it will — I take it back, no conversation. Your margin is [X]% on every unit sold. After 30 days we look at the numbers and set up a standing order." },
      { speaker: "THEM", text: "[They will either agree, ask questions, or raise an objection — see objection handling section]" },
      { speaker: "YOU", text: "I'm going to be here personally every [week/two weeks] to check in, restock, and bring you anything new we're working on. You will never have to chase me." },
    ]
  },
  {
    title: "The Close",
    color: "#C8A96E",
    context: "Do not leave without a confirmed arrangement. 'Yes sure' or 'inshallah' is not an arrangement. Confirm a specific quantity, a specific placement, and a specific date for the next visit.",
    lines: [
      { speaker: "YOU", text: "So let's do this — I'll leave you [30 units] today and set up the display right now. Where do you want them — near the counter or next to the supplements?" },
      { speaker: "ACTION", text: "[Set up the display yourself, immediately, before leaving. Brief the counter staff in 2 minutes.]" },
      { speaker: "YOU", text: "I'll be back on [specific day] to check in. If you run out before then, call me directly — [your number] — and I'll be here within 24 hours." },
    ]
  }
];

const COMMERCIAL = {
  pricing_note: "NOTE: Replace [RETAIL PRICE] and [WHOLESALE PRICE] placeholders with your actual confirmed numbers once the manufacturer cost-per-unit is established. The margin structure below is the framework — the numbers are directional pending nutritional panel and cost confirmation.",
  tiers: [
    {
      channel: "Sports Nutrition Stores",
      color: "#C8A96E",
      retail: "[RETAIL PRICE] / unit",
      wholesale: "[RETAIL × 0.68] / unit",
      margin: "32% margin to store",
      payment: "Net 30 after first order. First order: sale-or-return.",
      moq: "30 units per SKU for first order. 20 units reorder minimum.",
      display: "Branded counter display unit provided free of charge.",
      terms: "KITS delivers directly. Weekly or bi-weekly replenishment. No distributor margin at this stage."
    },
    {
      channel: "Gyms & Fitness Centers",
      color: "#7EB5A6",
      retail: "[RETAIL PRICE] / unit",
      wholesale: "[RETAIL × 0.72] / unit",
      margin: "28% margin to gym",
      payment: "Net 15 after first order. First order: sale-or-return.",
      moq: "20 units per SKU for first order. 12 units reorder minimum.",
      display: "Branded bowl or small display unit provided free of charge.",
      terms: "KITS delivers directly. Personal check-in every 1–2 weeks."
    }
  ],
  trainer_program: {
    title: "Trainer Activation Program",
    description: "Personal trainers are your most effective non-paid sales force. A trainer who believes in the product mentions it in every session. Structure their incentive as preferential wholesale access, not cash commission — simpler to administer and creates a genuine user relationship.",
    terms: [
      "Personal trainers may purchase at 40% below retail for personal use and client gifting",
      "No formal resale arrangement — trainers recommend, clients buy from the store",
      "Monthly sample allocation: 5 units free per active trainer who refers 3+ clients to the store",
      "Trainers receive first access to any new SKU or flavor before public release"
    ]
  }
};

const OBJECTIONS = [
  {
    objection: "\"We already have protein bars and snacks — we don't have room for more.\"",
    color: "#C8A96E",
    reality: "This is a space objection, not a product objection. They are telling you shelf space is limited, not that they dislike the product.",
    response: `"I hear you — and I'm not asking you to replace anything. This is a different format entirely. A protein bar is one product. Beef jerky is a completely different category — different customer, different purchase occasion, different need. Your customer who buys the bar is looking for a meal replacement. Your customer who picks this up is looking for a post-workout hit of real protein with zero sugar. They're standing in your store right now and you have nothing to offer them. This solves that gap. And I need only [30cm] of counter or shelf space."`,
    followup: "Offer to take a photo of the display unit so they can visualize the footprint."
  },
  {
    objection: "\"What if it doesn't sell? I can't be stuck with stock.\"",
    color: "#7EB5A6",
    reality: "A risk objection. They are interested but protecting themselves. Sale-or-return eliminates this entirely.",
    response: `"That's exactly why the first 30 days are sale-or-return — full stop. You pay me only for what sells. If it doesn't move, I take it back. No invoice, no conversation, no awkwardness. I'm putting my confidence in writing. I wouldn't offer this if I wasn't certain your customers are going to ask for it again."`,
    followup: "Have your simple sale-or-return letter ready to sign on the spot — a half-page document confirming the arrangement. This turns a verbal reassurance into a professional commitment."
  },
  {
    objection: "\"The price is too high for my customers.\"",
    color: "#E07B6A",
    reality: "A price objection from a retailer is usually a margin objection in disguise — or a fear of customer pushback that has not been tested.",
    response: `"Let me ask you something — what does a scoop of whey cost your customer per serving? [Let them answer.] And what does a Quest bar cost? [Let them answer.] Your customer is already paying [X] for protein. This is [Y]. For [Z]g of protein. You're not selling them a snack — you're selling them a nutrition tool they can carry anywhere, eat anywhere, with no prep. The comparison isn't to chips. The comparison is to their protein shake. And this is cheaper, portable, and requires no shaker."`,
    followup: "If they push further, offer a smaller first order quantity to reduce their perceived risk on slow-selling stock."
  },
  {
    objection: "\"I need to try it first before I can commit.\"",
    color: "#9B8EC4",
    reality: "Not an objection — this is an invitation. They are interested. They need confidence.",
    response: `"Absolutely — that's exactly why I'm here. [Hand them product immediately if you haven't already.] Try it now. And take a few for your staff — I want everyone here to taste it before we talk business. That's how this works."`,
    followup: "If they want to 'think about it' after tasting, set a specific return date: 'I'll come back Thursday — if you want to start then, we start Thursday. No pressure before that.'"
  },
  {
    objection: "\"I need to see how it does at another location first.\"",
    color: "#C8A96E",
    reality: "A credibility objection. They want social proof. Early adopters will not have this luxury — which is why you position it as an advantage.",
    response: `"I understand — and I respect that. But here's the thing: I'm launching in Lebanon right now, and the stores I'm starting with are going to have first-mover advantage. Your customer is going to discover this product here, with you — not somewhere else first. I'm offering you the first-in position, not a follow-on. You'll be the store that had it before anyone else."`,
    followup: "If they remain hesitant, offer a 10-unit trial — small enough to feel low-risk, enough to generate real sales data."
  },
  {
    objection: "\"Halal? Are you sure it's certified?\"",
    color: "#7EB5A6",
    reality: "A legitimate due diligence question, especially from nutrition stores with a diverse customer base. Have your answer ready.",
    response: `"Yes — fully certified. [Show the Halal certificate or mark on packaging.] It's certified by [certifying body name]. That was a non-negotiable for us from day one — this is the Lebanese market, it had to be right from the start."`,
    followup: "If certification is still pending at time of first visits, be honest: 'The certification is in process — we will not place product until it is complete. I'm here now to build the relationship and show you what's coming.'"
  }
];

const LEAVE_BEHIND = {
  sections: [
    {
      title: "The Product",
      color: "#C8A96E",
      content: [
        { label: "Product", value: "[Brand Name] — Portioned Beef Jerky" },
        { label: "Key Claim", value: "[X]g Protein · [X] Calories · Per Serving" },
        { label: "Ingredients", value: "Clean, short list — no artificial preservatives [confirm with manufacturer]" },
        { label: "Certification", value: "Halal Certified — [Certifying Body]" },
        { label: "MoPH Registration", value: "Registered — No. [XXXX]" },
        { label: "Shelf Life", value: "[X] months — ambient storage" },
      ]
    },
    {
      title: "The Commercial Terms",
      color: "#7EB5A6",
      content: [
        { label: "Retail Price", value: "[X] USD per unit" },
        { label: "Your Price", value: "[X] USD per unit" },
        { label: "Your Margin", value: "[X]% per unit sold" },
        { label: "Minimum First Order", value: "20–30 units (sale-or-return)" },
        { label: "Reorder Minimum", value: "12–20 units" },
        { label: "Payment Terms", value: "Net 15–30 days / first order S-O-R" },
        { label: "Delivery", value: "Direct — personal delivery within 24 hours" },
      ]
    },
    {
      title: "What We Provide",
      color: "#E07B6A",
      content: [
        { label: "Display Unit", value: "Branded counter display — provided free" },
        { label: "Staff Samples", value: "Product samples for all staff at setup" },
        { label: "Product Cards", value: "Small printed info cards for point-of-sale" },
        { label: "Check-in Frequency", value: "Personal visit every 1–2 weeks" },
        { label: "Reorder Response", value: "Within 24 hours of any request" },
        { label: "Support", value: "Direct line to KITS contact — always reachable" },
      ]
    }
  ],
  headline_statement: "The only locally-produced, Halal-certified, high-protein beef jerky in Lebanon. Your customers have been looking for this. Now you have it.",
  contact_block: {
    company: "KITS Advisory Group",
    contact: "[Name]",
    phone: "[Number]",
    note: "All enquiries handled directly. No middlemen."
  }
};

const TRACKER_SAMPLE = [
  ["Protein District — Achrafieh", "Nutrition Store", "Achrafieh", "Owner Name", "+961 X XXX XXX", "—", "30", "Yes", "—", "—", "TO VISIT", "Priority — warm contact"],
  ["CrossFit Box — Dbayeh", "Gym", "Dbayeh", "Owner Name", "+961 X XXX XXX", "—", "20", "Yes", "—", "—", "TO VISIT", "Know owner personally"],
  ["Sport Nutrition — Jounieh", "Nutrition Store", "Jounieh", "Owner Name", "+961 X XXX XXX", "—", "30", "Yes", "—", "—", "TO VISIT", "Strong existing relationship"],
];

const STATUS_COLORS = {
  "TO VISIT": "#4A4060",
  "VISITED — PENDING": "#C8A96E",
  "ACTIVE ACCOUNT": "#7EB5A6",
  "REORDER PLACED": "#9B8EC4",
  "NOT INTERESTED": "#E07B6A",
};

export default function OutreachSystem() {
  const [activeSection, setActiveSection] = useState("strategy");
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [expandedObj, setExpandedObj] = useState<number | null>(null);
  const [expandedScript, setExpandedScript] = useState(0);

  const toggleStep = (i: number) => setExpandedStep(prev => prev === i ? null : i);
  const toggleObj = (i: number) => setExpandedObj(prev => prev === i ? null : i);

  return (
    <div style={{
      fontFamily: "'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif",
      background: "#07060A",
      minHeight: "100vh",
      color: "#DDD5C8",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0C0A14 0%, #100D1A 100%)",
        borderBottom: "1px solid #1E1A2E",
        padding: "28px 36px 20px",
      }}>
        <div style={{ fontFamily: "monospace", fontSize: 10, color: "#4A406A", letterSpacing: "0.3em", marginBottom: 8 }}>
          KITS ADVISORY GROUP · TRADE OUTREACH SYSTEM · REF: KAG-JRK-004 · CONFIDENTIAL
        </div>
        <h1 style={{ margin: 0, fontSize: "clamp(18px, 3vw, 28px)", fontWeight: 400, color: "#DDD5C8", lineHeight: 1.2 }}>
          Gym & Sports Nutrition — Outreach & Trade System
        </h1>
        <p style={{ margin: "6px 0 0", fontSize: 13, color: "#7A6E9A", fontFamily: "Palatino, Georgia, serif" }}>
          Beef Jerky Venture · Phase 1 Channel Activation · Warm Relationship Model
        </p>
      </div>

      {/* Nav */}
      <div style={{
        background: "#09070E",
        borderBottom: "1px solid #1A1628",
        display: "flex", flexWrap: "wrap", padding: "0 36px"
      }}>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
            background: "transparent",
            border: "none",
            borderBottom: activeSection === s.id ? "2px solid #C8A96E" : "2px solid transparent",
            color: activeSection === s.id ? "#DDD5C8" : "#4A406A",
            fontFamily: "monospace",
            fontSize: 10,
            letterSpacing: "0.15em",
            padding: "13px 16px 11px",
            cursor: "pointer",
            transition: "all 0.15s",
            whiteSpace: "nowrap"
          }}>
            {s.label.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ padding: "32px 36px", maxWidth: 940 }}>

        {/* CHANNEL STRATEGY */}
        {activeSection === "strategy" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#C8A96E", letterSpacing: "0.2em", marginBottom: 8 }}>
                CHANNEL ACTIVATION STRATEGY
              </div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 400, color: "#DDD5C8" }}>
                Two Channels. One Launch Window. Sequence Matters.
              </h2>
              <p style={{ fontSize: 13, color: "#6A608A", lineHeight: 1.8, marginTop: 12 }}>
                Your warm relationships compress what would normally be a 3-month cold outreach cycle into a 2–3 week activation. Sports nutrition stores are Priority One because their customer is already in protein-buying mode every visit. Gyms are Priority Two — credibility builders that generate word-of-mouth and trainer advocacy. Run both simultaneously given your relationship advantage.
              </p>
            </div>

            {CHANNEL_TYPES.map((ch, i) => (
              <div key={i} style={{
                background: "#0C0A14",
                border: `1px solid ${ch.color}30`,
                borderLeft: `4px solid ${ch.color}`,
                borderRadius: 4,
                padding: "24px",
                marginBottom: 12
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14, flexWrap: "wrap" }}>
                  <h3 style={{ margin: 0, fontSize: 17, fontWeight: 400, color: "#DDD5C8" }}>{ch.type}</h3>
                  <span style={{
                    fontFamily: "monospace", fontSize: 10,
                    color: ch.color,
                    background: `${ch.color}15`,
                    border: `1px solid ${ch.color}40`,
                    padding: "3px 10px", borderRadius: 2
                  }}>
                    {ch.priority}
                  </span>
                </div>

                <p style={{ margin: "0 0 16px", fontSize: 13, color: "#8A80A8", lineHeight: 1.8 }}>{ch.why}</p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                  {[
                    { label: "STORE PROFILE", text: ch.profile },
                    { label: "APPROACH", text: ch.approach },
                    { label: "TARGET METRICS", text: ch.metrics },
                  ].map((item, j) => (
                    <div key={j} style={{ background: "#080610", border: "1px solid #1A1628", borderRadius: 3, padding: "12px 14px" }}>
                      <div style={{ fontFamily: "monospace", fontSize: 10, color: ch.color, letterSpacing: "0.15em", marginBottom: 6 }}>{item.label}</div>
                      <p style={{ margin: 0, fontSize: 12, color: "#6A608A", lineHeight: 1.7 }}>{item.text}</p>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 12, background: "#080610", border: "1px solid #1A1628", borderRadius: 3, padding: "12px 14px" }}>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: "#4A406A", letterSpacing: "0.15em", marginBottom: 6 }}>TARGET LOCATIONS</div>
                  <p style={{ margin: 0, fontSize: 12, color: "#5A5070", lineHeight: 1.7 }}>{ch.examples}</p>
                </div>
              </div>
            ))}

            {/* Priority note */}
            <div style={{ background: "#0A0E0C", border: "1px solid #2A3A28", borderRadius: 4, padding: "18px 22px", marginTop: 8 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#7EB5A6", letterSpacing: "0.2em", marginBottom: 8 }}>
                KITS ACTIVATION NOTE
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "#6A8A78", lineHeight: 1.8 }}>
                Your existing relationships eliminate the credibility barrier that kills most first-channel approaches. Do not treat these as cold sales calls — treat them as activating partners who already trust you. The product must do the work from the moment they taste it. Your relationship opens the door; the product closes it. With warm contacts across both channel types, a target of <strong style={{ color: "#8AAA98" }}>20 accounts in the first 3 weeks</strong> is achievable — which creates the sell-through data needed to approach the next wave of accounts without relationships in Week 4 and beyond.
              </p>
            </div>
          </div>
        )}

        {/* OUTREACH SEQUENCE */}
        {activeSection === "approach" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#7EB5A6", letterSpacing: "0.2em", marginBottom: 8 }}>
                SIX-STEP OUTREACH SEQUENCE
              </div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 400, color: "#DDD5C8" }}>From First Call to Active Account</h2>
              <p style={{ fontSize: 13, color: "#6A608A", lineHeight: 1.8, marginTop: 10 }}>
                Every account follows the same sequence. No shortcuts — each step serves a specific purpose. Click any step to expand the detail, script, and do/don't guidance.
              </p>
            </div>

            {OUTREACH_STEPS.map((step, i) => {
              const isOpen = expandedStep === i;
              return (
                <div key={i} style={{
                  background: "#0C0A14",
                  border: "1px solid #1E1A2E",
                  borderLeft: `3px solid ${step.color}`,
                  borderRadius: 4,
                  marginBottom: 4,
                  overflow: "hidden"
                }}>
                  <button onClick={() => toggleStep(i)} style={{
                    display: "flex", alignItems: "center",
                    width: "100%", background: "transparent",
                    border: "none", padding: "14px 20px",
                    cursor: "pointer", gap: 16, textAlign: "left"
                  }}>
                    <span style={{ fontFamily: "monospace", fontSize: 12, color: step.color, flexShrink: 0 }}>{step.step}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, color: "#C8C0B4", marginBottom: 3 }}>{step.title}</div>
                      <div style={{ fontFamily: "monospace", fontSize: 10, color: "#4A406A" }}>{step.timing} · {step.channel}</div>
                    </div>
                    <span style={{ color: "#4A406A", fontSize: 16 }}>{isOpen ? "−" : "+"}</span>
                  </button>

                  {isOpen && (
                    <div style={{ padding: "0 20px 20px 52px" }}>
                      {/* Script preview */}
                      <div style={{ background: "#080610", border: `1px solid ${step.color}30`, borderRadius: 3, padding: "14px 16px", marginBottom: 14 }}>
                        <div style={{ fontFamily: "monospace", fontSize: 10, color: step.color, letterSpacing: "0.15em", marginBottom: 8 }}>SCRIPT / ACTION</div>
                        <p style={{ margin: 0, fontSize: 13, color: "#9A90A8", lineHeight: 1.8, fontStyle: "italic" }}>{step.script}</p>
                      </div>

                      <p style={{ margin: "0 0 14px", fontSize: 13, color: "#6A608A", lineHeight: 1.8 }}>{step.notes}</p>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        <div style={{ background: "#080E0A", border: "1px solid #1E2E1A", borderRadius: 3, padding: "12px 14px" }}>
                          <div style={{ fontFamily: "monospace", fontSize: 10, color: "#7EB5A6", marginBottom: 8 }}>DO</div>
                          {step.do.map((d, j) => (
                            <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                              <span style={{ color: "#7EB5A6", fontSize: 11, flexShrink: 0 }}>✓</span>
                              <span style={{ fontSize: 12, color: "#6A8A78", lineHeight: 1.6 }}>{d}</span>
                            </div>
                          ))}
                        </div>
                        <div style={{ background: "#0E0808", border: "1px solid #2E1A1A", borderRadius: 3, padding: "12px 14px" }}>
                          <div style={{ fontFamily: "monospace", fontSize: 10, color: "#E07B6A", marginBottom: 8 }}>DON'T</div>
                          {step.dont.map((d, j) => (
                            <div key={j} style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                              <span style={{ color: "#E07B6A", fontSize: 11, flexShrink: 0 }}>✗</span>
                              <span style={{ fontSize: 12, color: "#8A6A68", lineHeight: 1.6 }}>{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* VISIT SCRIPT */}
        {activeSection === "script" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#E07B6A", letterSpacing: "0.2em", marginBottom: 8 }}>
                IN-PERSON VISIT SCRIPT — WARM CONTACT VERSION
              </div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 400, color: "#DDD5C8" }}>Word-for-Word Visit Guide</h2>
              <p style={{ fontSize: 13, color: "#6A608A", lineHeight: 1.8, marginTop: 10 }}>
                This is not a pitch deck — it is a conversation guide. Internalize it, do not read from it. The goal of every visit is to make the account owner feel like you are doing them a favour by showing them this product first — because you are.
              </p>
            </div>

            {/* Script nav */}
            <div style={{ display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap" }}>
              {SCRIPT_SECTIONS.map((s, i) => (
                <button key={i} onClick={() => setExpandedScript(i)} style={{
                  background: expandedScript === i ? `${s.color}18` : "transparent",
                  border: `1px solid ${expandedScript === i ? s.color : "#1E1A2E"}`,
                  borderRadius: 3,
                  padding: "8px 14px",
                  cursor: "pointer",
                  fontFamily: "monospace",
                  fontSize: 10,
                  color: expandedScript === i ? s.color : "#4A406A",
                  letterSpacing: "0.1em",
                  transition: "all 0.15s"
                }}>
                  {String(i + 1).padStart(2, "0")} {s.title.toUpperCase()}
                </button>
              ))}
            </div>

            {SCRIPT_SECTIONS.map((section, si) => si === expandedScript && (
              <div key={si}>
                <div style={{
                  background: "#0C0A14",
                  border: `1px solid ${section.color}30`,
                  borderRadius: 4,
                  padding: "20px 24px",
                  marginBottom: 10
                }}>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: section.color, letterSpacing: "0.2em", marginBottom: 10 }}>
                    CONTEXT NOTE
                  </div>
                  <p style={{ margin: 0, fontSize: 13, color: "#6A608A", lineHeight: 1.8 }}>{section.context}</p>
                </div>

                {section.lines.map((line, li) => (
                  <div key={li} style={{
                    background: line.speaker === "ACTION" ? "#080A06" : line.speaker === "YOU" ? "#0A0814" : "#0C0A08",
                    border: `1px solid ${line.speaker === "ACTION" ? "#1E2E18" : line.speaker === "YOU" ? "#1A1628" : "#2E2818"}`,
                    borderLeft: `3px solid ${line.speaker === "ACTION" ? "#7EB5A6" : line.speaker === "YOU" ? section.color : "#6A604A"}`,
                    borderRadius: 3,
                    padding: "14px 18px",
                    marginBottom: 6,
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start"
                  }}>
                    <span style={{
                      fontFamily: "monospace", fontSize: 10,
                      color: line.speaker === "ACTION" ? "#7EB5A6" : line.speaker === "YOU" ? section.color : "#6A604A",
                      flexShrink: 0, marginTop: 2, minWidth: 50
                    }}>
                      {line.speaker}
                    </span>
                    <p style={{
                      margin: 0, fontSize: 13, lineHeight: 1.8,
                      color: line.speaker === "ACTION" ? "#6A8A68" : line.speaker === "YOU" ? "#C0B8CC" : "#8A8068",
                      fontStyle: line.speaker === "THEM" ? "italic" : "normal"
                    }}>
                      {line.text}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* COMMERCIAL PROPOSAL */}
        {activeSection === "commercial" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#9B8EC4", letterSpacing: "0.2em", marginBottom: 8 }}>
                COMMERCIAL PROPOSAL STRUCTURE
              </div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 400, color: "#DDD5C8" }}>Pricing, Terms & Margins</h2>
            </div>

            {/* Placeholder notice */}
            <div style={{ background: "#0E0A04", border: "1px solid #C8A96E40", borderRadius: 4, padding: "14px 18px", marginBottom: 20 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#C8A96E", marginBottom: 6 }}>⚠ PLACEHOLDER NOTICE</div>
              <p style={{ margin: 0, fontSize: 12, color: "#8A7A50", lineHeight: 1.7 }}>{COMMERCIAL.pricing_note}</p>
            </div>

            {COMMERCIAL.tiers.map((tier, i) => (
              <div key={i} style={{
                background: "#0C0A14",
                border: `1px solid ${tier.color}30`,
                borderLeft: `4px solid ${tier.color}`,
                borderRadius: 4, padding: "20px 24px", marginBottom: 10
              }}>
                <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 400, color: tier.color }}>{tier.channel}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 8 }}>
                  {[
                    { label: "Retail Price", value: tier.retail },
                    { label: "Your Wholesale Price", value: tier.wholesale },
                    { label: "Your Margin", value: tier.margin },
                    { label: "Payment Terms", value: tier.payment },
                    { label: "First Order (MOQ)", value: tier.moq },
                    { label: "Display Provided", value: tier.display },
                  ].map((item, j) => (
                    <div key={j} style={{ background: "#080610", border: "1px solid #1A1628", borderRadius: 3, padding: "10px 12px" }}>
                      <div style={{ fontFamily: "monospace", fontSize: 10, color: "#4A406A", marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: "#C0B8CC", lineHeight: 1.5 }}>{item.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 10, background: "#080610", border: "1px solid #1A1628", borderRadius: 3, padding: "10px 12px" }}>
                  <div style={{ fontFamily: "monospace", fontSize: 10, color: "#4A406A", marginBottom: 4 }}>DELIVERY & SERVICE</div>
                  <div style={{ fontSize: 12, color: "#6A608A", lineHeight: 1.5 }}>{tier.terms}</div>
                </div>
              </div>
            ))}

            {/* Trainer program */}
            <div style={{ background: "#0A0C14", border: "1px solid #2A2840", borderRadius: 4, padding: "20px 24px", marginTop: 8 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#9B8EC4", letterSpacing: "0.15em", marginBottom: 10 }}>
                TRAINER ACTIVATION PROGRAM
              </div>
              <h3 style={{ margin: "0 0 10px", fontSize: 15, fontWeight: 400, color: "#C0B8CC" }}>{COMMERCIAL.trainer_program.title}</h3>
              <p style={{ margin: "0 0 14px", fontSize: 13, color: "#6A608A", lineHeight: 1.8 }}>{COMMERCIAL.trainer_program.description}</p>
              {COMMERCIAL.trainer_program.terms.map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                  <span style={{ color: "#9B8EC4", fontSize: 12, flexShrink: 0 }}>→</span>
                  <p style={{ margin: 0, fontSize: 13, color: "#6A608A", lineHeight: 1.6 }}>{t}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OBJECTION HANDLING */}
        {activeSection === "objections" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#E07B6A", letterSpacing: "0.2em", marginBottom: 8 }}>
                OBJECTION HANDLING GUIDE
              </div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 400, color: "#DDD5C8" }}>Every Objection. Every Response.</h2>
              <p style={{ fontSize: 13, color: "#6A608A", lineHeight: 1.8, marginTop: 10 }}>
                Every objection has a correct response. None of them are dead ends — they are questions in disguise. The key is to identify what the objection is really about before responding.
              </p>
            </div>

            {OBJECTIONS.map((obj, i) => {
              const isOpen = expandedObj === i;
              return (
                <div key={i} style={{
                  background: "#0C0A14",
                  border: "1px solid #1E1A2E",
                  borderLeft: `3px solid ${obj.color}`,
                  borderRadius: 4, marginBottom: 4, overflow: "hidden"
                }}>
                  <button onClick={() => toggleObj(i)} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    width: "100%", background: "transparent", border: "none",
                    padding: "14px 20px", cursor: "pointer", textAlign: "left", gap: 16
                  }}>
                    <span style={{ fontSize: 13, color: "#9A90A8", fontStyle: "italic", lineHeight: 1.5, fontFamily: "Palatino, Georgia, serif" }}>
                      {obj.objection}
                    </span>
                    <span style={{ color: "#4A406A", fontSize: 16, flexShrink: 0 }}>{isOpen ? "−" : "+"}</span>
                  </button>

                  {isOpen && (
                    <div style={{ padding: "0 20px 18px" }}>
                      <div style={{ background: "#0A080E", border: `1px solid ${obj.color}20`, borderRadius: 3, padding: "10px 14px", marginBottom: 12 }}>
                        <div style={{ fontFamily: "monospace", fontSize: 10, color: obj.color, marginBottom: 4 }}>WHAT THIS REALLY MEANS</div>
                        <p style={{ margin: 0, fontSize: 12, color: "#7A7090", lineHeight: 1.7 }}>{obj.reality}</p>
                      </div>

                      <div style={{ background: "#080A06", border: "1px solid #1E2A18", borderRadius: 3, padding: "12px 14px", marginBottom: 10 }}>
                        <div style={{ fontFamily: "monospace", fontSize: 10, color: "#7EB5A6", marginBottom: 8 }}>YOUR RESPONSE</div>
                        <p style={{ margin: 0, fontSize: 13, color: "#8AAA88", lineHeight: 1.8, fontStyle: "italic" }}>{obj.response}</p>
                      </div>

                      <div style={{ background: "#0A080E", border: "1px solid #1A1628", borderRadius: 3, padding: "10px 14px" }}>
                        <div style={{ fontFamily: "monospace", fontSize: 10, color: "#9B8EC4", marginBottom: 4 }}>FOLLOW-UP ACTION</div>
                        <p style={{ margin: 0, fontSize: 12, color: "#6A6080", lineHeight: 1.7 }}>{obj.followup}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* LEAVE-BEHIND */}
        {activeSection === "leavebehind" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#C8A96E", letterSpacing: "0.2em", marginBottom: 8 }}>
                PRINTED LEAVE-BEHIND — CONTENT TEMPLATE
              </div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 400, color: "#DDD5C8" }}>One-Page Trade Document</h2>
              <p style={{ fontSize: 13, color: "#6A608A", lineHeight: 1.8, marginTop: 10 }}>
                This is the document you leave behind at every visit. Single page, both sides, professionally printed. Fill in all placeholders once nutritional panel and pricing are confirmed. Give it to every person in the room, not just the decision-maker.
              </p>
            </div>

            {/* Headline */}
            <div style={{ background: "#0C0A14", border: "1px solid #C8A96E40", borderRadius: 4, padding: "20px 24px", marginBottom: 12 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#4A406A", marginBottom: 10 }}>FRONT SIDE — HEADLINE STATEMENT</div>
              <p style={{ margin: 0, fontSize: 16, color: "#C8A96E", lineHeight: 1.7, fontStyle: "italic" }}>
                "{LEAVE_BEHIND.headline_statement}"
              </p>
            </div>

            {LEAVE_BEHIND.sections.map((sec, i) => (
              <div key={i} style={{
                background: "#0C0A14",
                border: `1px solid ${sec.color}25`,
                borderLeft: `3px solid ${sec.color}`,
                borderRadius: 4, padding: "18px 22px", marginBottom: 8
              }}>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: sec.color, letterSpacing: "0.15em", marginBottom: 14 }}>
                  {sec.title.toUpperCase()}
                </div>
                {sec.content.map((row, j) => (
                  <div key={j} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "baseline",
                    padding: "8px 0", borderBottom: "1px solid #12101A", gap: 20
                  }}>
                    <span style={{ fontSize: 12, color: "#6A608A", fontFamily: "monospace" }}>{row.label}</span>
                    <span style={{ fontSize: 12, color: row.value.startsWith("[") ? "#4A406A" : "#C0B8CC", fontStyle: row.value.startsWith("[") ? "italic" : "normal", textAlign: "right" }}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            ))}

            <div style={{ background: "#0A080E", border: "1px solid #1E1A2E", borderRadius: 4, padding: "16px 22px", marginTop: 8 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#4A406A", marginBottom: 10 }}>BACK SIDE — CONTACT BLOCK</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
                {Object.entries(LEAVE_BEHIND.contact_block).map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontFamily: "monospace", fontSize: 10, color: "#4A406A", marginBottom: 3, textTransform: "uppercase" }}>{k}</div>
                    <div style={{ fontSize: 12, color: v.startsWith("[") ? "#4A406A" : "#9A90A8" }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ACCOUNT TRACKER */}
        {activeSection === "tracker" && (
          <div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#7EB5A6", letterSpacing: "0.2em", marginBottom: 8 }}>
                ACCOUNT TRACKER — PHASE 1
              </div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 400, color: "#DDD5C8" }}>Live Account Pipeline</h2>
              <p style={{ fontSize: 13, color: "#6A608A", lineHeight: 1.8, marginTop: 10 }}>
                Every account visited must be logged here immediately after the visit. Do not rely on memory. This tracker becomes your most valuable asset when approaching the second wave of accounts — you arrive with data, not with promises.
              </p>
            </div>

            {/* Status legend */}
            <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
              {Object.entries(STATUS_COLORS).map(([status, color]) => (
                <span key={status} style={{
                  fontFamily: "monospace", fontSize: 10,
                  color, background: `${color}18`,
                  border: `1px solid ${color}40`,
                  padding: "3px 10px", borderRadius: 2
                }}>
                  {status}
                </span>
              ))}
            </div>

            {/* Tracker table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                <thead>
                  <tr>
                    {["Account", "Type", "Area", "Contact", "Visit", "Units", "S-O-R", "Follow-up", "Wk2 Sold", "Status", "Notes"].map((h, i) => (
                      <th key={i} style={{
                        fontFamily: "monospace", fontSize: 9,
                        color: "#4A406A", letterSpacing: "0.1em",
                        padding: "8px 10px", textAlign: "left",
                        borderBottom: "1px solid #1E1A2E",
                        whiteSpace: "nowrap",
                        background: "#09070E"
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TRACKER_SAMPLE.map((row, ri) => (
                    <tr key={ri} style={{ borderBottom: "1px solid #12101A" }}>
                      {row.map((cell, ci) => (
                        <td key={ci} style={{
                          padding: "10px 10px",
                          fontSize: 11,
                          color: ci === 9 ? (STATUS_COLORS as any)[cell] || "#DDD5C8" : "#7A7090",
                          fontFamily: ci === 9 ? "monospace" : "inherit",
                          whiteSpace: ci === 0 ? "normal" : "nowrap",
                          background: ri % 2 === 0 ? "#0C0A14" : "#0A0810",
                          verticalAlign: "top"
                        }}>
                          {cell === "—" ? <span style={{ color: "#2A2040" }}>—</span> : cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Empty rows */}
                  {[...Array(5)].map((_, ri) => (
                    <tr key={`empty-${ri}`} style={{ borderBottom: "1px solid #0E0C18" }}>
                      {[...Array(11)].map((_, ci) => (
                        <td key={ci} style={{
                          padding: "10px 10px",
                          background: (ri + 3) % 2 === 0 ? "#0C0A14" : "#0A0810",
                          color: "#1E1A2E",
                          fontSize: 11,
                          fontFamily: "monospace"
                        }}>
                          ···
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: 20, background: "#0A0C14", border: "1px solid #1E1A2E", borderRadius: 4, padding: "16px 20px" }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, color: "#7EB5A6", marginBottom: 8 }}>TRACKER DISCIPLINE — NON-NEGOTIABLE</div>
              {[
                "Log every visit within 24 hours — memory degrades fast, details matter",
                "Update status immediately when it changes — stale trackers cause double-visits and missed follow-ups",
                "Week 2 sell-through data is your most important column — it becomes your sales proof for the next wave",
                "This tracker is reviewed by KITS at every weekly check-in — it is a live management document",
              ].map((rule, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                  <span style={{ color: "#7EB5A6", fontSize: 12, flexShrink: 0 }}>→</span>
                  <p style={{ margin: 0, fontSize: 12, color: "#5A7068", lineHeight: 1.6 }}>{rule}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: "16px 36px",
        borderTop: "1px solid #1A1628",
        display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8
      }}>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#2A2040", letterSpacing: "0.15em" }}>
          KITS ADVISORY GROUP · TRADE OUTREACH SYSTEM · CONFIDENTIAL
        </span>
        <span style={{ fontFamily: "monospace", fontSize: 10, color: "#2A2040" }}>
          KAG-JRK-004 · PHASE 1 CHANNEL ACTIVATION
        </span>
      </div>
    </div>
  );
}

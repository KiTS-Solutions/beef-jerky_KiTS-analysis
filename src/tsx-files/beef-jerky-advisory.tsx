import { useState } from "react";

const sections = [
  {
    id: "overview",
    code: "01",
    title: "Venture Overview & Situation Analysis",
    color: "#C8A96E",
    content: [
      {
        heading: "Current Position",
        body: `The client is launching a portioned beef jerky product into the Lebanese market — a high-protein, low-calorie snack (50 kcal / 40g protein per serving) targeting health-conscious consumers. The venture is at ground zero: no legal entity, no brand, no packaging, and budget yet to be defined. A manufacturer relationship is already in place (hybrid local/abroad), which is a meaningful operational advantage.`
      },
      {
        heading: "Market Opportunity",
        body: `Lebanon's fitness and wellness culture has expanded significantly, particularly in Beirut, Metn, and Keserwan. Gyms, CrossFit boxes, and boutique fitness studios have proliferated. High-protein snacking remains largely underserved in the modern trade — most available options are imported, expensive, and not positioned for the local palate or economic reality. A locally produced, well-branded, high-protein jerky occupies a near-empty niche.`
      },
      {
        heading: "Strategic Framing",
        body: `This product should be positioned as a serious nutrition tool, not a casual snack. The brand must command shelf respect in pharmacies and nutrition shops while remaining approachable enough for gym vending and supermarket impulse purchase. Price positioning, branding language, and distribution sequencing must all align to support this duality.`
      }
    ]
  },
  {
    id: "legal",
    code: "02",
    title: "Legal & Regulatory Framework",
    color: "#7EB5A6",
    content: [
      {
        heading: "Business Registration",
        body: `The venture must be registered as a legal entity in Lebanon before any commercial activity. The most practical structure for a product-based startup is a SARL (Société à Responsabilité Limitée) — Limited Liability Company — registered at the Ministry of Justice through a licensed notary. Minimum capital requirements are modest. Budget approximately $1,500–$3,000 for legal and notary fees.`
      },
      {
        heading: "Food Safety & Ministry of Public Health (MoPH)",
        body: `All food products sold in Lebanon require registration with the Ministry of Public Health. This involves: (1) submitting product formulation and ingredient list, (2) laboratory testing for nutritional claims verification, (3) label compliance review, and (4) facility inspection if manufactured locally. For imported components, import permits and country-of-origin certificates are mandatory. Begin this process in parallel with branding — it takes 2–4 months.`
      },
      {
        heading: "Nutritional Claims Compliance",
        body: `The claim "50 calories / 40g protein" is a specific nutritional assertion and must be validated by an accredited laboratory. In Lebanon, this is typically done through the Lebanese Standards Institution (LIBNOR) or accredited private labs. False or unverified claims expose the business to significant legal liability. This must be resolved before any packaging goes to print.`
      },
      {
        heading: "Halal Certification",
        body: `Given the Lebanese market demographics, Halal certification is not optional — it is a commercial necessity. Obtain certification from a recognized Lebanese Islamic authority. This also opens the door to future GCC export, which is a strategic upside worth building in from day one.`
      },
      {
        heading: "Trade Name & Trademark",
        body: `Once the brand name is selected, register the trademark with the Ministry of Economy and Trade — Intellectual Property Department. This protects against imitation, which is a real risk in the Lebanese market for any product showing early success.`
      }
    ]
  },
  {
    id: "market",
    code: "03",
    title: "Market Research & Consumer Segmentation",
    color: "#E07B6A",
    content: [
      {
        heading: "Primary Segment — Fitness Enthusiasts",
        body: `Males and females aged 18–40, gym members, CrossFit athletes, runners, and cycling community members. These consumers actively read labels, understand macros, and make purchase decisions based on protein content, ingredient cleanliness, and brand credibility. They are willing to pay a premium. They are influenced by trainers, gym owners, and in-person community. This segment should be penetrated first.`
      },
      {
        heading: "Secondary Segment — Health-Oriented Professionals",
        body: `Office professionals aged 25–50 who manage caloric intake, follow intermittent fasting, or are medically advised on nutrition. They shop at pharmacies, co-ops, and premium supermarkets. They respond to clinical-looking packaging, clean ingredient lists, and positioning around satiety and metabolic health. This segment is reached through pharmacy and supermarket placement.`
      },
      {
        heading: "Tertiary Segment — General Snack Consumers",
        body: `Broader audience seeking tasty, convenient snacks without specific fitness intent. This segment is price-sensitive and responds to flavor variety and impulse purchase availability. They are best reached through supermarkets and eventually kiosks or convenience points. Do not design for this segment first — let the product earn its credibility with Segments 1 and 2, then expand.`
      },
      {
        heading: "Field Research Mandate",
        body: `Before finalizing pricing, flavors, or packaging sizes, conduct structured field research: (1) Visit 15–20 gyms across Beirut, Metn, Baabda, and Keserwan — interview owners and trainers. (2) Audit current protein snack offerings in 10 pharmacies and 5 nutrition shops. (3) Conduct 30 intercept interviews with gym members. (4) Map competitor products, their pricing, and shelf placement. This research is non-negotiable and must precede any investment in branding or packaging.`
      }
    ]
  },
  {
    id: "product",
    code: "04",
    title: "Product Development & Range Strategy",
    color: "#9B8EC4",
    content: [
      {
        heading: "Launch SKU Discipline",
        body: `Launch with a maximum of 2 SKUs. One flavor, two pack sizes — or two flavors, one pack size. Over-ranging at launch dilutes focus, strains cash flow, and complicates inventory. The Lebanese market rewards confident, focused launches. Add SKUs based on sell-through data, not speculation.`
      },
      {
        heading: "Flavor Strategy",
        body: `Lead with a flavor that bridges Lebanese palate familiarity and international protein snack conventions. Candidates: za'atar-spiced, sumac-pepper, chili-lime, or classic smoky BBQ. Avoid anything that feels foreign or requires consumer education. The flavor must create immediate re-purchase intent. Test with focus groups drawn from your primary segment before committing to production.`
      },
      {
        heading: "Pack Size & Format",
        body: `Given the 40g protein / 50 calorie claim, the serving size must be clearly defined and consistent. Consider a single-serve pouch (ideal for gym point-of-sale and impulse) and a multi-serve resealable pack (for pharmacy and supermarket). Single-serve should be priced at an accessible entry point to drive trial. Multi-serve should represent clear value-per-gram to drive loyalty.`
      },
      {
        heading: "Future Range Architecture",
        body: `Plan — but do not produce — a range that could include: turkey jerky, chicken jerky, plant-based variants, flavored variations, and high-fat / ketogenic formats. This planning ensures that the brand name, visual identity, and legal registrations are designed to accommodate range extension without rebranding.`
      },
      {
        heading: "Shelf Life & Cold Chain",
        body: `Beef jerky's primary commercial advantage is ambient shelf stability. Confirm with your manufacturer the exact shelf life under Lebanese storage conditions (humidity and heat are significant factors). Target a minimum of 6 months shelf life. This is critical for distributor acceptance and supermarket ranging.`
      }
    ]
  },
  {
    id: "brand",
    code: "05",
    title: "Brand Development & Identity",
    color: "#C8A96E",
    content: [
      {
        heading: "Naming Principles",
        body: `The brand name must work in Arabic, English, and French — or be language-neutral (acronym, invented word, or symbolic name). It must be ownable (trademarkable), pronounceable across demographics, and convey strength, nutrition, or authenticity without being generic. Avoid names that are purely descriptive (e.g., "Protein Jerky Lebanon") — these cannot be trademarked and build no brand equity.`
      },
      {
        heading: "Visual Identity",
        body: `Engage a professional Lebanese brand designer or agency — not a freelancer producing logo-only work. The identity system must include: wordmark and symbol, color palette (primary + secondary), typography system, packaging design template, and brand usage guidelines. Budget $3,000–$8,000 for a proper identity system. This is not where to cut costs — your packaging IS your salesperson at point of sale.`
      },
      {
        heading: "Packaging Design Imperatives",
        body: `Packaging must communicate: (1) protein quantity — prominently and immediately, (2) ingredient cleanliness — short, readable list, (3) brand personality — through photography, illustration, or graphic language, (4) regulatory compliance — MoPH registration, Halal mark, nutritional table, barcode, and (5) origin pride or story — Lebanese provenance can be a differentiator, not a liability. Test packaging on actual shelf environments before final print run.`
      },
      {
        heading: "Brand Voice & Language",
        body: `Adopt a multilingual brand voice that switches naturally between Arabic, English, and French depending on context and channel. The tone should be confident, clean, and performance-oriented — never playful or childish. Think: the brand speaks like a serious athlete, not a candy company.`
      }
    ]
  },
  {
    id: "distribution",
    code: "06",
    title: "Distribution & Channel Strategy",
    color: "#7EB5A6",
    content: [
      {
        heading: "Channel Sequencing — Phase 1: Gyms & Fitness Centers",
        body: `Launch exclusively through gym and fitness center channels in Month 1–3. Approach gym owners directly with a formal presentation, product samples, and a clear commercial proposal. Offer consignment or sale-or-return terms initially to reduce their risk. Target 20–30 gyms across Greater Beirut and Mount Lebanon. This builds brand credibility, generates authentic word-of-mouth, and creates the social proof needed to approach larger retail.`
      },
      {
        heading: "Channel Sequencing — Phase 2: Pharmacies & Nutrition Shops",
        body: `In Month 3–6, approach pharmacy chains (Pharmacie Bou Khalil, Point Vert, and independents) and specialty nutrition shops. Pharmacies in Lebanon function as trusted health advisors — pharmacist endorsement is a powerful conversion driver. Equip pharmacists with a simple product brief, sample, and talking points. Nutrition shops (e.g., Muscle Up, GNC Lebanon, independents) already have a clientele perfectly matched to your primary segment.`
      },
      {
        heading: "Channel Sequencing — Phase 3: Supermarkets & Co-ops",
        body: `In Month 6–12, approach modern trade: Spinneys, TSC, Bou Khalil Supermarché, Fahed, and regional co-operatives. Supermarket buyers require: (1) proven sell-through data, (2) listing fee or promotional commitment, (3) barcode registration, and (4) minimum supply reliability guarantee. Do not approach supermarkets before you have supply chain stability and sales history to present.`
      },
      {
        heading: "B2B & Corporate Channel",
        body: `A largely untapped channel: corporate wellness programs, hospital staff cafeterias, schools and universities, airline catering, and hotel minibars (boutique hotels). These require different packaging formats and volume pricing but represent significant recurring revenue with low acquisition cost. Develop this channel in parallel with Phase 2.`
      },
      {
        heading: "Distribution Partnership",
        body: `As volume grows, engage a Lebanese FMCG distributor with existing relationships in your target channels. Negotiate carefully — distribution margins in Lebanon typically run 15–25%. Retain direct relationships with key accounts (flagship gyms, anchor pharmacies) to protect brand positioning and gather market intelligence.`
      }
    ]
  },
  {
    id: "pricing",
    code: "07",
    title: "Pricing Architecture",
    color: "#E07B6A",
    content: [
      {
        heading: "Pricing Philosophy",
        body: `Price must be determined by field research, not assumption. However, the framework is: calculate total cost per unit (production + packaging + regulatory + logistics + distributor margin), then apply a target gross margin of 45–60% at the recommended retail price. Do not anchor pricing to the cheapest option in market — anchor to the value delivered (40g protein per serving is a compelling value proposition that justifies premium positioning).`
      },
      {
        heading: "Competitive Benchmarking",
        body: `Map the current imported jerky and protein snack landscape in Lebanon. Note USD prices, pack sizes, and protein content. Your retail price should be within 10–15% of comparable imported products — leveraging local production as a margin advantage, not a price-cutting tool.`
      },
      {
        heading: "Channel Pricing Discipline",
        body: `Maintain consistent recommended retail prices across all channels. Avoid the common Lebanese market mistake of allowing price variation that confuses consumers and damages brand perception. Build channel margins into your structure: Gym owner: 25–30% margin. Pharmacy / nutrition shop: 30–35% margin. Supermarket: 35–40% margin (plus potential listing fees). Distributor: 15–20% margin on top of retail chain.`
      },
      {
        heading: "Currency Considerations",
        body: `Price in USD equivalent given Lebanon's monetary environment. Clearly establish whether shelf prices are in USD or LBP, and at what rate. This must be consistent and communicated clearly to all trade partners. Build a pricing review cycle of every 90 days given market volatility.`
      }
    ]
  },
  {
    id: "operations",
    code: "08",
    title: "Operations & Supply Chain",
    color: "#9B8EC4",
    content: [
      {
        heading: "Manufacturer Relationship Management",
        body: `Formalize the manufacturer relationship with a written supply agreement covering: minimum order quantities, lead times, quality specifications, pricing and payment terms, exclusivity (if applicable), and quality rejection protocols. Do not rely on verbal agreements regardless of personal relationship — this is a commercial imperative.`
      },
      {
        heading: "Quality Control",
        body: `Establish a documented quality control protocol: incoming raw material inspection, in-process checks, and finished goods sampling before shipment. Retain a sample from every production batch for traceability. For imported components, verify documentation at customs clearance. One quality incident in the Lebanese market — particularly in the health segment — can be irreversible.`
      },
      {
        heading: "Inventory Management",
        body: `Start with lean inventory: 60–90 days of estimated sell-through based on your initial account base. Do not over-produce speculatively. As sell-through data matures, shift to a reorder-point model. Factor in lead times from both local and international supply sources in your safety stock calculation.`
      },
      {
        heading: "Warehousing & Logistics",
        body: `Secure ambient storage that meets food safety standards — clean, pest-controlled, with temperature monitoring logs. Lebanon's summer heat can affect product quality if storage is inadequate. For delivery, begin with direct owner-delivery to key accounts (this also builds relationships), then outsource last-mile as volume grows.`
      }
    ]
  },
  {
    id: "sales",
    code: "09",
    title: "Sales Strategy & Key Account Management",
    color: "#C8A96E",
    content: [
      {
        heading: "Sales Approach Philosophy",
        body: `In Lebanon, business is built on relationships, trust, and face-to-face presence — not emails and catalogues. Every key account must be visited in person, regularly and consistently. The founder or a dedicated sales person must own these relationships. This is not delegatable in the early phase.`
      },
      {
        heading: "The Sales Presentation",
        body: `Prepare a professional, printed presentation kit for trade calls. It must include: brand story and product overview, nutritional credentials and lab verification, packaging samples, pricing and margin structure, delivery and terms, and a simple one-page leave-behind. Never approach a buyer without samples and printed materials.`
      },
      {
        heading: "Gym Owner & Trainer Activation",
        body: `Gym owners and personal trainers are your most powerful non-digital sales force. Offer them a structured affiliate or preferred pricing program — not commission (which is complex to administer) but rather preferential wholesale pricing that allows them to retail at a margin. A trainer who believes in the product will recommend it to every client. Invest in this relationship with samples, consistency, and personal service.`
      },
      {
        heading: "Key Account Reviews",
        body: `Conduct formal quarterly reviews with your top 10 accounts. Review sell-through, stock levels, placement quality, and competitive activity. Bring data. Bring a new sample if applicable. These reviews demonstrate professionalism and build the partnership depth that protects your shelf space against competitive encroachment.`
      }
    ]
  },
  {
    id: "roadmap",
    code: "10",
    title: "Launch Roadmap & Milestones",
    color: "#7EB5A6",
    content: [
      {
        heading: "Phase 0 — Foundation (Months 1–2)",
        body: `Register legal entity. Engage notary and begin MoPH registration process. Commission lab testing for nutritional claims. Begin brand naming exercise. Conduct field research (gym visits, competitor audit, consumer interviews). Formalize manufacturer supply agreement. Secure storage facility.`
      },
      {
        heading: "Phase 1 — Build (Months 2–4)",
        body: `Finalize brand identity and packaging design. Submit final packaging to MoPH for label approval. Obtain Halal certification. Register trademark. Produce first commercial batch. Develop trade presentation kit. Begin soft outreach to target gyms.`
      },
      {
        heading: "Phase 2 — Launch (Months 4–6)",
        body: `Formal launch into 20–30 gym accounts. Implement trainer activation program. Begin pharmacy and nutrition shop outreach. Monitor sell-through weekly. Collect consumer feedback systematically. Assess first-batch quality and adjust if necessary. Review pricing against market response.`
      },
      {
        heading: "Phase 3 — Expand (Months 6–12)",
        body: `Approach modern trade with sell-through data in hand. Explore corporate and B2B channel. Evaluate second SKU based on Phase 2 demand signals. Engage distribution partner if volume warrants. Begin planning for range extension. Conduct formal brand health assessment.`
      },
      {
        heading: "Phase 4 — Scale (Month 12+)",
        body: `Evaluate export potential — GCC markets are natural adjacents for a Halal-certified Lebanese product. Formalize distribution partnerships. Introduce second and third SKUs. Consider co-manufacturing locally if volume justifies capital investment. Begin building institutional relationships (hotels, hospitals, airlines).`
      }
    ]
  }
];

export default function BeefJerkyAdvisory() {
  const [active, setActive] = useState("overview");
  const [expandedItems, setExpandedItems] = useState({});

  const activeSection = sections.find(s => s.id === active);

  const toggleItem = (sectionId, idx) => {
    const key = `${sectionId}-${idx}`;
    setExpandedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#0F0E0B",
      minHeight: "100vh",
      color: "#E8E0D0",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Header */}
      <header style={{
        borderBottom: "1px solid #2A2820",
        padding: "32px 40px 24px",
        background: "#0F0E0B"
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.25em", color: "#8A7E6A", textTransform: "uppercase", marginBottom: 8, fontFamily: "monospace" }}>
              KITS Advisory Group · Confidential
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 400, color: "#E8E0D0", lineHeight: 1.2 }}>
              Beef Jerky Venture
            </h1>
            <h2 style={{ margin: "4px 0 0", fontSize: "clamp(13px, 2vw, 17px)", fontWeight: 400, color: "#C8A96E", letterSpacing: "0.05em" }}>
              Lebanese Market Entry — Full Advisory Framework
            </h2>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#5A5245", fontFamily: "monospace", letterSpacing: "0.1em" }}>REF: KAG-JRK-001</div>
            <div style={{ fontSize: 11, color: "#5A5245", fontFamily: "monospace", marginTop: 4 }}>10 SECTIONS · PHASE 0→4</div>
          </div>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* Sidebar */}
        <nav style={{
          width: 220,
          flexShrink: 0,
          borderRight: "1px solid #2A2820",
          padding: "24px 0",
          overflowY: "auto",
          background: "#0C0B09"
        }}>
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                background: active === s.id ? "#1A1810" : "transparent",
                border: "none",
                borderLeft: active === s.id ? `3px solid ${s.color}` : "3px solid transparent",
                padding: "12px 20px",
                cursor: "pointer",
                transition: "all 0.15s ease"
              }}
            >
              <div style={{ fontFamily: "monospace", fontSize: 10, color: active === s.id ? s.color : "#4A4438", letterSpacing: "0.15em", marginBottom: 4 }}>
                {s.code}
              </div>
              <div style={{ fontSize: 12, color: active === s.id ? "#E8E0D0" : "#7A6E5E", lineHeight: 1.4, fontFamily: "Georgia, serif" }}>
                {s.title}
              </div>
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "40px" }}>
          {activeSection && (
            <div key={activeSection.id}>
              {/* Section Header */}
              <div style={{ marginBottom: 36 }}>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: activeSection.color, letterSpacing: "0.2em", marginBottom: 10 }}>
                  SECTION {activeSection.code}
                </div>
                <h2 style={{ margin: 0, fontSize: "clamp(18px, 3vw, 28px)", fontWeight: 400, color: "#E8E0D0", lineHeight: 1.3 }}>
                  {activeSection.title}
                </h2>
                <div style={{ marginTop: 16, height: 1, background: `linear-gradient(to right, ${activeSection.color}, transparent)`, maxWidth: 400 }} />
              </div>

              {/* Content Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {activeSection.content.map((item, idx) => {
                  const key = `${activeSection.id}-${idx}`;
                  const expanded = expandedItems[key] !== false; // default open
                  return (
                    <div key={idx} style={{
                      background: "#131209",
                      border: "1px solid #2A2820",
                      borderRadius: 4,
                      overflow: "hidden"
                    }}>
                      <button
                        onClick={() => toggleItem(activeSection.id, idx)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          background: "transparent",
                          border: "none",
                          padding: "16px 20px",
                          cursor: "pointer",
                          textAlign: "left"
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 6, height: 6, borderRadius: "50%", background: activeSection.color, flexShrink: 0 }} />
                          <span style={{ fontSize: 14, color: "#D4C9B4", fontFamily: "Georgia, serif", fontWeight: 400 }}>
                            {item.heading}
                          </span>
                        </div>
                        <span style={{ color: "#5A5245", fontSize: 16, flexShrink: 0 }}>
                          {expanded ? "−" : "+"}
                        </span>
                      </button>
                      {expanded && (
                        <div style={{ padding: "0 20px 20px 38px" }}>
                          <p style={{
                            margin: 0,
                            fontSize: 14,
                            lineHeight: 1.85,
                            color: "#9A8E7E",
                            fontFamily: "Georgia, serif"
                          }}>
                            {item.body}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Section Footer */}
              <div style={{ marginTop: 40, paddingTop: 24, borderTop: "1px solid #1E1C16", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: "#3A3428", letterSpacing: "0.15em" }}>
                  KITS ADVISORY · CONFIDENTIAL · NOT FOR DISTRIBUTION
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {sections.map(s => (
                    <button
                      key={s.id}
                      onClick={() => setActive(s.id)}
                      style={{
                        width: 8, height: 8,
                        borderRadius: "50%",
                        background: active === s.id ? activeSection.color : "#2A2820",
                        border: "none",
                        cursor: "pointer",
                        padding: 0
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Data powering the case studies (now with optional bigStats + centeredSections)

export type KPI = { label: string; sub?: string; dir?: "up" | "down" | "flat" };
export type BigStat = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  title: string;
  titleShort?: string; 
  cardTitle?: string;
  subtitle?: string;
  eyebrow?: string;
  cover: string;
  brief: string | string[];
  shipped: string[];
  results: KPI[];
  gallery: string[];
  meta: {
    industry: string;
    project: string;
    technology: string[] | string;
    websiteLabel?: string;
    websiteHref?: string;
  };
  bigStatsHeading?: string;
  bigStats?: BigStat[];
  centeredSections?: { title: string; paragraphs: string[] }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "hhc-friends-ux",
    eyebrow: "Shopify • Theme & PDP Enhancements",
    title: "Everyday shopping UX that’s fast, clear, and mobile-first.",
    titleShort: "Faster, clearer mobile shopping.", // <= new
    subtitle: "Predictive discovery, variant clarity, and no-drama performance hygiene.",
    cover: "/case-1.jpg",
    brief: [
      "Remove PDP confusion and improve product discovery on mobile—without adding visual noise or layout shift.",
      "Focused on smarter search (suggestions + relevance cues), variant clarity (colour/size at a glance, stock aware), and calm performance (stable media ratios, deferred non-critical JS).",
    ],
    shipped: [
      "Predictive Search Overlay: `/search/suggest.json`, debounced input, keyboard nav, highlighted terms, product/collection tabs.",
      "Variant swatches + availability: metafield-driven colour/size chips with stock awareness and URL state (deep-link to a variant).",
      "FAQ/content blocks: lightweight accordions via metaobjects with zero forced layout shift.",
      "Mobile polish: safe line-lengths, bigger tap targets, selective sticky ATC, fewer surprise scroll jumps.",
      "Performance hygiene: fixed image aspect ratios (no CLS), responsive images, deferred non-critical JS.",
      "USP icons + PDP microcopy: reduce objections and improve clarity.",
    ],
    results: [
      { label: "Time-to-find", sub: "Predictive search & highlighted terms", dir: "down" },
      { label: "PDP confusion", sub: "Variant chips + stock awareness", dir: "down" },
      { label: "CLS", sub: "Stable image ratios", dir: "down" },
      { label: "Tap accuracy", sub: "Mobile spacing/targets", dir: "up" },
    ],
    gallery: ["/case-2.jpg", "/case-3.jpg", "/case-4.jpg", "/case-5.jpg", "/case-6.jpg"],
    meta: {
      industry: "E-commerce",
      project: "Theme & PDP Enhancements",
      technology: ["Shopify (Storefront/JSON search)", "Liquid", "JS/TS", "Metaobjects"],
      websiteLabel: "Private (NDA)",
    },
    // Add stats later when available; section hides if empty
    centeredSections: [
      {
        title: "CRO roadmap for growth",
        paragraphs: [
          "We prioritised low-risk, high-clarity improvements first: removing layout shift, clarifying variants, and making search feel instant.",
          "Subsequent iterations targeted friction hotspots we saw in heatmaps and session replays—primarily PDP micro-interactions and tapping accuracy on mobile.",
        ],
      },
    ],
  },

  {
    slug: "n8n-blog-automation",
    eyebrow: "Automation • Content Ops",
    title: "Hands-free German blog posts for Shopify.",
    titleShort: "Hands-free German blog posts.",  // <= new
    subtitle: "Topic selection, keyword mapping, HTML output, images, and safe drafts—end-to-end in n8n.",
    cover: "/case-8.jpg",
    brief: [
      "Remove manual grind from publishing SEO-useful articles while keeping control over topics, language, and quality.",
      "Built a multi-node n8n pipeline to pick a unique topic per run, generate German-only articles with images, and post drafts to Shopify.",
    ],
    shipped: [
      "THEMES array + uniqueness guard via `getWorkflowStaticData` (no repeats until exhaustion).",
      "German keyword mapping (`deKeyword`) injected into prompts for consistent on-page SEO.",
      "HTML article generation (titles, H2/H3, internal links).",
      "Shopify Admin API integration (`blogs.json`, `articles.json`) with `published: false` for safe staging.",
      "Image fetching/embedding; slug and duplication checks.",
      "Daily/adhoc schedules and simple failure notifications.",
    ],
    results: [
      { label: "Time to publish", sub: "Idea → review-ready draft", dir: "down" },
      { label: "Topic coverage", sub: "No duplicate themes until list exhausted", dir: "up" },
      { label: "Consistency", sub: "German-only, structure & links", dir: "up" },
      { label: "Human edits needed", sub: "Arrives format-clean", dir: "down" },
    ],
    gallery: ["/case-9.jpg", "/case-10.jpg", "/case-11.jpg"],
    meta: {
      industry: "E-commerce / Content",
      project: "n8n → Shopify Blog Automation",
      technology: ["n8n", "Shopify Admin API", "JS/TS", "Prompt design"],
      websiteLabel: "Private (internal tooling)",
    },
    bigStatsHeading: "Since introducing automation",
    bigStats: [
      { value: "–85%", label: "Manual time per article" },
      { value: "+100%", label: "Publishing cadence" },
      { value: "0", label: "Duplicate topics shipped" },
    ],
    centeredSections: [
      {
        title: "Simple pipeline, predictable output",
        paragraphs: [
          "A single n8n workflow handles topic selection, German keyword mapping, HTML generation, images and Shopify draft creation.",
          "Editors keep control: drafts arrive cleanly formatted and can be scheduled or published as-is.",
        ],
      },
    ],
  },

  {
    slug: "analytics-agent-gsc",
    eyebrow: "Analytics • Automation",
    title: "Rolling Search Console reporting without spreadsheets.",
    cardTitle: "Rolling Search Console reporting", // <= no ellipsis
    subtitle: "30-day top queries & pages, parsed and sent on a schedule—plus dashboards.",
    cover: "/case-11.jpg",
    brief: [
      "Keep managers informed without manual exports; make wins/losses obvious.",
      "n8n flow hits the Search Console API, parses the last 30 days, and ships a tidy email (and Looker Studio refresh) every two days.",
    ],
    shipped: [
      "GSC API integration (property: sc-domain; rolling 30-day windows).",
      "Parsing & ranking: top queries, top pages, CTR & position deltas.",
      "Looker Studio dataset refresh + templated boards.",
      "Scheduled email summaries with highlights and links.",
      "Error handling and simple observability on run failures.",
    ],
    results: [
      { label: "Manual reporting time", sub: "Automated summaries", dir: "down" },
      { label: "Stakeholder visibility", sub: "Predictable email cadence", dir: "up" },
      { label: "Decision speed", sub: "Trends & deltas surfaced early", dir: "up" },
    ],
    gallery: ["/case-12.jpg", "/case-7.jpg", "/case-6.jpg"],
    meta: {
      industry: "E-commerce / Analytics",
      project: "GSC → Looker Studio + Digest",
      technology: ["n8n", "Google Search Console API", "Looker Studio", "Email"],
      websiteLabel: "Private (internal reporting)",
    },
    bigStatsHeading: "After automating the reporting loop",
    bigStats: [
      { value: "–90%", label: "Time spent on monthly reporting" },
      { value: "+3×", label: "Stakeholder touchpoints" },
      { value: "2d", label: "Update cadence" },
    ],
  },
];

// src/data/work.ts
export type Outcome = { label: string; value: string };
export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  cover: { img?: string; video?: string; poster?: string };
  summary: string;
  highlights: string[];
  outcomes: Outcome[];
  stack: string[];
  gallery: string[]; // images only for now
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "social-commerce-loyalty",
    title: "Social Commerce Loyalty Engine",
    tagline: "UGC-driven loyalty + referral flows across Shopify ↔ n8n.",
    cover: { video: "/hero.mp4", poster: "/hero-poster.jpg" },
    summary:
      "Composable rewards spanning purchases, reviews, UGC and referrals. Real-time progress updates surface in a headless UI while n8n orchestrates workflows and throttling.",
    highlights: [
      "Event bus → n8n → Shopify customer metafields",
      "Admin views for overrides + audit trail",
      "Rate-limited referral links, fraud checks",
    ],
    outcomes: [
      { label: "Signup → 1st order conversion", value: "+22%" },
      { label: "UGC submissions / mo", value: "3.1×" },
      { label: "Ops time per campaign", value: "–65%" },
    ],
    stack: ["Shopify", "Next.js", "n8n", "Vercel"],
    gallery: ["/case-1.jpg", "/case-2.jpg", "/case-3.jpg", "/case-4.jpg"],
  },
  {
    slug: "automated-content-pipeline",
    title: "Automated Content Pipeline",
    tagline: "One source of truth → resized, tagged, published everywhere.",
    cover: { img: "/case-6.jpg" },
    summary:
      "Asset intake → AI tagging → variant generation → scheduled publishing. Centralized metadata keeps PDPs, blogs, and socials in sync.",
    highlights: [
      "n8n orchestrations with retries + alerts",
      "AI tagging & alt-text; image/video variants",
      "Omnichannel publish (Shopify, Blog, social)",
    ],
    outcomes: [
      { label: "Content throughput", value: "+4.7×" },
      { label: "Manual image work", value: "–80%" },
    ],
    stack: ["n8n", "Shopify", "Cloudinary", "OpenAI"],
    gallery: ["/case-7.jpg", "/case-8.jpg", "/case-9.jpg"],
  },
  {
    slug: "headless-storefront-demo",
    title: "Headless Storefront Demo",
    tagline: "Next.js + Storefront API with snappy page loads.",
    cover: { img: "/case-10.jpg" },
    summary:
      "Edge-cached product lists, incremental static regen, instant search, and cart APIs wired to Shopify.",
    highlights: [
      "PLP/PD P ISR + stale-while-revalidate",
      "Instant search (Edge) + analytics events",
      "Robust a11y, image CDNs, perf budgets",
    ],
    outcomes: [
      { label: "LCP (P95)", value: "↓ to ~2.1s" },
      { label: "SEO impressions", value: "+38%" },
    ],
    stack: ["Next.js", "Vercel", "Shopify Storefront API"],
    gallery: ["/case-11.jpg", "/case-12.jpg"],
  },
  {
    slug: "ai-email-summaries",
    title: "AI Email Summaries for Ops",
    tagline: "Summarize inbound emails → route → create tasks.",
    cover: { img: "/case-5.jpg" },
    summary:
      "n8n pulls inbound messages, classifies intent, drafts summaries, attaches to tickets, and nudges Slack when thresholds are hit.",
    highlights: [
      "LLM-powered classification & summarization",
      "High-confidence auto-reply, low-confidence queue",
      "Audit log with redaction",
    ],
    outcomes: [
      { label: "First-response time", value: "–46%" },
      { label: "Manual triage", value: "–70%" },
    ],
    stack: ["n8n", "Gmail", "Slack", "OpenAI"],
    gallery: ["/case-3.jpg", "/case-2.jpg"],
  },
];

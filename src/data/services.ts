export type Service = {
  slug: string;
  title: string;
  lead: string;
  bullets: string[];
  cta?: string;
};

export const services: Service[] = [
  {
    slug: "shopify-setup-themes",
    title: "Shopify Setup & Themes",
    lead: "Theme selection or custom builds, a11y and performance budgets baked in.",
    bullets: [
      "Theme audits / refactors",
      "Custom sections & apps (Cart, PDP, subscriptions)",
      "Analytics, pixels, SEO hygiene",
    ],
  },
  {
    slug: "custom-apps-integrations",
    title: "Custom Apps & Integrations",
    lead: "When you outgrow apps, we build exactly what you need.",
    bullets: ["Private/public apps", "3rd-party integrations", "Webhooks + event bus"],
  },
  {
    slug: "headless-storefronts",
    title: "Headless Storefronts",
    lead: "Next.js + Storefront API with edge caching and ISR.",
    bullets: ["PLP/PDP performance targets", "Search, merch tooling", "A/B infra"],
  },
  {
    slug: "automation-n8n",
    title: "Automation with n8n",
    lead: "Tie systems together and remove manual work.",
    bullets: [
      "Order ops (fraud checks, tagging, routing)",
      "Marketing ops (UGC, loyalty, referrals)",
      "Monitoring, retries, on-call alerts",
    ],
  },
  {
    slug: "ai-enhancements",
    title: "AI Enhancements",
    lead: "Summaries, classification, tagging and content generation with guardrails.",
    bullets: [
      "Email/ticket summaries",
      "AI product tags & alt-text",
      "Safety filters + audit trail",
    ],
  },
  {
    slug: "support-and-growth",
    title: "Support & Growth",
    lead: "Retainer for iteration, experiments and roadmap support.",
    bullets: ["Perf & SEO tune-ups", "New features monthly", "Data reviews & insights"],
  },
];

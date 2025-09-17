export const logos = ["HHC Friends","Mollerus","Sunnamusk","Case","CleanCo","Bio & Me"];

export const cases = [
  {
    slug: "hhc-friends",
    title: "HHC Friends (DE)",
    subtitle: "Shopify customization & analytics",
    bullets: ["Predictive search overlay","Variant swatches & USP icons","GSC → email digest via n8n"],
    body: "Deep dive on predictive search, variant UX and analytics automation.",
    tags: ["Shopify", "Automation"],
    image: "/case-1.jpg",
  },
  {
    slug: "content-pipeline",
    title: "Content Pipeline",
    subtitle: "n8n blog generation → Shopify drafts",
    bullets: ["Topic pool with de-dupe","Image embed & metafields","Email status after each run"],
    body: "Automated draft creation with guardrails and shop integration.",
    tags: ["Automation"],
    image: "/case-2.jpg",
  },
  {
    slug: "hydrogen-demo",
    title: "Shopify Headless Demo",
    subtitle: "Hydrogen Storefront API",
    bullets: ["Server components","Instant search","Optimised PDP UX"],
    body: "Showcase of headless patterns and fast PDP flows.",
    tags: ["Headless", "Shopify"],
    image: "/case-3.jpg",
  },
] as const;

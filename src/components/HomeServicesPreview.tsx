// components/HomeServicesPreview.tsx
"use client";
import { useState } from "react";

const groups = {
  "Design & Development": [
    "Custom themes (OS 2.0)",
    "Checkout UX & subscriptions",
    "Private apps & integrations",
    "Headless (Hydrogen/Storefront API)",
    "Performance & accessibility",
  ],
  "Automation (n8n)": [
    "GSC/GA4 → email digests",
    "Bots (Gmail, Sheets, Slack/Teams)",
    "Shopify ops (orders, metafields)",
    "Content pipelines (draft→review→publish)",
    "Self-hosted/cloud; alerts & retries",
  ],
  "Support & Growth": [
    "Monthly fixes & iterations",
    "A/B test backlog & implementation",
    "B2B/i18n features",
    "Monitoring, uptime, backups",
  ],
} as const;

export default function HomeServicesPreview() {
  const tabs = Object.keys(groups) as (keyof typeof groups)[];
  const [active, setActive] = useState<typeof tabs[number]>("Design & Development");

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
      <div>
        <ul className="space-y-3">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`w-full text-left rounded-2xl px-4 py-3 ring-1 transition
              ${active === t ? "bg-white text-[#0B0F1A] ring-white" : "ring-white/15 text-white/80 hover:text-white"}`}
            >
              {t}
            </button>
          ))}
        </ul>
      </div>

      <div className="md:col-span-2 rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
        <ul className="grid sm:grid-cols-2 gap-3 text-white/80">
          {groups[active].map((i) => (
            <li key={i} className="rounded-xl bg-[#0D1324] ring-1 ring-white/10 px-4 py-3">
              {i}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex gap-3">
          <a href="/services" className="rounded-2xl px-4 py-2 bg-white text-[#0B0F1A]">Explore Services</a>
          <a href="/contact" className="rounded-2xl px-4 py-2 ring-1 ring-white/20 hover:ring-white/40">Get in touch</a>
        </div>
      </div>
    </section>
  );
}

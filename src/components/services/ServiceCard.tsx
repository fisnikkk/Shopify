// src/components/services/ServiceCard.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type AnyService = {
    slug: string;
    title: string;
    lead?: string;
    bullets?: string[];
    features?: string[];
    items?: string[];
    points?: string[];
    badge?: string;
};

function pickBullets(s: AnyService) {
    return (s.bullets ?? s.features ?? s.items ?? s.points ?? []).filter(Boolean);
}

export default function ServiceCard({ s, i = 0 }: { s: AnyService; i?: number }) {
    const list = pickBullets(s);

    return (
        <motion.article
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: i * 0.05, duration: 0.28, ease: "easeOut" }}
            className="group relative"
        >
            <Link href={`/services/${s.slug}`} className="block relative rounded-2xl">
                {/* gradient ring + glow */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-70 group-hover:opacity-100 transition">
                    <div className="absolute inset-0 rounded-2xl p-[1px] bg-[linear-gradient(120deg,rgba(217,70,239,.45),rgba(59,130,246,.35),rgba(20,184,166,.35))]" />
                    <div className="absolute -inset-10 rounded-[30px] blur-2xl bg-[radial-gradient(40%_20%_at_10%_-10%,rgba(255,255,255,.05),transparent)]" />
                </div>

                <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition-transform will-change-transform group-hover:-translate-y-0.5 group-hover:bg-white/[0.05]">
                    {s.badge && (
                        <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium bg-white/10 text-white/80 border border-white/10">
                            {s.badge}
                        </span>
                    )}
                    <h3 className="mt-1 text-xl font-semibold tracking-tight">{s.title}</h3>
                    {s.lead && <p className="mt-2 text-white/70">{s.lead}</p>}

                    {/* bullets (show only if present) */}
                    {list.length > 0 && (
                        <ul className="mt-4 space-y-2 text-white/85">
                            {list.slice(0, 3).map((b) => (
                                <li key={b} className="flex items-start gap-2">
                                    <span className="mt-1 grid h-4 w-4 place-items-center rounded-full border border-white/25 text-[10px] text-white/70">✓</span>
                                    <span className="leading-snug">{b}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="mt-5 inline-flex items-center gap-2 text-sm text-white/70 group-hover:text-white">
                        Learn more <span aria-hidden>→</span>
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}

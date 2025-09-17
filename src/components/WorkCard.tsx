// ────────────────────────────────────────────────────────────────────────────────
// src/components/WorkCard.tsx
// Card used on the Our Work grid. Pulls teaser + tags from caseStudies.
// ────────────────────────────────────────────────────────────────────────────────
"use client";

import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "@/data/work";

export default function WorkCard({ item }: { item: CaseStudy }) {
    return (
        <Link
            href={`/work/${item.slug}`}
            className="group block overflow-hidden rounded-3xl bg-zinc-900 ring-1 ring-white/10 hover:ring-white/20 transition-shadow"
        >
            <div className="relative aspect-[4/5] w-full">
                <Image
                    src={item.cover}
                    alt={item.coverAlt ?? item.title}
                    fill
                    sizes="(min-width:1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/0" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <h3 className="text-white font-bold text-2xl md:text-3xl leading-tight">
                        {item.title}
                    </h3>
                    {item.teaser ? (
                        <p className="mt-1 text-white/80 text-sm md:text-base">{item.teaser}</p>
                    ) : (
                        <p className="mt-1 text-white/70 text-sm md:text-base">{item.subtitle}</p>
                    )}
                    {item.tags?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {item.tags.map((t) => (
                                <span
                                    key={t}
                                    className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/80 ring-1 ring-white/15"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        </Link>
    );
}

// ────────────────────────────────────────────────────────────────────────────────
// src/components/WorkGrid.tsx
// Simple grid that renders WorkCard. Replace your current one if you like.
// ────────────────────────────────────────────────────────────────────────────────
import type { CaseStudy } from "@/data/work";
import WorkCard from "./WorkCard";

export function WorkGrid({ items }: { items: CaseStudy[] }) {
    return (
        <div className="grid gap-6 md:gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
                <WorkCard key={item.slug} item={item} />)
            )}
        </div>
    );
}

// ────────────────────────────────────────────────────────────────────────────────
// src/components/work/StudyHero.tsx
// Full‑bleed hero with image + big title & subtitle overlay.
// ────────────────────────────────────────────────────────────────────────────────
"use client";

import Image from "next/image";
import type { CaseStudy } from "@/data/work";

export function StudyHero({ cs }: { cs: CaseStudy }) {
    return (
        <section className="relative w-full">
            <div className="relative h-[48vh] min-h-[360px] w-full overflow-hidden">
                <Image
                    src={cs.cover}
                    alt={cs.coverAlt ?? cs.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                    <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight">
                        {cs.title}
                    </h1>
                    {cs.subtitle && (
                        <p className="mt-2 text-white/85 text-base md:text-lg max-w-3xl">
                            {cs.subtitle}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}

// ────────────────────────────────────────────────────────────────────────────────
// src/components/work/StudySidebar.tsx
// Right column meta info like the Charle page.
// ────────────────────────────────────────────────────────────────────────────────
import Link from "next/link";
import type { CaseStudy } from "@/data/work";

export function StudySidebar({ cs }: { cs: CaseStudy }) {
    return (
        <aside className="sticky top-24 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <dl className="space-y-4 text-sm">
                {cs.industry && (
                    <div>
                        <dt className="text-white/60">Industry</dt>
                        <dd className="text-white">{cs.industry}</dd>
                    </div>
                )}
                {cs.project && (
                    <div>
                        <dt className="text-white/60">Project</dt>
                        <dd className="text-white">{cs.project}</dd>
                    </div>
                )}
                {cs.technology?.length ? (
                    <div>
                        <dt className="text-white/60">Technology</dt>
                        <dd className="text-white">{cs.technology.join(", ")}</dd>
                    </div>
                ) : null}
                {cs.website && (
                    <div>
                        <dt className="text-white/60">Website</dt>
                        <dd className="text-white">
                            {cs.website.href ? (
                                <Link href={cs.website.href} className="underline decoration-white/30 hover:decoration-white">
                                    {cs.website.label}
                                </Link>
                            ) : (
                                cs.website.label
                            )}
                        </dd>
                    </div>
                )}
            </dl>
        </aside>
    );
}

// ────────────────────────────────────────────────────────────────────────────────
// src/components/work/StudySection.tsx
// Generic section with heading + content, plus optional metric callouts.
// ────────────────────────────────────────────────────────────────────────────────
import type { Metric } from "@/data/work";

export function StudySection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="py-8 border-b border-white/10 last:border-none">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
            <div className="mt-4 prose prose-invert max-w-none">
                {children}
            </div>
        </section>
    );
}

export function MetricBand({ metrics }: { metrics?: Metric[] }) {
    if (!metrics?.length) return null;
    return (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((m) => (
                <div key={m.label} className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="text-white/70 text-xs uppercase tracking-wide">{m.label}</div>
                    <div className="text-white text-lg font-semibold">{m.value}</div>
                    {m.hint && <div className="text-white/60 text-sm mt-1">{m.hint}</div>}
                </div>
            ))}
        </div>
    );
}

// ────────────────────────────────────────────────────────────────────────────────
// src/app/work/[slug]/page.tsx
// Full case‑study page that consumes the data and renders real content.
// ────────────────────────────────────────────────────────────────────────────────
import { notFound } from "next/navigation";
import { caseStudies, type CaseStudy } from "@/data/work";
import { StudyHero } from "@/components/work/StudyHero";
import { StudySidebar } from "@/components/work/StudySidebar";
import { StudySection, MetricBand } from "@/components/work/StudySection";

export const dynamic = "force-static";

export function generateStaticParams() {
    return caseStudies.map((c) => ({ slug: c.slug }));
}

export const metadata = { title: "Case Study" };

export default function WorkStudyPage({ params }: { params: { slug: string } }) {
    const cs: CaseStudy | undefined = caseStudies.find((c) => c.slug === params.slug);
    if (!cs) return notFound();

    return (
        <main className="bg-[#0b0f17] text-white">
            <StudyHero cs={cs} />

            <div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 py-10">
                {/* Main content */}
                <div className="lg:col-span-8 space-y-8">
                    <StudySection title="The Brief">
                        <p className="text-white/85 leading-relaxed">{cs.brief}</p>
                    </StudySection>

                    <StudySection title="What I shipped">
                        <ul className="list-disc pl-6">
                            {cs.shipped.map((line, i) => (
                                <li key={i}>{line}</li>
                            ))}
                        </ul>
                        <MetricBand metrics={cs.metrics} />
                    </StudySection>

                    {cs.outcomes?.length ? (
                        <StudySection title="Outcomes">
                            <ul className="list-disc pl-6">
                                {cs.outcomes.map((o) => (
                                    <li key={o}>{o}</li>
                                ))}
                            </ul>
                        </StudySection>
                    ) : null}

                    {cs.gallery?.length ? (
                        <StudySection title="Gallery">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {cs.gallery.map((g, i) => (
                                    <img key={i} src={g.src} alt={g.alt} className="rounded-xl ring-1 ring-white/10" />
                                ))}
                            </div>
                        </StudySection>
                    ) : null}
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4">
                    <StudySidebar cs={cs} />
                </div>
            </div>
        </main>
    );
}

// src/app/work/[slug]/page.tsx
import { notFound } from "next/navigation";
import HeroReveal from "@/components/work/HeroReveal";
import CaseMetaCard from "@/components/work/CaseMetaCard";
import ResultsGrid, { type KPI } from "@/components/work/ResultsGrid";
import HighlightsGrid from "@/components/work/HighlightsGrid";
import SectionJumpBar from "@/components/work/SectionJumpBar";
import GetInTouchBand from "@/components/work/GetInTouchBand";
import CaseNav from "@/components/work/CaseNav";
import BigStatsBand from "@/components/work/BigStatsBand";
import CenteredCopyBlock from "@/components/work/CenteredCopyBlock";
import { caseStudies } from "@/data/work";

export const dynamic = "force-static";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}
export const metadata = { title: "Case Study" };

type Base = (typeof caseStudies)[number];
type RawMetric = {
  label?: string; title?: string; sub?: string; caption?: string;
  dir?: "up" | "down" | "flat"; direction?: "up" | "down" | "flat";
};
type LooseCase = Base & {
  slug: string; title?: string; titleShort?: string; subtitle?: string; eyebrow?: string;
  cover?: string;
  brief?: string | string[];
  meta?: {
    industry?: string; project?: string;
    technology?: string[] | string;
    websiteLabel?: string; websiteHref?: string;
  };
  industry?: string; project?: string; tech?: string[] | string;
  website?: { label?: string; href?: string } | string;
  shipped?: string[]; deliverables?: string[];
  results?: RawMetric[]; metrics?: RawMetric[];
  gallery?: string[]; images?: string[];
  bigStats?: { label?: string; value?: string }[]; bigStatsHeading?: string;
  centeredSections?: { title: string; paragraphs: string[] }[];
};

export default function CasePage({ params }: { params: { slug: string } }) {
  const idx = caseStudies.findIndex((c) => c.slug === params.slug);
  const cs = caseStudies[idx] as LooseCase | undefined;
  if (!cs) return notFound();

  const technologyValue: string = (() => {
    const tech = cs.meta?.technology ?? cs.tech;
    if (Array.isArray(tech)) return tech.join(", ");
    if (typeof tech === "string") return tech;
    return "—";
  })();

  const metaItems: { label: string; value: string; href?: string }[] = [
    { label: "Industry", value: cs.meta?.industry ?? cs.industry ?? "—" },
    { label: "Project", value: cs.meta?.project ?? cs.project ?? "—" },
    { label: "Technology", value: technologyValue },
    {
      label: "Website",
      value:
        cs.meta?.websiteLabel ??
        (typeof cs.website === "string" ? cs.website : cs.website?.label) ??
        "Private (NDA)",
      href:
        (typeof cs.website === "object" ? cs.website?.href : undefined) ??
        cs.meta?.websiteHref,
    },
  ];

  const shipped: string[] = cs.shipped ?? cs.deliverables ?? [];

  const rawMetrics: RawMetric[] = (cs.results ?? cs.metrics ?? []) as RawMetric[];
  const results: KPI[] = rawMetrics.map((m) => ({
    label: m.label ?? m.title ?? "",
    sub: m.sub ?? m.caption,
    dir: m.dir ?? m.direction,
  }));

  const images: string[] = cs.gallery ?? cs.images ?? [];

  const prev: LooseCase | undefined = idx > 0 ? (caseStudies[idx - 1] as LooseCase) : undefined;
  const next: LooseCase | undefined = idx < caseStudies.length - 1 ? (caseStudies[idx + 1] as LooseCase) : undefined;

  return (
    <div className="bg-white text-black">
      <HeroReveal
        imageSrc={String(cs.cover ?? "")}
        title={cs.title ?? ""}
        titleShort={cs.titleShort}
        subtitle={cs.subtitle}
        eyebrow={cs.eyebrow}
        idKey={cs.slug}
      />

      <SectionJumpBar
        sections={[
          { id: "brief", label: "Brief" },
          { id: "shipped", label: "Shipped" },
          ...(results.length ? [{ id: "results", label: "Results" }] : []),
          ...(images.length ? [{ id: "highlights", label: "Highlights" }] : []),
        ]}
      />

      <section id="brief" className="scroll-mt-28">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-20 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-8">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">The Brief</h2>
              <div className="prose-balanced mt-6 max-w-none">
                {Array.isArray(cs.brief)
                  ? cs.brief.map((p, i) => <p key={i}>{p}</p>)
                  : <p>{cs.brief}</p>}
              </div>

              {shipped.length > 0 && (
                <div id="shipped" className="scroll-mt-28 mt-14">
                  <div className="text-xs tracking-[0.18em] text-black/50 font-semibold">DESIGN & BUILD</div>
                  <h3 className="text-3xl md:text-4xl font-bold mt-1">What I shipped</h3>
                  <ul className="mt-6 space-y-3">
                    {shipped.map((line, i) => (
                      <li key={i} className="pl-6 relative">
                        <span className="absolute left-0 top-[0.9rem] h-[5px] w-[5px] rounded-full bg-black/70" />
                        <span className="text-[17px] leading-8">{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="lg:col-span-4 relative">
              <div
                className="hidden lg:block absolute -z-10 top-[-24px] bottom-[-24px] left-[-24px] right-[-24px] bg-neutral-100"
                aria-hidden
              />
              <CaseMetaCard items={metaItems} />
            </div>
          </div>
        </div>
      </section>

      {results.length > 0 && (
        <section id="results" className="scroll-mt-28 bg-neutral-50/60">
          <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-20 md:py-24">
            <h2 className="text-4xl md:text-5xl font-bold">Results</h2>
            <div className="mt-6">
              <ResultsGrid items={results} />
            </div>
          </div>
        </section>
      )}

      {images.length > 0 && (
        <section id="highlights" className="scroll-mt-28 mx-auto max-w-[1200px] px-4 md:px-6 py-20 md:py-24">
          <div className="text-xs tracking-[0.18em] text-black/50 font-semibold">UI</div>
          <h2 className="text-4xl md:text-5xl font-bold mt-1">Highlights</h2>
          <div className="mt-8">
            <HighlightsGrid images={images} />
          </div>
        </section>
      )}

      {cs.bigStats?.length ? (
        <BigStatsBand heading={cs.bigStatsHeading} stats={cs.bigStats} />
      ) : null}

      {Array.isArray(cs.centeredSections) &&
        cs.centeredSections.map((sec, i) => (
          <CenteredCopyBlock key={i} title={sec.title} paragraphs={sec.paragraphs} />
        ))}

      <GetInTouchBand />
      <CaseNav
        prev={prev ? { href: `/work/${prev.slug}`, title: prev.title ?? "Previous" } : undefined}
        next={next ? { href: `/work/${next.slug}`, title: next.title ?? "Next" } : undefined}
      />
    </div>
  );
}

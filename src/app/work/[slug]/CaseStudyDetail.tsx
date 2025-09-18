"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * A flexible, local type for this component only.
 * It avoids intersecting with the stricter KPI-based types from data/work.
 */
type CoverObj = { poster?: string; img?: string; video?: string };
type CaseStudy = {
  slug: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;

  // Overview
  summary?: string;
  brief?: string | string[];

  // Lists / content
  highlights?: string[];
  shipped?: string[];
  deliverables?: string[];
  sections?: { heading: string; body: string }[] | string[];

  // Outcomes / metrics (accept anything, we normalize below)
  outcomes?: { label: string; value: string }[];
  results?: Array<Record<string, unknown>>;
  metrics?: Array<Record<string, unknown>>;

  // Tech stack
  stack?: string[];
  tech?: string[];
  technology?: string[];

  // Gallery
  gallery?: string[];
  images?: string[];

  // Media
  cover: string | CoverObj;
};

const isCoverObj = (c: unknown): c is CoverObj =>
  typeof c === "object" && c !== null;

export default function CaseStudyDetail({ cs }: { cs: CaseStudy }) {
  const [showMedia, setShowMedia] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // --- Normalize fields from whatever the data provides ---
  const overview =
    cs.summary ??
    (Array.isArray(cs.brief) ? cs.brief.join("\n\n") : cs.brief) ??
    "";

  const highlights = cs.highlights ?? cs.shipped ?? cs.deliverables ?? [];

  const sectionsArr: { heading: string; body: string }[] = Array.isArray(cs.sections)
    ? (cs.sections as any[]).map((s) =>
      typeof s === "string" ? { heading: "", body: s } : s
    )
    : [];

  const outcomes =
    cs.outcomes ??
    ((cs.results ?? cs.metrics ?? []) as Array<Record<string, unknown>>).map(
      (m) => ({
        // Try common keys, fall back to empty strings
        label:
          (m["label"] as string) ??
          (m["title"] as string) ??
          (m["metric"] as string) ??
          "",
        value:
          (m["value"] as string) ??
          (m["sub"] as string) ??
          (m["result"] as string) ??
          "",
      })
    );

  const stack = cs.stack ?? cs.tech ?? cs.technology ?? [];
  const gallery = cs.gallery ?? cs.images ?? [];

  // Cover media – support either string or object
  const coverPoster = isCoverObj(cs.cover)
    ? cs.cover.poster ?? cs.cover.img
    : (cs.cover as string | undefined);
  const coverImg = isCoverObj(cs.cover)
    ? cs.cover.img ?? cs.cover.poster
    : (cs.cover as string | undefined);
  const coverVideo = isCoverObj(cs.cover) ? cs.cover.video : undefined;

  useEffect(() => {
    if (showMedia && videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  }, [showMedia]);

  return (
    <main className="px-6 md:px-10 max-w-5xl mx-auto pb-24">
      <div className="mt-10 flex items-center gap-4 text-sm text-white/60">
        <Link href="/work" className="hover:underline">
          ← All work
        </Link>
      </div>

      <motion.h1
        layoutId={`title-${cs.slug}`}
        className="text-4xl md:text-5xl font-bold mt-6"
      >
        {cs.title}
      </motion.h1>
      {(cs.subtitle || cs.eyebrow) && (
        <p className="text-white/70 mt-3">{cs.subtitle ?? cs.eyebrow}</p>
      )}

      <div className="rounded-2xl overflow-hidden border border-white/10 mt-8">
        <motion.div
          layoutId={`cover-${cs.slug}`}
          onLayoutAnimationComplete={() => setShowMedia(true)}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          style={{ willChange: "transform" }}
        >
          {/* During the zoom: lightweight placeholder image */}
          {!showMedia && (coverPoster || coverImg) && (
            <div className="relative aspect-[16/9]">
              <Image
                src={coverImg ?? coverPoster!}
                alt=""
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* After the zoom: heavy media */}
          {showMedia &&
            (coverVideo ? (
              <video
                ref={videoRef}
                className="w-full h-auto"
                muted
                loop
                playsInline
                preload="metadata"
                poster={coverPoster}
              >
                {/* If you don't ship a .webm, remove the next <source> line */}
                <source
                  src={coverVideo.endsWith(".mp4") ? coverVideo.replace(".mp4", ".webm") : `${coverVideo}.webm`}
                  type="video/webm"
                />
                <source src={coverVideo} type="video/mp4" />
              </video>
            ) : (coverImg || coverPoster) ? (
              <div className="relative aspect-[16/9]">
                <Image
                  src={coverImg ?? coverPoster!}
                  alt=""
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : null)}
        </motion.div>
      </div>

      <section className="grid md:grid-cols-[1fr_320px] gap-8 mt-10">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Overview</h2>
          {overview && (
            <p className="text-white/80 leading-7 whitespace-pre-line">{overview}</p>
          )}

          {!!highlights.length && (
            <>
              <h3 className="text-xl font-semibold mt-8 mb-3">Highlights</h3>
              <ul className="space-y-2 text-white/80">
                {highlights.map((h) => (
                  <li key={h} className="flex gap-2 items-start">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-white/50" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {sectionsArr.map((s, i) => (
            <div key={(s.heading || "") + i} className="mt-8">
              {s.heading ? (
                <h3 className="text-xl font-semibold mb-2">{s.heading}</h3>
              ) : null}
              <p className="text-white/80 leading-7">{s.body}</p>
            </div>
          ))}
        </div>

        <aside>
          {!!gallery.length && (
            <div className="grid grid-cols-2 gap-3">
              {gallery.map((g) => (
                <div
                  key={g}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden"
                >
                  <Image src={g} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          )}

          {(!!outcomes.length || !!stack.length) && (
            <div className="mt-6 rounded-2xl border border-white/10 p-5">
              {!!outcomes.length && (
                <>
                  <h3 className="text-xl font-semibold">Outcomes</h3>
                  <dl className="mt-3 space-y-2">
                    {outcomes.map((o, i) => (
                      <div
                        key={(o.label ?? "") + i}
                        className="flex justify-between gap-6 text-white/80"
                      >
                        <dt>{o.label}</dt>
                        <dd className="font-semibold">{o.value}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              )}

              {!!stack.length && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-white/60">Stack</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {stack.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full border border-white/10 text-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </aside>
      </section>

      <div className="mt-12 flex justify-between text-white/60 text-sm">
        <Link href="/work" className="hover:underline">
          ← Back to all work
        </Link>
        <Link href="/contact" className="hover:underline">
          Start a similar project →
        </Link>
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { CaseStudy } from "@/data/work";

export default function CaseStudyDetail({ cs }: { cs: CaseStudy }) {
  const [showMedia, setShowMedia] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (showMedia && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [showMedia]);

  return (
    <main className="px-6 md:px-10 max-w-5xl mx-auto pb-24">
      <div className="mt-10 flex items-center gap-4 text-sm text-white/60">
        <Link href="/work" className="hover:underline">← All work</Link>
      </div>

      <motion.h1 layoutId={`title-${cs.slug}`} className="text-4xl md:text-5xl font-bold mt-6">
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
          {/* During the zoom: keep it cheap */}
          {!showMedia && (
            cs.cover.poster ? (
              <img src={cs.cover.poster} alt="" className="w-full h-auto" />
            ) : cs.cover.img ? (
              <div className="relative aspect-[16/9]">
                <Image src={cs.cover.img} alt="" fill className="object-cover" priority />
              </div>
            ) : null
          )}

          {/* After the zoom: mount the heavy media */}
          {showMedia && (
            cs.cover.video ? (
              <video
                ref={videoRef}
                className="w-full h-auto"
                muted
                loop
                playsInline
                preload="metadata"
                poster={cs.cover.poster}
              >
                <source src={cs.cover.video.replace(".mp4", ".webm")} type="video/webm" />
                <source src={cs.cover.video} type="video/mp4" />
              </video>
            ) : cs.cover.img ? (
              <div className="relative aspect-[16/9]">
                <Image src={cs.cover.img} alt="" fill className="object-cover" priority />
              </div>
            ) : null
          )}
        </motion.div>
      </div>

      <section className="grid md:grid-cols-[1fr_320px] gap-8 mt-10">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Overview</h2>
          <p className="text-white/80 leading-7">{cs.summary}</p>

          <h3 className="text-xl font-semibold mt-8 mb-3">Highlights</h3>
          <ul className="space-y-2 text-white/80">
            {cs.highlights.map((h) => (
              <li key={h} className="flex gap-2 items-start">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-white/50" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          {!!cs.sections?.length && (
            <>
              {cs.sections.map((s) => (
                <div key={s.heading} className="mt-8">
                  <h3 className="text-xl font-semibold mb-2">{s.heading}</h3>
                  <p className="text-white/80 leading-7">{s.body}</p>
                </div>
              ))}
            </>
          )}
        </div>

        <aside>
          {cs.gallery?.length ? (
            <div className="grid grid-cols-2 gap-3">
              {cs.gallery.map((g) => (
                <div key={g} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image src={g} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-6 rounded-2xl border border-white/10 p-5">
            <h3 className="text-xl font-semibold">Outcomes</h3>
            <dl className="mt-3 space-y-2">
              {cs.outcomes.map((o) => (
                <div key={o.label} className="flex justify-between gap-6 text-white/80">
                  <dt>{o.label}</dt>
                  <dd className="font-semibold">{o.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white/60">Stack</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {cs.stack.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full border border-white/10 text-sm">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </section>

      <div className="mt-12 flex justify-between text-white/60 text-sm">
        <Link href="/work" className="hover:underline">← Back to all work</Link>
        <Link href="/contact" className="hover:underline">Start a similar project →</Link>
      </div>
    </main>
  );
}

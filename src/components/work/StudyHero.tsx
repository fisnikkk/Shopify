"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { CaseStudy } from "@/data/work";

export default function StudyHero({ cs }: { cs: CaseStudy }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // micro parallax + micro scale; always rounded / spring to avoid stutter
  const y = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.985]);

  const poster = cs.cover?.poster || cs.cover?.img || cs.gallery?.[0];

  return (
    <section ref={ref} className="relative">
      <motion.div
        layoutId={`cover-${cs.slug}`} // <-- matches the card
        style={{ y, scale }}
        className="relative overflow-hidden rounded-3xl border border-white/10"
        transition={{ type: "spring", stiffness: 260, damping: 36 }}
      >
        <div className="relative aspect-[16/9] w-full">
          {cs.cover?.video ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              muted playsInline autoPlay loop preload="metadata"
              poster={poster}
              src={cs.cover.video}
            />
          ) : (
            <Image
              src={cs.cover?.img || poster || "/case-1.jpg"}
              alt=""
              fill
              priority
              sizes="(min-width:1024px) 1100px, 100vw"
              className="object-cover"
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        </div>
      </motion.div>

      <div className="mt-6">
        <h1 className="text-2xl font-semibold text-white md:text-3xl">{cs.title}</h1>
        {cs.tagline && <p className="mt-1 text-white/70">{cs.tagline}</p>}
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { CaseStudy } from "@/data/work";

export default function CaseStudyCard({
  cs,
  index = 0,
}: {
  cs: CaseStudy;
  index?: number;
}) {
  // simple pattern so some cards are taller → nice staggered masonry
  const ratio =
    index % 6 === 1 ? "aspect-[2/3]" : index % 6 === 4 ? "aspect-[3/4]" : "aspect-[4/5]";

  const vref = useRef<HTMLVideoElement | null>(null);

  return (
    <article className="mb-6 break-inside-avoid rounded-[24px] ring-1 ring-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-hidden bg-zinc-900/60 backdrop-blur">
      <Link
        href={`/work/${cs.slug}`}
        className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-[24px]"
      >
        {/* Media */}
        <div className={`relative w-full ${ratio}`}>
          {cs.cover.video ? (
            <video
              ref={vref}
              className="absolute inset-0 h-full w-full object-cover"
              muted
              playsInline
              loop
              preload="metadata"
              poster={cs.cover.poster}
              onMouseEnter={() => vref.current?.play().catch(() => {})}
              onMouseLeave={() => vref.current?.pause()}
            >
              <source src={cs.cover.video} />
            </video>
          ) : cs.cover.img ? (
            <Image
              src={cs.cover.img}
              alt=""
              fill
              priority={index < 3}
              sizes="(min-width:1024px) 32vw, (min-width:640px) 48vw, 100vw"
              className="object-cover"
            />
          ) : null}

          {/* subtle gradient to lift copy */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        </div>

        {/* Caption */}
        <div className="relative -mt-14 px-5 pb-5">
          <div className="rounded-2xl bg-black/30 px-4 py-3 ring-1 ring-white/10 backdrop-blur-sm">
            <p className="text-white/80 text-sm leading-tight line-clamp-1">
              {cs.tagline}
            </p>
            <h3 className="mt-1 text-white font-semibold text-xl leading-snug line-clamp-2">
              {cs.title}
            </h3>
          </div>
        </div>
      </Link>
    </article>
  );
}

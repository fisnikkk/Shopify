"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

type CoverObj = { img?: string; poster?: string; video?: string };

type MiniCase = {
  slug: string;
  title?: string;
  subtitle?: string;
  // cover can be a string (image path) or an object with media fields
  cover: string | CoverObj;
};

type Props = {
  cs: MiniCase;
  /** Tailwind aspect class (e.g. "aspect-[16/9]" or "aspect-square") */
  ratio?: string;
};

const isCoverObj = (c: unknown): c is CoverObj =>
  typeof c === "object" && c !== null;

export default function CaseStudyCard({ cs, ratio = "aspect-[16/9]" }: Props) {
  const vref = useRef<HTMLVideoElement | null>(null);

  // Normalize cover fields
  const coverPoster = isCoverObj(cs.cover)
    ? cs.cover.poster ?? cs.cover.img
    : (cs.cover as string | undefined);

  const coverImg = isCoverObj(cs.cover)
    ? cs.cover.img ?? cs.cover.poster
    : (cs.cover as string | undefined);

  const coverVideo = isCoverObj(cs.cover) ? cs.cover.video : undefined;

  // Best-effort autoplay on mount (will be ignored if user gesture is required)
  useEffect(() => {
    if (vref.current) {
      vref.current.play().catch(() => { });
    }
  }, []);

  return (
    <Link
      href={`/work/${cs.slug}`}
      className="block rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10 hover:ring-white/20 transition"
    >
      {/* Media */}
      <div className={`relative w-full ${ratio}`}>
        {coverVideo ? (
          <video
            ref={vref}
            className="absolute inset-0 h-full w-full object-cover"
            muted
            loop
            playsInline
            preload="metadata"
            poster={coverPoster}
            onMouseEnter={() => vref.current?.play().catch(() => { })}
            onMouseLeave={() => vref.current?.pause()}
          >
            {/* If you don’t have a .webm, you can remove the source below */}
            <source src={coverVideo.replace(".mp4", ".webm")} type="video/webm" />
            <source src={coverVideo} type="video/mp4" />
          </video>
        ) : coverImg ? (
          <Image
            src={coverImg}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
            priority={false}
          />
        ) : null}
      </div>

      {/* Copy */}
      <div className="p-5">
        {cs.subtitle && <div className="text-sm text-white/60">{cs.subtitle}</div>}
        {cs.title && <div className="text-lg font-semibold">{cs.title}</div>}
      </div>
    </Link>
  );
}

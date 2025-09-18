"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

/** ----- Flexible types (do NOT import CaseStudy here) ----- */
type CoverObj = { img?: string; poster?: string; video?: string };
type MediaCover = string | CoverObj;

type Workish = {
  slug: string;
  title: string;
  subtitle?: string;

  // Optional “client-like” labels (we’ll pick the first that exists)
  client?: string;
  brand?: string;
  company?: string;
  eyebrow?: string;

  // Overview-like fields (we’ll pick the first that exists)
  overview?: string;
  summary?: string;
  brief?: string | string[];

  // Media
  cover?: MediaCover; // preferred
  image?: string;     // fallback
  thumb?: string;     // fallback
};

type Props = {
  cs: Workish;
  invert?: boolean;            // flip media/text on desktop
  ratio?: string;              // tailwind aspect class
};

const isCoverObj = (c: unknown): c is CoverObj =>
  typeof c === "object" && c !== null;

/** Safely normalize cover media into poster/img/video strings */
function useNormalizedCover(cover?: MediaCover, fallbacks: { image?: string; thumb?: string } = {}) {
  const poster =
    (isCoverObj(cover) ? (cover.poster ?? cover.img) : cover) ??
    fallbacks.image ??
    fallbacks.thumb;

  const img =
    (isCoverObj(cover) ? (cover.img ?? cover.poster) : cover) ??
    fallbacks.image ??
    fallbacks.thumb;

  const video = isCoverObj(cover) ? cover.video : undefined;

  return { poster, img, video };
}

export default function CharleCard({ cs, invert = false, ratio = "aspect-[4/3]" }: Props) {
  const vref = useRef<HTMLVideoElement | null>(null);

  // Media normalization
  const { poster, img, video } = useNormalizedCover(cs.cover, {
    image: cs.image,
    thumb: cs.thumb,
  });

  // Label + overview fallbacks
  const label = cs.client ?? cs.brand ?? cs.company ?? cs.eyebrow ?? "";
  const overview =
    cs.overview ??
    cs.summary ??
    (Array.isArray(cs.brief) ? cs.brief.join(" ") : cs.brief) ??
    "";

  // Try autoplay gently (ignored if browser blocks)
  useEffect(() => {
    if (vref.current) {
      vref.current.play().catch(() => { });
    }
  }, []);

  return (
    <Link
      href={`/work/${cs.slug}`}
      className={
        "grid gap-0 overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/5 " +
        "md:grid-cols-12"
      }
    >
      {/* Text side */}
      <div
        className={
          "flex min-h-[240px] flex-col justify-between p-6 md:col-span-5 " +
          (invert ? " md:[direction:ltr]" : "")
        }
      >
        <div>
          {!!label && (
            <div className="mb-2 text-xs uppercase tracking-wider text-white/60">
              {label}
            </div>
          )}
          <h3 className="text-2xl font-semibold leading-tight">{cs.title}</h3>
          {cs.subtitle && <p className="mt-1 text-white/70">{cs.subtitle}</p>}
          {!!overview && <p className="mt-3 text-white/70 line-clamp-4">{overview}</p>}
        </div>

        <div className="mt-4 text-sm text-white/70">View case study →</div>
      </div>

      {/* Media side */}
      <div
        className={
          "relative md:col-span-7 " +
          (invert ? " md:order-first" : " md:order-none")
        }
      >
        <div className={`relative w-full ${ratio}`}>
          {video ? (
            <video
              ref={vref}
              className="absolute inset-0 h-full w-full object-cover"
              muted
              loop
              playsInline
              preload="metadata"
              poster={poster}
              onMouseEnter={() => vref.current?.play().catch(() => { })}
              onMouseLeave={() => vref.current?.pause()}
            >
              {/* Remove .webm line if you don't have one */}
              <source src={video.replace(".mp4", ".webm")} type="video/webm" />
              <source src={video} type="video/mp4" />
            </video>
          ) : img ? (
            <Image
              src={img}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width:1024px) 50vw, 100vw"
              priority={false}
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center bg-white/5 text-white/40">
              No media
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";

/** Local, flexible shape so we don't fight the global CaseStudy type */
type CoverObj = { img?: string; poster?: string; video?: string };
type MediaCover = string | CoverObj;

type Workish = {
  slug: string;
  title: string;
  subtitle?: string;
  /** Some data sets use "category" — make it optional */
  category?: string;

  // media
  cover?: MediaCover; // preferred: string or { img/poster/video }
  image?: string;     // fallback
  thumb?: string;     // fallback
};

const isCoverObj = (c: unknown): c is CoverObj =>
  typeof c === "object" && c !== null;

/** Normalize an image URL from cover/image/thumb */
function pickCoverImage(cover?: MediaCover, fallbacks?: { image?: string; thumb?: string }) {
  if (isCoverObj(cover)) {
    // prefer explicit img, then poster
    return cover.img ?? cover.poster ?? fallbacks?.image ?? fallbacks?.thumb ?? "";
  }
  return cover ?? fallbacks?.image ?? fallbacks?.thumb ?? "";
}

export default function MasonryCard({ cs }: { cs: Workish }) {
  const img = pickCoverImage(cs.cover, { image: cs.image, thumb: cs.thumb });
  const sub = cs.category ?? cs.subtitle ?? "";

  return (
    <Link
      href={`/work/${cs.slug}`}
      className="group relative block overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/5"
    >
      {/* Media */}
      <div className="relative aspect-[4/5]">
        {img ? (
          <Image
            src={img}
            alt=""
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 90vw"
            priority={false}
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-white/40 bg-white/5">
            No image
          </div>
        )}
        {/* bottom gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>

      {/* Text overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        {sub && (
          <p className="text-[13px] text-white/90 drop-shadow-sm">
            {sub}
          </p>
        )}
        <h3 className="mt-0.5 text-lg font-semibold leading-tight drop-shadow-sm">
          {cs.title}
        </h3>
        <div className="mt-1 text-sm text-white/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          View case study →
        </div>
      </div>
    </Link>
  );
}

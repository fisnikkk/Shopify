// src/components/work/StudyHero.tsx
"use client";

import Image from "next/image";
import type { Workish } from "@/lib/workish";
import { pickCoverImage } from "@/lib/workish";

export default function StudyHero({ cs }: { cs: Workish }) {
  const cover = pickCoverImage(cs.cover, { image: cs.image, thumb: cs.thumb });

  return (
    <section className="relative w-full">
      <div className="relative h-[48vh] min-h-[360px] w-full overflow-hidden">
        {cover ? (
          <Image
            src={cover}
            alt={cs.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-white/5 text-white/40">
            No image
          </div>
        )}
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

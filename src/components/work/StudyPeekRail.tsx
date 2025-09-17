"use client";

import Image from "next/image";

export default function StudyPeekRail({ gallery }: { gallery?: string[] }) {
  if (!gallery?.length) return null;

  return (
    <div className="grid gap-4">
      {gallery.slice(0, 3).map((g, i) => (
        <div
          key={i}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10"
        >
          <Image src={g} alt="" fill sizes="320px" className="object-cover" />
        </div>
      ))}
    </div>
  );
}

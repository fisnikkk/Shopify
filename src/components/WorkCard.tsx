// ────────────────────────────────────────────────────────────────────────────────
// src/components/WorkCard.tsx
// Card used on the Our Work grid.
// ────────────────────────────────────────────────────────────────────────────────
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Workish } from "@/lib/workish";
import { pickCoverImage } from "@/lib/workish";

// Extra optional fields some of your data uses
type CardExtras = {
    teaser?: string;
    coverAlt?: string;
    tags?: string[];
};

export default function WorkCard({ item }: { item: Workish & CardExtras }) {
    const img = pickCoverImage(item.cover, { image: item.image, thumb: item.thumb });
    const alt = item.coverAlt ?? item.title;
    const teaser = item.teaser ?? item.subtitle;
    const tags = item.tags ?? [];

    return (
        <Link
            href={`/work/${item.slug}`}
            className="group block overflow-hidden rounded-3xl bg-zinc-900 ring-1 ring-white/10 hover:ring-white/20 transition-shadow"
        >
            <div className="relative aspect-[4/5] w-full">
                {img ? (
                    <Image
                        src={img}
                        alt={alt}
                        fill
                        sizes="(min-width:1024px) 33vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        priority={false}
                    />
                ) : (
                    <div className="absolute inset-0 grid place-items-center text-white/50 bg-white/5">
                        No image
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/0" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <h3 className="text-white font-bold text-2xl md:text-3xl leading-tight">
                        {item.title}
                    </h3>

                    {teaser && (
                        <p className="mt-1 text-white/80 text-sm md:text-base">{teaser}</p>
                    )}

                    {tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {tags.map((t) => (
                                <span
                                    key={t}
                                    className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/80 ring-1 ring-white/15"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}

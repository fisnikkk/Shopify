import Link from "next/link";
import type { CaseStudy } from "@/data/work";

export default function MasonryCard({ cs }: { cs: CaseStudy }) {
  return (
    // key masonry bits: `break-inside-avoid` and natural image height
    <article className="mb-6 break-inside-avoid">
      <Link href={`/work/${cs.slug}`} className="group block rounded-[22px] ring-1 ring-black/10 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
        <div className="relative">
          <img src={cs.cover} alt={cs.title} className="block w-full h-auto object-cover" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
            <h3
              className="
    clamp-2 [text-wrap:balance]
    text-white font-semibold leading-tight drop-shadow-md
    text-[clamp(18px,1.7vw,22px)]
  "
            >
              {cs.cardTitle ?? cs.title}
            </h3>
            <p className="mt-1 text-[13px] text-white/90 drop-shadow">
              {cs.category ?? cs.subtitle}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}

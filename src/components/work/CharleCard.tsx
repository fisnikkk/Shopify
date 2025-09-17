import Link from "next/link";
import type { CaseStudy } from "@/data/work";

export function CharleCard({ cs, index }: { cs: CaseStudy; index: number }) {
  const invert = index % 2 === 1;

  return (
    <article className="group relative mx-auto w-full max-w-[1100px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow">
      <Link href={`/work/${cs.slug}`} className="block">
        <div className={"grid md:grid-cols-12" + (invert ? " md:[direction:rtl]" : "")}>
          <div className="relative md:col-span-7">
            <div className="relative h-64 w-full overflow-hidden md:h-[380px]">
              <img
                src={cs.cover}
                alt={cs.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0" />
            </div>
          </div>

          <div className={"flex min-h-[240px] flex-col justify-between p-6 md:col-span-5 " + (invert ? " md:[direction:ltr]" : "")}>
            <div>
              <div className="mb-2 text-xs uppercase tracking-wider text-white/60">{cs.client}</div>
              <h3 className="text-2xl font-semibold leading-tight">{cs.title}</h3>
              {cs.subtitle && <p className="mt-1 text-white/70">{cs.subtitle}</p>}
              <p className="mt-3 text-white/70">{cs.overview}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {cs.services?.slice(0, 3).map((s) => (
                  <span key={s} className="rounded-full border border-white/10 bg-black/30 px-2 py-1 text-[11px] text-white/80">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div className="flex items-center gap-3 text-sm text-white/60">
                {cs.outcomes?.slice(0, 2).map((o, i) => (
                  <span key={i} className="rounded-md border border-white/10 bg-white/10 px-2 py-0.5">
                    {o.label}: {o.value}
                  </span>
                ))}
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm">
                View case
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                  <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute -left-2 -top-3 hidden h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-sm text-white/70 md:flex">
          {String(index + 1).padStart(2, "0")}
        </div>
      </Link>
    </article>
  );
}

export default CharleCard;

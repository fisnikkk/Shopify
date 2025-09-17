"use client";

import type { CaseStudy } from "@/data/work";

export default function StudyStickyOutcomes({ cs }: { cs: CaseStudy }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-base font-semibold text-white">Outcomes</h3>
      <dl className="mt-3 grid gap-3">
        {(cs.outcomes || []).map((o, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2"
          >
            <dt className="text-sm text-white/70">{o.label}</dt>
            <dd className="text-sm font-semibold text-white">{o.value}</dd>
          </div>
        ))}
      </dl>

      {(cs.links?.demo || cs.links?.repo) && (
        <div className="mt-4 flex gap-2">
          {cs.links.demo && (
            <a
              href={cs.links.demo}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-zinc-900"
            >
              View demo
            </a>
          )}
          {cs.links.repo && (
            <a
              href={cs.links.repo}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold text-white/90"
            >
              Repo
            </a>
          )}
        </div>
      )}

      {(cs.meta?.client || cs.meta?.year || cs.meta?.role) && (
        <div className="mt-5 grid gap-1.5 text-sm text-white/60">
          {cs.meta.client && <p>Client: {cs.meta.client}</p>}
          {cs.meta.role && <p>Role: {cs.meta.role}</p>}
          {cs.meta.year && <p>Year: {cs.meta.year}</p>}
        </div>
      )}
    </div>
  );
}

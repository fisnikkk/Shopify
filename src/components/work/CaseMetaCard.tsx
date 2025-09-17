"use client";

type Item = { label: string; value: string; href?: string };

export default function CaseMetaCard({ items = [] as Item[] }) {
    return (
        <aside className="lg:sticky lg:top-24 rounded-2xl bg-white ring-1 ring-black/10 p-6 shadow-sm">
            <dl className="divide-y divide-black/10">
                {items.map((it, i) => (
                    <div key={i} className="py-3 grid grid-cols-3 gap-x-4">
                        <dt className="col-span-1 text-[11px] tracking-[0.18em] text-black/50 uppercase">
                            {it.label}
                        </dt>
                        <dd className="col-span-2 text-[15px] font-medium leading-6">
                            {it.href ? (
                                <a className="underline decoration-black/20 hover:decoration-black" href={it.href} target="_blank" rel="noreferrer">
                                    {it.value}
                                </a>
                            ) : it.value}
                        </dd>
                    </div>
                ))}
            </dl>
        </aside>
    );
}

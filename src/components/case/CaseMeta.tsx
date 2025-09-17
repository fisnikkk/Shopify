"use client";

type Item = { label: string; value: string; href?: string };

export default function CaseMetaCard({ items = [] as Item[] }) {
    return (
        <aside className="lg:sticky lg:top-24 rounded-2xl bg-neutral-50 shadow-[0_2px_12px_rgba(0,0,0,0.05)] ring-1 ring-black/5 p-6">
            <dl className="divide-y divide-black/10">
                {items.map((it, i) => (
                    <div key={i} className="py-3 grid grid-cols-3 gap-x-4">
                        <dt className="col-span-1 text-xs tracking-[0.18em] text-black/50 uppercase">
                            {it.label}
                        </dt>
                        <dd className="col-span-2 text-[15px] font-medium leading-6">
                            {it.href ? (
                                <a
                                    className="underline decoration-black/20 hover:decoration-black"
                                    href={it.href}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {it.value}
                                </a>
                            ) : (
                                it.value
                            )}
                        </dd>
                    </div>
                ))}
            </dl>
        </aside>
    );
}

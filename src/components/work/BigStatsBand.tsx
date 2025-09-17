"use client";

export type BigStat = { value: string; label: string };

export default function BigStatsBand({ heading, stats }: { heading?: string; stats: BigStat[] }) {
    if (!stats?.length) return null;
    return (
        <section className="bg-white">
            <div className="mx-auto max-w-[1100px] px-4 md:px-6 py-24 md:py-32 text-center">
                {heading && <div className="mb-8 text-black/70">{heading}</div>}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
                    {stats.map((s, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="text-7xl md:text-8xl font-extrabold tracking-[-0.02em]">{s.value}</div>
                            <div className="mt-3 text-lg text-black/70">{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

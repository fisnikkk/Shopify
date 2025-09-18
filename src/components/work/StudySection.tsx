// src/components/work/StudySection.tsx
export function StudySection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="py-8 border-b border-white/10 last:border-none">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
            <div className="mt-4 prose prose-invert max-w-none">{children}</div>
        </section>
    );
}

// Local flexible metric type
type Metricish = { label: string; value: string; hint?: string };

export function MetricBand({ metrics }: { metrics?: Metricish[] }) {
    if (!metrics?.length) return null;
    return (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((m) => (
                <div key={m.label} className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                    <div className="text-white/70 text-xs uppercase tracking-wide">{m.label}</div>
                    <div className="text-white text-lg font-semibold">{m.value}</div>
                    {m.hint && <div className="text-white/60 text-sm mt-1">{m.hint}</div>}
                </div>
            ))}
        </div>
    );
}

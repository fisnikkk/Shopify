export default function KPIs({
    items,
    note,
}: {
    items: { label: string; value: string; sub?: string }[];
    note?: string;
}) {
    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {items.map((k, i) => (
                    <div key={i} className="rounded-xl border border-zinc-200 bg-white p-4 md:p-5">
                        <div className="text-3xl md:text-4xl font-extrabold tracking-tight">{k.value}</div>
                        <div className="mt-1 text-sm text-zinc-600">{k.label}</div>
                        {k.sub ? <div className="mt-1 text-xs text-zinc-500">{k.sub}</div> : null}
                    </div>
                ))}
            </div>
            {note ? <p className="mt-3 text-xs text-zinc-500">{note}</p> : null}
        </div>
    );
}

/* simple 3-up responsive image row */
export default function ImageRow({ srcs, alt = "" }: { srcs: string[]; alt?: string }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {srcs.map((s, i) => (
                <figure key={i} className="rounded-xl overflow-hidden border border-zinc-200 bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s} alt={alt} className="w-full h-auto object-cover" loading="lazy" />
                </figure>
            ))}
        </div>
    );
}

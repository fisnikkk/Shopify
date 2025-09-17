"use client";

export default function HighlightsGrid({ images }: { images: string[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[260px] gap-6 px-0.5">
            {images.map((src, i) => {
                const wide = i % 6 === 0;
                const tall = i % 6 === 3;
                const span = wide ? "lg:col-span-2" : tall ? "lg:row-span-2" : "";
                return (
                    <figure key={i} className={`overflow-hidden rounded-[22px] bg-white ring-1 ring-black/5 shadow-sm ${span}`}>
                        <img src={src} alt="" className="w-full h-full object-cover" />
                    </figure>
                );
            })}
        </div>
    );
}

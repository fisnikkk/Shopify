"use client";

export default function CenteredCopyBlock({ title, paragraphs }: { title: string; paragraphs: string[] }) {
    return (
        <section className="bg-neutral-50">
            <div className="mx-auto max-w-[1000px] px-4 md:px-6 py-24 md:py-32 text-center">
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight">{title}</h2>
                <div className="mt-8 space-y-6 text-[18px] leading-8 text-black/75">
                    {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                </div>
            </div>
        </section>
    );
}

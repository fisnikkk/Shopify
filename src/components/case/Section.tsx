export function Section({
    title,
    kicker,
    children,
    className = "",
}: {
    title: string;
    kicker?: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section className={`mx-auto max-w-6xl px-4 md:px-6 py-12 md:py-16 ${className}`}>
            <header className="mb-6 md:mb-8">
                {kicker ? (
                    <div className="uppercase tracking-[0.18em] text-xs text-zinc-500">{kicker}</div>
                ) : null}
                <h2 className="text-2xl md:text-3xl font-bold text-zinc-900">{title}</h2>
            </header>

            {/* “Prose-like” defaults without @tailwindcss/typography */}
            <div
                className="
          max-w-none text-zinc-800 leading-relaxed
          [&_p]:my-4 [&_p]:text-zinc-700
          [&_ul]:my-4 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:space-y-2
          [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:space-y-2
          [&_li_strong]:text-zinc-900
          [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold
          [&_a]:text-zinc-900 hover:[&_a]:underline
          [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-zinc-100
        "
            >
                {children}
            </div>
        </section>
    );
}

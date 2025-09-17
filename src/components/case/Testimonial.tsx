export default function Testimonial({
    quote,
    author,
    role,
}: {
    quote: string;
    author: string;
    role?: string;
}) {
    return (
        <figure className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 md:p-8">
            <blockquote className="text-lg md:text-xl font-medium leading-relaxed text-zinc-900">“{quote}”</blockquote>
            <figcaption className="mt-3 text-sm text-zinc-600">
                {author}{role ? ` — ${role}` : ""}
            </figcaption>
        </figure>
    );
}

"use client";
import Link from "next/link";

export default function CaseNav({ prev, next }: { prev?: { href: string; title: string }; next?: { href: string; title: string } }) {
    if (!prev && !next) return null;
    return (
        <nav className="border-t border-black/10 bg-white">
            <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    {prev && (
                        <Link href={prev.href} className="group inline-flex items-center gap-3">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-black/10 bg-black/5 group-hover:bg-black/10">←</span>
                            <div>
                                <div className="text-xs uppercase tracking-[0.18em] text-black/50">Previous</div>
                                <div className="font-semibold group-hover:underline">{prev.title}</div>
                            </div>
                        </Link>
                    )}
                </div>
                <div className="md:justify-self-end">
                    {next && (
                        <Link href={next.href} className="group inline-flex items-center gap-3">
                            <div className="text-right">
                                <div className="text-xs uppercase tracking-[0.18em] text-black/50">Next</div>
                                <div className="font-semibold group-hover:underline">{next.title}</div>
                            </div>
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-1 ring-black/10 bg-black/5 group-hover:bg-black/10">→</span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

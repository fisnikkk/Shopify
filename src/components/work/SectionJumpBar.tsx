"use client";

import { useEffect, useMemo, useState } from "react";

type Section = { id: string; label: string };

export default function SectionJumpBar({ sections, offset = 120 }: { sections: Section[]; offset?: number }) {
    const [active, setActive] = useState<string>(sections[0]?.id);
    const ids = useMemo(() => sections.map((s) => s.id), [sections]);

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                const first = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
                if (first?.target?.id) setActive(first.target.id);
            },
            { rootMargin: `-${offset}px 0px -60% 0px`, threshold: [0, 1] }
        );
        ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
        return () => obs.disconnect();
    }, [ids, offset]);

    return (
        <nav className="sticky top-16 z-30 bg-white/70 backdrop-blur-sm border-b border-black/5">
            <div className="mx-auto max-w-[1200px] px-4 md:px-6">
                <ul className="flex items-center gap-5 py-3 text-sm text-black/70">
                    {sections.map((s, i) => {
                        const isActive = s.id === active;
                        return (
                            <li key={s.id} className="flex items-center">
                                {i > 0 && <span className="mx-2 text-black/20">•</span>}
                                <a
                                    href={`#${s.id}`}
                                    className={`relative pb-1 transition-colors ${isActive ? "text-black font-medium" : "hover:text-black"}
                    after:absolute after:left-0 after:bottom-0 after:h-0.5 ${isActive ? "after:w-full after:bg-black" : "after:w-0 after:bg-transparent"}`}
                                >
                                    {s.label}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}

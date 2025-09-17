"use client";
import { ReactNode } from "react";

const Up = (p: any) => (
    <svg viewBox="0 0 24 24" aria-hidden className={p.className}><path d="M12 4l6 6h-4v10h-4V10H6l6-6z" /></svg>
);
const Down = (p: any) => (
    <svg viewBox="0 0 24 24" aria-hidden className={p.className}><path d="M12 20l-6-6h4V4h4v10h4l-6 6z" /></svg>
);

export type KPI = { label: string; sub?: string; dir?: "up" | "down" | "flat"; icon?: ReactNode };

export default function ResultsGrid({ items }: { items: KPI[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {items.map((k, i) => (
                <div key={i} className="rounded-2xl bg-white ring-1 ring-black/10 p-5 flex items-start gap-4 shadow-sm">
                    <div className="shrink-0 rounded-md ring-1 ring-black/10 bg-black/5 p-1">
                        {k.icon ?? (k.dir === "up" ? <Up className="h-6 w-6" /> : k.dir === "down" ? <Down className="h-6 w-6" /> : <div className="h-6 w-6 rounded bg-black/10" />)}
                    </div>
                    <div>
                        <div className="font-semibold leading-5">{k.label}</div>
                        {k.sub && <div className="text-[13px] text-black/60">{k.sub}</div>}
                    </div>
                </div>
            ))}
        </div>
    );
}

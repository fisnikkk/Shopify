"use client";

import Link from "next/link";

export default function GetInTouchBand() {
    return (
        <section className="relative isolate overflow-hidden bg-black text-white">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_400px_at_50%_-50%,rgba(255,255,255,0.06),transparent)]" />
            <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-16 md:py-24">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Got a Shopify or automation brief?</h2>
                <p className="mt-3 text-white/70 max-w-2xl">I build fast, clear storefront UX and pragmatic n8n workflows. Let’s map the simplest path to a win.</p>
                <div className="mt-6">
                    <Link href="/contact" className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-black font-medium hover:bg-white/90">
                        Get in touch →
                    </Link>
                </div>
            </div>
        </section>
    );
}

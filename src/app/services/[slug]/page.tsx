// app/services/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { services } from "@/data/services";

type AnyService = {
  slug: string;
  title: string;
  lead?: string;
  bullets?: string[];
  features?: string[];
  items?: string[];
  points?: string[];
};

function pickBullets(s: AnyService) {
  return (s.bullets ?? s.features ?? s.items ?? s.points ?? []).filter(Boolean);
}

export async function generateStaticParams() {
  return services.map((s: AnyService) => ({ slug: s.slug }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const svc = services.find((s: AnyService) => s.slug === params.slug) as AnyService | undefined;
  if (!svc) return notFound();

  const list = pickBullets(svc);

  return (
    <main className="px-6 md:px-10 max-w-5xl mx-auto pb-24">
      <div className="mt-10">
        <Link href="/services" className="text-sm text-white/60 hover:underline">← All services</Link>
      </div>

      <header className="mt-4">
        <h1 className="text-4xl md:text-5xl font-bold">{svc.title}</h1>
        {svc.lead && <p className="text-white/70 mt-3 max-w-3xl">{svc.lead}</p>}
      </header>

      {/* Only render the box if we have bullets */}
      {list.length > 0 && (
        <section className="mt-8">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <h2 className="text-2xl font-semibold mb-3">What’s included</h2>
            <ul className="grid sm:grid-cols-2 gap-3 text-white/85">
              {list.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-1 grid h-4 w-4 place-items-center rounded-full border border-white/25 text-[10px] text-white/70">✓</span>
                  <span className="leading-snug">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <Link href="/contact" className="inline-block rounded-xl border border-white/10 px-4 py-2 bg-white text-black hover:bg-white/90 transition">
                Get in touch
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

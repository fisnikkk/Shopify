import HeroIntro from "@/components/HeroIntro";
import PinnedGallery from "@/components/PinnedGallery";
import HomeServicesPreview from "@/components/HomeServicesPreview";
import { Stat, CaseCard } from "@/components/Card";
import { logos, cases } from "@/lib/data";

export default function Page() {
  return (
    <>
      {/* Full-bleed hero */}
      <HeroIntro />

      {/* Full-bleed gallery with the center video & animated tiles */}
      <PinnedGallery />

      {/* Rest of the homepage in a centered container */}
      <main className="max-w-6xl mx-auto px-4">
        {/* Services preview */}
        <HomeServicesPreview />

        {/* Logos */}
        <section className="border-y border-white/5 bg-white/5 -mx-4">
          <div className="max-w-6xl mx-auto px-4 py-10">
            <p className="text-center text-white/60 text-xs tracking-widest uppercase mb-6">
              Selected brands & projects
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 opacity-80">
              {logos.map((n, i) => (
                <div
                  key={i}
                  className="h-10 rounded-xl bg-white/10 grid place-items-center text-white/70 text-xs"
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16">
          <div className="grid sm:grid-cols-3 gap-6">
            <Stat k="Shopify" v="Themes, Apps, Headless" />
            <Stat k="Automation" v="n8n, AI, Integrations" />
            <Stat k="Focus" v="Speed, UX, Measurable growth" />
          </div>
        </section>

        {/* Case studies grid */}
        <section className="py-16">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
            <div>
              <p className="text-xs tracking-widest text-white/50 uppercase">Case Studies</p>
              <h2 className="text-3xl md:text-4xl font-semibold">A few recent builds & automations</h2>
            </div>
            <a href="/contact" className="text-sm text-white/70 hover:text-white">
              Work with me →
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {cases.map((c) => (
              <a key={c.slug} href={`/work/${c.slug}`}>
                <CaseCard title={c.title} subtitle={c.subtitle} bullets={c.bullets} />
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16">
          <div className="rounded-2xl bg-gradient-to-br from-indigo-600/20 to-cyan-400/10 ring-1 ring-white/10 p-8">
            <h3 className="text-2xl font-semibold">Support & Growth</h3>
            <p className="text-white/70 mt-2 max-w-2xl">
              Monthly retainers for fixes & iterations, A/B tests, and ongoing n8n maintenance.
            </p>
            <div className="mt-6 flex gap-3 flex-wrap">
              <a className="rounded-xl px-4 py-2 bg-white text-[#0B0F1A]" href="/services">
                See memberships
              </a>
              <a className="rounded-xl px-4 py-2 ring-1 ring-white/20 hover:ring-white/40" href="/contact">
                Get in touch
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

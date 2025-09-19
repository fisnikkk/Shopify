import Image from "next/image";
import Link from "next/link";

export default function HeroIntro() {
  return (
    <section className="relative overflow-hidden">
      {/* soft ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-24 -left-24 h-[60rem] w-[60rem] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(45rem 45rem at 30% 20%, rgba(108,112,255,.35), transparent 60%)",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 h-[60rem] w-[60rem] rounded-full opacity-25 blur-3xl"
          style={{
            background:
              "radial-gradient(40rem 40rem at 70% 70%, rgba(0,170,255,.28), transparent 60%)",
          }}
        />
      </div>

      {/* full-bleed container with generous side paddings */}
      <div className="w-full px-6 md:px-10 lg:px-16 xl:px-24 py-16 lg:py-24">
        <div className="grid grid-cols-12 items-center gap-y-10 gap-x-10">
          {/* Left column: text */}
          <div className="col-span-12 lg:col-span-7">
            <p className="text-xs tracking-[0.22em] text-white/50 font-semibold">
              LEADING SHOPIFY & AUTOMATION PARTNER
            </p>

            <h1 className="mt-5 font-extrabold tracking-tight leading-[0.9] text-[clamp(40px,6.5vw,92px)]">
              Trusted{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-sky-200 to-cyan-300">
                Ecommerce
              </span>
              <br />
              & Shopify + n8n Studio.
            </h1>

            <p className="mt-6 text-base md:text-lg text-white/70 max-w-[60ch]">
              I design, build & grow high-performing Shopify stores and automate operations with n8n.
              From custom themes to AI-powered workflows, I ship fast and measure impact.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full bg-white text-slate-900 px-5 py-3 text-sm font-semibold hover:opacity-90 transition"
              >
                Get in touch →
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white/80 hover:text-white hover:border-white/30 transition"
              >
                Explore services
              </Link>
            </div>
          </div>

          {/* Right column: media card */}
          <div className="col-span-12 lg:col-span-5">
            <div className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/hero.jpg"    // supply a ~1600px-wide asset
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 40vw, 100vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

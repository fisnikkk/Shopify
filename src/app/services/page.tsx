import ServiceCard from "@/components/services/ServiceCard";
import { services } from "@/data/services";

export default function ServicesPage() {
  return (
    <main className="px-6 md:px-10 max-w-6xl mx-auto pb-24">
      <header className="mt-14">
        <h1 className="text-4xl md:text-5xl font-bold">Services</h1>
        <p className="text-white/70 mt-3">Shopify &amp; automation capabilities focused on clear outcomes.</p>
      </header>

      <section className="grid md:grid-cols-2 gap-6 mt-10">
        {services.map((s: Service, i: number) => (
          <ServiceCard key={s.slug} s={s} i={i} />
        ))}
      </section>
    </main>
  );
}

import { caseStudies } from "@/data/work";
import WorkMasonry from "@/components/WorkMasonry";

export const metadata = { title: "Our Work" };

export default function WorkPage() {
  return (
    <main className="pb-24">
      <header className="mx-auto max-w-[1280px] px-4 pt-14">
        <h1 className="text-4xl font-bold md:text-5xl">Our Work</h1>
        <p className="mt-3 text-white/70">A selection of outcomes-driven projects.</p>
      </header>
      <WorkMasonry items={caseStudies} />
    </main>
  );
}

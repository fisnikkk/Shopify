import type { CaseStudy } from "@/data/work";
import { CharleCard } from "@/components/work/CharleCard";

export default function WorkList({ items }: { items: CaseStudy[] }) {
  return (
    <div className="mx-auto mt-10 flex max-w-[1180px] flex-col gap-10 md:gap-12">
      {items.map((cs, i) => (
        <CharleCard key={cs.slug} cs={cs} index={i} />
      ))}
    </div>
  );
}

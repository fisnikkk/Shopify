import type { CaseStudy } from "@/data/work";
import MasonryCard from "./work/MasonryCard";

export default function WorkMasonry({ items }: { items: CaseStudy[] }) {
  return (
    <div className="mx-auto mt-10 max-w-[1280px] px-4">
      {/* CSS columns = real cascading; column gap via arbitrary prop */}
      <div className="columns-1 sm:columns-2 lg:columns-3 [column-gap:1.5rem]">
        {items.map((cs) => (
          <MasonryCard key={cs.slug} cs={cs} />
        ))}
      </div>
    </div>
  );
}

import type { Workish } from "@/lib/workish";
import MasonryCard from "./work/MasonryCard";

export default function WorkMasonry({ items }: { items: Workish[] }) {
  return (
    <div className="mx-auto mt-10 max-w-[1280px] px-4">
      <div className="columns-1 sm:columns-2 lg:columns-3 [column-gap:1.5rem]">
        {items.map((cs) => (
          <MasonryCard key={cs.slug} cs={cs} />
        ))}
      </div>
    </div>
  );
}

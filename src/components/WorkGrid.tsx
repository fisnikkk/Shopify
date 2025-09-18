// src/components/WorkGrid.tsx
import type { Workish } from "@/lib/workish";
import WorkCard from "@/components/WorkCard";

export default function WorkGrid({ items }: { items: Workish[] }) {
  return (
    <div className="grid gap-6 md:gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <WorkCard key={item.slug} item={item} />
      ))}
    </div>
  );
}

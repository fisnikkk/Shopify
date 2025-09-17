export function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6">
      <div className="text-sm text-white/50">{k}</div>
      <div className="text-xl font-semibold mt-1">{v}</div>
    </div>
  );
}

export function CaseCard({
  title,
  subtitle,
  bullets,
}: {
  title: string;
  subtitle: string;
  bullets: string[];
}) {
  return (
    <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 flex flex-col gap-3">
      <div>
        <div className="text-sm text-white/60">{subtitle}</div>
        <div className="text-lg font-semibold">{title}</div>
      </div>
      <ul className="text-white/80 text-sm space-y-1">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2 items-start">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-white/50" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

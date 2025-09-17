"use client";
import Link from "next/link";
import { useRef } from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function Magnet({ href, children, className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      href={href}
      ref={ref as any}
      onPointerMove={(e) => {
        const el = ref.current!;
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      }}
      onPointerLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = "translate(0,0)";
      }}
      className={
        "rounded-2xl px-4 py-2 bg-white text-[#0B0F1A] hover:shadow-lg transition will-change-transform " +
        className
      }
    >
      {children}
    </Link>
  );
}

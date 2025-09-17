"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Magnet from "@/components/Magnet"; // ← add

const links = [
  { href: "/work", label: "Our Work" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 bg-[#0B0F1A]/70 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="rounded-full bg-white/5 ring-1 ring-white/10 px-4 py-2 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-400 to-cyan-300 grid place-items-center font-bold text-[#0B0F1A]">
              FK
            </div>
            <span className="hidden sm:block text-sm text-white/70">Shopify &amp; n8n Studio</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/70">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`hover:text-white ${pathname.startsWith(l.href) ? "text-white" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Magnetic CTA */}
          <Magnet href="/contact" className="ml-4">
            Get in touch →
          </Magnet>
        </div>
      </div>
    </header>
  );
}

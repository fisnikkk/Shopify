import Nav from "@/components/Nav";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Nav />
      {children}
      <footer className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
          <div className="text-white/60 text-sm">
            © {new Date().getFullYear()} FK Studio — Shopify &amp; n8n
          </div>
          <div className="flex gap-5 text-white/60 text-sm">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Imprint</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// src/app/layout.tsx
import "./globals.css";
import SiteShell from "@/components/SiteShell";
import Providers from "./providers";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata = {
  title: "FK Studio — Shopify & n8n",
  description: "Shopify development and n8n automations for fast, measurable growth.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth antialiased ${inter.variable}`}>
      <body className="min-h-screen font-sans">
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}

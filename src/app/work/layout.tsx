"use client";
import { LayoutGroup } from "framer-motion";

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  // Persisted for both /work and /work/[slug]
  return <LayoutGroup id="work-shared">{children}</LayoutGroup>;
}

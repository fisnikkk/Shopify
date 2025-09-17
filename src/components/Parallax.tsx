// components/Parallax.tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
export default function Parallax({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -24]);
  return <motion.div style={{ y }}>{children}</motion.div>;
}

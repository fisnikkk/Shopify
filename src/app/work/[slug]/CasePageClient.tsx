"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import HeroReveal from "@/components/work/HeroReveal";
import type { CaseStudy } from "@/data/work";

type Props = {
  cs: CaseStudy;
  slug: string;
  children?: ReactNode;
};

export default function CasePageClient({ cs, slug, children }: Props) {
  const [ready, setReady] = useState(false);

  return (
    <div className="bg-white">
      {/* Hero handles its own black intro; page background stays white */}
      <HeroReveal
        imageSrc={cs.cover}
        title={cs.title}
        subtitle={cs.subtitle}
        idKey={slug}           // ⬅️ no eyebrow prop = no “FK STUDIO”
        onReady={() => setReady(true)}
      />

      {/* Body */}
      <motion.div
        className="bg-white"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 8 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.05 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

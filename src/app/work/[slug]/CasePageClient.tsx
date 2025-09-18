"use client";

import { useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import HeroReveal from "@/components/work/HeroReveal";
import type { Workish } from "@/lib/workish";
import { pickCoverImage } from "@/lib/workish";

type Props = {
  cs: Workish;      // flexible shape from lib/workish
  slug: string;
  children?: ReactNode;
};

export default function CasePageClient({ cs, slug, children }: Props) {
  const [ready, setReady] = useState(false);

  // Normalize to a guaranteed string URL for the hero image
  const imageSrc =
    pickCoverImage(cs.cover, { image: cs.image, thumb: cs.thumb }) || "";

  return (
    <div className="bg-white">
      <HeroReveal
        imageSrc={imageSrc}
        title={cs.title}
        subtitle={cs.subtitle}
        idKey={slug}
        onReady={() => setReady(true)}
      />

      <motion.div
        className="bg-white"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 8 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

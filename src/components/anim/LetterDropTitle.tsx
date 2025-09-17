"use client";

import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";

type Props = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  play?: boolean;
  onComplete?: () => void;
  imageUrl?: string;
};

// --- Variants ---
const letterVariant = {
  hidden: { y: -28, opacity: 0, filter: "blur(6px)" },
  show: { y: 0, opacity: 1, filter: "blur(0px)" },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: "easeOut" },
  },
};

export default function LetterDropTitle({
  title,
  subtitle,
  eyebrow,
  play = true,
  onComplete,
  imageUrl,
}: Props) {
  const words = useMemo(() => title.trim().split(/\s+/), [title]);
  const [showImage, setShowImage] = useState(false);

  const staggerDelay = 0.05;
  const baseDelay = 0.15;

  const totalLetters = useMemo(() => words.join("").length, [words]);

  // This useEffect provides reliable timing for the image fade-in
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (play) {
      // Calculate when the last letter's animation will BEGIN
      const lastLetterStartTime = baseDelay + totalLetters * staggerDelay;

      // Set the image fade-in to start slightly AFTER the last letter begins animating
      // This buffer allows the spring animation to settle.
      const imageFadeInDelay = (lastLetterStartTime + 0.3) * 1000; // Convert to ms

      timer = setTimeout(() => {
        setShowImage(true);
        onComplete?.();
      }, imageFadeInDelay);
    }
    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, [play, totalLetters, onComplete]);


  let letterCount = 0;

  return (
    <div className="text-center relative overflow-hidden">
      {/* --- Image (Rendered in the background) --- */}
      {imageUrl && (
        <motion.img
          src={imageUrl}
          alt="Background"
          variants={imageVariants}
          initial="hidden"
          animate={showImage ? "visible" : "hidden"}
          className="absolute inset-0 w-full h-full object-cover -z-0"
        />
      )}

      {/* --- Text Content (Rendered in the foreground) --- */}
      <div className="relative z-10">
        {eyebrow && (
          <div
            className={
              "mb-2 text-white/75 text-xs tracking-[0.18em] uppercase transition-opacity " +
              (play ? "opacity-100" : "opacity-0")
            }
          >
            {eyebrow}
          </div>
        )}

        <motion.h1
          key={title}
          className="uppercase text-white font-bold tracking-tight text-[clamp(40px,7.2vw,88px)] leading-[0.95] max-w-[22ch] mx-auto"
          initial="hidden"
          animate={play ? "show" : "hidden"}
          // onAnimationComplete has been removed for reliability
          aria-label={title}
          role="heading"
        >
          {words.map((word, wordIndex) => (
            <span
              key={wordIndex}
              className="inline-flex whitespace-nowrap mr-[0.25ch] last:mr-0 align-baseline"
            >
              {Array.from(word).map((char, charIndex) => {
                const letterJsx = (
                  <motion.span
                    key={charIndex}
                    variants={letterVariant}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 25,
                      delay: baseDelay + letterCount * staggerDelay,
                    }}
                  >
                    {char}
                  </motion.span>
                );
                letterCount++;
                return letterJsx;
              })}
            </span>
          ))}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="mt-4 text-white/85 text-base md:text-lg"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: play ? 0 : 12, opacity: play ? 1 : 0 }}
            transition={{
              delay: baseDelay + letterCount * staggerDelay + 0.2,
              duration: 0.5,
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
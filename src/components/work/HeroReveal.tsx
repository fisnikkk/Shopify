"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
// Assuming LetterDropTitle is our perfected component from the previous step
import LetterDropTitle from "@/components/anim/LetterDropTitle";

function useImageReady(src: string) {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (!src) return;
        let cancelled = false;
        const img = new Image();
        img.onload = () => !cancelled && setReady(true);
        img.onerror = () => !cancelled && setReady(true); // Treat error as ready to unblock
        img.src = src;
        return () => { cancelled = true; };
    }, [src]);
    return ready;
}

type Props = {
    imageSrc: string;
    title: string;
    titleShort?: string;
    subtitle?: string;
    eyebrow?: string;
    heightClass?: string;
    idKey?: string;
    onReady?: () => void;
};

export default function HeroReveal({
    imageSrc,
    title,
    titleShort,
    subtitle,
    eyebrow,
    heightClass = "min-h-[76svh] md:min-h-[84svh]",
    idKey = "__default",
    onReady,
}: Props) {
    const prefersReduced = useReducedMotion();
    type Step = 0 | 1 | 2;
    const [step, setStep] = useState<Step>(prefersReduced ? 2 : 0);

    const imageReady = useImageReady(imageSrc);
    const titleDone = useRef(false);

    useEffect(() => {
        if (prefersReduced) { setStep(2); return; }
        const raf = requestAnimationFrame(() => setStep(1));
        const to = setTimeout(() => setStep((s) => (s === 0 ? 1 : s)), 60);
        return () => { cancelAnimationFrame(raf); clearTimeout(to); };
    }, [prefersReduced]);

    useEffect(() => {
        if (prefersReduced) return;
        if (step === 1 && titleDone.current && imageReady) setStep(2);
    }, [step, imageReady, prefersReduced]);

    useEffect(() => { if (step === 2) onReady?.(); }, [step, onReady]);

    const hiddenState = { opacity: 0, scale: 1.04 };
    const visibleState = { opacity: 1, scale: 1 };

    return (
        <section className={`relative isolate overflow-hidden ${heightClass}`}>
            <div className="absolute inset-0 bg-black" />

            {/* --- 💡 KEY FIX STARTS HERE --- */}
            {/* 1. Render this as soon as step >= 1 */}
            {step >= 1 && (
                <motion.div
                    key={`${idKey}-bg`}
                    className="absolute inset-0"
                    initial={hiddenState}
                    // 2. Control the animation directly with the 'step' state
                    animate={step === 2 ? visibleState : hiddenState}
                    transition={{ duration: 0.8, ease: "easeOut" }} // Slightly longer duration
                >
                    <img src={imageSrc} alt="" className="h-full w-full object-cover will-change-transform" />
                </motion.div>
            )}
            {/* --- 💡 KEY FIX ENDS HERE --- */}

            <div className="absolute inset-0 z-10 grid place-items-center px-6 text-center">
                <div className="hero-typography drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)] [text-wrap:balance]">
                    <LetterDropTitle
                        title={titleShort ?? title}
                        subtitle={subtitle}
                        eyebrow={eyebrow}
                        play={!prefersReduced && step >= 1}
                        onComplete={() => {
                            titleDone.current = true;
                            // This check is now slightly redundant but harmless.
                            // The useEffect that watches 'step' will handle the transition.
                            if (!prefersReduced && imageReady) {
                                setStep(2);
                            }
                        }}
                    />
                </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black/40" />
        </section>
    );
}
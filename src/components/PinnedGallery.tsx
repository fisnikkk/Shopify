"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  LayoutGroup,
} from "framer-motion";
import type { MotionStyle } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

/** ===== Tunables ===== */
const SECTION_HEIGHT = "300vh";        // scroll runway
const HERO_END_SIZE_VW = 22;           // final hero size (square)
const HERO_TO_GRID_AT = 0.60;          // when the hero finishes shrinking
const DOCK_ON = 0.64;                  // overlay -> grid tile
const UNDOCK_BELOW = 0.56;             // grid tile -> overlay (hysteresis)
const STAGGER = 0.04;                  // grid tile reveal spacing

// “ring → grid” timing
const RING_IN_START = 0.10;            // when ring starts showing behind the hero
const GRID_FADE_IN = 0.28;            // when the grid starts to fade in

// 12 square-friendly images (public/)
const GRID_IMAGES = [
  "/case-1.jpg", "/case-5.jpg", "/case-8.jpg", "/case-9.jpg",
  "/case-11.jpg", "/case-12.jpg", "/case-3.jpg", "/case-4.jpg",
  "/case-6.jpg", "/case-7.jpg", "/case-10.jpg", "/case-2.jpg",
];

/** ===== helpers (no hooks in loops) ===== */
const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const map = (v: number, a: number, b: number) => clamp((v - a) / (b - a));

/** ============================================================= */
export default function PinnedGallery() {
  const ref = useRef<HTMLDivElement | null>(null);

  // 0 at section start; 1 when section bottom touches top of viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // numeric progress for per-tile/ring math
  const [p, setP] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setP(v));

  // docking with hysteresis
  const [docked, setDocked] = useState(false);
  useEffect(() => {
    if (!docked && p > DOCK_ON) setDocked(true);
    else if (docked && p < UNDOCK_BELOW) setDocked(false);
  }, [p, docked]);

  /** ---------- HERO transforms ---------- */
  const heroW = useTransform(
    scrollYProgress,
    [0, HERO_TO_GRID_AT, 1],
    ["100vw", `${HERO_END_SIZE_VW}vw`, `${HERO_END_SIZE_VW}vw`]
  );
  const heroH = useTransform(
    scrollYProgress,
    [0, HERO_TO_GRID_AT, 1],
    // Start as a wide rectangle, end as a square
    ["58vh", `${HERO_END_SIZE_VW}vw`, `${HERO_END_SIZE_VW}vw`]
  );

  // IMPORTANT: end radius now matches tiles exactly (rounded-2xl ≈ 16px)
  const heroRadius = useTransform(scrollYProgress, [0, HERO_TO_GRID_AT, 1], [18, 16, 16]);
  const heroOpacity = useTransform(scrollYProgress, [0.92, 1], [1, 0.94]);

  /** ---------- Grid & Ring opacities ---------- */
  // Ring: visible early, fades out as the grid comes in
  const ringOpacity = 1 - map(p, GRID_FADE_IN - 0.04, GRID_FADE_IN + 0.02);
  // Grid: fades in after a beat
  const gridOpacity = map(p, GRID_FADE_IN - 0.04, GRID_FADE_IN + 0.06);

  /** ---------- Tile styles (no hooks in loops) ---------- */
  const tileStyle = (i: number): React.CSSProperties => {
    const start = 0.18 + i * STAGGER;
    const end = start + 0.22;
    const t = map(p, start, end);
    return {
      opacity: t,
      transform: `translateY(${24 * (1 - t)}px) scale(${0.86 + 0.14 * t})`,
      willChange: "transform, opacity",
    };
  };

  /** ---------- Tiles ONLY (no placeholders here) ---------- */
  const gridTiles = useMemo(() => {
    return GRID_IMAGES.map((src, i) => (
      <div
        key={src + i}
        style={tileStyle(i)}
        className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
      >
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          loading={i < 5 ? "eager" : "lazy"}
          sizes="(min-width:1024px) 18vw, (min-width:768px) 28vw, 44vw"
        />
      </div>
    ));
    // only depends on p so we DON'T rebuild tiles at dock
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p]);

  /** ---------- Ring layer nodes (absolute, circular layout) ---------- */
  const ringChildren = useMemo(() => {
    // ring radius grows a touch with scroll so it feels “taking shape”
    const rT = clamp(map(p, RING_IN_START, GRID_FADE_IN), 0, 1);
    const rad = Math.min(480, typeof window !== "undefined" ? window.innerWidth * 0.28 : 480) * (0.86 + 0.14 * rT);
    const base = -Math.PI / 2; // start at top

    return GRID_IMAGES.map((src, i) => {
      const angle = base + (i / GRID_IMAGES.length) * Math.PI * 2;
      const x = Math.cos(angle) * rad;
      const y = Math.sin(angle) * rad;

      // fade/scale each tile in with slight stagger
      const t = clamp(map(p, RING_IN_START + i * 0.012, RING_IN_START + 0.14 + i * 0.012), 0, 1);
      const scale = 0.86 + 0.14 * t;

      return (
        <div
          key={`ring-${i}`}
          className="absolute left-1/2 top-1/2 rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.35)]"
          style={{
            width: "clamp(96px, 12vw, 180px)",
            height: "clamp(96px, 12vw, 180px)",
            transform: `translate(-50%,-50%) translate(${x}px, ${y}px) scale(${scale})`,
            opacity: t,
            willChange: "transform, opacity",
          }}
        >
          <Image src={src} alt="" fill className="object-cover" />
        </div>
      );
    });
  }, [p]);

  /** ---------- Hero style (typed, no `as any`) ---------- */
  const heroStyle: MotionStyle = {
    width: heroW,
    height: heroH,
    opacity: heroOpacity,
    borderRadius: heroRadius,
  };

  return (
    <section ref={ref} className="relative w-full">
      <div className="relative" style={{ height: SECTION_HEIGHT }}>
        {/* ambient glow */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 -translate-x-1/2 top-[-12rem] h-[70rem] w-[110rem] rounded-full opacity-25 blur-3xl"
            style={{
              background:
                "radial-gradient(52rem 34rem at 50% 22%, rgba(109,112,255,.33), transparent 60%)",
            }}
          />
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-[-14rem] h-[70rem] w-[110rem] rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(48rem 32rem at 50% 78%, rgba(0,170,255,.28), transparent 60%)",
            }}
          />
        </div>

        {/* sticky stage */}
        <div className="sticky top-[84px]">
          <div className="relative mx-auto w-full max-w-[1500px] px-4 md:px-8">
            <LayoutGroup id="mosaic-center-dock">
              {/* RING LAYER — behind the hero; fades out as the grid fades in */}
              <div className="pointer-events-none absolute inset-0 z-0" style={{ opacity: ringOpacity }}>
                {ringChildren}
              </div>

              {/* GRID — 5 cols on lg+, with centered placeholders rendered OUTSIDE the memoized tiles */}
              <motion.div className="relative z-0" style={{ opacity: gridOpacity }}>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-7 pt-14 md:pt-16 pb-10">
                  {/* center placeholders */}
                  <CenterPlaceholderOrHero showHero={docked} className="block sm:hidden col-start-1 row-start-2" />
                  <CenterPlaceholderOrHero showHero={docked} className="hidden sm:block lg:hidden sm:col-start-2 sm:row-start-2" />
                  <CenterPlaceholderOrHero showHero={docked} className="hidden lg:block lg:col-start-3 lg:row-start-2" />

                  {/* tiles (don’t rebuild at dock) */}
                  {gridTiles}
                </div>
              </motion.div>

              {/* OVERLAY HERO — same look as tiles; shrinks and docks (layoutId) */}
              <AnimatePresence>
                {!docked && (
                  <motion.div
                    key="overlay-hero"
                    layoutId="hero-square"
                    style={heroStyle}
                    className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-white/5 border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] will-change-transform"
                    transition={{ type: "spring", stiffness: 240, damping: 32 }}
                  >
                    <AutoPlayVideo src="/new-video.mp4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </LayoutGroup>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Centered grid cell that becomes the hero tile when `showHero` is true. */
function CenterPlaceholderOrHero({
  showHero,
  className,
}: {
  showHero: boolean;
  className: string;
}) {
  // Keep geometry ALWAYS the same as the overlay (rounded-2xl, border, shadow).
  if (!showHero) {
    return (
      <div
        className={`invisible aspect-square rounded-2xl border border-transparent ${className}`}
        aria-hidden
      />
    );
  }

  return (
    <motion.div
      layoutId="hero-square"
      className={`relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.35)] ${className}`}
      transition={{ type: "spring", stiffness: 240, damping: 32 }}
    >
      <AutoPlayVideo src="/new-video.mp4" />
    </motion.div>
  );
}

/** Autoplaying video that works across browsers */
function AutoPlayVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const tryPlay = () => v.play().catch(() => { });

    if (v.readyState >= 2) tryPlay();
    const onLoaded = () => tryPlay();
    v.addEventListener("loadeddata", onLoaded);

    // extra nudge after first interaction (covers strict autoplay gates)
    const once = () => { tryPlay(); cleanup(); };
    const cleanup = () => {
      window.removeEventListener("pointerdown", once);
      window.removeEventListener("touchstart", once);
      window.removeEventListener("keydown", once);
      window.removeEventListener("wheel", once);
    };
    window.addEventListener("pointerdown", once, { once: true });
    window.addEventListener("touchstart", once, { once: true });
    window.addEventListener("keydown", once, { once: true });
    window.addEventListener("wheel", once, { once: true });

    return () => {
      v.removeEventListener("loadeddata", onLoaded);
      cleanup();
    };
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      muted
      playsInline
      autoPlay
      loop
      preload="metadata"
      src={src}
    />
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* Hero centerpiece: a single CTV screen that plays a rotating reel of the ads
 * Urbani decides to serve — an SUV drive, a fragrance, a fashion spot — cross-
 * fading one into the next. The label + playhead are decorative (aria-hidden);
 * clips are illustrative placeholders (Mixkit free license, trademark-free). */

const ADS = [
  { src: "/videos/ad-fashion.mp4", poster: "/videos/ad-fashion-poster.jpg", label: "Ad · Fashion" },
  { src: "/videos/ad-auto.mp4", poster: "/videos/ad-auto-poster.jpg", label: "Ad · Auto" },
  { src: "/videos/ad-fragrance.mp4", poster: "/videos/ad-fragrance-poster.jpg", label: "Ad · Fragrance" },
] as const;

const DISPLAY_MS = 5200;

export default function HeroShowcase() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Advance the reel on a timer (paused entirely under reduced motion).
  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % ADS.length),
      DISPLAY_MS
    );
    return () => clearInterval(id);
  }, [reduceMotion]);

  // Play the active clip from the top; pause + rewind the others.
  useEffect(() => {
    if (reduceMotion) return;
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.currentTime = 0;
        void v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active, reduceMotion]);

  return (
    <div className="relative mx-auto w-full max-w-[680px] px-2 [perspective:1600px] lg:max-w-[760px]">
      {/* Soft glow bloom behind the screen */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.3 }}
      >
        <div className="absolute left-1/2 top-1/2 h-[70%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.28),transparent_70%)]" />
        <div className="absolute left-[60%] top-[60%] h-[45%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.22),transparent_70%)]" />
      </motion.div>

      {/* The screen — settles in with a subtle 3D tilt */}
      <motion.div
        className="relative overflow-hidden rounded-[1.1rem] bg-night-900 shadow-[0_50px_120px_rgba(0,0,0,0.65)] ring-1 ring-white/12"
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 46, scale: 0.92, rotateX: 14 }
        }
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        transition={{ duration: 1.1, delay: 0.15, ease: [0.21, 0.6, 0.35, 1] }}
        style={{ transformOrigin: "50% 100%" }}
      >
        <div className="relative aspect-video w-full bg-night-950">
          {reduceMotion ? (
            <Image
              src={ADS[0].poster}
              alt="A CTV screen serving a brand ad selected by Urbani in real time"
              fill
              priority
              sizes="760px"
              className="object-cover"
            />
          ) : (
            ADS.map((ad, i) => (
              <motion.video
                key={ad.src}
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                className="absolute inset-0 h-full w-full object-cover"
                poster={ad.poster}
                muted
                loop
                playsInline
                preload={i === 0 ? "auto" : "metadata"}
                aria-hidden="true"
                initial={false}
                animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.06 }}
                transition={{ duration: 0.9, ease: [0.21, 0.6, 0.35, 1] }}
              >
                <source src={ad.src} type="video/mp4" />
              </motion.video>
            ))
          )}

          {/* screen wash for legible chrome */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-night-950/45 via-transparent to-night-950/55"
            aria-hidden="true"
          />

          {/* top chrome: wordmark + live */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3">
            <span className="font-display text-sm font-semibold tracking-tight text-white/90 drop-shadow">
              Urbani<span className="align-super text-[0.55em]">™</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[0.6rem] font-medium text-emerald-300 backdrop-blur-sm">
              <span className="live-dot !h-1.5 !w-1.5" aria-hidden="true" />
              LIVE
            </span>
          </div>

          {/* bottom chrome: ad label + playhead */}
          <div className="absolute inset-x-0 bottom-0 px-4 pb-3.5">
            <div className="mb-2 flex items-center justify-between text-[0.62rem] text-white/80">
              <motion.span
                key={ADS[active].label}
                className="rounded bg-white/15 px-2 py-0.5 font-mono uppercase tracking-[0.14em] backdrop-blur-sm"
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {ADS[active].label}
              </motion.span>
              <span className="font-mono tabular-nums">Urbani™ decisioned</span>
            </div>
            <div className="h-[3px] overflow-hidden rounded-full bg-white/20">
              <motion.div
                key={active}
                className="h-full rounded-full bg-glow-cyan"
                initial={reduceMotion ? { width: "60%" } : { width: "0%" }}
                animate={{ width: reduceMotion ? "60%" : "100%" }}
                transition={{ duration: reduceMotion ? 0 : DISPLAY_MS / 1000, ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

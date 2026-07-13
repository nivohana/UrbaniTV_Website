"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import BidstreamCanvas from "./BidstreamCanvas";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  const entrance = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: [0.21, 0.6, 0.35, 1] as const },
        };

  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh items-end overflow-hidden"
    >
      <Image
        src="/images/hero-film.jpg"
        alt="A curled strip of 35mm film against a dark background"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <BidstreamCanvas className="absolute inset-0 h-full w-full opacity-30" />
      <div
        className="absolute inset-0 bg-gradient-to-b from-night-950/60 via-night-950/30 to-night-950"
        aria-hidden="true"
      />

      {/* Giant decorative wordmark sweeping across the image, se7en-style */}
      <motion.div
        aria-hidden="true"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.2, ease: [0.21, 0.6, 0.35, 1] }}
        className="pointer-events-none absolute inset-x-0 top-[24%] flex justify-center px-[6vw] sm:top-[20%]"
      >
        <p className="text-gradient inline-block pr-[0.15em] font-display text-[14vw] font-bold leading-none tracking-tight opacity-80 sm:text-[12vw]">
          Urbani<span className="align-super text-[0.22em]">™</span>
        </p>
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 pb-20 text-center md:px-8 md:pb-24">
        <motion.h1
          {...entrance(0.35)}
          className="font-display text-3xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Every impression, optimized by AI. Seen by real people.
        </motion.h1>

        <motion.div {...entrance(0.5)} className="mt-10">
          <a
            href="#technology"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-night-950 transition-transform duration-300 hover:scale-[1.04]"
          >
            Meet Urbani™
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

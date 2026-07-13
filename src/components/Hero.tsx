"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import BidstreamCanvas from "./BidstreamCanvas";
import HeroShowcase from "./HeroShowcase";

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
      className="relative isolate flex min-h-svh flex-col justify-start overflow-hidden pt-28 pb-16 md:pt-32 md:pb-20"
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

      {/* CTV screen cluster with data popping up — the Urbani decision, live */}
      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 md:px-8">
        <HeroShowcase />
      </div>

      <div className="relative z-10 mx-auto mt-12 w-full max-w-3xl px-5 text-center md:mt-16 md:px-8">
        <motion.h1
          {...entrance(0.35)}
          className="font-display text-3xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Every impression, optimized by AI. Seen by real people.
        </motion.h1>

        <motion.div {...entrance(0.5)} className="mt-8 md:mt-10">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-night-950 transition-transform duration-300 hover:scale-[1.04]"
          >
            Meet Urbani™
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

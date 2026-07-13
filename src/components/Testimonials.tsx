"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

/* Client testimonials carousel, modeled on the se7en.es testimonials slide
 * (client-directed reference). The big heading + author block sit fixed on
 * fixed on the left; the company logo + quote crossfade on the right.
 *
 * NOTE — real clients: Playmania (Eldar), Hyprmode (Guy) and Yellow River
 * (Kelly Lobato, yellowriverd.com). Quote wording is illustrative placeholder
 * copy, to be replaced with client-approved testimonials before launch.
 * Playmania mark from playmania.io; Yellow River mark rebuilt as an SVG from
 * the site's brand (gold serif "Y", #EBC65A on #100F0C) since no logo file is
 * fetchable; Hyprmode has no fetchable logo yet (hyprmode.gg did not resolve)
 * so it renders as a text wordmark. */
type Testimonial = {
  quote: string;
  headline: string;
  name: string;
  role: string;
  company: string;
  /** Optional square brand mark; falls back to the company text wordmark. */
  logo?: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    company: "Playmania",
    logo: "/testimonials/playmania.png",
    name: "Eldar",
    role: "Head of Growth, Playmania",
    headline: "Every impression finally lands where it counts.",
    quote:
      "Urbani™ reads the bidstream and puts our brand in front of exactly the right viewer, in the right home, at the right moment. Our CTV spend has never worked this hard for us.",
  },
  {
    company: "Hyprmode",
    name: "Guy",
    role: "Founder, Hyprmode",
    headline: "The sharpest CTV partner we've worked with.",
    quote:
      "Urbani™ optimizes in real time, so completion rates and ROAS keep climbing without us touching a dial. It feels like having a media team that never sleeps.",
  },
  {
    // Quote wording is illustrative placeholder copy pending Kelly's approval.
    company: "Yellow River",
    logo: "/testimonials/yellow-river.svg",
    name: "Kelly Lobato",
    role: "Monetization Manager, Yellow River",
    headline: "We stopped guessing and started scaling.",
    quote:
      "The intelligence behind every placement is what sets Urbani™ apart. We see where our media goes and why, and the results speak for themselves.",
  },
];

const AUTO_ADVANCE_MS = 7000;

export default function Testimonials() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const count = TESTIMONIALS.length;
  const go = useCallback((next: number) => setIndex(((next % count) + count) % count), [count]);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused, count]);

  const active = TESTIMONIALS[index];

  return (
    <section
      id="testimonials"
      className="relative scroll-mt-24 overflow-hidden py-24 md:py-32"
    >
      {/* Giant faint quotation mark echo (client-loved oversized-type motif) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -z-0 -translate-x-1/2 select-none font-display text-[38rem] leading-none text-white/[0.02]"
      >
        &ldquo;
      </span>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div
          className="relative overflow-hidden rounded-[1.75rem] bg-[#bae8fb]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          role="group"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          <div className="relative grid gap-10 p-8 sm:p-10 md:grid-cols-2 md:gap-12 md:p-14 lg:p-16">
            {/* LEFT — persistent heading + rotating author */}
            <div className="flex flex-col justify-between">
              <h2 className="text-balance font-display text-4xl font-semibold leading-[1.02] tracking-tight text-night-950 sm:text-5xl lg:text-6xl">
                The results speak
                <br />
                for themselves
              </h2>

              <div className="mt-10 min-h-[64px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.name}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: [0.21, 0.6, 0.35, 1] }}
                    className="flex items-center gap-4"
                  >
                    <span
                      aria-hidden="true"
                      className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-night-950/10 font-display text-xl font-semibold text-night-950 ring-1 ring-night-950/15"
                    >
                      {active.name.charAt(0)}
                    </span>
                    <div>
                      <p className="font-display text-base font-semibold text-night-950">
                        {active.name}
                      </p>
                      <p className="text-[0.8rem] leading-snug text-night-900/70">
                        {active.role}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT — rotating company logo + quote */}
            <div className="flex flex-col justify-center">
              <div aria-live="polite" className="min-h-[280px]">
                <AnimatePresence mode="wait">
                  <motion.figure
                    key={active.company}
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
                    transition={{ duration: 0.5, ease: [0.21, 0.6, 0.35, 1] }}
                  >
                    {/* company lockup */}
                    <div className="mb-7 flex h-11 items-center gap-3">
                      {active.logo ? (
                        <Image
                          src={active.logo}
                          alt={`${active.company} logo`}
                          width={44}
                          height={44}
                          className="h-11 w-11 rounded-xl object-cover"
                        />
                      ) : null}
                      <span className="font-display text-2xl font-semibold tracking-tight text-night-950">
                        {active.company}
                      </span>
                    </div>

                    <blockquote>
                      <p className="text-balance font-display text-2xl font-semibold leading-[1.15] tracking-tight text-night-950 sm:text-3xl">
                        {active.headline}
                      </p>
                      <p className="mt-5 max-w-md text-sm leading-relaxed text-night-900/70 sm:text-[0.95rem]">
                        &ldquo;{active.quote}&rdquo;
                      </p>
                    </blockquote>
                    <figcaption className="sr-only">
                      {active.name}, {active.role}
                    </figcaption>
                  </motion.figure>
                </AnimatePresence>
              </div>

              {/* pagination */}
              <div className="mt-10 flex items-center gap-2.5">
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={t.company}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show testimonial from ${t.company}`}
                    aria-current={i === index}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index
                        ? "w-8 bg-night-950"
                        : "w-2 bg-night-950/25 hover:bg-night-950/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

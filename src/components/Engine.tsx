"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./ui/Reveal";
import Counter from "./ui/Counter";

/* The stat cards below are decorative product chrome laid over a sample brand
 * creative — illustrative, not live metrics. All are marked aria-hidden. */

const DELIVERY_BARS = [46, 62, 54, 71, 60, 78, 66, 84, 90];

function FloatCard({
  children,
  className,
  delay = 0,
  reduceMotion,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`absolute ${className ?? ""}`}
      initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 0.8, 0.3, 1] }}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -7, 0] }}
        transition={{
          duration: 6,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default function Engine() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="technology" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="eyebrow mb-4">Meet Urbani™</p>
          <h2 className="max-w-xl text-balance font-display text-3xl font-semibold leading-[1.08] tracking-tight text-white md:text-4xl">
            AI-powered decisions for smarter CTV outcomes.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400">
            Meet Urbani™ is our AI-powered CTV decisioning engine, built to
            analyze every request in real time and route traffic to the most
            relevant demand. By matching the right ad opportunity with the
            right audience signal, Urbani helps reduce waste, improve
            performance, and unlock smarter outcomes across every campaign.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-16">
          <p className="sr-only">
            A sample brand campaign running through Urbani™, with
            illustrative delivery and performance figures.
          </p>

          {/* Brand-creative showcase with floating decorative stat cards */}
          <div className="relative mx-auto max-w-[560px] px-6 sm:px-10">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-[0_40px_120px_rgba(0,0,0,0.6)] ring-1 ring-white/10">
              <Image
                src="/images/brand-creative.jpg"
                alt="Sample brand campaign creative"
                fill
                sizes="(max-width: 640px) 100vw, 560px"
                className="object-cover object-[center_18%]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-night-950/45 via-transparent to-night-950/10"
                aria-hidden="true"
              />
            </div>

            {/* Impressions — dark glass, top-left */}
            <FloatCard
              delay={0.15}
              reduceMotion={reduceMotion}
              className="left-0 top-8 sm:-left-2"
            >
              <div className="glass-deep rounded-2xl px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-slate-400">
                  Impressions
                </p>
                <p className="font-display mt-1 text-xl font-semibold text-white tabular-nums">
                  <Counter value={16024237} />
                </p>
              </div>
            </FloatCard>

            {/* Live campaign pill — top-right */}
            <FloatCard
              delay={0.3}
              reduceMotion={reduceMotion}
              className="right-1 top-4 sm:-right-1"
            >
              <span className="flex items-center gap-2 rounded-full border border-emerald-400/25 bg-night-950/70 px-3 py-1.5 text-[0.65rem] text-emerald-300 backdrop-blur-md">
                <span className="live-dot" aria-hidden="true" />
                Campaign live
              </span>
            </FloatCard>

            {/* Completion rate — white card, right-middle */}
            <FloatCard
              delay={0.4}
              reduceMotion={reduceMotion}
              className="right-0 top-1/2 sm:-right-3"
            >
              <div className="rounded-2xl bg-white px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-slate-500">
                  Completion rate
                </p>
                <p className="font-display mt-1 text-xl font-semibold text-night-950 tabular-nums">
                  <Counter value={94.2} decimals={1} suffix="%" />
                </p>
              </div>
            </FloatCard>

            {/* Delivery mini-bars — dark glass, bottom-left */}
            <FloatCard
              delay={0.55}
              reduceMotion={reduceMotion}
              className="bottom-8 left-0 sm:-left-4"
            >
              <div className="glass-deep rounded-2xl px-4 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-slate-400">
                  Delivery · 24h
                </p>
                <div className="mt-2.5 flex h-9 items-end gap-1">
                  {DELIVERY_BARS.map((h, i) => (
                    <motion.span
                      key={i}
                      className="w-2 rounded-t-[2px] bg-chart-violet"
                      initial={
                        reduceMotion ? { height: `${h}%` } : { height: "10%" }
                      }
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{
                        duration: 0.8,
                        delay: 0.6 + i * 0.05,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
              </div>
            </FloatCard>

            {/* ROAS — accent chip, bottom-right */}
            <FloatCard
              delay={0.7}
              reduceMotion={reduceMotion}
              className="bottom-14 right-0 sm:-right-2"
            >
              <div className="rounded-2xl border border-white/10 bg-night-950/70 px-4 py-3 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.45)]">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-slate-400">
                  ROAS
                </p>
                <p className="font-display mt-1 text-xl font-semibold text-glow-cyan tabular-nums">
                  <Counter value={3.2} decimals={1} suffix="x" />
                </p>
              </div>
            </FloatCard>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

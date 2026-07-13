import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Let's Talk | Urbani",
  description:
    "Tell us about your CTV goals and Urbani™ will show you what it can decide for your campaigns. Share your details and our team will be in touch.",
};

const TRUST_POINTS = [
  "See how Urbani™ can optimize your campaigns performance",
  "CTV-only, premium supply, Maximize your reach and impact",
  "A reply from our team within one business day",
];

export default function ContactPage() {
  return (
    <div className="relative isolate flex min-h-svh flex-col overflow-hidden">
      {/* Cinematic backdrop, consistent with the homepage sections */}
      <Image
        src="/images/audience.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-30"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-night-950 via-night-950/85 to-night-950"
        aria-hidden="true"
      />
      <div className="grid-bg absolute inset-0" aria-hidden="true" />

      {/* Minimal top bar */}
      <header className="relative z-10">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <Link
            href="/"
            className="font-display text-xl font-bold tracking-tight text-white"
            aria-label="Urbani, back to home"
          >
            Urbani<span className="text-glow-violet">.tv</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-slate-400 transition-colors hover:text-white"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 items-center px-5 py-12 md:px-8 md:py-16">
        <div className="grid w-full gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          {/* Editorial column */}
          <div className="max-w-xl">
            <p className="eyebrow mb-5">Let&rsquo;s talk</p>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Tell{" "}
              <span className="text-gradient">
                Urbani<span className="align-super text-[0.4em]">™</span>
              </span>{" "}
              what you want to achieve.
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-slate-300">
              Share a few details and our team will show you how Urbani™ works for your needs, decides the right ad for the right moment
              to get more from your media spend.
            </p>

            <ul className="mt-9 space-y-3.5">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-glow-cyan"
                    aria-hidden="true"
                  />
                  <span className="text-[0.95rem] leading-relaxed text-slate-200">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Form column */}
          <div className="w-full">
            <ContactForm />
          </div>
        </div>
      </main>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import Reveal from "./ui/Reveal";

// TODO: replace with the verified contact address before launch.
export const CONTACT_EMAIL = "contact@urbani.tv";

export default function FinalCTA() {
  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden py-24 md:py-36">
      <Image
        src="/images/projector.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-45"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-night-950 via-night-950/70 to-night-950"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
        <Reveal>
          <h2 className="text-balance font-display text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl">
            Let&rsquo;s move CTV
            <br />
            forward, together.
          </h2>
          <p className="mx-auto mt-6 max-w-sm text-base leading-relaxed text-slate-300">
            See what Urbani™ can decide for your campaigns.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full bg-white px-9 py-4 text-base font-semibold text-night-950 transition-transform duration-300 hover:scale-[1.04]"
            >
              Let&rsquo;s Get Started
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

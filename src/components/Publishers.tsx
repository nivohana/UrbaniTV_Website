import Image from "next/image";
import Reveal from "./ui/Reveal";

export default function Publishers() {
  return (
    <section id="publishers" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12">
            {/* 1 — tall left: copy panel */}
            <div className="flex min-h-[500px] flex-col overflow-hidden rounded-[1.25rem] bg-[#066b82] lg:col-span-5 lg:row-span-2 lg:min-h-[580px]">
              <div className="flex flex-1 flex-col p-6 sm:p-8 md:p-10">
                <span className="inline-flex w-fit rounded-full bg-white px-4 py-1.5 text-[0.72rem] font-medium text-[#066b82]">
                  For publishers
                </span>
                <h2 className="mt-6 text-balance font-display text-2xl font-semibold leading-[1.08] tracking-tight text-white sm:text-3xl lg:text-[2rem]">
                  Premium CTV supply,
                  <br />
                  Intelligently curated.
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80 sm:text-[0.95rem]">
                  Premium CTV supply, intelligently curated. Urbani™ selects
                  high-quality placements and uses AI-powered routing to connect
                  every impression with the most relevant demand opportunity.
                  Delivering curated media packages designed for better result.
                </p>
                <a
                  href="#contact"
                  className="group mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-cyan-100"
                >
                  Let&rsquo;s talk
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </div>
            </div>

            {/* 2 — top right: portrait + stat chip */}
            <div className="relative min-h-[300px] overflow-hidden rounded-[1.25rem] lg:col-span-7 lg:min-h-[580px]">
              <Image
                src="/images/publisher-woman.jpg"
                alt="A woman in warm golden-hour light"
                fill
                sizes="(max-width: 1024px) 100vw, 680px"
                className="object-cover object-[center_20%]"
              />
              <div
                aria-hidden="true"
                className="absolute left-4 top-4 rounded-xl bg-[#066b82]/90 px-4 py-3 shadow-lg backdrop-blur-sm sm:left-6 sm:top-6"
              >
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/70">
                  Impressions
                </p>
                <p className="font-display text-lg font-semibold tabular-nums text-white sm:text-xl">
                  16,024,237
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

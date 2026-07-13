import Image from "next/image";
import Reveal from "./ui/Reveal";

const PANELS = [
  {
    id: "advertisers",
    eyebrow: "For advertisers",
    title: "Get more from every media dollar.",
    body: "Urbani™ uses AI to plan, activate, and optimize CTV campaigns in real time. It matches every impression with the right audience, the right context, and the best-performing demand path.",
    points: [
      "Curated premium CTV inventory",
      "AI-driven matching between ads, audiences, and supply",
      "Campaigns that adapt in real time",
    ],
    cta: "Talk to our demand team",
    image: "/images/audience.jpg",
    alt: "An audience watching a film in a dark cinema",
    align: "left" as "left" | "right",
  },
];

export default function AudienceRows() {
  return (
    <section className="relative">
      {PANELS.map((panel, i) => (
        <div
          key={panel.id}
          id={panel.id}
          className={`relative isolate scroll-mt-24 overflow-hidden ${
            i > 0 ? "mt-16 md:mt-24" : ""
          }`}
        >
          <Image
            src={panel.image}
            alt={panel.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />

          {/* Legibility washes: side gradient behind the text + bottom anchor */}
          <div
            aria-hidden="true"
            className={`absolute inset-0 ${
              panel.align === "left"
                ? "bg-gradient-to-r from-night-950/85 via-night-950/40 to-night-950/10"
                : "bg-gradient-to-l from-night-950/85 via-night-950/40 to-night-950/10"
            }`}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/25 to-night-950/30"
          />

          <div className="relative mx-auto flex min-h-[68svh] max-w-6xl px-5 py-16 md:px-8 md:py-24 lg:min-h-[75svh]">
            <div
              className={`flex w-full items-end ${
                panel.align === "right" ? "justify-end" : ""
              }`}
            >
              <Reveal className="max-w-lg">
                <span className="mb-4 inline-flex w-fit rounded-full bg-white px-4 py-1.5 text-[0.72rem] font-medium text-[#066b82]">
                  {panel.eyebrow}
                </span>
                <h3 className="text-balance font-display text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {panel.title}
                </h3>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">
                  {panel.body}
                </p>

                <ul className="mt-8 space-y-3 border-t border-white/15 pt-7">
                  {panel.points.map((point) => (
                    <li key={point} className="flex items-start gap-3.5">
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

                <a
                  href="#contact"
                  className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-glow-cyan"
                >
                  {panel.cta}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
              </Reveal>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

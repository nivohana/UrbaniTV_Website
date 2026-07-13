import Reveal from "./ui/Reveal";

/* Connected-TV platform logo SVGs (sourced from Wikimedia Commons) live in
 * /public/partners. Rendered white via `brightness-0 invert` to sit on the
 * dark surface; per-logo heights compensate for differing aspect ratios.
 * Trademarks of their respective owners — clear brand permissions before launch. */
const PLATFORMS: { name: string; src: string; heightClass: string }[] = [
  { name: "Roku", src: "/partners/roku.svg", heightClass: "h-8" },
  { name: "Amazon Fire TV", src: "/partners/firetv.svg", heightClass: "h-9" },
  { name: "Apple TV", src: "/partners/appletv.svg", heightClass: "h-7" },
  { name: "Google TV", src: "/partners/googletv.svg", heightClass: "h-5" },
  { name: "Vizio", src: "/partners/vizio.svg", heightClass: "h-5" },
  { name: "TCL", src: "/partners/tcl.png", heightClass: "h-6" },
  { name: "Hisense", src: "/partners/hisense.svg", heightClass: "h-5" },
  { name: "LG", src: "/partners/lg.svg", heightClass: "h-8" },
];

export default function PlatformStrip() {
  const row = [...PLATFORMS, ...PLATFORMS];

  return (
    <section className="relative border-y border-white/[0.05] bg-night-900/60 py-10">
      <Reveal>
        <p className="mb-8 text-center font-mono text-[0.68rem] uppercase tracking-[0.24em] text-slate-500">
          Delivering across every major CTV platform
        </p>
        <div className="marquee-mask overflow-hidden">
          <div className="animate-marquee-reverse flex w-max items-center gap-20 pr-20">
            {row.map((platform, i) => (
              /* eslint-disable-next-line @next/next/no-img-element -- static SVGs, no optimization needed */
              <img
                key={`${platform.name}-${i}`}
                src={platform.src}
                alt={i >= PLATFORMS.length ? "" : `${platform.name} logo`}
                aria-hidden={i >= PLATFORMS.length}
                className={`${platform.heightClass} w-auto brightness-0 invert opacity-40 transition-opacity duration-300 hover:opacity-80`}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

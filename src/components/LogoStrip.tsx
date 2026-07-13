import Reveal from "./ui/Reveal";

/* Official brand logo SVGs (sourced from Wikimedia Commons) live in
 * /public/partners. Rendered white via `brightness-0 invert` to sit on the
 * dark surface; per-logo heights compensate for differing aspect ratios. */
const PARTNERS: { name: string; src: string; heightClass: string }[] = [
  { name: "McDonald's", src: "/partners/mcdonalds.svg", heightClass: "h-9" },
  { name: "Coca-Cola", src: "/partners/coca-cola.svg", heightClass: "h-8" },
  { name: "Netflix", src: "/partners/netflix.svg", heightClass: "h-6" },
  { name: "Samsung", src: "/partners/samsung.svg", heightClass: "h-6" },
  { name: "Toyota", src: "/partners/toyota.svg", heightClass: "h-5" },
  { name: "Nike", src: "/partners/nike.svg", heightClass: "h-5" },
  { name: "Amazon", src: "/partners/amazon.svg", heightClass: "h-7" },
  { name: "Verizon", src: "/partners/verizon.svg", heightClass: "h-6" },
];

export default function LogoStrip() {
  const row = [...PARTNERS, ...PARTNERS];

  return (
    <section className="relative border-y border-white/[0.05] bg-night-900/60 py-10">
      <Reveal>
        <p className="mb-8 text-center font-mono text-[0.68rem] uppercase tracking-[0.24em] text-slate-500">
          Connecting brands &amp; streaming publishers
        </p>
        <div className="marquee-mask overflow-hidden">
          <div className="animate-marquee flex w-max items-center gap-20 pr-20">
            {row.map((partner, i) => (
              /* eslint-disable-next-line @next/next/no-img-element -- static SVGs, no optimization needed */
              <img
                key={`${partner.name}-${i}`}
                src={partner.src}
                alt={i >= PARTNERS.length ? "" : `${partner.name} logo`}
                aria-hidden={i >= PARTNERS.length}
                className={`${partner.heightClass} w-auto brightness-0 invert opacity-40 transition-opacity duration-300 hover:opacity-80`}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

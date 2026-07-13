import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={`max-w-3xl ${centered ? "mx-auto text-center" : ""} mb-14 md:mb-20`}
    >
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h2 className="font-display text-3xl md:text-4xl font-semibold leading-[1.08] tracking-tight text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-slate-400">
          {description}
        </p>
      )}
    </Reveal>
  );
}

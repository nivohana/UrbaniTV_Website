import Link from "next/link";

const COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "Urbani™", href: "#technology" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "For Advertisers", href: "#advertisers" },
      { label: "For Publishers", href: "#publishers" },
    ],
  },
  {
    heading: "Contact",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/urbani-tv/",
        external: true,
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-night-900/70">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
          <div>
            <Link
              href="#top"
              className="font-display text-xl font-bold tracking-tight text-white"
            >
              Urbani<span className="text-glow-violet">.tv</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
            Urbani™ is an AI-powered CTV layer that connects publishers and advertisers through smarter real-time decisioning, matching every impression with the right demand, audience, and opportunity.
            </p>
            <p className="mt-6 text-xs leading-relaxed text-slate-600">
            Building A1, Dubai Digital Park
            <br />
            Silicon Oasis
            <br />
            Dubai, United Arab Emirates
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-slate-500">
                {col.heading}
              </p>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...("external" in link && link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.06] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Urbani. All rights reserved.
          </p>
          <div className="flex gap-7">
            <Link
              href="/privacy"
              className="text-xs text-slate-500 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-slate-500 transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

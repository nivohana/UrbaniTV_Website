import Link from "next/link";

export default function LegalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-white/[0.06]">
        <div className="mx-auto flex h-16 max-w-3xl items-center px-5">
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-tight text-white"
          >
            Urbani<span className="text-glow-violet">.tv</span>
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-16">{children}</main>
      <footer className="mx-auto max-w-3xl px-5 pb-12">
        <Link href="/" className="text-sm text-slate-400 hover:text-white">
          ← Back to home
        </Link>
      </footer>
    </div>
  );
}

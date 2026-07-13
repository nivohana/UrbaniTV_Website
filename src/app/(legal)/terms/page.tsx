import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Urbani",
};

/* Placeholder page — replace with counsel-approved terms before launch. */
export default function TermsPage() {
  return (
    <article className="space-y-6 text-slate-400">
      <h1 className="font-display text-3xl font-semibold text-white">
        Terms of Service
      </h1>
      <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
        Placeholder. Pending final legal copy.
      </p>
      <p>
        This page is a placeholder. The full terms of service will be
        published here before launch. For questions in the meantime, contact
        us at contact@urbani.tv.
      </p>
    </article>
  );
}

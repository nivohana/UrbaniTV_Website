import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Urbani",
};

/* Placeholder page — replace with counsel-approved policy text before launch. */
export default function PrivacyPage() {
  return (
    <article className="space-y-6 text-slate-400">
      <h1 className="font-display text-3xl font-semibold text-white">
        Privacy Policy
      </h1>
      <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
        Placeholder. Pending final legal copy.
      </p>
      <p>
        Urbani is committed to privacy safe advertising. Our platform operates
        without personal IDs and does not rely on cookies or personal
        identifiers for targeting.
      </p>
      <p>
        This page is a placeholder. The full privacy policy will be published
        here before launch. For privacy questions in the meantime, contact us
        at contact@urbani.tv.
      </p>
    </article>
  );
}

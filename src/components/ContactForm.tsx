"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type InterestValue = "advertiser" | "publisher" | "agency" | "other";

const INTEREST_OPTIONS: { value: InterestValue; label: string }[] = [
  { value: "advertiser", label: "Advertiser / Brand" },
  { value: "publisher", label: "Publisher / Streaming" },
  { value: "agency", label: "Agency" },
  { value: "other", label: "Something else" },
];

type FormValues = {
  name: string;
  email: string;
  company: string;
  interest: InterestValue;
  message: string;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

type Status = "idle" | "submitting" | "success";

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  company: "",
  interest: "advertiser",
  message: "",
};

// Reasonable client-side email check — the real one happens server-side later.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormValues): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = "Please tell us your name.";
  if (!values.email.trim()) {
    errors.email = "We need an email to reply to.";
  } else if (!EMAIL_RE.test(values.email.trim())) {
    errors.email = "That email doesn't look right.";
  }
  if (!values.company.trim()) errors.company = "Please add your company.";
  return errors;
}

export default function ContactForm() {
  const reduceMotion = useReducedMotion();
  const formId = useId();
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  // Only surface validation errors after the first submit attempt.
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const errorSummaryRef = useRef<HTMLParagraphElement>(null);

  function update<K extends keyof FormValues>(field: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (submitAttempted) {
      // Re-validate the touched field live once the user has tried to submit.
      setErrors((prev) => {
        const next = validate({ ...values, [field]: value });
        return { ...prev, [field]: next[field] };
      });
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitAttempted(true);

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      errorSummaryRef.current?.focus();
      return;
    }

    setStatus("submitting");

    // NOTE: No backend yet — this simulates a request so the user gets a
    // confirmation. To send a real email, POST `values` to a server route
    // (e.g. /api/contact) here and branch on the response.
    await new Promise((resolve) => setTimeout(resolve, 900));

    setStatus("success");
  }

  function reset() {
    setValues(INITIAL_VALUES);
    setErrors({});
    setStatus("idle");
    setSubmitAttempted(false);
  }

  const hasErrors = submitAttempted && Object.keys(errors).some((k) => errors[k as keyof FieldErrors]);

  return (
    <div className="glass-deep relative overflow-hidden rounded-2xl p-6 sm:p-8">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.21, 0.6, 0.35, 1] }}
            className="flex flex-col items-center py-10 text-center"
            role="status"
          >
            <span
              className="flex h-14 w-14 items-center justify-center rounded-full bg-glow-green/15 text-glow-green"
              aria-hidden="true"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <h2 className="mt-6 font-display text-2xl font-semibold text-white">
              You&rsquo;re on our radar.
            </h2>
            <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-slate-300">
              Thanks, {values.name.trim().split(" ")[0] || "there"}. We&rsquo;ve got
              your details and someone from the Urbani team will be in touch shortly.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/30 hover:bg-white/[0.04]"
            >
              Send another request
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit}
            initial={false}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            className="space-y-5"
            aria-describedby={hasErrors ? `${formId}-summary` : undefined}
          >
            {hasErrors && (
              <p
                id={`${formId}-summary`}
                ref={errorSummaryRef}
                tabIndex={-1}
                className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200 outline-none"
              >
                Please fix the highlighted fields and try again.
              </p>
            )}

            <Field
              id={`${formId}-name`}
              label="Full name"
              error={errors.name}
            >
              <input
                id={`${formId}-name`}
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onChange={(e) => update("name", e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                className={inputClass(!!errors.name)}
                placeholder="Jordan Rivera"
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={`${formId}-email`} label="Work email" error={errors.email}>
                <input
                  id={`${formId}-email`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                  className={inputClass(!!errors.email)}
                  placeholder="you@company.com"
                />
              </Field>

              <Field id={`${formId}-company`} label="Company" error={errors.company}>
                <input
                  id={`${formId}-company`}
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={values.company}
                  onChange={(e) => update("company", e.target.value)}
                  aria-invalid={!!errors.company}
                  aria-describedby={errors.company ? `${formId}-company-error` : undefined}
                  className={inputClass(!!errors.company)}
                  placeholder="Acme Media"
                />
              </Field>
            </div>

            <Field id={`${formId}-interest`} label="I'm reaching out as">
              <select
                id={`${formId}-interest`}
                name="interest"
                value={values.interest}
                onChange={(e) => update("interest", e.target.value as InterestValue)}
                className={`${inputClass(false)} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%2214%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2394a3b8%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10`}
              >
                {INTEREST_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-night-800 text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              id={`${formId}-message`}
              label="What would you like to achieve?"
              optional
            >
              <textarea
                id={`${formId}-message`}
                name="message"
                rows={4}
                value={values.message}
                onChange={(e) => update("message", e.target.value)}
                className={`${inputClass(false)} resize-none`}
                placeholder="A little context about your campaigns, inventory, or goals…"
              />
            </Field>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-base font-semibold text-night-950 transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
            >
              {status === "submitting" ? (
                <>
                  <Spinner />
                  Sending…
                </>
              ) : (
                <>
                  Submit request
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </>
              )}
            </button>

            <p className="text-center text-xs leading-relaxed text-slate-500">
              By submitting, you agree to be contacted about Urbani. We&rsquo;ll never
              share your details.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline justify-between text-sm font-medium text-slate-200"
      >
        <span>{label}</span>
        {optional && <span className="text-xs font-normal text-slate-500">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-[0.95rem] text-white",
    "placeholder:text-slate-500 transition-colors",
    "focus:bg-white/[0.05]",
    hasError
      ? "border-red-400/50"
      : "border-white/10 hover:border-white/20 focus:border-glow-cyan/60",
  ].join(" ");
}

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4z" />
    </svg>
  );
}

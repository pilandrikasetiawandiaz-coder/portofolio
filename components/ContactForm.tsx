"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useT } from "@/i18n/LanguageProvider";
import { btn } from "./ui/button";
import { motionDuration } from "@/lib/motion";

type Fields = { name: string; email: string; message: string };
/** Simpan *jenis* error (bukan teksnya) supaya pesan ikut berganti saat bahasa diganti. */
type Errors = Partial<Record<keyof Fields, true>>;
type Status = "idle" | "loading" | "success";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = true;
  if (!EMAIL_RE.test(v.email.trim())) e.email = true;
  if (v.message.trim().length < 10) e.message = true;
  return e;
}

/**
 * Mock handler. Untuk produksi, ganti isi fungsi ini dengan:
 * - Formspree: fetch("https://formspree.io/f/<id>", { method: "POST", body: JSON.stringify(values), headers: {...} })
 * - Resend: POST ke route handler app/api/contact/route.ts yang memanggil Resend SDK.
 */
async function sendMessage(values: Fields) {
  console.log("[mock] contact message:", values);
  await new Promise((r) => setTimeout(r, 900));
}

export function ContactForm() {
  const { t } = useT();
  const reduceMotion = useReducedMotion();
  const f = t.contact.form;
  const [values, setValues] = useState<Fields>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status !== "success") return;
    const timer = window.setTimeout(() => setStatus("idle"), 2400);
    return () => window.clearTimeout(timer);
  }, [status]);

  const update = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }
    setStatus("loading");
    try {
      await sendMessage(values);
      setStatus("success");
      setValues({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact message could not be sent.", error);
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        role="status"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="flex h-full flex-col items-center justify-center gap-4 rounded-[20px] border border-line bg-panel p-8 text-center dark:border-transparent"
      >
        <svg viewBox="0 0 40 40" className="size-10 text-gold-ink" fill="none" aria-hidden="true">
          <motion.circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="2.5" initial={{ pathLength: reduceMotion ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduceMotion ? 0 : motionDuration.draw }} />
          <motion.path d="m11 20 6 6 12-13" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: reduceMotion ? 1 : 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduceMotion ? 0 : motionDuration.drawCheck, delay: reduceMotion ? 0 : 0.25 }} />
        </svg>
        <p className="font-semibold text-fg">{f.success}</p>
        <button type="button" onClick={() => setStatus("idle")} className={btn.outlineNavy}>
          {f.sendAnother}
        </button>
      </motion.div>
    );
  }

  const field =
    "w-full rounded-xl border bg-surface px-4 pb-2 pt-5 text-sm text-fg placeholder:text-transparent outline-none focus:border-gold focus:ring-2 focus:ring-gold/40 focus:shadow-[0_0_18px_var(--gold-glow)]";
  const placeholders = { name: f.namePlaceholder, email: f.emailPlaceholder };

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-4 rounded-[20px] border border-line bg-panel p-6 sm:p-8 dark:border-transparent" aria-label={f.aria}>
      {(["name", "email"] as const).map((k) => (
        <div key={k} className="relative">
          <input
            id={`cf-${k}`}
            name={k}
            type={k === "email" ? "email" : "text"}
            autoComplete={k === "email" ? "email" : "name"}
            value={values[k]}
            onChange={update(k)}
            aria-invalid={!!errors[k]}
            aria-describedby={errors[k] ? `cf-${k}-err` : undefined}
            placeholder={placeholders[k]}
            className={`peer ${field} ${errors[k] ? "border-danger-border" : "border-line"}`}
          />
          <label
            htmlFor={`cf-${k}`}
            className="pointer-events-none absolute left-4 top-2 text-xs font-semibold text-muted transition-transform peer-placeholder-shown:translate-y-[18px] peer-placeholder-shown:text-sm peer-focus:translate-y-0 peer-focus:text-xs"
          >
            {f[k]}
          </label>
          {errors[k] ? (
            <p id={`cf-${k}-err`} className="mt-1.5 text-xs text-danger">
              {f.errors[k]}
            </p>
          ) : null}
        </div>
      ))}

      <div className="relative">
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          value={values.message}
          onChange={update("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-message-err" : undefined}
          placeholder={f.messagePlaceholder}
          className={`peer ${field} resize-y ${errors.message ? "border-danger-border" : "border-line"}`}
        />
        <label
          htmlFor="cf-message"
          className="pointer-events-none absolute left-4 top-2 text-xs font-semibold text-muted transition-transform peer-placeholder-shown:translate-y-[18px] peer-placeholder-shown:text-sm peer-focus:translate-y-0 peer-focus:text-xs"
        >
          {f.message}
        </label>
        {errors.message ? (
          <p id="cf-message-err" className="mt-1.5 text-xs text-danger">
            {f.errors.message}
          </p>
        ) : null}
      </div>

      <button type="submit" disabled={status === "loading"} className={`${btn.gold} mt-2 w-full disabled:cursor-wait disabled:opacity-80`}>
        {status === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" /> {f.sending}
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden="true" /> {f.submit}
          </>
        )}
      </button>
    </form>
  );
}

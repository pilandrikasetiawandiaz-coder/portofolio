"use client";

import { Fragment } from "react";
import { ArrowRight, Download } from "lucide-react";
import { hero, site } from "@/data/content";
import { useT } from "@/i18n/LanguageProvider";
import { btn } from "./ui/button";
import { GarudaMascot, MagneticLink, Typewriter } from "./ui/MotionPrimitives";
import { motion } from "framer-motion";
import { easeOut, motionDuration } from "@/lib/motion";
import { ProfilePhoto } from "./ui/ProfilePhoto";

export function Hero() {
  const { t } = useT();
  const h = t.hero;
  return (
    <section
      id="beranda"
      aria-labelledby="hero-title"
      className="relative isolate scroll-mt-24 overflow-hidden bg-gradient-to-b from-hero-from via-hero-via to-hero-to pb-20 pt-32 sm:pt-36 lg:pb-28 lg:pt-40"
    >
      {/* Glow emas samar di dasar */}
      <div
        aria-hidden="true"
        className="hero-glow pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64"
      />
      {/* Grid halus khas "infra" */}
      <div
        aria-hidden="true"
        className="hero-grid pointer-events-none absolute inset-0 -z-10"
      />
      <div
        aria-hidden="true"
        className="hero-transition pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-24"
      />

      <div className="relative z-0 mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        {/* Foto: di atas pada mobile */}
        <div className="order-first mx-auto w-full max-w-[300px] sm:max-w-[320px] lg:order-last lg:max-w-[420px]">
          <ProfilePhoto
            src={hero.photo}
            alt={h.photoAlt}
            placeholderLabel={h.photoPlaceholder}
            placeholderAria={h.photoPlaceholderAria}
          />
          <GarudaMascot />
        </div>

        <div className="text-center lg:text-left">
          <p className="section-label on-dark">{h.label}</p>
          <h1
            id="hero-title"
            className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-on-navy sm:text-5xl lg:text-6xl"
          >
            <span className="sr-only">{site.name}</span>
            <span aria-hidden="true">
              {site.name.split(" ").map((word, index) => (
                <motion.span
                  key={`${word}-${index}`}
                  className="mr-[0.25em] inline-block"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.09, duration: motionDuration.standard, ease: easeOut }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>
          <p className="mt-3 font-mono text-sm font-semibold tracking-wide text-gold sm:text-base">
            <span className="sr-only">{h.roles.join(", ")}</span>
            <span aria-hidden="true"><Typewriter words={h.roles} /></span>
          </p>
          <p className="mx-auto mt-6 max-w-[600px] text-base leading-relaxed text-on-navy/75 sm:text-lg lg:mx-0">
            {h.intro.split(/(\*\*[^*]+\*\*)/g).map((segment, index) => {
              const emphasized = segment.startsWith("**") && segment.endsWith("**");
              return emphasized ? (
                <strong key={index} className="font-semibold text-on-navy">
                  {segment.slice(2, -2)}
                </strong>
              ) : (
                <Fragment key={index}>{segment}</Fragment>
              );
            })}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <MagneticLink href={hero.ctaPrimaryHref} className={btn.gold}>
              {h.ctaPrimary} <ArrowRight className="size-4" aria-hidden="true" />
            </MagneticLink>
            <a href={site.cvHref} className={btn.outlineWhite}>
              <Download className="size-4" aria-hidden="true" /> {h.ctaSecondary}
            </a>
            <a href={hero.ctaTertiaryHref} className={btn.textLight}>
              {h.ctaTertiary}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

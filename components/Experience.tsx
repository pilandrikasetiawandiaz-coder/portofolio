"use client";

import { useRef } from "react";
import { Trophy } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { experienceItems } from "@/data/content";
import { useT } from "@/i18n/LanguageProvider";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { TextOrSkeleton } from "./ui/Skeleton";
import { easeInOut, easeOut, motionDuration, scrollSpring } from "@/lib/motion";

export function Experience() {
  const { t } = useT();
  const x = t.experience;
  const reduceMotion = useReducedMotion();
  const timelineRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 75%"],
  });
  const progress = useSpring(scrollYProgress, scrollSpring);
  return (
    <section id="pengalaman" aria-labelledby="pengalaman-title" className="scroll-mt-24 border-t border-line bg-surface-alt py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="pengalaman-title" label={x.label} title={x.title} subtitle={x.subtitle} />

        <ol ref={timelineRef} className="relative mt-10 grid items-stretch gap-6 md:mt-12 lg:grid-cols-4 lg:gap-5">
          {/* Garis timeline: vertikal (mobile) / horizontal (desktop) */}
          <span aria-hidden="true" className="absolute bottom-6 left-[11px] top-6 w-px bg-line lg:hidden" />
          <span aria-hidden="true" className="absolute left-6 right-6 top-[11px] hidden h-px bg-line lg:block" />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-6 left-[11px] top-6 w-px origin-top bg-gold lg:hidden"
            style={{ scaleY: progress }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute left-6 right-6 top-[11px] hidden h-px origin-left bg-gold lg:block"
            style={{ scaleX: progress }}
          />

          {experienceItems.map((meta, index) => {
            const hl = "highlight" in meta && meta.highlight;
            const item = x.items[meta.id];
            // The first three localized titles include their date before this separator.
            const dateSeparator = item.title.indexOf("::");
            const title = dateSeparator >= 0 ? item.title.slice(dateSeparator + 2) : item.title;
            const date = dateSeparator >= 0 ? item.title.slice(0, dateSeparator) : meta.year || x.placeholderYear;
            return (
              <Reveal as="li" key={meta.id} className="relative min-w-0 pl-10 lg:pl-0 lg:pt-10">
                {/* Node */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-6 grid size-[23px] place-items-center rounded-full border-2 ${
                    hl ? "border-gold bg-navy" : "border-line bg-surface"
                  }`}
                >
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-[-5px] rounded-full border border-gold"
                    initial={{ opacity: 0.7, scale: 0.65 }}
                    whileInView={{ opacity: 0, scale: 1.8 }}
                    viewport={{ once: true }}
                    transition={{ duration: motionDuration.pulse, delay: index * 0.12, repeat: reduceMotion ? 0 : 1, repeatDelay: 1.1 }}
                  />
                  <span className={`size-2 rounded-full ${hl ? "bg-gold" : "bg-fg/30"}`} />
                </span>

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: motionDuration.standard, ease: easeOut }}
                  className="h-full"
                >
                <article
                  className={`relative h-full overflow-hidden rounded-[20px] border p-6 ${
                    hl ? "border-highlight-border bg-highlight text-on-navy shadow-[var(--shadow-lift)]" : "card"
                  }`}
                >
                  {hl ? (
                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-[-35%] w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                      animate={{ x: ["0%", "450%"] }}
                      transition={{ duration: motionDuration.shine, ease: easeInOut, repeat: Infinity, repeatDelay: 3 }}
                    />
                  ) : null}
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 font-mono text-[13px] font-semibold md:text-sm ${
                        hl ? "bg-gold text-navy" : "bg-page text-fg ring-1 ring-line"
                      }`}
                    >
                      {date}
                    </span>
                    {hl ? <Trophy className="size-5 shrink-0 text-gold" aria-label={x.achievementAria} /> : null}
                  </div>

                  {hl ? (
                    <p className="micro-label mt-4 font-mono text-gold">{x.highlightLabel}</p>
                  ) : null}
                  <h3
                    className={`${hl ? "mt-1.5" : "mt-4"} text-base font-bold ${
                      title ? (hl ? "text-on-navy" : "text-fg") : hl ? "text-on-navy/50" : "text-faint"
                    }`}
                  >
                    {title || x.placeholderTitle}
                  </h3>
                  <div className="mt-3">
                    <TextOrSkeleton
                      text={item.description}
                      lines={2}
                      dark={!!hl}
                      className={`text-sm leading-relaxed ${
                        hl ? "text-on-navy/85" : item.description ? "text-fg" : "text-muted"
                      }`}
                    />
                  </div>
                </article>
                </motion.div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

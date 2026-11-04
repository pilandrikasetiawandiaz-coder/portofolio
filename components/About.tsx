"use client";

import { useT } from "@/i18n/LanguageProvider";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { SpotlightCard } from "./ui/MotionPrimitives";
import { motion } from "framer-motion";
import { easeOut, motionDuration, staggerItemVariants } from "@/lib/motion";

export function About() {
  const { t } = useT();
  const a = t.about;
  return (
    <section id="tentang" aria-labelledby="tentang-title" className="scroll-mt-24 py-20 md:py-24">
      <Reveal className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="tentang-title"
          label={a.label}
          title={a.title}
          titleClassName="text-4xl sm:text-5xl"
        />
        <p className="mt-6 max-w-[680px] text-base leading-relaxed text-muted sm:text-lg">{a.paragraph}</p>

        <dl className="mt-10 grid gap-4 md:grid-cols-2">
          {a.info.map((item, index) => (
            <SpotlightCard key={item.label} className="rounded-2xl border border-line bg-surface p-5 hover:border-gold">
              <motion.div
                variants={staggerItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: motionDuration.standard, ease: easeOut, delay: index * 0.1 }}
              >
              <dt className="text-sm text-muted">{item.label}</dt>
              <dd className="mt-1 break-words font-semibold text-fg">
                {item.href ? (
                  <a
                    href={item.href}
                    className="break-all rounded underline-offset-4 transition-colors hover:text-gold-ink hover:underline"
                  >
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </dd>
              </motion.div>
            </SpotlightCard>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}

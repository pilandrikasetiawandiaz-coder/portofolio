"use client";

import { Cloud, Network, Server, Users, Wrench } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";
import type { SkillGroupId } from "@/i18n/types";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { motion } from "framer-motion";
import { easeOut, motionDuration, staggerItemVariants } from "@/lib/motion";

const icons: Record<SkillGroupId, typeof Cloud> = {
  cloud: Cloud,
  devops: Wrench,
  network: Network,
  system: Server,
  soft: Users,
};

export function Skills() {
  const { t } = useT();
  const s = t.skills;
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-24 border-t border-line bg-surface-alt py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="skills-title" label={s.label} title={s.title} subtitle={s.subtitle} />

        <ul className="mt-10 grid gap-x-10 gap-y-10 md:mt-12 lg:grid-cols-2">
          {s.groups.map((group) => {
            const Icon = icons[group.id];
            return (
              <Reveal as="li" key={group.id} className={group.id === "soft" ? "lg:col-span-2" : ""}>
                <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-fg">
                  <Icon className="size-5 shrink-0 text-gold-ink" aria-hidden="true" />
                  {group.title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.tags.map((tag, index) => (
                    <motion.li
                      key={tag}
                      className="tag hover:border-gold hover:shadow-[0_0_14px_var(--gold-tag-glow)]"
                      variants={staggerItemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: motionDuration.standard, ease: easeOut, delay: index * 0.06 }}
                      whileHover={{ y: -2 }}
                    >
                      {tag}
                    </motion.li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

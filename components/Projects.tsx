"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, FolderGit2, ImageIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { projectItems, type ProjectMeta } from "@/data/content";
import { useT } from "@/i18n/LanguageProvider";
import type { Dictionary, ProjectText } from "@/i18n/types";
import { SectionHeading } from "./ui/SectionHeading";
import { TextOrSkeleton } from "./ui/Skeleton";
import { TiltCard } from "./ui/MotionPrimitives";
import { easeOut, motionDuration } from "@/lib/motion";

export function Projects() {
  const { t, lang } = useT();
  const p = t.projects;
  const [filter, setFilter] = useState<"featured" | "all">("all");
  const visibleItems = filter === "all" ? projectItems : projectItems.filter((item) => item.featured);
  return (
    <section id="project" aria-labelledby="project-title" className="scroll-mt-24 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="project-title" label={p.label} title={p.title} subtitle={p.subtitle} />

        <div
          role="group"
          aria-label={lang === "id" ? "Filter proyek" : "Project filters"}
          className="mt-10 flex gap-2"
        >
          {(["featured", "all"] as const).map((value) => {
            const active = filter === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(value)}
                className={`min-h-10 rounded-full border px-4 text-sm font-semibold focus-visible:outline ${
                  active
                    ? "border-gold bg-gold text-navy"
                    : "border-line text-fg hover:border-gold"
                }`}
              >
                {value === "featured"
                  ? lang === "id" ? "Terpilih" : "Selected"
                  : lang === "id" ? "Semua" : "All"}
              </button>
            );
          })}
        </div>

        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((meta, i) => (
              <motion.li
                key={meta.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: motionDuration.filter, ease: easeOut }}
                className="h-full"
              >
                <ProjectCard meta={meta} text={p.items[meta.id]} index={i} dict={p} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </section>
  );
}

function ProjectCard({
  meta,
  text: p,
  index,
  dict: d,
}: {
  meta: ProjectMeta;
  text: ProjectText;
  index: number;
  dict: Dictionary["projects"];
}) {
  const num = String(index + 1).padStart(2, "0");
  const name = p.title || d.placeholderName;

  return (
    <TiltCard className="group h-full" maxTilt={5}>
    <article className="card flex h-full flex-col overflow-hidden hover:shadow-[var(--shadow-lift)]">
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-skeleton dark:bg-page">
        {meta.thumbnail ? (
          <Image src={meta.thumbnail} alt={d.thumbnailAlt(name)} fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
        ) : (
          <div role="img" aria-label={d.placeholderThumbnailAria} className="flex h-full flex-col items-center justify-center gap-2 text-muted">
            <ImageIcon className="size-8" aria-hidden="true" />
            <span className="micro-label font-mono">{d.placeholderThumbnail}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <p className="micro-label font-mono text-gold-ink">
          {num} / {p.category || d.placeholderCategory}
        </p>
        <h3 className={`mt-2 text-xl font-bold ${p.title ? "text-fg" : "text-faint"}`}>{name}</h3>

        <div className="mt-3">
          <TextOrSkeleton text={p.description} lines={2} className="text-sm leading-relaxed text-muted" />
        </div>

        {/* Mini case study */}
        <dl className="mt-6 grid gap-4 rounded-2xl border border-line bg-surface-inset p-4 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
          {[
            [d.caseBrief, p.brief],
            [d.caseProcess, p.process],
            [d.caseResult, p.result],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="micro-label whitespace-nowrap font-mono font-semibold text-fg">{label}</dt>
              <dd className="mt-2">
                <TextOrSkeleton text={value} lines={2} className="text-[13px] leading-relaxed text-muted md:text-sm" />
              </dd>
            </div>
          ))}
        </dl>

        {/* Tags */}
        <ul className="mt-5 flex flex-wrap gap-2" aria-label={d.tagsAria}>
          {meta.tags.length
            ? meta.tags.map((tag) => (
                <li key={tag} className="tag">
                  {tag}
                </li>
              ))
            : [16, 20, 14].map((w, i) => (
                <li key={i} aria-hidden="true" className="h-6 rounded-full border border-line bg-skeleton" style={{ width: `${w * 4}px` }} />
              ))}
        </ul>

        {/* Footer */}
        <div className="mt-auto pt-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
            <ProjectLink href={meta.detailHref} label={d.detail} name={name} ariaFor={d.linkAria} primary />
            <ProjectLink href={meta.repoHref} label={d.repo} name={name} ariaFor={d.linkAria} />
          </div>
        </div>
      </div>
    </article>
    </TiltCard>
  );
}

function ProjectLink({
  href,
  label,
  name,
  ariaFor,
  primary = false,
}: {
  href: string;
  label: string;
  name: string;
  ariaFor: Dictionary["projects"]["linkAria"];
  primary?: boolean;
}) {
  const disabled = href === "#";
  return (
    <a
      href={href}
      aria-disabled={disabled || undefined}
      aria-label={ariaFor(label, name, !disabled)}
      className={`inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-[15px] font-semibold transition-colors md:text-base ${
        primary ? "text-fg hover:bg-gold-soft" : "text-muted hover:bg-page hover:text-fg"
      } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
    >
      {primary ? null : <FolderGit2 className="size-4" aria-hidden="true" />}
      {label}
      {primary ? <ArrowRight className="size-4" aria-hidden="true" /> : null}
    </a>
  );
}

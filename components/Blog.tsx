"use client";

import Image from "next/image";
import { ArrowUpRight, CalendarDays, ImageIcon, Newspaper } from "lucide-react";
import { blogItems, showBlog, type BlogMeta } from "@/data/content";
import { useT } from "@/i18n/LanguageProvider";
import type { BlogText, Dictionary } from "@/i18n/types";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";
import { TextOrSkeleton } from "./ui/Skeleton";

/** Format tanggal deterministik (UTC) → sama di server & client, tidak ada hydration mismatch. */
function formatDate(iso: string, locale: string) {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(d);
}

export function Blog() {
  const { t } = useT();
  if (!showBlog) return null;
  const d = t.blog;
  const items: readonly (BlogMeta & { id: keyof typeof d.items })[] = blogItems;

  return (
    <section id="blog" aria-labelledby="blog-title" className="scroll-mt-24 pb-10 pt-20 md:pb-12 md:pt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading id="blog-title" label={d.label} title={d.title} subtitle={d.subtitle} />

        {items.length === 0 ? (
          <Reveal className="card mt-10 flex flex-col items-center gap-3 px-6 py-14 text-center md:mt-12">
            <span className="grid size-12 place-items-center rounded-full bg-surface-inset text-muted ring-1 ring-line">
              <Newspaper className="size-5" aria-hidden="true" />
            </span>
            <p className="text-sm font-medium text-muted">{d.emptyText}</p>
          </Reveal>
        ) : (
          <ul className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {items.map((meta) => (
              <Reveal as="li" key={meta.id} className="h-full">
                <BlogCard meta={meta} text={d.items[meta.id]} dict={d} />
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function BlogCard({ meta, text, dict: d }: { meta: BlogMeta; text: BlogText; dict: Dictionary["blog"] }) {
  const title = text.title || d.placeholderTitle;
  const available = meta.href !== "#";
  const external = !!meta.external;

  return (
    <article className="card group flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
      {/* Gambar berita */}
      <div className="relative aspect-[16/9] border-b border-line bg-skeleton dark:bg-page">
        {meta.thumbnail ? (
          <Image src={meta.thumbnail} alt={d.thumbnailAlt(title)} fill sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
        ) : (
          <div role="img" aria-label={d.placeholderThumbnailAria} className="flex h-full flex-col items-center justify-center gap-2 text-muted">
            <ImageIcon className="size-7" aria-hidden="true" />
            <span className="micro-label font-mono">{d.placeholderThumbnail}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {/* Tanggal · sumber */}
        <p className="micro-label flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-gold-ink">
          <CalendarDays className="size-3.5 shrink-0" aria-hidden="true" />
          {meta.date ? <time dateTime={meta.date}>{formatDate(meta.date, d.dateLocale)}</time> : <span>{d.placeholderDate}</span>}
          <span aria-hidden="true">·</span>
          <span>{text.source || d.placeholderSource}</span>
        </p>

        <h3 className={`mt-3 text-lg font-bold leading-snug after:mt-2 after:block after:h-px after:w-12 after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-300 group-hover:after:scale-x-100 ${text.title ? "text-fg" : "text-faint"}`}>{title}</h3>

        <div className="mt-3">
          <TextOrSkeleton text={text.excerpt} lines={3} className="text-sm leading-relaxed text-muted" />
        </div>

        <div className="mt-auto pt-6">
          <div className="border-t border-line pt-4">
            <a
              href={meta.href}
              {...(external && available ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-disabled={!available || undefined}
              aria-label={d.readMoreAria(title, available, external)}
              className={`-ml-3 inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-[15px] font-semibold text-fg transition-colors hover:bg-gold-soft md:text-base ${
                available ? "" : "cursor-not-allowed opacity-60"
              }`}
            >
              {d.readMore} <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

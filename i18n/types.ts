import type { BlogId, ExperienceId, NavId, ProjectId } from "@/data/content";

export const LANGS = ["id", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "id";
export const LANG_STORAGE_KEY = "lang";

/** Kartu info di section About. `href` opsional → nilai jadi link (mis. mailto:). */
export type InfoItem = { label: string; value: string; href?: string };

export type ProjectText = {
  /** Kosongkan string untuk menampilkan skeleton. */
  title: string;
  category: string;
  description: string;
  brief: string;
  process: string;
  result: string;
};

export type ExperienceText = { title: string; description: string };
export type BlogText = {
  /** Kosongkan string untuk menampilkan skeleton. */
  title: string;
  excerpt: string;
  /** Nama media / sumber berita, mis. "Kompas.com" atau "Website Sekolah". */
  source: string;
};
export type SkillGroupId = "cloud" | "devops" | "network" | "system" | "soft";

/**
 * Satu-satunya sumber struktur kamus. id.ts dan en.ts sama-sama bertipe Dictionary,
 * jadi key yang terlewat / berlebih langsung jadi error TypeScript.
 */
export type Dictionary = {
  meta: {
    title: string;
    description: string;
    tagline: string;
    ogLocale: string;
  };
  common: {
    skipToContent: string;
    contentPending: string;
  };
  nav: {
    items: Record<NavId, string>;
    mainAria: string;
    footerAria: string;
    homeAria: string;
    openMenu: string;
    closeMenu: string;
    downloadCv: string;
    preferences: string;
  };
  controls: {
    languageAria: string;
    languageNames: Record<Lang, string>;
    themeAria: string;
    themeToDark: string;
    themeToLight: string;
  };
  hero: {
    label: string;
    intro: string;
    roles: string[];
    photoAlt: string;
    photoPlaceholder: string;
    photoPlaceholderAria: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaTertiary: string;
  };
  about: {
    label: string;
    title: string;
    paragraph: string;
    info: InfoItem[];
  };
  skills: {
    label: string;
    title: string;
    subtitle: string;
    groups: { id: SkillGroupId; title: string; tags: string[] }[];
  };
  projects: {
    label: string;
    title: string;
    subtitle: string;
    placeholderName: string;
    placeholderCategory: string;
    placeholderThumbnail: string;
    placeholderThumbnailAria: string;
    thumbnailAlt: (name: string) => string;
    caseBrief: string;
    caseProcess: string;
    caseResult: string;
    tagsAria: string;
    detail: string;
    repo: string;
    linkAria: (label: string, name: string, available: boolean) => string;
    items: Record<ProjectId, ProjectText>;
  };
  experience: {
    label: string;
    title: string;
    subtitle: string;
    highlightLabel: string;
    placeholderYear: string;
    placeholderTitle: string;
    achievementAria: string;
    items: Record<ExperienceId, ExperienceText>;
  };
  blog: {
    label: string;
    title: string;
    subtitle: string;
    emptyText: string;
    /** Locale BCP 47 untuk format tanggal, mis. "id-ID". */
    dateLocale: string;
    placeholderTitle: string;
    placeholderSource: string;
    placeholderDate: string;
    placeholderThumbnail: string;
    placeholderThumbnailAria: string;
    thumbnailAlt: (title: string) => string;
    readMore: string;
    readMoreAria: (title: string, available: boolean, external: boolean) => string;
    items: Record<BlogId, BlogText>;
  };
  contact: {
    label: string;
    title: string;
    text: string;
    whatsappSr: string;
    socialAria: string;
    form: {
      aria: string;
      name: string;
      email: string;
      message: string;
      namePlaceholder: string;
      emailPlaceholder: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
      success: string;
      sendAnother: string;
      errors: { name: string; email: string; message: string };
    };
  };
};

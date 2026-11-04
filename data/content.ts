/**
 * DATA NON-TEKS: link, id, ikon, gambar, kontak.
 * Semua teks yang tampil di halaman ada di kamus bahasa: i18n/id.ts dan i18n/en.ts.
 *
 * Item project / pengalaman / testimoni dipasangkan dengan teksnya lewat `id`.
 * Menambah item di sini → TypeScript akan error sampai teksnya ditambahkan di kedua kamus.
 */

/* ============================== SITE ============================== */

export const site = {
  name: "Diaz Pilandrika Setiawan",
  shortName: "Diaz Pilandrika",
  initials: "DP",
  url: "https://example.com", // TODO: ganti dengan domain asli
  cvHref: "#", // TODO: mis. "/cv-diaz-pilandrika.pdf" di folder /public
  year: 2026,
};

/** Anchor section tetap sama di kedua bahasa (tidak ada routing per bahasa). */
export const navItems = [
  { id: "home", href: "#beranda" },
  { id: "about", href: "#tentang" },
  { id: "skills", href: "#skills" },
  { id: "projects", href: "#project" },
  { id: "experience", href: "#pengalaman" },
  { id: "blog", href: "#blog" },
  { id: "contact", href: "#kontak" },
] as const;
export type NavId = (typeof navItems)[number]["id"];

/* ============================== HERO ============================== */

export const hero = {
  photo: "/images/profile.jpg",
  ctaPrimaryHref: "#project",
  ctaTertiaryHref: "#kontak",
};

/* ============================== SKILLS ============================== */

export const skillIds = ["network", "cloud", "server"] as const;
export type SkillId = (typeof skillIds)[number];

/* ============================== PROJECT ============================== */

export type ProjectMeta = {
  id: string;
  featured?: boolean;
  thumbnail?: string; // path di /public, mis. "/projects/homelab.png"
  tags: readonly string[];
  detailHref: string;
  repoHref: string;
};

// TODO: isi data project asli. Teks (judul, deskripsi, brief, dll.) ada di i18n/*.ts → projects.items.
export const projectItems = [
  { id: "p1", featured: false, tags: [], detailHref: "#", repoHref: "#" },
  { id: "p2", featured: false, tags: [], detailHref: "#", repoHref: "#" },
  { id: "p3", featured: false, tags: [], detailHref: "#", repoHref: "#" },
  { id: "p4", featured: false, tags: [], detailHref: "#", repoHref: "#" },
] as const satisfies readonly ProjectMeta[];
export type ProjectId = (typeof projectItems)[number]["id"];

/* ============================== PENGALAMAN ============================== */

export type ExperienceMeta = {
  id: string;
  /** Kosong = ditampilkan sebagai placeholder. */
  year: string;
  /** Node highlight (navy + emas + ikon piala) untuk Target/Pencapaian. */
  highlight?: boolean;
};

// TODO: isi tahun di sini, judul & deskripsi di i18n/*.ts → experience.items.
export const experienceItems = [
  { id: "e1", year: "" },
  { id: "e2", year: "" },
  { id: "e3", year: "" },
  { id: "e4", year: "", highlight: true },
] as const satisfies readonly ExperienceMeta[];
export type ExperienceId = (typeof experienceItems)[number]["id"];

/* ============================== BLOG / BERITA ============================== */

/** Set false untuk menyembunyikan seluruh section blog. */
export const showBlog = true;

export type BlogMeta = {
  id: string;
  /** Tanggal terbit format ISO "YYYY-MM-DD". Kosong = placeholder. Ditampilkan sesuai bahasa aktif. */
  date: string;
  thumbnail?: string; // path di /public, mis. "/blog/juara-lks.jpg"
  /** Link ke artikel/berita. "#" = belum tersedia. */
  href: string;
  /** true jika link mengarah ke situs berita luar (dibuka di tab baru). */
  external?: boolean;
};

/**
 * TODO: isi berita tentang Anda. Judul, ringkasan & nama media ada di i18n/*.ts → blog.items.
 * - Array kosong [] → tampil empty state.
 * - String kosong → tampil kartu skeleton (mode mockup).
 */
export const blogItems = [
  { id: "b1", date: "", href: "#" },
  { id: "b2", date: "", href: "#" },
  { id: "b3", date: "", href: "#" },
] as const satisfies readonly BlogMeta[];
export type BlogId = (typeof blogItems)[number]["id"];

/* ============================== KONTAK ============================== */

export const contact = {
  email: "email@domain.com", // TODO
  phone: "+62 812-0000-0000", // TODO
  whatsappHref: "#", // TODO: mis. "https://wa.me/6281200000000"
  socials: [
    { label: "LinkedIn", href: "#", icon: "linkedin" },
    { label: "GitHub", href: "#", icon: "github" },
    { label: "Instagram", href: "#", icon: "instagram" },
  ] as const,
};

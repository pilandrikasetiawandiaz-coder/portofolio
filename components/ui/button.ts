/** Kelas tombol bersama supaya hover/focus konsisten di semua section. */
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 min-h-11 px-6 text-sm";

export const btn = {
  gold: `${base} bg-gold text-navy hover:bg-gold-hover`,
  outlineWhite: `${base} border border-on-navy/40 text-on-navy hover:border-on-navy hover:bg-on-navy/10`,
  outlineNavy: `${base} border border-line bg-surface text-fg hover:border-fg/40 hover:bg-page`,
  textLight: "inline-flex items-center gap-1.5 min-h-11 px-2 text-sm font-semibold text-on-navy underline-offset-4 hover:text-gold hover:underline",
};

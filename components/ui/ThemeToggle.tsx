"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useT } from "@/i18n/LanguageProvider";

/** Toggle terang/gelap. Ikon ditukar via CSS (class .dark) → tidak ada hydration mismatch. */
export function ThemeToggle() {
  const { t } = useT();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  function toggle() {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      root.classList.add("theme-transition");
      window.setTimeout(() => root.classList.remove("theme-transition"), 250);
    }
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  const hint = isDark ? t.controls.themeToLight : t.controls.themeToDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.controls.themeAria}
      aria-pressed={mounted ? isDark : undefined}
      title={mounted ? hint : undefined}
      className="nav-control relative grid size-10 shrink-0 place-items-center rounded-xl border text-on-navy transition-colors duration-200 hover:border-gold/60 hover:bg-on-navy/10 hover:text-gold"
    >
      <Moon
        aria-hidden="true"
        className="col-start-1 row-start-1 size-[18px] transition-[rotate,scale,opacity] duration-200 dark:-rotate-90 dark:scale-50 dark:opacity-0"
      />
      <Sun
        aria-hidden="true"
        className="col-start-1 row-start-1 size-[18px] rotate-90 scale-50 opacity-0 transition-[rotate,scale,opacity] duration-200 dark:rotate-0 dark:scale-100 dark:opacity-100"
      />
    </button>
  );
}

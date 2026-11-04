"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navItems, site } from "@/data/content";
import { useT } from "@/i18n/LanguageProvider";
import { btn } from "./ui/button";
import { LanguageSwitch } from "./ui/LanguageSwitch";
import { ThemeToggle } from "./ui/ThemeToggle";
import { motion, useScroll, useTransform } from "framer-motion";

export function Navbar() {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>(navItems[0].href);
  const { scrollY } = useScroll();
  const navScale = useTransform(scrollY, [0, 40], [1, 0.96]);

  // Tandai menu aktif sesuai section yang terlihat
  useEffect(() => {
    const sections = navItems
      .map((n) => document.querySelector<HTMLElement>(n.href))
      .filter((s): s is HTMLElement => !!s);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Escape menutup menu mobile
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[100] px-4 pt-4">
      <motion.nav
        aria-label={t.nav.mainAria}
        className="nav-surface mx-auto max-w-6xl rounded-full border px-3 py-2 shadow-lg shadow-navy/20 backdrop-blur-xl data-[open=true]:rounded-3xl"
        style={{ scale: navScale }}
        data-open={open}
      >
        <div className="flex items-center justify-between gap-4">
          <a href="#beranda" aria-label={`${site.shortName} — ${t.nav.homeAria}`} className="flex items-center gap-2.5 rounded-full pr-2">
            <span className="grid size-9 place-items-center rounded-full border border-gold/70 bg-navy-900 text-[15px] font-bold text-gold">
              {site.initials}
            </span>
            <span className="whitespace-nowrap text-[15px] font-semibold text-on-navy lg:max-xl:sr-only">{site.shortName}</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block whitespace-nowrap rounded-full px-3 py-2 text-[15px] transition-colors lg:px-2.5 xl:px-3.5 ${
                      isActive ? "nav-link-active" : "nav-link"
                    }`}
                  >
                    {t.nav.items[item.id]}
                    {isActive ? (
                      <motion.span
                        aria-hidden="true"
                        layoutId="active-nav-underline"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gold lg:inset-x-2.5 xl:inset-x-3.5"
                        transition={{ type: "spring", stiffness: 360, damping: 32 }}
                      />
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden items-center gap-2 lg:flex">
              <LanguageSwitch />
              <ThemeToggle />
            </div>
            <a
              href={site.cvHref}
              className="hidden min-h-9 items-center gap-1.5 whitespace-nowrap rounded-full border border-gold px-4 text-[15px] font-semibold text-gold transition-colors hover:bg-gold hover:text-navy sm:inline-flex"
            >
              {t.nav.downloadCv} <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full text-on-navy hover:bg-on-navy/10 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

        {open && (
          <ul id="mobile-menu" className="flex flex-col gap-1 px-2 pb-3 pt-3 lg:hidden">
            <li className="mb-2 flex items-center justify-between gap-3 border-b border-on-navy/10 px-3 pb-3">
              <span className="nav-mobile-preferences text-[15px] font-medium">{t.nav.preferences}</span>
              <span className="flex items-center gap-2">
                <LanguageSwitch />
                <ThemeToggle />
              </span>
            </li>
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`nav-mobile-link block rounded-xl px-3 py-3 text-[15px] ${
                    active === item.href ? "nav-mobile-link-active bg-on-navy/10" : "hover:bg-on-navy/5"
                  }`}
                >
                  {t.nav.items[item.id]}
                </a>
              </li>
            ))}
            <li className="pt-2 sm:hidden">
              <a href={site.cvHref} className={`${btn.gold} w-full`}>
                {t.nav.downloadCv} <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </li>
          </ul>
        )}
      </motion.nav>
    </header>
  );
}

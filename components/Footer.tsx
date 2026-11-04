"use client";

import { navItems, site } from "@/data/content";
import { useT } from "@/i18n/LanguageProvider";
import { motion, useReducedMotion } from "framer-motion";
import { motionDuration } from "@/lib/motion";

export function Footer() {
  const { t } = useT();
  const reduceMotion = useReducedMotion();
  return (
    <footer className="bg-navy text-on-navy">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-8 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left">
        <p className="text-sm">
          <span className="font-semibold">{site.shortName}</span>
          <span className="text-on-navy/70"> — {t.meta.tagline}</span>
        </p>
        <nav aria-label={t.nav.footerAria}>
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {navItems.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-sm text-on-navy/70 underline-offset-4 hover:text-gold hover:underline">
                  {t.nav.items[n.id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-on-navy/70">
          <span title="Online">
            <motion.span
              aria-hidden="true"
              animate={reduceMotion ? { opacity: 1 } : { opacity: [0.55, 1, 0.55] }}
              transition={reduceMotion ? { duration: 0 } : { duration: motionDuration.onlinePulse, repeat: Infinity }}
              className="mr-2 inline-block size-2 rounded-full bg-gold align-middle"
            />
            <span className="sr-only">Online</span>
          </span>
          © {site.year} {site.shortName}
        </p>
      </div>
    </footer>
  );
}

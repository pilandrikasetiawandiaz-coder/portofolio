"use client";

import { useT } from "@/i18n/LanguageProvider";

export function SkipLink() {
  const { t } = useT();
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:font-semibold focus:text-navy"
    >
      {t.common.skipToContent}
    </a>
  );
}

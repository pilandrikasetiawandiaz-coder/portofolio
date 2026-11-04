"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import { LanguageProvider } from "@/i18n/LanguageProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    // Preferensi reduce-motion dari OS menenangkan transform; fade ringan tetap berjalan.
    <MotionConfig reducedMotion="user">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        storageKey="theme"
        // Script anti-flash hanya dieksekusi dari HTML server; di client ditandai text/plain
        // supaya React tidak memberi peringatan "script tag" (pola dari docs Next 16).
        scriptProps={{ type: typeof window === "undefined" ? "text/javascript" : "text/plain" }}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}

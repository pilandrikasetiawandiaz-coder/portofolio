"use client";

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from "react";
import { en } from "./en";
import { id } from "./id";
import { DEFAULT_LANG, LANG_STORAGE_KEY, LANGS, type Dictionary, type Lang } from "./types";

const dictionaries: Record<Lang, Dictionary> = { id, en };

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const isLang = (v: unknown): v is Lang => typeof v === "string" && (LANGS as readonly string[]).includes(v);

/** Preferensi tersimpan → navigator.language ("en*" → en) → default "id". */
function detectLang(): Lang {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {}
  return navigator.language?.toLowerCase().startsWith("en") ? "en" : DEFAULT_LANG;
}

/** Inline script di <head>: set <html lang> sebelum paint (logika sama dengan detectLang). */
export const langInitScript = `(function(){try{var l=localStorage.getItem(${JSON.stringify(LANG_STORAGE_KEY)});if(l!=="id"&&l!=="en"){l=(navigator.language||"").toLowerCase().indexOf("en")===0?"en":${JSON.stringify(DEFAULT_LANG)}}document.documentElement.lang=l}catch(e){}})()`;

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Server & hidrasi pertama selalu pakai default → tidak ada hydration mismatch.
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useLayoutEffect(() => {
    const detected = detectLang();
    if (detected !== DEFAULT_LANG) setLangState(detected);
  }, []);

  const t = dictionaries[lang];

  // Sinkronkan <html lang>, judul tab, dan meta description.
  // Next menulis <title>/meta dari `metadata` setelah hidrasi, jadi pantau <head>
  // dan terapkan ulang nilai bahasa aktif bila tertimpa.
  useEffect(() => {
    const setMeta = (sel: string, v: string) => {
      const el = document.querySelector(sel);
      if (el && el.getAttribute("content") !== v) el.setAttribute("content", v);
    };
    const apply = () => {
      if (document.documentElement.lang !== lang) document.documentElement.lang = lang;
      if (document.title !== t.meta.title) document.title = t.meta.title;
      setMeta('meta[name="description"]', t.meta.description);
      setMeta('meta[property="og:title"]', t.meta.title);
      setMeta('meta[property="og:description"]', t.meta.description);
      setMeta('meta[property="og:locale"]', t.meta.ogLocale);
    };
    apply();
    const mo = new MutationObserver(apply);
    mo.observe(document.head, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["content"] });
    return () => mo.disconnect();
  }, [lang, t]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {}
  }, []);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

/** `const { t, lang, setLang } = useT();` */
export function useT(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useT() harus dipakai di dalam <LanguageProvider>.");
  return ctx;
}

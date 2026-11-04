"use client";

import { useRef, type KeyboardEvent } from "react";
import { useT } from "@/i18n/LanguageProvider";
import type { Lang } from "@/i18n/types";

const OPTIONS: Lang[] = ["en", "id"];

/** Pill segmented EN | ID dengan thumb emas yang bergeser (radiogroup, roving tabindex). */
export function LanguageSwitch() {
  const { t, lang, setLang } = useT();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = OPTIONS.indexOf(lang);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    let next = activeIndex;
    if (e.key === "Home") next = 0;
    else if (e.key === "End") next = OPTIONS.length - 1;
    else next = (activeIndex + (e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 1) + OPTIONS.length) % OPTIONS.length;
    setLang(OPTIONS[next]);
    refs.current[next]?.focus();
  }

  return (
    <div
      role="radiogroup"
      aria-label={t.controls.languageAria}
      onKeyDown={onKeyDown}
      className="relative inline-grid h-10 shrink-0 grid-cols-2 rounded-full border border-white/15 p-1"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-gold shadow-sm transition-transform duration-200 ease-out"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />
      {OPTIONS.map((code, i) => {
        const active = code === lang;
        return (
          <button
            key={code}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={t.controls.languageNames[code]}
            tabIndex={active ? 0 : -1}
            lang={code}
            onClick={() => setLang(code)}
            className={`relative z-10 min-w-10 rounded-full px-2.5 text-[15px] font-mono font-semibold transition-colors duration-200 ${
              active ? "text-navy" : "nav-language-idle"
            }`}
          >
            {code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}

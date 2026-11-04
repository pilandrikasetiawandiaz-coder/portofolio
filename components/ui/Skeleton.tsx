"use client";

import { useT } from "@/i18n/LanguageProvider";

/** Garis skeleton untuk slot konten yang belum diisi. */
export function SkeletonLine({
  className = "w-full",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`block h-2.5 rounded-full ${dark ? "bg-on-navy/15" : "bg-skeleton"} ${className}`}
    />
  );
}

/** Teks jika ada, skeleton jika kosong. */
export function TextOrSkeleton({
  text,
  lines = 1,
  className = "",
  dark = false,
}: {
  text: string;
  lines?: number;
  className?: string;
  dark?: boolean;
}) {
  const { t } = useT();
  if (text) return <p className={className}>{text}</p>;
  const widths = ["w-full", "w-4/5", "w-3/5"];
  return (
    <span className="flex flex-col gap-2 py-1">
      <span className="sr-only">{t.common.contentPending}</span>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine key={i} dark={dark} className={widths[i % widths.length]} />
      ))}
    </span>
  );
}

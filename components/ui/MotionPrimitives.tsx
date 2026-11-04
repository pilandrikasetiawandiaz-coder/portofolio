"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { hoverSpring, trackingSpring } from "@/lib/motion";

const pointerQuery = "(hover: hover) and (pointer: fine)";

export function Typewriter({ words }: { words: string[] }) {
  const reduceMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const currentWord = words[wordIndex] ?? "";
  const longestWord = words.reduce((longest, word) => word.length > longest.length ? word : longest, "");

  useEffect(() => {
    if (reduceMotion) {
      setLength(currentWord.length);
      return;
    }
    const finishedTyping = !deleting && length === currentWord.length;
    const timer = window.setTimeout(
      () => {
        if (!deleting && length < currentWord.length) {
          setLength((value) => value + 1);
        } else if (finishedTyping) {
          setDeleting(true);
        } else if (deleting && length > 0) {
          setLength((value) => value - 1);
        } else {
          setDeleting(false);
          setWordIndex((value) => (value + 1) % words.length);
        }
      },
      finishedTyping ? 1050 : deleting ? 48 : 92,
    );
    return () => window.clearTimeout(timer);
  }, [currentWord.length, deleting, length, reduceMotion, words.length]);

  return (
    <span aria-label={words.join(", ")} className="inline-grid align-middle">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {longestWord}{" "}
      </span>
      <span aria-hidden="true" className="col-start-1 row-start-1 whitespace-nowrap">
        {currentWord.slice(0, length)}
        <span className="ml-0.5 inline-block h-[1em] w-px translate-y-0.5 animate-pulse bg-gold" />
      </span>
    </span>
  );
}

export function MagneticLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className: string;
}) {
  const reduceMotion = useReducedMotion();
  const x = useSpring(useMotionValue(0), hoverSpring);
  const y = useSpring(useMotionValue(0), hoverSpring);

  function move(event: React.PointerEvent<HTMLAnchorElement>) {
    if (reduceMotion || !window.matchMedia(pointerQuery).matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(Math.max(-10, Math.min(10, (event.clientX - rect.left - rect.width / 2) * 0.18)));
    y.set(Math.max(-10, Math.min(10, (event.clientY - rect.top - rect.height / 2) * 0.18)));
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.a href={href} className={className} style={{ x, y }} onPointerMove={move} onPointerLeave={reset}>
      {children}
    </motion.a>
  );
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 8,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), hoverSpring);
  const rotateY = useSpring(useMotionValue(0), hoverSpring);

  function move(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || !window.matchMedia(pointerQuery).matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * maxTilt * 2);
    rotateY.set(x * maxTilt * 2);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}

export function SpotlightCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const x = useSpring(useMotionValue(-300), hoverSpring);
  const y = useSpring(useMotionValue(-300), hoverSpring);
  const [active, setActive] = useState(false);

  function move(event: React.PointerEvent<HTMLDivElement>) {
    if (reduceMotion || !window.matchMedia(pointerQuery).matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX - rect.left - 120);
    y.set(event.clientY - rect.top - 120);
    setActive(true);
  }

  return (
    <motion.div
      className={`group relative isolate overflow-hidden ${className}`}
      whileHover={{ y: -6 }}
      transition={hoverSpring}
      onPointerMove={move}
      onPointerLeave={() => setActive(false)}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-0 size-60 rounded-full"
        style={{
          x,
          y,
          opacity: active ? 1 : 0,
          background: "var(--gold-spotlight)",
        }}
        transition={{ opacity: { duration: 0.2 } }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

export function GarudaMascot() {
  const reduceMotion = useReducedMotion();
  const x = useSpring(useMotionValue(0), trackingSpring);
  const y = useSpring(useMotionValue(0), trackingSpring);

  useEffect(() => {
    const media = window.matchMedia(pointerQuery);
    if (reduceMotion || !media.matches) return;
    const onPointerMove = (event: PointerEvent) => {
      x.set(Math.max(-18, Math.min(18, (event.clientX / window.innerWidth - 0.5) * 36)));
      y.set(Math.max(-12, Math.min(12, (event.clientY / window.innerHeight - 0.5) * 24)));
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [reduceMotion, x, y]);

  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 96 72"
      className="pointer-events-none absolute -right-4 top-4 hidden w-20 text-gold drop-shadow-lg lg:block"
      style={{ x, y }}
      fill="none"
    >
      <path d="M47 36C34 18 18 12 3 12c12 7 19 16 22 27-9-5-16-6-23-4 11 4 17 10 21 19 8-2 15-7 24-18Z" fill="currentColor" />
      <path d="M49 36c13-18 29-24 44-24-12 7-19 16-22 27 9-5 16-6 23-4-11 4-17 10-21 19-8-2-15-7-24-18Z" fill="currentColor" />
      <path d="m43 32 5-10 5 10 8 8-13 22-13-22 8-8Z" fill="currentColor" />
      <circle cx="48" cy="33" r="2" fill="var(--navy)" />
    </motion.svg>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { easeOut, maskRevealVariants, motionDuration, pointerSpring } from "@/lib/motion";

export function GlobalMotionEffects() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.25 });
  const gridY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 72]);
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const pointerX = useSpring(useMotionValue(-500), pointerSpring);
  const pointerY = useSpring(useMotionValue(-500), pointerSpring);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updatePointerMode = () => setHasFinePointer(media.matches && !reduceMotion);
    updatePointerMode();
    media.addEventListener("change", updatePointerMode);

    const onPointerMove = (event: PointerEvent) => {
      if (!media.matches || reduceMotion) return;
      pointerX.set(event.clientX - 260);
      pointerY.set(event.clientY - 260);
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      media.removeEventListener("change", updatePointerMode);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gold"
        style={{ scaleX: progress }}
      />
      <motion.div
        aria-hidden="true"
        className="motion-grid pointer-events-none fixed inset-0 z-[5]"
        style={{ y: gridY }}
      />
      {hasFinePointer ? (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[55] size-[520px] rounded-full opacity-100"
          style={{
            x: pointerX,
            y: pointerY,
            background: "var(--gold-cursor-spotlight)",
          }}
        />
      ) : null}
    </>
  );
}

export function MotionHeading({
  label,
  title,
  dark = false,
  titleId,
  titleClassName = "",
}: {
  label: string;
  title: string;
  dark?: boolean;
  titleId?: string;
  titleClassName?: string;
}) {
  const reduceMotion = useReducedMotion();
  const headingRef = useRef<HTMLDivElement>(null);
  const labelInView = useInView(headingRef, { once: true, amount: 0.3 });
  const [scrambled, setScrambled] = useState(label);
  const [motionReady, setMotionReady] = useState(false);

  useEffect(() => {
    setMotionReady(true);
  }, []);

  useEffect(() => {
    if (reduceMotion || !labelInView) return;
    const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const started = performance.now();
    const duration = motionDuration.scramble * 1000;
    const timer = window.setInterval(() => {
      const progress = Math.min(1, (performance.now() - started) / duration);
      const settled = Math.floor(progress * label.length);
      setScrambled(
        label
          .split("")
          .map((character, index) => {
            if (character === " " || index < settled) return character;
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join(""),
      );
      if (progress === 1) {
        window.clearInterval(timer);
        setScrambled(label);
      }
    }, 36);
    return () => window.clearInterval(timer);
  }, [label, labelInView, reduceMotion]);

  return (
    <div ref={headingRef}>
      <p className={`section-label ${dark ? "on-dark" : ""}`}>
        <span className="sr-only">{label}</span>
        <span aria-hidden="true">{reduceMotion ? label : scrambled}</span>
      </p>
      <h2
        id={titleId}
        className={`mt-3 font-bold tracking-tight ${titleClassName || "text-3xl sm:text-4xl"} ${dark ? "text-on-navy" : "text-fg"}`}
      >
        <motion.span
          className="block pb-[0.15em]"
          variants={maskRevealVariants}
          initial={reduceMotion || !motionReady ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={reduceMotion ? { duration: 0 } : { duration: motionDuration.standard, ease: easeOut }}
        >
          {title}
        </motion.span>
      </h2>
    </div>
  );
}

export function IntroLoader() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.sessionStorage.getItem("dp-intro-seen")) return;
    window.sessionStorage.setItem("dp-intro-seen", "1");
    setVisible(true);
    const timeout = window.setTimeout(() => setVisible(false), 760);
    return () => window.clearTimeout(timeout);
  }, [reduceMotion]);

  if (!visible) return null;
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100] grid place-items-center bg-navy"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: motionDuration.intro - motionDuration.introFade, duration: motionDuration.introFade, ease: "easeOut" }}
      onAnimationComplete={() => setVisible(false)}
    >
      <motion.span
        className="font-mono text-4xl font-bold tracking-[0.18em] text-gold"
        initial={{ opacity: 0, scale: 0.55 }}
        animate={{ opacity: [0, 1, 0], scale: [0.55, 1.12, 1.35] }}
        transition={{ duration: motionDuration.introMark, ease: "easeOut" }}
      >
        DP
      </motion.span>
    </motion.div>
  );
}

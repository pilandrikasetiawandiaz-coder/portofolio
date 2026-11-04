import type { Transition, Variants } from "framer-motion";

export const motionDuration = {
  fast: 0.5,
  standard: 0.6,
  intro: 0.76,
  introFade: 0.18,
  introMark: 0.7,
  scramble: 0.6,
  pulse: 0.65,
  shine: 1.2,
  draw: 0.55,
  drawCheck: 0.45,
  filter: 0.5,
  onlinePulse: 2.4,
} as const;

export const easeOut = [0.22, 1, 0.36, 1] as const;
export const easeInOut = "easeInOut" as const;

export const scrollSpring: Transition = {
  stiffness: 90,
  damping: 26,
  mass: 0.3,
};

export const pointerSpring: Transition = {
  stiffness: 120,
  damping: 28,
  mass: 0.35,
};

export const trackingSpring: Transition = {
  stiffness: 90,
  damping: 22,
};

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDuration.standard, ease: easeOut },
  },
};

export const maskRevealVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDuration.standard, ease: easeOut },
  },
};

export const profilePhotoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: motionDuration.standard, ease: easeOut },
  },
};

export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDuration.standard, ease: easeOut },
  },
};

export const hoverSpring: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 24,
};

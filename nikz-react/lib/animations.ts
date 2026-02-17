import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { opacity: 0, y: 20 },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const slideInFromLeft: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
};

export const slideInFromRight: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
};

// Hero orchestrated sequence timing
export const HERO_SEQUENCE = {
  background: { delay: 0, duration: 1.2 },
  logo: { delay: 0.2, duration: 0.8 },
  title: { delay: 0.5, duration: 1.0 },
  subtitle: { delay: 0.8, duration: 0.8 },
  codeBlock: { delay: 1.1, duration: 1.2, stagger: 0.05 },
  cta: { delay: 2.0, duration: 0.6 },
} as const;

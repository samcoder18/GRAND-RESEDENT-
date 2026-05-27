import type { Variants } from 'motion/react';

export const motionEase = [0.16, 1, 0.3, 1] as const;

export const viewportOnce = {
  once: true,
  amount: 0.24,
  margin: '-10% 0px',
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: motionEase },
  },
};

export const revealGroup: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};

export const softScale: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: motionEase },
  },
};

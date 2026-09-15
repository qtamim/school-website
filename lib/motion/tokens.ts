import type { Transition } from "framer-motion";

/** Expo-out: quick departure, long soft settle. The house curve for reveals. */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Symmetric curve for looping decorative motion. */
export const EASE_SOFT: [number, number, number, number] = [0.45, 0, 0.55, 1];

export const DURATION = {
  fast: 0.45,
  base: 0.75,
  slow: 1.1,
} as const;

/** How far an element travels before settling, in px. */
export const DISTANCE = {
  sm: 18,
  base: 30,
  lg: 56,
} as const;

/**
 * Reveals fire once, as soon as a fifth of the element is on screen.
 * Deliberately no negative bottom margin: that shrinks the detection root and
 * leaves anything in the last strip of the page (the footer copyright) unable
 * to intersect at maximum scroll, so it would never reveal.
 */
export const VIEWPORT = {
  once: true,
  amount: 0.2,
} satisfies { once: boolean; amount: number };

export function revealTransition(
  delay = 0,
  duration: number = DURATION.base
): Transition {
  return { duration, delay, ease: EASE_OUT };
}

/** Cover-then-reveal curtain used when moving between routes. */
export const PAGE_TRANSITION = {
  cover: 0.55,
  reveal: 0.72,
  content: 0.8,
} as const;

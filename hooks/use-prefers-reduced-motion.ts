"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * Whether the visitor asked for reduced motion.
 *
 * Framer's own `useReducedMotion` is deliberately not used: it reads
 * `(prefers-reduced-motion)` in boolean context once, caches it in module
 * state, and never re-reads it, which reports incorrectly in some embedded
 * browsers. `useSyncExternalStore` keeps this SSR-safe and reactive instead.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false
  );
}

"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useContext, type ReactNode } from "react";
import type { Direction } from "@/lib/i18n/config";

/**
 * +1 for LTR, -1 for RTL. Multiplying a horizontal offset by this lets a
 * primitive ask for "comes in from the start edge" and get the right physical
 * direction in Arabic and English alike.
 */
const DirectionFactorContext = createContext(1);

export function useDirectionFactor() {
  return useContext(DirectionFactorContext);
}

export function MotionProvider({
  dir,
  children,
}: {
  dir: Direction;
  children: ReactNode;
}) {
  return (
    <DirectionFactorContext.Provider value={dir === "rtl" ? -1 : 1}>
      {/* "user" honours prefers-reduced-motion: transforms are dropped, opacity kept. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </DirectionFactorContext.Provider>
  );
}

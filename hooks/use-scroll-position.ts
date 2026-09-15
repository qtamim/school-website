"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

/**
 * True once the page has scrolled past the hero's transparent zone.
 * Reads framer's shared scroll motion value, so it neither adds its own
 * listener nor re-renders on every frame.
 */
export function useScrollPosition(threshold = 100) {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > threshold);
  });

  return isScrolled;
}

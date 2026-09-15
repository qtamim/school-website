"use client";

import { motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { useDirectionFactor } from "@/components/motion/motion-provider";
import { DISTANCE, DURATION, VIEWPORT, revealTransition } from "@/lib/motion/tokens";

/** "start"/"end" follow the reading direction; "up"/"down" are vertical. */
export type RevealFrom = "up" | "down" | "start" | "end" | "none";

export function revealOffset(from: RevealFrom, distance: number, factor: number) {
  switch (from) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "start":
      return { x: -distance * factor };
    case "end":
      return { x: distance * factor };
    case "none":
      return {};
  }
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  from?: RevealFrom;
  distance?: number;
  delay?: number;
  duration?: number;
  /**
   * Adds a focus-pull. Only use on text: a non-`none` filter creates a
   * containing block, which would re-anchor absolutely positioned children.
   */
  blur?: boolean;
};

/** Fades and slides its children in once, the first time they scroll into view. */
export function Reveal({
  children,
  className,
  from = "up",
  distance = DISTANCE.base,
  delay = 0,
  duration = DURATION.base,
  blur = false,
}: RevealProps) {
  const factor = useDirectionFactor();
  const [settled, setSettled] = useState(false);

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...revealOffset(from, distance, factor),
        ...(blur ? { filter: "blur(10px)" } : {}),
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        ...(blur ? { filter: "blur(0px)" } : {}),
      }}
      viewport={VIEWPORT}
      transition={revealTransition(delay, duration)}
      onAnimationComplete={() => setSettled(true)}
      // Drop the spent filter so it stops holding a GPU layer and a containing block.
      style={settled && blur ? { filter: "none" } : undefined}
    >
      {children}
    </motion.div>
  );
}

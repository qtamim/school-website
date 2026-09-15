"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { useDirectionFactor } from "@/components/motion/motion-provider";
import { revealOffset, type RevealFrom } from "@/components/motion/reveal";
import { DISTANCE, DURATION, VIEWPORT, revealTransition } from "@/lib/motion/tokens";

/**
 * Orchestrates its direct children. A child opts in by spreading
 * `useStaggerItemVariants()` onto its own motion element and leaving
 * `initial`/`animate` unset, so it inherits this group's state.
 */
export function StaggerGroup({
  children,
  className,
  stagger = 0.12,
  delayChildren = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function useStaggerItemVariants(
  from: RevealFrom = "up",
  distance: number = DISTANCE.base
): Variants {
  const factor = useDirectionFactor();

  return {
    hidden: { opacity: 0, ...revealOffset(from, distance, factor) },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: revealTransition(0, DURATION.base),
    },
  };
}

/** Generic wrapper for children that are not motion components themselves. */
export function StaggerItem({
  children,
  className,
  from = "up",
  distance = DISTANCE.base,
}: {
  children: ReactNode;
  className?: string;
  from?: RevealFrom;
  distance?: number;
}) {
  const variants = useStaggerItemVariants(from, distance);

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

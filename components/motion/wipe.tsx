"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { DURATION, EASE_OUT, VIEWPORT } from "@/lib/motion/tokens";

/**
 * Draws a full-width element in by scaling it along X.
 * `origin` is a physical edge, matching the stripe artwork it wraps, which the
 * design pins to physical edges in both reading directions.
 */
export function Wipe({
  children,
  className,
  origin = "left",
  trigger = "view",
  delay = 0,
  duration = DURATION.slow,
}: {
  children: ReactNode;
  className?: string;
  origin?: "left" | "right";
  trigger?: "mount" | "view";
  delay?: number;
  duration?: number;
}) {
  const animation = {
    initial: { scaleX: 0 },
    transition: { duration, delay, ease: EASE_OUT },
    ...(trigger === "mount"
      ? { animate: { scaleX: 1 } }
      : { whileInView: { scaleX: 1 }, viewport: VIEWPORT }),
  };

  return (
    <motion.div
      className={className}
      style={{ originX: origin === "left" ? 0 : 1 }}
      {...animation}
    >
      {children}
    </motion.div>
  );
}

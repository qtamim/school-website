"use client";

import { motion } from "framer-motion";
import { DURATION, EASE_OUT, VIEWPORT } from "@/lib/motion/tokens";

type SplitWordsProps = {
  text: string;
  className?: string;
  /** "mount" for above-the-fold copy, "view" for anything further down. */
  trigger?: "mount" | "view";
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "p" | "span";
};

/**
 * Reveals a line word by word. Splitting happens on whitespace only, never
 * inside a word, so Arabic letters keep their contextual joining forms.
 */
export function SplitWords({
  text,
  className,
  trigger = "view",
  delay = 0,
  stagger = 0.045,
  as = "span",
}: SplitWordsProps) {
  const Tag = motion[as];
  const tokens = text.split(/(\s+)/);

  const orchestration = {
    initial: "hidden" as const,
    variants: {
      hidden: {},
      visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
    },
    ...(trigger === "mount"
      ? { animate: "visible" as const }
      : { whileInView: "visible" as const, viewport: VIEWPORT }),
  };

  return (
    <Tag className={className} {...orchestration}>
      {tokens.map((token, index) =>
        /\s/.test(token) ? (
          // Real text nodes between words keep native spacing and line breaking.
          <span key={index}>{token}</span>
        ) : (
          <motion.span
            key={index}
            className="inline-block will-change-transform"
            variants={{
              hidden: { opacity: 0, y: "0.45em", rotateX: 35 },
              visible: {
                opacity: 1,
                y: "0em",
                rotateX: 0,
                transition: { duration: DURATION.base, ease: EASE_OUT },
              },
            }}
            style={{ transformPerspective: 600 }}
          >
            {token}
          </motion.span>
        )
      )}
    </Tag>
  );
}

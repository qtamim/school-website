"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { EASE_OUT } from "@/lib/motion/tokens";

export function HeroBackdrop() {
  const reduced = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 660], [0, 80]);

  return (
    <motion.div
      className="absolute inset-0"
      style={reduced ? undefined : { y }}
      initial={{ scale: 1.14 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.9, ease: EASE_OUT }}
    >
      <Image
        src="/images/hero.png"
        alt=""
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover"
      />
    </motion.div>
  );
}

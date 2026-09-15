"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useStaggerItemVariants } from "@/components/motion/stagger";
import { DISTANCE, EASE_OUT } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";
import type { GalleryPhoto } from "@/lib/i18n/types";

const MotionImage = motion.create(Image);

type GalleryTileProps = {
  photo: GalleryPhoto;
  className?: string;
  sizes?: string;
};

export function GalleryTile({
  photo,
  className,
  sizes = "(max-width: 1024px) 100vw, 398px",
}: GalleryTileProps) {
  const base = useStaggerItemVariants("up", DISTANCE.base);

  return (
    <motion.div
      variants={{
        ...base,
        hover: { y: -6, transition: { duration: 0.4, ease: EASE_OUT } },
      }}
      whileHover="hover"
      className={cn(
        "relative overflow-hidden hover:opacity-90 transition-opacity duration-300 cursor-pointer rounded-[24px] bg-placeholder",
        className
      )}
    >
      <MotionImage
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        className="object-cover"
        variants={{ hover: { scale: 1.07 } }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      />
    </motion.div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useStaggerItemVariants } from "@/components/motion/stagger";
import { localizeHref } from "@/lib/i18n";
import { DISTANCE, EASE_OUT } from "@/lib/motion/tokens";
import type { Locale } from "@/lib/i18n/config";
import type { NewsPost } from "@/lib/i18n/types";

const MotionImage = motion.create(Image);
const MotionLink = motion.create(Link);

/** Photo card with a bottom gradient carrying the headline and date. */
export function NewsCard({ locale, post }: { locale: Locale; post: NewsPost }) {
  const base = useStaggerItemVariants("up", DISTANCE.lg);

  return (
    <MotionLink
      href={localizeHref(locale, `/news/${post.id}`)}
      variants={{
        ...base,
        hover: { y: -10, transition: { duration: 0.4, ease: EASE_OUT } },
      }}
      whileHover="hover"
      // Only opacity transitions in CSS; transform belongs to framer alone.
      className="relative group hover:opacity-90 opacity-100 h-[462px] cursor-pointer transition-opacity duration-300 aspect-[397.32/462] w-full overflow-hidden rounded-[24px] bg-placeholder"
    >
      <MotionImage
        src={post.image}
        alt={post.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 398px"
        className="object-cover"
        variants={{ hover: { scale: 1.07 } }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      />
      <div className="absolute inset-x-0 bottom-0 h-[43.5%] bg-gradient-to-b from-transparent to-black/70" />
      <div className="absolute inset-x-[19px] bottom-[26px] flex flex-col gap-3 text-start">
        <h3 className="text-lg font-bold leading-snug text-white sm:text-xl lg:text-2xl">
          {post.title}
        </h3>
        <p className="text-sm leading-6 text-mist">{post.date}</p>
      </div>
    </MotionLink>
  );
}

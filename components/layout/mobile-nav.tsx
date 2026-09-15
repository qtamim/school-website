"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { localizeHref } from "@/lib/i18n";
import { EASE_OUT } from "@/lib/motion/tokens";
import type { Locale } from "@/lib/i18n/config";
import type { NavLink } from "@/lib/i18n/types";

type MobileNavProps = {
  locale: Locale;
  links: NavLink[];
  openLabel: string;
  closeLabel: string;
  menuTitle: string;
};

const ICON_TRANSITION = { duration: 0.28, ease: EASE_OUT };

export function MobileNav({
  locale,
  links,
  openLabel,
  closeLabel,
  menuTitle,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label={open ? closeLabel : openLabel}
        onClick={(event) => {
          if (!open) return;
          event.preventDefault();
          setOpen(false);
        }}
        className="relative flex size-10 items-center justify-center rounded-[12px] bg-navy text-cyan lg:hidden"
      >
        <span className="relative size-5">
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={{
              opacity: open ? 0 : 1,
              rotate: open ? 90 : 0,
              scale: open ? 0.4 : 1,
            }}
            transition={ICON_TRANSITION}
            aria-hidden
          >
            <Menu className="size-5" />
          </motion.span>
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={{
              opacity: open ? 1 : 0,
              rotate: open ? 0 : -90,
              scale: open ? 1 : 0.4,
            }}
            transition={ICON_TRANSITION}
            aria-hidden
          >
            <X className="size-5" />
          </motion.span>
        </span>
      </SheetTrigger>
      <SheetContent
        side="top"
        showCloseButton={false}
        className="border-none bg-deep text-white"
      >
        <SheetHeader>
          <SheetTitle className="text-white">{menuTitle}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-2 pb-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={localizeHref(locale, link.href)}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-3 text-base text-white transition-colors hover:bg-navy"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

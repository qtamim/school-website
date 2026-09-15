"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { MobileNav } from "@/components/layout/mobile-nav";
import { useScrollPosition } from "@/hooks/use-scroll-position";
import { localizeHref, stripLocalePrefix } from "@/lib/i18n";
import { EASE_OUT } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

type SiteHeaderProps = {
  locale: Locale;
  dict: Dictionary;
  /**
   * Dark variant: white wordmark and links, for pages that open on a dark
   * hero. Pass `false` on white pages so the bar reads as ink on paper.
   */
  dark?: boolean;
};

/** Transparent bar that floats above the hero. */
export function SiteHeader({ locale, dict, dark = true }: SiteHeaderProps) {
  const { nav, school } = dict;
  const pathname = stripLocalePrefix(usePathname() ?? "/");
  const isScrolled = useScrollPosition();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  const tone = dark ? "text-white" : "text-black";

  return (
    <motion.header
      initial={{ y: -86, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.1 }}
      className={cn(
        "section-x w-full max-w-[100%] fixed h-[86px] top-0 left-0 right-0 z-[55] py-[23px]",
        "transition-all duration-300",
        isScrolled
          ? dark
            ? "bg-black/50 backdrop-blur-sm"
            : "bg-white/50 backdrop-blur-sm"
          : "bg-transparent"
      )}
    >
      <div className="container-page flex items-center justify-between gap-6">
        <Link
          href={localizeHref(locale, "/")}
          className={cn("flex items-center gap-[9px] text-sm font-bold", tone)}
        >
          <Image
            src="/images/school-logo.png"
            alt={dict.footer.schoolLogoAlt}
            width={35}
            height={37}
            className={`h-[37px] w-[35px] object-contain ${!dark ? 'invert' : ''} `}
            priority
          />
          <span className="whitespace-nowrap">{school.name}</span>
        </Link>

        <motion.nav
          className="hidden items-center gap-8 lg:flex"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07, delayChildren: 0.45 } },
          }}
        >
          {nav.links.map((link) => (
            <motion.div
              key={link.href}
              variants={NAV_ITEM}
              className="flex items-center"
            >
              <Link
                href={localizeHref(locale, link.href)}
                className={cn(
                  "whitespace-nowrap text-sm transition-opacity hover:opacity-80",
                  tone,
                  isActive(link.href) ? "font-bold" : "font-normal"
                )}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          <motion.div variants={NAV_ITEM} className="flex items-center">
            <LocaleSwitcher locale={locale} label={nav.switchLabel} />
          </motion.div>
        </motion.nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LocaleSwitcher locale={locale} label={nav.switchLabel} className="h-9 text-sm" />
          <MobileNav
            locale={locale}
            links={nav.links}
            openLabel={nav.openMenu}
            closeLabel={nav.closeMenu}
            menuTitle={nav.menuTitle}
          />
        </div>
      </div>
    </motion.header>
  );
}

const NAV_ITEM = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

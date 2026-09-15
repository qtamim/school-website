"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localizeHref, stripLocalePrefix } from "@/lib/i18n";
import { getAlternateLocale, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

type LocaleSwitcherProps = {
  locale: Locale;
  label: string;
  className?: string;
};

/** Swaps the locale segment while keeping the visitor on the same page. */
export function LocaleSwitcher({ locale, label, className }: LocaleSwitcherProps) {
  const pathname = usePathname() ?? localizeHref(locale, "/");
  const href = localizeHref(getAlternateLocale(locale), stripLocalePrefix(pathname));

  return (
    <Link
      href={href}
      hrefLang={getAlternateLocale(locale)}
      className={cn(
        "flex h-10 items-center gap-1.5 rounded-[12px] bg-navy px-3",
        "text-[15px] font-bold text-cyan transition-colors hover:bg-navy/80",
        className
      )}
    >
      {label}
      <Image
        src="/images/icons/language-square.svg"
        alt=""
        width={22}
        height={22}
        className="size-[22px]"
      />
    </Link>
  );
}

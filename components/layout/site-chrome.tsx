"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { stripLocalePrefix } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

const LIGHT_PAGES = [/^\/news\/[^/]+$/];

export function SiteChrome({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = stripLocalePrefix(usePathname() ?? "/");

  return (
    <SiteHeader
      locale={locale}
      dict={dict}
      dark={!LIGHT_PAGES.some((page) => page.test(pathname))}
    />
  );
}

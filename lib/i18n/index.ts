import { ar } from "@/lib/i18n/dictionaries/ar";
import { en } from "@/lib/i18n/dictionaries/en";
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

const dictionaries: Record<Locale, Dictionary> = { ar, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Drops a leading `/ar` or `/en` segment. `/en/news` → `/news`, `/` → `/`. */
export function stripLocalePrefix(pathname: string) {
  const stripped = pathname.replace(
    new RegExp(`^/(${locales.join("|")})(?=/|$)`),
    ""
  );
  return stripped || "/";
}

/**
 * Prefixes an in-app path with the locale segment.
 * Arabic is the default, so it stays unprefixed: `/` and `/news`, not `/ar`.
 */
export function localizeHref(locale: Locale, href: string) {
  const path = href.startsWith("/") ? href : `/${href}`;
  if (locale === defaultLocale) return path;
  return path === "/" ? `/${locale}` : `/${locale}${path}`;
}

export * from "@/lib/i18n/config";
export type * from "@/lib/i18n/types";

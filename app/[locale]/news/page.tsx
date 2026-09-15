import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsHero } from "@/components/sections/news-hero";
import { getDictionary, localizeHref } from "@/lib/i18n";
import { defaultLocale, isLocale, locales } from "@/lib/i18n/config";

type NewsPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = getDictionary(locale);
  return {
    title: `${dict.news.title} | ${dict.meta.title}`,
    description: dict.meta.description,
    alternates: {
      canonical: localizeHref(locale, "/news"),
      languages: {
        ...Object.fromEntries(locales.map((code) => [code, localizeHref(code, "/news")])),
        "x-default": localizeHref(defaultLocale, "/news"),
      },
    },
  };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return <NewsHero locale={locale} news={dict.news} />;
}

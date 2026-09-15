import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsArticle } from "@/components/sections/news-article";
import { getDictionary, localizeHref } from "@/lib/i18n";
import { defaultLocale, isLocale, locales } from "@/lib/i18n/config";

type NewsPostPageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getDictionary(locale).news.posts.map((post) => ({ locale, id: post.id }))
  );
}

export async function generateMetadata({ params }: NewsPostPageProps): Promise<Metadata> {
  const { locale, id } = await params;
  if (!isLocale(locale)) return {};

  const dict = getDictionary(locale);
  const post = dict.news.posts.find((entry) => entry.id === id);
  if (!post) return {};

  return {
    title: `${post.title} | ${dict.meta.title}`,
    description: post.body[0],
    alternates: {
      canonical: localizeHref(locale, `/news/${id}`),
      languages: {
        ...Object.fromEntries(
          locales.map((code) => [code, localizeHref(code, `/news/${id}`)])
        ),
        "x-default": localizeHref(defaultLocale, `/news/${id}`),
      },
    },
    openGraph: { type: "article" },
  };
}

export default async function NewsPostPage({ params }: NewsPostPageProps) {
  const { locale, id } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const post = dict.news.posts.find((entry) => entry.id === id);
  if (!post) notFound();

  return (
    <NewsArticle
      locale={locale}
      news={dict.news}
      post={post}
      others={dict.news.posts.filter((entry) => entry.id !== id)}
    />
  );
}

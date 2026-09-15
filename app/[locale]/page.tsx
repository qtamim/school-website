import { notFound } from "next/navigation";

import { FeatureSection } from "@/components/sections/feature-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { HeroSection } from "@/components/sections/hero-section";
import { NewsSection } from "@/components/sections/news-section";
import { QuoteSection } from "@/components/sections/quote-section";
import { getDictionary } from "@/lib/i18n";
import { isLocale } from "@/lib/i18n/config";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <>
      <HeroSection hero={dict.hero} />
      {dict.features.map((feature, index) => (
        <FeatureSection
          key={feature.title}
          feature={feature}
          imageFirst={index % 2 === 1}
        />
      ))}
      <NewsSection locale={locale} news={dict.news} />
      <QuoteSection quote={dict.quote} />
      <GallerySection gallery={dict.gallery} />
    </>
  );
}

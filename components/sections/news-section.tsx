import { Reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { StaggerGroup } from "@/components/motion/stagger";
import { Container } from "@/components/shared/container";
import { NewsCard } from "@/components/shared/news-card";
import { PillButton } from "@/components/shared/pill-button";
import { localizeHref } from "@/lib/i18n";
import { DISTANCE } from "@/lib/motion/tokens";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";
import Image from "next/image";

type NewsSectionProps = {
  locale: Locale;
  news: Dictionary["news"];
};

export function NewsSection({ locale, news }: NewsSectionProps) {
  return (
    <section className="section-x relative overflow-hidden bg-ocean py-12 lg:py-[50px]">
      <Image
        src="/images/decor/news-cluster.svg"
        width={199}
        height={191}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 rotate-180"
      />

      <Container className="relative flex flex-col gap-10 lg:gap-[50px]">
        <div className="flex items-center justify-between gap-4">
          <SplitWords as="h2" text={news.title} className="heading-section text-white" />
          <Reveal from="up" distance={DISTANCE.sm} delay={0.2}>
            <PillButton href={localizeHref(locale, "/news")}>{news.viewAll}</PillButton>
          </Reveal>
        </div>

        <StaggerGroup
          stagger={0.14}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {news.posts.map((post) => (
            <NewsCard key={post.id} locale={locale} post={post} />
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}

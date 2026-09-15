import Image from "next/image";
import { SplitWords } from "@/components/motion/split-words";
import { StaggerGroup } from "@/components/motion/stagger";
import { Container } from "@/components/shared/container";
import { NewsCard } from "@/components/shared/news-card";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

/**
 * Violet listing that fills the news page from under the header to the footer.
 * Overflow stays visible so the lower cluster can spill onto the white gap,
 * the way the design pins it past the section edge.
 */
export function NewsHero({ locale, news }: { locale: Locale; news: Dictionary["news"] }) {
  return (
    <section className="section-x relative overflow-visible bg-violet pb-12 pt-[120px] sm:pt-[160px] lg:pb-[100px] lg:pt-[186px]">
      <Image
        src="/images/decor/news-page-cluster.svg"
        width={269}
        height={235}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-[calc(50%+112px)] top-[111px] hidden h-[235px] w-[269px] lg:block"
      />
      {/* rotate-90 swaps the 269x235 box without moving it, so both offsets carry
          a 17px correction to leave the cluster 91px past the section edge. */}
      <Image
        src="/images/decor/news-page-cluster.svg"
        width={269}
        height={235}
        alt=""
        aria-hidden
        className="pointer-events-none absolute -bottom-[74px] left-[7px] hidden h-[235px] w-[269px] -scale-y-100 rotate-90 lg:block"
      />

      <Container className="relative flex flex-col gap-10 lg:gap-[50px]">
        {/* The design centres the title inside a fixed 65px row. */}
        <div className="flex items-center justify-center lg:h-[65px]">
          <SplitWords
            as="h1"
            text={news.title}
            trigger="mount"
            delay={0.35}
            className="heading-section text-center text-white"
          />
        </div>

        <StaggerGroup
          stagger={0.14}
          delayChildren={0.5}
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

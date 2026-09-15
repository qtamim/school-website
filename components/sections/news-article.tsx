import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/shared/container";
import { localizeHref } from "@/lib/i18n";
import { DISTANCE } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary, NewsPost } from "@/lib/i18n/types";

type NewsArticleProps = {
  locale: Locale;
  news: Dictionary["news"];
  post: NewsPost;
  others: NewsPost[];
};

/**
 * A single news story beside a rail of the remaining stories. The article comes
 * first in the DOM so it leads on mobile and takes the reading-start column on
 * desktop, which mirrors the layout for English without a second rule.
 */
export function NewsArticle({ locale, news, post, others }: NewsArticleProps) {
  return (
    <section className="section-x pb-12 pt-[120px] sm:pt-[160px] lg:pb-[50px] lg:pt-[186px]">
      <Container className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <article className="relative flex min-w-0 flex-1 flex-col gap-10 lg:gap-[50px]">
          <header className="relative flex flex-col items-start gap-3 text-start">
            <Image
              src="/images/decor/news-post-cluster.svg"
              width={269}
              height={235}
              alt=""
              aria-hidden
              className={`pointer-events-none absolute -bottom-[84px] end-0 hidden h-[235px] w-[269px] ${locale !== 'ar' ? '-scale-y-[100%]' : ''} lg:block`}
            />

            <Reveal from="up" distance={DISTANCE.sm}>
              <Link
                href={localizeHref(locale, "/news")}
                className="flex h-4 items-center gap-2 text-xs font-medium text-lagoon transition-opacity hover:opacity-70"
              >
                <Image
                  src="/images/icons/arrow-right.svg"
                  width={16}
                  height={16}
                  alt=""
                  aria-hidden
                  // The glyph points right, which reads as "back" only in RTL.
                  className={cn("size-4 shrink-0", locale !== "ar" && "rotate-180")}
                />
                {news.goBack}
              </Link>
            </Reveal>

            <Reveal from="up" distance={DISTANCE.sm} delay={0.05}>
              <p className="text-base font-medium leading-6 text-ash">{post.date}</p>
            </Reveal>

            <SplitWords
              as="h1"
              text={post.title}
              trigger="mount"
              delay={0.2}
              // 1.18 is Rubik's natural line box, which is what the design's
              // `leading-[normal]` text nodes measure out to.
              className="max-w-[600px] text-2xl font-semibold leading-[1.18] text-black lg:text-[28px]"
            />
          </header>

          <Reveal
            from="up"
            distance={DISTANCE.base}
            className="relative h-[220px] w-full overflow-hidden rounded-[12px] bg-placeholder sm:h-[300px] lg:h-[360px]"
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 1024px) 100vw, 836px"
              className="object-cover"
              priority
            />
          </Reveal>

          <Reveal
            from="up"
            distance={DISTANCE.base}
            className="flex flex-col gap-6 text-start text-base leading-[1.44]"
          >
            {post.body.map((paragraph) => (
              <p key={paragraph} className="text-black/87">
                {paragraph}
              </p>
            ))}
            <p className="text-grass">{post.tags.join(" ")}</p>
          </Reveal>
        </article>

        <Reveal
          from="end"
          distance={DISTANCE.base}
          className="flex w-full shrink-0 flex-col gap-10 rounded-[24px] border border-line/50 bg-snow p-6 lg:w-[380px] lg:gap-[50px]"
        >
          <h2 className="text-start text-2xl font-bold leading-[1.18] text-iris">
            {news.moreNews}
          </h2>

          <StaggerGroup stagger={0.12} className="flex flex-col gap-8">
            {others.map((other) => (
              <StaggerItem key={other.id} from="up" distance={DISTANCE.sm}>
                <Link
                  href={localizeHref(locale, `/news/${other.id}`)}
                  className="flex flex-col gap-3 text-start transition-opacity hover:opacity-70"
                >
                  <p className="text-base font-medium leading-[1.18] text-black">
                    {other.title}
                  </p>
                  <p className="text-sm leading-6 text-body">{other.date}</p>
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Reveal>
      </Container>
    </section>
  );
}

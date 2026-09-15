import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/shared/container";
import { DISTANCE } from "@/lib/motion/tokens";
import type { Dictionary } from "@/lib/i18n/types";

export function QuoteSection({ quote }: { quote: Dictionary["quote"] }) {
  return (
    <section className="section-x relative overflow-hidden bg-gradient-to-b from-ocean-dark from-[12.981%] to-ocean-dark/50 py-14 lg:h-[425px] lg:py-0">
        <Image
        src="/images/decor/banner-sparkle.svg"
        width={32}
        height={36}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-[90.83%] top-[9.37%] hidden lg:block"
      />
      <Image
        src="/images/decor/banner-sparkle.svg"
        width={54}
        height={60}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-[54.03%] top-[64.17%] hidden lg:block"
      />

      <Container className="flex h-full flex-col-reverse items-center justify-between gap-10 lg:flex-row lg:gap-0">
        <figure className="order-2 flex w-full flex-col gap-[34px] text-start text-white lg:order-1 lg:max-w-[630px]">
          <Reveal from="start" distance={DISTANCE.base} blur>
            <blockquote className="text-2xl leading-[40px] sm:text-[28px] lg:text-[32px]">
              {quote.before}
              <span className="font-semibold">{quote.highlight}</span>
              {quote.after}
            </blockquote>
          </Reveal>
          <figcaption>
            <Reveal
              from="start"
              distance={DISTANCE.sm}
              delay={0.18}
              className="flex flex-col gap-2"
            >
              <span className="text-base font-bold">{quote.author}</span>
              <span className="text-sm font-normal">{quote.role}</span>
            </Reveal>
          </figcaption>
        </figure>

        <Reveal
          from="end"
          distance={DISTANCE.lg}
          className="relative order-1 aspect-[483/377] w-full max-w-[483px] shrink-0 lg:order-2 translate-y-[64px] lg:translate-y-[27px] lg:self-end"
        >
          <Image
            src="/images/author.svg"
            alt={quote.author}
            fill
            className="pointer-events-none object-cover object-[35%_center]"
          />
        </Reveal>
      </Container>
    </section>
  );
}

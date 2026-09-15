import { HeroBackdrop } from "@/components/motion/hero-backdrop";
import { Reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { Wipe } from "@/components/motion/wipe";
import { StripeDivider } from "@/components/shared/stripe-divider";
import { DISTANCE } from "@/lib/motion/tokens";
import type { Dictionary } from "@/lib/i18n/types";
import Image from "next/image";

export function HeroSection({ hero }: { hero: Dictionary["hero"] }) {
  return (
    <section className="relative h-[560px] w-full overflow-hidden sm:h-[610px] lg:h-[657px]">
      <HeroBackdrop />
      <div className="absolute inset-0 bg-[rgba(16,23,29,0.6)]" />

      <Image
        src="/images/decor/hero-cluster-1.svg"
        width={51}
        height={55}
        alt=""
        aria-hidden
        className="absolute -scale-x-100 left-[24px] top-[206px] hidden h-[54.716px] w-[51px] lg:block"
      />
      <Image
        src="/images/decor/hero-cluster-2.svg"
        width={31}
        height={33}
        alt=""
        aria-hidden
        className="absolute -scale-x-100 left-[84px] top-[338px] hidden h-[33px] w-[31px] lg:block"
      />

      <div className="section-x relative flex h-full items-center">
        <div className="container-page">
          <div className="flex max-w-[608px] flex-col gap-6 text-start">
            <SplitWords
              as="h1"
              text={hero.title}
              trigger="mount"
              delay={0.35}
              className="text-[32px] font-bold leading-tight tracking-[0.5px] text-white sm:text-[40px] lg:text-[48px] lg:leading-[67px]"
            />
            <Reveal from="up" distance={DISTANCE.sm} delay={0.75} blur>
              <p className="copy-body max-w-[608px] text-mist">{hero.description}</p>
            </Reveal>
          </div>
        </div>
      </div>

      <Wipe origin="left" delay={0.5} className="absolute bottom-0 start-0 w-full">
        <StripeDivider />
      </Wipe>
    </section>
  );
}

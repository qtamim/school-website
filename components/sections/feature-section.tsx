import Image from "next/image";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/split-words";
import { Container } from "@/components/shared/container";
import { cn } from "@/lib/utils";
import { DISTANCE } from "@/lib/motion/tokens";
import type { FeatureContent } from "@/lib/i18n/types";

type FeatureSectionProps = {
  feature: FeatureContent;
  imageFirst?: boolean;
};

export function FeatureSection({ feature, imageFirst = false }: FeatureSectionProps) {
  const textFrom = imageFirst ? "end" : "start";
  const imageFrom = imageFirst ? "start" : "end";

  return (
    <section className="section-x py-14 lg:py-[50px] overflow-hidden">
      <Container
        className={cn(
          "flex overflow-visible flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-10 xl:justify-between xl:gap-[86px]",
          imageFirst && "lg:flex-row-reverse"
        )}
      >
        {/* min-w-0 + flex-1 let the copy shrink below 1440 instead of sitting on the photo. */}
        <div className="flex w-full min-w-0 flex-1 flex-col gap-2 text-start lg:h-[370px] lg:max-w-[587px] lg:justify-center">
          <SplitWords as="h2" text={feature.title} className="heading-section text-ink" />
          <Reveal from={textFrom} distance={DISTANCE.base} delay={0.15} blur>
            <p className="copy-body w-full text-body">{feature.body}</p>
          </Reveal>
        </div>

        <Reveal
          from={imageFrom}
          distance={DISTANCE.lg}
          className="relative w-full min-w-0 flex-1 max-w-[466.683px]"
        >
          <Image
            src="/images/decor/feature-cluster.svg"
            alt=""
            aria-hidden
            width={650}
            height={426}
            className="pointer-events-none z-50 absolute left-1/2 top-1/2 sm:w-[114%] w-[110%] max-w-none -translate-x-1/2 -translate-y-1/2"
          /> 
          <div className="relative max-w-[566.683px] max-h-[370px] aspect-[566.683/370] w-full overflow-hidden rounded-[24px] bg-placeholder">
            {/* Overscaled so the photo can pan inside the frame without exposing an edge. */}
            <Parallax distance={16} className="absolute inset-0 ">
              <Image
                src={feature.image}
                alt={feature.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 567px"
                className="object-cover"
              />
            </Parallax>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

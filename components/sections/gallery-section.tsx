import { SplitWords } from "@/components/motion/split-words";
import { StaggerGroup } from "@/components/motion/stagger";
import { Container } from "@/components/shared/container";
import { GalleryTile } from "@/components/shared/gallery-tile";
import type { Dictionary } from "@/lib/i18n/types";
import Image from "next/image";

type GallerySectionProps = {
  gallery: Dictionary["gallery"];
};

export function GallerySection({ gallery }: GallerySectionProps) {
  const [first, second, third, wide, tall] = gallery.photos;

  return (
    <section className="section-x relative overflow-hidden bg-violet py-12 lg:py-[50px]">
      <Image
        src="/images/decor/gallery-cluster.svg"
        width={162}
        height={192}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-0 top-0"
      />

      <Container className="relative flex flex-col items-center gap-10 lg:gap-[50px]">
        <SplitWords
          as="h2"
          text={gallery.title}
          className="heading-section text-center text-white"
        />

        <StaggerGroup
          stagger={0.12}
          className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {[first, second, third].map((photo) => (
            <GalleryTile key={photo.src} photo={photo} className="aspect-[397.32/242]" />
          ))}
        </StaggerGroup>

        {/* The design puts the wide tile on the far side of the reading direction. */}
        <StaggerGroup
          stagger={0.12}
          className="grid w-full grid-cols-1 gap-6 lg:h-[372px] lg:grid-cols-3"
        >
          <GalleryTile
            photo={tall}
            className="aspect-[397.32/372] lg:aspect-auto lg:h-full"
          />
          <GalleryTile
            photo={wide}
            sizes="(max-width: 1024px) 100vw, 819px"
            className="aspect-[818.68/372] lg:col-span-2 lg:aspect-auto lg:h-full"
          />
        </StaggerGroup>
{/* 
        <Reveal from="up" distance={DISTANCE.sm} delay={0.1}>
          <PillButton href={localizeHref(locale, "/gallery")}>{gallery.viewAll}</PillButton>
        </Reveal> */}
      </Container>
    </section>
  );
}

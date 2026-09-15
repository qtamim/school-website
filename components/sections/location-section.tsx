import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { HoursTable } from "@/components/sections/hours-table";
import { Container } from "@/components/shared/container";
import { DISTANCE } from "@/lib/motion/tokens";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/types";

type LocationSectionProps = {
  locale: Locale;
  contact: Dictionary["contact"];
};

export function LocationSection({ locale, contact }: LocationSectionProps) {
  const mapQuery = encodeURIComponent(contact.mapAddress);

  return (
    <section className="section-x relative overflow-visible bg-gradient-to-b from-violet from-[13%] to-violet/50 py-12 lg:py-[50px]">
      <Image
        src="/images/decor/contact-location-cluster.svg"
        width={371}
        height={193}
        alt=""
        aria-hidden
        className={`pointer-events-none absolute z-50 ${locale == "ar" ? "md:right-[13%] right-[51px] rotate-180" : "md:right-[28%] right-[51px] -scale-y-100 -rotate-0" } top-[-23px] hidden h-[193px] w-[371px] lg:block`}
      />

      <Container
        className={cn(
          "relative flex flex-col items-center justify-between gap-10 lg:flex-row lg:items-center lg:gap-8",
          locale === "ar" && "lg:flex-row-reverse"
        )}
      >
        <Reveal
          from="start"
          distance={DISTANCE.lg}
          className="h-[240px] w-full max-w-[550px] overflow-hidden rounded-[24px] bg-placeholder sm:h-[330px]"
        >
          <iframe
            title={contact.mapTitle}
            src={`https://maps.google.com/maps?q=${mapQuery}&z=15&output=embed`}
            className="size-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Reveal>

        <Reveal
          from="end"
          distance={DISTANCE.base}
          className="flex w-full max-w-[490px] flex-col items-start gap-12 text-start"
        >
          <div className="flex flex-col gap-3">
            <p className="text-base font-semibold text-mint">{contact.locationEyebrow}</p>
            <h2 className="text-[28px] font-bold leading-normal text-white">
              {contact.address}
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-base font-semibold text-cyan">{contact.hoursEyebrow}</p>
            <HoursTable
              days={contact.days}
              hours={contact.hours}
              closed={contact.closed}
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

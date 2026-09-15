import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary, NavLink } from "@/lib/i18n/types";

type ContactHeroProps = {
  locale: Locale;
  contact: Dictionary["contact"];
  privacy: NavLink;
  terms: NavLink;
};

export function ContactHero({
  locale,
  contact,
  privacy,
  terms,
}: ContactHeroProps) {
  return (
    <section className="relative overflow-hidden bg-ocean px-6 pb-12 pt-[120px] sm:px-10 sm:pt-[160px] lg:px-16 lg:pb-[48px] lg:pt-[186px] xl:px-gutter">
      <Image
        src="/images/decor/contact-hero-cluster-1.svg"
        width={269}
        height={235}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-[calc(70.83%-134.5px)] top-[111px] hidden h-[235px] w-[269px] lg:block"
      />
      <Image
        src="/images/decor/contact-hero-cluster-2.svg"
        width={82}
        height={160}
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-[81px] top-[526px] hidden h-[160px] w-[82px] rotate-180 lg:block"
      />

      <div className="relative flex justify-center">
        <Reveal from="up" distance={24} className="w-full max-w-[467px]">
          <ContactForm
            locale={locale}
            contact={contact}
            privacy={privacy}
            terms={terms}
          />
        </Reveal>
      </div>
    </section>
  );
}

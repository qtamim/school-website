import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger";
import { Wipe } from "@/components/motion/wipe";
import { Container } from "@/components/shared/container";
import { StripeDivider } from "@/components/shared/stripe-divider";
import { localizeHref } from "@/lib/i18n";
import { DISTANCE } from "@/lib/motion/tokens";
import type { Locale } from "@/lib/i18n/config";
import type { ContactItem, Dictionary } from "@/lib/i18n/types";

type SiteFooterProps = {
  locale: Locale;
  dict: Dictionary;
};

export function SiteFooter({ locale, dict }: SiteFooterProps) {
  const { footer } = dict;

  return (
    <footer className="section-x relative overflow-visible bg-deep py-12 lg:py-[50px]">
      <Image
        src="/images/decor/footer-cluster-1.svg"
        width={269}
        height={235}
        alt=""
        aria-hidden
        className="pointer-events-none absolute right-0 left-0 mx-auto top-[-24px] hidden lg:block"
      />
      <Image
        src="/images/decor/footer-cluster-2.svg"
        width={109}
        height={110}
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-9 left-[45px] hidden lg:block"
      />

      <Container className="relative flex flex-col items-center gap-10 lg:gap-[50px]">
        <div className="flex w-full flex-col-reverse items-center justify-between gap-10 lg:flex-row lg:items-start">
          <ContactBlock footer={footer} />

          <StaggerGroup
            stagger={0.12}
            className="flex flex-wrap justify-center gap-16 sm:gap-32"
          >
            {footer.columns.map((column) => (
              <StaggerItem key={column.title} from="up" distance={DISTANCE.base}>
                <nav className="flex flex-col gap-[18px] text-start">
                  <h3 className="text-base font-bold text-white">{column.title}</h3>
                  <ul className="flex flex-col gap-3">
                    {column.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={localizeHref(locale, link.href)}
                          className="whitespace-nowrap text-xs font-medium text-fog transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>

        <Reveal from="up" distance={DISTANCE.sm} delay={0.1}>
          <p className="text-center text-xs font-medium text-white">{footer.copyright}</p>
        </Reveal>
      </Container>

      <Wipe origin="right" className="absolute bottom-0 start-0 w-full">
        <StripeDivider accent="right" />
      </Wipe>
    </footer>
  );
}

function ContactBlock({ footer }: { footer: Dictionary["footer"] }) {
  return (
    <Reveal from="up" distance={DISTANCE.base} className="flex flex-col items-center gap-6 lg:items-end">
      <div className="flex items-center justify-center gap-3 px-[15px]">
        <Image
          src="/images/school-logo.png"
          alt={footer.schoolLogoAlt}
          width={69}
          height={73}
          className="h-[73px] w-[69px] object-contain"
        />
        <span aria-hidden className="h-[50px] w-px bg-white/30" />
        <Image
          src="/images/moe-logo.png"
          alt={footer.moeLogoAlt}
          width={106}
          height={81}
          className="h-[81px] w-[106px] object-contain"
        />
      </div>

      <ul className="flex flex-col items-center gap-3 lg:items-start">
        {footer.contact.map((item) => (
          <ContactRow key={item.label} item={item} />
        ))}
      </ul>
    </Reveal>
  );
}

function ContactRow({ item }: { item: ContactItem }) {
  return (
    <li className="flex items-center gap-3">
      <Image
        src={`/images/icons/${item.icon}.svg`}
        alt=""
        aria-hidden
        width={16}
        height={16}
        className="size-4 shrink-0"
      />
      <a
        href={item.href}
        dir={item.ltr ? "ltr" : undefined}
        className="whitespace-nowrap text-xs text-white transition-colors hover:text-cyan"
      >
        {item.label}
      </a>
    </li>
  );
}

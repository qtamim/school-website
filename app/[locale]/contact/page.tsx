import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactHero } from "@/components/sections/contact-hero";
import { LocationSection } from "@/components/sections/location-section";
import { getDictionary, localizeHref } from "@/lib/i18n";
import { defaultLocale, isLocale, locales } from "@/lib/i18n/config";

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = getDictionary(locale);
  return {
    title: `${dict.contact.eyebrow} | ${dict.meta.title}`,
    description: dict.contact.address,
    alternates: {
      canonical: localizeHref(locale, "/contact"),
      languages: {
        ...Object.fromEntries(locales.map((code) => [code, localizeHref(code, "/contact")])),
        "x-default": localizeHref(defaultLocale, "/contact"),
      },
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const legal = dict.footer.columns.find((column) =>
    column.links.some((link) => link.href.startsWith("/legal/"))
  );
  const privacy = legal?.links[0] ?? { label: "", href: "/legal/privacy" };
  const terms = legal?.links[1] ?? { label: "", href: "/legal/terms" };

  return (
    <>
      <ContactHero
        locale={locale}
        contact={dict.contact}
        privacy={privacy}
        terms={terms}
      />
      <LocationSection locale={locale} contact={dict.contact} />
    </>
  );
}

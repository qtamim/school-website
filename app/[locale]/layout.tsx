import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Rubik } from "next/font/google";
import { getDictionary, localizeHref } from "@/lib/i18n";
import { defaultLocale, getDirection, isLocale, locales } from "@/lib/i18n/config";
import { MotionProvider } from "@/components/motion/motion-provider";
import { PageTransition } from "@/components/motion/page-transition";
import { SiteChrome } from "@/components/layout/site-chrome";
import { SiteFooter } from "@/components/layout/site-footer";
import "@/app/globals.css";
import NextTopLoader from "nextjs-toploader";
import { Analytics } from "@vercel/analytics/next"

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

type LocaleParams = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { meta } = getDictionary(locale);
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: localizeHref(locale, "/"),
      languages: {
        ...Object.fromEntries(locales.map((code) => [code, localizeHref(code, "/")])),
        "x-default": localizeHref(defaultLocale, "/"),
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleParams & { children: ReactNode }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dir = getDirection(locale);
  const dict = getDictionary(locale);

  return (
    <html lang={locale} dir={dir} className={`${rubik.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-hidden scrollbar-none bg-white">
        <Analytics />
        <NextTopLoader
          color="#07A869"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #07A869,0 0 5px #07A869"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
        <MotionProvider dir={dir}>
          <SiteChrome locale={locale} dict={dict} />
          <div className="flex flex-1 flex-col gap-gutter scrollbar-none">
            <main className="flex flex-col gap-gutter scrollbar-none">
              <PageTransition>{children}</PageTransition>
            </main>
            <SiteFooter locale={locale} dict={dict} />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}

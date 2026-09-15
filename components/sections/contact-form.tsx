"use client";

import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { localizeHref } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary, NavLink } from "@/lib/i18n/types";

type ContactFormProps = {
  locale: Locale;
  contact: Dictionary["contact"];
  privacy: NavLink;
  terms: NavLink;
};

const fieldClass =
  "h-10 w-full rounded-[12px] bg-white px-3 py-2 text-xs leading-6 text-ocean-dark placeholder:text-ocean-dark/50 outline-none focus-visible:ring-2 focus-visible:ring-ocean/40";

export function ContactForm({
  locale,
  contact,
  privacy,
  terms,
}: ContactFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const canSubmit = useMemo(
    () =>
      Boolean(
        firstName.trim() &&
          lastName.trim() &&
          phone.trim() &&
          email.trim() &&
          message.trim()
      ),
    [email, firstName, lastName, message, phone]
  );

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-[467px] flex-col gap-3 overflow-hidden rounded-2xl bg-[#fafafa] p-6"
    >
      <div className="flex flex-col items-center gap-1.5 pb-6 text-center tracking-[0.5px]">
        <p className="w-full text-base font-medium leading-none text-ocean">
          {contact.eyebrow}
        </p>
        <h1 className="w-full text-[28px] font-bold leading-none text-black">
          {contact.title}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          name="firstName"
          autoComplete="given-name"
          value={firstName}
          dir={locale === "ar" ? "rtl" : "ltr"}
          onChange={(event) => setFirstName(event.target.value)}
          placeholder={contact.firstName}
          className={fieldClass}
        />
        <input
          name="lastName"
          autoComplete="family-name"
          value={lastName}
          dir={locale === "ar" ? "rtl" : "ltr"}
          onChange={(event) => setLastName(event.target.value)}
          placeholder={contact.lastName}
          className={fieldClass}
        />
        <input
          name="phone"
          type="tel"
          dir={locale === "ar" ? "rtl" : "ltr"}
          autoComplete="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder={contact.phone}
          className={fieldClass}
        />
        <input
          name="email"
          type="email"
          dir={locale === "ar" ? "rtl" : "ltr"}
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={contact.email}
          className={fieldClass}
        />
      </div>

      <textarea
        name="message"
        dir={locale === "ar" ? "rtl" : "ltr"}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder={contact.message}
        className="h-40 w-full resize-none rounded-[12px] bg-white px-3 py-2 text-xs leading-5 text-ocean-dark placeholder:text-ocean-dark/50 outline-none focus-visible:ring-2 focus-visible:ring-ocean/40"
      />

      <Button
        type="submit"
        disabled={!canSubmit}
        className="h-10 cursor-pointer w-full rounded-[12px] bg-grass px-8 text-xs font-bold text-white hover:bg-grass/90 focus-visible:ring-grass/40 disabled:opacity-50"
      >
        {contact.submit}
      </Button>

      <p className="text-center text-xs leading-normal text-[#5e5e5e]">
        {contact.legalBefore}
        <Link
          href={localizeHref(locale, privacy.href)}
          className="font-medium text-ocean transition-opacity hover:opacity-80"
        >
          {privacy.label}
        </Link>
        {contact.legalAnd}
        <Link
          href={localizeHref(locale, terms.href)}
          className="font-medium text-ocean transition-opacity hover:opacity-80"
        >
          {terms.label}
        </Link>
      </p>
    </form>
  );
}

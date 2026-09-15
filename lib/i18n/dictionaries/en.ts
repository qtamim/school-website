import type { Dictionary } from "@/lib/i18n/types";

export const en: Dictionary = {
  meta: {
    title: "Zuhair bin Qays High School",
    description:
      "A distinguished national education that unites knowledge and values in a safe, motivating environment where every student discovers their potential.",
  },
  school: {
    name: "Zuhair bin Qays School",
    shortName: "Zuhair bin Qays",
  },
  nav: {
    links: [
      { label: "Home", href: "/" },
      { label: "News", href: "/news" },
      { label: "Contact", href: "/contact" },
    ],
    switchLabel: "العربية",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuTitle: "Menu",
  },
  hero: {
    title: "Knowledge and values for a generation that shapes tomorrow",
    description:
      "At Zuhair bin Qays Secondary School we deliver a distinguished national education that unites knowledge with values, in a safe and motivating environment that helps every student discover their potential and grow their skills. We follow the Ministry of Education curriculum and its ambitious vision to prepare a confident, responsible generation that contributes to the progress of its nation.",
  },
  features: [
    {
      title: "Academic programs",
      body: "Zuhair bin Qays Secondary School provides a complete learning environment that follows the national curriculum approved by the Ministry of Education, delivered through modern teaching methods that build understanding and critical thinking rather than memorisation. We focus on mastering the core skills in languages, sciences and mathematics, and we support students at every level so they achieve the results that qualify them for university and the workplace.",
      image: "/images/feature-1.png",
      imageAlt: "Students in a classroom with their teacher",
    },
    {
      title: "Qudurat and Tahsili preparation",
      body: "The Qudurat and Tahsili exams shape a student's university future, so we run regular in-school preparation programs that include workshops, mock exams and past-paper practice supervised by specialist teachers. These programs raise our students' readiness, sharpen their reasoning and time-management skills, and help them reach their best possible results in the Qiyas tests.",
      image: "/images/feature-2.png",
      imageAlt: "Students in an exam preparation session",
    },
  ],
  news: {
    title: "Latest news",
    viewAll: "View all",
    moreNews: "More news",
    goBack: "Go back",
    posts: [
      {
        id: "academic-year-1448",
        title: "Start of the 1448–1449 AH academic year",
        date: "August 23, 2026",
        image: "/images/news/news-1.png",
        body: [
          "Classes for the first semester of the 1448–1449 AH academic year begin on Sunday 10 Rabi al-Awwal 1448 AH, which falls on 23 August 2026. The semester runs for nineteen teaching weeks, interrupted by the autumn break and Saudi National Day, before closing with the mid-year holiday. This guide sets out the full 1448 AH calendar week by week in both Hijri and Gregorian dates, alongside the school holiday schedule, so you can plan courses, activities and assessments from the very first day.",
        ],
        tags: ["#AcademicCalendar", "#MinistryOfEducation"],
      },
      {
        id: "saif-hackathon",
        title: "SAIF global security and innovation hackathon begins",
        date: "September 13, 2026",
        image: "/images/news/news-22.png",
        body: [
          "Zuhair bin Qays Secondary School is taking part in SAIF, the global security and innovation fair and competition that brings together secondary students from many countries to present technical solutions to cybersecurity and data-protection challenges. Our team earned its nomination through the standard of the projects it delivered in the computing and programming club last semester.",
          "The team works across three consecutive days under the supervision of school teachers and specialist mentors, building a working prototype and presenting it to the judging panel. Students interested in cybersecurity and artificial intelligence are invited to follow the hackathon and sign up for the workshops running alongside it.",
        ],
        tags: ["#SAIFHackathon", "#Cybersecurity", "#Innovation"],
      },
      {
        id: "national-day-96",
        title: "The school announces the 96th Saudi National Day celebrations",
        date: "September 13, 2026",
        image: "/images/news/news-3.png",
        body: [
          "Zuhair bin Qays Secondary School announces the start of its celebrations for the 96th Saudi National Day, opening in the school courtyard and running for three days with students, teachers and families taking part. The programme includes a national operetta, a heritage exhibition and competitions on the history and achievements of the Kingdom.",
          "The celebrations are designed to deepen our students' sense of belonging and connect them to their country's journey and its ambitious Vision 2030. All parents are warmly invited to the closing ceremony on Wednesday after the noon prayer in the school theatre.",
        ],
        tags: ["#NationalDay96", "#Vision2030"],
      },
    ],
  },
  quote: {
    before: "“The only way to do great work is to ",
    highlight: "love what you do",
    after: "”",
    author: "Steve Jobs",
    role: "Former CEO of Apple",
  },
  contact: {
    eyebrow: "Contact us",
    title: "School administration",
    firstName: "Enter first name",
    lastName: "Enter last name",
    phone: "Enter phone number",
    email: "Enter email address",
    message: "Write your message here",
    submit: "Send message",
    legalBefore: "By continuing you agree to our ",
    legalAnd: " and ",
    locationEyebrow: "Our location",
    mapAddress: "مدرسة زهيربن قيس الثانويه",
    address: "Riyadh, Dhahrat Laban, 13787",
    hoursEyebrow: "Working hours",
    hours: "6 AM – 1 PM",
    closed: "Closed",
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    mapTitle: "Map of Zuhair bin Qays High School",
  },
  gallery: {
    title: "Photo gallery",
    viewAll: "View all",
    photos: [
      { src: "/images/gallery/gallery-1.png", alt: "Students during a school activity" },
      { src: "/images/gallery/gallery-2.png", alt: "Group work inside the classroom" },
      { src: "/images/gallery/gallery-3.png", alt: "Students in a practical workshop" },
      { src: "/images/gallery/gallery-5.png", alt: "The classroom during a lesson" },
      { src: "/images/gallery/gallery-4.png", alt: "Students during a class activity" },
    ],
  },
  footer: {
    columns: [
      {
        title: "Summary",
        links: [
          { label: "Home", href: "/" },
          { label: "News", href: "/news" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy policy", href: "/legal/privacy" },
          { label: "Terms and conditions", href: "/legal/terms" },
        ],
      },
    ],
    contact: [
      { icon: "call", label: "0112692194", href: "tel:0112692194", ltr: true },
      {
        icon: "direct",
        label: "School.zuhair@gmail.com",
        href: "mailto:School.zuhair@gmail.com",
        ltr: true,
      },
      { icon: "send", label: "School Telegram group", href: "https://t.me/+4glakFSjByhhOWNk" },
      { icon: "send", label: "Qudurat & Tahsili training group", href: "https://t.me/+VbBO4CRkuqI0NTE0" },
    ],
    copyright: "All rights reserved — developed by Tamim Alsahli © 2026",
    moeLogoAlt: "Ministry of Education logo",
    schoolLogoAlt: "Zuhair bin Qays School logo",
  },
};

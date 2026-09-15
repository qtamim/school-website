export type NavLink = {
  label: string;
  href: string;
};

export type FeatureContent = {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
};

export type NewsPost = {
  /** Slug the /news/[id] route resolves against. */
  id: string;
  title: string;
  date: string;
  image: string;
  /** Article body, one entry per paragraph. */
  body: string[];
  /** Hashtags printed under the body. */
  tags: string[];
};

export type GalleryPhoto = {
  src: string;
  alt: string;
};

export type FooterColumn = {
  title: string;
  links: NavLink[];
};

export type ContactItem = {
  icon: "call" | "direct" | "send";
  label: string;
  href: string;
  /** Latin-script values stay LTR even inside the Arabic layout. */
  ltr?: boolean;
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  school: {
    name: string;
    shortName: string;
  };
  nav: {
    links: NavLink[];
    switchLabel: string;
    openMenu: string;
    closeMenu: string;
    menuTitle: string;
  };
  hero: {
    title: string;
    description: string;
  };
  features: FeatureContent[];
  news: {
    title: string;
    viewAll: string;
    moreNews: string;
    goBack: string;
    posts: NewsPost[];
  };
  quote: {
    before: string;
    highlight: string;
    after: string;
    author: string;
    role: string;
  };
  gallery: {
    title: string;
    viewAll: string;
    photos: GalleryPhoto[];
  };
  contact: {
    eyebrow: string;
    title: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    message: string;
    submit: string;
    legalBefore: string;
    legalAnd: string;
    locationEyebrow: string;
    address: string;
    mapAddress: string;
    hoursEyebrow: string;
    hours: string;
    closed: string;
    days: [string, string, string, string, string, string, string];
    mapTitle: string;
  };
  footer: {
    columns: FooterColumn[];
    contact: ContactItem[];
    copyright: string;
    moeLogoAlt: string;
    schoolLogoAlt: string;
  };
};

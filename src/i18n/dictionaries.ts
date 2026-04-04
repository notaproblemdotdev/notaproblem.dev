export const supportedLocales = ["en", "pl"] as const;
export type Locale = (typeof supportedLocales)[number];
export const defaultLocale: Locale = "en";

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && supportedLocales.includes(value as Locale);
}

export function resolveLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function localeFromPathname(pathname: string): Locale | undefined {
  const candidate = pathname.split("/")[1];
  return isLocale(candidate) ? candidate : undefined;
}

export const dictionaries: Record<Locale, Record<string, string>> = {
  en: {
    "site.name": "notaproblem.dev",
    "hero.tagline": "founded to build my own products.",
    "hero.description":
      "If you have the idea I like - I can also develop apps for you.",
    "hero.descriptionSuffix": "That's it. See you.",
    "contact.email": "problem@notaproblem.dev",
    "contact.emailAriaLabel": "Contact us",
    "social.githubAriaLabel": "GitHub",
    "social.youtubeAriaLabel": "YouTube",
    "social.linkedinAriaLabel": "LinkedIn",
    "notfound.title": "Not Found",
    "notfound.description": "The page you are looking for does not exist.",
    "notfound.home": "Home",
  },
  pl: {
    "site.name": "notaproblem.dev",
    "hero.tagline": "powstało, żebym mógł tworzyć własne produkty.",
    "hero.description":
      "Jeśli masz ciekawy pomysł, a ja czas - to stworzę aplikację również dla Ciebie.",
    "hero.descriptionSuffix": "To tyle. Cześć.",
    "contact.email": "problem@notaproblem.dev",
    "contact.emailAriaLabel": "Napisz",
    "social.githubAriaLabel": "GitHub",
    "social.youtubeAriaLabel": "YouTube",
    "social.linkedinAriaLabel": "LinkedIn",
    "notfound.title": "Nie znaleziono",
    "notfound.description": "Strona, której szukasz, nie istnieje.",
    "notfound.home": "Strona główna",
  },
};

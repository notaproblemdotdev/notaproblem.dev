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
    "hero.tagline": "founded to build products people enjoy.",
    "hero.description":
      "If you have the idea I like - I can also develop apps for you.",
    "hero.descriptionSuffix": "That's it. See you.",
    "projects.title": "Apps I'm building",
    "projects.visit": "Visit app",
    "projects.ainni.description":
      "A quiet space for journaling, reflection, and everyday notes.",
    "projects.factfeast.description":
      "A game of estimation, perspective, and surprising facts.",
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
    "hero.tagline": "founded to build products people enjoy.",
    "hero.description":
      "Jeśli masz ciekawy pomysł, a ja czas - to stworzę aplikację również dla Ciebie.",
    "hero.descriptionSuffix": "To tyle. Cześć.",
    "projects.title": "Aplikacje, które tworzę",
    "projects.visit": "Otwórz aplikację",
    "projects.ainni.description":
      "Spokojna przestrzeń na dziennik, refleksje i codzienne notatki.",
    "projects.factfeast.description":
      "Gra o szacowaniu, perspektywie i zaskakujących faktach.",
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

import { createMemo, createSignal, onCleanup, onMount, Show } from "solid-js";
import { dictionaries, type Locale } from "./i18n/dictionaries";

type Theme = "light" | "dark";

function getPathLocale(pathname: string): Locale {
  return pathname.startsWith("/pl") ? "pl" : "en";
}

function isKnownPath(pathname: string) {
  return pathname === "/" || pathname === "/en" || pathname === "/pl";
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12a12 12 0 0 0 8.207 11.387c.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.834 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.49 11.49 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.48 5.921.43.372.823 1.103.823 2.222v3.293c0 .319.192.694.801.576A12.001 12.001 0 0 0 24 12c0-6.627-5.373-12-12-12Z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 6.75A2.75 2.75 0 0 1 5.75 4h12.5A2.75 2.75 0 0 1 21 6.75v10.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25V6.75Zm2 .321v10.179c0 .414.336.75.75.75h12.5a.75.75 0 0 0 .75-.75V7.071l-6.393 4.687a1 1 0 0 1-1.214 0L5 7.071Zm1.154-1.071L12 10.287 17.846 6H6.154Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.75a.75.75 0 0 1 .75.75v1.75a.75.75 0 0 1-1.5 0V3.5a.75.75 0 0 1 .75-.75ZM12 17.25a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 4a.75.75 0 0 1 .75.75v-1.75a.75.75 0 0 1-1.5 0V22a.75.75 0 0 1 .75-.75ZM2.75 12a.75.75 0 0 1 .75-.75h1.75a.75.75 0 0 1 0 1.5H3.5a.75.75 0 0 1-.75-.75Zm15.5 0a.75.75 0 0 1 .75-.75h1.75a.75.75 0 0 1 0 1.5H19a.75.75 0 0 1-.75-.75ZM5.99 5.99a.75.75 0 0 1 1.06 0l1.24 1.24a.75.75 0 1 1-1.06 1.06L5.99 7.05a.75.75 0 0 1 0-1.06Zm10.72 10.72a.75.75 0 0 1 1.06 0l1.24 1.24a.75.75 0 0 1-1.06 1.06l-1.24-1.24a.75.75 0 0 1 0-1.06ZM5.99 18.01a.75.75 0 0 1 0-1.06l1.24-1.24a.75.75 0 1 1 1.06 1.06l-1.24 1.24a.75.75 0 0 1-1.06 0Zm10.72-10.72a.75.75 0 0 1 0-1.06l1.24-1.24a.75.75 0 1 1 1.06 1.06l-1.24 1.24a.75.75 0 0 1-1.06 0Z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13.5 2.75a.75.75 0 0 1 .56 1.25 7.25 7.25 0 1 0 5.94 11.69.75.75 0 0 1 1.31.62A8.75 8.75 0 1 1 12.88 3.02a.75.75 0 0 1 .62-.27Z" />
    </svg>
  );
}

export default function App() {
  const [pathname, setPathname] = createSignal(window.location.pathname);
  const [theme, setTheme] = createSignal<Theme>(
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );

  const locale = createMemo<Locale>(() => getPathLocale(pathname()));
  const t = (key: string) => dictionaries[locale()][key] ?? key;
  const notFound = createMemo(() => !isKnownPath(pathname()));

  const syncPath = () => setPathname(window.location.pathname);

  onMount(() => {
    window.addEventListener("popstate", syncPath);
    onCleanup(() => window.removeEventListener("popstate", syncPath));
  });

  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    syncPath();
  };

  const toggleLanguage = () => navigate(locale() === "en" ? "/pl" : "/en");

  const toggleTheme = () => {
    const next = theme() === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
  };

  return (
    <main class="page">
      <section class="card">
        <h1>notaproblem.dev</h1>

        <Show
          when={!notFound()}
          fallback={
            <>
              <p class="lead">
                {t("notfound.title")}
                <br />
                {t("notfound.description")}
              </p>
              <div class="actions">
                <button class="button" type="button" onClick={() => navigate(`/${locale()}`)}>
                  {t("notfound.home")}
                </button>
                <button class="icon-button" type="button" onClick={toggleTheme} aria-label={theme() === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
                  {theme() === "dark" ? <SunIcon /> : <MoonIcon />}
                </button>
              </div>
            </>
          }
        >
          <>
            <p class="lead">
              {t("hero.tagline")}
              <br />
              {t("hero.description")}
              <br />
              {t("hero.descriptionSuffix")}
            </p>

            <div class="actions">
              <a class="button" href={`mailto:${t("contact.email")}`} aria-label={t("contact.emailAriaLabel")}>
                <MailIcon />
                {t("contact.email")}
              </a>

              <a class="icon-button" href="https://github.com/notaproblemdotdev" target="_blank" rel="noreferrer" aria-label={t("social.githubAriaLabel")}>
                <GithubIcon />
              </a>
              <a class="icon-button" href="https://www.youtube.com/@notaproblemdotdev" target="_blank" rel="noreferrer" aria-label={t("social.youtubeAriaLabel")}>
                <YoutubeIcon />
              </a>
              <a class="icon-button" href="https://www.linkedin.com/company/notaproblemdotdev" target="_blank" rel="noreferrer" aria-label={t("social.linkedinAriaLabel")}>
                <LinkedinIcon />
              </a>
              <button class="icon-button text-button" type="button" onClick={toggleLanguage} aria-label="Switch language">
                {locale() === "en" ? "PL" : "EN"}
              </button>
              <button class="icon-button" type="button" onClick={toggleTheme} aria-label={theme() === "dark" ? "Switch to light theme" : "Switch to dark theme"}>
                {theme() === "dark" ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>
          </>
        </Show>
      </section>
    </main>
  );
}

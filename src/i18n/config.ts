export const locales = ["de", "en", "ar", "tr", "ru", "uk", "pl", "bg", "ro"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "de";

// Labels are shown in English on purpose (per product decision), regardless
// of the active locale, so the language list itself is always legible.
export const localeMeta: Record<Locale, { label: string; dir: "ltr" | "rtl" }> = {
  de: { label: "German", dir: "ltr" },
  en: { label: "English", dir: "ltr" },
  ar: { label: "Arabic", dir: "rtl" },
  tr: { label: "Turkish", dir: "ltr" },
  ru: { label: "Russian", dir: "ltr" },
  uk: { label: "Ukrainian", dir: "ltr" },
  pl: { label: "Polish", dir: "ltr" },
  bg: { label: "Bulgarian", dir: "ltr" },
  ro: { label: "Romanian", dir: "ltr" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Builds the href for `path` (e.g. "/vision", "/") in `locale`.
 * The default locale is unprefixed; all others are prefixed with /{locale}.
 */
export function localeHref(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path;
  return locale === defaultLocale ? clean || "/" : `/${locale}${clean}`;
}

/**
 * Strips a leading locale segment from a pathname, returning the
 * locale-agnostic path (e.g. "/en/vision" -> "/vision", "/" -> "/").
 */
export function stripLocale(pathname: string): string {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  if (maybeLocale && isLocale(maybeLocale)) {
    const rest = "/" + segments.slice(2).join("/");
    return rest === "/" ? "/" : rest.replace(/\/$/, "") || "/";
  }
  return pathname === "" ? "/" : pathname;
}

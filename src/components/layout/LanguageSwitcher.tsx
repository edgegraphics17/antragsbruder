"use client";

import { useRouter, usePathname } from "next/navigation";
import { locales, localeMeta, localeHref, stripLocale, type Locale } from "@/i18n/config";

export function LanguageSwitcher({
  locale,
  label,
  className = "",
}: {
  locale: Locale;
  label: string;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(next: string) {
    const bare = stripLocale(pathname);
    router.push(localeHref(next as Locale, bare));
  }

  return (
    <select
      aria-label={label}
      value={locale}
      onChange={(e) => handleChange(e.target.value)}
      className={className}
    >
      {locales.map((l) => (
        <option key={l} value={l}>
          {localeMeta[l].label}
        </option>
      ))}
    </select>
  );
}

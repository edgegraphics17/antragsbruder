import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const segments = pathname.split("/");
  const maybeLocale = segments[1];

  if (maybeLocale && isLocale(maybeLocale)) {
    // Default locale is served unprefixed: redirect /de/... to the clean URL.
    if (maybeLocale === defaultLocale) {
      const rest = "/" + segments.slice(2).join("/");
      const clean = (rest === "/" ? "" : rest.replace(/\/$/, "")) || "/";
      return NextResponse.redirect(new URL(clean + search, request.url));
    }
    return NextResponse.next();
  }

  // No locale prefix: rewrite internally to the default locale route.
  return NextResponse.rewrite(new URL(`/${defaultLocale}${pathname}${search}`, request.url));
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

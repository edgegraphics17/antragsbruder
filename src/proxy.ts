import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { defaultLocale, isLocale } from "@/i18n/config";

// Dashboard-Routen (nach Locale-Strip). `/dashboard` selbst ist die
// Übersicht; `/dashboard/upload` bleibt ebenfalls. `/dashboard/<id>` ist
// ein Legacy-Pfad und wird unten nach `/antraege/<id>` umgeleitet.
const PROTECTED_PREFIXES = [
  "dashboard",
  "antraege",
  "dokumente",
  "foerderungen",
  "profil",
];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function stripLocale(pathname: string): { locale: string; rest: string } {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  if (maybeLocale && isLocale(maybeLocale)) {
    return { locale: maybeLocale, rest: "/" + segments.slice(2).join("/") };
  }
  return { locale: defaultLocale, rest: pathname };
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const { locale, rest } = stripLocale(pathname);

  // Legacy-Pfad: /dashboard/<id> (Case-Detail) lebt jetzt unter /antraege/<id>.
  // Bekannte Sub-Seiten des Dashboards sind ausgenommen.
  const DASHBOARD_SUBPAGES = new Set([
    "upload",
    "dokumente",
    "foerderungen",
    "profil",
  ]);
  const legacyDetail = rest.match(/^\/dashboard\/([^/]+)$/);
  if (legacyDetail && !DASHBOARD_SUBPAGES.has(legacyDetail[1])) {
    const prefix = locale === defaultLocale ? "" : `/${locale}`;
    return NextResponse.redirect(
      new URL(`${prefix}/antraege/${legacyDetail[1]}${search}`, request.url),
    );
  }

  // Auth-Schutz: Dashboard-Routen serverseitig prüfen, BEVOR HTML
  // generiert wird — kein Flackern durch Client-Redirects.
  const restClean = rest.replace(/\/$/, "") || "/";
  const firstSegment = restClean.split("/")[1] ?? "";
  const isProtected = PROTECTED_PREFIXES.includes(firstSegment);

  if (isProtected) {
    const response = NextResponse.next({ request });

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value } of cookiesToSet) {
            request.cookies.set(name, value);
          }
          for (const { name, value, options } of cookiesToSet) {
            response.cookies.set(name, value, options);
          }
        },
      },
    });

    // getUser() validiert das Token gegen den Supabase-Auth-Server.
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const prefix = locale === defaultLocale ? "" : `/${locale}`;
      const nextPath =
        locale === defaultLocale ? restClean + search : pathname + search;
      const loginUrl = new URL(`${prefix}/anmelden`, request.url);
      loginUrl.searchParams.set("next", nextPath);
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  if (isLocale(request.nextUrl.pathname.split("/")[1])) {
    // Nicht-Default-Locale: URL bleibt prefixiert.
    if (locale !== defaultLocale) return NextResponse.next();
    // Default-Locale wird ohne Prefix ausgeliefert: /de/... → /...
    const prefixSegments = request.nextUrl.pathname.split("/");
    const clean =
      ("/" + prefixSegments.slice(2).join("/")).replace(/\/$/, "") || "/";
    return NextResponse.redirect(new URL(clean + search, request.url));
  }

  // Kein Locale-Prefix: intern auf die Default-Locale-Route rewriten.
  return NextResponse.rewrite(
    new URL(`/${defaultLocale}${pathname}${search}`, request.url),
  );
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

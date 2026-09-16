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

// Sub-Seiten, die früher unter /dashboard/<x> geplant waren und jetzt
// top-level leben — Legacy-Redirect auf die neue URL.
const LEGACY_SUBPAGE_REDIRECTS = new Set([
  "dokumente",
  "foerderungen",
  "profil",
]);

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

// Kopiert die vom Auth-Check ggf. refresheten Cookies auf die finale
// Response, damit die Session-Rotation nicht verloren geht.
function carryCookies(from: NextResponse, to: NextResponse) {
  for (const cookie of from.cookies.getAll()) {
    const withOptions = cookie as typeof cookie & {
      options?: Record<string, unknown>;
    };
    to.cookies.set(
      withOptions.name,
      withOptions.value,
      withOptions.options as never,
    );
  }
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const { locale, rest } = stripLocale(pathname);

  // Legacy: /dashboard/<id> → /antraege/<id>; frühere /dashboard/<subpage>-
  // Pfade → top-level /<subpage>. /dashboard/upload ist eine echte Route.
  const legacyDetail = rest.match(/^\/dashboard\/([^/]+)$/);
  if (legacyDetail && LEGACY_SUBPAGE_REDIRECTS.has(legacyDetail[1])) {
    const prefix = locale === defaultLocale ? "" : `/${locale}`;
    return NextResponse.redirect(
      new URL(`${prefix}/${legacyDetail[1]}${search}`, request.url),
    );
  }
  if (legacyDetail && legacyDetail[1] !== "upload") {
    const prefix = locale === defaultLocale ? "" : `/${locale}`;
    return NextResponse.redirect(
      new URL(`${prefix}/antraege/${legacyDetail[1]}${search}`, request.url),
    );
  }

  // Auth-Schutz: Dashboard-Routen serverseitig prüfen, BEVOR HTML
  // generiert wird — kein Flackern durch Client-Redirects.
  // WICHTIG: Nach bestandenem Check NICHT vorzeitig next() zurückgeben,
  // sondern in die Locale-Behandlung unten fallen — sonst bleibt die URL
  // unpräfixt stehen und matched [locale]='dashboard' → 500.
  const restClean = rest.replace(/\/$/, "") || "/";
  const firstSegment = restClean.split("/")[1] ?? "";
  const isProtected = PROTECTED_PREFIXES.includes(firstSegment);

  let authResponse: NextResponse | null = null;

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

    authResponse = response;
  }

  // Locale-Behandlung (gilt auch für geschützte Routen nach dem Auth-Check).
  const segments = request.nextUrl.pathname.split("/");
  let finalResponse: NextResponse;

  if (segments[1] && isLocale(segments[1])) {
    if (segments[1] !== defaultLocale) {
      // Nicht-Default-Locale: URL bleibt prefixiert.
      finalResponse = NextResponse.next();
    } else {
      // Default-Locale wird ohne Prefix ausgeliefert: /de/... → /...
      const clean =
        ("/" + segments.slice(2).join("/")).replace(/\/$/, "") || "/";
      finalResponse = NextResponse.redirect(new URL(clean + search, request.url));
    }
  } else {
    // Kein Locale-Prefix: intern auf die Default-Locale-Route rewriten.
    finalResponse = NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}${search}`, request.url),
    );
  }

  if (authResponse) {
    carryCookies(authResponse, finalResponse);
  }

  return finalResponse;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};

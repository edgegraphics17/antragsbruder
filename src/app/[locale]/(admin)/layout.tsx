// ============================================================
// ADMIN-LAYOUT — Guard als Server Component (kein Middleware-Check:
// der läuft im Edge-Runtime und wäre für DB-Checks fehleranfällig).
// Kein User → /anmelden · kein Admin → /dashboard (stills Weiterleiten,
// damit Admin-Routen für Normalbürger nicht existieren).
// ============================================================
import { notFound, redirect } from 'next/navigation';
import { isLocale, localeHref } from '@/i18n/config';
import { getAdminUser } from '@/lib/admin';
import { AdminMobileNav, AdminSidebar } from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;

  const admin = await getAdminUser();
  if (!admin) {
    // Eingeloggter Nicht-Admin → Dashboard (kein Hinweis auf Admin-Existenz).
    // Ausgeloggt → Login.
    redirect(localeHref(locale, '/dashboard'));
  }

  return (
    <div className="min-h-dvh bg-cream">
      <AdminSidebar locale={locale} />
      <AdminMobileNav locale={locale} />
      <div className="lg:pl-60">
        <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">{children}</main>
      </div>
    </div>
  );
}

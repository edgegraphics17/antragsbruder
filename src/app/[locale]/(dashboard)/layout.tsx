import { DashboardSidebar } from '@/components/dashboard/Sidebar';
import { OnboardingModal } from '@/components/dashboard/OnboardingModal';
import { LocaleSync } from '@/components/dashboard/LocaleSync';
import type { Metadata } from 'next';

// Dashboard ist ein persönlicher, angemeldeter Bereich – niemals indexieren.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

// Dashboard-Layout: Dunkle Sidebar (Desktop) / Top-Bar + Tab-Bar (Mobile).
// Auth-Schutz passiert serverseitig in src/proxy.ts — dieses Layout
// kümmert sich ausschließlich um das Design.
// Bottom-Padding auf Mobile schafft Platz für die Tab-Bar inkl. Safe-Area.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-cream">
      <LocaleSync />
      <DashboardSidebar />
      <OnboardingModal />
      <div className="lg:pl-64">
        {/* Zentrierte Content-Breite: keine Überdehnung auf Widescreen */}
        <main className="mx-auto w-full max-w-6xl min-h-dvh px-4 pb-[calc(7rem+env(safe-area-inset-bottom))] md:px-6 lg:pb-0 lg:py-2">
          {children}
        </main>
      </div>
    </div>
  );
}

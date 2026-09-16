import { DashboardSidebar } from '@/components/dashboard/Sidebar';
import { OnboardingModal } from '@/components/dashboard/OnboardingModal';

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
      <DashboardSidebar />
      <OnboardingModal />
      <div className="lg:pl-64">
        <main className="min-h-dvh pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
          {children}
        </main>
      </div>
    </div>
  );
}

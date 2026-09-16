import { DashboardSidebar } from '@/components/dashboard/Sidebar';

// Dashboard-Layout: Dunkle Sidebar (Desktop) / Top-Bar mit Menü (Mobile).
// Auth-Schutz passiert serverseitig in src/proxy.ts — dieses Layout
// kümmert sich ausschließlich um das Design.
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-cream">
      <DashboardSidebar />
      <div className="lg:pl-64">
        <main className="min-h-dvh">{children}</main>
      </div>
    </div>
  );
}

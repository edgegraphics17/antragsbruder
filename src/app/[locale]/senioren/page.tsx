import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/Badge";
import { CTASection } from "@/components/sections/CTASection";
import { IconHeart } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Für Senioren & Angehörige",
  description: "Viele Verwaltungsprozesse werden zunehmend digital. Antragsbruder unterstützt Senioren und ihre Angehörigen dabei, den Überblick zu behalten.",
};

export default function SeniorenPage() {
  return (
    <>
      <section>
        <Container className="py-16 sm:py-20">
          <IconHeart className="h-8 w-8 text-brand-800" />
          <h1 className="font-display mt-4 max-w-2xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Respektvolle Unterstützung, kein Ersatz für Eigenständigkeit.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">
            Viele Verwaltungsprozesse werden zunehmend digital abgewickelt. Angehörige leben teilweise weit entfernt,
            und Dokumente werden schnell unübersichtlich. Antragsbruder möchte hier unterstützend wirken – für
            Seniorinnen und Senioren selbst und für ihre Angehörigen.
          </p>
        </Container>
      </section>

      <section className="bg-cream-deep/60">
        <Container className="py-16">
          <SectionHeading eyebrow="Jetzt schon möglich" title="Menschliche Unterstützung, wenn digitale Wege schwerfallen" />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-line-soft bg-white p-5 text-sm text-ink-soft">
              Behördenbriefe verständlich erklärt – ohne Fachjargon.
            </div>
            <div className="rounded-3xl border border-line-soft bg-white p-5 text-sm text-ink-soft">
              Unterstützung bei der Zusammenstellung von Unterlagen für Anträge.
            </div>
            <div className="rounded-3xl border border-line-soft bg-white p-5 text-sm text-ink-soft">
              Digitalisierung wichtiger Papiere für einen besseren Überblick.
            </div>
            <div className="rounded-3xl border border-line-soft bg-white p-5 text-sm text-ink-soft">
              Persönlicher Ansprechpartner bei Rückfragen zum Vorgang.
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <StatusBadge status="vision" />
          <h2 className="font-display mt-4 text-2xl font-bold text-ink sm:text-3xl">
            Gemeinsame Übersicht für Angehörige
          </h2>
          <p className="mt-3 max-w-2xl text-ink-soft">
            Langfristig sollen berechtigte Familienmitglieder gemeinsam Übersicht über Dokumente und Fristen
            behalten können – ausschließlich mit Einwilligung und einem sauberen Berechtigungsmodell. Diese Funktion
            ist noch nicht verfügbar.
          </p>
        </Container>
      </section>

      <CTASection
        title="Wir helfen gerne – in deinem Tempo."
        primaryLabel="Jetzt Hilfe anfragen"
        primaryHref="/hilfe-starten"
      />
    </>
  );
}

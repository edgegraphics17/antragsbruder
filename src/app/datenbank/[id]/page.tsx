import { notFound } from "next/navigation";
import Link from "next/link";
import { getBenefitById, getAllBenefits } from "../data";
import type { Benefit } from "../data";

export function generateStaticParams() {
  const benefits = getAllBenefits();
  return benefits.map((b) => ({ id: b.id }));
}

export default async function BenefitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const benefit = getBenefitById(id);

  if (!benefit) {
    notFound();
  }

  return (
    <BenefitDetail benefit={benefit} />
  );
}

function BenefitDetail({ benefit }: { benefit: Benefit }) {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-brand-950 text-cream py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/datenbank" className="text-brand-300 hover:text-cream text-sm">
            ← Zurück zur Datenbank
          </Link>
          <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold">
            {benefit.official_name}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-full bg-brand-800 px-3 py-1 text-xs font-medium text-cream">
              {benefit.category}
            </span>
            <span className="inline-flex items-center rounded-full bg-brand-800 px-3 py-1 text-xs font-medium text-cream">
              {benefit.subcategory}
            </span>
            <span className="inline-flex items-center rounded-full bg-green-700 px-3 py-1 text-xs font-medium text-white">
              ✓ Verifiziert
            </span>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Quick Info */}
        <section className="rounded-2xl border border-line-soft bg-white p-6 mb-8">
          <h2 className="font-display text-xl font-bold text-ink mb-4">Kurzübersicht</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase text-ink-soft">Zielgruppe</p>
              <p className="mt-1 text-sm text-ink">{benefit.target_groups?.join(", ")}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-ink-soft">Zuständige Stelle</p>
              <p className="mt-1 text-sm text-ink">{benefit.provider?.name}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-ink-soft">Art der Leistung</p>
              <p className="mt-1 text-sm text-ink">{benefit.type.replace(/_/g, " ")}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-ink-soft">Geltungsbereich</p>
              <p className="mt-1 text-sm text-ink">{benefit.level === "federal" ? "Bundesweit" : benefit.level}</p>
            </div>
          </div>
        </section>

        {/* Eligibility */}
        <section className="rounded-2xl border border-line-soft bg-white p-6 mb-8">
          <h2 className="font-display text-xl font-bold text-ink mb-4">Voraussetzungen</h2>
          <ul className="space-y-3">
            {benefit.eligibility?.rules?.map((rule) => (
              <li key={rule.rule_id} className="flex items-start gap-3">
                <span className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${rule.required ? "bg-red-500" : "bg-brand-600"}`}>
                  {rule.required ? "!" : "?"}
                </span>
                <div>
                  <p className="text-sm text-ink">{rule.description}</p>
                  <p className="text-xs text-ink-soft">{rule.condition}</p>
                </div>
              </li>
            ))}
          </ul>
          {benefit.eligibility?.special_conditions && benefit.eligibility.special_conditions.length > 0 && (
            <div className="mt-4 rounded-xl bg-brand-50 p-4">
              <p className="text-xs font-semibold uppercase text-brand-700 mb-2">Besondere Hinweise</p>
              <ul className="space-y-1">
                {benefit.eligibility.special_conditions.map((cond, i) => (
                  <li key={i} className="text-sm text-ink-soft">• {cond}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* Calculation */}
        <section className="rounded-2xl border border-line-soft bg-white p-6 mb-8">
          <h2 className="font-display text-xl font-bold text-ink mb-4">Berechnung & Höhe</h2>
          <p className="text-sm text-ink mb-4">{benefit.calculation?.method}</p>
          {benefit.calculation?.steps && benefit.calculation.steps.length > 0 && (
            <ol className="space-y-3">
              {benefit.calculation.steps.map((step) => (
                <li key={step.step} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-900 text-xs font-bold text-cream">
                    {step.step}
                  </span>
                  <div>
                    <p className="text-sm text-ink">{step.description}</p>
                    {"formula" in step && step.formula && <p className="text-xs text-ink-soft font-mono">{step.formula}</p>}
                    {"value" in step && step.value && <p className="text-xs font-semibold text-brand-700">{step.value}</p>}
                  </div>
                </li>
              ))}
            </ol>
          )}
          {benefit.amount?.description && (
            <div className="mt-4 rounded-xl bg-green-50 border border-green-200 p-4">
              <p className="text-sm text-green-800">{benefit.amount.description}</p>
            </div>
          )}
        </section>

        {/* Application */}
        <section className="rounded-2xl border border-line-soft bg-white p-6 mb-8">
          <h2 className="font-display text-xl font-bold text-ink mb-4">Antragstellung</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase text-ink-soft">Antragsweg</p>
              <p className="mt-1 text-sm text-ink">{benefit.application?.method}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-ink-soft">Bearbeitungszeit</p>
              <p className="mt-1 text-sm text-ink">{benefit.application?.processing_time || "Nicht angegeben"}</p>
            </div>
          </div>
          {benefit.application?.required_documents && benefit.application.required_documents.length > 0 && (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase text-ink-soft mb-2">Benötigte Unterlagen</p>
              <ul className="space-y-1">
                {benefit.application.required_documents.map((doc, i) => (
                  <li key={i} className="text-sm text-ink-soft">• {doc}</li>
                ))}
              </ul>
            </div>
          )}
          {benefit.application?.url && (
            <a
              href={benefit.application.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-900 px-4 py-2 text-sm font-medium text-cream hover:bg-brand-800"
            >
              Zum Antrag →
            </a>
          )}
        </section>

        {/* Legal */}
        <section className="rounded-2xl border border-line-soft bg-white p-6 mb-8">
          <h2 className="font-display text-xl font-bold text-ink mb-4">Rechtsgrundlagen</h2>
          <ul className="space-y-1">
            {benefit.legal_basis?.map((law, i) => (
              <li key={i} className="text-sm text-ink-soft">{law}</li>
            ))}
          </ul>
        </section>

        {/* Sources */}
        <section className="rounded-2xl border border-line-soft bg-white p-6">
          <h2 className="font-display text-xl font-bold text-ink mb-4">Quellen</h2>
          <ul className="space-y-3">
            {benefit.official_sources?.map((source, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                  {source.type === "law" ? "§" : "Q"}
                </span>
                <div>
                  <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-700 hover:underline">
                    {source.title}
                  </a>
                  <p className="text-xs text-ink-soft">{source.organization} • Geprüft: {source.last_verified}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

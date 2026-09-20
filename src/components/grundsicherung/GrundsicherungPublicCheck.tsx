"use client";

// ============================================================
// GRUNDSICHERUNG CHECK — Öffentliche Variante für die Website
// (/grundsicherungsrechner, verlinkt unter /tools)
// Gleiche 6-Block-Engine-Evaluierung wie im Dashboard, aber ohne
// Store/Login: lokaler State, Ampel + SPANNE statt Centbetrag,
// CTA in den Antrags-Flow. Texte kommen aus dem Dashboard-
// Wörterbuch (fehlende Sprachen fallen auf Deutsch zurück),
// Disclaimer aus dem Website-Wörterbuch.
// ============================================================

import { useState } from "react";
import { useRouter } from "next/navigation";
import { languages, dict, type LangCode } from "@/content/grundsicherung-i18n";
import {
  GrundsicherungCheckQuestionnaire,
  GrundsicherungCheckResultView,
  emptyCheck,
} from "@/components/grundsicherung/GrundsicherungCheck";
import { getDashboardDict } from "@/content/i18n/dashboard";
import type { GsCheckResult, GsCheckState } from "@/engine/benefit-engines/grundsicherung";
import { localeHref } from "@/i18n/config";

export function GrundsicherungPublicCheck({ locale }: { locale: LangCode }) {
  const langMeta = languages.find((l) => l.code === locale)!;
  const t = getDashboardDict(locale).grundsicherung.check;
  const tSite = dict[locale];
  const router = useRouter();

  const [state, setState] = useState<GsCheckState>(emptyCheck);
  const [result, setResult] = useState<GsCheckResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function changeLanguage(next: string) {
    router.push(localeHref(next as LangCode, "/grundsicherungsrechner"));
  }

  async function submit() {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/rechner/grundsicherung/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ check: state }),
      });
      const json = (await res.json()) as { result?: GsCheckResult; error?: string };
      if (!res.ok || !json.result) throw new Error(json.error ?? "Fehler");
      setResult(json.result);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(t.calcError);
    } finally {
      setSubmitting(false);
    }
  }

  function goToApplication() {
    // Mit den Check-Angaben in den Antrags-Flow (Dashboard)
    router.push(localeHref(locale, "/dashboard/grundsicherung"));
  }

  return (
    <div dir={langMeta.dir} className="mx-auto w-full max-w-xl">
      {/* Sprachumschalter */}
      <div className="mb-6 flex justify-end">
        <label className="sr-only" htmlFor="gs-lang">
          Language
        </label>
        <select
          id="gs-lang"
          value={locale}
          onChange={(e) => changeLanguage(e.target.value)}
          className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink focus-visible:outline-2 focus-visible:outline-brand-700"
        >
          {languages.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-3xl border border-line-soft bg-white p-4 sm:p-6">
        {result ? (
          <GrundsicherungCheckResultView
            t={t}
            result={result}
            onContinue={goToApplication}
            onRestart={() => setResult(null)}
          />
        ) : (
          <GrundsicherungCheckQuestionnaire
            t={t}
            state={state}
            onChange={setState}
            onSubmit={() => void submit()}
            submitting={submitting}
            error={error}
          />
        )}
      </div>

      <div className="mt-6 rounded-3xl border border-brand-800/30 bg-brand-50 p-5 text-sm leading-relaxed text-ink-soft">
        <p className="mb-1 font-semibold text-brand-900">{tSite.disclaimerTitle}</p>
        <p>{tSite.disclaimerText}</p>
      </div>
    </div>
  );
}

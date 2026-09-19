'use client';

// ============================================================
// APPLICATION-FOOTER — Navigation & Verfolgung für laufende Anträge.
// Schwebende Karte unten (Rounded-Steps-Design). Der aktive Schritt
// ist klickbar und führt direkt zur passenden Stage des Antrags.
// Ist der Antrag eingereicht, ersetzt eine Bestätigungs-Karte den
// Stepper ("Antrag ist raus, Rückmeldung wird erwartet").
// Wird nur gerendert, wenn mindestens ein Antrag läuft.
// Texte über getDashboardDict (home.timeline.*, home.stepsProgress).
// ============================================================

import { Fragment } from 'react';
import Link from 'next/link';
import { useLocaleFromPath } from '@/i18n/use-locale';
import { getDashboardDict } from '@/content/i18n/dashboard';
import { formatTemplate } from '@/content/i18n/format';

// Nur IDs im Code — Label kommen aus dem Dict (home.timeline).
const STEPS = ['docs', 'data', 'submit', 'receive'] as const;

export interface TimelineState {
  activeStep: number; // 1-4
  completedSteps: number[];
}

export interface TimelineHeader {
  title: string;
  statusLabel: string;
  badgeCls: string;
}

interface Props {
  timeline: TimelineState;
  header?: TimelineHeader | null;
  /** Link des aktiven Schritts — macht den aktuellen Punkt klickbar. */
  activeHref?: string | null;
  /** Antrag eingereicht → Bestätigungs-Karte statt Stepper. */
  submitted?: boolean;
}

const iconBase =
  'flex h-9 w-9 items-center justify-center rounded-[14px] transition-all duration-500 md:h-10 md:w-10 md:rounded-2xl';

function CheckIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path
        d="M4.5 10.5l4 4 7-8.5"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ApplicationTimeline({
  timeline,
  header = null,
  activeHref = null,
  submitted = false,
}: Props) {
  const locale = useLocaleFromPath();
  const t = getDashboardDict(locale).home;
  const done = timeline.completedSteps.length;
  const activeStep = t.timeline[STEPS[timeline.activeStep - 1]];
  const progressText = formatTemplate(t.stepsProgress, { done });

  return (
    // Wrapper ohne Pointer-Events: nur die Karte selbst ist klickbar,
    // der umliegende Streifen blockiert die Seite nicht.
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pb-[calc(5rem+env(safe-area-inset-bottom))] md:px-6 md:pb-5 lg:left-64">
      {submitted ? (
        /* Bestätigung statt Fortschritt: Antrag ist raus, Rückmeldung wird erwartet. */
        <div className="pointer-events-auto mx-auto max-w-4xl rounded-3xl bg-white/95 p-4 shadow-[0_12px_40px_-12px_rgba(18,48,47,0.25)] ring-1 ring-line-soft backdrop-blur-md md:p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
              <CheckIcon className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">{t.submittedTitle}</p>
              <p className="mt-0.5 text-xs leading-snug text-ink-soft">{t.submittedText}</p>
            </div>
            {header && (
              <span
                className={`hidden shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold md:inline-block ${header.badgeCls}`}
              >
                {header.statusLabel}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="pointer-events-auto mx-auto max-w-4xl rounded-3xl bg-white/95 p-4 shadow-[0_12px_40px_-12px_rgba(18,48,47,0.25)] ring-1 ring-line-soft backdrop-blur-md md:p-6">
          {/* Kopfreihe: Antrag + Status (Desktop) | Schritte-Zähler */}
          <div className="flex items-center justify-between gap-3">
            {header ? (
              <div className="hidden min-w-0 items-center gap-2 md:flex">
                <span className="truncate text-sm font-semibold text-ink">{header.title}</span>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${header.badgeCls}`}
                >
                  {header.statusLabel}
                </span>
              </div>
            ) : (
              <span className="hidden md:block" />
            )}
            <span className="ml-auto shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
              {progressText}
            </span>
          </div>

          {/* Stepper: aktiver Schritt ist klickbar (direkt zur Stage) */}
          <div
            className="mt-3 flex items-start"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={STEPS.length}
            aria-valuenow={done}
            aria-label={progressText}
          >
            {STEPS.map((id, i) => {
              const num = i + 1;
              const completed = timeline.completedSteps.includes(num);
              const isActive = timeline.activeStep === num;
              const step = t.timeline[id];
              const clickable = isActive && activeHref !== null;

              const icon =
                completed ? (
                  <div className={`${iconBase} bg-brand-600 text-white shadow-md shadow-brand-600/30`}>
                    <CheckIcon />
                  </div>
                ) : isActive ? (
                  <div
                    className={`${iconBase} bg-brand-600 text-white ring-4 ring-brand-200 ${
                      clickable ? 'group-hover:scale-110' : ''
                    }`}
                  >
                    <span className="block h-3 w-3 rounded-[4px] bg-white" />
                  </div>
                ) : (
                  <div className={`${iconBase} bg-brand-50 ring-1 ring-line-soft`}>
                    <span className="block h-2.5 w-2.5 rounded-[3px] bg-brand-200" />
                  </div>
                );

              return (
                <Fragment key={id}>
                  {i > 0 && (
                    <div
                      aria-hidden
                      className={`mt-4 h-1 flex-1 rounded-full transition-colors duration-500 md:mt-[18px] ${
                        timeline.completedSteps.includes(num - 1) ? 'bg-brand-600' : 'bg-line-soft'
                      }`}
                    />
                  )}
                  <div className="flex w-16 shrink-0 flex-col items-center gap-1.5 md:w-28">
                    {clickable ? (
                      <Link
                        href={activeHref}
                        title={step.label}
                        aria-label={`${step.label} — weiterarbeiten`}
                        className="group -m-1 flex flex-col items-center rounded-2xl p-1"
                      >
                        {icon}
                      </Link>
                    ) : (
                      icon
                    )}
                    <p
                      className={`hidden text-xs font-semibold leading-tight md:block ${
                        completed || isActive ? 'text-ink' : 'text-ink-soft'
                      }`}
                    >
                      {step.label}
                    </p>
                  </div>
                </Fragment>
              );
            })}
          </div>

          {/* Aktiver Schritt — kompakte Zeile (nur Mobile) */}
          <p className="mt-3 truncate text-center text-xs text-ink-soft md:hidden">
            <span className="font-semibold text-ink">{activeStep.label}</span>
          </p>
        </div>
      )}
    </div>
  );
}
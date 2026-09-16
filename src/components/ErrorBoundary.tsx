// ============================================================
// REACT ERROR BOUNDARY — Fängt unbehandelte Client-Fehler
// und zeigt eine Fallback-Oberfläche statt eines weißen Screens.
// ============================================================

'use client';

import { Component, type ReactNode, type ErrorInfo } from 'react';
import { ButtonAction } from '@/components/ui/Button';
import { IconAlertTriangle } from '@/components/ui/icons';

interface ErrorBoundaryProps {
  children: ReactNode;
  /** Optionaler Reset-Callback (z. B. router.refresh) */
  onReset?: () => void;
  /** Sprache für Texte (de / en) */
  locale?: 'de' | 'en';
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // In Production: hier Sentry.trackError(error, {
    //   componentStack: errorInfo.componentStack,
    // });
    console.error('[ErrorBoundary] Fehler erfasst:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    this.props.onReset?.();
  };

  render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const t = this.props.locale === 'en' ? english : german;

    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-lg rounded-3xl border border-red-200 bg-red-50/80 p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <IconAlertTriangle className="h-6 w-6 text-red-600" />
          </div>

          <h2 className="text-xl font-bold text-ink">{t.title}</h2>
          <p className="mt-2 text-sm text-ink-soft">{t.message}</p>

          {/* Fehlerdetails nur in Development anzeigen */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className="mt-4 max-h-48 overflow-auto rounded-xl bg-white p-4 text-left text-xs text-ink-soft break-all whitespace-pre-wrap border">
              <span className="font-semibold text-ink">Fehler:</span>
              <pre className="mt-1">{this.state.error instanceof Error ? this.state.error.stack : undefined}</pre>
            </div>
          )}

          {this.state.errorInfo && (
            <div className="mt-2 max-h-32 overflow-auto rounded-xl bg-white p-3 text-left text-xs text-ink-soft break-all">
              <span className="font-semibold text-ink">Komponenten-Stack:</span>
              <pre className="mt-1">{this.state.errorInfo.componentStack}</pre>
            </div>
          )}

          <div className="mt-6 flex flex-col items-center gap-3">
            <ButtonAction
              type="button"
              variant="primary"
              size="md"
              onClick={this.handleReset}
            >
              {t.resetButton}
            </ButtonAction>
            <p className="text-xs text-ink-soft">{t.hint}</p>
          </div>
        </div>
      </div>
    );
  }
}

const german = {
  title: 'Etwas ist schiefgelaufen',
  message:
    'Eine unerwartete Fehlermeldung ist aufgetreten. Das Team wurde benachrichtigt. Bitte lade die Seite neu oder versuche es später erneut.',
  resetButton: 'Seite neu laden',
  hint: 'Wenn das Problem weiterhin auftritt, kontaktiere support@antragsbruder.de',
};

const english = {
  title: 'Something went wrong',
  message:
    'An unexpected error occurred. The team has been notified. Please refresh the page or try again later.',
  resetButton: 'Refresh page',
  hint: 'If the problem persists, contact support@antragsbruder.de',
};

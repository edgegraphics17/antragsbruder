// ============================================================
// Wraps one or more React components in an ErrorBoundary.
// Usage in Layouts/Pages:
//   <ErrorBoundaryFallback>{children}</ErrorBoundaryFallback>
// ============================================================

import { ErrorBoundary } from './ErrorBoundary';

interface ErrorBoundaryFallbackProps {
  children: React.ReactNode;
  locale?: 'de' | 'en';
  onReset?: () => void;
}

export function ErrorBoundaryFallback({ children, locale = 'de', onReset }: ErrorBoundaryFallbackProps) {
  return (
    <ErrorBoundary locale={locale} onReset={onReset}>
      {children}
    </ErrorBoundary>
  );
}

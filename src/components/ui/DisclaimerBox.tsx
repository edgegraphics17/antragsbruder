export function DisclaimerBox({
  title = "Wichtig zu wissen",
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-green-800/30 bg-green-50 p-5 sm:p-6 ${className}`}>
      <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-green-900">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {title}
      </p>
      <div className="text-sm leading-relaxed text-ink-soft">{children}</div>
    </div>
  );
}

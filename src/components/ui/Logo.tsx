export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <span className={`relative flex shrink-0 items-center justify-center rounded-full bg-brand-600 text-cream ${className}`}>
      <svg viewBox="0 0 24 24" fill="none" className="h-[58%] w-[58%]" aria-hidden="true">
        <path
          d="M8 21v-8.2c0-.6-.24-1.17-.66-1.6L4 7.7c-.5-.5-.5-1.32 0-1.83a1.3 1.3 0 0 1 1.83 0L9 9v-.5A2.5 2.5 0 0 1 11.5 6c.5 0 1 .2 1.4.55.4-.35.9-.55 1.4-.55A2.5 2.5 0 0 1 16.8 8h.7a2.5 2.5 0 0 1 2.45 3l-.9 6.3A3 3 0 0 1 16.08 20H9"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display leading-[0.95] font-extrabold tracking-tight ${className}`}>
      <span className="block text-ink">Antrags</span>
      <span className="block text-brand-600">Bruder</span>
    </span>
  );
}

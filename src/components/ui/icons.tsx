type IconProps = { className?: string };

const base = "stroke-current";

export function IconDocument({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M14 3v5h5" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 13h6M9 17h6M9 9h2" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconClock({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <circle cx="12" cy="12" r="9" strokeWidth="1.7" />
      <path d="M12 7v5l3.5 2" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconShield({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path d="M12 3 4.5 5.6V11c0 5 3.2 8.4 7.5 10 4.3-1.6 7.5-5 7.5-10V5.6L12 3Z" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconHeart({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path
        d="M12 20s-7-4.35-9.5-8.8C.8 7.9 2.4 4.5 6 4.1c2-.22 3.6.8 6 3 2.4-2.2 4-3.22 6-3 3.6.4 5.2 3.8 3.5 7.1C19 15.65 12 20 12 20Z"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconSpark({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconCheck({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCoin({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <circle cx="12" cy="12" r="9" strokeWidth="1.7" />
      <path d="M12 7.5v9M9.5 15c0 1.1 1 2 2.5 2s2.5-.8 2.5-2c0-1.4-1.3-1.8-2.5-2.2C10.8 12.4 9.5 12 9.5 10.6c0-1.1 1-1.9 2.5-1.9s2.5.7 2.5 1.9" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconArrowRight({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconArrowDown({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path d="M12 5v14M6 13l6 6 6-6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconChevronDown({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path d="m6 9 6 6 6-6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconMenu({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconClose({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function IconUpload({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path d="M12 16V4m0 0 4 4m-4-4-4 4" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconUsers({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path d="M17 20v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="7" r="3.2" strokeWidth="1.7" />
      <path d="M17.5 20v-1a4 4 0 0 0-2.7-3.8M14.5 4.3a3.2 3.2 0 0 1 0 6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconFolder({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path d="M3 7a1 1 0 0 1 1-1h5l2 2h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Z" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

export function IconLock({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <rect x="5" y="10.5" width="14" height="10" rx="1.5" strokeWidth="1.7" />
      <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconCompass({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <circle cx="12" cy="12" r="9" strokeWidth="1.7" />
      <path d="m15 9-2 6-6 2 2-6 6-2Z" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function IconMail({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.7" />
      <path d="m4 7 8 6 8-6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconPhone({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path
        d="M7 3.5 4.5 6c-.7 3.4 1.7 8.6 5 11.9 3.3 3.3 8.5 5.7 11.9 5l2.5-2.5-4.2-4.2-2 2c-2-1-3.9-2.4-5.5-4s-3-3.5-4-5.5l2-2L7 3.5Z"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconBuilding({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path d="M4 21V6l8-3 8 3v15" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 21v-5h6v5M9 10h.01M9 13h.01M15 10h.01M15 13h.01" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconGlobe({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <circle cx="12" cy="12" r="9" strokeWidth="1.7" />
      <path d="M3 12h18" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M12 3c2.4 2.5 3.6 5.5 3.6 9s-1.2 6.5-3.6 9c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3Z" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  );
}

export function IconBriefcase({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" strokeWidth="1.7" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M3 12h18" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function IconBaby({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <circle cx="12" cy="8" r="4" strokeWidth="1.7" />
      <path d="M8 14h8M10 18h4M12 16v2" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M9 6h.01M15 6h.01" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function IconHome({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path d="M3 11l9-7 9 7" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconHands({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
      <path d="M12 3v18M12 3l-4 4M12 3l4 4" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 12c0-2 1-4 3-5M19 12c0-2-1-4-3-5" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M5 18c0-2 1-4 3-5M19 18c0-2-1-4-3-5" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

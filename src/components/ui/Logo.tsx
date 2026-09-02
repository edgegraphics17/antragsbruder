import Image from "next/image";

export function MascotIcon({
  className = "h-10 w-10",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={`relative inline-block shrink-0 ${className}`}>
      <Image
        src="/brand/mascot-square.png"
        alt="Antragsbruder Maskottchen"
        fill
        sizes="80px"
        className="object-contain"
        priority={priority}
      />
    </span>
  );
}

export function MascotFull({
  className = "w-full max-w-xs",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={`relative inline-block ${className}`} style={{ aspectRatio: "900 / 895" }}>
      <Image
        src="/brand/mascot.png"
        alt="Antragsbruder Maskottchen mit Laptop"
        fill
        sizes="(max-width: 640px) 60vw, 320px"
        className="object-contain"
        priority={priority}
      />
    </span>
  );
}

export function Wordmark({
  variant = "teal",
  className = "w-40",
}: {
  variant?: "teal" | "cream";
  className?: string;
}) {
  const src = variant === "teal" ? "/brand/wordmark-teal.png" : "/brand/wordmark-cream.png";
  return (
    <span className={`relative inline-block ${className}`} style={{ aspectRatio: "900 / 394" }}>
      <Image src={src} alt="Antragsbruder" fill sizes="320px" className="object-contain" />
    </span>
  );
}

export function LockupHorizontal({
  className = "w-full max-w-sm",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <span className={`relative inline-block ${className}`} style={{ aspectRatio: "1200 / 436" }}>
      <Image
        src="/brand/lockup-horizontal.png"
        alt="Antragsbruder Logo"
        fill
        sizes="(max-width: 640px) 90vw, 420px"
        className="object-contain"
        priority={priority}
      />
    </span>
  );
}

export function LockupStacked({
  className = "w-full max-w-xs",
}: {
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`} style={{ aspectRatio: "900 / 667" }}>
      <Image
        src="/brand/lockup-stacked.png"
        alt="Antragsbruder Logo"
        fill
        sizes="(max-width: 640px) 80vw, 360px"
        className="object-contain"
      />
    </span>
  );
}

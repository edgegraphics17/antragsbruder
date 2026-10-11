import Image from "next/image";

export function PhotoFrame({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 480px, (min-width: 640px) 60vw, 90vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-cream-deep ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}

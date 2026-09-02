import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary: "bg-green-900 text-cream hover:bg-green-800 active:bg-green-950",
  secondary: "bg-white text-ink border border-line hover:border-green-700 hover:text-green-800",
  outline: "border border-green-900 text-green-900 hover:bg-green-900 hover:text-cream",
  ghost: "text-green-900 hover:bg-green-100",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-sm min-h-11",
  lg: "px-7 py-4 text-base min-h-12",
};

type LinkButtonProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "href">;

export function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: LinkButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

type SubmitButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export function ButtonAction({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: SubmitButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

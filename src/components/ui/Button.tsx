import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 disabled:opacity-50 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 active:bg-brand-800 shadow-sm shadow-brand-900/10",
  secondary: "bg-white text-ink border border-line hover:border-brand-600 hover:text-brand-700",
  outline: "border-2 border-brand-600 text-brand-700 hover:bg-brand-600 hover:text-white",
  ghost: "text-brand-800 hover:bg-brand-100",
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

import Link, { LinkProps } from "next/link";
import React from "react";

type ButtonSize = "sm" | "md";

type ButtonLinkProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
  size?: ButtonSize;
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-base",
};

export default function ButtonLink({ children, className = "", size = "md", ...props }: ButtonLinkProps) {
  const classes = [
    "inline-flex items-center justify-center rounded-xl bg-white text-[#161A1E] font-semibold shadow-sm",
    "transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link {...props} className={classes}>
      {children}
    </Link>
  );
}

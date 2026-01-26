import Link, { LinkProps } from "next/link";
import React from "react";

type PrimaryCtaProps = LinkProps & {
  children: React.ReactNode;
  className?: string;
};

export default function PrimaryCta({ children, className = "", ...props }: PrimaryCtaProps) {
  const classes = [
    "relative z-30 inline-flex h-14 w-auto items-center justify-center whitespace-nowrap no-underline",
    "rounded-[4px] bg-white px-6 py-2",
    "font-ui text-[16px] font-bold leading-[22.4px] text-[#161A1E] !text-[#161A1E]",
    "shadow-sm transition hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
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

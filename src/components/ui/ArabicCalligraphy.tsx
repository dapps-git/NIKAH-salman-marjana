import type { ReactNode } from "react";

type ArabicSize = "sm" | "md" | "lg" | "xl";

interface ArabicCalligraphyProps {
  children: ReactNode;
  size?: ArabicSize;
  className?: string;
}

const sizeClasses: Record<ArabicSize, string> = {
  sm: "text-2xl leading-[1.9] sm:text-3xl sm:leading-[1.85]",
  md: "text-3xl leading-[1.85] sm:text-4xl sm:leading-[1.8]",
  lg: "text-4xl leading-[1.75] sm:text-5xl sm:leading-[1.7] md:text-6xl md:leading-[1.65]",
  xl: "text-[2.75rem] leading-[1.75] sm:text-6xl sm:leading-[1.7] md:text-7xl md:leading-[1.65] lg:text-[5.25rem] lg:leading-[1.55]",
};

export default function ArabicCalligraphy({
  children,
  size = "md",
  className = "",
}: ArabicCalligraphyProps) {
  return (
    <p
      className={`font-arabic text-text-primary ${sizeClasses[size]} ${className}`}
      dir="rtl"
      lang="ar"
    >
      {children}
    </p>
  );
}

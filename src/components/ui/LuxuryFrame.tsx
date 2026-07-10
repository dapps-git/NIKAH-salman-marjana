import type { ReactNode } from "react";
import Image from "next/image";

interface LuxuryFrameProps {
  children: ReactNode;
  className?: string;
}

export default function LuxuryFrame({ children, className = "" }: LuxuryFrameProps) {
  return (
    <div
      className={`embossed-frame ornate-panel relative rounded-sm bg-ivory/90 px-5 py-8 sm:px-12 sm:py-16 ${className}`}
    >
      <Image
        src="/decor/corner-flourish.svg"
        alt=""
        width={44}
        height={44}
        className="pointer-events-none absolute top-2 left-2 opacity-60 sm:top-3 sm:left-3"
        aria-hidden
      />
      <Image
        src="/decor/corner-flourish.svg"
        alt=""
        width={44}
        height={44}
        className="pointer-events-none absolute top-2 right-2 -scale-x-100 opacity-60 sm:top-3 sm:right-3"
        aria-hidden
      />
      <Image
        src="/decor/corner-flourish.svg"
        alt=""
        width={44}
        height={44}
        className="pointer-events-none absolute bottom-2 left-2 -scale-y-100 opacity-60 sm:bottom-3 sm:left-3"
        aria-hidden
      />
      <Image
        src="/decor/corner-flourish.svg"
        alt=""
        width={44}
        height={44}
        className="pointer-events-none absolute right-2 bottom-2 -scale-x-100 -scale-y-100 opacity-60 sm:right-3 sm:bottom-3"
        aria-hidden
      />
      {children}
    </div>
  );
}

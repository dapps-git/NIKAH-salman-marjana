"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface ScrollIndicatorProps {
  exportHide?: boolean;
}

export default function ScrollIndicator({ exportHide = false }: ScrollIndicatorProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.a
      href="#invitation"
      data-export-hide={exportHide ? "" : undefined}
      className="mt-10 flex min-h-12 flex-col items-center justify-center gap-2 rounded-full px-4 text-text-secondary transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 sm:mt-12"
      animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-label="Scroll to explore"
    >
      <span className="font-body text-xs tracking-[0.16em] uppercase sm:tracking-[0.25em]">
        Scroll to Explore
      </span>
      <ChevronDown className="h-5 w-5 text-gold" strokeWidth={1.5} />
    </motion.a>
  );
}

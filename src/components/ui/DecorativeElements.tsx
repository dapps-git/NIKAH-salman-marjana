"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export function MosqueSilhouette() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center opacity-[0.08]">
      <Image
        src="/decor/mosque-silhouette.svg"
        alt=""
        width={640}
        height={320}
        className="h-auto w-full max-w-2xl"
        aria-hidden
      />
    </div>
  );
}

export function FloatingFloral({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      animate={shouldReduceMotion ? {} : { y: [0, -16, 0], rotate: [0, 2, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <Image
        src="/decor/rose-vine.svg"
        alt=""
        width={130}
        height={130}
        className="opacity-30"
      />
    </motion.div>
  );
}

export function BabysBreath({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      animate={shouldReduceMotion ? {} : { y: [0, -10, 0], opacity: [0.15, 0.32, 0.15] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden
    >
      <Image src="/decor/babys-breath.svg" alt="" width={70} height={90} className="opacity-30" />
    </motion.div>
  );
}

export function Lantern({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute lantern-glow ${className}`} aria-hidden>
      <Image src="/decor/lantern.svg" alt="" width={44} height={68} className="opacity-30" />
    </div>
  );
}

export function Crescent({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden>
      <Image src="/decor/crescent.svg" alt="" width={40} height={40} className="opacity-20" />
    </div>
  );
}

export function GoldLeaf({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden>
      <Image src="/decor/gold-leaf.svg" alt="" width={56} height={56} className="opacity-26" />
    </div>
  );
}

export function GoldCornerBorders() {
  return (
    <>
      <div className="pointer-events-none absolute top-4 left-4 h-20 w-20 border-t border-l border-gold/35" />
      <div className="pointer-events-none absolute top-4 right-4 h-20 w-20 border-t border-r border-gold/35" />
      <div className="pointer-events-none absolute bottom-4 left-4 h-20 w-20 border-b border-l border-gold/35" />
      <div className="pointer-events-none absolute right-4 bottom-4 h-20 w-20 border-r border-b border-gold/35" />
    </>
  );
}

export function GeometricPattern({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pattern-bg pointer-events-none absolute inset-0 opacity-50 ${className}`}
      aria-hidden
    />
  );
}

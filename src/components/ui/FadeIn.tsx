"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "none";
  scale?: boolean;
}

export default function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 1,
  direction = "up",
  scale = false,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  const y = shouldReduceMotion
    ? 0
    : direction === "up"
      ? 40
      : direction === "down"
        ? -40
        : 0;

  return (
    <motion.div
      className={className}
      initial={{ opacity: shouldReduceMotion ? 1 : 0, y, scale: scale ? 0.985 : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

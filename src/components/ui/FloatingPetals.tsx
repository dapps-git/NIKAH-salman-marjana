"use client";

import { motion, useReducedMotion } from "framer-motion";

const PETALS = [
  { left: "8%", delay: 0, duration: 14 },
  { left: "25%", delay: 2, duration: 16 },
  { left: "55%", delay: 1, duration: 15 },
  { left: "75%", delay: 3, duration: 17 },
  { left: "90%", delay: 0.5, duration: 13 },
];

export default function FloatingPetals() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden>
      {PETALS.map((petal, i) => (
        <motion.div
          key={i}
          className="absolute top-0 h-3 w-2 rounded-full bg-champagne/20"
          style={{ left: petal.left }}
          initial={{ y: "-10%", opacity: 0, rotate: 0 }}
          animate={{
            y: "110vh",
            opacity: [0, 0.15, 0.15, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

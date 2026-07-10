"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { LOGO } from "@/lib/constants";

/**
 * S & G logo welcome — short cinematic hold, then handoff to Hero.
 */
export default function OpeningScreen() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    setVisible(true);

    const timer = setTimeout(
      () => setVisible(false),
      shouldReduceMotion ? 400 : 3000,
    );

    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  if (!mounted) {
    return null;
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-warm-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0.25 : 0.9,
            ease: [0.4, 0, 0.2, 1],
          }}
          aria-hidden
        >
          <div className="opening-bg-layer" />
          {!shouldReduceMotion && (
            <motion.div
              className="opening-shimmer-layer"
              initial={{ x: "-35%" }}
              animate={{ x: "35%" }}
              transition={{ duration: 2.4, ease: "easeInOut" }}
            />
          )}

          <motion.div
            className="relative z-10 flex flex-col items-center"
            initial={
              shouldReduceMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.86 }
            }
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: shouldReduceMotion ? 0.2 : 1.15,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src={LOGO.src}
              alt={LOGO.alt}
              width={458}
              height={425}
              priority
              className="opening-logo h-auto w-[min(72vw,18rem)] drop-shadow-[0_10px_42px_rgba(168,127,40,0.35)] sm:w-[min(60vw,28rem)]"
            />
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

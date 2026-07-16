"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { EVENT } from "@/lib/constants";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const target = new Date(EVENT.countdownTarget).getTime();
  const now = Date.now();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

function CountdownDigit({ value }: { value: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.3 }}
        className="font-heading text-4xl font-medium text-gold sm:text-5xl md:text-6xl"
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="luxury-section-secondary px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <FadeIn duration={1}>
          <SectionHeading title="Countdown" subtitle="Until our blessed day" />
        </FadeIn>

        <FadeIn delay={0.15} duration={1}>
          <div className="mx-auto mb-10 max-w-[280px] overflow-hidden rounded-sm border border-gold/30 bg-ivory p-3 shadow-md ornate-panel sm:max-w-xs">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
              <Image
                src="/gallery/couple.png"
                alt="Salman & Marjana"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 280px, 320px"
                priority
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3} duration={1}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            {UNITS.map(({ key, label }) => (
              <GlassCard
                key={key}
                className="flex min-h-32 flex-col items-center justify-center px-3 py-6 sm:min-h-40 sm:px-6 sm:py-10"
              >
                <CountdownDigit
                  value={timeLeft ? String(timeLeft[key]).padStart(2, "0") : "--"}
                />
                <span className="mt-2 font-body text-xs tracking-[0.12em] uppercase text-text-secondary sm:mt-3 sm:tracking-[0.2em]">
                  {label}
                </span>
              </GlassCard>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

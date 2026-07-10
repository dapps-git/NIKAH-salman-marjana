"use client";

import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";
import {
  BabysBreath,
  Crescent,
  FloatingFloral,
  GeometricPattern,
  GoldCornerBorders,
  GoldLeaf,
  Lantern,
  MosqueSilhouette,
} from "@/components/ui/DecorativeElements";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import { COUPLE, EVENT, HERO, OPENING } from "@/lib/constants";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden luxury-section-primary px-4 py-16 sm:px-6 sm:py-32"
    >
      <GeometricPattern />
      <MosqueSilhouette />
      <FloatingFloral className="top-20 left-6 sm:left-16" />
      <FloatingFloral className="top-28 right-6 sm:right-16" />
      <BabysBreath className="bottom-40 left-10 hidden sm:block" />
      <GoldLeaf className="top-32 right-20 hidden md:block" />
      <GoldLeaf className="bottom-28 left-20 hidden md:block" />
      <Lantern className="top-16 left-1/4 hidden lg:block" />
      <Lantern className="top-16 right-1/4 hidden lg:block" />
      <Crescent className="top-20 right-1/3 hidden lg:block" />

      <div
        id="invitation-card"
        className="embossed-frame ornate-panel relative z-10 mx-auto w-full max-w-4xl rounded-sm bg-ivory px-5 py-12 text-center shadow-[0_20px_60px_rgba(184,134,11,0.14)] backdrop-blur-sm sm:px-16 sm:py-24"
      >
        <GoldCornerBorders />

        <FadeIn duration={1.15}>
          <div className="mx-auto flex max-w-3xl flex-col items-center pt-2 sm:pt-4">
            <div className="ornamental-line mb-5 w-20 sm:mb-6 sm:w-24" />
            <div className="bismillah-heading relative mx-auto w-[min(100%,22rem)] sm:w-[28rem]">
              <Image
                src={OPENING.bismillah.src}
                alt={OPENING.bismillah.alt}
                width={948}
                height={314}
                priority
                className="mx-auto h-auto w-full object-contain"
                sizes="(max-width: 640px) 22rem, 28rem"
              />
            </div>
            <div className="ornamental-line mt-5 w-20 sm:mt-6 sm:w-24" />
          </div>
        </FadeIn>

        <FadeIn delay={0.25} duration={1.2} scale>
          <div className="couple-name-stack mt-12 sm:mt-16">
            <h1 className="couple-name couple-name-gold">
              <span className="couple-name-initial">{COUPLE.bride.charAt(0)}</span>
              {COUPLE.bride.slice(1)}
            </h1>
            <OrnamentalDivider className="couple-divider sm:my-8" />
            <h1 className="couple-name couple-name-gold">
              <span className="couple-name-initial">{COUPLE.groom.charAt(0)}</span>
              {COUPLE.groom.slice(1)}
            </h1>
          </div>
        </FadeIn>

        <FadeIn delay={0.45} duration={1}>
          <div className="mt-8 sm:mt-12">
            <p className="font-body text-xs tracking-[0.12em] uppercase text-text-secondary sm:text-sm sm:tracking-[0.2em]">
              {HERO.subtitle}
            </p>
            <p className="hero-support-copy mt-3 font-heading text-lg font-light leading-relaxed sm:mt-4 sm:text-2xl">
              {HERO.invitation}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.55} duration={1}>
          <div className="mt-9 space-y-1 sm:mt-12 sm:space-y-2">
            <p className="font-heading text-xl font-medium text-text-primary sm:text-3xl">
              Sunday
            </p>
            <p className="font-heading text-xl font-light text-text-primary sm:text-3xl">
              19 July 2026
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.7} duration={1}>
          <div className="mt-8 sm:mt-10">
            <p className="font-body text-xs tracking-[0.14em] uppercase text-text-secondary sm:tracking-[0.3em]">
              {HERO.ceremony}
            </p>
            <p className="mt-2 font-heading text-3xl text-gold sm:mt-3 sm:text-5xl">
              {EVENT.nikahTime}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.85} duration={1}>
          <p className="mx-auto mt-8 max-w-2xl font-body text-sm leading-relaxed text-text-secondary italic sm:mt-12 sm:text-lg sm:leading-loose">
            {HERO.closingLine}
          </p>
        </FadeIn>

        <div className="ornamental-line mx-auto mt-8 w-36 sm:mt-10 sm:w-48" />
        <ScrollIndicator exportHide />
      </div>
    </section>
  );
}

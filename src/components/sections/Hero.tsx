"use client";

import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";
import {
  GeometricPattern,
  GoldCornerBorders,
  MosqueSilhouette,
} from "@/components/ui/DecorativeElements";
import ScrollIndicator from "@/components/ui/ScrollIndicator";
import { COUPLE, EVENT, HERO, OPENING } from "@/lib/constants";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-start justify-center luxury-section-primary px-0 py-0 overflow-x-hidden w-full sm:items-center sm:px-6 sm:py-16"
    >
      <GeometricPattern />
      <MosqueSilhouette />

      {/* Invitation card wrapper */}
      <div className="relative z-10 mx-auto w-full max-w-2xl mt-0 sm:mt-24">

        {/* ── Invitation Card ── */}
        <div
          id="invitation-card"
          className="embossed-frame ornate-panel relative z-10 mx-auto w-full rounded-none bg-ivory px-5 pt-24 pb-8 text-center shadow-[0_20px_60px_rgba(97,11,20,0.14)] backdrop-blur-sm sm:rounded-sm sm:px-12 sm:pt-38 sm:pb-12"
        >
          <GoldCornerBorders />

          {/* ── Floral Arch — sits inside the card, overlapping from the top ── */}
          <div
            className="pointer-events-none absolute left-0 right-0 z-20"
            style={{ top: "0", width: "100%" }}
            aria-hidden
          >
            <img
              src="/decor/floral-arch.png?v=2"
              alt="Floral decoration"
              crossOrigin="anonymous"
              className="mx-auto w-full h-auto object-contain"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>

          <FadeIn duration={1.15}>
            <div className="mx-auto flex max-w-3xl flex-col items-center">
              <div className="bismillah-heading relative mx-auto w-[min(100%,7.5rem)] sm:w-[13rem]">
                <img
                  src={OPENING.bismillah.src}
                  alt={OPENING.bismillah.alt}
                  crossOrigin="anonymous"
                  className="mx-auto h-auto w-full object-contain"
                />
              </div>
              <div className="ornamental-line mt-5 w-20 sm:mt-6 sm:w-24" />
            </div>
          </FadeIn>

          <FadeIn delay={0.2} duration={1.2} scale>
            <div className="couple-name-stack mt-8 sm:mt-10 px-4">
              <p className="font-body text-[0.62rem] tracking-[0.12em] uppercase text-text-secondary sm:text-xs sm:tracking-[0.24em] mb-4">
                {HERO.subtitle}
              </p>

              <h1 className="couple-name couple-name-gold">
                <span className="couple-name-initial">{COUPLE.groom.charAt(0)}</span>
                {COUPLE.groom.slice(1)}
              </h1>
              <OrnamentalDivider className="couple-divider my-4 sm:my-6" />
              <h1 className="couple-name couple-name-gold">
                <span className="couple-name-initial">{COUPLE.bride.charAt(0)}</span>
                {COUPLE.bride.slice(1)}
              </h1>
            </div>
          </FadeIn>

          <FadeIn delay={0.4} duration={1}>
            <p className="hero-support-copy mt-5 font-heading text-base font-light leading-relaxed sm:mt-6 sm:text-xl">
              {HERO.invitation}
            </p>
          </FadeIn>

          <FadeIn delay={0.55} duration={1}>
            <div className="mt-8 sm:mt-10 space-y-1">
              <p className="font-heading text-lg font-medium text-text-primary sm:text-2xl">
                {EVENT.date}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.7} duration={1}>
            <div className="mt-5 sm:mt-6">
              <p className="font-body text-[0.65rem] tracking-[0.18em] uppercase text-text-secondary sm:tracking-[0.28em]">
                {HERO.ceremony}
              </p>
              <p className="mt-2 font-heading text-2xl text-gold sm:mt-3 sm:text-4xl">
                {EVENT.nikahTime}
              </p>
            </div>
          </FadeIn>

          <div className="ornamental-line mx-auto mt-6 w-28 sm:mt-8 sm:w-36" />
          <ScrollIndicator exportHide />
        </div>
      </div>
    </section>
  );
}

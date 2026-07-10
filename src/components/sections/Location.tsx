"use client";

import QRCode from "react-qr-code";
import Image from "next/image";
import { ExternalLink, MapPin } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import GoldButton from "@/components/ui/GoldButton";
import SectionHeading from "@/components/ui/SectionHeading";
import { EVENT, LOCATION } from "@/lib/constants";

export default function Location() {
  return (
    <section id="location" className="pattern-bg px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <FadeIn duration={1.1}>
          <SectionHeading title="Location" subtitle="Join us at the venue" />
        </FadeIn>

        <FadeIn delay={0.35} duration={1.1}>
          <div className="mt-10 flex flex-col items-center gap-10">
            <GoldButton
              href={EVENT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 text-gold" />
              {LOCATION.mapsButton}
            </GoldButton>

            <div className="ornate-panel flex flex-col items-center rounded-sm px-4 py-4 sm:px-6 sm:py-5">
              <div className="relative p-4 sm:p-6">
                <Image
                  src="/decor/qr-frame.svg"
                  alt=""
                  width={200}
                  height={200}
                  className="pointer-events-none absolute inset-0 h-full w-full object-contain"
                  aria-hidden
                />
                <div className="relative p-3 sm:p-4">
                  <QRCode
                    value={EVENT.mapsUrl}
                    size={120}
                    fgColor="#2C241B"
                    bgColor="#FFFDF9"
                    level="M"
                  />
                </div>
              </div>
              <p className="mt-2 max-w-xs text-center font-body text-sm text-text-secondary">
                {LOCATION.qrCaption}
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

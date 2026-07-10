"use client";

import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Eye, MapPin, MessageCircle, X } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { CONTACTS, EVENT } from "@/lib/constants";

const cardClassName =
  "group rounded-sm border border-gold/30 bg-ivory p-5 text-left shadow-[0_10px_28px_rgba(184,134,11,0.1)] transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:bg-ivory hover:shadow-[0_16px_36px_rgba(184,134,11,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60";

type ActionItem = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  href?: string;
  external?: boolean;
  isView?: boolean;
};

export default function ActionBar() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleView = async () => {
    setIsLoading(true);
    try {
      const { generateInvitationPng } = await import("@/lib/download-invitation");
      const url = await generateInvitationPng();
      if (url) {
        setImageUrl(url);
      }
    } catch (error) {
      console.error("Failed to generate card preview:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const actionItems = useMemo<ActionItem[]>(
    () => [
      {
        title: "Open Location",
        subtitle: "View directions to venue",
        href: EVENT.mapsUrl,
        icon: MapPin,
        external: true,
      },
      {
        title: "WhatsApp",
        subtitle: "Send message",
        href: `https://wa.me/${CONTACTS.whatsApp.replace(/[^0-9]/g, "")}`,
        icon: MessageCircle,
        external: true,
      },
      {
        title: "View Card",
        subtitle: "Preview & Save",
        icon: Eye,
        isView: true,
      },
    ],
    [],
  );

  return (
    <>
      <section className="luxury-section-elevated px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <FadeIn duration={1.1}>
            <SectionHeading title="Stay Connected" subtitle="Essential Actions" />
          </FadeIn>

          <FadeIn delay={0.2} duration={1.1}>
            <div className="embossed-frame ornate-panel rounded-sm bg-champagne/40 px-5 py-6 sm:px-8 sm:py-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {actionItems.map(({ title, subtitle, href, icon: Icon, external, isView }) => {
                  const content = (
                    <>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-ivory shadow-[0_4px_14px_rgba(184,134,11,0.1)] transition-all duration-500 group-hover:scale-105 group-hover:border-gold group-hover:shadow-[0_6px_18px_rgba(184,134,11,0.18)]">
                        <Icon className="h-5 w-5 text-gold-deep" strokeWidth={1.6} />
                      </div>
                      <p className="font-heading text-xl text-text-primary">{title}</p>
                      <p className="mt-1 font-body text-sm text-text-secondary">{subtitle}</p>
                    </>
                  );

                  if (isView) {
                    return (
                      <button
                        key={title}
                        type="button"
                        onClick={handleView}
                        disabled={isLoading}
                        className={`w-full relative ${cardClassName} ${isLoading ? "cursor-wait" : ""}`}
                      >
                        {isLoading && (
                          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-ivory/95 rounded-sm">
                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gold border-t-transparent" />
                            <span className="mt-2 font-body text-xs text-gold-deep font-medium">Generating view...</span>
                          </div>
                        )}
                        {content}
                      </button>
                    );
                  }

                  return (
                    <a
                      key={title}
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className={cardClassName}
                    >
                      {content}
                    </a>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Lightbox / View Modal Overlay */}
      {imageUrl && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
          <button
            onClick={() => setImageUrl(null)}
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="relative max-w-full max-h-[75vh] overflow-hidden rounded-sm border border-gold/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <img
              src={imageUrl}
              alt="Invitation Card Preview"
              className="max-h-[75vh] w-auto max-w-full object-contain"
            />
          </div>
          
          <p className="mt-4 font-heading text-base text-gold-soft tracking-[0.1em] text-center max-w-md px-4 leading-relaxed animate-pulse">
            Pinch to zoom • Long press to save to Photos 🤎
          </p>
        </div>
      )}
    </>
  );
}

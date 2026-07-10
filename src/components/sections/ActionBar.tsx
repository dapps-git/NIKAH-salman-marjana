"use client";

import { useMemo } from "react";
import type { LucideIcon } from "lucide-react";
import { Download, MapPin, MessageCircle } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { CONTACTS } from "@/lib/constants";

const cardClassName =
  "group rounded-sm border border-gold/30 bg-ivory p-5 text-left shadow-[0_10px_28px_rgba(184,134,11,0.1)] transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:bg-ivory hover:shadow-[0_16px_36px_rgba(184,134,11,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60";

type ActionItem = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  href?: string;
  external?: boolean;
  isDownload?: boolean;
};

async function handleDownload() {
  const { downloadInvitationCard } = await import("@/lib/download-invitation");
  await downloadInvitationCard();
}

export default function ActionBar() {
  const actionItems = useMemo<ActionItem[]>(
    () => [
      {
        title: "Open Location",
        subtitle: "View directions to venue",
        href: "#location",
        icon: MapPin,
      },
      {
        title: "WhatsApp",
        subtitle: "Send message",
        href: `https://wa.me/${CONTACTS.whatsApp.replace(/[^0-9]/g, "")}`,
        icon: MessageCircle,
        external: true,
      },
      {
        title: "Download",
        subtitle: "Invitation card",
        icon: Download,
        isDownload: true,
      },
    ],
    [],
  );

  return (
    <section className="luxury-section-elevated px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <FadeIn duration={1.1}>
          <SectionHeading title="Stay Connected" subtitle="Essential Actions" />
        </FadeIn>

        <FadeIn delay={0.2} duration={1.1}>
          <div className="embossed-frame ornate-panel rounded-sm bg-champagne/40 px-5 py-6 sm:px-8 sm:py-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {actionItems.map(({ title, subtitle, href, icon: Icon, external, isDownload }) => {
                const content = (
                  <>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-ivory shadow-[0_4px_14px_rgba(184,134,11,0.1)] transition-all duration-500 group-hover:scale-105 group-hover:border-gold group-hover:shadow-[0_6px_18px_rgba(184,134,11,0.18)]">
                      <Icon className="h-5 w-5 text-gold-deep" strokeWidth={1.6} />
                    </div>
                    <p className="font-heading text-xl text-text-primary">{title}</p>
                    <p className="mt-1 font-body text-sm text-text-secondary">{subtitle}</p>
                  </>
                );

                if (isDownload) {
                  return (
                    <button
                      key={title}
                      type="button"
                      onClick={handleDownload}
                      className={`w-full ${cardClassName}`}
                    >
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
  );
}

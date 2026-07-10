import { Calendar, Clock, MapPin } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { EVENT } from "@/lib/constants";

export default function EventDetails() {
  return (
    <section className="linen-texture px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <FadeIn duration={1.1}>
          <SectionHeading title="Event Details" />
        </FadeIn>

        <FadeIn delay={0.2} duration={1.1}>
          <div className="grid gap-6 sm:grid-cols-2">
            <GlassCard className="ornate-panel p-8 sm:p-10">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-off-white">
                <Calendar className="h-5 w-5 text-gold" strokeWidth={1.5} />
              </div>
              <p className="font-body text-xs tracking-[0.12em] uppercase text-text-secondary sm:tracking-[0.2em]">
                Nikah Ceremony
              </p>
              <p className="mt-3 font-heading text-2xl text-text-primary sm:text-3xl">{EVENT.date}</p>
              <div className="mt-5 flex items-center gap-2">
                <Clock className="h-4 w-4 text-gold" strokeWidth={1.5} />
                <p className="font-heading text-2xl text-gold">{EVENT.nikahTime}</p>
              </div>
            </GlassCard>

            <a
              href={EVENT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-transform duration-300 hover:scale-[1.02]"
            >
              <GlassCard className="ornate-panel p-8 sm:p-10 h-full">
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-off-white">
                  <MapPin className="h-5 w-5 text-gold" strokeWidth={1.5} />
                </div>
                <p className="font-body text-xs tracking-[0.12em] uppercase text-text-secondary sm:tracking-[0.2em]">
                  Venue
                </p>
                <p className="mt-3 font-heading text-2xl text-text-primary sm:text-3xl">{EVENT.venue}</p>
                <p className="mt-4 whitespace-pre-line font-body text-base leading-relaxed text-text-secondary">
                  {EVENT.address}
                </p>

              </GlassCard>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

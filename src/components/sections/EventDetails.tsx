import { Calendar, Clock, MapPin } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { EVENT } from "@/lib/constants";

export default function EventDetails() {
  return (
    <section className="linen-texture px-5 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <FadeIn duration={1.1}>
          <SectionHeading title="Event Details" />
        </FadeIn>

        <FadeIn delay={0.2} duration={1.1}>
          <div className="mt-8 space-y-4">

            {/* Date card */}
            <div className="flex items-start gap-4 rounded-lg border border-[rgba(97,11,20,0.15)] bg-ivory px-5 py-5 shadow-sm">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgba(97,11,20,0.08)]">
                <Calendar className="h-5 w-5" style={{ color: "#610B14" }} strokeWidth={1.6} />
              </div>
              <div className="text-left">
                <p className="font-body text-[0.65rem] tracking-[0.2em] uppercase" style={{ color: "rgba(97,11,20,0.55)" }}>
                  Date
                </p>
                <p className="mt-1 font-heading text-xl font-semibold leading-snug" style={{ color: "#610B14" }}>
                  {EVENT.date}
                </p>
              </div>
            </div>

            {/* Time card */}
            <div className="flex items-start gap-4 rounded-lg border border-[rgba(97,11,20,0.15)] bg-ivory px-5 py-5 shadow-sm">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgba(97,11,20,0.08)]">
                <Clock className="h-5 w-5" style={{ color: "#610B14" }} strokeWidth={1.6} />
              </div>
              <div className="text-left">
                <p className="font-body text-[0.65rem] tracking-[0.2em] uppercase" style={{ color: "rgba(97,11,20,0.55)" }}>
                  Nikah Ceremony
                </p>
                <p className="mt-1 font-heading text-xl font-semibold" style={{ color: "#610B14" }}>
                  {EVENT.nikahTime}
                </p>
                <p className="mt-0.5 font-body text-sm" style={{ color: "rgba(97,11,20,0.6)" }}>
                  Lunch & Reception at {EVENT.lunchTime}
                </p>
              </div>
            </div>

            {/* Venue card */}
            <a
              href={EVENT.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block transition-transform duration-300 hover:scale-[1.01]"
            >
              <div className="flex items-start gap-4 rounded-lg border border-[rgba(97,11,20,0.15)] bg-ivory px-5 py-5 shadow-sm transition-shadow duration-300 group-hover:shadow-md">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[rgba(97,11,20,0.08)]">
                  <MapPin className="h-5 w-5" style={{ color: "#610B14" }} strokeWidth={1.6} />
                </div>
                <div className="text-left">
                  <p className="font-body text-[0.65rem] tracking-[0.2em] uppercase" style={{ color: "rgba(97,11,20,0.55)" }}>
                    Venue
                  </p>
                  <p className="mt-1 font-heading text-xl font-semibold leading-snug" style={{ color: "#610B14" }}>
                    {EVENT.venue}
                  </p>
                  <p className="mt-1 font-body text-sm leading-relaxed" style={{ color: "rgba(97,11,20,0.65)" }}>
                    {EVENT.address}
                  </p>
                  <p className="mt-2 font-body text-xs tracking-wide" style={{ color: "rgba(97,11,20,0.5)" }}>
                    Tap to open in Maps
                  </p>
                </div>
              </div>
            </a>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}

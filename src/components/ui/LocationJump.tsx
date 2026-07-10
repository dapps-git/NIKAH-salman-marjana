"use client";

import { MapPin } from "lucide-react";

export default function LocationJump() {
  const scrollToLocation = () => {
    document.getElementById("location")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToLocation}
      className="location-jump relative flex h-14 w-14 items-center justify-center rounded-full border border-gold/60 bg-ivory shadow-[0_10px_28px_rgba(184,134,11,0.22)] transition-all hover:border-gold hover:shadow-[0_14px_36px_rgba(184,134,11,0.3)]"
      aria-label="View location"
    >
      <span className="location-jump-ping" aria-hidden />
      <MapPin
        className="location-jump-icon relative z-10 h-6 w-6 text-gold"
        strokeWidth={2}
      />
    </button>
  );
}

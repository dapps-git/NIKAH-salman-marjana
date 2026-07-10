"use client";

import { CalendarPlus, CalendarHeart } from "lucide-react";
import GoldButton from "@/components/ui/GoldButton";
import { downloadICS, getGoogleCalendarUrl } from "@/lib/calendar";

export default function CalendarActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
      <GoldButton onClick={downloadICS}>
        <CalendarHeart className="h-4 w-4 text-gold" />
        Save the Date
      </GoldButton>
      <GoldButton
        href={getGoogleCalendarUrl()}
        target="_blank"
        rel="noopener noreferrer"
      >
        <CalendarPlus className="h-4 w-4 text-gold" />
        Add to Calendar
      </GoldButton>
    </div>
  );
}

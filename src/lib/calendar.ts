import { CALENDAR, COUPLE, EVENT } from "./constants";

function formatICSDate(dateStr: string): string {
  return dateStr;
}

export function generateICS(): string {
  const now = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

  const location = `${EVENT.venue}, ${EVENT.address}`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Nikah Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:nikah-${COUPLE.bride}-${COUPLE.groom}@invitation`,
    `DTSTAMP:${now}`,
    `DTSTART:${formatICSDate(CALENDAR.start)}`,
    `DTEND:${formatICSDate(CALENDAR.end)}`,
    `SUMMARY:${CALENDAR.title}`,
    `DESCRIPTION:${CALENDAR.description}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadICS(): void {
  const ics = generateICS();
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "nikah-save-the-date.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getGoogleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: CALENDAR.title,
    dates: `${CALENDAR.start}/${CALENDAR.end}`,
    details: CALENDAR.description,
    location: `${EVENT.venue}, ${EVENT.address}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

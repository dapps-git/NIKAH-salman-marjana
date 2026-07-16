import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Inter, Scheherazade_New } from "next/font/google";
import { COUPLE } from "@/lib/constants";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const scheherazade = Scheherazade_New({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-scheherazade",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-calligraphy",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: `${COUPLE.shortName} — Nikah Invitation`,
  description:
    "You are cordially invited to celebrate the Nikah of Salwa Nusreen & Muhammed Sibin on Wednesday, 29 July 2026.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: `Nikah Invitation — ${COUPLE.shortName}`,
    description:
      "Join us in celebrating the Nikah of Salwa Nusreen & Muhammed Sibin on Wednesday, 29 July 2026.",
    images: ["/og-image.svg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Nikah Invitation — ${COUPLE.shortName}`,
    description:
      "Join us in celebrating the Nikah of Salwa Nusreen & Muhammed Sibin on Wednesday, 29 July 2026.",
    images: ["/og-image.svg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF6F0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${scheherazade.variable} ${greatVibes.variable} overflow-x-hidden max-w-full w-full`}
    >
      <body className="antialiased overflow-x-hidden max-w-full w-full relative">{children}</body>
    </html>
  );
}

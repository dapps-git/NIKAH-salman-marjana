"use client";

import { useState } from "react";
import Image from "next/image";
import { LOGO, OPENING } from "@/lib/constants";

interface OpeningScreenProps {
  onOpen?: () => void;
}

export default function OpeningScreen({ onOpen }: OpeningScreenProps) {
  const [tapped, setTapped] = useState(false);
  const [gone, setGone] = useState(false);

  const handleOpen = () => {
    if (tapped) return;
    setTapped(true);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("nikah-start-audio"));
    }
    if (onOpen) onOpen();
    setTimeout(() => setGone(true), 1000);
  };

  if (gone) return null;

  return (
    <div
      onClick={handleOpen}
      className={`opening-root select-none cursor-pointer${tapped ? " opening-root--open pointer-events-none" : ""}`}
      aria-modal="true"
      role="dialog"
      aria-label="Wedding Invitation Cover"
    >
      {/* Left curtain */}
      <div className="opening-curtain opening-curtain--left" />
      {/* Right curtain */}
      <div className="opening-curtain opening-curtain--right" />

      {/* Content */}
      <div className="opening-content">

        {/* Bismillah — small */}
        <Image
          src={OPENING.bismillah.src}
          alt={OPENING.bismillah.alt}
          width={360}
          height={120}
          priority
          className="opening-bismillah-img pointer-events-none"
        />

        {/* Ornamental line */}
        <div className="opening-ornament-line pointer-events-none" />

        {/* S & H Logo */}
        <Image
          src={LOGO.src}
          alt={LOGO.alt}
          width={320}
          height={297}
          priority
          className="opening-logo-img pointer-events-none"
        />

        {/* Ornamental line */}
        <div className="opening-ornament-line pointer-events-none" />

        {/* Tap button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
          className="opening-tap-btn focus:outline-none focus:ring-0 active:scale-95"
          aria-label="Open invitation"
        >
          <span className="opening-tap-hand pointer-events-none" aria-hidden="true">
            <img
              src="/decor/bouquet-icon.png?v=2"
              alt=""
              className="opening-tap-icon"
              style={{ mixBlendMode: "multiply", width: "2rem", height: "2.4rem", objectFit: "contain" }}
            />
          </span>
          <span className="opening-tap-label pointer-events-none">Open Invitation</span>
        </button>

      </div>
    </div>
  );
}

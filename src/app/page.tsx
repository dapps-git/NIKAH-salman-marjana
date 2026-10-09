"use client";

import { useState } from "react";
import OpeningScreen from "@/components/sections/OpeningScreen";
import Hero from "@/components/sections/Hero";
import Countdown from "@/components/sections/Countdown";
import Invitation from "@/components/sections/Invitation";
import EventDetails from "@/components/sections/EventDetails";
import Location from "@/components/sections/Location";
import Closing from "@/components/sections/Closing";
import Footer from "@/components/sections/Footer";
import FloatingPetals from "@/components/ui/FloatingPetals";
import LocationJump from "@/components/ui/LocationJump";
import MusicToggle from "@/components/ui/MusicToggle";

export default function Home() {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <main className="paper-grain">
        <OpeningScreen onOpen={() => setIsOpened(true)} />
        <Hero />
        <Countdown />
        <Invitation />
        <EventDetails />
        <Location />
        <Closing />
        <Footer />
        <FloatingPetals isOpened={isOpened} />
      </main>

      <div className="fixed right-4 bottom-4 z-[110] flex flex-col-reverse gap-3">
        <LocationJump />
        <MusicToggle />
      </div>
    </>
  );
}

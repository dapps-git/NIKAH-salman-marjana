import FadeIn from "@/components/ui/FadeIn";
import ArabicCalligraphy from "@/components/ui/ArabicCalligraphy";
import OrnamentalDivider from "@/components/ui/OrnamentalDivider";
import { GoldLeaf } from "@/components/ui/DecorativeElements";
import { QURAN_VERSE } from "@/lib/constants";

export default function Invitation() {
  return (
    <section id="invitation" className="verse-editorial-section relative overflow-hidden px-6 py-24 sm:py-36">
      <GoldLeaf className="left-6 top-10 opacity-35" />
      <GoldLeaf className="bottom-14 right-8 opacity-35" />
      <div className="mx-auto max-w-6xl">
        <div className="verse-corner verse-corner--top-left" />
        <div className="verse-corner verse-corner--top-right" />
        <div className="verse-corner verse-corner--bottom-left" />
        <div className="verse-corner verse-corner--bottom-right" />

        <FadeIn duration={1}>
          <p className="text-center font-body text-[0.7rem] tracking-[0.34em] text-gold-deep/75 uppercase sm:text-xs">
            QURAN • SURAH AR-RUM 30:21
          </p>
        </FadeIn>

        <FadeIn delay={0.14} duration={1.25}>
          <div className="mx-auto mt-8 max-w-3xl text-center sm:mt-10">
            <OrnamentalDivider className="mb-4 opacity-70 sm:mb-6" />
            <ArabicCalligraphy
              size="sm"
              className="verse-calligraphy mx-auto max-w-3xl text-center !text-lg !leading-[1.9] sm:!text-xl sm:!leading-[1.85] md:!text-2xl md:!leading-[1.8]"
            >
              {QURAN_VERSE.arabic}
            </ArabicCalligraphy>
          </div>
        </FadeIn>

        <FadeIn delay={0.32} duration={1.05}>
          <div className="mx-auto mt-8 max-w-2xl text-center sm:mt-10">
            <p className="font-heading text-base leading-relaxed text-text-primary/85 sm:text-xl sm:leading-loose">
              &ldquo;{QURAN_VERSE.english}&rdquo;
            </p>
            <p className="mt-6 font-heading text-sm tracking-[0.07em] text-gold-deep sm:text-base">
              &mdash; {QURAN_VERSE.reference}
            </p>
            <OrnamentalDivider className="mt-5 opacity-70 sm:mt-7" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

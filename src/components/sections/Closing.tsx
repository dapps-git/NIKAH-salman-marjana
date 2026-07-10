import FadeIn from "@/components/ui/FadeIn";
import { CLOSING_MESSAGE } from "@/lib/constants";

export default function Closing() {
  return (
    <section className="luxury-section-secondary px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <FadeIn duration={1.1}>
          <div className="ornamental-line mx-auto mb-10 w-32" />
          <p className="font-heading text-2xl leading-loose text-text-primary sm:text-3xl">
            {CLOSING_MESSAGE}
          </p>
          <div className="ornamental-line mx-auto mt-10 w-32" />
        </FadeIn>
      </div>
    </section>
  );
}

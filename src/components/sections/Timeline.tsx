import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { TIMELINE } from "@/lib/constants";

export default function Timeline() {
  return (
    <section className="bg-ivory px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <FadeIn>
          <SectionHeading title="Timeline" subtitle="Schedule of events" />
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-[7px] w-px bg-border sm:left-1/2 sm:-translate-x-px" />

            <div className="space-y-10">
              {TIMELINE.map((item, index) => (
                <div
                  key={item.time}
                  className={`relative flex items-center gap-6 sm:gap-0 ${
                    index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-0 z-10 h-4 w-4 rounded-full border-2 border-gold bg-ivory sm:left-1/2 sm:-translate-x-1/2" />

                  <div
                    className={`ml-8 flex-1 sm:ml-0 sm:w-[calc(50%-2rem)] ${
                      index % 2 === 0 ? "sm:pr-8 sm:text-right" : "sm:pl-8 sm:text-left"
                    }`}
                  >
                    <div className="rounded-sm border border-border bg-warm-white p-6 transition-shadow duration-300 hover:shadow-md">
                      <p className="font-heading text-2xl text-gold">{item.time}</p>
                      <p className="mt-2 font-body text-lg text-text-primary">
                        {item.title}
                      </p>
                    </div>
                  </div>

                  <div className="hidden flex-1 sm:block" />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

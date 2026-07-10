import { MessageCircle, Phone } from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionHeading from "@/components/ui/SectionHeading";
import { CONTACTS } from "@/lib/constants";

export default function Contact() {
  const contactItems = [
      {
        icon: Phone,
        title: "Family Contact",
        href: `tel:${CONTACTS.familyContact.replace(/\s/g, "")}`,
        description: CONTACTS.familyContact,
      },
      {
        icon: MessageCircle,
        title: "WhatsApp",
        href: `https://wa.me/${CONTACTS.whatsApp.replace(/[^0-9]/g, "")}`,
        description: "Send best wishes",
      },
  ];

  return (
    <section className="pattern-bg bg-warm-white px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <SectionHeading title="Contact" subtitle="We would love to hear from you" />
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="grid gap-4 sm:grid-cols-2">
            {contactItems.map(({ icon: Icon, title, href, description }) => (
              <a
                key={title}
                href={href}
                target={title.includes("WhatsApp") ? "_blank" : undefined}
                rel={title.includes("WhatsApp") ? "noopener noreferrer" : undefined}
                className="gold-shimmer group flex min-h-32 flex-col items-center justify-center rounded-sm border border-border bg-ivory p-6 text-center transition-all duration-300 hover:border-gold hover:shadow-md hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-off-white transition-colors group-hover:border-gold">
                  <Icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                </div>
                <p className="font-heading text-lg text-text-primary">{title}</p>
                <p className="mt-1 font-body text-sm text-text-secondary">
                  {description}
                </p>
              </a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

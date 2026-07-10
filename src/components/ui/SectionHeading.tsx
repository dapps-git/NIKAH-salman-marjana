interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-8 text-center sm:mb-10">
      <div className="ornamental-line mx-auto mb-5 w-20 sm:mb-6 sm:w-24" />
      <h2 className="font-heading text-2xl font-medium tracking-wide text-text-primary sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 font-body text-xs tracking-[0.14em] uppercase text-gold-deep/80 sm:mt-3 sm:text-sm sm:tracking-widest">
          {subtitle}
        </p>
      )}
      <div className="ornamental-line mx-auto mt-5 w-20 sm:mt-6 sm:w-24" />
    </div>
  );
}

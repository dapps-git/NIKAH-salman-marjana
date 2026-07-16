import Image from "next/image";

export default function Footer() {
  return (
    <footer className="luxury-footer px-6 py-10 text-center">
      <div className="ornamental-line mx-auto mb-5 w-24" />
      <p className="font-heading text-lg text-text-primary sm:text-xl">
        With Warm Regards
      </p>
      <p className="mt-2 font-body text-sm tracking-wide text-text-secondary">
        From Both Families
      </p>
      <div className="ornamental-line mx-auto mt-5 w-24" />

      {/* Bouquet icon — romantic closing symbol */}
      <div className="mx-auto mt-8 flex justify-center">
        <img
          src="/decor/bouquet-icon.png?v=2"
          alt="Flower bouquet"
          className="h-auto w-20 sm:w-24"
          style={{ mixBlendMode: "multiply" }}
        />
      </div>

      <p className="mt-8 font-body text-[0.65rem] tracking-[0.2em] text-text-secondary/50 uppercase">
        Made with{" "}
        <a
          href="https://crevionads.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold transition-opacity duration-300 hover:opacity-80"
          style={{ color: "#610B14" }}
        >
          crevionads.com
        </a>{" "}
        🤎
      </p>
    </footer>
  );
}

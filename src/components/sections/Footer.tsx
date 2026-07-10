export default function Footer() {
  return (
    <footer className="luxury-footer px-6 py-14 text-center">
      <div className="ornamental-line mx-auto mb-6 w-24" />
      <p className="font-heading text-lg text-text-primary sm:text-xl">
        With Warm Regards
      </p>
      <p className="mt-2 font-body text-sm tracking-wide text-text-secondary">
        From Both Families
      </p>
      <div className="ornamental-line mx-auto mt-6 w-24" />
      <p className="mt-8 font-body text-[0.65rem] tracking-[0.2em] text-text-secondary/50 uppercase">
        Made with{" "}
        <a
          href="https://crevionads.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity duration-300 hover:opacity-80 font-bold"
        >
          {"crevionads.com".split("").map((char, index) => {
            const isEia = ["e", "i", "a"].includes(char.toLowerCase());
            return (
              <span
                key={index}
                style={{
                  color: isEia ? "rgb(244 206 69)" : "rgb(138 50 198 / 0.9)",
                }}
              >
                {char}
              </span>
            );
          })}
        </a>{" "}
        🤎
      </p>
    </footer>
  );
}

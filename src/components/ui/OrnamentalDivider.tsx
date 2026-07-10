import Image from "next/image";

export default function OrnamentalDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`my-6 flex justify-center ${className}`} aria-hidden>
      <Image
        src="/decor/ornamental-divider.svg"
        alt=""
        width={120}
        height={24}
        className="opacity-70"
      />
    </div>
  );
}

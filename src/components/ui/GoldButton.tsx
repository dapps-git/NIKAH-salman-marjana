import type { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type GoldButtonProps = {
  children: ReactNode;
  className?: string;
} & (
  | (AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  | ButtonHTMLAttributes<HTMLButtonElement>
);

export default function GoldButton({
  children,
  className = "",
  ...props
}: GoldButtonProps) {
  const baseClasses =
    "gold-shimmer inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-gold/50 bg-ivory px-5 py-3 font-body text-sm font-semibold tracking-[0.06em] text-text-primary shadow-[0_8px_24px_rgba(184,134,11,0.12)] transition-all duration-500 hover:-translate-y-0.5 hover:border-gold hover:bg-gradient-to-r hover:from-[#FFFDF9] hover:via-[#F4EDE3] hover:to-[#FFFDF9] hover:shadow-[0_14px_32px_rgba(184,134,11,0.2)] hover:scale-[1.02] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory sm:px-6";

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    return (
      <a href={href} className={`${baseClasses} ${className}`} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button className={`${baseClasses} ${className}`} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

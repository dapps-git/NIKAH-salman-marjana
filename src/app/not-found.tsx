import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FFFDF9] px-6 text-center text-[#2C241B]">
      <h1 className="font-heading text-4xl font-semibold text-[#610B14]">404</h1>
      <p className="mt-3 font-body text-base text-[#610B14]/80">Page Not Found</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded border border-[#B8860B]/40 bg-[#FFFDF9] px-6 py-2.5 font-body text-sm font-medium text-[#610B14] shadow-sm transition hover:border-[#B8860B]"
      >
        Return to Invitation
      </Link>
    </div>
  );
}

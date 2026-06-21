// Shared large link styled as a primary button.
// src/components/PrimaryLink.tsx
import Link from "next/link";

type PrimaryLinkProps = {
  children: React.ReactNode;
  href: string;
};

export function PrimaryLink({ children, href }: PrimaryLinkProps) {
  return (
    <Link
      className="inline-flex min-h-12 items-center justify-center rounded-xl bg-teal-600 px-6 py-3 text-base font-bold text-white shadow-sm transition hover:bg-teal-700"
      href={href}
    >
      {children}
    </Link>
  );
}

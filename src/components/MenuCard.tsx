// Reusable menu card link.
// src/components/MenuCard.tsx
import Link from "next/link";

type MenuCardProps = {
  description: string;
  href: string;
  label: string;
};

export function MenuCard({ description, href, label }: MenuCardProps) {
  return (
    <Link
      className="block rounded-2xl border border-teal-900/10 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-500 hover:shadow-md"
      href={href}
    >
      <span className="block text-xl font-bold text-teal-950">{label}</span>
      <span className="mt-3 block text-base leading-7 text-teal-950/70">{description}</span>
    </Link>
  );
}

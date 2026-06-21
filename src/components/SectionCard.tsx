// Reusable content card.
// src/components/SectionCard.tsx
type SectionCardProps = {
  children: React.ReactNode;
  title?: string;
};

export function SectionCard({ children, title }: SectionCardProps) {
  return (
    <section className="rounded-2xl border border-teal-900/10 bg-white p-5 shadow-sm sm:p-6">
      {title ? <h2 className="mb-4 text-2xl font-bold text-teal-950">{title}</h2> : null}
      {children}
    </section>
  );
}

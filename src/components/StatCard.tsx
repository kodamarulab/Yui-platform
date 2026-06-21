// Reusable statistic card.
// src/components/StatCard.tsx
type StatCardProps = {
  label: string;
  value: string;
};

export function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-teal-900/10 bg-white p-5 shadow-sm">
      <p className="text-base font-bold text-teal-950/70">{label}</p>
      <p className="mt-3 text-4xl font-bold text-teal-700">{value}</p>
    </div>
  );
}

// Fixed feedback bar for collecting opinions.
// src/components/FeedbackBar.tsx
import Link from "next/link";

export function FeedbackBar() {
  return (
    <aside className="fixed inset-x-0 bottom-0 z-40 border-t border-orange-300 bg-white px-4 py-3 shadow-[0_-8px_24px_rgba(15,76,92,0.12)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-base font-bold text-teal-950">この画面についてご意見をお聞かせください</p>
        <Link
          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-base font-bold text-white shadow-sm transition hover:bg-orange-600"
          href="/community"
        >
          コミュニティへ
        </Link>
      </div>
    </aside>
  );
}

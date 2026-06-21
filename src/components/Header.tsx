// Shared header for the Yui mock site.
// src/components/Header.tsx
import Link from "next/link";

const navItems = [
  { href: "/", label: "トップ" },
  { href: "/announcements", label: "お知らせ" },
  { href: "/schedules", label: "予定" },
  { href: "/staff", label: "職員" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-teal-900/10 bg-white/92 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link className="flex items-center gap-3" href="/">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-600 text-xl font-bold text-white shadow-sm">
            結
          </span>
          <span>
            <span className="block text-2xl font-bold tracking-normal text-teal-950">ゆい</span>
            <span className="block text-sm font-semibold text-orange-600">安心を届け、希望をつなぐ</span>
          </span>
        </Link>
        <nav aria-label="簡易ナビ" className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <Link
              className="rounded-full border border-teal-700/20 bg-teal-50 px-4 py-2 text-sm font-bold text-teal-900 transition hover:bg-teal-100"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

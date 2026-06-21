// Top page for the Yui mock site.
// src/app/page.tsx
import Link from "next/link";
import { DevRecentPosts } from "@/components/DevRecentPosts";
import { MenuCard } from "@/components/MenuCard";
import { PageContainer } from "@/components/PageContainer";

const menuItems = [
  { href: "/reception", label: "自己受付", description: "避難所に到着した方が自分で受付できます。" },
  { href: "/my-info", label: "自分の情報", description: "受付済みの情報を確認し、必要な内容を編集できます。" },
  { href: "/announcements", label: "お知らせ", description: "給水や炊き出しなどの情報を確認できます。" },
  { href: "/schedules", label: "今日の予定", description: "食事、支援、相談の予定を時系列で確認できます。" },
  { href: "/support", label: "支援情報", description: "罹災証明や支援金などの手続き情報を確認できます。" },
  { href: "/requests", label: "要望・相談", description: "困りごとや相談したい内容を職員へ伝えられます。" },
  { href: "/staff", label: "職員用画面", description: "避難所運営に必要な状況確認と受付を行います。" },
];

export default function HomePage() {
  return (
    <PageContainer>
      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">

        <div className="rounded-3xl bg-white/82 p-6 shadow-sm sm:p-8">
          <div className="flex flex-row flex-wrap items-center gap-6">
            <div className="mb-4 grid h-20 w-20 place-items-center rounded-3xl bg-teal-600 text-4xl font-bold text-white shadow-sm">
              結
            </div>
            <div className="flex-col mb-4">
              <h1 className="mt-2 text-5xl font-bold tracking-normal text-teal-950">ゆい</h1>
              <p className="text-lg font-bold text-orange-600">安心を届け、希望をつなぐ</p>
            </div>
          </div>
          <p className="mt-5 max-w-2xl text-lg leading-9 text-teal-950/75">
            避難所を、安心できる場所、情報が届く場所、支援につながる場所、希望が持てる場所にするためのアプリです。
            アプリはOSSとして開発されており、どなたでも画面イメージの共有や業務フローの確認、機能要否とUXの検証にご協力いただけます。ぜひご参加ください！
          </p>
        </div>

        <aside className="rounded-3xl border border-orange-300 bg-orange-50 p-5 shadow-sm">
          <div className="flex flex-row justify-between gap-3">
            <div className="flex flex-col">
              <p className="text-sm font-bold text-orange-700">開発時のみ</p>
              <h2 className="mt-1 text-2xl font-bold text-teal-950">開発確認エリア</h2>
            </div>

            <div className="flex flex-col items-end">
              <Link
                className="mt-3 inline-flex min-h-11 items-center justify-center rounded-xl bg-orange-500 px-5 py-2 text-base font-bold text-white shadow-sm transition hover:bg-orange-600"
                href="/community"
              >
                コミュニティへ
              </Link>
            </div>
          </div>

          <section className="mt-3 rounded-2xl bg-white p-4 shadow-sm">
            <h3 className="mb-2 text-lg font-bold text-teal-950">新規投稿</h3>
            <DevRecentPosts />
          </section>
        </aside>
      </section>

      <hr className="my-10 border-teal-950/20" />

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <MenuCard description={item.description} href={item.href} key={item.href} label={item.label} />
        ))}
      </section>
    </PageContainer>
  );
}

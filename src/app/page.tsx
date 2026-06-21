// Top page for the Yui mock site.
// src/app/page.tsx
import Link from "next/link";
import { MenuCard } from "@/components/MenuCard";
import { PageContainer } from "@/components/PageContainer";
import { SectionCard } from "@/components/SectionCard";

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
      <section className="grid gap-6 rounded-3xl bg-white/82 p-6 shadow-sm sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <div className="mb-4 grid h-20 w-20 place-items-center rounded-3xl bg-teal-600 text-4xl font-bold text-white shadow-sm">
            ゆ
          </div>
          <p className="text-lg font-bold text-orange-600">安心を届け、希望をつなぐ</p>
          <h1 className="mt-2 text-5xl font-bold tracking-normal text-teal-950">ゆい</h1>
          <p className="mt-5 max-w-2xl text-lg leading-9 text-teal-950/75">
            避難所を、安心できる場所、情報が届く場所、支援につながる場所、希望が持てる場所にするための画面モックです。
          </p>
        </div>
        <div className="grid gap-4">
          <SectionCard title="確認したいこと">
            <ul className="space-y-3 text-lg leading-8 text-teal-950/75">
              <li>画面イメージの共有</li>
              <li>業務フローの確認</li>
              <li>機能要否とUXの検証</li>
            </ul>
          </SectionCard>
          <section className="rounded-2xl border border-orange-300 bg-orange-50 p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-orange-700">開発時のみ</p>
                <h2 className="mt-1 text-2xl font-bold text-teal-950">開発用コミュニティ</h2>
                <p className="mt-2 text-base leading-7 text-teal-950/75">
                  関係者の論点整理は、掲示板方式のモックで確認します。
                </p>
              </div>
              <Link
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-base font-bold text-white shadow-sm transition hover:bg-orange-600"
                href="/community"
              >
                掲示板を見る
              </Link>
            </div>
          </section>
        </div>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {menuItems.map((item) => (
          <MenuCard description={item.description} href={item.href} key={item.href} label={item.label} />
        ))}
      </section>

      <p className="mt-8 rounded-2xl bg-orange-100 px-5 py-4 text-center text-lg font-bold text-orange-800">
        この画面は開発中のモックです
      </p>
    </PageContainer>
  );
}

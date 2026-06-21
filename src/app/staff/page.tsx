// Staff dashboard page.
// src/app/staff/page.tsx
import { MenuCard } from "@/components/MenuCard";
import { PageContainer } from "@/components/PageContainer";
import { StaffPageNotice } from "@/components/StaffPageNotice";
import { StatCard } from "@/components/StatCard";

const stats = [
  { label: "現在避難者数", value: "126人" },
  { label: "世帯数", value: "48世帯" },
  { label: "要配慮者数", value: "18人" },
  { label: "未対応相談件数", value: "7件" },
];

const actions = [
  { href: "/staff/reception", label: "クイック受付", description: "職員が代理で受付を登録する想定の画面です。" },
  { href: "/staff/evacuees", label: "避難者一覧", description: "受付済みの避難者を一覧で確認します。" },
  { href: "/staff/announcements", label: "お知らせ投稿", description: "避難者向けのお知らせを作成します。" },
  { href: "/staff/schedules", label: "今日の予定登録", description: "食事や相談などの予定を登録します。" },
  { href: "/staff/support", label: "支援情報登録", description: "罹災証明や支援金などの案内を登録します。" },
  { href: "/staff/requests", label: "要望・相談確認", description: "避難者からの相談内容を確認し返信します。" },
  { href: "/", label: "トップへ戻る", description: "避難者向けトップページへ戻ります。" },
];

export default function StaffPage() {
  return (
    <PageContainer lead="避難所の状況を職員がすばやく確認するための画面です。" title="職員ダッシュボード">
      <StaffPageNotice />
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </section>
      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((action) => (
          <MenuCard description={action.description} href={action.href} key={action.href} label={action.label} />
        ))}
      </section>
    </PageContainer>
  );
}

// Reception completion page.
// src/app/reception/complete/page.tsx
import Link from "next/link";
import { PageContainer } from "@/components/PageContainer";
import { SectionCard } from "@/components/SectionCard";

export default function ReceptionCompletePage() {
  return (
    <PageContainer>
      <SectionCard>
        <div className="py-8 text-center">
          <h1 className="text-3xl font-bold text-teal-950">受付が完了しました</h1>
          <p className="mt-8 text-lg font-bold text-teal-950/70">受付番号</p>
          <p className="mt-3 text-7xl font-bold text-orange-600">A023</p>
          <Link
            className="mt-10 inline-flex min-h-12 items-center justify-center rounded-xl bg-teal-600 px-6 py-3 text-base font-bold text-white shadow-sm transition hover:bg-teal-700"
            href="/"
          >
            トップへ戻る
          </Link>
        </div>
      </SectionCard>
    </PageContainer>
  );
}

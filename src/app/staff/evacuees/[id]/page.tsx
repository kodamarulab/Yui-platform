// Staff evacuee detail page.
// src/app/staff/evacuees/[id]/page.tsx
import { notFound } from "next/navigation";
import evacuees from "@/mock/evacuees.json";
import { PageContainer } from "@/components/PageContainer";
import { SectionCard } from "@/components/SectionCard";
import { StaffPageNotice } from "@/components/StaffPageNotice";
import type { Evacuee } from "@/types/mock";

const evacueeItems = evacuees as Evacuee[];

type EvacueeDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return evacueeItems.map((item) => ({ id: item.id }));
}

export default async function EvacueeDetailPage({ params }: EvacueeDetailPageProps) {
  const { id } = await params;
  const item = evacueeItems.find((evacuee) => evacuee.id === id);

  if (!item) {
    notFound();
  }

  return (
    <PageContainer lead={`受付番号 ${item.receptionNumber} の詳細情報です。`} title="避難者詳細">
      <StaffPageNotice />
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <SectionCard title="基本情報">
          <dl className="grid gap-4 text-lg">
            <div>
              <dt className="font-bold text-sky-950/60">氏名</dt>
              <dd className="mt-1 font-bold text-sky-950">{item.name}</dd>
            </div>
            <div>
              <dt className="font-bold text-sky-950/60">世帯情報</dt>
              <dd className="mt-1 text-sky-950">{item.householdSize}人世帯</dd>
            </div>
            <div>
              <dt className="font-bold text-sky-950/60">滞在場所</dt>
              <dd className="mt-1 text-sky-950">{item.stayLocation}</dd>
            </div>
          </dl>
        </SectionCard>
        <SectionCard title="支援情報">
          <dl className="grid gap-4 text-lg">
            <div>
              <dt className="font-bold text-sky-950/60">要配慮情報</dt>
              <dd className="mt-1 text-sky-950">{item.supportNeeds}</dd>
            </div>
            <div>
              <dt className="font-bold text-sky-950/60">状態</dt>
              <dd className="mt-1 text-sky-950">{item.status}</dd>
            </div>
            <div>
              <dt className="font-bold text-sky-950/60">メモ</dt>
              <dd className="mt-1 leading-8 text-sky-950">{item.memo}</dd>
            </div>
          </dl>
        </SectionCard>
      </div>
    </PageContainer>
  );
}

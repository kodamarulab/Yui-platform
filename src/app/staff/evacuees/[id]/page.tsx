// Staff evacuee detail page.
// src/app/staff/evacuees/[id]/page.tsx
import { notFound } from "next/navigation";
import evacuees from "@/mock/evacuees.json";
import { FormField } from "@/components/FormField";
import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SectionCard } from "@/components/SectionCard";
import { StaffPageNotice } from "@/components/StaffPageNotice";
import type { Evacuee } from "@/types/mock";

const evacueeItems = evacuees as Evacuee[];

type EvacueeDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function displayValue(value: number | string | undefined) {
  return value === undefined || value === "" ? "未登録" : value;
}

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
              <dt className="font-bold text-sky-950/60">代表者氏名</dt>
              <dd className="mt-1 font-bold text-sky-950">{item.name}</dd>
            </div>
            <div>
              <dt className="font-bold text-sky-950/60">世帯人数</dt>
              <dd className="mt-1 text-sky-950">{item.householdSize}人</dd>
            </div>
            <div>
              <dt className="font-bold text-sky-950/60">電話番号</dt>
              <dd className="mt-1 text-sky-950">{displayValue(item.phone)}</dd>
            </div>
            <div>
              <dt className="font-bold text-sky-950/60">住所</dt>
              <dd className="mt-1 text-sky-950">{displayValue(item.address)}</dd>
            </div>
            <div>
              <dt className="font-bold text-sky-950/60">乳幼児</dt>
              <dd className="mt-1 text-sky-950">{displayValue(item.infants)}</dd>
            </div>
            <div>
              <dt className="font-bold text-sky-950/60">高齢者</dt>
              <dd className="mt-1 text-sky-950">{displayValue(item.elderlyPeople)}</dd>
            </div>
            <div>
              <dt className="font-bold text-sky-950/60">ペット</dt>
              <dd className="mt-1 text-sky-950">{displayValue(item.pets)}</dd>
            </div>
            <div>
              <dt className="font-bold text-sky-950/60">滞在場所</dt>
              <dd className="mt-1 text-sky-950">{item.stayLocation}</dd>
            </div>
          </dl>
        </SectionCard>
        <div className="grid gap-5">
          <SectionCard title="変更申請確認">
            <div className="grid gap-4">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[520px] border-separate border-spacing-0 text-left">
                  <thead>
                    <tr className="text-sm font-bold text-sky-950/70">
                      <th className="border-b border-sky-900/10 px-4 py-3">項目</th>
                      <th className="border-b border-sky-900/10 px-4 py-3">現在</th>
                      <th className="border-b border-sky-900/10 px-4 py-3">申請内容</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-b border-sky-900/10 px-4 py-3 font-bold text-sky-950">滞在場所</td>
                      <td className="border-b border-sky-900/10 px-4 py-3 text-sky-950/75">{item.stayLocation}</td>
                      <td className="border-b border-sky-900/10 px-4 py-3 font-bold text-sky-950">福祉スペース</td>
                    </tr>
                    <tr>
                      <td className="border-b border-sky-900/10 px-4 py-3 font-bold text-sky-950">支援情報</td>
                      <td className="border-b border-sky-900/10 px-4 py-3 text-sky-950/75">{item.supportNeeds}</td>
                      <td className="border-b border-sky-900/10 px-4 py-3 font-bold text-sky-950">
                        高齢者がいます。歩行時の見守りを希望します。
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <PrimaryButton>変更を承認する</PrimaryButton>
              </div>
            </div>
          </SectionCard>
          <SectionCard title="支援情報">
            <dl className="grid gap-4 text-lg">
              <div>
                <dt className="font-bold text-sky-950/60">マイページの支援情報</dt>
                <dd className="mt-1 text-sky-950">{item.supportNeeds}</dd>
              </div>
              <div>
                <dt className="font-bold text-sky-950/60">状態</dt>
                <dd className="mt-1 text-sky-950">{item.status}</dd>
              </div>
            </dl>
          </SectionCard>
          <SectionCard title="対応記録">
            <div className="grid gap-5">
              <FormField label="職員対応メモ" name="staffResponseNote" textarea />
              <PrimaryButton>記録する</PrimaryButton>
            </div>
          </SectionCard>
        </div>
      </div>
    </PageContainer>
  );
}

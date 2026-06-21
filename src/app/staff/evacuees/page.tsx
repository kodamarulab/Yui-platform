// Staff evacuee list page.
// src/app/staff/evacuees/page.tsx
import Link from "next/link";
import evacuees from "@/mock/evacuees.json";
import { PageContainer } from "@/components/PageContainer";
import { SectionCard } from "@/components/SectionCard";
import { StaffPageNotice } from "@/components/StaffPageNotice";
import type { Evacuee } from "@/types/mock";

const evacueeItems = evacuees as Evacuee[];

export default function StaffEvacueesPage() {
  return (
    <PageContainer lead="サンプルデータを使った避難者一覧です。行または詳細ボタンから詳細を確認できます。" title="避難者一覧">
      <StaffPageNotice />
      <SectionCard>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left">
            <thead>
              <tr className="text-sm font-bold text-sky-950/70">
                <th className="border-b border-sky-900/10 px-4 py-3">受付番号</th>
                <th className="border-b border-sky-900/10 px-4 py-3">氏名</th>
                <th className="border-b border-sky-900/10 px-4 py-3">世帯人数</th>
                <th className="border-b border-sky-900/10 px-4 py-3">滞在場所</th>
                <th className="border-b border-sky-900/10 px-4 py-3">状態</th>
                <th className="border-b border-sky-900/10 px-4 py-3">操作</th>
              </tr>
            </thead>
            <tbody>
              {evacueeItems.map((item) => (
                <tr className="group" key={item.id}>
                  <td className="border-b border-sky-900/10 px-4 py-3">
                    <Link className="block font-bold text-sky-700 group-hover:text-orange-600" href={`/staff/evacuees/${item.id}`}>
                      {item.receptionNumber}
                    </Link>
                  </td>
                  <td className="border-b border-sky-900/10 px-4 py-3 font-bold text-sky-950">{item.name}</td>
                  <td className="border-b border-sky-900/10 px-4 py-3 text-sky-950/75">{item.householdSize}人</td>
                  <td className="border-b border-sky-900/10 px-4 py-3 text-sky-950/75">{item.stayLocation}</td>
                  <td className="border-b border-sky-900/10 px-4 py-3">
                    <span className="rounded-full bg-sky-100 px-3 py-1 text-sm font-bold text-sky-800">{item.status}</span>
                  </td>
                  <td className="border-b border-sky-900/10 px-4 py-3">
                    <Link
                      className="inline-flex min-h-10 items-center justify-center rounded-lg bg-sky-700 px-4 py-2 text-sm font-bold text-white hover:bg-sky-800"
                      href={`/staff/evacuees/${item.id}`}
                    >
                      詳細
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </PageContainer>
  );
}

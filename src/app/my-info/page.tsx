// Evacuee self information confirmation and edit page.
// src/app/my-info/page.tsx
"use client";

import { useState } from "react";
import { FormField } from "@/components/FormField";
import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SectionCard } from "@/components/SectionCard";

export default function MyInfoPage() {
  const [updated, setUpdated] = useState(false);

  return (
    <PageContainer lead="受付済みの情報を本人が確認し、変わった内容を編集するための画面モックです。" title="自分の情報">
      <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionCard title="受付情報">
          <dl className="grid gap-4 text-lg">
            <div>
              <dt className="font-bold text-teal-950/60">受付番号</dt>
              <dd className="mt-1 text-5xl font-bold text-orange-600">A023</dd>
            </div>
            <div>
              <dt className="font-bold text-teal-950/60">滞在場所</dt>
              <dd className="mt-1 font-bold text-teal-950">体育館 A-1</dd>
            </div>
            <div>
              <dt className="font-bold text-teal-950/60">状態</dt>
              <dd className="mt-1 w-fit rounded-full bg-teal-100 px-3 py-1 text-sm font-bold text-teal-800">滞在中</dd>
            </div>
          </dl>
        </SectionCard>

        <SectionCard title="確認・編集">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField defaultValue="佐藤 花子" label="氏名" name="name" />
            <FormField defaultValue="3" label="世帯人数" name="householdSize" type="number" />
            <FormField defaultValue="090-1234-5678" label="電話番号" name="phone" type="tel" />
            <FormField defaultValue="あり" label="要配慮者有無" name="needsSupport" options={["あり", "なし", "確認したい"]} />
            <FormField defaultValue="高齢者あり。歩行時に見守りが必要。" label="要配慮情報" name="supportNeeds" textarea />
            <FormField defaultValue="血圧の薬を服用中。医療相談を希望。" label="メモ" name="memo" textarea />
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <PrimaryButton onClick={() => setUpdated(true)}>変更内容を確認する</PrimaryButton>
            {updated ? (
              <p className="rounded-2xl bg-teal-100 px-5 py-3 text-base font-bold text-teal-900">
                変更内容を確認しました。職員確認後に反映されます。
              </p>
            ) : null}
          </div>
        </SectionCard>
      </section>
    </PageContainer>
  );
}

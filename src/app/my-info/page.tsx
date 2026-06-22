// Evacuee my page confirmation and edit page.
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
    <PageContainer lead="受付済みの情報を確認し、変更が必要な内容を申請するための画面モックです。" title="マイページ">
      <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionCard title="受付情報">
          <dl className="grid gap-4 text-lg">
            <div>
              <dt className="font-bold text-teal-950/60">受付番号</dt>
              <dd className="mt-1 text-5xl font-bold text-orange-600">A023</dd>
            </div>
            <div>
              <dt className="font-bold text-teal-950/60">ID</dt>
              <dd className="mt-1 text-3xl font-bold text-teal-950">AA1234</dd>
            </div>
            <div>
              <dt className="font-bold text-teal-950/60">滞在場所</dt>
              <dd className="mt-1 font-bold text-teal-950">体育館 A-1</dd>
            </div>
            <div>
              <dt className="font-bold text-teal-950/60">状態</dt>
              <dd className="mt-1 w-fit rounded-full bg-teal-100 px-3 py-1 text-sm font-bold text-teal-800">滞在中</dd>
            </div>
            <div>
              <dt className="font-bold text-teal-950/60">パスワード変更</dt>
              <dd className="mt-2">
                <PrimaryButton>変更する</PrimaryButton>
              </dd>
            </div>
          </dl>
        </SectionCard>

        <SectionCard title="確認・編集">
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField defaultValue="佐藤 花子" label="代表者氏名" name="representativeName" />
            <FormField defaultValue="3" label="世帯人数" name="householdSize" type="number" />
            <FormField
              defaultValue="体育館 A-1"
              label="滞在場所"
              name="stayLocation"
              options={["体育館 A-1", "体育館 A-2", "教室 1-1", "福祉スペース"]}
            />
            <FormField defaultValue="東京都中央区1-2-3" label="住所" name="address" />
            <FormField defaultValue="090-1234-5678" label="電話番号" name="phone" type="tel" />
            <FormField defaultValue="1" label="乳幼児" name="infants" type="number" />
            <FormField defaultValue="1" label="高齢者" name="elderlyPeople" type="number" />
            <FormField defaultValue="なし" label="ペット" name="pets" options={["あり", "なし"]} />
            <FormField defaultValue="あり" label="要配慮者" name="needsSupport" options={["あり", "なし", "確認したい"]} />
            <div className="sm:col-span-2">
              <FormField
                defaultValue="高齢者がいます。歩行時の見守りと血圧の薬の継続服用について相談したいです。"
                label="支援情報"
                name="supportNeeds"
                textarea
              />
            </div>
          </div>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <PrimaryButton onClick={() => setUpdated(true)}>変更を申請する</PrimaryButton>
            {updated ? (
              <p className="rounded-2xl bg-teal-100 px-5 py-3 text-base font-bold text-teal-900">
                変更申請を受け付けました。職員確認後に反映されます。
              </p>
            ) : null}
          </div>
        </SectionCard>
      </section>
    </PageContainer>
  );
}

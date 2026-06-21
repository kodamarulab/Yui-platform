// Staff schedule registration page.
// src/app/staff/schedules/page.tsx
"use client";

import { useState } from "react";
import { FormField } from "@/components/FormField";
import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SectionCard } from "@/components/SectionCard";
import { StaffPageNotice } from "@/components/StaffPageNotice";

export default function StaffSchedulesPage() {
  const [registered, setRegistered] = useState(false);

  return (
    <PageContainer lead="職員が避難者向けの今日の予定を登録する画面モックです。" title="今日の予定登録">
      <StaffPageNotice />
      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="予定内容">
          <div className="grid gap-5">
            <FormField defaultValue="14:00" label="時刻" name="time" />
            <FormField defaultValue="医療相談" label="予定名" name="title" />
            <FormField
              defaultValue="保健師と看護師が体調や服薬について相談を受け付けます。"
              label="説明"
              name="description"
              textarea
            />
            <PrimaryButton onClick={() => setRegistered(true)}>登録する</PrimaryButton>
            {registered ? (
              <p className="rounded-2xl bg-sky-100 px-5 py-4 text-base font-bold text-sky-900">
                登録しました。実際の保存は行わないモックです。
              </p>
            ) : null}
          </div>
        </SectionCard>

        <SectionCard title="表示プレビュー">
          <div className="flex gap-4">
            <time className="flex h-16 w-20 shrink-0 items-center justify-center rounded-2xl bg-teal-600 text-lg font-bold text-white">
              14:00
            </time>
            <div className="border-l-4 border-orange-300 pl-4">
              <h2 className="text-2xl font-bold text-teal-950">医療相談</h2>
              <p className="mt-1 text-lg leading-8 text-teal-950/75">
                保健師と看護師が体調や服薬について相談を受け付けます。
              </p>
            </div>
          </div>
        </SectionCard>
      </section>
    </PageContainer>
  );
}

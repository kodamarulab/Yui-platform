// Staff announcement posting page.
// src/app/staff/announcements/page.tsx
"use client";

import { useState } from "react";
import { FormField } from "@/components/FormField";
import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SectionCard } from "@/components/SectionCard";
import { StaffPageNotice } from "@/components/StaffPageNotice";

export default function StaffAnnouncementsPage() {
  const [posted, setPosted] = useState(false);

  return (
    <PageContainer lead="職員が避難者向けのお知らせを作成するための投稿画面モックです。" title="お知らせ投稿">
      <StaffPageNotice />
      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="投稿内容">
          <div className="grid gap-5">
            <FormField defaultValue="給水車到着" label="タイトル" name="title" />
            <FormField defaultValue="10:30" label="表示時刻" name="time" />
            <FormField label="重要度" name="priority" options={["通常", "重要", "緊急"]} />
            <FormField
              defaultValue="正面玄関前に給水車が到着しました。容器をお持ちのうえ、職員の案内に沿ってお並びください。"
              label="本文"
              name="body"
              textarea
            />
            <div>
              <PrimaryButton onClick={() => setPosted(true)}>投稿する</PrimaryButton>
            </div>
            {posted ? (
              <p className="rounded-2xl bg-sky-100 px-5 py-4 text-base font-bold text-sky-900">
                投稿しました。実際の保存は行わないモックです。
              </p>
            ) : null}
          </div>
        </SectionCard>

        <SectionCard title="避難者向け表示プレビュー">
          <article className="rounded-2xl border border-teal-900/10 bg-white p-5 shadow-sm">
            <p className="text-base font-bold text-orange-600">10:30</p>
            <h2 className="mt-2 text-2xl font-bold text-teal-950">給水車到着</h2>
            <p className="mt-3 text-lg leading-8 text-teal-950/75">
              正面玄関前に給水車が到着しました。容器をお持ちのうえ、職員の案内に沿ってお並びください。
            </p>
          </article>
        </SectionCard>
      </section>
    </PageContainer>
  );
}

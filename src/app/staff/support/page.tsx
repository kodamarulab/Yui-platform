// Staff support information registration page.
// src/app/staff/support/page.tsx
"use client";

import { useState } from "react";
import { FormField } from "@/components/FormField";
import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SectionCard } from "@/components/SectionCard";
import { StaffPageNotice } from "@/components/StaffPageNotice";

export default function StaffSupportPage() {
  const [registered, setRegistered] = useState(false);

  return (
    <PageContainer lead="職員が生活再建や相談につながる支援情報を登録する画面モックです。" title="支援情報登録">
      <StaffPageNotice />
      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="支援情報">
          <div className="grid gap-5">
            <FormField defaultValue="罹災証明" label="項目名" name="title" />
            <FormField
              defaultValue="住家の被害程度を証明する書類です。生活再建支援や各種減免手続きに必要となる場合があります。"
              label="説明"
              name="description"
              textarea
            />
            <FormField defaultValue="相談窓口：市役所 防災担当" label="相談窓口" name="contact" />
            <PrimaryButton onClick={() => setRegistered(true)}>登録する</PrimaryButton>
            {registered ? (
              <p className="rounded-2xl bg-sky-100 px-5 py-4 text-base font-bold text-sky-900">
                登録しました。実際の保存は行わないモックです。
              </p>
            ) : null}
          </div>
        </SectionCard>

        <SectionCard title="表示プレビュー">
          <p className="text-lg leading-8 text-teal-950/75">
            住家の被害程度を証明する書類です。生活再建支援や各種減免手続きに必要となる場合があります。
          </p>
          <p className="mt-4 rounded-xl bg-orange-100 px-4 py-3 text-base font-bold text-orange-800">
            相談窓口：市役所 防災担当
          </p>
        </SectionCard>
      </section>
    </PageContainer>
  );
}

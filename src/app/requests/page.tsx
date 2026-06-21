// Request and consultation page.
// src/app/requests/page.tsx
"use client";

import { useState } from "react";
import { FormField } from "@/components/FormField";
import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SectionCard } from "@/components/SectionCard";

export default function RequestsPage() {
  const [sent, setSent] = useState(false);

  return (
    <PageContainer lead="困りごとや相談したい内容を伝えるための画面モックです。" title="要望・相談">
      <SectionCard>
        <div className="grid gap-5">
          <FormField label="種別" name="category" options={["物資", "健康", "生活", "その他"]} />
          <FormField label="内容" name="body" textarea />
          <div>
            <PrimaryButton onClick={() => setSent(true)}>送信する</PrimaryButton>
          </div>
          {sent ? (
            <p className="rounded-2xl bg-teal-100 px-5 py-4 text-lg font-bold text-teal-900">
              送信しました。担当者が確認します。
            </p>
          ) : null}
        </div>
      </SectionCard>
    </PageContainer>
  );
}

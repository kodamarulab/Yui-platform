// Staff quick reception page.
// src/app/staff/reception/page.tsx
"use client";

import { useState } from "react";
import { FormField } from "@/components/FormField";
import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SectionCard } from "@/components/SectionCard";
import { StaffPageNotice } from "@/components/StaffPageNotice";

export default function StaffReceptionPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PageContainer lead="職員が聞き取りながら登録する想定の画面モックです。" title="クイック受付">
      <StaffPageNotice />
      <SectionCard>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="代表者氏名" name="representativeName" />
          <FormField label="世帯人数" name="householdSize" type="number" />
          <FormField label="電話番号" name="phone" type="tel" />
          <FormField label="要配慮者" name="needsSupport" options={["あり", "なし"]} />
          <FormField label="乳幼児" name="infant" options={["あり", "なし"]} />
          <FormField label="高齢者" name="elderly" options={["あり", "なし"]} />
          <FormField label="ペット" name="pet" options={["あり", "なし"]} />
        </div>
        <div className="mt-6">
          <PrimaryButton onClick={() => setIsOpen(true)}>登録する</PrimaryButton>
        </div>
      </SectionCard>

      {isOpen ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-sky-950/50 px-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-xl">
            <p className="text-lg font-bold text-sky-950/70">受付番号</p>
            <p className="mt-3 text-6xl font-bold text-sky-700">A024</p>
            <div className="mt-8">
              <PrimaryButton onClick={() => setIsOpen(false)}>閉じる</PrimaryButton>
            </div>
          </div>
        </div>
      ) : null}
    </PageContainer>
  );
}

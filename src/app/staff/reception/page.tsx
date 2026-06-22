// Staff quick reception page.
// src/app/staff/reception/page.tsx
"use client";

import { useState } from "react";
import { FormField } from "@/components/FormField";
import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SectionCard } from "@/components/SectionCard";
import { StaffPageNotice } from "@/components/StaffPageNotice";

type IssuedInfo = {
  myPageId: string;
  password: string;
  receptionNumber: string;
};

function createReceptionNumber() {
  return `A${Math.floor(Math.random() * 900 + 100).toString()}`;
}

function createMyPageId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const first = letters[Math.floor(Math.random() * letters.length)] ?? "A";
  const second = letters[Math.floor(Math.random() * letters.length)] ?? "A";
  const numbers = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");

  return `${first}${second}${numbers}`;
}

function createPassword() {
  return Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");
}

export default function StaffReceptionPage() {
  const [issuedInfo, setIssuedInfo] = useState<IssuedInfo | null>(null);

  return (
    <PageContainer lead="職員が聞き取りながら登録する想定の画面モックです。" title="クイック受付">
      <StaffPageNotice />
      <SectionCard>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="代表者氏名" name="representativeName" />
          <FormField label="世帯人数" name="householdSize" type="number" />
          <FormField label="電話番号" name="phone" type="tel" />
          <FormField label="要配慮者" name="needsSupport" options={["あり", "なし"]} />
          <FormField label="乳幼児" name="infants" options={["あり", "なし"]} />
          <FormField label="高齢者" name="elderlyPeople" options={["あり", "なし"]} />
          <FormField label="ペット" name="pets" options={["あり", "なし"]} />
        </div>
        <div className="mt-6">
          <PrimaryButton
            onClick={() =>
              setIssuedInfo({
                myPageId: createMyPageId(),
                password: createPassword(),
                receptionNumber: createReceptionNumber(),
              })
            }
          >
            登録する
          </PrimaryButton>
        </div>
      </SectionCard>

      {issuedInfo ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-sky-950/50 px-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-8 text-center shadow-xl">
            <h2 className="text-2xl font-bold text-sky-950">受付を登録しました</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-orange-50 p-4">
                <p className="text-base font-bold text-sky-950/70">受付番号</p>
                <p className="mt-2 text-5xl font-bold text-orange-600">{issuedInfo.receptionNumber}</p>
              </div>
              <div className="rounded-2xl bg-sky-50 p-4">
                <p className="text-base font-bold text-sky-950/70">マイページID</p>
                <p className="mt-2 text-3xl font-bold text-sky-950">{issuedInfo.myPageId}</p>
              </div>
              <div className="rounded-2xl bg-sky-50 p-4">
                <p className="text-base font-bold text-sky-950/70">パスワード</p>
                <p className="mt-2 text-3xl font-bold text-sky-950">{issuedInfo.password}</p>
              </div>
            </div>
            <div className="mt-8">
              <PrimaryButton onClick={() => setIssuedInfo(null)}>閉じる</PrimaryButton>
            </div>
          </div>
        </div>
      ) : null}
    </PageContainer>
  );
}

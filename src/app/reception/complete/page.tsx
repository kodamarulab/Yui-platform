// Reception completion page.
// src/app/reception/complete/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { SectionCard } from "@/components/SectionCard";

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

export default function ReceptionCompletePage() {
  const [issuedInfo, setIssuedInfo] = useState({
    myPageId: "発行中",
    password: "発行中",
    receptionNumber: "発行中",
  });

  useEffect(() => {
    setIssuedInfo({
      myPageId: createMyPageId(),
      password: createPassword(),
      receptionNumber: createReceptionNumber(),
    });
  }, []);

  return (
    <PageContainer>
      <SectionCard>
        <div className="py-8 text-center">
          <h1 className="text-3xl font-bold text-teal-950">受付が完了しました</h1>
          <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-orange-50 p-4">
              <p className="text-base font-bold text-teal-950/70">受付番号</p>
              <p className="mt-2 text-5xl font-bold text-orange-600">{issuedInfo.receptionNumber}</p>
            </div>
            <div className="rounded-2xl bg-teal-50 p-4">
              <p className="text-base font-bold text-teal-950/70">マイページID</p>
              <p className="mt-2 text-3xl font-bold text-teal-950">{issuedInfo.myPageId}</p>
            </div>
            <div className="rounded-2xl bg-teal-50 p-4">
              <p className="text-base font-bold text-teal-950/70">パスワード</p>
              <p className="mt-2 text-3xl font-bold text-teal-950">{issuedInfo.password}</p>
            </div>
          </div>
          <Link
            className="mt-10 inline-flex min-h-12 items-center justify-center rounded-xl bg-teal-600 px-6 py-3 text-base font-bold text-white shadow-sm transition hover:bg-teal-700"
            href="/my-info"
          >
            マイページへ
          </Link>
        </div>
      </SectionCard>
    </PageContainer>
  );
}

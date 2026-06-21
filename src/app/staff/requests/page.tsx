// Staff request confirmation and reply page.
// src/app/staff/requests/page.tsx
"use client";

import { useState } from "react";
import requests from "@/mock/requests.json";
import { FormField } from "@/components/FormField";
import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SectionCard } from "@/components/SectionCard";
import { StaffPageNotice } from "@/components/StaffPageNotice";
import type { RequestItem } from "@/types/mock";

const requestItems = requests as RequestItem[];

export default function StaffRequestsPage() {
  const [selectedId, setSelectedId] = useState(requestItems[0]?.id ?? "");
  const [replied, setReplied] = useState(false);
  const selectedItem = requestItems.find((item) => item.id === selectedId) ?? requestItems[0];

  return (
    <PageContainer lead="避難者から届いた要望・相談を確認し、返信内容を作成する画面モックです。" title="要望・相談確認">
      <StaffPageNotice />
      <section className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <SectionCard title="相談一覧">
          <div className="grid gap-3">
            {requestItems.map((item) => (
              <button
                className={`rounded-2xl border px-5 py-4 text-left shadow-sm transition ${
                  item.id === selectedId
                    ? "border-sky-400 bg-sky-100 text-sky-950"
                    : "border-sky-900/10 bg-white text-sky-950 hover:bg-sky-50"
                }`}
                key={item.id}
                onClick={() => {
                  setSelectedId(item.id);
                  setReplied(false);
                }}
                type="button"
              >
                <span className="block text-sm font-bold text-sky-700">{item.category}</span>
                <span className="mt-1 block text-lg font-bold">{item.name}</span>
                <span className="mt-2 block text-sm font-bold text-sky-950/60">{item.status}</span>
              </button>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="確認・返信">
          {selectedItem ? (
            <div className="grid gap-5">
              <div className="rounded-2xl bg-sky-50 px-5 py-4">
                <p className="text-sm font-bold text-sky-700">{selectedItem.category}</p>
                <h2 className="mt-1 text-2xl font-bold text-sky-950">{selectedItem.name}</h2>
                <p className="mt-3 text-lg leading-8 text-sky-950/75">{selectedItem.body}</p>
              </div>
              <FormField
                defaultValue="担当者が確認しました。必要な支援を調整します。"
                label="返信内容"
                name="reply"
                textarea
              />
              <PrimaryButton onClick={() => setReplied(true)}>返信する</PrimaryButton>
              {replied ? (
                <p className="rounded-2xl bg-sky-100 px-5 py-4 text-base font-bold text-sky-900">
                  返信しました。実際の保存は行わないモックです。
                </p>
              ) : null}
            </div>
          ) : null}
        </SectionCard>
      </section>
    </PageContainer>
  );
}

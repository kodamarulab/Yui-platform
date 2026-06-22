// Staff support information management page.
// src/app/staff/support/page.tsx
"use client";

import { useState } from "react";
import { FormField } from "@/components/FormField";
import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SectionCard } from "@/components/SectionCard";
import { StaffPageNotice } from "@/components/StaffPageNotice";

const initialSupportItems = [
  {
    contact: "相談窓口: 市役所 防災担当",
    description: "住家の被害程度を証明する書類です。生活再建支援や各種減免手続きに必要となる場合があります。",
    id: "support-1",
    title: "罹災証明",
  },
  {
    contact: "相談窓口: 福祉課",
    description: "避難生活で必要な福祉サービスや物資の相談を受け付けます。",
    id: "support-2",
    title: "福祉相談",
  },
];

export default function StaffSupportPage() {
  const [message, setMessage] = useState("");
  const [supportItems, setSupportItems] = useState(initialSupportItems);

  return (
    <PageContainer lead="職員が生活再建や相談につながる支援情報を登録・編集・削除する画面モックです。" title="支援情報管理">
      <StaffPageNotice />
      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <SectionCard title="支援情報">
          <div className="grid gap-5">
            <FormField defaultValue="罹災証明" label="項目名" name="title" />
            <FormField
              defaultValue="住家の被害程度を証明する書類です。生活再建支援や各種減免手続きに必要となる場合があります。"
              label="説明"
              name="description"
              textarea
            />
            <FormField defaultValue="相談窓口: 市役所 防災担当" label="相談窓口" name="contact" />
            <PrimaryButton onClick={() => setMessage("支援情報を保存しました。")}>保存する</PrimaryButton>
            {message ? <p className="rounded-2xl bg-sky-100 px-5 py-4 text-base font-bold text-sky-900">{message}</p> : null}
          </div>
        </SectionCard>

        <SectionCard title="支援情報一覧">
          <div className="grid gap-3">
            {supportItems.length > 0 ? (
              supportItems.map((item) => (
                <article className="rounded-2xl border border-teal-900/10 bg-white p-5 shadow-sm" key={item.id}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <h2 className="text-2xl font-bold text-teal-950">{item.title}</h2>
                    <div className="flex gap-2">
                      <button
                        className="rounded-xl bg-sky-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-sky-800"
                        onClick={() => setMessage(`${item.title}を編集対象にしました。`)}
                        type="button"
                      >
                        編集
                      </button>
                      <button
                        className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-rose-700"
                        onClick={() => {
                          setSupportItems((current) => current.filter((supportItem) => supportItem.id !== item.id));
                          setMessage(`${item.title}を削除しました。`);
                        }}
                        type="button"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-lg leading-8 text-teal-950/75">{item.description}</p>
                  <p className="mt-4 rounded-xl bg-orange-100 px-4 py-3 text-base font-bold text-orange-800">{item.contact}</p>
                </article>
              ))
            ) : (
              <p className="rounded-2xl bg-sky-50 px-5 py-4 text-base font-bold text-sky-900">支援情報はありません。</p>
            )}
          </div>
        </SectionCard>
      </section>
    </PageContainer>
  );
}

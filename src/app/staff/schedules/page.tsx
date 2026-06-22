// Staff schedule management page.
// src/app/staff/schedules/page.tsx
"use client";

import { useState } from "react";
import { FormField } from "@/components/FormField";
import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SectionCard } from "@/components/SectionCard";
import { StaffPageNotice } from "@/components/StaffPageNotice";

const initialSchedules = [
  {
    description: "保健師と看護師が体調や服薬について相談を受け付けます。",
    id: "schedule-1",
    time: "14:00",
    title: "医療相談",
  },
  {
    description: "体育館入口で夕食を配布します。受付番号順に案内します。",
    id: "schedule-2",
    time: "18:00",
    title: "夕食配布",
  },
];

export default function StaffSchedulesPage() {
  const [message, setMessage] = useState("");
  const [schedules, setSchedules] = useState(initialSchedules);

  return (
    <PageContainer lead="職員が今日の予定を登録・編集・削除する画面モックです。" title="今日の予定管理">
      <StaffPageNotice />
      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <SectionCard title="予定内容">
          <div className="grid gap-5">
            <FormField defaultValue="14:00" label="時刻" name="time" />
            <FormField defaultValue="医療相談" label="予定名" name="title" />
            <FormField defaultValue="保健師と看護師が体調や服薬について相談を受け付けます。" label="説明" name="description" textarea />
            <PrimaryButton onClick={() => setMessage("予定を保存しました。")}>保存する</PrimaryButton>
            {message ? <p className="rounded-2xl bg-sky-100 px-5 py-4 text-base font-bold text-sky-900">{message}</p> : null}
          </div>
        </SectionCard>

        <SectionCard title="予定一覧">
          <div className="grid gap-4">
            {schedules.length > 0 ? (
              schedules.map((item) => (
                <article className="flex gap-4 rounded-2xl border border-teal-900/10 bg-white p-5 shadow-sm" key={item.id}>
                  <time className="flex h-16 w-20 shrink-0 items-center justify-center rounded-2xl bg-teal-600 text-lg font-bold text-white">
                    {item.time}
                  </time>
                  <div className="min-w-0 flex-1 border-l-4 border-orange-300 pl-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h2 className="text-2xl font-bold text-teal-950">{item.title}</h2>
                        <p className="mt-1 text-lg leading-8 text-teal-950/75">{item.description}</p>
                      </div>
                      <div className="flex shrink-0 gap-2">
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
                            setSchedules((current) => current.filter((schedule) => schedule.id !== item.id));
                            setMessage(`${item.title}を削除しました。`);
                          }}
                          type="button"
                        >
                          削除
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <p className="rounded-2xl bg-sky-50 px-5 py-4 text-base font-bold text-sky-900">予定はありません。</p>
            )}
          </div>
        </SectionCard>
      </section>
    </PageContainer>
  );
}

// Staff announcement management page.
// src/app/staff/announcements/page.tsx
"use client";

import { useState } from "react";
import { FormField } from "@/components/FormField";
import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SectionCard } from "@/components/SectionCard";
import { StaffPageNotice } from "@/components/StaffPageNotice";

const initialAnnouncements = [
  {
    body: "正面玄関前に給水車が到着しました。容器を持って職員の案内に沿って並んでください。",
    id: "announcement-1",
    priority: "重要",
    time: "10:30",
    title: "給水車到着",
  },
  {
    body: "体育館入口で毛布を配布しています。世帯ごとに必要枚数を職員へ伝えてください。",
    id: "announcement-2",
    priority: "通常",
    time: "12:00",
    title: "毛布配布",
  },
];

export default function StaffAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [message, setMessage] = useState("");

  return (
    <PageContainer lead="職員が避難者向けのお知らせを登録・編集・削除する画面モックです。" title="お知らせ管理">
      <StaffPageNotice />
      <section className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
        <SectionCard title="投稿内容">
          <div className="grid gap-5">
            <FormField defaultValue="給水車到着" label="タイトル" name="title" />
            <FormField defaultValue="10:30" label="表示時刻" name="time" />
            <FormField defaultValue="重要" label="重要度" name="priority" options={["通常", "重要", "緊急"]} />
            <FormField
              defaultValue="正面玄関前に給水車が到着しました。容器を持って職員の案内に沿って並んでください。"
              label="本文"
              name="body"
              textarea
            />
            <div>
              <PrimaryButton onClick={() => setMessage("投稿内容を保存しました。")}>保存する</PrimaryButton>
            </div>
            {message ? <p className="rounded-2xl bg-sky-100 px-5 py-4 text-base font-bold text-sky-900">{message}</p> : null}
          </div>
        </SectionCard>

        <SectionCard title="お知らせ一覧">
          <div className="grid gap-3">
            {announcements.length > 0 ? (
              announcements.map((item) => (
                <article className="rounded-2xl border border-teal-900/10 bg-white p-5 shadow-sm" key={item.id}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-base font-bold text-orange-600">{item.time}</p>
                      <h2 className="mt-1 text-2xl font-bold text-teal-950">{item.title}</h2>
                      <p className="mt-2 text-sm font-bold text-teal-700">{item.priority}</p>
                    </div>
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
                          setAnnouncements((current) => current.filter((announcement) => announcement.id !== item.id));
                          setMessage(`${item.title}を削除しました。`);
                        }}
                        type="button"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-lg leading-8 text-teal-950/75">{item.body}</p>
                </article>
              ))
            ) : (
              <p className="rounded-2xl bg-sky-50 px-5 py-4 text-base font-bold text-sky-900">お知らせはありません。</p>
            )}
          </div>
        </SectionCard>
      </section>
    </PageContainer>
  );
}

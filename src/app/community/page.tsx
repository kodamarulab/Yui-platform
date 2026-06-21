// Development-only chat board page for stakeholder feedback.
// src/app/community/page.tsx
"use client";

import { useState } from "react";
import communityData from "@/mock/community.json";
import { FormField } from "@/components/FormField";
import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/PrimaryButton";
import { SectionCard } from "@/components/SectionCard";
import type { CommunityBoard } from "@/types/mock";

const board = communityData as CommunityBoard;

export default function CommunityPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [sent, setSent] = useState(false);

  return (
    <PageContainer
      lead="開発時のみ使う、1つの投稿に参加者全員で議論するチャット掲示板モックです。認証や投稿は保存されません。"
      title="開発用コミュニティ"
    >
      <section className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionCard title="ログイン">
          <div className="grid gap-5">
            <FormField defaultValue="staff01" label="ID" name="userId" />
            <FormField defaultValue="demo1234" label="パスワード" name="password" type="password" />
            <FormField defaultValue="防災担当" label="ニックネーム" name="nickname" />
            <PrimaryButton onClick={() => setLoggedIn(true)}>ログインする</PrimaryButton>
            {loggedIn ? (
              <p className="rounded-2xl bg-teal-100 px-5 py-4 text-base font-bold text-teal-900">
                ログインしました。チャット投稿欄を確認できます。
              </p>
            ) : null}
          </div>
        </SectionCard>

        <SectionCard title="ユーザー情報">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-separate border-spacing-0 text-left">
              <thead>
                <tr className="text-sm font-bold text-teal-950/70">
                  <th className="border-b border-teal-900/10 px-4 py-3">ID</th>
                  <th className="border-b border-teal-900/10 px-4 py-3">パスワード</th>
                  <th className="border-b border-teal-900/10 px-4 py-3">ニックネーム</th>
                </tr>
              </thead>
              <tbody>
                {board.users.map((user) => (
                  <tr key={user.id}>
                    <td className="border-b border-teal-900/10 px-4 py-3 font-bold text-teal-950">{user.id}</td>
                    <td className="border-b border-teal-900/10 px-4 py-3 text-teal-950/75">{user.password}</td>
                    <td className="border-b border-teal-900/10 px-4 py-3 text-teal-950/75">{user.nickname}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </section>

      <article className="mt-8 rounded-2xl border border-teal-900/10 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold text-orange-600">議論中の投稿</p>
            <h2 className="mt-1 text-2xl font-bold text-teal-950">{board.thread.title}</h2>
          </div>
          <span className="w-fit rounded-full bg-teal-100 px-3 py-1 text-sm font-bold text-teal-800">{board.thread.status}</span>
        </div>
        <p className="mt-4 text-lg leading-8 text-teal-950/75">{board.thread.body}</p>
      </article>

      <section className="mt-6 rounded-2xl border border-teal-900/10 bg-teal-50 p-5 shadow-sm sm:p-6">
        <h2 className="text-2xl font-bold text-teal-950">チャット</h2>
        <div className="mt-5 grid gap-4">
          {board.messages.map((message) => (
            <div className="rounded-2xl bg-white px-5 py-4 shadow-sm" key={message.id}>
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-bold text-teal-950">{message.nickname}</p>
                <p className="text-sm font-bold text-teal-950/50">{message.postedAt}</p>
              </div>
              <p className="mt-2 text-lg leading-8 text-teal-950/75">{message.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4">
          <FormField label="返信内容" name="message" textarea />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <PrimaryButton onClick={() => setSent(true)}>チャットに送信する</PrimaryButton>
            {sent ? (
              <p className="rounded-2xl bg-teal-100 px-5 py-3 text-base font-bold text-teal-900">
                送信しました。実際の保存は行わないモックです。
              </p>
            ) : null}
          </div>
        </div>
      </section>
    </PageContainer>
  );
}

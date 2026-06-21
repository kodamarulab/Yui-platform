// Development-only Supabase-backed board page.
// src/app/community/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  isSupabaseConfigured,
  type DevCommunityPostCategory,
  type DevCommunityPostWithReplies,
  type DevCommunityUserRow,
} from "@/lib/supabase";
import {
  createDevCommunityPost,
  createDevCommunityReply,
  createDevCommunityUser,
  fetchDevCommunityPosts,
  loginDevCommunityUser,
} from "@/server/services/devCommunity";
import { PageContainer } from "@/components/PageContainer";
import { PrimaryButton } from "@/components/PrimaryButton";

type ModalKind = "login" | "register" | "post" | null;

const cookieName = "dev_community_user";
const categories: DevCommunityPostCategory[] = ["意見提案", "改善提案", "バグ報告", "その他"];

function inputClass() {
  return "mt-2 w-full rounded-xl border border-teal-900/20 bg-white px-4 py-3 text-base text-teal-950 outline-none ring-teal-500 transition focus:ring-2";
}

function saveUserCookie(user: DevCommunityUserRow) {
  document.cookie = `${cookieName}=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=604800; SameSite=Lax`;
}

function clearUserCookie() {
  document.cookie = `${cookieName}=; path=/; max-age=0; SameSite=Lax`;
}

function readUserCookie(): DevCommunityUserRow | null {
  const rawCookie = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${cookieName}=`))
    ?.slice(cookieName.length + 1);

  if (!rawCookie) {
    return null;
  }

  try {
    return JSON.parse(decodeURIComponent(rawCookie)) as DevCommunityUserRow;
  } catch {
    return null;
  }
}

type ModalShellProps = {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
};

function ModalShell({ children, onClose, title }: ModalShellProps) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-teal-950/55 px-4">
      <section className="w-full max-w-sm rounded-3xl bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="text-xl font-bold text-teal-950">{title}</h2>
          <button className="rounded-full bg-teal-50 px-3 py-2 text-xs font-bold text-teal-900" onClick={onClose} type="button">
            閉じる
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

export default function CommunityPage() {
  const [activeModal, setActiveModal] = useState<ModalKind>(null);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [registerLoginId, setRegisterLoginId] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerNickname, setRegisterNickname] = useState("");
  const [postCategory, setPostCategory] = useState<DevCommunityPostCategory>("意見提案");
  const [postSubject, setPostSubject] = useState("");
  const [postBody, setPostBody] = useState("");
  const [posts, setPosts] = useState<DevCommunityPostWithReplies[]>([]);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [currentUser, setCurrentUser] = useState<DevCommunityUserRow | null>(null);
  const [replyBodies, setReplyBodies] = useState<Record<string, string>>({});
  const [statusMessage, setStatusMessage] = useState("");

  const selectedPost = useMemo(
    () => posts.find((post) => post.id === selectedPostId) ?? posts[0],
    [posts, selectedPostId],
  );

  async function loadPosts() {
    const nextPosts = await fetchDevCommunityPosts();
    setPosts(nextPosts);
    setSelectedPostId((current) => current || nextPosts[0]?.id || "");
  }

  useEffect(() => {
    const savedUser = readUserCookie();
    if (savedUser) {
      setCurrentUser(savedUser);
      setLoginId(savedUser.login_id);
    }

    if (isSupabaseConfigured) {
      void loadPosts();
    }
  }, []);

  function handleLogout() {
    setCurrentUser(null);
    setPassword("");
    clearUserCookie();
    setStatusMessage("ログアウトしました。");
  }

  async function handleRegister() {
    const result = await createDevCommunityUser(registerLoginId, registerPassword, registerNickname);

    if (!result.ok) {
      setStatusMessage(result.message);
      return;
    }

    setCurrentUser(result.user);
    setLoginId(result.user.login_id);
    setPassword(result.user.password);
    saveUserCookie(result.user);
    setStatusMessage(`${result.user.nickname} を登録し、ログインしました。`);
    setActiveModal(null);
  }

  async function handleLogin() {
    const result = await loginDevCommunityUser(loginId, password);

    if (!result.ok) {
      setStatusMessage(result.message);
      return;
    }

    setCurrentUser(result.user);
    saveUserCookie(result.user);
    setStatusMessage(`${result.user.nickname} としてログインしました。`);
    setActiveModal(null);
  }

  async function handleCreatePost() {
    if (!currentUser) {
      setStatusMessage("ログイン後に新規投稿できます。");
      setActiveModal("login");
      return;
    }

    const result = await createDevCommunityPost(
      postCategory,
      postSubject,
      postBody,
      currentUser.login_id,
      currentUser.nickname,
    );

    if (!result.ok) {
      setStatusMessage(result.message);
      return;
    }

    setPostSubject("");
    setPostBody("");
    setStatusMessage("新規投稿しました。");
    setActiveModal(null);
    await loadPosts();
  }

  async function handleCreateReply(postId: string) {
    if (!currentUser) {
      setStatusMessage("ログイン後に返信できます。");
      setActiveModal("login");
      return;
    }

    const result = await createDevCommunityReply(postId, replyBodies[postId] ?? "", currentUser.login_id, currentUser.nickname);

    if (!result.ok) {
      setStatusMessage(result.message);
      return;
    }

    setReplyBodies((current) => ({ ...current, [postId]: "" }));
    setStatusMessage("返信しました。");
    await loadPosts();
  }

  return (
    <PageContainer
      lead="アプリ開発に関するコミュニティです。画面イメージ、業務フロー、機能、UXの検証を目的とした掲示板です。皆さんのご意見をお待ちしています！"
      title="開発専用コミュニティ"
    >
      {!isSupabaseConfigured ? (
        <section className="mb-6 rounded-2xl border border-orange-300 bg-orange-50 px-5 py-4 shadow-sm">
          <p className="font-bold text-orange-800">データベース未設定</p>
        </section>
      ) : null}

      {statusMessage ? (
        <p className="mb-5 rounded-2xl bg-teal-100 px-5 py-4 text-base font-bold text-teal-900">{statusMessage}</p>
      ) : null}

      <div className="overflow-x-auto">
        <div className="grid min-w-[960px] grid-cols-[340px_minmax(0,1fr)] gap-5 items-start">
          <aside className="grid gap-5">
            <section className="rounded-2xl border border-teal-900/10 bg-white p-4 shadow-sm">
              <p className="text-sm font-bold text-orange-600">ログインユーザー情報</p>
              <p className="mt-2 text-base font-bold text-teal-950">
                {currentUser ? currentUser.nickname : "未ログイン"}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {!currentUser ? (
                  <button
                    className="inline-flex min-h-10 items-center justify-center rounded-xl bg-teal-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-teal-700"
                    onClick={() => setActiveModal("login")}
                    type="button"
                  >
                    ログイン
                  </button>
                ) : (
                  <button
                    className="inline-flex min-h-10 items-center justify-center rounded-xl border border-teal-900/20 bg-white px-4 py-2 text-sm font-bold text-teal-950 shadow-sm transition hover:bg-teal-50"
                    onClick={handleLogout}
                    type="button"
                  >
                    ログアウト
                  </button>
                )}
                <button
                  className="inline-flex min-h-10 items-center justify-center rounded-xl bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-orange-600"
                  onClick={() => setActiveModal("register")}
                  type="button"
                >
                  新規登録
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-teal-900/10 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-teal-950">投稿記事一覧</h2>
                  <p className="mt-1 text-xs font-bold text-teal-950/50">更新日時が新しい順</p>
                </div>
                <button
                  className="rounded-xl bg-teal-950 px-3 py-2 text-xs font-bold text-white transition hover:bg-teal-900"
                  onClick={() => setActiveModal("post")}
                  type="button"
                >
                  新規投稿
                </button>
              </div>
              <ul className="divide-y divide-teal-900/10">
                {posts.map((post) => (
                  <li key={post.id}>
                    <button
                      className={`grid w-full grid-cols-[1fr_auto] items-center gap-3 px-2 py-2 text-left transition ${post.id === selectedPost?.id ? "bg-orange-50" : "hover:bg-teal-50"
                        }`}
                      onClick={() => setSelectedPostId(post.id)}
                      type="button"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-bold leading-5 text-teal-950">{post.subject}</span>
                        <span className="mt-0.5 block text-xs font-bold text-orange-600">{post.category}</span>
                      </span>
                      <time className="shrink-0 text-xs font-bold text-teal-950/50">
                        {new Date(post.created_at).toLocaleString("ja-JP", {
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          month: "2-digit",
                        })}
                      </time>
                    </button>
                  </li>
                ))}
                {posts.length === 0 ? (
                  <li className="px-2 py-3 text-sm font-bold text-teal-950/60">投稿はありません。</li>
                ) : null}
              </ul>
            </section>
          </aside>

          <section className="rounded-2xl border border-teal-900/10 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-4 text-lg font-bold text-teal-950">記事詳細</h2>
            {selectedPost ? (
              <article>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-bold text-orange-600">{selectedPost.category}</p>
                    <h3 className="mt-1 text-2xl font-bold text-teal-950">{selectedPost.subject}</h3>
                    <p className="mt-2 text-sm font-bold text-teal-950/55">
                      {selectedPost.nickname} / {new Date(selectedPost.created_at).toLocaleString("ja-JP")}
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-teal-100 px-3 py-1 text-sm font-bold text-teal-800">
                    返信 {selectedPost.replies.length}件
                  </span>
                </div>
                <p className="mt-4 text-lg leading-8 text-teal-950/75">{selectedPost.body}</p>

                <div className="mt-6 rounded-2xl bg-teal-50 p-4">
                  <h3 className="text-lg font-bold text-teal-950">返信履歴</h3>
                  <div className="mt-3 grid gap-3">
                    {selectedPost.replies.map((reply) => (
                      <div className="rounded-xl bg-white px-4 py-3" key={reply.id}>
                        <p className="text-sm font-bold text-teal-950/55">
                          {reply.nickname} / {new Date(reply.created_at).toLocaleString("ja-JP")}
                        </p>
                        <p className="mt-2 text-base leading-7 text-teal-950/75">{reply.body}</p>
                      </div>
                    ))}
                    {selectedPost.replies.length === 0 ? (
                      <p className="rounded-xl bg-white px-4 py-3 text-base font-bold text-teal-950/60">
                        まだ返信はありません。
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-4 grid gap-3">
                    <label className="block text-base font-bold text-teal-950">
                      返信内容
                      <textarea
                        className={`${inputClass()} min-h-28`}
                        onChange={(event) => setReplyBodies((current) => ({ ...current, [selectedPost.id]: event.target.value }))}
                        value={replyBodies[selectedPost.id] ?? ""}
                      />
                    </label>
                    <div>
                      <PrimaryButton onClick={() => handleCreateReply(selectedPost.id)}>返信する</PrimaryButton>
                    </div>
                  </div>
                </div>
              </article>
            ) : (
              <p className="rounded-2xl bg-white px-5 py-6 text-base font-bold text-teal-950/70">
                投稿記事を選択してください。投稿がない場合は、掲示板用migration SQLを実行してください。
              </p>
            )}
          </section>
        </div>
      </div>

      {activeModal === "login" ? (
        <ModalShell onClose={() => setActiveModal(null)} title="ログイン">
          <div className="grid gap-4">
            <label className="block text-base font-bold text-teal-950">
              ID
              <input className={inputClass()} onChange={(event) => setLoginId(event.target.value)} value={loginId} />
            </label>
            <label className="block text-base font-bold text-teal-950">
              パスワード
              <input className={inputClass()} onChange={(event) => setPassword(event.target.value)} type="password" value={password} />
            </label>
            <PrimaryButton onClick={handleLogin}>ログインする</PrimaryButton>
          </div>
        </ModalShell>
      ) : null}

      {activeModal === "register" ? (
        <ModalShell onClose={() => setActiveModal(null)} title="新規登録">
          <div className="grid gap-4">
            <label className="block text-base font-bold text-teal-950">
              ID
              <input className={inputClass()} onChange={(event) => setRegisterLoginId(event.target.value)} value={registerLoginId} />
            </label>
            <label className="block text-base font-bold text-teal-950">
              パスワード
              <input
                className={inputClass()}
                onChange={(event) => setRegisterPassword(event.target.value)}
                type="password"
                value={registerPassword}
              />
            </label>
            <label className="block text-base font-bold text-teal-950">
              ニックネーム
              <input
                className={inputClass()}
                onChange={(event) => setRegisterNickname(event.target.value)}
                value={registerNickname}
              />
            </label>
            <p className="text-sm font-bold leading-6 text-teal-950/60">
              開発コミュニティ専用です。本番環境のユーザー登録には使いません。
            </p>
            <PrimaryButton onClick={handleRegister}>登録して参加する</PrimaryButton>
          </div>
        </ModalShell>
      ) : null}

      {activeModal === "post" ? (
        <ModalShell onClose={() => setActiveModal(null)} title="新規投稿">
          <div className="grid gap-4">
            <label className="block text-base font-bold text-teal-950">
              区分
              <select
                className={inputClass()}
                onChange={(event) => setPostCategory(event.target.value as DevCommunityPostCategory)}
                value={postCategory}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-base font-bold text-teal-950">
              件名
              <input className={inputClass()} onChange={(event) => setPostSubject(event.target.value)} value={postSubject} />
            </label>
            <label className="block text-base font-bold text-teal-950">
              本文
              <textarea className={`${inputClass()} min-h-36`} onChange={(event) => setPostBody(event.target.value)} value={postBody} />
            </label>
            <PrimaryButton onClick={handleCreatePost}>投稿する</PrimaryButton>
          </div>
        </ModalShell>
      ) : null}
    </PageContainer>
  );
}

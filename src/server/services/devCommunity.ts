// Client-side service for development community Supabase access.
// src/server/services/devCommunity.ts
import {
  supabase,
  type DevCommunityPostCategory,
  type DevCommunityPostRow,
  type DevCommunityPostWithReplies,
  type DevCommunityReplyRow,
  type DevCommunityUserRow,
} from "@/lib/supabase";

export type DevCommunityLoginResult =
  | {
      ok: true;
      user: DevCommunityUserRow;
    }
  | {
      ok: false;
      message: string;
    };

export type DevCommunityRegisterResult =
  | {
      ok: true;
      user: DevCommunityUserRow;
    }
  | {
      ok: false;
      message: string;
    };

export type DevCommunityWriteResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      message: string;
    };

function errorMessage(prefix: string, message: string) {
  return `${prefix} ${message}`;
}

export async function createDevCommunityUser(
  loginId: string,
  password: string,
  nickname: string,
): Promise<DevCommunityRegisterResult> {
  if (!supabase) {
    return { ok: false, message: "Supabase環境変数が未設定です。" };
  }

  if (!loginId.trim() || !password.trim() || !nickname.trim()) {
    return { ok: false, message: "ID、パスワード、ニックネームを入力してください。" };
  }

  const { data, error } = await supabase
    .from("dev_community_users")
    .insert({
      login_id: loginId.trim(),
      password,
      nickname: nickname.trim(),
    })
    .select("*")
    .single();

  if (error) {
    return { ok: false, message: errorMessage("登録に失敗しました。", error.message) };
  }

  return { ok: true, user: data as DevCommunityUserRow };
}

export async function loginDevCommunityUser(loginId: string, password: string): Promise<DevCommunityLoginResult> {
  if (!supabase) {
    return { ok: false, message: "Supabase環境変数が未設定です。" };
  }

  const { data, error } = await supabase
    .from("dev_community_users")
    .select("*")
    .eq("login_id", loginId.trim())
    .eq("password", password)
    .maybeSingle();

  if (error) {
    return { ok: false, message: errorMessage("ログイン確認に失敗しました。", error.message) };
  }

  if (!data) {
    return { ok: false, message: "IDまたはパスワードが違います。" };
  }

  return { ok: true, user: data as DevCommunityUserRow };
}

export async function fetchDevCommunityPosts(): Promise<DevCommunityPostWithReplies[]> {
  if (!supabase) {
    return [];
  }

  const [postResult, replyResult] = await Promise.all([
    supabase.from("dev_community_posts").select("*").order("created_at", { ascending: false }),
    supabase.from("dev_community_replies").select("*").order("created_at", { ascending: true }),
  ]);

  if (postResult.error || replyResult.error) {
    return [];
  }

  const posts = (postResult.data ?? []) as DevCommunityPostRow[];
  const replies = (replyResult.data ?? []) as DevCommunityReplyRow[];

  return posts.map((post) => ({
    ...post,
    replies: replies.filter((reply) => reply.post_id === post.id),
  }));
}

export async function createDevCommunityPost(
  category: DevCommunityPostCategory,
  subject: string,
  body: string,
  userId: string,
  nickname: string,
): Promise<DevCommunityWriteResult> {
  if (!supabase) {
    return { ok: false, message: "Supabase環境変数が未設定です。" };
  }

  if (!subject.trim() || !body.trim()) {
    return { ok: false, message: "件名と本文を入力してください。" };
  }

  const { error } = await supabase.from("dev_community_posts").insert({
    category,
    subject: subject.trim(),
    body: body.trim(),
    user_id: userId,
    nickname,
  });

  if (error) {
    return { ok: false, message: errorMessage("新規投稿に失敗しました。", error.message) };
  }

  return { ok: true };
}

export async function createDevCommunityReply(
  postId: string,
  body: string,
  userId: string,
  nickname: string,
): Promise<DevCommunityWriteResult> {
  if (!supabase) {
    return { ok: false, message: "Supabase環境変数が未設定です。" };
  }

  if (!body.trim()) {
    return { ok: false, message: "返信内容を入力してください。" };
  }

  const { error } = await supabase.from("dev_community_replies").insert({
    post_id: postId,
    user_id: userId,
    nickname,
    body: body.trim(),
  });

  if (error) {
    return { ok: false, message: errorMessage("返信に失敗しました。", error.message) };
  }

  return { ok: true };
}

// Supabase client for development-only community features.
// src/lib/supabase.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type DevCommunityUserRow = {
  id: string;
  login_id: string;
  password: string;
  nickname: string;
  created_at?: string;
};

export type DevCommunityPostCategory = "意見提案" | "改善提案" | "バグ報告" | "その他";

export type DevCommunityPostRow = {
  id: string;
  category: DevCommunityPostCategory;
  subject: string;
  body: string;
  user_id: string;
  nickname: string;
  created_at: string;
};

export type DevCommunityReplyRow = {
  id: string;
  post_id: string;
  user_id: string;
  nickname: string;
  body: string;
  created_at: string;
};

export type DevCommunityPostWithReplies = DevCommunityPostRow & {
  replies: DevCommunityReplyRow[];
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabasePublishableKey as string)
  : null;

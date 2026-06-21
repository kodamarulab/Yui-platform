// Recent development community posts fetched from Supabase.
// src/components/DevRecentPosts.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { DevCommunityPostWithReplies } from "@/lib/supabase";
import { fetchDevCommunityPosts } from "@/server/services/devCommunity";

export function DevRecentPosts() {
  const [posts, setPosts] = useState<DevCommunityPostWithReplies[]>([]);

  useEffect(() => {
    async function loadPosts() {
      setPosts((await fetchDevCommunityPosts()).slice(0, 5));
    }

    void loadPosts();
  }, []);

  return (
    <ul className="divide-y divide-teal-900/10">
      {posts.map((post) => (
        <li key={post.id}>
          <Link className="flex items-center justify-between gap-3 py-2 hover:bg-teal-50" href="/community">
            <span className="text-sm font-bold leading-5 text-blue-700">{post.subject}</span>
            <time className="shrink-0 text-xs font-bold text-teal-950/50">
              {new Date(post.created_at).toLocaleString("ja-JP", {
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                month: "2-digit",
              })}
            </time>
          </Link>
        </li>
      ))}
      {posts.length === 0 ? (
        <li className="py-2 text-sm font-bold leading-5 text-teal-950/55">投稿はまだありません。</li>
      ) : null}
    </ul>
  );
}

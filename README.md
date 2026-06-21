# ゆい モックサイト

避難所コミュニティ支援アプリ「ゆい」の操作可能な画面モックです。

## セットアップ

```bash
npm install
npm run build
npm run deploy
```

## GitHub Pages

GitHub Actionsでは `npm run build` 後に生成される `out` ディレクトリをPagesへ公開します。

リポジトリ名に合わせた `basePath` / `assetPrefix` が必要な場合は、ビルド時に `NEXT_PUBLIC_BASE_PATH` を指定してください。

```bash
NEXT_PUBLIC_BASE_PATH=/repository-name npm run build
```

## 開発用コミュニティ

開発用コミュニティのみSupabaseへ接続します。これは開発時の意見交換用で、本番運用には使いません。

```bash
NEXT_PUBLIC_SUPABASE_URL=your-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

ユーザーは画面の「新規登録」から簡単に登録できます。登録項目はID、パスワード、ニックネームです。

DB作成SQLは以下にあります。

```text
supabase/migrations/20260621000100_create_dev_community_users.sql
supabase/migrations/20260621000200_add_dev_community_rls_policies.sql
supabase/migrations/20260621000300_create_dev_community_board.sql
```

Supabase CLIで反映する場合:

```bash
npx supabase login
npx supabase link --project-ref your-project-ref
npx supabase db push
```

CIなどでは `SUPABASE_ACCESS_TOKEN` を設定してください。

想定テーブル:

```sql
create table dev_community_users (
  id uuid primary key default gen_random_uuid(),
  login_id text not null unique,
  password text not null,
  nickname text not null,
  created_at timestamptz not null default now()
);

create table dev_community_messages (
  id uuid primary key default gen_random_uuid(),
  thread_id text not null,
  user_id text not null,
  nickname text not null,
  body text not null,
  created_at timestamptz not null default now()
);
```

登録できない場合は、SupabaseのRLS policyが未作成の可能性があります。
`20260621000200_add_dev_community_rls_policies.sql` をSQL Editorで実行してください。

掲示板の件名投稿と返信機能を使う場合は、`20260621000300_create_dev_community_board.sql` もSQL Editorで実行してください。

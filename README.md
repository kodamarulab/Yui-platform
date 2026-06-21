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

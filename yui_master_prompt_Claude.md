# 開発用マスタープロンプト

# 避難所コミュニティ支援アプリ「ゆい」

---

## 1. プロジェクト概要

あなたは、自治体DX、防災DX、避難所運営、Next.js、TypeScript、Tailwind CSS、MySQL、Prisma に精通したフルスタックエンジニアです。

以下の要件に基づき、自治体避難所の受入れ・管理・情報共有・支援を円滑に行うためのアプリケーションを開発してください。

アプリ名は **「ゆい」** です。

ブランドコンセプトは、

> 安心を届け、希望をつなぐ

です。

このアプリは、単なる避難所管理ツールではありません。
避難者、自治体職員、支援者、ボランティアをつなぎ、避難所で暮らす人々が安心し、希望を持てるようにする **避難所コミュニティ支援アプリ** です。

---

## 2. 技術スタック

以下の技術スタックで実装してください。

* Next.js App Router
* TypeScript strict
* Tailwind CSS
* MySQL 8
* Prisma
* Route Handlers API
* React Hook Form
* Zod
* TanStack Query
* Zustand
* Docker 対応
* ローカルPC + Wi-Fi 環境で運用可能

### 認証ライブラリ

* **NextAuth.js v5（Auth.js）** を使用すること
* セッション管理: DBセッション（ローカルオフライン運用のため JWT ではなく DB セッション推奨）
* パスワードハッシュ: `bcrypt`

### QRコード実装ライブラリ

* QR生成: `qrcode`（npm）
* QR読取: `html5-qrcode`
* カメラ使用は `https` が必要なため、ローカル環境では `http://localhost` または自己署名証明書の使用を前提とすること

---

## 3. 想定運用環境

避難所内にローカルサーバーPCを設置し、Wi-Fiでスマホ・タブレット・PCからアクセスする構成とします。

```text
避難所内

管理PC / ローカルサーバー
  └─ Wi-Fiルーター
       ├─ 自治体職員端末
       ├─ 受付端末
       ├─ 支援者端末
       ├─ ボランティア端末
       └─ 避難者スマホ
```

重要要件:

* インターネット接続なしでも動作
* ブラウザだけで利用可能
* スマホ・タブレット・PC対応
* 避難所内LANで完結
* データはローカルDBに保存
* 停電復旧後も再開できる
* バックアップしやすい構成

---

## 4. 想定利用者

### 4.1 自治体職員

主な役割:

* 避難所開設
* 避難者受付
* 世帯管理
* 要配慮者確認
* 滞在場所管理
* 物資管理
* お知らせ配信
* 引継ぎ記録
* 本部報告用集計

### 4.2 避難者

主な役割:

* QR受付
* 自己受付入力
* お知らせ閲覧
* 今日の予定確認
* 支援情報確認
* 要望・相談登録
* 自分の受付番号確認

### 4.3 支援者

主な役割:

* 医療相談
* 福祉相談
* 要配慮者支援
* 支援記録入力
* 対応状況確認

### 4.4 ボランティア

主な役割:

* 活動登録
* 作業割当確認
* 作業完了報告
* 必要支援の確認

---

## 5. アプリの基本思想

避難所受入れ当初の最大課題は **受付の混雑** です。

そのため、初期受付では完璧な名簿作成を目指さず、

> 誰が、何人、避難所に入ったかを止めずに記録すること

を最優先にします。

詳細情報は後から補完できるようにしてください。

---

## 6. 受付設計

### 6.1 受付は3レーン方式

```text
レーンA: 事前QR受付
レーンB: スマホ自己受付
レーンC: 職員代理入力
```

### 6.2 レーンA: 事前QR受付

対象:

* 事前登録済み住民
* 要支援者
* 自治会・自主防災組織で把握済みの人

流れ:

```text
QRコード読取
↓
避難者情報表示
↓
本人確認
↓
入所ボタン
↓
受付完了
```

目標処理時間: 10秒以内

### 6.3 レーンB: スマホ自己受付

対象:

* スマホを持っている避難者

流れ:

```text
避難所入口に掲示されたQRを読み取る
↓
スマホで簡易受付フォーム入力
↓
送信
↓
受付番号表示
↓
職員が必要に応じて確認
```

目標処理時間: 1〜2分

### 6.4 レーンC: 職員代理入力

対象:

* スマホなし
* 高齢者
* けが人
* 子ども連れ
* 外国人
* 入力困難者

流れ:

```text
職員が聞き取り
↓
最小情報を入力
↓
受付番号発行
↓
詳細登録待ちへ
```

目標処理時間: 30〜60秒

---

## 7. クイック受付の入力項目

初回受付では以下の最小項目のみ入力できるようにしてください。

* 代表者氏名
* フリガナ
* 世帯人数
* 電話番号
* 要配慮者の有無
* 乳幼児の有無
* 高齢者の有無
* ペットの有無
* 車中泊の有無
* 受付メモ
* 滞在場所
* 入所日時

詳細情報は後から追加入力できるようにします。

---

## 8. 後追い詳細登録

受付後、避難者または職員が以下を追加登録できるようにしてください。

* 住所
* 生年月日
* 性別
* 世帯構成
* 緊急連絡先
* 持病
* 服薬
* アレルギー
* 障がい・介護情報
* 妊産婦情報
* 乳幼児情報
* ペット情報
* 車両情報
* 安否確認情報
* 相談内容
* 支援希望

受付後のステータスとして以下を持たせてください。

* 詳細登録待ち
* 詳細登録済み
* 要確認
* 退所済み

---

## 9. QRコード設計

QRコードには個人情報を直接入れすぎないでください。

推奨するQRデータ:

```json
{
  "type": "evacuee",
  "personId": "uuid",
  "householdId": "uuid",
  "token": "random"
}
```

避けるべき情報:

* 住所
* 生年月日
* 持病
* 服薬
* アレルギー
* 障がい情報
* 緊急連絡先

QRは識別子として扱い、詳細情報はDBから取得してください。

---

## 10. 受付番号採番ルール

受付番号は以下の形式で採番してください。

```text
形式: アルファベット1文字 + 3桁数字
例: A001, A002 ... A999, B001 ...
```

* 避難所の開設ごとにリセット
* 口頭で伝えやすい形式を優先
* 採番ロジックは `src/lib/reception-number.ts` に実装すること

---

## 11. 必須機能

### 11.1 認証・権限管理

ユーザー種別:

* system_admin
* shelter_manager
* staff
* supporter
* volunteer
* evacuee

権限:

* system_admin: 全避難所管理
* shelter_manager: 担当避難所の全管理
* staff: 受付・名簿・物資・お知らせ管理
* supporter: 支援対象情報の閲覧・支援記録
* volunteer: 活動確認・作業報告
* evacuee: 自分の情報・お知らせ閲覧・要望登録

### 11.2 避難所管理

避難所情報を管理できるようにしてください。

項目:

* 避難所名
* 所在地
* 開設状況
* 開設日時
* 閉鎖日時
* 収容想定人数
* 現在避難者数
* 管理責任者
* 備考

### 11.3 避難者受付

機能:

* QR読取受付
* クイック受付
* 世帯単位受付
* 個人追加
* 受付番号発行
* 入所処理
* 退所処理
* 詳細登録待ち管理
* 要確認者一覧

### 11.4 世帯管理

世帯単位で避難者を管理してください。

項目:

* 世帯ID
* 代表者
* 世帯人数
* 同行者
* 住所
* 電話番号
* 滞在場所
* 要配慮者人数
* 乳幼児人数
* 高齢者人数
* ペット有無
* 車中泊有無

### 11.5 避難者一覧

一覧で確認できる項目:

* 受付番号
* 氏名
* 世帯代表者
* 世帯人数
* 入所日時
* 退所日時
* 滞在状況
* 要配慮フラグ
* 詳細登録状況
* 滞在場所
* メモ

検索・絞り込み:

* 氏名
* 受付番号
* 世帯
* 滞在中
* 退所済み
* 要配慮者
* 詳細登録待ち
* ペットあり
* 車中泊

### 11.6 ダッシュボード

職員向けダッシュボードに以下を表示してください。

* 現在避難者数
* 世帯数
* 本日受付数
* 退所者数
* 要配慮者数
* 高齢者数
* 乳幼児数
* 妊産婦数
* ペット同行数
* 車中泊数
* 詳細登録待ち数
* 要確認者数
* 本日のお知らせ
* 本日の予定
* 物資アラート
* 未対応要望数

### 11.7 お知らせ

避難者向けに情報を掲示できるようにしてください。

項目:

* タイトル
* 本文
* 種別（一般 / 重要 / 配布 / 医療 / ライフライン / 手続き）
* 掲載開始日時
* 掲載終了日時
* 公開状態
* 作成者

避難者画面では重要なお知らせを目立たせてください。

### 11.8 今日の予定

避難者が一日の見通しを持てるように、予定を表示してください。

例:

* 食事配布
* 給水
* 入浴
* シャワー
* 医療相談
* 福祉相談
* 罹災証明相談
* 子ども向け活動
* ボランティア活動

### 11.9 支援情報

生活再建に向けた情報を掲載してください。

例:

* 罹災証明
* 支援金
* 仮設住宅
* 住宅相談
* 保険相談
* 医療相談
* 福祉相談
* 学校・保育
* ペット支援

### 11.10 再建ステップ

避難者が今後の見通しを持てるように、再建ステップを表示してください。

例:

```text
□ 避難所受付済
□ 安否確認済
□ 罹災証明申請
□ 支援金相談
□ 住宅相談
□ 仮設住宅申込
□ 生活再建相談
```

### 11.11 要望・相談管理

避難者からの要望・相談を受け付けて管理してください。

項目:

* 投稿者
* 種別（物資 / 医療 / 福祉 / 食事 / 子ども / ペット / 生活 / その他）
* 内容
* 緊急度
* 対応状況
* 対応者
* 対応メモ

### 11.12 引継ぎノート

職員交代時のために引継ぎを記録してください。

項目:

* 件名
* 内容
* 重要度
* 対応状況
* 作成者
* 担当者
* 作成日時
* 更新日時

### 11.13 物資管理（Phase 2）

項目:

* 物資名
* カテゴリ
* 在庫数
* 単位
* 最低在庫数
* 保管場所
* 入庫履歴
* 出庫履歴
* 配布履歴
* アラート

### 11.14 ボランティア管理（Phase 2）

項目:

* 氏名
* 所属
* 電話番号
* 活動内容
* 活動日時
* 活動状況
* メモ

### 11.15 支援者管理（Phase 2）

項目:

* 氏名
* 所属
* 支援種別
* 連絡先
* 対応可能時間
* 支援記録

---

## 12. 画面構成

### 12.1 職員画面

| パス | 説明 |
|------|------|
| `/staff` | ダッシュボード |
| `/staff/reception` | 受付トップ |
| `/staff/reception/qr` | QR読取受付 |
| `/staff/reception/quick` | クイック受付 |
| `/staff/households` | 世帯一覧 |
| `/staff/households/[id]` | 世帯詳細 |
| `/staff/evacuees` | 避難者一覧 |
| `/staff/evacuees/[id]` | 避難者詳細 |
| `/staff/announcements` | お知らせ管理 |
| `/staff/schedules` | 今日の予定管理 |
| `/staff/requests` | 要望・相談管理 |
| `/staff/handover` | 引継ぎノート |
| `/staff/supplies` | 物資管理 |
| `/staff/reports` | 本部報告 |

### 12.2 避難者画面

| パス | 説明 |
|------|------|
| `/` | 避難者ホーム |
| `/reception` | 自己受付 |
| `/reception/complete` | 受付完了 |
| `/my` | 自分の情報 |
| `/announcements` | お知らせ |
| `/schedules` | 今日の予定 |
| `/support` | 支援情報 |
| `/recovery` | 再建ステップ |
| `/requests/new` | 要望・相談登録 |

### 12.3 管理者画面

| パス | 説明 |
|------|------|
| `/admin` | システム管理ダッシュボード |
| `/admin/shelters` | 避難所管理 |
| `/admin/users` | ユーザー管理 |
| `/admin/settings` | システム設定 |

---

## 13. UI/UX 方針

### 13.1 全体デザイン

ブランド名「ゆい」に合わせて、温かく安心感のあるUIにしてください。

デザイン方針:

* やさしい
* 見やすい
* 迷わない
* 大きな文字
* 大きなボタン
* 色に頼りすぎない
* 高齢者にも使いやすい
* 災害時の焦りを軽減する

推奨カラー:

* ベース: 白、生成り
* メイン: やさしい青緑
* アクセント: 太陽を感じるオレンジ
* 警告: 赤ではなく落ち着いた橙
* 重要: 見やすい濃紺

### 13.2 受付画面

受付画面は最速操作を重視してください。

* 1画面で完結
* 入力項目は最小限
* ボタンは大きく
* キーボード操作しやすく
* タブレットで使いやすく
* 登録完了後に受付番号を大きく表示
* 連続受付しやすい導線

### 13.3 避難者画面

避難者画面は安心感を重視してください。

ホーム画面に表示するもの:

* 今日のお知らせ
* 今日の予定
* 食事・給水・入浴情報
* 相談窓口
* 自分の受付番号
* 再建ステップ
* 要望投稿ボタン

### 13.4 言語・多言語方針

* Phase 1 は **日本語UIのみ** とする
* 多言語対応は Phase 3 以降
* ただし自己受付フォームには **ルビ・やさしい日本語** を使うこと（外国人・高齢者配慮）

### 13.5 エラー・ローディング対応

* 全フォームに submit 中のローディング状態（スピナー・ボタン無効化）を実装すること
* API 失敗時は **日本語エラーメッセージ** をトースト表示すること
* Next.js の `error.tsx` / `loading.tsx` を主要ルートに配置すること

---

## 14. Prisma DB設計方針

以下のモデルを作成してください。

必須モデル:

* User
* Shelter
* Household
* Evacuee
* ReceptionRecord
* Announcement
* ShelterSchedule
* SupportInfo
* RecoveryStep
* EvacueeRecoveryProgress
* RequestTicket
* HandoverNote
* SupplyItem
* SupplyTransaction
* Volunteer
* Supporter
* AuditLog

> **注意**: Phase 2・Phase 3 の機能のコードは出力しないこと。ただし Prisma schema には将来の拡張を考慮したモデルを含めてよい。

---

## 15. 主要モデル概要

### User

```prisma
model User {
  id           String   @id @default(uuid())
  name         String
  email        String   @unique
  passwordHash String
  role         Role
  isActive     Boolean  @default(true)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

### Shelter

主な項目:

* id
* name
* address
* status
* capacity
* openedAt
* closedAt
* managerName
* note

### Household

主な項目:

* id
* shelterId
* representativeName
* representativeKana
* phone
* address
* householdSize
* stayLocation
* hasSpecialCare
* hasInfant
* hasElderly
* hasPet
* hasCarStay
* status
* detailStatus
* createdAt
* updatedAt

### Evacuee

主な項目:

* id
* householdId
* shelterId
* receptionNumber
* name
* kana
* gender
* birthDate
* phone
* address
* isRepresentative
* isSpecialCare
* isInfant
* isElderly
* isPregnant
* hasMedicalNeeds
* medicationNote
* allergyNote
* careNote
* status
* detailStatus
* checkedInAt
* checkedOutAt
* qrToken
* note

### ReceptionRecord

主な項目:

* id
* shelterId
* householdId
* evacueeId
* method（QR / SELF / STAFF）
* status
* handledBy
* receivedAt
* note

### Announcement

主な項目:

* id
* shelterId
* title
* body
* category
* priority
* isPublished
* publishedFrom
* publishedUntil
* createdBy

### ShelterSchedule

主な項目:

* id
* shelterId
* title
* description
* category
* startAt
* endAt
* location
* isPublished

### SupportInfo

主な項目:

* id
* shelterId
* title
* body
* category
* isPublished
* sortOrder

### RecoveryStep

主な項目:

* id
* title
* description
* sortOrder
* isActive

### EvacueeRecoveryProgress

主な項目:

* id
* evacueeId
* recoveryStepId
* status
* completedAt
* note

### RequestTicket

主な項目:

* id
* shelterId
* evacueeId
* category
* title
* body
* urgency
* status
* assignedTo
* responseNote

### HandoverNote

主な項目:

* id
* shelterId
* title
* body
* priority
* status
* createdBy
* assignedTo

### SupplyItem

主な項目:

* id
* shelterId
* name
* category
* quantity
* unit
* minimumQuantity
* storageLocation

### SupplyTransaction

主な項目:

* id
* supplyItemId
* type（IN / OUT / DISTRIBUTE / ADJUST）
* quantity
* note
* createdBy

---

## 16. API設計

### 16.1 受付API

* `POST /api/reception/quick` — クイック受付
* `POST /api/reception/self` — 避難者自己受付
* `POST /api/reception/qr/check` — QR情報確認
* `POST /api/reception/qr/check-in` — QR入所処理
* `PATCH /api/reception/check-out/[evacueeId]` — 退所処理

### 16.2 避難者API

* `GET /api/evacuees`
* `GET /api/evacuees/[id]`
* `PATCH /api/evacuees/[id]`
* `GET /api/households`
* `GET /api/households/[id]`
* `PATCH /api/households/[id]`

### 16.3 ダッシュボードAPI

* `GET /api/staff/dashboard`

返却型:

```ts
type StaffDashboardResponse = {
  currentEvacuees: number;
  households: number;
  todayReceptions: number;
  checkedOut: number;
  specialCare: number;
  elderly: number;
  infants: number;
  pregnant: number;
  pets: number;
  carStay: number;
  detailPending: number;
  openRequests: number;
};
```

### 16.4 お知らせAPI

* `GET /api/announcements`
* `POST /api/announcements`
* `GET /api/announcements/[id]`
* `PATCH /api/announcements/[id]`
* `DELETE /api/announcements/[id]`

### 16.5 予定API

* `GET /api/schedules`
* `POST /api/schedules`
* `PATCH /api/schedules/[id]`
* `DELETE /api/schedules/[id]`

### 16.6 要望相談API

* `GET /api/requests`
* `POST /api/requests`
* `PATCH /api/requests/[id]`

### 16.7 引継ぎAPI

* `GET /api/handover`
* `POST /api/handover`
* `PATCH /api/handover/[id]`

### 16.8 物資API

* `GET /api/supplies`
* `POST /api/supplies`
* `PATCH /api/supplies/[id]`
* `POST /api/supplies/[id]/transactions`

---

## 17. Docker 構成

`docker-compose.yml` に以下を含めること。

```yaml
# サービス構成
services:
  app:   # Next.js (Node.js 20 Alpine)
  db:    # MySQL 8.0
```

要件:

* ポート: app=3000、db=3306
* データ永続化のため db に `volume` 設定を必須とする
* `.env.example` を出力すること
* `README.md` に起動手順を記載すること

---

## 18. 実装フェーズ

### Phase 1: MVP（今回実装する範囲）

* 認証
* 避難所管理
* 職員ダッシュボード
* クイック受付
* QR受付
* 自己受付
* 世帯管理
* 避難者一覧
* 避難者詳細
* 退所処理
* お知らせ
* 今日の予定
* 要望・相談
* 引継ぎノート

### Phase 2: 運用強化（今回は実装しない）

* 物資管理
* 支援者管理
* ボランティア管理
* 支援情報
* 再建ステップ
* 詳細登録待ち一覧
* 要確認者一覧

### Phase 3: 本部連携・高度化（今回は実装しない）

* 本部報告
* 複数避難所集計
* CSV出力
* QR事前登録
* バックアップ
* 監査ログ
* 災害対策本部向け画面
* 多言語対応

> **重要**: Phase 2・Phase 3 のコードは出力しないこと。Prisma schema のみ将来拡張を考慮した設計にしてよい。

---

## 19. 出力順序（ターンごとの指示）

AIは以下の順番でファイルを出力してください。一度に全ファイルを出力しようとせず、ターンごとに指定された範囲を完成させてから次へ進んでください。

### ターン 1: 基盤・DB・認証

```text
prisma/schema.prisma
src/lib/prisma.ts
src/lib/auth.ts
src/lib/reception-number.ts
src/lib/qr-token.ts
src/validation/reception.ts
.env.example
docker-compose.yml
```

### ターン 2: アプリ共通レイアウト・避難者ホーム

```text
src/app/layout.tsx
src/app/page.tsx                    （避難者ホーム）
src/components/layout/AppShell.tsx
```

### ターン 3: 職員ダッシュボード・受付

```text
src/app/staff/page.tsx              （職員ダッシュボード）
src/app/staff/reception/page.tsx
src/app/staff/reception/quick/page.tsx
src/app/staff/reception/qr/page.tsx
src/components/staff/StaffSidebar.tsx
src/components/staff/StaffHeader.tsx
src/components/reception/QuickReceptionForm.tsx
src/components/reception/QrReceptionScanner.tsx
src/components/reception/ReceptionCompleteCard.tsx
src/components/dashboard/StatCard.tsx
```

### ターン 4: 受付API

```text
src/app/api/reception/quick/route.ts
src/app/api/reception/self/route.ts
src/app/api/reception/qr/check/route.ts
src/app/api/reception/qr/check-in/route.ts
src/app/api/staff/dashboard/route.ts
```

### ターン 5: 避難者・世帯

```text
src/app/staff/evacuees/page.tsx
src/app/staff/evacuees/[id]/page.tsx
src/app/staff/households/page.tsx
src/components/evacuees/EvacueeTable.tsx
src/app/api/evacuees/route.ts
src/app/api/evacuees/[id]/route.ts
src/app/api/households/route.ts
```

### ターン 6: お知らせ・予定・要望・引継ぎ

```text
src/app/staff/announcements/page.tsx
src/app/staff/schedules/page.tsx
src/app/staff/requests/page.tsx
src/app/staff/handover/page.tsx
src/components/announcements/AnnouncementCard.tsx
src/app/api/announcements/route.ts
src/app/api/schedules/route.ts
src/app/api/requests/route.ts
src/app/api/handover/route.ts
```

### ターン 7: 自己受付・避難者向け画面

```text
src/app/reception/page.tsx
src/app/reception/complete/page.tsx
src/app/announcements/page.tsx
src/app/schedules/page.tsx
src/app/requests/new/page.tsx
src/app/my/page.tsx
```

### ターン 8: 管理者画面・初期データ・README

```text
src/app/admin/page.tsx
src/app/admin/shelters/page.tsx
src/app/admin/users/page.tsx
prisma/seed.ts
README.md
```

---

## 20. 実装ルール

以下を必ず守ってください。

* TypeScript strict
* `any` 禁止
* `JSX.Element` 型注釈禁止
* Server Component と Client Component を適切に分離
* DB更新は Route Handler 経由
* Prisma Client は共通化（`src/lib/prisma.ts`）
* Zod で入力検証
* React Hook Form でフォーム管理
* TanStack Query でサーバー状態管理
* Zustand は UI 状態・一時状態のみ
* Tailwind CSS で統一
* エラー時は日本語メッセージ
* 全フォームに submit 中のローディング状態を実装すること
* API 失敗時は日本語エラーメッセージをトースト表示すること
* Next.js の `error.tsx` / `loading.tsx` を主要ルートに配置すること
* ローカルWi-Fi環境で使いやすいUIにする
* スマホでも受付できるようレスポンシブ対応

---

## 21. 最優先で完成させる画面

### 21.1 避難者ホーム `/`

表示内容:

* アプリ名「ゆい」
* ブランドメッセージ「安心を届け、希望をつなぐ」
* 本日のお知らせ
* 今日の予定
* 受付するボタン
* 支援情報
* 要望・相談ボタン

### 21.2 職員ダッシュボード `/staff`

表示内容:

* 現在避難者数
* 世帯数
* 本日受付数
* 要配慮者数
* 詳細登録待ち数
* 未対応要望数
* 受付へ進むボタン
* 避難者一覧へ進むボタン

### 21.3 クイック受付 `/staff/reception/quick`

表示内容:

* 代表者氏名
* フリガナ
* 世帯人数
* 電話番号
* 要配慮者チェック
* 乳幼児チェック
* 高齢者チェック
* ペットチェック
* 車中泊チェック
* 滞在場所
* メモ
* 登録ボタン（submit 中はローディング表示）
* 登録後に受付番号を大きく表示
* 続けて次の受付へ進める導線

### 21.4 自己受付 `/reception`

表示内容:

* やさしい説明文（ルビ・やさしい日本語）
* 代表者氏名
* 世帯人数
* 電話番号
* 要配慮者有無
* 送信ボタン（submit 中はローディング表示）
* 完了画面で受付番号を大きく表示

---

## 22. 成果物チェックリスト

最終的に以下がすべて揃っていることを確認してください。

- [ ] Prisma schema 完成版
- [ ] 主要 API Route Handler 完成版
- [ ] 主要画面コンポーネント完成版
- [ ] 受付番号生成処理（`src/lib/reception-number.ts`）
- [ ] QRトークン生成処理（`src/lib/qr-token.ts`）
- [ ] Zod バリデーション（`src/validation/reception.ts`）
- [ ] Tailwind CSS UI（全画面レスポンシブ対応）
- [ ] Docker Compose（app + db、volume設定あり）
- [ ] `.env.example`
- [ ] 初期データ seed（`prisma/seed.ts`）
- [ ] README（起動手順・開発手順）
- [ ] `error.tsx` / `loading.tsx`（主要ルート）

---

## 23. 開発時の注意

避難所アプリでは、機能の多さよりも、災害時に迷わず使えることを優先してください。

特に受付は、

* 入力項目を増やしすぎない
* 連続受付しやすくする
* 登録後すぐ次の受付に進める
* 詳細登録は後回しにできる
* 受付番号を大きく表示する

という方針で実装してください。

---

## 24. 最終ゴール

「ゆい」は、避難所の事務を効率化するだけでなく、

* 避難者に安心を届ける
* 支援者と避難者をつなぐ
* 職員の負担を減らす
* 必要な支援を見える化する
* 避難生活の先にある希望を示す

ことを目的としたアプリです。

この思想をUI、画面構成、文言、導線に反映してください。

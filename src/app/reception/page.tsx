// Self reception page for evacuees.
// src/app/reception/page.tsx
import { FormField } from "@/components/FormField";
import { PageContainer } from "@/components/PageContainer";
import { PrimaryLink } from "@/components/PrimaryLink";
import { SectionCard } from "@/components/SectionCard";

export default function ReceptionPage() {
  return (
    <PageContainer lead="保存処理は行わない画面モックです。入力後は受付完了画面へ進みます。" title="自己受付">
      <SectionCard>
        <div className="grid gap-5">
          <FormField label="氏名" name="name" />
          <FormField label="世帯人数" name="householdSize" type="number" />
          <FormField label="電話番号" name="phone" type="tel" />
          <FormField label="要配慮者有無" name="needsSupport" options={["あり", "なし", "確認したい"]} />
          <div className="pt-2">
            <PrimaryLink href="/reception/complete">送信する</PrimaryLink>
          </div>
        </div>
      </SectionCard>
    </PageContainer>
  );
}

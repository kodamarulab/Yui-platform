// Self reception page for evacuees.
// src/app/reception/page.tsx
import { FormField } from "@/components/FormField";
import { PageContainer } from "@/components/PageContainer";
import { PrimaryLink } from "@/components/PrimaryLink";
import { SectionCard } from "@/components/SectionCard";

export default function ReceptionPage() {
  return (
    <PageContainer lead="避難所に到着した方が、自分で受付情報を入力するための画面モックです。" title="自己受付">
      <SectionCard>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="代表者氏名" name="representativeName" />
          <FormField label="世帯人数" name="householdSize" type="number" />
          <FormField label="電話番号" name="phone" type="tel" />
          <FormField label="乳幼児" name="infants" type="number" />
          <FormField label="高齢者" name="elderlyPeople" type="number" />
          <FormField label="ペット" name="pets" options={["あり", "なし"]} />
          <FormField label="要配慮者" name="needsSupport" options={["あり", "なし", "確認したい"]} />
          <div className="pt-2 sm:col-span-2">
            <PrimaryLink href="/reception/complete">送信する</PrimaryLink>
          </div>
        </div>
      </SectionCard>
    </PageContainer>
  );
}

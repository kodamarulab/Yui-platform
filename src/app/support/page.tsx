// Support information page.
// src/app/support/page.tsx
import support from "@/mock/support.json";
import { PageContainer } from "@/components/PageContainer";
import { SectionCard } from "@/components/SectionCard";
import type { SupportInfo } from "@/types/mock";

const supportItems = support as SupportInfo[];

export default function SupportPage() {
  return (
    <PageContainer lead="生活再建や相談につながる支援情報のサンプルです。" title="支援情報">
      <section className="grid gap-4 sm:grid-cols-2">
        {supportItems.map((item) => (
          <SectionCard key={item.id} title={item.title}>
            <p className="text-lg leading-8 text-teal-950/75">{item.description}</p>
            <p className="mt-4 rounded-xl bg-orange-100 px-4 py-3 text-base font-bold text-orange-800">{item.contact}</p>
          </SectionCard>
        ))}
      </section>
    </PageContainer>
  );
}

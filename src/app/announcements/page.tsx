// Announcements page for evacuees.
// src/app/announcements/page.tsx
import announcements from "@/mock/announcements.json";
import { PageContainer } from "@/components/PageContainer";
import { SectionCard } from "@/components/SectionCard";
import type { Announcement } from "@/types/mock";

const announcementItems = announcements as Announcement[];

export default function AnnouncementsPage() {
  return (
    <PageContainer lead="避難所からのお知らせをカード形式で確認できます。" title="お知らせ">
      <section className="grid gap-4 md:grid-cols-3">
        {announcementItems.map((item) => (
          <SectionCard key={item.id} title={item.title}>
            <p className="text-base font-bold text-orange-600">{item.time}</p>
            <p className="mt-3 text-lg leading-8 text-teal-950/75">{item.body}</p>
          </SectionCard>
        ))}
      </section>
    </PageContainer>
  );
}

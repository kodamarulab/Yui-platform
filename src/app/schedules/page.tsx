// Daily schedule page.
// src/app/schedules/page.tsx
import schedules from "@/mock/schedules.json";
import { PageContainer } from "@/components/PageContainer";
import { SectionCard } from "@/components/SectionCard";
import type { Schedule } from "@/types/mock";

const scheduleItems = schedules as Schedule[];

export default function SchedulesPage() {
  return (
    <PageContainer lead="今日の予定を時間順に確認できます。" title="今日の予定">
      <SectionCard>
        <ol className="space-y-5">
          {scheduleItems.map((item) => (
            <li className="flex gap-4" key={`${item.time}-${item.title}`}>
              <time className="flex h-16 w-20 shrink-0 items-center justify-center rounded-2xl bg-teal-600 text-lg font-bold text-white">
                {item.time}
              </time>
              <div className="border-l-4 border-orange-300 pl-4">
                <h2 className="text-2xl font-bold text-teal-950">{item.title}</h2>
                <p className="mt-1 text-lg leading-8 text-teal-950/75">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </SectionCard>
    </PageContainer>
  );
}

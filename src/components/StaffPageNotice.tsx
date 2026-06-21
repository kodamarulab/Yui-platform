// Staff-only visual marker for staff pages.
// src/components/StaffPageNotice.tsx
export function StaffPageNotice() {
  return (
    <div className="mb-6 rounded-2xl border border-sky-300 bg-sky-50 px-5 py-4 shadow-sm">
      <p className="text-sm font-bold text-sky-700">職員専用画面</p>
      <p className="mt-1 text-base font-bold leading-7 text-sky-950">
        避難者向け画面と区別するため、職員画面は青系の管理用カラーで表示しています。
      </p>
    </div>
  );
}

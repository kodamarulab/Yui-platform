// Shared page width and spacing wrapper.
// src/components/PageContainer.tsx
type PageContainerProps = {
  children: React.ReactNode;
  title?: string;
  lead?: string;
};

export function PageContainer({ children, lead, title }: PageContainerProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
      <div className="w-auto rounded-2xl bg-orange-100 mb-4 px-5 py-4 text-center text-base font-bold text-orange-800">
        この画面は開発中の模擬画面です。データベースは実装されておらず、画面表示や画面遷移を確認するものです。
      </div>
      {title ? (
        <div className="mb-6">

          <h1 className="text-3xl font-bold tracking-normal text-teal-950 sm:text-4xl">{title}</h1>
          {lead ? <p className="mt-3 max-w-3xl text-lg leading-8 text-teal-950/75">{lead}</p> : null}

        </div>
      ) : null}
      {children}
    </div>
  );
}

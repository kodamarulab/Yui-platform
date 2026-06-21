// Shared large primary button.
// src/components/PrimaryButton.tsx
type PrimaryButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
};

export function PrimaryButton({ children, onClick, type = "button" }: PrimaryButtonProps) {
  return (
    <button
      className="inline-flex min-h-12 items-center justify-center rounded-xl bg-teal-600 px-6 py-3 text-base font-bold text-white shadow-sm transition hover:bg-teal-700"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

// src/components/SkipLink.tsx
export default function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-[var(--brand)] focus:px-3 focus:py-2 focus:text-black"
    >
      Przejdź do głównej treści
    </a>
  );
}

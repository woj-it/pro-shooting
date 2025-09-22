import { memo, useCallback, useId, useMemo, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export type FAQ = { q: string; a: string };

type FAQItemProps = {
  idx: number;
  item: FAQ;
  isOpen: boolean;
  onToggle: (i: number) => void;
  btnRef: (el: HTMLButtonElement | null, i: number) => void;
};

const FAQItem = memo(function FAQItem({
  idx,
  item,
  isOpen,
  onToggle,
  btnRef,
}: FAQItemProps) {
  const baseId = useId();
  const headingId = `${baseId}-heading-${idx}`;
  const panelId = `${baseId}-panel-${idx}`;

  const handleClick = useCallback(() => onToggle(idx), [idx, onToggle]);

  return (
    <div className="border-b border-white/10 last:border-0">
      {/* Hederska semantyka + przycisk sterujący sekcją */}
      <h3 id={headingId} className="sr-only">
        {item.q}
      </h3>

      <button
        ref={(el) => btnRef(el, idx)}
        type="button"
        className="flex w-full items-center justify-between p-5 text-left transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/60"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-labelledby={headingId}
        onClick={handleClick}
      >
        <span className="text-base font-medium md:text-lg">{item.q}</span>
        <ChevronDown
          className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        hidden={!isOpen}
        className="px-5 pb-5 text-white/70"
      >
        {item.a}
      </div>
    </div>
  );
});

function FAQSectionBase({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);

  // Refs do przycisków dla nawigacji klawiaturą
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const setBtnRef = useCallback((el: HTMLButtonElement | null, i: number) => {
    btnRefs.current[i] = el;
  }, []);

  const lastIndex = useMemo(() => Math.max(0, items.length - 1), [items.length]);

  const toggle = useCallback(
    (i: number) => setOpen((prev) => (prev === i ? null : i)),
    []
  );

  // ArrowUp/ArrowDown/Home/End/Escape – obsługa w kontenerze (delegacja)
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const triggers = btnRefs.current.filter(Boolean) as HTMLButtonElement[];
      if (triggers.length === 0) return;

      const activeEl = document.activeElement as HTMLElement | null;
      const currentIndex = triggers.findIndex((el) => el === activeEl);

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const next = currentIndex < 0 ? 0 : Math.min(currentIndex + 1, lastIndex);
          triggers[next]?.focus();
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const prev = currentIndex < 0 ? 0 : Math.max(currentIndex - 1, 0);
          triggers[prev]?.focus();
          break;
        }
        case "Home": {
          e.preventDefault();
          triggers[0]?.focus();
          break;
        }
        case "End": {
          e.preventDefault();
          triggers[lastIndex]?.focus();
          break;
        }
        case "Escape": {
          if (open !== null) {
            e.preventDefault();
            setOpen(null);
          }
          break;
        }
      }
    },
    [lastIndex, open]
  );

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="mx-auto max-w-5xl px-4 py-16 md:py-24 lg:py-28"
    >
      <h2 id="faq-title" className="mb-6 text-2xl font-semibold md:text-3xl">
        FAQ i bezpieczeństwo
      </h2>

      <div
        className="rounded-2xl bg-white/5 ring-1 ring-white/10"
        role="list"
        onKeyDown={onKeyDown}
      >
        {items.map((f, i) => (
          <FAQItem
            key={f.q}
            idx={i}
            item={f}
            isOpen={open === i}
            onToggle={toggle}
            btnRef={setBtnRef}
          />
        ))}
      </div>
    </section>
  );
}

export default memo(FAQSectionBase);

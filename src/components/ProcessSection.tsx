// src/components/ProcessSection.tsx

type Step = { step: string; title: string; text: string };

const steps: Step[] = [
  { step: "1", title: "Wybierz usługę", text: "Trening 1:1 lub grupa — wybierz pakiet." },
  { step: "2", title: "Zarezerwuj", text: "Wpisz preferowaną datę i kontakt." },
  { step: "3", title: "Akceptacja", text: "Instruktor potwierdzi e-mailem." },
  { step: "4", title: "Trening", text: "Spotykamy się na wybranej strzelnicy." },
];

export default function ProcessSection() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="mx-auto max-w-7xl px-4 py-16 md:py-24 lg:py-28"
    >
      <h2 id="process-title" className="mb-8 text-2xl font-semibold md:text-3xl">
        Jak to działa
      </h2>

      {/* Semantyczna lista kroków (OL) z elementami artykułów */}
      <ol className="grid gap-6 md:grid-cols-4" aria-describedby="process-desc">
        <p id="process-desc" className="sr-only">
          Cztery kroki procesu rezerwacji i treningu.
        </p>

        {steps.map((s, idx) => (
          <li key={s.step} className="list-none" data-reveal>
            <article
              className="h-full rounded-3xl bg-white/5 p-6 ring-1 ring-white/10"
              aria-labelledby={`step-${idx}-title`}
            >
              <div
                className="mb-2 inline-flex items-center rounded-full bg-[var(--brand)]/10 px-3 py-1 text-xs font-semibold text-[var(--brand)] ring-1 ring-[var(--brand)]/25"
                aria-label={`Krok ${s.step}`}
              >
                Krok {s.step}
              </div>

              <h3 id={`step-${idx}-title`} className="text-lg font-medium">
                {s.title}
              </h3>

              <p className="mt-2 text-white/70 leading-relaxed">{s.text}</p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

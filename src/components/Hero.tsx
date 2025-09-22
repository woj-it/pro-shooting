import { CalendarDays, ShieldCheck, Users } from "lucide-react";
import BrandBanner from "./BrandBanner";

export default function Hero({ logoSrc }: { logoSrc: string }) {
  return (
    <section id="top" className="relative overflow-hidden" aria-labelledby="hero-title">
      {/* tło / dekor */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#2E3B17] via-[#10140A] to-[#10140A]" />
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[var(--brand)]/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-emerald-900/20 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:radial-gradient(black_1px,transparent_1px)] [background-size:4px_4px]" />

<div className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-16 md:grid-cols-2 md:py-24 lg:py-28">
  <div className="space-y-2" data-reveal>
    <BrandBanner
      src={logoSrc}
      alt="Logo PRO-SHOOTING"
      priority
      maxWidthClass="max-w-[1000px]"
      aspectClass="aspect-[16/7] md:aspect-[16/6]"
    />

          <h1
            id="hero-title"
            className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl text-shadow-soft"
          >
            Szkolenia strzeleckie
            <span className="text-[var(--brand)]">. Bezpiecznie. Konkretnie.</span>
          </h1>

          <p className="max-w-[52ch] text-lg text-white/80 md:text-xl">
            Mobilny instruktor z dojazdem na wybrane strzelnice w Lublinie i okolicach. Od pierwszych
            strzałów po treningi zaawansowane — rezerwacja online z akceptacją.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#booking"
              className="rounded-full bg-[var(--brand)] px-5 py-3 font-medium text-black shadow transition hover:brightness-110 hover:shadow-[0_8px_30px_rgba(209,161,36,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] active:translate-y-px"
            >
              Zarezerwuj termin
            </a>
            <a
              href="#offer"
              className="rounded-full px-5 py-3 ring-1 ring-white/20 transition hover:ring-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/60"
            >
              Zobacz ofertę
            </a>
          </div>

          <ul className="flex flex-wrap gap-6 pt-4 text-sm text-white/70" aria-label="Atuty">
            <li className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[var(--brand)]" aria-hidden="true" />
              Certyfikowany instruktor
            </li>
            <li className="inline-flex items-center gap-2">
              <Users className="h-4 w-4 text-[var(--brand)]" aria-hidden="true" />
              1:1 oraz mini-grupy
            </li>
            <li className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[var(--brand)]" aria-hidden="true" />
              Rezerwacja z akceptacją
            </li>
          </ul>
        </div>

  <aside
    className="flex h-full flex-col rounded-3xl bg-white/5 p-9 ring-1 ring-white/10 backdrop-blur md:p-10"
    aria-labelledby="nearest-dates"
  >
    <h2 id="nearest-dates" className="mb-7 text-base uppercase tracking-wider text-white/60">
      Najbliższe terminy
    </h2>
    <ul className="grid gap-4" role="list">
      {["Piątek 18:00","Piątek 20:00","Sobota 10:00","Niedziela 12:30","Niedziela 16:30"].map((t) => (
        <li key={t}>
          <button
            type="button"
            className="group flex w-full items-center justify-between rounded-2xl bg-white/5 px-5 py-4 ring-1 ring-white/10 transition hover:bg-white/7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/60"
            aria-label={`Zapisz się na: ${t}`}
          >
            <span className="text-lg">{t}</span>
            <span className="font-medium text-[var(--brand)] underline-offset-2 group-hover:underline">
              Zapisz się
            </span>
          </button>
        </li>
      ))}
    </ul>
    <p className="mt-6 text-sm text-white/60">
      Terminy poglądowe. Po wysłaniu zgłoszenia otrzymasz potwierdzenie mailowe.
    </p>
  </aside>
</div>
    </section>
  );
}

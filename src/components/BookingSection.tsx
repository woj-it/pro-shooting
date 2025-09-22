import { useId, useMemo, useState, useCallback } from "react";
import { CalendarDays, Clock, Send, User, Mail, MapPin } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  training: string;
  location: string;
  date: string;
  time: string;
};

export default function BookingSection() {
  // A11y: unikalne identyfikatory dla etykiet
  const nameId = useId();
  const emailId = useId();
  const trainingId = useId();
  const locationId = useId();
  const dateId = useId();
  const timeId = useId();
  const noteId = useId();

  // Minimalna data = dziś (YYYY-MM-DD)
  const today = useMemo(() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }, []);

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    training: "",
    location: "",
    date: "",
    time: "",
  });

  // Lekka walidacja e-maila (bez zewnętrznych zależności)
  const emailOk = useMemo(
    () => form.email === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()),
    [form.email]
  );

  // Wszystkie wymagane pola + poprawny e-mail
  const isValid =
    !!form.name &&
    !!form.email &&
    emailOk &&
    !!form.training &&
    !!form.location &&
    !!form.date &&
    !!form.time;

  const onChange = useCallback(
    (key: keyof FormState) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
        setForm((prev) => ({ ...prev, [key]: e.target.value })),
    []
  );

  // Treść mailto – bezpiecznie kodowana
  const mailtoHref = useMemo(() => {
    const subject = encodeURIComponent("Rezerwacja terminu — PRO-SHOOTING");
    const body = encodeURIComponent(
      [
        "Dzień dobry,",
        "",
        "Chciałbym/Chciałabym zarezerwować termin:",
        `• Imię i nazwisko: ${form.name || "-"}`,
        `• E-mail: ${form.email || "-"}`,
        `• Rodzaj treningu: ${form.training || "-"}`,
        `• Lokalizacja: ${form.location || "-"}`,
        `• Data: ${form.date || "-"}`,
        `• Godzina: ${form.time || "-"}`,
        "",
        "Proszę o potwierdzenie i dalsze szczegóły.",
        "",
        "Pozdrawiam,",
      ].join("\n")
    );
    return `mailto:kontakt@pro-shooting.pl?subject=${subject}&body=${body}`;
  }, [form]);

  // Pozwala wysłać formularz klawiszem Enter (submit) – otwiera klienta poczty
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isValid) return;
      // Intencjonalnie: na żądanie użytkownika przekierowujemy do mailto
      window.location.href = mailtoHref;
    },
    [isValid, mailtoHref]
  );

  return (
    <section
      id="booking"
      aria-labelledby="booking-title"
      className="mx-auto max-w-7xl px-4 py-16 md:py-24 lg:py-28"
    >
      <div className="grid items-start gap-10 md:grid-cols-2">
        {/* Kolumna lewa: opis + CTA (ten sam stan i działanie co przycisk w formularzu) */}
        <div>
          <h2 id="booking-title" className="mb-3 text-2xl font-semibold md:text-3xl">
            Rezerwacje online
          </h2>
          <p className="mb-6 max-w-prose text-white/80">
            Uzupełnij formularz, wybierz termin i wyślij prośbę o rezerwację.
            Odpowiemy e-mailem z potwierdzeniem i szczegółami spotkania.
          </p>

          <a
            href={isValid ? mailtoHref : undefined}
            aria-disabled={!isValid}
            title={
              isValid
                ? "Wyślij prośbę o rezerwację"
                : "Uzupełnij wymagane pola, aby wysłać prośbę"
            }
            onClick={(e) => {
              if (!isValid) e.preventDefault();
            }}
            className={[
              "inline-flex items-center gap-2 rounded-full px-5 py-3 font-medium shadow transition",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] active:scale-[0.98]",
              isValid
                ? "bg-[var(--brand)] text-black hover:brightness-110"
                : "cursor-not-allowed bg-white/10 text-white/70 ring-1 ring-white/10",
            ].join(" ")}
          >
            <Send className="h-5 w-5" aria-hidden="true" />
            <span>Wyślij prośbę o rezerwację</span>
          </a>

          <p id={noteId} className="mt-3 text-sm text-white/60">
            Możesz też zadzwonić lub napisać — dane kontaktowe są na dole strony.
          </p>
        </div>

        {/* Kolumna prawa: formularz (lekki, natywny, dostępny) */}
        <form
          role="group"
          aria-labelledby="booking-form-title"
          aria-describedby={noteId}
          className="space-y-4 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="mb-2 text-white/90" id="booking-form-title">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-[var(--brand)]" aria-hidden="true" />
              <span className="font-medium">Formularz rezerwacji</span>
            </div>
          </div>

          {/* Imię i nazwisko */}
          <div className="flex flex-col">
            <label htmlFor={nameId} className="mb-1 text-sm text-white/80">
              Imię i nazwisko <span className="text-white/50">(wymagane)</span>
            </label>
            <div className="relative">
              <User
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
                aria-hidden="true"
              />
              <input
                id={nameId}
                name="name"
                type="text"
                inputMode="text"
                enterKeyHint="next"
                autoComplete="name"
                placeholder="Jan Kowalski"
                value={form.name}
                onChange={onChange("name")}
                className="w-full rounded-xl bg-black/30 pl-9 pr-4 py-3 ring-1 ring-white/10 placeholder:text-white/70 outline-none focus:ring-[var(--brand)]/60"
                required
              />
            </div>
          </div>

          {/* E-mail */}
          <div className="flex flex-col">
            <label htmlFor={emailId} className="mb-1 text-sm text-white/80">
              E-mail <span className="text-white/50">(wymagane)</span>
            </label>
            <div className="relative">
              <Mail
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
                aria-hidden="true"
              />
              <input
                id={emailId}
                name="email"
                type="email"
                inputMode="email"
                enterKeyHint="next"
                autoComplete="email"
                placeholder="jan@adres.pl"
                value={form.email}
                onChange={onChange("email")}
                aria-invalid={form.email !== "" && !emailOk}
                className={[
                  "w-full rounded-xl bg-black/30 pl-9 pr-4 py-3 ring-1 placeholder:text-white/70 outline-none",
                  emailOk
                    ? "ring-white/10 focus:ring-[var(--brand)]/60"
                    : "ring-red-500/50 focus:ring-red-500/60",
                ].join(" ")}
                required
              />
            </div>
            {!emailOk && (
              <p className="mt-1 text-sm text-red-300">Podaj poprawny adres e-mail.</p>
            )}
          </div>

          {/* Rodzaj treningu */}
          <div className="flex flex-col">
            <label htmlFor={trainingId} className="mb-1 text-sm text-white/80">
              Rodzaj treningu <span className="text-white/50">(wymagane)</span>
            </label>
            <select
              id={trainingId}
              name="training"
              value={form.training}
              onChange={onChange("training")}
              className="w-full rounded-xl bg-black/30 px-4 py-3 ring-1 ring-white/10 outline-none focus:ring-[var(--brand)]/60"
              required
            >
              <option value="">— Wybierz —</option>
              <option>Trening 1:1</option>
              <option>Mini-grupa (2–4 os.)</option>
              <option>Pakiet / przygotowanie</option>
            </select>
          </div>

          {/* Lokalizacja */}
          <div className="flex flex-col">
            <label htmlFor={locationId} className="mb-1 text-sm text-white/80">
              Lokalizacja strzelnicy <span className="text-white/50">(wymagane)</span>
            </label>
            <div className="relative">
              <MapPin
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
                aria-hidden="true"
              />
              <input
                id={locationId}
                name="location"
                type="text"
                inputMode="text"
                enterKeyHint="next"
                autoComplete="street-address"
                placeholder="np. Strzelnica Lublin, ul. …"
                value={form.location}
                onChange={onChange("location")}
                className="w-full rounded-xl bg-black/30 pl-9 pr-4 py-3 ring-1 ring-white/10 placeholder:text-white/70 outline-none focus:ring-[var(--brand)]/60"
                required
              />
            </div>
          </div>

          {/* Termin: data + godzina */}
          <fieldset className="grid gap-4 md:grid-cols-2">
            <legend className="sr-only">Termin</legend>

            <div className="flex flex-col">
              <label htmlFor={dateId} className="mb-1 text-sm text-white/80">
                Data <span className="text-white/50">(wymagane)</span>
              </label>
              <input
                id={dateId}
                name="date"
                type="date"
                min={today}
                value={form.date}
                onChange={onChange("date")}
                className="w-full min-w-[140px] rounded-xl bg-black/30 px-4 py-3 ring-1 ring-white/10 outline-none focus:ring-[var(--brand)]/60"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor={timeId} className="mb-1 text-sm text-white/80">
                Godzina <span className="text-white/50">(wymagane)</span>
              </label>
              <div className="relative">
                <Clock
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
                  aria-hidden="true"
                />
                <input
                  id={timeId}
                  name="time"
                  type="time"
                  step={900} /* co 15 min */
                  value={form.time}
                  onChange={onChange("time")}
                  className="w-full min-w-[140px] rounded-xl bg-black/30 pl-9 pr-4 py-3 ring-1 ring-white/10 outline-none focus:ring-[var(--brand)]/60"
                  required
                />
              </div>
            </div>
          </fieldset>

          {/* Podsumowanie wyboru */}
          <div className="mt-6 rounded-2xl bg-black/30 p-4 ring-1 ring-white/10" aria-live="polite">
            <div className="text-sm text-white/60">Podsumowanie:</div>
            <ul className="mt-2 space-y-1 text-white/80">
              <li>
                <span className="text-white/60">Data:</span>{" "}
                {form.date ? new Date(form.date).toLocaleDateString("pl-PL") : "—"}
              </li>
              <li>
                <span className="text-white/60">Godzina:</span> {form.time || "—"}
              </li>
              <li>
                <span className="text-white/60">Rodzaj treningu:</span> {form.training || "—"}
              </li>
              <li>
                <span className="text-white/60">Lokalizacja:</span> {form.location || "—"}
              </li>
              <li>
                <span className="text-white/60">Osoba kontaktowa:</span>{" "}
                {form.name || "—"} {form.email ? `(${form.email})` : ""}
              </li>
            </ul>
          </div>

          {/* CTA w formularzu (submit) */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!isValid}
              title={
                isValid
                  ? "Wyślij prośbę o rezerwację"
                  : "Uzupełnij wymagane pola, aby wysłać prośbę"
              }
              className={[
                "w-full inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-medium transition",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]",
                isValid
                  ? "bg-[var(--brand)] text-black hover:brightness-110"
                  : "cursor-not-allowed bg-white/10 text-white/70 ring-1 ring-white/10",
              ].join(" ")}
            >
              <Send className="h-5 w-5" aria-hidden="true" />
              Wyślij prośbę o rezerwację
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

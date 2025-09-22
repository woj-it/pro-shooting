import { useCallback, useMemo, useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  tel: string;
  msg: string;
  website: string; // honeypot (ma zostać puste)
};

const MAX_LEN = {
  name: 80,
  email: 120,
  tel: 30,
  msg: 1000,
};

function sanitize(v: string) {
  // Minimalna, bezpieczna sanityzacja wejścia po stronie klienta
  return v.replace(/\s+/g, " ").replace(/[<>]/g, "").trim();
}

function isEmail(v: string) {
  // Prosta walidacja email (wystarczająca na froncie)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function isPhone(v: string) {
  // Akceptuj cyfry, spacje, +, -, nawiasy (formaty PL/EU)
  return /^[0-9+\-\s()]{5,}$/.test(v);
}

export default function ContactSection() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    tel: "",
    msg: "",
    website: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");

  const canSubmit = useMemo(() => {
    return (
      form.name.trim().length > 1 &&
      isEmail(form.email) &&
      isPhone(form.tel) &&
      form.msg.trim().length > 3 &&
      form.website === "" // honeypot
    );
  }, [form]);

  const onChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val = sanitize(e.target.value.slice(0, MAX_LEN[field] ?? 1000));
      setForm((s) => ({ ...s, [field]: val }));
      if (errors[field]) {
        setErrors((er) => {
          const { [field]: _drop, ...rest } = er;
          return rest;
        });
      }
    };

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const nextErrors: typeof errors = {};
      if (form.website) nextErrors.website = "Pole powinno pozostać puste.";
      if (form.name.length < 2) nextErrors.name = "Podaj imię (min. 2 znaki).";
      if (!isEmail(form.email)) nextErrors.email = "Podaj poprawny adres e-mail.";
      if (!isPhone(form.tel)) nextErrors.tel = "Podaj poprawny numer telefonu.";
      if (form.msg.length < 4) nextErrors.msg = "Napisz krótko, w czym mogę pomóc.";

      setErrors(nextErrors);
      if (Object.keys(nextErrors).length > 0) {
        setStatus("err");
        return;
      }

      // Tu podepnij realne wysyłanie (fetch do backendu/Formspree/Netlify itp.)
      // Na potrzeby wersji demo tylko czyścimy formularz i pokazujemy komunikat.
      setStatus("ok");
      setForm({ name: "", email: "", tel: "", msg: "", website: "" });
    },
    [form, errors]
  );

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto max-w-7xl px-4 py-16 md:py-24 lg:py-28"
    >
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 id="contact-title" className="mb-3 text-2xl font-semibold md:text-3xl">
            Kontakt
          </h2>
          <p className="mb-6 text-white/80">
            Lublin i okolice. Napisz lub zadzwoń — dobierzemy termin i strzelnicę do Twoich
            możliwości.
          </p>
          <ul className="space-y-3 text-white/80">
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-[var(--brand)]" aria-hidden="true" /> +48 123 456 789
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-[var(--brand)]" aria-hidden="true" /> kontakt@pro-shooting.pl
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-[var(--brand)]" aria-hidden="true" /> Lublin i okolice
            </li>
          </ul>
        </div>

        <form
          className="space-y-4 rounded-3xl bg-white/5 p-6 ring-1 ring-white/10"
          aria-describedby="privacy-note"
          noValidate
          onSubmit={onSubmit}
          acceptCharset="UTF-8"
        >
          {/* Honeypot — ukryte pole dla botów */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Twoja strona</label>
            <input
              id="website"
              name="website"
              value={form.website}
              onChange={onChange("website")}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div>
            <label htmlFor="name" className="mb-1 block text-sm text-white/70">
              Imię
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={onChange("name")}
              autoComplete="given-name"
              className="w-full rounded-xl bg-black/30 px-4 py-3 ring-1 ring-white/10 outline-none focus:ring-[var(--brand)]/50"
              placeholder="Jan"
              inputMode="text"
              required
              aria-invalid={!!errors.name || undefined}
              aria-describedby={errors.name ? "err-name" : undefined}
              maxLength={MAX_LEN.name}
            />
            {errors.name && (
              <p id="err-name" className="mt-1 text-sm text-red-300">
                {errors.name}
              </p>
            )}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm text-white/70">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange("email")}
                autoComplete="email"
                className="w-full rounded-xl bg-black/30 px-4 py-3 ring-1 ring-white/10 outline-none focus:ring-[var(--brand)]/50"
                placeholder="jan@adres.pl"
                inputMode="email"
                required
                aria-invalid={!!errors.email || undefined}
                aria-describedby={errors.email ? "err-email" : undefined}
                maxLength={MAX_LEN.email}
              />
              {errors.email && (
                <p id="err-email" className="mt-1 text-sm text-red-300">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="tel" className="mb-1 block text-sm text-white/70">
                Telefon
              </label>
              <input
                id="tel"
                name="tel"
                type="tel"
                value={form.tel}
                onChange={onChange("tel")}
                autoComplete="tel"
                className="w-full rounded-xl bg-black/30 px-4 py-3 ring-1 ring-white/10 outline-none focus:ring-[var(--brand)]/50"
                placeholder="+48 ..."
                inputMode="tel"
                required
                aria-invalid={!!errors.tel || undefined}
                aria-describedby={errors.tel ? "err-tel" : undefined}
                maxLength={MAX_LEN.tel}
              />
              {errors.tel && (
                <p id="err-tel" className="mt-1 text-sm text-red-300">
                  {errors.tel}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="msg" className="mb-1 block text-sm text-white/70">
              Wiadomość
            </label>
            <textarea
              id="msg"
              name="msg"
              rows={4}
              value={form.msg}
              onChange={onChange("msg")}
              className="w-full rounded-xl bg-black/30 px-4 py-3 ring-1 ring-white/10 outline-none focus:ring-[var(--brand)]/50"
              placeholder="Napisz krótko, o jaki trening pytasz..."
              required
              aria-invalid={!!errors.msg || undefined}
              aria-describedby={errors.msg ? "err-msg" : undefined}
              maxLength={MAX_LEN.msg}
            />
            {errors.msg && (
              <p id="err-msg" className="mt-1 text-sm text-red-300">
                {errors.msg}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="rounded-xl bg-[var(--brand)] px-5 py-3 font-medium text-black transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] active:scale-[0.98]"
          >
            Wyślij zapytanie
          </button>

          <p id="privacy-note" className="text-xs text-white/50">
            Wysyłając formularz akceptujesz przetwarzanie danych w celu kontaktu (RODO).
          </p>

          {/* ARIA live — komunikaty po submit */}
          <div aria-live="polite" className="min-h-5">
            {status === "ok" && (
              <p className="mt-2 text-sm text-emerald-300">
                Dziękujemy! Twoja wiadomość została zapisana — wkrótce się odezwiemy.
              </p>
            )}
            {status === "err" && Object.keys(errors).length > 0 && (
              <p className="mt-2 text-sm text-amber-300">
                Sprawdź zaznaczone pola i spróbuj ponownie.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

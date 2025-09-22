type Package = {
  name: string;
  price: string; // np. "od 200 zł"
  desc: string;
  features: string[];
  popular?: boolean;
};

export default function OfferSection({ items }: { items: Package[] }) {
  return (
    <section
      id="offer"
      aria-labelledby="offer-title"
      className="mx-auto max-w-7xl px-4 py-16 md:py-24 lg:py-28"
    >
      <h2 id="offer-title" className="mb-2 text-2xl font-semibold md:text-3xl">
        Oferta i cennik
      </h2>
      <p className="mb-8 max-w-2xl text-white/70">
        Pakiety startowe — idealne na pierwszy trening i dalszy progres. Koszty obiektu/amunicji
        rozliczane zgodnie z zasadami strzelnicy.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((p) => (
          <article
            key={p.name}
            className={`rounded-3xl p-6 ring-1 backdrop-blur ${
              p.popular ? "bg-[var(--brand)]/10 ring-[var(--brand)]/30" : "bg-white/5 ring-white/10"
            }`}
            itemScope
            itemType="https://schema.org/Product"
            aria-labelledby={`pkg-${slugify(p.name)}-title`}
            data-reveal
          >
            <header className="mb-3 flex items-center justify-between">
              <h3 id={`pkg-${slugify(p.name)}-title`} className="text-xl font-semibold" itemProp="name">
                {p.name}
              </h3>

              {p.popular && (
                <span
                  className="rounded-full bg-[var(--brand)] px-2 py-1 text-xs font-semibold text-black"
                  aria-label="Najczęściej wybierany pakiet"
                >
                  Najczęściej wybierany
                </span>
              )}
            </header>

            <p className="text-white/80" itemProp="description">
              {p.desc}
            </p>

            <ul className="mt-4 list-inside list-disc text-sm text-white/75">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>

            <footer className="mt-6 flex items-center justify-between">
              <span
                className="text-lg font-semibold text-[var(--brand)]"
                aria-label={`Cena: ${p.price}`}
                itemProp="offers"
                itemScope
                itemType="https://schema.org/Offer"
              >
                <meta itemProp="priceCurrency" content="PLN" />
                {/* Wartość price zostawiamy w tekście — tu nie wyciągamy liczby ze stringa */}
                <span itemProp="price">{p.price}</span>
              </span>

              <a
                href="#booking"
                className="rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-medium text-black transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] active:scale-[0.99]"
              >
                Rezerwuj
              </a>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

/** Prosty helper do stabilnych id (bez zależności). */
function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

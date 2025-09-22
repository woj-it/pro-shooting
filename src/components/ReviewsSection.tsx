// src/components/ReviewsSection.tsx
import { Star } from "lucide-react";

const reviews = [
  {
    text: "Świetne szkolenie! Instruktor cierpliwy i konkretny.",
    author: "Użytkownik Google",
  },
  {
    text: "Bezpiecznie i dużo praktyki — polecam!",
    author: "Użytkownik Google",
  },
  {
    text: "Profeska od pierwszego kontaktu do treningu.",
    author: "Użytkownik Google",
  },
];

export default function ReviewsSection() {
  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="mx-auto max-w-7xl px-4 py-16 md:py-24 lg:py-28"
    >
      <h2 id="reviews-title" className="mb-6 text-2xl font-semibold md:text-3xl">
        Opinie
      </h2>

      <ul
        className="grid gap-6 md:grid-cols-3"
        aria-label="Lista opinii klientów"
      >
        {reviews.map((r, i) => (
          <li key={i} className="list-none">
            <figure
              className="h-full rounded-3xl bg-white/5 p-6 ring-1 ring-white/10"
              aria-labelledby={`review-${i}-author`}
            >
              <figcaption className="mb-2 flex items-center gap-1">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className="h-4 w-4 fill-[var(--brand)] text-[var(--brand)]"
                    aria-hidden
                  />
                ))}
              </figcaption>
              <blockquote className="text-white/80">
                <p>“{r.text}”</p>
              </blockquote>
              <div
                id={`review-${i}-author`}
                className="mt-3 text-sm text-white/60"
              >
                — {r.author}
              </div>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}

import { memo, useCallback, useId, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarousel } from "../hooks/useCarousel";

type Props = { images: string[] };

function PortfolioCarouselBase({ images }: Props) {
  // sanityzacja listy źródeł
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const count = safeImages.length;

  const { index, prev, next, setIndex } = useCarousel(count, { autoplayMs: 5000 });
  const carouselId = useId();
  const labelId = `${carouselId}-label`;
  const descId = `${carouselId}-desc`;

  if (count === 0) return null;

  // Klawiatura: ←/→, Home/End, Enter/Space na kropkach
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          prev();
          break;
        case "ArrowRight":
          e.preventDefault();
          next();
          break;
        case "Home":
          e.preventDefault();
          setIndex(0);
          break;
        case "End":
          e.preventDefault();
          setIndex(count - 1);
          break;
      }
    },
    [prev, next, setIndex, count]
  );

  return (
    <section
      id="portfolio"
      aria-labelledby={labelId}
      className="mx-auto max-w-7xl px-4 py-16 md:py-24 lg:py-28"
    >
      <div className="mb-6 flex items-end justify-between">
        <h2 id={labelId} className="text-2xl font-semibold md:text-3xl">
          Portfolio
        </h2>
        <p id={descId} className="text-sm text-white/60">
          Użyj strzałek klawiatury lub kropek, aby zmieniać zdjęcia.
        </p>
      </div>

      <div
        className="relative overflow-hidden rounded-3xl bg-black/20 ring-1 ring-white/10"
        role="region"
        aria-roledescription="karuzela"
        aria-labelledby={labelId}
        aria-describedby={descId}
        onKeyDown={onKeyDown}
      >
        <figure className="m-0">
          <img
            key={index}
            src={safeImages[index]}
            alt={`Zdjęcie ${index + 1} z ${count}`}
            className="h-[52vw] w-full object-cover transition-opacity duration-500 md:h-[480px]"
            loading="lazy"
            decoding="async"
            sizes="(min-width: 768px) 768px, 100vw"
          />
          {/* Możesz dodać opis slajdu w <figcaption>, jeśli zdjęcia będą miały podpisy */}
        </figure>

        {/* Przyciski prev/next */}
        <button
          type="button"
          onClick={prev}
          aria-label="Poprzednie zdjęcie"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 ring-1 ring-white/20 backdrop-blur transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/70"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Następne zdjęcie"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 ring-1 ring-white/20 backdrop-blur transition hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/70"
        >
          <ChevronRight className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Kropeczki / wskaźnik slajdów */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
          {safeImages.map((_, i) => {
            const current = i === index;
            return (
              <button
                key={i}
                type="button"
                aria-label={`Przejdź do zdjęcia ${i + 1}`}
                aria-current={current ? "true" : undefined}
                onClick={() => setIndex(i)}
                className={`h-2.5 w-2.5 rounded-full ring-1 ring-white/30 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]/70 ${
                  current ? "bg-[var(--brand)]" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(PortfolioCarouselBase);

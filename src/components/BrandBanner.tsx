// src/components/BrandBanner.tsx
import type { ImgHTMLAttributes } from "react";

/**
 * Dwuwarstwowy baner pod obraz JPG z dużymi marginesami:
 *  - TŁO: to samo zdjęcie w trybie cover + blur (wypełnia całą szerokość).
 *  - WARSTWA GŁÓWNA: logo w trybie contain (nic się nie ucina).
 *
 * Props są celowo proste – to ma być drop-in do hero.
 */
type Props = {
  src: string;
  alt?: string;
  /** Podbij LCP: <img loading="eager"> w warstwie głównej. */
  priority?: boolean;
  /** Szerokość kontenera (Tailwind class). Domyślnie 1200px. */
  maxWidthClass?: string;
  /** Proporcje kontenera. Domyślnie 16/9 (md: 11/7). */
  aspectClass?: string;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "loading">;

export default function BrandBanner({
  src,
  alt = "Logo",
  priority,
  maxWidthClass = "max-w-[1200px]",
  // mobile 16/9 (bezpiecznie), na md ciaśniej – 11/7 – wygląda bardziej „banerowo”
  aspectClass = "aspect-[16/9] md:aspect-[11/7]",
  ...imgProps
}: Props) {
  return (
    <figure
      aria-label="Baner z logo"
      className={[
        // layout
        "relative mx-auto w-full", maxWidthClass, aspectClass,
        // oprawa
        "overflow-hidden rounded-[20px] shadow-2xl ring-1 ring-white/10",
        "bg-[#12170d]",
      ].join(" ")}
    >
      {/* Delikatna poświata w ramce (bez przesady – ma tylko dodać głębi) */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0
          bg-[radial-gradient(115%_115%_at_0%_0%,rgba(209,161,36,0.22),transparent_45%),radial-gradient(110%_110%_at_100%_0%,rgba(62,78,30,0.30),transparent_40%)]
        "
      />

      {/* TŁO – wypełnia szerokość, rozmyte; redukcja intensywności dla motion-reduce */}
      <img
        src={src}
        alt=""
        aria-hidden
        className="
          absolute inset-0 h-full w-full object-cover
          motion-safe:blur-[14px] md:motion-safe:blur-[18px]
          motion-reduce:blur-[6px]
          scale-110 opacity-70 saturate-[.9]
        "
        loading="lazy"
        decoding="async"
        draggable={false}
      />

      {/* GŁÓWNA WARSTWA – logo zawsze w całości */}
      <div className="relative z-10 flex h-full w-full items-center justify-center p-4 md:p-6">
        <img
          src={src}
          alt={alt}
          className="max-h-full max-w-full object-contain drop-shadow-[0_1px_0_rgba(0,0,0,0.3)]"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          sizes="(min-width:1280px) 1100px, (min-width:768px) 90vw, 92vw"
          draggable={false}
          {...imgProps}
        />
      </div>

      {/* Miękka winieta, żeby krawędzie nie były „twarde” */}
      <div
        aria-hidden
        className="
          pointer-events-none absolute inset-0
          [mask-image:radial-gradient(140%_120%_at_50%_50%,black_72%,transparent_100%)]
        "
      />
    </figure>
  );
}

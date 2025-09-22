import { useEffect } from "react";

/**
 * Hook do animacji reveal-on-scroll.
 * Dodaje klasę `.reveal-init` a potem `.reveal-in` przy wejściu w viewport.
 *
 * @param selector - CSS selector elementów do obserwacji (domyślnie `[data-reveal]`)
 * @param options  - ustawienia IntersectionObservera
 */
export function useReveal(
  selector = "[data-reveal]",
  options: IntersectionObserverInit = { threshold: 0.12 }
) {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (elements.length === 0) return;

    // Wsparcie dla prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((el) => el.classList.add("reveal-in"));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-in");
          io.unobserve(entry.target);
        }
      }
    }, options);

    elements.forEach((el) => {
      // unikamy powtórnego nadpisania (np. przy hot reload)
      if (!el.classList.contains("reveal-init") && !el.classList.contains("reveal-in")) {
        el.classList.add("reveal-init");
      }
      io.observe(el);
    });

    return () => io.disconnect();
  }, [selector, options]);
}

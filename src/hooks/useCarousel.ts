import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { nextIndex } from "../utils/carousel";

export type CarouselOptions = {
  /** Autoodtwarzanie (ms). 0 = off. Domyślnie: 0. */
  autoplayMs?: number;
  /** Startowy slajd. Domyślnie: 0. */
  initial?: number;
  /** Wstrzymaj autoplay na :hover. Domyślnie: true. */
  pauseOnHover?: boolean;
  /** Wstrzymaj autoplay na focus wewnątrz kontenera. Domyślnie: true. */
  pauseOnFocus?: boolean;
};

/**
 * Hook do karuzeli: next/prev/setIndex + (opcjonalne) autoplay, pause/resume,
 * auto-pauza na hover/focus/ukrycie karty oraz respekt dla prefers-reduced-motion.
 */
export function useCarousel(length: number, opts: CarouselOptions = {}) {
  const {
    autoplayMs = 0,
    initial = 0,
    pauseOnHover = true,
    pauseOnFocus = true,
  } = opts;

  // ----------------------------------------
  // Stan i referencje
  // ----------------------------------------
  const [index, setIndex] = useState(() => (length > 0 ? initial % length : 0));
  const pausedRef = useRef(false);
  const rmRef = useRef<boolean>(false); // prefers-reduced-motion
  const lenRef = useRef(length);

  lenRef.current = length;

  // Reaguj na zmiany length: utrzymaj poprawny indeks
  useEffect(() => {
    setIndex((i) => {
      if (lenRef.current <= 0) return 0;
      const safe = i % lenRef.current;
      return safe < 0 ? safe + lenRef.current : safe;
    });
  }, [length]);

  // ----------------------------------------
  // Akcje
  // ----------------------------------------
  const go = useCallback(
    (delta: number) => {
      setIndex((i) => nextIndex(i, delta, lenRef.current));
    },
    []
  );

  const to = useCallback((i: number) => {
    setIndex(() => nextIndex(0, i, lenRef.current));
  }, []);

  const prev = useCallback(() => go(-1), [go]);
  const next = useCallback(() => go(1), [go]);

  const pause = useCallback(() => {
    pausedRef.current = true;
  }, []);

  const resume = useCallback(() => {
    pausedRef.current = false;
  }, []);

  // ----------------------------------------
  // prefers-reduced-motion (live)
  // ----------------------------------------
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      rmRef.current = !!mq.matches;
    };
    update();
    try {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    } catch {
      // Safari < 14
      mq.addListener?.(update);
      return () => mq.removeListener?.(update);
    }
  }, []);

  // ----------------------------------------
  // Autoplay (pauzuje na: pausedRef, reduced motion, hidden tab)
  // ----------------------------------------
  useEffect(() => {
    if (!autoplayMs || autoplayMs <= 0) return;
    if (typeof window === "undefined") return;

    let timer: number | null = null;

    const tick = () => {
      if (!pausedRef.current && !rmRef.current && document.visibilityState === "visible") {
        next();
      }
    };

    const start = () => {
      if (timer !== null) window.clearInterval(timer);
      timer = window.setInterval(tick, autoplayMs);
    };

    const stop = () => {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    start();

    const onVisibility = () => {
      if (document.visibilityState === "hidden") stop();
      else start();
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [autoplayMs, next]);

  // ----------------------------------------
  // Handlery interakcji do podpięcia w kontenerze (opcjonalnie)
  // użycie: <div {...bind}>...</div>
  // ----------------------------------------
  const bind = useMemo(() => {
    const handlers: Record<string, (e: any) => void> = {};
    if (pauseOnHover) {
      handlers.onMouseEnter = () => pause();
      handlers.onMouseLeave = () => resume();
      handlers.onTouchStart = () => pause(); // na mobile traktujemy dotyk jak "interakcję"
      handlers.onTouchEnd = () => resume();
    }
    if (pauseOnFocus) {
      handlers.onFocus = () => pause();
      handlers.onBlur = () => resume();
    }
    return handlers;
  }, [pauseOnHover, pauseOnFocus, pause, resume]);

  return {
    index,
    setIndex: to,
    prev,
    next,
    pause,
    resume,
    isPaused: pausedRef.current,
    bind, // podłącz do głównego wrappera karuzeli
  };
}

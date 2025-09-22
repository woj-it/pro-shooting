// src/hooks/useCarousel.ts
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { nextIndex } from "../utils/carousel";

export type CarouselOptions = {
  autoplayMs?: number;   // 0 = off
  initial?: number;      // startowy slajd
  pauseOnHover?: boolean;
  pauseOnFocus?: boolean;
};

export function useCarousel(length: number, opts: CarouselOptions = {}) {
  const {
    autoplayMs = 0,
    initial = 0,
    pauseOnHover = true,
    pauseOnFocus = true,
  } = opts;

  const [index, setIndex] = useState(() => (length > 0 ? initial % length : 0));
  const pausedRef = useRef(false);
  const rmRef = useRef(false);        // prefers-reduced-motion
  const lenRef = useRef(length);
  lenRef.current = length;

  // wyrównaj index gdy zmieni się length
  useEffect(() => {
    setIndex((i) => {
      if (lenRef.current <= 0) return 0;
      const safe = i % lenRef.current;
      return safe < 0 ? safe + lenRef.current : safe;
    });
  }, [length]);

  const go = useCallback((delta: number) => {
    setIndex((i) => nextIndex(i, delta, lenRef.current));
  }, []);

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

  // prefers-reduced-motion (live)
  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { rmRef.current = mq.matches; };
    update();
    try {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    } catch {
      mq.addListener?.(update);
      return () => mq.removeListener?.(update);
    }
  }, []);

  // autoplay z pauzą na hidden tab / reduced motion / manual pause
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
      if (timer !== null) { window.clearInterval(timer); timer = null; }
    };

    start();
    const onVisibility = () => (document.visibilityState === "hidden" ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [autoplayMs, next]);

  // handlery do podpięcia w kontenerze: <div {...bind}>
  const bind = useMemo(() => {
    const h: Record<string, (e: any) => void> = {};
    if (pauseOnHover) {
      h.onMouseEnter = pause;
      h.onMouseLeave = resume;
      h.onTouchStart = pause;
      h.onTouchEnd = resume;
    }
    if (pauseOnFocus) {
      h.onFocus = pause;
      h.onBlur = resume;
    }
    return h;
  }, [pauseOnHover, pauseOnFocus, pause, resume]);

  return { index, setIndex: to, prev, next, pause, resume, isPaused: pausedRef.current, bind };
}

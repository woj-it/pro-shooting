/**
 * Zwraca nowy indeks w obrębie [0, length).
 *
 * @param current - aktualny indeks
 * @param delta   - przesunięcie (może być dodatnie lub ujemne)
 * @param length  - długość kolekcji
 * @returns indeks z zakresu [0, length)
 */
export function nextIndex(current: number, delta: number, length: number): number {
  if (!Number.isInteger(current) || !Number.isInteger(delta) || !Number.isInteger(length)) {
    throw new TypeError("nextIndex: wszystkie argumenty muszą być liczbami całkowitymi.");
  }
  if (length <= 0) return 0;

  const raw = (current + delta) % length;
  return raw >= 0 ? raw : raw + length;
}

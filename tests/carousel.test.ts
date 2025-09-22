import { describe, it, expect } from "vitest";
import { nextIndex } from "./carousel";

describe("nextIndex", () => {
  it("przechodzi do przodu", () => {
    expect(nextIndex(0, 1, 5)).toBe(1);
    expect(nextIndex(4, 1, 5)).toBe(0);
  });

  it("przechodzi do tyłu", () => {
    expect(nextIndex(0, -1, 5)).toBe(4);
    expect(nextIndex(1, -2, 5)).toBe(4);
  });

  it("zwraca 0 przy length=0", () => {
    expect(nextIndex(2, 3, 0)).toBe(0);
  });

  it("rzuca błąd przy nieprawidłowych argumentach", () => {
    // @ts-expect-error
    expect(() => nextIndex("a", 1, 5)).toThrow(TypeError);
  });
});

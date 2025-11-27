import { describe, it, expect } from "vitest";

describe("Array tests", () => {
  it("pushes items", () => {
    const arr = [];
    arr.push("tree");
    expect(arr.length).toBe(1);
  });

  it("finds an element", () => {
    const arr = ["tree", "bench", "slide"];
    expect(arr.includes("bench")).toBe(true);
  });

  it("filters items", () => {
    const numbers = [1, 2, 3, 4, 5];
    const even = numbers.filter((n) => n % 2 === 0);
    expect(even).toEqual([2, 4]);
  });
});

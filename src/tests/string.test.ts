import { describe, it, expect } from "vitest";

describe("String tests", () => {
  it("concatenates strings", () => {
    expect("Hello " + "World").toBe("Hello World");
  });

  it("checks string length", () => {
    expect("GreenSchool".length).toBe(11);
  });

  it("checks substring", () => {
    expect("schoolyard".includes("yard")).toBe(true);
  });
});

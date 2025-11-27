import { describe, it, expect } from "vitest";

describe("Object tests", () => {
  it("checks object property", () => {
    const user = { name: "Shiven", role: "Student" };
    expect(user.name).toBe("Shiven");
  });

  it("merges objects", () => {
    const a = { x: 1 };
    const b = { y: 2 };
    expect({ ...a, ...b }).toEqual({ x: 1, y: 2 });
  });

  it("updates property", () => {
    const project = { status: "draft" };
    project.status = "published";
    expect(project.status).toBe("published");
  });
});

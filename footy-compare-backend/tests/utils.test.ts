import { describe, it, expect } from "vitest";
import { per90 } from "../src/utils/per90";

describe("per90", () => {
  it("computes", () => {
    expect(per90(10, 1800)).toBeCloseTo(0.5);
  });
});

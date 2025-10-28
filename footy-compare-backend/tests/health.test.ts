import { describe, it, expect } from "vitest";
import app from "../src/app";
import request from "supertest";

describe("health", () => {
  it("GET /health", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});

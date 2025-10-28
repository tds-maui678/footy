import Redis from "ioredis";
import { env } from "../config/env";

let redis: Redis | null = null;
if (env.REDIS_URL) {
  redis = new Redis(env.REDIS_URL, { lazyConnect: true });
  redis.on("error", (e) => console.warn("Redis warn:", e.message));
  redis.connect().catch(() => console.warn("Redis: connect failed (continuing without cache)"));
}

// in-memory fallback (very simple)
const mem = new Map<string, { v: string; exp: number }>();

export async function cacheGet(key: string): Promise<string | null> {
  if (redis) {
    try { return (await redis.get(key)) as string | null; } catch { /* noop */ }
  } else {
    const hit = mem.get(key);
    if (hit && hit.exp > Date.now()) return hit.v;
  }
  return null;
}

export async function cacheSet(key: string, value: string, ttlSec: number): Promise<void> {
  if (redis) {
    try { await redis.setex(key, ttlSec, value); return; } catch { /* noop */ }
  }
  mem.set(key, { v: value, exp: Date.now() + ttlSec * 1000 });
}
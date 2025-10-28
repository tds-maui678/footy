import Redis from "ioredis";
import { env } from "../config/env";
import logger from "./logger";

let redis: Redis | null = null;

export function getRedis(): Redis | null {
  if (!env.REDIS_URL) return null;
  if (!redis) {
    redis = new Redis(env.REDIS_URL);
    redis.on("connect", () => logger.info("Redis connected"));
    redis.on("error", (e) => logger.warn({ e }, "Redis error"));
  }
  return redis;
}

export async function cached<T>(key: string, ttlSec: number, loader: () => Promise<T>): Promise<T> {
  const r = getRedis();
  if (r) {
    const hit = await r.get(key);
    if (hit) return JSON.parse(hit) as T;
  }
  const data = await loader();
  if (r) await r.setex(key, ttlSec, JSON.stringify(data));
  return data;
}

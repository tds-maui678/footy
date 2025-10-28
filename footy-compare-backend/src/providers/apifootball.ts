import fetch, { Response } from "cross-fetch";
import { URLSearchParams } from "url";
import { env } from "../config/env";
import { cacheGet, cacheSet } from "../lib/cache";

const BASE = "https://v3.football.api-sports.io";
const DEFAULT_TTL = 60; // seconds (override per-call in services)

function buildUrl(path: string, query?: Record<string, string | number | boolean | undefined>) {
  const qs = new URLSearchParams();
  if (query) for (const [k, v] of Object.entries(query)) if (v !== undefined && v !== null) qs.set(k, String(v));
  const q = qs.toString();
  return `${BASE}${path}${q ? `?${q}` : ""}`;
}

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

async function fetchWithRetry(url: string, tries = 3): Promise<Response> {
  let lastErr: unknown;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, { headers: { "x-apisports-key": env.API_FOOTBALL_KEY } });
      if (res.ok) return res;

      // backoff on 429/5xx
      if (res.status === 429 || res.status >= 500) {
        const wait = Math.min(2000 * (i + 1), 5000); // 2s,4s,5s
        await sleep(wait);
        continue;
      }
      // non-retriable
      const text = await res.text().catch(() => "");
      throw new Error(`API ${res.status} ${res.statusText}: ${text.slice(0, 300)}`);
    } catch (e) {
      lastErr = e;
      await sleep(500 * (i + 1));
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}

async function getJson<T>(path: string, query?: Record<string, any>, ttl = DEFAULT_TTL): Promise<T> {
  const url = buildUrl(path, query);
  const key = `apifootball:${url}`;
  const cached = await cacheGet(key);
  if (cached) return JSON.parse(cached) as T;

  const res = await fetchWithRetry(url);
  const data = (await res.json()) as T;

  // Basic success check: if API returns empty/error, skip cache
  try { await cacheSet(key, JSON.stringify(data), ttl); } catch { /* noop */ }
  return data;
}

export const ApiFootball = {
  leagues: (q?: { id?: number; name?: string; country?: string; season?: number | string }, ttl?: number) =>
    getJson<{ response: any[]; paging?: any }>("/leagues", q, ttl),

  teams: (q: { league?: number; season?: number | string; id?: number; name?: string; search?: string; country?: string }, ttl?: number) =>
    getJson<{ response: any[]; paging?: any }>("/teams", q, ttl),

  players: (q: { team: number; season: number | string; page?: number }, ttl?: number) =>
    getJson<{ response: any[]; paging: { current: number; total: number } }>("/players", q, ttl),

  fixtures: (q: { league?: number; season?: number | string; team?: number; from?: string; to?: string }, ttl?: number) =>
    getJson<{ response: any[]; paging?: any }>("/fixtures", q, ttl),

  teamStatistics: (q: { league: number; season: number | string; team: number }, ttl?: number) =>
    getJson<{ response: any }>("/teams/statistics", q, ttl)
};

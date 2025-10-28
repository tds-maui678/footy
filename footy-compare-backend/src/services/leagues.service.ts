import { ApiFootball } from "../providers/apifootball";

export async function listLeagues(q: { country?: string; season?: string | number; name?: string }) {
  const res = await ApiFootball.leagues({ country: q.country, season: q.season, name: q.name });
  // Normalize for dropdowns
  return (res.response ?? []).map((r: any) => ({
    id: r.league?.id ?? r.id,
    name: r.league?.name ?? r.name,
    type: r.league?.type ?? r.type ?? null,
    logo: r.league?.logo ?? r.logo ?? null,
    country: r.country?.name ?? r.country ?? null,
    season: q.season ?? null
  }));
}
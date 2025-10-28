import { ApiFootball } from "../providers/apifootball";
import { dictGetLeagueIdByName, dictPutLeague, dictGetTeamIdByName, dictPutTeam } from "./dictionary.service";

/** Try dict first; fallback to API; cache result back to dict */
export async function findLeagueIdByName(name: string, season?: string | number): Promise<number | null> {
  // 1) dictionary
  const fromDict = await dictGetLeagueIdByName(name, season);
  if (fromDict != null) return fromDict;

  // 2) API exact then fallback
  const tries = [{ name, season }, { name }];
  for (const q of tries) {
    const r = await ApiFootball.leagues(q, 3600);
    const leagues = r.response ?? [];
    if (leagues.length) {
      // Prefer exact name
      const exact = leagues.find((x: any) => (x.league?.name ?? "").toLowerCase() === name.toLowerCase()) ?? leagues[0];
      const id = exact.league?.id ?? exact.id;
      const country = exact.country?.name ?? null;
      // 3) store in dict (best-effort)
      await dictPutLeague({ league_id: id, name: exact.league?.name ?? name, country, season });
      return id;
    }
  }
  return null;
}

/** Try dict first; fallback to API; cache result back to dict */
export async function findTeamIdByName(teamName: string, season?: string | number, leagueId?: number): Promise<number | null> {
  // 1) dictionary
  const fromDict = await dictGetTeamIdByName(teamName, season, leagueId);
  if (fromDict != null) return fromDict;

  // 2) API with league context if available (best disambiguation)
  if (leagueId && season) {
    const byLeague = await ApiFootball.teams({ league: leagueId, season, search: teamName }, 3600);
    const hit = (byLeague.response ?? [])[0];
    if (hit) {
      const t = hit.team ?? hit;
      await dictPutTeam({ team_id: t.id, league_id: leagueId, season, name: t.name, country: t.country ?? null });
      return t.id;
    }
  }

  // 3) Global search fallback
  const bySearch = await ApiFootball.teams({ search: teamName }, 3600);
  const list = bySearch.response ?? [];
  if (!list.length) return null;

  const exact = list.find((x: any) => (x.team?.name ?? "").toLowerCase() === teamName.toLowerCase()) ?? list[0];
  const t = exact.team ?? exact;
  await dictPutTeam({ team_id: t.id, league_id: leagueId ?? null, season: season ?? null, name: t.name, country: t.country ?? null });
  return t.id;
}
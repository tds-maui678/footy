import { ApiFootball } from "../providers/apifootball";
import { pickPlayerCore, mapPlayerStats } from "../utils/normalize";
import { per90 } from "../utils/per90";

export async function comparePlayers(ids: number[], season: string) {
  const players = await Promise.all(
    ids.map(async (id) => {
      const res = await ApiFootball.playerStats(id, season);
      if (!res?.length) return { id, notFound: true };
      const core = pickPlayerCore(res[0]);
      const s = mapPlayerStats(res[0]);
      const per = {
        goals: per90(s.goals ?? 0, s.minutes ?? 0),
        assists: per90(s.assists ?? 0, s.minutes ?? 0),
        shots: per90(s.shots ?? 0, s.minutes ?? 0),
        xg: s.xg != null ? per90(s.xg, s.minutes ?? 0) : null,
        xa: s.xa != null ? per90(s.xa, s.minutes ?? 0) : null
      };
      return {
        ...core,
        teamId: s.teamId ?? null,
        season,
        minutes: s.minutes ?? 0,
        totals: { goals: s.goals ?? 0, assists: s.assists ?? 0, shots: s.shots ?? 0, xg: s.xg, xa: s.xa },
        per90: per
      };
    })
  );
  return { season, players };
}

export async function compareTeams(ids: number[], season: string) {
  // Placeholder: compute from fixtures or dedicated endpoints (depends on your plan features)
  return {
    season,
    teams: ids.map((id) => ({
      id,
      per90: { gf: 0, ga: 0, xg: null, xga: null },
      totals: { played: 0, gf: 0, ga: 0 }
    }))
  };
}

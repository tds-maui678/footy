import { ApiFootball } from "../providers/apifootball";
import { findLeagueIdByName } from "./lookup.service";

type ListTeamsArgs = {
  leagueId?: number;
  leagueName?: string;
  season?: number | string;
};

export async function listTeams(args: ListTeamsArgs) {
  // resolve league
  let leagueId: number | undefined =
    typeof args.leagueId === "number" ? args.leagueId : undefined;
  
  if (!leagueId && args.leagueName) {
    const lid = await findLeagueIdByName(args.leagueName, args.season);
    if (lid != null) leagueId = lid;
  }
  
  if (!leagueId) {
    throw new Error("leagueId or leagueName must resolve to a valid league");
  }

  const res = await ApiFootball.teams({ league: leagueId, season: args.season });
  
  return (res.response ?? []).map((r: any) => {
    const t = r.team ?? r;
    const v = r.venue ?? {};
    
    return {
      id: t.id,
      name: t.name,
      code: t.code ?? null,
      country: t.country ?? null,
      founded: t.founded ?? null,
      logo: t.logo ?? null,
      venue: v.name ?? null,  
    };
  });
}
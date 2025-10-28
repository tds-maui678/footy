import { ApiFootball } from "../providers/apifootball";
import { findLeagueIdByName, findTeamIdByName } from "./lookup.service";

type TeamStatsArgs = {
  leagueId?: number;
  leagueName?: string;
  teamId?: number;
  teamName?: string;
  season: number | string;
};

export async function teamStatistics(args: TeamStatsArgs) {
  let leagueId: number | undefined =
    typeof args.leagueId === "number" ? args.leagueId : undefined;

  if (!leagueId && args.leagueName) {
    const lid = await findLeagueIdByName(args.leagueName, args.season);
    if (lid != null) leagueId = lid;
  }
  if (!leagueId) throw new Error("leagueId or leagueName is required and must resolve to a valid league");

  let teamId: number | undefined =
    typeof args.teamId === "number" ? args.teamId : undefined;

  if (!teamId && args.teamName) {
    const tid = await findTeamIdByName(args.teamName, args.season, leagueId);
    if (tid != null) teamId = tid;
  }
  if (!teamId) throw new Error("teamId or teamName is required and must resolve to a valid team");

  const res = await ApiFootball.teamStatistics({ league: leagueId, season: args.season, team: teamId });
  return res.response;
}
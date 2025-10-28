import { ApiFootball } from "../providers/apifootball";
import { findLeagueIdByName, findTeamIdByName } from "./lookup.service";

type ListPlayersArgs = {
  teamId?: number;
  teamName?: string;
  leagueId?: number;
  leagueName?: string;
  season: number | string;
  page?: number;
  all?: boolean;
};

export async function listPlayers(args: ListPlayersArgs) {
  // Resolve league first (optional, improves team disambiguation)
  let leagueId: number | undefined =
    typeof args.leagueId === "number" ? args.leagueId : undefined;

  if (!leagueId && args.leagueName) {
    const lid = await findLeagueIdByName(args.leagueName, args.season);
    if (lid != null) leagueId = lid;
  }

  // Resolve team
  let teamId: number | undefined =
    typeof args.teamId === "number" ? args.teamId : undefined;

  if (!teamId && args.teamName) {
    const tid = await findTeamIdByName(args.teamName, args.season, leagueId);
    if (tid != null) teamId = tid;
  }

  if (!teamId) {
    throw new Error("teamId or teamName (+season) is required and must resolve to a valid team");
  }

  // Pagination helper
  const gatherAll = async () => {
    const first = await ApiFootball.players({ team: teamId!, season: args.season, page: 1 });
    const total = first.paging?.total ?? 1;
    const pages: any[] = first.response ?? [];
    for (let p = 2; p <= total; p++) {
      const pageRes = await ApiFootball.players({ team: teamId!, season: args.season, page: p });
      pages.push(...(pageRes.response ?? []));
    }
    return pages;
  };

  const raw = args.all
    ? await gatherAll()
    : (await ApiFootball.players({ team: teamId!, season: args.season, page: args.page ?? 1 })).response ?? [];

  // Normalize
  const players = raw.map((r: any) => {
    const p = r.player ?? r;
    const s = (r.statistics && r.statistics[0]) || {};
    return {
      id: p.id,
      name: p.name,
      position: p.position ?? s.games?.position ?? null,
      nationality: p.nationality ?? null,
      age: p.age ?? null,
      photo: p.photo ?? null,
      teamId: s.team?.id ?? teamId,
      minutes: s.games?.minutes ?? null,
      goals: s.goals?.total ?? null,
      assists: s.goals?.assists ?? null,
      shots: s.shots?.total ?? null,
      xg: s.expected?.goals ?? null,
      xa: s.expected?.assists ?? null
    };
  });

  return { teamId, season: args.season, players };
}
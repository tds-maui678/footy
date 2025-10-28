import { sb } from "../providers/supabase";


export async function dictGetLeagueIdByName(
  name: string,
  season?: number | string
): Promise<number | null> {
  if (!sb) return null;

  let q = sb.from("leagues_dict").select("league_id").eq("name", name);
  if (season !== undefined) q = q.eq("season", Number(season));

  const { data, error } = await q.limit(1);
  if (error) {
    console.error("Supabase dictGetLeagueIdByName error:", error);
    return null;
  }
  return data?.[0]?.league_id ?? null;
}
export async function dictPutLeague(row: {
  league_id: number;
  name: string;
  country?: string | null;
  season?: number | string | null;
}) {
  if (!sb) return null;

  const payload = {
    league_id: row.league_id,
    name: row.name,
    country: row.country ?? null,
    season: row.season != null ? Number(row.season) : null
  };

  const { data, error } = await sb
    .from("leagues_dict")
    .upsert(payload)
    .select()
    .single();

  if (error) {
    console.error("Supabase dictPutLeague error:", error);
    return null;
  }
  return data;
}


export async function dictGetTeamIdByName(
  name: string,
  season?: number | string,
  leagueId?: number
): Promise<number | null> {
  if (!sb) return null;

  let q = sb.from("teams_dict").select("team_id").eq("name", name);
  if (leagueId !== undefined) q = q.eq("league_id", leagueId);
  if (season !== undefined) q = q.eq("season", Number(season));

  const { data, error } = await q.limit(1);
  if (error) {
    console.error("Supabase dictGetTeamIdByName error:", error);
    return null;
  }
  return data?.[0]?.team_id ?? null;
}


export async function dictPutTeam(row: {
  team_id: number;
  league_id?: number | null;
  season?: number | string | null;
  name: string;
  country?: string | null;
}) {
  if (!sb) return null;

  const payload = {
    team_id: row.team_id,
    league_id: row.league_id ?? null,
    season: row.season != null ? Number(row.season) : null,
    name: row.name,
    country: row.country ?? null
  };

  const { data, error } = await sb
    .from("teams_dict")
    .upsert(payload)
    .select()
    .single();

  if (error) {
    console.error("Supabase dictPutTeam error:", error);
    return null;
  }
  return data;
}
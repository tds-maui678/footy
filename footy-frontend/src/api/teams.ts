import { http } from "./client";

export type Team = { 
  id: number; 
  name: string; 
  logo: string | null; 
  code?: string | null; 
  country?: string | null;
  venue?: string | null;
};

export const getTeams = (p: {
  leagueId?: number; 
  leagueName?: string; 
  season?: string | number;
}) => http.get<Team[]>("/api/teams", { params: p }).then(r => r.data);
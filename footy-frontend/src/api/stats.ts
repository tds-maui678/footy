import { http } from "./client";
export const getTeamStats = (p:{
  leagueId?:number; leagueName?:string; teamId?:number; teamName?:string; season:string|number;
}) => http.get("/api/teams/statistics",{ params:p }).then(r => r.data);
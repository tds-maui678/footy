import { http } from "./client";
export type Player = {
  id:number; name:string; photo:string|null; position:string|null; nationality:string|null; age:number|null;
  minutes:number|null; goals:number|null; assists:number|null; shots:number|null; xg:number|null; xa:number|null;
};
export type PlayerResponse = { teamId:number; season:string|number; players:Player[] };

export const getPlayers = (p:{
  teamId?:number; teamName?:string; leagueId?:number; leagueName?:string; season:string|number; all?:boolean;
}) => http.get<PlayerResponse>("/api/players",{ params:p }).then(r => r.data);
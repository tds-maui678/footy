import { http } from "./client";
export type League = { id:number; name:string; country:string|null; logo:string|null };
export const getLeagues = (p:{country?:string; season?:string|number; name?:string}) =>
  http.get<League[]>("/api/leagues",{ params:p }).then(r => r.data);
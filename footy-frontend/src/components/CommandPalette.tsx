import { useEffect, useState } from "react";
import { Command } from "cmdk";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLeagues } from "../api/leagues";
import { getTeams } from "../api/teams";
import { getPlayers } from "../api/players";
import { useFilters } from "../state/filters";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const { season, leagueName, teamName, set } = useFilters();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const leagues = useQuery({ queryKey:["cp-leagues", season], queryFn:()=>getLeagues({ season }) });
  const teams   = useQuery({ queryKey:["cp-teams", leagueName, season], queryFn:()=>getTeams({ leagueName, season }), enabled:!!leagueName });
  const players = useQuery({ queryKey:["cp-players", leagueName, teamName, season], queryFn:()=>getPlayers({ leagueName, teamName, season, all:true }), enabled:!!teamName });

  return (
    <Command.Dialog open={open} onOpenChange={setOpen} label="Global search" className="fixed inset-0 p-4">
      <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl">
        <Command.Input placeholder="Search leagues, teams, players…" />
        <Command.List className="max-h-[60vh] overflow-auto">
          <Command.Group heading="Leagues">
            {(leagues.data ?? []).map((l) => (
              <Command.Item key={`l-${l.id}`} value={`league ${l.name}`} onSelect={() => { set({ leagueName: l.name }); nav("/teams"); }}>
                {l.name}
              </Command.Item>
            ))}
          </Command.Group>

          {teams.data && (
            <Command.Group heading={`Teams (${leagueName || "—"})`}>
              {teams.data.map((t) => (
                <Command.Item key={`t-${t.id}`} value={`team ${t.name}`} onSelect={() => { set({ teamName: t.name }); nav("/players"); }}>
                  {t.name}
                </Command.Item>
              ))}
            </Command.Group>
          )}

          {players.data && (
            <Command.Group heading={`Players (${teamName || "—"})`}>
              {players.data.players.map((p) => (
                <Command.Item key={`p-${p.id}`} value={`player ${p.name}`} onSelect={() => nav("/players")}>
                  {p.name}
                </Command.Item>
              ))}
            </Command.Group>
          )}
        </Command.List>
      </div>
    </Command.Dialog>
  );
}
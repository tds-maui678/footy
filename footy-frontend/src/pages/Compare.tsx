import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Card from "../components/ui/Card";
import PageHeader from "../components/layout/PageHeader";
import UISelect from "../components/ui/Select";
import LeagueSelect from "../components/ui/LeagueSelect";
import TeamSelect from "../components/ui/TeamSelect";
import PlayerMultiSelect from "../components/ui/PlayerMultiSelect";
import RadarComparison from "../components/charts/RadarComparison";
import BarStat from "../components/charts/BarStat";
import Button from "../components/ui/Button";
import CountrySelect from "../components/ui/CountrySelect";
import { getTeamStats } from "../api/stats";
import { getPlayers } from "../api/players";
import { toast } from "sonner";
import { useFilters } from "../state/filters";

export default function Compare() {
  const { country, season, leagueName, teamName, teamB, playerIds, set, save } = useFilters();

  const statsA = useQuery({
    queryKey: ["teamstats", leagueName, teamName, season],
    queryFn: () => getTeamStats({ leagueName, teamName, season }),
    enabled: !!leagueName && !!teamName,
  });

  const statsB = useQuery({
    queryKey: ["teamstats", leagueName, teamB, season],
    queryFn: () => getTeamStats({ leagueName, teamName: teamB, season }),
    enabled: !!leagueName && !!teamB,
  });

  const playersQ = useQuery({
    queryKey: ["players-compare", leagueName, teamName, season],
    queryFn: () => getPlayers({ leagueName, teamName, season, all: true }),
    enabled: !!leagueName && !!teamName,
  });

  const allPlayers = playersQ.data?.players ?? [];
  const selected = allPlayers.filter((p) => playerIds.includes(p.id)).slice(0, 2);

  const radarData = useMemo(() => {
    if (selected.length < 2) return [];
    const pick = (x: any) => ({ xg: x.xg ?? 0, xa: x.xa ?? 0, shots: x.shots ?? 0, assists: x.assists ?? 0, goals: x.goals ?? 0 });
    const A = pick(selected[0]), B = pick(selected[1]);
    return [
      { metric: "xG", a: A.xg, b: B.xg },
      { metric: "xA", a: A.xa, b: B.xa },
      { metric: "Shots", a: A.shots, b: B.shots },
      { metric: "Assists", a: A.assists, b: B.assists },
      { metric: "Goals", a: A.goals, b: B.goals },
    ];
  }, [selected]);

  const barData = useMemo(() => {
    const rows: any[] = [];
    if (statsA.data?.goals) rows.push({ name: teamName || "Team A", goals: statsA.data.goals.for.total.total ?? 0 });
    if (statsB.data?.goals) rows.push({ name: teamB || "Team B", goals: statsB.data.goals.for.total.total ?? 0 });
    return rows;
  }, [statsA.data, statsB.data, teamName, teamB]);

  const onSavePlayers = () => {
    if (selected.length < 2) return toast.info("Pick two players first");
    save({
      id: crypto.randomUUID?.() ?? String(Date.now()),
      kind: "players",
      title: `${selected[0].name} vs ${selected[1].name} (${season})`,
      payload: { leagueName, teamName, season, playerIds },
      createdAt: Date.now(),
    });
    toast.success("Saved players comparison");
  };

  const onSaveTeams = () => {
    if (!teamName || !teamB) return toast.info("Pick two teams");
    save({
      id: crypto.randomUUID?.() ?? String(Date.now()),
      kind: "teams",
      title: `${teamName} vs ${teamB} (${season})`,
      payload: { leagueName, teamA: teamName, teamB, season },
      createdAt: Date.now(),
    });
    toast.success("Saved teams comparison");
  };

  return (
    <>
      <PageHeader title="Compare" subtitle="Compare players (radar) and teams (bars) from live API" />
      <Card className="mb-4 grid lg:grid-cols-5 gap-3">
        <div>
          <div className="text-xs text-gray-500">Country</div>
          <CountrySelect
            season={season}
            value={country}
            onChange={(v) => set({ country: v, leagueName: "", teamName: "", teamB: "", playerIds: [] })}
          />
        </div>
        <div>
          <div className="text-xs text-gray-500">Season</div>
          <UISelect
            value={season}
            onValueChange={(v) => set({ season: v, leagueName: "", teamName: "", teamB: "", playerIds: [] })}
            items={["2024", "2023", "2022"]}
          />
        </div>
        <div>
          <div className="text-xs text-gray-500">League</div>
          <LeagueSelect
            value={leagueName}
            season={season}
            country={country}
            onChange={(v) => set({ leagueName: v, teamName: "", teamB: "", playerIds: [] })}
          />
        </div>
        <div>
          <div className="text-xs text-gray-500">Team A</div>
          <TeamSelect
            leagueName={leagueName}
            season={season}
            value={teamName}
            onChange={(v) => set({ teamName: v, playerIds: [] })}
          />
        </div>
        <div>
          <div className="text-xs text-gray-500">Team B</div>
          <TeamSelect
            leagueName={leagueName}
            season={season}
            value={teamB}
            onChange={(v) => set({ teamB: v })}
          />
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <div className="mb-2 font-medium">Players radar</div>
          <PlayerMultiSelect
            leagueName={leagueName}
            teamName={teamName}
            season={season}
            value={playerIds}
            onChange={(v) => set({ playerIds: v })}
          />
          <RadarComparison data={radarData} />
          <div className="mt-3 text-right">
            <Button onClick={onSavePlayers}>Save players comparison</Button>
          </div>
        </Card>

        <Card>
          <div className="mb-2 font-medium">Team goals (bars)</div>
          <BarStat data={barData} x="name" y="goals" />
          <div className="mt-3 text-right">
            <Button onClick={onSaveTeams}>Save teams comparison</Button>
          </div>
        </Card>
      </div>
    </>
  );
}
import { useQuery } from "@tanstack/react-query";
import { getTeams, type Team } from "../api/teams";
import Card from "../components/ui/Card";
import Skeleton from "../components/ui/Skeleton";
import PageHeader from "../components/layout/PageHeader";
import LeagueSelect from "../components/ui/LeagueSelect";
import TeamSelect from "../components/ui/TeamSelect"; 
import UISelect from "../components/ui/Select";
import CountrySelect from "../components/ui/CountrySelect";
import { useFilters } from "../state/filters";
import { Link } from "react-router-dom";

export default function Teams() {
  const { country, season, leagueName, teamName, set } = useFilters();

  
  const q = useQuery({
    queryKey: ["teams", leagueName, season],
    queryFn: () => getTeams({ leagueName, season }),
    enabled: !!leagueName,
  });

  const teams: Team[] = q.data ?? [];

  return (
    <>
      <PageHeader title="Teams" subtitle="Select a league and season to list teams" />
      <Card className="mb-4 grid sm:grid-cols-4 gap-3 items-center">
        <div>
          <div className="text-xs text-gray-500">Country</div>
          <CountrySelect
            season={season}
            value={country}
            onChange={(v) => set({ country: v, leagueName: "", teamName: "", playerIds: [], teamB: "" })}
          />
        </div>
        <div>
          <div className="text-xs text-gray-500">Season</div>
          <UISelect
            value={season}
            onValueChange={(v) => set({ season: v, leagueName: "", teamName: "", playerIds: [], teamB: "" })}
            items={["2024", "2023", "2022"]}
          />
        </div>
        <div>
          <div className="text-xs text-gray-500">League</div>
          <LeagueSelect
            value={leagueName}
            season={season}
            country={country}
            onChange={(v) => set({ leagueName: v, teamName: "", playerIds: [], teamB: "" })}
          />
        </div>
        <div>
          <div className="text-xs text-gray-500">Team</div>
          <TeamSelect
            leagueName={leagueName}
            season={season}
            value={teamName}
            onChange={(v) => set({ teamName: v })}
          />
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {q.isLoading && Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-24" />)}
        {teams.map((t) => (
          <Link to={`/team/${encodeURIComponent(t.name)}`} key={t.id}>
            <Card className="flex items-center gap-4 hover:ring-2 ring-blue-600 transition">
              <img src={t.logo ?? ""} alt={t.name} className="h-12 w-12 object-contain" />
              <div className="font-semibold">{t.name}</div>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
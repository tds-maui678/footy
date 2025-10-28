import { useQuery } from "@tanstack/react-query";
import { getPlayers } from "../api/players";
import Card from "../components/ui/Card";
import Skeleton from "../components/ui/Skeleton";
import Avatar from "../components/ui/Avatar";
import PageHeader from "../components/layout/PageHeader";
import LeagueSelect from "../components/ui/LeagueSelect";
import TeamSelect from "../components/ui/TeamSelect";
import UISelect from "../components/ui/Select";
import CountrySelect from "../components/ui/CountrySelect";
import { useFilters } from "../state/filters";

export default function Players() {
  const { country, season, leagueName, teamName, set } = useFilters();

  const q = useQuery({
    queryKey: ["players", leagueName, teamName, season],
    queryFn: () => getPlayers({ teamName, leagueName, season, all: true }),
    enabled: !!teamName,
  });

  const list = q.data?.players ?? [];

  return (
    <>
      <PageHeader title="Players" subtitle="Pick a league and team to load the squad" />
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

      <Card>
        {q.isLoading && Array.from({ length: 10 }).map((_, i) => <Skeleton key={i} className="h-14 my-2" />)}
        {!q.isLoading && list.length === 0 && <div className="text-gray-500">Pick Country → Season → League → Team</div>}

        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {list.map((p) => (
            <li key={p.id} className="flex items-center gap-4 py-3">
              <Avatar src={p.photo ?? undefined} alt={p.name} />
              <div className="flex-1">
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-gray-500">{p.position || "—"} • {p.nationality || "—"}</div>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
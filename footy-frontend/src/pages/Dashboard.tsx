import { useQuery } from "@tanstack/react-query";
import { getLeagues, type League } from "../api/leagues";
import Card from "../components/ui/Card";
import UISelect from "../components/ui/Select";
import Skeleton from "../components/ui/Skeleton";
import { useFilters } from "../state/filters";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { country, season, set } = useFilters();
  const q = useQuery({
    queryKey: ["leagues", country, season],
    queryFn: () => getLeagues({ country, season }),
  });
  const leagues = q.data ?? ([] as League[]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Leagues</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse leagues by country and season
        </p>
      </div>

      {/* Filters */}
      <Card className="flex flex-wrap gap-4 items-center p-4">
        <div className="space-y-1">
          <div className="text-xs text-gray-500 font-medium">Country</div>
          <UISelect
            value={country}
            onValueChange={(v) => set({ country: v })}
            items={["England", "Spain", "Italy", "Germany", "France"]}
          />
        </div>
        <div className="space-y-1">
          <div className="text-xs text-gray-500 font-medium">Season</div>
          <UISelect
            value={season}
            onValueChange={(v) => set({ season: v })}
            items={["2024", "2023", "2022"]}
          />
        </div>
      </Card>

      {/* Leagues Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {q.isLoading &&
          Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        {leagues.map((l) => (
          <Link
            to={`/league/${encodeURIComponent(l.name)}`}
            key={l.id}
            className="block"
          >
            <Card className="flex items-center gap-4 p-4 hover:shadow-lg hover:scale-105 transition-all cursor-pointer h-28">
              <img
                src={l.logo ?? ""}
                alt={l.name}
                className="h-12 w-12 object-contain"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 dark:text-white truncate">
                  {l.name}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {l.country}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
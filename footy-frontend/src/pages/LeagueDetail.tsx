import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTeams } from "../api/teams";
import { useFilters } from "../state/filters";
import PageHeader from "../components/layout/PageHeader";
import Card from "../components/ui/Card";
import Skeleton from "../components/ui/Skeleton";
import UISelect from "../components/ui/Select";

const SEASONS = ["2024", "2023", "2022"] as const;

export default function LeagueDetail() {
  const { leagueName = "" } = useParams();
  const { season, set } = useFilters();
  const navigate = useNavigate();

  const { data: teams = [], isLoading, isError } = useQuery({
    queryKey: ["teams", leagueName, season],
    queryFn: () => getTeams({ leagueName, season }),
  });

  // Handle team click - update league filter before navigating
  const handleTeamClick = (teamName: string) => {
    set({ leagueName }); // ✅ Set the league context
    navigate(`/team/${encodeURIComponent(teamName)}`);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title={leagueName} 
        subtitle={`Teams competing in ${leagueName}`}
      />

      {/* Season Filter */}
      <Card className="flex items-center gap-6">
        <div className="flex-1 max-w-[200px] space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Season
          </label>
          <UISelect
            value={season}
            onValueChange={(v) => set({ season: v })}
            items={[...SEASONS]}
          />
        </div>
      </Card>

      {/* Error State */}
      {isError && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900">
          <div className="flex items-center gap-3 text-red-800 dark:text-red-200">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="font-medium">Failed to load teams. Please try again.</p>
          </div>
        </Card>
      )}

      {/* Teams Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        {isLoading &&
          Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}

        {!isLoading && teams.length === 0 && !isError && (
          <div className="col-span-full">
            <Card className="text-center py-12">
              <p className="text-gray-500">No teams found for this league in {season}.</p>
            </Card>
          </div>
        )}

        {teams.map((team) => (
          <div
            key={team.id}
            onClick={() => handleTeamClick(team.name)}
            className="group block cursor-pointer"
          >
            <Card className="h-full flex items-center gap-4 transition-all duration-200 hover:shadow-xl hover:scale-[1.03] hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20">
              <div className="flex-shrink-0 w-20 h-20 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-all">
                <img
                  src={team.logo ?? "/placeholder-logo.png"}
                  alt={`${team.name} logo`}
                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform"
                  loading="lazy"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {team.name}
                </h3>
                {team.venue && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
                    {team.venue}
                  </p>
                )}
                {team.country && !team.venue && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {team.country}
                  </p>
                )}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
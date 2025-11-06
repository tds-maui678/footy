import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getPlayers } from "../api/players";
import { useFilters } from "../state/filters";
import PageHeader from "../components/layout/PageHeader";
import Card from "../components/ui/Card";
import Skeleton from "../components/ui/Skeleton";
import UISelect from "../components/ui/Select";

const SEASONS = ["2024", "2023", "2022"] as const;

export default function TeamDetail() {
  const { teamName = "" } = useParams();
  const { season, leagueName, set } = useFilters();
  const navigate = useNavigate();

  // If no league context, redirect to leagues page
  useEffect(() => {
    if (!leagueName) {
      console.warn("No league context found. Redirecting to leagues page...");
      // Don't redirect immediately, just show a warning
    }
  }, [leagueName]);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["players", leagueName, teamName, season],
    queryFn: () => getPlayers({ leagueName, teamName, season, all: true }),
    enabled: !!leagueName && !!teamName,
    retry: 1,
  });

  const players = data?.players ?? [];

  return (
    <div className="space-y-6">
      <PageHeader 
        title={teamName} 
        subtitle={leagueName ? `Squad for ${teamName} (${leagueName})` : `Squad for ${teamName}`}
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

      {/* No League Context Warning */}
      {!leagueName && !isLoading && (
        <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-900">
          <div className="flex items-center gap-3 text-yellow-800 dark:text-yellow-200">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-medium">No league context found</p>
              <p className="text-sm mt-1">
                Please navigate to this team through a league page. 
                <button 
                  onClick={() => navigate('/')} 
                  className="ml-1 underline hover:text-yellow-900 dark:hover:text-yellow-100"
                >
                  Go to Leagues
                </button>
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Error State */}
      {isError && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900">
          <div className="flex flex-col gap-3 text-red-800 dark:text-red-200">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-medium">Failed to load players</p>
                <p className="text-sm mt-1">
                  {error instanceof Error ? error.message : "The team might not exist in this league or season."}
                </p>
                <button 
                  onClick={() => navigate('/')} 
                  className="text-sm mt-2 underline hover:text-red-900 dark:hover:text-red-100"
                >
                  Go back to Leagues
                </button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Players Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        {isLoading &&
          Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}

        {!isLoading && players.length === 0 && !isError && leagueName && (
          <div className="col-span-full">
            <Card className="text-center py-12">
              <p className="text-gray-500">No players found for {teamName} in {season}.</p>
              <button 
                onClick={() => navigate(-1)} 
                className="mt-4 text-blue-600 hover:text-blue-700 underline"
              >
                Go back
              </button>
            </Card>
          </div>
        )}

        {players.map((player) => (
          <Card 
            key={player.id}
            className="h-full cursor-pointer transition-all duration-200 hover:shadow-xl hover:scale-[1.03] hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/20"
          >
            <div className="flex flex-col items-center text-center p-4 space-y-3">
              {/* Player Photo */}
              <div className="w-20 h-20 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                {player.photo ? (
                  <img
                    src={player.photo}
                    alt={player.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              
              {/* Player Info */}
              <div className="space-y-1 w-full">
                <h3 className="font-semibold text-base text-gray-900 dark:text-gray-100 truncate">
                  {player.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {player.position ?? "Unknown"}
                </p>
                {player.age && (
                  <p className="text-xs text-gray-500">
                    Age: {player.age}
                  </p>
                )}
                {player.nationality && (
                  <p className="text-xs text-gray-500">
                    {player.nationality}
                  </p>
                )}
              </div>

              {/* Stats */}
              <div className="w-full pt-3 border-t border-gray-200 dark:border-gray-700 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Minutes</div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {player.minutes ?? 0}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Goals</div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {player.goals ?? 0}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500 dark:text-gray-400">Assists</div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {player.assists ?? 0}
                  </div>
                </div>
              </div>

              {/* Advanced Stats (if available) */}
              {(player.xg !== null || player.xa !== null || player.shots !== null) && (
                <div className="w-full pt-2 grid grid-cols-3 gap-2 text-xs">
                  {player.xg !== null && (
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">xG</div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {player.xg.toFixed(2)}
                      </div>
                    </div>
                  )}
                  {player.xa !== null && (
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">xA</div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {player.xa.toFixed(2)}
                      </div>
                    </div>
                  )}
                  {player.shots !== null && (
                    <div>
                      <div className="text-gray-500 dark:text-gray-400">Shots</div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        {player.shots}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
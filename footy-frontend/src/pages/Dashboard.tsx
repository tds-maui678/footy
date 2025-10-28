import { useQuery } from "@tanstack/react-query";
import { getLeagues, type League } from "../api/leagues";
import Card from "../components/ui/Card";
import UISelect from "../components/ui/Select";
import Skeleton from "../components/ui/Skeleton";
import PageHeader from "../components/layout/PageHeader";
import { useFilters } from "../state/filters";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { country, season, set } = useFilters();
  const q = useQuery({ queryKey:["leagues",country,season], queryFn:()=>getLeagues({ country, season }) });
  const leagues = q.data ?? ([] as League[]);
  

  return (
    <>
    
      <PageHeader title="Leagues" subtitle="Browse leagues by country and season" />
      <Card className="mb-4 flex flex-wrap gap-3 items-center">
        <div className="space-y-1">
          <div className="text-xs text-gray-500">Country</div>
          <UISelect value={country} onValueChange={(v)=>set({country:v})}
            items={["England","Spain","Italy","Germany","France"]}/>
        </div>
        <div className="space-y-1">
          <div className="text-xs text-gray-500">Season</div>
          <UISelect value={season} onValueChange={(v)=>set({season:v})}
            items={["2024","2023","2022"]}/>
        </div>
      </Card>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {q.isLoading && Array.from({length:6}).map((_,i)=><Skeleton key={i} className="h-28 rounded-xl"/>)}
         {leagues.map((l) => (
          <Link to={`/league/${encodeURIComponent(l.name)}`} key={l.id}>
          <Card className="flex items-center gap-4 hover:ring-2 ring-blue-600 transition">
          <img src={l.logo ?? ""} alt={l.name} className="h-12 w-12 object-contain" loading="lazy" />
          <div>
            <div className="font-semibold">{l.name}</div>
            <div className="text-sm text-gray-500">{l.country}</div>
           </div>
        </Card>
      </Link>
))}
      </div>
    </>
  );
}
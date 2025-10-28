import { useQuery } from "@tanstack/react-query";
import UISelect from "./Select";
import { getLeagues, type League } from "../../api/leagues";

export default function LeagueSelect({
  value, season, country, onChange
}: { value?: string; season?: string | number; country?: string; onChange: (v: string) => void }) {
  const { data, isLoading } = useQuery({
    queryKey: ["leagues", country, season],
    queryFn: () => getLeagues({ country, season }),
  });

  const items = (data ?? ([] as League[])).map((l) => l.name);

  return (
    <UISelect
      value={value}
      onValueChange={onChange}
      items={items.length ? items : ["—"]}
      placeholder={isLoading ? "Loading..." : "Select league"}
    />
  );
}
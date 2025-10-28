import { useQuery } from "@tanstack/react-query";
import UISelect from "./Select";
import { getTeams, type Team } from "../../api/teams";

export default function TeamSelect({
  leagueName, season, value, onChange
}: {
  leagueName?: string;
  season?: string | number;
  value?: string;
  onChange: (v: string) => void;
}) {
  const enabled = !!leagueName;
  const { data, isLoading } = useQuery({
    queryKey: ["teams", leagueName, season],
    queryFn: () => getTeams({ leagueName, season }),
    enabled,
  });

  const items = (data ?? ([] as Team[])).map((t) => t.name);

  return (
    <UISelect
      value={value}
      onValueChange={onChange}
      items={items.length ? items : ["—"]}
      placeholder={!enabled ? "Select league first" : isLoading ? "Loading..." : "Select team"}
    />
  );
}
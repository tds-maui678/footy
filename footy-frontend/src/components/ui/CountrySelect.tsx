// src/components/ui/CountrySelect.tsx
import { useQuery } from "@tanstack/react-query";
import UISelect from "./Select";
import { getLeagues, type League } from "../../api/leagues";

export default function CountrySelect({
  season, value, onChange
}: { season?:string|number; value?:string; onChange:(v:string)=>void }) {
  const { data, isLoading } = useQuery({
    queryKey:["countries", season],
    queryFn:()=>getLeagues({ season }),   // we dedupe countries from leagues
  });
  const set = new Set((data ?? ([] as League[])).map(l => l.country ?? "").filter(Boolean));
  const countries = Array.from(set).sort();

  return (
    <UISelect
      value={value}
      onValueChange={onChange}
      items={countries.length ? countries : ["—"]}
      placeholder={isLoading ? "Loading..." : "Select country"}
    />
  );
}
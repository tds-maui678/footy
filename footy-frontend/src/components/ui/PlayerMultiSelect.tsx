import * as Dialog from "@radix-ui/react-dialog";
import { useQuery } from "@tanstack/react-query";
import { getPlayers } from "../../api/players";
import Button from "./Button";

export default function PlayerMultiSelect({
  leagueName, teamName, season, value, onChange
}: {
  leagueName?: string; teamName?: string; season: string | number;
  value: number[]; onChange: (v: number[]) => void;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["players", leagueName, teamName, season],
    queryFn: () => getPlayers({ leagueName, teamName, season, all: true }),
    enabled: !!teamName,
  });

  const players = data?.players ?? [];

  const toggle = (id: number) =>
    onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id]);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline">
          {value.length ? `${value.length} selected` : "Select players"}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-xl">
          <div className="mb-3 font-medium">Choose players</div>
          {isLoading && <div className="text-sm text-gray-500">Loading…</div>}
          <div className="max-h-[60vh] overflow-auto space-y-2">
            {players.map((p) => (
              <label key={p.id} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                <input
                  type="checkbox"
                  checked={value.includes(p.id)}
                  onChange={() => toggle(p.id)}
                />
                <img src={p.photo ?? ""} alt={p.name} className="h-8 w-8 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="text-sm">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.position ?? "—"} • {p.nationality ?? "—"}</div>
                </div>
              </label>
            ))}
          </div>
          <div className="mt-4 text-right">
            <Dialog.Close asChild><Button>Done</Button></Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
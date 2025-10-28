import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SavedComparison = {
  id: string;
  kind: "players" | "teams";
  title: string;
  payload: any;
  createdAt: number;
};

type Filters = {
  country: string;
  season: string;
  leagueName: string;
  teamName: string;
  teamB: string;       // for Compare page
  playerIds: number[];

  set: (patch: Partial<Filters>) => void;

  saved: SavedComparison[];
  save: (c: SavedComparison) => void;
  remove: (id: string) => void;
};

export const useFilters = create<Filters>()(
  persist(
    (set, get) => ({
      country: "England",
      season: "2023",
      leagueName: "",
      teamName: "",
      teamB: "",
      playerIds: [],

      set: (patch) => set((s) => ({ ...s, ...patch })),

      saved: [],
      save: (c) => set({ saved: [c, ...get().saved].slice(0, 50) }),
      remove: (id) => set({ saved: get().saved.filter((x) => x.id !== id) }),
    }),
    { name: "footy-ui-state" }
  )
);
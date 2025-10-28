import { z } from "zod";

export const comparePlayersSchema = z.object({
  ids: z.array(z.number().int().positive()).min(2),
  season: z.string()
});

export const compareTeamsSchema = z.object({
  ids: z.array(z.number().int().positive()).min(2),
  season: z.string()
});

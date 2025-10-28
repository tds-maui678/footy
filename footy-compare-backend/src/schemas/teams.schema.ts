import { z } from "zod";
export const teamsQuerySchema = z.object({
  league: z.string(),
  season: z.string().optional()
});

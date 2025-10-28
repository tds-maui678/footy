import { z } from "zod";
export const leaguesQuerySchema = z.object({
  country: z.string().optional(),
  season: z.string().optional()
});

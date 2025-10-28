import { z } from "zod";
export const playersQuerySchema = z.object({
  team: z.string(),
  season: z.string().optional(),
  page: z.coerce.number().int().min(1).optional()
});

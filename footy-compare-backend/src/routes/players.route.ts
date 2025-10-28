import { Router } from "express";
import { listPlayers } from "../services/players.service";
import { z } from "zod";

const r = Router();
const schema = z.object({
  teamId: z.coerce.number().int().positive().optional(),
  teamName: z.string().optional(),
  leagueId: z.coerce.number().int().positive().optional(),
  leagueName: z.string().optional(),
  season: z.union([z.string(), z.number()]),
  page: z.coerce.number().int().min(1).optional(),
  all: z.coerce.boolean().optional()
});

r.get("/players", async (req, res, next) => {
  try {
    const q = schema.parse(req.query);
    const data = await listPlayers(q);
    res.json(data);
  } catch (e) { next(e); }
});

export default r;
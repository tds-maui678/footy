import { Router } from "express";
import { z } from "zod";
import { teamStatistics } from "../services/stats.service";

const r = Router();
const schema = z.object({
  leagueId: z.coerce.number().int().positive().optional(),
  leagueName: z.string().optional(),
  teamId: z.coerce.number().int().positive().optional(),
  teamName: z.string().optional(),
  season: z.union([z.string(), z.number()])
});

r.get("/teams/statistics", async (req, res, next) => {
  try {
    const q = schema.parse(req.query);
    const data = await teamStatistics(q);
    res.json(data);
  } catch (e) { next(e); }
});

export default r;
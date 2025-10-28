import { Router } from "express";
import { listTeams } from "../services/teams.service";
import { z } from "zod";

const r = Router();
const schema = z.object({
  leagueId: z.coerce.number().int().positive().optional(),
  leagueName: z.string().optional(),
  season: z.union([z.string(), z.number()]).optional()
});

r.get("/teams", async (req, res, next) => {
  try {
    const q = schema.parse(req.query);
    const data = await listTeams(q);
    res.json(data);
  } catch (e) { next(e); }
});

export default r;
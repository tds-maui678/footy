import { Router } from "express";
import { listLeagues } from "../services/leagues.service";
import { z } from "zod";

const r = Router();
const schema = z.object({
  country: z.string().optional(),
  season: z.union([z.string(), z.number()]).optional(),
  name: z.string().optional()
});

r.get("/leagues", async (req, res, next) => {
  try {
    const q = schema.parse(req.query);
    const data = await listLeagues(q);
    res.json(data);
  } catch (e) { next(e); }
});

export default r;
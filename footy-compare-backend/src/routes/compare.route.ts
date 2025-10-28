import { Router } from "express";
import { comparePlayersSchema, compareTeamsSchema } from "../schemas/compare.schema";
import { comparePlayers, compareTeams } from "../services/compare.service";

const r = Router();

r.post("/compare/players", async (req, res, next) => {
  try {
    const body = comparePlayersSchema.parse(req.body);
    res.json(await comparePlayers(body.ids, body.season));
  } catch (e) { next(e); }
});

r.post("/compare/teams", async (req, res, next) => {
  try {
    const body = compareTeamsSchema.parse(req.body);
    res.json(await compareTeams(body.ids, body.season));
  } catch (e) { next(e); }
});

export default r;

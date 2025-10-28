import { Router } from "express";
import leagues from "./leagues.route";
import teams from "./teams.route";
import players from "./players.route";
import stats from "./stats.route";

const router = Router();
router.use(leagues);
router.use(teams);
router.use(players);
router.use(stats);
export default router;
import { Router } from "express";
import { getGames } from "../controllers/games.controllers.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);

export default gamesRouter;

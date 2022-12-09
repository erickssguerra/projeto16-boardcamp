import { Router } from "express";
import { getGames, postGame } from "../controllers/games.controllers.js";
import { gameSchemaValidation } from "../middlewares/gameSchemaValidation.middleware.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", gameSchemaValidation, postGame);

export default gamesRouter;

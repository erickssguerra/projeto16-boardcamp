import { Router } from "express";
import { getGames, postGame } from "../controllers/games.controllers.js";
import { gameSchemaValidation } from "../middlewares/games/gameSchemaValidation.middleware.js";
import { existingCategory } from "../middlewares/games/gameExisgintCategory.middleware.js";
import { existingName } from "../middlewares/games/gameExistingName.middleware.js";

const gamesRouter = Router();

gamesRouter.get("/games", getGames);
gamesRouter.post("/games", gameSchemaValidation, existingCategory, existingName, postGame);

export default gamesRouter;

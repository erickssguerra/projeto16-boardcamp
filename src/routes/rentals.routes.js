import { Router } from "express";
import { getRentals, postRental } from "../controllers/rentals.controllers.js";
import { rentalSchemaValidation } from "../middlewares/rentals/rentalSchemaValidation.middleware.js";
import { existingCustomer } from "../middlewares/rentals/rentalExistingCustomer.middleware.js";
import { existingGame } from "../middlewares/rentals/rentalExistingGame.middleware.js";
import { gameAvailability } from "../middlewares/rentals/rentalGameAvailability.middleware.js";

const rentalsRouter = Router();

rentalsRouter.post(
  "/rentals",
  rentalSchemaValidation,
  existingCustomer,
  existingGame,
  gameAvailability,
  postRental
);
rentalsRouter.get("/rentals", getRentals)

export default rentalsRouter;

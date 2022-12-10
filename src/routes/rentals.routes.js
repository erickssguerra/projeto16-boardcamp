import { Router } from "express";
import { postRental } from "../controllers/rentals.controllers.js";
import { rentalSchemaValidation } from "../middlewares/rentals/rentalSchemaValidation.middleware.js";
import { existingCustomer } from "../middlewares/rentals/rentalExistingCustomer.middleware.js";
import { existingGame } from "../middlewares/rentals/rentalExistingGame.middleware.js";

const rentalsRouter = Router();

rentalsRouter.post(
  "/rentals",
  rentalSchemaValidation,
  existingCustomer,
  existingGame,
  //   rentalsGameAvailability,
  postRental
);

export default rentalsRouter;

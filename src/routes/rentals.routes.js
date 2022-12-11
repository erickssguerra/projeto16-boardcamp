import { Router } from "express";
import {
  getRentals,
  postRental,
  deleteRentalById,
} from "../controllers/rentals.controllers.js";
import { rentalSchemaValidation } from "../middlewares/rentals/rentalSchemaValidation.middleware.js";
import { existingCustomer } from "../middlewares/rentals/rentalExistingCustomer.middleware.js";
import { existingGame } from "../middlewares/rentals/rentalExistingGame.middleware.js";
import { gameAvailability } from "../middlewares/rentals/rentalGameAvailability.middleware.js";
import { existingRentalId } from "../middlewares/rentals/rentalExistingRentalId.middleware.js";
import { returnDateVerification } from "../middlewares/rentals/rentalReturnDateVerification.middlware.js";

const rentalsRouter = Router();

rentalsRouter.post(
  "/rentals",
  rentalSchemaValidation,
  existingCustomer,
  existingGame,
  gameAvailability,
  postRental
);
rentalsRouter.get("/rentals", getRentals);
rentalsRouter.delete(
  "/rentals/:id",
  existingRentalId,
  returnDateVerification,
  deleteRentalById
);

export default rentalsRouter;

import { Router } from "express";
import { postRental } from "../controllers/rentals.controllers.js";
import { rentalSchemaValidation } from "../middlewares/rentals/rentalSchemaValidation.middleware.js";
import { existingCustomer } from "../middlewares/rentals/rentalsExistingCustumer.middleware.js";

const rentalsRouter = Router();

rentalsRouter.post(
  "/rentals",
  rentalSchemaValidation,
  existingCustomer,
  //   rentalsExistingGame,
  //   rentalsGameAvailability,
  postRental
);

export default rentalsRouter;

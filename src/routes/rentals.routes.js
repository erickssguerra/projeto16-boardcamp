import { Router } from "express";
import { postRental } from "../controllers/rentals.controllers.js";
import { rentalSchemaValidation } from "../middlewares/rentals/rentalSchemaValidation.middleware.js";

const rentalsRouter = Router();

rentalsRouter.post(
  "/rentals",
  rentalSchemaValidation,
//   rentalsExistingCustumer,
//   rentalsExistingGame,
//   rentalsGameAvailability,
  postRental
);

export default rentalsRouter;

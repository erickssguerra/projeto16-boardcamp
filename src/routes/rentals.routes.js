import { Router } from "express";
import {
  getRentals,
  postRental,
  deleteRentalById,
  postReturnRental,
  getRentalsMetrics,
} from "../controllers/rentals.controllers.js";
import { rentalSchemaValidation } from "../middlewares/rentals/rentalSchemaValidation.middleware.js";
import { existingCustomer } from "../middlewares/rentals/rentalExistingCustomer.middleware.js";
import { existingGame } from "../middlewares/rentals/rentalExistingGame.middleware.js";
import { gameAvailability } from "../middlewares/rentals/rentalGameAvailability.middleware.js";
import { existingRentalId } from "../middlewares/rentals/rentalExistingRentalId.middleware.js";
import { existingReturnDate } from "../middlewares/rentals/rentalExistingReturnDate.middlware.js";
import { notExistingReturnDate } from "../middlewares/rentals/rentalNotExistingReturnDate.middleware.js";

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
  existingReturnDate,
  deleteRentalById
);

rentalsRouter.post(
  "/rentals/:id/return",
  existingRentalId,
  notExistingReturnDate,
  postReturnRental
);

rentalsRouter.get("/rentals/metrics", getRentalsMetrics);
export default rentalsRouter;

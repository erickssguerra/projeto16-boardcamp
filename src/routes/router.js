import { Router } from "express";
import categoriesRouter from "./categories.routes.js";
import gamesRouter from "./games.routes.js";
import customersRouter from "./customers.routes.js";
import rentalsRouter from "./rentals.routes.js";

const router = Router();

router.use(categoriesRouter);
router.use(gamesRouter);
router.use(customersRouter);
router.use(rentalsRouter);

export default router;

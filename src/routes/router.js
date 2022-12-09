import { Router } from "express";
import categoriesRouter from "./categories.routes.js";
import gamesRouter from "./games.routes.js";
import customersRouter from "./customers.routes.js";

const router = Router();

router.use(categoriesRouter);
router.use(gamesRouter);
router.use(customersRouter);

export default router;

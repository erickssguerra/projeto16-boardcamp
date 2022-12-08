import { Router } from "express";
import categoriesRouter from "./categories.routes.js";

const router = Router();

router.use(categoriesRouter);

export default router;

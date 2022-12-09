import { Router } from "express";
import {
  postCategory,
  getCategory,
} from "../controllers/categories.controllers.js";

import { categorySchemaValidation } from "../middlewares/categorySchemaValidation.middleware.js";
import { existingCategory } from "../middlewares/categoryExistingValidation.middleware.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategory);
categoriesRouter.post("/categories", categorySchemaValidation, existingCategory, postCategory)

export default categoriesRouter;

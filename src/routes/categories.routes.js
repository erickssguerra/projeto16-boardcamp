import { Router } from "express";
import {
  postCategory,
  getCategories,
} from "../controllers/categories.controllers.js";

import { categorySchemaValidation } from "../middlewares/categories/categorySchemaValidation.middleware.js";
import { existingCategory } from "../middlewares/categories/categoryExistingValidation.middleware.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories);
categoriesRouter.post("/categories", categorySchemaValidation, existingCategory, postCategory)

export default categoriesRouter;

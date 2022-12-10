import { Router } from "express";
import { postCustomer } from "../controllers/customers.controllers.js";
import { customerSchemaValidation } from "../middlewares/customers/customerSchemaValidation.middleware.js";

const customersRouter = Router();

customersRouter.post("/customers", customerSchemaValidation, postCustomer);

export default customersRouter;

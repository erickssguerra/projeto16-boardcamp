import { Router } from "express";
import {
  postCustomer,
  getCustomers,
} from "../controllers/customers.controllers.js";
import { customerSchemaValidation } from "../middlewares/customers/customerSchemaValidation.middleware.js";
import { existingCpf } from "../middlewares/customers/customerExistingCpf.middleware.js";

const customersRouter = Router();

customersRouter.post(
  "/customers",
  customerSchemaValidation,
  existingCpf,
  postCustomer
);
customersRouter.get("/customers", getCustomers);

export default customersRouter;

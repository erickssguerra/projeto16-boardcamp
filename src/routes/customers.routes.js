import { Router } from "express";
import {
  postCustomer,
  getCustomers,
  getCustomerById,
  putCustomerById
} from "../controllers/customers.controllers.js";
import { customerSchemaValidation } from "../middlewares/customers/customerSchemaValidation.middleware.js";
import { existingCpf } from "../middlewares/customers/customerExistingCpf.middleware.js";
import { existingCpfToPut } from "../middlewares/customers/customerExistingCpfToPut.middleware.js";

const customersRouter = Router();

customersRouter.post(
  "/customers",
  customerSchemaValidation,
  existingCpf,
  postCustomer
);
customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerById)
customersRouter.put("/customers/:id", customerSchemaValidation, existingCpfToPut, putCustomerById)

export default customersRouter;

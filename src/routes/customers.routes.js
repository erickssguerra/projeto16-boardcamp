import { Router } from "express";
import { postCustomer } from "../controllers/customers.controllers.js";

const customersRouter = Router();

customersRouter.post("/customers", postCustomer);

export default customersRouter;

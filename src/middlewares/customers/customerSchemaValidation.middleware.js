import { customerSchema } from "../../schemas/customer.schema.js";

export async function customerSchemaValidation(req, res, next) {
  const customerObject = req.body;
  const { error } = customerSchema.validate(customerObject, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }
  console.log("middleware: customerSchemaValidation passed!");
  res.locals.validatedCustomer = customerObject;
  next();
}

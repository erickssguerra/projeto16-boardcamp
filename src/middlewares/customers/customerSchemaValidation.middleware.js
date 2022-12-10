import { customerSchema } from "../../schemas/customer.schema.js";
import chalk from "chalk";

export async function customerSchemaValidation(req, res, next) {
  const customerObject = req.body;
  const { error } = customerSchema.validate(customerObject, {
    abortEarly: false,
  });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    console.log(chalk.red("middleware: customerSchemaValidation blocked!"))
    return res.status(400).send(errors);
  }
  console.log(chalk.yellow("middleware: customerSchemaValidation passed..."));
  res.locals.schemaValidatedCustomer = customerObject;
  next();
}

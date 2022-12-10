import { rentalSchema } from "../../schemas/rentals.schema.js";
import chalk from "chalk";

export async function rentalSchemaValidation(req, res, next) {
  const rentalObject = req.body;
  const { error } = rentalSchema.validate(rentalObject, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    console.log(chalk.red("middleware: rentalSchemaValidation blocked!"));
    return res.status(400).send(errors);
  }
  console.log(chalk.yellow("middleware: rentalSchemaValidation passed..."));
  res.locals.rentalSchemaValidated = rentalObject;
  next();
}

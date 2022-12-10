import chalk from "chalk";
import { categorySchema } from "../../schemas/category.schema.js";

export async function categorySchemaValidation(req, res, next) {
  const { name } = req.body;
  const { error } = categorySchema.validate({ name }, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    console.log(chalk.red("middleware: categorySchemaValidation blocked!"))
    return res.status(400).send(errors);
  }
  console.log(chalk.yellow("middleware: categorySchemaValidation passed..."));
  res.locals.validatedCategory = name;
  next();
}

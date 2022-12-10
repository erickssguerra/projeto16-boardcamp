import { gameSchema } from "../../schemas/game.schema.js";
import chalk from "chalk";

export async function gameSchemaValidation(req, res, next) {
  const gameObject = req.body;
  const { error } = gameSchema.validate(gameObject, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    console.log(chalk.red("middleware: gameSchemaValidation blocked!"));
    return res.status(400).send(errors);
  }
  console.log(chalk.yellow("middleware: gameSchemaValidation passed..."));
  res.locals.validatedGame = gameObject;
  next();
}

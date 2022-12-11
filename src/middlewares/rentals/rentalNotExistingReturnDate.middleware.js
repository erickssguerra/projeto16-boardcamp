import connectionDB from "../../database/database.js";
import chalk from "chalk";

export async function notExistingReturnDate(req, res, next) {
  const id = res.locals.existingRentalId;
  console.log(chalk.yellow("middleware: notExistingReturnDate passed..."));
  res.locals.notExistingReturnDate = id;
  next();
}

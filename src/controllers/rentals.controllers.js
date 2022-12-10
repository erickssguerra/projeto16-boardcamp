import chalk from "chalk";
import connectionDB from "../database/database.js";

export async function getRentals(req, res) {}

export async function postRental(req, res) {
  const rentalObject = res.locals.rentalExistingCustomer;
  console.log(chalk.green("controller: postRental concluded!"));
  res.status(201).send(rentalObject);
}

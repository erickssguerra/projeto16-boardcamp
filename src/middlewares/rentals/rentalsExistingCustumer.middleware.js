import chalk from "chalk";
import connectionDB from "../../database/database.js";

export async function existingCustomer(req, res, next) {
  const rentalObject = res.locals.rentalSchemaValidated;
  try {
    const existingCustomer = await connectionDB.query(
      `
        SELECT * FROM customers WHERE id=$1;`,
      [rentalObject.customerId]
    );
    if (existingCustomer.rowCount) {
      console.log(chalk.yellow("middleware: existingCustomer passed..."));
      res.locals.rentalExistingCustomer = rentalObject;
    } else {
      console.log(chalk.red("middleware: existingCustomer blocked!"));
      return res.status(400).send({ message: "Usuário não cadastrado!" });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next()
}

import connectionDB from "../../database/database.js";
import chalk from "chalk";

export async function notExistingReturnDate(req, res, next) {
  const id = res.locals.existingRentalId;
  try {
    const rentalObject = await connectionDB.query(
      `SELECT * FROM rentals WHERE id = $1
    ;`,
      [id]
    );
    const returnDate = rentalObject.rows[0].returnDate;
    if (returnDate) {
      console.log(chalk.red("middleware: notExistingReturnDate blocked!"));
      return res.status(400).send({ message: "Aluguel já foi finalizado!" });
    } else {
      console.log(chalk.yellow("middleware: notExistingReturnDate passed..."));
      res.locals.validatedRentalObject = rentalObject.rows[0];
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}

import connectionDB from "../../database/database.js";
import chalk from "chalk";

export async function existingReturnDate(req, res, next) {
  const id = res.locals.existingRentalId;
  try {
    const rentalObject = await connectionDB.query(
      `SELECT * FROM rentals WHERE id = $1    
    ;`,
      [id]
    );
    const returnDate = rentalObject.rows[0].returnDate;
    if (!returnDate) {
      console.log(chalk.red("middleware: existingReturnDate blocked!"));
      return res.status(400).send({ message: "Aluguel não finalizado!" });
    } else {
      console.log(chalk.yellow("middleware: existingReturnDate passed..."));
      res.locals.returnDateVerifiedId = id;
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  next();
}
